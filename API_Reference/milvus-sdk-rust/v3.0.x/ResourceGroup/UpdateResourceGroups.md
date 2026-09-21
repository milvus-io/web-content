# UpdateResourceGroups()

Updates the properties or node allocation of resource groups.

```rust
pub async fn update_resource_groups(&self, request: UpdateResourceGroupsRequest) -> Result<()>
```

## Request Syntax

```rust
let request = UpdateResourceGroupsRequest::builder()
    .groups(HashMap::from([(
        "group_1".to_string(),
        ResourceGroupConfig::new().requested_nodes(3),
    )]))
    .build()?;
```

**REQUEST FIELDS:**

- `groups: HashMap<String, ResourceGroupConfig>`

    Mapping of resource-group name to its new configuration. At least one resource group is required, and resource group names must not be empty.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = UpdateResourceGroupsRequest::builder()
    .groups(HashMap::from([(
        "group_1".to_string(),
        ResourceGroupConfig::new().requested_nodes(3),
    )]))
    .build()?;
client.update_resource_groups(request).await?;
```
