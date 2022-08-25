# manualCompact()

A MilvusClient interface. This method manually triggers a compaction operation on the server side.

<div class="alert note">
Compaction is automatically triggerd by the Milvus server under certain conditions.
</div>

```Java
R<ManualCompactionResponse> manualCompact(ManualCompactParam requestParam);
```

## ManualCompactParam

Use the `ManualCompactParam.Builder` to construct a `ManualCompactParam` object.

```Java
import io.milvus.param.ManualCompactParam;
ManualCompactParam.Builder builder = ManualCompactParam.newBuilder();
```

Methods of `ManualCompactParam.Builder`:

| Method                                          | Description                                                  | Parameters                                      |
| ----------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------- |
| `withSourceNodeID(Long srcNodeID)`              | Sets the ID of the source query node in which the sealed segments were loaded. | `srcNodeID`: The ID of the source query node.              |
| `addDestinationNodeID(Long destNodeID)`         | Adds the ID of an target query node to which the sealed segments will be balanced. | `destNodeID`: The ID of the target query node.        |
| `withDestinationNodeID(List<Long> destNodeIDs)` | Sets the ID array of the target query nodes to which the sealed segments will be balanced. | `destNodeIDs`: The ID array of destination query nodes. |
| `addSegmentID(Long segmentID)`                  | Adds the ID of a sealed segment to be balanced.              | `segmentID`: A sealed segment ID.               |
| `withSegmentIDs(List<Long> segmentIDs)`         | Sets the ID array of the sealed segments to be balanced.      | `segmentIDs`: The ID array of sealed segments.      |
| `build()`                                       | Constructs a `ManualCompactParam` object.                    |         N/A                                        |

The `ManualCompactParam.Builder.build()` could throw the following exceptions:

- `ParamException` -- error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<ManualCompactionResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and error message of the exception.

- If the API succeeds, it returns a valid `ManualCompactionResponse` held by the R template. The `ManualCompactionResponse` contains an ID of this compaction operation, of which you can check the state by `getCompactionState()` or `getCompactionStateWithPlans()` method.

## Example

```Java
import io.milvus.param.*;

ManualCompactParam param = ManualCompactParam.newBuilder()
        .withSegmentIDs(segmentIDs)
        .withDestinationNodeID(destNodeID)
        .withSourceNodeID(srcNodeID)
        .build();
R<ManualCompactionResponse> response = client.manualCompact(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

System.out.println("Compaction ID: " + response.getData().getCompactionID());
```
