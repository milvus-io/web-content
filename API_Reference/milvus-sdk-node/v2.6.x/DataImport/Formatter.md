# Formatter

This interface serializes buffered `BulkWriter` columns into one or more files. The SDK provides JSON and Parquet formatter implementations.

```javascript
interface Formatter
```

**FIELDS:**

- **extension** (*string*) -

    **[REQUIRED]**

    Specifies the file extension produced by the formatter.

**METHODS:**

- `persist(columns: Map<string, any[]>, dynamicCol: Record<string, any>[], rowCount: number, dir: string, schema: BulkWriterSchema): Promise<string[]>`

    Serializes buffered columns to files under `dir` and returns the generated local file paths.

## Example

```javascript
class CustomFormatter {
    extension = '.json';
    async persist(columns, dynamicRows, rowCount, dir, schema) {
        return [];
    }
}
```
