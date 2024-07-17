# GetLoadState()

This method displays the load status of a specific collection or its partitions.

```go
func (c *GrpcClient) GetLoadState(ctx context.Context, collName string, partitionNames []string) (entity.LoadState, error)
```

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
     <td><p><code>collName</code></p></td>
     <td><p>Name of a collection</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>partitionNames</code></p></td>
     <td><p>List of partition names. </p><p>If left empty, all partitions are involved in this operation. Otherwise, only the specified partitions are involved.</p></td>
     <td><p><code>[]string</code></p></td>
   </tr>
</table>

## Return

An `entity.LoadState` or an error.

### entity.LoadState

This int32 type offers the numeric representation of all possible load states.

```go
const (
    LoadStateNotExist LoadState = 0
    LoadStateNotLoad  LoadState = 1
    LoadStateLoading  LoadState = 2
    LoadStateLoaded   LoadState = 3
)
```

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- `ErrCollectionNotExists`: The collection with the specified name does not exist.

- The call to this API fails.

## Example

```go
errLoad := mc.LoadCollection(context.Background(), collectionName, true)
if errLoad != nil {
   log.Fatal("failed to load collection:", errLoad.Error())
}
// get load state
stateLoad, errState := mc.GetLoadState(context.Background(), collectionName, []string{})
if errState != nil {
   log.Fatal("failed to get load state:", errState.Error())
}
log.Println(stateLoad)
```
