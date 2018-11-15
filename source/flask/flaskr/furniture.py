from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for,
    jsonify
)
from flask_restful import Api, Resource, url_for
from werkzeug.security import check_password_hash, generate_password_hash

import pymongo
from bson.json_util import dumps
import json
"""
Additional Dependencies Please Add Here
"""
from flaskr import auth
from flaskr.model.furniture_model import get_furniture_collection

bp = Blueprint('furniture', __name__, url_prefix='/furniture')
api = Api(bp)

# take a form, store information in the database


class Post(Resource):
    @auth.login_required
    def post(self):
        pass

# take an id of furniture, delete from database


class Delete(Resource):
    @auth.login_required
    def get(self, furniture_name):
        pass

# take revised info, change info in database


class Update(Resource):
    @auth.login_required
    def post(self):
        pass

# take an id return furniture info


class Detail(Resource):
	@auth.login_required
	def get(self, furniture_name):
		# Get furniture data from database
		furnitures = get_furniture_collection();

		furniture = furnitures.find_one({'furniture_name': furniture_name});
		if furniture is None:
			return jsonify({
				"status": 319,
				"msg": "Can not find the furniture"
				})

		# Get detail from the database
		product_name = furniture['furniture_name'];
		category = furniture['category'];
		images = furniture['images'];
		is_delivery_included = furniture['is_delivery_included'];
		price = furniture['price'];
		location = furniture['location'];
		seller_id = furniture['seller'];
		description = furniture['description'];
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

		return jsonify(retJson);

api.add_resource(Post, '/post');
api.add_resource(Delete, '/delete/<string:furniture_name>');
api.add_resource(Update, '/update');
api.add_resource(Detail, '/detail/<string:furniture_name>');
