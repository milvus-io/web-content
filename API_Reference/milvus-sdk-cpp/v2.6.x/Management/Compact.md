# Compact()

This operation manually triggers a compaction action. In normal cases, users do not need to run this operation because Milvus automatically triggers compactions internally. It is mainly used for maintenance or debugging purposes.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithClusteringCompaction(bool clustering_compaction)`

    Sets the cluserting compaction flag. 

    - **True**: Conducts clustering compaction and reports an error if there is no clustering key.

    - **False**: Conducts normal compaction.

**RETURNS:**

*Status* with *CompactResponse*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

