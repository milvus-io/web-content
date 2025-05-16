---
id: users_and_roles.md
related_key: 'users, roles'
summary: >-
  Learn about the definition of users, roles, objects, and privileges in
  role-based access control (RBAC).
title: Users and Roles
---
<h1 id="Users-and-Roles" class="common-anchor-header">Users and Roles<button data-href="#Users-and-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic explains the definition of users, roles, objects, and privileges in role-based access control (RBAC).</p>
<ul>
<li><p><strong>Object:</strong> An object to grant or deny access to. The object can be a collection, a partition, etc.</p></li>
<li><p><strong>User:</strong> A user identity with a username and a corresponding password.</p></li>
<li><p><strong>Privilege:</strong> A privilege defines the actions that can be performed and resources that can be accessed. A privilege cannot be granted to a user directly. It has to be granted to a role first.</p></li>
<li><p><strong>Role:</strong> A role defines the privilege(s) a user has to certain objects. After binding a role to a user, the user inherits all the privileges that are granted to this role.</p></li>
</ul>
<p>The following figure illustrates the relationship between objects, privileges, roles, and users.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.3.x/assets/users_and_roles.png" alt="users_and_roles" class="doc-image" id="users_and_roles" />
    <span>users_and_roles</span>
  </span>
</p>
<p>The relationship between object, privilege, role and user.</p>
<p>Milvus creates a <code translate="no">root</code> user by default with a default password <code translate="no">Milvus</code>. The <code translate="no">root</code> user is granted the <code translate="no">admin</code> privileges, which means that this <code translate="no">root</code> user can have access to all resources and perform all actions.</p>
<p>If a user is bind with a <code translate="no">public</code> role, this user is entitled to the privileges of <code translate="no">DescribeCollection</code>, <code translate="no">ShowCollections</code>, and <code translate="no">IndexDetail</code>.</p>
<p>The following table lists the values you can choose when <a href="/docs/v2.3.x/rbac.md">enabling RBAC</a>.</p>
<table>
<thead>
<tr><th>Object name</th><th>Privilege name</th><th>Relevant API description on the client side</th></tr>
</thead>
<tbody>
<tr><td>Collection</td><td>CreateIndex</td><td>CreateIndex</td></tr>
<tr><td>Collection</td><td>DropIndex</td><td>DropIndex</td></tr>
<tr><td>Collection</td><td>IndexDetail</td><td>DescribeIndex/GetIndexState/GetIndexBuildProgress</td></tr>
<tr><td>Collection</td><td>Load</td><td>LoadCollection/GetLoadingProgress/GetLoadState</td></tr>
<tr><td>Collection</td><td>GetLoadingProgress</td><td>GetLoadingProgress</td></tr>
<tr><td>Collection</td><td>GetLoadState</td><td>GetLoadState</td></tr>
<tr><td>Collection</td><td>Release</td><td>ReleaseCollection</td></tr>
<tr><td>Collection</td><td>Insert</td><td>Insert</td></tr>
<tr><td>Collection</td><td>Delete</td><td>Delete</td></tr>
<tr><td>Collection</td><td>Upsert</td><td>Upsert</td></tr>
<tr><td>Collection</td><td>Search</td><td>Search</td></tr>
<tr><td>Collection</td><td>Flush</td><td>Flush/GetFlushState</td></tr>
<tr><td>Collection</td><td>GetFlushState</td><td>GetFlushState</td></tr>
<tr><td>Collection</td><td>Query</td><td>Query</td></tr>
<tr><td>Collection</td><td>GetStatistics</td><td>GetCollectionStatistics</td></tr>
<tr><td>Collection</td><td>Compaction</td><td>Compact</td></tr>
<tr><td>Collection</td><td>Import</td><td>BulkInsert/Import</td></tr>
<tr><td>Collection</td><td>LoadBalance</td><td>LoadBalance</td></tr>
<tr><td>Collection</td><td>CreatePartition</td><td>CreatePartition</td></tr>
<tr><td>Collection</td><td>DropPartition</td><td>DropPartition</td></tr>
<tr><td>Collection</td><td>ShowPartitions</td><td>ShowPartitions</td></tr>
<tr><td>Collection</td><td>HasPartition</td><td>HasPartition</td></tr>
<tr><td>Global</td><td>All</td><td>All API operation permissions in this table</td></tr>
<tr><td>Global</td><td>CreateCollection</td><td>CreateCollection</td></tr>
<tr><td>Global</td><td>DropCollection</td><td>DropCollection</td></tr>
<tr><td>Global</td><td>DescribeCollection</td><td>DescribeCollection</td></tr>
<tr><td>Global</td><td>ShowCollections</td><td>ShowCollections</td></tr>
<tr><td>Global</td><td>RenameCollection</td><td>RenameCollection</td></tr>
<tr><td>Global</td><td>FlushAll</td><td>FlushAll</td></tr>
<tr><td>Global</td><td>CreateOwnership</td><td>CreateUser CreateRole</td></tr>
<tr><td>Global</td><td>DropOwnership</td><td>DeleteCredential DropRole</td></tr>
<tr><td>Global</td><td>SelectOwnership</td><td>SelectRole/SelectGrant</td></tr>
<tr><td>Global</td><td>ManageOwnership</td><td>OperateUserRole OperatePrivilege</td></tr>
<tr><td>Global</td><td>CreateResourceGroup</td><td>CreateResourceGroup</td></tr>
<tr><td>Global</td><td>DropResourceGroup</td><td>DropResourceGroup</td></tr>
<tr><td>Global</td><td>DescribeResourceGroup</td><td>DescribeResourceGroup</td></tr>
<tr><td>Global</td><td>ListResourceGroups</td><td>ListResourceGroups</td></tr>
<tr><td>Global</td><td>TransferNode</td><td>TransferNode</td></tr>
<tr><td>Global</td><td>TransferReplica</td><td>TransferReplica</td></tr>
<tr><td>Global</td><td>CreateDatabase</td><td>CreateDatabase</td></tr>
<tr><td>Global</td><td>DropDatabase</td><td>DropDatabase</td></tr>
<tr><td>Global</td><td>ListDatabases</td><td>ListDatabases</td></tr>
<tr><td>Global</td><td>CreateAlias</td><td>CreateAlias</td></tr>
<tr><td>Global</td><td>DropAlias</td><td>DropAlias</td></tr>
<tr><td>Global</td><td>DescribeAlias</td><td>DescribeAlias</td></tr>
<tr><td>Global</td><td>ListAliases</td><td>ListAliases</td></tr>
<tr><td>User</td><td>UpdateUser</td><td>UpdateCredential</td></tr>
<tr><td>User</td><td>SelectUser</td><td>SelectUser</td></tr>
</tbody>
</table>
<div class="alert note">
<li>Object and privilege names are case-sensitive.</li>
<li>To grant all privileges to a kind of object, like Collection, Global, User, use "*" for privilege name. </li>
<li>The "*" privilege name for the Global object doesn't include the All privilege, because the All privilege includes all permissions, including any collection and user object.</li>
</div>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Learn how to <a href="/docs/v2.3.x/rbac.md">enable RBAC</a>.</li>
</ul>
