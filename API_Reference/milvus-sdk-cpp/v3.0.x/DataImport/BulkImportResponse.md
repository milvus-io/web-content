# BulkImportResponse

The envelope returned by the Milvus bulk-import REST endpoints: the server `code`/`message` plus the endpoint-specific `data` payload. `CreateImportJobs()`, `GetImportJobProgress()`, `ListImportJobs()`, `CommitImport()`, and `AbortImport()` all return this same response type through the `response` out-parameter of a [Status](../Client/Status.md) call.

```cpp
class BulkImportResponse
```

**METHODS:**

- `const nlohmann::json& RawJson() const`

    Returns the raw JSON body.

- `int64_t Code() const`

    Returns the REST envelope code.

- `std::string Message() const`

    Returns the REST envelope message.

- `const nlohmann::json& Data() const`

    Returns the REST envelope data object.

- `std::string JobId() const`

    Returns the created job ID when applicable; otherwise returns an empty string.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include "milvus/BulkImport.h"
#include <iostream>

auto request = milvus::MilvusImportRequest()
    .WithApiKey("root:Milvus")
    .WithCollectionName("demo")
    .WithFiles({{"backup/1.parquet", "backup/2.parquet"}});
milvus::BulkImportResponse response;
auto status = milvus::BulkImport::CreateImportJobs(
    "http://localhost:19530", request, response);
if (status.IsOk() && response.Code() == 0) {
    std::cout << "job created: " << response.JobId() << std::endl;
}
```
