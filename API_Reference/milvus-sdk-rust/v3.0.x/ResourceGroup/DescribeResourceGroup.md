# DescribeResourceGroup()

Retrieves a resource group's node and replica assignments.

```rust
pub async fn describe_resource_group(&self, request: DescribeResourceGroupRequest) -> Result<DescribeResourceGroupResponse>
```

## Request Syntax

```rust
let request = DescribeResourceGroupRequest::builder()
    .group_name("group_1")
    .build()?;
```

**REQUEST FIELDS:**

- `group_name: String`

    Name of the resource group to describe. Required.

**RETURNS:**

*Result\<DescribeResourceGroupResponse\>*

`DescribeResourceGroupResponse` exposes `description()` returning a `ResourceGroupDescription` with the group name, capacity, available nodes, loaded replicas, outgoing/incoming node transfers, the `ResourceGroupConfig`, and the assigned `ResourceGroupNode` list. Returns an `Error` on failure.

## Example

```rust
let request = DescribeResourceGroupRequest::builder()
    .group_name("group_1")
    .build()?;
let resp = client.describe_resource_group(request).await?;
println!(
    "capacity: {}, available: {}",
    resp.description().get_capacity(),
    resp.description().get_available_nodes()
);
```
