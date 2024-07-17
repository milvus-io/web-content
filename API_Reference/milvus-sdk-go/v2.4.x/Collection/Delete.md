# Delete()

This method deletes the entities that match the specified filtering conditions from a collection.

```go
func (c *GrpcClient) Delete(ctx context.Context, collName string, partitionName string, expr string) error
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
     <td><p>Name of the collection from which entities are deleted.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>partitionName</code></p></td>
     <td><p>Name of the partition to update or insert data into.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>expr</code></p></td>
     <td><p>Boolean expression for metadata filtering.</p><p>For details, refer to <a href="https://milvus.io/docs/boolean.md">Scalar Filtering Rules</a>.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## Return

Null

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- `ErrCollectionNotExists`: The collection with the specified name does not exist.

- The specified entity does not exist.

- The call to this API fails.

## Example

```go
// delete by expr
errDelete := mc.Delete(context.Background(), collectionName, "", "id < 10")
if errDelete != nil {
   log.Fatal("failed to delete data:", errDelete.Error())
}
```
