# GetPartitionStatistics()

This operation gets the partition statistics.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithPartitionName(const std::string& partition_name)`

    Sets the name of a partition.

**RETURNS:**

*Status* with *GetPartitionStatsResponse*

Check `status.IsOk()` to confirm success. Currently, the response contains only the row count.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

