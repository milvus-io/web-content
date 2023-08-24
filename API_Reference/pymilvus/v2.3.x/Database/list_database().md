# list_database()

This method lists existing databases, including the default one created upon the Milvus start-up.

## Invocation

```python
list_database(using="default", timeout=None)
```

## Parameters

| Parameters | Description                        | Type    | Required |
|------------|------------------------------------|---------|----------|
| using      | Alias of a connection              | String  | False    |
| timetout   | Timeout duration of this operation | Integer | False    |

## Returns

A list of database names

## Examples

```python
from pymilvus import connections, db

conn = connections.connect(host="127.0.0.1", port=19530)

db.list_database("")

## Output
["default", "books"]
```