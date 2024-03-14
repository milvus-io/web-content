
# query()

This operation conducts a scalar filtering with a specified boolean expression.

## Request Syntax

```python
query(
    expr: str, 
    output_fields: list[str] | None, 
    partition_names: list[str] | None, 
    timeout: float | None
    **kwargs
)
```

__PARAMETERS:__

- __expr__ (_str_) -

    __[REQUIRED]__

    A scalar filtering condition to filter matching entities. 

    You can set this parameter to an empty string to skip scalar filtering. In this case, you should also set `limit` to restrict the number of entities in return.

    To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md). 

- __output_fields__ (_list_) -

    A list of field names to include in each entity in return.

    The value defaults to __None__. If left unspecified, only the primary field is included.

- __partition_names__ (_list_)

    A list of partition names.

    The value defaults to __None__. If specified, only the specified partitions are involved in queries.

- __timeout__ (_float_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

- __kwargs__: 

    - __consistency_level__ (_str_ | _int_) -

        The consistency level of the target collection.

        The value defaults to the one specified when you create the current collection, with options of __Strong__ (__0__), __Bounded__ (__1__), __Session__ (__2__), and __Eventually__ (__3__).

        <div class="admonition note">

        <p><b>what is the consistency level?</b></p>

        <p>Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.</p>
        <p>Milvus supports four consistency levels: <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, and <strong>Eventually</strong>. The default consistency level in Milvus is bounded staleness.</p>
        <p>You can easily tune the consistency level when conducting a vector similarity search or query to make it best suit your application.</p>

        </div>

    - __guarantee_timestamp__ (_int_) -

        A valid timestamp. 

        If this parameter is set, MilvusZilliz Cloud executes the query only if all entities inserted before this timestamp are visible to query nodes. 

        <div class="admonition note">

        <p><b>notes</b></p>

        <p>This parameter is valid when the default consistency level applies.</p>

        </div>

    - __graceful_time__ (_int_) -

        A period of time in seconds.

        The value defaults to __5__. If this parameter is set, MilvusZilliz Cloud calculates the guarantee timestamp by subtracting this from the current timestamp.

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

_list[dict]_

__RETURNS:__

A list of dictionaries with each dictionary representing a queried entity.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

- __DataTypeNotMatchException__

    This exception will be raised when a parameter value doesn't match the required data type.

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

# Query without any scalar filtering condition
# This query returns entities with their ids from 0 to 4.
res = collection.query(
    expr="",
    limit=5,
) 

# Query with pagination
# This query returns entities with their ids from 5 to 9.
res = collection.query(
    expr="",
    offset=5
    limit=5
)

# Query with a scalar filtering condition
res = collection.query(
    expr="id in [6,7,8]",
)

# Query within a partition
res = collection.query(
    expr="id in [6,7,8]",
    partition_names=["partitionA"],
)

# Query with specified output fields
res = collection.query(
    expr="id in [6,7,8]",
    output_fields=["id", "vector"],
)

# Query with a customized consistency level
res = collection.query(
    expr="",
    consistency_level=3,
    graceful_time=6
)
```

