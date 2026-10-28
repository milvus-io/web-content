# BulkImportResponse

Carries the response from a request/response BulkImport REST API overload.

```cpp
BulkImportResponse response;
```

**METHODS:**

- `const nlohmann::json& RawJson() const`

    Returns the raw JSON body of the REST response.

- `int64_t Code() const`

    Returns the REST envelope code.

- `std::string Message() const`

    Returns the REST envelope message.

- `const nlohmann::json& Data() const`

    Returns the REST envelope data object.

- `std::string JobId() const`

    Returns the created import-job ID, or an empty string for operations that do not create a job.
