# GetSDKVersion()

This operation returns the SDK version.

```cpp
Status GetSDKVersion(std::string& version)
```

**PARAMETERS:**

- **version** (*std::string&*)

    Sets a variable that holds the returned SDK version number.

## Request Syntax

```cpp
auto status = client->GetSDKVersion(version);
```

**REQUEST METHODS:**

Not applicable; this operation writes the version to a `std::string` output argument and has no request object.

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

// print the SDK version
client->GetSDKVersion(version);
std::cout << "The CPP SDK version is: " << version << std::endl;
```
