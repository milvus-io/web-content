# abortImport()

Aborts an existing bulk-import job.

```java
public static String abortImport(String url, BaseDescribeImportRequest request)
```

## Request Syntax

```java
// include-start milvus
MilvusDescribeImportRequest.builder()
    .apiKey(apiKey)
    .jobId(jobId)
    .build();
// include-end
// include-start zilliz
CloudDescribeImportRequest.builder()
    .apiKey(apiKey)
    .clusterId(clusterId)
    .projectId(projectId)
    .regionId(regionId)
    .jobId(jobId)
    .build();
// include-end
```

### MilvusDescribeImportRequest

Uses `MilvusDescribeImportRequest` for a Milvus deployment.

**BUILDER METHODS:**

- `apiKey(String apiKey)`

    The authentication credential. Use `userName:password` for Milvus or a Zilliz Cloud API key.

- `jobId(String jobId)`

    The import job identifier to abort.

**RETURN TYPE:**

*String*

**RETURNS:**

The JSON response body returned by the import endpoint.

**EXCEPTIONS:**

- **Exception**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

Demonstrates abortImport() against Milvus.

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.bulkwriter.request.import_.MilvusImportRequest;
import io.milvus.bulkwriter.restful.BulkImportUtils;
import java.util.Arrays;
import java.util.Collections;
import io.milvus.bulkwriter.request.describe.MilvusDescribeImportRequest;

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

// 2. Start an import job and get its job ID
MilvusImportRequest importRequest = MilvusImportRequest.builder()
    .collectionName("books")
    .files(Arrays.asList(Arrays.asList("bulk_data/books.parquet")))
    .apiKey("root:Milvus")
    .build();
String importResp = BulkImportUtils.bulkImport("http://localhost:19530", importRequest);
String jobId = new com.google.gson.JsonParser().parse(importResp).getAsJsonObject()
        .getAsJsonObject("data").get("jobId").getAsString();


// 3. Abort the import job
String response = BulkImportUtils.abortImport("http://localhost:19530",
    MilvusDescribeImportRequest.builder()
        .apiKey("root:Milvus")
        .jobId(jobId)
        .build());
```
