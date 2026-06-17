# ListImportJobs()

This operation retrieves a list of all bulk import jobs associated with a specific collection. It is useful for auditing past and in-progress import operations.

## Request Syntax

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

