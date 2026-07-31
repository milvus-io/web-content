# TransferReplica()

This operation transfers replicas of a collection from one resource group to another.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name in which the collection is created.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithSourceGroup(const std::string& source_group)`

    Set the name of the source resource group.

- `WithTargetGroup(const std::string& target_group)`

    Set the name of the target resource group.

- `WithNumReplicas(int64_t num)`

    Set the number of replicas to transfer.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

