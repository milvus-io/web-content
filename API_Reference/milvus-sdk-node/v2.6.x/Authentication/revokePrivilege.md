# revokePrivilege()

This operation revokes a privilege already assigned to a role.

```javascript
revokePrivilege(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.revokePrivilege({
   roleName: string,
   object: RbacObjects,
   objectName: string,
   privilegeName: PrivilegesTypes
 })
```

**PARAMETERS:**

- **roleName** (*string*) -

    **[REQUIRED]**

    The name of the role to revoke privileges from.

- **object** (*string*) -

    **[REQUIRED]**

    The type of object for which the privilege is to be assigned.

    Possible values are as follows:

    - **Global**

        System-wide objects that allow the user to perform actions that affect all collections, users, or system-wide settings. When **object** is set to **Global**, set **objectName** to the wildcard (*****), indicating all objects of the specified type.

    - **Collection**

        Collection-specific objects that allow the user to perform actions such as creating indexes, loading data, inserting or deleting data, and querying data within a specific collection.

    - **User**

        Objects related to user management that allow the user to manage credentials and roles for database users, such as updating user credentials or viewing user details.

- **objectName** (*string*) -

    **[REQUIRED]**

    The name of the object to control access for. For example, if the object type is **Collection**, the object name is the name of a collection. If the object type is **User**, the object name is the name of a database user.

    When **object** is set to **Global**, set **objectName** to the wildcard (*****), indicating all objects of the specified type. For details, refer to the Relevant API column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- **privilegeName** (*PrivilegesTypes*) -

    **[REQUIRED]**

    The name of the privilege to assign. You can use any value in the **Enumeration Members** column of the following table.

    <table>
       <tr>
         <th><p>Privilege Types</p></th>
         <th><p>Enumeration Members</p></th>
       </tr>
       <tr>
         <td><p>GlobalPrivileges</p></td>
         <td><p>All, CreatAlias, CreateCollection, CreateDatabase, CreateOwnership, CreateResourceGroup, DescribeAlias, DescribeCollection, DescribeResourceGroup, DropAlias, DropCollection, DropDatabase, DropOwnership, DropResourceGroup, FlushAll, ListAliases, ListDatabases, ListResourceGroups, ManageOwnership, RenameCollection, SelectOwnership, ShowCollections, TransferNode, TransferReplica.</p></td>
       </tr>
       <tr>
         <td><p>CollectionPrivileges</p></td>
         <td><p>Compaction, CreateIndex, CreatePartition, Delete, DropIndex, Drop Partition, Flush, GetFlushState, GetLoadState, GetLoadingProgress, GetStatistics, HasPartition, Import, IndexDetails, Insert, Load, LoadBalance, Query, Release, Search, ShowPartitions, Upsert</p></td>
       </tr>
       <tr>
         <td><p>UserPrivileges</p></td>
         <td><p>SelectUser, UpdateUser</p></td>
       </tr>
    </table>

    For details, refer to the **Privilege name** column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\<ResStatus>*

This method returns a promise that resolves to a **ResStatus** object.

```javascript
{
    code: number,
    error_code: string | number,
    reason: string
}
```

**PARAMETERS:**

- **code** (*number*) -

    A code that indicates the operation result. It remains **0** if this operation succeeds.

- **error_code** (*string* | *number*) -

    An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

- **reason** (*string*) - 

    The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
milvusClient.revokePrivilege({
   roleName: 'roleName',
   object: 'Collection', // Valid value: Global, Collection or User.
   objectName: 'CollectionName', // The name of the collection to revoke privilege from. Use "*" to revoke privilege from all collections.
   privilegeName: 'CreateIndex'
 })
```

