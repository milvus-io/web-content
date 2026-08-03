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

**RETURN TYPE:**

*\*BulkImportResponse, error*

**RETURNS:**

A `BulkImportResponse` containing the assigned job ID under `Data.JobID`. Returns an error if the request cannot be marshaled, the HTTP call fails, or the server returns a non-zero status.

**EXCEPTIONS:**

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
