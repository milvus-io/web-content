# getCompactionState()

MilvusClient interface. This method returns the state of a compaction operation, to know whether this operation has been finished.

```java
R<GetCompactionStateResponse> getCompactionState(GetCompactionStateParam requestParam);
```

## GetCompactionStateParam

Use the `GetCompactionStateParam.Builder` to construct a `GetCompactionStateParam` object.

```java
import io.milvus.param.GetCompactionStateParam;
GetCompactionStateParam.Builder builder = GetCompactionStateParam.newBuilder();
```

Methods of `GetCompactionStateParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCompactionID(Long compactionID)</td>
        <td>Set the compaction action id to get state.</td>
        <td>compactionID: The compaction operation ID.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a GetCompactionStateParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `GetCompactionStateParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetCompactionStateResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `GetCompactionStateResponse` held by the `R` template.

## CompactionState

Use the `getState()` of `GetCompactionStateResponse` to get the compaction state:

```java
package io.milvus.grpc;
public enum CompactionState
```

<table>
   <tr>
     <th><strong>Type</strong></th>
     <th><strong>Code</strong></th>
     <th><strong>Description</strong></th>
   </tr>
   <tr>
     <td><em>UndefiedState</em></td>
     <td>0</td>
     <td>For internal usage.</td>
   </tr>
   <tr>
     <td><em>Executing</em></td>
     <td>1</td>
     <td>Compaction is in executing</td>
   </tr>
   <tr>
     <td><em>Completed</em></td>
     <td>2</td>
     <td>Compaction is completed</td>
   </tr>
</table>

## Example

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
