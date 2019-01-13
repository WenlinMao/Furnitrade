# Furnitrade

[![Language grade: Python](https://img.shields.io/lgtm/grade/python/g/WenlinMao/Furnitrade.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/WenlinMao/Furnitrade/context:python)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/WenlinMao/Furnitrade.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/WenlinMao/Furnitrade/context:javascript)

### Developer

FTP (Furniture Trade Platform)

### Dependencies
* ReactJS: https://reactjs.org
* MongoDB: https://www.mongodb.com Please go to MongoDB.com to download the latest version of Mongo DB.
* Flask: http://flask.pocoo.org/docs/1.0/installation/#installation refer this page to install Flask for back-end developing
  Please do use virtual environment for the dependencies so that python will not messed up with other projects' dependencies
* http://api.mongodb.com/python/current/installation.html PyMongo: Driver for mongoDB, please follow the instruction to
  install in virtual environment

To assist your development, recommend have the following development tools:

* Chrome: https://chrome.com For front-end debugging
* Postman: https://getpostman.com For back end development
* Robo3T: https://robomongo.org For Mongo DB Management

### Deploy on localhost from noting
##### Clone from github
1. clone from https://github.com/WenlinMao/cse110-project using `git clone https://github.com/WenlinMao/cse110-project.git`
2. input username and password for github if asked
##### Set up flask for Backend
3. navigate to source/flask
4. run `python3 -m venv venv` to create an empty virtual environment
5. activate virtual using `. venv/bin/activate`
6. within virtual environment run `pip install -r requirements.txt`
7. run `python3 application.py` and make sure there is no error
##### Set up React.js for Frontend
8. open a new terminal and remain application.py executed
9. navigate to source/react
10. download the newest npm through https://www.npmjs.com/get-npm
11. use `npm -v` to check if npm has installed
12. run `npm install` to install all packages
13. run `npm run start` to start to frontend server
14. click OK if your computer ask for permission
15. our website will be automatically opened in Chrome (or your default browser)

p.s: Currently, our website only works with Chrome. If it opens in other browsers, please just copy the url and put it in Chrome.

### Troubleshooting
* Sometimes uploading image takes longer than page loading due to the speed of AWS S3. Please wait a few seconds after adding new furniture or new user. If the newly added furniture or user still doesn't load, please try to wait a few seconds and refresh the page.
* Sometimes pymongo will throw timeout error. This is because of the poor network connection. Try switch to another wifi and try again.  
* All error output can be viewed in Chrome or flask prompts. Please try to fix bugs refer to the error message.
* If there are any other problems, please try to reinstall react or flask on the devises.

### Test Data
* Account 1:
```
username: xxxxxx
email: xxxxxx@ucsd.edu
address: xxxxman dr.
password: Xxxxxx123!
```
* Account 2:
```
username: Testxxxxxx
email: w6mao@ucsd.edu
address: Peterson Hall
password: Wenlin1997@
```

### Video Demo
Youtube Link: https://www.youtube.com/watch?v=7hTTqTOZBfY&t=76s
