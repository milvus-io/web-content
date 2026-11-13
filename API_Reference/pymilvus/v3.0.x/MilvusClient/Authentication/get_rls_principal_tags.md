# get_rls_principal_tags()

Returns the decoded row-level security (RLS) principal tags stored on the specified collection, preserving integer, float, and array values.

## Request Syntax

```python
get_rls_principal_tags(
    collection_name: str,
    principal_name: str,
    db_name: Optional[str] = None,
    timeout: Optional[float] = None,
    **kwargs,
) -> Dict[str, Any]
```

**PARAMETERS:**

- **collection_name** (*str*) -
**[REQUIRED]**
The name of the collection on which the tags are stored.

- **principal_name** (*str*) -
**[REQUIRED]**
The name of the application principal whose tags are to be returned.

- **db_name** (*str* | *None*) -
Default: `None`
The name of the database that hosts the target collection. When omitted, the client's current database is used.

- **timeout** (*Optional[float]*) -
Default: `None`
The maximum time, in seconds, to wait for the RPC to complete.

- **kwargs** (*Any*) -
The additional request context options.

**RETURN TYPE:**

*dict*

**RETURNS:**

A dictionary containing the principal tags, with integer, float, and array values preserved.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Example

Demonstrates principal tag retrieval.

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

res = client.get_rls_principal_tags(
    collection_name="my_collection",
    principal_name="u_1",
)
print(res)
```
