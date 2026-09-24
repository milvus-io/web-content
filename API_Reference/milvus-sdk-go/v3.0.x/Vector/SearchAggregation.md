# SearchAggregation

Describes one level of bucket aggregation for `Search()`. Use `NewSearchAggregation()` to create an aggregation spec and pass it to a search option via `WithSearchAggregation()`.

```go
type SearchAggregation struct {
    fields         []string
    size           int64
    searchSize     int64
    metrics        map[string]aggregationMetric
    order          []aggregationOrder
    topHits        *TopHits
    subAggregation *SearchAggregation
}
```

**CONSTRUCTORS:**

- `NewSearchAggregation(fields []string, size int)`

    Creates one search aggregation level. `fields` are the fields to bucket by and `size` is the number of buckets to return.

**BUILDER METHODS:**

- `WithSearchSize(searchSize int)`

    Sets the candidate bucket budget for this aggregation level.

- `WithMetric(alias, op, fieldName string)`

    Adds an aggregation metric. `op` is one of `avg`, `sum`, `count`, `min`, or `max`.

- `WithOrder(key, direction string)`

    Appends a bucket ordering criterion. `key` must be a metric alias or one of `_count` / `_key`; `direction` is `asc` or `desc`.

- `WithTopHits(topHits *TopHits)`

    Sets the top hits spec for this aggregation level.

- `WithSubAggregation(sub *SearchAggregation)`

    Sets the nested child aggregation level.

**METHODS:**

- `Validate() error`

    Validates the aggregation spec, returning an error for invalid fields, sizes, metric ops, or order keys.

## TopHits

Describes representative hits returned inside each aggregation bucket.

```go
type TopHits struct {
    size int64
    sort []aggregationSort
}
```

**CONSTRUCTORS:**

- `NewTopHits(size int)`

    Creates a top hits spec.

**BUILDER METHODS:**

- `WithSort(fieldName, direction string)`

    Appends a top hits sorting criterion. `direction` is `asc` or `desc`.

**METHODS:**

- `Validate() error`

    Validates the top hits spec.

## Example

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v3/entity"
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

agg := milvusclient.NewSearchAggregation([]string{"category"}, 10).
	WithMetric("avg_score", "avg", "score").
	WithOrder("_count", "desc")

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
	"quick_setup",
	100,
	[]entity.Vector{entity.FloatVector{0.1, 0.2, 0.3}},
).WithSearchAggregation(agg))
if err != nil {
	// handle error
}
_ = resultSets
```
