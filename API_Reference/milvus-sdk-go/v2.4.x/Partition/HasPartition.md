# HasPartition()

This method checks whether a specific partition exists.

```go
func (c *GrpcClient) HasPartition(ctx context.Context, collName string, partitionName string) (bool, error)
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
     <td><p>Name of a collection</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>partitionName</code></p></td>
     <td><p>Name of the partition to check.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## Return

 A boolean value indicating whether the specified partition exists.

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- `ErrCollectionNotExists`: The specified collection does not exist.

- A partition with the specified name does not exist.

- The call to this API fails.

## Example

```go
// has partition
has, errPar := mc.HasPartition(context.Background(), collectionName, "p1")
if errPar != nil {
   log.Fatal("failed to has partition:", errPar.Error())
}
log.Println(has)
```

