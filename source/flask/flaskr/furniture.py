from flask import (
	Blueprint, flash, g, redirect, render_template, request, session, url_for,
	jsonify
)
from flask_restful import Api, Resource, url_for
from werkzeug.security import check_password_hash, generate_password_hash

import pymongo
from bson.json_util import dumps
import json

########### Additional Dependencies Please Add Here ###################
from flaskr import auth
from flaskr.db import get_furniture_collection

bp = Blueprint('furniture', __name__, url_prefix='/furniture')
api = Api(bp);

# take a form, store information in the database
class Post(Resource):
	@auth.login_required
	def post(self):
		furnitures = get_furniture_collection();
		postedData = request.get_json();
		#print (type(postedData));
		fur_name = postedData['furniture_name'];
		images = postedData['images'];
		#address = "8520 Costa Verde";
		price = postedData['price'];
		location = postedData['location'];
		description = postedData['description'];

		error = None;
		error_code = 200;

		# TODO: change depends on database
		if not fur_name:
			error_code = 410;
			error = 'Furniture name is required.';
		elif not images:
			error_code = 411;
			error = 'Images are required.'
		elif not price:
			error_code = 417;
			error = 'Price is required.'
		elif not location:
			error_code = 418;
			error = 'Pick up location is required.'
		elif not description:
			error_code = 419;
			error = 'Description of furniture is required.'

		if error is None:
			furnitures.insert_one({
				"furniture_name" : fur_name,
				"images" : images,
				"price" : price,
				"location" : location,
				"description" : description
			});

			retJson = {
				"status" : 200,
				"msg" : "You have successfully uploaded the furniture!"
			};
			return jsonify(retJson);

		retJson = {
			"status" : error_code,
			"msg" : error
		};

		return jsonify(retJson);

# take an id of furniture, delete from database
class Delete(Resource):
	@auth.login_required
	def get(self, furniture_name):
		args = request.args
		furniture_name = args['furniture_id'];
		pass;

# take revised info, change info in database
class Update(Resource):
	@auth.login_required
	def post(self):
		pass;

# take an id return furniture info
class Detail(Resource):
	@auth.login_required
	def get(self, furniture_name):
		pass;

class List(Resource):
	def get(self):
		furnitures = get_furniture_collection();
		col_results = json.loads(dumps(furnitures.find()));
		return jsonify(col_results);

api.add_resource(Post, '/post');
api.add_resource(Delete, '/delete/<string:furniture_name>');
api.add_resource(Update, '/update');
api.add_resource(Detail, '/detail/<string:furniture_name>');
api.add_resource(List, '/list');
