# ListImportJobsResponse

This class represents the response returned by the `ListImportJobs()` package function. It embeds `ResponseBase` for status fields and exposes the paginated job list through a nested `ListImportJobData` struct. Each entry in `Data.Records` is an `ImportJobRecord` describing one bulk import job.

```go
type ListImportJobsResponse struct {
    ResponseBase
    Data *ListImportJobData `json:"data"`
}

type ListImportJobData struct {
    Records []*ImportJobRecord `json:"records"`
}

type ImportJobRecord struct {
    JobID          string `json:"jobId"`
    CollectionName string `json:"collectionName"`
    State          string `json:"state"`
    Progress       int64  `json:"progress"`
    Reason         string `json:"reason"`
}
```

**FIELDS:**

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

