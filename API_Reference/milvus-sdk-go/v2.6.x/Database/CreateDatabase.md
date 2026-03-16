# CreateDatabase()

This operation creates a new database.

```go
func (c *Client) CreateDatabase(ctx context.Context, option CreateDatabaseOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewCreateDatabaseOption(dbName).
    WithProperty(key, val)

err := client.CreateDatabase(ctx, option)
```

**PARAMETERS:**

- **dbName** (*string*)

      The name of the database.

**OPTION METHODS:**

- `WithProperty(key string, val any)`

      Sets a custom property key-value pair on the resource.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil on success, or an error describing what went wrong.

**EXCEPTIONS:**

- **error**

      Check `err != nil` for failure details.

## Example

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

dbName := `test_db`
cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle err
}

err = cli.CreateDatabase(ctx, milvusclient.NewCreateDatabaseOption(dbName))
if err != nil {
	// handle err
}
```
