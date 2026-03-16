# createCollection()

This operation creates a collection either with default or customized settings. 

```java
public void createCollection(CreateCollectionReq request)
```

## Request Syntax

```java
createCollection(CreateCollectionReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .description(String description)
    .dimension(Integer dimension)
    .primaryFieldName(String primaryFieldName)
    .idType(DataType idType)
    .maxLength(Integer maxLength)
    .vectorFieldName(String vectorFieldName)
    .metricType(String metricType)
    .autoID(Boolean autoID)
    .enableDynamicField(Boolean enableDynamicField)
    .numShards(Integer numShards)
    .collectionSchema(CollectionSchema collectionSchema)
    .indexParams(List<IndexParam> indexParams)
    .numPartitions(Integer numPartitions)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .properties(final Map<String, String> properties)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    The name of the target collection.

- `description(String description)` -

    A description of the collection. Defaults to `""`.

- `dimension(Integer dimension)` -

    The dimension of the vector field.

- `primaryFieldName(String primaryFieldName)` -

    The name of the primary key field. Defaults to `"id"`.

- `idType(DataType idType)` -

    The data type of the primary key field. Defaults to `DataType.Int64`.

- `maxLength(Integer maxLength)` -

    The maximum length for varchar fields. Defaults to `65535`.

- `vectorFieldName(String vectorFieldName)` -

    The name of the vector field. Defaults to `"vector"`.

- `metricType(String metricType)` -

    The metric type for vector similarity. Defaults to `IndexParam.MetricType.COSINE.name()`.

- `autoID(Boolean autoID)` -

    Whether to auto-generate primary key values. Defaults to `Boolean.FALSE`.

- `enableDynamicField(Boolean enableDynamicField)` -

    Whether to enable the dynamic field. Defaults to `Boolean.TRUE`.

- `numShards(Integer numShards)` -

    The number of shards for the collection. Defaults to `1`.

- `collectionSchema(CollectionSchema collectionSchema)` -

    A CollectionSchema object defining the collection structure.

- `indexParams(List<IndexParam> indexParams)` -

    A list of IndexParam objects defining the index configuration. Defaults to `new ArrayList<>()`.

- `numPartitions(Integer numPartitions)` -

    The number of partitions for the collection.

- `consistencyLevel(ConsistencyLevel consistencyLevel)` -

    The consistency level for the operation. Defaults to `ConsistencyLevel.BOUNDED`.

- `properties(final Map<String, String> properties)` -

    A map of collection properties. Defaults to `new HashMap<>()`.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

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
