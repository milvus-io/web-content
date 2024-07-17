# getFlushAllState()

MilvusClient interface. This method tests whether specified segments are flushed.

```java
R<GetFlushAllStateResponse> getFlushAllState(GetFlushAllStateParam requestParam);
```

#### GetFlushAllStateParam

Use the GetFlushAllStateParam.Builder to construct a `GetFlushAllStateParam` object.

```java
import io.milvus.param.GetFlushAllStateParam;
GetFlushAllStateParam.Builder builder = GetFlushAllStateParam.newBuilder();
```

Methods of `GetFlushAllStateParam.Builder`:

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
        <td><p>build()</p></td>
        <td><p>Construct a GetFlushAllStateParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

#### Returns

This method catches all the exceptions and returns an `R<GetFlushAllStateResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `GetFlushAllStateResponse` held by the R template.

#### Example

```java
import io.milvus.param.*;
import io.milvus.grpc.GetFlushAllStateResponse;

GetFlushAllStateParam param = GetFlushAllStateParam.newBuilder()
        .build();
R<GetFlushAllStateResponse> response = client.getFlushAllState(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
