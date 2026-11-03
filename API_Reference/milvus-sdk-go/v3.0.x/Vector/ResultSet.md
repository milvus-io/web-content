# ResultSet

A search or query result set returned by `Search()`, `HybridSearch()`, `Query()`, and `Get()`. It holds the returned entry count, primary keys, output fields, and scores.

```go
type ResultSet struct {
    ResultCount  int
    GroupByValue column.Column
    IDs          column.Column
    Fields       DataSet
    AggregationBuckets []AggregationBucket
    Scores       []float32
    Recall       float32
    Err          error
}
```

**PARAMETERS:**

- **ResultCount** (*int*) -
The number of returned entries.

- **GroupByValue** (*column.Column*) -
The group-by column value when the search/query used grouping.

- **IDs** (*column.Column*) -
The primary-key column of the matched entities.

- **Fields** (*DataSet*) -
The output field columns.

- **AggregationBuckets** (*[]AggregationBucket*) -
Search aggregation results for this query, when an aggregation was requested.

- **Scores** (*[]float32*) -
The distance to the target vector for each match.

- **Recall** (*float32*) -
The estimated recall of the search result (estimated by Zilliz Cloud).

- **Err** (*error*) -
The search error, if any.

**METHODS:**

- `GetColumn(fieldName string) column.Column`

    Returns the column with the provided field name.

- `Len() int`

    Returns the number of returned entries.

- `Slice(start, end int) ResultSet`

    Returns a sub-set of the result between the given start and end indexes.

- `Unmarshal(receiver any) error`

    Unmarshals the data set into a slice of pointers to model structs in a row-based way. Note that distance/score is not unmarshaled here.

## Example

Demonstrates ResultSet usage.

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
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
