# close()

This operation closes a `MilvusClientSession` instance and prevents further session requests.

```javascript
session.close(): void
```

## Request Syntax

```javascript
session.close()
```

**PARAMETERS:**

This operation has no parameters.

**RETURNS:**

*void*

Closes the session handle only. It does not close the parent `MilvusClient` connection pool.

**EXCEPTIONS:**

- **Error**

    Subsequent session operations throw `MilvusClient session is closed`.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const session = client.session('cluster-a');
session.close();
```
