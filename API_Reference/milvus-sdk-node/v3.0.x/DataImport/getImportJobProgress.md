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

## Example

```javascript
const progress = await milvusClient.getImportJobProgress({
    jobId: 'job-1234567890',
});
```
