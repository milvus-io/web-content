# IndexType

The enumeration for available index types.

```java
package io.milvus.param;
public enum IndexType
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
     <td>FLAT<br/></td>
     <td>1</td>
     <td>Only for FloatVector type field.</td>
   </tr>
   <tr>
     <td>IVF_FLAT</td>
     <td>2</td>
     <td>Only for FloatVector type field.</td>
   </tr>
   <tr>
     <td>IVF_SQ8</td>
     <td>3</td>
     <td>Only for FloatVector type field.</td>
   </tr>
   <tr>
     <td>IVF_PQ</td>
     <td>4</td>
     <td>Only for FloatVector type field.</td>
   </tr>
   <tr>
     <td>HNSW</td>
     <td>5</td>
     <td>Only for FloatVector type field.</td>
   </tr>
   <tr>
     <td>DISKANN<br/></td>
     <td>10</td>
     <td>Only for FloatVector type field.</td>
   </tr>
   <tr>
     <td>AUTOINDEX</td>
     <td>11</td>
     <td>Only for FloatVector type field. The auto index parameters are defined in the milvus.yaml.</td>
   </tr>
   <tr>
     <td>SCANN</td>
     <td>12</td>
     <td>Only for FloatVector type field.</td>
   </tr>
   <tr>
     <td>GPU<em>IVF</em>FLAT</td>
     <td>50</td>
     <td>Only for FloatVector type field. Only works when server is GPU mode</td>
   </tr>
   <tr>
     <td>GPU<em>IVF</em>PQ</td>
     <td>51</td>
     <td>Only for FloatVector type field. Only works when server is GPU mode</td>
   </tr>
   <tr>
     <td>BIN_FLAT</td>
     <td>80</td>
     <td>Only for BinaryVector type field.</td>
   </tr>
   <tr>
     <td>BIN<em>IVF</em>FLAT</td>
     <td>81</td>
     <td>Only for BinaryVector type field.</td>
   </tr>
   <tr>
     <td>TRIE</td>
     <td>100</td>
     <td>Only for VarChar type field</td>
   </tr>
   <tr>
     <td>STL_SORT</td>
     <td>200</td>
     <td>Only for scalar type field</td>
   </tr>
</table>
