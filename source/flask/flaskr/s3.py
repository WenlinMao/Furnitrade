import boto3
from botocore.client import Config

from flask_restful import Api, Resource, reqparse

from flask import (
    Blueprint, jsonify, current_app
)

bp = Blueprint('s3', __name__, url_prefix='/s3')
api = Api(bp)

# Define parser and request args
parser = reqparse.RequestParser()
parser.add_argument('resource_type', type=str)
parser.add_argument('resource_name', type=str)
parser.add_argument('_id', type=str)
parser.add_argument('file_type', type=str)


class GeneratePresigned(Resource):
    # @auth.login_required
    def get(self):
        # Get the service client.
        args = parser.parse_args()
        resource_type = args['resource_type']
        resource_name = args['resource_name']
        _id = args['_id']
        file_type = args['file_type']

        s3_key = resource_type + "/" + _id + "/img/" + resource_name

        s3 = boto3.client(
            's3',
            aws_access_key_id=current_app.config['S3_KEY'],
            aws_secret_access_key=current_app.config['S3_SECRET'],
            config=Config(signature_version='s3v4')
        )

        # Generate the URL to get 'key-name' from 'bucket-name'
        url = s3.generate_presigned_url(
            ClientMethod='put_object',
            Params={
                'Bucket': current_app.config['S3_BUCKET'],
                'Key': s3_key,
                'ContentType': file_type,
            }
        )
        print(url)
        return jsonify({
            "status": 200,
            "url": url,
            "key": s3_key,
        })


api.add_resource(GeneratePresigned, '/presigned')
