# drop_row_policy()

Drops a row-level security (RLS) policy by name. Dropping a missing policy succeeds without raising an error.

## Request Syntax

```python
drop_row_policy(
    collection_name: str,
    policy_name: str,
    db_name: Optional[str] = None,
    timeout: Optional[float] = None,
    **kwargs,
) -> None
```

**PARAMETERS:**

- **collection_name** (*str*) -
**[REQUIRED]**
The name of the collection to which the policy applies.

- **policy_name** (*str*) -
**[REQUIRED]**
The name of the policy to drop.

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

Returns no value after the policy is dropped.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Example

Demonstrates row policy drop.

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

client.drop_row_policy(
    collection_name="my_collection",
    policy_name="p_1",
)
```
