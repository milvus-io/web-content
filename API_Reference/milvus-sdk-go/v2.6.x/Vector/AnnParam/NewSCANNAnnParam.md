# NewSCANNAnnParam()

This function creates an ANN search parameter set for SCANN index with configurable nprobe and reorder_k values.

```go
func NewSCANNAnnParam(nprobe int, reorderK int) scannAnnParam
```

**PARAMETERS:**

- **nprobe** (*int*)

    The number of clusters to search. Higher values improve recall but increase latency.

- **reorderK** (*int*)

    The number of candidates to reorder using the original vectors. Must be >= topK.

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
param := index.NewSCANNAnnParam(10, 10)

// Use with a search option
option := milvusclient.NewSearchOption("collection_name", limit, vectors).
    WithAnnParam(param)
```
