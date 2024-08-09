---
id: users_and_roles.md
related_key: users, roles
summary: Learn about the definition of users, roles, objects, and privileges in role-based access control (RBAC).
title: Users and Roles
---

# Users and Roles

This topic provides an overview of Role-Based Access Control (RBAC) in Milvus, detailing the definitions and relationships between users, roles, objects, and privileges.

The following figure illustrates the relationship between objects, privileges, roles, and users.

![users_and_roles](../../../assets/users_and_roles.png "The relationship between object, privilege, role and user.")

## Key concepts

To manage access control to Milvus resources, it’s important to understand the key components of RBAC: object types, object names, users, roles, and privileges.

- **Object type**: the category of the object for which a privilege is being assigned. The object type can be:
  - `Global`: System-wide objects, allowing the user to perform actions that affect all collections, users, or system-wide settings.
  - `Collection`: Collection-specific objects, allowing the user to perform actions such as creating indexes, loading data, inserting or deleting data, and querying data within a specific collection.
  - `User`: Objects related to user management, allowing the user to manage credentials and roles for database users, such as updating user credentials or viewing user details.

- **Object name**: the specific name of the object to control access for. For instance:
  - If the object type is `Global`, the object name must be set to the wildcard (`*`), indicating all objects of the specified type.
  - If the object type is `Collection`, the object name is the name of a collection.
  - If the object type is `User`, the object name is the name of a database user.

- **User**: a person or an application that interacts with Milvus, which consists of a username and a corresponding password.

- **Privilege**: defines the actions that can be performed and the resources that can be accessed. Privileges are not granted directly to users but are assigned to roles.

- **Role**: defines the set of privileges that a user has for certain objects. Once a role is bound to a user, the user inherits all the privileges granted to that role.

## Example: Granting privileges

The following code snippet shows how to grant a `CreateIndex` privilege to a role on a specific collection:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
milvusClient.grant_privilege(
    role_name="CUSTOM_ROLE_NAME",
    object_type="Collection",  # Valid value: Global, Collection or User.
    privilege="CreateIndex",   # See the table below for valid privilege names and relevant API descriptions.
    object_name="YOUR_COLLECTION_NAME"  # The name of the collection to grant access to. Use "*" to grant access to all collections.
)
```

```java
GrantPrivilegeReq grantPrivilegeReq = GrantPrivilegeReq.builder()
        .roleName("roleName")
        .objectName("CollectionName") // The name of the collection to grant access to. Use "*" to grant access to all collections.
        .objectType("Collection") // Valid value: Global, Collection or User.
        .privilege("CreateIndex") // See the table below for valid privilege names and relevant API descriptions.
        .build();
client.grantPrivilege(grantPrivilegeReq);
```

```javascript
milvusClient.grantPrivilege({
   roleName: 'roleName',
   object: 'Collection',  // Valid value: Global, Collection or User.
   objectName: 'CollectionName', // The name of the collection to grant access to. Use "*" to grant access to all collections.
   privilegeName: 'CreateIndex' // See the table below for valid privilege names and relevant API descriptions.
 })
```

<div class="language-python">

To obtain more information about privilege-related APIs, refer to [grant_privilege](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md) and [revoke_privilege](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md).

</div>

<div class="language-java">

To obtain more information about privilege-related APIs, refer to [grantPrivilege](https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/grantPrivilege.md) and [revokePrivilege](https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/revokePrivilege.md).

</div>

<div class="language-javascript">

To obtain more information about privilege-related APIs, refer to [grantPrivilege](https://milvus.io/api-reference/node/v2.4.x/Authentication/grantPrivilege.md) and [revokePrivilege](https://milvus.io/api-reference/node/v2.4.x/Authentication/revokePrivilege.md).

</div>

## Default users and roles

Milvus creates a `root` user by default with a default password `Milvus`. The `root` user is granted the `admin` privileges, which means that this `root` user can have access to all resources and perform all actions.

If a user is associated with the `public` role, they are entitled to the following privileges:

- `DescribeCollection`
- `ShowCollections`
- `IndexDetail`

## List of object types and privileges

The following table lists the values you can choose when [enabling RBAC](rbac.md).

| Object type | Privilege name        | Relevant API description on the client side       |
| ----------- | --------------------- | ------------------------------------------------- |
| Collection  | CreateIndex           | CreateIndex                                       |
| Collection  | DropIndex             | DropIndex                                         |
| Collection  | IndexDetail           | DescribeIndex/GetIndexState/GetIndexBuildProgress |
| Collection  | Load                  | LoadCollection/GetLoadingProgress/GetLoadState    |
| Collection  | GetLoadingProgress    | GetLoadingProgress                                |
| Collection  | GetLoadState          | GetLoadState                                      |
| Collection  | Release               | ReleaseCollection                                 |
| Collection  | Insert                | Insert                                            |
| Collection  | Delete                | Delete                                            |
| Collection  | Upsert                | Upsert                                            |
| Collection  | Search                | Search                                            |
| Collection  | Flush                 | Flush/GetFlushState                               |
| Collection  | GetFlushState         | GetFlushState                                     |
| Collection  | Query                 | Query                                             |
| Collection  | GetStatistics         | GetCollectionStatistics                           |
| Collection  | Compaction            | Compact                                           |
| Collection  | Import                | BulkInsert/Import                                 |
| Collection  | LoadBalance           | LoadBalance                                       |
| Collection  | CreatePartition       | CreatePartition                                   |
| Collection  | DropPartition         | DropPartition                                     |
| Collection  | ShowPartitions        | ShowPartitions                                    |
| Collection  | HasPartition          | HasPartition                                      |
| Global      | All                   | All API operation permissions in this table       |
| Global      | CreateCollection      | CreateCollection                                  |
| Global      | DropCollection        | DropCollection                                    |
| Global      | DescribeCollection    | DescribeCollection                                |
| Global      | ShowCollections       | ShowCollections                                   |
| Global      | RenameCollection      | RenameCollection                                  |
| Global      | FlushAll              | FlushAll                                          |
| Global      | CreateOwnership       | CreateUser CreateRole                             |
| Global      | DropOwnership         | DeleteCredential DropRole                         |
| Global      | SelectOwnership       | SelectRole/SelectGrant                            |
| Global      | ManageOwnership       | OperateUserRole OperatePrivilege                  |
| Global      | CreateResourceGroup   | CreateResourceGroup                               |
| Global      | DropResourceGroup     | DropResourceGroup                                 |
| Global      | DescribeResourceGroup | DescribeResourceGroup                             |
| Global      | ListResourceGroups    | ListResourceGroups                                |
| Global      | TransferNode          | TransferNode                                      |
| Global      | TransferReplica       | TransferReplica                                   |
| Global      | CreateDatabase        | CreateDatabase                                    |
| Global      | DropDatabase          | DropDatabase                                      |
| Global      | ListDatabases         | ListDatabases                                     |
| Global      | CreateAlias           | CreateAlias                                       |
| Global      | DropAlias             | DropAlias                                         |
| Global      | DescribeAlias         | DescribeAlias                                     |
| Global      | ListAliases           | ListAliases                                       |
| User        | UpdateUser            | UpdateCredential                                  |
| User        | SelectUser            | SelectUser                                        |

<div class="alert note">
<li>Object and privilege names are case-sensitive.</li>
<li>To grant all privileges to a kind of object, like Collection, Global, User, use "*" for privilege name. </li>
<li>The "*" privilege name for the Global object doesn't include the All privilege, because the All privilege includes all permissions, including any collection and user object.</li>
</div>

## What's next
- Learn how to [enable RBAC](rbac.md).
