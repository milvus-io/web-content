# getImportJobProgress()

This operation gets progress for an HTTP import job. Use it to poll job state, imported row count, file details, and failure reason.

```javascript
await milvusClient.getImportJobProgress(params: HttpImportProgressReq)
```

## Request Syntax

```javascript
await milvusClient.getImportJobProgress({
    jobId: string,
    dbName?: string,
})
```

**PARAMETERS:**

- **jobId** (*string*) -

    **[REQUIRED]**

    Specifies the import job ID returned by `createImportJobs()`.

- **dbName** (*string*) -

    Specifies the database name.

**RETURNS:**

*Promise<HttpImportProgressResponse>*

This method returns a promise that resolves to a **HttpImportProgressResponse** object.

**PARAMETERS:**

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


**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
const progress = await milvusClient.getImportJobProgress({
    jobId: 'job-1234567890',
});
```
