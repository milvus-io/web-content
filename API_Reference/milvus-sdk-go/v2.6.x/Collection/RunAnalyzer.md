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

You can chain the following methods to append extra settings to the current `RunAnalyzerOption` struct.

- WithAnalyzerParamsStr

- [WithAnalyzerParams](RunAnalyzer.md#WithAnalyzerName)

- WithDetail

- WithHash

- [WithField](RunAnalyzer.md#WithField)

- WithAnalyzerName

### WithAnalyzerParamsStr

This method appends the parameter settings for the current `RunAnalyzerOption` struct. The signature is as follows:

```go
func (opt *runAnalyzerOption) WithAnalyzerParamsStr(params string) *runAnalyzerOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>params</code></p></td>
     <td><p>The analyzer parameter settings in plain-text.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

### WithAnalyzerParams

This method appends the parameter settings for the current `RunAnalyzerOption` struct.

```go
func (opt *runAnalyzerOption) WithAnalyzerParams(params map[string]any) *runAnalyzerOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>params</code></p></td>
     <td><p>The analyzer parameter settings.</p></td>
     <td><p><code>map[string]any</code></p></td>
   </tr>
</table>

### WithDetail

This method appends the parameter setting regarding whether to include hash-based processing.

```go
func (opt *runAnalyzerOption) WithDetail() *runAnalyzerOption
```

This method has no parameters. Using this parameter indicates that hash-based processing will be included.

### WithHash

This method appends the parameter setting regarding whether to return detailed analysis output.

```go
func (opt *runAnalyzerOption) WithHash() *runAnalyzerOption
```

This method has no parameters. Using this parameter indicates that detailed analysis output will be returned.

### WithField

This method specifies a scalar field for the current `RunAnalyzerOption` struct.

```go
func (opt *runAnalyzerOption) WithField(collectionName, fieldName string) *runAnalyzerOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>collectionName</code></p></td>
     <td><p>The name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>The name of the target field in the above-specified collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

### WithAnalyzerName

This method appends the parameter settings regarding the analyzer names.

```go
func (opt *runAnalyzerOption) WithAnalyzerName(names ...string) *runAnalyzerOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>names</code></p></td>
     <td><p>The analyzer names to append.</p></td>
     <td><p><code>...string</code></p></td>
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
package main

import (
    "context"
    "log"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()
    
    milvusAddr := "127.0.0.1:19530"
    collectionName := "test_run_analyzer"
    
    cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
        Address: milvusAddr,
    })
    if err != nil {
        log.Fatal("failed to connect to milvus server: ", err.Error())
    }
    defer cli.Close(ctx)
    
    schema := entity.NewSchema().
        WithField(entity.NewField().WithName("pk").WithIsPrimaryKey(true).WithIsAutoID(true).WithDataType(entity.FieldTypeInt64)).
        WithField(entity.NewField().WithName("text").WithDataType(entity.FieldTypeVarChar).WithMaxLength(255).WithEnableAnalyzer(true).WithAnalyzerParams(map[string]any{"tokenizer": "standard"})).
        WithField(entity.NewField().WithName("sparse").WithDataType(entity.FieldTypeSparseVector)).
        WithFunction(entity.NewFunction().WithInputFields("text").WithOutputFields("sparse").WithType(entity.FunctionTypeBM25).WithName("bm25")).
        WithAutoID(true)
    
    err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema))
    if err != nil {
        log.Fatal("failed to connect to create test collection: ", err.Error())
    }
    
    cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(collectionName, "sparse", index.NewAutoIndex(entity.BM25)).WithIndexName("bm25"))
    cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(collectionName))
    
    // Run analyzer with loaded collection field (Must be bm25 function input)
    result, err := cli.RunAnalyzer(ctx, milvusclient.NewRunAnalyzerOption("test milvus").WithField(collectionName, "text"))
    if err != nil {
        log.Fatal("failed to run analyzer with loaded collection field: ", err)
    }
    
    println("Run analyzer result with loaded collection field")
    for _, token := range result[0].Tokens {
        println(token.Text)
    }
    
    params := map[string]any{
        "tokenizer": "standard",
        "filter": []any{map[string]any{
            "type":       "stop",
            "stop_words": []string{"test"}, // remove word "test"
        }},
    }
    // Run analyzer with new analyzer params
    result, err = cli.RunAnalyzer(ctx, milvusclient.NewRunAnalyzerOption("test milvus").WithAnalyzerParams(params))
    if err != nil {
        log.Fatal("failed to run analyzer with new analyzer params: ", err)
    }
    
    println("Run analyzer with new analyzer params")
    for _, token := range result[0].Tokens {
        println(token.Text)
    }
}
```

