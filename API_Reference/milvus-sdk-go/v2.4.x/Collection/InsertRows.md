# InsertRows()

This method inserts entities organized in rows into the specified collection.

```go
func (c *GrpcClient) InsertRows(ctx context.Context, collName string, partitionName string, rows []interface{}) (entity.Column, error)
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
     <td><p>Name of the collection to insert data into.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>partitionName</code></p></td>
     <td><p>Name of the partition to insert data into.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>rows</code></p></td>
     <td><p>Data to insert into the specified collection.</p><p>You should include the data for all the fields defined in the collection schema.</p></td>
     <td><p><code>[]interface{}</code></p></td>
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

- InsertRows with struct

```go
// insert rows
rows := make([]interface{}, 0, 2000)
type Row struct {
   ID      int64     `json:"id" milvus:"name:id"`
   Varchar string    `json:"varchar" milvus:"name:varchar"`
   Vector  []float32 `json:"vector" milvus:"name:vector"`
}
for i := 0; i < 2000; i++ {
   v := make([]float32, 0, 768)
   for j := 0; j < 768; j++ {
      v = append(v, rand.Float32())
   }
   row := Row{
      ID:      int64(i),
      Varchar: strconv.Itoa(i),
      Vector:  v,
   }
   rows = append(rows, &row)
}
resInsert, errInsert := mc.InsertRows(context.Background(), collectionName, "", rows)
if errInsert != nil {
   log.Fatal("failed to insert rows:", errInsert.Error())
}
log.Println(resInsert.Name(), resInsert.Len())
```

- InsertRows with map

```shell
// insert rows
rows := make([]interface{}, 0, 2000)
for i := 0; i < 2000; i++ {
   row := make(map[string]interface{})
   v := make([]float32, 0, 768)
   for j := 0; j < 768; j++ {
      v = append(v, rand.Float32())
   }
   row["id"] = int64(i)
   row["varchar"] = strconv.Itoa(i)
   row["vector"] = v

   rows = append(rows, row)
}
resInsert, errInsert := mc.InsertRows(context.Background(), collectionName, "", rows)
if errInsert != nil {
   log.Fatal("failed to insert rows:", errInsert.Error())
}
log.Println(resInsert.Name(), resInsert.Len())
```

- Insert rows with other vectors

```shell
import (
   "context"
   "encoding/binary"
   "log"
   "math"
   "math/rand"

   "github.com/milvus-io/milvus-sdk-go/v2/client"
   "github.com/milvus-io/milvus-sdk-go/v2/entity"
   "github.com/x448/float16"
)

func GenFloat16Vector(dim int64) []byte {
   ret := make([]byte, dim*2)
   for i := 0; i < int(dim); i++ {
      v := float16.Fromfloat32(rand.Float32()).Bits()
      binary.LittleEndian.PutUint16(ret[i*2:], v)
   }
   return ret
}

func GenBFloat16Vector(dim int64) []byte {
   ret16 := make([]uint16, 0, dim)
   for i := 0; i < int(dim); i++ {
      f := rand.Float32()
      bits := math.Float32bits(f)
      bits >>= 16
      bits &= 0x7FFF
      ret16 = append(ret16, uint16(bits))
   }
   ret := make([]byte, len(ret16)*2)
   for i, value := range ret16 {
      binary.LittleEndian.PutUint16(ret[i*2:], value)
   }
   return ret
}

func GenBinaryVector(dim int64) []byte {
   vector := make([]byte, dim/8)
   rand.Read(vector)
   return vector
}

// insert rows
rows := make([]interface{}, 0, 2000)
type Row struct {
   ID        int64                  `json:"id" milvus:"name:id"`
   Float16  []byte                 `json:"fp16" milvus:"name:fp16"`
   BFloat16 []byte                 `json:"bf16" milvus:"name:bf16"`
   Binary   []byte                 `json:"binary" milvus:"name:binary"`
   Sparse   entity.SparseEmbedding `json:"sparse" milvus:"name:sparse"`
}
for j := 0; j < 2000; j++ {
   // sparse vectors
   positions := []uint32{0, 100, 200, 300}
   values := []float32{rand.Float32(), rand.Float32(), rand.Float32(), rand.Float32()}
   sparseEmb, err := entity.NewSliceSparseEmbedding(positions, values)
   if err != nil {
      log.Fatalf("Generate vector failed %s", err)
   }
   row := Row{
      ID:      int64(j),
      Float16: GenFloat16Vector(768),
      BFloat16: GenBFloat16Vector(768),
      Binary: GenBinaryVector(768),
      Sparse: sparseEmb,
   }
   rows = append(rows, &row)
}
resInsert, errInsert := mc.InsertRows(context.Background(), collectionName, "", rows)
if errInsert != nil {
   log.Fatal("failed to insert rows:", errInsert.Error())
}
log.Println(resInsert.Name(), resInsert.Len())
```
