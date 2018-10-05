class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY='dev'

class ProductionConfig(Config):
    ENV = 'production'
   
class DevelopmentConfig(Config):
    ENV = 'development'
    
class TestingConfig(Config):
    TESTING = True
    