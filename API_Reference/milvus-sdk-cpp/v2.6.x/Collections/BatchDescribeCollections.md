# BatchDescribeCollections()

This operation retrieves schema and configuration metadata for a batch of collections. Use it to reduce round trips when inspecting many collections at once.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database containing the target collections.

- `WithCollectionNames(std::vector<std::string>&& collection_names)`

    Sets the full list of collection names to describe.

- `AddCollectionName(const std::string& collection_name)`

    Appends one collection name to the request list.

- `WithCollectionIDs(std::vector<int64_t>&& collection_ids)`

    Sets the full list of collection IDs to describe.

- `AddCollectionID(int64_t collection_id)`

    Appends one collection ID to the request list.

**RETURNS:**

*Status* with *[BatchDescribeCollectionsResponse](BatchDescribeCollectionsResponse.md)*

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for invalid database, missing collections, or permission failures.

## Example

