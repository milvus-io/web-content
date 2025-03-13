# DescribeIndex()

This method describes the specified index by providing its detailed information.

```go
func (c *Client) DescribeIndex(ctx context.Context, opt DescribeIndexOption, callOptions ...grpc.CallOption) (IndexDescription, error)
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
     <td><p><code>opt</code></p></td>
     <td><p>Optional parameters of the methods.</p></td>
     <td><p><code>DescribeIndexOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## DescribeIndexOption

This is an interface type. The `describeIndexOption` struct type implements this interface type. 

You can use the `NewDescribeIndexOption()` function to get the concrete implementation.

### NewDescribeIndexOption()

The signature of this method is as follows:

```go
func NewDescribeIndexOption(collectionName string, indexName string) *describeIndexOption
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
     <td><p><code>indexName</code></p></td>
     <td><p>Name of the target index.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## IndexDescription

The `IndexDescription` struct type is as follows:

```go
type IndexDescription struct {
    index.Index
    State            index.IndexState
    PendingIndexRows int64
    TotalRows        int64
    IndexedRows      int64
}
```

## index.Index

This is an interface type. For details, refer to [index.Index](CreateIndex.md#indexindex).

## index.IndexState

Possible values are as follows:

## Return

`IndexDescription`

## Example

```plaintext
indexInfo, err := cli.DescribeIndex(ctx, milvusclient.NewDescribeIndexOption("my_collection", "my_index"))
if err != nil {
    // handle err
}
fmt.Println(indexInfo)
```
