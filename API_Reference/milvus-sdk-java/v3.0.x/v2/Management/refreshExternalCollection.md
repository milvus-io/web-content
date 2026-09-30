# refreshExternalCollection()

This operation triggers a refresh job that pulls data from an external source into a Milvus collection. Returns a job ID that can be passed to `getRefreshExternalCollectionProgress()` to track progress.

```java
public RefreshExternalCollectionResp refreshExternalCollection(RefreshExternalCollectionReq request)
```

## Request Syntax

```java
refreshExternalCollection(RefreshExternalCollectionReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .externalSource(String externalSource)
    .externalSpec(JsonObject externalSpec)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    **[REQUIRED]**

    The name of the collection to refresh.

- `externalSource(String externalSource)` -

    The external data source identifier (e.g., `"s3"`, `"oss"`).

- `externalSpec(JsonObject externalSpec)` -

    A JSON object describing the external storage configuration. Fields depend on `externalSource` (typically include `endpoint`, `bucket`, `path`, credentials).

**RETURNS:**

*RefreshExternalCollectionResp*

The response carries a single field:

- `jobId` (*long*) - The numeric ID of the newly started refresh job. Persist this value to query progress with `getRefreshExternalCollectionProgress()`.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import com.google.gson.JsonObject;
import io.milvus.v2.service.utility.request.RefreshExternalCollectionReq;
import io.milvus.v2.service.utility.response.RefreshExternalCollectionResp;

JsonObject spec = new JsonObject();
spec.addProperty("endpoint", "https://s3.amazonaws.com");
spec.addProperty("bucket", "my-bucket");
spec.addProperty("path", "data/snapshots/2026-05-01/");

RefreshExternalCollectionResp resp = client.refreshExternalCollection(
    RefreshExternalCollectionReq.builder()
        .collectionName("my_collection")
        .externalSource("s3")
        .externalSpec(spec)
        .build()
);
long jobId = resp.getJobId();
System.out.println("Started refresh job: " + jobId);
```
