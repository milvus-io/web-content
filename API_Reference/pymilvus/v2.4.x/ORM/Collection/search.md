# search()

This operation conducts a vector similarity search with an optional scalar filtering expression.

## Request Syntax

```python
search(
    data: list[list[float]], 
    anns_field: str, 
    param: dict, 
    limit: int 
    expr: str | None, 
    partition_names: list[str] | None, 
    output_fields: list[str] | None, 
    timeout: float | None, 
    round_decimal: int
)
```

**PARAMETERS:**

- **data** (*list[list[float]]*) - 

    **[REQUIRED]**

    A list of vector embeddings.

    Milvus searches for the most similar vector embeddings to the specified ones.

- **anns_field** (str) -

    **[REQUIRED]**

    The name of the vector field in the current collection

- **param** (dict) -

    **[REQUIRED]**

    The parameter settings specific to this operation.

    - **metric_type** (*str*) -

        The metric type applied to this operation. This should be the same as the one used when you index the vector field specified above. 

        Possible values are **L2**, **IP**, and **COSINE**.

    - **params** (dict) -

        Additional parameters

        - **offset** (int) -

            The number of records to skip in the search result. 

            You can use this parameter in combination with `limit` to enable pagination.

            The sum of this value and `limit` should be less than 16,384. 

        - **radius** (float) -

            Determines the threshold of least similarity. When setting `metric_type` to `L2`, ensure that this value is greater than that of **range_filter**. Otherwise, this value should be lower than that of **range_filter**. 

        - **range_filter**  (float) -  

            Refines the search to vectors within a specific similarity range. When setting `metric_type` to `IP` or `COSINE`, ensure that this value is greater than that of **radius**. Otherwise, this value should be lower than that of **radius**.

    For details on other applicable search parameters, refer to [In-memory Index](https://milvus.io/docs/index.md) and [On-disk Index](https://milvus.io/docs/disk_index.md).

- **limit** (*int*) -

    The total number of entities to return.

    You can use this parameter in combination with `offset` in **param** to enable pagination.

    The sum of this value and `offset` in **param** should be less than 16,384. 

- **expr** (*str*) -

    A scalar filtering condition to filter matching entities.

    The value defaults to **None**, indicating that scalar filtering is ignored. To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md).

- **output_fields** (*list*) -

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, only the primary field is included.

- **partition_names** (*list*) -

    A list of partition names.

    The value defaults to **None**. If specified, only the specified partitions are involved in queries.

- **timeout** (*float*)  -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **round_decimal** (*int*) -

    The number of decimal places that Milvus rounds the calculated distances to.

    The value defaults to **-1**, indicating that Milvus skips rounding the calculated distances and returns the raw value.

- **consistency_level** (*str*) -

    The consistency level used when Milvus searches within the specified collection.

    If this parameter is not specified, the consistency level specified during the collection creation will be used. Specifying this parameter will override the one specified during collection creation.

    Possible values are **Strong**, **Bounded**, **Eventually**, **Session**, and **Customized**.

- **guarantee_timestamp** (*int*) -

    The timestamp that Milvus uses as a reference during the search.

    If this parameter is left unspecified, Milvus searches within all flushed entities. Setting this value makes Milvus searches within the entities flushed before the specified timestamp.

- **graceful_time** (*int*) -

    A graceful period in seconds for the search.

    Setting this value makes Milvus search within the entities flushed the specified seconds ago.

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
from pymilvus import Collection, CollectionSchema, FieldSchema, DataType

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test_collection",
    schema=schema
)

# Insert a list of columns
res = collection.insert(
    data=[
        [0,1,2,3,4,5,6,7,8,9],               # id
        [                                    # vector
            [0.1,0.2,-0.3,-0.4,0.5],
            [0.3,-0.1,-0.2,-0.6,0.7],
            [-0.6,-0.3,0.2,0.8,0.7],
            [0.6,0.2,-0.3,-0.8,0.5],
            [0.3,0.1,-0.2,-0.6,-0.7],
            [0.1,0.2,-0.3,-0.4,0.5],
            [0.3,-0.1,-0.2,-0.6,0.7],
            [-0.6,-0.3,0.2,0.8,0.7],
            [0.6,0.2,-0.3,-0.8,0.5],
            [0.3,0.1,-0.2,-0.6,-0.7],
        ],
    ]
)

BATCH_SIZE = 2
LIMIT = 10

param = {
    "metric_type": "COSINE",
    "params": {
        "nprobe": 1024,
        "radius": 0.2,
        "range_filter": 1.0
    }
}

# Create a search request
res = collection.search(
    data=[[0.1,0.2,-0.3,-0.4,0.5]],
    anns_field="vector",
    param=param,
    batch_size=BATCH_SIZE,
    limit=LIMIT,
    expr="id > 3",
    output_fields=["id", "vector"]
)

for hits in res:
    # Get ids
    hits.ids
    
    # Get distances
    hits.distances
    
    for hit in hits:
        # Get id
        hit.id
        
        # Get distance
        hit.distance # hit.score
        
        # Get vector
        hit.vector
        
        # Get output field
        hit.get("vector")
        
```

## Related operations

- [delete()](delete.md)

- [insert()](insert.md)

- [search_iterator()](search_iterator.md)

- [query()](query.md)

- [query_iterator()](query_iterator.md)

- [upsert()](upsert.md)

