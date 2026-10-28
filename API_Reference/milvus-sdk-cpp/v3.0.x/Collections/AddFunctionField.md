# AddFunctionField()

Add a BM25 sparse-vector or MinHash binary-vector function-backed field to an existing collection.

```cpp
Status AddFunctionField(const AddFunctionFieldRequest& request)
```

## Request Syntax

```cpp
auto request = AddFunctionFieldRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithField(field_schema)
    .WithFunction(function)
    .WithIndex(index_desc);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Set name of the collection.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithField(FieldSchema&& field_schema)`

    Set the schema of the output field produced by the function.

- `SetField(FieldSchema&& field_schema)`

    Set the function output field schema. BM25 requires SPARSE_FLOAT_VECTOR and MinHash requires BINARY_VECTOR.

- `WithFunction(const FunctionPtr& function)`

    Set the function that backs the field (for example, a BM25 tokenizer).

- `SetFunction(const FunctionPtr& function)`

    Set the function to be added. AddFunctionField currently supports BM25 and MinHash functions.

- `WithIndex(IndexDesc&& index)`

    Set the index descriptor bound to the new field.

- `SetIndex(IndexDesc&& index)`

    Set the index bound to the function output field. The bound index is required and must use an explicit index type.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a status indicating whether the operation succeeded.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Demonstrates AddFunctionField() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::AddFunctionFieldRequest();
util::CheckStatus(client->AddFunctionField(request));
```
