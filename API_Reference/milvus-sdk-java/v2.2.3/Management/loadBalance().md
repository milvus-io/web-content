# loadBalance()

A MilvusClient interface. This method moves segments from one query node to another to balance the query load on multiple query nodes. 

<div class="alert note"> 
The Milvus server adopts an internal <a href="https://milvus.io/blog/2022-02-28-how-milvus-balances-query-load-across-nodes.md">mechanism for load balance</a>. Sometimes, segments that have been moved from one query node to another might be moved back.
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
| `withSourceNodeID(Long srcNodeID)`              | Sets the ID of the source query node in which the sealed segments were loaded. | `srcNodeID`: The ID of the source query node.              |
| `addDestinationNodeID(Long destNodeID)`         | Adds the ID of the target query node to which the sealed segments will be moved for load balance. | `destNodeID`: The ID of the target query node.        |
| `withDestinationNodeID(List<Long> destNodeIDs)` | Sets the ID array of the target query nodes to which the sealed segments will be moved for load balance. | `destNodeIDs`: An array of the IDs of the target query nodes. |
| `addSegmentID(Long segmentID)`                  | Adds the ID of the sealed segment to be moved for load balance.               | `segmentID`: The ID of the sealed segment to be moved.               |
| `withSegmentIDs(List<Long> segmentIDs)`         | Sets the ID array of the sealed segments to be moved for load balance.          | `segmentIDs`: An array of the IDs of the sealed segments that needs to be moved.         |
| `build()`                                       | Constructs a `LoadBalanceParam` object.                      | N/A                                             |

The`LoadBalanceParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

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
