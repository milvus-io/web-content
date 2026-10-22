# CreateDatabase()

This operation creates a new database.

```cpp
Status CreateDatabase(const CreateDatabaseRequest& request)
```

## Request Syntax

```cpp
auto request = CreateDatabaseRequest()
    .WithDatabaseName(db_name)
    .WithProperties(properties);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets properties of this database.

- `SetProperties(std::unordered_map<std::string, std::string>&& properties)`

    Set properties of this database.

- `AddProperty(const std::string& key, const std::string& property)`

    Adds a property to this database.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::unordered_map<std::string, std::string> props;
props.emplace("database.replica.number", "2");
status = client->CreateDatabase(
    milvus::CreateDatabaseRequest()
        .WithDatabaseName(my_db_name)
        .WithProperties(std::move(props))
);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
