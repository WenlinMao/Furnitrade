import pymongo
from .db import get_db


def get_blacklist_collection():
    db = get_db()
    blacklist = pymongo.collection.Collection(db, 'Blacklist')
    return blacklist


def check_blacklist_token_exist(token):
    blacklist = get_blacklist_collection()
    if blacklist.find_one({'token': token}) is not None:
        return True
    else:
        return False


def add_token_to_blacklist(token):
    blacklist = get_blacklist_collection()
    try:
        blacklist.insert_one({
            "token": token
        })
        return 200
    except Exception as e:
        return e
