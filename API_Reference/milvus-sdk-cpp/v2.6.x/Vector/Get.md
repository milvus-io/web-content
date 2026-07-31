# Get()

This operation issues a query with primary keys and returns a list of records.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithPartitionNames(std::set<std::string>&& partition_names)`

    Sets the names of the partitions. If it is empty, the default partition applies.

- `AddPartitionName(const std::string& partition_name)`

    Adds a partition name.

- `WithOutputFields(std::set<std::string>&& output_field_names)`

    Sets the output field names.

- `AddOutputField(const std::string& output_field)`

    Adds an output field.

- `WithConsistencyLevel(ConsistencyLevel consistency_level)`

    Sets the consistency level. 

- `WithIDs(std::vector<int64_t>&& id_array)`

    Sets an ID array.

**RETURNS:**

*Status* with *GetResponse*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

