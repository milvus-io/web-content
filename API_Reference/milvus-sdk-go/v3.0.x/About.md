# About Milvus GO SDK

The Go SDK of Milvus. Its source code is open-sourced and hosted on [GitHub](https://github.com/milvus-io/milvus/tree/master/client).

## Installation

Install the SDK via `go get`:

```shell
$ go get -u github.com/milvus-io/milvus/client/v3
```

<div class="alert note">

To install the Go SDK for a Milvus release before v2.5.x, use the legacy module:

```shell
$ go get -u github.com/milvus-io/milvus-sdk-go/v2
```

</div>

## Quick Start

The following example connects to Milvus, creates a collection, inserts a vector, builds an index, loads the collection, and runs a vector search:

```go
import (
	"context"
	"log"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"
token := "root:Milvus"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
	APIKey:  token,
})
if err != nil {
	log.Fatal("failed to connect to milvus server: ", err.Error())
}

// Create a collection with an id primary-key field and a 3-dim float vector field
schema := entity.NewSchema().
	WithField(entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true)).
	WithField(entity.NewField().WithName("vector").WithDataType(entity.FieldTypeFloatVector).WithDim(3))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("quick_setup", schema))
if err != nil {
	log.Fatal("failed to create collection: ", err.Error())
}

// Insert one row with vector [1, 2, 3]
_, err = cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption("quick_setup").
	WithInt64Column("id", []int64{1}).
	WithFloatVectorColumn("vector", 3, [][]float32{{1, 2, 3}}))
if err != nil {
	log.Fatal("failed to insert entity: ", err.Error())
}

// Create an AUTOINDEX index with COSINE metric and load the collection
idxTask, err := cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("quick_setup", "vector", index.NewAutoIndex(entity.COSINE)))
if err != nil {
	log.Fatal("failed to create index: ", err.Error())
}
if err = idxTask.Await(ctx); err != nil {
	log.Fatal("failed to build index: ", err.Error())
}

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption("quick_setup"))
if err != nil {
	log.Fatal("failed to load collection: ", err.Error())
}
if err = loadTask.Await(ctx); err != nil {
	log.Fatal("failed to load collection: ", err.Error())
}

// Search for vector [1, 2, 3] with limit 1 and strong consistency
resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
	"quick_setup",
	1,
	[]entity.Vector{entity.FloatVector{1, 2, 3}},
).WithConsistencyLevel(entity.ClStrong))
if err != nil {
	log.Fatal("failed to search: ", err.Error())
}
for _, resultSet := range resultSets {
	log.Println("IDs: ", resultSet.IDs)
	log.Println("Scores: ", resultSet.Scores)
}

// Drop the collection and disconnect
err = cli.DropCollection(ctx, milvusclient.NewDropCollectionOption("quick_setup"))
if err != nil {
	log.Fatal("failed to drop collection: ", err.Error())
}
if err = cli.Close(ctx); err != nil {
	log.Fatal("failed to close client: ", err.Error())
}
```

## Compatibility

Milvus proto is backward compatible, so a later SDK version can work with an earlier Milvus server. The table lists the recommended SDK version validated for each Milvus version.

| Milvus version | Recommended SDK version |
| -------------- | ----------------------- |
| 1.0.x | [1.0.0](https://github.com/milvus-io/milvus-sdk-go/tree/v1.0.0) |
| 1.1.x | [1.1.0](https://github.com/milvus-io/milvus-sdk-go/tree/v1.1.0) |
| 2.0.x | [2.0.0](https://github.com/milvus-io/milvus-sdk-go/tree/v2.0.0) |
| 2.1.x | [2.1.2](https://github.com/milvus-io/milvus-sdk-go/tree/v2.1.2) |
| 2.2.x | [2.2.8](https://github.com/milvus-io/milvus-sdk-go/tree/v2.2.8) |
| 2.3.x | [2.3.3](https://github.com/milvus-io/milvus-sdk-go/tree/v2.3.3) |
| 2.4.x | [2.4.1](https://github.com/milvus-io/milvus-sdk-go/tree/v2.4.1) |
| 2.5.x | [2.5.6](https://github.com/milvus-io/milvus/tree/client/v2.5.6/client) |
| 2.6.x | [2.6.5](https://github.com/milvus-io/milvus/tree/client/v2.6.5/client) |
| 3.0.x | [3.0.0](https://github.com/milvus-io/milvus/tree/client/v3.0.0/client) |

## Contributing

We are committed to building a collaborative, exuberant open-source community for Milvus. Therefore, contributions to the Milvus GO SDK are welcome from everyone. Refer to the [Contributing Guideline](https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md) before making contributions to this project. You can [file an issue](https://github.com/milvus-io/milvus/issues/new/choose) if you need any assistance or want to propose your ideas.

## License

[Apache License 2.0](LICENSE)
