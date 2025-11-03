# closeConnection()

This operation closes the current connection to the Milvus server.

```javascript
closeConnection(): Promise<CONNECT_STATUS>
```

## Request Syntax

```javascript
milvusClient.closeConnection()
```

**RETURN TYPE:**

*Promise*&lt;*CONNECT_STATUS*&gt;

**RETURNS:**

A promise that resolves to the final status of the current connection to the Milvus server, which should be `SHUTDOWN`.

## Example

```javascript
milvusClient.closeConnection()
```
