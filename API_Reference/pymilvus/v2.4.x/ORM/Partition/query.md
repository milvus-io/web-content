# query()

This operation conducts a query on the entity scalar field(s) with a boolean expression.

## Request Syntax

```python
query(
    expr: str, 
    output_fields: List[str] | None, 
    timeout: float | None,
    **kwargs
)
```

__PARAMETERS:__

- __expr__ (_string_) -

    __[REQUIRED] __

    A boolean expression to filter the entity scalar fields.

- __output_fields __(List[str] | _None_) -

    A list of the names of fields that has to be contained in the output. Setting this to __None__ indicates that this operation only outputs the primary key field.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

- __kwargs__: 

    Additional keyword arguments.

    - __consistency_level__ (_str_ | _int_) -

        The consistency level of the target collection.

        The value defaults to the one specified when you create the current collection, with options of __Strong __(__0__), __Bounded __(__1__), __Session __(__2__), and __Eventually __(__3__).

        <div class="admonition note">

        <p><b>what is the consistency level?</b></p>

        <p>Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.</p>
        <p>Milvus supports four consistency levels: <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, and <strong>Eventually</strong>. The default consistency level in Milvus is bounded staleness.</p>
        <p>You can easily tune the consistency level when conducting a vector similarity search or query to make it best suit your application.</p>

        </div>

    - __guarantee_timestamp__ (_int_) -

        A valid timestamp. 

        If this parameter is set, Milvus executes the query only if all entities inserted before this timestamp are visible to query nodes. 

        <div class="admonition note">

        <p><b>notes</b></p>

        <p>This parameter is valid when the default consistency level applies.</p>

        </div>

    - __graceful_time__ (_int_) -

        A period of time in seconds.

        The value defaults to __5__. If this parameter is set, Milvus calculates the guarantee timestamp by subtracting this from the current timestamp.

        <div class="admonition note">

        <p><b>notes</b></p>

        <p>This parameter is valid when a consistency level other than the default one applies.</p>

        </div>

    - __offset__ (_int_) -

        The number of records to skip in the query result. 

        You can use this parameter in combination with `limit` to enable pagination.

        The sum of this value and `limit` should be less than 16,384. 

    - __limit__ (_int_) -

        The number of records to return in the query result.

        You can use this parameter in combination with `offset` to enable pagination.

        The sum of this value and `offset` should be less than 16,384. 

__RETURN TYPE:__

_List_

__RETURNS:__

A list of the query results.

__EXCEPTIONS:__

- __MilvusException__

    This arises when any error occurs during this operation.

## Examples

```python
from pymilvus import Collection, Partition, CollectionSchema, FieldSchema, DataType

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test_collection",
    schema=schema
)

# Create a partition
partition = Partition(collection, name="test_collection")

# Insert a list of columns
res = partition.insert(
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

# Query without any scalar filtering condition
# This query returns entities with their ids from 0 to 4.
res = partition.query(
    expr="",
    limit=5,
) 

# Query with pagination
# This query returns entities with their ids from 5 to 9.
res = partition.query(
    expr="",
    offset=5
    limit=5
)

# Query with a scalar filtering condition
res = partition.query(
    expr="id in [6,7,8]",
)

# Query with specified output fields
res = partition.query(
    expr="id in [6,7,8]",
    output_fields=["id", "vector"],
)

# Query with a customized consistency level
res = partition.query(
    expr="",
    consistency_level=3,
    graceful_time=6
)
```

## Related operations

The following operations are related to `query()`:

- [delete()](./delete.md)

- [flush()](./flush.md)

- [insert()](./insert.md)

- [search()](./search.md)

- [upsert()](./upsert.md)

