# checkHealth()

MilvusClient interface. This method checks milvus server health. 

```java
R<CheckHealthResponse> checkHealth();
```

#### Returns

This method catches all the exceptions and returns an `R<CheckHealthResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `CheckHealthResponse` held by the `R` template. You can use `CheckHealthResponse` to get resource group information.

#### Example

```java

R<CheckHealthResponse> response = client.checkHealth();

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
