# GetImportProgress()

This function retrieves detailed progress for a single bulk import job via the RESTful API. Use it to poll a job submitted by `BulkImport()` until its `State` reaches `Completed` or `Failed`. The response includes overall progress, total imported/expected rows, file size, and per-file progress details.

<div class="alert note">

`GetImportProgress()` is a package-level function in `github.com/milvus-io/milvus/client/v2/bulkwriter`. It calls the REST `/v2/vectordb/jobs/import/describe` endpoint and works with both Milvus open-source clusters (use `NewGetImportProgressOption`) and Zilliz Cloud (use `NewCloudGetImportProgressOption`).

</div>

```go
func GetImportProgress(ctx context.Context, option *GetImportProgressOption) (*GetImportProgressResponse, error)
```

## Request Syntax

```go
option := bulkwriter.NewGetImportProgressOption(uri, jobID).
    WithAPIKey(apiKey)

resp, err := bulkwriter.GetImportProgress(ctx, option)
```

**PARAMETERS:**

- **ctx** (*context.Context*) -
The context for cancellation and deadlines. The HTTP request inherits this context, so canceling it aborts the in-flight call.

- **option** (*GetImportProgressOption*) -
The progress option created with `NewGetImportProgressOption()` for self-hosted Milvus or `NewCloudGetImportProgressOption()` for Zilliz Cloud. The job ID returned by `BulkImport()` is required. Required.

**RETURN TYPE:**

*\*GetImportProgressResponse, error*

**RETURNS:**

A `GetImportProgressResponse` whose `Data` field contains an `ImportProgressData` with overall progress, row counts, completion time, and per-file `Details`. Returns an error if the request cannot be marshaled, the HTTP call fails, or the server returns a non-zero status.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details. Failures include malformed options, network issues, an unknown or expired job ID, and server-side errors reported through the response status.

## Example

```go
import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/milvus-io/milvus/client/v2/bulkwriter"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "http://127.0.0.1:19530"
jobID := "453291002847301"

option := bulkwriter.NewGetImportProgressOption(milvusAddr, jobID).
	WithAPIKey("root:Milvus")

for {
	resp, err := bulkwriter.GetImportProgress(ctx, option)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("State=%s Progress=%d%% Rows=%d/%d\n",
		resp.Data.State, resp.Data.Progress, resp.Data.ImportedRows, resp.Data.TotalRows)

	if resp.Data.State == "Completed" || resp.Data.State == "Failed" {
		break
	}
	time.Sleep(2 * time.Second)
}
```
