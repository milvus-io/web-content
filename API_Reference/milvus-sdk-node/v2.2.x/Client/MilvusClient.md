# MilvusClient()

This class serves as an initializer for a Milvus client instance. Upon successful connection to the Milvus instance, the client can execute various operations.

```javascript
const milvusClient = new MilvusClient(MilvusClientConfig);
```

## Parameters

| Parameters | Description                             | Type    | Example             |
| ---------- | --------------------------------------- | ------- | ------------------- |
| address    | The Milvus IP address                   | String  | '192.168.0.1:19530' |
| ssl?       | SSL connection. It is false by default. | Boolean | false               |
| username?  | The username used to connect to Milvus  | String  | milvus              |
| address?   | The password used to connect to Milvus  | String  | milvus              |

### Example

### Connect without password

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const address = `192.168.0.1:19530`;
const milvusClient = new MilvusClient( address );
```

### Connect with password

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const milvusClient = new MilvusClient({
  address: '192.168.0.1:19530',
  ssl: false,
  username: 'optional',
  password: 'optional'
});
```
