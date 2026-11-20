# allocTimestamp()

This operation allocates a Milvus hybrid logical timestamp from the proxy.

```javascript
await milvusClient.allocTimestamp(data?: GrpcTimeOut)
```

## Request Syntax

```javascript
await milvusClient.allocTimestamp({
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **timeout** (*number*) -

    An optional duration of time in milliseconds to allow for the RPC. If it is set to `undefined`, the client keeps waiting until the server responds or an error occurs. Default is `undefined`.

- **client_request_id** (*string*) -

    A trace ID for request tracking. Optional.

**RETURNS:**

*Promise<AllocTimestampResponse>*

This method returns a promise that resolves to an **AllocTimestampResponse** object.

```javascript
{
    status:  ResStatus,
    timestamp: string
}
```

**PARAMETERS:**

- **timestamp** (*string*) -

    The Milvus hybrid logical timestamp, returned as a decimal string by default.

- **ResStatus**

    A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await client.allocTimestamp();
console.log(res.timestamp);
```
