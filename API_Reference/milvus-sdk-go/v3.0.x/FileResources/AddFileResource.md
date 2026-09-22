# AddFileResource()

This operation registers a remote file with Milvus, making it available to server-side features by a named reference.

```go
func (c *Client) AddFileResource(ctx context.Context, option AddFileResourceOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewAddFileResourceOption(name, path)

err := cli.AddFileResource(ctx, option)
```

**PARAMETERS:**

- **name** (*string*)

    The name to reference the file resource by.

- **path** (*string*)

    The path of the remote file.

**BUILDER METHODS:**

- `NewAddFileResourceOption(name, path string)`

    Creates a new option for registering a remote file.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil on success, or an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

err = cli.AddFileResource(ctx, milvusclient.NewAddFileResourceOption("embedding_model", "/models/embedding.bin"))
if err != nil {
	// handle error
}
```
