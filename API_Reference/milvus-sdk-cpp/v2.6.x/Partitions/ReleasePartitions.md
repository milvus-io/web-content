# ReleasePartitions()

This operation releases the data of specific partitions from the query nodes.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithPartitionNames(const std::set<std::string>& partition_names)`

    Sets the names of the partitions.

- `AddPartitionName(const std::string& partition_name)`

    Adds a partition to be loaded.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

