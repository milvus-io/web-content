---
id: manage_databases.md
title: データベース
summary: Milvusはコレクションの上にデータベースレイヤーを導入し、マルチテナンシーをサポートしながら、データをより効率的に管理・整理する方法を提供します。
---
<h1 id="Database" class="common-anchor-header">データベース<button data-href="#Database" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusはコレクションの上に<strong>データベースレイヤーを</strong>導入し、マルチテナンシーをサポートしながら、より効率的なデータの管理・整理方法を提供します。</p>
<h2 id="What-is-a-database" class="common-anchor-header">データベースとは<button data-href="#What-is-a-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでは、データベースはデータを整理・管理するための論理的な単位として機能します。データのセキュリティを強化し、マルチテナントを実現するために、複数のデータベースを作成し、アプリケーションやテナントごとにデータを論理的に分離することができます。たとえば、ユーザー A のデータを格納するデータベースと、ユーザー B のデータを格納する別のデータベースを作成します。</p>
<h2 id="Create-database" class="common-anchor-header">データベースの作成<button data-href="#Create-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus RESTful APIまたはSDKを使用して、プログラムでデータを作成することができます。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.create_database(
    db_name=<span class="hljs-string">&quot;my_database_1&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.service.database.request.*;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-type">CreateDatabaseReq</span> <span class="hljs-variable">createDatabaseReq</span> <span class="hljs-operator">=</span> CreateDatabaseReq.builder()
        .databaseName(<span class="hljs-string">&quot;my_database_1&quot;</span>)
        .build();
client.createDatabase(createDatabaseReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">MilvusClient</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ 
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span> 
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createDatabase</span>({
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database_1&quot;</span>
 });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    Username: <span class="hljs-string">&quot;Milvus&quot;</span>,
    Password: <span class="hljs-string">&quot;root&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}

err = cli.CreateDatabase(ctx, milvusclient.NewCreateDatabaseOption(<span class="hljs-string">&quot;my_database_1&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/databases/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;my_database_1&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>データベースを作成する際に、データベースのプロパティを設定することもできます。以下の例では、データベースのレプリカ数を設定しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_database(
    db_name=<span class="hljs-string">&quot;my_database_2&quot;</span>,
    properties={
        <span class="hljs-string">&quot;database.replica.number&quot;</span>: <span class="hljs-number">3</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
properties.put(<span class="hljs-string">&quot;database.replica.number&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>);
<span class="hljs-type">CreateDatabaseReq</span> <span class="hljs-variable">createDatabaseReq</span> <span class="hljs-operator">=</span> CreateDatabaseReq.builder()
        .databaseName(<span class="hljs-string">&quot;my_database_2&quot;</span>)
        .properties(properties)
        .build();
client.createDatabase(createDatabaseReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createDatabase</span>({
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database_2&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;database.replica.number&quot;</span>: <span class="hljs-number">3</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err := cli.CreateDatabase(ctx, milvusclient.NewCreateDatabaseOption(<span class="hljs-string">&quot;my_database_2&quot;</span>).WithProperty(<span class="hljs-string">&quot;database.replica.number&quot;</span>, <span class="hljs-number">3</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/databases/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;my_database_2&quot;,
    &quot;properties&quot;: {
        &quot;database.replica.number&quot;: 3
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-databases" class="common-anchor-header">データベースの表示<button data-href="#View-databases" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus RESTful APIまたはSDKを使用して、既存のすべてのデータベースを一覧表示し、その詳細を表示することができます。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># List all existing databases</span>
client.list_databases()

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># [&#x27;default&#x27;, &#x27;my_database_1&#x27;, &#x27;my_database_2&#x27;]</span>

<span class="hljs-comment"># Check database details</span>
client.describe_database(
    db_name=<span class="hljs-string">&quot;default&quot;</span>
)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># {&quot;name&quot;: &quot;default&quot;}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.database.response.*;

<span class="hljs-type">ListDatabasesResp</span> <span class="hljs-variable">listDatabasesResp</span> <span class="hljs-operator">=</span> client.listDatabases();

<span class="hljs-type">DescribeDatabaseResp</span> <span class="hljs-variable">descDBResp</span> <span class="hljs-operator">=</span> client.describeDatabase(DescribeDatabaseReq.builder()
        .databaseName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeDatabase</span>({ 
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// List all existing databases</span>
databases, err := cli.ListDatabase(ctx, milvusclient.NewListDatabaseOption())
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}
log.Println(databases)

db, err := cli.DescribeDatabase(ctx, milvusclient.NewDescribeDatabaseOption(<span class="hljs-string">&quot;default&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}
log.Println(db)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/databases/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;default&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Manage-database-properties" class="common-anchor-header">データベースプロパティの管理<button data-href="#Manage-database-properties" class="anchor-icon" translate="no">
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
    </button></h2><p>データベースの<a href="/docs/ja/manage_databases.md#Create-database">作成で</a>説明されているように、データベースを作成するときにデータベースのプロパティを設定したり、既存のデータベースのプロパティを変更および削除することができます。</p>
<p>以下の表は、設定可能なデータベース・プロパティの一覧です。</p>
<table>
   <tr>
     <th><p>プロパティ名</p></th>
     <th><p>タイプ</p></th>
     <th><p>プロパティ 説明</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">database.replica.number</code></p></td>
     <td><p>整数</p></td>
     <td><p>指定したデータベースのレプリカ数。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.resource_groups</code></p></td>
     <td><p>string</p></td>
     <td><p>指定したデータベースに関連付けられているリソースグループの名前（カンマ区切り）。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.diskQuota.mb</code></p></td>
     <td><p>integer</p></td>
     <td><p>指定したデータベースのディスク容量の最大サイズ。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.max.collections</code></p></td>
     <td><p>整数</p></td>
     <td><p>指定したデータベースで許可されるコレクションの最大数。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.force.deny.writing</code></p></td>
     <td><p>boolean</p></td>
     <td><p>指定したデータベースに書き込み操作を拒否させるかどうか。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.force.deny.reading</code></p></td>
     <td><p>boolean</p></td>
     <td><p>指定したデータベースに読み取り操作を拒否させるかどうか。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>文字列</p></td>
     <td><p>データベース内の時間に敏感な操作、特に<code translate="no">TIMESTAMPTZ</code> フィールドに適用されるデフォルトのタイムゾーンを指定します。コレクション・レベルのタイムゾーンが設定されていない限り、コレクションはデータベースのタイムゾーンを継承します。クエリレベルのtimezoneパラメータは、データベースとコレクションの両方のデフォルトを一時的に上書きすることができます。値は有効な<a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">IANAタイムゾーン識別子</a>でなければなりません（例えば、<strong>Asia/Shanghai</strong>、<strong>America/Chicago</strong>、または<strong>UTC</strong>）。<code translate="no">TIMESTAMPTZ</code> フィールドの使用方法の詳細は、<a href="/docs/ja/timestamptz-field.md">TIMESTAMPTZ フィールドを</a>参照してください。</p></td>
   </tr>
</table>
<h3 id="Alter-database-properties" class="common-anchor-header">データベース・プロパティの変更<button data-href="#Alter-database-properties" class="anchor-icon" translate="no">
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
    </button></h3><p>既存のデータベースのプロパティを以下のように変更できます。以下の例では、データベースで作成できるコレクションの数を制限しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.alter_database_properties(
    db_name=<span class="hljs-string">&quot;my_database_1&quot;</span>,
    properties={
        <span class="hljs-string">&quot;database.max.collections&quot;</span>: <span class="hljs-number">10</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.alterDatabaseProperties(AlterDatabasePropertiesReq.builder()
        .databaseName(<span class="hljs-string">&quot;my_database_1&quot;</span>)
        .property(<span class="hljs-string">&quot;database.max.collections&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">alterDatabaseProperties</span>({
  <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database_1&quot;</span>,
  <span class="hljs-attr">properties</span>: {<span class="hljs-string">&quot;database.max.collections&quot;</span>, <span class="hljs-string">&quot;10&quot;</span> },
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err := cli.AlterDatabaseProperties(ctx, milvusclient.NewAlterDatabasePropertiesOption(<span class="hljs-string">&quot;my_database_1&quot;</span>).
    WithProperty(<span class="hljs-string">&quot;database.max.collections&quot;</span>, <span class="hljs-number">1</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/databases/alter&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;my_database&quot;,
    &quot;properties&quot;: {
        &quot;database.max.collections&quot;: 10
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-database-properties" class="common-anchor-header">データベースのプロパティの削除<button data-href="#Drop-database-properties" class="anchor-icon" translate="no">
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
    </button></h3><p>以下のように、データベースのプロパティを削除してリセットすることもできます。以下の例では、データベースで作成できるコレクション数の制限を削除しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.drop_database_properties(
    db_name=<span class="hljs-string">&quot;my_database_1&quot;</span>,
    property_keys=[
        <span class="hljs-string">&quot;database.max.collections&quot;</span>
    ]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropDatabaseProperties(DropDatabasePropertiesReq.builder()
        .databaseName(<span class="hljs-string">&quot;my_database_1&quot;</span>)
        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;database.max.collections&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">dropDatabaseProperties</span>({
  <span class="hljs-attr">db_name</span>: my_database_1,
  <span class="hljs-attr">properties</span>: [<span class="hljs-string">&quot;database.max.collections&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err := cli.DropDatabaseProperties(ctx, milvusclient.NewDropDatabasePropertiesOption(<span class="hljs-string">&quot;my_database_1&quot;</span>, <span class="hljs-string">&quot;database.max.collections&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/databases/alter&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;my_database&quot;,
    &quot;propertyKeys&quot;: [
        &quot;database.max.collections&quot;
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-database" class="common-anchor-header">データベースの使用<button data-href="#Use-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusから切断することなく、データベースを切り替えることができます。</p>
<div class="alert note">
<p>RESTful APIはこの操作をサポートしていません。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.use_database(
    db_name=<span class="hljs-string">&quot;my_database_2&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.useDatabase(<span class="hljs-string">&quot;my_database_2&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">useDatabase</span>({
  <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database_2&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = cli.UseDatabase(ctx, milvusclient.NewUseDatabaseOption(<span class="hljs-string">&quot;my_database_2&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># This operation is unsupported because RESTful does not provide a persistent connection.</span>
<span class="hljs-comment"># As a workaround, initiate the required request again with the target database.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-database" class="common-anchor-header">データベースの削除<button data-href="#Drop-database" class="anchor-icon" translate="no">
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
    </button></h2><p>データベースが不要になったら、そのデータベースを削除することができます。以下の点に注意してください：</p>
<ul>
<li><p>デフォルトのデータベースは削除できません。</p></li>
<li><p>データベースを削除する前に、まずデータベース内のすべてのコレクションを削除する必要があります。</p></li>
</ul>
<p>Milvus RESTful APIまたはSDKを使用して、プログラムでデータを作成することができます。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.drop_database(
    db_name=<span class="hljs-string">&quot;my_database_2&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropDatabase(DropDatabaseReq.builder()
        .databaseName(<span class="hljs-string">&quot;my_database_2&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">dropDatabase</span>({
  <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database_2&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = cli.DropDatabase(ctx, milvusclient.NewDropDatabaseOption(<span class="hljs-string">&quot;my_database_2&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/databases/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;my_database&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="FAQ" class="common-anchor-header">よくある質問<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-do-I-manage-permissions-for-a-database" class="common-anchor-header">データベースの権限はどのように管理するのですか?<button data-href="#How-do-I-manage-permissions-for-a-database" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvusはロールベースアクセスコントロール(RBAC)を使用して権限を管理します。特定の権限を持つロールを作成し、ユーザに割り当てることで、異なるデータベースへのアクセスを制御することができます。詳細については、<a href="/docs/ja/rbac.md">RBAC のドキュメントを</a>参照してください。</p>
<h3 id="Are-there-any-quota-limitations-for-a-database" class="common-anchor-header">データベースのクォータ制限はありますか？<button data-href="#Are-there-any-quota-limitations-for-a-database" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvusでは、最大コレクション数など、データベースのクォータ制限を設定することができます。制限の包括的なリストについては、<a href="/docs/ja/limitations.md">Milvus Limits ドキュメントを</a>参照してください。</p>
