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

- `WithCollectionName(const std::string& collection_name)`

    Set name of the collection.

- `WithField(FieldSchema&& field_schema)`

    Set the schema of the output field produced by the function.

- `WithFunction(const FunctionPtr& function)`

    Set the function that backs the field (for example, a BM25 tokenizer).

- `WithIndex(IndexDesc&& index)`

    Set the index descriptor bound to the new field.

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Demonstrates AddFunctionField() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::AddFunctionFieldRequest();
util::CheckStatus(client->AddFunctionField(request));
```

<!-- category: Collections; action: CREATE; addedSince: v3.0.x -->
