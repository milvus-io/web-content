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

**RETURNS:**

*String*

A JSON response containing the import job state, progress, and related details.

## Example

Gets import progress for a job created in Milvus.

```java
MilvusDescribeImportRequest request = MilvusDescribeImportRequest.builder()
    .jobId(jobId)
    .apiKey("root:Milvus")
    .build();
String response = BulkImportUtils.getImportProgress("http://localhost:19530", request);
```

