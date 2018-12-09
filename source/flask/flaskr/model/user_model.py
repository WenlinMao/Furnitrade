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
    return users.update_one({'_id': ObjectId(user_id)}, {"$set": update})


def add_user_by_id(user_id, update, upsert=False):
    """
    :type user_id: string, update: document, upsert: bool
    :rtype: UpdateResult object
    """
    users = get_users_collection()
    return users.update_one({'_id': ObjectId(user_id)}, {"$set": update})


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


def add_wishlist_by_id(user_id, furniture_id, upsert=False):
    """
    :type user_id: string, furniture_id: string
    :rtype: AddedResult object
    Here addToSet already handles duplicates.
    """
    users = get_users_collection()
    return users.update_one({'_id': user_id},
                            {"$addToSet": {'wishlist': furniture_id}})


def delete_wishlist_by_id(user_id, furniture_id, delete_all=False,
                          upsert=False):
    """
    :type user_id: string, furniture_id: string
    :rtype: removed Result object
    This can either remove one or remove all wishlists.
    """
    users = get_users_collection()
    if not delete_all:
        ops = "$pull"
    else:
        ops = "$pullAll"

    return users.update_one({'_id': user_id},
                            {ops: {'wishlist': furniture_id}})


def delete_my_furniture_by_id(user_id, furniture_id, delete_all=False,
                              upsert=False):
    """
    :type user_id: string, furniture_id: string
    :rtype: removed Result object
    This can either remove one or remove all wishlists.
    """
    users = get_users_collection()
    if not delete_all:
        ops = "$pull"
    else:
        ops = "$pullAll"

    return users.update_one({'_id': user_id},
                            {ops: {'my_furnitures': furniture_id}})


def add_history_by_id(user_id, furniture_id, upsert=False):
    """
    :type user_id: string, history: document (history as a list)
    :rtype: UpdateResult object
    """
    users = get_users_collection()
    return users.update_one({'_id': user_id},
                            {"$addToSet": {'history': furniture_id}})


def clear_history(user_id, history, upsert=False):
    """
    :type user_id: string, furniture_id: string
    :rtype: removed Result object
    This can either remove one or remove all history.
    """
    users = get_users_collection()

    return users.update_one({'_id': user_id},
                            {"$pullAll": {'history': history}})


def add_my_furniture_by_id(user_id, furniture_id, upsert=False):
    """
    :type user_id, furniture_id: strings
    :rtype added to my furniture list status
    """
    users = get_users_collection()
    return users.update_one({'_id': user_id}, {"$addToSet": {
        "my_furnitures": furniture_id
    }})
