# Upsert()

This method updates or inserts data into the specified collection.

```go
func (c *GrpcClient) Upsert(ctx context.Context, collName string, partitionName string, columns ...entity.Column) (entity.Column, error)
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
     <td><p>Name of the collection to update or insert data into.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>partitionName</code></p></td>
     <td><p>Name of the partition to update or insert data into.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>columns</code></p></td>
     <td><p>Data to update or insert into the specified collection.</p><p>You should include the data for all the fields defined in the collection schema.</p></td>
     <td><p><code>...entity.Column</code></p></td>
   </tr>
</table>

## Return

`entity.Column`

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- `ErrCollectionNotExists`: The collection with the specified name does not exist.

- The specified field is invalid.

- The call to this API fails.

## Example

```go
// upsert
pkValues := make([]int64, 0, 100)
varcharValues := make([]string, 0, 100)
vectors:= make([][]float32, 0, 100)
for i := 0; i < 100; i++ {
   pkValues = append(pkValues, int64(i+1))
   varcharValues = append(varcharValues, "bbb")
   v := make([]float32, 0, 768)
   for j := 0; j < 768; j++ {
      v = append(v, rand.Float32())
   }
   vectors = append(vectors, v)
}
resUpsert, errUpsert := mc.Upsert(context.Background(),
   collectionName,
   "",
   entity.NewColumnInt64("id", pkValues),
   entity.NewColumnVarChar("varchar", varcharValues),
   entity.NewColumnFloatVector("vector", 768, vectors),
   )
if errUpsert != nil {
   log.Fatal("failed to upsert data:", errUpsert.Error())
}
log.Println(resUpsert.Name(), resUpsert.Len())
```

