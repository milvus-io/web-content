# AliasDesc

This class represents the metadata of a collection alias. It is returned by calling `Desc()` on a `DescribeAliasResponse` object.

```cpp
AliasDesc();
AliasDesc(std::string alias_name, std::string db_name, std::string collection_name);
```

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
