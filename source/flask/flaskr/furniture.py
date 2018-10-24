from flask import (
	Blueprint, flash, g, redirect, render_template, request, session, url_for,
	jsonify
)
from flask_restful import Api, Resource, url_for
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db
import pymongo
from bson.json_util import dumps
import json

########### Additional Dependencies Please Add Here ###################
from flask_httpauth import HTTPBasicAuth

bp = Blueprint('furniture', __name__, url_prefix='/furniture')
api = Api(bp);
auth = HTTPBasicAuth()

@auth.verify_password
def verify():
    if "user_id" in session:
        return True
    return False


# take a form, store information in the database
class Post(Resource):
	def post(self):
		pass;

# take an id of furniture, delete from database
class Delete(Resource):
	@auth.login_required
	def get(self):
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
	def get(self):
		# multiset that takes argument
		args = request.args
		furniture_name = args['furniture_name'];
		pass;

api.add_resource(Post, '/post');
api.add_resource(Delete, '/delete');
api.add_resource(Update, '/update');
api.add_resource(Detail, '/detail');
