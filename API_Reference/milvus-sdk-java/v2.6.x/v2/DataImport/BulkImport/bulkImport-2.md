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

**RETURNS:**

*String*

A JSON response whose `data.jobId` identifies the created import job.

## Example

Creates an import job for files accessible to Milvus.

```java
MilvusImportRequest request = MilvusImportRequest.builder()
    .collectionName("books")
    .files(List.of(List.of("bulk_data/books.parquet")))
    .apiKey("root:Milvus")
    .build();
String response = BulkImportUtils.bulkImport("http://localhost:19530", request);
```

