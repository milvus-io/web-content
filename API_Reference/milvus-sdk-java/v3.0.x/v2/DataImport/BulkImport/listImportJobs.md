# listImportJobs()

This operation lists all existing import jobs regarding the specified collection.

```java
public static String listImportJobs(String url, BaseListImportJobsRequest request)
```

## Request Syntax

```java
bulkImport.listImportJobs(
    url,
    request
)
```

**PARAMETERS:**

- **url** (*String*) -

    The endpoint of the connected Milvus instance.

- **request** (*[BaseListImportRequest](listImportJobs.md)*) -  

    A **BaseImportRequest** instance.

**RETURN TYPE:**

*String*

**RETURNS:**

A list of import job IDs of the specified collection.

## BaseListImportRequest

A **BaseListImportRequest** instance is implemented in **MilvusListImportRequest**.

### MilvusListImportRequest

```java
MilvusListImportRequest.builder()
    .collectionName(String collectionName)
    .build()
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of the target collection of this operation.

## Example

Lists import jobs for a collection in Milvus.

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import java.util.Arrays;
import java.util.Collections;
import io.milvus.bulkwriter.request.list.MilvusListImportJobsRequest;
import io.milvus.bulkwriter.restful.BulkImportUtils;

// 1. Set up a client and create a collection
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(4).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("books")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());


// 2. List the import jobs of the collection
MilvusListImportJobsRequest request = MilvusListImportJobsRequest.builder()
    .dbName("default")
    .collectionName("books")
    .apiKey("root:Milvus")
    .build();
String response = BulkImportUtils.listImportJobs("http://localhost:19530", request);
```

