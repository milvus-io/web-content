# getCompactionState()

MilvusClient interface. This method returns the state of a compaction operation, to know whether this operation has been finished.

```java
R<GetCompactionStateResponse> getCompactionState(GetCompactionStateParam requestParam);
```

#### GetCompactionStateParam

Use the `GetCompactionStateParam.Builder` to construct a `GetCompactionStateParam` object.

```java
import io.milvus.param.GetCompactionStateParam;
GetCompactionStateParam.Builder builder = GetCompactionStateParam.newBuilder();
```

Methods of `GetCompactionStateParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCompactionID(Long compactionID)</p></td>
        <td><p>Set the compaction action id to get state.</p></td>
        <td><p>compactionID: The compaction operation ID.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a GetCompactionStateParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `GetCompactionStateParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<GetCompactionStateResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `GetCompactionStateResponse` held by the `R` template.

#### CompactionState

Use the `getState()` of `GetCompactionStateResponse` to get the compaction state:

```java
package io.milvus.grpc;
public enum CompactionState
```

<table>
   <tr>
     <th><p><strong>Type</strong></p></th>
     <th><p><strong>Code</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p><em>UndefiedState</em></p></td>
     <td><p>0</p></td>
     <td><p>For internal usage.</p></td>
   </tr>
   <tr>
     <td><p><em>Executing</em></p></td>
     <td><p>1</p></td>
     <td><p>Compaction is in executing</p></td>
   </tr>
   <tr>
     <td><p><em>Completed</em></p></td>
     <td><p>2</p></td>
     <td><p>Compaction is completed</p></td>
   </tr>
</table>

#### Example

```java
import io.milvus.param.*;
import io.milvus.grpc.GetCompactionStateResponse;

GetCompactionStateParam param = GetCompactionStateParam.newBuilder()
        .withCompactionID(compactionID)
        .build();
R<GetCompactionStateResponse> response = client.getCompactionState(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

System.out.println("Compaction state: " + response.getData().getState());
```
