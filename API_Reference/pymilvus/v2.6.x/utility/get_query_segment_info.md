# get_query_segment_info()

This operation gets information about the sealed and growing segments in the query cluster.

## Request Syntax

```python
get_query_segment_info(
    collection_name: str,
    timeout: float | None,
    using: str = "default",
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of an existing collection.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*list*

**RETURNS:**

A list of **QuerySegmentInfo** objects, each reporting the status of a segment.

**EXCEPTIONS:**

N/A

## Examples

```python
from pymilvus import connections, Collection, utility

# Connect to localhost:19530
connections.connect()

# Get an existing collection
collection = Collection("test_collection")

# Get the query segment info
res = utility.get_query_segment_info(collection_name="test_collection")

print(res)

# segmentID: 446781855409287839
# collectionID: 446738261027224920
# partitionID: 446738261027224921
# num_rows: 5
# state: Sealed
# nodeIds: 3
```

## Related operations

- [drop_collection()](https://zilliverse.feishu.cn/docx/FHcYdN4apoI5TIx0LxScISvtn0f)

- [flush_all()](https://zilliverse.feishu.cn/docx/Uwsfd443boKKgyx2zZTcYDqKnCe)

- [has_collection()](https://zilliverse.feishu.cn/docx/TWOxdwDYRo4CCHxDdZbc7IOznCg)

- [has_partition()](https://zilliverse.feishu.cn/docx/KsmadNcXRoElO2xJi5HcJO57nwb)

- [list_collections()](https://zilliverse.feishu.cn/docx/QgxEdfBMSodYo6xCg24cH3hInr4)

- [rename_collection()](https://zilliverse.feishu.cn/docx/M0qRdF1cLokrxvxyrXScJ64FnEe)

