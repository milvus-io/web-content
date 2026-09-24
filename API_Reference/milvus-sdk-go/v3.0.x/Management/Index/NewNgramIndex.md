# NewNgramIndex()

This function creates an NGRAM index for VARCHAR fields and JSON paths. By indexing every n-gram in [minGram, maxGram] it accelerates the substring operators — LIKE prefix / infix / suffix and regex match.

```go
func NewNgramIndex(minGram, maxGram int) Index
```

**PARAMETERS:**

- **minGram** (*int*)

    The minimum n-gram length. Required; the server rejects an NGRAM index that omits it.

- **maxGram** (*int*)

    The maximum n-gram length. Required; the server rejects an NGRAM index that omits it.

**RETURNS:**

*[Index](Index.md)*

An index configuration instance. Pass this to `CreateIndex()` via the index option.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create index configuration
idx := index.NewNgramIndex(2, 4)

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "text_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
