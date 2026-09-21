# TransferNode()

Transfers query nodes between resource groups.

```rust
pub async fn transfer_node(&self, request: TransferNodeRequest) -> Result<()>
```

## Request Syntax

```rust
let request = TransferNodeRequest::builder()
    .source_group("group_1")
    .target_group("group_2")
    .node_count(1)
    .build()?;
```

**REQUEST FIELDS:**

- `source_group: String`

    Name of the resource group the nodes are transferred from. Required.

- `target_group: String`

    Name of the resource group the nodes are transferred to. Required.

- `node_count: i32`

    Number of query nodes to transfer. Must be greater than zero.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = TransferNodeRequest::builder()
    .source_group("group_1")
    .target_group("group_2")
    .node_count(1)
    .build()?;
client.transfer_node(request).await?;
```
