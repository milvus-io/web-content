# getImportProgress()

Retrieves the current state and progress of a bulk import job in Milvus or Zilliz Cloud.

```java
public static String getImportProgress(String url, BaseDescribeImportRequest request)
```

## Request Syntax

Use this request for an import job created in open-source Milvus.

```java
MilvusDescribeImportRequest.builder()
    .apiKey(apiKey)
    .jobId(jobId)
    .build();
```

**PARAMETERS:**

- **apiKey** (*String*) -
Milvus authentication in `username:password` form.

- **jobId** (*String*) -
Identifier of the import job to inspect.

**RETURN TYPE:**

*String*

**RETURNS:**


A JSON response containing the import job state, progress, and related details.

## Example

Gets import progress for a job created in Milvus.

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import java.util.Arrays;
import java.util.Collections;
import io.milvus.bulkwriter.request.import_.MilvusImportRequest;
import io.milvus.bulkwriter.request.describe.MilvusDescribeImportRequest;
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


// 2. Import data files and get the job ID from the response
MilvusImportRequest importRequest = MilvusImportRequest.builder()
    .collectionName("books")
    .files(Arrays.asList(Arrays.asList("bulk_data/books.parquet")))
    .apiKey("root:Milvus")
    .build();
String importResp = BulkImportUtils.bulkImport("http://localhost:19530", importRequest);
String jobId = new com.google.gson.JsonParser().parse(importResp).getAsJsonObject()
        .getAsJsonObject("data").get("jobId").getAsString();

// 3. Query the import progress by job ID
MilvusDescribeImportRequest request = MilvusDescribeImportRequest.builder()
    .jobId(jobId)
    .apiKey("root:Milvus")
    .build();
String response = BulkImportUtils.getImportProgress("http://localhost:19530", request);
```
