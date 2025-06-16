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

**PARAMETERS:**

- **expr** (*str*) -

    **[REQUIRED]**

    A scalar filtering condition to filter matching entities. 

    You can set this parameter to an empty string to skip scalar filtering. In this case, you should also set `limit` to restrict the number of entities in return.

    To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md). 

- **output_fields** (*list*) -

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, only the primary field is included.

- **partition_names** (*list*)

    A list of partition names.

    The value defaults to **None**. If specified, only the specified partitions are involved in queries.

- **timeout** (*float*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **kwargs**: 

    - **consistency_level** (*str* | *int*) -

        The consistency level of the target collection.

        The value defaults to the one specified when you create the current collection, with options of **Strong** (**0**), **Bounded** (**1**), **Session** (**2**), and **Eventually** (**3**).

        <div class="admonition note">

        <p><b>what is the consistency level?</b></p>

        <p>Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.</p>
        <p>Milvus supports four consistency levels: <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, and <strong>Eventually</strong>. The default consistency level in Milvus is bounded staleness.</p>
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

*list[dict]*

**RETURNS:**

A list of dictionaries with each dictionary representing a queried entity.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

- **DataTypeNotMatchException**

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

## Related operations

The following operations are related to `query()`:

- [delete()](delete.md)

- [insert()](insert.md)

- [search()](search.md)

- [search_iterator()](search_iterator.md)

- [query_iterator()](query_iterator.md)

- [upsert()](upsert.md)

