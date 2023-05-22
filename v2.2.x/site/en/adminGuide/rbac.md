---
id: rbac.md
related_key: enable RBAC
summary: Learn how to manage users, roles, and privileges.
---

# Enable RBAC

By enabling RBAC, you can control access to specific Milvus resources (Eg. a collection or a partition) or permissions based on user role and privileges. Currently, this feature is only available in Python and Java.

This topic describes how to enable RBAC and manage [users and roles](users_and_roles.md).

## 1. Create a user

```
from pymilvus import utility

utility.create_user(user, password, using="default")
```

After creating a user, you can:

- Update a user password. You need to provide both the original and the new password. 

```
utility.update_password(user, old_password, new_password, using="default")
```

- List all users.

```
utility.list_usernames(using="default")
```

- Check the role of a particular user.

```
utility.list_user(username, include_role_info, using="default")
```

- Check the roles of all users.

```
utility.list_users(include_role_info, using="default")
```

## 2. Create a role

The following example creates a role named `roleA`.

```
from pymilvus import Role, utility

role_name = "roleA"
role = Role(role_name, using=_CONNECTION)
role.create()
```

After creating a role, you can:

- Check if a role exists.

```
role.is_exist("roleA")
```

- List all roles.

```
utility.list_roles(include_user_info, using="default")
```

## 3. Grant a privilege to a role

The following example demonstrates how to grant the permission of searching all collections to the role named `roleA`. See [Users and Roles](users_and_roles.md) for other types of privileges you can grant.

```
role.grant("Collection", "*", "Search")
```

After granting a privilege to a role, you can:

- List certain privileges to an object granted to a role.

```
role.list_grant("Collection","CollectionA")
```

- List all privileges granted to a role.

```
role.list_grants()
```


## 4. Bind a role to a user

Bind the role to a user so that this user can inherit all the privileges of the role.

```
role.add_user("roleA", username)
```

After binding a role to a user, you can:

- List all users bind to a role

```
role.get_users("roleA")
```

## 5. Deny access or privileges

<div class="alert caution">

Exercise caution when performing the following operations because these operations are irreversible.

</div>

- Remove a privilege from a role.

```
role.revoke("Collection","*","Search")
```

- Remove a user from a role

```
role.remove_user(username)
```

- Delete a role

```
role.drop("roleA"):
```

- Delete a user

```
utility.delete_user(user, using="default")
```

## What's next

- Learn how to manage [user authentication](authenticate.md).

- Learn how to enable [TLS proxy](tls.md) in Milvus.
