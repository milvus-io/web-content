# use_database()

This operation switches the client to use a different database. Future operations will use the specified database. The method validates that the database exists before switching.

<div class="alert note">

This is an alias method for [`using_database()`](using_database.md).

</div>

## Request syntax

```python
client.use_database(
    db_name: str
)
```

**PARAMETERS:**

- **db_name** (*str*) -

    **[REQUIRED]**

    The name of the database to switch to.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when the database does not exist (error code 800).

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

# Create a database if it does not exist
if "my_database" not in client.list_databases():
    client.create_database(db_name="my_database")

# Switch to the database
client.use_database(db_name="my_database")

# Subsequent operations will use "my_database"
collections = client.list_collections()
```
