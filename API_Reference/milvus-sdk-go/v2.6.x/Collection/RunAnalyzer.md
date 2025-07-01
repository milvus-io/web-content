# RunAnalyzer()

This operation processes the input data and generates tokenized output.

```go
func (c *Client) RunAnalyzer(ctx context.Context, option RunAnalyzerOption, callOptions ...grpc.CallOption) ([]*entity.AnalyzerResult, error)
```

## Request Parameters

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>ctx</code></p></td>
     <td><p>Context for the current call to work.</p></td>
     <td><p><code>context.Context</code></p></td>
   </tr>
   <tr>
     <td><p><code>option</code></p></td>
     <td><p>Optional parameters of the methods.</p></td>
     <td><p><code>RunAnalyzerOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## RunAnalyzerOption

This is an interface type. The `runAnalyzerOption` struct type implements this interface. You can use `NewRunAnalyzerOption()` to get its concrete implementation.

```go
func NewRunAnalyzerOption(text []string) *runAnalyzerOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>text</code></p></td>
     <td><p>The input text or a list of texts to be analyzed.</p></td>
     <td><p><code>[]string</code></p></td>
   </tr>
</table>

## entity.AnalyzerResult

The `entity.AnalzyerResult` struct type is as follows:

```go
type AnalyzerResult struct {
    Tokens []*Token
}
```

The struct type that appears above is as follows:

- [entity.Token](RunAnalyzer.md#entityToken)

## entity.Token

The `entity.Token` struct type is as follows:

```go
type Token struct {
    Text           string
    StartOffset    int64
    EndOffset      int64
    Position       int64
    PositionLength int64
    Hash           uint32
}
```

## Return

`*entity.AnalyzerResult`

## Example

```go

```
