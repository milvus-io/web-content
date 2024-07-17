# DropIndex()

This method drops a specific index from a field.

```go
func (c *GrpcClient) DropIndex(ctx context.Context, collName string, fieldName string, opts ...IndexOption) error
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
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the field to index.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>opts</code></p></td>
     <td><p>Extra index settings</p><p>You can include multiple <code>entity.IndexOption</code> in this request.</p></td>
     <td><p><code>client.IndexOption</code></p></td>
   </tr>
</table>

## Return

Null

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- `ErrCollectionNotExists`: The specified collection does not exist.

- A field with the same name does not exist.

- The call to this API fails.

## Example

```go
// drop index
err := mc.DropIndex(context.Background(), collectionName, "vector")
if err != nil {
   log.Fatal("failed to drop index:", err.Error())
}
```

