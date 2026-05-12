---
id: grant_privileges.md
title: "Grant Privilege or Privilege Group to Roles"
summary: "Once a role is created, you can grant privileges to the role. This guide introduces how to grant privileges or privilege groups to a role."
---

# Grant Privilege or Privilege Group to Roles

Once a role is created, you can grant privileges to the role. This guide introduces how to grant privileges or privilege groups to a role.

## Grant a privilege or a privilege group to a role

Milvus 2.5 introduces a new version of API which streamlines the grant operation. You no longer need to look up the object type when granting a privilege to a role. The following are the parameters and corresponding explanations.

- **role_name:** The name of the target role to which privilege(s) or privilege group(s) need to be granted.

- **Resource**: The target resource of a privilege, which can be a specific instance, database, or collection.

The following table explains how to specify the resource in the `client.grantV2()` method.

<table>
   <tr>
     <th><p><strong>Level</strong></p></th>
     <th><p><strong>Resource</strong></p></th>
     <th><p><strong>Grant Method</strong></p></th>
     <th><p><strong>Notes</strong></p></th>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Collection</strong></p></td>
     <td><p>A specific collection</p></td>
     <td><pre><code class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="col1", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Input the name of your target collection and the name of the database to which the target collection belongs.</p></td>
   </tr>
   <tr>
     <td><p>All collections under a specific database</p></td>
     <td><pre><code class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Input the name of your target database and a wildcard <code>*</code> as the collection name.</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Database</strong></p></td>
     <td><p>A specific database</p></td>
     <td><pre><code class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Input the name of your target database and a wildcard <code>*</code> as the collection name.</p></td>
   </tr>
   <tr>
     <td><p>All databases under the current instance</p></td>
     <td><pre><code class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Input <code>*</code> as the database name and <code>*</code> as the collection name.</p></td>
   </tr>
   <tr>
     <td><p><strong>Instance</strong></p></td>
     <td><p>The current instance</p></td>
     <td><pre><code class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="ClusterAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Input <code>*</code> as the database name and <code>*</code> as the collection name.</p></td>
   </tr>
</table>

- **Privilege**: The specific privilege or [privilege group](privilege_group.md) that you need to grant to a role. Currently, Milvus provides 56 types of privileges that you can grant. The table below lists the privileges in Milvus.

    <div class="alert note">
    
    The type column in the table below are user to facilitate your quick lookup for privileges and is used for classification purposes only. When granting privileges, you do not need to understand the types. You just need to input the corresponding privileges.

    </div>

    <table>
       <tr>
         <th><p><strong>Type</strong></p></th>
         <th><p><strong>Privilege</strong></p></th>
         <th><p><strong>Description</strong></p></th>
         <th><p><strong>Relevant API description on the client side</strong></p></th>
       </tr>
       <tr>
         <td rowspan="5"><p>Database Privileges</p></td>
         <td><p>ListDatabases</p></td>
         <td><p>View all databases in the current instance</p></td>
         <td><p><a href="manage_databases.md">ListDatabases</a></p></td>
       </tr>
       <tr>
         <td><p>DescribeDatabase</p></td>
         <td><p>View the details of a database</p></td>
         <td><p><a href="manage_databases.md">DescribeDatabase</a></p></td>
       </tr>
       <tr>
         <td><p>CreateDatabase</p></td>
         <td><p>Create a database</p></td>
         <td><p><a href="manage_databases.md">CreateDatabase</a></p></td>
       </tr>
       <tr>
         <td><p>DropDatabase</p></td>
         <td><p>Drop a database</p></td>
         <td><p><a href="manage_databases.md">DropDatabase</a></p></td>
       </tr>
       <tr>
         <td><p>AlterDatabase</p></td>
         <td><p>Modify the properties of a database</p></td>
         <td><p><a href="manage_databases.md">AlterDatabase</a></p></td>
       </tr>
       <tr>
         <td rowspan="18"><p>Collection Privileges</p></td>
         <td><p>GetFlushState</p></td>
         <td><p>Check the status of the collection flush operation</p></td>
         <td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
       </tr>
       <tr>
         <td><p>GetLoadState</p></td>
         <td><p>Check the load status of a collection</p></td>
         <td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">GetLoadState</a></p></td>
       </tr>
       <tr>
         <td><p>GetLoadingProgress</p></td>
         <td><p>Check the loading progress of a collection</p></td>
         <td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">GetLoadingProgress</a></p></td>
       </tr>
       <tr>
         <td><p>ShowCollections</p></td>
         <td><p>View all collections with collection privileges</p></td>
         <td><p><a href="view-collections.md">ShowCollections</a></p></td>
       </tr>
       <tr>
         <td><p>ListAliases</p></td>
         <td><p>View all aliases of a collection</p></td>
         <td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">ListAliases</a></p></td>
       </tr>
       <tr>
         <td><p>DescribeCollection</p></td>
         <td><p>View the details of a collection</p></td>
         <td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">DescribeCollection</a></p></td>
       </tr>
       <tr>
         <td><p>DescribeAlias</p></td>
         <td><p>View the details of an alias</p></td>
         <td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">DescribeAlias</a></p></td>
       </tr>
       <tr>
         <td><p>GetStatistics</p></td>
         <td><p>Obtain the statistics of a collection (eg. The number of entities in a collection)</p></td>
         <td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">GetCollectionStatistics</a></p></td>
       </tr>
       <tr>
         <td><p>CreateCollection</p></td>
         <td><p>Create a collection</p></td>
         <td><p><a href="create-collection.md">CreateCollection</a></p></td>
       </tr>
       <tr>
         <td><p>DropCollection</p></td>
         <td><p>Drop a collection</p></td>
         <td><p><a href="drop-collection.md">DropCollection</a></p></td>
       </tr>
       <tr>
         <td><p>Load</p></td>
         <td><p>Load a collection</p></td>
         <td><p><a href="load-and-release.md">LoadCollection</a>/<a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">GetLoadingProgress</a>/<a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">GetLoadState</a></p></td>
       </tr>
       <tr>
         <td><p>Release</p></td>
         <td><p>Release a collection</p></td>
         <td><p><a href="load-and-release.md">ReleaseCollection</a></p></td>
       </tr>
       <tr>
         <td><p>Flush</p></td>
         <td><p>Persist all entities in a collection to a sealed segment. Any entity inserted after the flush operation will be stored in a new segment.</p></td>
         <td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">Flush</a>/<a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
       </tr>
       <tr>
         <td><p>Compaction</p></td>
         <td><p>Manually trigger compaction</p></td>
         <td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Management/compact.md">Compact</a></p></td>
       </tr>
       <tr>
         <td><p>RenameCollection</p></td>
         <td><p>Rename a collection</p></td>
         <td><p><a href="modify-collection.md">RenameCollection</a></p></td>
       </tr>
       <tr>
         <td><p>CreateAlias</p></td>
         <td><p>Create an alias for a collection</p></td>
         <td><p><a href="manage-aliases.md">CreateAlias</a></p></td>
       </tr>
       <tr>
         <td><p>DropAlias</p></td>
         <td><p>Drop the alias of a collection</p></td>
         <td><p><a href="manage-aliases.md">DropAlias</a></p></td>
       </tr>
       <tr>
         <td><p>FlushAll</p></td>
         <td><p>Flush all collections in a database</p></td>
         <td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">FlushAll</a></p></td>
       </tr>
       <tr>
         <td rowspan="4"><p>Partition Privileges</p></td>
         <td><p>HasPartition</p></td>
         <td><p>Check whether a partition exists</p></td>
         <td><p><a href="manage-partitions.md">HasPartition</a></p></td>
       </tr>
       <tr>
         <td><p>ShowPartitions</p></td>
         <td><p>View all partitions in a collection</p></td>
         <td><p><a href="manage-partitions.md">ShowPartitions</a></p></td>
       </tr>
       <tr>
         <td><p>CreatePartition</p></td>
         <td><p>Create a partition</p></td>
         <td><p><a href="manage-partitions.md">CreatePartition</a></p></td>
       </tr>
       <tr>
         <td><p>DropPartition</p></td>
         <td><p>Drop a partition</p></td>
         <td><p><a href="manage-partitions.md">DropPartition</a></p></td>
       </tr>
       <tr>
         <td rowspan="3"><p>Index Privileges</p></td>
         <td><p>IndexDetail</p></td>
         <td><p>View the details of an index</p></td>
         <td><p><a href="index-vector-fields.md">DescribeIndex/GetIndexState/GetIndexBuildProgress</a></p></td>
       </tr>
       <tr>
         <td><p>CreateIndex</p></td>
         <td><p>Create an index</p></td>
         <td><p><a href="index-vector-fields.md">CreateIndex</a></p></td>
       </tr>
       <tr>
         <td><p>DropIndex</p></td>
         <td><p>Drop an index</p></td>
         <td><p><a href="index-vector-fields.md">DropIndex</a></p></td>
       </tr>
       <tr>
         <td rowspan="10"><p>Resource Management Privileges</p></td>
         <td><p>LoadBalance</p></td>
         <td><p>Achieve load balance</p></td>
         <td><p><a href="resource_group.md">LoadBalance</a></p></td>
       </tr>
       <tr>
         <td><p>CreateResourceGroup</p></td>
         <td><p>Create a resource group</p></td>
         <td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">CreateResourceGroup</a></p></td>
       </tr>
       <tr>
         <td><p>DropResourceGroup</p></td>
         <td><p>Drop a resource group</p></td>
         <td><p><a href="resource_group.md">DropResourceGroup</a></p></td>
       </tr>
       <tr>
         <td><p>UpdateResourceGroups</p></td>
         <td><p>Update a resource group</p></td>
         <td><p><a href="resource_group.md">UpdateResourceGroups</a></p></td>
       </tr>
       <tr>
         <td><p>DescribeResourceGroup</p></td>
         <td><p>View the details of a resource group</p></td>
         <td><p><a href="resource_group.md">DescribeResourceGroup</a></p></td>
       </tr>
       <tr>
         <td><p>ListResourceGroups</p></td>
         <td><p>View all resource groups of the current instance</p></td>
         <td><p><a href="resource_group.md">ListResourceGroups</a></p></td>
       </tr>
       <tr>
         <td><p>TransferNode</p></td>
         <td><p>Transfer nodes between resource groups</p></td>
         <td><p><a href="resource_group.md">TransferNode</a></p></td>
       </tr>
       <tr>
         <td><p>TransferReplica</p></td>
         <td><p>Transfer replicas between resource groups</p></td>
         <td><p><a href="resource_group.md">TransferReplica</a></p></td>
       </tr>
       <tr>
         <td><p>BackupRBAC</p></td>
         <td><p>Create a backup for all RBAC related operations in the current instance</p></td>
         <td><p>BackupRBAC</p></td>
       </tr>
       <tr>
         <td><p>RestoreRBAC</p></td>
         <td><p>Restore a backup of all RBAC related operations in the current instance</p></td>
         <td><p>RestoreRBAC</p></td>
       </tr>
       <tr>
         <td rowspan="6"><p>Entity Privileges</p></td>
         <td><p>Query</p></td>
         <td><p>Conduct a query</p></td>
         <td><p><a href="get-and-scalar-query.md">Query</a></p></td>
       </tr>
       <tr>
         <td><p>Search</p></td>
         <td><p>Conduct a search</p></td>
         <td><p><a href="single-vector-search.md">Search</a></p></td>
       </tr>
       <tr>
         <td><p>Insert</p></td>
         <td><p>Insert entities</p></td>
         <td><p><a href="insert-update-delete.md">Insert</a></p></td>
       </tr>
       <tr>
         <td><p>Delete</p></td>
         <td><p>Delete entities</p></td>
         <td><p><a href="delete-entities.md">Delete</a></p></td>
       </tr>
       <tr>
         <td><p>Upsert</p></td>
         <td><p>Upsert entities</p></td>
         <td><p><a href="upsert-entities.md">Upsert</a></p></td>
       </tr>
       <tr>
         <td><p>Import</p></td>
         <td><p>Bulk insert or import entities</p></td>
         <td><p><a href="import-data.md">BulkInsert/Import</a></p></td>
       </tr>
       <tr>
         <td rowspan="10"><p>RBAC Privileges</p></td>
         <td><p>CreateOwnership</p></td>
         <td><p>Create a user or a role</p></td>
         <td><p><a href="users_and_roles.md">CreateUser/CreateRole</a></p></td>
       </tr>
       <tr>
         <td><p>UpdateUser</p></td>
         <td><p>Update the password of a user</p></td>
         <td><p><a href="users_and_roles.md">UpdateCredential</a></p></td>
       </tr>
       <tr>
         <td><p>DropOwnership</p></td>
         <td><p>Drop a user password or a role</p></td>
         <td><p><a href="drop_users_roles.md">DeleteCredential/DropRole</a></p></td>
       </tr>
       <tr>
         <td><p>SelectOwnership</p></td>
         <td><p>View all users that are granted a specific role</p></td>
         <td><p><a href="grant_roles.md">SelectRole/SelectGrant</a></p></td>
       </tr>
       <tr>
         <td><p>ManageOwnership</p></td>
         <td><p>Manage a user or a role or grant a role to a user</p></td>
         <td><p><a href="privilege_group.md">OperateUserRole/OperatePrivilege/OperatePrivilegeV2</a></p></td>
       </tr>
       <tr>
         <td><p>SelectUser</p></td>
         <td><p>View all roles granted to a user</p></td>
         <td><p><a href="grant_roles.md">SelectUser</a></p></td>
       </tr>
       <tr>
         <td><p>CreatePrivilegeGroup</p></td>
         <td><p>Create a privilege group</p></td>
         <td><p><a href="privilege_group.md">CreatePrivilegeGroup</a></p></td>
       </tr>
       <tr>
         <td><p>DropPrivilegeGroup</p></td>
         <td><p>Drop a privilege group</p></td>
         <td><p><a href="privilege_group.md">DropPrivilegeGroup</a></p></td>
       </tr>
       <tr>
         <td><p>ListPrivilegeGroups</p></td>
         <td><p>View all privilege groups in the current instance</p></td>
         <td><p><a href="privilege_group.md">ListPrivilegeGroups</a></p></td>
       </tr>
       <tr>
         <td><p>OperatePrivilegeGroup</p></td>
         <td><p>Add privileges to or remove privileges from a privilege group</p></td>
         <td><p><a href="privilege_group.md">OperatePrivilegeGroup</a></p></td>
       </tr>
    </table>

The following example demonstrates how to grant the privilege `PrivilegeSearch` on `collection_01` under the `default` database as well as a privilege group named `privilege_group_1` to the role `role_a`.

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

client.grant_privilege_v2(
    role_name="role_a",
    privilege="Search",
    collection_name='collection_01',
    db_name='default',
)
    
client.grant_privilege_v2(
    role_name="role_a",
    privilege="privilege_group_1",
    collection_name='collection_01',
    db_name='default',
)

client.grant_privilege_v2(
    role_name="role_a",
    privilege="ClusterReadOnly",
    collection_name='*',
    db_name='*',
)
```

```java
import io.milvus.v2.service.rbac.request.GrantPrivilegeReqV2

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName("role_a")
        .privilege("Search")
        .collectionName("collection_01")
        .dbName("default")
        .build());

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName("role_a")
        .privilege("privilege_group_1")
        .collectionName("collection_01")
        .dbName("default")
        .build());

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName("role_a")
        .privilege("ClusterReadOnly")
        .collectionName("*")
        .dbName("*")
        .build());
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

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option("role_a", "Search", "default", "collection_01"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option("role_a", "privilege_group_1", "default", "collection_01"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option("role_a", "ClusterReadOnly", "*", "*"))
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

await client.grantPrivilegeV2({
    role: "role_a",
    privilege: "Search"
    collection_name: 'collection_01'
    db_name: 'default',
});
    
await client.grantPrivilegeV2({
    role: "role_a",
    privilege: "privilege_group_1"
    collection_name: 'collection_01'
    db_name: 'default',
});

await client.grantPrivilegeV2({
    role: "role_a",
    privilege: "ClusterReadOnly"
    collection_name: '*'
    db_name: '*',
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/roles/grant_privilege_v2" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "roleName": "role_a",
    "privilege": "Search",
    "collectionName": "collection_01",
    "dbName":"default"
}'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/roles/grant_privilege_v2" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "roleName": "role_a",
    "privilege": "privilege_group_1",
    "collectionName": "collection_01",
    "dbName":"default"
}'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/roles/grant_privilege_v2" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "roleName": "role_a",
    "privilege": "ClusterReadOnly",
    "collectionName": "*",
    "dbName":"*"
}'

```

## Describe a role

The following example demonstrates how to view the privileges granted to the role `role_a` using the `describe_role` method.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client.describe_role(role_name="role_a")
```

```java
import io.milvus.v2.service.rbac.response.DescribeRoleResp;
import io.milvus.v2.service.rbac.request.DescribeRoleReq

DescribeRoleReq describeRoleReq = DescribeRoleReq.builder()
        .roleName("role_a")
        .build();
DescribeRoleResp resp = client.describeRole(describeRoleReq);
List<DescribeRoleResp.GrantInfo> infos = resp.getGrantInfos();
```

```go
import "github.com/milvus-io/milvus/client/v2/milvusclient"

role, err := client.DescribeRole(ctx, milvusclient.NewDescribeRoleOption("role_a"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```javascript
await client.describeRole({roleName: 'role_a'});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/roles/describe" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "roleName": "role_a"
}'
```

Below is an example output. 

```python
{
     "role": "role_a",
     "privileges": [
         {
             "collection_name": "collection_01",
             "db_name": "default",
             "role_name": "role_a",
             "privilege": "Search",
             "grantor_name": "root"
         },
         "privilege_group_1"
     ]
}
```

## Revoke a privilege or a privilege group from a role

The following example demonstrates how to revoke the privilege `PrivilegeSearch` on `collection_01` under the `default` database as well as the privilege group `privilege_group_1` that have been granted to the role `role_a`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
client.revoke_privilege_v2(
    role_name="role_a",
    privilege="Search",
    collection_name='collection_01',
    db_name='default',
)
    
client.revoke_privilege_v2(
    role_name="role_a",
    privilege="privilege_group_1",
    collection_name='collection_01',
    db_name='default',
)

client.revoke_privilege_v2(
    role_name="role_a",
    privilege="ClusterReadOnly",
    collection_name='*',
    db_name='*',
)
```

```java
import io.milvus.v2.service.rbac.request.RevokePrivilegeReqV2

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName("role_a")
        .privilege("Search")
        .collectionName("collection_01")
        .dbName("default")
        .build());

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName("role_a")
        .privilege("privilege_group_1")
        .collectionName("collection_01")
        .dbName("default")
        .build());

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName("role_a")
        .privilege("ClusterReadOnly")
        .collectionName("*")
        .dbName("*")
        .build());
```

```go
err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option("role_a", "Search", "collection_01").
        WithDbName("default"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option("role_a", "privilege_group_1", "collection_01").
    WithDbName("default"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option("role_a", "ClusterReadOnly", "*").
    WithDbName("*"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```javascript
await client.revokePrivilegeV2({
    role: 'role_a',
    privilege: 'Search',
    collection_name: 'collection_01',
    db_name: 'default'
});

await client.revokePrivilegeV2({
    role: 'role_a',
    collection_name: 'collection_01',
    privilege: 'Search',
    db_name: 'default'
});

await client.revokePrivilegeV2({
    role: 'role_a',
    collection_name: '*',
    privilege: 'ClusterReadOnly',
    db_name: '*'
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/roles/revoke_privilege_v2" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "roleName": "role_a",
    "privilege": "Search",
    "collectionName": "collection_01",
    "dbName":"default"
}'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/roles/revoke_privilege_v2" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "roleName": "role_a",
    "privilege": "Search",
    "collectionName": "collection_01",
    "dbName":"default"
}'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/roles/revoke_privilege_v2" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "roleName": "role_a",
    "privilege": "ClusterReadOnly",
    "collectionName": "*",
    "dbName":"*"
}'

```

