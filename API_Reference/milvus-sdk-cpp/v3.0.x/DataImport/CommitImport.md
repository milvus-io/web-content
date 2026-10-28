# CommitImport()

Commits a two-phase-commit import job created with `auto_commit=false`. The typed request/response overload is recommended in C++ SDK 3.0.4 or later. Transport behavior is controlled by [BulkImportConfig](BulkImportConfig.md). The legacy `nlohmann::json` overload is deprecated; use the typed request/response overload instead.

```cpp
Status BulkImport::CommitImport(
    const std::string& url,
    const BaseDescribeImportRequest<T>& request,
    BulkImportResponse& response,
    const BulkImportConfig& config = BulkImportConfig{})
```

## Request Syntax

```cpp
auto request = milvus::MilvusDescribeImportRequest()
    .WithApiKey("root:Milvus")
    .WithDatabaseName("default")
    .WithJobId(job_id);


milvus::BulkImportResponse response;
auto status = milvus::BulkImport::CommitImport(
    "http://localhost:19530", request, response);
```

**REQUEST METHODS:**

- `WithApiKey(const std::string& api_key)`

    Sets the REST API key. For Milvus, use `username:password`.

- `SetApiKey(const std::string& api_key)`

    Sets the REST API key. For Milvus, use `username:password`.

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database. Empty selects the default database.

- `SetDatabaseName(const std::string& db_name)`

    Sets the target database. Empty selects the default database.

- `WithJobId(const std::string& job_id)`

    Sets the staged import job to describe and then commit or abort.

- `SetJobId(const std::string& job_id)`

    Sets the staged import job to describe and then commit or abort.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the REST call succeeded. The REST envelope and payload are carried in `BulkImportResponse`.

- **response** (*BulkImportResponse*) -

    See [BulkImportResponse](BulkImportResponse.md).

    - **RawJson** (*const nlohmann::json&*) -

        Returns the raw JSON body.

    - **Code** (*int64_t*) -

        Returns the REST envelope code.

    - **Message** (*std::string*) -

        Returns the REST envelope message.

    - **Data** (*const nlohmann::json&*) -

        Returns the REST envelope data object.

    - **JobId** (*std::string*) -

        Returns the created job ID when applicable; otherwise returns an empty string.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). HTTP transport failures and REST errors produce a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()`, `response.Code()`, and `response.Message()`. See [Status](../Client/Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include "milvus/BulkImport.h"
#include <iostream>

auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
auto request = milvus::MilvusDescribeImportRequest()
    .WithApiKey("root:Milvus")
    .WithJobId("import-job-id");
milvus::BulkImportResponse response;
status = milvus::BulkImport::CommitImport(
    "http://localhost:19530", request, response);
if (status.IsOk() && response.Code() == 0) {
    std::cout << "2PC operation accepted\n";
}
```
