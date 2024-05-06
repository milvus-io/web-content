---
id: rbac.md
related_key: enable RBAC
summary: Learn how to manage users, roles, and privileges.
title: Enable RBAC
---

# Enable RBAC

By enabling RBAC, you can control access to specific Milvus resources (Eg. a collection or a partition) or permissions based on user role and privileges. Currently, this feature is only available in Python and Java.

This topic describes how to enable RBAC and manage [users and roles](users_and_roles.md).

<div class="alert note">

The code snippets on this page use new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) to interact with Milvus. New MilvusClient SDKs for other languages will be released in future updates.

</div>

## 1. Initiate a Milvus client to establish a connection

After you enable [user authentication](authenticate.md), connect to your Milvus instance using `token` that consists of a username and a password. By default, Milvus uses the `root` user with the password `Milvus`.

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri='http://localhost:19530', # replace with your own Milvus server address
    token='root:Milvus' # replace with your own Milvus server token
)
```

## 2. Create a user

Create a user named `user_1` with the password `P@ssw0rd`:

```python
client.create_user(
    user_name='user_1',
    password='P@ssw0rd'
)
```

After creating a user, you can:

- Update a user password. You need to provide both the original and the new password. 

```python
client.update_password(
    user_name='user_1',
    old_password='P@ssw0rd',
    new_password='P@ssw0rd123'
)
```

- List all users.

```python
client.list_users()

# output:
# ['root', 'user_1']
```

- Check the role of a particular user.

```python
client.describe_user(user_name='user_1')

# output:
# {'user_name': 'user_1', 'roles': ()}
```

## 3. Create a role

The following example creates a role named `roleA`.

```python
client.create_role(
    role_name="roleA",
)
```

After creating a role, you can:

- List all roles.

```python
client.list_roles()

# output:
# ['admin', 'public', 'roleA']
```

## 4. Grant a privilege to a role

The following example demonstrates how to grant the permission of searching all collections to the role named `roleA`. See [Users and Roles](users_and_roles.md) for other types of privileges you can grant.

Before managing role privileges, make sure you have enabled user authentication. Otherwise, an error may occur. For information on how to enable user authentication, refer to [Authenticate User Access](authenticate.md).

```python
# grant privilege to a role

client.grant_privilege(
    role_name='roleA',
    object_type='User',
    object_name='SelectUser',
    privilege='SelectUser'
)
```

After granting a privilege to a role, you can:

- View the privileges granted to a role.

```python
client.describe_role(
    role_name='roleA'
)

# output:
# {'role': 'roleA',
#  'privileges': [{'object_type': 'User',
#    'object_name': 'SelectUser',
#    'db_name': 'default',
#    'role_name': 'roleA',
#    'privilege': 'SelectUser',
#    'grantor_name': 'root'}]}
```

## 5. Grant a role to a user

Grant the role to a user so that this user can inherit all the privileges of the role.

```python
# grant a role to a user

client.grant_role(
    user_name='user_1',
    role_name='roleA'
)
```

After granting the role, verity that it has been granted:

```python
client.describe_user(
    user_name='user_1'
)

# output:
# {'user_name': 'user_1', 'roles': ('roleA',)}
```

## 6. Revoke privileges

<div class="alert caution">

Exercise caution when performing the following operations because these operations are irreversible.

</div>

- Remove a privilege from a role. If you revoke a privilege that has not been granted to the role, an error will occur.

```python
client.revoke_privilege(
    role_name='roleA',
    object_type='User',
    object_name='SelectUser',
    privilege='SelectUser'
)
```

- Remove a user from a role. If you revoke a role that has not been granted to the user, an error will occur.

```python
client.revoke_role(
    user_name='user_1',
    role_name='roleA'
)
```

- Drop a role.

```python
client.drop_role(role_name='roleA')
```

- Drop a user.

```python
client.drop_user(user_name='user_1')
```

## What's next

- Learn how to manage [user authentication](authenticate.md).

- Learn how to enable [TLS proxy](tls.md) in Milvus.
