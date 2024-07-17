# Query()

This method conducts metadata filtering within a collection.

```go
func (c *GrpcClient) Query(ctx context.Context, collectionName string, partitionNames []string, expr string, outputFields []string, opts ...SearchQueryOptionFunc) (ResultSet, error)
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
     <td><p><code>collectionName</code></p></td>
     <td><p>Name of a collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>partitionNames</code></p></td>
     <td><p>List of partition names. </p><p>If left empty, all partitions are involved in this operation. Otherwise, only the specified partitions are involved.</p></td>
     <td><p><code>[]string</code></p></td>
   </tr>
   <tr>
     <td><p><code>expr</code></p></td>
     <td><p>Boolean expression for metadata filtering.</p><p>For details, refer to <a href="https://milvus.io/docs/boolean.md">Scalar Filtering Rules</a>.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>outputFields</code></p></td>
     <td><p>List of field names to include in the return.</p></td>
     <td><p><code>[]string</code></p></td>
   </tr>
   <tr>
     <td><p><code>opts</code></p></td>
     <td><p>Extra query options.</p><p>You can add multiple <code>client.SearchQueryOptionFunc</code> instances.</p></td>
     <td><p><code>...client.SearchQueryOptionFunc</code></p></td>
   </tr>
</table>

## Return

A `client.ResultSet`, which is a slice of `entity.Column`. 

### client.ResultSet

The `client.ResultSet` provides the following methods for you to manipulate the query results.

<table>
   <tr>
     <th><p>Method</p></th>
     <th><p>Return Type</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>GetColumn(fieldName string)</code></p></td>
     <td><p><code>entity.Column</code></p></td>
     <td><p>Return the column with the provided name.</p></td>
   </tr>
   <tr>
     <td><p><code>Len()</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p>Return the number of entities in the query result.</p></td>
   </tr>
   <tr>
     <td><p><code>Slice(start, end int)</code></p></td>
     <td><p><code>client.ResultSet</code></p></td>
     <td><p>Return a slice of the query result.</p></td>
   </tr>
</table>

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- `ErrCollectionNotExists`: The collection with the specified name does not exist.

- The call to this API fails.

## Example

```go
// query
queryRes, errQuery := mc.Query(context.Background(), collectionName, []string{}, "10< id < 20", []string{}, client.WithSearchQueryConsistencyLevel(entity.ClStrong))
if errQuery != nil {
   log.Fatal("failed to query collection:", errQuery.Error())
}
for _, res := range queryRes {
   log.Println(res.Name(), res.FieldData())
}
```
