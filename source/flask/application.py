from flaskr import create_app
from config import DevelopmentConfig

application = create_app(DevelopmentConfig)

if __name__ == "__main__":
    application.run()
