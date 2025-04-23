---
id: users_and_roles.md
title: "Create Users & Roles"
summary: "Milvus achieves fine-grained access control through RBAC. You can start by creating users and roles, then assign privileges or privilege groups to roles, and finally manage access control by granting roles to users. This method ensures the efficiency and security of access management. This page introduces how to create users and roles in Milvus."
---

# Create Users & Roles

Milvus achieves fine-grained access control through RBAC. You can start by creating users and roles, then assign privileges or privilege groups to roles, and finally manage access control by granting roles to users. This method ensures the efficiency and security of access management. This page introduces how to create users and roles in Milvus.

## User

After initializing a Milvus instance, a root user is automatically generated for authentication when connecting to Milvus for the first time. The username of the root user is `root` and the password is `Milvus`. The default role of the root user is `admin`, which has access to all resources. To ensure data security, please keep your root user's credentials safe to prevent unauthorized access.

For daily operations, we recommend creating users instead of using the root user.

### Create a user

The following example shows how to create a user with the username `user_1` and the password `P@ssw0rd`. The username and password for the user must follow these rules:

- Username: Must start with a letter and can only include uppercase or lowercase letters, numbers, and underscores.

- Password: Must be 8-64 characters long and must include three of the following: uppercase letters, lowercase letters, numbers, and special characters.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

client.create_user(user_name="user_1", password="P@ssw0rd")
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.CreateUserReq;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

CreateUserReq createUserReq = CreateUserReq.builder()
        .userName("user_1")
        .password("P@ssw0rd")
        .build();
        
client.createUser(createUserReq);
```

```go
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

err = client.CreateUser(ctx, milvusclient.NewCreateUserOption("user_1", "P@ssw0rd"))
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

await client.createUser({
   username: 'user_1',
   password: 'P@ssw0rd',
 });
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/users/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "userName": "user_1",
    "password": "P@ssw0rd"
}'
```

### Update password

After creating a user, you can update the password if you forget.

The new password must also follow the following rule:

- Must be 8-64 characters long and include three of the following: uppercase letters, lowercase letters, numbers, and special characters.

The following example shows how to update the password for user `user_1` to `NewP@ssw0rd`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client.update_password(
    user_name="user_1",
    old_password="P@ssw0rd",
    new_password="NewP@ssw0rd"
)
```

```java
import io.milvus.v2.service.rbac.request.UpdatePasswordReq;

UpdatePasswordReq updatePasswordReq = UpdatePasswordReq.builder()
        .userName("user_1")
        .password("P@ssw0rd")
        .newPassword("NewP@ssw0rd")
        .build();
client.updatePassword(updatePasswordReq);
```

```go
err = client.UpdatePassword(ctx, milvusclient.NewUpdatePasswordOption("user_1", "P@ssw0rd", "NewP@ssw0rd"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

await client.updateUser({
   username: 'user_1',
   newPassword: 'P@ssw0rd',
   oldPassword: 'NewP@ssw0rd',
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/users/update_password" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "newPassword": "P@ssw0rd!",
    "userName": "user_1",
    "password": "P@ssw0rd"
}'
```

### List users

After creating several users, you can list and view all existing users.

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
await client.listUsers();
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/users/list" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{}'
```

Below is an example output. `root` is the default user automatically generated in Milvus. `user_1` is the new user that is just created.

```bash
['root', 'user_1']
```

## Role

Milvus provides a built-in role called `admin`, which is an administrator role that can access resources under all instances and has privileges for all operations. For more fine-grained access management and enhanced data security, it is recommended that you create custom roles based on your needs.

### Create a role

The following example demonstrates how to create a role named `role_a`. 

The role name must follow the following rule:

- Must start with a letter and can only include uppercase or lowercase letters, numbers, and underscores.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client.create_role(role_name="role_a")
import io.milvus.v2.service.rbac.request.CreateRoleReq;
```

```java
CreateRoleReq createRoleReq = CreateRoleReq.builder()
        .roleName("role_a")
        .build();
       
```

```go
err = client.CreateRole(ctx, milvusclient.NewCreateRoleOption("role_a"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```javascript
await client.createRole({
   roleName: 'role_a',
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/roles/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "roleName": "role_a"
}'
```

### List roles

After creating several roles, you can list and view all existing roles.

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
List<String> roles = client.listRoles();
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

Below is an example output. `admin` is the default role in Milvus. `role_a` is the new role that is just created.

```bash
['admin', 'role_a']
```

