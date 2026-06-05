---
id: grant_privileges.md
title: Grant Privilege or Privilege Group to Roles
summary: >-
  Once a role is created, you can grant privileges to the role. This guide
  introduces how to grant privileges or privilege groups to a role.
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles" class="common-anchor-header">Grant Privilege or Privilege Group to Roles<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>Once a role is created, you can grant privileges to the role. This guide introduces how to grant privileges or privilege groups to a role.</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role" class="common-anchor-header">Grant a privilege or a privilege group to a role<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Milvus 2.5 introduces a new version of API which streamlines the grant operation. You no longer need to look up the object type when granting a privilege to a role. The following are the parameters and corresponding explanations.</p>
<ul>
<li><p><strong>role_name:</strong> The name of the target role to which privilege(s) or privilege group(s) need to be granted.</p></li>
<li><p><strong>Resource</strong>: The target resource of a privilege, which can be a specific instance, database, or collection.</p></li>
</ul>
<p>The following table explains how to specify the resource in the <code translate="no">client.grantV2()</code> method.</p>
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
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
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
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Input the name of your target database and a wildcard <code translate="no">*</code> as the collection name.</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Database</strong></p></td>
     <td><p>A specific database</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Input the name of your target database and a wildcard <code translate="no">*</code> as the collection name.</p></td>
   </tr>
   <tr>
     <td><p>All databases under the current instance</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Input <code translate="no">*</code> as the database name and <code translate="no">*</code> as the collection name.</p></td>
   </tr>
   <tr>
     <td><p><strong>Instance</strong></p></td>
     <td><p>The current instance</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="ClusterAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Input <code translate="no">*</code> as the database name and <code translate="no">*</code> as the collection name.</p></td>
   </tr>
</table>
<ul>
<li><p><strong>Privilege</strong>: The specific privilege or <a href="/docs/privilege_group.md">privilege group</a> that you need to grant to a role. Currently, Milvus provides 56 types of privileges that you can grant. The table below lists the privileges in Milvus.</p>
<p><div class="alert note"></p>
<p>The type column in the table below are user to facilitate your quick lookup for privileges and is used for classification purposes only. When granting privileges, you do not need to understand the types. You just need to input the corresponding privileges.</p>
<p></div></p>
<p><table>
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
<td><p><a href="/docs/manage_databases.md">ListDatabases</a></p></td>
</tr>
<tr>
<td><p>DescribeDatabase</p></td>
<td><p>View the details of a database</p></td>
<td><p><a href="/docs/manage_databases.md">DescribeDatabase</a></p></td>
</tr>
<tr>
<td><p>CreateDatabase</p></td>
<td><p>Create a database</p></td>
<td><p><a href="/docs/manage_databases.md">CreateDatabase</a></p></td>
</tr>
<tr>
<td><p>DropDatabase</p></td>
<td><p>Drop a database</p></td>
<td><p><a href="/docs/manage_databases.md">DropDatabase</a></p></td>
</tr>
<tr>
<td><p>AlterDatabase</p></td>
<td><p>Modify the properties of a database</p></td>
<td><p><a href="/docs/manage_databases.md">AlterDatabase</a></p></td>
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
<td><p><a href="/docs/view-collections.md">ShowCollections</a></p></td>
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
<td><p><a href="/docs/create-collection.md">CreateCollection</a></p></td>
</tr>
<tr>
<td><p>DropCollection</p></td>
<td><p>Drop a collection</p></td>
<td><p><a href="/docs/drop-collection.md">DropCollection</a></p></td>
</tr>
<tr>
<td><p>Load</p></td>
<td><p>Load a collection</p></td>
<td><p><a href="/docs/load-and-release.md">LoadCollection</a>/<a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">GetLoadingProgress</a>/<a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">GetLoadState</a></p></td>
</tr>
<tr>
<td><p>Release</p></td>
<td><p>Release a collection</p></td>
<td><p><a href="/docs/load-and-release.md">ReleaseCollection</a></p></td>
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
<td><p><a href="/docs/modify-collection.md">RenameCollection</a></p></td>
</tr>
<tr>
<td><p>CreateAlias</p></td>
<td><p>Create an alias for a collection</p></td>
<td><p><a href="/docs/manage-aliases.md">CreateAlias</a></p></td>
</tr>
<tr>
<td><p>DropAlias</p></td>
<td><p>Drop the alias of a collection</p></td>
<td><p><a href="/docs/manage-aliases.md">DropAlias</a></p></td>
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
<td><p><a href="/docs/manage-partitions.md">HasPartition</a></p></td>
</tr>
<tr>
<td><p>ShowPartitions</p></td>
<td><p>View all partitions in a collection</p></td>
<td><p><a href="/docs/manage-partitions.md">ShowPartitions</a></p></td>
</tr>
<tr>
<td><p>CreatePartition</p></td>
<td><p>Create a partition</p></td>
<td><p><a href="/docs/manage-partitions.md">CreatePartition</a></p></td>
</tr>
<tr>
<td><p>DropPartition</p></td>
<td><p>Drop a partition</p></td>
<td><p><a href="/docs/manage-partitions.md">DropPartition</a></p></td>
</tr>
<tr>
<td rowspan="3"><p>Index Privileges</p></td>
<td><p>IndexDetail</p></td>
<td><p>View the details of an index</p></td>
<td><p><a href="/docs/index-vector-fields.md">DescribeIndex/GetIndexState/GetIndexBuildProgress</a></p></td>
</tr>
<tr>
<td><p>CreateIndex</p></td>
<td><p>Create an index</p></td>
<td><p><a href="/docs/index-vector-fields.md">CreateIndex</a></p></td>
</tr>
<tr>
<td><p>DropIndex</p></td>
<td><p>Drop an index</p></td>
<td><p><a href="/docs/index-vector-fields.md">DropIndex</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>Resource Management Privileges</p></td>
<td><p>LoadBalance</p></td>
<td><p>Achieve load balance</p></td>
<td><p><a href="/docs/resource_group.md">LoadBalance</a></p></td>
</tr>
<tr>
<td><p>CreateResourceGroup</p></td>
<td><p>Create a resource group</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">CreateResourceGroup</a></p></td>
</tr>
<tr>
<td><p>DropResourceGroup</p></td>
<td><p>Drop a resource group</p></td>
<td><p><a href="/docs/resource_group.md">DropResourceGroup</a></p></td>
</tr>
<tr>
<td><p>UpdateResourceGroups</p></td>
<td><p>Update a resource group</p></td>
<td><p><a href="/docs/resource_group.md">UpdateResourceGroups</a></p></td>
</tr>
<tr>
<td><p>DescribeResourceGroup</p></td>
<td><p>View the details of a resource group</p></td>
<td><p><a href="/docs/resource_group.md">DescribeResourceGroup</a></p></td>
</tr>
<tr>
<td><p>ListResourceGroups</p></td>
<td><p>View all resource groups of the current instance</p></td>
<td><p><a href="/docs/resource_group.md">ListResourceGroups</a></p></td>
</tr>
<tr>
<td><p>TransferNode</p></td>
<td><p>Transfer nodes between resource groups</p></td>
<td><p><a href="/docs/resource_group.md">TransferNode</a></p></td>
</tr>
<tr>
<td><p>TransferReplica</p></td>
<td><p>Transfer replicas between resource groups</p></td>
<td><p><a href="/docs/resource_group.md">TransferReplica</a></p></td>
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
<td><p><a href="/docs/get-and-scalar-query.md">Query</a></p></td>
</tr>
<tr>
<td><p>Search</p></td>
<td><p>Conduct a search</p></td>
<td><p><a href="/docs/single-vector-search.md">Search</a></p></td>
</tr>
<tr>
<td><p>Insert</p></td>
<td><p>Insert entities</p></td>
<td><p><a href="/docs/insert-update-delete.md">Insert</a></p></td>
</tr>
<tr>
<td><p>Delete</p></td>
<td><p>Delete entities</p></td>
<td><p><a href="/docs/delete-entities.md">Delete</a></p></td>
</tr>
<tr>
<td><p>Upsert</p></td>
<td><p>Upsert entities</p></td>
<td><p><a href="/docs/upsert-entities.md">Upsert</a></p></td>
</tr>
<tr>
<td><p>Import</p></td>
<td><p>Bulk insert or import entities</p></td>
<td><p><a href="/docs/import-data.md">BulkInsert/Import</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>RBAC Privileges</p></td>
<td><p>CreateOwnership</p></td>
<td><p>Create a user or a role</p></td>
<td><p><a href="/docs/users_and_roles.md">CreateUser/CreateRole</a></p></td>
</tr>
<tr>
<td><p>UpdateUser</p></td>
<td><p>Update the password of a user</p></td>
<td><p><a href="/docs/users_and_roles.md">UpdateCredential</a></p></td>
</tr>
<tr>
<td><p>DropOwnership</p></td>
<td><p>Drop a user password or a role</p></td>
<td><p><a href="/docs/drop_users_roles.md">DeleteCredential/DropRole</a></p></td>
</tr>
<tr>
<td><p>SelectOwnership</p></td>
<td><p>View all users that are granted a specific role</p></td>
<td><p><a href="/docs/grant_roles.md">SelectRole/SelectGrant</a></p></td>
</tr>
<tr>
<td><p>ManageOwnership</p></td>
<td><p>Manage a user or a role or grant a role to a user</p></td>
<td><p><a href="/docs/privilege_group.md">OperateUserRole/OperatePrivilege/OperatePrivilegeV2</a></p></td>
</tr>
<tr>
<td><p>SelectUser</p></td>
<td><p>View all roles granted to a user</p></td>
<td><p><a href="/docs/grant_roles.md">SelectUser</a></p></td>
</tr>
<tr>
<td><p>CreatePrivilegeGroup</p></td>
<td><p>Create a privilege group</p></td>
<td><p><a href="/docs/privilege_group.md">CreatePrivilegeGroup</a></p></td>
</tr>
<tr>
<td><p>DropPrivilegeGroup</p></td>
<td><p>Drop a privilege group</p></td>
<td><p><a href="/docs/privilege_group.md">DropPrivilegeGroup</a></p></td>
</tr>
<tr>
<td><p>ListPrivilegeGroups</p></td>
<td><p>View all privilege groups in the current instance</p></td>
<td><p><a href="/docs/privilege_group.md">ListPrivilegeGroups</a></p></td>
</tr>
<tr>
<td><p>OperatePrivilegeGroup</p></td>
<td><p>Add privileges to or remove privileges from a privilege group</p></td>
<td><p><a href="/docs/privilege_group.md">OperatePrivilegeGroup</a></p></td>
</tr>
</table></p></li>
</ul>
<p>The following example demonstrates how to grant the privilege <code translate="no">PrivilegeSearch</code> on <code translate="no">collection_01</code> under the <code translate="no">default</code> database as well as a privilege group named <code translate="no">privilege_group_1</code> to the role <code translate="no">role_a</code>.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.GrantPrivilegeReqV2

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;Search&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;*&quot;</span>)
        .dbName(<span class="hljs-string">&quot;*&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, <span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;privilege_group_1&quot;</span>, <span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;Search&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
});
    
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;privilege_group_1&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;privilege_group_1&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-a-role" class="common-anchor-header">Describe a role<button data-href="#Describe-a-role" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>The following example demonstrates how to view the privileges granted to the role <code translate="no">role_a</code> using the <code translate="no">describe_role</code> method.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.describe_role(role_name=<span class="hljs-string">&quot;role_a&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.response.DescribeRoleResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.DescribeRoleReq

<span class="hljs-type">DescribeRoleReq</span> <span class="hljs-variable">describeRoleReq</span> <span class="hljs-operator">=</span> DescribeRoleReq.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .build();
<span class="hljs-type">DescribeRoleResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.describeRole(describeRoleReq);
List&lt;DescribeRoleResp.GrantInfo&gt; infos = resp.getGrantInfos();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

role, err := client.DescribeRole(ctx, milvusclient.NewDescribeRoleOption(<span class="hljs-string">&quot;role_a&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeRole</span>({<span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Below is an example output.</p>
<pre><code translate="no" class="language-python">{
     <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
     <span class="hljs-string">&quot;privileges&quot;</span>: [
         {
             <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;collection_01&quot;</span>,
             <span class="hljs-string">&quot;db_name&quot;</span>: <span class="hljs-string">&quot;default&quot;</span>,
             <span class="hljs-string">&quot;role_name&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
             <span class="hljs-string">&quot;privilege&quot;</span>: <span class="hljs-string">&quot;Search&quot;</span>,
             <span class="hljs-string">&quot;grantor_name&quot;</span>: <span class="hljs-string">&quot;root&quot;</span>
         },
         <span class="hljs-string">&quot;privilege_group_1&quot;</span>
     ]
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">Revoke a privilege or a privilege group from a role<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>The following example demonstrates how to revoke the privilege <code translate="no">PrivilegeSearch</code> on <code translate="no">collection_01</code> under the <code translate="no">default</code> database as well as the privilege group <code translate="no">privilege_group_1</code> that have been granted to the role <code translate="no">role_a</code>.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.RevokePrivilegeReqV2

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;Search&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;*&quot;</span>)
        .dbName(<span class="hljs-string">&quot;*&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>).
        WithDbName(<span class="hljs-string">&quot;default&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;privilege_group_1&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>).
    WithDbName(<span class="hljs-string">&quot;default&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>).
    WithDbName(<span class="hljs-string">&quot;*&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;Search&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;Search&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;ClusterReadOnly&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
