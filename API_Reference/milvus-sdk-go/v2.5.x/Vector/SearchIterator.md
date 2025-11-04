# SearchIterator()

This method creates an iterator that walks through the search results.

```go
func (c *Client) SearchIterator(ctx context.Context, option SearchIteratorOption, callOptions ...grpc.CallOption) (SearchIterator, error)
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
     <td><p><a href="./v2-Vector-SearchIterator#searchiteratoroption"><code>SearchIteratorOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## SearchIteratorOption

This is an interface type. The `searchIteratorOption` struct type implements this interface.

You can use the `NewSearchIteratorOption` method to get its concrete implementation.

### NewSearchIteratorOption

The signature of this method is as follows:

```go
func NewSearchIteratorOption(collectionName string, vector entity.Vector) *searchIteratorOption
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
     <td><p><code>vectors</code></p></td>
     <td><p>Query vectors</p></td>
     <td><p><a href="./v2-Vector-Search#entityvector"><code>&#91;&#93;entity.Vector</code></a></p></td>
   </tr>
</table>

You can chain the following methods to append more parameters to the `searchIteratorOption` struct type.

- [WithBatchSize](SearchIterator.md#WithBatchSize)

- [WithPartitions](SearchIterator.md#WithPartitions)

- [WithFilter](SearchIterator.md#WithFilter)

- [WIthTemplateParam](SearchIterator.md#WithTemplateParam)

- [WithOffset](SearchIterator.md#WithOffset)

- [WIthOutputFields](SearchIterator.md#WithOutputFields)

- [WithConsistencyLevel](SearchIterator.md#WithConsistencyLevel)

- [WithANNSField](SearchIterator.md#WithANNSField)

- [WithGroupByField](SearchIterator.md#WithGroupByField)

- [WithGroupSize](SearchIterator.md#WithGroupSize)

- [WithStrictGroupSize](SearchIterator.md#WithStrictGroupSize)

- [WithIgnoreGrowing](SearchIterator.md#WIthIgnoreGrowing)

- [WithAnnParam](SearchIterator.md#WithAnnParam)

- [WithSearchParam](SearchIterator.md#WithSearchParam)

- [WithIteratorLimit](SearchIterator.md#WithIteratorLimit)

### WithBatchSize

This method appends the settings regarding the `batchSize` parameter to the `searchIteratorOption` struct. The signature of this method is as follows:

```go
func (opt *searchIteratorOption) WithBatchSize(batchSize int) *searchIteratorOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>batchSize</code></p></td>
     <td><p>The number of entities to return in each iteration.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

### WithPartitions

This method appends the settings regarding the `partitionNames` parameter to the `searchIteratorOption` struct. The signature of this method is as follows:

```go
func (opt *searchIteratorOption) WithPartitions(partitionNames ...string) *searchIteratorOption
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

This method appends the settings regarding the `expr` parameter to the `searchIteratorOption` struct. The signature of this method is as follows:

```go
func (opt *searchIteratorOption) WithFilter(expr string) *searchIteratorOption
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

This method appends the settings regarding the arguments used in the `expr` parameter to the `searchIteratorOption` struct. The signature of this method is as follows:

```go
func (opt *searchIteratorOption) WithTemplateParam(key string, val any) *searchIteratorOption
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

This method appends the settings regarding the `offset` parameter to the `searchIteratorOption` struct. The signature of this method is as follows:

```go
func (opt *searchIteratorOption) WithOffset(offset int) *searchIteratorOption
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

This method appends the settings regarding the `outputFields` parameter to the `searchIteratorOption` struct. The signature of this method is as follows:

```go
func (opt *searchIteratorOption) WithOutputFields(fieldNames ...string) *searchIteratorOption
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

This method appends the settings regarding the `consistencyLevel` parameter to the `searchIteratorOption` struct. The signature of this method is as follows:

```go
func (opt *searchIteratorOption) WithConsistencyLevel(consistencyLevel entity.ConsistencyLevel) *searchIteratorOption
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

This method appends the settings regarding the `annsField` parameter to the `searchIteratorOption` struct. The signature of this method is as follows:

```go
func (opt *searchIteratorOption) WithANNSField(annsField string) *searchIteratorOption
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

This method appends the settings regarding the `groupByField` parameter to the `searchIteratorOption` struct. The signature of this method is as follows:

```go
func (opt *searchIteratorOption) WithGroupByField(groupByField string) *searchIteratorOption
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

This method appends the settings regarding the `groupSize` parameter to the `searchIteratorOption` struct. The signature of this method is as follows:

```go
func (opt *searchIteratorOption) WithGroupSize(groupSize int) *searchIteratorOption
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

This method appends the settings regarding the `strictGroupSize` parameter to the `searchIteratorOption` struct. The signature of this method is as follows:

```go
func (opt *searchIteratorOption) WithStrictGroupSize(strictGroupSize bool) *searchIteratorOption
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

This method appends the settings regarding the `ignoreGrowing` parameter to the `searchIteratorOption` struct. The signature of this method is as follows:

```go
func (opt *searchIteratorOption) WithIgnoreGrowing(ignoreGrowing bool) *searchIteratorOption
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

This method appends the settings regarding the `ap` parameter to the `searchIteratorOption` struct. The signature of this method is as follows:

```go
func (opt *searchIteratorOption) WithAnnParam(ap index.AnnParam) *searchIteratorOption
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
     <td><p><a href="./v2-Vector-Search"><code>index.AnnParam</code></a></p></td>
   </tr>
</table>

### WithSearchParam

This method appends the settings regarding the `searchParams` parameter to the `searchIteratorOption` struct. The signature of this method is as follows:

```go
func (opt *searchIteratorOption) WithSearchParam(key, value string) *searchIteratorOption
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

### WithIteratorLimit

This method appends the settings regarding the `limit` parameter to the `searchIteratorOption` struct. The signature of this method is as follows:

```go
func (opt *searchIteratorOption) WithIteratorLimit(limit int64) *searchIteratorOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>limit</code></p></td>
     <td><p>When set, this option limits the total number of entities returned. </p><p>Setting this to a value less than <code>0</code> removes the limit and returns all entities that match the specified filter expressions.</p></td>
     <td><p><code>bool</code></p></td>
   </tr>
</table>

## SearchIterator

This is an interface type. The `searchIteratorV2` struct type implement this interface.

You can use the `Next` method to retrieve search results iteratively.

### Next

The signature of this method is as follows:

```go
func (it *searchIteratorV2) Next(ctx context.Context) (ResultSet, error)
```

Every time you call `Next()`, a [ResultSet](Search.md#ResultSet) will be returned.

## Return

`SearchIterator`

## Example

```go
import (
    "context"
    "errors"
    "fmt"
    "io"
    "log"
    "strings"
    "time"

    "golang.org/x/exp/rand"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/index"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

c, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey:  "root:Milvus",
})

vec := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}
iter, err := c.SearchIterator(ctx, milvusclient.NewSearchIteratorOption(collectionName, entity.FloatVector(vec)).
    WithANNSField("vector").
    WithAnnParam(index.NewIvfAnnParam(16)).
    WithBatchSize(50).
    WithOutputFields("color").
    WithIteratorLimit(20000))
if err != nil {
    // handle error
}

// use the iterator
for {
    rs, err := iter.Next(ctx)
    // end of iterator
    if errors.Is(err, io.EOF) {
        break
    }
    if err != nil {
        // handler error
    }
    fmt.Println(rs)
}
```
