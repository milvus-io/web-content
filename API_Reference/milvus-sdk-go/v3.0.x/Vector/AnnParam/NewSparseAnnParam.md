# NewSparseAnnParam()

This function creates an ANN search parameter set for sparse vector indexes.

```go
func NewSparseAnnParam() sparseAnnParam
```

**RETURNS:**

*[AnnParam](AnnParam.md)*

An ANN search parameter instance. Pass this to a search option via `WithAnnParam()`.

**BUILDER METHODS:**

- `WithDropRatio(dropRatio float64)`

    Sets the proportion of low-score entries dropped during the search.

- `WithSearchAlgo(algo string)`

    Sets the sparse search algorithm.

- `WithRefineFactor(refineFactor int)`

    Sets how many more candidates are refined than requested.

- `WithDimMaxScoreRatio(ratio float64)`

    Sets the dimension max-score ratio used to filter candidate entries.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create ANN search parameters
param := index.NewSparseAnnParam()

// Use with a search option
option := milvusclient.NewSearchOption("collection_name", limit, vectors).
    WithAnnParam(param)
```
