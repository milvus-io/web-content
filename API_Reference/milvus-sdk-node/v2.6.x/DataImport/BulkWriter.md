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

- **schema** (*[BulkWriterSchema](#bulkwriterschema)*) -

    **[REQUIRED]**

    Defines the collection fields and dynamic field setting used to validate rows and serialize files.

- **[storage](#storage)** (*[Storage](#storage)*) -

    Specifies a custom storage adapter. If omitted, files remain on local disk.

- **format** (*'json' | 'parquet'*) -

    Specifies the output file format. Defaults to `json`.

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

- `get totalRowCount(): number`

    Returns the total number of rows appended to the writer.

- `get bufferRowCount(): number`

    Returns the number of rows currently buffered but not yet committed.

- `get batchFiles(): string[][]`

    Returns the file paths of the batches generated so far.

- `writeFrom(source: AsyncIterable<Record<string, any>>): Promise<string[][]>`

    Consumes an async iterable, appends each row, closes the writer, and returns generated file paths.

**EVENTS:**

- **flush** (*FlushEvent*) -

    Emitted each time the buffered data is flushed to files. The event is a **FlushEvent** with the following members.

    - **files** (*string[]*) -

        Lists the files generated for the flushed chunk.

    - **rowCount** (*number*) -

        Specifies how many rows were flushed.

    - **chunkIndex** (*number*) -

        Specifies the zero-based chunk index.

**RETURNS:**

*BulkWriter*

## BulkWriterOptions

This interface configures a **BulkWriter** instance, including schema validation, storage behavior, file format, chunk size, and local output path.

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

- **schema** (*[BulkWriterSchema](#bulkwriterschema)*) -

    **[REQUIRED]**

    Defines the fields that `BulkWriter` validates and serializes.

- **[storage](#storage)** (*[Storage](#storage)*) -

    Specifies a custom storage adapter. If omitted, `LocalStorage` keeps the generated files on disk.

- **format** (*'json' | 'parquet'*) -

    Specifies the generated file format. Defaults to `json`.

- **chunkSize** (*number*) -

    Specifies the approximate buffered byte size that triggers automatic commit.

- **localPath** (*string*) -

    Specifies the local base directory where chunk folders are created.

## BulkWriterSchema

This interface describes the collection schema used by **BulkWriter** to validate rows and generate JSON or Parquet files that Milvus can import.

```javascript
interface BulkWriterSchema {
    fields: FieldType[];
    enable_dynamic_field?: boolean;
}
```

**FIELDS:**

- **fields** (*FieldType[]*) -

    **[REQUIRED]**

    Specifies collection fields. Fields marked as `autoID` or `is_function_output` are excluded from generated import files. See [FieldType](../Collections/FieldType.md).

- **enable_dynamic_field** (*boolean*) -

    Specifies whether dynamic fields are collected into the `$meta` column.

## Storage

This interface stores files produced by **BulkWriter**. Use it to upload generated files to object storage or another remote location before calling `bulkInsert()`.

```javascript
interface Storage {
    write(localPath: string, remotePath: string): Promise<string>;
}
```

**METHODS:**

- `write(localPath: string, remotePath: string): Promise<string>`

    Stores a generated local file and returns the final path that should be passed to Milvus import APIs.

## Formatter

Serializes buffered **BulkWriter** columns into one or more import files. `BulkWriter` selects `JsonFormatter` when `format` is `json` and `ParquetFormatter` when `format` is `parquet`.

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

    - **schema** (*[BulkWriterSchema](#bulkwriterschema)*) -

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
