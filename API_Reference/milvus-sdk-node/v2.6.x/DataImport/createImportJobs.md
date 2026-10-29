# createImportJobs()

This operation creates an HTTP import job from file groups. Use it after preparing files in object storage or another location accessible to the Milvus import service.

```javascript
await milvusClient.createImportJobs(params: HttpImportCreateReq)
```

## Request Syntax

```javascript
await milvusClient.createImportJobs({
    collectionName: string,
    files: string[][],
    dbName?: string,
    options?: {
        timeout: string,
    },
})
```

**PARAMETERS:**

- **collectionName** (*string*) -

    **[REQUIRED]**

    Specifies the target collection name.

- **files** (*string[][]*) -

    **[REQUIRED]**

    Specifies file groups to import. Each inner array represents files that belong to one import group.

- **dbName** (*string*) -

    Specifies the database name.

- **options** (*object*) -

    Specifies import options such as timeout.

**RETURNS:**

*Promise<HttpImportCreateResponse>*

This method returns a promise that resolves to a **HttpImportCreateResponse** object.

**PARAMETERS:**

- **code** (*number*) -

    Specifies the HTTP API response code.

- **data.jobId** (*string*) -

    Specifies the created import job ID.

- **message** (*string*) -

    Specifies the response message.


**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
const job = await milvusClient.createImportJobs({
    collectionName: 'book_embeddings',
    files: [['s3://bucket/book_embeddings/part-0001.parquet']],
});
```
