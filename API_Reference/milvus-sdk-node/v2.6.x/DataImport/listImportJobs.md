# listImportJobs()

This operation lists import jobs submitted through the HTTP import job API. Use it to review job IDs, collection names, progress, and state.

```javascript
await milvusClient.listImportJobs(params: HttpBaseReq)
```

## Request Syntax

```javascript
await milvusClient.listImportJobs({
    collectionName: string,
    dbName?: string,
})
```

**PARAMETERS:**

- **collectionName** (*string*) -

    **[REQUIRED]**

    The name of the collection the import jobs belong to.

- **dbName** (*string*) -

    Specifies the database name.

**RETURNS:**

*Promise<HttpImportListResponse>*

This method returns a promise that resolves to a **HttpImportListResponse** object.

**PARAMETERS:**

- **code** (*number*) -

    Specifies the HTTP API response code.

- **data.records** (*ImportJobType[]*) -

    Lists import jobs. Each entry provides the following fields:

    - **collectionName** (*string*) -

        The name of the collection the import job belongs to.

    - **jobId** (*string*) -

        The ID of the import job.

    - **progress** (*number*) -

        The import progress.

    - **state** (*string*) -

        The current state of the import job.

- **message** (*string*) -

    Specifies the response message.


**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
const jobs = await milvusClient.listImportJobs({
    dbName: 'default',
});
```
