# getComponentStates()

This operation gets the proxy's component state.

```javascript
await milvusClient.getComponentStates(data?: GrpcTimeOut)
```

## Request Syntax

```javascript
await milvusClient.getComponentStates({
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **timeout** (*number*) -

    An optional duration of time in milliseconds to allow for the RPC. If it is set to `undefined`, the client keeps waiting until the server responds or an error occurs. Default is `undefined`.

- **client_request_id** (*string*) -

    An optional, caller-supplied ID for request tracking and log or trace correlation. The SDK sends it as the `client-request-id` gRPC metadata header and never generates one. Use a unique value per request, such as a UUID. A value in OpenTelemetry trace-ID form (32 lowercase hexadecimal characters) is also used by client telemetry as a trace ID.

**RETURNS:**

*Promise<GetComponentStatesResponse>*

This method returns a promise that resolves to a **GetComponentStatesResponse** object.

```javascript
{
    status:  ResStatus,
    state: MilvusComponentInfo | null,
    subcomponent_states: MilvusComponentInfo[]
}
```

**PARAMETERS:**

- **state** (*MilvusComponentInfo* | *null*) -

    The state of the proxy component itself. Each **MilvusComponentInfo** has the following members:

    - **nodeID** (*string*) -

        The ID of the component node.

    - **role** (*string*) -

        The role of the component (for example, `proxy`).

    - **state_code** (*string*) -

        The current state of the component. Possible values are **Initializing**, **Healthy**, **Abnormal**, **StandBy**, and **Stopping**.

    - **extra_info** (*KeyValuePair<string, string>[]*) -

        Additional key-value information reported by the component.

- **subcomponent_states** (*MilvusComponentInfo[]*) -

    The states of the proxy's subcomponents. Each entry is a **MilvusComponentInfo** with the members listed above.

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

const res = await client.getComponentStates();
console.log(res.state);
```
