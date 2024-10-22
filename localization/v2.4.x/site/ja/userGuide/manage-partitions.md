---
id: manage-partitions.md
title: パーティションの管理
---
<h1 id="Manage-Partitions" class="common-anchor-header">パーティションの管理<button data-href="#Manage-Partitions" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、コレクションにパーティションを作成して管理する方法を説明します。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusのパーティションはコレクションの小区分を表します。この機能により、コレクションの物理ストレージを複数の部分に分割することができ、コレクション全体ではなく、より小さなデータのサブセットに焦点を絞ることで、クエリパフォーマンスの向上に貢献します。</p>
<p>コレクションを作成すると、少なくとも_<strong>defaultという</strong>名前のデフォルト・パーティションが自動的に作成されます。コレクション内に最大1,024個のパーティションを作成できます。</p>
<div class="admonition note">
<p><b>注釈</b></p>
<p>Milvusは<strong>パーティションキーと</strong>呼ばれる機能を導入し、基礎となるパーティションを活用して、特定のフィールドのハッシュ値に基づいてエンティティを格納します。この機能により、マルチテナントの実装が容易になり、検索パフォーマンスが向上します。詳細については、「<a href="https://milvus.io/docs/use-partition-key.md">パーティション・キーの使用</a>」を参照してください。</p>
<p><strong>パーティションキー</strong>機能がオンになっているコレクションでは、milvusがすべてのパーティションの管理を行います。</p>
</div>
<h2 id="Preparations" class="common-anchor-header">準備<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のコードスニペットは、既存のコードを再利用し、Milvusへの接続を確立し、クイックセットアップモードでコレクションを作成します。</p>
<div class="language-python">
<p>準備には <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a>でMilvusに接続し <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a>を使用して、クイックセットアップモードでコレクションを作成します。</p>
</div>
<div class="language-java">
<p>準備の場合 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a>でMilvusに接続し <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a>クイックセットアップモードでコレクションを作成します。</p>
</div>
<div class="language-javascript">
<p>準備のために <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a>でMilvusに接続し <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a>クイックセットアップモードでコレクションを作成します。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    dimension=<span class="hljs-number">5</span>,
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">quickSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .dimension(<span class="hljs-number">5</span>)
    .build();

client.createCollection(quickSetupReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address});

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,
});  
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>備考</b></p>
<p>上記のコードスニペットでは、コレクションのインデックスがコレクションと一緒に作成されており、コレクションが作成時にロードされることを示しています。</p>
</div>
<h2 id="List-Partitions" class="common-anchor-header">パーティションのリスト<button data-href="#List-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションが準備できたら、パーティションをリストできます。</p>
<div class="language-python">
<p>パーティションをリストするには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/list_partitions.md"><code translate="no">list_partitions()</code></a>.</p>
</div>
<div class="language-java">
<p>パーティションをリストするには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/listPartitions.md"><code translate="no">listPartitions()</code></a>.</p>
</div>
<div class="language-javascript">
<p>パーティションをリストするには <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/listPartitions.md"><code translate="no">listPartitions()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. List partitions</span>
res = client.list_partitions(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [&quot;_default&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">partition</span>.<span class="hljs-property">request</span>.<span class="hljs-property">ListPartitionsReq</span>;

<span class="hljs-comment">// 3. List all partitions in the collection</span>
<span class="hljs-title class_">ListPartitionsReq</span> listPartitionsReq = <span class="hljs-title class_">ListPartitionsReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; partitionNames = client.<span class="hljs-title function_">listPartitions</span>(listPartitionsReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(partitionNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [&quot;_default&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3. List partitions</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">partition_names</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;_default&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>上記のコード・スニペットの出力には、指定されたコレクション内のパーティションの名前が含まれます。</p>
<div class="admonition note">
<p><b>注釈</b></p>
<p>コレクション内のパーティションキーにフィールドを設定した場合、Milvusはコレクションと一緒に少なくとも<strong>64の</strong>パーティションを作成します。パーティションをリストする場合、結果は上記のコード・スニペットの出力と異なる場合があります。</p>
<p>詳細については、<a href="https://milvus.io/docs/use-partition-key.md">パーティションキーを使用するを</a>参照してください。</p>
</div>
<h2 id="Create-Partitions" class="common-anchor-header">パーティションの作成<button data-href="#Create-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションにパーティションを追加できます。コレクションは最大1,024パーティションを持つことができます。</p>
<div class="language-python">
<p>パーティションを作成するには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/create_partition.md"><code translate="no">create_partition()</code></a>.</p>
</div>
<div class="language-java">
<p>パーティションを作成するには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/createPartition.md"><code translate="no">createPartition()</code></a>.</p>
</div>
<div class="language-javascript">
<p>パーティションを作成するには <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/createPartition.md"><code translate="no">createPartition()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Create more partitions</span>
client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

res = client.list_partitions(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [&quot;_default&quot;, &quot;partitionA&quot;, &quot;partitionB&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.CreatePartitionReq;

<span class="hljs-comment">// 4. Create more partitions</span>
<span class="hljs-type">CreatePartitionReq</span> <span class="hljs-variable">createPartitionReq</span> <span class="hljs-operator">=</span> CreatePartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

client.createPartition(createPartitionReq);

createPartitionReq = CreatePartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .build();

client.createPartition(createPartitionReq);

listPartitionsReq = ListPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

partitionNames = client.listPartitions(listPartitionsReq);

System.out.println(partitionNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;_default&quot;,</span>
<span class="hljs-comment">//     &quot;partitionA&quot;,</span>
<span class="hljs-comment">//     &quot;partitionB&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Create more partitions</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">partition_names</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;_default&#x27;, &#x27;partitionA&#x27;, &#x27;partitionB&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>上記のコード・スニペットは、コレクションにパーティションを作成し、コレクションのパーティションを一覧表示します。</p>
<div class="admonition note">
<p><b>注釈</b></p>
<p>コレクション内のパーティションキーにフィールドを設定した場合、milvusがコレクション内のパーティションを管理します。そのため、パーティションを作成しようとすると、プロンプトエラーが表示されることがあります。</p>
<p>詳細については、<a href="https://milvus.io/docs/use-partition-key.md">パーティションキーの使用を</a>参照してください。</p>
</div>
<h2 id="Check-for-a-Specific-Partition" class="common-anchor-header">特定のパーティションのチェック<button data-href="#Check-for-a-Specific-Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>特定のパーティションの存在を確認することもできます。</p>
<div class="language-python">
<p>特定のパーティションをチェックするには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/has_partition.md"><code translate="no">has_partition()</code></a>.</p>
</div>
<div class="language-java">
<p>特定のパーティションを調べるには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/hasPartition.md"><code translate="no">hasPartition()</code></a>.</p>
</div>
<div class="language-javascript">
<p>特定のパーティションを調べるには <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/hasPartition.md"><code translate="no">hasPartition()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. Check whether a partition exists</span>
res = client.has_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># True</span>

res = client.has_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionC&quot;</span>
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># False</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.HasPartitionReq;

<span class="hljs-comment">// 5. Check whether a partition exists</span>
<span class="hljs-type">HasPartitionReq</span> <span class="hljs-variable">hasPartitionReq</span> <span class="hljs-operator">=</span> HasPartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

<span class="hljs-type">boolean</span> <span class="hljs-variable">exists</span> <span class="hljs-operator">=</span> client.hasPartition(hasPartitionReq);

System.out.println(exists);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

hasPartitionReq = HasPartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionC&quot;</span>)
    .build();

exists = client.hasPartition(hasPartitionReq);

System.out.println(exists);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. Check whether a partition exists</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">value</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// true</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionC&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">value</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// false</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>上記のコード・スニペットは、コレクションに<code translate="no">partitionA</code> と<code translate="no">partitionC</code> という名前のパーティションがあるかどうかをチェックします。</p>
<h2 id="Load--Release-Partitions" class="common-anchor-header">パーティションのロードと解放<button data-href="#Load--Release-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>特定のパーティションをロードおよびリリースして、検索やクエリで利用可能にしたり、利用不可能にしたりできます。</p>
<h3 id="Get-Load-Status" class="common-anchor-header">ロードステータスの取得</h3><div class="language-python">
<p>コレクションとそのパーティションのロード・ステータスをチェックするには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md"><code translate="no">get_load_state()</code></a>.</p>
</div>
<div class="language-java">
<p>コレクションとそのパーティションのロードステータスを確認するには、 を使用します。 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/getLoadState.md"><code translate="no">getLoadState()</code></a>.</p>
</div>
<div class="language-javascript">
<p>コレクションとそのパーティションのロードステータスを確認するには、 を使用します。 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/getLoadState.md"><code translate="no">getLoadState()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Release the collection</span>
client.release_collection(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)

<span class="hljs-comment"># Check the load status</span>
res = client.get_load_state(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, 
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, 
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.ReleaseCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.LoadPartitionsReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;

<span class="hljs-comment">// 6. Load a partition independantly</span>
<span class="hljs-comment">// 6.1 Release the collection</span>
<span class="hljs-type">ReleaseCollectionReq</span> <span class="hljs-variable">releaseCollectionReq</span> <span class="hljs-operator">=</span> ReleaseCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

client.releaseCollection(releaseCollectionReq);

<span class="hljs-comment">// 6.2 Load partitionA</span>
<span class="hljs-type">LoadPartitionsReq</span> <span class="hljs-variable">loadPartitionsReq</span> <span class="hljs-operator">=</span> LoadPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>))
    .build();

client.loadPartitions(loadPartitionsReq);

Thread.sleep(<span class="hljs-number">3000</span>);

<span class="hljs-comment">// 6.3 Check the load status of the collection and its partitions</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">getLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

<span class="hljs-type">boolean</span> <span class="hljs-variable">state</span> <span class="hljs-operator">=</span> client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 6. Load a partition indenpendantly</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releaseCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

<span class="hljs-keyword">await</span> <span class="hljs-title function_">sleep</span>(<span class="hljs-number">3000</span>)

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>ロード・ステータスは以下のいずれかになります。</p>
<ul>
<li><p><strong>ロード済み</strong></p>
<p>コレクションは、そのパーティションの少なくとも1つがロードされた場合、<code translate="no">Loaded</code> としてマークされます。</p></li>
<li><p><strong>ロードされていない</strong></p>
<p>パーティションが一つもロードされていない場合、コレクションは<code translate="no">NotLoad</code> としてマークされます。</p></li>
<li><p><strong>ロード</strong></p>
<p>パーティションの少なくとも1つがロード中であれば、コレクションはLoadingとマークされます。</p></li>
</ul>
<h3 id="Load-Partitions" class="common-anchor-header">パーティションのロード</h3><div class="language-python">
<p>コレクションのすべてのパーティションをロードするには、単に <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md"><code translate="no">load_collection()</code></a>.コレクションの特定のパーティションをロードするには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/load_partitions.md"><code translate="no">load_partitions()</code></a>.</p>
</div>
<div class="language-java">
<p>コレクションのすべてのパーティションをロードするには、単に <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/loadCollection.md"><code translate="no">loadCollection()</code></a>.コレクションの特定のパーティションをロードするには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/loadPartitions.md"><code translate="no">loadPartitions()</code></a>.</p>
</div>
<div class="language-javascript">
<p>コレクションのすべてのパーティションをロードするには、単に <a href="https://milvus.io/api-reference/node/v2.4.x/Management/loadCollection.md"><code translate="no">loadCollection()</code></a>.コレクションの特定のパーティションをロードするには <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/loadPartitions.md"><code translate="no">loadPartitions()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.load_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]
)

res = client.get_load_state(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">LoadPartitionsReq</span> <span class="hljs-variable">loadPartitionsReq</span> <span class="hljs-operator">=</span> LoadPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>))
    .build();

client.loadPartitions(loadPartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">//</span>
<button class="copy-code-btn"></button></code></pre>
<p>一度に複数のパーティションをロードするには、以下のようにする：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.load_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
)

res = client.get_load_status(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>

res = client.get_load_status(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">LoadPartitionsReq loadPartitionsReq = LoadPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>))
    .build();

client.loadPartitions(loadPartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.<span class="hljs-built_in">println</span>(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.<span class="hljs-built_in">println</span>(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>1つまたは複数のパーティションの指定されたフィールドをロードするには、次のようにする：</p>
<pre><code translate="no" class="language-python">client.load_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],
    load_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>],
    skip_load_dynamic_field=<span class="hljs-literal">True</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>検索やクエリでフィルタリング条件や出力フィールドとして使用できるのは、<code translate="no">load_fields</code> にリストされたフィールドだけであることに注意してください。リストには必ず主キーを含めること。ロードから除外されたフィールド名は、フィルタリングや出力に使用できません。</p>
<p><code translate="no">skip_load_dynamic_field=True</code> 、ダイナミック・フィールドのロードをスキップすることができます。Milvusはダイナミックフィールドを1つのフィールドとして扱いますので、ダイナミックフィールド内の全てのキーが一緒にロードまたは除外されます。</p>
<h3 id="Release-Partitions" class="common-anchor-header">パーティションの解放</h3><div class="language-python">
<p>コレクションのすべてのパーティションを解放するには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md"><code translate="no">release_collection()</code></a>.コレクション内の特定のパーティションを解放するには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/release_partitions.md"><code translate="no">release_partitions()</code></a>.</p>
</div>
<div class="language-java">
<p>コレクションのすべてのパーティションを解放するには、単に <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a>.コレクションの特定のパーティションを解放するには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/releasePartitions.md"><code translate="no">releasePartitions()</code></a>.</p>
</div>
<div class="language-javascript">
<p>コレクションのすべてのパーティションを解放するには、単に <a href="https://milvus.io/api-reference/node/v2.4.x/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a>.コレクションの特定のパーティションを解放するには <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/releasePartitions.md"><code translate="no">releasePartitions()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Release a partition</span>
client.release_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, 
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;

<span class="hljs-comment">// 7. Release a partition</span>
<span class="hljs-type">ReleasePartitionsReq</span> <span class="hljs-variable">releasePartitionsReq</span> <span class="hljs-operator">=</span> ReleasePartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>))
    .build();

client.releasePartitions(releasePartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Release a partition</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releasePartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>一度に複数のパーティションを解放するには、以下のようにします：</p>
<pre><code translate="no" class="language-python">client.release_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;_default&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
)

res = client.get_load_status(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-Partitions" class="common-anchor-header">パーティションの削除<button data-href="#Drop-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>パーティションをリリースした後、それが不要になったら削除することができます。</p>
<div class="language-python">
<p>パーティションを削除するには <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/drop_partition.md"><code translate="no">drop_partition()</code></a>.</p>
</div>
<div class="language-java">
<p>パーティションを削除するには <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/dropPartition.md"><code translate="no">dropPartition()</code></a>.</p>
</div>
<div class="language-javascript">
<p>パーティションを削除するには <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/dropPartition.md"><code translate="no">dropPartition()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 8. Drop a partition</span>
client.drop_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

res = client.list_partitions(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [&quot;_default&quot;, &quot;partitionA&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;

<span class="hljs-type">ReleasePartitionsReq</span> <span class="hljs-variable">releasePartitionsReq</span> <span class="hljs-operator">=</span> ReleasePartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;_default&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>))
    .build();

client.releasePartitions(releasePartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releasePartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;_default&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   status: {</span>
<span class="hljs-comment">//     error_code: &#x27;Success&#x27;,</span>
<span class="hljs-comment">//     reason: &#x27;&#x27;,</span>
<span class="hljs-comment">//     code: 0,</span>
<span class="hljs-comment">//     retriable: false,</span>
<span class="hljs-comment">//     detail: &#x27;&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   state: &#x27;LoadStateNotLoad&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>メモ</b></p>
<p>パーティションを削除する前に、それをメモリから解放する必要があります。</p>
</div>
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
    </button></h2><ul>
<li><p><strong>パーティションにはどれくらいのデータを格納できますか？</strong></p>
<p>パーティションに格納できるデータは1B以下であることを推奨します。</p></li>
<li><p><strong>パーティションの最大作成数は？</strong></p>
<p>Milvusのデフォルトでは、最大1,024パーティションまで作成可能です。パーティションの最大数は<code translate="no">rootCoord.maxPartitionNum</code> 。詳細は<a href="https://milvus.io/docs/configure_rootcoord.md#rootCoordmaxPartitionNum">システム構成を</a>ご参照ください。</p></li>
<li><p><strong>パーティションとパーティション・キーはどのように区別できますか?</strong></p>
<p>パーティションは物理的なストレージ単位であり、パーティション・キーは指定された列に基づいてデータを特定のパーティションに自動的に割り当てる論理的な概念です。</p>
<p>例えば、milvusでは、パーティションキーが<code translate="no">color</code> フィールドとして定義されたコレクションがある場合、システムは自動的に各エンティティの<code translate="no">color</code> フィールドのハッシュ値に基づいてデータをパーティションに割り当てます。この自動化されたプロセスにより、ユーザーはデータの挿入や検索時に手動でパーティションを指定する責任から解放されます。</p>
<p>一方、手動でパーティションを作成する場合は、パーティション・キーの基準に基づいて各パーティションにデータを割り当てる必要があります。<code translate="no">color</code> フィールドを持つコレクションがある場合、<code translate="no">color</code> の値が<code translate="no">red</code> のエンティ ティを手動で<code translate="no">partition A</code> に割り当て、<code translate="no">color</code> の値が<code translate="no">blue</code> のエンティティを手動で<code translate="no">partition B</code> に割り当てることになります。 この手動管理には、より多くの労力が必要です。</p>
<p>要約すると、パーティションとパーティション・キーの両方を利用することで、データ計算を最適化し、クエリの効率を高めることができます。パーティションキーを有効にすることは、パーティションデータの挿入とロードを手動で管理することを放棄することを意味する。</p></li>
</ul>
