import pymongo
from .db import get_db
from bson.objectid import ObjectId


def get_contact_form_collection():
    db = get_db()
    contack_form = pymongo.collection.Collection(db, 'Contact_Form')
    return contack_form


def find_contact_form_by_id(contact_form_id):
    contact_forms = get_contact_form_collection()
    return contact_forms.find_one({'_id': ObjectId(contact_form_id)})


def delete_contact_form_by_id(contact_form_id):
    contact_forms = get_contact_form_collection()
    return contact_forms.delete_one({'_id': ObjectId(contact_form_id)})


def add_contact_form(input):
    """
    :type input: document
    :rtype: InsertOneResult object
    """
    contact_forms = get_contact_form_collection()
    return contact_forms.insert_one(input)


def group_by_seller_id(user_id, limit=5):
    """
    :type input: ObjectId, limit: int
    :rtype: Cursor object that is
    """
    contact_forms = get_contact_form_collection()
    return contact_forms.find({"seller": str(user_id)}).limit(limit)
