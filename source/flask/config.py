import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = 'CSE110!Wenlin'
    TOKEN_EXPIRE_HOURS = 1
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = 'furnitradeftp@gmail.com'
    MAIL_PASSWORD = 'furnitrade110'
    S3_KEY = 'AKIAIZQK2ON2EX4LDENA'
    S3_SECRET = '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'


class ProductionConfig(Config):
    ENV = 'production'
    MONGODB_DATABASE_URI = 'mongodb+srv://admin:CSE110!Gary@cluster0-lzui4.mongodb.net/Prod?retryWrites=true'
    S3_BUCKET = 'furnitrade-prod-attachments'
    DATABASE = "Prod"


class DevelopmentConfig(Config):
    ENV = 'development'
    DEBUG = True
    MONGODB_DATABASE_URI = 'mongodb+srv://admin:CSE110!Gary@cluster0-lzui4.mongodb.net/Dev?retryWrites=true'
    S3_BUCKET = 'furnitrade-dev-attachments'
    DATABASE = "Dev"
    FRONTEND_DOMAIN = "http://localhost:3000/"


class TestingConfig(Config):
    TESTING = True
    MONGODB_DATABASE_URI = 'mongodb+srv://admin:CSE110!Gary@cluster0-lzui4.mongodb.net/test?retryWrites=true'
    DATABASE = "test"


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,

    'default': DevelopmentConfig
}
