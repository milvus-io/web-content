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
