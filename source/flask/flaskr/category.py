from flaskr.model.category_model import (
    get_category_collection, get_category_by_catname, find_category_by_id
)
from flaskr.helper.subcategory import init_category


from flaskr.model.furniture_model import (
    find_furniture_by_id
)

from flask_restful import Api, Resource

from flask import (
    Blueprint, request, jsonify, current_app
)

from flaskr import auth
from bson.json_util import dumps
import json

bp = Blueprint('category', __name__, url_prefix='/category')
api = Api(bp)


class Category(Resource):
    # takes a category name and find all furniture_id that belong to
    # this category, set return number by once
    @auth.login_required
    def get(self, user, category_name):
        # def get(self, user, category_id):
        category = get_category_by_catname(category_name)
        if category is None:
            return jsonify({
                "status": 321,
                "msg": "Can not find the category"
            })
        size = category.included_listing.length
        if size < 10:
            count = size
        else:
            count = 10

        result = []
        for x in range(count):
            '''category['included_listing'].x 这玩意是啥??'''
            furniture = find_furniture_by_id(category['included_listing'].x)
            if furniture is None:
                return jsonify({
                    "status": 319,
                    "msg": "Can not find the furniture"
                })

            product_name = furniture['furniture_name']
            product_image = furniture['images']
            product_price = furniture['price']
            retJson = {
                "status": 200,
                "msg": "Get furniture detail succeeded",
                'furniture_name': product_name,
                'product_image': product_image,
                'price': product_price,
            }
            result.append(jsonify(retJson))

        return result


class ChangeCategory(Resource):
    # Take a furniture_id and an original and a new category name
    # Delete fid from original and add to new category
    def post(self):
        # get posted data
        posted_data = request.get_json()
        original_catname = posted_data['original_catname']
        new_catname = posted_data['new_catname']
        furniture_id = posted_data["furniture_id"]

        # TODO: figure out what categories do
        # Swicth the furniture's category
        old_cat = get_category_by_catname(original_catname)
        old_cat.delete_one({'furniture_id': furniture_id})
        new_cat = get_category_by_catname(new_catname)
        new_cat.update_one({'category_name': new_catname,
                            'furniture_id': furniture_id})
        return jsonify({
            "status": 200,
            "msg": "updated category of the furniture"
        })


class InitCategory(Resource):
    def get(self):
        init_category()

        return jsonify({
            "status": 200,
            "msg": "updated category of the furniture"
        })


api.add_resource(Category, '/<string:category_name>')
api.add_resource(ChangeCategory, '/change_category')
api.add_resource(InitCategory, '/init')
