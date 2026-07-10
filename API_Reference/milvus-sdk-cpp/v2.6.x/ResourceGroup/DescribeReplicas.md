# DescribeReplicas()

This operation returns replica topology details, including shard leaders and node placement. Use it to inspect resource-group balancing and serving layout.

## Request Syntax

**REQUEST METHODS:**

- `WithCollectionName(const std::string& collection_name)`

      Sets the collection whose replicas you want to inspect.

- `WithDatabaseName(const std::string& db_name)`

      Sets the target database. If omitted, the default database is used.

**RETURNS:**

*Status* with *[DescribeReplicasResponse](DescribeReplicasResponse.md)*

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for invalid collection names or unavailable replica metadata.

## Example

