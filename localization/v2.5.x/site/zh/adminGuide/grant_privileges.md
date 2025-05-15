---
id: grant_privileges.md
title: 为角色授予权限或权限组
summary: >-
  Once a role is created, you can grant privileges to the role. This guide
  introduces how to grant privileges or privilege groups to a role.
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles" class="common-anchor-header">为角色授予权限或权限组<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>创建角色后，就可以向角色授予权限。本指南将介绍如何向角色授予权限或权限组。</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role" class="common-anchor-header">向角色授予权限或权限组<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.5 引入了新版本的 API，简化了授予操作。向角色授予权限时，不再需要查找对象类型。以下是参数和相应的解释。</p>
<ul>
<li><p><strong>role_name：</strong>需要授予权限或权限组的目标角色名称。</p></li>
<li><p><strong>资源</strong>：特权的目标资源，可以是特定实例、数据库或 Collections。</p></li>
</ul>
<p>下表解释了如何在<code translate="no">client.grantV2()</code> 方法中指定资源。</p>
<table>
   <tr>
     <th><p><strong>级别</strong></p></th>
     <th><p><strong>资源</strong></p></th>
     <th><p><strong>授予方法</strong></p></th>
     <th><p><strong>注释</strong></p></th>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Collections</strong></p></td>
     <td><p>特定 Collections</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="col1", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>输入目标 Collection 的名称和目标 Collection 所属数据库的名称。</p></td>
   </tr>
   <tr>
     <td><p>特定数据库下的所有集合</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>输入目标数据库名称和通配符<code translate="no">*</code> 作为 Collection 名称。</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>数据库</strong></p></td>
     <td><p>特定数据库</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>输入目标数据库的名称和通配符<code translate="no">*</code> 作为 Collections 名称。</p></td>
   </tr>
   <tr>
     <td><p>当前实例下的所有数据库</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>输入<code translate="no">*</code> 作为数据库名称，输入<code translate="no">*</code> 作为 Collections 名称。</p></td>
   </tr>
   <tr>
     <td><p><strong>实例</strong></p></td>
     <td><p>当前实例</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="ClusterAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>输入<code translate="no">*</code> 作为数据库名称，输入<code translate="no">*</code> 作为 Collections 名称。</p></td>
   </tr>
</table>
<ul>
<li><p><strong>权限</strong>：需要授予角色的特定权限或<a href="/docs/zh/privilege_group.md">权限组</a>。目前，Milvus 提供了 56 种可授予的特权。下表列出了 Milvus 中的特权。</p>
<p><div class="alert note"></p>
<p>下表中的类型列是用户为方便快速查找特权而设置的，仅用于分类目的。授予权限时，不需要了解类型。只需输入相应的权限即可。</p>
<p></div></p>
<p><table>
<tr>
<th><p><strong>类型</strong></p></th>
<th><p><strong>权限</strong></p></th>
<th><p><strong>说明</strong></p></th>
<th><p><strong>客户端的相关 API 说明</strong></p></th>
</tr>
<tr>
<td rowspan="5"><p>数据库权限</p></td>
<td><p>列出数据库</p></td>
<td><p>查看当前实例中的所有数据库</p></td>
<td><p><a href="/docs/zh/manage_databases.md">列出数据库</a></p></td>
</tr>
<tr>
<td><p>描述数据库</p></td>
<td><p>查看数据库的详细信息</p></td>
<td><p><a href="/docs/zh/manage_databases.md">描述数据库</a></p></td>
</tr>
<tr>
<td><p>创建数据库</p></td>
<td><p>创建数据库</p></td>
<td><p><a href="/docs/zh/manage_databases.md">创建数据库</a></p></td>
</tr>
<tr>
<td><p>删除数据库</p></td>
<td><p>删除数据库</p></td>
<td><p><a href="/docs/zh/manage_databases.md">删除数据库</a></p></td>
</tr>
<tr>
<td><p>更改数据库</p></td>
<td><p>修改数据库属性</p></td>
<td><p><a href="/docs/zh/manage_databases.md">更改数据库</a></p></td>
</tr>
<tr>
<td rowspan="18"><p>Collections 权限</p></td>
<td><p>获取刷新状态</p></td>
<td><p>检查 Collections 清除操作符的状态</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">获取刷新状态</a></p></td>
</tr>
<tr>
<td><p>获取加载状态</p></td>
<td><p>检查 Collections 的加载状态</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">获取加载状态</a></p></td>
</tr>
<tr>
<td><p>获取加载进度</p></td>
<td><p>检查 Collections 的加载进度</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">获取加载进度</a></p></td>
</tr>
<tr>
<td><p>显示收藏集</p></td>
<td><p>查看具有收藏权限的所有 Collections</p></td>
<td><p><a href="/docs/zh/view-collections.md">显示收藏集</a></p></td>
</tr>
<tr>
<td><p>列出别名</p></td>
<td><p>查看某个 Collection 的所有别名</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">列出别名</a></p></td>
</tr>
<tr>
<td><p>描述收藏集</p></td>
<td><p>查看 Collections 的详细信息</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">描述集合</a></p></td>
</tr>
<tr>
<td><p>描述别名</p></td>
<td><p>查看别名的详细信息</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">描述别名</a></p></td>
</tr>
<tr>
<td><p>获取统计数据</p></td>
<td><p>获取 Collections 的统计数据（如 Collections 中实体的数量）</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">获取集合统计信息</a></p></td>
</tr>
<tr>
<td><p>创建集合</p></td>
<td><p>创建 Collections</p></td>
<td><p><a href="/docs/zh/create-collection.md">创建收藏集</a></p></td>
</tr>
<tr>
<td><p>删除收藏集</p></td>
<td><p>删除 Collections</p></td>
<td><p><a href="/docs/zh/drop-collection.md">删除收藏集</a></p></td>
</tr>
<tr>
<td><p>加载</p></td>
<td><p>加载 Collections</p></td>
<td><p><a href="/docs/zh/load-and-release.md">加载集合/获取加载进度/</a><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">获取</a><a href="/docs/zh/load-and-release.md">加载状态</a></p></td>
</tr>
<tr>
<td><p>释放</p></td>
<td><p>释放一个 Collections</p></td>
<td><p><a href="/docs/zh/load-and-release.md">释放集合</a></p></td>
</tr>
<tr>
<td><p>刷新</p></td>
<td><p>将 Collections 中的所有实体持久化到一个密封段中。任何在冲洗操作后插入的实体都将存储在新的段中。</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">刷新/获取刷新</a><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">状态</a></p></td>
</tr>
<tr>
<td><p>压缩</p></td>
<td><p>手动触发压缩</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Management/compact.md">压缩</a></p></td>
</tr>
<tr>
<td><p>重命名集合</p></td>
<td><p>重命名 Collections</p></td>
<td><p><a href="/docs/zh/modify-collection.md">重命名集合</a></p></td>
</tr>
<tr>
<td><p>创建别名</p></td>
<td><p>为 Collections 创建别名</p></td>
<td><p><a href="/docs/zh/manage-aliases.md">创建别名</a></p></td>
</tr>
<tr>
<td><p>删除别名</p></td>
<td><p>删除 Collections 的别名</p></td>
<td><p><a href="/docs/zh/manage-aliases.md">删除别名</a></p></td>
</tr>
<tr>
<td><p>全部清除</p></td>
<td><p>清除数据库中的所有 Collections</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">全部清除</a></p></td>
</tr>
<tr>
<td rowspan="4"><p>分区权限</p></td>
<td><p>有分区</p></td>
<td><p>检查是否存在分区</p></td>
<td><p><a href="/docs/zh/manage-partitions.md">HasPartition</a></p></td>
</tr>
<tr>
<td><p>显示分区</p></td>
<td><p>查看 Collections 中的所有分区</p></td>
<td><p><a href="/docs/zh/manage-partitions.md">显示分区</a></p></td>
</tr>
<tr>
<td><p>创建分区</p></td>
<td><p>创建分区</p></td>
<td><p><a href="/docs/zh/manage-partitions.md">创建分区</a></p></td>
</tr>
<tr>
<td><p>删除分区</p></td>
<td><p>删除分区</p></td>
<td><p><a href="/docs/zh/manage-partitions.md">删除分区</a></p></td>
</tr>
<tr>
<td rowspan="3"><p>索引权限</p></td>
<td><p>索引详情</p></td>
<td><p>查看索引的详细信息</p></td>
<td><p><a href="/docs/zh/index-vector-fields.md">DescribeIndex/GetIndexState/GetIndexBuildProgress</a></p></td>
</tr>
<tr>
<td><p>创建索引</p></td>
<td><p>创建索引</p></td>
<td><p><a href="/docs/zh/index-vector-fields.md">创建索引</a></p></td>
</tr>
<tr>
<td><p>删除索引</p></td>
<td><p>删除索引</p></td>
<td><p><a href="/docs/zh/index-vector-fields.md">删除索引</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>资源管理权限</p></td>
<td><p>负载平衡</p></td>
<td><p>实现负载平衡</p></td>
<td><p><a href="/docs/zh/resource_group.md">负载平衡</a></p></td>
</tr>
<tr>
<td><p>创建资源组</p></td>
<td><p>创建资源组</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">创建资源组</a></p></td>
</tr>
<tr>
<td><p>删除资源组</p></td>
<td><p>删除资源组</p></td>
<td><p><a href="/docs/zh/resource_group.md">删除资源组</a></p></td>
</tr>
<tr>
<td><p>更新资源组</p></td>
<td><p>更新资源组</p></td>
<td><p><a href="/docs/zh/resource_group.md">更新资源组</a></p></td>
</tr>
<tr>
<td><p>描述资源组</p></td>
<td><p>查看资源组的详细信息</p></td>
<td><p><a href="/docs/zh/resource_group.md">描述资源组</a></p></td>
</tr>
<tr>
<td><p>列出资源组</p></td>
<td><p>查看当前实例的所有资源组</p></td>
<td><p><a href="/docs/zh/resource_group.md">列出资源组</a></p></td>
</tr>
<tr>
<td><p>转移节点</p></td>
<td><p>在资源组之间转移节点</p></td>
<td><p><a href="/docs/zh/resource_group.md">传输节点</a></p></td>
</tr>
<tr>
<td><p>传输副本</p></td>
<td><p>在资源组之间传输副本</p></td>
<td><p><a href="/docs/zh/resource_group.md">传输复制</a></p></td>
</tr>
<tr>
<td><p>备份 RBAC</p></td>
<td><p>为当前实例中所有与 RBAC 相关的操作创建备份</p></td>
<td><p>备份 RBAC</p></td>
</tr>
<tr>
<td><p>还原 RBAC</p></td>
<td><p>恢复当前实例中所有 RBAC 相关操作的备份</p></td>
<td><p>还原 RBAC</p></td>
</tr>
<tr>
<td rowspan="6"><p>实体权限</p></td>
<td><p>查询</p></td>
<td><p>进行查询</p></td>
<td><p><a href="/docs/zh/get-and-scalar-query.md">查询</a></p></td>
</tr>
<tr>
<td><p>搜索</p></td>
<td><p>进行搜索</p></td>
<td><p><a href="/docs/zh/single-vector-search.md">搜索</a></p></td>
</tr>
<tr>
<td><p>插入</p></td>
<td><p>插入实体</p></td>
<td><p><a href="/docs/zh/insert-update-delete.md">插入</a></p></td>
</tr>
<tr>
<td><p>删除</p></td>
<td><p>删除实体</p></td>
<td><p><a href="/docs/zh/delete-entities.md">删除</a></p></td>
</tr>
<tr>
<td><p>插入</p></td>
<td><p>插入实体</p></td>
<td><p><a href="/docs/zh/upsert-entities.md">插入</a></p></td>
</tr>
<tr>
<td><p>导入</p></td>
<td><p>批量插入或导入实体</p></td>
<td><p><a href="/docs/zh/import-data.md">批量插入/导入</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>RBAC 权限</p></td>
<td><p>创建所有权</p></td>
<td><p>创建用户或角色</p></td>
<td><p><a href="/docs/zh/users_and_roles.md">创建用户/创建角色</a></p></td>
</tr>
<tr>
<td><p>更新用户</p></td>
<td><p>更新用户密码</p></td>
<td><p><a href="/docs/zh/users_and_roles.md">更新凭证</a></p></td>
</tr>
<tr>
<td><p>删除所有权</p></td>
<td><p>删除用户密码或角色</p></td>
<td><p><a href="/docs/zh/drop_users_roles.md">删除凭证/删除角色</a></p></td>
</tr>
<tr>
<td><p>选择所有权</p></td>
<td><p>查看被授予特定角色的所有用户</p></td>
<td><p><a href="/docs/zh/grant_roles.md">选择角色/选择授权</a></p></td>
</tr>
<tr>
<td><p>管理所有权</p></td>
<td><p>管理用户或角色，或向用户授予角色</p></td>
<td><p><a href="/docs/zh/privilege_group.md">操作用户角色/操作权限/操作权限 V2</a></p></td>
</tr>
<tr>
<td><p>选择用户</p></td>
<td><p>查看授予用户的所有角色</p></td>
<td><p><a href="/docs/zh/grant_roles.md">选择用户</a></p></td>
</tr>
<tr>
<td><p>创建权限组</p></td>
<td><p>创建权限组</p></td>
<td><p><a href="/docs/zh/privilege_group.md">创建权限组</a></p></td>
</tr>
<tr>
<td><p>删除权限组</p></td>
<td><p>删除权限组</p></td>
<td><p><a href="/docs/zh/privilege_group.md">删除特权组</a></p></td>
</tr>
<tr>
<td><p>列出特权组</p></td>
<td><p>查看当前实例中的所有特权组</p></td>
<td><p><a href="/docs/zh/privilege_group.md">列出特权组</a></p></td>
</tr>
<tr>
<td><p>操作特权组</p></td>
<td><p>向特权组添加特权或从特权组移除特权</p></td>
<td><p><a href="/docs/zh/privilege_group.md">操作特权组</a></p></td>
</tr>
</table></p></li>
</ul>
<p>下面的示例演示了如何在<code translate="no">default</code> 数据库下的<code translate="no">collection_01</code> 上授予<code translate="no">PrivilegeSearch</code> 权限，以及如何将名为<code translate="no">privilege_group_1</code> 的特权组授予角色<code translate="no">role_a</code> 。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
<h2 id="Describe-a-role" class="common-anchor-header">描述角色<button data-href="#Describe-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>下面的示例演示了如何使用<code translate="no">describe_role</code> 方法查看授予角色<code translate="no">role_a</code> 的权限。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
<p>下面是一个输出示例。</p>
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
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">撤销角色的权限或权限组<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>下面的示例演示了如何撤销<code translate="no">default</code> 数据库下<code translate="no">collection_01</code> 的特权<code translate="no">PrivilegeSearch</code> 以及授予角色<code translate="no">role_a</code> 的特权组<code translate="no">privilege_group_1</code> 。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
