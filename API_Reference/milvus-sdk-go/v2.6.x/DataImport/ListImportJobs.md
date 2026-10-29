# ListImportJobs()

This function lists bulk import jobs for a given collection via the RESTful API. Use it to monitor outstanding and completed import jobs, paginate through job history, or filter by collection name. Each record in the response includes the job ID, current state, progress percentage, and any failure reason.

<div class="alert note">

`ListImportJobs()` is a package-level function in `github.com/milvus-io/milvus/client/v2/bulkwriter`. It calls the REST `/v2/vectordb/jobs/import/list` endpoint and works with both Milvus open-source clusters and Zilliz Cloud.

</div>

```go
func ListImportJobs(ctx context.Context, option *ListImportJobsOption) (*ListImportJobsResponse, error)
```

## Request Syntax

```go
option := bulkwriter.NewListImportJobsOption(uri, collectionName).
    WithAPIKey(apiKey).
    WithPageSize(pageSize).
    WithCurrentPage(currentPage)

resp, err := bulkwriter.ListImportJobs(ctx, option)
```

**PARAMETERS:**

- **ctx** (*context.Context*) -
The context for cancellation and deadlines. The HTTP request inherits this context, so canceling it aborts the in-flight call.

- **option** (*ListImportJobsOption*) -
The list option created with `NewListImportJobsOption()`. Defaults to `CurrentPage: 1, PageSize: 10` if not modified by `WithCurrentPage()` or `WithPageSize()`. Required.

```go
type ListImportJobsOption struct {
    URL            string
    CollectionName string
    ClusterID      string
    APIKey         string
    PageSize       int
    CurrentPage    int
}
```

- **URL** (*string*) -
The base URL of the Milvus or Zilliz Cloud cluster. Do not include the path; the function appends `/v2/vectordb/jobs/import/list` automatically.

- **CollectionName** (*string*) -
The name of the collection whose import jobs should be listed. Required.

- **ClusterID** (*string*) -
The Zilliz Cloud cluster ID. Optional; used only for cloud imports.

- **APIKey** (*string*) -
The authorization token sent as a `Bearer` header. Optional; required when the server enforces token-based auth.

- **PageSize** (*int*) -
The number of jobs to return per page. Default is `10`. Use `WithPageSize()` to override.

- **CurrentPage** (*int*) -
The page index, starting from `1`. Default is `1`. Use `WithCurrentPage()` to override.

**BUILDER METHODS:**

- `WithAPIKey(key string)`
This sets the authorization token sent as a `Bearer` header.

- `WithPageSize(pageSize int)`
This sets the number of jobs returned per page.

- `WithCurrentPage(currentPage int)`
This sets the page index, starting from `1`.

**CONSTRUCTORS:**

- `NewListImportJobsOption(uri string, collectionName string)`

    This creates a ListImportJobsOption with sensible defaults (`CurrentPage: 1, PageSize: 10`).

**RETURN TYPE:**

*\*ListImportJobsResponse, error*

**RETURNS:**

This class represents the response returned by the `ListImportJobs()` package function. It embeds `ResponseBase` for status fields and exposes the paginated job list through a nested `ListImportJobData` struct. Each entry in `Data.Records` is an `ImportJobRecord` describing one bulk import job.

```go
type ListImportJobsResponse struct {
    ResponseBase
    Data *ListImportJobData \`json:"data"\`
}

type ListImportJobData struct {
    Records []*ImportJobRecord \`json:"records"\`
}

type ImportJobRecord struct {
    JobID          string \`json:"jobId"\`
    CollectionName string \`json:"collectionName"\`
    State          string \`json:"state"\`
    Progress       int64  \`json:"progress"\`
    Reason         string \`json:"reason"\`
}
```

**PARAMETERS:**

- **Status** (*int*) -
Inherited from `ResponseBase`. A value of `0` indicates success.

- **Message** (*string*) -
Inherited from `ResponseBase`. Error description when `Status` is non-zero.

- **Data.Records** (*[]\*ImportJobRecord*) -
The slice of job records returned for the current page. May be empty when no jobs match the filter.

**ImportJobRecord fields:**

- **JobID** (*string*) -
The unique identifier of the import job.

- **CollectionName** (*string*) -
The collection the job targets.

- **State** (*string*) -
The current job state. Common values include `Pending`, `Importing`, `Completed`, and `Failed`.

- **Progress** (*int64*) -
The completion percentage in the range `[0, 100]`.

- **Reason** (*string*) -
Failure reason when `State == "Failed"`; empty otherwise.

**ERROR HANDLING:**

- **error**

    Check `err != nil` for failure details. Failures include malformed options, network issues, authentication errors, and server-side errors reported through the response status.

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

option := bulkwriter.NewListImportJobsOption(milvusAddr, collectionName).
	WithAPIKey("root:Milvus").
	WithPageSize(20).
	WithCurrentPage(1)

resp, err := bulkwriter.ListImportJobs(ctx, option)
if err != nil {
	log.Fatal(err)
}

for _, job := range resp.Data.Records {
	fmt.Printf("%s\t%s\t%d%%\n", job.JobID, job.State, job.Progress)
}
```
