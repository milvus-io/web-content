# UseDatabase()

Selects the database used by subsequent operations on this client and its clones.

```rust
pub async fn use_database(&self, database: impl Into<String>) -> Result<()>
```

When switching to an explicitly named database, the target is first verified to exist via `describe_database`, and the switch fails with the server error when it does not. Passing an empty name resets the selection to the always-present `default` database without an extra RPC.

## Request Syntax

```rust
client.use_database("my_database").await?;
```

**PARAMETERS:**

- `database: impl Into<String>`

    Name of the database to select. An empty value resets the selection to the `default` database.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## See also

- `pub fn current_database(&self) -> String`

    Returns the database currently selected by this client.

## Example

```rust
client.use_database("my_database").await?;
assert_eq!(client.current_database(), "my_database");
```
