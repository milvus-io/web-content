# dummy()

This operation runs the legacy JSON diagnostic on servers that expose the `Dummy` RPC.

```javascript
await milvusClient.dummy(data: DummyReq)
```

## Request Syntax

```javascript
await milvusClient.dummy({
    request_type: string,
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **request_type** (*string*) -

    **[REQUIRED]**

    The JSON diagnostic query accepted by the Milvus `Dummy` RPC.

- **timeout** (*number*) -

    An optional duration of time in milliseconds to allow for the RPC. If it is set to `undefined`, the client keeps waiting until the server responds or an error occurs. Default is `undefined`.

- **client_request_id** (*string*) -

    A trace ID for request tracking. Optional.

**RETURNS:**

*Promise<DummyResponse>*

This method returns a promise that resolves to a **DummyResponse** object.

```javascript
{
    response: string
}
```

**PARAMETERS:**

- **response** (*string*) -

    A JSON string reporting the diagnostic result.

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

const res = await client.dummy({
    request_type: '...',
});
console.log(res.response);
```
