# DescribeReplicasRequest

This class represents the input to `DescribeReplicas()`. It carries collection and optional database scope via inherited collection request fields.

**METHODS:**

- `DescribeReplicasRequest& WithCollectionName(const std::string& collection_name)`

    Sets the collection name inherited from `CollectionRequestBase`.

- `DescribeReplicasRequest& WithDatabaseName(const std::string& db_name)`

    Sets the database name inherited from `CollectionRequestBase`.

## Example

