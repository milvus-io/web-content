# search_iterator()

This operation returns a Python iterator for you to iterate over the search results. It is useful especially when the search result contains a large volume of data.

## Request Syntax

```python
def search_iterator(
    self,
    collection_name: str,
    data: Union[List[list], list],
    batch_size: Optional[int] = 1000,
    filter: Optional[str] = None,
    limit: Optional[int] = UNLIMITED,
    output_fields: Optional[List[str]] = None,
    search_params: Optional[dict] = None,
    timeout: Optional[float] = None,
    partition_names: Optional[List[str]] = None,
    anns_field: Optional[str] = None,
    round_decimal: int = -1,
    **kwargs,
) -> Union[SearchIteratorV2, SearchIterator]:
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of an existing collection.

- **data** (*List[list], list*) -

    **[REQUIRED]**

    A list of vector embeddings.

    Milvus searches for the most similar vector embeddings to the specified ones.

- **batch_size** (int[]) -

    The number of entities to return per iteration. The value defaults to `1000`.

- **anns_field** (*str*) -

    The name of the target vector field of the current search.

- **filter** (*str*) -

    A scalar filtering condition to filter matching entities. 

    The value defaults to an empty string, indicating that no condition applies. 

    You can set this parameter to an empty string to skip scalar filtering. To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md). 

- **filter_params** (*dict*) -

    If you choose to use placeholders in `filter` as stated in [Filtering Templating](https://milvus.io/docs/filtering-templating.md), then you can specify the actual values for these placeholders as key-value pairs as the value of this parameter.

- **limit** (*int*) -

    The total number of entities to return.

    You can use this parameter in combination with **offset** in **param** to enable pagination.

    The sum of this value and **offset** in **param** should be less than 16,384. 

    In a grouping search, however, `limit` specifies the maximum number of groups to return, rather than individual entities. Each group is formed based on the specified `group_by_field`.

- **output_fields** (l*ist[str]*) -

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, only the primary field is included.

- **search_params** (*dict*) -

    The parameter settings specific to this operation.

    - **metric_type** (*str*) -

        The metric type applied to this operation. This should be the same as the one used when you index the vector field specified above. 

        Possible values are **L2**, **IP**, and **COSINE**.

    - **radius** (float) -

        Determines the threshold of least similarity. When setting `metric_type` to `L2`, ensure that this value is greater than that of **range_filter**. Otherwise, this value should be lower than that of **range_filter**. 

    - **range_filter**  (float) -  

        Refines the search to vectors within a specific similarity range. When setting `metric_type` to `IP` or `COSINE`, ensure that this value is greater than that of **radius**. Otherwise, this value should be lower than that of **radius**.

    - **max_empty_result_buckets** (*int*)

        This param is only used for range search for IVF-serial indexes, including **BIN_IVF_FLAT**, **IVF_FLAT**, **IVF_SQ8**, **IVF_PQ**, and **SCANN**. The value defaults to 1 and ranges from 1 to 65536.

        During range search, the search process terminates early if the number of buckets with no valid range search results reaches the specified value. Increasing this parameter improves range search recall.

    - **params** (dict) -

        Additional parameters

        <div class="admonition note">

        <p><b>notes</b></p>

        <p>All additional parameters are moved to the upper <code>search_params</code>, and the <code>params</code> argument will be deprecated soon.</p>

        </div>

        - **radius** (float) -

            Determines the threshold of least similarity. When setting `metric_type` to `L2`, ensure that this value is greater than that of **range_filter**. Otherwise, this value should be lower than that of **range_filter**. 

        - **range_filter**  (float) -  

            Refines the search to vectors within a specific similarity range. When setting `metric_type` to `IP` or `COSINE`, ensure that this value is greater than that of **radius**. Otherwise, this value should be lower than that of **radius**.

        - **max_empty_result_buckets** (*int*)

            This param is only used for range search for IVF-serial indexes, including **BIN_IVF_FLAT**, **IVF_FLAT**, **IVF_SQ8**, **IVF_PQ**, and **SCANN**. The value defaults to 1 and ranges from 1 to 65536.

            During range search, the search process terminates early if the number of buckets with no valid range search results reaches the specified value. Increasing this parameter improves range search recall.

    - **ignore_growing** (*str*) -

        This option, when set, instructs the search to exclude data from growing segments. Utilizing this setting can potentially enhance search performance by focusing only on indexed and fully processed data.

    For details on other applicable search parameters, refer to [In-memory Index](https://milvus.io/docs/index.md) and [On-disk Index](https://milvus.io/docs/disk_index.md).

- **group_by_field** (*str*)

    Groups search results by a specified field to ensure diversity and avoid returning multiple results from the same group.

- **group_size** (*int*)

    The target number of entities to return within each group in a grouping search. For example, setting `group_size=2` instructs the system to return up to 2 of the most similar entities (e.g., document passages or vector representations) within each group. Without setting `group_size`, the system defaults to returning only 1 entity per group.

- **strict_group_size** (*bool*)

    This Boolean parameter dictates whether `group_size` should be strictly enforced. When `strict_group_size=True`, the system will attempt to fill each group with exactly `group_size` results, as long as sufficient data exists within each group. If there is an insufficient number of entities in a group, it will return only the available entities, ensuring that groups with adequate data meet the specified `group_size`.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **partition_names** (*list*) -

    A list of partition names.

    The value defaults to **None**. If specified, only the specified partitions are involved in queries.

    This parameter is not applicable to Milvus Lite. For more information on Milvus Lite limits, refer to [Run Milvus Lite](https://milvus.io/docs/milvus_lite.md).

- **kwargs** -

    - **offset** (int) -

        The number of records to skip in the search result. 

        You can use this parameter in combination with `limit` to enable pagination.

        The sum of this value and `limit` should be less than 16,384. 

    - **round_decimal** (int) -

        The number of decimal places that Milvus rounds the calculated distances to.

        The value defaults to **-1**, indicating that Milvus skips rounding the calculated distances and returns the raw value.

**RETURN TYPE:**

*list[dict]*

**RETURNS:**
A list of dictionaries that contains the searched entities with specified output fields.

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
client.create_collection(
    collection_name="test_collection",
    dimension=5
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

# 4. Conduct a search with iterator
search_params = {
    "metric_type": "IP",
    "params": {}
}

# Search with limit
iterator = client.search_iterator(
    collection_name="test_collection",
    data=[[0.05, 0.23, 0.07, 0.45, 0.13]],
    batch_size=50,
    limit=20000,
    search_params=search_params
)

while True:
    result = iterator.next()
    if not result:
        iterator.close()
        break
    
    for hit in result:
        print(hit.to_dict())
```

