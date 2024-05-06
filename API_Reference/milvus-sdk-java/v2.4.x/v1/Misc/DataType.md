# DataType

The enum for available data types, defined by RPC proto.

```java
package io.milvus.grpc;
public enum DataType
```

|  **Type**          |  **Code** |  **Description**                                                                                                                                                                                                   |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|  None              |  0        |  For internal usage.                                                                                                                                                                                               |
|  Bool              |  1        |                                                                                                                                                                                                                    |
|  Int8              |  2        |                                                                                                                                                                                                                    |
|  Int16             |  3        |                                                                                                                                                                                                                    |
|  Int32             |  4        |                                                                                                                                                                                                                    |
|  Int64             |  5        |                                                                                                                                                                                                                    |
|  Float             |  10       |                                                                                                                                                                                                                    |
|  Double            |  11       |                                                                                                                                                                                                                    |
|  String            |  20       |  Reserved. Do not use this.                                                                                                                                                                                        |
|  VarChar           |  21       |  Variable-length string with a limit on the maximum length.                                                                                                                                                        |
|  Array             |  22       |  Array data type. The element type can be one of the data types: Int8, Int16, Int32, Int64, Varchar, Bool, Float, or Double.                                                                                       |
|  JSON              |  23       |                                                                                                                                                                                                                    |
|  BinaryVector      |  100      |  Binary vector. Each dimension is represented by 1 bit.                                                                                                                                                            |
|  FloatVector       |  101      |  Float vector. Each dimension is represented by 1 float(4 bits) value.                                                                                                                                             |
|  Float16Vector     |  102      |  Float16 vector. Each dimension is a 16-bit half-precision floating-point number.                                                                                                                                  |
|  BFloat16Vector    |  103      |  BFloat16 vector. Each dimension is a 16-bit floating-point number with reduced precision but the same exponent range as Float32.                                                                                  |
|  SparseFloatVector |  104      |  Sparse vectors represent words or phrases using vector embeddings where most elements are zeros. A sparse vector is a list of key-value pairs, the key type is an unsigned integer and the value type is Float32. |