# DescribeCollection()

This operation returns detailed information about a collection, including its schema and properties.

```go
func (c *Client) DescribeCollection(ctx context.Context, option DescribeCollectionOption, callOptions ...grpc.CallOption) (collection *entity.Collection, err error)
```

## Request Syntax

```go
option := milvusclient.NewDescribeCollectionOption(name)

result, err := client.DescribeCollection(ctx, option)
```

**PARAMETERS:**

- **name** (*string*)

    The name of the target collection.

**RETURN TYPE:**

*collection* entity.Collection, err error*

**RETURNS:**

The collection description including schema, fields, and properties. Returns an error if the operation fails.

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

collection, err := cli.DescribeCollection(ctx, milvusclient.NewDescribeCollectionOption("quick_setup"))
if err != nil {
	// handle error
}

fmt.Println(collection)
```
