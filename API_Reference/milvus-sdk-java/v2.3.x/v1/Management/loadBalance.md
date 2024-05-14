# loadBalance()

MilvusClient interface. This method moves segments from one query node to another to keep the load balanced. 

<div class="admonition note">

<p><b>notes</b></p>

<p>Milvus server has its internal machinery to keep the load balanced, sometimes the segments might be moved back.</p>

</div>

```java
R<RpcStatus> loadBalance(LoadBalanceParam requestParam);
```

## LoadBalanceParam

Use the `LoadBalanceParam.Builder` to construct a `LoadBalanceParam` object.

```java
import io.milvus.param.LoadBalanceParam;
LoadBalanceParam.Builder builder = LoadBalanceParam.newBuilder();
```

Methods of `LoadBalanceParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withSourceNodeID(Long srcNodeID)</td>
        <td>Set the ID of source query node in which the sealed segments were loaded.</td>
        <td>srcNodeID: The source query node ID.</td>
    </tr>
    <tr>
        <td>addDestinationNodeID(Long destNodeID)</td>
        <td>Add the ID of destination query node to which the sealed segments will be balanced.</td>
        <td>destNodeID: The destination query node ID.</td>
    </tr>
    <tr>
        <td>withDestinationNodeID(List\<Long> destNodeIDs)</td>
        <td>Set an ID array of the destination query nodes to which the sealed segments will be balance.</td>
        <td>destNodeIDs: The destination query node ID array.</td>
    </tr>
    <tr>
        <td>addSegmentID(Long segmentID)</td>
        <td>Add a sealed segment ID which to be balanced.</td>
        <td>segmentID: A sealed segment ID.</td>
    </tr>
    <tr>
        <td>withSegmentIDs(List\<Long> segmentIDs)</td>
        <td>Set an ID array of sealed segments which to be balanced.</td>
        <td>segmentIDs: The sealed segments ID array.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a LoadBalanceParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `LoadBalanceParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```java
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
