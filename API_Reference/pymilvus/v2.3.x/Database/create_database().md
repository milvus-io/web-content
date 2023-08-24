# create_database()

This method creates a database.

## Invocation

```python
create_database(db_name, using="default", timeout=None)
```

## Parameters

| Parameters | Description                        | Type    | Required |
|------------|------------------------------------|---------|----------|
| db_name    | Name of the data to be created.    | String  | True     |
| using      | Alias of a connection              | String  | False    |
| timetout   | Timeout duration of this operation | Integer | False    |

## Returns

No returns

## Examples

```python
from pymilvus import connections, db

conn = connections.connect(host="127.0.0.1", port=19530)

db.create_database("books")
```
