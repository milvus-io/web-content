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

```go
type AbortImportOption struct {
    URL       string
    JobID     string
    ClusterID string
    APIKey    string
}
```

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

**RETURN TYPE:**

*\*AbortImportResponse, error*

**RETURNS:**

This class represents the response returned by the `AbortImport()` package function. It embeds `ResponseBase` for the common `Status` and `Message` fields. Use the embedded `CheckStatus()` method to verify the call succeeded.

```go
type AbortImportResponse struct {
    ResponseBase
}
```

**PARAMETERS:**

- **Status** (*int*) -
Inherited from `ResponseBase`. A value of `0` indicates success; any other value indicates an error.

- **Message** (*string*) -
Inherited from `ResponseBase`. Human-readable error description when `Status` is non-zero.

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
