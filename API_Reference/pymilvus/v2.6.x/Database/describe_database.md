# describe_database()

This operation lists detailed information about the specified database.

## Request Syntax

```python
describe_database(
    db_name: str, 
    timeout: Optional[float] = None,
    **kwargs,
) -> Dict
```

**PARAMETERS:**

- **db_name** (*string*) -

    **[REQUIRED]**

    Name of the database to describe.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to *None* indicates that it timeouts when a response arrives, or an error occurs.

**RETURN TYPE:**

*Dict*

**RETURNS:**

A dictionary that contains detailed information about the specified database.

**EXCEPTIONS:**

- `MilvusException` - Raised if any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(uri, token) # db = "default" 

client.describe_database(
    db_name="my_db"
)

# {
#   "name": "my_db",
#   "a": "b",
#.  "c": "d",
# }
```
