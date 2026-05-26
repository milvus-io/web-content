# GetLoadState()

This operation gets the load state of the collection or partitions.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithPartitionNames(std::set<std::string>&& partition_names)`

    Sets the partition names. This is optional, and when set, this operation returns the load state of the specified partitions. If this is empty, this operation returns the load state of the specified collection.

- `AddPartitionName(const std::string& partition_name)`

    Adds a partition name to get its load state.

**RETURNS:**

*Status* with *GetLoadStateResponse*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

