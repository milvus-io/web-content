# DropDatabase()

This operation drops a database and all its collections permanently.

```go
func (c *Client) DropDatabase(ctx context.Context, option DropDatabaseOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewDropDatabaseOption(dbName)

err := client.DropDatabase(ctx, option)
```

**PARAMETERS:**

- **dbName** (*string*)

    The name of the database.

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

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "localhost:19530",
})
if err != nil {
	// handle err
}
defer cli.Close(ctx)

err = cli.DropDatabase(ctx, milvusclient.NewDropDatabaseOption("test_db"))
if err != nil {
	// handle err
}
```
