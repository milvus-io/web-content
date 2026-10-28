# AlterDatabaseProperties()

This operation alters a database property. 

```cpp
Status AlterDatabaseProperties(const AlterDatabasePropertiesRequest& request)
```

## Request Syntax

```cpp
auto request = AlterDatabasePropertiesRequest()
    .WithDatabaseName(db_name)
    .WithProperties(properties);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets altered properties of this database. You can find the available database properties on [this page](https://milvus.io/docs/manage_databases.md#Manage-database-properties). 

- `SetProperties(std::unordered_map<std::string, std::string>&& properties)`

    Set altered properties of this database.

- `AddProperty(const std::string& key, const std::string& property)`

    Adds a property to this database.

**RETURNS:**

*[Status](../Client/Status.md)*

Check `status.IsOk()` to confirm success.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->AlterDatabaseProperties(
    milvus::AlterDatabasePropertiesRequest()
        .WithDatabaseName("my_database")
        .AddProperty("key", "value"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
