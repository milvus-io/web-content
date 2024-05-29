# create_collection()

This operation supports creating a collection with two separate modes: quick setup or customized setup. 

## Request syntax

```python
create_collection(
    collection_name: str,
    dimension: int,
    primary_field_name: str = "id",
    id_type: str = DataType,
    vector_field_name: str = "vector",
    metric_type: str = "COSINE",
    auto_id: bool = False,
    timeout: Optional[float] = None,
    schema: Optional[CollectionSchema] = None,    # this is customized setting
    index_params: Optional[IndexParams] = None,    # this is customized setting
    **kwargs,
) -> None
```

__PARAMETERS:__

- __collection_name__ (_str_) -

    __[REQUIRED]__

    The name of the collection to create.

- __dimension__ (_int_) -

    The dimension of the collection field to hold vector embeddings.

    The value is usually determined by the model you use to generate vector embeddings.

    This parameter is designed for the quick setup of a collection and will be ignored if __schema__ is not __None __and a field in the schema has its __dim __set to a positive integer.

- __primary_field_name__ (_str_) -

    The name of the primary field in this collection.

    The value defaults to __id__. You can use another name you see fit. Skip this parameter if you need to set up a collection with a customized schema.

    This parameter is designed for the quick setup of a collection and will ignored if the __schema__ is not __None __and a field in the schema has its __is_primary__ set to __True__.

- __id_type__ (_[DataType](./DataType.md)_) -

    The data type of the primary field in this collection.

    The value defaults to __DataType.INT64__. Possible values are __DataType.INT64__ and __DataType.VARCHAR__. 

    This parameter is designed for the quick setup of a collection and will be ignored if __schema__ is not __None__.

- __vector_field_name__ (_str_) -

    The name of the collection field to hold vector embeddings.

    The value defaults to __vector__. You can use another name you see fit. 

    This parameter is designed for the quick setup of a collection and will be ignored if __schema__ is not __None__.

- __metric_type__ (_str_) -

    The algorithm used for this collection to measure similarities between vector embeddings.

    The value defaults to __COSINE__. Possible values are __L2__, __IP__, and __COSINE__. For details on these metric types, refer to [Similarity Metrics](https://milvus.io/docs/metric.md).

    This parameter is designed for the quick setup of a collection and will be ignored if __schema__ is not __None__.

- __auto_id__ (_bool_) -

    Whether the primary field automatically increments upon data insertions into this collection.

    The value defaults to __False__. Setting this to __True__ makes the primary field automatically increment. 

    This parameter is designed for the quick setup of a collection and will be ignored if __schema__ is not __None__.

- __timeout__ (_float_ | _None_) -

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response returns or error occurs.

- __schema__ (_CollectionSchema_ | _None_)

    The schema of this collection.

    Setting this to __None__ indicates this collection will be created with quick setup. 

    To set up a collection with a customized schema, you need to create a __CollectionSchema__ object and reference it here. In this case, Milvus ignores all other schema-related settings carried in the request.

- __index_params__ (_IndexParams_ | _None_)

    The parameters for building the index on the vector field in this collection. To set up a collection with a customized schema and automatically load the collection to memory, you need to create an __IndexParams__ object and reference it here. 

    You should at least add an index for the vector field in this collection. You can also skip this parameter if you prefer to set up the index parameters later on.

- __kwargs__ -

    - __enable_dynamic_field__ (_bool_) -

        Whether to use a reserved JSON field named __$meta__ to store undefined fields and their values in key-value pairs.

        The value defaults to __True__, indicating that the __$meta__ field is used.

        This parameter is ignored if __schema__ is not __None__.

    - __num_shards__ (_int_) -

        The number of shards to create along with the creation of this collection. 

        The value defaults to __1__, indicating that two shards are to be created along with this collection.

        <div class="admonition note">

        <p><b>what is sharding?</b></p>

        <p>Sharding refers to distributing write operations to different nodes to make the most of the parallel computing potential of a Milvus cluster for writing data.</p>
        <p>By default, a collection contains two shards.</p>

        </div>

    - __partition_key_field__ (_str_) -

        The name of the field that serves as the partition key. Each collection can have one partition key.

        This parameter is ignored if __schema__ is not __None __and a field in the schema has its __is_parition_key__ set to __True__.

        <div class="admonition note">

        <p><b>what is the partition key?</b></p>

        <p>To facilitate partition-oriented multi-tenancy, you can set a field as the partition key field so that Milvus hashes the field values and distributes entities among the specified number of partitions accordingly.</p>
        <p>When retrieving entities, ensure that the partition key field is used in the boolean expression to filter out entities of a specific field value.</p>
        <p>For details, refer to <a href="https://milvus.io/docs/use-partition-key">Use Partition Key</a> and <a href="https://milvus.io/docs/multi_tenancy.md">Multi-tenancy</a>.</p>

        </div>

    - __num_partitions__ (_int_) -

        The number of partitions to create for the partition key feature.

        The value defaults to __64__, indicating that 64 partitions are to be created along with this collection. This parameter applies when __partition_key_field __is set to the name of a field.

    - __consistency_level__ (_int_ | _str_)

        The consistency level of the target collection.

        The value defaults to __Bounded __(__2__) with options of __Strong __(__0__), __Session __(__1__), __Bounded __(__2__), and __Eventually __(__3__).

        <div class="admonition note">

        <p><b>what is the consistency level?</b></p>

        <p>Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.</p>
        <p>Milvus supports four consistency levels: <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, and <strong>Eventually</strong>. The default consistency level in Milvus is <strong>Bounded Staleness</strong>.</p>
        <p>You can easily tune the consistency level when conducting a vector similarity search or query to make it best suit your application.</p>

        </div>

    - __properties__ (_dict_) -

        Additional properties in key-value pairs.

        - __collection.ttl.seconds__ (_int_)

            The time-to-live (TTL) of a collection in seconds.

__RETURN TYPE:__

_NoneType_

__RETURNS:__

None

__EXCEPTIONS:__

- __PrimaryKeyException__

    This exception will be raised if the data type of the primary field is not an integer or a string.

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Examples

### Set up a Milvus client

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)
```

### Create a collection

You can choose between a quick setup or a customized setup as follows:

- __Quick setup__

    The quick setup collection has two required fields: the primary and vector fields. It also allows the insertion of undefined fields and their values in key-value pairs in a dynamic field.

    ```python
    client.create_collection(
        collection_name="test_collection", 
        dimension=5
    )
    ```

    In the above setup, 

    - The primary and vector fields use their default names (__id__ and __vector__).

    - The metric type is also set to its default value (__COSINE__).

    - The primary field accepts integers and does not automatically increments.

    - The reserved JSON field named __$meta__ is used to store non-schema-defined fields and their values.

    You can modify the names of the primary and vector fields and change the metric type. Additionally, the primary field can be set to increment automatically.

    ```python
    client.create_collection(
        collection_name="quick_setup",
        dimension=5,
        primary_field_name="my_id",
        id_type="string",
        vector_field_name="my_vector",
        metric_type="L2",
        auto_id=True,
        max_length=512
    )
    ```

    In the above code, the collection will be created, automatically indexed and loaded into memory.

- __Customized setup with index parameters__

    For a customized setup, create the schema and index parameters beforehand. 

    ```python
    from pymilvus import MilvusClient, DataType
    
    # 1. Create schema
    schema = MilvusClient.create_schema(
        auto_id=False,
        enable_dynamic_field=False,
    )
    
    # 2. Add fields to schema
    schema.add_field(field_name="my_id", datatype=DataType.INT64, is_primary=True)
    schema.add_field(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=5)
    
    # 3. Prepare index parameters
    index_params = client.prepare_index_params()
    
    # 4. Add indexes
    index_params.add_index(
        field_name="my_id",
        index_type="STL_SORT"
    )
    
    index_params.add_index(
        field_name="my_vector", 
        index_type="AUTOINDEX",
        metric_type="L2",
        params={"nlist": 1024}
    )
    
    # 5. Create a collection
    client.create_collection(
        collection_name="customized_setup",
        schema=schema,
        index_params=index_params
    )
    ```

    In the above code, the collection will be created, indexed with customized settings and automatically loaded into memory.

- __Customized setup without index parameters__

    ```python
    from pymilvus import MilvusClient, DataType
    
    # 1. Create schema
    schema = MilvusClient.create_schema(
        auto_id=False,
        enable_dynamic_field=False,
    )
    
    # 2. Add fields to schema
    schema.add_field(field_name="my_id", datatype=DataType.INT64, is_primary=True)
    schema.add_field(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=5)
    
    # 3. Create a collection
    client.create_collection(
        collection_name="customized_setup",
        schema=schema
    )
    ```

    In the above code, the collection will also be created, but since it lacks index_params, so its data will not indexed and loaded into memory automatically.

## Related methods

- [create_schema()](./create_schema.md)

- [describe_collection()](./describe_collection.md)

- [drop_collection()](./drop_collection.md)

- [get_collection_stats()](./get_collection_stats.md)

- [has_collection()](./has_collection.md)

- [list_collections()](./list_collections.md)

- [rename_collection()](./rename_collection.md)

- [IndexType](./IndexType.md)

- [DataType](./DataType.md)

