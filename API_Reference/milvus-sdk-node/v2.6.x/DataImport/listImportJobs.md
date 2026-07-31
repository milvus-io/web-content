# listImportJobs()

This operation lists import jobs submitted through the HTTP import job API. Use it to review job IDs, collection names, progress, and state.

```javascript
await milvusClient.listImportJobs(params: HttpBaseReq)
```

## Request Syntax

```javascript
await milvusClient.listImportJobs({
    dbName?: string,
})
```

**PARAMETERS:**

- **dbName** (*string*) -

    Specifies the database name.

**RETURNS:**

*Promise<HttpImportListResponse>*

## Example

```javascript
const jobs = await milvusClient.listImportJobs({
    dbName: 'default',
});
```
