import pymongo
from .db import get_db
from bson.objectid import ObjectId


def get_users_collection():
    db = get_db()
    users = pymongo.collection.Collection(db, 'User')
    return users


def find_user_by_email(email):
    """
    :type email: string
    :rtype: user object
    """
    users = get_users_collection()
    return users.find_one({"email": email})


def find_user_by_username(username):
    """
    :type username: string
    :rtype: user object
    """
    users = get_users_collection()
    return users.find_one({"username": username})


def find_user_by_id(user_id):
    """
    :type user_id: string
    :rtype: user object
    """
    users = get_users_collection()
    return users.find_one({'_id': ObjectId(user_id)})


def add_user(input):
    """
    :type input: document
    :rtype: InsertOneResult object
    """
    users = get_users_collection()
    return users.insert_one(input)


def find_all_users():
    """
    :type None
    :rtype: documents
    """
    users = get_users_collection()
    return users.find()


def update_user_by_id(user_id, update, upsert=False):
    """
    :type user_id: string, update: document, upsert: bool
    :rtype: UpdateResult object
    """
    users = get_users_collection()
    return users.update_one({'_id': user_id}, {"$set": update})


def delete_user_by_id(user_id):
    """
    :type user_id: string
    :rtype: DeleteResult object
    """
    users = get_users_collection()
    return users.delete_one({'_id': user_id})


def delete_user_by_username(username):
    """
    :type user_id: string
    :rtype: DeleteResult object
    """
    users = get_users_collection()
    return users.delete_one({'username': username})
