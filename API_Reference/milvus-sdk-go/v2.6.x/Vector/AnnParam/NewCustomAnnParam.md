# NewCustomAnnParam()

This function creates a custom ANN search parameter set that allows you to configure arbitrary search parameters.

```go
func NewCustomAnnParam() CustomAnnParam
```

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
param := index.NewCustomAnnParam()

// Use with a search option
option := milvusclient.NewSearchOption("collection_name", limit, vectors).
    WithAnnParam(param)
```
