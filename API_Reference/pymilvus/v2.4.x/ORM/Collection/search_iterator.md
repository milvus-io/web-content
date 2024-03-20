# search_iterator()

This operation returns a Python iterator for you to iterate over the search results. It is useful especially when the search result contains a large volume of data.

## Request Syntax

```python
search_iterator(
    data: list[list[float]], 
    anns_field: str, 
    param: dict, 
    batch_size: int, 
    limit: int, 
    expr: str | None, 
    partition_names: list[str] | None, 
    output_fields: list[str] | None, 
    timeout: float | None, 
    round_decimal: int,
)
```

__PARAMETERS:__

- __data__ (_list[list[float]]_) - 

    __[REQUIRED]__

    A list of vector embeddings.

    Milvus searches for the most similar vector embeddings to the specified ones.

- __anns_field__ (str) -

    __[REQUIRED]__

    The name of the vector field in the current collection.

- __param__ (dict) -

    __[REQUIRED]__

    The parameter settings specific to this operation.

    - __metric_type__ (_str_) -

        The metric type applied to this operation. This should be the same as the one used when you index the vector field specified above. 

        Possible values are __L2__, __IP__, and __COSINE__.

    - __params__ (dict) -

        Additional parameters

        - __radius__ (float) -

            Determines the threshold of least similarity. When setting `metric_type` to `L2`, ensure that this value is greater than that of __range_filter__. Otherwise, this value should be lower than that of __range_filter__. 

        - __range_filter__  (float) -  

            Refines the search to vectors within a specific similarity range. When setting `metric_type` to `IP` or `COSINE`, ensure that this value is greater than that of __radius__. Otherwise, this value should be lower than that of __radius__.

    For details on other applicable search parameters, refer to [In-memory Index](https://milvus.io/docs/index.md) and [On-disk Index](https://milvus.io/docs/disk_index.md).

- __batch_size__ (_int_) -

    The number of entities to return each time you call `next()` on the current iterator.

    The value defaults to __1000__. Set it to a proper value to control the number of entities to return per iteration.

- __limit__ (_int_) -

    The total number of entities to return.

    The value defaults to __-1__, indicating all matching entities will be in return.

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

_SearchIterator_

__RETURNS:__

A __SearchIterator__ for you to iterate over the search result.

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
iterator = collection.search_iterator(
    data=[[0.1,0.2,-0.3,-0.4,0.5]],
    anns_field="vector",
    param=param,
    batch_size=BATCH_SIZE,
    limit=LIMIT,
    expr="id > 3",
    output_fields=["id", "vector"]
)

while True:
    res = iterator.next()
    
    # Get distances
    res.distances()
    
    # Get ids
    res.ids()
    
    if not res.ids():
        iterator.close()
        break

```

## Related operations

The following operations are related to `search_iterator()`:

- [delete()](./delete.md)

- [insert()](./insert.md)

- [search()](./search.md)

- [query()](./query.md)

- [query_iterator()](./query_iterator.md)

- [upsert()](./upsert.md)

