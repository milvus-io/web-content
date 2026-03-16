# ListCollections()

This operation returns a list of all collections, including brief information for each.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithOnlyShowLoaded(bool only_show_loaded)`

    Sets the flag only show loaded collections or show all collections. Default: `false`.

**RETURNS:**

*Status* with *ListCollectionsResponse*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

