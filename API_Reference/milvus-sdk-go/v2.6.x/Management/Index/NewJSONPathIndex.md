# NewJSONPathIndex()

This function creates a JSON path index configuration for efficient filtering on specific JSON field paths.

```go
func NewJSONPathIndex(indexType IndexType, jsonCastType string, jsonPath string) *JSONPathIndex
```

**PARAMETERS:**

- **indexType** (*[IndexType](../IndexType.md)*)

      The index algorithm type to use.

- **jsonCastType** (*string*)

      The data type to cast the JSON path value to (e.g., "string", "double").

- **jsonPath** (*string*)

      The JSON path expression to index (e.g., "$.field_name").

**RETURNS:**

*Index*

An index configuration instance. Pass this to `CreateIndex()` via the index option.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v2/index"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

// Create index configuration
idx := index.NewJSONPathIndex(index.HNSW, "double", "$.price")

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
