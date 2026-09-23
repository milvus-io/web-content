# RemoveFileResource()

This operation unregisters a remote file from Milvus. Use it to clean up file resources that are no longer referenced.

```go
func (c *Client) RemoveFileResource(ctx context.Context, option RemoveFileResourceOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewRemoveFileResourceOption(name)

err := cli.RemoveFileResource(ctx, option)
```

**PARAMETERS:**

- **name** (*string*)

    The name of the file resource to unregister.

**BUILDER METHODS:**

- `NewRemoveFileResourceOption(name string)`

    Creates a new option for unregistering a remote file.

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

err = cli.RemoveFileResource(ctx, milvusclient.NewRemoveFileResourceOption("embedding_model"))
if err != nil {
	// handle error
}
```
