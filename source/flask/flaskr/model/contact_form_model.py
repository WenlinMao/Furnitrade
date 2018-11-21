import pymongo
from .db import get_db


def get_contact_form_collection():
    db = get_db()
    contack_form = pymongo.collection.Collection(db, 'Contact_Form')
    return contack_form
