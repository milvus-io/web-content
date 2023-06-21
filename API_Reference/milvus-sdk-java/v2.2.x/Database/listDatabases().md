# listDatabases()

A MilvusClient interface. This method lists all databases in the cluster.

```Java
R<ListDatabasesResponse> listDatabases();
```

## Returns

This method catches all the exceptions and returns an `R<ListDatabasesResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.
- If the API fails by RPC exception, it returns `R.Status.Unknow` and error message of the exception.
- If the API succeeds, it returns a valid `DescribeIndexResponse` held by the R template. 

## Example

```Java
import io.milvus.param.*;

R<ListDatabasesResponse> response = client.listDatabases()
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
