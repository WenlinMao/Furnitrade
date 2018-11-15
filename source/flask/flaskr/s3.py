import boto3

from flask_restful import Api, Resource, reqparse

from flask import (
    Blueprint, jsonify, current_app
)

from flaskr import auth

bp = Blueprint('s3', __name__, url_prefix='/s3')
api = Api(bp)

# Define parser and request args
parser = reqparse.RequestParser()
parser.add_argument('resource_type', type=str)
parser.add_argument('resource_name', type=str)


class GeneratePresigned(Resource):
    # @auth.login_required
    def get(self):
        # Get the service client.
        args = parser.parse_args()
        resource_type = args['resource_type']
        resource_name = args['resource_name']

        s3 = boto3.client(
            's3',
            aws_access_key_id=current_app.config['S3_KEY'],
            aws_secret_access_key=current_app.config['S3_SECRET']
        )

        # Generate the URL to get 'key-name' from 'bucket-name'
        url = s3.generate_presigned_url(
            ClientMethod='put_object',
            Params={
                'Bucket': current_app.config['S3_BUCKET'],
                'Key': resource_type + "/" + resource_name + "/img",
                'Expires': 60
            }
        )
        return jsonify({
            "status": 200,
            "url": url
        })


api.add_resource(GeneratePresigned, '/presigned')
