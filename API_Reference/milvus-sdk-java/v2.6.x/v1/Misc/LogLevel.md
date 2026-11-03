# LogLevel

The enumeration for setting log level in runtime.

```java
package io.milvus.param;
public enum LogLevel
```

<table>
   <tr>
     <th><p><strong>Type</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p>Debug</p></td>
     <td><p>Debug level, All the logs are visible.</p></td>
   </tr>
   <tr>
     <td><p>Info</p></td>
     <td><p>Debug level, information, warning, error logs are visible.</p></td>
   </tr>
   <tr>
     <td><p>Warning</p></td>
     <td><p>Debug level, warning and error logs are visible.</p></td>
   </tr>
   <tr>
     <td><p>Error</p></td>
     <td><p>Error level, only error logs are visible.</p></td>
   </tr>
</table>

## Example

```java
import io.milvus.client.MilvusServiceClient;
import io.milvus.param.ConnectParam;
import io.milvus.param.LogLevel;

ConnectParam connectParam = ConnectParam.newBuilder()
        .withHost("localhost")
        .withPort(19530)
        .withAuthorization("root", "Milvus")
        .build();

MilvusServiceClient client = new MilvusServiceClient(connectParam);
client.setLogLevel(LogLevel.Info);
client.close(1);
```
