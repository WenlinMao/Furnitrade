# this script will contain the application factory,
# and it tells Python that the flaskr directory 
# should be treated as a package.

import os;

from flask import Flask, request, abort, jsonify, send_from_directory;
from config import ProductionConfig;

def create_app(config_object=ProductionConfig):
    # create and configure the app
    application = Flask(__name__, instance_relative_config=True);

    application.config.from_object(config_object);
    
    # ensure the instance folder exists
    try:
        os.makedirs(application.instance_path);
    except OSError:
        pass

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


    return application;