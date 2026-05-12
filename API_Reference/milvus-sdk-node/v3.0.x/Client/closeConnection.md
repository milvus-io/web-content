# closeConnection()

This operation closes the current connection to the Milvus server.

```javascript
await milvusClient.closeConnection()
```

## Request Syntax

```javascript
milvusClient.closeConnection()
```

**RETURN TYPE:**

*Promise*<*CONNECT_STATUS*>

**RETURNS:**

A promise that resolves to the final status of the current connection to the Milvus server, which should be `SHUTDOWN`.

## Example

```javascript
milvusClient.closeConnection()
```
