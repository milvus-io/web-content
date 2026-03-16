# NewDiskAnnParam()

This function creates an ANN search parameter set for DiskANN index with a configurable search list size.

```go
func NewDiskAnnParam(searchList int) diskANNParam
```

**PARAMETERS:**

- **searchList** (*int*)

      The size of the search list for DiskANN. Higher values improve recall at the cost of latency.

**RETURNS:**

*AnnParam*

An ANN search parameter instance. Pass this to a search option via `WithAnnParam()`.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v2/index"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

// Create ANN search parameters
param := index.NewDiskAnnParam(10)

// Use with a search option
option := milvusclient.NewSearchOption("collection_name", limit, vectors).
    WithAnnParam(param)
```
