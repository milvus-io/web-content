# getCompactionStateWithPlans()

A MilvusClient interface. This method returns detailed information of a compaction operation, including the state (completed or not) and its sub tasks (i.e. the plans).

```Java
R<GetCompactionPlansResponse> getCompactionStateWithPlans(GetCompactionPlansParam requestParam)
```

## GetCompactionPlansParam

Use the `GetCompactionPlansParam.Builder` to construct a `GetCompactionPlansParam` object.

```Java
import io.milvus.param.GetCompactionPlansParam;
GetCompactionPlansParam.Builder builder = GetCompactionPlansParam.newBuilder();
```

Methods of `GetCompactionPlansParam.Builder`:

| Method                              | Description                                  | Parameters                            |
| ----------------------------------- | -------------------------------------------- | ------------------------------------- |
| `withCompactionID(Long compactionID)` | Sets the ID of the compaction operation to get details of. | `compactionID`: Compaction operation ID. |
| `build()`                             | Constructs a `GetCompactionPlansParam` object.   |       N/A                                |

The `GetCompactionPlansParam.Builder.build()` could throw the following exceptions:

- `ParamException` -- error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetCompactionPlansResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and error message of the exception.

- If the API succeeds, it returns a valid `GetCompactionPlansResponse` held by the R template.

## Example

```Java
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
