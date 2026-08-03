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

## Example

```javascript
const job = await milvusClient.createImportJobs({
    collectionName: 'book_embeddings',
    files: [['s3://bucket/book_embeddings/part-0001.parquet']],
});
```
