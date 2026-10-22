# CommitImport()

Commit a 2PC import job created with options.auto_commit=false, making its staged imported data visible.

## Request Syntax

```cpp
static nlohmann::json CommitImport(const std::string& url, const std::string& job_id, const std::string& db_name = "default", const std::string& api_key = "")
```

**RETURNS:**

*nlohmann::json*

Returns the JSON response from the bulk-import endpoint.

**ERROR HANDLING:**

The call does not throw: when the HTTP request fails or the response cannot be parsed, it returns a null result. Check the return value for `nullptr` to detect failures.

## Example

Demonstrates CommitImport() with the C++ SDK.

```cpp
#include "milvus/BulkImport.h"
auto response = milvus::BulkImport::CommitImport(
    "http://localhost:19530", "import-job-id", "default", "root:Milvus");
```
