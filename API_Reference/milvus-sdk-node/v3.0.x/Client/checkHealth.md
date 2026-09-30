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

**RETURNS** *Promise<CheckHealthResponse>*

This method returns a promise that resolves to a **CheckHealthResponse** object.

```javascript
{
    isHealthy: boolean,
    reasons: string[]
}
```

**PARAMETERS:**

- **isHealthy** (*boolean*) -

    A boolean that indicates whether all critical components of the Milvus deployment are healthy.

- **reasons** (*string[]*) -

    When **isHealthy** is **false**, a list of human-readable reasons explaining which components are unhealthy. The list is empty when **isHealthy** is **true**.

## Examples

```javascript
milvusClient.checkHealth()
```
