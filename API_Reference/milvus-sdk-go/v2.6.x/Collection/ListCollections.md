# ListCollections()

This operation lists all collections in the current database.

```go
func (c *Client) ListCollections(ctx context.Context, option ListCollectionOption, callOptions ...grpc.CallOption) (collectionNames []string, err error)
```

## Request Syntax

```go
option := milvusclient.NewListCollectionOption()

result, err := client.ListCollections(ctx, option)
```

**RETURN TYPE:**

*collectionNames []string, err error*

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

collectionNames, err := cli.ListCollections(ctx, milvusclient.NewListCollectionOption())
if err != nil {
	// handle error
}

fmt.Println(collectionNames)
```
