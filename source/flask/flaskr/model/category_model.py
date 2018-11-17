import pymongo
from .db import get_db


def get_category_collection():
    db = get_db()
    category = pymongo.collection.Collection(db, 'Category')
    return category
