---
id: manage-partitions.md
title: 파티션 관리
summary: >-
  파티션은 컬렉션의 부분 집합입니다. 각 파티션은 상위 컬렉션과 동일한 데이터 구조를 공유하지만, 컬렉션에 포함된 데이터의 일부만 포함합니다.
  이 페이지에서는 파티션을 관리하는 방법을 이해하는 데 도움을 드립니다.
---
<h1 id="Manage-Partitions" class="common-anchor-header">파티션 관리<button data-href="#Manage-Partitions" class="anchor-icon" translate="no">
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
    </button></h1><p>파티션은 컬렉션의 부분 집합입니다. 각 파티션은 상위 컬렉션과 동일한 데이터 구조를 공유하지만, 컬렉션에 포함된 데이터의 일부만 포함합니다. 이 페이지에서는 파티션을 관리하는 방법을 이해하는 데 도움을 드립니다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션을 생성할 때 Milvus는 해당 컬렉션 내에 <strong>_default라는</strong> 이름의 파티션을 함께 생성합니다. 다른 파티션을 추가하지 않을 경우, 컬렉션에 삽입된 모든 엔티티는 기본 파티션에 저장되며, 모든 검색 및 쿼리도 기본 파티션 내에서 수행됩니다.</p>
<p>특정 기준에 따라 파티션을 추가하고 해당 파티션에 엔티티를 삽입할 수 있습니다. 그러면 특정 파티션 내에서만 검색 및 쿼리를 수행하도록 제한하여 검색 성능을 향상시킬 수 있습니다.</p>
<p>컬렉션에는 최대 1,024개의 파티션을 가질 수 있습니다.</p>
<div class="alert note">
<p><strong>파티션 키(Partition Key</strong> ) 기능은 파티션을 기반으로 한 검색 최적화 기능으로, Milvus가 특정 스칼라 필드의 값을 기준으로 엔티티를 서로 다른 파티션에 분산할 수 있게 해줍니다. 이 기능은 파티션 중심의 멀티테넌시 구현을 돕고 검색 성능을 향상시킵니다.</p>
<p>이 기능에 대해서는 이 페이지에서 다루지 않습니다. 자세한 내용은 <a href="/docs/ko/use-partition-key.md">‘파티션 키 사용</a>’을 참조하십시오.</p>
</div>
<h2 id="List-Partitions" class="common-anchor-header">파티션 나열<button data-href="#List-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션을 생성할 때 Milvus는 컬렉션 내에 <strong>_default라는</strong> 이름의 파티션을 함께 생성합니다. 다음과 같이 컬렉션 내의 파티션을 나열할 수 있습니다.</p>
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

res = client.list_partitions(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [&quot;_default&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ListPartitionsReq;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">ListPartitionsReq</span> <span class="hljs-variable">listPartitionsReq</span> <span class="hljs-operator">=</span> ListPartitionsReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build();

List&lt;String&gt; partitionNames = client.listPartitions(listPartitionsReq);
System.out.println(partitionNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [_default]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

partitionNames, err := client.ListPartitions(ctx, milvusclient.NewListPartitionOption(<span class="hljs-string">&quot;my_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(partitionNames)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">partitions</span> = client
    .<span class="hljs-title function_ invoke__">list_partitions</span>(
        ListPartitionsRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, partitions.<span class="hljs-title function_ invoke__">partition_names</span>());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [&quot;_default&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::ListPartitionsResponse response;
status = client-&gt;<span class="hljs-built_in">ListPartitions</span>(milvus::<span class="hljs-built_in">ListPartitionsRequest</span>()
                                    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>),
                                response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; info : response.<span class="hljs-built_in">PartitionInfos</span>()) {
    std::cout &lt;&lt; <span class="hljs-string">&quot;\t&quot;</span> &lt;&lt; info.<span class="hljs-built_in">Name</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// [&quot;_default&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Partition;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.ListPartitionsAsync(<span class="hljs-keyword">new</span> ListPartitionsReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>
});
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">var</span> name <span class="hljs-keyword">in</span> res.PartitionNames)
{
    Console.WriteLine(name);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/list&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         &quot;_default&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-Partition" class="common-anchor-header">파티션 생성<button data-href="#Create-Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션에 파티션을 추가하고, 특정 기준에 따라 해당 파티션에 엔티티를 삽입할 수 있습니다.</p>
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
<pre><code translate="no" class="language-python">client.create_partition(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

res = client.list_partitions(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [&quot;_default&quot;, &quot;partitionA&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.CreatePartitionReq;

<span class="hljs-type">CreatePartitionReq</span> <span class="hljs-variable">createPartitionReq</span> <span class="hljs-operator">=</span> CreatePartitionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
        .build();

client.createPartition(createPartitionReq);

<span class="hljs-type">ListPartitionsReq</span> <span class="hljs-variable">listPartitionsReq</span> <span class="hljs-operator">=</span> ListPartitionsReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build();

List&lt;String&gt; partitionNames = client.listPartitions(listPartitionsReq);
System.out.println(partitionNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [_default, partitionA]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>
    
    milvusclient <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

err = client.CreatePartition(ctx, milvusclient.NewCreatePartitionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

partitionNames, err := client.ListPartitions(ctx, milvusclient.NewListPartitionOption(<span class="hljs-string">&quot;my_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(partitionNames)
<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// [&quot;_default&quot;, &quot;partitionA&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">create_partition</span>(
        CreatePartitionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">partition_name</span>(<span class="hljs-string">&quot;partitionA&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">partitions</span> = client
    .<span class="hljs-title function_ invoke__">list_partitions</span>(
        ListPartitionsRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, partitions.<span class="hljs-title function_ invoke__">partition_names</span>());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [&quot;_default&quot;, &quot;partitionA&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">CreatePartition</span>(milvus::<span class="hljs-built_in">CreatePartitionRequest</span>()
                                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                         .<span class="hljs-built_in">WithPartitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::ListPartitionsResponse response;
status = client-&gt;<span class="hljs-built_in">ListPartitions</span>(milvus::<span class="hljs-built_in">ListPartitionsRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>), response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; info : response.<span class="hljs-built_in">PartitionInfos</span>()) {
    std::cout &lt;&lt; <span class="hljs-string">&quot;\t&quot;</span> &lt;&lt; info.<span class="hljs-built_in">Name</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// [&quot;_default&quot;, &quot;partitionA&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Partition;

<span class="hljs-keyword">await</span> client.CreatePartitionAsync(<span class="hljs-keyword">new</span> CreatePartitionReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    PartitionName = <span class="hljs-string">&quot;partitionA&quot;</span>
});

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.ListPartitionsAsync(<span class="hljs-keyword">new</span> ListPartitionsReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>
});
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">var</span> name <span class="hljs-keyword">in</span> res.PartitionNames)
{
    Console.WriteLine(name);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;partitionName&quot;: &quot;partitionA&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/list&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         &quot;_default&quot;,</span>
<span class="hljs-comment">#         &quot;partitionA&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Check-for-a-Specific-Partition" class="common-anchor-header">특정 파티션 확인<button data-href="#Check-for-a-Specific-Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 코드 예제는 특정 컬렉션에 파티션이 존재하는지 확인하는 방법을 보여줍니다.</p>
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
<pre><code translate="no" class="language-python">res = client.has_partition(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># True</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.HasPartitionReq;

<span class="hljs-type">HasPartitionReq</span> <span class="hljs-variable">hasPartitionReq</span> <span class="hljs-operator">=</span> HasPartitionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
        .build();

<span class="hljs-type">Boolean</span> <span class="hljs-variable">hasPartitionRes</span> <span class="hljs-operator">=</span> client.hasPartition(hasPartitionReq);
System.out.println(hasPartitionRes);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">result, err := client.HasPartition(ctx, milvusclient.NewHasPartitionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(result)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">has</span> = client
    .<span class="hljs-title function_ invoke__">has_partition</span>(
        HasPartitionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">partition_name</span>(<span class="hljs-string">&quot;partitionA&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{}&quot;</span>, has.<span class="hljs-title function_ invoke__">exists</span>());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::HasPartitionResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">HasPartition</span>(milvus::<span class="hljs-built_in">HasPartitionRequest</span>()
                                    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                    .<span class="hljs-built_in">WithPartitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>),
                                   response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
std::cout &lt;&lt; response.<span class="hljs-built_in">Has</span>() &lt;&lt; std::endl;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">value</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Partition;

<span class="hljs-keyword">var</span> hasResp = <span class="hljs-keyword">await</span> client.HasPartitionAsync(<span class="hljs-keyword">new</span> HasPartitionReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    PartitionName = <span class="hljs-string">&quot;partitionA&quot;</span>
});
Console.WriteLine(hasResp.Has);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/has&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;partitionName&quot;: &quot;partitionA&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#        &quot;has&quot;: true</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-and-Release-Partitions" class="common-anchor-header">파티션 로드 및 해제<button data-href="#Load-and-Release-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>하나 또는 여러 파티션을 개별적으로 로드하거나 해제할 수 있습니다.</p>
<h3 id="Load-Partitions" class="common-anchor-header">파티션 로드<button data-href="#Load-Partitions" class="anchor-icon" translate="no">
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
    </button></h3><p>컬렉션 내의 특정 파티션을 개별적으로 로드할 수 있습니다. 컬렉션에 로드되지 않은 파티션이 하나라도 있으면 컬렉션의 로드 상태는 ‘로드되지 않음’으로 유지된다는 점에 유의해야 합니다.</p>
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
<pre><code translate="no" class="language-python">client.load_partitions(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)
<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.LoadPartitionsReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;

<span class="hljs-type">LoadPartitionsReq</span> <span class="hljs-variable">loadPartitionsReq</span> <span class="hljs-operator">=</span> LoadPartitionsReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))
        .build();

client.loadPartitions(loadPartitionsReq);

<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">getLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
        .build();

<span class="hljs-type">Boolean</span> <span class="hljs-variable">getLoadStateRes</span> <span class="hljs-operator">=</span> client.getLoadState(getLoadStateReq);
System.out.println(getLoadStateRes);

<span class="hljs-comment">// True</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">task, err := client.LoadPartitions(ctx, milvusclient.NewLoadPartitionsOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-comment">// sync wait collection to be loaded</span>
err = task.Await(ctx)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

state, err := client.GetLoadState(ctx, milvusclient.NewGetLoadStateOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(state)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">load_partitions</span>(
        LoadPartitionsRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">partition_names</span>([<span class="hljs-string">&quot;partitionA&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">state</span> = client
    .<span class="hljs-title function_ invoke__">get_load_state</span>(
        GetLoadStateRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">partition_names</span>([<span class="hljs-string">&quot;partitionA&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, state.<span class="hljs-title function_ invoke__">state</span>());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// Loaded</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">LoadPartitions</span>(milvus::<span class="hljs-built_in">LoadPartitionsRequest</span>()
                                        .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                        .<span class="hljs-built_in">AddPartitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::GetLoadStateResponse response;
status = client-&gt;<span class="hljs-built_in">GetLoadState</span>(milvus::<span class="hljs-built_in">GetLoadStateRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                .<span class="hljs-built_in">AddPartitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>),
                              response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
std::cout &lt;&lt; milvus::<span class="hljs-built_in">to_string</span>(response.<span class="hljs-built_in">State</span>()) &lt;&lt; std::endl;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">//</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Partition;

<span class="hljs-keyword">await</span> client.LoadPartitionsAsync(<span class="hljs-keyword">new</span> LoadPartitionsReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    PartitionNames = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;partitionA&quot;</span> }
});

<span class="hljs-keyword">var</span> loadStateResp = <span class="hljs-keyword">await</span> client.GetLoadStateAsync(<span class="hljs-keyword">new</span> GetLoadStateReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    PartitionNames = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;partitionA&quot;</span> }
});
Console.WriteLine(loadStateResp.State);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/load&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;partitionNames&quot;: [&quot;partitionA&quot;]
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;partitionNames&quot;: [&quot;partitionA&quot;]
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 100,</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateLoaded&quot;,</span>
<span class="hljs-comment">#         &quot;message&quot;: &quot;&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Release-Partitions" class="common-anchor-header">파티션 해제<button data-href="#Release-Partitions" class="anchor-icon" translate="no">
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
    </button></h3><p>특정 파티션을 해제할 수도 있습니다.</p>
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
<pre><code translate="no" class="language-python">client.release_partitions(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;

<span class="hljs-type">ReleasePartitionsReq</span> <span class="hljs-variable">releasePartitionsReq</span> <span class="hljs-operator">=</span> ReleasePartitionsReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))
        .build();

client.releasePartitions(releasePartitionsReq);

<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">getLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
        .build();

<span class="hljs-type">Boolean</span> <span class="hljs-variable">getLoadStateRes</span> <span class="hljs-operator">=</span> client.getLoadState(getLoadStateReq);
System.out.println(getLoadStateRes);

<span class="hljs-comment">// False</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.ReleasePartitions(ctx, milvusclient.NewReleasePartitionsOptions(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

state, err := client.GetLoadState(ctx, milvusclient.NewGetLoadStateOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(state)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">release_partitions</span>(
        ReleasePartitionsRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">partition_names</span>([<span class="hljs-string">&quot;partitionA&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">state</span> = client
    .<span class="hljs-title function_ invoke__">get_load_state</span>(
        GetLoadStateRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">partition_names</span>([<span class="hljs-string">&quot;partitionA&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, state.<span class="hljs-title function_ invoke__">state</span>());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// NotLoad</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">ReleasePartitions</span>(milvus::<span class="hljs-built_in">ReleasePartitionsRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                .<span class="hljs-built_in">AddPartitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::GetLoadStateResponse response;
status = client-&gt;<span class="hljs-built_in">GetLoadState</span>(milvus::<span class="hljs-built_in">GetLoadStateRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                .<span class="hljs-built_in">AddPartitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>),
                              response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
std::cout &lt;&lt; milvus::<span class="hljs-built_in">to_string</span>(response.<span class="hljs-built_in">State</span>()) &lt;&lt; std::endl;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releasePartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Partition;

<span class="hljs-keyword">await</span> client.ReleasePartitionsAsync(<span class="hljs-keyword">new</span> ReleasePartitionsReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    PartitionNames = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;partitionA&quot;</span> }
});

<span class="hljs-keyword">var</span> loadStateResp = <span class="hljs-keyword">await</span> client.GetLoadStateAsync(<span class="hljs-keyword">new</span> GetLoadStateReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    PartitionNames = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;partitionA&quot;</span> }
});
Console.WriteLine(loadStateResp.State);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/release&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;partitionNames&quot;: [&quot;partitionA&quot;]
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;partitionNames&quot;: [&quot;partitionA&quot;]
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 0,</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateNotLoaded&quot;,</span>
<span class="hljs-comment">#         &quot;message&quot;: &quot;&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Data-Operations-Within-Partitions" class="common-anchor-header">파티션 내 데이터 작업<button data-href="#Data-Operations-Within-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Insert-and-Delete-Entities" class="common-anchor-header">엔티티 삽입 및 삭제<button data-href="#Insert-and-Delete-Entities" class="anchor-icon" translate="no">
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
    </button></h3><p>특정 파티션에서 엔티티 삽입, 업서트 및 삭제 작업을 수행할 수 있습니다. 자세한 내용은 다음을 참조하십시오.</p>
<ul>
<li><p><a href="/docs/ko/insert-update-delete.md#Insert-Entities-into-a-Partition">파티션에 엔티티 삽입</a></p></li>
<li><p><a href="/docs/ko/upsert-entities.md#Upsert-entities-in-a-partition">파티션에 엔티티 업서트</a></p></li>
<li><p><a href="/docs/ko/delete-entities.md#Delete-Entities-from-Partitions">파티션에서 엔티티 삭제</a></p></li>
</ul>
<h3 id="Search-and-Query" class="common-anchor-header">검색 및 쿼리<button data-href="#Search-and-Query" class="anchor-icon" translate="no">
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
    </button></h3><p>특정 파티션 내에서 검색 및 쿼리를 수행할 수 있습니다. 자세한 내용은 다음을 참조하십시오.</p>
<ul>
<li><p><a href="/docs/ko/single-vector-search.md#ANN-Search-in-Partition">파티션 내에서 ANN 검색 수행</a></p></li>
<li><p><a href="/docs/ko/get-and-scalar-query.md#Queries-in-Partitions">파티션 내에서 메타데이터 필터링 수행</a></p></li>
</ul>
<h2 id="Drop-Partition" class="common-anchor-header">파티션 삭제<button data-href="#Drop-Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>더 이상 필요하지 않은 파티션을 삭제할 수 있습니다. 파티션을 삭제하기 전에 해당 파티션이 해제되었는지 확인하십시오.</p>
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
<pre><code translate="no" class="language-python">client.release_partitions(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]
)

client.drop_partition(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

res = client.list_partitions(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># [&quot;_default&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.DropPartitionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ListPartitionsReq;

<span class="hljs-type">ReleasePartitionsReq</span> <span class="hljs-variable">releasePartitionsReq</span> <span class="hljs-operator">=</span> ReleasePartitionsReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))
        .build();

client.releasePartitions(releasePartitionsReq);

<span class="hljs-type">DropPartitionReq</span> <span class="hljs-variable">dropPartitionReq</span> <span class="hljs-operator">=</span> DropPartitionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
        .build();

client.dropPartition(dropPartitionReq);

<span class="hljs-type">ListPartitionsReq</span> <span class="hljs-variable">listPartitionsReq</span> <span class="hljs-operator">=</span> ListPartitionsReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build();

List&lt;String&gt; partitionNames = client.listPartitions(listPartitionsReq);
System.out.println(partitionNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [_default]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.ReleasePartitions(ctx, milvusclient.NewReleasePartitionsOptions(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.DropPartition(ctx, milvusclient.NewDropPartitionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

partitionNames, err := client.ListPartitions(ctx, milvusclient.NewListPartitionOption(<span class="hljs-string">&quot;my_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(partitionNames)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">release_partitions</span>(
        ReleasePartitionsRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">partition_names</span>([<span class="hljs-string">&quot;partitionA&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

client
    .<span class="hljs-title function_ invoke__">drop_partition</span>(
        DropPartitionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">partition_name</span>(<span class="hljs-string">&quot;partitionA&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">partitions</span> = client
    .<span class="hljs-title function_ invoke__">list_partitions</span>(
        ListPartitionsRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, partitions.<span class="hljs-title function_ invoke__">partition_names</span>());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [&quot;_default&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">ReleasePartitions</span>(milvus::<span class="hljs-built_in">ReleasePartitionsRequest</span>()
                                            .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                            .<span class="hljs-built_in">AddPartitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">DropPartition</span>(milvus::<span class="hljs-built_in">DropPartitionRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                .<span class="hljs-built_in">WithPartitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::ListPartitionsResponse response;
status = client-&gt;<span class="hljs-built_in">ListPartitions</span>(milvus::<span class="hljs-built_in">ListPartitionsRequest</span>()
                                    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>),
                                response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; info : response.<span class="hljs-built_in">PartitionInfos</span>()) {
    std::cout &lt;&lt; <span class="hljs-string">&quot;\t&quot;</span> &lt;&lt; info.<span class="hljs-built_in">Name</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releasePartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// [&quot;_default&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Partition;

<span class="hljs-keyword">await</span> client.ReleasePartitionsAsync(<span class="hljs-keyword">new</span> ReleasePartitionsReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    PartitionNames = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;partitionA&quot;</span> }
});

<span class="hljs-keyword">await</span> client.DropPartitionAsync(<span class="hljs-keyword">new</span> DropPartitionReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    PartitionName = <span class="hljs-string">&quot;partitionA&quot;</span>
});

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.ListPartitionsAsync(<span class="hljs-keyword">new</span> ListPartitionsReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>
});
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">var</span> name <span class="hljs-keyword">in</span> res.PartitionNames)
{
    Console.WriteLine(name);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/release&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;partitionNames&quot;: [&quot;partitionA&quot;]
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;partitionName&quot;: &quot;partitionA&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/partitions/list&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         &quot;_default&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
