# delete_rls_principal_tags()

Deletes selected row-level security (RLS) principal tag keys, or all tags when no tag keys are specified.

## Request Syntax

```python
delete_rls_principal_tags(
    collection_name: str,
    principal_name: str,
    tag_keys: Optional[List[str]] = None,
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
The name of the application principal whose tags are to be deleted.

- **tag_keys** (*list[str]* | *None*) -
Default: `None`
The tag keys to delete. When `None` or empty, all tags of the principal are deleted.

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

Returns no value after the tags are deleted.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Example

Demonstrates principal tag deletion.

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

client.delete_rls_principal_tags(
    collection_name="my_collection",
    principal_name="u_1",
    tag_keys=["user_id"],
)
```
