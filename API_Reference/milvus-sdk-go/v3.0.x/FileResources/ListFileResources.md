# ListFileResources()

This operation lists all remote files registered with Milvus.

```go
func (c *Client) ListFileResources(ctx context.Context, option ListFileResourcesOption, callOptions ...grpc.CallOption) ([]*entity.FileResource, error)
```

## Request Syntax

```go
option := milvusclient.NewListFileResourcesOption()

resources, err := cli.ListFileResources(ctx, option)
```

**BUILDER METHODS:**

- `NewListFileResourcesOption()`

    Creates a new option for listing registered files.

**RETURN TYPE:**

*[]*entity.FileResource, error*

**RETURNS:**

A list of file resource records, each with `ID`, `Name`, and `Path` fields. Returns an error if the operation fails.

```go
type FileResource struct {
    ID   int64
    Name string
    Path string
}
```

**PARAMETERS:**

- **ID** (*int64*)

    The unique identifier of the file resource.

- **Name** (*string*)

    The name of the file resource.

- **Path** (*string*)

    The path of the file resource.

**ERROR HANDLING:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"

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

resources, err := cli.ListFileResources(ctx, milvusclient.NewListFileResourcesOption())
if err != nil {
	// handle error
}

for _, resource := range resources {
	fmt.Printf("ID: %d, Name: %s, Path: %s\n", resource.ID, resource.Name, resource.Path)
}
```
