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

- **request** (*[BaseDescribeImportRequest](getImportProgress.md#BaseDescribeImportRequest)*) -  

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

```java

```

