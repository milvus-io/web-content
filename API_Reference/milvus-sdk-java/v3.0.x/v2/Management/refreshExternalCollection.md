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

**RETURN TYPE:**

*RefreshExternalCollectionResp*

**RETURNS:**

A **RefreshExternalCollectionResp** object that carries the newly started refresh job ID.

- `getJobId()` (*long*) -

    The numeric ID of the newly started refresh job. Persist this value to query progress with `getRefreshExternalCollectionProgress()`.

**EXCEPTIONS