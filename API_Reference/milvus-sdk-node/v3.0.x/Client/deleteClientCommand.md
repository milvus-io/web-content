# deleteClientCommand()

This operation removes a previously queued or persistent telemetry command. This operation requires a root connection when authorization is enabled on the server.

```javascript
await milvusClient.deleteClientCommand(data: DeleteClientCommandReq)
```

## Request Syntax

```javascript
await milvusClient.deleteClientCommand({
    command_id: string,
    timeout?: number,
})
```

**PARAMETERS:**

- **command_id** (*string*) -

    **[REQUIRED]**

    The identifier of the command to remove, as returned by `pushClientCommand()`.

- **timeout** (*number*) -

    An optional duration of time in milliseconds to allow for the RPC. If it is set to `undefined`, the client keeps waiting until the server responds or an error occurs. Default is `undefined`.

**RETURNS:**

*Promise<DeleteClientCommandResponse>*

This method returns a promise that resolves to a **DeleteClientCommandResponse** object.

```javascript
{
    status:  ResStatus
}
```

**PARAMETERS:**

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

const res = await client.deleteClientCommand({
    command_id: 'cmd_12345',
});
```
