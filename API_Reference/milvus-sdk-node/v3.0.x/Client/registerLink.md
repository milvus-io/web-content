# registerLink()

This operation calls the legacy proxy link registration RPC.

```javascript
await milvusClient.registerLink(data?: GrpcTimeOut)
```

## Request Syntax

```javascript
await milvusClient.registerLink({
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

*Promise<RegisterLinkResponse>*

This method returns a promise that resolves to a **RegisterLinkResponse** object.

```javascript
{
    status:  ResStatus,
    address: { ip: string, port: string } | null
}
```

**PARAMETERS:**

- **address** (*{ ip: string, port: string }* | *null*) -

    The address returned by the proxy link registration, when one is provided.

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

const res = await client.registerLink();
console.log(res.address);
```
