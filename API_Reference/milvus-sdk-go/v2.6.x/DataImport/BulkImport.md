# BulkImport()

This function submits a bulk import job to a Milvus or Zilliz Cloud cluster via the RESTful import API. Use this when you need to load large datasets that have already been staged in object storage or are accessible by file path lists. The call returns immediately with a job ID; track the job's progress with `GetImportProgress()` and list outstanding jobs with `ListImportJobs()`.

<div class="alert note">

`BulkImport()` is a package-level function in `github.com/milvus-io/milvus/client/v2/bulkwriter`, not a method on `*milvusclient.Client`. It speaks the REST `/v2/vectordb/jobs/import/create` endpoint directly, so it works with both Milvus open-source clusters (use `NewBulkImportOption`) and Zilliz Cloud (use `NewCloudBulkImportOption`).

</div>

```go
func BulkImport(ctx context.Context, option *BulkImportOption) (*BulkImportResponse, error)
```

## Request Syntax

```go
option := bulkwriter.NewBulkImportOption(uri, collectionName, files).
    WithPartition(partitionName).
    WithAPIKey(apiKey)

resp, err := bulkwriter.BulkImport(ctx, option)
```

**PARAMETERS:**

- **ctx** (*context.Context*) -
The context for cancellation and deadlines. The HTTP request inherits this context, so canceling it aborts the in-flight call.

- **option** (*BulkImportOption*) -
The fully populated import option created with `NewBulkImportOption()` for self-hosted Milvus or `NewCloudBulkImportOption()` for Zilliz Cloud. Required.

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

**RETURN TYPE:**

*\*BulkImportResponse, error*

**RETURNS:**

This class represents the response returned by the `BulkImport()` package function. It embeds `ResponseBase` for the common `Status` and `Message` fields, and exposes the assigned import job ID under `Data.JobID`. Use the embedded `CheckStatus()` method to verify the call succeeded before reading `Data`.

```go
type BulkImportResponse struct {
    ResponseBase
    Data struct {
        JobID string \`json:"jobId"\`
    } \`json:"data"\`
}
```

**PARAMETERS:**

- **Status** (*int*) -
Inherited from `ResponseBase`. A value of `0` indicates success; any other value indicates an error.

- **Message** (*string*) -
Inherited from `ResponseBase`. Human-readable error description when `Status` is non-zero.

- **Data.JobID** (*string*) -
The unique identifier assigned to the submitted bulk import job. Pass this to `GetImportProgress()` to track completion.

**METHODS:**

- `CheckStatus()`

    This validates the response status. Returns nil when `Status == 0`; otherwise returns a formatted error containing `Status` and `Message`.

**ERROR HANDLING:**

- **error**

    Check `err != nil` for failure details. Common failures include malformed option payloads, network errors, authentication rejection (when `WithAPIKey` is set incorrectly), and server-side validation errors surfaced through the response status.

## Example

```go
import (
	"context"
	"fmt"
	"log"

	"github.com/milvus-io/milvus/client/v2/bulkwriter"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "http://127.0.0.1:19530"
collectionName := "quick_setup"
files := [][]string{
	{"data/part_001.json"},
	{"data/part_002.json"},
}

option := bulkwriter.NewBulkImportOption(milvusAddr, collectionName, files).
	WithAPIKey("root:Milvus")

resp, err := bulkwriter.BulkImport(ctx, option)
if err != nil {
	log.Fatal(err)
}

fmt.Println(resp.Data.JobID)
```
