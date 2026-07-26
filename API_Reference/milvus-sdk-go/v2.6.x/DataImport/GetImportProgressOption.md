# GetImportProgressOption

This type configures a request to retrieve progress for a single bulk import job via the RESTful API. Construct it with `NewGetImportProgressOption()` for self-hosted Milvus, or `NewCloudGetImportProgressOption()` for Zilliz Cloud. Chain `WithAPIKey()` to add an authorization token.

```go
type GetImportProgressOption struct {
    URL       string
    JobID     string
    ClusterID string
    APIKey    string
}
```

**FIELDS:**

- **URL** (*string*) -
The base URL of the Milvus or Zilliz Cloud cluster. Do not include the path; the function appends `/v2/vectordb/jobs/import/describe` automatically.

- **JobID** (*string*) -
The unique identifier of the import job to inspect. Pass the value returned by `BulkImport()`. Required.

- **ClusterID** (*string*) -
The Zilliz Cloud cluster ID. Optional; used only for cloud imports.

- **APIKey** (*string*) -
The authorization token sent as a `Bearer` header. Optional; required when the server enforces token-based auth.

**BUILDER METHODS:**

- `WithAPIKey(key string)`

    This sets the authorization token sent as a `Bearer` header.

**CONSTRUCTORS:**

- `NewGetImportProgressOption(uri string, jobID string)`
This creates a GetImportProgressOption for self-hosted Milvus clusters.

- `NewCloudGetImportProgressOption(uri string, jobID string, apiKey string, clusterID string)`
This creates a GetImportProgressOption for Zilliz Cloud clusters, pre-filling `APIKey` and `ClusterID`.

