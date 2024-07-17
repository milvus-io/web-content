# LoadPartitions()

This method loads the data of specific partitions into memory.

```go
func (c *GrpcClient) LoadPartitions(ctx context.Context, collName string, partitionNames []string, async bool) error
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
     <td><p><code>partitionNames</code></p></td>
     <td><p>Names of the partitions to load.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>async</code></p></td>
     <td><p>Whether this operation is asynchronous.</p></td>
     <td><p><code>bool</code></p></td>
   </tr>
</table>

## Return

Null

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- `ErrCollectionNotExists`: The specified collection does not exist.

- Partitions with the specified name do not exist.

- The call to this API fails.

## Example

```go
// load partitions
errPar := mc.LoadPartitions(context.Background(), collectionName, []string{"_default", "p1"}, true)
if errPar != nil {
   log.Fatal("failed to load partition:", errPar.Error())
}
```

