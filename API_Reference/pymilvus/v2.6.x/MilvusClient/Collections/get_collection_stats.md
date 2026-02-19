# get_collection_stats()

This operation lists the statistics collected on a specific collection.

## Request Syntax

```python
get_collection_stats(
    collection_name: str,
    timeout: Optional[float] = None,
    **kwargs,
) -> Dict
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of a collection.

- **timeout** (*Optional[float]*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

- **\&ast;\&ast;kwargs** -

    Additional keyword arguments for future extensibility.

**RETURN TYPE:**

*dict*

**RETURNS:**

A dictionary containing collected statistics on the specified collection.

```python
{
    'row_count': 0
}
```

<div class="admonition note">

<p><b>why doesn't the row count match the number of entities inserted?</b></p>

<p>The data you insert will undergo processing before it is finally saved. Initially, it will arrive as data streams. Then, it will be stored in segments as entities. Milvus will select an appropriate growing segment to store data in streams until it reaches its upper limit and becomes sealed.</p>
<p>However, note that the displayed row count may not match the number of records inserted, as stream data is not included.</p>

</div>

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

stats = client.get_collection_stats(
    collection_name="my_collection"
)

print(stats)
# Output: {'row_count': 100}
```
