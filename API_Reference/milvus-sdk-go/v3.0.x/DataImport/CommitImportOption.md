# CommitImportOption

This type configures a request to commit a bulk import job via the RESTful API. Construct it with `NewCommitImportOption()` for self-hosted Milvus, or `NewCloudCommitImportOption()` for Zilliz Cloud. Chain `WithAPIKey()` to add an authorization token.

```go
type CommitImportOption struct {
    URL       string
    JobID     string
    ClusterID string
    APIKey    string
}
```

**FIELDS:**

- **URL** (*string*) -
The base URL of the Milvus or Zilliz Cloud cluster. Do not include the path; the function appends `/v2/vectordb/jobs/import/commit` automatically.

- **JobID** (*string*) -
The unique identifier of the import job to commit. Pass the value returned by `BulkImport()`. Required.

- **ClusterID** (*string*) -
The Zilliz Cloud cluster ID. Optional; used only for cloud imports.

- **APIKey** (*string*) -
The authorization token sent as a `Bearer` header. Optional; required when the server enforces token-based auth.

**BUILDER METHODS:**

- `WithAPIKey(key string)`

    This sets the authorization token sent as a `Bearer` header.

**CONSTRUCTORS:**

- `NewCommitImportOption(uri string, jobID string)`
This creates a CommitImportOption for self-hosted Milvus clusters.

- `NewCloudCommitImportOption(uri string, jobID string, apiKey string, clusterID string)`
This creates a CommitImportOption for Zilliz Cloud clusters, pre-filling `APIKey` and `ClusterID`.
