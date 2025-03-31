---
id: manage_databases.md
title: 데이터베이스
summary: >-
  Milvus는 컬렉션 위에 데이터베이스 계층을 도입하여 멀티테넌시를 지원하면서 데이터를 보다 효율적으로 관리하고 구성할 수 있는 방법을
  제공합니다.
---
<h1 id="Database" class="common-anchor-header">데이터베이스<button data-href="#Database" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 컬렉션 위에 <strong>데이터베이스</strong> 계층을 도입하여 멀티테넌시를 지원하면서 데이터를 보다 효율적으로 관리하고 구성할 수 있는 방법을 제공합니다.</p>
<h2 id="What-is-a-database" class="common-anchor-header">데이터베이스란 무엇인가요?<button data-href="#What-is-a-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 데이터베이스는 데이터를 구성하고 관리하기 위한 논리적 단위 역할을 합니다. 데이터 보안을 강화하고 멀티 테넌시를 달성하기 위해 여러 데이터베이스를 생성하여 서로 다른 애플리케이션 또는 테넌트의 데이터를 논리적으로 분리할 수 있습니다. 예를 들어 사용자 A의 데이터를 저장하는 데이터베이스와 사용자 B를 위한 또 다른 데이터베이스를 만드는 것입니다.</p>
<h2 id="Create-database" class="common-anchor-header">데이터베이스 만들기<button data-href="#Create-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus RESTful API 또는 SDK를 사용하여 프로그래밍 방식으로 데이터를 생성할 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

client = <span class="hljs-title class_">MilvusClient</span>(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.<span class="hljs-title function_">create_database</span>(
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
<p>데이터베이스를 만들 때 데이터베이스에 대한 속성을 설정할 수도 있습니다. 다음 예는 데이터베이스의 복제본 수를 설정하는 예제입니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_database</span>(
    db_name=<span class="hljs-string">&quot;my_database_2&quot;</span>,
    properties={
        <span class="hljs-string">&quot;database.replica.number&quot;</span>: <span class="hljs-number">3</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">String</span>&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
properties.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;database.replica.number&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>);
<span class="hljs-title class_">CreateDatabaseReq</span> createDatabaseReq = <span class="hljs-title class_">CreateDatabaseReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">databaseName</span>(<span class="hljs-string">&quot;my_database_2&quot;</span>)
        .<span class="hljs-title function_">properties</span>(properties)
        .<span class="hljs-title function_">build</span>();
client.<span class="hljs-title function_">createDatabase</span>(createDatabaseReq);
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
<h2 id="View-databases" class="common-anchor-header">데이터베이스 보기<button data-href="#View-databases" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus RESTful API 또는 SDK를 사용하여 기존의 모든 데이터베이스를 나열하고 세부 정보를 볼 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<h2 id="Manage-database-properties" class="common-anchor-header">데이터베이스 속성 관리<button data-href="#Manage-database-properties" class="anchor-icon" translate="no">
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
    </button></h2><p>각 데이터베이스에는 고유한 속성이 있으며 데이터베이스 생성에 설명된 대로 데이터베이스를 <a href="/docs/ko/manage_databases.md#null">만들</a> 때 데이터베이스 속성을 설정하거나 기존 데이터베이스의 속성을 변경하여 삭제할 수 있습니다.</p>
<p>다음 표에는 사용 가능한 데이터베이스 속성이 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>속성 이름</p></th>
     <th><p>유형</p></th>
     <th><p>속성 설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">database.replica.number</code></p></td>
     <td><p>정수</p></td>
     <td><p>지정된 데이터베이스의 복제본 수입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.resource_groups</code></p></td>
     <td><p>문자열</p></td>
     <td><p>지정된 데이터베이스와 연결된 리소스 그룹의 이름을 쉼표로 구분한 목록입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.diskQuota.mb</code></p></td>
     <td><p>정수</p></td>
     <td><p>지정한 데이터베이스의 디스크 공간 최대 크기(MB)입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.max.collections</code></p></td>
     <td><p>정수</p></td>
     <td><p>지정한 데이터베이스에 허용되는 최대 컬렉션 수입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.force.deny.writing</code></p></td>
     <td><p>부울</p></td>
     <td><p>지정한 데이터베이스에서 쓰기 작업을 거부하도록 강제할지 여부입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.force.deny.reading</code></p></td>
     <td><p>boolean</p></td>
     <td><p>지정한 데이터베이스에서 읽기 작업을 거부하도록 할지 여부입니다.</p></td>
   </tr>
</table>
<h3 id="Alter-database-properties" class="common-anchor-header">데이터베이스 속성 변경</h3><p>다음과 같이 기존 데이터베이스의 속성을 변경할 수 있습니다. 다음 예제는 데이터베이스에서 만들 수 있는 컬렉션의 수를 제한합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">alter_database_properties</span>(
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database_1&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;database.max.collections&quot;</span>: <span class="hljs-number">10</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.alterDatabaseProperties(AlterDatabasePropertiesReq.builder()
        .databaseName(<span class="hljs-string">&quot;my_database_1&quot;</span>)
        .<span class="hljs-built_in">property</span>(<span class="hljs-string">&quot;database.max.collections&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>)
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
<h3 id="Drop-database-properties" class="common-anchor-header">데이터베이스 속성 삭제</h3><p>다음과 같이 데이터베이스 속성을 삭제하여 재설정할 수도 있습니다. 다음 예제는 데이터베이스에서 만들 수 있는 컬렉션 수에 대한 제한을 제거합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_database_properties</span>(
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database_1&quot;</span>,
    <span class="hljs-attr">property_keys</span>: [
        <span class="hljs-string">&quot;database.max.collections&quot;</span>
    ]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.<span class="hljs-title function_">dropDatabaseProperties</span>(<span class="hljs-title class_">DropDatabasePropertiesReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">databaseName</span>(<span class="hljs-string">&quot;my_database_1&quot;</span>)
        .<span class="hljs-title function_">propertyKeys</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-string">&quot;database.max.collections&quot;</span>))
        .<span class="hljs-title function_">build</span>());
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
<h2 id="Drop-database" class="common-anchor-header">데이터베이스 삭제<button data-href="#Drop-database" class="anchor-icon" translate="no">
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
    </button></h2><p>데이터베이스가 더 이상 필요하지 않으면 데이터베이스를 삭제할 수 있습니다. 참고하세요:</p>
<ul>
<li><p>기본 데이터베이스는 삭제할 수 없습니다.</p></li>
<li><p>데이터베이스를 삭제하기 전에 먼저 데이터베이스의 모든 컬렉션을 삭제해야 합니다.</p></li>
</ul>
<p>Milvus RESTful API 또는 SDK를 사용하여 프로그래밍 방식으로 데이터를 생성할 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_database</span>(
    db_name=<span class="hljs-string">&quot;my_database_2&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.<span class="hljs-title function_">dropDatabase</span>(<span class="hljs-title class_">DropDatabaseReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">databaseName</span>(<span class="hljs-string">&quot;my_database_2&quot;</span>)
        .<span class="hljs-title function_">build</span>());
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
