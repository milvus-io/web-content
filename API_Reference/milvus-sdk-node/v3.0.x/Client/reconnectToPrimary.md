# reconnectToPrimary()

This operation reconnects the client to the primary cluster of a global cluster topology, rebuilding the channel pool when the primary endpoint has changed.

```javascript
await milvusClient.reconnectToPrimary()
```

## Request Syntax

```javascript
await milvusClient.reconnectToPrimary()
```

**PARAMETERS:**

This operation has no parameters.

**RETURNS:**

*Promise\<boolean\>*

This method returns a promise that resolves to a **boolean** indicating whether the client successfully reconnected to the primary cluster.

**EXCEPTIONS:**

- **MilvusError**

    This exception will be raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const reconnected = await milvusClient.reconnectToPrimary();
```
