# bulkImport()

This operation imports the prepared data files to Milvus. To learn how to prepare your data files, read [Prepare Source Data](https://milvus.io/docs/prepare-source-data.md).

```java
public static String bulkImport(String url, BaseImportRequest request)
```

## Request Syntax

```java
bulkImport.bulkImport(
    url, 
    request
)
```

**PARAMETERS:**

- **url** (*String*) -

    The endpoint of the connected Milvus instance.

- **request** (*[BaseImportRequest](bulkImport.md)*) -  

    A **BaseImportRequest** instance.

**RETURN TYPE:**

*String*

**RETURNS:**

The ID of the created import job.

## BaseImportRequest

A **BaseImportRequest** instance is implemented in **MilvusImportRequest**.

### MilvusImportRequest

```java
MilvusImportRequest.builder()
    .dbName(String dbName)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .files(List<List<String>> files)
    .build()
```

**BUILDER METHODS:**

- `dbName(String dbName)`

    The name of the target database. The value of this parameter defaults to `default`.

- `collectionName(String collectionName)`

    The name of a collection in the target cluster of this operation.

- `partitionName(String partitionName)`

    The name of the partition in the target cluster of this operation. The value defaults to `default`.

- `files(List<List<String>> files)`

    The list of string lists, each string list contains a singular row-based file path or multiple column-based file paths.

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

