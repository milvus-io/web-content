# get_collection_stats()

This operation lists the statistics collected on a specific collection.

## Request syntax

```python
get_collection_stats(
    collection_name: str, 
    timeout: Optional[float] = None
) -> Dict
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of a collection.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

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

<p><b>**why doesn't the row count match the number of entities inserted?**</b></p>

<p>The data that you insert will go through a process before it is finally saved: Initially, it will flow in as data streams. Then, it will be stored in segments as entities. Milvus will select an appropriate growing segment to store the data in streams until the segment reaches its upper limit and becomes sealed.</p>
<p>However, it's important to note that the row count displayed may not match the number of records that were inserted because data in streams is not taken into account.</p>

</div>

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient

# 1. Set up a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a collection
client.create_collection(collection_name="test_collection", dimension=5)

# 3. Describe the collection
client.get_collection_stats(collection_name="test_collection")

# Output
# 
# {
#     'row_count': 0
# }
```

## Related methods

- [create_collection()](create_collection.md)

- [create_schema()](create_schema.md)

- [describe_collection()](describe_collection.md)

- [drop_collection()](drop_collection.md)

- [has_collection()](has_collection.md)

- [list_collections()](list_collections.md)

- [rename_collection()](rename_collection.md)

- [IndexType](IndexType.md)

- [DataType](DataType.md)

