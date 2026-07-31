# BatchDescribeCollectionsRequest

This class represents a batched collection metadata request. You can target collections by names, IDs, or both.

**METHODS:**

- `BatchDescribeCollectionsRequest& WithDatabaseName(const std::string& db_name)`

    Sets the target database.

- `BatchDescribeCollectionsRequest& WithCollectionNames(std::vector<std::string>&& collection_names)`

    Sets all collection names in one call.

- `BatchDescribeCollectionsRequest& AddCollectionName(const std::string& collection_name)`

    Appends one collection name.

- `BatchDescribeCollectionsRequest& WithCollectionIDs(std::vector<int64_t>&& collection_ids)`

    Sets all collection IDs in one call.

- `BatchDescribeCollectionsRequest& AddCollectionID(int64_t collection_id)`

    Appends one collection ID.

## Example

