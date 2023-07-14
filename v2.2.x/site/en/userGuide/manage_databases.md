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

database = db.create_database("book")
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

## Use the RBAC with database

RBAC also covers database operations and ensures forward compatibility. The word **database** in the Permission APIs (Grant / Revoke / List Grant) has the following meanings:

- If neither a Milvus connection nor a Permission API call specifies a `db_name`, **database** refers to the default database.
- If a Milvus connection specifies a `db_name`, but a Permission API call afterward does not, **database** refers to the database whose name was specified in the Milvus connection.
- If a Permission API call is made upon a Milvus connection, with or without `db_name` specified, **database** refers to the database whose name was specified in the Permission API call.

The following code snippet is shared among the listed blocks below.

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

- If neither a Milvus connection nor a Permission API call specifies a `db_name`, **database** refers to the default database.

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

- If a Milvus connection specifies a `db_name`, but a Permission API call afterward does not, **database** refers to the database whose name was specified in the Milvus connection.

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

- If a Permission API call is made upon a Milvus connection, with or without `db_name` specified, **database** refers to the database whose name was specified in the Permission API call.

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
