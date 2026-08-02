# describe_role()

Response now exposes the role description. Async variant shares the sync method parameter and response contract. Intermediate wrapper field converted into the public describe_role() response dictionary.

## Request Syntax

```python
describe_role(
    role_name: str,
    timeout: Optional[float] = None,
    **kwargs,
) -> dict
```

**PARAMETERS:**

- **role_name** (*str*) -
**[REQUIRED]**
The name of the role to describe.

- **timeout** (*Optional[float]*) -
Default: `None`
The maximum time, in seconds, to wait for the RPC to complete.

- **kwargs** (*Any*) -
The additional request context options.

**RETURN TYPE:**

*dict*

**RETURNS:**

Dictionary with role, description, and privileges.

**EXCEPTIONS:**

- **MilvusException**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples

Demonstrates describe role usage.

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")
client.create_user("analyst", "Milvus123", description="Analytics account")
client.update_user("analyst", description="Updated analytics account")
client.create_role("read_only", description="Read-only role")
client.alter_role("read_only", description="Updated read-only role")
print(client.describe_user("analyst"))
print(client.describe_role("read_only"))
```
