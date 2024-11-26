---
id: view-collections.md
title: View Collections​
---

# View Collections​

You can obtain the name list of all the collections in the currently connected database, and check the details of a specific collection.​

## List Collections​

The following example demonstrates how to obtain the name list of all collections in the currently connected database.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType​
​
client = MilvusClient(​
    uri="http://localhost:19530",​
    token="root:Milvus"​
)​
​
res = client.list_collections()​
​
print(res)​

```

```java
import io.milvus.v2.client.ConnectConfig;​
import io.milvus.v2.client.MilvusClientV2;​
import io.milvus.v2.service.collection.response.ListCollectionsResp;​
​
ConnectConfig connectConfig = ConnectConfig.builder()​
        .uri("http://localhost:19530")​
        .token("root:Milvus")​
        .build();​
​
MilvusClientV2 client = new MilvusClientV2(connectConfig);​
​
ListCollectionsResp resp = client.listCollections();​
System.out.println(resp.getCollectionNames());​

```

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';​
​
const client = new MilvusClient({​
    address: 'localhost:19530',​
    token: 'root:Milvus'​
});​
​
​
const collections = await client.listCollections();​
console.log(collections);​

```

```go
import (​
    "context"​
    "fmt"​
​
    "github.com/milvus-io/milvus/client/v2"​
)​
​
ctx, cancel := context.WithCancel(context.Background())​
defer cancel()​
​
milvusAddr := "127.0.0.1:19530"​
token := "root:Milvus"​
​
cli, err := client.New(ctx, &client.ClientConfig{​
    Address: milvusAddr,​
    APIKey:  token,​
})​
if err != nil {​
    log.Fatal("failed to connect to milvus server: ", err.Error())​
}​
​
defer cli.Close(ctx)​
​
collectionNames, err := cli.ListCollections(ctx, client.NewListCollectionOption())​
if err != nil {​
    // handle error​
}​
​
fmt.Println(collectionNames)​

```

```curl
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/list" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{}​
}'​

```

If you have already created a collection named `quick_setup`, the result of the above example should be similar to the following.​

```JSON
["quick_setup"]​

```

## Describe Collection​

You can also obtain the details of a specific collection. The following example assumes that you have already created a collection named quick_setup.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
res = client.describe_collection(​
    collection_name="quick_setup"​
)​
​
print(res)​

```

```java
import io.milvus.v2.service.collection.request.DescribeCollectionReq;​
import io.milvus.v2.service.collection.response.DescribeCollectionResp;​
​
DescribeCollectionReq request = DescribeCollectionReq.builder()​
        .collectionName("quick_setup")​
        .build();​
DescribeCollectionResp resp = client.describeCollection(request);​
System.out.println(resp);​

```

```javascript
const res = await client.describeCollection({​
    collection_name: "quick_setup"​
});​
​
console.log(res);​

```

```go
import (​
    "context"​
    "fmt"​
​
    "github.com/milvus-io/milvus/client/v2"​
)​
​
ctx, cancel := context.WithCancel(context.Background())​
defer cancel()​
​
milvusAddr := "127.0.0.1:19530"​
token := "root:Milvus"​
​
cli, err := client.New(ctx, &client.ClientConfig{​
    Address: milvusAddr,​
    APIKey:  token,​
})​
if err != nil {​
    log.Fatal("failed to connect to milvus server: ", err.Error())​
}​
​
defer cli.Close(ctx)​
​
collection, err := cli.DescribeCollection(ctx, client.NewDescribeCollectionOption("quick_setup"))​
if err != nil {​
    // handle error​
}​
​
fmt.Println(collection)​

```

```curl
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/describe" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "quick_setup"​
}'​

```
