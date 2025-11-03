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

- **request** (*[BaseImportRequest](bulkImport.md#BaseImportRequest)*) -  

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

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.bulkwriter.request.import_.MilvusImportRequest;
import io.milvus.bulkwriter.restful.BulkImportUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

List<List<String>> batchFiles = new ArrayList<>();
batchFiles.add(Collections.singletonList("bulk_data/1.parquet"));
batchFiles.add(Collections.singletonList("bulk_data/2.parquet"));
MilvusImportRequest milvusImportRequest = MilvusImportRequest.builder()
        .collectionName(collectionName)
        .files(batchFiles)
        .build();
String bulkImportResult = BulkImportUtils.bulkImport(url, milvusImportRequest);

Gson GSON_INSTANCE = new Gson();
JsonObject result = GSON_INSTANCE.fromJson(bulkImportResult, JsonObject.class);
String jobId = result.getAsJsonObject("data").get("jobId").getAsString();
System.out.println("Create a bulkInert task, job id: " + jobId);
```

