# Column

Interface for column-based data used in insert, upsert, and search or query result sets. Concrete implementations cover scalar, vector, array, JSON, and struct-array columns.

```go
type Column interface {
    Name() string
    Type() entity.FieldType
    Len() int
    Slice(int, int) Column
    FieldData() *schemapb.FieldData
    AppendValue(interface{}) error
    Get(int) (interface{}, error)
    GetAsInt64(int) (int64, error)
    GetAsString(int) (string, error)
    GetAsDouble(int) (float64, error)
    GetAsBool(int) (bool, error)
    AppendNull() error
    IsNull(int) (bool, error)
    Nullable() bool
    SetNullable(bool)
    ValidateNullable() error
    CompactNullableValues()
    ValidCount() int
}
```

**METHODS:**

- `Name() string`

    Returns the field name of the column.

- `Type() entity.FieldType`

    Returns the field type of the column.

- `Len() int`

    Returns the number of values in the column.

- `Slice(start, end int) Column`

    Returns a new column containing the values in the range `[start, end)`.

- `FieldData() *schemapb.FieldData`

    Converts the column into `schemapb.FieldData` for the RPC request.

- `AppendValue(value interface{}) error`

    Appends a value to the column.

- `Get(idx int) (interface{}, error)`

    Returns the value at the given index.

- `GetAsInt64(idx int) (int64, error)`

    Returns the value at the given index as an `int64`.

- `GetAsString(idx int) (string, error)`

    Returns the value at the given index as a `string`.

- `GetAsDouble(idx int) (float64, error)`

    Returns the value at the given index as a `float64`.

- `GetAsBool(idx int) (bool, error)`

    Returns the value at the given index as a `bool`.

- `AppendNull() error`

    Appends a null value to the column.

- `IsNull(idx int) (bool, error)`

    Reports whether the value at the given index is null.

- `Nullable() bool`

    Reports whether the column is nullable.

- `SetNullable(nullable bool)`

    Sets whether the column is nullable.

- `ValidateNullable() error`

    Validates the column's nullability data.

- `CompactNullableValues()`

    Compacts the column's nullable values.

- `ValidCount() int`

    Returns the number of valid, non-null values in the column.

## Example

Demonstrates accessing a result column.

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "127.0.0.1:19530",
})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

rs, err := cli.Query(ctx, milvusclient.NewQueryOption("quick_setup").
	WithFilter("emb_type == 3").
	WithOutputFields("id", "emb_type"))
if err != nil {
	// handle error
}

idColumn := rs.GetColumn("id")
fmt.Println(idColumn.Name(), idColumn.Len())
```
