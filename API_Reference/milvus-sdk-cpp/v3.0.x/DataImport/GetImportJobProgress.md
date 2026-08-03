# GetImportJobProgress()

This operation retrieves the current progress and status of a bulk import job by its job ID. Poll this method after calling `CreateImportJobs()` to determine when the import is complete.

```cpp
static nlohmann::json BulkImport::GetImportJobProgress(
    const std::string& url,
    const std::string& job_id,
    const std::string& db_name = "default",
    const std::string& api_key = "")
```

## Request Syntax

```cpp
auto resp = milvus::BulkImport::GetImportJobProgress(
    url,
    job_id,
    db_name,
    api_key);
```

**PARAMETERS:**

- `url` (*const std::string&*)

    **[REQUIRED]**

    The URL of the Milvus server, e.g. `"http://localhost:19530"`.

- `job_id` (*const std::string&*)

    **[REQUIRED]**

    The ID of the import job to query. Obtained from the response of `CreateImportJobs()`.

- `db_name` (*const std::string&*)

    The name of the database used when the job was created. Defaults to `"default"`.

- `api_key` (*const std::string&*)

    The API key for authentication. Pass as `"username:password"` for Milvus or a cloud API key for Zilliz Cloud.

**RETURNS:**

*nlohmann::json*

A JSON object describing job progress, or `nullptr` on failure. Includes fields such as `state` (`"Pending"`, `"InProgress"`, `"Completed"`, `"Failed"`), `progress` (0–100), and `importedRows`.

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

// Create a job first
auto create_resp = milvus::BulkImport::CreateImportJobs(
    "http://localhost:19530",
    "my_collection",
    {"parquet-folder/1.parquet"},
    "default",
    "root:Milvus"
);

std::string job_id = create_resp["data"]["jobId"];

// Poll for progress
while (true) {
    auto progress_resp = milvus::BulkImport::GetImportJobProgress(
        "http://localhost:19530",
        job_id,
        "default",
        "root:Milvus"
    );

    if (progress_resp.is_null()) {
        std::cout << "Failed to get progress" << std::endl;
        break;
    }

    std::string state = progress_resp["data"]["state"];
    int progress = progress_resp["data"]["progress"];
    std::cout << "State: " << state << "  Progress: " << progress << "%" << std::endl;

    if (state == "Completed" || state == "Failed") break;
    std::this_thread::sleep_for(std::chrono::seconds(2));
}
```
