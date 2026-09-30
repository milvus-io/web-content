# CreateDatabase()

This operation creates a new database with the specified name and optional properties.

```go
func (c *Client) CreateDatabase(ctx context.Context, option CreateDatabaseOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewCreateDatabaseOption(dbName).
    WithProperty(key, value)

err := client.CreateDatabase(ctx, option)
```

**PARAMETERS:**

- **option** (*CreateDatabaseOption*)

    The options for creating the database. Use `NewCreateDatabaseOption` to construct.

**BUILDER METHODS:**

- `NewCreateDatabaseOption(dbName string)`

    Creates options to create a database. `dbName` specifies the name of the database to create.

- `WithProperty(key string, value any)`

    Sets a database property key-value pair after converting the value to its string representation.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil after the database is created. Returns an error if the operation fails.

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

err = cli.CreateDatabase(ctx, milvusclient.NewCreateDatabaseOption("test_db").
	WithProperty("database.replica.number", "3"))
if err != nil {
	// handle error
}
```
