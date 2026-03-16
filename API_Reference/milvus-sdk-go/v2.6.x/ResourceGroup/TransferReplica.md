# TransferReplica()

This operation transfers replicas from one resource group to another.

```go
func (c *Client) TransferReplica(ctx context.Context, opt TransferReplicaOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewTransferReplicaOption(collectionName, sourceGroup, targetGroup, replicaNum).
    WithDBName(dbName)

err := client.TransferReplica(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

      The name of the target collection.

- **sourceGroup** (*string*)

      The source group.

- **targetGroup** (*string*)

      The target group.

- **replicaNum** (*int64*)

      The replica num value.

**OPTION METHODS:**

- `WithDBName(dbName string)`

      Specifies the database to use for the operation.

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

err = cli.TransferReplica(ctx, milvusclient.NewTransferReplicaOption("quick_setup", "rg_1", "rg_2", 1))
if err != nil {
	// handle error
}
```
