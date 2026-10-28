# CurrentUsedDatabase()

This operation returns the currently used database name. This API is useful in multi-database scenarios.

```cpp
Status CurrentUsedDatabase(std::string& db_name)
```

**PARAMETERS:**

- **db_name** (*std::string&*)

    Sets a variable that holds the name of the currently used database.

## Request Syntax

```cpp
std::string database = client->CurrentUsedDatabase();
```

**REQUEST METHODS:**

Not applicable; this operation has no request object.

**RETURNS:**

*[Status](Status.md)*

Check `status.IsOk()` to confirm success.

**ERROR HANDLING:**

- **[Status](Status.md)**

    Failures are reported through the returned [Status](Status.md). The SDK converts internal exceptions into a non-OK [Status](Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::string current_db_name;
client->CurrentUsedDatabase(current_db_name);
std::cout << "Current in-used database: " << current_db_name << std::endl;
```
