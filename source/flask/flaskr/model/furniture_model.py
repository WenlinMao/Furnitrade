import pymongo
from .db import get_db
from bson.objectid import ObjectId


def get_furniture_collection():
    db = get_db()
    furniture = pymongo.collection.Collection(db, 'Furniture')
    return furniture


def update_furniture_by_id(furniture_id, update, upsert=False):
    """
    :type user_id: string, update: document as json, upsert:bool
    :rtype: UpdateResult object
    """
    furnitures = get_furniture_collection()

    return furnitures.update_one(
        {'_id': ObjectId(furniture_id)}, {"$set": update}
    )


def add_furniture(input):
    """
    :type input: document
    :rtype: InsertOneResult object
    """
    furnitures = get_furniture_collection()
    return furnitures.insert_one(input)


def find_furniture_by_id(furniture_id):
    furnitures = get_furniture_collection()
    return furnitures.find_one({'_id': ObjectId(furniture_id)})


def delete_furniture_by_id(furniture_id):
    furnitures = get_furniture_collection()
    return furnitures.delete_one({'_id': ObjectId(furniture_id)})


def find_all_furnitures():
    furnitures = get_furniture_collection
    return furnitures.find()


def find_furniture_by_info(info):
    """
    Fing a furniture by infomation. All registed json field
    Return furniture id
    """
    furnitures = get_furniture_collection()
    furniture = furnitures.find_one(info)
    return str(furniture.get('_id'))


# def add_furniture(input):
#     """
#     :type input: document
#     :rtype: InsertOneResult object
#     """
#     furnitures = get_furniture_collection()
#     return furnitures.insert_one(input)
