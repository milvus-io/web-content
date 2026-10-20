# bulkImport()

Creates a bulk import job from prepared data files in Milvus or Zilliz Cloud.

```java
public static String bulkImport(String url, BaseImportRequest request)
```

## Request Syntax

Use this request when importing files into open-source Milvus.

```java
MilvusImportRequest.builder()
    .apiKey(apiKey)
    .dbName(dbName)
    .collectionName(collectionName)
    .partitionName(partitionName)
    .files(files)
    .options(options)
    .build();
```

**PARAMETERS:**

- **apiKey** (*String*) -
Milvus authentication in `username:password` form.

- **dbName** (*String*) -
Default: `default`
Target database name.

- **collectionName** (*String*) -
Target collection name.

- **partitionName** (*String*) -
Default: `default`
Target partition name when the collection does not use a partition key.

- **files** (*List<List<String>>*) -
Files or file groups stored in the bucket accessible to Milvus.

- **options** (*Map<String, Object>*) -
Additional import options passed to the server.

**RETURN TYPE:**

*String*

**RETURNS:**


A JSON response whose `data.jobId` identifies the created import job.

## Example

Creates an import job for files accessible to Milvus.

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


// 2. Import data files into the collection
MilvusImportRequest request = MilvusImportRequest.builder()
    .collectionName("books")
    .files(Arrays.asList(Arrays.asList("bulk_data/books.parquet")))
    .apiKey("root:Milvus")
    .build();
String response = BulkImportUtils.bulkImport("http://localhost:19530", request);
```

