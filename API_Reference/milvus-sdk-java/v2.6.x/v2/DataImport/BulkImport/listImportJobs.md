# listImportJobs()

Lists bulk import jobs in Milvus or Zilliz Cloud.

```java
public static String listImportJobs(String url, BaseListImportJobsRequest request)
```

## Request Syntax

Use this request to list import jobs in open-source Milvus.

```java
MilvusListImportJobsRequest.builder()
    .apiKey(apiKey)
    .collectionName(collectionName)
    .dbName(dbName)
    .build();
```

**PARAMETERS:**

- **apiKey** (*String*) -
Milvus authentication in `username:password` form.

- **collectionName** (*String*) -
Collection whose import jobs should be listed.

- **dbName** (*String*) -
Database containing the collection.

**RETURN TYPE:**

*String*

**RETURNS:**


A JSON response containing the matching import jobs and pagination details.

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
