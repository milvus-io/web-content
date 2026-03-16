# RunAnalyzer()

This operation runs a text analyzer on input text and returns the tokenized output.

```go
func (c *Client) RunAnalyzer(ctx context.Context, option RunAnalyzerOption, callOptions ...grpc.CallOption) ([]*entity.AnalyzerResult, error)
```

## Request Syntax

```go
option := milvusclient.NewRunAnalyzerOption(text).
    WithAnalyzerParamsStr(params).
    WithAnalyzerParams(params).
    WithDetail().
    WithHash().
    WithField(collectionName, fieldName).
    WithAnalyzerName(names)

result, err := client.RunAnalyzer(ctx, option)
```

**PARAMETERS:**

- **text** (*...string*)

      The text.

**OPTION METHODS:**

- `WithAnalyzerParamsStr(params string)`

      Sets the analyzer params str for the operation.

- `WithAnalyzerParams(params map[string]any)`

      Sets the analyzer params for the operation.

- `WithDetail()`

      Sets the detail for the operation.

- `WithHash()`

      Sets the hash for the operation.

- `WithField(collectionName, fieldName string)`

      Sets the field for the operation.

- `WithAnalyzerName(names ...string)`

      Sets the analyzer name for the operation.

**RETURN TYPE:**

*[]*entity.AnalyzerResult, error*

**RETURNS:**

The analyzer output showing how the input text is tokenized. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

      Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"log"

	"github.com/milvus-io/milvus/client/v2/entity"
	"github.com/milvus-io/milvus/client/v2/index"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

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
```
