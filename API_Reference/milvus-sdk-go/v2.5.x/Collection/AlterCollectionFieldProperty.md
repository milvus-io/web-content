# AlterCollectionFieldProperty()

This method changes the specified property of a collection field.

```go
func (c *Client) AlterCollectionFieldProperty(ctx context.Context, option AlterCollectionFieldPropertiesOption, callOptions ...grpc.CallOption) error
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
     <td><p><code>AlterCollectionFieldPropertiesOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## AlterCollectionFieldPropertiesOption

This is an interface type. The `alterCollectionFieldPropertiesOption` struct type implements this interface type. 

You can use the `NewAlterCollectionFieldPropertiesOption()` function to get the concrete implementation.

### NewAlterCollectionFieldPropertiesOption

The signature of this method is as follows:

```go
func NewAlterCollectionFieldPropertiesOption(collectionName string, fieldName string) *alterCollectionFieldPropertiesOption
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
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the target field.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## Return

Null

## Example

```plaintext
err = cli.AlterCollectionFieldProperty(ctx, milvusclient.NewAlterCollectionFieldPropertiesOption("customized_setup_2", "id").WithProperty(common.MmapEnabledKey, "true"))
if err != nil {
    // handle err
}
```
