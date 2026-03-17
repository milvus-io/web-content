# DatabaseDesc

This class represents the metadata of a Milvus database. It is returned by calling `Desc()` on a `DescribeDatabaseResponse` object.

```cpp
const DatabaseDesc& desc = response.Desc();
```

**METHODS:**

- `const std::string& Name() const`

    Name of the database.

- `int64_t ID() const`

    Server-assigned database ID.

- `const std::unordered_map<std::string, std::string>& Properties() const`

    Database-level properties as key-value pairs.

- `uint64_t CreatedTime() const`

    UTC timestamp (microseconds) when the database was created.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

DescribeDatabaseResponse response;
auto status = client->DescribeDatabase(
    DescribeDatabaseRequest().WithDatabaseName("my_db"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const DatabaseDesc& desc = response.Desc();
std::cout << "Name:    " << desc.Name() << "\n"
          << "ID:      " << desc.ID() << "\n"
          << "Created: " << desc.CreatedTime() << "\n";
for (const auto& kv : desc.Properties()) {
    std::cout << "  " << kv.first << " = " << kv.second << "\n";
}
```
