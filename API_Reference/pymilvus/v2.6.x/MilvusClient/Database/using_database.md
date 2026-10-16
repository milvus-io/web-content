# using_database()

<div class="alert warning">

**Deprecated.**

This method is deprecated. Use [use_database()](use_database.md) instead.

</div>

This operation changes the database currently in use.

## Request Syntax

```python
using_database(
    db_name: str, 
    **kwargs,
)
```

**PARAMETERS:**

- **db_name** (*string*) -

    **[REQUIRED]**

    Name of the database to use.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

**EXCEPTIONS:**

- `MilvusException` - Raised if any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus") # db = "default" 

# Create the database
client.create_database("my_db")

client.using_database("my_db")
```
