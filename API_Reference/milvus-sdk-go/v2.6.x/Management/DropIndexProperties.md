# DropIndexProperties()

This operation drops the settings of the specified index properties.

```go
func (c *Client) DropIndexProperties(ctx context.Context, opt DropIndexPropertiesOption, callOptions ...grpc.CallOption) error
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
     <td><p><code>DropIndexPropertiesOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## DropIndexPropertiesOption

This is an interface type. The `dropIndexPropertiesOption` struct type implements this interface. You can use `NewDropIndexPropertiesOption()` to get its concrete implementation.

### NewDescribeIndexPropertiesOption

This method prepares the options for `DropIndexProperties()`. The signature of this method is as follows:

```go
func NewDropIndexPropertiesOption(collectionName string, indexName string, keys ...string) *dropIndexPropertiesOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>collectionName</code></p></td>
     <td><p>Name of the target collection of this operation.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>indexName</code></p></td>
     <td><p>Name of the index within the above-specified collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>keys</code></p></td>
     <td><p>Names of the properties to drop</p></td>
     <td><p><code>...string</code></p></td>
   </tr>
</table>

## Return

Null

## Example

```go

```
