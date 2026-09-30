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

**RETURN TYPE:**

*\*ListImportJobsResponse, error*

**RETURNS:**

A `ListImportJobsResponse` whose `Data.Records` slice contains one `ImportJobRecord` per job, including job ID, state, and progress. Returns an error if the request cannot be marshaled, the HTTP call fails, or the server returns a non-zero status.

**EXCEPTIONS:**

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
