---
id: drop_users_roles.md
title: "Drop Users & Roles"
summary: "To ensure data security, it is recommend that you drop users and roles that are no longer in use. This guide introduces how to drop users and roles."
---

# Drop Users & Roles

To ensure data security, it is recommend that you drop users and roles that are no longer in use. This guide introduces how to drop users and roles.

## Drop a user

The following example demonstrates how to drop the user `user_1`. 

<div class="alert note">

The `root` user cannot be dropped.

</div>

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#plaintext">plaintext</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# create a user
client.drop_user(user_name="user_1")
```

```java
import io.milvus.v2.client.ConnectConfig
import io.milvus.v2.client.MilvusClientV2
import io.milvus.v2.service.rbac.request.DropUserReq

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

DropUserReq dropUserReq = DropUserReq.builder()
        .userName("user_1")
        .build();
client.dropUser(dropUserReq);
```

```plaintext
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

err = client.DropUser(ctx, milvusclient.NewDropUserOption("user_1"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

const address = "http://localhost:19530";
const token = "root:Milvus";
const client = new MilvusClient({address, token});

milvusClient.deleteUser({
    username: 'user_1'
})
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/users/drop" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "userName": "user_1"
}'
```

Once the user is dropped, you can list all existing users to check if the drop operation is successful. 

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client.list_users()
```

```java
import io.milvus.v2.service.rbac.request.listUsersReq

List<String> resp = client.listUsers();
```

```go
users, err := client.ListUsers(ctx, milvusclient.NewListUserOption())
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

await milvusClient.listUsers();
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/users/list" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{}'
```

Below is an example output. There is no `user_1` in the list. The drop operation is successful.

```bash
['root']
```

## Drop a role

The following example demonstrates how to drop the role `role_a`.

<div class="alert note">

The built-in role `admin` cannot be dropped.

</div>

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client.drop_role(role_name="role_a")
```

```java
import io.milvus.v2.service.rbac.request.DropRoleReq

DropRoleReq dropRoleReq = DropRoleReq.builder()
        .roleName("role_a")
        .build();
client.dropRole(dropRoleReq);
```

```go
err = client.DropRole(ctx, milvusclient.NewDropRoleOption("role_a"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

await milvusClient.dropRole({
   roleName: 'role_a',
 });
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/roles/drop" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "roleName": "role_a"
}'
```

Once the role is dropped, you can list all existing roles to check if the drop operation is successful. 

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client.list_roles()
```

```java
List<String> resp = client.listRoles();
```

```go
roles, err := client.ListRoles(ctx, milvusclient.NewListRoleOption())
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```javascript
await client.listRoles({
    includeUserInfo: true
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/roles/list" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{}'
```

Below is an example output. There is no `role_a` in the list. The drop operation is successful.

```bash
['admin']
```

