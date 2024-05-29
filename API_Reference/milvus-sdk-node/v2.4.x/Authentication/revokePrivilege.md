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

- **object** (*RbacObjects*) -

    **[REQUIRED]**

    The type of the privilege object to assign. 

    Possible values from the *RbacObjects* enumeration object are **Global**, **Collection**, and **User**.

- **objectName** (*str*) - 

    **[REQUIRED]**

    The name of the API to assign. 

    You can either use the wildcard (*) to include all applicable APIs in the specified privilege or fill in a specific API. For details, refer to the Relevant API column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- **privilegeName** (*PrivilegesTypes*) -

    **[REQUIRED]**

    The name of the privilege to assign. You can use any value in the **Enumeration Members** column of the following table.

    <table>
       <tr>
         <th><p>Privilege Types</p></th>
         <th><p>Enumeration Members</p></th>
       </tr>
       <tr>
         <td><p>GlobalPrivileges<br/></p></td>
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
   object: '*',
   objectName: 'Collection',
   privilegeName: 'CreateIndex'
 })
```

