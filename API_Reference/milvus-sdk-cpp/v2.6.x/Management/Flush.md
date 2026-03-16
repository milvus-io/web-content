# Flush()

This operation flushes the streaming data and seals segments. It is recommended to call this operation after all the data has been inserted into a collection.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionNames(std::set<std::string>&& names)`

    Sets the name of the collection.

- `AddCollectionName(const std::string& name)`

    Adds the name of a collection to flush.

- `WithWaitFlushedMs(int64_t ms)`

    Sets the number of milliseconds to wait for the flush action to complete. The default value is 0. If `WaitFlushedMs` is set to 0, this operation repeatedly calls `GetFlushState()` to check the status of related segments until all segments are flushed, ensuring that the buffer is persisted successfully. If `WaitFlushedMs` is greater than 0, this operation will break the loop after a specified period of time and return a status indicating a timeout.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

