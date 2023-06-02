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

## What's next

[Enable RBAC](rbac.md)
[Multi-tenancy](multi-tenancy.md)
