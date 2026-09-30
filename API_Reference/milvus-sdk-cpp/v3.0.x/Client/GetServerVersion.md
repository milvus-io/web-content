# GetServerVersion()

This operation returns the Milvus server version.

```cpp
Status GetServerVersion(std::string& version)
```

**PARAMETERS:**

- **version** (*std::string&*)

    Sets a variable that holds the returned server version number.

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

std::string version;
status = client->GetServerVersion(version);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "The milvus server version is: " << version << std::endl;
```
