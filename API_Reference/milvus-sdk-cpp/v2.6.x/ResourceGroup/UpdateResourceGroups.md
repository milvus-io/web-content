# UpdateResourceGroups()

This operation updates resource groups.

## Request Syntax

**REQUEST METHODS:**

- `WithGroups(std::unordered_map<std::string, ResourceGroupConfig>&& groups)`

    Sets the resource groups to be updated.

- `AddGroup(const std::string& name, ResourceGroupConfig&& config)`

    Adds a resource group to be updated.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

