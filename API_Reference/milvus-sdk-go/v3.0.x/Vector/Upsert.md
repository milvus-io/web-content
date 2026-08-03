# Upsert()

Upserts rows or columns with struct-array and field-level array operations, and records client telemetry for the operation.

```go
func (c *Client) Upsert(ctx context.Context, option UpsertOption, callOptions ...grpc.CallOption) (UpsertResult, error)
```

**PARAMETERS:**

- **collName** (*string*) -

    **[REQUIRED]**

    The name of the target collection.

- **rows** (*...any*) -

    **[REQUIRED]**

    One or more row values to insert or update.

**BUILDER METHODS:**

- `WithColumns(columns ...column.Column)`

    This appends the supplied columns to the write request.

- `WithBoolColumn(colName string, data []bool)`

    This appends a Boolean scalar column with the specified name and values.

- `WithInt8Column(colName string, data []int8)`

    This appends an Int8 scalar column with the specified name and values.

- `WithInt16Column(colName string, data []int16)`

    This appends an Int16 scalar column with the specified name and values.

- `WithInt32Column(colName string, data []int32)`

    This appends an Int32 scalar column with the specified name and values.

- `WithInt64Column(colName string, data []int64)`

    This appends an Int64 scalar column with the specified name and values.

- `WithVarcharColumn(colName string, data []string)`

    This appends a VarChar scalar column with the specified name and values.

- `WithFloatVectorColumn(colName string, dim int, data [][]float32)`

    This appends a float-vector column with the specified name, dimension, and values.

- `WithFloat16VectorColumn(colName string, dim int, data [][]float32)`

    This converts the supplied float32 vectors to Float16 values and appends the resulting vector column.

- `WithBFloat16VectorColumn(colName string, dim int, data [][]float32)`

    This converts the supplied float32 vectors to BFloat16 values and appends the resulting vector column.

- `WithBinaryVectorColumn(colName string, dim int, data [][]byte)`

    This appends a binary-vector column with the specified name, dimension, and values.

- `WithInt8VectorColumn(colName string, dim int, data [][]int8)`

    This appends an Int8-vector column with the specified name, dimension, and values.

- `WithStructArrayColumn(colName string, structSchema *entity.StructSchema, rows []map[string]any)`

    This appends a struct-array column built from row-based sub-field values. Each row is a map keyed by sub-field name, and each value must match the scalar or vector type declared in structSchema.

- `WithPartition(partitionName string)`

    This sets the target partition for the write request.

- `WithNamespace(namespace string)`

    WithNamespace scopes the write to a collection namespace. Primary keys are still collection-scoped for delete/upsert tombstones, so callers must keep primary keys unique across namespaces in the same collection.

- `WithPartialUpdate(partialUpdate bool)`

    This enables or disables partial-update behavior for the write request.

- `WithArrayAppend(fieldName string)`

    WithArrayAppend declares that the Array field `fieldName` should be merged with ARRAY_APPEND semantics during an Upsert. The server implicitly enables partial_update when any non-REPLACE op is present, so callers do not need to also invoke WithPartialUpdate(true).

- `WithArrayRemove(fieldName string)`

    WithArrayRemove declares that the Array field `fieldName` should be merged with ARRAY_REMOVE semantics during an Upsert. See WithArrayAppend for the implicit partial_update promotion.

- `WithFieldPartialOp(fieldName string, op schemapb.FieldPartialUpdateOp_OpType)`

    WithFieldPartialOp attaches an explicit FieldPartialUpdateOp to the field with name `fieldName`. Intended for advanced callers; typical users should prefer the op-specific helpers (WithArrayAppend, WithArrayRemove).

- `WithKeepAutoIDPk(keepPk bool)`

    This controls whether row-based writes retain supplied primary-key values when automatic ID generation is enabled.

**RETURN TYPE:**

*UpsertResult, error*

**RETURNS:**

Returns the affected row count and primary keys, plus an error when request construction or the RPC fails.

**ERROR HANDLING:**

- **error**

    Validation, request construction, or the RPC fails. Check the returned error for failure details.

## Example

Demonstrates Upsert() usage.

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{Address: "127.0.0.1:19530"})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

result, err := cli.Upsert(ctx, milvusclient.NewColumnBasedInsertOption("books").
	WithInt64Column("id", []int64{1}).
	WithVarcharColumn("tags", []string{"featured"}).
	WithArrayAppend("tags"))
if err != nil {
	// handle error
}
_ = result
```
