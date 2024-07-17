# DescribeIndex()

This method returns the index details.

```go
func (c *GrpcClient) DescribeIndex(ctx context.Context, collName string, fieldName string, opts ...IndexOption) ([]entity.Index, error)
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

A list of `entity.Index` or an error.

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- `ErrCollectionNotExists`: The specified collection does not exist.

- A field with the same name does not exist.

- The call to this API fails.

## Example

```go
// describe index
indexes, errDesc := mc.DescribeIndex(context.Background(), collectionName, "vector")
if errDesc != nil {
   log.Fatal("failed to describe index:", errDesc.Error())
}
for _, idx := range indexes{
   log.Println(idx.Name(), idx.IndexType(), idx.Params())
}
```

