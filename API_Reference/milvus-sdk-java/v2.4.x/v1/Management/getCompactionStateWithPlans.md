# getCompactionStateWithPlans()

MilvusClient interface. This method returns detailed information of a compaction operation, including the state(completed or not) and its sub-tasks (we call "plan").

```java
R<GetCompactionPlansResponse> getCompactionStateWithPlans(GetCompactionPlansParam requestParam)
```

#### GetCompactionPlansParam

Use the `GetCompactionPlansParam.Builder` to construct a `GetCompactionPlansParam` object.

```java
import io.milvus.param.GetCompactionPlansParam;
GetCompactionPlansParam.Builder builder = GetCompactionPlansParam.newBuilder();
```

Methods of `GetCompactionPlansParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCompactionID(Long compactionID)</p></td>
        <td><p>Set the compaction action id to get details.</p></td>
        <td><p>compactionID: The compaction operation ID.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a GetCompactionPlansParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `GetCompactionPlansParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<GetCompactionPlansResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `GetCompactionPlansResponse` held by the `R` template.

#### Example

```java
import io.milvus.param.*;
import io.milvus.grpc.GetCompactionPlansResponse;
import io.milvus.grpc.CompactionMergeInfo;

GetCompactionPlansParam param = GetCompactionPlansParam.newBuilder()
        .withCompactionID(compactionID)
        .build();
R<GetCompactionPlansResponse> response = client.getCompactionStateWithPlans(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

GetCompactionPlansResponse compactionPlans = response.getData();
System.out.println("Compaction state: " + compactionPlans.getState());

for (int i = 0; i < compactionPlans.getMergeInfosCount(); i++) {
    CompactionMergeInfo info = compactionPlans.getMergeInfos(i);
    System.out.println("Merge segments " + info.getSourcesList().toString() + " into new segment " + info.getTarget());
}
```
