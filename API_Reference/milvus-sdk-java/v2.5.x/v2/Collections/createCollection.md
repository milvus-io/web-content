# createCollection()

This operation creates a collection either with default or customized settings. 

```java
public void createCollection(CreateCollectionReq request)
```

## Request Syntax

```java
createCollection(CreateCollectionReq.builder()
    .collectionName(String collectionName)
    .description(String collectionDescription)
    .dimension(int dimension)
    .primaryFieldName(String primaryFieldName)
    .idType(DataType datatype)
    .maxLength(int maxLength)
    .vectorFieldName(String vectorFieldName)
    .metricType(String metricType)
    .autoID(boolean autoID)
    .enableDynamicField(boolean enableDynamicField)
    .numShards(int numShards)
    .collectionSchema(CreateCollectionReq.CollectionSchema collectionSchema)
    .indexParams(List<IndexParam> indexParams)
    .numPartitions(int numPartitions)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of the collection to create.

- `description(String collectionDescription)`

    Description of the collection, default to empty.

- `dimension(int dimension)`

    The dimensionality of the collection field that holds vector embeddings.

    The value should be greater than 1 and is usually determined by the model you use to generate vector embeddings.

    This is required to set up a collection with default settings. Skip this parameter if you need to set up a collection with a customized schema.

- `primaryFieldName(String primaryFieldName)`

    The name of the primary field in this collection.

    The value defaults to **id**. You can use another name you see fit. Skip this parameter if you need to set up a collection with a customized schema.

- `idType(DataType idType)`

    The data type of the primary field in this collection.

    The value defaults to **DataType.Int64**. Skip this parameter if you need to set up a collection with a customized schema.

    Skip this parameter if you need to set up a collection with a customized schema.

- `maxLength(int maxLength)`

    The maximum number of characters or elements allowed for string or array fields within the collection.

    This parameter is required if **primaryFieldType** is set to **VarChar**.

    The value defaults to **65535**.

- `vectorFieldName(String vectorFieldName)`

    The name of the collection field to hold vector embeddings.

    The value defaults to **vector**. You can use another name you see fit. Skip this parameter if you need to set up a collection with a customized schema.

- `metricType(String metricType)`

    The algorithm used for this collection to measure similarities between vector embeddings.

    The value defaults to **IP**. Possible values are **L2**, **IP**, and **COSINE**. For details on these metric types, refer to [Similarity Metrics](https://milvus.io/docs/metric.md).

- `autoID(boolean autoID)`

    Whether the primary field automatically increments upon data insertions into this collection.

    The value defaults to **False**. Setting this to **True** makes the primary field automatically increment. Skip this parameter if you need to set up a collection with a customized schema.

    The auto-generated IDs have a fixed length and cannot be altered.

- `enableDynamicField(boolean enableDynamicField)`

    Whether to use a reserved JSON field named **$meta** to store undefined fields and their values in key-value pairs.

    The value defaults to **True**, indicating that the meta field is used.

    If you create a collection with a schema, configure this parameter using the **[createSchema](createSchema.md)** method.

- `numShards(int numShards)`

    The number of shards to create along with the collection.

    The value defaults to **1**, indicating that one shard is to be created along with this collection.

    <div class="admonition note">

    <p><b>what is sharding?</b></p>

    <p>Sharding refers to distributing write operations to different nodes to make the most of the parallel computing potential of a Milvus cluster for writing data.</p>
    <p>By default, a collection contains one shard.</p>

    </div>

- `collectionSchema(CreateCollectionReq.CollectionSchema collectionSchema)`

    The schema of this collection.

    Leaving it empty indicates this collection will be created with default settings. To set up a collection with a customized schema, you need to create a **CollectionSchema** object and reference it here.

- `indexParams(List<IndexParam> indexParams)`

    The parameters for building the index on the vector field in this collection. To set up a collection with a customized schema and automatically load the collection to memory, create an **IndexParams** object with a list of [IndexParam](../Management/IndexParam.md) objects and reference it here.

    You should at least add an index for the vector field in this collection. You can also skip this parameter if you prefer to set up the index parameters later on.

- `numPartitions(int numPartitions)`

    The number of partitions. Used when isPartitionKey is set to true in Field Schema. Default is 64.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

### Create a collection

You can choose between a quick setup or a customized setup as follows:

- **Quick setup**

    The quick setup collection has two fields: the primary and vector fields. It also allows the insertion of undefined fields and their values in key-value pairs in a dynamic field.

    ```java
    import io.milvus.v2.client.ConnectConfig;
    import io.milvus.v2.client.MilvusClientV2;
    import io.milvus.v2.service.collection.request.CreateCollectionReq;
    
    // 1. Set up a client
    ConnectConfig connectConfig = ConnectConfig.builder()
            .uri("http://localhost:19530")
            .token("root:Milvus")
            .build();
            
    MilvusClientV2 client = new MilvusClientV2(connectConfig);
    
    // 2. Quickly create a collection
    CreateCollectionReq createCollectionReq = CreateCollectionReq.builder()
            .collectionName(collectionName)
            .dimension(dim)
            .build();
    client.createCollection(createCollectionReq);
    
    ```

- **Customized setup with index parameters**

    For a customized setup, create the schema and index parameters beforehand. 

    ```java
    import io.milvus.v2.client.ConnectConfig;
    import io.milvus.v2.client.MilvusClientV2;
    import io.milvus.v2.common.DataType;
    import io.milvus.v2.common.IndexParam;
    import io.milvus.v2.service.collection.request.AddFieldReq;
    import io.milvus.v2.service.collection.request.CreateCollectionReq;
    
    // 1. Set up a client
    ConnectConfig connectConfig = ConnectConfig.builder()
            .uri("http://localhost:19530")
            .token("root:Milvus")
            .build();
            
    MilvusClientV2 client = new MilvusClientV2(connectConfig);
    
    // 2. Create a collection with schema, when indexParams is specified, it will create index as well
    CreateCollectionReq.CollectionSchema collectionSchema = client.createSchema();
    collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).description("id").build());
    collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(dim).build());
    
    IndexParam indexParam = IndexParam.builder()
            .fieldName("vector")
            .metricType(IndexParam.MetricType.COSINE)
            .build();
    CreateCollectionReq createCollectionReq = CreateCollectionReq.builder()
            .collectionName(collectionName)
            .collectionSchema(collectionSchema)
            .indexParams(Collections.singletonList(indexParam))
            .build();
    client.createCollection(createCollectionReq);
    ```
