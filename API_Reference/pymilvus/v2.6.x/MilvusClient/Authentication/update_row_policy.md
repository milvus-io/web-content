# update_row_policy()

Replaces the named row-level security (RLS) policy definition, preserving its server-side identity. The policy must already exist.

## Request Syntax

```python
update_row_policy(
    collection_name: str,
    policy_name: str,
    policy_type: Union[str, int],
    actions: Union[str, int, List[Union[str, int]]],
    using_expr: str = "",
    check_expr: str = "",
    description: str = "",
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
The name of the policy to update.

- **policy_type** (*str* | *int*) -
**[REQUIRED]**
The type of the policy. Accepts either `permissive` or `restrictive`.

- **actions** (*str* | *int* | *list[str* | *int]*) -
**[REQUIRED]**
The actions covered by the policy. Possible values are `query`, `query_iterator`, `search`, `search_iterator`, `hybrid_search`, `delete`, `insert`, and `upsert`. Note that `get` uses the `query` action.

- **using_expr** (*str*) -
Default: `""`
The expression used to filter rows visible to a principal.

- **check_expr** (*str*) -
Default: `""`
The expression used to validate rows written by a principal.

- **description** (*str*) -
Default: `""`
The optional description of the policy.

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

Returns no value after the policy is updated successfully.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Example

Demonstrates row policy update.

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

client.update_row_policy(
    collection_name="my_collection",
    policy_name="p_1",
    policy_type="permissive",
    actions=["query", "search"],
    using_expr="user_id == 'u_2'",
    description="Allow u_2 to read their own rows",
)
```
