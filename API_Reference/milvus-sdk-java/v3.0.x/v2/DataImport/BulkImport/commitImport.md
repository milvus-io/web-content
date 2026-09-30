# commitImport()

Commits a prepared bulk-import job.

```java
public static String commitImport(String url, BaseDescribeImportRequest request)
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

    The import job identifier to commit.

**RETURNS:**

*String*

The JSON response body returned by the import endpoint.

**EXCEPTIONS:**

- **Exception**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

Demonstrates commitImport() against Milvus.

```java
// include-start milvus
String response = BulkImportUtils.commitImport(MILVUS_URL,
    MilvusDescribeImportRequest.builder()
        .apiKey(MILVUS_CREDENTIALS)
        .jobId(JOB_ID)
        .build());
// include-end
// include-start zilliz
String response = BulkImportUtils.commitImport(CLOUD_URL,
    CloudDescribeImportRequest.builder()
        .apiKey(API_KEY)
        .clusterId(CLUSTER_ID)
        .jobId(JOB_ID)
        .build());
// include-end
```
