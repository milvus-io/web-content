---
id: manage_databases.md
title: 데이터베이스
summary: >-
  Milvus는 컬렉션 위에 데이터베이스 계층을 도입하여, 멀티테넌시를 지원하면서 데이터를 보다 효율적으로 관리하고 구성할 수 있는 방법을
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
    </button></h1><p>Milvus는 컬렉션 위에 <strong>데이터베이스</strong> 계층을 도입하여, 멀티테넌시를 지원하면서 데이터를 보다 효율적으로 관리하고 구성할 수 있는 방법을 제공합니다.</p>
<h2 id="What-is-a-database" class="common-anchor-header">데이터베이스란?<button data-href="#What-is-a-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 데이터베이스는 데이터를 구성하고 관리하기 위한 논리적 단위 역할을 합니다. 데이터 보안을 강화하고 멀티테넌시를 구현하기 위해, 여러 데이터베이스를 생성하여 서로 다른 애플리케이션이나 테넌트의 데이터를 논리적으로 분리할 수 있습니다. 예를 들어, 사용자 A의 데이터를 저장할 데이터베이스와 사용자 B의 데이터를 저장할 데이터베이스를 각각 생성할 수 있습니다.</p>
<h2 id="Create-database" class="common-anchor-header">데이터베이스 생성<button data-href="#Create-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus RESTful API 또는 SDK를 사용하여 프로그래밍 방식으로 데이터베이스를 생성할 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}

err = cli.CreateDatabase(ctx, milvusclient.NewCreateDatabaseOption(<span class="hljs-string">&quot;my_database_1&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
)
.<span class="hljs-keyword">await</span>?;

client
    .<span class="hljs-title function_ invoke__">create_database</span>(
        CreateDatabaseRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">database_name</span>(<span class="hljs-string">&quot;my_database_1&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">CreateDatabaseRequest</span>().<span class="hljs-built_in">WithDatabaseName</span>(<span class="hljs-string">&quot;my_database_1&quot;</span>);
status = client-&gt;<span class="hljs-built_in">CreateDatabase</span>(request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
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
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Database;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

<span class="hljs-keyword">await</span> client.CreateDatabaseAsync(<span class="hljs-keyword">new</span> CreateDatabaseReq
{
    DatabaseName = <span class="hljs-string">&quot;my_database_1&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/databases/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;my_database_1&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>데이터베이스를 생성할 때 속성을 설정할 수도 있습니다. 다음 예제는 데이터베이스의 복제본 수를 설정하는 예시입니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-go">err := cli.CreateDatabase(ctx, milvusclient.NewCreateDatabaseOption(<span class="hljs-string">&quot;my_database_2&quot;</span>).WithProperty(<span class="hljs-string">&quot;database.replica.number&quot;</span>, <span class="hljs-number">3</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

client
    .<span class="hljs-title function_ invoke__">create_database</span>(
        CreateDatabaseRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">database_name</span>(<span class="hljs-string">&quot;my_database_2&quot;</span>)
            .<span class="hljs-title function_ invoke__">properties</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
                (<span class="hljs-string">&quot;database.replica.number&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;3&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
            ]))
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">CreateDatabaseRequest</span>()
    .<span class="hljs-built_in">WithDatabaseName</span>(<span class="hljs-string">&quot;my_database_2&quot;</span>)
    .<span class="hljs-built_in">AddProperty</span>(<span class="hljs-string">&quot;database.replica.number&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>);
status = client-&gt;<span class="hljs-built_in">CreateDatabase</span>(request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createDatabase</span>({
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database_2&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;database.replica.number&quot;</span>: <span class="hljs-number">3</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Database;

<span class="hljs-keyword">await</span> client.CreateDatabaseAsync(<span class="hljs-keyword">new</span> CreateDatabaseReq
{
    DatabaseName = <span class="hljs-string">&quot;my_database_2&quot;</span>,
    Properties =
    {
        [<span class="hljs-string">&quot;database.replica.number&quot;</span>] = <span class="hljs-string">&quot;3&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/databases/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;my_database_2&quot;,
    &quot;properties&quot;: {
        &quot;database.replica.number&quot;: 3
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-databases" class="common-anchor-header">데이터베이스 조회<button data-href="#View-databases" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus RESTful API 또는 SDK를 사용하여 기존 데이터베이스를 모두 나열하고 세부 정보를 확인할 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">databases</span> = client
    .<span class="hljs-title function_ invoke__">list_databases</span>(ListDatabasesRequest::<span class="hljs-title function_ invoke__">builder</span>().<span class="hljs-title function_ invoke__">build</span>()?)
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, databases);

<span class="hljs-keyword">let</span> <span class="hljs-variable">database</span> = client
    .<span class="hljs-title function_ invoke__">describe_database</span>(
        DescribeDatabaseRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">database_name</span>(<span class="hljs-string">&quot;default&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, database);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::ListDatabasesResponse listResponse;
status = client-&gt;<span class="hljs-built_in">ListDatabases</span>(milvus::<span class="hljs-built_in">ListDatabasesRequest</span>(), listResponse);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::DescribeDatabaseResponse describeResponse;
status = client-&gt;<span class="hljs-built_in">DescribeDatabase</span>(
    milvus::<span class="hljs-built_in">DescribeDatabaseRequest</span>().<span class="hljs-built_in">WithDatabaseName</span>(<span class="hljs-string">&quot;default&quot;</span>),
    describeResponse);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeDatabase</span>({
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Database;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Database;

ListDatabasesResp databases = <span class="hljs-keyword">await</span> client.ListDatabasesAsync(<span class="hljs-keyword">new</span> ListDatabasesReq());
Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;,&quot;</span>, databases.DatabaseNames));

DescribeDatabaseResp database = <span class="hljs-keyword">await</span> client.DescribeDatabaseAsync(<span class="hljs-keyword">new</span> DescribeDatabaseReq
{
    DatabaseName = <span class="hljs-string">&quot;default&quot;</span>
});
Console.WriteLine(database.DatabaseName);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/databases/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
    </button></h2><p>각 데이터베이스에는 고유한 속성이 있으며, <a href="/docs/ko/manage_databases.md#Create-database">‘데이터베이스</a> 생성’에 설명된 대로 데이터베이스를 생성할 때 속성을 설정하거나, 기존 데이터베이스의 속성을 변경 및 삭제할 수 있습니다.</p>
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
     <td><p>지정된 데이터베이스와 연결된 리소스 그룹의 이름을 쉼표로 구분하여 나열한 목록입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.diskQuota.mb</code></p></td>
     <td><p>정수</p></td>
     <td><p>지정된 데이터베이스의 디스크 공간 최대 크기(메가바이트(MB) 단위).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.max.collections</code></p></td>
     <td><p>정수</p></td>
     <td><p>지정된 데이터베이스에서 허용되는 컬렉션의 최대 개수입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.force.deny.writing</code></p></td>
     <td><p>부울</p></td>
     <td><p>지정된 데이터베이스에서 쓰기 작업을 거부하도록 강제할지 여부.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.force.deny.reading</code></p></td>
     <td><p>부울</p></td>
     <td><p>지정된 데이터베이스에서 읽기 작업을 거부하도록 강제할지 여부.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>문자열</p></td>
     <td><p>데이터베이스 내의 시간에 민감한 작업, 특히 ` <code translate="no">TIMESTAMPTZ</code> ` 필드에 적용되는 기본 시간대를 지정합니다. 컬렉션 수준에서 시간대가 설정되지 않은 경우, 컬렉션은 데이터베이스의 시간대를 상속합니다. 쿼리 수준 시간대 매개변수는 데이터베이스 및 컬렉션의 기본값을 일시적으로 재정의할 수 있습니다. 값은 유효한 <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">IANA 시간대 식별자</a> (예: <strong>Asia/Shanghai</strong>, <strong>America/Chicago</strong> 또는 <strong>UTC</strong>)여야 합니다. <code translate="no">TIMESTAMPTZ</code> 필드 사용 방법에 대한 자세한 내용은 <a href="/docs/ko/timestamptz-field.md">TIMESTAMPTZ 필드를</a> 참조하십시오.</p></td>
   </tr>
</table>
<h3 id="Alter-database-properties" class="common-anchor-header">데이터베이스 속성 변경<button data-href="#Alter-database-properties" class="anchor-icon" translate="no">
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
    </button></h3><p>다음과 같이 기존 데이터베이스의 속성을 변경할 수 있습니다. 다음 예제는 데이터베이스에서 생성할 수 있는 컬렉션의 수를 제한합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.alter_database_properties(
    db_name=<span class="hljs-string">&quot;my_database_1&quot;</span>,
    properties={
        <span class="hljs-string">&quot;database.max.collections&quot;</span>: <span class="hljs-number">10</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.database.request.AlterDatabasePropertiesReq;

client.alterDatabaseProperties(AlterDatabasePropertiesReq.builder()
        .databaseName(<span class="hljs-string">&quot;my_database_1&quot;</span>)
        .property(<span class="hljs-string">&quot;database.max.collections&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err := cli.AlterDatabaseProperties(ctx, milvusclient.NewAlterDatabasePropertiesOption(<span class="hljs-string">&quot;my_database_1&quot;</span>).
    WithProperty(<span class="hljs-string">&quot;database.max.collections&quot;</span>, <span class="hljs-number">10</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">alter_database_properties</span>(
        AlterDatabasePropertiesRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">database_name</span>(<span class="hljs-string">&quot;my_database_1&quot;</span>)
            .<span class="hljs-title function_ invoke__">property</span>(<span class="hljs-string">&quot;database.max.collections&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">AlterDatabasePropertiesRequest</span>()
    .<span class="hljs-built_in">WithDatabaseName</span>(<span class="hljs-string">&quot;my_database_1&quot;</span>)
    .<span class="hljs-built_in">AddProperty</span>(<span class="hljs-string">&quot;database.max.collections&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>);
status = client-&gt;<span class="hljs-built_in">AlterDatabaseProperties</span>(request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterDatabaseProperties</span>({
  <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database_1&quot;</span>,
  <span class="hljs-attr">properties</span>: {
    <span class="hljs-string">&quot;database.max.collections&quot;</span>: <span class="hljs-number">10</span>,
  },
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Database;

<span class="hljs-keyword">await</span> client.AlterDatabasePropertiesAsync(<span class="hljs-keyword">new</span> AlterDatabasePropertiesReq
{
    DatabaseName = <span class="hljs-string">&quot;my_database_1&quot;</span>,
    Properties =
    {
        [<span class="hljs-string">&quot;database.max.collections&quot;</span>] = <span class="hljs-string">&quot;10&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/databases/alter&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;my_database_1&quot;,
    &quot;properties&quot;: {
        &quot;database.max.collections&quot;: 10
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-database-properties" class="common-anchor-header">데이터베이스 속성 삭제<button data-href="#Drop-database-properties" class="anchor-icon" translate="no">
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
    </button></h3><p>다음과 같이 데이터베이스 속성을 삭제하여 초기화할 수도 있습니다. 다음 예제는 데이터베이스에서 생성할 수 있는 컬렉션 수에 대한 제한을 제거합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.drop_database_properties(
    db_name=<span class="hljs-string">&quot;my_database_1&quot;</span>,
    property_keys=[
        <span class="hljs-string">&quot;database.max.collections&quot;</span>
    ]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.database.request.DropDatabasePropertiesReq;
<span class="hljs-keyword">import</span> java.util.Collections;

client.dropDatabaseProperties(DropDatabasePropertiesReq.builder()
        .databaseName(<span class="hljs-string">&quot;my_database_1&quot;</span>)
        .propertyKeys(Collections.singletonList(<span class="hljs-string">&quot;database.max.collections&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err := cli.DropDatabaseProperties(ctx, milvusclient.NewDropDatabasePropertiesOption(<span class="hljs-string">&quot;my_database_1&quot;</span>, <span class="hljs-string">&quot;database.max.collections&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">drop_database_properties</span>(
        DropDatabasePropertiesRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">database_name</span>(<span class="hljs-string">&quot;my_database_1&quot;</span>)
            .<span class="hljs-title function_ invoke__">property_keys</span>([<span class="hljs-string">&quot;database.max.collections&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">DropDatabasePropertiesRequest</span>()
    .<span class="hljs-built_in">WithDatabaseName</span>(<span class="hljs-string">&quot;my_database_1&quot;</span>)
    .<span class="hljs-built_in">AddPropertyKey</span>(<span class="hljs-string">&quot;database.max.collections&quot;</span>);
status = client-&gt;<span class="hljs-built_in">DropDatabaseProperties</span>(request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropDatabaseProperties</span>({
  <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database_1&quot;</span>,
  <span class="hljs-attr">property_keys</span>: [<span class="hljs-string">&quot;database.max.collections&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Database;

<span class="hljs-keyword">await</span> client.DropDatabasePropertiesAsync(<span class="hljs-keyword">new</span> DropDatabasePropertiesReq
{
    DatabaseName = <span class="hljs-string">&quot;my_database_1&quot;</span>,
    DeleteKeys = [<span class="hljs-string">&quot;database.max.collections&quot;</span>]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/databases/alter&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;my_database_1&quot;,
    &quot;propertyKeys&quot;: [
        &quot;database.max.collections&quot;
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-database" class="common-anchor-header">데이터베이스 사용<button data-href="#Use-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus와의 연결을 끊지 않고도 한 데이터베이스에서 다른 데이터베이스로 전환할 수 있습니다.</p>
<div class="alert note">
<p>RESTful API는 지속적 연결 상태에서 데이터베이스 전환을 지원하지 않습니다. RESTful API 요청의 경우, 해당 작업이 ` <code translate="no">dbName</code>`를 지원하는 경우 각 요청 본문에 대상 데이터베이스를 명시해야 합니다.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.use_database(
    db_name=<span class="hljs-string">&quot;my_database_2&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.useDatabase(<span class="hljs-string">&quot;my_database_2&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = cli.UseDatabase(ctx, milvusclient.NewUseDatabaseOption(<span class="hljs-string">&quot;my_database_2&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client.<span class="hljs-title function_ invoke__">use_database</span>(<span class="hljs-string">&quot;my_database_2&quot;</span>).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">UseDatabase</span>(<span class="hljs-string">&quot;my_database_2&quot;</span>);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">useDatabase</span>({
  <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database_2&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;

<span class="hljs-keyword">await</span> client.UseDatabaseAsync(<span class="hljs-keyword">new</span> UseDatabaseReq
{
    DatabaseName = <span class="hljs-string">&quot;my_database_2&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># This operation is unsupported because RESTful does not provide a persistent connection.</span>
<span class="hljs-comment"># As a workaround, initiate the required request again with the target database.</span>
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
    </button></h2><p>더 이상 필요하지 않은 데이터베이스는 삭제할 수 있습니다. 다음 사항에 유의하십시오:</p>
<ul>
<li><p>기본 데이터베이스는 삭제할 수 없습니다.</p></li>
<li><p>데이터베이스를 삭제하기 전에, 먼저 해당 데이터베이스 내의 모든 컬렉션을 삭제해야 합니다.</p></li>
</ul>
<p>Milvus RESTful API 또는 SDK를 사용하여 프로그래밍 방식으로 데이터베이스를 삭제할 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.drop_database(
    db_name=<span class="hljs-string">&quot;my_database_2&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropDatabase(DropDatabaseReq.builder()
        .databaseName(<span class="hljs-string">&quot;my_database_2&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = cli.DropDatabase(ctx, milvusclient.NewDropDatabaseOption(<span class="hljs-string">&quot;my_database_2&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">drop_database</span>(
        DropDatabaseRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">database_name</span>(<span class="hljs-string">&quot;my_database_2&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">DropDatabaseRequest</span>().<span class="hljs-built_in">WithDatabaseName</span>(<span class="hljs-string">&quot;my_database_2&quot;</span>);
status = client-&gt;<span class="hljs-built_in">DropDatabase</span>(request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropDatabase</span>({
  <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database_2&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Database;

<span class="hljs-keyword">await</span> client.DropDatabaseAsync(<span class="hljs-keyword">new</span> DropDatabaseReq
{
    DatabaseName = <span class="hljs-string">&quot;my_database_2&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/databases/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;my_database_2&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="FAQ" class="common-anchor-header">자주 묻는 질문<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-do-I-manage-permissions-for-a-database" class="common-anchor-header">데이터베이스 권한은 어떻게 관리하나요?<button data-href="#How-do-I-manage-permissions-for-a-database" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus는 역할 기반 접근 제어(RBAC)를 사용하여 권한을 관리합니다. 특정 권한을 가진 역할을 생성하여 사용자에게 할당함으로써, 각 사용자가 다양한 데이터베이스에 접근할 수 있는 범위를 제어할 수 있습니다. 자세한 내용은 <a href="/docs/ko/rbac.md">RBAC 문서를</a> 참조하십시오.</p>
<h3 id="Are-there-any-quota-limitations-for-a-database" class="common-anchor-header">데이터베이스에 대한 할당량 제한이 있나요?<button data-href="#Are-there-any-quota-limitations-for-a-database" class="anchor-icon" translate="no">
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
    </button></h3><p>네, Milvus에서는 컬렉션의 최대 개수와 같은 데이터베이스 할당량 제한을 설정할 수 있습니다. 제한 사항에 대한 전체 목록은 <a href="/docs/ko/limitations.md">Milvus 제한 사항 문서를</a> 참조하십시오.</p>
