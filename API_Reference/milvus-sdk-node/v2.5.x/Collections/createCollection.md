# createCollection()

This operation creates a collection either with default or customized settings. 

```javascript
createCollection(data): Promise<ResStatus>
```

## Request Syntax

This method has the following alternatives.

### With CreateColReq

Using this request body, you can create a collection by simply setting the collection name and dimension of the vector field.

```javascript
milvusClient.createCollection({
    collection_name: string;
    dimension: number;
    auto_id?: boolean;
    consistency_level?: "Strong" | "Session" | "Bounded" | "Eventually" | "Customized";
    description?: string;
    enableDynamicField?: boolean;
    enable_dynamic_field?: boolean;
    id_type?: Int64 | VarChar;
    index_params?: CreateIndexParam;
    metric_type?: string;
    primary_field_name?: string;
    vector_field_name?: string;
    timeout?: number;
 })
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection to create.

- **dimension** (*number*) -

    The dimensionality of the vector embeddings. The value should be an integer greater than 1. Skip this if you need to customize the collection schema.

- **auto_id** (*boolean*) - 

    Whether the primary field automatically increments upon data insertions into this collection.

    The value defaults to **False**. Setting this to **True** makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors. The auto-generated IDs have a fixed length and cannot be altered.

    This parameter is designed for the quick setup of a collection and will be ignored if **schema** is not **None**.

- **consistency_level** (*number* | *string*)

    The consistency level of the target collection.

    The value defaults to **Bounded** with options of **Strong**, **Bounded**, **Session**,  **Eventually**, and **Customized**.

    <div class="admonition note">

    <p><b>what is the consistency level?</b></p>

    <p>Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.</p>
    <p>Milvus supports four consistency levels: <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, and <strong>Eventually</strong>. The default consistency level in Milvus is <strong>Bounded Staleness</strong>.</p>
    <p>You can easily tune the consistency level when conducting a vector similarity search or query to make it best suit your application.</p>

    </div>

- **description** (*string)* -

    The description of the collection to create.

- **enable_dynamic_field** (*boolean)* -

    Whether to use a reserved JSON field named **$meta** to store undefined fields and their values in key-value pairs.

    The value defaults to **True**, indicating that the meta field is used.

- **id_type** (*Int64* | *VarChar*) -

    The data type of the primary field.

- **index_params** (*CreatIndexParam*) -

    The index parameters for the collection to create.

- **metric_type** (*string*) -

    The metric type determines how similarities between vector embeddings are measured.

- **primary_field_name** (*string*) -

    The custom name of the primary field.

- **vector_field_name** (*string*) -

    The custom name of the vector field.

- **timeout** (number) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

### With CreateCollectionReq

Using this request body, you can customize the schema settings of the collection.

```javascript
milvusClient.createCollection({
   collection_name: string,
   consistency_level: number | string,
   description: string,
   enableDynamicField: boolean,
   schema: [
     {
       name: string,
       description: "vector field",
       data_type: DataType.FloatVector,
       type_params: {
         dim: "8"
       },
       nullable: boolean,
       default_value: DataType
     }
   ],
   num_partitions?: number,
   partition_key_field?: string,
   shards_num?: number,
   timeout?: number
 })
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection to create.

- **consistency_level** (*number* | *string*)

    The consistency level of the target collection.

    The value defaults to **Bounded** with options of **Strong**, **Bounded**, **Session**,  **Eventually**, and **Customized**.

    <div class="admonition note">

    <p><b>what is the consistency level?</b></p>

    <p>Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.</p>
    <p>Milvus supports four consistency levels: <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, and <strong>Eventually</strong>. The default consistency level in Milvus is <strong>Bounded Staleness</strong>.</p>
    <p>You can easily tune the consistency level when conducting a vector similarity search or query to make it best suit your application.</p>

    </div>

- **description** (*string)* -

    The description of the collection to create.

- **enable_dynamic_field** (*boolean)* -

    Whether to use a reserved JSON field named **$meta** to store undefined fields and their values in key-value pairs.

    The value defaults to **True**, indicating that the meta field is used.

- **schema** (*FieldType[]*) -

    - **name** (*string)* -

        The name of the field.

    - **data_type** (*string)* -

        The data type of the field. For an enumeration of all available data types, please see [DataType](DataType.md).

    - **description** (*string)* -

        The description of the field.

    - **type_params** (*string* | *number)* -

        Other parameters for the field.

        - **auto_id** (*boolean)* -

            Whether the primary field automatically increments upon data insertions into this collection.

            The value defaults to **False**. Setting this to **True** makes the primary field automatically increment. Skip this parameter if you need to set up a collection with a customized schema.

        - **dim** (*string* | *number*) -

            The dimensionality of the collection field that holds vector embeddings. 

            The value should be an integer greater than 1 and is usually determined by the model you use to generate vector embeddings.

        - **element_type** (string) -

            The data type of the elements in an array. 

            This parameter applies if the current field is an array field.

        - **is_partition_key** (*boolean)* -

            A boolean value indicating whether this field will work as the partition key field.

        - **is_primary_key** (*boolean)* -

            Whether the field will work as the primary key.

            The value defaults to **False**. Setting this to **True** makes the field a primary key field which is unique throughout the collection.

        - **max_capacity** (*string* | *number)* -

            The number of elements in an array.

            This parameter applies if the current field is an array field.

        - **max_length** (*string*) -

            The maximum lengths of a string in this field.

            This is required when the **data_type** of this field is **VARCHAR**.

        - **type_params** (*object*) -

            Extra parameters for the current field in key-value pairs.

    - **nullable** (*boolean*) -

        A Boolean parameter that specifies whether the field can accept null values. Valid values:

        - **true**: The field can contain null values, indicating that the field is optional, and missing data is permitted for entries.

        - **false** (default): The field must contain a valid value for each entity; missing data is not allowed, making the field mandatory.

        For more information, refer to [Nullable & Default](https://milvus.io/docs/nullable-and-default.md).

    - **default_value** (*DataType*)

        Sets a default value for a specific field in a collection schema when creating it. This is particularly useful when you want certain fields to have an initial value even if no value is explicitly provided during data insertion.

- **num_partitions** (*number)* -

    The number of partitions to create in the collection.

    <div class="admonition note">

    <p><b>what is partitioning?</b></p>

    <p>Data partitioning is a technique used to organize data based on certain criteria. With data partitioning, you can create, load, release, and drop partitions separately, as well as conduct searches and queries within them.</p>

    </div>

- **partition_key_field** (*boolean)* -

    A boolean value indicating whether to enable partition key.

    <div class="admonition note">

    <p><b>what is a partition key?</b></p>

    <p>Partition key are used to store entities into different partitions based on their key values. In other words, a partition key groups entities with the same key together and irrelevant partitions can avoid being scanned when you filter by the key field. Partition keys can greatly speed up query performance compared to traditional filtering methods.</p>

    </div>

- **shards_num** (*number)* -

    The number of shards to create along with the creation of this collection. 

    The value defaults to **1**, indicating that one shard is to be created along with this collection.

    <div class="admonition note">

    <p><b>what is sharding?</b></p>

    <p>Sharding refers to distributing write operations to different nodes to make the most of the parallel computing potential of a Milvus cluster for writing data.</p>
    <p>By default, a collection contains one shard.</p>

    </div>

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

### With CreateCollectionWithSchemaAndIndexParamsReq

Using this request body, you can customize the schema and index settings of the collection. Upon creation, the collection is automatically loaded.

```javascript
milvusClient.createCollection({
   collection_name: string,
   consistency_level: number | string,
   description: string,
   enableDynamicField: boolean,
   schema: [
     {
       name: string,
       description: "vector field",
       data_type: DataType.FloatVector,
       type_params: {
         dim: "8"
       },
       nullable: boolean,
       default_value: DataType
     }
   ],
   num_partitions?: number,
   partition_key_field?: string,
   shards_num?: number,
   timeout?: number,
   index_params: [
     {
       field_name: string,
       index_name?: string,
       index_type: string,
       metric_type?: string,
       params?: keyValueObj
     }     
   ]
 })
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection to create.

- **consistency_level** (*number* | *string*)

    The consistency level of the target collection.

    The value defaults to **Bounded** with options of **Strong**, **Bounded**, **Session**,  **Eventually**, and **Customized**.

    <div class="admonition note">

    <p><b>what is the consistency level?</b></p>

    <p>Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.</p>
    <p>Milvus supports four consistency levels: <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, and <strong>Eventually</strong>. The default consistency level in Milvus is <strong>Bounded Staleness</strong>.</p>
    <p>You can easily tune the consistency level when conducting a vector similarity search or query to make it best suit your application.</p>

    </div>

- **description** (*string)* -

    The description of the collection to create.

- **enable_dynamic_field** (*boolean)* -

    Whether to use a reserved JSON field named **$meta** to store undefined fields and their values in key-value pairs.

    The value defaults to **True**, indicating that the meta field is used.

- **schema** (*FieldType[]*) -

    - **name** (*string)* -

        The name of the field.

    - **data_type** (*string)* -

        The data type of the field. For an enumeration of all available data types, please see [DataType](DataType.md).

    - **description** (*string)* -

        The description of the field.

    - **type_params** (*string* | *number)* -

        Other parameters for the field.

        - **auto_id** (*boolean)* -

            Whether the primary field automatically increments upon data insertions into this collection.

            The value defaults to **False**. Setting this to **True** makes the primary field automatically increment. Skip this parameter if you need to set up a collection with a customized schema.

        - **default_value** (*string* | *number*)

            The default value for the field.

        - **dim** (*string* | *number*) -

            The dimensionality of the collection field that  holds vector embeddings.

            The value should be greater than 1 and is usually determined by the model you use to generate vector embeddings.

        - **element_type** (string) -

            The data type of the elements in an array. 

            This parameter applies if the current field is an array field.

        - **is_partition_key** (*boolean)* -

            A boolean value indicating whether this field will work as the partition key field.

        - **is_primary_key** (*boolean)* -

            Whether the field will work as the primary key.

            The value defaults to **False**. Setting this to **True** makes the field a primary key field which is unique throughout the collection.**max_capacity** (*string* | *number)* -

        - **max_length** (*string*) -

            The maximum lengths of a string in this field.

            This is required when the **data_type** of this field is **VARCHAR**.

        - **type_params** (*object*) -

            Extra parameters for the current field in key-value pairs.

    - **nullable** (*boolean*) -

        A Boolean parameter that specifies whether the field can accept null values. Valid values:

        - **true**: The field can contain null values, indicating that the field is optional, and missing data is permitted for entries.

        - **false** (default): The field must contain a valid value for each entity; missing data is not allowed, making the field mandatory.

        For more information, refer to [Nullable & Default](https://milvus.io/docs/nullable-and-default.md).

    - **default_value** (*DataType*)

        Sets a default value for a specific field in a collection schema when creating it. This is particularly useful when you want certain fields to have an initial value even if no value is explicitly provided during data insertion.

- **num_partitions** (*number)* -

    The number of partitions to create in the collection.

    <div class="admonition note">

    <p><b>what is partitioning?</b></p>

    <p>Data partitioning is a technique used to organize data based on certain criteria. With data partitioning, you can create, load, release, and drop partitions separately, as well as conduct searches and queries within them.</p>

    </div>

- **partition_key_field** (*boolean)* -

    A boolean value indicating whether to enable partition key.

    <div class="admonition note">

    <p><b>what is a partition key?</b></p>

    <p>Partition key are used to store entities into different partitions based on their key values. In other words, a partition key groups entities with the same key together and irrelevant partitions can avoid being scanned when you filter by the key field. Partition keys can greatly speed up query performance compared to traditional filtering methods.</p>

    </div>

- **shards_num** (*number)* -

    The number of shards to create along with the creation of this collection. 

    The value defaults to **1**, indicating that one shard is to be created along with this collection.

    <div class="admonition note">

    <p><b>what is sharding?</b></p>

    <p>Sharding refers to distributing write operations to different nodes to make the most of the parallel computing potential of a Milvus cluster for writing data.</p>
    <p>By default, a collection contains one shard.</p>

    </div>

- **timeout** (*number*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

- **index_params** (*CreateIndexSimpleReq[]* | *CreateIndexSimpleReq*)

    The index parameters.

    - **field_name** (*string*) -

        The name of the field to index.

    - **index_name** (*string*) -

        The name of the index file to generate.

    - **index_type** (*string*) -

        The type of index algorithm to use.

    - **metric_type** (*string*) -

        The metric type used to measure similarity between vector embeddings.

    - **params** (*KeyValueObj*) -

        Extra index-related parameters in key-value pairs.

**RETURNS** *Promise\<ResStatus>*

This method returns a promise that resolves to a **ResStatus** object.

```javascript
{
    code: number,
    error_code: string | number,
    reason: string
}
```

**PARAMETERS:**

- **code** (*number*) -

    A code that indicates the operation result. It remains **0** if this operation succeeds.

- **error_code** (*string* | *number*) -

    An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

- **reason** (*string*) - 

    The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
const milvusClient = new milvusClient(MILUVS_ADDRESS);
 const resStatus = await milvusClient.createCollection({
   collection_name: 'my_collection',
   fields: [
     {
       name: "vector_01",
       description: "vector field",
       data_type: DataType.FloatVector,
       type_params: {
         dim: "8"
       }
     },
     {
       name: "age",
       data_type: DataType.Int64,
       autoID: true,
       is_primary_key: true,
       description: "",
     },
   ],
 });
```

