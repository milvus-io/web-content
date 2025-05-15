---
id: users_and_roles.md
related_key: 'users, roles'
summary: >-
  Learn about the definition of users, roles, objects, and privileges in
  role-based access control (RBAC).
title: 'Users, Privileges, and Roles'
---
<h1 id="Users-Privileges-and-Roles" class="common-anchor-header">Users, Privileges, and Roles<button data-href="#Users-Privileges-and-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic provides an overview of Role-Based Access Control (RBAC) in Milvus, detailing the definitions and relationships between users, roles, objects, and privileges.</p>
<p>The following figure illustrates the relationship between objects, privileges, roles, and users.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/users_and_roles.png" alt="users_and_roles" class="doc-image" id="users_and_roles" />
    <span>users_and_roles</span>
  </span>
</p>
<h2 id="Key-concepts" class="common-anchor-header">Key concepts<button data-href="#Key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>To manage access control to Milvus resources, it’s important to understand the key components of RBAC: object types, object names, users, roles, and privileges.</p>
<ul>
<li><p><strong>Object type</strong>: the category of the object for which a privilege is being assigned. The object type can be:</p>
<ul>
<li><code translate="no">Global</code>: System-wide objects, allowing the user to perform actions that affect all collections, users, or system-wide settings.</li>
<li><code translate="no">Collection</code>: Collection-specific objects, allowing the user to perform actions such as creating indexes, loading data, inserting or deleting data, and querying data within a specific collection.</li>
<li><code translate="no">User</code>: Objects related to user management, allowing the user to manage credentials and roles for database users, such as updating user credentials or viewing user details.</li>
</ul></li>
<li><p><strong>Object name</strong>: the specific name of the object to control access for. For instance:</p>
<ul>
<li>If the object type is <code translate="no">Global</code>, the object name must be set to the wildcard (<code translate="no">*</code>), indicating all objects of the specified type.</li>
<li>If the object type is <code translate="no">Collection</code>, the object name is the name of a collection.</li>
<li>If the object type is <code translate="no">User</code>, the object name is the name of a database user.</li>
</ul></li>
<li><p><strong>User</strong>: a person or an application that interacts with Milvus, which consists of a username and a corresponding password.</p></li>
<li><p><strong>Privilege</strong>: defines the actions that can be performed and the resources that can be accessed. Privileges are not granted directly to users but are assigned to roles.</p></li>
<li><p><strong>Role</strong>: defines the set of privileges that a user has for certain objects. Once a role is bound to a user, the user inherits all the privileges granted to that role.</p></li>
</ul>
<h2 id="Example-Granting-privileges" class="common-anchor-header">Example: Granting privileges<button data-href="#Example-Granting-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>The following code snippet shows how to grant a <code translate="no">CreateIndex</code> privilege to a role on a specific collection:</p>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python">milvusClient.grant_privilege(
    role_name=<span class="hljs-string">&quot;CUSTOM_ROLE_NAME&quot;</span>,
    object_type=<span class="hljs-string">&quot;Collection&quot;</span>,  <span class="hljs-comment"># Valid value: Global, Collection or User.</span>
    privilege=<span class="hljs-string">&quot;CreateIndex&quot;</span>,   <span class="hljs-comment"># See the table below for valid privilege names and relevant API descriptions.</span>
    object_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>  <span class="hljs-comment"># The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">GrantPrivilegeReq</span> <span class="hljs-variable">grantPrivilegeReq</span> <span class="hljs-operator">=</span> GrantPrivilegeReq.builder()
        .roleName(<span class="hljs-string">&quot;roleName&quot;</span>)
        .objectName(<span class="hljs-string">&quot;CollectionName&quot;</span>) <span class="hljs-comment">// The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
        .objectType(<span class="hljs-string">&quot;Collection&quot;</span>) <span class="hljs-comment">// Valid value: Global, Collection or User.</span>
        .privilege(<span class="hljs-string">&quot;CreateIndex&quot;</span>) <span class="hljs-comment">// See the table below for valid privilege names and relevant API descriptions.</span>
        .build();
client.grantPrivilege(grantPrivilegeReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">milvusClient.<span class="hljs-title function_">grantPrivilege</span>({
   <span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;roleName&#x27;</span>,
   <span class="hljs-attr">object</span>: <span class="hljs-string">&#x27;Collection&#x27;</span>,  <span class="hljs-comment">// Valid value: Global, Collection or User.</span>
   <span class="hljs-attr">objectName</span>: <span class="hljs-string">&#x27;CollectionName&#x27;</span>, <span class="hljs-comment">// The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
   <span class="hljs-attr">privilegeName</span>: <span class="hljs-string">&#x27;CreateIndex&#x27;</span> <span class="hljs-comment">// See the table below for valid privilege names and relevant API descriptions.</span>
 })
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>To obtain more information about privilege-related APIs, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md">grant_privilege</a> and <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md">revoke_privilege</a>.</p>
</div>
<div class="language-java">
<p>To obtain more information about privilege-related APIs, refer to <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/grantPrivilege.md">grantPrivilege</a> and <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<div class="language-javascript">
<p>To obtain more information about privilege-related APIs, refer to <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/grantPrivilege.md">grantPrivilege</a> and <a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/revokePrivilege.md">revokePrivilege</a>.</p>
</div>
<h2 id="Default-users-and-roles" class="common-anchor-header">Default users and roles<button data-href="#Default-users-and-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus creates a <code translate="no">root</code> user by default with a default password <code translate="no">Milvus</code>. The <code translate="no">root</code> user is granted the <code translate="no">admin</code> privileges, which means that this <code translate="no">root</code> user can have access to all resources and perform all actions.</p>
<p>If a user is associated with the <code translate="no">public</code> role, they are entitled to the following privileges:</p>
<ul>
<li><code translate="no">DescribeCollection</code></li>
<li><code translate="no">ShowCollections</code></li>
<li><code translate="no">IndexDetail</code></li>
</ul>
<h2 id="List-of-object-types-and-privileges" class="common-anchor-header">List of object types and privileges<button data-href="#List-of-object-types-and-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>The following table lists the values you can choose when <a href="/docs/v2.4.x/rbac.md">enabling RBAC</a>.</p>
<table>
<thead>
<tr><th>Object type</th><th>Privilege name</th><th>Relevant API description on the client side</th></tr>
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
<li>Learn how to <a href="/docs/v2.4.x/rbac.md">enable RBAC</a>.</li>
</ul>
