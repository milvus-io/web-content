# GetLoadState()

This method retrieves the load status of a specified collection or partitions.

```go
func (c *Client) GetLoadState(ctx context.Context, option GetLoadStateOption, callOptions ...grpc.CallOption) (entity.LoadState, error)
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
     <td><p><code>GetLoadStateOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## GetLoadStateOption

This is an interface type. The `getLoadStateOption` struct type implements this interface type. 

You can use the `NewGetLoadStateOption()` function to get the concrete implementation.

### NewGetLoadStateOption()

The signature of this method is as follows:

```go
func NewGetLoadStateOption(collectionName string, partitionNames ...string) *getLoadStateOption
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
     <td><p><code>partitionNames</code></p></td>
     <td><p>Names of the target partitions.</p></td>
     <td><p><code>...string</code></p></td>
   </tr>
</table>

## entity.LoadState

The `entity.LoadState` struct type is as follows:

```go
type LoadState struct {
    State    LoadStateCode
    Progress int64
}
```

## entity.LoadStateCode

The `entity.LoadStateCode` is a private enum type and has the following possible values.

```go
const (
    // LoadStateNone      LoadStateCode = LoadStateCode(commonpb.LoadState)
    LoadStateLoading   LoadStateCode = LoadStateCode(commonpb.LoadState_LoadStateLoading)
    LoadStateLoaded    LoadStateCode = LoadStateCode(commonpb.LoadState_LoadStateLoaded)
    LoadStateUnloading LoadStateCode = LoadStateCode(commonpb.LoadState_LoadStateNotExist)
    LoadStateNotLoad   LoadStateCode = LoadStateCode(commonpb.LoadState_LoadStateNotLoad)
)
```

## Return

`entity.LoadState`

## Example

```go
import (
        "context"
        "github.com/milvus-io/milvus/client/v2/milvusclient"
)

loadState, err := cli.GetLoadState(ctx, milvusclient.NewGetLoadStateOption("customized_setup_1"))
if err != nil {
    // handle err
}
fmt.Println(loadState)
```
