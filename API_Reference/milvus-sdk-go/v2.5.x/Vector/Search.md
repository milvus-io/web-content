# Search()

This method performs a vector search.

```go
func (c *Client) Search(ctx context.Context, option SearchOption, callOptions ...grpc.CallOption) ([]ResultSet, error)
```

## Request Parameters

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>ctx</code></p></td>
     <td><p>Context for the current call to work.</p></td>
     <td><p><code>context.Context</code></p></td>
   </tr>
   <tr>
     <td><p><code>option</code></p></td>
     <td><p>Optional parameters of the methods.</p></td>
     <td><p><a href="./v2-Vector-Search#searchoption"><code>SearchOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## SearchOption

This is an interface type. The `searchOption` struct types implement this interface type. 

You can use the `NewSearchOption` function to get the concrete implementation.

### NewSearchOption

The signature of this method is as follows:

```go
func NewSearchOption(collectionName string, limit int, vectors []entity.Vector) *searchOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>collectionName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>limit</code></p></td>
     <td><p>Number of entities included in the result set.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>vectors</code></p></td>
     <td><p>Query vectors</p></td>
     <td><p><a href="./v2-Vector-Search#entityvector"><code>&#91;&#93;entity.Vector</code></a></p></td>
   </tr>
</table>

You can chain the following methods to append more parameters to the `searchOption` struct type:

- [WithPartitions](Search.md#WithPartitions)

- [WithFilter](Search.md#WithFilter)

- [WithTemplateParam](Search.md#WithTemplateParam)

- [WithOffset](Search.md#WithOffset)

- [WithOutputFields](Search.md#WithOutputFields)

- [WithConsistencyLevel](Search.md#WithConsistencyLevel)

- [WithANNSField](Search.md#WithANNSField)

- [WithGroupByField](Search.md#WithGroupByField)

- [WithGroupSize](Search.md#WithGroupSize)

- [WithStrictGroupSize](Search.md#WithStrictGroupSize)

- [WIthIgnoreGrowing](Search.md#WIthIgnoreGrowing)

- [WithAnnParam](Search.md#WithAnnParam)

- [WithSearchParam](Search.md#WithSearchParam)

### WithPartitions

This method appends the settings regarding the `partitionNames` parameter to the `searchOption` struct. The signature of this method is as follows:

```go
func (opt *searchOption) WithPartitions(partitionNames ...string) *searchOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>partitionNames</code></p></td>
     <td><p>The names of the target partitions</p></td>
     <td><p><code>...string</code></p></td>
   </tr>
</table>

### WithFilter

This method appends the settings regarding the `expr` parameter to the `searchOption` struct. The signature of this method is as follows:

```go
func (opt *searchOption) WithFilter(expr string) *searchOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>expr</code></p></td>
     <td><p>The filtering expression.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

### WithTemplateParam

This method appends the settings regarding the arguments used in the `expr` parameter to the `searchOption` struct. The signature of this method is as follows:

```go
func (opt *searchOption) WithTemplateParam(key string, val any) *searchOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>key</code></p></td>
     <td><p>The name of the argument used in the <code>expr</code> parameter</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>val</code></p></td>
     <td><p>The value of the specified argument.</p></td>
     <td><p><code>any</code></p></td>
   </tr>
</table>

### WithOffset

This method appends the settings regarding the `offset` parameter to the `searchOption` struct. The signature of this method is as follows:

```go
func (opt *searchOption) WithOffset(offset int) *searchOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>offset</code></p></td>
     <td><p>The number of entities to skip before the search results are returned.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

### WithOutputFields

This method appends the settings regarding the `outputFields` parameter to the `searchOption` struct. The signature of this method is as follows:

```go
func (opt *searchOption) WithOutputFields(fieldNames ...string) *searchOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>outputFields</code></p></td>
     <td><p>The names of fields to include in the search results</p></td>
     <td><p><code>...string</code></p></td>
   </tr>
</table>

### WithConsistencyLevel

This method appends the settings regarding the `consistencyLevel` parameter to the `searchOption` struct. The signature of this method is as follows:

```go
func (opt *searchOption) WithConsistencyLevel(consistencyLevel entity.ConsistencyLevel) *searchOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>consistencyLevel</code></p></td>
     <td><p>Consistency level for the search.</p><p>For details, refer to <a href="https://milvus.io/docs/consistency.md">Consistency Level</a>.</p></td>
     <td><p><code>entity.ConsistencyLevel</code></p></td>
   </tr>
</table>

### WithANNSField

This method appends the settings regarding the `annsField` parameter to the `searchOption` struct. The signature of this method is as follows:

```go
func (opt *searchOption) WithANNSField(annsField string) *searchOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>annsField</code></p></td>
     <td><p>The name of the target vector field in the current operation.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

### WithGroupByField

This method appends the settings regarding the `groupByField` parameter to the `searchOption` struct. The signature of this method is as follows:

```go
func (opt *searchOption) WithGroupByField(groupByField string) *searchOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>groupByField</code></p></td>
     <td><p>The name of the field, according to which the search results are grouped, ensures diversity and avoids returning multiple results from the same group.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

### WithGroupSize

This method appends the settings regarding the `groupSize` parameter to the `searchOption` struct. The signature of this method is as follows:

```go
func (opt *searchOption) WithGroupSize(groupSize int) *searchOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>groupSize</code></p></td>
     <td><p>The target number of entities to return within each group in a grouping search. </p><p>For example, setting <code>groupSize</code> to <code>2</code> instructs the system to return up to 2 of the most similar entities (e.g., document passages or vector representations) within each group. Without setting <code>groupSize</code>, the system defaults to returning only 1 entity per group.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

### WithStrictGroupSize

This method appends the settings regarding the `strictGroupSize` parameter to the `searchOption` struct. The signature of this method is as follows:

```go
func (opt *searchOption) WithStrictGroupSize(strictGroupSize bool) *searchOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>strictGroupSize</code></p></td>
     <td><p>This Boolean parameter dictates whether <code>groupSize</code> should be strictly enforced. </p><p>When you set it to <code>True</code>, the system will attempt to fill each group with exactly <code>groupSize</code> results, provided there is sufficient data within each group. If there is an insufficient number of entities in a group, it will return only the available entities, ensuring that groups with adequate data meet the specified <code>groupSize</code>.</p></td>
     <td><p><code>bool</code></p></td>
   </tr>
</table>

### WIthIgnoreGrowing

This method appends the settings regarding the `ignoreGrowing` parameter to the `searchOption` struct. The signature of this method is as follows:

```go
func (opt *searchOption) WithIgnoreGrowing(ignoreGrowing bool) *searchOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>ignoreGrowing</code></p></td>
     <td><p>When set, this option instructs the search to exclude data from growing segments. Using this setting can enhance search performance by focusing on only indexed, fully processed data.</p></td>
     <td><p><code>bool</code></p></td>
   </tr>
</table>

### WithAnnParam

This method appends the settings regarding the `ap` parameter to the `searchOption` struct. The signature of this method is as follows:

```go
func (opt *searchOption) WithAnnParam(ap index.AnnParam) *searchOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>ap</code></p></td>
     <td><p>Specifies the parameters for the approximate nearest neighbor (ANN) search.</p></td>
     <td><p><a href="./v2-Vector-HybridSearch#indexannparam"><code>index.AnnParam</code></a></p></td>
   </tr>
</table>

### WithSearchParam

This method appends the settings regarding the `searchParams` parameter to the `searchOption` struct. The signature of this method is as follows:

```go
func (opt *searchOption) WithSearchParam(key, value string) *searchOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>key</code></p></td>
     <td><p>The name of the argument used in the <code>searchParams</code> parameter</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>value</code></p></td>
     <td><p>The value of the specified argument.</p></td>
     <td><p><code>any</code></p></td>
   </tr>
</table>

## entity.Vector

This is an interface. The following types implement this interface.

- [entity.FloatVector](Search.md#entityFloatVector)

- [entity.Float16Vector](Search.md#entityFloat16Vector)

- [entity.BFloat16Vector](Search.md#entityBFloat16Vector)

- [entity.BinaryVector](Search.md#entityBinaryVector)

- [entity.Text](Search.md#entityText)

## entity.FloatVector

This is a list containing numbers of the `float32` type. The signature is as follows:

```go
type FloatVector []float32
```

## entity.Float16Vector

This is a list containing numbers of the `byte` type. The signature is as follows:

```go
type Float16Vector []byte
```

## entity.BFloat16Vector

This is a list containing numbers of the `byte` type. The signature is as follows:

```go
type BFloat16Vector []byte
```

## entity.BinaryVector

This is a list containing numbers of the `byte` type. The signature is as follows:

```go
type BinaryVector []byte
```

## entity.Text

This is a string type. The signature is as follows:

```plaintext
type Text string
```

## ResultSet

This is a struct type. You can use the `GetColumn` method to get the result values in a specific field, the `Len` method to get the total number of entities in the set, and the `Slice` method to get a subset of the return.

### GetColumn

This method returns the query result in a specific column. The signature is as follows:

```go
func (rs *ResultSet) GetColumn(fieldName string) column.Column
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the target field.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

### Len

This method returns the total number of entities in the return. The signature is as follows:

```go
func (rs ResultSet) Len() int
```

### Slice

This method returns a subset of the return. The signature is as follows:

```go
func (rs ResultSet) Slice(start, end int) ResultSet
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>start</code></p></td>
     <td><p>The ID of the start entity</p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>end</code></p></td>
     <td><p>The ID of the end entity</p></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

## Return

`ResultSet`

## Examples

### Basic search

```plaintext
package main

import (
        "context"
        "log"

        "github.com/milvus-io/milvus/client/v2/entity"
        "github.com/milvus-io/milvus/client/v2/milvusclient"
)

func main() {
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

        defer cli.Close(ctx)

        queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

        resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
                "quick_setup", // collectionName
                3,             // limit
                []entity.Vector{entity.FloatVector(queryVector)},
        ))
        if err != nil {
                log.Fatal("failed to perform basic ANN search collection: ", err.Error())
        }

        for _, resultSet := range resultSets {
                log.Println("IDs: ", resultSet.IDs)
                log.Println("Scores: ", resultSet.Scores)
        }
}
```

### Search with binary vectors

```go
package main

import (
        "context"
        "log"

        "github.com/milvus-io/milvus/client/v2/entity"
        "github.com/milvus-io/milvus/client/v2/index"
        "github.com/milvus-io/milvus/client/v2/milvusclient"
)

func main() {
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

        defer cli.Close(ctx)

        queryVector := []byte{0b10011011, 0b01010100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0}

        annSearchParams := index.NewCustomAnnParam()
        annSearchParams.WithExtraParam("nprobe", 10)
        resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
                "my_binary_collection", // collectionName
                5,                      // limit
                []entity.Vector{entity.BinaryVector(queryVector)},
        ).WithOutputFields("pk").WithAnnParam(annSearchParams))
        if err != nil {
                log.Fatal("failed to perform basic ANN search collection: ", err.Error())
        }

        for _, resultSet := range resultSets {
                log.Println("IDs: ", resultSet.IDs)
                log.Println("Scores: ", resultSet.Scores)
                log.Println("Pks: ", resultSet.GetColumn("pk"))
        }
}

```

### Search with JSON expressions

```go
ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
        Address: milvusAddr,
})
if err != nil {
        log.Fatal("failed to connect to milvus server: ", err.Error())
}

defer cli.Close(ctx)

queryVector := []float32{0.3, -0.6, -0.1}

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam("nprobe", 10)
resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
        "my_json_collection", // collectionName
        5,                    // limit
        []entity.Vector{entity.FloatVector(queryVector)},
).WithOutputFields("metadata").WithAnnParam(annParam))
if err != nil {
        log.Fatal("failed to perform basic ANN search collection: ", err.Error())
}

for _, resultSet := range resultSets {
        log.Println("IDs: ", resultSet.IDs)
        log.Println("Scores: ", resultSet.Scores)
}
```

### Search with multiple vectors

```go
package main

import (
        "context"
        "log"

        "github.com/milvus-io/milvus/client/v2/entity"
        "github.com/milvus-io/milvus/client/v2/milvusclient"
)

func main() {
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

        defer cli.Close(ctx)

        queryVectors := []entity.Vector{
                entity.FloatVector([]float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}),
                entity.FloatVector([]float32{0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104}),
        }

        resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
                "quick_setup", // collectionName
                3,             // limit
                queryVectors,
        ))
        if err != nil {
                log.Fatal("failed to perform basic ANN search collection: ", err.Error())
        }

        for _, resultSet := range resultSets {
                log.Println("IDs: ", resultSet.IDs)
                log.Println("Scores: ", resultSet.Scores)
        }
}
```

### Search with offset and limit

```go
package main

import (
        "context"
        "log"

        "github.com/milvus-io/milvus/client/v2/entity"
        "github.com/milvus-io/milvus/client/v2/milvusclient"
)

func main() {
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

        defer cli.Close(ctx)

        queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

        resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
                "quick_setup", // collectionName
                3,             // limit
                []entity.Vector{entity.FloatVector(queryVector)},
        ).WithOffset(10))
        if err != nil {
                log.Fatal("failed to perform basic ANN search collection: ", err.Error())
        }

        for _, resultSet := range resultSets {
                log.Println("IDs: ", resultSet.IDs)
                log.Println("Scores: ", resultSet.Scores)
        }
}
```

### Search with output fields

```go
package main

import (
        "context"
        "log"

        "github.com/milvus-io/milvus/client/v2/entity"
        "github.com/milvus-io/milvus/client/v2/milvusclient"
)

func main() {
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

        defer cli.Close(ctx)

        queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

        resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
                "quick_setup", // collectionName
                3,             // limit
                []entity.Vector{entity.FloatVector(queryVector)},
        ).WithOutputFields("color"))
        if err != nil {
                log.Fatal("failed to perform basic ANN search collection: ", err.Error())
        }

        for _, resultSet := range resultSets {
                log.Println("IDs: ", resultSet.IDs)
                log.Println("Scores: ", resultSet.Scores)
                log.Println("Colors: ", resultSet.GetColumn("color"))
        }
}
```

### Search within partitions

```go
package main

import (
        "context"
        "log"

        "github.com/milvus-io/milvus/client/v2/entity"
        "github.com/milvus-io/milvus/client/v2/milvusclient"
)

func main() {
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

        defer cli.Close(ctx)

        queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

        resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
                "quick_setup", // collectionName
                3,             // limit
                []entity.Vector{entity.FloatVector(queryVector)},
        ).WithPartitions("partitionA"))
        if err != nil {
                log.Fatal("failed to perform basic ANN search collection: ", err.Error())
        }

        for _, resultSet := range resultSets {
                log.Println("IDs: ", resultSet.IDs)
                log.Println("Scores: ", resultSet.Scores)
        }
}
```
