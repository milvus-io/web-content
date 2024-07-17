# Vectors

The types on this page implemented the method signatures of the [entity.Vector](Search.md#entityvector) interface.

## entity.BFloat16Vector

This byte slice type serves as a wrapper for BFloat16 vector embeddings. You can instantiate an `entity.BFloat16Vector` as follows:

```go
import (
   "encoding/binary"
   "math"
   "math/rand"

   "github.com/milvus-io/milvus-sdk-go/v2/entity"
)
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

vectors := make([]entity.Vector, 0, 5)
for i := 0; i < 5; i++ {
   vectors = append(vectors, entity.BFloat16Vector(GenBFloat16Vector(768)))
}
```

## entity.BinaryVector

This byte slice type serves as a wrapper for binary vector embeddings. You can instantiate an `entity.BinaryVector` as follows:

```go
import (
   "math/rand"

   "github.com/milvus-io/milvus-sdk-go/v2/entity"
)
func GenBinaryVector(dim int64) []byte {
   vector := make([]byte, dim/8)
   rand.Read(vector)
   return vector
}

vectors := make([]entity.Vector, 0, 5)
for i := 0; i < 5; i++ {
   vectors = append(vectors, entity.BinaryVector(GenBinaryVector(768)))
}
```

## entity.Float16Vector

This byte slice type serves as a wrapper for Float16 vector embeddings. You can instantiate an `entity.Float16Vector` as follows:

```go
import (
   "encoding/binary"
   "math/rand"

   "github.com/x448/float16"

   "github.com/milvus-io/milvus-sdk-go/v2/entity"
)

func GenFloat16Vector(dim int64) []byte {
   ret := make([]byte, dim*2)
   for i := 0; i < int(dim); i++ {
      v := float16.Fromfloat32(rand.Float32()).Bits()
      binary.LittleEndian.PutUint16(ret[i*2:], v)
   }
   return ret
}
vectors := make([]entity.Vector, 0, 5)
for i := 0; i < 5; i++ {
   vectors = append(vectors, entity.Float16Vector(GenFloat16Vector(768)))
}
```

## entity.FloatVector

This float32 slice type serves as a wrapper for float vector embeddings. You can instantiate an `entity.FloatVector` as follows:

```go
import (
   "math/rand"

   "github.com/milvus-io/milvus-sdk-go/v2/entity"
)

func GenFloat32Vector(dim int64) []float32 {
   vector := make([]float32, 0, dim)
   for j := 0; j < int(dim); j++ {
      vector = append(vector, rand.Float32())
   }
   return vector
}

vectors := make([]entity.Vector, 0, 5)
for i := 0; i < 5; i++ {
   vectors = append(vectors, entity.FloatVector(GenFloat32Vector(768)))
}
```

## entity.SparseEmbedding

This interface defines the method signatures as follows:

```go
type SparseEmbedding interface {
    Dim() int // the dimension
    Len() int // the actual items in this vector
    Get(idx int) (pos uint32, value float32, ok bool)
    Serialize() []byte
    FieldType() FieldType
}
```

<table>
   <tr>
     <th><p>Method</p></th>
     <th><p>Return Type</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>Dim()</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p>Return the dimensionality of the sparse vector.</p></td>
   </tr>
   <tr>
     <td><p><code>Len()</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p>Return the length of the sparse vector.</p></td>
   </tr>
   <tr>
     <td><p><code>Get(idx int)</code></p></td>
     <td><p><code>pos unit32, value float32, ok bool</code></p></td>
     <td><p>Return a slice of the sparse vector.</p></td>
   </tr>
   <tr>
     <td><p><code>Serialize()</code></p></td>
     <td><p><code>[]byte</code></p></td>
     <td><p>Return the serialized representation of the vector.</p></td>
   </tr>
   <tr>
     <td><p><code>FieldType()</code></p></td>
     <td><p><code>entity.FieldType</code></p></td>
     <td><p>Return the field type of the vector.</p></td>
   </tr>
</table>

You can use the `entity.NewSliceSparseEmbedding()` method to create a sparse vector as follows:

```go
vectors, err := entity.NewSliceSparseEmbedding(positions []uint32, values []float32)
```

