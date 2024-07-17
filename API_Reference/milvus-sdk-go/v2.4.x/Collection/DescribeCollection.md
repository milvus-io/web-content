# DescribeCollection()

This method returns the details of a specific collection.

```go
func (c *GrpcClient) DescribeCollection(ctx context.Context, collName string) (*entity.Collection, error)
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
     <td><p>Name of the collection to describe.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## Return

An `entity.Collection` struct.

```go
type Collection struct {
    ID               int64   // collection id
    Name             string  // collection name
    Schema           *Schema // collection schema, with fields schema and primary key definition
    PhysicalChannels []string
    VirtualChannels  []string
    Loaded           bool
    ConsistencyLevel ConsistencyLevel
    ShardNum         int32
    Properties       map[string]string
}
```

## Errors

Any error in the execution of the request. Possible errors are as follows:

## Example

```go
// describe collection
collection, errDesc := mc.DescribeCollection(context.Background(), collectionName)
if errDesc != nil {
   log.Fatal("failed to describe collection:", errDesc.Error())
}
log.Printf("collection: %v", collection)
```

