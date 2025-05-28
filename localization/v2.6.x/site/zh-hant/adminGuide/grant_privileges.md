---
id: grant_privileges.md
title: 授予角色特權或特權群組
summary: 建立角色後，就可以授予角色權限。本指南將介紹如何授予角色權限或權限群組。
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles" class="common-anchor-header">授予角色特權或特權群組<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>建立角色後，就可以授予角色權限。本指南介紹如何授予角色特權或特權群組。</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role" class="common-anchor-header">授予角色一個特權或特權群組<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.5 引入了新版本的 API，簡化了授予操作。向角色授予特權時，不再需要查詢對象類型。以下是參數和相對應的解釋。</p>
<ul>
<li><p><strong>role_name：</strong>需要授予特權或特權群組的目標角色名稱。</p></li>
<li><p><strong>Resource: 資源</strong>：特權的目標資源，可以是特定的實例、資料庫或集合。</p></li>
</ul>
<p>下表解釋如何在<code translate="no">client.grantV2()</code> 方法中指定資源。</p>
<table>
   <tr>
     <th><p><strong>層級</strong></p></th>
     <th><p><strong>資源</strong></p></th>
     <th><p><strong>授予方法</strong></p></th>
     <th><p><strong>註解</strong></p></th>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>集合</strong></p></td>
     <td><p>特定的集合</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="col1", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>輸入目標集合的名稱以及目標集合所屬資料庫的名稱。</p></td>
   </tr>
   <tr>
     <td><p>特定資料庫下的所有集合</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>輸入目標資料庫的名稱和通配符<code translate="no">*</code> 作為集合名稱。</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>資料庫</strong></p></td>
     <td><p>特定資料庫</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>輸入目標資料庫的名稱和通配符<code translate="no">*</code> 作為集合名稱。</p></td>
   </tr>
   <tr>
     <td><p>當前實例下的所有資料庫</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>輸入<code translate="no">*</code> 作為資料庫名稱，並輸入<code translate="no">*</code> 作為集合名稱。</p></td>
   </tr>
   <tr>
     <td><p><strong>實例</strong></p></td>
     <td><p>目前的實例</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="ClusterAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>輸入<code translate="no">*</code> 作為資料庫名稱，輸入<code translate="no">*</code> 作為集合名稱。</p></td>
   </tr>
</table>
<ul>
<li><p><strong>權限</strong>：您需要賦予角色的特定權限或<a href="/docs/zh-hant/privilege_group.md">權限群</a>。目前，Milvus 提供 56 種可授予的特權。下表列出了 Milvus 中的特權。</p>
<p><div class="alert note"></p>
<p>下表中的類型欄是用戶為了方便您快速查找特權，僅用於分類目的。在授予特權時，您不需要瞭解其類型。您只需輸入相應的特權。</p>
<p></div></p>
<p><table>
<tr>
<th><p><strong>類型</strong></p></th>
<th><p><strong>特權</strong></p></th>
<th><p><strong>說明</strong></p></th>
<th><p><strong>客戶端的相關 API 描述</strong></p></th>
</tr>
<tr>
<td rowspan="5"><p>資料庫權限</p></td>
<td><p>列出資料庫</p></td>
<td><p>檢視目前實例中的所有資料庫</p></td>
<td><p><a href="/docs/zh-hant/manage_databases.md">列出資料庫</a></p></td>
</tr>
<tr>
<td><p>描述資料庫</p></td>
<td><p>檢視資料庫的詳細資訊</p></td>
<td><p><a href="/docs/zh-hant/manage_databases.md">描述資料庫</a></p></td>
</tr>
<tr>
<td><p>建立資料庫</p></td>
<td><p>建立資料庫</p></td>
<td><p><a href="/docs/zh-hant/manage_databases.md">建立資料庫</a></p></td>
</tr>
<tr>
<td><p>丟棄資料庫</p></td>
<td><p>丟棄資料庫</p></td>
<td><p><a href="/docs/zh-hant/manage_databases.md">刪除資料庫</a></p></td>
</tr>
<tr>
<td><p>更改資料庫</p></td>
<td><p>修改資料庫的屬性</p></td>
<td><p><a href="/docs/zh-hant/manage_databases.md">更改資料庫</a></p></td>
</tr>
<tr>
<td rowspan="18"><p>收集權限</p></td>
<td><p>GetFlushState</p></td>
<td><p>檢查資料集刷新作業的狀態</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
</tr>
<tr>
<td><p>取得載入狀態</p></td>
<td><p>檢查集合的載入狀態</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">取得載入狀態</a></p></td>
</tr>
<tr>
<td><p>取得載入進度</p></td>
<td><p>檢查集合的載入進度</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">取得載入進度</a></p></td>
</tr>
<tr>
<td><p>顯示收藏集</p></td>
<td><p>檢視所有具有收藏權限的收藏集</p></td>
<td><p><a href="/docs/zh-hant/view-collections.md">顯示收藏集</a></p></td>
</tr>
<tr>
<td><p>列出別名</p></td>
<td><p>檢視集合的所有別名</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">列出別名</a></p></td>
</tr>
<tr>
<td><p>描述收藏集</p></td>
<td><p>檢視集合的詳細資訊</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">描述集合</a></p></td>
</tr>
<tr>
<td><p>描述別名</p></td>
<td><p>檢視別名的詳細資訊</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">描述別名</a></p></td>
</tr>
<tr>
<td><p>取得統計資料</p></td>
<td><p>取得集合的統計資料（例如集合中的實體數量）</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">取得集合統計資料</a></p></td>
</tr>
<tr>
<td><p>建立集合</p></td>
<td><p>建立一個集合</p></td>
<td><p><a href="/docs/zh-hant/create-collection.md">建立集合</a></p></td>
</tr>
<tr>
<td><p>丟棄集合</p></td>
<td><p>丟棄收藏集</p></td>
<td><p><a href="/docs/zh-hant/drop-collection.md">丟棄收藏集</a></p></td>
</tr>
<tr>
<td><p>載入</p></td>
<td><p>載入集合</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">LoadCollection/GetLoadingProgress/GetLoadState</a></p></td>
</tr>
<tr>
<td><p>釋放</p></td>
<td><p>釋放集合</p></td>
<td><p><a href="/docs/zh-hant/load-and-release.md">釋放集合</a></p></td>
</tr>
<tr>
<td><p>刷新</p></td>
<td><p>將集合中的所有實體暫存到封存的區段。任何在 flush 操作之後插入的實體都會儲存在新的區段中。</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">沖洗/</a><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
</tr>
<tr>
<td><p>壓縮</p></td>
<td><p>手動觸發壓縮</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Management/compact.md">壓縮</a></p></td>
</tr>
<tr>
<td><p>重新命名集合</p></td>
<td><p>重新命名一個集合</p></td>
<td><p><a href="/docs/zh-hant/modify-collection.md">重新命名集合</a></p></td>
</tr>
<tr>
<td><p>建立別名</p></td>
<td><p>為集合建立別名</p></td>
<td><p><a href="/docs/zh-hant/manage-aliases.md">建立別名</a></p></td>
</tr>
<tr>
<td><p>刪除別名</p></td>
<td><p>刪除集合的別名</p></td>
<td><p><a href="/docs/zh-hant/manage-aliases.md">刪除別名</a></p></td>
</tr>
<tr>
<td><p>全部清除</p></td>
<td><p>清除資料庫中的所有集合</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">全部清除</a></p></td>
</tr>
<tr>
<td rowspan="4"><p>分區權限</p></td>
<td><p>有分割區</p></td>
<td><p>檢查磁碟分割是否存在</p></td>
<td><p><a href="/docs/zh-hant/manage-partitions.md">HasPartition</a></p></td>
</tr>
<tr>
<td><p>顯示分割區</p></td>
<td><p>檢視集合中的所有磁碟分割</p></td>
<td><p><a href="/docs/zh-hant/manage-partitions.md">顯示分割區</a></p></td>
</tr>
<tr>
<td><p>建立磁碟分割</p></td>
<td><p>建立磁碟分割</p></td>
<td><p><a href="/docs/zh-hant/manage-partitions.md">建立磁碟分割</a></p></td>
</tr>
<tr>
<td><p>丟棄磁碟分割</p></td>
<td><p>刪除磁碟分割</p></td>
<td><p><a href="/docs/zh-hant/manage-partitions.md">刪除分割區</a></p></td>
</tr>
<tr>
<td rowspan="3"><p>索引權限</p></td>
<td><p>索引詳細資料</p></td>
<td><p>檢視索引的詳細資訊</p></td>
<td><p><a href="/docs/zh-hant/index-vector-fields.md">DescribeIndex/GetIndexState/GetIndexBuildProgress</a></p></td>
</tr>
<tr>
<td><p>建立索引</p></td>
<td><p>建立索引</p></td>
<td><p><a href="/docs/zh-hant/index-vector-fields.md">建立索引</a></p></td>
</tr>
<tr>
<td><p>刪除索引</p></td>
<td><p>刪除索引</p></td>
<td><p><a href="/docs/zh-hant/index-vector-fields.md">刪除索引</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>資源管理權限</p></td>
<td><p>負載平衡</p></td>
<td><p>達成負載平衡</p></td>
<td><p><a href="/docs/zh-hant/resource_group.md">負載平衡</a></p></td>
</tr>
<tr>
<td><p>建立資源群組</p></td>
<td><p>建立資源群組</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">建立資源群組</a></p></td>
</tr>
<tr>
<td><p>丟棄資源群組</p></td>
<td><p>刪除資源群組</p></td>
<td><p><a href="/docs/zh-hant/resource_group.md">刪除資源群組</a></p></td>
</tr>
<tr>
<td><p>更新資源群組</p></td>
<td><p>更新資源群組</p></td>
<td><p><a href="/docs/zh-hant/resource_group.md">更新資源群組</a></p></td>
</tr>
<tr>
<td><p>描述資源群組</p></td>
<td><p>檢視資源群組的詳細資訊</p></td>
<td><p><a href="/docs/zh-hant/resource_group.md">描述資源群組</a></p></td>
</tr>
<tr>
<td><p>列出資源群組</p></td>
<td><p>檢視目前實例的所有資源群組</p></td>
<td><p><a href="/docs/zh-hant/resource_group.md">列出資源群組</a></p></td>
</tr>
<tr>
<td><p>轉移節點</p></td>
<td><p>在資源群組之間轉移節點</p></td>
<td><p><a href="/docs/zh-hant/resource_group.md">轉移節點</a></p></td>
</tr>
<tr>
<td><p>傳送複本</p></td>
<td><p>在資源群組之間傳輸複本</p></td>
<td><p><a href="/docs/zh-hant/resource_group.md">傳輸複本</a></p></td>
</tr>
<tr>
<td><p>備份 RBAC</p></td>
<td><p>為目前實例中所有 RBAC 相關作業建立備份</p></td>
<td><p>備份 RBAC</p></td>
</tr>
<tr>
<td><p>還原 RBAC</p></td>
<td><p>還原當前實例中所有 RBAC 相關作業的備份</p></td>
<td><p>還原 RBAC</p></td>
</tr>
<tr>
<td rowspan="6"><p>實體權限</p></td>
<td><p>查詢</p></td>
<td><p>進行查詢</p></td>
<td><p><a href="/docs/zh-hant/get-and-scalar-query.md">查詢</a></p></td>
</tr>
<tr>
<td><p>搜尋</p></td>
<td><p>進行搜尋</p></td>
<td><p><a href="/docs/zh-hant/single-vector-search.md">搜尋</a></p></td>
</tr>
<tr>
<td><p>插入</p></td>
<td><p>插入實體</p></td>
<td><p><a href="/docs/zh-hant/insert-update-delete.md">插入</a></p></td>
</tr>
<tr>
<td><p>刪除</p></td>
<td><p>刪除實體</p></td>
<td><p><a href="/docs/zh-hant/delete-entities.md">刪除</a></p></td>
</tr>
<tr>
<td><p>上移</p></td>
<td><p>插入實體</p></td>
<td><p><a href="/docs/zh-hant/upsert-entities.md">上傳</a></p></td>
</tr>
<tr>
<td><p>匯入</p></td>
<td><p>大量插入或匯入實體</p></td>
<td><p><a href="/docs/zh-hant/import-data.md">大量插入/匯入</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>RBAC 權限</p></td>
<td><p>建立所有權</p></td>
<td><p>建立使用者或角色</p></td>
<td><p><a href="/docs/zh-hant/users_and_roles.md">建立使用者/建立角色</a></p></td>
</tr>
<tr>
<td><p>更新使用者</p></td>
<td><p>更新使用者的密碼</p></td>
<td><p><a href="/docs/zh-hant/users_and_roles.md">更新憑證</a></p></td>
</tr>
<tr>
<td><p>刪除所有權</p></td>
<td><p>刪除使用者密碼或角色</p></td>
<td><p><a href="/docs/zh-hant/drop_users_roles.md">刪除憑證/刪除角色</a></p></td>
</tr>
<tr>
<td><p>選擇所有權</p></td>
<td><p>檢視授予特定角色的所有使用者</p></td>
<td><p><a href="/docs/zh-hant/grant_roles.md">選擇角色/選擇授予</a></p></td>
</tr>
<tr>
<td><p>管理所有權</p></td>
<td><p>管理使用者或角色，或授予使用者角色</p></td>
<td><p><a href="/docs/zh-hant/privilege_group.md">操作使用者角色/操作權限/操作權限 V2</a></p></td>
</tr>
<tr>
<td><p>選擇使用者</p></td>
<td><p>檢視授予使用者的所有角色</p></td>
<td><p><a href="/docs/zh-hant/grant_roles.md">選擇使用者</a></p></td>
</tr>
<tr>
<td><p>建立特權群組</p></td>
<td><p>建立特權群組</p></td>
<td><p><a href="/docs/zh-hant/privilege_group.md">建立特權群組</a></p></td>
</tr>
<tr>
<td><p>刪除特權群組</p></td>
<td><p>刪除特權群組</p></td>
<td><p><a href="/docs/zh-hant/privilege_group.md">刪除特權群組</a></p></td>
</tr>
<tr>
<td><p>列出特權群組</p></td>
<td><p>檢視目前實例中的所有特權群組</p></td>
<td><p><a href="/docs/zh-hant/privilege_group.md">列出特權群組</a></p></td>
</tr>
<tr>
<td><p>操作特權群組</p></td>
<td><p>在特權群組中加入特權或移除特權</p></td>
<td><p><a href="/docs/zh-hant/privilege_group.md">操作特權群組</a></p></td>
</tr>
</table></p></li>
</ul>
<p>下面的示例演示了如何授予<code translate="no">default</code> 資料庫下<code translate="no">collection_01</code> 上的<code translate="no">PrivilegeSearch</code> 特權，以及授予角色<code translate="no">role_a</code> 名為<code translate="no">privilege_group_1</code> 的特權組。</p>
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
    </button></h2><p>下面的示例演示了如何使用<code translate="no">describe_role</code> 方法查看授予角色<code translate="no">role_a</code> 的權限。</p>
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
<p>以下是一個輸出範例。</p>
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
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">撤銷角色的特權或特權群組<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>下面的示例演示了如何撤銷<code translate="no">default</code> 資料庫下<code translate="no">collection_01</code> 上的特權<code translate="no">PrivilegeSearch</code> 以及授予角色<code translate="no">role_a</code> 的特權組<code translate="no">privilege_group_1</code> 。</p>
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
