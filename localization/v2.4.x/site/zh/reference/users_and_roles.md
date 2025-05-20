---
id: users_and_roles.md
related_key: 'users, roles'
summary: 了解基于角色的访问控制（RBAC）中用户、角色、对象和权限的定义。
title: 用户、权限和角色
---
<h1 id="Users-Privileges-and-Roles" class="common-anchor-header">用户、权限和角色<button data-href="#Users-Privileges-and-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题概述了 Milvus 中基于角色的访问控制（RBAC），详细介绍了用户、角色、对象和权限之间的定义和关系。</p>
<p>下图说明了对象、权限、角色和用户之间的关系。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/users_and_roles.png" alt="users_and_roles" class="doc-image" id="users_and_roles" />
   </span> <span class="img-wrapper"> <span>用户和角色</span> </span></p>
<h2 id="Key-concepts" class="common-anchor-header">关键概念<button data-href="#Key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>要管理对 Milvus 资源的访问控制，必须了解 RBAC 的关键组成部分：对象类型、对象名称、用户、角色和权限。</p>
<ul>
<li><p>对象<strong>类型</strong>：分配权限的对象类别。对象类型可以是</p>
<ul>
<li><code translate="no">Global</code>:全系统对象，允许用户执行影响所有 Collections、用户或全系统设置的操作。</li>
<li><code translate="no">Collection</code>:特定于 Collections 的对象，允许用户执行创建索引、加载数据、插入或删除数据以及查询特定 Collections 中的数据等操作。</li>
<li><code translate="no">User</code>:与用户管理相关的对象，允许用户管理数据库用户的凭证和角色，如更新用户凭证或查看用户详细信息。</li>
</ul></li>
<li><p><strong>对象名称</strong>：要控制访问的对象的具体名称。例如</p>
<ul>
<li>如果对象类型为<code translate="no">Global</code> ，则必须将对象名称设置为通配符 (<code translate="no">*</code>)，表示指定类型的所有对象。</li>
<li>如果对象类型是<code translate="no">Collection</code> ，对象名称就是一个 Collection 的名称。</li>
<li>如果对象类型为<code translate="no">User</code> ，对象名称就是数据库用户的名称。</li>
</ul></li>
<li><p><strong>用户</strong>：与 Milvus 交互的人或应用程序，由用户名和相应的密码组成。</p></li>
<li><p><strong>权限</strong>：定义可执行的操作和可访问的资源。权限不直接授予用户，而是分配给角色。</p></li>
<li><p><strong>角色</strong>：定义用户对某些对象所拥有的一系列权限。角色一旦与用户绑定，用户就会继承授予该角色的所有权限。</p></li>
</ul>
<h2 id="Example-Granting-privileges" class="common-anchor-header">举例说明：授予权限<button data-href="#Example-Granting-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>下面的代码片段展示了如何在特定 Collections 上向角色授予<code translate="no">CreateIndex</code> 权限：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
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
<pre><code translate="no" class="language-javascript">milvusClient.grantPrivilege({
   roleName: <span class="hljs-string">&#x27;roleName&#x27;</span>,
   <span class="hljs-built_in">object</span>: <span class="hljs-string">&#x27;Collection&#x27;</span>,  <span class="hljs-comment">// Valid value: Global, Collection or User.</span>
   objectName: <span class="hljs-string">&#x27;CollectionName&#x27;</span>, <span class="hljs-comment">// The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
   privilegeName: <span class="hljs-string">&#x27;CreateIndex&#x27;</span> <span class="hljs-comment">// See the table below for valid privilege names and relevant API descriptions.</span>
 })
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>要获取权限相关 API 的更多信息，请参阅<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md">grant_privilege</a>和<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md">revoke</a> <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md">_</a> <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md">privilege</a>。</p>
</div>
<div class="language-java">
<p>要获取权限相关 API 的更多信息，请参阅<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/grantPrivilege.md">grantPrivilege</a>和<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/revokePrivilege.md">revokePrivilege</a>。</p>
</div>
<div class="language-javascript">
<p>要获取权限相关 API 的更多信息，请参阅<a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/grantPrivilege.md">grantPrivilege</a>和<a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/revokePrivilege.md">revokePrivilege</a>。</p>
</div>
<h2 id="Default-users-and-roles" class="common-anchor-header">默认用户和角色<button data-href="#Default-users-and-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 默认创建一个<code translate="no">root</code> 用户，默认密码为<code translate="no">Milvus</code> 。<code translate="no">root</code> 用户被授予<code translate="no">admin</code> 权限，这意味着该<code translate="no">root</code> 用户可以访问所有资源并执行所有操作。</p>
<p>如果用户与<code translate="no">public</code> 角色相关联，则有权获得以下权限：</p>
<ul>
<li><code translate="no">DescribeCollection</code></li>
<li><code translate="no">ShowCollections</code></li>
<li><code translate="no">IndexDetail</code></li>
</ul>
<h2 id="List-of-object-types-and-privileges" class="common-anchor-header">对象类型和权限列表<button data-href="#List-of-object-types-and-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>下表列出了<a href="/docs/zh/v2.4.x/rbac.md">启用 RBAC</a> 时可以选择的值。</p>
<table>
<thead>
<tr><th>对象类型</th><th>权限名称</th><th>客户端相关 API 说明</th></tr>
</thead>
<tbody>
<tr><td>Collections</td><td>创建索引</td><td>创建索引</td></tr>
<tr><td>Collections</td><td>下拉索引</td><td>下拉索引</td></tr>
<tr><td>Collections</td><td>索引详情</td><td>DescribeIndex/GetIndexState/GetIndexBuildProgress</td></tr>
<tr><td>Collections</td><td>加载</td><td>载入集合/获取载入进度/获取载入状态</td></tr>
<tr><td>Collections</td><td>获取加载进度</td><td>获取加载进度</td></tr>
<tr><td>Collections</td><td>获取加载状态</td><td>获取加载状态</td></tr>
<tr><td>Collections</td><td>释放</td><td>释放集合</td></tr>
<tr><td>Collection</td><td>插入</td><td>插入</td></tr>
<tr><td>Collections</td><td>删除</td><td>删除</td></tr>
<tr><td>Collections</td><td>插入</td><td>插入</td></tr>
<tr><td>Collections</td><td>搜索</td><td>搜索</td></tr>
<tr><td>Collections</td><td>冲洗</td><td>冲洗/获取冲洗状态</td></tr>
<tr><td>Collections</td><td>获取冲洗状态</td><td>获取冲洗状态</td></tr>
<tr><td>Collections</td><td>查询</td><td>查询</td></tr>
<tr><td>Collections</td><td>获取统计信息</td><td>获取收藏统计信息</td></tr>
<tr><td>Collections</td><td>压缩</td><td>压缩</td></tr>
<tr><td>Collections</td><td>导入</td><td>批量输入/导入</td></tr>
<tr><td>Collections</td><td>负载平衡</td><td>负载平衡</td></tr>
<tr><td>Collections</td><td>创建分区</td><td>创建分区</td></tr>
<tr><td>Collections</td><td>删除分区</td><td>删除分区</td></tr>
<tr><td>Collections</td><td>显示分区</td><td>显示分区</td></tr>
<tr><td>Collections</td><td>具有分区</td><td>有分区</td></tr>
<tr><td>全局</td><td>全局</td><td>该表中的所有 API 操作符权限</td></tr>
<tr><td>全局</td><td>创建数据集</td><td>创建集合</td></tr>
<tr><td>全局</td><td>删除收藏</td><td>下拉菜单</td></tr>
<tr><td>全局</td><td>描述收藏集</td><td>描述集合</td></tr>
<tr><td>全局</td><td>显示收藏集</td><td>显示收藏集</td></tr>
<tr><td>全局</td><td>重命名收藏集</td><td>重命名收藏集</td></tr>
<tr><td>全局</td><td>全部清除</td><td>全部清除</td></tr>
<tr><td>全局</td><td>创建所有者</td><td>创建用户 创建角色</td></tr>
<tr><td>全局</td><td>删除所有权</td><td>删除凭证 删除角色</td></tr>
<tr><td>全局</td><td>选择所有权</td><td>选择角色/选择授权</td></tr>
<tr><td>全局</td><td>管理所有权</td><td>操作用户角色 操作权限</td></tr>
<tr><td>全局</td><td>创建资源组</td><td>创建资源组</td></tr>
<tr><td>全局</td><td>删除资源组</td><td>下拉资源组</td></tr>
<tr><td>全局</td><td>描述资源组</td><td>描述资源组</td></tr>
<tr><td>全局</td><td>列出资源组</td><td>列出资源组</td></tr>
<tr><td>全局</td><td>传输节点</td><td>传输节点</td></tr>
<tr><td>全局</td><td>传输复制</td><td>传输复制</td></tr>
<tr><td>全局</td><td>创建数据库</td><td>创建数据库</td></tr>
<tr><td>全局</td><td>删除数据库</td><td>删除数据库</td></tr>
<tr><td>全局</td><td>列出数据库</td><td>列表数据库</td></tr>
<tr><td>全局</td><td>创建别名</td><td>创建别名</td></tr>
<tr><td>全局</td><td>删除别名</td><td>删除别名</td></tr>
<tr><td>全局</td><td>描述别名</td><td>描述别名</td></tr>
<tr><td>全局</td><td>列出别名</td><td>列出参数</td></tr>
<tr><td>用户</td><td>更新用户</td><td>更新证书</td></tr>
<tr><td>用户</td><td>选择用户</td><td>选择用户</td></tr>
</tbody>
</table>
<div class="alert note">
<li>对象和权限名称区分大小写。</li>
<li>要向某类对象（如 Collections、Global、User）授予所有权限，请使用 "*"作为权限名称。 </li>
<li>全局对象的权限名称 "*"不包括 All 权限，因为 All 权限包括所有权限，包括任何 Collections 和用户对象。</li>
</div>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>了解如何<a href="/docs/zh/v2.4.x/rbac.md">启用 RBAC</a>。</li>
</ul>
