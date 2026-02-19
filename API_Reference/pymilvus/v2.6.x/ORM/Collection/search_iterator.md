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

**PARAMETERS:**

- **data** (*list[list[float]]*) - 

    **[REQUIRED]**

    A list of vector embeddings.

    Milvus searches for the most similar vector embeddings to the specified ones.

- **anns_field** (str) -

    **[REQUIRED]**

    The name of the vector field in the current collection.

- **param** (dict) -

    **[REQUIRED]**

    The parameter settings specific to this operation.

    - **metric_type** (*str*) -

        The metric type applied to this operation. This should be the same as the one used when you index the vector field specified above. 

        Possible values are **L2**, **IP**, and **COSINE**.

    - **params** (dict) -

        Additional parameters

        - **radius** (float) -

            Determines the threshold of least similarity. When setting `metric_type` to `L2`, ensure that this value is greater than that of **range_filter**. Otherwise, this value should be lower than that of **range_filter**. 

        - **range_filter**  (float) -  

            Refines the search to vectors within a specific similarity range. When setting `metric_type` to `IP` or `COSINE`, ensure that this value is greater than that of **radius**. Otherwise, this value should be lower than that of **radius**.

    For details on other applicable search parameters, refer to [In-memory Index](https://milvus.io/docs/index.md) and [On-disk Index](https://milvus.io/docs/disk_index.md).

- **batch_size** (*int*) -

    The number of entities to return each time you call `next()` on the current iterator.

    The value defaults to **1000**. Set it to a proper value to control the number of entities to return per iteration.

- **limit** (*int*) -

    The total number of entities to return.

    The value defaults to **-1**, indicating all matching entities will be in return.

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

- **round_decimal** (int) -

    The number of decimal places that Milvus rounds the calculated distances to.

    The value defaults to **-1**, indicating that Milvus skips rounding the calculated distances and returns the raw value.

**RETURN TYPE:**

*SearchIterator*

**RETURNS:**

A **SearchIterator** for you to iterate over the search result.

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

- [delete()](delete.md)

- [insert()](insert.md)

- [search()](search.md)

- [query()](query.md)

- [query_iterator()](query_iterator.md)

- [upsert()](upsert.md)

