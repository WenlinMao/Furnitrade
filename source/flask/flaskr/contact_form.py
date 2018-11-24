from flask_restful import Api, Resource

from flask import (
    Blueprint, jsonify, current_app, request, render_template
)

"""
Additional Dependencies Please Add Here
"""
from flaskr.model.contact_form_model import get_contact_form_collection
from flask_mail import Message
from flaskr import mail
from flaskr import auth

bp = Blueprint('contact_form', __name__, url_prefix='/contact_form')
api = Api(bp)


class Contact(Resource):
    '''
    take a contact form, send it to seller using mailer
    Need seller id, buyer id, title, and Message
    buyer's id can be obtained from session, seller's
    id has to be passed in by frontend. Frontend can get
    it from furniture details
    '''
    @auth.login_required
    def post(self, user):
        posted_data = request.get_json()
        title = posted_data["title"]
        seller_id = posted_data["seller_id"]
        content = posted_data["content"]
        furniture_id = posted_data["furniture_id"]
        message_link = posted_data["message_link"]

        buyer_email = user["email"]
        buyer_username = user["username"]

        seller = find_user_by_id(seller_id)
        if seller is None:
            return jsonify({
                "status": 312,
                "msg": "User doesn't exist"
            })
        seller_email = seller["email"]
        seller_username = seller["username"]

        msg = Message(
            title,
            recipients=[seller_email],
            html=render_template(
                './templates/contact_email.html',
                seller_username=seller_username,
                buyer_username=buyer_username,
            ),
            sender=('furnitrade', current_app.config['MAIL_DEFAULT_SENDER'])
        )
        mail.send(msg)


class Delete(Resource):
    '''
    take an id of contact form and delete it
    '''
    @auth.login_required
    def get(self, user, contact_form_id):
        contact_form = find_contact_form_by_id(contact_form_id)

        if contact_form is None:
            return jsonify({
                "status": 320,
                "msg": "Can not find the contact form"
                })

        result = delete_contact_form_by_id(contact_form_id)

        return jsonify({
            "status": 200,
            "msg": "Delete succeded"
            })


class Detail(Resource):
    '''
    take an id return detailed contact form info
    '''
    @auth.login_required
    def get(self, user, contact_form_id):
        contact_form = find_contact_form_by_id(contact_form_id);

        if contact_form is None:
            return jsonify({
                "status": 320,
                "msg": "Can not find the contact form"
                })
        email = contact_form["buyer's_email"]
        phone = contact_form["buyer's_phone_number"]
        content = contact_form["content"]

        retJson = {
            "status": 200,
            "msg": "Get contact form succeded",
            "buy's_email": email,
            "buyer's_phone_number": phone,
            "content": content
        }

        return jsonify(retJson)


api.add_resource(Contact, '/contact')
api.add_resource(Delete, '/delete/<string:contact_form_id>')
api.add_resource(Detail, '/detail/<string:contact_form_id>')
