import axios from 'axios';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

export class UploadImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
          // img_pathes: [],
          filesToBeSent: [],
          filesPreview: [],
          printcount: this.props.limit,
        };
    };

    asyncFunction = (token, _id, file, callback) => {
        var key = '';
        let config = {
            headers: {"Authorization": `Bearer ${token}`},
            params: {
                resource_type: this.props.resource_type,
                _id: _id,
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

    beginUpload = (_id) => {
        const token = localStorage.getItem('usertoken');
        var new_pathes = [];
        var files_array = this.state.filesToBeSent;
        var itemsProcessed = 0;
        console.log(files_array)
        // for each element in accept_files, call asyncFunction to
        // get the key and also upload the file to s3
        // after all file passed in are processed, the function will
        // set img_pathes state to new array and return through onUploadImg
        // to return a list of img_pathes
        files_array.forEach((file, index) => {
            this.asyncFunction(token, _id, file, (key) => {
                itemsProcessed++;
                new_pathes.push(key);
                if(itemsProcessed === files_array.length) {
                    // TODO: Memory Leak: setState doesn't work
                    // this.setState({img_pathes: new_pathes});
                    this.props.onUploadImg(new_pathes);
                }
            });
        });
    }

    handleClear = () => {

    }

    // while files are dropped, execute store files in component state
    onDrop = (accept_files) => {

        var filesToBeSent=this.state.filesToBeSent;

        if(filesToBeSent.length + accept_files.length <= this.state.printcount){
            accept_files.forEach((file) => {
                filesToBeSent.push(file);
            })
            var filesPreview=[];
            for(var i in filesToBeSent){
                filesPreview.push(
                    <div>
                        {filesToBeSent[i].name}
                        <button onClick={this.handleClear}> Clear </button>
                    </div>
                )
            }
            this.setState({filesToBeSent,filesPreview});
            console.log(this.state.filesToBeSent)
            this.props.beforeUpload(this.state.filesToBeSent);
        }
        else{
            console.log(filesToBeSent)
            alert("You have reached the limit of uploading " + this.state.printcount
                   + " file at a time")
        }

    };

    render() {
        return (
            <div>
                <Dropzone
                    onDrop={this.onDrop}
                    disabled={this.props.disabled}
                    accept="image/jpeg, image/png" >
                        <p>Drop your image here or click to select one.</p>
                </Dropzone>
                Files to be printed are:
                {this.state.filesPreview}
            </div>
        );
    };
};

UploadImg.defaultProps = {
  disabled: false,
  limit: 1,
  beforeUpload: (files) => void(0)
};