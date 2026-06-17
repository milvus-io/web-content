# OptimizeRequest

This class represents optimization parameters used by `Optimize()`, including target segment size, async mode, and timeout.

**METHODS:**

- `OptimizeRequest& WithDatabaseName(const std::string& db_name)`

      Sets the target database.

- `OptimizeRequest& WithCollectionName(const std::string& collection_name)`

      Sets the collection to optimize.

- `OptimizeRequest& WithTargetSize(const std::string& target_size)`

      Sets desired compacted segment size such as `"512MB"` or `"1GB"`.

- `OptimizeRequest& WithAsync(bool async)`

      Sets whether optimize runs asynchronously.

- `OptimizeRequest& WithTimeoutMs(int64_t timeout_ms)`

      Sets overall task timeout in milliseconds; `0` means no timeout.

## Example

