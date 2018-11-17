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
    get_furniture_collection, update_furniture_by_id
)

bp = Blueprint('furniture', __name__, url_prefix='/furniture')
api = Api(bp)

# take a form, store information in the database

# Please added furniture_id field into database. [commented by Mao]


class Post(Resource):
    @auth.login_required
    def post(self):
        furnitures = get_furniture_collection()
        postedData = request.get_json()

        fur_name = postedData['furniture_name']
        category = postedData['category']
        images = postedData['images']
        price = postedData['price']
        is_delivery_included = postedData['is_delivery_included']
        location = postedData['location']
        seller_id = postedData['seller']
        description = postedData['description']

        error = None
        error_code = 200

        # TODO: change depends on database
        if not fur_name:
            error_code = 410
            error = 'Furniture name is required.'
        elif not images:
            error_code = 411
            error = 'Images are required.'
        elif not category:
            error_code = 412
            error = 'Category needs to be specified.'
        elif not is_delivery_included:
            error_code = 413
            error = 'Is delivery included?'
        elif not seller_id:
            error_code = 414
            error = 'Seller name is required.'
        elif not price:
            error_code = 417
            error = 'Price is required.'
        elif not location:
            error_code = 418
            error = 'Pick up location is required.'
        elif not description:
            error_code = 419
            error = 'Description of furniture is required.'

        if error is None:
            '''
            TODO: add function in model layer for every database access
            '''
            furnitures.insert_one({
                "furniture_name": fur_name,
                "category": category,
                "images": images,
                "price": price,
                "is_delivery_included": is_delivery_included,
                "location": location,
                "seller": seller_id,
                "description": description
            })

            retJson = {
                "status": 200,
                "msg": "You have successfully uploaded the furniture!"
            }
            return jsonify(retJson)

        retJson = {
            "status": error_code,
            "msg": error
        }

        return jsonify(retJson)


# take an id of furniture, delete from database
class Delete(Resource):
    def get(self, furniture_name):
        # Get furniture data from database
        furnitures = get_furniture_collection()

        '''
        TODO:
        please move delete_one to model layer
        '''
        furniture = furnitures.delete_one({'furniture_name': furniture_name})

        return jsonify({
            "status": 200,
            "msg": "Delete succeeded"
        })


# take revised info, change info in database
class Update(Resource):
    @auth.login_required
    def post(self):

        # Get post's json file
        posted_data = request.get_json()

        product_name = posted_data['furniture_name']
        category = posted_data['category']
        images = posted_data['images']
        is_delivery_included = posted_data['is_delivery_included']
        price = posted_data['price']
        location = posted_data['location']
        description = posted_data['description']

        # TODO: perform validation on new data

        # TODO: get current furniture id.
        furniture = jsonify({"furniture_id": '2018'})

        # Update furniture by its id
        update_furniture_by_id(furniture['_id'], {
            "furniture_name": product_name,
            "category": category,
            "images": images,
            "is_delivery_included": is_delivery_included,
            "price": price,
            "location": location,
            "description": description
        })

        return jsonify({
            "status": 200,
            "msg": "Update/Edit succeeded"
        })


# take an id return furniture info
class Detail(Resource):

    @auth.login_required
    def get(self, furniture_name):
        # Get furniture data from database
        furnitures = get_furniture_collection()
        '''
        TODO:
        move find one in model layer
        '''
        # TODO: find one by furniture's id?
        # furniture = furnitures.find_one({'furniture_id': ObjectId(fid)})
        furniture = furnitures.find_one({'furniture_name': furniture_name})
        if furniture is None:
            return jsonify({
                "status": 319,
                "msg": "Can not find the furniture"
            })

        # Get detail from the database
        product_name = furniture['furniture_name']
        category = furniture['category']
        images = furniture['images']
        is_delivery_included = furniture['is_delivery_included']
        price = furniture['price']
        location = furniture['location']
        seller_id = furniture['seller']
        description = furniture['description']

        retJson = {
            "status": 200,
            "msg": "Get furniture detail succeeded",
            'furniture_name': product_name,
            'category': category,
            'images': images,
            'is_delivery_included': is_delivery_included,
            'price': price,
            'location': location,
            'seller': seller_id,
            'description': description
        }

        return jsonify(retJson)


class List(Resource):
    def get(self):
        furnitures = get_furniture_collection()
        col_results = json.loads(dumps(furnitures.find()))
        return jsonify(col_results)


api.add_resource(Post, '/post')
api.add_resource(Delete, '/delete/<string:furniture_name>')
api.add_resource(Update, '/update')
api.add_resource(Detail, '/detail/<string:furniture_name>')
api.add_resource(List, '/list')
