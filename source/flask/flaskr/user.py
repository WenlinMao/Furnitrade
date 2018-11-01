from flaskr.db import get_db
import pymongo
from bson.json_util import dumps
import json

########### Additional Dependencies Please Add Here ###################
from flask_httpauth import HTTPBasicAuth

bp = Blueprint('user', __name__)
api = Api(bp);
auth = HTTPBasicAuth()

@auth.verify_password
def verify():
    if "user_id" in session:
        return True
    return False

# take an id of user, delete from database
class Delete(Resource):
	@auth.login_required
	def get(self):
		pass;

# take revised info, change profile info in database
# Get userID from session. Then parse basic infos. And Overwrite
# perhaps using pymongo. Due by SAT; Mao Li.
class Edit(Resource):
	@auth.login_required
	def post(self):
		pass;

# take an id return user info
# Get all user related info in database as JSON file.
class Profile(Resource):
    @auth.login_required
	def get(self):
		pass;

api.add_resource(Delete, '/delete');
api.add_resource(Edit, '/edit');
api.add_resource(Profile, '/profile/<string:username>');
