# DataType

The enum for available data types, defined by RPC proto.

```java
package io.milvus.grpc;
public enum DataType
```

<table>
   <tr>
     <th><strong>Type</strong></th>
     <th><strong>Code</strong></th>
     <th><strong>Description</strong></th>
   </tr>
   <tr>
     <td>None</td>
     <td>0</td>
     <td>For internal usage.</td>
   </tr>
   <tr>
     <td>Bool</td>
     <td>1</td>
     <td></td>
   </tr>
   <tr>
     <td>Int8</td>
     <td>2</td>
     <td></td>
   </tr>
   <tr>
     <td>Int16</td>
     <td>3</td>
     <td></td>
   </tr>
   <tr>
     <td>Int32</td>
     <td>4</td>
     <td></td>
   </tr>
   <tr>
     <td>Int64</td>
     <td>5</td>
     <td></td>
   </tr>
   <tr>
     <td>Float</td>
     <td>10</td>
     <td></td>
   </tr>
   <tr>
     <td>Double</td>
     <td>11</td>
     <td></td>
   </tr>
   <tr>
     <td>String</td>
     <td>20</td>
     <td>Reserved. Do not use this.</td>
   </tr>
   <tr>
     <td>VarChar</td>
     <td>21</td>
     <td>Variable-length string with a limit on the maximum length.</td>
   </tr>
   <tr>
     <td>Array</td>
     <td>22</td>
     <td>Array data type. The element type can be one of the data types: Int8, Int16, Int32, Int64, Varchar, Bool, Float, or Double.</td>
   </tr>
   <tr>
     <td>JSON</td>
     <td>23</td>
     <td></td>
   </tr>
   <tr>
     <td>BinaryVector</td>
     <td>100</td>
     <td>Binary vector. Each dimension is represented by 1 bit.</td>
   </tr>
   <tr>
     <td>FloatVector</td>
     <td>101</td>
     <td>Float vector. Each dimension is represented by 1 float(4 bits) value.</td>
   </tr>
</table>
