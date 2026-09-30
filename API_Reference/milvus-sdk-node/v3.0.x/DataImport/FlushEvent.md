# FlushEvent

This interface describes a `BulkWriter` flush event. It reports the files generated for a chunk, the row count in that chunk, and the chunk index.

```javascript
interface FlushEvent
```

**FIELDS:**

- **files** (*string[]*) -

    **[REQUIRED]**

    Lists the files generated for the flushed chunk.

- **rowCount** (*number*) -

    **[REQUIRED]**

    Specifies how many rows were flushed.

- **chunkIndex** (*number*) -

    **[REQUIRED]**

    Specifies the zero-based chunk index.

## Example

```javascript
const event = {
    files: ['/tmp/chunk_0/data.parquet'],
    rowCount: 10000,
    chunkIndex: 0,
};
```
