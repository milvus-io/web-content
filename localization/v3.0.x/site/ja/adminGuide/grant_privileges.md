---
id: grant_privileges.md
title: ロールへの権限または権限グループの付与
summary: ロールを作成したら、そのロールに権限を付与することができます。このガイドでは、ロールに権限または権限グループを付与する方法について説明します。
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles" class="common-anchor-header">ロールへの権限または権限グループの付与<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>ロールを作成したら、そのロールに権限を付与できます。このガイドでは、ロールに権限または権限グループを付与する方法について説明します。</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role" class="common-anchor-header">ロールへの権限または権限グループの付与<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.5 では、権限付与操作を効率化する新しいバージョンの API が導入されました。ロールに権限を付与する際、オブジェクトタイプを調べる必要はなくなりました。以下に、パラメータとそれに対応する説明を示します。</p>
<ul>
<li><p><strong>role_name:</strong>権限または権限グループを付与する対象となるロールの名前。</p></li>
<li><p><strong>Resource</strong>: 権限の対象となるリソース。特定のインスタンス、データベース、またはコレクションを指定できます。</p></li>
</ul>
<p>以下の表は、<code translate="no">client.grantV2()</code> メソッドでリソースを指定する方法を説明しています。</p>
<table>
   <tr>
     <th><p><strong>レベル</strong></p></th>
     <th><p><strong>リソース</strong></p></th>
     <th><p><strong>付与メソッド</strong></p></th>
     <th><p><strong>備考</strong></p></th>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>コレクション</strong></p></td>
     <td><p>特定のコレクション</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="col1", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>対象のコレクション名と、そのコレクションが属するデータベース名を入力してください。</p></td>
   </tr>
   <tr>
     <td><p>特定のデータベース下のすべてのコレクション</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>対象となるデータベース名と、コレクション名としてワイルドカード「<code translate="no">*</code> 」を入力してください。</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>データベース</strong></p></td>
     <td><p>特定のデータベース</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>対象となるデータベースの名前と、コレクション名としてワイルドカード「<code translate="no">*</code> 」を入力してください。データベース特定のデータベース対象となるデータベースの名前と、コレクション名としてワイルドカード「 」を入力してください。</p></td>
   </tr>
   <tr>
     <td><p>現在のインスタンス下のすべてのデータベース</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>データベース名として「<code translate="no">*</code> 」、コレクション名として「<code translate="no">*</code> 」を入力します。</p></td>
   </tr>
   <tr>
     <td><p><strong>インスタンス</strong></p></td>
     <td><p>現在のインスタンス</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="ClusterAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>データベース名として「<code translate="no">*</code> 」、コレクション名として「<code translate="no">*</code> 」を入力します。</p></td>
   </tr>
</table>
<ul>
<li><p><strong>権限</strong>：ロールに付与する必要がある特定の<a href="/docs/ja/privilege_group.md">権限または権限グループ</a>。現在、Milvus では 56 種類の権限を付与できます。以下の表に、Milvus の権限の一覧を示します。</p>
<p><div class="alert note"></p>
<p>以下の表の「タイプ」列は、権限を素早く検索しやすくするための分類目的でのみ使用されています。権限を付与する際、これらのタイプを理解する必要はありません。対応する権限を入力するだけで十分です。</p>
<p></div></p>
<p><table>
<tr>
<th><p><strong>タイプ</strong></p></th>
<th><p><strong>権限</strong></p></th>
<th><p><strong>説明</strong></p></th>
<th><p><strong>クライアント側の関連APIの説明</strong></p></th>
</tr>
<tr>
<td rowspan="5"><p>データベース権限</p></td>
<td><p>ListDatabases</p></td>
<td><p>現在のインスタンス内のすべてのデータベースを表示する</p></td>
<td><p><a href="/docs/ja/manage_databases.md">ListDatabases</a></p></td>
</tr>
<tr>
<td><p>DescribeDatabase</p></td>
<td><p>データベースの詳細を表示する</p></td>
<td><p><a href="/docs/ja/manage_databases.md">DescribeDatabase</a></p></td>
</tr>
<tr>
<td><p>CreateDatabase</p></td>
<td><p>CreateDatabase</p></td>
<td><p><a href="/docs/ja/manage_databases.md">CreateDatabase</a></p></td>
</tr>
<tr>
<td><p>DropDatabase</p></td>
<td><p>DropDatabase</p></td>
<td><p><a href="/docs/ja/manage_databases.md">DropDatabase</a></p></td>
</tr>
<tr>
<td><p>AlterDatabase</p></td>
<td><p>データベースのプロパティを変更する</p></td>
<td><p><a href="/docs/ja/manage_databases.md">AlterDatabase</a></p></td>
</tr>
<tr>
<td rowspan="18"><p>コレクション権限</p></td>
<td><p>GetFlushState</p></td>
<td><p>コレクションのフラッシュ操作の状態を確認する</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
</tr>
<tr>
<td><p>GetLoadState</p></td>
<td><p>コレクションの読み込み状態を確認する</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">GetLoadState</a></p></td>
</tr>
<tr>
<td><p>GetLoadingProgress</p></td>
<td><p>コレクションの読み込み進行状況を確認する</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">GetLoadingProgress</a></p></td>
</tr>
<tr>
<td><p>コレクションを表示</p></td>
<td><p>コレクション権限を持つすべてのコレクションを表示する</p></td>
<td><p><a href="/docs/ja/view-collections.md">ShowCollections</a></p></td>
</tr>
<tr>
<td><p>ListAliases</p></td>
<td><p>コレクションのすべてのエイリアスを表示する</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">ListAliases</a></p></td>
</tr>
<tr>
<td><p>コレクションの詳細表示</p></td>
<td><p>コレクションの詳細を表示する</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">DescribeCollection</a></p></td>
</tr>
<tr>
<td><p>DescribeAlias</p></td>
<td><p>エイリアスの詳細を表示する</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">DescribeAlias</a></p></td>
</tr>
<tr>
<td><p>GetStatistics</p></td>
<td><p>コレクションの統計情報を取得します（例：コレクション内のエンティティ数）</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">GetCollectionStatistics</a></p></td>
</tr>
<tr>
<td><p>コレクションの作成</p></td>
<td><p>コレクションの作成</p></td>
<td><p><a href="/docs/ja/create-collection.md">CreateCollection</a></p></td>
</tr>
<tr>
<td><p>コレクションを削除</p></td>
<td><p>コレクションを削除する</p></td>
<td><p><a href="/docs/ja/drop-collection.md">DropCollection</a></p></td>
</tr>
<tr>
<td><p>読み込み</p></td>
<td><p>コレクションを読み込む</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">LoadCollection/GetLoadingProgress/GetLoadState</a></p></td>
</tr>
<tr>
<td><p>コレクションを解放</p></td>
<td><p>コレクションを解放する</p></td>
<td><p><a href="/docs/ja/load-and-release.md">ReleaseCollection</a></p></td>
</tr>
<tr>
<td><p>フラッシュ</p></td>
<td><p>コレクション内のすべてのエンティティを、シールドされたセグメントに永続化します。フラッシュ操作後に挿入されたエンティティは、新しいセグメントに格納されます。</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">フラッシュ／GetFlushState</a></p></td>
</tr>
<tr>
<td><p>コンパクション</p></td>
<td><p>コンパクションを手動で実行</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Management/compact.md">コンパクション</a></p></td>
</tr>
<tr>
<td><p>コレクションの名前変更</p></td>
<td><p>コレクションの名前変更</p></td>
<td><p><a href="/docs/ja/modify-collection.md">コレクションの名前変更コレクションの名前変更</a></p></td>
</tr>
<tr>
<td><p>CreateAlias</p></td>
<td><p>コレクションのエイリアスを作成する</p></td>
<td><p><a href="/docs/ja/manage-aliases.md">CreateAlias</a></p></td>
</tr>
<tr>
<td><p>DropAlias</p></td>
<td><p>コレクションのエイリアスを削除する</p></td>
<td><p><a href="/docs/ja/manage-aliases.md">DropAlias</a></p></td>
</tr>
<tr>
<td><p>FlushAll</p></td>
<td><p>データベース内のすべてのコレクションをフラッシュする</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">FlushAll</a></p></td>
</tr>
<tr>
<td rowspan="4"><p>パーティション権限</p></td>
<td><p>HasPartition</p></td>
<td><p>パーティションが存在するかどうかを確認する</p></td>
<td><p><a href="/docs/ja/manage-partitions.md">HasPartition</a></p></td>
</tr>
<tr>
<td><p>ShowPartitions</p></td>
<td><p>コレクション内のすべてのパーティションを表示する</p></td>
<td><p><a href="/docs/ja/manage-partitions.md">ShowPartitions</a></p></td>
</tr>
<tr>
<td><p>CreatePartition</p></td>
<td><p>パーティションを作成する</p></td>
<td><p><a href="/docs/ja/manage-partitions.md">CreatePartition</a></p></td>
</tr>
<tr>
<td><p>パーティションの削除</p></td>
<td><p>パーティションを削除</p></td>
<td><p><a href="/docs/ja/manage-partitions.md">DropPartition</a></p></td>
</tr>
<tr>
<td rowspan="3"><p>インデックスの権限</p></td>
<td><p>IndexDetail</p></td>
<td><p>インデックスの詳細を表示する</p></td>
<td><p><a href="/docs/ja/index-vector-fields.md">DescribeIndex/GetIndexState/GetIndexBuildProgress</a></p></td>
</tr>
<tr>
<td><p>CreateIndex</p></td>
<td><p>インデックスの作成</p></td>
<td><p><a href="/docs/ja/index-vector-fields.md">CreateIndex</a></p></td>
</tr>
<tr>
<td><p>DropIndex</p></td>
<td><p>インデックスを削除</p></td>
<td><p><a href="/docs/ja/index-vector-fields.md">DropIndex</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>リソース管理権限</p></td>
<td><p>LoadBalance</p></td>
<td><p>負荷分散を実現する</p></td>
<td><p><a href="/docs/ja/resource_group.md">LoadBalance</a></p></td>
</tr>
<tr>
<td><p>リソースグループの作成</p></td>
<td><p>リソースグループの作成</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">リソースグループの作成</a></p></td>
</tr>
<tr>
<td><p>リソースグループの削除</p></td>
<td><p>リソースグループを削除</p></td>
<td><p><a href="/docs/ja/resource_group.md">リソースグループを削除</a></p></td>
</tr>
<tr>
<td><p>リソースグループを更新する</p></td>
<td><p>リソースグループを更新する</p></td>
<td><p><a href="/docs/ja/resource_group.md">UpdateResourceGroups</a></p></td>
</tr>
<tr>
<td><p>リソースグループの説明</p></td>
<td><p>リソースグループの詳細を表示する</p></td>
<td><p><a href="/docs/ja/resource_group.md">DescribeResourceGroup</a></p></td>
</tr>
<tr>
<td><p>ListResourceGroups</p></td>
<td><p>現在のインスタンスのすべてのリソースグループを表示する</p></td>
<td><p><a href="/docs/ja/resource_group.md">ListResourceGroups</a></p></td>
</tr>
<tr>
<td><p>TransferNode</p></td>
<td><p>リソースグループ間でノードを転送する</p></td>
<td><p><a href="/docs/ja/resource_group.md">TransferNode</a></p></td>
</tr>
<tr>
<td><p>レプリカの転送</p></td>
<td><p>リソースグループ間でレプリカを転送する</p></td>
<td><p><a href="/docs/ja/resource_group.md">レプリカの転送</a></p></td>
</tr>
<tr>
<td><p>BackupRBAC</p></td>
<td><p>現在のインスタンスにおけるすべての RBAC 関連操作のバックアップを作成する</p></td>
<td><p>RBACのバックアップ</p></td>
</tr>
<tr>
<td><p>RestoreRBAC</p></td>
<td><p>現在のインスタンスにおけるすべてのRBAC関連操作のバックアップを復元する</p></td>
<td><p>RestoreRBAC</p></td>
</tr>
<tr>
<td rowspan="6"><p>エンティティ権限</p></td>
<td><p>クエリ</p></td>
<td><p>クエリを実行する</p></td>
<td><p><a href="/docs/ja/get-and-scalar-query.md">クエリ</a></p></td>
</tr>
<tr>
<td><p>検索</p></td>
<td><p>検索を実行する</p></td>
<td><p><a href="/docs/ja/single-vector-search.md">検索</a></p></td>
</tr>
<tr>
<td><p>挿入</p></td>
<td><p>エンティティの挿入</p></td>
<td><p><a href="/docs/ja/insert-update-delete.md">挿入</a></p></td>
</tr>
<tr>
<td><p>削除</p></td>
<td><p>エンティティを削除</p></td>
<td><p><a href="/docs/ja/delete-entities.md">削除</a></p></td>
</tr>
<tr>
<td><p>更新または挿入</p></td>
<td><p>エンティティのアップサート</p></td>
<td><p><a href="/docs/ja/upsert-entities.md">Upsert</a></p></td>
</tr>
<tr>
<td><p>インポート</p></td>
<td><p>エンティティの一括挿入またはインポート</p></td>
<td><p><a href="/docs/ja/import-data.md">一括挿入／インポート</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>RBAC 権限</p></td>
<td><p>所有権の作成</p></td>
<td><p>ユーザーまたはロールの作成</p></td>
<td><p><a href="/docs/ja/users_and_roles.md">CreateUser/CreateRole</a></p></td>
</tr>
<tr>
<td><p>UpdateUser</p></td>
<td><p>ユーザーのパスワードを更新する</p></td>
<td><p><a href="/docs/ja/users_and_roles.md">UpdateCredential</a></p></td>
</tr>
<tr>
<td><p>DropOwnership</p></td>
<td><p>ユーザーのパスワードまたはロールを削除する</p></td>
<td><p><a href="/docs/ja/drop_users_roles.md">DeleteCredential/DropRole</a></p></td>
</tr>
<tr>
<td><p>所有権の選択</p></td>
<td><p>特定のロールを付与されているすべてのユーザーを表示</p></td>
<td><p><a href="/docs/ja/grant_roles.md">SelectRole/SelectGrant</a></p></td>
</tr>
<tr>
<td><p>所有権の管理</p></td>
<td><p>ユーザーまたはロールの管理、あるいはユーザーへのロールの付与</p></td>
<td><p><a href="/docs/ja/privilege_group.md">OperateUserRole/OperatePrivilege/OperatePrivilegeV2</a></p></td>
</tr>
<tr>
<td><p>SelectUser</p></td>
<td><p>ユーザーに付与されたすべてのロールを表示する</p></td>
<td><p><a href="/docs/ja/grant_roles.md">SelectUser</a></p></td>
</tr>
<tr>
<td><p>CreatePrivilegeGroup</p></td>
<td><p>権限グループを作成する</p></td>
<td><p><a href="/docs/ja/privilege_group.md">CreatePrivilegeGroup</a></p></td>
</tr>
<tr>
<td><p>DropPrivilegeGroup</p></td>
<td><p>権限グループを削除する</p></td>
<td><p><a href="/docs/ja/privilege_group.md">DropPrivilegeGroup</a></p></td>
</tr>
<tr>
<td><p>ListPrivilegeGroups</p></td>
<td><p>現在のインスタンス内のすべての権限グループを表示する</p></td>
<td><p><a href="/docs/ja/privilege_group.md">ListPrivilegeGroups</a></p></td>
</tr>
<tr>
<td><p>権限グループの操作</p></td>
<td><p>権限グループに権限を追加または削除する</p></td>
<td><p><a href="/docs/ja/privilege_group.md">OperatePrivilegeGroup</a></p></td>
</tr>
</table></p></li>
</ul>
<p>次の例は、<code translate="no">default</code> データベース内の<code translate="no">collection_01</code> に対して、権限<code translate="no">PrivilegeSearch</code> および「<code translate="no">privilege_group_1</code> 」という名前の権限グループを、ロール<code translate="no">role_a</code> に付与する方法を示しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-a-role" class="common-anchor-header">ロールの説明<button data-href="#Describe-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>次の例は、<code translate="no">describe_role</code> メソッドを使用して、ロール<code translate="no">role_a</code> に付与された権限を表示する方法を示しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>以下は出力例です。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
     <span class="hljs-attr">&quot;role&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;role_a&quot;</span><span class="hljs-punctuation">,</span>
     <span class="hljs-attr">&quot;privileges&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
         <span class="hljs-punctuation">{</span>
             <span class="hljs-attr">&quot;collection_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;collection_01&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;db_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;default&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;role_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;role_a&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;privilege&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Search&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;grantor_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;root&quot;</span>
         <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
         <span class="hljs-string">&quot;privilege_group_1&quot;</span>
     <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">ロールから権限または権限グループを取り消す<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の例は、ロール `<code translate="no">role_a</code>` に付与されている、<code translate="no">default</code> データベース下の `<code translate="no">collection_01</code> ` に対する権限 `<code translate="no">PrivilegeSearch</code> ` および権限グループ `<code translate="no">privilege_group_1</code> ` を取り消す方法を示しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
