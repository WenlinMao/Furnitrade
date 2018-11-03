import functools
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

########### Additional Dependencies Please Add Here ###################
import string
import re

bp = Blueprint('auth', __name__, url_prefix='/auth')
api = Api(bp);

def get_users_collection():
	db = get_db();
	users = pymongo.collection.Collection(db, 'User');
	return users;


# check if username exist in database
def user_exist(username, users):
	if users.find_one({"username": username}) is not None:
		return True;
	else:
		return False;

# check if username format valid
def check_username_valid(mystring):
	user_allowed = string.ascii_letters + string.digits + '_' + '.' +'-';
	return all(c in user_allowed for c in mystring)

# check if email exist in database
def email_exist(email, users):
	if users.find_one({"email": email}) is not None:
		return True;
	else:
		return False;

# check if email format correctly
def check_email_valid(email):
	return re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", email);

# helper function to for login. Avoids multiple queries
# 	 	If either is empty;
# 		If usrname doesn't exist
#		If password doesn't match
# Input: username and password get from post
# Output: status_code, msg, user_id
#
# TODO: set error/status code as global variable
def verify_user(username, password):
	users = get_users_collection();
	if not username:
		return 310, 'Username is required', None
	elif not password:
		return 311, 'Password is required', None

	# Use username or email to login in:
	# First check if username exist, if exists, login in with username,
	# if not, check if the user use email
	# if neither username nor email exists, return error code 312
	# if the user use email, use email to login in
	if not user_exist(username, users):
		if not email_exist(username, users):
			return 312, 'Username/Email Doesnt Exist', None
		else:
			user = users.find_one({"email": username})
	else:
		user = users.find_one({"username": username})

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
		users = get_users_collection();
		postedData = request.get_json();
		#print (type(postedData));
		username = postedData['username'];
		password = postedData['password'];
		#address = "8520 Costa Verde";
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
			error_code = 317;
			error = 'Address is required.'
		elif not email:
			error_code = 318;
			error = 'email is required.'
		elif user_exist(username, users):
			error_code = 310;
			error = 'User {} is already registered.'.format(username)
		elif email_exist(email, users):
			error_code = 318;
			error = 'Email {} is already registered.'.format(email)
		elif check_username_valid(username) == False:
			error_code = 310;
			error = 'Username contains invalid symbols';
		elif not check_email_valid(email):
			error_code = 318;
			error = 'Email invalid';

		if error is None:
			users.insert_one({
				"username" : username,
				"password" : generate_password_hash(password),
				"email" : email,
				"address" : address
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


# This handles Login url request. It verifies username and password
# using information from database. If user successfully logged in,
# it assigns session id as user's id in database.
# This uses verify_user as helper methods
# TODO: check email and logging with email.
class Login(Resource):
	def post(self):

		# Check if user is loged in, uncomment after logout is finished
		if "user_id" not in session:

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

		else:
			# Return the status to front end.
			return jsonify({
				"status" : 315,
				"msg" : "User already loged in",
			});


class Logout(Resource):
	def get(self):
		if "user_id" in session:
			session['user_id'] = 0
			session.pop('user_id', None)
			return jsonify({
				"status" : 200,
				"msg" : "User successfully loged out",
			});

		return jsonify({
			"status" : 316,
			"msg" : "User not loged in",
		});

# /auth/list : list users
class List(Resource):
	def get(self):
		users = get_users_collection();
		col_results = json.loads(dumps(users.find()));
		return jsonify(col_results);


api.add_resource(Register, '/register');
api.add_resource(List, '/list');
api.add_resource(Login, '/login');
api.add_resource(Logout, '/logout');