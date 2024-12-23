---
id: grant_roles.md
related_key: enable RBAC
summary: After creating a role and granting privileges to the role, you can grant the role to users so that the users can access resources and perform actions that are defined by the role. You can grant multiple roles to a user or grant a role to multiple users. This guide introduces how to grant roles to users.​
title: Grant Roles to Users​
---

# Grant Roles to Users​

After creating a role and granting privileges to the role, you can grant the role to users so that the users can access resources and perform actions that are defined by the role. You can grant multiple roles to a user or grant a role to multiple users. This guide introduces how to grant roles to users.​

The built-in user `root` in Milvus has already been granted the `admin` role, which has all privileges. You do not need to assign any other roles to it.​

## Grant a role to a user​

The following example demonstrates how to grant the role `role_a` to the user `user_1`.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">cURL</a>
</div>

```python
from pymilvus import MilvusClient​
​
client = MilvusClient(​
    uri="http://localhost:19530",​
    token="root:Milvus"​
)​
​
client.grant_role(user_name="user_1", role_name="role_a")​

```

```java
import io.milvus.v2.client.ConnectConfig;​
import io.milvus.v2.client.MilvusClientV2;​
import io.milvus.v2.service.rbac.request.GrantRoleReq;​
​
String CLUSTER_ENDPOINT = "http://localhost:19530";​
String TOKEN = "root:Milvus";​
​
​
ConnectConfig connectConfig = ConnectConfig.builder()​
    .uri(CLUSTER_ENDPOINT)​
    .token(TOKEN)​
    .build();​
    ​
MilvusClientV2 client = new MilvusClientV2(connectConfig);​
​
GrantRoleReq grantRoleReq = GrantRoleReq.builder()​
        .roleName("role_a")​
        .userName("user_1")​
        .build();​
client.grantRole(grantRoleReq);​

```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")​
​
const address = "http://localhost:19530";​
const token = "root:Milvus";​
const client = new MilvusClient({address, token});​
​
milvusClient.grantRole({​
   username: 'user_1',​
   roleName: 'role_a'​
 })​

```

```shell
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/users/grant_role" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "roleName": "role_a",​
    "userName": "user_1"​
}'​

```

## Describe user​

Once you grant a role to a user, you can check if the grant operation is successful via the `describe_user()` method.​

The following example demonstrates how to check the role(s) of the user `user_1`.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">cURL</a>
</div>

```python
from pymilvus import MilvusClient​
​
client.describe_user(user_name="user_1")​

```

```java
import io.milvus.v2.service.rbac.request.DescribeUserReq;​
import io.milvus.v2.service.rbac.response.DescribeUserResp;​
​
DescribeUserReq describeUserReq = DescribeUserReq.builder()​
        .userName("user_1")​
        .build();​
DescribeUserResp describeUserResp = client.describeUser(describeUserReq);​

```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")​
​
milvusClient.describeUser({username: 'user_1'})​

```

```shell
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/users/describe" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "userName": "user_1"​
}'​

```

Below is an example output.​

```
{'user_name': 'user_1', 'roles': 'role_a'}​

```

## Revoke a role​

You can also revoke a role that has been assigned to a user.​

The following example demonstrates how to revoke the role `role_a` assigned to the user `user_1`.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">cURL</a>
</div>

```python
from pymilvus import MilvusClient​
​
client.revoke_role(​
    user_name='user_1',​
    role_name='role_a'​
)​

```

```java
import io.milvus.v2.service.rbac.request.RevokeRoleReq;​
​
client.revokeRole(RevokeRoleReq.builder()​
        .userName("user_1")​
        .roleName("role_a")​
        .build());​

```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")​
​
​

```

```shell
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/users/revoke_role" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "userName": "user_1",​
    "roleName": "role_a"​
}'​

```

