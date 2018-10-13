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
# TODO: suggest using verity_user
def user_exist(username):
	if users.find_one({"username": username}) is not None:
		return True;
	else:
		return False;

# helper function to for login. Avoids multiple queries
# 	 	If either is empty;
# 		If usrname doesn't exist
#		If password doesn't match
# Input: username and password get from post
# Output: status_code, msg, user_id
# TODO: set error/status code as global variable
def verify_user(username, password):
	if not username:
		return 310, 'Username is required', None
	elif not password:
		return 311, 'Password is required', None

	user = users.find_one({"username": username})
	if not user:
		return 312, 'Username Doesnt Exist', None

	if check_password_hash(user['password'], password):
		return 200, 'Login Succeeded', str(user.get('_id'))
	else:
		return 313, 'Password is incorrect. Try Again', None

# TODO
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
			error_code = 310;
			error = 'Username is required.';
		elif not password:
			error_code = 311;
			error = 'Password is required.'
		elif not address:
			error_code = 303;
			error = 'Address is required.'
		elif not email:
			error_code = 304;
			errpr = 'email is required.'
		elif user_exist(username):
			error_code = 310;
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

# This handles Login url request. It verifies username and password
# using information from database. If user successfully logged in,
# it assigns session id as user's id in database.
# This uses verify_user as helper methods
# TODO: check email and logging with email.
class Login(Resource):
	def post(self):

		# Check if user is loged in, uncomment after logout is finished
		#if "user_id" not in session:

			# 1. Get username and password from POST
			postedData = request.get_json();
			username = postedData['username'];
			password = postedData['password'];

			# 2. Error Checking:
			status_code, msg, user_id = verify_user(username, password)

			# 3. successfully logged in by setting session id.
			if status_code == 200:
				session.clear()
				session['user_id'] = user_id

			# Return the status to front end.
			return jsonify({
				"status" : status_code,
				"msg" : msg,
			})

		#else:
			# Return the status to front end.
			return jsonify({
				"status" : 315,
				"msg" : "User already loged in",
			});


class Logout(Resource):
	def logout(self):
		if session['user_id'] == user_id:
			session['user_id'] = 0
			session.pop('user', None)
			return jsonify({
				"status" : status_code,
				"msg" : msg,
			});

		return jsonify({
			"status" : 316,
			"msg" : "User not loged in",
		});

# /auth/list : list users
class List(Resource):
	def get(self):
		col_results = json.loads(dumps(users.find()));
		return jsonify(col_results);


api.add_resource(Register, '/register');
api.add_resource(List, '/list');
api.add_resource(Login, '/login');
