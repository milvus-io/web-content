# AbortImport()

Abort a 2PC import job created with options.auto_commit=false, discarding its staged imported data.

## Request Syntax

```cpp
static nlohmann::json AbortImport(const std::string& url, const std::string& job_id, const std::string& db_name = "default", const std::string& api_key = "")
```

**RETURNS:**

*nlohmann::json*

Returns the JSON response from the bulk-import endpoint.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Demonstrates AbortImport() with the C++ SDK.

```cpp
auto response = milvus::BulkImport::AbortImport(
    "http://localhost:19530", "import-job-id", "default", "root:Milvus");
```
