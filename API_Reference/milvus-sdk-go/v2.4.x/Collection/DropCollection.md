# DropCollection()

This method drops the specified collection and the entities within.

```go
func (c *GrpcClient) DropCollection(ctx context.Context, collName string) error
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
     <td><p><code>collName</code></p></td>
     <td><p>Name of the collection to drop.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## Return

Null

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- `ErrCollectionNotExists`: The collection with the specified name does not exist.

- The call to this API fails.

## Example

```go
// drop collection
errDrop := mc.DropCollection(context.Background(), collectionName)
if errDrop != nil {
   log.Fatal("failed to drop collection:", errDrop.Error())
}
```
