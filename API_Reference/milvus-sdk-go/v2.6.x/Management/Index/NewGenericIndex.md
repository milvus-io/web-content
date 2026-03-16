# NewGenericIndex()

This function creates a generic index configuration with custom parameters for advanced use cases.

```go
func NewGenericIndex(name string, params map[string]string) GenericIndex
```

**PARAMETERS:**

- **name** (*string*)

      The name of the index.

- **params** (*map[string]string*)

      A map of custom index parameter key-value pairs.

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
idx := index.NewGenericIndex("my_index", map[string]string{"key": "value"})

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
