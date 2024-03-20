
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

__PARAMETERS:__

- __data__ (_list[list[float]]_) - 

    __[REQUIRED]__

    A list of vector embeddings.

    Milvus searches for the most similar vector embeddings to the specified ones.

- __anns_field__ (str) -

    __[REQUIRED]__

    The name of the vector field in the current collection

- __param__ (dict) -

    __[REQUIRED]__

    The parameter settings specific to this operation.

    - __metric_type__ (_str_) -

        The metric type applied to this operation. This should be the same as the one used when you index the vector field specified above. 

        Possible values are __L2__, __IP__, and __COSINE__.

    - __params__ (dict) -

        Additional parameters

        - __offset__ (int) -

            The number of records to skip in the search result. 

            You can use this parameter in combination with `limit` to enable pagination.

            The sum of this value and `limit` should be less than 16,384. 

        - __radius__ (float) -

            Determines the threshold of least similarity. When setting `metric_type` to `L2`, ensure that this value is greater than that of __range_filter__. Otherwise, this value should be lower than that of __range_filter__. 

        - __range_filter__  (float) -  

            Refines the search to vectors within a specific similarity range. When setting `metric_type` to `IP` or `COSINE`, ensure that this value is greater than that of __radius__. Otherwise, this value should be lower than that of __radius__.

    For details on other applicable search parameters, refer to [In-memory Index](https://milvus.io/docs/index.md) and [On-disk Index](https://milvus.io/docs/disk_index.md).

- __limit__ (_int_) -

    The total number of entities to return.

    You can use this parameter in combination with `offset` in __param__ to enable pagination.

    The sum of this value and `offset` in __param__ should be less than 16,384. 

- __expr__ (_str_) -

    A scalar filtering condition to filter matching entities.

    The value defaults to __None__, indicating that scalar filtering is ignored. To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md).

- __output_fields__ (_list_) -

    A list of field names to include in each entity in return.

    The value defaults to __None__. If left unspecified, only the primary field is included.

- __partition_names__ (_list_) -

    A list of partition names.

    The value defaults to __None__. If specified, only the specified partitions are involved in queries.

- __timeout__ (_float_)  -

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

- __round_decimal__ (int) -

    The number of decimal places that Milvus rounds the calculated distances to.

    The value defaults to __-1__, indicating that Milvus skips rounding the calculated distances and returns the raw value.

__RETURN TYPE:__

_SearchResult_

__RETURNS:__

A __SearchResult__ object that contains a list of __Hits__ objects. 

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

    - A __Hits__ object has the following fields:

        - __ids__ (_list[int]_ | _list[str]_)

            A list containing the IDs of the hit entities.

        - __distances__ (list[float]) 

            A list of distances from the hit entities' vector fields to the query vector.

    - A __Hit__ object has the following fields:

        - __id__ (_int_ | _str_)

            The ID of a hit entity.

        - __distance__ (_float_)

            The distance from a hit entity's vector field to the query vector.

        - __score__ (_float_)

            An alias to __distance__.

        - __vector__ (_list[float]_)   

            The vector field of a hit entity.

        - __get(_field_name: str_)__

            A function to get the value of the specified field in a hit entity. 

__EXCEPTIONS:__

- __MilvusException__

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

# Create a search iterator
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

