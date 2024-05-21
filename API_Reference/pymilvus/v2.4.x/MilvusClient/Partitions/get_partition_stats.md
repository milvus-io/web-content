# get_partition_stats()

This operation displays the statistics collected on a specific partition.

## Request syntax

```python
get_partition_stats(
    collection_name: str,
    partition_name: str,
    timeout: Optional[float] = None
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of an existing collection.

- **partition_name** (*str*) -

    **[REQUIRED]**

    The name of an existing partition.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*dict*

**RETURNS:**

A dictionary that contains the row count in the specified partition.

```python
{
    'row_count': 0
}
```

<div class="admonition note">

<p><b>**why doesn't the row count match the number of entities inserted?**</b></p>

<p>The data that you insert will go through a process before it is finally saved. Initially, it will flow in as data streams. Then, it will be stored in segments as entities. Milvus will select an appropriate growing segment to store the data in streams until the segment reaches its upper limit and becomes sealed.</p>
<p>However, it's important to note that the row count displayed may not match the number of records that were inserted because data in streams is not taken into account.</p>

</div>

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

# 2. Create a collection and get its load status
client.create_collection(collection_name="test_collection", dimension=5)

client.get_load_state(
    collection_name="test_collection"
)

# {'state': <LoadState: Loaded>}

# 4. Insert some data
client.insert(
    collection_name="test_collection",
    data=[
         {"id": 0, "vector": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], "color": "pink_8682"},
         {"id": 1, "vector": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], "color": "red_7025"},
         {"id": 2, "vector": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], "color": "orange_6781"},
         {"id": 3, "vector": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], "color": "pink_9298"},
         {"id": 4, "vector": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], "color": "red_4794"},
         {"id": 5, "vector": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], "color": "yellow_4222"},
         {"id": 6, "vector": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], "color": "red_9392"},
         {"id": 7, "vector": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], "color": "grey_8510"},
         {"id": 8, "vector": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], "color": "white_9381"},
         {"id": 9, "vector": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], "color": "purple_4976"}
     ],
)

# {'insert_count': 10}

# 5. Get the statistics in the default partition
client.get_partition_stats(
    collection_name="test_collection",
    partition_name="_default"
)

# { 'row_count': 0 }

```

## Related methods

- [create_partition()](create_partition.md)

- [drop_partition()](drop_partition.md)

- [has_partition()](has_partition.md)

- [list_partitions()](list_partitions.md)

- [load_partitions()](load_partitions.md)

- [release_partitions()](release_partitions.md)

