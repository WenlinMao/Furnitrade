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

bp = Blueprint('furniture', __name__, url_prefix='/furniture')
api = Api(bp);


class Post(Resource):
	def post(self):
		pass;

class Delete(Resource):
	def get(self):
		pass;

class Update(Resource):
	def post(self):
		pass;

class Read(Resource):
	def get(self):
		pass;

api.add_resource(Post, '/post');
api.add_resource(Delete, '/delete');
api.add_resource(Update, '/update');
api.add_resource(Read, '/read');




