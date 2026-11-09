---
id: manage_databases.md
title: قاعدة البيانات
summary: >-
  يقدم Milvus طبقة قاعدة بيانات فوق المجموعات، مما يوفر طريقة أكثر كفاءة لإدارة
  وتنظيم بياناتك مع دعم الاستخدام المتعدد.
---
<h1 id="Database" class="common-anchor-header">قاعدة البيانات<button data-href="#Database" class="anchor-icon" translate="no">
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
    </button></h1><p>تقدم Milvus طبقة <strong>قاعدة بيانات</strong> فوق المجموعات، مما يوفر طريقة أكثر كفاءة لإدارة وتنظيم بياناتك مع دعم الاستخدام المتعدد.</p>
<h2 id="What-is-a-database" class="common-anchor-header">ما هي قاعدة البيانات<button data-href="#What-is-a-database" class="anchor-icon" translate="no">
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
    </button></h2><p>في Milvus، تعمل قاعدة البيانات كوحدة منطقية لتنظيم البيانات وإدارتها. لتعزيز أمان البيانات وتحقيق الاستخدام المتعدد، يمكنك إنشاء قواعد بيانات متعددة لعزل البيانات منطقيًا لمختلف التطبيقات أو المستخدمين. على سبيل المثال، يمكنك إنشاء قاعدة بيانات لتخزين بيانات المستخدم "أ" وقاعدة بيانات أخرى للمستخدم "ب".</p>
<h2 id="Create-database" class="common-anchor-header">إنشاء قاعدة بيانات<button data-href="#Create-database" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك استخدام واجهة برمجة تطبيقات Milvus RESTful أو حزم SDK لإنشاء قاعدة بيانات برمجيًا.</p>
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
<p>يمكنك أيضًا تعيين خصائص لقاعدة البيانات عند إنشائها. يحدد المثال التالي عدد النسخ المتماثلة لقاعدة البيانات.</p>
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
<h2 id="View-databases" class="common-anchor-header">عرض قواعد البيانات<button data-href="#View-databases" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك استخدام واجهة برمجة تطبيقات Milvus RESTful أو حزم SDK لإدراج جميع قواعد البيانات الموجودة وعرض تفاصيلها.</p>
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
<h2 id="Manage-database-properties" class="common-anchor-header">إدارة خصائص قاعدة البيانات<button data-href="#Manage-database-properties" class="anchor-icon" translate="no">
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
    </button></h2><p>لكل قاعدة بيانات خصائصها الخاصة، ويمكنك تعيين خصائص قاعدة البيانات عند إنشائها كما هو موضح في <a href="/docs/ar/manage_databases.md#Create-database">إنشاء قاعدة بيانات</a> ، أو يمكنك تعديل خصائص أي قاعدة بيانات موجودة أو حذفها.</p>
<p>يسرد الجدول التالي خصائص قواعد البيانات الممكنة.</p>
<table>
   <tr>
     <th><p>اسم الخاصية</p></th>
     <th><p>النوع</p></th>
     <th><p>وصف الخاصية</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">database.replica.number</code></p></td>
     <td><p>عدد صحيح</p></td>
     <td><p>عدد النسخ المتماثلة لقاعدة البيانات المحددة.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.resource_groups</code></p></td>
     <td><p>سلسلة</p></td>
     <td><p>أسماء مجموعات الموارد المرتبطة بقاعدة البيانات المحددة في قائمة مفصولة بفواصل.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.diskQuota.mb</code></p></td>
     <td><p>عدد صحيح</p></td>
     <td><p>الحجم الأقصى لمساحة القرص لقاعدة البيانات المحددة، بالميغابايت (MB).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.max.collections</code></p></td>
     <td><p>عدد صحيح</p></td>
     <td><p>العدد الأقصى للمجموعات المسموح بها في قاعدة البيانات المحددة.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.force.deny.writing</code></p></td>
     <td><p>منطقية</p></td>
     <td><p>ما إذا كان سيتم إجبار قاعدة البيانات المحددة على رفض عمليات الكتابة.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">database.force.deny.reading</code></p></td>
     <td><p>منطقية</p></td>
     <td><p>ما إذا كان سيتم إجبار قاعدة البيانات المحددة على رفض عمليات القراءة.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>سلسلة</p></td>
     <td><p>يحدد المنطقة الزمنية الافتراضية المطبقة على العمليات الحساسة للوقت داخل قاعدة البيانات، خاصةً بالنسبة لحقول " <code translate="no">TIMESTAMPTZ</code> ". ترث المجموعات المنطقة الزمنية لقاعدة البيانات ما لم يتم تعيين منطقة زمنية على مستوى المجموعة. يمكن لمعلمة المنطقة الزمنية على مستوى الاستعلام أن تتجاوز مؤقتًا الإعدادات الافتراضية لكل من قاعدة البيانات والمجموعة. يجب أن تكون القيمة <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">معرّف منطقة زمنية</a> صالحًا <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">وفقًا لـ IANA</a> (على سبيل المثال، <strong>Asia/Shanghai</strong> أو <strong>America/Chicago</strong> أو <strong>UTC</strong>). للحصول على تفاصيل حول كيفية استخدام حقل <code translate="no">TIMESTAMPTZ</code> ، راجع <a href="/docs/ar/timestamptz-field.md">حقل TIMESTAMPTZ</a>.</p></td>
   </tr>
</table>
<h3 id="Alter-database-properties" class="common-anchor-header">تعديل خصائص قاعدة البيانات<button data-href="#Alter-database-properties" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكنك تعديل خصائص قاعدة بيانات موجودة على النحو التالي. يحدد المثال التالي عدد المجموعات التي يمكنك إنشاؤها في قاعدة البيانات.</p>
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
<h3 id="Drop-database-properties" class="common-anchor-header">إزالة خصائص قاعدة البيانات<button data-href="#Drop-database-properties" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكنك أيضًا إعادة تعيين خاصية قاعدة البيانات عن طريق حذفها على النحو التالي. يزيل المثال التالي الحد المفروض على عدد المجموعات التي يمكنك إنشاؤها في قاعدة البيانات.</p>
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
<h2 id="Use-database" class="common-anchor-header">استخدام قاعدة البيانات<button data-href="#Use-database" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك التبديل من قاعدة بيانات إلى أخرى دون قطع الاتصال بـ Milvus.</p>
<div class="alert note">
<p>لا تدعم واجهة برمجة التطبيقات RESTful التبديل بين قواعد البيانات في حالة الاتصال الدائم. بالنسبة لطلبات واجهة برمجة التطبيقات RESTful، حدد قاعدة البيانات المستهدفة في نص كل طلب عندما تدعم العملية <code translate="no">dbName</code>.</p>
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
<h2 id="Drop-database" class="common-anchor-header">حذف قاعدة البيانات<button data-href="#Drop-database" class="anchor-icon" translate="no">
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
    </button></h2><p>بمجرد أن تصبح قاعدة البيانات غير مطلوبة، يمكنك حذفها. لاحظ ما يلي:</p>
<ul>
<li><p>لا يمكن حذف قواعد البيانات الافتراضية.</p></li>
<li><p>قبل حذف قاعدة البيانات، يجب عليك أولاً حذف جميع المجموعات الموجودة فيها.</p></li>
</ul>
<p>يمكنك استخدام واجهة برمجة تطبيقات Milvus RESTful أو حزم SDK لإلغاء قاعدة البيانات برمجيًا.</p>
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
<h2 id="FAQ" class="common-anchor-header">الأسئلة الشائعة<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-do-I-manage-permissions-for-a-database" class="common-anchor-header">كيف يمكنني إدارة أذونات قاعدة البيانات؟<button data-href="#How-do-I-manage-permissions-for-a-database" class="anchor-icon" translate="no">
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
    </button></h3><p>يستخدم Milvus التحكم في الوصول القائم على الأدوار (RBAC) لإدارة الأذونات. يمكنك إنشاء أدوار ذات امتيازات محددة وتعيينها للمستخدمين، وبالتالي التحكم في وصولهم إلى قواعد البيانات المختلفة. لمزيد من التفاصيل، راجع <a href="/docs/ar/rbac.md">وثائق RBAC</a>.</p>
<h3 id="Are-there-any-quota-limitations-for-a-database" class="common-anchor-header">هل توجد أي قيود على الحصص الخاصة بقاعدة البيانات؟<button data-href="#Are-there-any-quota-limitations-for-a-database" class="anchor-icon" translate="no">
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
    </button></h3><p>نعم، يتيح لك Milvus تعيين حدود الحصص لقاعدة البيانات، مثل الحد الأقصى لعدد المجموعات. للاطلاع على قائمة شاملة بالقيود، يرجى الرجوع إلى <a href="/docs/ar/limitations.md">وثائق حدود Milvus</a>.</p>
