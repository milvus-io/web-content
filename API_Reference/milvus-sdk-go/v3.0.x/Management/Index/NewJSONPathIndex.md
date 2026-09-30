# NewJSONPathIndex()

This function creates a JSON path scalar index for a field nested inside a JSON document.

```go
func NewJSONPathIndex(indexType IndexType, jsonCastType string, jsonPath string) *JSONPathIndex
```

**PARAMETERS:**

- **indexType** (*[IndexType](../IndexType.md)*)

    The scalar index type to apply to the JSON path, e.g., `Inverted` or `Sorted`.

- **jsonCastType** (*string*)

    The type used to interpret the value at the JSON path, e.g., `int64`, `float`, `varchar`.

- **jsonPath** (*string*)

    The path to the target field within the JSON document.

**RETURNS:**

*[Index](Index.md)*

An index configuration instance. Pass this to `CreateIndex()` via the index option.

**BUILDER METHODS:**

- `WithIndexName(name string) *JSONPathIndex`

    Sets the name of the index.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create index configuration for a JSON path
idx := index.NewJSONPathIndex(index.Inverted, "varchar", "metadata.category").WithIndexName("category_idx")

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "metadata", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
