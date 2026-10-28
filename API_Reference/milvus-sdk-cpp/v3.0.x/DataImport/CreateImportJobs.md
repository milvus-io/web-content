# CreateImportJobs()

Creates a bulk import job from source files. The typed request/response overload is recommended in C++ SDK 3.0.4 or later. Transport behavior is controlled by [BulkImportConfig](BulkImportConfig.md). The legacy `nlohmann::json` overload is deprecated; use the typed request/response overload instead.

```cpp
Status BulkImport::CreateImportJobs(
    const std::string& url,
    const BaseImportRequest<T>& request,
    BulkImportResponse& response,
    const BulkImportConfig& config = BulkImportConfig{})
```

## Request Syntax

```cpp
auto request = milvus::MilvusImportRequest()
    .WithApiKey("root:Milvus")
    .WithDatabaseName("default")
    .WithCollectionName("demo")
    .WithOptions(nlohmann::json{{"timeout", 300}})
    .WithFiles({{"backup/1.parquet", "backup/2.parquet"}});

milvus::BulkImportResponse response;
auto status = milvus::BulkImport::CreateImportJobs(
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

- `WithCollectionName(const std::string& collection_name)`

    Sets the target collection.

- `SetCollectionName(const std::string& collection_name)`

    Sets the target collection.

- `WithPartitionName(const std::string& partition_name)`

    Sets the target partition for imports into a non-partition-key collection.

- `SetPartitionName(const std::string& partition_name)`

    Sets the target partition for imports into a non-partition-key collection.

- `WithOptions(nlohmann::json&& options)`

    Sets import options, such as timeout behavior.

- `SetOptions(nlohmann::json&& options)`

    Sets import options, such as timeout behavior.

- `WithRLSPrincipal(const std::string& principal)`

    Sets the application-level row-level-security principal.

- `SetRLSPrincipal(const std::string& principal)`

    Sets the application-level row-level-security principal.

- `WithSkipRLS(bool skip_rls)`

    Sets whether to bypass row-level-security enforcement.

- `SetSkipRLS(bool skip_rls)`

    Sets whether to bypass row-level-security enforcement.

- `WithFiles(std::vector<std::vector<std::string>>&& files)`

    Sets the Milvus import files. Each inner vector is one batch of source paths.

- `SetFiles(std::vector<std::vector<std::string>>&& files)`

    Sets the Milvus import files. Each inner vector is one batch of source paths.

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
auto request = milvus::MilvusImportRequest()
    .WithApiKey("root:Milvus")
    .WithCollectionName("demo")
    .WithFiles({{"backup/1.parquet", "backup/2.parquet"}});
milvus::BulkImportResponse response;
status = milvus::BulkImport::CreateImportJobs(
    "http://localhost:19530", request, response);
if (!status.IsOk() || response.Code() != 0) {
    std::cout << response.Message() << '\n';
} else {
    std::cout << response.JobId() << '\n';
}
```
