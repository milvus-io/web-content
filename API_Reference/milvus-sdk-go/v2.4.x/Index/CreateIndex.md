# CreateIndex()

This method creates an index for a specific field in a collection.

```go
func (c *GrpcClient) CreateIndex(ctx context.Context, collName string, fieldName string, idx entity.Index, async bool, opts ...IndexOption) error
```

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
     <td><p><code>idx</code></p></td>
     <td><p>Index settings.</p></td>
     <td><p><code>entity.Index</code></p></td>
   </tr>
   <tr>
     <td><p><code>async</code></p></td>
     <td><p>Whether this operation is asynchronous.</p></td>
     <td><p><code>bool</code></p></td>
   </tr>
   <tr>
     <td><p><code>opts</code></p></td>
     <td><p>Extra index settings</p><p>You can include multiple <code>entity.IndexOption</code> in this request.</p></td>
     <td><p><code>client.IndexOption</code></p></td>
   </tr>
</table>

### entity.Index

This interface type defines a set of method signatures as follows.

```go
type Index interface {
    Name() string
    IndexType() IndexType
    Params() map[string]string
}
```

<table>
   <tr>
     <th><p>Method Signature</p></th>
     <th><p>Return Type</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>Name()</code></p></td>
     <td><p><code>string</code></p></td>
     <td><p>Return the index name.</p></td>
   </tr>
   <tr>
     <td><p><code>IndexType()</code></p></td>
     <td><p><code>entity.IndexType</code></p></td>
     <td><p>Return the index type.</p></td>
   </tr>
   <tr>
     <td><p><code>Params()</code></p></td>
     <td><p><code>map[string]string</code></p></td>
     <td><p>Return the index parameters.</p></td>
   </tr>
</table>

For details on the struct types that implement the above method signatures and applicable index types, refer to [Indexes](Indexes.md).

## client.IndexOption

This type provides methods to modify index settings when you create, describe, or drop indexes. The following methods return `client.IndexOption`.

<table>
   <tr>
     <th><p>Method</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>WithIndexName(name string)</code></p></td>
     <td><p>Name of the index to create.</p><p>The value defaults to the target field name.</p></td>
   </tr>
   <tr>
     <td><p><code>WithMmap(enabled bool)</code></p></td>
     <td><p>Whether to enable MMap for the index.</p></td>
   </tr>
</table>

## Return

Null

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- A field with the same name does not exist.

- The call to this API fails.

## Example

```go
// create index
idxHnsw, errIdx := entity.NewIndexHNSW(entity.COSINE, 8, 200)
if errIdx != nil {
   log.Fatal("failed to new index:", errIdx.Error())
}
errIndex := mc.CreateIndex(context.Background(), collectionName, "vector", idxHnsw, false, client.WithIndexName("myIdx"))
if errIndex != nil {
   log.Fatal("failed to create index:", errIndex.Error())
}
```
