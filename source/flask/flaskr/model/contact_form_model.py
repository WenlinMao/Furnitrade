import pymongo
from .db import get_db


def get_contact_form_collection():
    db = get_db()
    contack_form = pymongo.collection.Collection(db, 'Contact_Form')
    return contack_form

def find_contact_form_by_id(contact_form_id):
	contact_forms = get_contact_form_collection();
	return contact_forms.find_one({'_id': ObjectId(contact_form_id)})

def delete_contact_form_by_id(contact_form_id):
	contact_forms = get_contact_form_collection()
	return contact_forms.delete_one({'_id': ObjectId(contact_form_id)})

