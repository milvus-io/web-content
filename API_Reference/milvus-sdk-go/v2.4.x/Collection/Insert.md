# Insert()

This method inserts entities organized in columns into the specified collection.

```go
func (c *GrpcClient) Insert(ctx context.Context, collName string, partitionName string, columns ...entity.Column) (entity.Column, error)
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
     <td><p><code>columns</code></p></td>
     <td><p>Data to insert into the specified collection.</p><p>You should include the data for all the fields defined in the collection schema.</p></td>
     <td><p><code>...entity.Column</code></p></td>
   </tr>
</table>

### entity.Column

This interface type defines a set of method signatures as follows.

```go
type Column interface {
    Name() string
    Type() FieldType
    Len() int
    Slice(int, int) Column
    AppendValue(interface{}) error
    Get(int) (interface{}, error)
    GetAsInt64(int) (int64, error)
    GetAsString(int) (string, error)
    GetAsDouble(int) (float64, error)
    GetAsBool(int) (bool, error)
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
     <td><p>Return the column name.</p></td>
   </tr>
   <tr>
     <td><p><code>Type()</code></p></td>
     <td><p><code>entity.FieldType</code></p></td>
     <td><p>Return the column data type.</p></td>
   </tr>
   <tr>
     <td><p><code>Len()</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p>Return the number of rows in the column.</p></td>
   </tr>
   <tr>
     <td><p><code>Slice(int, int)</code></p></td>
     <td><p><code>entity.Column</code></p></td>
     <td><p>Return a column that contains the specified rows from the column.</p></td>
   </tr>
   <tr>
     <td><p><code>AppendValue(interface{})</code></p></td>
     <td><p><code>error</code></p></td>
     <td><p>Append values to the column.</p></td>
   </tr>
   <tr>
     <td><p><code>Get(int)</code></p></td>
     <td><p><code>interface{}, error</code></p></td>
     <td><p>Return the value at the specified ID in the column or an error.</p></td>
   </tr>
   <tr>
     <td><p><code>GetAsInt64(int)</code></p></td>
     <td><p><code>int64, error</code></p></td>
     <td><p>Converts the value at the specified ID in the column to an Int64 number and returns the converted value or an error.</p></td>
   </tr>
   <tr>
     <td><p><code>GetAsString(int)</code></p></td>
     <td><p><code>string, error</code></p></td>
     <td><p>Converts the value at the specified ID in the column to a string and returns the converted value or an error.</p></td>
   </tr>
   <tr>
     <td><p><code>GetAsDouble(int)</code></p></td>
     <td><p><code>float64, error</code></p></td>
     <td><p>Converts the value at the specified ID in the column to a Float64 number and returns the converted value or an error.</p></td>
   </tr>
   <tr>
     <td><p><code>GetAsBool(int)</code></p></td>
     <td><p><code>bool, error</code></p></td>
     <td><p>Converts the value at the specified ID in the column to a boolean and returns the converted value or an error.</p></td>
   </tr>
</table>

For details on the struct types that implement the above method signatures, refer to [Columns](Columns.md).

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
// insert
pkValues := make([]int64, 0, 2000)
varcharValues := make([]string, 0, 2000)
vectors:= make([][]float32, 0, 2000)
for i := 0; i < 2000; i++ {
   pkValues = append(pkValues, int64(i))
   varcharValues = append(varcharValues, "aa")
   v := make([]float32, 0, 768)
   for j := 0; j < 768; j++ {
      v = append(v, rand.Float32())
   }
   vectors = append(vectors, v)
}
resInsert, errInsert := mc.Insert(context.Background(),
   collectionName,
   "",
   entity.NewColumnInt64("id", pkValues),
   entity.NewColumnVarChar("varchar", varcharValues),
   entity.NewColumnFloatVector("vector", 768, vectors),
   )
if errInsert != nil {
   log.Fatal("failed to insert data:", errInsert.Error())
}
log.Println(resInsert.Name(), resInsert.Len())
```

- Other vectors

```shell
import (
   "context"
   "encoding/binary"
   "log"
   "math"
   "math/rand"
   "strconv"

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

// insert
pkValues := make([]int64, 0, 2000)
binaryVectors := make([][]byte, 0, 2000)
fp16Vectors := make([][]byte, 0, 2000)
bf16Vectors := make([][]byte, 0, 2000)
sparseVectors := make([]entity.SparseEmbedding, 0, 2000)
for j := 0; j < 2000; j++ {
   pkValues = append(pkValues, int64(j+1))
   // binary vectors
   binaryVectors = append(binaryVectors, GenBinaryVector(768))
   // fp16 vectors
   fp16Vectors = append(fp16Vectors, GenFloat16Vector(768))
   // bf16 vectors
   bf16Vectors = append(bf16Vectors, GenBFloat16Vector(768))
   // sparse vectors
   positions := []uint32{0, 100, 200, 300}
   values := []float32{rand.Float32(), rand.Float32(), rand.Float32(), rand.Float32()}
   sparseEmb, err := entity.NewSliceSparseEmbedding(positions, values)
   if err != nil {
      log.Fatalf("Generate vector failed %s", err)
   }
   sparseVectors = append(sparseVectors, sparseEmb)
}
resInsert, errInsert := mc.Insert(context.Background(),
   collectionName,
   "",
   entity.NewColumnInt64("id", pkValues),
   entity.NewColumnBinaryVector("binary", 768, binaryVectors),
   entity.NewColumnFloat16Vector("fp16", 768, fp16Vectors),
   entity.NewColumnBFloat16Vector("bf16", 768, bf16Vectors),
   entity.NewColumnSparseVectors("sparse", sparseVectors),
   )
if errInsert != nil {
   log.Fatal("failed to insert data:", errInsert.Error())
}
log.Println(resInsert.Name(), resInsert.Len())
```
