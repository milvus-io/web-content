# HasCollection()

This operation checks whether a collection exists in the current database.

```go
func (c *Client) HasCollection(ctx context.Context, option HasCollectionOption, callOptions ...grpc.CallOption) (has bool, err error)
```

## Request Syntax

```go
option := milvusclient.NewHasCollectionOption(name)

result, err := client.HasCollection(ctx, option)
```

**PARAMETERS:**

- **name** (*string*)

    The name of the target collection.

**RETURN TYPE:**

*has bool, err error*

**RETURNS:**

A boolean indicating whether the resource exists. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"
	"log"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	log.Fatal("failed to connect to milvus server: ", err.Error())
}
defer cli.Close(ctx)

has, err := cli.HasCollection(ctx, milvusclient.NewHasCollectionOption("quick_setup"))
if err != nil {
	// handle error
}
fmt.Println(has)
```
