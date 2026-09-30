# NewFMIndex()

This function creates an FM-index scalar index: an exact byte-level substring index for VARCHAR that answers anchored LIKE (prefix / infix / suffix) with no candidate recheck.

```go
func NewFMIndex() *FMIndex
```

**RETURNS:**

*[Index](Index.md)*

An index configuration instance. Pass this to `CreateIndex()` via the index option. Both build params are optional; leave them unset to take the server defaults.

**BUILDER METHODS:**

- `WithIndexName(name string) *FMIndex`

    Sets the name of the index.

- `WithSaSampleRate(rate int) *FMIndex`

    Sets the suffix-array sampling rate, trading index size against locate latency (it does not affect count-only queries). Must be in [4, 256]; the server default is 8.

- `WithBlockBytes(blockBytes int) *FMIndex`

    Sets the rank-directory block granularity in bytes. Must be a power of two in [8, 128]; the server default is 64. Larger blocks shrink the resident directory at no throughput cost up to ~64.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create index configuration
idx := index.NewFMIndex()

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "text_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
