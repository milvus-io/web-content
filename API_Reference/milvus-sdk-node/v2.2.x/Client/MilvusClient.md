# MilvusClient()

This class serves as an initializer for a Milvus client instance. Upon successful connection to the Milvus instance, the client can execute various operations.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const milvusClient = new MilvusClient({
  address: "192.168.0.1:19530",
  ssl: false,
  username: "optional",
  password: "optional",
});
```

Now you can use all methods of the client, like `client.createCollection`, `client.createIndex`, `client.loadCollection`, `client.search` to communicate with the Milvus server.

## Parameters

| Parameters      | Description                                                                                                              | Type    | Example             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ | ------- | ------------------- |
| address         | The Milvus IP address                                                                                                    | String  | '192.168.0.1:19530' |
| ssl?            | SSL connection. It is false by default, if you are using Zilliz Cloud, set it to true.                                   | Boolean | false               |
| username?       | The username used to connect to Milvus                                                                                   | String  | milvus              |
| address?        | The password used to connect to Milvus                                                                                   | String  | milvus              |
| maxRetries?     | The number of retries for the grpc method, by default: 3                                                                 | Number  | 3                   |
| retryDelay?     | The delay between attempts at retrying a failed grpc method in ms, by default: 30                                        | Number  | 30                  |
| channelOptions? | an optional configuration object that can be passed to a gRPC client when creating a channel to connect to a gRPC server | Object  |                     |

### channelOptions

```javascript
export interface ChannelOptions {
  "grpc.ssl_target_name_override"?: string;
  "grpc.primary_user_agent"?: string;
  "grpc.secondary_user_agent"?: string;
  "grpc.default_authority"?: string;
  "grpc.keepalive_time_ms"?: number;
  "grpc.keepalive_timeout_ms"?: number;
  "grpc.keepalive_permit_without_calls"?: number;
  "grpc.service_config"?: string;
  "grpc.max_concurrent_streams"?: number;
  "grpc.initial_reconnect_backoff_ms"?: number;
  "grpc.max_reconnect_backoff_ms"?: number;
  "grpc.use_local_subchannel_pool"?: number;
  "grpc.max_send_message_length"?: number;
  "grpc.max_receive_message_length"?: number;
  "grpc.enable_http_proxy"?: number;
  /* http_connect_target and http_connect_creds are used for passing data
   * around internally, and should not be documented as public-facing options
   */
  "grpc.http_connect_target"?: string;
  "grpc.http_connect_creds"?: string;
  "grpc.default_compression_algorithm"?: CompressionAlgorithms;
  "grpc.enable_channelz"?: number;
  "grpc.dns_min_time_between_resolutions_ms"?: number;
  "grpc.enable_retries"?: number;
  "grpc.per_rpc_retry_buffer_size"?: number;
  /* This option is pattered like a core option, but the core does not have
   * this option. It is closely related to the option
   * grpc.per_rpc_retry_buffer_size, which is in the core. The core will likely
   * implement this functionality using the ResourceQuota mechanism, so there
   * will probably not be any collision or other inconsistency. */
  "grpc.retry_buffer_size"?: number;
  "grpc.max_connection_age_ms"?: number;
  "grpc.max_connection_age_grace_ms"?: number;
  "grpc-node.max_session_memory"?: number;
  "grpc.service_config_disable_resolution"?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
```
