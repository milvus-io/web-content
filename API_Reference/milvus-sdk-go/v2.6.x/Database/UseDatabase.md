# UseDatabase()

This operation switches the active database for the current client connection.

```go
func (c *Client) UseDatabase(ctx context.Context, option UseDatabaseOption) error
```

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

err = cli.UseDatabase(ctx, milvusclient.NewUseDatabaseOption("my_database"))
if err != nil {
	// handle err
}
```
