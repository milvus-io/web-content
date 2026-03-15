# getMetric()

This operation gets metric information from the Milvus system, including system info, statistics, or logs.

```javascript
await milvusClient.getMetric(data: GetMetricsRequest)
```

## Request Syntax

```javascript
await milvusClient.getMetric({
    request: { metric_type: string },
    timeout?: number,
})
```

**PARAMETERS:**

- **request** (*object*) -

    **[REQUIRED]**

    An object containing `metric_type` which can be `"system_info"`, `"system_statistics"`, or `"system_log"`.

- **timeout** (*number*) -

    RPC timeout in milliseconds. Optional.

**RETURNS:**

*Promise\<GetMetricsResponse\>*

The response contains the parsed metric data and the component name.

**EXCEPTIONS:**

- **MilvusError**

    This exception will be raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({ 
    address: 'localhost:19530', 
    token: 'root:Milvus' 
});
const res = await client.getMetric({
    request: { metric_type: 'system_info' },
});
console.log(res.response);
```
