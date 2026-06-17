# RefreshLoadRequest

This class represents the request parameters for `RefreshLoad()`, including sync mode and timeout settings.

**METHODS:**

- `bool Sync() const`

      Returns whether refresh runs in synchronous mode.

- `RefreshLoadRequest& WithSync(bool sync)`

      Sets synchronous (`true`) or asynchronous (`false`) refresh behavior.

- `int64_t TimeoutMs() const`

      Returns the timeout used for synchronous refresh.

- `RefreshLoadRequest& WithTimeoutMs(int64_t timeout_ms)`

      Sets timeout in milliseconds for synchronous refresh. Default is `60000`.

- `RefreshLoadRequest& WithCollectionName(const std::string& collection_name)`

      Sets the collection name inherited from `CollectionRequestBase`.

- `RefreshLoadRequest& WithDatabaseName(const std::string& db_name)`

      Sets the database name inherited from `CollectionRequestBase`.

## Example

