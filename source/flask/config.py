import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
	DEBUG = False
	TESTING = False
	SECRET_KEY='CSE110!Wenlin'

class ProductionConfig(Config):
	ENV = 'production'
	MONGODB_DATABASE_URI = 'mongodb+srv://admin:CSE110!Gary@cluster0-lzui4.mongodb.net/Prod?retryWrites=true';
	DATABASE = "Prod";

class DevelopmentConfig(Config):
	ENV = 'development'
	MONGODB_DATABASE_URI = 'mongodb+srv://admin:CSE110!Gary@cluster0-lzui4.mongodb.net/Dev?retryWrites=true';
	DATABASE = "Dev";


class TestingConfig(Config):
	TESTING = True
	MONGODB_DATABASE_URI = 'mongodb+srv://admin:CSE110!Gary@cluster0-lzui4.mongodb.net/test?retryWrites=true';
	DATABASE = "test";

config = {
	'development': DevelopmentConfig, 
	'testing': TestingConfig, 
	'production': ProductionConfig,

	'default': DevelopmentConfig 
}
