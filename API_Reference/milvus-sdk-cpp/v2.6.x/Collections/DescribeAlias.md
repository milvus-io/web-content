# DescribeAlias()

This operation returns the description of an alias.

```cpp
Status DescribeAlias(const DescribeAliasRequest& request, DescribeAliasResponse& response)
```

## Request Syntax

```cpp
auto request = DescribeAliasRequest()
    .WithDatabaseName(db_name)
    .WithAlias(alias);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set database name in which the collection is created.

- `WithAlias(const std::string& alias)`

    Sets the name of the alias.

- `SetAlias(const std::string& alias)`

    Set name of the alias.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. On success, the DescribeAliasResponse carries the description of the alias.

- **response** (*DescribeAliasResponse*) -

    - **Desc** (*const AliasDesc&*) -

        Get alias description.

        - **Name** (*const std::string&*) -

            Alias name.

        - **DatabaseName** (*const std::string&*) -

            Database name which the alias belongs to.

        - **CollectionName** (*const std::string&*) -

            Collection name with which the alias is associated.


AliasDesc members:

**METHODS:**

- `const std::string& Name() const`

    Name of the alias.

- `const std::string& DatabaseName() const`

    Name of the database the alias belongs to.

- `const std::string& CollectionName() const`

    Name of the collection this alias points to.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

DescribeAliasResponse response;
auto status = client->DescribeAlias(
    DescribeAliasRequest()
        .WithAlias("my_alias"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const AliasDesc& desc = response.Desc();
std::cout << "Alias:      " << desc.Name() << "\n"
          << "Collection: " << desc.CollectionName() << "\n"
          << "Database:   " << desc.DatabaseName() << "\n";
```

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

milvus::DescribeAliasResponse response;
status = client->DescribeAlias(
    milvus::DescribeAliasRequest()
        .WithAlias("my_alias"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Alias: " << response.Desc().Name()
          << ", Collection: " << response.Desc().CollectionName() << std::endl;
```
