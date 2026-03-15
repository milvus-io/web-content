# Collection

A **Collection** instance represents a Milvus collection.

```python
class pymilvus.Collection
```

## Constructor

Constructs a collection by name, schema, and other parameters.

```python
Collection(
    name: str,
    schema: CollectionSchema,
    using: str
) 
```

**PARAMETERS:**

- **name** (*string*) - 

    **[REQUIRED]**

    The name of the collection to create.

- **schema** (*[CollectionSchema](https://zilliverse.feishu.cn/docx/WToudUwm4oVXeKxLg3jcj3IAnjh)*) - 

    The schema used to create the collection. 

    The default value is **None**, indicating that a default schema is used.

    <div class="alert note">
    
    The schema is responsible for organizing data in the target collection. A valid schema should have multiple fields, which must include a primary key, a vector field, and several scalar fields.

    </div>

- **using** (*string*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **num_shards** (*int*) -

    The number of shards to create along with the creation of this collection. 

    The value defaults to **1**, indicating that one shard is to be created along with this collection.

    <div class="alert note">
    
    Sharding refers to distributing write operations to different nodes to make the most of the parallel computing potential of a Milvus cluster for writing data.
    
    By default, a collection contains one shard.

    </div>

- **consistency_level** (*int* | *str*)

    The consistency level of the target collection.

    The value defaults to **Bounded** (**1**) with options of **Strong** (**0**), **Bounded** (**1**), **Session** (**2**), and **Eventually** (**3**).

    <div class="alert note">
    
    Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.
    
    Milvus supports four consistency levels: **Strong**, **Bounded Staleness**, **Session**, and **Eventually**. The default consistency level in Milvus is bounded staleness.
    
    You can easily tune the consistency level when conducting a vector similarity search or query to make it best suit your application.

    </div>

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*Collection*

**RETURNS:**

A collection object.

**EXCEPTIONS:**

- **SchemaNotReadyException**

    This exception will be raised when the provided schema is invalid.

## Examples

```python
from pymilvus import Collection, CollectionSchema, FieldSchema, DataType

# Create a collection using the user-defined schema
primary_key = FieldSchema(
    name="id",
    dtype=DataType.INT64,
    is_primary=True,
)

vector = FieldSchema(
    name="vector",
    dtype=DataType.FLOAT_VECTOR,
    dim=768,
)

schema = CollectionSchema(
    fields = [primary_key, vector]
)

collection = Collection(
    name="test_01",
    schema=schema,
    using="default"
)
```

## Members

The following are the members of the `Collection` class:

