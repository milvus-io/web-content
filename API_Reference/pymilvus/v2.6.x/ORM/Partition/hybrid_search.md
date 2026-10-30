# hybrid_search()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation performs multi-vector search on a partition and returns search results after reranking.

## Request Syntax

```python
hybrid_search(
    reqs: List,
    rerank: BaseRanker,
    limit: int,
    output_fields: Optional[List[str]] = None,
    timeout: Optional[float] = None,
    round_decimal: int = -1,
    **kwargs,
)
```

**PARAMETERS:**

- **reqs** (*List[AnnSearchRequest]*) -

    A list of search requests, where each request is an **ANNSearchRequest** object. Each request corresponds to a different vector field and a different set of search parameters.

    - **ANNSearchRequest**: A class representing an ANN search request.

```text
        ├── AnnSearchRequest
        │   └── data  
        │   └── anns_field
        │   └── param 
        │   └── limit 
        │   └── expr
        ```

        - **data** (*List*): The query vector to search in the request. This parameter accepts a list containing one element.

        - **anns_field** (*str*): The vector field to use in the request.

        - **param** (*dict*): A dictionary of search parameters for the request. For details, refer to [Search parameters](https://milvus.io/docs/single-vector-search#search-parameters). Note that the `offset` set here is not supported in hybrid search and is ignored by Milvus.

        - **limit** (*int*): The maximum number of results to return in the request. When performing a hybrid search with multiple ANN search requests, the top results defined by **limit** from each request will be combined and re-ranked before returning the final search results.

        - **expr** (*str*): (Optional) The expression to filter the results.

- **rerank** (*BaseRanker*) -

    The reranking strategy to use for hybrid search. Valid values: `WeightedRanker` and `RRFRanker`.

    - `WeightedRanker`: The Average Weighted Scoring reranking strategy, which prioritizes vectors based on relevance, averaging their significance.

    - `RRFRanker`: The RRF reranking strategy, which merges results from multiple searches, favoring items that consistently appear.

- **limit** (*int*) -

    The total number of entities to return.

    You can use this parameter in combination with the top-level `offset` search option to enable pagination. The top-level `offset` is applied to the final results after candidate fusion and reranking.

    To make pagination work as expected, the `limit` of each **AnnSearchRequest** in **reqs** should cover the pagination window, that is, the sum of the top-level `offset` and this value.

    The sum of this value and the top-level `offset` should be less than or equal to 16,384.

- **output_fields** (*List[str]*) -

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, only the primary field is included.

- **timeout** (*float*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **round_decimal** (int) -

    The number of decimal places that Milvus rounds the calculated distances to.

    The value defaults to **-1**, indicating that Milvus skips rounding the calculated distances and returns the raw value.

- **kwargs** -

    Additional search options, including the top-level `offset` for pagination and the `consistency_level` for the search.

**RETURN TYPE:**

*SearchResult*

**RETURNS:**

A **SearchResult** object that contains a list of **Hits** objects. 

- Response structure

    <div class="alert note">
    
    A **SearchResult** object contains a list of **Hits** objects, each corresponding to a query vector in the search request. 
    
    A **Hits** object contains a list of **Hit** objects, each corresponding to an entity hit by the search.

    </div>

```text
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

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import connections, Collection, Partition, CollectionSchema, FieldSchema, DataType, AnnSearchRequest, WeightedRanker

# Connect to localhost:19530
connections.connect()

# Create a collection with two vector fields
schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("text_vector", DataType.FLOAT_VECTOR, dim=3),
    FieldSchema("image_vector", DataType.FLOAT_VECTOR, dim=3),
])

collection = Collection(
    name="test_collection",
    schema=schema,
)

# Create indexes on both vector fields
collection.create_index("text_vector", {"index_type": "AUTOINDEX", "metric_type": "IP"})
collection.create_index("image_vector", {"index_type": "AUTOINDEX", "metric_type": "IP"})
collection.load()

# Create a partition
partition = Partition(collection, name="test_partition")

# Insert data into the partition
partition.insert(
    data=[
        [0, 1],
        [[0.1, 0.2, 0.3], [0.4, 0.5, 0.6]],
        [[0.3, 0.2, 0.1], [0.6, 0.5, 0.4]],
    ]
)

# NOTE: Set the consistency level to Strong so that the entities inserted
# above are immediately visible and the example returns results. In
# production, choose a consistency level (for example, Bounded) that fits
# your scenario.
res = partition.hybrid_search(
    reqs=[
        AnnSearchRequest(
            data=[[0.1, 0.2, 0.3]],
            anns_field="text_vector",
            param={"metric_type": "IP"},
            limit=2,
        ),
        AnnSearchRequest(
            data=[[0.3, 0.2, 0.1]],
            anns_field="image_vector",
            param={"metric_type": "IP"},
            limit=2,
        ),
    ],
    # Use WeightedRanker to combine results with specified weights
    rerank=WeightedRanker(0.8, 0.2), # Assign weights of 0.8 to text search and 0.2 to image search
    # Alternatively, use RRFRanker for reciprocal rank fusion reranking
    # rerank=RRFRanker(),
    limit=2,
    consistency_level="Strong",
)
print(res)
```
