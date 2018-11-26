from flask_restful import Api, Resource

from flask import (
    Blueprint, jsonify, current_app, request, render_template
)

"""
Additional Dependencies Please Add Here
"""
from flaskr.model.contact_form_model import (
    add_contact_form, find_contact_form_by_id, delete_contact_form_by_id
)
from flaskr.model.furniture_model import find_furniture_by_id
from flaskr.model.user_model import find_user_by_id
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

        buyer_id = str(user['_id'])
        buyer_email = user['email']
        buyer_username = user['username']

        furniture = find_furniture_by_id(furniture_id)
        if furniture is None:
            return jsonify({
                "status": 319,
                "msg": "Can not find the furniture"
            })
        furniture_name = furniture["furniture_name"]

        seller = find_user_by_id(seller_id)
        if seller is None:
            return jsonify({
                "status": 312,
                "msg": "User doesn't exist"
            })
        seller_email = seller["email"]
        seller_username = seller["username"]

        contact_form = add_contact_form({
            "buyer": buyer_id,
            "seller": seller_id,
            "buyer_email": buyer_email,
            "furniture": furniture_id,
            "content": content,
            "title": title
        })

        msg = Message(
            title,
            recipients=[seller_email],
            html=render_template(
                'contact_email.html',
                seller_username=seller_username,
                buyer_username=buyer_username,
                furniture_name=furniture_name,
                detail_link=current_app.config['FRONTEND_DOMAIN']
                # detail_link="http://localhost:3000/Contact/"
                # + str(contact_form.inserted_id)
            ),
            sender=('Furnitrade', current_app.config['MAIL_USERNAME'])
        )
        mail.send(msg)

        return jsonify({
            "status": 200,
            "msg": "Contact messge successfully send",
            "contact_form_id": str(contact_form.inserted_id)
        })


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

        delete_contact_form_by_id(contact_form_id)

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
        contact_form = find_contact_form_by_id(contact_form_id)

        if contact_form is None:
            return jsonify({
                "status": 320,
                "msg": "Can not find the contact form"
            })
        email = contact_form["buyer_email"]
        content = contact_form["content"]
        title = contact_form["title"]
        furniture_id = contact_form["furniture"]

        retJson = {
            "status": 200,
            "msg": "Get contact form succeded",
            "buyer_email": email,
            "title": title,
            "content": content,
            "furniture": furniture_id,
        }

        return jsonify(retJson)


api.add_resource(Contact, '/contact')
api.add_resource(Delete, '/delete/<string:contact_form_id>')
api.add_resource(Detail, '/detail/<string:contact_form_id>')
