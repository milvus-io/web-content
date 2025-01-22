# create_collection()

This operation supports creating a collection in two distinct ways: quick setup or custom setup. 

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
    schema: Optional[CollectionSchema] = None, # Used for custom setup
    index_params: Optional[IndexParams] = None, # Used for custom setup
    **kwargs,
) -> None
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection to create.

- **dimension** (*int*) -

    The dimension of the collection field to hold vector embeddings.

    The value is usually determined by the model you use to generate vector embeddings and should be an integer greater than 1.

    This parameter is designed for the quick setup of a collection and will be ignored if **schema** is not **None** and a field in the schema has its **dim** set to a positive integer.

- **primary_field_name** (*str*) -

    The name of the primary field in this collection.

    The value defaults to **id**. You can use another name you see fit. Skip this parameter if you need to set up a collection with a customized schema.

    This parameter is designed for the quick setup of a collection and will ignored if the **schema** is not **None** and a field in the schema has its **is_primary** set to **True**.

- **id_type** (*[DataType](DataType.md)*) -

    The data type of the primary field in this collection.

    The value defaults to **DataType.INT64**. Possible values are **DataType.INT64** and **DataType.VARCHAR**. 

    This parameter is designed for the quick setup of a collection and will be ignored if **schema** is not **None**.

- **vector_field_name** (*str*) -

    The name of the collection field to hold vector embeddings.

    The value defaults to **vector**. You can use another name you see fit. 

    This parameter is designed for the quick setup of a collection and will be ignored if **schema** is not **None**.

- **metric_type** (*str*) -

    The algorithm used for this collection to measure similarities between vector embeddings.

    The value defaults to **COSINE**. Possible values are **L2**, **IP**, and **COSINE**. For details on these metric types, refer to [Similarity Metrics](https://milvus.io/docs/metric.md).

    This parameter is designed for the quick setup of a collection and will be ignored if **schema** is not **None**.

- **auto_id** (*bool*) -

    Whether the primary field automatically increments upon data insertions into this collection.

    The value defaults to **False**. Setting this to **True** makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors. The auto-generated IDs have a fixed length and cannot be altered.

    This parameter is designed for the quick setup of a collection and will be ignored if **schema** is not **None**.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

- **schema** (*CollectionSchema* | *None*)

    The schema of this collection.

    Setting this to **None** indicates this collection will be created in a quick setup manner. 

    To set up a collection with a customized schema, you need to create a **CollectionSchema** object and reference it here. In this case, Milvus ignores all other schema-related settings carried in the request.

- **index_params** (*IndexParams* | *None*)

    The parameters for building the index on the vector field in this collection. To set up a collection with a customized schema and automatically load the collection to memory, you need to create an **IndexParams** object and reference it here. 

    You should at least add an index for the vector field in this collection. You can also skip this parameter if you prefer to set up the index parameters later on.

- **kwargs** -

    - **enable_dynamic_field** (*bool*) -

        Whether to use a reserved JSON field named **$meta** to store undefined fields and their values in key-value pairs.

        The value defaults to **True**, indicating that the **$meta** field is used.

        This parameter is ignored if **schema** is not **None**.

    - **num_shards** (*int*) -

        The number of shards to create along with the creation of this collection. 

        The value defaults to **1**, indicating that one shard is to be created along with this collection.

        This parameter is not applicable to Milvus Lite. For more information on Milvus Lite limits, refer to [Run Milvus Lite](https://milvus.io/docs/milvus_lite.md).

        <div class="admonition note">

        <p><b>what is sharding?</b></p>

        <p>Sharding refers to distributing write operations to different nodes to make the most of the parallel computing potential of a Milvus cluster for writing data.</p>
        <p>By default, a collection contains one shard.</p>

        </div>

    - **partition_key_field** (*str*) -

        The name of the field that serves as the partition key. Each collection can have one partition key.

        This parameter is ignored if **schema** is not **None** and a field in the schema has its **is_parition_key** set to **True**.

        This parameter is not applicable to Milvus Lite. For more information on Milvus Lite limits, refer to [Run Milvus Lite](https://milvus.io/docs/milvus_lite.md).

        <div class="admonition note">

        <p><b>what is the partition key?</b></p>

        <p>To facilitate partition-oriented multi-tenancy, you can set a field as the partition key field so that Milvus hashes the field values and distributes entities among the specified number of partitions accordingly.</p>
        <p>When retrieving entities, ensure that the partition key field is used in the boolean expression to filter out entities of a specific field value.</p>
        <p>For details, refer to <a href="https://milvus.io/docs/use-partition-key">Use Partition Key</a> and <a href="https://milvus.io/docs/multi_tenancy.md">Multi-tenancy</a>.</p>

        </div>

    - **num_partitions** (*int*) -

        The number of partitions to create for the partition key feature.

        The value defaults to **64**, indicating that 64 partitions are to be created along with this collection. This parameter applies when **partition_key_field** is set to the name of a field.

    - **consistency_level** (*int* | *str*)

        The consistency level of the target collection.

        The value defaults to **Bounded** (**2**) with options of **Strong** (**0**), **Session** (**1**), **Bounded** (**2**), and **Eventually** (**3**).

        When you run Milvus Lite, the only valid value for this parameter is **Strong**. For more information on Milvus Lite limits, refer to [Run Milvus Lite](https://milvus.io/docs/milvus_lite.md).

        <div class="admonition note">

        <p><b>what is the consistency level?</b></p>

        <p>Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.</p>
        <p>Milvus supports four consistency levels: <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, and <strong>Eventually</strong>. The default consistency level in Milvus is <strong>Bounded Staleness</strong>.</p>
        <p>You can easily tune the consistency level when conducting a vector similarity search or query to make it best suit your application.</p>

        </div>

    - **properties** (*dict*) -

        Additional properties in key-value pairs.

        - **collection.ttl.seconds** (*int*)

            The time-to-live (TTL) of a collection in seconds.

        - **mmap.enabled** (*bool*) -

            Whether to enable mmap for the raw data and indexes of all fields in the collection.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **PrimaryKeyException**

    This exception will be raised if the data type of the primary field is not an integer or a string.

- **MilvusException**

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

- **Quick setup**

    The quick setup collection has two mandatory fields: the primary and vector fields. It also allows the insertion of undefined fields and their values in key-value pairs in a dynamic field.

    ```python
    client.create_collection(
        collection_name="test_collection", 
        dimension=5
    )
    ```

    In the above setup, 

    - The primary and vector fields use their default names (**id** and **vector**).

    - The metric type is also set to its default value (**COSINE**).

    - The primary field accepts integers and does not automatically increments.

    - The reserved JSON field named **$meta** is used to store non-schema-defined fields and their values.

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

    In the above code, the collection will be created, indexed, and loaded into memory.

- **Customized setup with index parameters**

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

    In the above code, the collection will be created, indexed, and loaded into memory.

- **Customized setup without index parameters**

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

    In the above code, the collection will also be created. However, without `index_param`, data in the collection will not be indexed and loaded into memory.

## Related methods

- [create_schema()](create_schema.md)

- [describe_collection()](describe_collection.md)

- [drop_collection()](drop_collection.md)

- [get_collection_stats()](get_collection_stats.md)

- [has_collection()](has_collection.md)

- [list_collections()](list_collections.md)

- [rename_collection()](rename_collection.md)

- [IndexType](IndexType.md)

- [DataType](DataType.md)

