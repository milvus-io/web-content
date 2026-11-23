# getClientTelemetry()

This operation lists connected clients and optionally their aggregated telemetry metrics.

Clients appear in the response after they have reported their first telemetry heartbeat (every 10 seconds by default, unless telemetry is disabled on the client). This operation requires a root connection when authorization is enabled on the server, and it goes through the telemetry transport established at connect time — on servers that do not expose a telemetry endpoint it fails with a `telemetry client is not connected` error.

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

    A client generates its own ID: either the stable `clientId` configured in the client's `telemetry` settings, or a randomly generated UUID that changes whenever the client restarts. The ID is reported to the server through the `client_info.reserved` map of the client's telemetry heartbeats. To target a client reliably across restarts, configure a stable `clientId` on that client. To discover the IDs of connected clients, call this operation without filters and read the `client_id` entry in the `reserved` map of each returned client.

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

        The client metadata reported by the SDK. The `reserved` map carries the client's identity as reported in its heartbeats: `client_id`, `client_id_stable` (whether the client configured a stable ID), and `db_name`.

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
for (const c of res.clients) {
    console.log(c.client_info?.reserved?.client_id, c.status);
}
```
