# ListRLSPrincipals()

Lists principals that have stored row-level-security tags in a collection.

```cpp
Status ListRLSPrincipals(const ListRLSPrincipalsRequest& request, ListRLSPrincipalsResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::ListRLSPrincipalsRequest()
    .WithDatabaseName("default")
    .WithCollectionName("messages");
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection whose principals are listed.

- `SetCollectionName(const std::string& collection_name)`

    Sets the collection whose principals are listed.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded.

- **response** (*ListRLSPrincipalsResponse*) -

    - **PrincipalNames** (*const std::vector<std::string>&*) -

        Returns the principal names.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>

auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
milvus::ListRLSPrincipalsRequest request;
request.WithCollectionName("messages");
milvus::ListRLSPrincipalsResponse response;
status = client->ListRLSPrincipals(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& principal : response.PrincipalNames()) {
    std::cout << principal << '\n';
}
```
