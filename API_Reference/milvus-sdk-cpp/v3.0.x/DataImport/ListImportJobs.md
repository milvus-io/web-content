# ListImportJobs()

This operation retrieves a list of all bulk import jobs associated with a specific collection. It is useful for auditing past and in-progress import operations.

```cpp
static nlohmann::json BulkImport::ListImportJobs(
    const std::string& url,
    const std::string& collection_name,
    const std::string& db_name = "default",
    const std::string& api_key = "")
```

## Request Syntax

```cpp
auto resp = milvus::BulkImport::ListImportJobs(
    url,
    collection_name,
    db_name,
    api_key);
```

**PARAMETERS:**

- `url` (*const std::string&*)

    **[REQUIRED]**

    The URL of the Milvus server, e.g. `"http://localhost:19530"`.

- `collection_name` (*const std::string&*)

    **[REQUIRED]**

    The name of the collection whose import jobs to list.

- `db_name` (*const std::string&*)

    The name of the database that holds the collection. Defaults to `"default"`.

- `api_key` (*const std::string&*)

    The API key for authentication. Pass as `"username:password"` for Milvus or a cloud API key for Zilliz Cloud.

**RETURNS:**

*nlohmann::json*

A JSON object containing an array of import job records, or `nullptr` on failure. Each record includes the job ID, state, and creation time.

**EXCEPTIONS:**

- **std::exception**

    Thrown if the HTTP request fails or the response cannot be parsed. Check the return value for `nullptr` to detect failures.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root", "Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// List all import jobs for a collection
auto resp = milvus::BulkImport::ListImportJobs(
    "http://localhost:19530",
    "my_collection",
    "default",
    "root:Milvus"
);

if (!resp.is_null()) {
    for (auto& job : resp["data"]["records"]) {
        std::cout << "Job ID: " << job["jobId"]
                  << "  State: " << job["state"] << std::endl;
    }
} else {
    std::cout << "Failed to list import jobs" << std::endl;
}
```
