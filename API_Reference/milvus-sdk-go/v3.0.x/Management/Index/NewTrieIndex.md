# NewTrieIndex()

This function creates a Trie index configuration for string fields.

```go
func NewTrieIndex() Index
```

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
idx := index.NewTrieIndex()

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "string_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
