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

**RETURNS:**

*String*

A JSON response containing the matching import jobs and pagination details.

## Example

Lists import jobs for a collection in Milvus.

```java
MilvusListImportJobsRequest request = MilvusListImportJobsRequest.builder()
    .dbName("default")
    .collectionName("books")
    .apiKey("root:Milvus")
    .build();
String response = BulkImportUtils.listImportJobs("http://localhost:19530", request);
```

