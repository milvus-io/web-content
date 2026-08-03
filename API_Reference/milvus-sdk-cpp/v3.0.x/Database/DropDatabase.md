# DropDatabase()

This operation drops a database.

```cpp
Status DropDatabase(const DropDatabaseRequest& request)
```

## Request Syntax

```cpp
auto request = DropDatabaseRequest()
    .WithDatabaseName(db_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->DropDatabase(
    milvus::DropDatabaseRequest()
        .WithDatabaseName(my_db_name)
);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
