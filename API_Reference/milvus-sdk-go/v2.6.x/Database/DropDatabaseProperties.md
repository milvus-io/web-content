# DropDatabaseProperties()

This operation removes specified properties from a database.

```go
func (c *Client) DropDatabaseProperties(ctx context.Context, option DropDatabasePropertiesOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewDropDatabasePropertiesOption(dbName, propertyKeys)

err := client.DropDatabaseProperties(ctx, option)
```

**PARAMETERS:**

- **dbName** (*string*)

    The name of the database.

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

	"github.com/milvus-io/milvus/client/v2/milvusclient"
	"github.com/milvus-io/milvus/pkg/v2/common"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "localhost:19530",
})
if err != nil {
	// handle err
}
defer cli.Close(ctx)

err = cli.DropDatabaseProperties(ctx, milvusclient.NewDropDatabasePropertiesOption("my_database", common.DatabaseReplicaNumber))
if err != nil {
	// handle err
}
```
