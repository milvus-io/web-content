# getImportProgress()

This operation gets the progress of the specified bulk-import job.

```java
public static String getImportProgress(String url, BaseDescribeImportRequest request)
```

## Request Syntax

```java
bulkImport.getImportProgress(
    url,
    request
)
```

**PARAMETERS:**

- **url** (*String*) -

    The endpoint of the connected Milvus instance.

- **request** (*[BaseDescribeImportRequest](getImportProgress.md)*) -  

    A **BaseImportRequest** instance.

**RETURN TYPE:**

*String*

**RETURNS:**

The import progress of the specified import job.

## BaseDescribeImportRequest

A **BaseDescribeImportRequest** instance is implemented in **MilvusDescribeImportRequest**.

### MilvusDescribeImportRequest

```java
MilvusDescribeImportRequest.builder()
    .jobId(String jobId)
    .build()
```

**BUILDER METHODS:**

- `jobId(String jobId)`

    The ID of an existing import job.

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

