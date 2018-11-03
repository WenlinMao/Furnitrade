from flask import Flask;
from flaskr import create_app;
<<<<<<< HEAD
from config import DevelopmentConfig;
=======
from flaskr.config import DevelopmentConfig;
>>>>>>> b01fcb0a3086d436fdd0c5316a0add7ce5711dc2

application = create_app(DevelopmentConfig);

if __name__ == "__main__":
    application.run()