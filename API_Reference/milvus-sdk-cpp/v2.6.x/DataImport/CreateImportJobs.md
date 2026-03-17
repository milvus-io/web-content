# CreateImportJobs()

This operation creates a bulk import job to load data from files stored in object storage into a Milvus collection. It communicates directly with the Milvus server via its RESTful import API and returns a JSON object containing the assigned job ID. Use `GetImportJobProgress()` to monitor progress.

```cpp
static nlohmann::json BulkImport::CreateImportJobs(
    const std::string& url,
    const std::string& collection_name,
    const std::vector<std::string>& files,
    const std::string& db_name = "default",
    const std::string& api_key = "",
    const std::string& partition_name = "",
    const nlohmann::json& options = nlohmann::json{})
```

## Request Syntax

```cpp
auto resp = milvus::BulkImport::CreateImportJobs(
    url,
    collection_name,
    files,
    db_name,
    api_key,
    partition_name,
    options);
```

**PARAMETERS:**

- `url` (*const std::string&*)

    **[REQUIRED]**

    The URL of the Milvus server, e.g. `"http://localhost:19530"`.

- `collection_name` (*const std::string&*)

    **[REQUIRED]**

    The name of the target collection.

- `files` (*const std::vector<std::string>&*)

    **[REQUIRED]**

    A list of file paths relative to the object storage root. Each path may point to a single JSON/Parquet file or a folder. Example: `{"parquet-folder/1.parquet", "parquet-folder/2.parquet"}`.

- `db_name` (*const std::string&*)

    The name of the database that holds the collection. Defaults to `"default"`.

- `api_key` (*const std::string&*)

    The API key for authentication. Pass as `"username:password"` for Milvus or a cloud API key for Zilliz Cloud.

- `partition_name` (*const std::string&*)

    The name of a target partition. Optional — only specify when the collection does not use a partition key.

- `options` (*const nlohmann::json&*)

    Additional import options in JSON format. Supports `"timeout"` (integer, seconds).

**RETURNS:**

*nlohmann::json*

A JSON object containing the job ID on success, or `nullptr` on failure. The `jobId` field in the response can be passed to `GetImportJobProgress()`.

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

// Create an import job using local Milvus
auto resp = milvus::BulkImport::CreateImportJobs(
    "http://localhost:19530",               // Milvus server URL
    "my_collection",                         // Target collection
    {"parquet-folder/1.parquet",            // Files to import
     "parquet-folder/2.parquet"},
    "default",                              // Database name
    "root:Milvus",                          // API key (user:password)
    ""                                      // Partition name (optional)
);

if (!resp.is_null()) {
    std::string job_id = resp["data"]["jobId"];
    std::cout << "Import job created: " << job_id << std::endl;
} else {
    std::cout << "Failed to create import job" << std::endl;
}
```
