# Alias

Represents a collection alias with its associated database and collection name.

```go
type Alias struct {
    DbName string
    Alias string
    CollectionName string
}
```

**PARAMETERS:**

- **DbName** (*string*)

    The name of the associated database.

- **Alias** (*string*)

    The alias name.

- **CollectionName** (*string*)

    The name of the associated collection.

## Example

Demonstrates Alias usage.

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "127.0.0.1:19530",
})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

alias, err := cli.DescribeAlias(ctx, milvusclient.NewDescribeAliasOption("bob"))
if err != nil {
	// handle error
}
fmt.Println(alias.Alias, alias.CollectionName)
```