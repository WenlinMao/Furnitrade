from functools import wraps
from flask_restful import Api, Resource, url_for

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for,
    jsonify
)

"""
Additional Dependencies Please Add Here
"""
from flaskr.model.contact_form_model import get_contact_form_collection
from flask_mail import Message, Mail
from flaskr import auth

bp = Blueprint('contact_form', __name__, url_prefix='/contact_form')
api = Api(bp)

# take a contact form, send it to seller using mailer
# Need seller id, buyer id, title, and Message
# buyer's id can be obtained from session, seller's
# id has to be passed in by frontend. Frontend can get
# it from furniture details


class Contact(Resource):
    @auth.login_required
    def post(self):
        pass

# take an id of contact form and delete it


class Delete(Resource):
    @auth.login_required
    def get(self, contact_form_id):
        pass

# take an id return detailed contact form info


class Detail(Resource):
    @auth.login_required
    def get(self, contact_form_id):
        pass


api.add_resource(Contact, '/contact')
api.add_resource(Delete, '/delete/<string:contact_form_id>')
api.add_resource(Detail, '/detail/<string:contact_form_id>')
