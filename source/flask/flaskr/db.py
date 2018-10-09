import pymongo

mongo = pymongo.MongoClient('mongodb+srv://admin:CSE110!Gary@cluster0-lzui4.mongodb.net/test?retryWrites=true', maxPoolSize=50, connect=False)

# data base name : 'test-database-1'
mydb = client['test-database-1']

import datetime

myrecord = {
        "author": "Duke",
        "title" : "PyMongo 101",
        "tags" : ["MongoDB", "PyMongo", "Tutorial"],
        "date" : datetime.datetime.utcnow()
        }

record_id = mydb.mytable.insert(myrecord)

print record_id
print mydb.collection_names()