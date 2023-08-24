# using_database()

This method changes the default database.

A Milvus cluster ships with a default database named `default`. All collection operations are performed within the default database. You can use this method to change the default database.

## Invocation

```python
using_database(db_name, using="default")
```

## Parameters

| Parameters | Description                     | Type   | Required |
|------------|---------------------------------|--------|----------|
| db_name    | Name of the data to be created. | String | True     |
| using      | Alias of a connection           | String | False    |

## Returns

No returns

## Examples

```python
from pymilvus import connections, db

conn = connections.connect(host="127.0.0.1", port=19530)

db.using_database("books")

## You can directly use a database upon the connection as follows.
## However, the specified database should exist beforehand.
conn = connections.connect(host="127.0.0.1", port=19530, db_name="books")
```
