# BulkImportResponse

This class represents the response returned by the `BulkImport()` package function. It embeds `ResponseBase` for the common `Status` and `Message` fields, and exposes the assigned import job ID under `Data.JobID`. Use the embedded `CheckStatus()` method to verify the call succeeded before reading `Data`.

```go
type BulkImportResponse struct {
    ResponseBase
    Data struct {
        JobID string \`json:"jobId"\`
    } \`json:"data"\`
}
```

**FIELDS:**

- **Status** (*int*) -
Inherited from `ResponseBase`. A value of `0` indicates success; any other value indicates an error.

- **Message** (*string*) -
Inherited from `ResponseBase`. Human-readable error description when `Status` is non-zero.

- **Data.JobID** (*string*) -
The unique identifier assigned to the submitted bulk import job. Pass this to `GetImportProgress()` to track completion.

**METHODS:**

- `CheckStatus()`

    This validates the response status. Returns nil when `Status == 0`; otherwise returns a formatted error containing `Status` and `Message`.