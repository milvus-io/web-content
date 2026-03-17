# DescribeDatabase()

This operation returns the description of a database, including its properties.

```cpp
Status DescribeDatabase(const DescribeDatabaseRequest& request, DescribeDatabaseResponse& response)
```

## Request Syntax

```cpp
auto request = DescribeDatabaseRequest()
    .WithDatabaseName(db_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

**RETURNS:**

*Status* with *DescribeDatabaseResponse*

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

milvus::DescribeDatabaseResponse resp_desc_db;
status = client->DescribeDatabase(
    milvus::DescribeDatabaseRequest()
        .WithDatabaseName(my_db_name), 
    resp_desc_db
);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "database.replica.number = " << resp_desc_db.Desc().Properties().at("database.replica.number")
          << std::endl;
```
