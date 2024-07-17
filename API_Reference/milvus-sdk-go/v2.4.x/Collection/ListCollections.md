# ListCollections()

This method lists collections within the connected database.

```go
func (c *GrpcClient) ListCollections(ctx context.Context, opts ...ListCollectionOption) ([]*entity.Collection, error)
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
     <td><p>opts</p></td>
     <td><p>Extra settings for this request.</p></td>
     <td><p><code>client.ListCollectionOption</code></p></td>
   </tr>
</table>

### client.ListCollectionOption

You can add extra settings to the `ListCollections()` request using the following methods.

<table>
   <tr>
     <th><p>Method</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>WithShowInMemory(value bool)</code></p></td>
     <td><p>Whether to include the load status of the collections in the returned list.</p></td>
   </tr>
</table>

## Return

A list of `entity.Collection` structs. An `entity.Collection` struct is as follows:

```go
type Collection struct {
    ID               int64
    Name             string  
    Schema           *Schema // Not included
    PhysicalChannels []string
    VirtualChannels  []string
    Loaded           bool    // Controled by `WithShowInMemory()`
    ConsistencyLevel ConsistencyLevel
    ShardNum         int32
    Properties       map[string]string
}
```

<div class="admonition note">

<p><b>notes</b></p>

<p>The schema field is not included in each of the structs in the list.</p>

</div>

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- The call to this API fails.

## Example

```go
// list collections
collections, errList := mc.ListCollections(context.Background(), client.WithShowInMemory(false))
if errList != nil {
   log.Fatal("failed to list collection:", errList.Error())
}
for _, c := range collections{
   log.Println(c.Name)
}
```
