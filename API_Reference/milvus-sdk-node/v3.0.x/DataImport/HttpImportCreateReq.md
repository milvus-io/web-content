# HttpImportCreateReq

This interface defines the request body for `createImportJobs()`.

```javascript
interface HttpImportCreateReq
```

**FIELDS:**

- **collectionName** (*string*) -

    **[REQUIRED]**

    Specifies the target collection name.

- **files** (*string[][]*) -

    **[REQUIRED]**

    Specifies file groups to import.

- **dbName** (*string*) -

    Specifies the database name.

- **options** (*object*) -

    Specifies import options.

## Example

```javascript
const request = {
    collectionName: 'book_embeddings',
    files: [['s3://bucket/book_embeddings/part-0001.parquet']],
    options: { timeout: '600s' },
};
```
