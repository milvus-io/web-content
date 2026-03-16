# DataType

The enum for available data types, defined by RPC proto.

```java
package io.milvus.grpc;
public enum DataType
```

<table>
   <tr>
     <th><p><strong>Type</strong></p></th>
     <th><p><strong>Code</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p>None</p></td>
     <td><p>0</p></td>
     <td><p>For internal usage.</p></td>
   </tr>
   <tr>
     <td><p>Bool</p></td>
     <td><p>1</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>Int8</p></td>
     <td><p>2</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>Int16</p></td>
     <td><p>3</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>Int32</p></td>
     <td><p>4</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>Int64</p></td>
     <td><p>5</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>Float</p></td>
     <td><p>10</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>Double</p></td>
     <td><p>11</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>String</p></td>
     <td><p>20</p></td>
     <td><p>Reserved. Do not use this.</p></td>
   </tr>
   <tr>
     <td><p>VarChar</p></td>
     <td><p>21</p></td>
     <td><p>Variable-length string with a limit on the maximum length.</p></td>
   </tr>
   <tr>
     <td><p>Array</p></td>
     <td><p>22</p></td>
     <td><p>Array data type. The element type can be one of the data types: Int8, Int16, Int32, Int64, Varchar, Bool, Float, or Double.</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>23</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>BinaryVector</p></td>
     <td><p>100</p></td>
     <td><p>Binary vector. Each dimension is represented by 1 bit.</p></td>
   </tr>
   <tr>
     <td><p>FloatVector</p></td>
     <td><p>101</p></td>
     <td><p>Float vector. Each dimension is represented by 1 float(4 bits) value.</p></td>
   </tr>
   <tr>
     <td><p>Float16Vector</p></td>
     <td><p>102</p></td>
     <td><p>Float16 vector. Each dimension is a 16-bit half-precision floating-point number.</p></td>
   </tr>
   <tr>
     <td><p>BFloat16Vector</p></td>
     <td><p>103</p></td>
     <td><p>BFloat16 vector. Each dimension is a 16-bit floating-point number with reduced precision but the same exponent range as Float32.</p></td>
   </tr>
   <tr>
     <td><p>SparseFloatVector</p></td>
     <td><p>104</p></td>
     <td><p>Sparse vectors represent words or phrases using vector embeddings where most elements are zeros. A sparse vector is a list of key-value pairs, the key type is an unsigned integer and the value type is Float32.</p></td>
   </tr>
</table>
