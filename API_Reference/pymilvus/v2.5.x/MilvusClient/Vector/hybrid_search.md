# hybrid_search()

This operation performs multi-vector search on a collection and returns search results after reranking.

## Request Syntax

```python
hybrid_search(
    collection_name: str,
    reqs: List[AnnSearchRequest],
    ranker: BaseRanker,
    limit: int = 10,   
    output_fields: Optional[List[str]] = None,
    timeout: Optional[float] = None,
    partition_names: Optional[List[str]] = None,
    **kwargs
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    The name of the collection to create.

- **reqs** (*List[AnnSearchRequest]*) -

    A list of search requests, where each request is an **ANNSearchRequest** object. Each request corresponds to a different vector field and a different set of search parameters.

    - **ANNSearchRequest**: A class representing an ANN search request.

        ```python
        ├── AnnSearchRequest
        │   └── data  
        │   └── anns_field
        │   └── param 
        │   └── limit 
        │   └── expr
        ```

        - **data** (*List*): The query vector to search in the request. This parameter accepts a list containing one element.

        - **anns_field** (*str*): The vector field to use in the request.

        - **param** (*dict*): A dictionary of search parameters for the request. For details, refer to [Search parameters](https://milvus.io/docs/single-vector-search#search-parameters).

        - **limit** (*int*): The maximum number of results to return in the request. When performing a hybrid search with multiple ANN search requests, the top results defined by **limit** from each request will be combined and re-ranked before returning the final search results.

        - **expr** (*str*): (Optional) The expression to filter the results.

        - **expr_params** (*dict*) -

            If you choose to use placeholders in `expr` as stated in [Filtering Templating](https://milvus.io/docs/filtering-templating.md), then you can specify the actual values for these placeholders as key-value pairs as the value of this parameter.

- **ranker** (*BaseRanker*) -

    The reranking strategy to use for hybrid search. Valid values: `WeightedRanker` and `RRFRanker`.

    - `WeightedRanker`: The Average Weighted Scoring reranking strategy, which prioritizes vectors based on relevance, averaging their significance.

    - `RRFRanker`: The RRF reranking strategy, which merges results from multiple searches, favoring items that consistently appear.

- **limit** (*int*) -

    The total number of entities to return.

    You can use this parameter in combination with `offset` in **param** to enable pagination.

    The sum of this value and `offset` in **param** should be less than 16,384.

- **partition_names** (*List[str]*) -

    A list of partition names.

    The value defaults to **None**. If specified, only the specified partitions are involved in queries.

- **output_fields** (*List[str]*) -

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, only the primary field is included.

- **timeout** (*float*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **round_decimal** (int) -

    The number of decimal places that Milvus rounds the calculated distances to.

    The value defaults to **-1**, indicating that Milvus skips rounding the calculated distances and returns the raw value.

- **group_by_field** (*str*)

    Groups search results by a specified field to ensure diversity and avoid returning multiple results from the same group. For details, refer to [Grouping Search](https://milvus.io/docs/grouping-search.md#Grouping-Search).

- **group_size** (*int*)

    The target number of entities to return within each group in a grouping search. For details, refer to [Grouping Search](https://milvus.io/docs/grouping-search.md#Grouping-Search).

- **strict_group_size** (*bool*)

    Controls whether **group_size** should be strictly enforced. For details, refer to [Grouping Search](https://milvus.io/docs/grouping-search.md#Grouping-Search).

**RETURN TYPE:**

*SearchResult*

**RETURNS:**

A **SearchResult** object that contains a list of **Hits** objects. 

- Response structure

    <div class="admonition note">

    <p><b>notes</b></p>

    <p>A <strong>SearchResult</strong> object contains a list of <strong>Hits</strong> objects, each corresponding to a query vector in the search request. </p>
    <p>A <strong>Hits</strong> object contains a list of <strong>Hit</strong> objects, each corresponding to an entity hit by the search.</p>

    </div>

    ```plaintext
    ├── SearchResult
    │   └── Hits  
    │       ├── ids
    │       ├── distances
    │       └── Hit
    │           ├── id
    │           ├── distance
    │           ├── score
    │           ├── vector
    │           └── get()
    ```

- Properties and methods

    - A **Hits** object has the following fields:

        - **ids** (*list[int]* | *list[str]*)

            A list containing the IDs of the hit entities.

        - **distances** (list[float]) 

            A list of distances from the hit entities' vector fields to the query vector.

    - A **Hit** object has the following fields:

        - **id** (*int* | *str*)

            The ID of a hit entity.

        - **distance** (*float*)

            The distance from a hit entity's vector field to the query vector.

        - **score** (*float*)

            An alias to **distance**.

        - **vector** (*list[float]*)   

            The vector field of a hit entity.

        - **get(*field_name: str*)**

            A function to get the value of the specified field in a hit entity. 

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import AnnSearchRequest, MilvusClient, WeightedRanker

# Connect to Milvus server

client = MilvusClient(uri="http://localhost:19530")

# Create AnnSearchRequests

query_dense_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

search_param_1 = {
    "data": [query_dense_vector],
    "anns_field": "dense",
    "param": {
        "metric_type": "IP",
        "params": {"nprobe": 10}
    },
    "limit": 2
}
request_1 = AnnSearchRequest(**search_param_1)

query_sparse_vector = {3573: 0.34701499565746674}, {5263: 0.2639375518635271}
search_param_2 = {
    "data": [query_sparse_vector],
    "anns_field": "sparse",
    "param": {
        "metric_type": "IP",
        "params": {}
    },
    "limit": 2
}
request_2 = AnnSearchRequest(**search_param_2)

reqs = [request_1, request_2]

# Configure reranking strategy

ranker = WeightedRanker(0.8, 0.3) 

# perform hybrid search

res = client.hybrid_search(
    collection_name="hybrid_search_collection",
    reqs=reqs,
    ranker=ranker,
    limit=2
)
for hits in res:
    print("TopK results:")
    for hit in hits:
        print(hit)
```
