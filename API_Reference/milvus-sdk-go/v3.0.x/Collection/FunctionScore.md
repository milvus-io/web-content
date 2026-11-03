# FunctionScore

Models the search-time FunctionScore message: a set of scoring Functions (e.g. boost rankers) plus score-option params such as `boost_mode` and `function_mode`. Pass it to a search option via `WithFunctionScore()`.

```go
type FunctionScore struct {
    Functions []*Function
    Params    map[string]string
}
```

**CONSTRUCTORS:**

- `NewFunctionScore()`

    Creates an empty FunctionScore.

**BUILDER METHODS:**

- `AddFunction(f *[Function](Function.md)) *FunctionScore`

    Appends a scoring function to the score.

- `WithParam(key string, value any) *FunctionScore`

    Sets a score-option parameter key-value pair, converting the value to its string representation.

**METHODS:**

- `Clone() *FunctionScore`

    Returns a deep copy of the score: functions and params are copied so the returned score does not share mutable state with the source.

- `ProtoMessage() *schemapb.FunctionScore`

    Returns the corresponding protobuf FunctionScore message.

- `ReadProto(p *schemapb.FunctionScore) *FunctionScore`

    Parses a protobuf FunctionScore into the struct.

## Example

Demonstrates FunctionScore usage.

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

score := entity.NewFunctionScore().
	AddFunction(entity.NewFunction().
		WithName("title_boost").
		WithType(entity.FunctionTypeRerank).
		WithParam("reranker", "boost").
		WithParam("weight", "2.0")).
	WithParam("boost_mode", "sum")

_, err = cli.Search(ctx, milvusclient.NewSearchOption("quick_setup", 5, []entity.Vector{entity.Text("hello")}).
	WithFunctionScore(score))
if err != nil {
	// handle error
}
```
