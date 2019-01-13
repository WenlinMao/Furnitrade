from flask import (
    Blueprint, request, jsonify
)
from flask_restful import Api, Resource

from bson.json_util import dumps
import json
"""
Additional Dependencies Please Add Here
"""
from flaskr import auth
from flaskr.model.furniture_model import (
    get_furniture_collection, find_furniture_by_id,
    update_furniture_by_id, delete_furniture_by_id,
    add_furniture
)

from flaskr.model.category_model import (
    update_category_by_catname, change_category
)

from flaskr.model.user_model import (
    add_wishlist_by_id, add_history_by_id, add_my_furniture_by_id,
    delete_my_furniture_by_id
)

from flaskr.helper.subcategory import (
    validate_category_name
)

from bson import ObjectId


bp = Blueprint('furniture', __name__, url_prefix='/furniture')
api = Api(bp)

# take a form, store information in the database

# Please added furniture_id field into database. [commented by Mao]


def is_furniture_id_invalid(furniture_id):
    # Validation of object id
    return (not ObjectId.is_valid(furniture_id) or
            find_furniture_by_id(furniture_id) is None)


class Post(Resource):
    @auth.login_required
    def post(self, user):

        postedData = request.get_json()

        fur_name = postedData['furniture_name']
        category = postedData['category']
        price = postedData['price']
        location = postedData['address']
        seller_id = str(user['_id'])
        description = postedData['description']

        error = None
        error_code = 200

        # TODO: change depends on database
        if not fur_name:
            error_code = 322
            error = 'Furniture name is required.'
        elif not category or not validate_category_name(category):
            error_code = 324
            error = 'Category invalid'
        elif not seller_id:
            ''' TODO: check if seller is inside the database '''
            error_code = 326
            error = 'Seller name is required.'
        elif not price:
            error_code = 327
            error = 'Price is required.'
        elif not location:
            error_code = 328
            error = 'Pick up location is required.'
        elif not description:
            error_code = 329
            error = 'Description of furniture is required.'

        if error is None:

            # Step 1: get furniture information
            toInsert = {
                "furniture_name": fur_name,
                "category": category,
                "price": price,
                "location": location,
                "seller": seller_id,
                "description": description
            }

            # Step 2: insert to furnitures collections
            furniture = add_furniture(toInsert)
            furniture_id = furniture.inserted_id

            # Step 3: insert to categories collections
            # Here category doesn't have id.
            # Fixed to include fid as list in category By Mao.

            update_category_by_catname(category, str(furniture_id))

            # Step 4: insert to user's my_furnitures
            add_my_furniture_by_id(user['_id'], str(furniture_id))

            # Status
            retJson = {
                "status": 200,
                "msg": "You have successfully uploaded the furniture!",
                "furniture_id": str(furniture_id)
            }
            return jsonify(retJson)

        retJson = {
            "status": error_code,
            "msg": error
        }

        return jsonify(retJson)


# take an id of furniture, delete from database
class Delete(Resource):
    @auth.login_required
    def get(self, user, furniture_id):

        furniture = find_furniture_by_id(furniture_id)

        if furniture is None:
            return jsonify({
                "status": 319,
                "msg": "Can not find the furniture"
            })

        delete_furniture_by_id(furniture_id)
        delete_my_furniture_by_id(user["_id"], furniture_id)
        return jsonify({
            "status": 200,
            "msg": "Delete succeeded"
        })


# take revised info, change info in database
class Update(Resource):
    @auth.login_required
    def post(self, user):

        # Get post's json file
        posted_data = request.get_json()

        product_name = posted_data['furniture_name']
        category = posted_data['category']
        price = posted_data['price']
        description = posted_data['description']

        # Get current furniture id.
        furniture_id = posted_data['furniture_id']

        # TODO: Change category here when updated.
        old_furniture = find_furniture_by_id(furniture_id)
        # Check if category has been changed
        if category != old_furniture['category']:
            change_category(old_furniture['category'],
                            category, str(furniture_id))

        # Update furniture by its id
        update_furniture_by_id(furniture_id, {
            "furniture_name": product_name,
            "category": category,
            # "images": images,
            # "is_delivery_included": is_delivery_included,
            "price": price,
            # "location": location,
            "description": description
        })

        return jsonify({
            "status": 200,
            "msg": "Update/Edit succeeded"
        })


class Detail(Resource):
    # take an id return furniture info
    @auth.login_required
    def get(self, user):
        furniture_id = request.args.get('furniture_id')
        furniture = find_furniture_by_id(furniture_id)

        if furniture is None:
            return jsonify({
                "status": 319,
                "msg": "Can not find the furniture"
            })

        # Get detail from the database
        product_name = furniture['furniture_name']
        category = furniture['category']
        images = furniture['images']
        price = furniture['price']
        location = furniture['location']
        description = furniture['description']
        seller = furniture['seller']

        retJson = {
            "status": 200,
            "msg": "Get furniture detail succeeded",
            'furniture_name': product_name,
            'category': category,
            'images': images,
            'price': price,
            'location': location,
            'description': description,
            'seller': seller,
        }

        return jsonify(retJson)


class AddWishList(Resource):
    '''
    should be called every time user click on add wishlist, add
    furniture id to user's wishlist
    '''
    @auth.login_required
    def get(self, user):
        # Get user id and furniture_id from get request's param
        user_id = user["_id"]
        furniture_id = request.args.get('furniture_id')

        # Validation of object id
        if is_furniture_id_invalid(furniture_id):
            return jsonify({
                "status": 615,
                "msg": "Invalid user_id or furniture_id"
            })

        # Insert to user's wish 'list'.
        add_wishlist_by_id(user_id, furniture_id)

        return jsonify({
            "status": 200,
            "msg": "Furniture added to wishlist"
        })


class AddHistory(Resource):
    '''
    should be called every time when user click on a furniture page,
    add furniture id to user's history
    '''
    @auth.login_required
    def get(self, user):

        # Get user id and furniture_id from get request's param
        user_id = user["_id"]
        furniture_id = request.args.get('furniture_id')

        if is_furniture_id_invalid(furniture_id):
            jsonify({
                "status": 615,
                "msg": "Invalid user_id or furniture_id"
            })

        # Add to history
        add_history_by_id(user_id, furniture_id)

        return jsonify({
            "status": 200,
            "msg": "Furniture successfully added to history."
        })


class List(Resource):
    def get(self):
        furnitures = get_furniture_collection()
        col_results = json.loads(dumps(furnitures.find()))
        return jsonify(col_results)


class ChangeFurnitureImg(Resource):
    @auth.login_required
    def post(self, user):
        posted_data = request.get_json()
        furniture_id = posted_data['furniture_id']
        img_pathes = posted_data['img_pathes']

        # update the user's profile in database
        update_furniture_by_id(furniture_id, {
            "images": img_pathes
        })

        return jsonify({
            "status": 200,
            "msg": "Update succeeded"
        })


api.add_resource(Post, '/post')
api.add_resource(Delete, '/delete/<string:furniture_id>')
api.add_resource(Update, '/update')
api.add_resource(Detail, '/detail')
api.add_resource(AddWishList, '/add_wishlist')
api.add_resource(AddHistory, '/add_history')
api.add_resource(List, '/list')
api.add_resource(ChangeFurnitureImg, '/change_img')
