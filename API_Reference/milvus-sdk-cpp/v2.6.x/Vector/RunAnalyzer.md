# RunAnalyzer()

This operation dry-runs an analyzer.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(std::string collection_name)`

    Sets the name of the collection.

- `WithFieldName(std::string field_name)`

    Sets the name of the target field, which cannot be empty.

- `WithTexts(const std::vector<std::string>& texts)`

    Sets the texts to be analyzed.

- `AddText(std::string text)`

    Adds the text for analyze.

- `AddAnalyzerName(std::string name)`

    Sets the name of the analyzer to run.

- `WithAnalyzerParams(const nlohmann::json& params)`

    Sets the analyzer parameters.

- `WithDetail(bool with_detail)`

    Whether to include the details in the returned results.

- `WithHash(bool with_hash)`

    Whether to include the hashed values in the returned results.

**RETURNS:**

*Status* with *RunAnalyzerResponse*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

