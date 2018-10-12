import functools
from flask_restful import Api, Resource, url_for
# commit test
from flask import (
	Blueprint, flash, g, redirect, render_template, request, session, url_for,
	jsonify
)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db
import pymongo
from bson.json_util import dumps
import json

bp = Blueprint('auth', __name__, url_prefix='/auth')
api = Api(bp);

# TODO: Wrap up
db = get_db();
users = pymongo.collection.Collection(db, 'User');

# helper funciton to find user name
def user_exist(username):
	if users.find_one({"username": username}) is not None:
		return True;
	else:
		return False;

def login_required():
	pass;

# /auth/register : register
# TODO: add address, check password is valid, add email
# 		check email is valid
class Register(Resource):
	def post(self):

		postedData = request.get_json();

		username = postedData['username'];
		password = postedData['password'];

		error = None;
		error_code = 200;

		# TODO: change depends on database
		if not username:
			error_code = 301;
			error = 'Username is required.';
		elif not password:
			error_code = 302;
			error = 'Password is required.'
		elif user_exist(username):
			error_code = 301;
			error = 'User {} is already registered.'.format(username)

		if error is None:
			users.insert_one({
				"username" : username,
				"password" : generate_password_hash(password)
			});

			retJson = {
				"status" : 200,
				"msg" : "You successfully signed up for the furnitrade"
			};
			return jsonify(retJson);

		retJson = {
			"status" : error_code,
			"msg" : error
		};

		return jsonify(retJson);

	#return render_template('auth/register.html');

# TODO: Login Mao Li, Zhenghong Ma
#	frontend: usrname, password; this function query and check:
# 1. prevent security exploits
# 2. session
class Login(Resource):
	# 1. get username and password from POST request
	# 2. check usr and pass in MongoDB
	#	 	If either is empty;
	# 		If usrname doesn't exist
	def post(self):
		return;
	pass;

class Logout(Resource):
	pass;

# /auth/list : list users
class List(Resource):
	def get(self):
		col_results = json.loads(dumps(users.find()));
		return jsonify(col_results);


api.add_resource(Register, '/register/');
api.add_resource(List, '/list/');
api.add_resource(Login, '/login/')
