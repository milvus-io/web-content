# BulkWriter

This class generates Milvus-compatible JSON or Parquet files for offline bulk import workflows. Use it when a dataset is too large for normal row-by-row insert operations and should be staged as files before calling `bulkInsert()`.

```javascript
const writer = new BulkWriter(options: BulkWriterOptions)
```

## Constructor

```javascript
const writer = new BulkWriter(options: BulkWriterOptions)
```

Constructs a **BulkWriter** instance from a **BulkWriterOptions** object that configures schema validation, storage behavior, file format, chunk size, and local output path. See [BulkWriterOptions](#bulkwriteroptions) below.

## Methods

**METHODS:**

- `get totalRowCount(): number`

    The total number of rows appended to this writer.

- `get bufferRowCount(): number`

    The number of rows currently buffered and not yet flushed.

- `get batchFiles(): string[][]`

    The file paths of all chunks generated so far, grouped by chunk.

- `append(row: Record<string, any>): Promise<void>`

    Appends one row and automatically commits when the buffered data reaches `chunkSize`.

- `commit(): Promise<void>`

    Flushes the current buffer to files and stores them through the configured storage adapter.

- `close(): Promise<string[][]>`

    Flushes remaining rows and returns the generated file paths grouped by chunk.

- `writeFrom(source: AsyncIterable<Record<string, any>>): Promise<string[][]>`

    Consumes an async iterable, appends each row, closes the writer, and returns generated file paths.

- `flush` event (*FlushEvent*)

    Emitted each time a chunk is written and stored. The event carries the files generated for the chunk, the row count in that chunk, and the chunk index.

    - **files** (*string[]*) -

        The files generated for the flushed chunk.

    - **rowCount** (*number*) -

        The number of rows flushed.

    - **chunkIndex** (*number*) -

        The zero-based index of the flushed chunk.

**RETURNS:**

*BulkWriter*

## BulkWriterOptions

The options object accepted by the `BulkWriter` constructor.

```javascript
interface BulkWriterOptions {
    schema: BulkWriterSchema;
    storage?: Storage;
    format?: 'json' | 'parquet';
    chunkSize?: number;
    localPath?: string;
}
```

**FIELDS:**

- **schema** (*[BulkWriterSchema](BulkWriterSchema.md)*) -

    **[REQUIRED]**

    Defines the collection fields and dynamic field setting used to validate rows and serialize files.

- **[storage](Storage.md)** (*[Storage](Storage.md)*) -

    Specifies a custom storage adapter. If omitted, `LocalStorage` keeps the generated files on disk.

- **format** (*'json' | 'parquet'*) -

    Specifies the output file format. Defaults to `json`. Parquet output uses `@shanghaikid/parquetjs` in v3.0.3 and later.

- **chunkSize** (*number*) -

    Specifies the approximate buffered byte size that triggers an automatic flush. Defaults to 128 MB.

- **localPath** (*string*) -

    Specifies the base local directory for generated chunks. Defaults to the current working directory.

## Formatter

The interface that serializes a buffered column set into one or more import files. `BulkWriter` selects `JsonFormatter` when `format` is `json` and `ParquetFormatter` when `format` is `parquet`.

```javascript
interface Formatter {
    readonly extension: string;
    persist(columns, dynamicCol, rowCount, dir, schema): Promise<string[]>;
}
```

**FIELDS:**

- **extension** (*string*) -

    The file extension of the generated files (for example, `.json` or `.parquet`).

**METHODS:**

- `persist(columns: Map<string, any[]>, dynamicCol: Record<string, any>[], rowCount: number, dir: string, schema: BulkWriterSchema): Promise<string[]>`

    Serializes the buffered columns and returns the generated local file paths.

    - **columns** (*Map<string, any[]>*) -

        The buffered column data.

    - **dynamicCol** (*Record<string, any>[]*) -

        The dynamic-field rows.

    - **rowCount** (*number*) -

        The number of rows being serialized.

    - **dir** (*string*) -

        The output directory.

    - **schema** (*[BulkWriterSchema](BulkWriterSchema.md)*) -

        The schema used to interpret the columns.

**IMPLEMENTATIONS:**

- `class JsonFormatter`

    Writes buffered rows to a JSON file whose top-level `rows` property contains the serialized entities, including dynamic fields when enabled.

- `class ParquetFormatter`

    Writes buffered rows to Parquet files using `@shanghaikid/parquetjs`, converting Milvus scalar, vector, array, and dynamic-field values to Parquet-compatible representations. Requires the SDK dependency `@shanghaikid/parquetjs`.

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
