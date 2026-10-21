# GetImportProgress()

This function retrieves detailed progress for a single bulk import job via the RESTful API. Use it to poll a job submitted by `BulkImport()` until its `State` reaches `Completed` or `Failed`. The response includes overall progress, total imported/expected rows, file size, and per-file progress details.

<div class="alert note">

`GetImportProgress()` is a package-level function in `github.com/milvus-io/milvus/client/v3/bulkwriter`. It calls the REST `/v2/vectordb/jobs/import/describe` endpoint and works with both Milvus open-source clusters (use `NewGetImportProgressOption`) and Zilliz Cloud (use `NewCloudGetImportProgressOption`).

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

This class represents the response returned by the `GetImportProgress()` package function. It embeds `ResponseBase` and exposes the detailed progress payload through `ImportProgressData`, which includes both overall job statistics and a per-file `Details` slice.

```go
type GetImportProgressResponse struct {
    ResponseBase
    Data *ImportProgressData `json:"data"`
}

type ImportProgressData struct {
    CollectionName string                  `json:"collectionName"`
    JobID          string                  `json:"jobId"`
    CompleteTime   string                  `json:"completeTime"`
    State          string                  `json:"state"`
    Progress       int64                   `json:"progress"`
    ImportedRows   int64                   `json:"importedRows"`
    TotalRows      int64                   `json:"totalRows"`
    Reason         string                  `json:"reason"`
    FileSize       int64                   `json:"fileSize"`
    Details        []*ImportProgressDetail `json:"details"`
}

type ImportProgressDetail struct {
    FileName     string `json:"fileName"`
    FileSize     int64  `json:"fileSize"`
    Progress     int64  `json:"progress"`
    CompleteTime string `json:"completeTime"`
    State        string `json:"state"`
    ImportedRows int64  `json:"importedRows"`
    TotalRows    int64  `json:"totalRows"`
}
```

**FIELDS:**

- **Status** (*int*) -
Inherited from `ResponseBase`. A value of `0` indicates success.

- **Message** (*string*) -
Inherited from `ResponseBase`. Error description when `Status` is non-zero.

- **Data** (*\*ImportProgressData*) -
The progress payload for the requested job.

**ImportProgressData fields:**

- **CollectionName** (*string*) -
The collection the job targets.

- **JobID** (*string*) -
The unique identifier of the import job.

- **State** (*string*) -
The current job state. Common values include `Pending`, `Importing`, `Completed`, and `Failed`.

- **Progress** (*int64*) -
The overall completion percentage in the range `[0, 100]`.

- **ImportedRows** (*int64*) -
The number of rows already imported into the collection.

- **TotalRows** (*int64*) -
The total number of rows expected from all source files.

- **FileSize** (*int64*) -
The aggregate size in bytes of all source files.

- **CompleteTime** (*string*) -
The job completion timestamp; empty until the job reaches a terminal state.

- **Reason** (*string*) -
Failure reason when `State == "Failed"`; empty otherwise.

- **Details** (*[]\ImportProgressDetail*) -
Per-file progress entries with the same shape as the parent fields, scoped to one source file each.

**ERROR HANDLING:**

- **error**

    Check `err != nil` for failure details. Failures include malformed options, network issues, an unknown or expired job ID, and server-side errors reported through the response status.

## Example

```go
import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/milvus-io/milvus/client/v3/bulkwriter"
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
