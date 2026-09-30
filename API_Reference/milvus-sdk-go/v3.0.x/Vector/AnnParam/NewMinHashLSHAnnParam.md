# NewMinHashLSHAnnParam()

This function creates an ANN search parameter set for MinHash LSH index.

```go
func NewMinHashLSHAnnParam() *minHashLSHAnnParam
```

**RETURNS:**

*[AnnParam](AnnParam.md)*

An ANN search parameter instance. Pass this to a search option via `WithAnnParam()`.

**BUILDER METHODS:**

- `WithSearchWithJACCARD(searchWithJACCARD bool)`

    Sets whether the search uses Jaccard similarity.

- `WithRefineK(refineK int)`

    Sets how many candidates the refine index re-ranks. Only useful on an index built with `WithRawData`.

- `WithBatchSearch(batchSearch bool)`

    Sets whether to use batch search.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create ANN search parameters
param := index.NewMinHashLSHAnnParam()

// Use with a search option
option := milvusclient.NewSearchOption("collection_name", limit, vectors).
    WithAnnParam(param)
```
