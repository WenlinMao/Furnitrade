import axios from 'axios';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

// TODO: furniture may have muiltiple imgs, whereas user only have one img
// need to be handled separed
export class UploadImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
          img_pathes: [],
        };
    };

    asyncFunction = (token, file, callback) => {
        var key = '';
        let config = {
            headers: {"Authorization": `Bearer ${token}`},
            params: {
                resource_type: this.props.resource_type,
                _id: this.props._id,
                resource_name: file.name,
                file_type: file.type,
            },
        }

        axios.get('http://127.0.0.1:5000/s3/presigned', config)
        .then((response) => {
            let code = response.data.status;
            if (code === 200) {
                const presigned_url = response.data.url;
                key = response.data.key;
                var options = {
                    headers: {
                        'Content-Type': file.type
                    }
                };

                return axios.put(presigned_url, file, options)
            } else if (code === 400) {
                localStorage.removeItem('usertoken');
                // TODO: redirect to login
            }

        })
        .then((result) => {
            console.log("result = ", result)
            if (result.status === 200) {
                callback(key);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    onDrop = (accept_files) => {
        const token = localStorage.getItem('usertoken');
        var new_pathes = this.state.img_pathes.slice();
        var itemsProcessed = 0;

        // for each element in accept_files, call asyncFunction to
        // get the key and also upload the file to s3
        // after all file passed in are processed, the function will
        // set img_pathes state to new array and return through onUploadImg
        // to return a list of img_pathes
        accept_files.forEach((file, index) => {
            this.asyncFunction(token, file, (key) => {
                itemsProcessed++;
                new_pathes.push(key);
                if(itemsProcessed === accept_files.length) {
                    this.setState({img_pathes: new_pathes});
                    this.props.onUploadImg(this.state.img_pathes);
                }
            });
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
