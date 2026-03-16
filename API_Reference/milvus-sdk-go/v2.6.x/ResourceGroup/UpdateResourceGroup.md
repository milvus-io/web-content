# UpdateResourceGroup()

This operation updates the configuration of an existing resource group.

```go
func (c *Client) UpdateResourceGroup(ctx context.Context, opt UpdateResourceGroupOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewUpdateResourceGroupOption(name, resourceGroupConfig)

err := client.UpdateResourceGroup(ctx, option)
```

**PARAMETERS:**

- **name** (*string*)

    The name of the resource group.

- **resourceGroupConfig** (**[entity.ResourceGroupConfig](ResourceGroupConfig.md)*)

    The resource group config.

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

	"github.com/milvus-io/milvus/client/v2/entity"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
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

err = cli.UpdateResourceGroup(ctx, milvusclient.NewUpdateResourceGroupOption("my_rg", &entity.ResourceGroupConfig{
	Requests: entity.ResourceGroupLimit{NodeNum: 10},
	Limits:   entity.ResourceGroupLimit{NodeNum: 10},
	NodeFilter: entity.ResourceGroupNodeFilter{
		NodeLabels: map[string]string{"my_label1": "a"},
	},
}))
if err != nil {
	// handle error
}
```
