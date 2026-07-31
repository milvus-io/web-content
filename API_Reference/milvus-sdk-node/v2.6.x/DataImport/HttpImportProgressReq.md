# HttpImportProgressReq

This interface defines the request body for `getImportJobProgress()`.

```javascript
interface HttpImportProgressReq
```

**FIELDS:**

- **jobId** (*string*) -

    **[REQUIRED]**

    Specifies the import job ID.

- **dbName** (*string*) -

    Specifies the database name.

## Example

```javascript
const request = {
    jobId: 'job-1234567890',
};
```
