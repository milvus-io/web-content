# DropFunctionField()

Drop a function of an existing collection together with its output field and bound index.

```cpp
Status DropFunctionField(const DropFunctionFieldRequest& request)
```

## Request Syntax

```cpp
auto request = DropFunctionFieldRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFunctionName(function_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Set name of the collection.

- `WithFunctionName(std::string function_name)`

    Set the name of the function to drop.

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Demonstrates DropFunctionField() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::DropFunctionFieldRequest();
util::CheckStatus(client->DropFunctionField(request));
```

<!-- category: Collections; action: CREATE; addedSince: v3.0.x -->
