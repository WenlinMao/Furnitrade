import axios from 'axios';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

// TODO: furniture may have muiltiple imgs, whereas user only have one img
// need to be handled separed
export class UploadImg extends Component {
    constructor(props) {
        super(props);
    };

    onDrop = (accept_files) => {
        const token = localStorage.getItem('usertoken');
        const file = accept_files[0];

        let config = {
            headers: {"Authorization": `Bearer ${token}`},
            params: {
                resource_type: this.props.resource_type,
                resource_name: this.props.name,
            },
        }

        axios.get('http://127.0.0.1:5000/s3/presigned', config)
        .then((response) => {
            let code = response.data.status;
            if (code === 200) {
                console.log("url =  ", response.data.url);
                const presigned_url = response.data.url;
                var options = {
                    headers: {
                        'Content-Type': file.type
                    }
                };
                // now do a PUT request to the pre-signed URL
                // axios.put(presigned_url, file).then((response) => {
                //     console.log("status = ", response.status);
                // })
                // .catch((error) => {
                //     console.log(error);
                // });
                return axios.put(presigned_url, file, options);
            } else if (code === 400) {
                localStorage.removeItem('usertoken');
                // TODO: redirect to login
            }

        })
        .then((result) => {
            console.log("result = ", result)
        })
        .catch((error) => {
          console.log(error);
        });
    };

    render() {
        return (
            <div>
                <Dropzone onDrop={this.onDrop}>
                    <p>Drop your image here or click to select one.</p>
                </Dropzone>
            </div>
        );
    };
};
