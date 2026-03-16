# DescribeResourceGroup()

This operation describes a resource group.

## Request Syntax

**REQUEST METHODS:**

- `WithGroupName(const std::string& name)`

    Sets the name of the resource group.

**RETURNS:**

*Status* with *DescribeResourceGroupResponse*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

