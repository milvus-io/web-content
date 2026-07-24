# RefreshLoad()

This operation refreshes a loaded collection in QueryNode memory. Use it after significant ingestion or compaction when you want the loaded data view to catch up immediately.

## Request Syntax

**REQUEST METHODS:**

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection name to refresh.

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database. If omitted, the default database is used.

- `WithSync(bool sync)`

    Controls whether the call blocks until refresh completes. Default is `true`.

- `WithTimeoutMs(int64_t timeout_ms)`

    Sets timeout in milliseconds for synchronous refresh. Default is `60000`.

**RETURNS:**

*Status*

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for invalid collection names, load-state issues, or timeout failures.

## Example

