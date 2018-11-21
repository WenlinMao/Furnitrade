import pymongo
from .db import get_db


def get_furniture_collection():
    db = get_db()
    furniture = pymongo.collection.Collection(db, 'Furniture')
    return furniture
