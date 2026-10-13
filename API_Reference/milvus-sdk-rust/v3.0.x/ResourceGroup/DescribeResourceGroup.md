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

**RETURN TYPE:**

*Result\<DescribeResourceGroupResponse\>*

**RETURNS:**

A **DescribeResourceGroupResponse** containing the resource group description. Returns an `Error` if the operation fails.

```rust
DescribeResourceGroupResponse
    description() // -> &ResourceGroupDescription
```

**METHODS:**

- `description()` (*&ResourceGroupDescription*) -

    The resource group description, including its node capacity and transfers.

    - `get_name()` (*&str*) -

        The name of the resource group.

    - `get_capacity()` (*i32*) -

        The number of query nodes the group can hold.

    - `get_available_nodes()` (*i32*) -

        The number of nodes currently available to the group.

    - `get_loaded_replicas()` (*&HashMap<String, i32>*) -

        The number of loaded replicas per collection.

    - `get_outgoing_nodes()` (*&HashMap<String, i32>*) -

        The number of nodes transferred out to each target group.

    - `get_incoming_nodes()` (*&HashMap<String, i32>*) -

        The number of nodes transferred in from each source group.

    - `get_config()` (*&ResourceGroupConfig*) -

        The resource group configuration.

        - `get_requested_nodes()` (*i32*) -

            The number of nodes requested for the group.

        - `get_node_limit()` (*i32*) -

            The maximum number of nodes the group can hold.

        - `get_transfer_from()` (*&[String]*) -

            The resource groups the group can receive nodes from.

        - `get_transfer_to()` (*&[String]*) -

            The resource groups the group can transfer nodes to.

        - `get_node_labels()` (*&HashMap<String, String>*) -

            The node label constraints of the group.

    - `get_nodes()` (*&[ResourceGroupNode]*) -

        The nodes in the resource group.

        - `get_id()` (*i64*) -

            The ID of the node.

        - `get_address()` (*&str*) -

            The address of the node.

        - `get_hostname()` (*&str*) -

            The hostname of the node.

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
