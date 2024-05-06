# manualCompact()

MilvusClient interface. This method triggers a compaction operation on the server side.

<div class="admonition note">

<p><b>notes</b></p>

<p>Milvus server can automatically trigger compaction operation in certain conditions.</p>

</div>

```java
R<ManualCompactionResponse> manualCompact(ManualCompactParam requestParam);
```

## ManualCompactParam

Use the `ManualCompactParam.Builder` to construct a `ManualCompactParam` object.

```java
import io.milvus.param.ManualCompactParam;
ManualCompactParam.Builder builder = ManualCompactParam.newBuilder();
```

Methods of `ManualCompactParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The target collection name.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a ManualCompactParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `ManualCompactParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<ManualCompactionResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `ManualCompactionResponse` held by the `R` template. The `ManualCompactionResponse` contains an ID of this compaction operation, which you can check the state by `getCompactionState()` or `getCompactionStateWithPlans()` method.

## Example

```java
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
