# BulkWriterOptions

This interface configures a `BulkWriter` instance, including schema validation, storage behavior, file format, chunk size, and local output path.

```javascript
interface BulkWriterOptions
```

**FIELDS:**

- **schema** (*[BulkWriterSchema](BulkWriterSchema.md)*) -

    **[REQUIRED]**

    Defines the fields that `BulkWriter` validates and serializes.

- **[storage](Storage.md)** (*[Storage](Storage.md)*) -

    Specifies a custom storage adapter. If omitted, `LocalStorage` keeps generated files on disk.

- **format** (*'json' | 'parquet'*) -

    Specifies the generated file format. Defaults to `json`.

- **chunkSize** (*number*) -

    Specifies the approximate buffered byte size that triggers automatic commit.

- **localPath** (*string*) -

    Specifies the local base directory where chunk folders are created.

## Example

```javascript
const options = {
    schema,
    format: 'json',
    chunkSize: 64 * 1024 * 1024,
    localPath: '/tmp/milvus-bulk',
};
```
