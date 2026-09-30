# BulkWriter

This class generates Milvus-compatible JSON or Parquet files for offline bulk import workflows. Use it when a dataset is too large for normal row-by-row insert operations and should be staged as files before calling `bulkInsert()`.

```javascript
const writer = new BulkWriter(options: BulkWriterOptions)
```

## Constructor

```javascript
new BulkWriter({
    schema: BulkWriterSchema,
    storage?: Storage,
    format?: 'json' | 'parquet',
    chunkSize?: number,
    localPath?: string,
})
```

**PARAMETERS:**

- **schema** (*[BulkWriterSchema](BulkWriterSchema.md)*) -

    **[REQUIRED]**

    Defines the collection fields and dynamic field setting used to validate rows and serialize files.

- **[storage](Storage.md)** (*[Storage](Storage.md)*) -

    Specifies a custom storage adapter. If omitted, files remain on local disk.

- **format** (*'json' | 'parquet'*) -

    Specifies the output file format. Defaults to `json`. Parquet output uses `@shanghaikid/parquetjs` in v3.0.3 and later.

- **chunkSize** (*number*) -

    Specifies the approximate buffered byte size that triggers an automatic flush. Defaults to 128 MB.

- **localPath** (*string*) -

    Specifies the base local directory for generated chunks. Defaults to the current working directory.

**METHODS:**

- `append(row: Record<string, any>): Promise<void>`

    Appends one row and automatically commits when the buffered data reaches `chunkSize`.

- `commit(): Promise<void>`

    Flushes the current buffer to files and stores them through the configured storage adapter.

- `close(): Promise<string[][]>`

    Flushes remaining rows and returns the generated file paths grouped by chunk.

- `writeFrom(source: AsyncIterable<Record<string, any>>): Promise<string[][]>`

    Consumes an async iterable, appends each row, closes the writer, and returns generated file paths.

**RETURNS:**

*BulkWriter*

## Example

```javascript
import { BulkWriter, DataType } from '@zilliz/milvus2-sdk-node';

const writer = new BulkWriter({
    schema: {
        fields: [
            { name: 'id', data_type: DataType.Int64, is_primary_key: true },
            { name: 'vector', data_type: DataType.FloatVector, dim: 3 },
            { name: 'text', data_type: DataType.VarChar, max_length: 256 },
        ],
    },
    format: 'parquet',
});

await writer.append({ id: 1, vector: [0.1, 0.2, 0.3], text: 'alpha' });
const files = await writer.close();
console.log(files);
```
