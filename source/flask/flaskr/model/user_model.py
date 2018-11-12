import click
from flask import (
	current_app, g, jsonify
)
from flask.cli import with_appcontext


import pymongo
from flaskr.db import get_db

def get_users_collection():
	db = get_db();
	users = pymongo.collection.Collection(db, 'User');
	return users;
