# AbortImportOption

This type configures a request to abort a bulk import job via the RESTful API. Construct it with `NewAbortImportOption()` for self-hosted Milvus, or `NewCloudAbortImportOption()` for Zilliz Cloud. Chain `WithAPIKey()` to add an authorization token.

```go
type AbortImportOption struct {
    URL       string
    JobID     string
    ClusterID string
    APIKey    string
}
```

**FIELDS:**

- **URL** (*string*) -
The base URL of the Milvus or Zilliz Cloud cluster. Do not include the path; the function appends `/v2/vectordb/jobs/import/abort` automatically.

- **JobID** (*string*) -
The unique identifier of the import job to abort. Pass the value returned by `BulkImport()`. Required.

- **ClusterID** (*string*) -
The Zilliz Cloud cluster ID. Optional; used only for cloud imports.

- **APIKey** (*string*) -
The authorization token sent as a `Bearer` header. Optional; required when the server enforces token-based auth.

**BUILDER METHODS:**

- `WithAPIKey(key string)`

    This sets the authorization token sent as a `Bearer` header.

**CONSTRUCTORS:**

- `NewAbortImportOption(uri string, jobID string)`
This creates an AbortImportOption for self-hosted Milvus clusters.

- `NewCloudAbortImportOption(uri string, jobID string, apiKey string, clusterID string)`
This creates an AbortImportOption for Zilliz Cloud clusters, pre-filling `APIKey` and `ClusterID`.
