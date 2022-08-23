# loadBalance()

A MilvusClient interface. This method moves segment from a query node to another to keep the load balanced. 

</div class="alert note"> 

Milvus server has its internal machinery to keep load balanced, sometimes the segments might be moved back.

</div>

```Java
R<RpcStatus> loadBalance(LoadBalanceParam requestParam);
```

## LoadBalanceParam

Use the `LoadBalanceParam.Builder` to construct a `LoadBalanceParam` object.

```Java
import io.milvus.param.LoadBalanceParam;
LoadBalanceParam.Builder builder = LoadBalanceParam.newBuilder();
```

Methods of `LoadBalanceParam.Builder`:

| Method                                          | Description                                                  | Parameters                                      |
| ----------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------- |
| `withSourceNodeID(Long srcNodeID)`              | Sets the ID of source query node in which the sealed segments were loaded. | `srcNodeID`: Source query node ID.              |
| `addDestinationNodeID(Long destNodeID)`         | Adds the ID of the destination query node to which the sealed segments will be balanced. | `destNodeID`: Destination query node ID.        |
| `withDestinationNodeID(List<Long> destNodeIDs)` | Sets the ID array of the destination query nodes to which the sealed segments will be balanced. | `destNodeIDs`: Destination query node ID array. |
| `addSegmentID(Long segmentID)`                  | Adds the ID of the sealed segment to be balanced.               | `segmentID`: Sealed segment ID.               |
| `withSegmentIDs(List<Long> segmentIDs)`         | Sets the ID array of the sealed segments to be balanced.          | `segmentIDs`: ID array of sealed segments.         |
| `build()`                                       | Constructs a `LoadBalanceParam` object.                      | N/A                                             |

The`LoadBalanceParam.Builder.build()` could throw the following exceptions:

- `ParamException` -- error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```Java
import io.milvus.param.*;

LoadBalanceParam param = LoadBalanceParam.newBuilder()
        .withSegmentIDs(segmentIDs)
        .withDestinationNodeID(destNodeID)
        .withSourceNodeID(srcNodeID)
        .build();
R<RpcStatus> response = client.loadBalance(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
