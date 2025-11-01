# query_iterator()

This operation conducts a scalar filtering with a specified boolean expression in an iterative manner.

## Request syntax

```python
query_iterator(
    collection_name: str,
    batch_size: Optional[int] = 1000,
    limit: Optional[int] = UNLIMITED,
    filter: str,
    output_fields: Optional[List[str]] = None,
    timeout: Optional[float] = None,
    partition_names: Optional[List[str]] = None,
    **kwargs,
) -> List[dict]
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **&#91;REQUIRED&#93;**

    The name of an existing collection.

- **batch_size** (*int*) -

    The number of entities to return each iteration. The default value is 1000.

- **limit** (*int*) -

    The total number of entities to return. The parameter value should be less than 16,384. 

- **filter** (*str*) -

    **&#91;REQUIRED&#93;**

    A scalar filtering condition to filter matching entities. 

    You can set this parameter to an empty string to skip scalar filtering. To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md).  

- **output_fields** (*list&#91;str&#93;* | *None*) -

    A list of field names to include in each entity in return.

    The value defaults to **None**.

    <div class="admonition note">

    <p><b>notes</b></p>

    <ul>
    <li><p>Setting this as <code>output_fields=&#91;"\*"&#93;</code> outputs all fields.</p></li>
    <li><p>Setting this as <code>output_fields=&#91;"count(\*)"&#93;</code> outputs the loaded entities that match the conditions specified in the <strong>filter</strong> argument. </p></li>
    </ul>

    </div>

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **partition_names** (*list&#91;str&#93;* | *None*) -

    A list of partition names.

    The value defaults to **None**. If specified, only the specified partitions are involved in queries.

    This parameter is not applicable to Milvus Lite. For more information on Milvus Lite limits, refer to [Run Milvus Lite](https://milvus.io/docs/milvus_lite.md). 

- **kwargs** -

    - **consistency_level** (*str* | *int*) -

        The consistency level of the target collection.

        The value defaults to the one specified when you create the current collection, with options of **Strong** (**0**), **Bounded** (**1**), **Session** (**2**), and **Eventually** (**3**).

        <div class="admonition note">

        <p><b>what is the consistency level?</b></p>

        <p>Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.</p>
        <p>Milvus supports four consistency levels: <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, and <strong>Eventually</strong>. The default consistency level in Milvus is <strong>Bounded Staleness</strong>.</p>
        <p>You can easily tune the consistency level when conducting a vector similarity search or query to make it best suit your application.</p>

        </div>

    - **guarantee_timestamp** (*int*) -

        A valid timestamp. 

        If this parameter is set, MilvusZilliz Cloud executes the query only if all entities inserted before this timestamp are visible to query nodes. 

        <div class="admonition note">

        <p><b>notes</b></p>

        <p>This parameter is valid when the default consistency level applies.</p>

        </div>

    - **graceful_time** (*int*) -

        A period of time in seconds.

        The value defaults to **5**. If this parameter is set, MilvusZilliz Cloud calculates the guarantee timestamp by subtracting this from the current timestamp.

        <div class="admonition note">

        <p><b>notes</b></p>

        <p>This parameter is valid when a consistency level other than the default one applies.</p>

        </div>

    - **offset** (*int*) -

        The number of records to skip in the query result. 

        You can use this parameter in combination with `limit` to enable pagination.

        The sum of this value and `limit` should be less than 16,384. 

    - **limit** (*int*) -

        The number of records to return in the query result.

        You can use this parameter in combination with `offset` to enable pagination.

        The sum of this value and `offset` should be less than 16,384. 

**RETURN TYPE:**

*QueryIterator*

**RETURNS:**

A **QueryIterator** instance that provides the following methods:

- `next()`

    This method returns a batch of entities iteratively. Each time you call it, a new set of entities is returned until the last entity is retrieved.

- `close()`

    This method closes the current **QueryIterator** instance.

<div class="admonition note">

<p><b>notes</b></p>

<p>If the number of returned entities is less than expected, duplicate entities may exist in your collection.</p>

</div>

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

- **DataTypeNotMatchException**

    This exception will be raised when a parameter value doesn't match the required data type.

## Examples

```python
from pymilvus import MilvusClient

# 1. Set up a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a collection and a partition
client.create_collection(
    collection_name="test_collection",
    dimension=5
)

client.create_partition(
    collection_name="test_collection",
    partition_name="partitionA"
)

# 3. Insert data
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

# 4. Conduct queries

# Query with query iterator
iterator = client.query_iterator(
    collection_name="test_collection",
    batch_size=1000,
    filter="id in [6,7,8]",
)

results = []

while True:
    result = iterator.next()
    if not result:
        iterator.close()
        break
        
    for hit in result:
        results.append(hit.to_dict())
    
```

