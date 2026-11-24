# Vector

Interface for vectors used in search, implemented by the vector wrappers in the `entity` package such as `FloatVector`, `Float16Vector`, `BFloat16Vector`, `BinaryVector`, and `SparseEmbedding`.

```go
type Vector interface {
    Dim() int
    Serialize() []byte
    FieldType() entity.FieldType
}
```

**METHODS:**

- `Dim() int`

    Returns the vector dimension.

- `Serialize() []byte`

    Serializes the vector into a byte slice used in the search placeholder.

- `FieldType() entity.FieldType`

    Returns the field type of the vector.

## Example

Demonstrates passing vectors to `Search()`.

```go
import (
	"context"
	"log"

	"github.com/milvus-io/milvus/client/v2/entity"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	log.Fatal("failed to connect to milvus server: ", err.Error())
}
defer cli.Close(ctx)

queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
	"quick_setup",
	3,
	[]entity.Vector{entity.FloatVector(queryVector)},
))
if err != nil {
	log.Fatal("failed to perform basic ANN search: ", err.Error())
}
_ = resultSets
```
