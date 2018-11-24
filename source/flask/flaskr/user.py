from werkzeug.security import check_password_hash, generate_password_hash
"""
Additional Dependencies Please Add Here
"""
from flaskr import auth
from flaskr.model.user_model import (
    update_user_by_id, delete_user_by_username
)

from flask import (
    Blueprint, request, jsonify, json
)
from flask_restful import Api, Resource, reqparse


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
    Simply return the jsonified wishlist
    '''
    @auth.login_required
    def get(self, user):
        wishlist = user['wishlist']
        return jsonify({
            "status": 200,
            "msg": "wishlsit get from user",
            "wishlist": wishlist
        })


class deleteWishList(Resource):
    '''
    delete a furniture id from the wish list
    '''
    @auth.login_required
    def get(self, user, furniture_id):
        wishlist = user['wishlist']
        temp = wishlist.split(furniture_id)
        wishlist = ''.join(temp)
        user.update_wishlist_by_id(user['user_id'], wishlist)
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
        history = user['history']
        return jsonify({
            "status": 200,
            "msg": "history successfully loaded",
            "history": history
        })

# TODO: forget passwords


api.add_resource(Delete, '/delete/<string:username>')
api.add_resource(Edit, '/edit')
api.add_resource(Profile, '/profile')
api.add_resource(ChangePassword, '/change_password')
api.add_resource(getWishList, '/get_wishlist')
api.add_resource(getHistory, '/get_history')
api.add_resource(ChangeProfileImg, '/change_img')
