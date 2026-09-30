# CommitImport()

This function commits a bulk import job via the RESTful import API. Use it for import modes that stage data first and commit at the end, such as when the import job requires an explicit final commit before the imported data becomes queryable.

<div class="alert note">

`CommitImport()` is a package-level function in `github.com/milvus-io/milvus/client/v3/bulkwriter`, not a method on `*milvusclient.Client`. It speaks the REST `/v2/vectordb/jobs/import/commit` endpoint directly, so it works with both Milvus open-source clusters (use `NewCommitImportOption`) and Zilliz Cloud (use `NewCloudCommitImportOption`).

</div>

```go
func CommitImport(ctx context.Context, option *CommitImportOption) (*CommitImportResponse, error)
```

## Request Syntax

```go
option := bulkwriter.NewCommitImportOption(uri, jobID).
    WithAPIKey(apiKey)

resp, err := bulkwriter.CommitImport(ctx, option)
```

**PARAMETERS:**

- **ctx** (*context.Context*) -
The context for cancellation and deadlines. The HTTP request inherits this context, so canceling it aborts the in-flight call.

- **option** (*CommitImportOption*) -
The commit option created with `NewCommitImportOption()` for self-hosted Milvus or `NewCloudCommitImportOption()` for Zilliz Cloud. The job ID returned by `BulkImport()` is required.

**RETURN TYPE:**

*\*CommitImportResponse, error*

**RETURNS:**

A `CommitImportResponse` embedding the common `Status` and `Message` fields. Returns an error if the request cannot be marshaled, the HTTP call fails, or the server returns a non-zero status.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details. Common failures include malformed option payloads, network errors, authentication rejection (when `WithAPIKey` is set incorrectly), and server-side validation errors surfaced through the response status.

## Example

```go
import (
	"context"
	"log"

	"github.com/milvus-io/milvus/client/v3/bulkwriter"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "http://127.0.0.1:19530"
jobID := "453291002847301"

option := bulkwriter.NewCommitImportOption(milvusAddr, jobID).
	WithAPIKey("root:Milvus")

resp, err := bulkwriter.CommitImport(ctx, option)
if err != nil {
	log.Fatal(err)
}

if resp.Status != 0 {
	log.Fatalf("commit import failed: %s", resp.Message)
}
```
