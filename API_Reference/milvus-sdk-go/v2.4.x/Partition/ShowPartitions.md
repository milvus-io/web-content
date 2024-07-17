

# ShowPartitions()

This method returns a list of partitions within a specific collection.

```go
func (c *GrpcClient) ShowPartitions(ctx context.Context, collName string) ([]*entity.Partition, error)
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
</table>

## Return

A list of `entity.Partition` or an error.

### entity.Partition

This struct type defines the fields to include in the partition details.

```go
type Partition struct {
    ID     int64  // partition id
    Name   string // partition name
    Loaded bool   // partition loaded
}
```

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- `ErrCollectionNotExists`: The specified collection does not exist.

- The call to this API fails.

## Example

```go
// show partitions
partitions, errPar := mc.ShowPartitions(context.Background(), collectionName)
if errPar != nil {
   log.Fatal("failed to show partitions:", errPar.Error())
}
for _, p := range partitions {
   log.Println(p.Name, p.ID)
}
```

