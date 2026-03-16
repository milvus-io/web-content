# checkHealth()

This operation checks the health status of the Milvus server.

```javascript
await milvusClient.checkHealth()
```

## Request Syntax

```javascript
milvusClient.checkHealth()
```

**RETURN TYPE:**

*Promise*<*CheckHealthResponse*>

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

- **reasons** (*[]*) - 

    The reasons for the currently connected Milvus server is unhealthy.

## Examples

```javascript
milvusClient.checkHealth()
```
