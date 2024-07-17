# IndexType

The enumeration for available index types.

```java
package io.milvus.param;
public enum IndexType
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
     <td><p>FLAT</p></td>
     <td><p>1</p></td>
     <td><p>Works for FloatVector/Float16Vector/BFloat16Vector type field.</p></td>
   </tr>
   <tr>
     <td><p>IVF_FLAT</p></td>
     <td><p>2</p></td>
     <td><p>Works for FloatVector/Float16Vector/BFloat16Vector type field.</p></td>
   </tr>
   <tr>
     <td><p>IVF_SQ8</p></td>
     <td><p>3</p></td>
     <td><p>Works for FloatVector/Float16Vector/BFloat16Vector type field.</p></td>
   </tr>
   <tr>
     <td><p>IVF_PQ</p></td>
     <td><p>4</p></td>
     <td><p>Works for FloatVector/Float16Vector/BFloat16Vector type field.</p></td>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p>5</p></td>
     <td><p>Works for FloatVector/Float16Vector/BFloat16Vector type field.</p></td>
   </tr>
   <tr>
     <td><p>DISKANN</p></td>
     <td><p>10</p></td>
     <td><p>Works for FloatVector/Float16Vector/BFloat16Vector type field.</p></td>
   </tr>
   <tr>
     <td><p>AUTOINDEX</p></td>
     <td><p>11</p></td>
     <td><p>Works for FloatVector/Float16Vector/BFloat16Vector type field. The auto index parameters are defined in the milvus.yaml.</p></td>
   </tr>
   <tr>
     <td><p>SCANN</p></td>
     <td><p>12</p></td>
     <td><p>Works for FloatVector/Float16Vector/BFloat16Vector type field.</p></td>
   </tr>
   <tr>
     <td><p>GPU<em>IVF</em>FLAT</p></td>
     <td><p>50</p></td>
     <td><p>Only for FloatVector type field. Only works when the server is GPU mode.</p></td>
   </tr>
   <tr>
     <td><p>GPU<em>IVF</em>PQ</p></td>
     <td><p>51</p></td>
     <td><p>Only for FloatVector type field. Only works when the server is GPU mode.</p></td>
   </tr>
   <tr>
     <td><p>GPU<em>BRUTE</em>FORCE</p></td>
     <td><p>52</p></td>
     <td><p>Only for FloatVector type field. Only works when the server is GPU mode.</p></td>
   </tr>
   <tr>
     <td><p>GPU_CAGRA</p></td>
     <td><p>53</p></td>
     <td><p>Only for FloatVector type field. Only works when the server is GPU mode.</p></td>
   </tr>
   <tr>
     <td><p>BIN_FLAT</p></td>
     <td><p>80</p></td>
     <td><p>Only for BinaryVector type field.</p></td>
   </tr>
   <tr>
     <td><p>BIN<em>IVF</em>FLAT</p></td>
     <td><p>81</p></td>
     <td><p>Only for BinaryVector type field.</p></td>
   </tr>
   <tr>
     <td><p>TRIE</p></td>
     <td><p>100</p></td>
     <td><p>Only for VarChar type field.</p></td>
   </tr>
   <tr>
     <td><p>STL_SORT</p></td>
     <td><p>200</p></td>
     <td><p>Only for numeric type field.</p></td>
   </tr>
   <tr>
     <td><p>INVERTED</p></td>
     <td><p>201</p></td>
     <td><p>Works for all scalar fields except JSON type field.</p></td>
   </tr>
   <tr>
     <td><p>SPARSE<em>INVERTED</em>INDEX</p></td>
     <td><p>300</p></td>
     <td><p>Only for SparseFloatVector type field.</p></td>
   </tr>
   <tr>
     <td><p>SPARSE_WAND</p></td>
     <td><p>301</p></td>
     <td><p>Only for SparseFloatVector type field.</p></td>
   </tr>
</table>
