# AbortImport()

This function aborts a bulk import job via the RESTful import API. Use it to stop an in-flight import job and discard the data staged so far.

<div class="alert note">

`AbortImport()` is a package-level function in `github.com/milvus-io/milvus/client/v3/bulkwriter`, not a method on `*milvusclient.Client`. It speaks the REST `/v2/vectordb/jobs/import/abort` endpoint directly, so it works with both Milvus open-source clusters (use `NewAbortImportOption`) and Zilliz Cloud (use `NewCloudAbortImportOption`).

</div>

```go
func AbortImport(ctx context.Context, option *AbortImportOption) (*AbortImportResponse, error)
```

## Request Syntax

```go
option := bulkwriter.NewAbortImportOption(uri, jobID).
    WithAPIKey(apiKey)

resp, err := bulkwriter.AbortImport(ctx, option)
```

**PARAMETERS:**

- **ctx** (*context.Context*) -
The context for cancellation and deadlines. The HTTP request inherits this context, so canceling it aborts the in-flight call.

- **option** (*AbortImportOption*) -
The abort option created with `NewAbortImportOption()` for self-hosted Milvus or `NewCloudAbortImportOption()` for Zilliz Cloud. The job ID returned by `BulkImport()` is required.

**RETURN TYPE:**

*\*AbortImportResponse, error*

**RETURNS:**

An `AbortImportResponse` embedding the common `Status` and `Message` fields. Returns an error if the request cannot be marshaled, the HTTP call fails, or the server returns a non-zero status.

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

option := bulkwriter.NewAbortImportOption(milvusAddr, jobID).
	WithAPIKey("root:Milvus")

resp, err := bulkwriter.AbortImport(ctx, option)
if err != nil {
	log.Fatal(err)
}

if resp.Status != 0 {
	log.Fatalf("abort import failed: %s", resp.Message)
}
```
