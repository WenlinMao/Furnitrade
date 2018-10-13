import functools
import string
from flask_restful import Api, Resource, url_for

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

user_allowed = string.letters + string.digits + '_' + '.' +'-'

def check(mystring):
	return all(c in user_allowed for c in mystring)

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
		address = postedData['address'];
		email = postedData['email'];

		error = None;
		error_code = 200;

		# TODO: change depends on database
		if not username:
			error_code = 301;
			error = 'Username is required.';
		elif not password:
			error_code = 302;
			error = 'Password is required.'
		elif not address:
			error_code = 303;
			error = 'Address is required.'
		elif not email:
			error_code = 304;
			errpr = 'email is required.'
		elif user_exist(username):
			error_code = 301;
			error = 'User {} is already registered.'.format(username)
		elif user_exist(email):
			error_code = 304;
			error = 'Email {} is already registered.'.format(email)
		elif check(username) == False:
			error_code = 301;
			error = 'Username contains invalid symbols';
		elif ('@' in email) == False:
			error_code = 304;
			error = 'Invalid email address';
		elif ('.' in email) == False:
			error_code = 304;
			error = 'Invalid email address';

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

class Login(Resource):
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


