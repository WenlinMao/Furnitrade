from werkzeug.security import check_password_hash, generate_password_hash
"""
Additional Dependencies Please Add Here
"""
from flaskr import auth
from flaskr.model.user_model import (
    update_user_by_id, delete_user_by_username,
    delete_wishlist_by_id, clear_history
)
from flaskr.model.furniture_model import (
    find_furniture_by_id
)

from flask import (
    Blueprint, request, jsonify
)
from flask_restful import Api, Resource, reqparse

from bson import ObjectId
import json


bp = Blueprint('user', __name__, url_prefix='/user')
api = Api(bp)


# take an id of user, delete from database
class Delete(Resource):
    def get(self, username):
        if delete_user_by_username(username) is not None:
            return jsonify({
                "status": 200,
                "msg": "delete succeeded"
            })

# This updates/edits the user's Profile
# First verify if new modification is valid;
# Then update databse fields if so.
# Output: boolean - if success; msg - error message
# Due by Sat; Mao Li


class Edit(Resource):
    @auth.login_required
    def post(self, user):
        # Step1: Get post's jason file
        posted_data = request.get_json()
        new_username = posted_data['username']
        new_email = posted_data['email']
        new_address = posted_data['address']

        # Step2: Verify edited username and email

        # 2.1 get user's original info from database
        # TODO: get user without getting all collection

        # 2.2 verify the changes to user's Profile
        if new_username != user['username']:
            if auth.user_exist(new_username):
                return jsonify({
                    "status": 310,
                    "msg": 'New username already exists'
                })
            if not auth.check_username_valid(new_username):
                return jsonify({
                    "status": 310,
                    "msg": "New username contains invalid symbols"
                })

        if new_email != user['email']:
            if not auth.check_email_valid(new_email):
                return jsonify({
                    "status": 318,
                    "msg": 'New email invalid',
                })
            if auth.email_exist(new_email):
                return jsonify({
                    "status": 318,
                    "msg": 'New email already exists'
                })

        # Step 3: update the user's info in database
        update_user_by_id(user['_id'], {
            "username": new_username,
            "email": new_email,
            "address": new_address
        })

        return jsonify({
            "status": 200,
            "msg": "Update/Edit succeeded"
        })


class ChangeProfileImg(Resource):
    @auth.login_required
    def get(self, user):
        parser = reqparse.RequestParser()
        parser.add_argument('img_pathes', type=str)
        args = parser.parse_args()

        # update the user's profile in database
        update_user_by_id(user['_id'], {
            "profile": args['img_pathes']
        })

        return jsonify({
            "status": 200,
            "msg": "Update succeeded"
        })

# take an id return user info
# Get all user related info in database as JSON file.


class Profile(Resource):
    @auth.login_required
    def get(self, user):
        # Get user profile from database

        current_username = user['username']
        current_email = user['email']
        current_address = user['address']
        current_id = str(user['_id'])
        current_picture = user['profile']

        # Collect profile data
        retJson = {
            "status": 200,
            "msg": 'Get profile succeeded',
            'username': current_username,
            'email': current_email,
            'address': current_address,
            'user_id': current_id,
            'profile': current_picture
        }

        # Return received data
        return jsonify(retJson)


# reset password
class ChangePassword(Resource):
    @auth.login_required
    def post(self, user):
        posted_data = request.get_json()
        old_password = posted_data["old_password"]
        new_password = posted_data["new_password"]

        if check_password_hash(user['password'], old_password):
            update_user_by_id(user['_id'], {
                "password": generate_password_hash(new_password)
            })

            return jsonify({
                "status": 200,
                "msg": "change password succeeded"
            })

        else:
            return jsonify({
                "status": 313,
                "msg": "Password is incorrect. Try Again"
            })


class getWishList(Resource):
    '''
    get wishlist based on user_id
    query all furniture_ids in wishlist to get details
    return jsonified details
    '''
    @auth.login_required
    def get(self, user):

        # step 1: check if wishlist is empty
        wishlist = user['wishlist']

        # step 2: query all furniture_ids to get details
        furnitures_json = []
        for furniture_id in wishlist:

            furniture = find_furniture_by_id(furniture_id)

            # Error checking
            if not ObjectId.is_valid(furniture_id) or furniture is None:
                continue
            try:
                product_name = furniture['furniture_name']
                category = furniture['category']
                images = furniture['images']
                price = furniture['price']

                furnitures_json.append({
                    'furniture_name': product_name,
                    'category': category,
                    'product_image': images,
                    'price': price,
                    'furniture_id': furniture_id
                })
            except KeyError:
                continue

        if not furnitures_json:
            return jsonify({
                "status": 613,
                "msg": "Empty wishlist"
            })

        # step 3: return json representation of furnitures
        return jsonify({
            "status": 200,
            "msg": "get wishlist succeeded",
            "result": json.dumps(furnitures_json)
        })


class deleteWishList(Resource):
    '''
    delete a furniture id from the wish list
    '''
    @auth.login_required
    def get(self, user):

        # get user id and furniture id from param
        user_id = user['_id']
        furniture_id = request.args.get('furniture_id')

        # Validation of object id
        if not ObjectId.is_valid(furniture_id) or \
                find_furniture_by_id(furniture_id) is None:
            return jsonify({
                "status": 615,
                "msg": "Invalid furniture_id"
            })

        # Use $pull operations.
        delete_wishlist_by_id(user_id, furniture_id)

        # TODO: catch and report error returned by delete.

        return jsonify({
            "status": 200,
            "msg": "Furniture deleted from wishlist"
        })


class getHistory(Resource):
    '''
    get history based on user_id
    '''
    @auth.login_required
    def get(self, user):

        # step 1: check if history is empty
        history = user['history']

        # step 2: query all furniture_ids to get details
        furnitures_json = []
        for furniture_id in history:

            furniture = find_furniture_by_id(furniture_id)

            if not ObjectId.is_valid(furniture_id) or furniture is None:
                # return jsonify({
                #     "status": 614,
                #     "msg": "furniture no longer available"
                # })
                continue
            try:
                product_name = furniture['furniture_name']
                category = furniture['category']
                images = furniture['images']
                price = furniture['price']

                furnitures_json.append({
                    'furniture_name': product_name,
                    'category': category,
                    'product_image': images,
                    'price': price,
                    'furniture_id': furniture_id
                })
            except KeyError:
                continue

        if not furnitures_json:
            return jsonify({
                "status": 613,
                "msg": "Empty history"
            })
        # step 3: return json representation of furnitures
        return jsonify({
            "status": 200,
            "msg": "get wishlist succeeded",
            "result": json.dumps(furnitures_json)
        })


class clearHistory(Resource):
    '''
    delete a furniture id from the wish list
    '''
    @auth.login_required
    def get(self, user):

        # get user id and furniture id from param
        user_id = user['_id']

        # # Get the user object
        # user = find_user_by_id(user_id)

        # Use $pull operations.
        clear_history(user_id, user['history'])

        # TODO: catch and report error returned by delete.

        return jsonify({
            "status": 200,
            "msg": "History has been cleared"
        })


class getMyFurnitures(Resource):
    '''
    Get my posted furnitures based on user_id
    query all furniture_ids in my_furnitures list to get details
    return jsonified details
    '''
    @auth.login_required
    def get(self, user):
        # Step 1: check if empty my_furnitures
        my_furnitures = user['my_furnitures']

        # Step 2: query all funriture_ids to get details
        furnitures_json = []
        for furniture_id in my_furnitures:

            furniture = find_furniture_by_id(furniture_id)

            # Error checking
            if not ObjectId.is_valid(furniture_id) or furniture is None:
                # return jsonify({
                #     "status": 614,
                #     "msg": "furniture no longer available"
                # })
                continue
            try:
                product_name = furniture['furniture_name']
                category = furniture['category']
                images = furniture['images']
                price = furniture['price']

                furnitures_json.append({
                    'furniture_name': product_name,
                    'category': category,
                    'product_image': images,
                    'price': price,
                    'furniture_id': furniture_id
                })
            except KeyError:
                continue

        if not furnitures_json:
            return jsonify({
                "status": 613,
                "msg": "Empty my_furnitures"
            })

        return jsonify({
            "status": 200,
            "msg": "get my furnitures succeeded",
            "result": json.dumps(furnitures_json),
        })


api.add_resource(Delete, '/delete/<string:username>')
api.add_resource(Edit, '/edit')
api.add_resource(Profile, '/profile')
api.add_resource(ChangePassword, '/change_password')
api.add_resource(getWishList, '/get_wishlist')
api.add_resource(deleteWishList, '/delete_wishlist')
api.add_resource(getHistory, '/get_history')
api.add_resource(clearHistory, '/clear_history')
api.add_resource(ChangeProfileImg, '/change_img')
api.add_resource(getMyFurnitures, '/get_my_furnitures')
