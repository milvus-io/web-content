---
id: users_and_roles.md
related_key: 'users, roles'
summary: 了解基於角色的存取控制 (RBAC) 中使用者、角色、物件和權限的定義。
title: 使用者、權限和角色
---
<h1 id="Users-Privileges-and-Roles" class="common-anchor-header">使用者、權限和角色<button data-href="#Users-Privileges-and-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題概述 Milvus 中基於角色的存取控制 (RBAC)，詳細說明使用者、角色、物件和權限之間的定義和關係。</p>
<p>下圖說明了物件、權限、角色和使用者之間的關係。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/users_and_roles.png" alt="users_and_roles" class="doc-image" id="users_and_roles" />
   </span> <span class="img-wrapper"> <span>使用者與角色</span> </span></p>
<h2 id="Key-concepts" class="common-anchor-header">關鍵概念<button data-href="#Key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>要管理 Milvus 資源的存取控制，了解 RBAC 的關鍵組成部分很重要：物件類型、物件名稱、使用者、角色和權限。</p>
<ul>
<li><p><strong>物件類型</strong>：指派特權的物件類別。物件類型可以是</p>
<ul>
<li><code translate="no">Global</code>:全系統物件，允許使用者執行影響所有集合、使用者或全系統設定的動作。</li>
<li><code translate="no">Collection</code>:特定於集合的物件，允許使用者在特定集合內執行建立索引、載入資料、插入或刪除資料，以及查詢資料等動作。</li>
<li><code translate="no">User</code>:與使用者管理相關的物件，允許使用者管理資料庫使用者的憑證和角色，例如更新使用者憑證或檢視使用者詳細資料。</li>
</ul></li>
<li><p><strong>物件名稱</strong>：要控制存取的物件的特定名稱。例如：</p>
<ul>
<li>如果物件類型是<code translate="no">Global</code> ，物件名稱必須設定為通配符 (<code translate="no">*</code>)，表示指定類型的所有物件。</li>
<li>如果物件類型是<code translate="no">Collection</code> ，物件名稱就是集合的名稱。</li>
<li>如果对象类型是<code translate="no">User</code> ，对象名称就是数据库用户的名称。</li>
</ul></li>
<li><p><strong>使用者</strong>：與 Milvus 互動的人或應用程式，由使用者名稱和相對應的密碼組成。</p></li>
<li><p><strong>權限</strong>：定義可以執行的動作和可以存取的資源。權限不是直接授予使用者，而是指派給角色。</p></li>
<li><p><strong>角色</strong>：定義使用者對特定物件所擁有的一系列權限。一旦角色與使用者綁定，使用者就會繼承該角色的所有權限。</p></li>
</ul>
<h2 id="Example-Granting-privileges" class="common-anchor-header">範例：授予特權<button data-href="#Example-Granting-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>以下程式碼片段顯示如何在特定集合上授予角色<code translate="no">CreateIndex</code> 特權：</p>
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
<pre><code translate="no" class="language-javascript">milvusClient.<span class="hljs-title function_">grantPrivilege</span>({
   <span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;roleName&#x27;</span>,
   <span class="hljs-attr">object</span>: <span class="hljs-string">&#x27;Collection&#x27;</span>,  <span class="hljs-comment">// Valid value: Global, Collection or User.</span>
   <span class="hljs-attr">objectName</span>: <span class="hljs-string">&#x27;CollectionName&#x27;</span>, <span class="hljs-comment">// The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
   <span class="hljs-attr">privilegeName</span>: <span class="hljs-string">&#x27;CreateIndex&#x27;</span> <span class="hljs-comment">// See the table below for valid privilege names and relevant API descriptions.</span>
 })
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>若要取得更多關於權限相關 API 的資訊，請參閱<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md">grant_privilege</a>和<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md">revoke</a> <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md">_</a> <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md">privilege</a>。</p>
</div>
<div class="language-java">
<p>若要取得更多關於權限相關 API 的資訊，請參閱<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/grantPrivilege.md">grantPrivilege</a>與<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/revokePrivilege.md">revokePrivilege</a>。</p>
</div>
<div class="language-javascript">
<p>若要取得更多關於權限相關 API 的資訊，請參閱<a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/grantPrivilege.md">grantPrivilege</a>和<a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/revokePrivilege.md">revokePrivilege</a>。</p>
</div>
<h2 id="Default-users-and-roles" class="common-anchor-header">預設使用者與角色<button data-href="#Default-users-and-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 預設建立<code translate="no">root</code> 使用者，預設密碼為<code translate="no">Milvus</code> 。<code translate="no">root</code> 用戶被授予<code translate="no">admin</code> 權限，這意味著這個<code translate="no">root</code> 用戶可以存取所有資源和執行所有動作。</p>
<p>如果用戶與<code translate="no">public</code> 角色關聯，則可享有以下權限：</p>
<ul>
<li><code translate="no">DescribeCollection</code></li>
<li><code translate="no">ShowCollections</code></li>
<li><code translate="no">IndexDetail</code></li>
</ul>
<h2 id="List-of-object-types-and-privileges" class="common-anchor-header">物件類型和權限清單<button data-href="#List-of-object-types-and-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>下表列出<a href="/docs/zh-hant/rbac.md">啟用 RBAC</a> 時可以選擇的值。</p>
<table>
<thead>
<tr><th>物件類型</th><th>權限名稱</th><th>客戶端的相關 API 描述</th></tr>
</thead>
<tbody>
<tr><td>收集</td><td>建立索引</td><td>建立索引</td></tr>
<tr><td>收藏集</td><td>下拉索引</td><td>下拉索引</td></tr>
<tr><td>收藏集</td><td>索引詳細資料</td><td>DescribeIndex/GetIndexState/GetIndexBuildProgress</td></tr>
<tr><td>彙集</td><td>載入</td><td>LoadCollection/GetLoadingProgress/GetLoadState</td></tr>
<tr><td>收藏集</td><td>獲取載入進度</td><td>取得載入進度</td></tr>
<tr><td>集合</td><td>取得載入狀態</td><td>取得載入狀態</td></tr>
<tr><td>收集</td><td>釋放</td><td>釋放集合</td></tr>
<tr><td>收藏集</td><td>插入</td><td>插入</td></tr>
<tr><td>收藏集</td><td>刪除</td><td>刪除</td></tr>
<tr><td>收藏</td><td>上傳</td><td>上傳</td></tr>
<tr><td>收藏集</td><td>搜尋</td><td>搜尋</td></tr>
<tr><td>收藏</td><td>沖洗</td><td>沖洗/GetFlushState</td></tr>
<tr><td>收藏集</td><td>取得沖水狀態</td><td>取得沖水狀態</td></tr>
<tr><td>收藏集</td><td>查詢</td><td>查詢</td></tr>
<tr><td>查詢</td><td>取得統計資料</td><td>收集統計資料</td></tr>
<tr><td>資料集</td><td>壓縮</td><td>壓縮</td></tr>
<tr><td>匯集</td><td>匯入</td><td>大量插入/匯入</td></tr>
<tr><td>收藏集</td><td>負載平衡</td><td>負載平衡</td></tr>
<tr><td>集合</td><td>建立分區</td><td>建立分區</td></tr>
<tr><td>收藏集</td><td>刪除分割區</td><td>刪除分割區</td></tr>
<tr><td>收藏集</td><td>顯示分區</td><td>顯示分區</td></tr>
<tr><td>集合</td><td>HasPartition</td><td>HasPartition</td></tr>
<tr><td>全域</td><td>全部</td><td>此表中的所有 API 操作權限</td></tr>
<tr><td>全域</td><td>建立集合</td><td>建立集合</td></tr>
<tr><td>全域</td><td>丟棄收藏集</td><td>下拉選單</td></tr>
<tr><td>全域</td><td>描述集合</td><td>描述集合</td></tr>
<tr><td>全域</td><td>顯示收藏集</td><td>顯示收藏集</td></tr>
<tr><td>全域</td><td>重新命名收藏集</td><td>重新命名收藏集</td></tr>
<tr><td>全域</td><td>全部清除</td><td>全部清除</td></tr>
<tr><td>全域</td><td>建立所有權</td><td>創建使用者 創建角色</td></tr>
<tr><td>全域</td><td>刪除所有權</td><td>刪除憑證</td></tr>
<tr><td>全域</td><td>選擇所有權</td><td>選擇角色/選擇授權</td></tr>
<tr><td>全局</td><td>管理所有權</td><td>操作使用者角色 操作權限</td></tr>
<tr><td>全局</td><td>建立資源群組</td><td>建立資源群組</td></tr>
<tr><td>全域</td><td>丟棄資源群組</td><td>DropResourceGroup</td></tr>
<tr><td>全域</td><td>描述資源群組</td><td>描述資源群組</td></tr>
<tr><td>全域</td><td>列出資源群組</td><td>列出資源群組</td></tr>
<tr><td>全域</td><td>傳輸節點</td><td>傳輸節點</td></tr>
<tr><td>全域</td><td>傳輸複本</td><td>傳輸複本</td></tr>
<tr><td>全域</td><td>建立資料庫</td><td>建立資料庫</td></tr>
<tr><td>全域</td><td>丟棄資料庫</td><td>下拉資料庫</td></tr>
<tr><td>全域</td><td>清單資料庫</td><td>清單資料庫</td></tr>
<tr><td>全域</td><td>建立別名</td><td>建立別名</td></tr>
<tr><td>全域</td><td>刪除別名</td><td>下拉別名</td></tr>
<tr><td>全域</td><td>描述別名</td><td>描述別名</td></tr>
<tr><td>全域</td><td>清單別名</td><td>清單別名</td></tr>
<tr><td>使用者</td><td>更新使用者</td><td>更新憑證</td></tr>
<tr><td>使用者</td><td>選擇使用者</td><td>選擇使用者</td></tr>
</tbody>
</table>
<div class="alert note">
<li>物件和權限名稱區分大小寫。</li>
<li>若要賦予某種物件所有權限，例如 Collection、Global、User，請在權限名稱中使用 "*"。 </li>
<li>Global 物件的「*」權限名稱不包含 All 權限，因為 All 權限包含所有權限，包括任何集合和使用者物件。</li>
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
<li>學習如何<a href="/docs/zh-hant/rbac.md">啟用 RBAC</a>。</li>
</ul>
