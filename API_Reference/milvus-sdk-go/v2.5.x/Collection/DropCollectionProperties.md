# DropCollectionProperties()

This method resets the specified properties of a collection to their default values.

```go
func (c *Client) DropCollectionProperties(ctx context.Context, option DropCollectionPropertiesOption, callOptions ...grpc.CallOption) error
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
     <td><p><a href="./v2-Collection-DropCollectionProperties#dropcollectionpropertiesoption"><code>DropCollectionPropertiesOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## DropCollectionPropertiesOption

This is an interface type. The `dropCollectionPropertiesOption` struct type implements this interface type. 

You can use the `NewDropCollectionPropertiesOption()` function to get the concrete implementation.

### NewDropCollectionPropertiesOption

The signature of this method is as follows:

```go
func NewDropCollectionPropertiesOption(collection string, propertyKeys ...string) *dropCollectionPropertiesOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>collection</code></p></td>
     <td><p>Name of the collection to drop.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>propertyKeys</code></p></td>
     <td><p>Names of the properties to reset.</p></td>
     <td><p><code>...string</code></p></td>
   </tr>
</table>

## Return

Null

## Example

```go
err = cli.DropCollectionProperties(ctx, milvusclient.NewDropCollectionPropertiesOption("my_collection", common.CollectionTTLConfigKey))
if err != nil {
    // handle error
}
```

