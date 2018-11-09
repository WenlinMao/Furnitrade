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
		pass;

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

api.add_resource(Post, '/post');
api.add_resource(Delete, '/delete/<string:furniture_name>');
api.add_resource(Update, '/update');
api.add_resource(Detail, '/detail/<string:furniture_name>');
