# list_row_policies()

Lists the row-level security (RLS) policies defined on the specified collection.

## Request Syntax

```python
list_row_policies(
    collection_name: str,
    db_name: Optional[str] = None,
    timeout: Optional[float] = None,
    **kwargs,
) -> List[Dict]
```

**PARAMETERS:**

- **collection_name** (*str*) -
**[REQUIRED]**
The name of the collection whose policies are to be listed.

- **db_name** (*str* | *None*) -
Default: `None`
The name of the database that hosts the target collection. When omitted, the client's current database is used.

- **timeout** (*Optional[float]*) -
Default: `None`
The maximum time, in seconds, to wait for the RPC to complete.

- **kwargs** (*Any*) -
The additional request context options.

**RETURN TYPE:**

*list*

**RETURNS:**

A list of dictionaries containing the policy definitions, with protobuf enum names for the policy type and actions.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Example

Demonstrates row policy listing.

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

res = client.list_row_policies(
    collection_name="my_collection",
)
print(res)
```
