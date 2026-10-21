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

Returns a Status indicating whether the operation succeeded. The alias description is carried in the response object.

- **response** (*DescribeAliasResponse*) -

    - **Desc** (*const AliasDesc&*) -

        Get alias description.

        - **CollectionName** (*const std::string&*) -

            Collection name associated with the alias.

        - **DatabaseName** (*const std::string&*) -

            Database name which the alias belongs to.

        - **Name** (*const std::string&*) -

            Alias name.

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
