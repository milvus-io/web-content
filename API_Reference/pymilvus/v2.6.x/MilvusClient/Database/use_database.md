# use_database()

This operation switches the client to use a different database. Future operations will use the specified database. The method validates that the database exists before switching.

<div class="admonition note">

<p><b>notes</b></p>

<p>This is an alias method for <a href="./Database-using_database"><code>using_database()</code></a>.</p>

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

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when the database does not exist (error code 800).

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

# Switch to a different database
client.use_database(db_name="my_database")

# Subsequent operations will use "my_database"
collections = client.list_collections()
```
