# ListPartitions()

This operation lists all partitions in a collection.

```go
func (c *Client) ListPartitions(ctx context.Context, opt ListPartitionsOption, callOptions ...grpc.CallOption) (partitionNames []string, err error)
```

## Request Syntax

```go
option := milvusclient.NewListPartitionOption(collectionName)

result, err := client.ListPartitions(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

  The name of the target collection.

**RETURN TYPE:**

*partitionNames []string, err error*

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

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle error
}

defer cli.Close(ctx)

partitionNames, err := cli.ListPartitions(ctx, milvusclient.NewListPartitionOption("quick_setup"))
if err != nil {
	// handle error
}

fmt.Println(partitionNames)
```
