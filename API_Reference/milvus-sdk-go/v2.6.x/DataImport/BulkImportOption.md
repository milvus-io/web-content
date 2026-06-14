# BulkImportOption

BulkImportOption

This type configures a bulk import request for the RESTful import API. Construct it with `NewBulkImportOption()` for self-hosted Milvus, or `NewCloudBulkImportOption()` for Zilliz Cloud. After construction, chain `With*` builder methods to supply optional fields such as partition name, API key, and extra options.

```go
type BulkImportOption struct {
    URL            string
    CollectionName string
    Files          [][]string
    PartitionName  string
    APIKey         string
    ObjectURL      string
    ClusterID      string
    AccessKey      string
    SecretKey      string
    Options        map[string]string
}
```

**FIELDS:**

- **URL** (*string*) -
The base URL of the Milvus or Zilliz Cloud cluster. Do not include the path; the function appends `/v2/vectordb/jobs/import/create` automatically.

- **CollectionName** (*string*) -
The name of the target collection. Required.

- **Files** (*[][]string*) -
The list of file paths to import. Each inner slice represents a batch of files that will be imported together. Used with `NewBulkImportOption()`. Optional for cloud imports.

- **PartitionName** (*string*) -
The target partition within the collection. Optional; if omitted, data lands in the default partition.

- **APIKey** (*string*) -
The authorization token sent as a `Bearer` header. Optional; required when the server enforces token-based auth.

- **ObjectURL** (*string*) -
The S3 or compatible object URL for cloud imports. Used with `NewCloudBulkImportOption()`. Optional.

- **ClusterID** (*string*) -
The Zilliz Cloud cluster ID. Used with `NewCloudBulkImportOption()`. Optional.

- **AccessKey** (*string*) -
The access key for the object store. Optional.

- **SecretKey** (*string*) -
The secret key for the object store. Optional.

- **Options** (*map[string]string*) -
Extra key-value parameters forwarded to the import API. Use `WithOption()` to add entries.

**BUILDER METHODS:**

- `WithPartition(partitionName string)`
This sets the target partition for the imported data.

- `WithAPIKey(key string)`
This sets the authorization token sent as a `Bearer` header.

- `WithOption(key, value string)`
This adds an extra key-value parameter to the request payload. Call multiple times to add more entries.

**CONSTRUCTORS:**

- `NewBulkImportOption(uri string, collectionName string, files [][]string)`
This creates a BulkImportOption for self-hosted Milvus clusters. The `files` argument is a list of batches, where each batch is a slice of file paths.

- `NewCloudBulkImportOption(uri string, collectionName string, apiKey string, objectURL string, clusterID string, accessKey string, secretKey string)`
This creates a BulkImportOption for Zilliz Cloud clusters. Uses `ObjectURL` instead of `Files` for cloud object storage.

