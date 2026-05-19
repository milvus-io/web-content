# MetricType

The enumeration for available metric types.

```java
package io.milvus.param;
public enum MetricType
```

<table>
   <tr>
     <th><p><strong>Type</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p>NONE</p></td>
     <td><p>For internal usage.</p></td>
   </tr>
   <tr>
     <td><p>L2</p></td>
     <td><p>Euclidean distance. Only for float vectors.</p></td>
   </tr>
   <tr>
     <td><p>IP</p></td>
     <td><p>Inner product. Only for normalized float vectors.</p></td>
   </tr>
   <tr>
     <td><p>COSINE</p></td>
     <td><p>Cosine similarity. Only for float vectors</p></td>
   </tr>
   <tr>
     <td><p>HAMMING</p></td>
     <td><p>Only for binary vectors.</p></td>
   </tr>
   <tr>
     <td><p>JACCARD</p></td>
     <td><p>Only for binary vectors.</p></td>
   </tr>
</table>
