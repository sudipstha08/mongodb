## Commands

1. show dbs

- List databases

2. use database_name

- to use the database

3. show collections

-

5. mongosh
6. db.dropDatabase()

- deletes current database

5. cls

- clear terminal screen

6. exit

- exits from mongosh

7. db

- show current database

- sudo systemctl start mongod
- sudo systemctl status mongod
- sudo service mongod restart

## CRUD Operations

- https://www.mongodb.com/docs/manual/crud/
- https://www.tutorialspoint.com/mongodb/index.htm

## lack of permissions on mongodb's internal folders.

```
Try to check/set:

chown -R mongodb:mongodb /var/lib/mongodb
chown mongodb:mongodb /tmp/mongodb-27017.sock
```
