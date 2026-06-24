# HasPartition()

This operation checks whether a partition exists in a collection.

```go
func (c *Client) HasPartition(ctx context.Context, opt HasPartitionOption, callOptions ...grpc.CallOption) (has bool, err error)
```

## Request Syntax

```go
option := milvusclient.NewHasPartitionOption(collectionName, partitionName)

result, err := client.HasPartition(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

The name of the target collection.

- **partitionName** (*string*)

The name of the partition to check.

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
result, err := cli.HasPartition(ctx, milvusclient.NewHasPartitionOption("quick_setup", "partitionA"))
if err != nil {
	// handle error
}

fmt.Println(result)
```
