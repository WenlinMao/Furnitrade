import pymongo
from .db import get_db
from bson.objectid import ObjectId


def get_category_collection():
    db = get_db()
    category = pymongo.collection.Collection(db, 'Category')
    return category


def get_category_by_catname(category_name):
    '''
    input: category_name
    return: get the certain category
    TODO: error checking.
    '''
    categories = get_category_collection()
    return categories.find_one({"category_name": category_name})

def find_category_by_id(category_id):
    category = get_category_collection()
    return category.find_one({'_id': ObjectId(category_id)})

def update_category_by_id(category_id, furniture_id, upsert=False):
    """
    :type user_id: string, category: document (furniture_id as a list)
    :rtype: UpdateResult object
    """
    categories = get_category_collection()
    return categories.update_one({'_id': ObjectId(category_id)}, \
    {"$addToSet": {'furniture_id': furniture_id}})
