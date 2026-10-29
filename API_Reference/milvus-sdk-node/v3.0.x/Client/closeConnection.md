# closeConnection()

This operation closes the current connection to the Milvus server.

```javascript
await milvusClient.closeConnection()
```

## Request Syntax

```javascript
milvusClient.closeConnection()
```

**RETURNS:**

*Promise<CONNECT_STATUS>*

A promise that resolves to the final status of the current connection to the Milvus server, which should be `SHUTDOWN`.


**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
milvusClient.closeConnection()
```
