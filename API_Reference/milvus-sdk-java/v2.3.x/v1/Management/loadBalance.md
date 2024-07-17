# loadBalance()

MilvusClient interface. This method moves segments from one query node to another to keep the load balanced. 

<div class="admonition note">

<p><b>notes</b></p>

<p>Milvus server has its internal machinery to keep the load balanced, sometimes the segments might be moved back.</p>

</div>

```java
R<RpcStatus> loadBalance(LoadBalanceParam requestParam);
```

#### LoadBalanceParam

Use the `LoadBalanceParam.Builder` to construct a `LoadBalanceParam` object.

```java
import io.milvus.param.LoadBalanceParam;
LoadBalanceParam.Builder builder = LoadBalanceParam.newBuilder();
```

Methods of `LoadBalanceParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withSourceNodeID(Long srcNodeID)</p></td>
        <td><p>Set the ID of source query node in which the sealed segments were loaded.</p></td>
        <td><p>srcNodeID: The source query node ID.</p></td>
    </tr>
    <tr>
        <td><p>addDestinationNodeID(Long destNodeID)</p></td>
        <td><p>Add the ID of destination query node to which the sealed segments will be balanced.</p></td>
        <td><p>destNodeID: The destination query node ID.</p></td>
    </tr>
    <tr>
        <td><p>withDestinationNodeID(List&lt;Long> destNodeIDs)</p></td>
        <td><p>Set an ID array of the destination query nodes to which the sealed segments will be balance.</p></td>
        <td><p>destNodeIDs: The destination query node ID array.</p></td>
    </tr>
    <tr>
        <td><p>addSegmentID(Long segmentID)</p></td>
        <td><p>Add a sealed segment ID which to be balanced.</p></td>
        <td><p>segmentID: A sealed segment ID.</p></td>
    </tr>
    <tr>
        <td><p>withSegmentIDs(List&lt;Long> segmentIDs)</p></td>
        <td><p>Set an ID array of sealed segments which to be balanced.</p></td>
        <td><p>segmentIDs: The sealed segments ID array.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a LoadBalanceParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `LoadBalanceParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

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
