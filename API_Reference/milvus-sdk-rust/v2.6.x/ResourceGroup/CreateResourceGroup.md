# CreateResourceGroup()

Creates a resource group used to isolate query-node resources.

```rust
pub async fn create_resource_group(&self, request: CreateResourceGroupRequest) -> Result<()>
```

## Request Syntax

```rust
let request = CreateResourceGroupRequest::builder()
    .name("group_1")
    .config(ResourceGroupConfig::new().requested_nodes(2))
    .build()?;
```

**REQUEST FIELDS:**

- `name: String`

    Name of the resource group to create. Required.

- `config: ResourceGroupConfig`

    Initial configuration of the resource group, including requested nodes and node limits. Optional.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = CreateResourceGroupRequest::builder()
    .name("group_1")
    .config(ResourceGroupConfig::new().requested_nodes(2))
    .build()?;
client.create_resource_group(request).await?;
```
