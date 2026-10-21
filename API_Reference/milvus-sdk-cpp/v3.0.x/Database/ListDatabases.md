# ListDatabases()

This operation lists all databases.

```cpp
Status ListDatabases(const ListDatabasesRequest& request, ListDatabasesResponse& response)
```

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The list of database names is carried in the response object.

- **response** (*ListDatabasesResponse*) -

    - **DatabaseNames** (*const std::vector<std::string>&*) -

        Get database names.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details. See [StatusCode](../Client/StatusCode.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::ListDatabasesResponse resp_list_dbs;
status = client->ListDatabases(milvus::ListDatabasesRequest(), resp_list_dbs);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const std::string my_db_name = "my_temp_db_for_cpp_test";
std::cout << "Databases: ";
for (const auto& name : resp_list_dbs.DatabaseNames()) {
    std::cout << name << ",";
}
std::cout << std::endl;
```
