# TransferNode()

This operation transfers query nodes to another resource group.

## Request Syntax

**REQUEST METHODS:**

- `WithSourceGroup(const std::string& source_group)`

    Sets the name of the source resource group.

- `WithTargetGroup(const std::string& target_group)`

    Sets the name of the target resource group.

- `WithNumNodes(int64_t num_nodes)`

    Sets the number of nodes to transfer.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

