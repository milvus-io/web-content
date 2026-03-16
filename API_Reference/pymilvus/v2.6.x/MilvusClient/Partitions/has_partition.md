# has_partition()

This operation checks whether the specified partition exists in the specified collection.

## Request syntax

```python
has_partition(
    collection_name: str,
    partition_name: str,
    timeout: Optional[float] = None
) -> bool
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of an existing collection.

- **partition_name** (*string*)

    **[REQUIRED]**

    The name of the partition to check.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*bool*

**RETURNS:**

A boolean value indicating whether the specified partition exists.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a collection
client.create_collection(collection_name="test_collection", dimension=5)

# 3. Create a partition
client.create_partition(
    collection_name="test_collection", 
    partition_name="partition_A"
)

# 4. Check whether the partition exists
client.has_partition(
    collection_name="test_collection", 
    partition_name="partition_A"
) 

# True
```

## Related methods

- [create_partition()](https://zilliverse.feishu.cn/docx/I6hvdlYUuoUaw3xWqSnce4Fin9g)

- [drop_partition()](https://zilliverse.feishu.cn/docx/EMI8dM8uooIAFPxVfffcoqRwnZf)

- [get_partition_stats()](https://zilliverse.feishu.cn/docx/Jjbsd2I8doQ9pBxBp57ckRdZnZd)

- [list_partitions()](https://zilliverse.feishu.cn/docx/Dxgqdvlk5o2VScxqmL1ctc1Inqb)

- [load_partitions()](https://zilliverse.feishu.cn/docx/DdQ1dBNagoBa08xhEiucxZrHnzc)

- [release_partitions()](https://zilliverse.feishu.cn/docx/VblKdUEU4o4t31xcFiicIGtjn9g)

