# UseDatabase()

This operation shifts the connection from one database to another.

```cpp
Status UseDatabase(const std::string& db_name)
```

**PARAMETERS:**

- **db_name** (*const std::string&*)

    Sets the name of the database to use.

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

status = client->UseDatabase(db_name);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
