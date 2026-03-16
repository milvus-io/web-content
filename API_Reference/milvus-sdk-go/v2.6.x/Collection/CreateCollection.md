# CreateCollection()

This operation creates a new collection with the specified schema and options.

```go
func (c *Client) CreateCollection(ctx context.Context, option CreateCollectionOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewCreateCollectionOption(name, collectionSchema).
    WithAutoID(autoID).
    WithShardNum(shardNum).
    WithDynamicSchema(dynamicSchema).
    WithVarcharPK(varcharPK, maxLen).
    WithIndexOptions(indexOpts).
    WithProperty(key, value).
    WithConsistencyLevel(cl).
    WithMetricType(metricType).
    WithPKFieldName(name).
    WithVectorFieldName(name).
    WithNumPartitions(numPartitions)

// Alternative constructor(s):
// option := milvusclient.SimpleCreateCollectionOptions(name string, dim int64)

err := client.CreateCollection(ctx, option)
```

**PARAMETERS:**

- **name** (*string*)

      The name of the target collection.

- **collectionSchema** (**[entity.Schema](Schema.md)*)

      The schema defining the collection fields and their data types.

**OPTION METHODS:**

- `WithAutoID(autoID bool)`

      Sets whether to automatically generate IDs for inserted entities.

- `WithShardNum(shardNum int32)`

      Sets the number of shards for data distribution across nodes.

- `WithDynamicSchema(dynamicSchema bool)`

      Enables or disables the dynamic schema feature for flexible field insertion.

- `WithVarcharPK(varcharPK bool, maxLen int)`

      Configures the collection to use varchar as the primary key type with a maximum length.

- `WithIndexOptions(indexOpts ...[CreateIndexOption](../Management/CreateIndex.md))`

      Specifies the index options to apply when creating the collection.

- `WithProperty(key string, value any)`

      Sets a custom property key-value pair on the resource.

- `WithConsistencyLevel(cl [entity.ConsistencyLevel](ConsistencyLevel.md))`

      Sets the consistency level for the operation (Strong, Bounded, Session, or Eventually).

- `WithMetricType(metricType [entity.MetricType](../Management/MetricType.md))`

      Sets the distance metric type for vector similarity search (e.g., COSINE, L2, IP).

- `WithPKFieldName(name string)`

      Sets the name of the primary key field.

- `WithVectorFieldName(name string)`

      Sets the name of the vector field.

- `WithNumPartitions(numPartitions int64)`

      Sets the number of partitions for the collection.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil on success, or an error describing what went wrong.

**EXCEPTIONS:**

- **error**

      Check `err != nil` for failure details.

## Example

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v2/entity"
	"github.com/milvus-io/milvus/client/v2/index"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

collectionName := `customized_setup_1`

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle err
}

indexOptions := []milvusclient.CreateIndexOption{
	milvusclient.NewCreateIndexOption(collectionName, "my_vector", index.NewAutoIndex(entity.COSINE)).WithIndexName("my_vector"),
	milvusclient.NewCreateIndexOption(collectionName, "my_id", index.NewSortedIndex()).WithIndexName("my_id"),
}

schema := entity.NewSchema().WithDynamicFieldEnabled(true).
	WithField(entity.NewField().WithName("my_id").WithIsAutoID(true).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true)).
	WithField(entity.NewField().WithName("my_vector").WithDataType(entity.FieldTypeFloatVector).WithDim(5)).
	WithField(entity.NewField().WithName("my_varchar").WithDataType(entity.FieldTypeVarChar).WithMaxLength(512))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema).
	WithIndexOptions(indexOptions...),
)
if err != nil {
	// handle error
}
```
