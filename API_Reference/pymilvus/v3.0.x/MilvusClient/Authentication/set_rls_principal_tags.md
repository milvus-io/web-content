# set_rls_principal_tags()

Incrementally upserts a non-empty mapping of row-level security (RLS) principal tags on the specified collection.

## Request Syntax

```python
set_rls_principal_tags(
    collection_name: str,
    principal_name: str,
    tags: Mapping[str, Any],
    db_name: Optional[str] = None,
    timeout: Optional[float] = None,
    **kwargs,
) -> None
```

**PARAMETERS:**

- **collection_name** (*str*) -
**[REQUIRED]**
The name of the collection on which the tags are stored.

- **principal_name** (*str*) -
**[REQUIRED]**
The name of the application principal to which the tags apply.

- **tags** (*Mapping[str, Any]*) -
**[REQUIRED]**
A non-empty mapping of principal tags. Values may be strings, finite numbers, or one-dimensional arrays of strings or numbers. Milvus checks homogeneity and numeric precision. Keys omitted from this call retain their previous values.

- **db_name** (*str* | *None*) -
Default: `None`
The name of the database that hosts the target collection. When omitted, the client's current database is used.

- **timeout** (*Optional[float]*) -
Default: `None`
The maximum time, in seconds, to wait for the RPC to complete.

- **kwargs** (*Any*) -
The additional request context options.

**RETURN TYPE:**

*None*

**RETURNS:**

Returns no value after the tags are set.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Example

Demonstrates principal tag setting.

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

client.set_rls_principal_tags(
    collection_name="my_collection",
    principal_name="u_1",
    tags={"user_id": "u_1"},
)
```
