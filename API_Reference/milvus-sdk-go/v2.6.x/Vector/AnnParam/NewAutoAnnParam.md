# NewAutoAnnParam()

This function creates an ANN search parameter set for AUTOINDEX with a configurable search precision level.

```go
func NewAutoAnnParam(level int) autoAnnParam
```

**PARAMETERS:**

- **level** (*int*)

    The search precision level (1-5). Higher values increase recall at the cost of latency.

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
param := index.NewAutoAnnParam(10)

// Use with a search option
option := milvusclient.NewSearchOption("collection_name", limit, vectors).
    WithAnnParam(param)
```
