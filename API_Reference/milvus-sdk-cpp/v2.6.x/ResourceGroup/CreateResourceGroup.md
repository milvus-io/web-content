# CreateResourceGroup()

This operation creates a resource group.

<div class="alert note">

A resource group physically isolates certain query nodes from others. For details, refer to [this page](https://milvus.io/docs/resource_group.md#Manage-Resource-Groups).

</div>

## Request Syntax

**REQUEST METHODS:**

- `WithName(const std::string& name)`

    Sets the name of the resource group.

- `WithConfig(ResourceGroupConfig&& config)`

    Sets resource group configuration.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

