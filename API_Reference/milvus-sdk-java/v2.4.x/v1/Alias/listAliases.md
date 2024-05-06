# listAliases()

A MilvusClient interface. This method lists the aliases of a collection.

```java
R<ListAliasesResponse> listAliases(ListAliasesParam requestParam);
```

## ListAliasesParam

Use the `ListAliasesParam.Builder` to construct a `ListAliasesParam` object.

```java
import io.milvus.param.ListAliasesParam;
ListAliasesParam.Builder builder = ListAliasesParam.newBuilder();
```

Methods of `ListAliasesParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td><br/>withCollectionName(String collectionName)</td>
        <td>Sets the target collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the target collection to list the aliases.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a ListAliasesParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `ListAliasesParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `ListAliasesResponse` held by the `R` template. You can use `ListAliasesResponse` to get the information of aliases.

## Example

```java
import io.milvus.param.*;

ListAliasesParam param = ListAliasesParam.newBuilder()
        .withCollection(COLLECTION_NAME)
        .build();
R<ListAliasesResponse> response = client.listAliases(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
