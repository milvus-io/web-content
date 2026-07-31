# CreateIndex()

This operation indexes on vector fields or scalar fields.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithIndexes(std::vector<IndexDesc>&& indexes)`

    Sets the indexes to be created.

- `AddIndex(IndexDesc&& index)`

    Adds an index to be created.

- `WithSync(bool sync)`

    Sets whether to operate in sync mode. The default value is **True**.

    - **True**: This operation returns until the indexes are created.

    - **False**: This operation returns immediately.

- `WithTimeoutMs(int64_t timeout_ms)`

    Sets the timeout in milliseconds. The default value is 60000 ms. This parameter only works when this operation works in sync mode. 

    If `WaitFlushedMs` is set to 0, this operation repeatedly calls `DescribeIndex()` to check the index state until the index is fully built. If `WaitFlushedMs` is greater than 0, this operation will break the loop after a specified period of time and return a status indicating a timeout.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

