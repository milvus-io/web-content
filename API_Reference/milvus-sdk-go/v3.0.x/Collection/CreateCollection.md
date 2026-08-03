# CreateCollection()

Creates a collection after automatically validating options that expose a `Validate()` method, including struct-array schemas.

```go
func (c *Client) CreateCollection(ctx context.Context, option CreateCollectionOption, callOptions ...grpc.CallOption) error
```

**PARAMETERS:**

- **name** (*string*) -

    **[REQUIRED]**

    The name of the collection to create.

- **collectionSchema** (**entity.Schema*) -

    **[REQUIRED]**

    The schema that defines the collection fields and configuration.

**BUILDER METHODS:**

- `WithAutoID(autoID bool)`

    This sets whether Milvus automatically generates primary keys.

- `WithShardNum(shardNum int32)`

    This sets the number of shards for the collection.

- `WithDynamicSchema(dynamicSchema bool)`

    This enables or disables the dynamic field.

- `WithVarcharPK(varcharPK bool, maxLen int)`

    This uses a VarChar primary key with the specified maximum length.

- `WithIndexOptions(indexOpts ...CreateIndexOption)`

    This sets the index creation options used during collection creation.

- `WithProperty(key string, value any)`

    This sets a collection property after converting the value to its string representation.

- `WithConsistencyLevel(cl entity.ConsistencyLevel)`

    This sets the collection consistency level.

- `WithMetricType(metricType entity.MetricType)`

    This sets the metric type for the default vector index.

- `WithPKFieldName(name string)`

    This sets the primary-key field name.

- `WithVectorFieldName(name string)`

    This sets the vector field name.

- `WithNumPartitions(numPartitions int64)`

    This sets the number of partitions used with a partition key.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil after the collection is created. Returns an error when schema validation or the RPC fails.

**ERROR HANDLING:**

- **error**

    Validation, request construction, or the RPC fails. Check the returned error for failure details.

## Example

Demonstrates CreateCollection() usage.

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{Address: "127.0.0.1:19530"})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

structSchema := entity.NewStructSchema().
	WithField(entity.NewField().WithName("text").WithDataType(entity.FieldTypeVarChar).WithMaxLength(256))

schema := entity.NewSchema().
	WithField(entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true)).
	WithField(entity.NewField().WithName("chunks").WithDataType(entity.FieldTypeArray).WithElementType(entity.FieldTypeStruct).WithStructSchema(structSchema))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("books", schema))
if err != nil {
	// handle error
}
```
