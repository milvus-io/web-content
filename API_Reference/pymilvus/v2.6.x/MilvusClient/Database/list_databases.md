# list_databases()

This operation lists all existing databases.

## Request Syntax

```python
list_databases(
    timeout: Optional[float] = None,
    **kwargs,
) -> [] string
```

**PARAMETERS:**

- **db_name** (*string*) -

    **&#91;REQUIRED&#93;**

    Name of the database to drop.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to *None* indicates that it timeouts when a response arrives or an error occurs.

**RETURN TYPE:**

*&#91;&#93;string*

**RETURNS:**

A list of database names.

**EXCEPTIONS:**

- `MilvusException` - Raised if any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(uri, token) # db = "default" 

db_list = client.list_databases()
print(db_list)
# ["my_database", "default"]
```
