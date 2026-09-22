# AlterDatabaseProperties()

This operation modifies the properties of an existing database.

```go
func (c *Client) AlterDatabaseProperties(ctx context.Context, option AlterDatabasePropertiesOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewAlterDatabasePropertiesOption(dbName).
    WithProperty(key, value)

err := client.AlterDatabaseProperties(ctx, option)
```

**PARAMETERS:**

- **option** (*AlterDatabasePropertiesOption*)

    The options for altering the database properties. Use `NewAlterDatabasePropertiesOption` to construct.

**BUILDER METHODS:**

- `NewAlterDatabasePropertiesOption(dbName string)`

    Creates options to alter database properties. `dbName` specifies the database whose properties are altered.

- `WithProperty(key string, value any)`

    Sets a database property key-value pair after converting the value to its string representation.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil after the database properties are altered. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Request construction or the RPC fails. Check `err != nil` for failure details.

## Example

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{Address: "127.0.0.1:19530"})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

err = cli.AlterDatabaseProperties(ctx, milvusclient.NewAlterDatabasePropertiesOption("test_db").
	WithProperty("database.replica.number", "2"))
if err != nil {
	// handle error
}
```
