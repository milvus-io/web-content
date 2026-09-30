# TransferReplica()

This operation transfers a number of replicas of a collection from one resource group to another.

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

    The name of the source resource group.

- **targetGroup** (*string*)

    The name of the target resource group.

- **replicaNum** (*int64*)

    The number of replicas to transfer.

**BUILDER METHODS:**

- `NewTransferReplicaOption(collectionName, sourceGroup, targetGroup string, replicaNum int64)`

    Creates a new option to transfer replicas between resource groups.

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

err = cli.TransferReplica(ctx, milvusclient.NewTransferReplicaOption("quick_setup", "rg1", "rg2", 1))
if err != nil {
	// handle error
}
```
