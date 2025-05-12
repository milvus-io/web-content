---
id: grant_privileges.md
title: ロールへの特権または特権グループの付与
summary: ロールを作成すると、そのロールに権限を付与することができます。このガイドでは、ロールに特権または特権グループを付与する方法を紹介します。
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles" class="common-anchor-header">ロールへの特権または特権グループの付与<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>ロールを作成すると、そのロールに特権を付与することができます。このガイドでは、ロールに特権または特権グループを付与する方法を紹介します。</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role" class="common-anchor-header">ロールへの特権または特権グループの付与<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus2.5では、付与操作を効率化する新しいバージョンのAPIが導入されました。ロールに権限を付与する際に、オブジェクトタイプを調べる必要がなくなりました。以下にパラメータとその説明を示します。</p>
<ul>
<li><p><strong>role_name:</strong>特権または特権グループを付与する対象となるロールの名前です。</p></li>
<li><p><strong>リソース</strong>：特定のインスタンス、データベース、コレクションを指定することができます。</p></li>
</ul>
<p>以下の表では、<code translate="no">client.grantV2()</code> メソッドでリソースを指定する方法を説明します。</p>
<table>
   <tr>
     <th><p><strong>レベル</strong></p></th>
     <th><p><strong>リソース</strong></p></th>
     <th><p><strong>付与方法</strong></p></th>
     <th><p><strong>注意事項</strong></p></th>
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
     <td><p>対象となるコレクションの名前と、対象となるコレクションが属するデータベースの名前を入力します。</p></td>
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
     <td><p>対象のデータベース名と、コレクション名としてワイルドカード<code translate="no">*</code> を入力します。</p></td>
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
     <td><p>対象のデータベース名と、コレクション名としてワイルドカード<code translate="no">*</code> を入力します。</p></td>
   </tr>
   <tr>
     <td><p>現在のインスタンス配下のすべてのデータベース</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>データベース名として<code translate="no">*</code> を、コレクション名として<code translate="no">*</code> を入力します。</p></td>
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
     <td><p>データベース名として<code translate="no">*</code> を、コレクション名として<code translate="no">*</code> を入力します。</p></td>
   </tr>
</table>
<ul>
<li><p><strong>特権</strong>：ロールに付与する必要のある特定の権限または<a href="/docs/ja/privilege_group.md">権限グループ</a>。現在、Milvusでは56種類の権限を付与することができます。下の表はMilvusの権限の一覧です。</p>
<p><div class="alert note"></p>
<p>下表のタイプ列は権限の検索を容易にするためのものであり、分類の目的のみに使用されます。権限を付与する際、タイプを理解する必要はありません。対応する権限を入力するだけです。</p>
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
<td><p>データベースの一覧表示</p></td>
<td><p>現在のインスタンスのすべてのデータベースを表示する</p></td>
<td><p><a href="/docs/ja/manage_databases.md">データベースの一覧</a></p></td>
</tr>
<tr>
<td><p>データベースの詳細を表示する</p></td>
<td><p>データベースの詳細を表示する</p></td>
<td><p><a href="/docs/ja/manage_databases.md">データベースの詳細を表示する</a></p></td>
</tr>
<tr>
<td><p>データベースの作成</p></td>
<td><p>データベースを作成する</p></td>
<td><p><a href="/docs/ja/manage_databases.md">データベースを作成する</a></p></td>
</tr>
<tr>
<td><p>データベースの削除</p></td>
<td><p>データベースを削除する</p></td>
<td><p><a href="/docs/ja/manage_databases.md">データベースの削除</a></p></td>
</tr>
<tr>
<td><p>データベースの変更</p></td>
<td><p>データベースのプロパティを変更する</p></td>
<td><p><a href="/docs/ja/manage_databases.md">データベースの変更</a></p></td>
</tr>
<tr>
<td rowspan="18"><p>コレクション権限</p></td>
<td><p>GetFlushState</p></td>
<td><p>コレクションのフラッシュ操作のステータスを確認する</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
</tr>
<tr>
<td><p>GetLoadState</p></td>
<td><p>コレクションのロード状態を確認する</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">GetLoadState</a></p></td>
</tr>
<tr>
<td><p>GetLoadingProgress</p></td>
<td><p>コレクションの読み込み状況を確認する</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">GetLoadingProgress</a></p></td>
</tr>
<tr>
<td><p>コレクションの表示</p></td>
<td><p>コレクション権限ですべてのコレクションを表示する</p></td>
<td><p><a href="/docs/ja/view-collections.md">コレクションを表示</a></p></td>
</tr>
<tr>
<td><p>エイリアス一覧</p></td>
<td><p>コレクションのエイリアスをすべて表示する</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">エイリアスの一覧</a></p></td>
</tr>
<tr>
<td><p>コレクションの説明</p></td>
<td><p>コレクションの詳細を表示</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">コレクションの詳細</a></p></td>
</tr>
<tr>
<td><p>エイリアスの一覧</p></td>
<td><p>エイリアスの詳細を表示</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">エイリアスを記述する</a></p></td>
</tr>
<tr>
<td><p>GetStatistics</p></td>
<td><p>コレクションの統計情報を取得します (例：コレクション内のエンティティ数)。</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">GetCollectionStatistics</a></p></td>
</tr>
<tr>
<td><p>CreateCollection</p></td>
<td><p>コレクションを作成する</p></td>
<td><p><a href="/docs/ja/create-collection.md">コレクションの作成</a></p></td>
</tr>
<tr>
<td><p>コレクションの削除</p></td>
<td><p>コレクションを削除する</p></td>
<td><p><a href="/docs/ja/drop-collection.md">コレクションの削除</a></p></td>
</tr>
<tr>
<td><p>ロード</p></td>
<td><p>コレクションをロードする</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">LoadCollection/GetLoadingProgress/GetLoadState</a></p></td>
</tr>
<tr>
<td><p>解放</p></td>
<td><p>コレクションを解放する</p></td>
<td><p><a href="/docs/ja/load-and-release.md">コレクションを解放する</a></p></td>
</tr>
<tr>
<td><p>フラッシュ</p></td>
<td><p>コレクション内のすべてのエンティティを密封されたセグメントに永続化する。フラッシュ操作の後に挿入されたエンティティは、新しいセグメントに格納されます。</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">フラッシュ</a><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">/</a><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
</tr>
<tr>
<td><p>コンパクション</p></td>
<td><p>手動でコンパクションをトリガする</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Management/compact.md">コンパクト化</a></p></td>
</tr>
<tr>
<td><p>コレクション名の変更</p></td>
<td><p>コレクション名の変更</p></td>
<td><p><a href="/docs/ja/modify-collection.md">コレクション名の変更</a></p></td>
</tr>
<tr>
<td><p>エイリアスの作成</p></td>
<td><p>コレクションのエイリアスを作成する</p></td>
<td><p><a href="/docs/ja/manage-aliases.md">エイリアスの作成</a></p></td>
</tr>
<tr>
<td><p>エイリアスの削除</p></td>
<td><p>コレクションのエイリアスを削除する</p></td>
<td><p><a href="/docs/ja/manage-aliases.md">エイリアスの削除</a></p></td>
</tr>
<tr>
<td><p>FlushAll</p></td>
<td><p>データベース内のすべてのコレクションをフラッシュします</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">FlushAll</a></p></td>
</tr>
<tr>
<td rowspan="4"><p>パーティション特権</p></td>
<td><p>HasPartition</p></td>
<td><p>パーティションが存在するかチェックする</p></td>
<td><p><a href="/docs/ja/manage-partitions.md">ハス・パーティション</a></p></td>
</tr>
<tr>
<td><p>パーティションの表示</p></td>
<td><p>コレクション内のすべてのパーティションを表示する</p></td>
<td><p><a href="/docs/ja/manage-partitions.md">パーティションの表示</a></p></td>
</tr>
<tr>
<td><p>パーティションの作成</p></td>
<td><p>パーティションを作成する</p></td>
<td><p><a href="/docs/ja/manage-partitions.md">パーティションの作成</a></p></td>
</tr>
<tr>
<td><p>パーティションの削除</p></td>
<td><p>パーティションを削除する</p></td>
<td><p><a href="/docs/ja/manage-partitions.md">パーティションの削除</a></p></td>
</tr>
<tr>
<td rowspan="3"><p>インデックスの権限</p></td>
<td><p>インデックスの詳細</p></td>
<td><p>インデックスの詳細を表示する</p></td>
<td><p><a href="/docs/ja/index-vector-fields.md">DescribeIndex/GetIndexState/GetIndexBuildProgress</a></p></td>
</tr>
<tr>
<td><p>インデックスの作成</p></td>
<td><p>インデックスの作成</p></td>
<td><p><a href="/docs/ja/index-vector-fields.md">インデックスの作成</a></p></td>
</tr>
<tr>
<td><p>インデックスの削除</p></td>
<td><p>インデックスの削除</p></td>
<td><p><a href="/docs/ja/index-vector-fields.md">インデックスの削除</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>リソース管理権限</p></td>
<td><p>ロードバランス</p></td>
<td><p>ロードバランスを実現する</p></td>
<td><p><a href="/docs/ja/resource_group.md">ロードバランス</a></p></td>
</tr>
<tr>
<td><p>リソースグループの作成</p></td>
<td><p>リソースグループの作成</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">リソースグループの作成</a></p></td>
</tr>
<tr>
<td><p>リソースグループの削除</p></td>
<td><p>リソースグループの削除</p></td>
<td><p><a href="/docs/ja/resource_group.md">リソースグループの削除</a></p></td>
</tr>
<tr>
<td><p>リソースグループの更新</p></td>
<td><p>リソースグループの更新</p></td>
<td><p><a href="/docs/ja/resource_group.md">リソースグループの更新</a></p></td>
</tr>
<tr>
<td><p>リソースグループの詳細表示</p></td>
<td><p>リソースグループの詳細を表示する</p></td>
<td><p><a href="/docs/ja/resource_group.md">リソースグループの詳細表示</a></p></td>
</tr>
<tr>
<td><p>リソースグループの一覧</p></td>
<td><p>現在のインスタンスの全てのリソースグループを表示</p></td>
<td><p><a href="/docs/ja/resource_group.md">リソースグループの一覧</a></p></td>
</tr>
<tr>
<td><p>転送ノード</p></td>
<td><p>リソースグループ間のノード転送</p></td>
<td><p><a href="/docs/ja/resource_group.md">トランスファーノード</a></p></td>
</tr>
<tr>
<td><p>トランスファーレプリカ</p></td>
<td><p>リソースグループ間でレプリカを転送</p></td>
<td><p><a href="/docs/ja/resource_group.md">トランスファーレプリカ</a></p></td>
</tr>
<tr>
<td><p>バックアップRBAC</p></td>
<td><p>現在のインスタンスのすべてのRBAC関連操作のバックアップを作成する</p></td>
<td><p>バックアップRBAC</p></td>
</tr>
<tr>
<td><p>リストアRBAC</p></td>
<td><p>現在のインスタンスのすべてのRBAC関連操作のバックアップをリストアする</p></td>
<td><p>リストアRBAC</p></td>
</tr>
<tr>
<td rowspan="6"><p>エンティティ権限</p></td>
<td><p>クエリ</p></td>
<td><p>クエリを実行する</p></td>
<td><p><a href="/docs/ja/get-and-scalar-query.md">クエリ</a></p></td>
</tr>
<tr>
<td><p>検索</p></td>
<td><p>検索を行う</p></td>
<td><p><a href="/docs/ja/single-vector-search.md">検索</a></p></td>
</tr>
<tr>
<td><p>挿入</p></td>
<td><p>エンティティの挿入</p></td>
<td><p><a href="/docs/ja/insert-update-delete.md">挿入</a></p></td>
</tr>
<tr>
<td><p>削除</p></td>
<td><p>エンティティの削除</p></td>
<td><p><a href="/docs/ja/delete-entities.md">削除</a></p></td>
</tr>
<tr>
<td><p>アップサート</p></td>
<td><p>エンティティのアップサート</p></td>
<td><p><a href="/docs/ja/upsert-entities.md">アップサート</a></p></td>
</tr>
<tr>
<td><p>インポート</p></td>
<td><p>エンティティの一括挿入またはインポート</p></td>
<td><p><a href="/docs/ja/import-data.md">一括挿入/インポート</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>RBAC権限</p></td>
<td><p>オーナーシップの作成</p></td>
<td><p>ユーザーまたはロールの作成</p></td>
<td><p><a href="/docs/ja/users_and_roles.md">ユーザ作成/ロール作成</a></p></td>
</tr>
<tr>
<td><p>ユーザの更新</p></td>
<td><p>ユーザーのパスワードを更新する</p></td>
<td><p><a href="/docs/ja/users_and_roles.md">クレデンシャルの更新</a></p></td>
</tr>
<tr>
<td><p>所有権の削除</p></td>
<td><p>ユーザのパスワードまたはロールを削除する</p></td>
<td><p><a href="/docs/ja/drop_users_roles.md">クレデンシャルの削除/ロールの削除</a></p></td>
</tr>
<tr>
<td><p>オーナーシップの選択</p></td>
<td><p>特定のロールが付与されているすべてのユーザーを表示</p></td>
<td><p><a href="/docs/ja/grant_roles.md">選択ロール/選択グラント</a></p></td>
</tr>
<tr>
<td><p>オーナーシップの管理</p></td>
<td><p>ユーザーまたはロールの管理、またはユーザーへのロールの付与</p></td>
<td><p><a href="/docs/ja/privilege_group.md">OperateUserRole/OperatePrivilege/OperatePrivilegeV2。</a></p></td>
</tr>
<tr>
<td><p>ユーザ選択</p></td>
<td><p>ユーザーに付与されたすべてのロールを表示</p></td>
<td><p><a href="/docs/ja/grant_roles.md">ユーザの選択</a></p></td>
</tr>
<tr>
<td><p>特権グループの作成</p></td>
<td><p>特権グループの作成</p></td>
<td><p><a href="/docs/ja/privilege_group.md">特権グループの作成</a></p></td>
</tr>
<tr>
<td><p>特権グループの削除</p></td>
<td><p>特権グループの削除</p></td>
<td><p><a href="/docs/ja/privilege_group.md">特権グループの削除</a></p></td>
</tr>
<tr>
<td><p>特権グループの一覧表示</p></td>
<td><p>現在のインスタンスのすべての特権グループを表示</p></td>
<td><p><a href="/docs/ja/privilege_group.md">特権グループの一覧</a></p></td>
</tr>
<tr>
<td><p>特権グループの操作</p></td>
<td><p>特権グループへの特権の追加または特権グループからの特権の削除</p></td>
<td><p><a href="/docs/ja/privilege_group.md">特権グループの操作</a></p></td>
</tr>
</table></p></li>
</ul>
<p>以下の例では、<code translate="no">default</code> データベース下の<code translate="no">collection_01</code> で特権<code translate="no">PrivilegeSearch</code> を付与する方法と、<code translate="no">privilege_group_1</code> という特権グループを<code translate="no">role_a</code> というロールに付与する方法を示します。</p>
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
<h2 id="Describe-a-role" class="common-anchor-header">ロールの記述<button data-href="#Describe-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>次の例では、<code translate="no">describe_role</code> メソッドを使用して、ロール<code translate="no">role_a</code> に付与された権限を表示する方法を示します。</p>
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
<p>以下は出力例です。</p>
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
    </button></h2><p>次の例は、<code translate="no">default</code> データベース下の<code translate="no">collection_01</code> の特権<code translate="no">PrivilegeSearch</code> と、<code translate="no">role_a</code> ロールに付与された特権グループ<code translate="no">privilege_group_1</code> を取り消す方法を示しています。</p>
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
