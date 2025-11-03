# checkHealth()

This operation checks the health status of the Milvus server.

```javascript
checkHealth(): Promise<CheckHealthResponse>
```

## Request Syntax

```javascript
milvusClient.checkHealth()
```

**RETURN TYPE:**

*Promise*&lt;*CheckHealthResponse*&gt;

**RETURNS:**

A promise that resolves to a **CheckHealthResponse** object.

```javascript
{
    isHealthy: boolean,
    reasons: []
}
```

**PARAMETERS:**

- **isHealthy** (*boolean*) -

    Whether the currently connected Milvus server is healthy.

- **reasons** (*&#91;&#93;*) - 

    The reasons for the currently connected Milvus server is unhealthy.

## Examples

```javascript
milvusClient.checkHealth()
```
