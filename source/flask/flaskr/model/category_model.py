import pymongo
from .db import get_db


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