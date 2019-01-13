from flaskr.model.category_model import (
    get_category_by_catname, get_category_collection
)

# from flaskr.helper.subcategory import (
#     init_category, delete_categories
# )

from flaskr.model.furniture_model import (
    find_furniture_by_id
)

from flask_restful import Api, Resource

from flask import (
    Blueprint, request, jsonify
)
import json
from bson.json_util import dumps


bp = Blueprint('category', __name__, url_prefix='/category')
api = Api(bp)


class Category(Resource):
    # takes a category name and find all furniture_id that belong to
    # this category, set return number by once
    def get(self):
        category_name = request.args.get('category_name')

        category = get_category_by_catname(category_name)
        if category is None:
            return jsonify({
                "status": 321,
                "msg": "Can not find the category"
            })

        size = len(category['furniture_id'])

        count = size if size < 10 else 10

        result = []
        for x in range(count):
            furniture_id = category['furniture_id'][x]
            furniture = find_furniture_by_id(furniture_id)
            if furniture is None:
                continue
            try:
                product_name = furniture['furniture_name']
                product_image = furniture['images']
                product_price = furniture['price']
                retJson = {
                    'furniture_name': product_name,
                    'product_image': product_image,
                    'price': product_price,
                    'furniture_id': furniture_id,
                }
                result.append(retJson)
            except KeyError:
                continue

        if not result:
            return jsonify({
                "status": 613,
                "msg": "Empty furniture_id"
            })

        return jsonify({
            "status": 200,
            "msg": "get subcategory success",
            "result": json.dumps(result)
        })


# class InitCategory(Resource):
#     """
#     Add furniture ids as a list in categories, instead of
#     a single field. By Mao.
#     """
#
#     def get(self):
#         init_category()
#
#         return jsonify({
#             "status": 200,
#             "msg": "Initialized category collection"
#         })


# class DeleteCategories(Resource):
#     """
#     Helper method to delete old wrong categories collection
#     """
#
#     def get(self):
#         delete_categories()
#         return jsonify({
#             "status": 1000,
#             "msg": "Deleted old categories"
#         })


class List(Resource):
    """
    Helper method to list all categories in the database
    """

    def get(self):
        categories = get_category_collection()
        col_results = json.loads(dumps(categories.find()))
        return jsonify(col_results)


api.add_resource(Category, '/')
# api.add_resource(InitCategory, '/init')
# api.add_resource(DeleteCategories, '/delete_categories')
api.add_resource(List, '/list')
