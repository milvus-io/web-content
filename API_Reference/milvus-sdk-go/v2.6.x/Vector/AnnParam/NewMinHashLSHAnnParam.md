# NewMinHashLSHAnnParam()

This function creates an ANN search parameter set for MinHash LSH index.

```go
func NewMinHashLSHAnnParam() *minHashLSHAnnParam
```

**RETURNS:**

*[AnnParam](AnnParam.md)*

An ANN search parameter instance. Pass this to a search option via `WithAnnParam()`.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v2/index"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

// Create ANN search parameters
param := index.NewMinHashLSHAnnParam()

// Use with a search option
option := milvusclient.NewSearchOption("collection_name", limit, vectors).
    WithAnnParam(param)
```
