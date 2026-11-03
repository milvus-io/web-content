# ResultSet

Contains search or query results including matched entity IDs, scores, and field values.

```go
type ResultSet struct {
    ResultCount int
    GroupByValue column.Column
    IDs column.Column
    Fields DataSet
    Scores []float32
    Recall float32
    Err error
}
```

**PARAMETERS:**

- **ResultCount** (*int*)

    the returning entry count

- **GroupByValue** (*column.Column*)

    The group-by column used for grouped results.

- **IDs** (*column.Column*)

    auto generated id, can be mapped to the columns from `Insert` API

- **Fields** (*DataSet*)

    output field data

- **Scores** (*[]float32*)

    distance to the target vector

- **Recall** (*float32*)

    recall of the query vector's search result (estimated by zilliz cloud)

- **Err** (*error*)

    search error if any

**METHODS:**

- `GetColumn(fieldName string) column.Column`

    GetColumn returns column with provided field name.

- `Len() int`

    Returns the number of results.

- `Slice(start, end int) ResultSet`

    Returns a subset of the results within the specified range.

## Example

Demonstrates ResultSet usage.

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

rs, err := cli.Query(ctx, milvusclient.NewQueryOption("quick_setup").
	WithFilter("emb_type == 3").
	WithOutputFields("id", "emb_type"))
if err != nil {
	// handle error
}

fmt.Println(rs.Len(), rs.GetColumn("id"))
```