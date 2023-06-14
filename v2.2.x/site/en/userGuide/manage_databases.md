---
id: manage_databases.md
title: Manage Databases
---

# Manage Databases

Similar to traditional database engines, you can also create databases in Milvus and allocate privileges to certain users to manage them. Then such users have the right to manage the collections in the databases. A Milvus cluster supports a maximum of 64 databases.

## Create database

To create a database, you need to first connect to a Milvus cluster and prepare a name for it:

```python
from pymilvus import connections, db

conn = connections.connect(host="127.0.0.1", port=19530)

database = db.create_database("books")
```

## Use a database

A Milvus cluster ships with a default database, named 'default'. Collections are created in the default database unless otherwise specified.

To change the default database, do as follows:

```python
db.using_database("book")
```

You can also set a database to use upon connecting to your Milvus cluster as follows:

```python
conn = connections.connect(
    host="127.0.0.1",
    port="19530",
    db_name="default"
)
```

## List databases

To find all existing databases in your Milvus cluster, do as follows:

```python
db.list_database()

# Output
['default', 'book']
```

## Drop database

To drop a database, you have to drop all its collections first. Otherwise, the drop fails.

```python
db.drop_database("book")

db.list_database()

# Output
['default']
```

## Use the rbac with database

In order to better understand the following example, here are some common code parts.

```python
from pymilvus import connections, Role

_HOST = '127.0.0.1'
_PORT = '19530'
_ROOT = "root"
_ROOT_PASSWORD = "Milvus"
_ROLE_NAME = "test_role"
_PRIVILEGE_INSERT = "Insert"


def connect_to_milvus(db_name="default"):
    print(f"connect to milvus\n")
    connections.connect(host=_HOST, port=_PORT, db_name=db_name)
```

1. Connect to milvus without db parameter, permission api has no db parameter, use default db

```
connect_to_milvus()
role = Role(_ROLE_NAME)
role.create()

connect_to_milvus()
role.grant("Collection", "*", _PRIVILEGE_INSERT)
print(role.list_grants())
print(role.list_grant("Collection", "*"))
role.revoke("Global", "*", _PRIVILEGE_INSERT)
```

2. Connect to milvus with db parameters, permission api without db parameters, use the db value in the connection

```python
# NOTE: please make sure the 'foo' db has been created
connect_to_milvus(db_name="foo")
# This role will have the insert permission of all collections under foo db,
# excluding the insert permissions of collections under other dbs
role.grant("Collection", "*", _PRIVILEGE_INSERT)
print(role.list_grants())
print(role.list_grant("Collection", "*"))
role.revoke("Global", "*", _PRIVILEGE_INSERT)
```

3. Regardless of whether to connect milvus with db parameters or not, if there are db parameters in the permission api, use the db value in the api

```python
# NOTE: please make sure the 'foo' db has been created
db_name = "foo"
connect_to_milvus()
role.grant("Collection", "*", _PRIVILEGE_INSERT, db_name=db_name)
print(role.list_grants(db_name=db_name))
print(role.list_grant("Collection", "*", db_name=db_name))
role.revoke("Global", "*", _PRIVILEGE_INSERT, db_name=db_name)
```

## What's next

[Enable RBAC](rbac.md)

[Multi-tenancy](multi_tenancy.md)
