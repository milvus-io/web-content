# getClientTelemetry()

This operation lists connected clients and optionally their aggregated telemetry metrics.

```javascript
await milvusClient.getClientTelemetry(data?: GetClientTelemetryReq)
```

## Request Syntax

```javascript
await milvusClient.getClientTelemetry({
    database?: string,
    client_id?: string,
    include_metrics?: boolean,
    timeout?: number,
})
```

**PARAMETERS:**

- **database** (*string*) -

    The name of the database to filter clients by. Optional.

- **client_id** (*string*) -

    The ID of the client to look up. Optional.

- **include_metrics** (*boolean*) -

    Whether to include telemetry metrics in the response. Optional.

- **timeout** (*number*) -

    An optional duration of time in milliseconds to allow for the RPC. If it is set to `undefined`, the client keeps waiting until the server responds or an error occurs. Default is `undefined`.

**RETURNS:**

*Promise<GetClientTelemetryResponse>*

This method returns a promise that resolves to a **GetClientTelemetryResponse** object.

```javascript
{
    status:  ResStatus,
    clients: ClientTelemetryInfo[],
    aggregated: ClientTelemetryMetrics | null
}
```

**PARAMETERS:**

- **clients** (*ClientTelemetryInfo[]*) -

    The telemetry information reported by each connected client. Each entry has the following members:

    - **client_info** (*{ sdk_type: string, sdk_version: string, local_time: string, user: string, host: string, reserved: Record<string, string> }* | *null*) -

        The client metadata reported by the SDK.

    - **last_heartbeat_time** (*string*) -

        The time of the client's last heartbeat.

    - **status** (*string*) -

        The current status of the client.

    - **databases** (*string[]*) -

        The databases the client has accessed.

    - **metrics** (*{ operation: string, global: ClientTelemetryMetrics | null, collection_metrics: Record<string, ClientTelemetryMetrics> }[]*) -

        Per-operation and per-collection telemetry metrics.

- **aggregated** (*ClientTelemetryMetrics* | *null*) -

    The aggregated telemetry metrics across the listed clients. Each **ClientTelemetryMetrics** entry carries the `request_count`, `success_count`, and `error_count` counters as decimal strings plus any additional metric fields.

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

const res = await client.getClientTelemetry({
    include_metrics: true,
});
console.log(res.clients);
```
