from flaskr.model.category_model import (
    get_category_collection, get_category_by_catname
)

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


api.add_resource(Category, '/<string:category_name>')
api.add_resource(ChangeCategory, '/change_category')