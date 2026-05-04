# DropCollectionProperties()

This operation removes specified properties from a collection.

```go
func (c *Client) DropCollectionProperties(ctx context.Context, option DropCollectionPropertiesOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewDropCollectionPropertiesOption(collection, propertyKeys)

err := client.DropCollectionProperties(ctx, option)
```

**PARAMETERS:**

- **[collection](https://zilliverse.feishu.cn/docx/PNwFdxMMdo6rtIxERDHcVFgdnxc)** (*string*)

    The collection.

- **propertyKeys** (*...string*)

    The property keys.

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
	"log"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
	"github.com/milvus-io/milvus/pkg/v2/common"
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

err = cli.DropCollectionProperties(ctx, milvusclient.NewDropCollectionPropertiesOption("my_collection", common.CollectionTTLConfigKey))
if err != nil {
	// handle error
}
```
