# Optimize()

This operation triggers optimize compaction for a collection and returns an asynchronous task handle that can be polled, cancelled, or awaited.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection to optimize.

- `WithTargetSize(const std::string& target_size)`

    Sets desired compacted segment size such as `"512MB"` or `"1GB"`.

- `WithAsync(bool async)`

    When `true`, optimization is scheduled asynchronously.

- `WithTimeoutMs(int64_t timeout_ms)`

    Sets the overall task timeout in milliseconds. `0` means no overall timeout.

**RETURNS:**

*Status* with *[OptimizeTaskPtr](OptimizeTask.md)*

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for invalid request parameters, optimize scheduling failures, or timeout errors.

## Example

