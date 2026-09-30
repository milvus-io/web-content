# drop_collection_field()

This operation removes a field from an existing collection schema by field name or field ID.

## Request Syntax

```python
drop_collection_field(
    self,
    collection_name: str,
    field_name: str = "",
    field_id: int = 0,
    timeout: Optional[float] = None,
    **kwargs,
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    The name of the target collection.

- **field_name** (*str*) -

    The field name to remove. Provide this when you identify the field by name.

- **field_id** (*int*) -

    The field ID to remove. Use this when your workflow tracks schema by field ID.

- **timeout** (*Optional[float]*) -

    The timeout for this operation in seconds.

- **kwargs** (*dict*) -

    Additional request options passed to the underlying RPC.

**RETURN TYPE:**

*NoneType*

This operation does not return data.

**EXCEPTIONS:**

- **MilvusException**

    Raised when the collection does not exist, the field cannot be resolved, or the request fails.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

client.drop_collection_field(
    collection_name="products",
    field_name="legacy_score",
)
```
