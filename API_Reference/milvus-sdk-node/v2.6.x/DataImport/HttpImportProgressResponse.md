# HttpImportProgressResponse

This interface describes the response returned by `getImportJobProgress()`.

```javascript
interface HttpImportProgressResponse
```

**FIELDS:**

- **code** (*number*) -

    Specifies the HTTP API response code.

- **data.jobId** (*string*) -

    Specifies the import job ID.

- **data.progress** (*number*) -

    Specifies the job progress.

- **data.state** (*string*) -

    Specifies the current job state.

- **data.totalRows** (*number*) -

    Specifies the total row count when available.

- **data.importedRows** (*number*) -

    Specifies the imported row count when available.

- **data.details** (*ImportJobDetailType[]*) -

    Lists per-file import progress details when available.

- **data.reason** (*string*) -

    Specifies the failure reason when the job fails.

## Example

```javascript
const state = response.data.state;
const progress = response.data.progress;
```
