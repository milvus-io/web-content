# ListDatabase()

This operation lists all databases in the Milvus instance.

```go
func (c *Client) ListDatabase(ctx context.Context, option ListDatabaseOption, callOptions ...grpc.CallOption) (databaseNames []string, err error)
```

**RETURN TYPE:**

*databaseNames []string, err error*

**RETURNS:**

A list of names. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

      Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"

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

dbs, err := cli.ListDatabase(ctx, milvusclient.NewListDatabaseOption())
if err != nil {
	// handle err
}
fmt.Println(dbs)
```
