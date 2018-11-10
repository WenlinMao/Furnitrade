# this script will contain the application factory,
# and it tells Python that the flaskr directory
# should be treated as a package.

import os;

from flask import Flask, request, abort, jsonify, send_from_directory;
from config import ProductionConfig;
from flask_cors import CORS
from flask_mail import Message, Mail

def create_app(config_object=ProductionConfig):
    # create and configure the app
    application = Flask(__name__, instance_relative_config=True);

    application.config.from_object(config_object);

    # ensure the instance folder exists
    try:
        os.makedirs(application.instance_path);
    except OSError:
        pass

    # aviod CORS
    cors = CORS(application, resources={r"*": {"origins": "*"}})

    # initialize mailer
    mail = Mail()
    mail.init_app(application)

    # a simple page that says hello
    @application.route('/hello')
    def hello():
        return 'Hello, World!';

    with application.app_context():
        from . import auth
        application.register_blueprint(auth.bp)

    with application.app_context():
        from . import furniture
        application.register_blueprint(furniture.bp)

    # Added User session; By Mao.
    with application.app_context():
        from . import user
        application.register_blueprint(user.bp)

<<<<<<< HEAD
    return application;
=======
    with application.app_context():
        from . import contact_form
        application.register_blueprint(contact_form.bp)



    return application;
>>>>>>> b04e929d79e60b3592126f014529a6ac1ac8cb27
