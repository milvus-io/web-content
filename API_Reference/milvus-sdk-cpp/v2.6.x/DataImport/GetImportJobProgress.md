# GetImportJobProgress()

This operation retrieves the current progress and status of a bulk import job by its job ID. Poll this method after calling `CreateImportJobs()` to determine when the import is complete.

## Request Syntax

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

