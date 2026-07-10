# HttpImportListResponse

This interface describes the response returned by `listImportJobs()`.

```javascript
interface HttpImportListResponse
```

**FIELDS:**

- **code** (*number*) -

    Specifies the HTTP API response code.

- **data.records** (*ImportJobType[]*) -

    Lists import jobs with collection name, job ID, progress, and state.

- **message** (*string*) -

    Specifies the response message.

## Example

```javascript
const records = response.data.records;
```
