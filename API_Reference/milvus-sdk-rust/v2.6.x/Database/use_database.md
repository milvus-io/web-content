# UseDatabase()

Selects the database used by subsequent operations on this client and its clones.

```rust
pub fn use_database(&self, database: impl Into<String>) -> Result<()>
```

The call changes client-side routing metadata only; it does not create the database or verify that it exists. Passing an empty name resets the selection to the always-present `default` database.

## Request Syntax

```rust
client.use_database("my_database")?;
```

**PARAMETERS:**

- `database: impl Into<String>`

    Name of the database to select. An empty value resets the selection to the `default` database.

**RETURN TYPE:**

*Result\<()\>*

**RETURNS:**

Returns `Ok(())` on success; returns an `Error` on failure.

## See also

- `pub fn current_database(&self) -> String`

    Returns the database currently selected by this client.

## Example

```rust
client.use_database("my_database")?;
assert_eq!(client.current_database(), "my_database");
```
