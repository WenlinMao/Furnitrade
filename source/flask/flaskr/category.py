from flaskr.model.category_model import get_category_collection

from flask_restful import Api, Resource

from flask import (
    Blueprint, request, jsonify, current_app
)

bp = Blueprint('category', __name__, url_prefix='/category')
api = Api(bp)


class Category(Resource):
    # takes a category name and find all furniture_id that belong to
    # this category, set return number by once
    def get(self, category_name):
        pass


api.add_resource(Category, '/<string:category_name>')
