---
id: manage-partitions.md
title: 파티션 관리
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
    </button></h1><p>이 가이드에서는 컬렉션에서 파티션을 만들고 관리하는 방법을 안내합니다.</p>
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
    </button></h2><p>Milvus에서 파티션은 컬렉션의 하위 분할을 나타냅니다. 이 기능을 사용하면 컬렉션의 물리적 저장 공간을 여러 부분으로 나눌 수 있으므로 전체 컬렉션이 아닌 더 작은 데이터 하위 집합으로 초점을 좁혀 쿼리 성능을 개선할 수 있습니다.</p>
<p>컬렉션을 만들면 최소한 <strong>_default라는</strong> 이름의 기본 파티션이 자동으로 생성됩니다. 컬렉션 내에 최대 1,024개의 파티션을 만들 수 있습니다.</p>
<div class="admonition note">
<p><b>참고</b></p>
<p>Milvus는 <strong>파티션 키라는</strong> 기능을 도입하여 기본 파티션을 활용하여 특정 필드의 해시값을 기반으로 엔티티를 저장합니다. 이 기능은 멀티테넌시 구현을 용이하게 하여 검색 성능을 향상시킵니다. 자세한 내용은 <a href="https://milvus.io/docs/use-partition-key.md">파티션 키 사용을</a> 참조하세요.</p>
<p>컬렉션에서 <strong>파티션 키</strong> 기능이 켜져 있으면 Milvus가 모든 파티션 관리를 처리하므로 사용자는 이러한 부담을 덜 수 있습니다.</p>
</div>
<h2 id="Preparations" class="common-anchor-header">준비<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>아래 코드 스니펫은 기존 코드를 재구성하여 Milvus에 연결을 설정하고 빠른 설정 모드에서 컬렉션을 생성하는 것으로, 컬렉션 생성 시 컬렉션이 로드됨을 나타냅니다.</p>
<div class="language-python">
<p>준비를 위해 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> 를 사용하여 Milvus에 연결하고 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a> 를 사용하여 빠른 설정 모드로 컬렉션을 생성합니다.</p>
</div>
<div class="language-java">
<p>준비를 위해 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a> 을 사용하여 Milvus에 연결하고 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a> 를 사용하여 빠른 설정 모드에서 컬렉션을 생성합니다.</p>
</div>
<div class="language-javascript">
<p>준비하려면 <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> 을 사용하여 Milvus에 연결하고 <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a> 를 사용하여 빠른 설정 모드에서 컬렉션을 생성합니다.</p>
</div>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
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
<p><b>참고</b></p>
<p>위의 코드 스니펫에서는 컬렉션과 함께 컬렉션의 인덱스가 생성되어 컬렉션이 생성될 때 로드되었음을 나타냅니다.</p>
</div>
<h2 id="List-Partitions" class="common-anchor-header">목록 파티션<button data-href="#List-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션이 준비되면 컬렉션의 파티션을 나열할 수 있습니다.</p>
<div class="language-python">
<p>파티션을 나열하려면 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/list_partitions.md"><code translate="no">list_partitions()</code></a>.</p>
</div>
<div class="language-java">
<p>파티션을 나열하려면 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/listPartitions.md"><code translate="no">listPartitions()</code></a>.</p>
</div>
<div class="language-javascript">
<p>파티션을 나열하려면 <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/listPartitions.md"><code translate="no">listPartitions()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
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
<p>위 코드 스니펫의 출력에는 지정된 컬렉션 내의 파티션 이름이 포함됩니다.</p>
<div class="admonition note">
<p><b>참고</b></p>
<p>컬렉션에서 필드를 파티션 키로 설정한 경우 Milvus는 컬렉션과 함께 최소 <strong>64개의</strong> 파티션을 생성합니다. 파티션을 나열할 때 결과는 위 코드 조각의 출력과 다를 수 있습니다.</p>
<p>자세한 내용은 <a href="https://milvus.io/docs/use-partition-key.md">파티션 키 사용을</a> 참조하세요.</p>
</div>
<h2 id="Create-Partitions" class="common-anchor-header">파티션 만들기<button data-href="#Create-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션에 파티션을 더 추가할 수 있습니다. 컬렉션에는 최대 4,096개의 파티션을 가질 수 있습니다.</p>
<div class="language-python">
<p>파티션을 생성하려면 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/create_partition.md"><code translate="no">create_partition()</code></a>.</p>
</div>
<div class="language-java">
<p>파티션을 생성하려면 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/createPartition.md"><code translate="no">createPartition()</code></a>.</p>
</div>
<div class="language-javascript">
<p>파티션을 만들려면 <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/createPartition.md"><code translate="no">createPartition()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">노드.js</a></div>
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
<p>위의 코드 스니펫은 컬렉션에 파티션을 만들고 컬렉션의 파티션을 나열합니다.</p>
<div class="admonition note">
<p><b>참고</b></p>
<p>컬렉션에서 필드를 파티션 키로 설정한 경우 Milvus에서 컬렉션의 파티션 관리를 처리합니다. 따라서 파티션을 만들려고 할 때 메시지가 표시되는 오류가 발생할 수 있습니다.</p>
<p>자세한 내용은 <a href="https://milvus.io/docs/use-partition-key.md">파티션 키 사용을</a> 참조하세요.</p>
</div>
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
    </button></h2><p>특정 파티션의 존재 여부를 확인할 수도 있습니다.</p>
<div class="language-python">
<p>특정 파티션을 확인하려면 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/has_partition.md"><code translate="no">has_partition()</code></a>.</p>
</div>
<div class="language-java">
<p>특정 파티션을 확인하려면 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/hasPartition.md"><code translate="no">hasPartition()</code></a>.</p>
</div>
<div class="language-javascript">
<p>특정 파티션을 확인하려면 <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/hasPartition.md"><code translate="no">hasPartition()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
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
<p>위의 코드 스니펫은 컬렉션에 <code translate="no">partitionA</code> 및 <code translate="no">partitionC</code> 이라는 이름의 파티션이 있는지 확인합니다.</p>
<h2 id="Load--Release-Partitions" class="common-anchor-header">파티션 로드 및 해제<button data-href="#Load--Release-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>특정 파티션을 로드 및 해제하여 검색 및 쿼리에 사용할 수 있게 하거나 사용할 수 없게 할 수 있습니다.</p>
<h3 id="Get-Load-Status" class="common-anchor-header">로드 상태 보기</h3><div class="language-python">
<p>컬렉션 및 해당 파티션의 로드 상태를 확인하려면 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md"><code translate="no">get_load_state()</code></a>.</p>
</div>
<div class="language-java">
<p>컬렉션 및 해당 파티션의 로드 상태를 확인하려면 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/getLoadState.md"><code translate="no">getLoadState()</code></a>.</p>
</div>
<div class="language-javascript">
<p>컬렉션 및 해당 파티션의 로드 상태를 확인하려면 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/getLoadState.md"><code translate="no">getLoadState()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
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
<p>가능한 로드 상태는 다음 중 하나일 수 있습니다.</p>
<ul>
<li><p><strong>로드됨</strong></p>
<p>컬렉션의 파티션 중 하나 이상이 로드된 경우 컬렉션은 <code translate="no">Loaded</code> 으로 표시됩니다.</p></li>
<li><p><strong>NotLoad</strong></p>
<p>컬렉션의 파티션이 로드되지 않은 경우 컬렉션은 <code translate="no">NotLoad</code> 으로 표시됩니다.</p></li>
<li><p><strong>로드 중</strong></p>
<p>컬렉션의 파티션 중 하나 이상이 로드 중인 경우 컬렉션은 로드 중으로 표시됩니다.</p></li>
</ul>
<h3 id="Load-Partitions" class="common-anchor-header">파티션 로드</h3><div class="language-python">
<p>컬렉션의 모든 파티션을 로드하려면 다음을 호출하면 됩니다. <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md"><code translate="no">load_collection()</code></a>. 컬렉션의 특정 파티션을 로드하려면 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/load_partitions.md"><code translate="no">load_partitions()</code></a>.</p>
</div>
<div class="language-java">
<p>컬렉션의 모든 파티션을 로드하려면, 그냥 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/loadCollection.md"><code translate="no">loadCollection()</code></a>. 컬렉션의 특정 파티션을 로드하려면 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/loadPartitions.md"><code translate="no">loadPartitions()</code></a>.</p>
</div>
<div class="language-javascript">
<p>컬렉션의 모든 파티션을 로드하려면, 그냥 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/loadCollection.md"><code translate="no">loadCollection()</code></a>. 컬렉션의 특정 파티션을 로드하려면 <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/loadPartitions.md"><code translate="no">loadPartitions()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
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
<p>한 번에 여러 파티션을 로드하려면 다음과 같이 하세요:</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">노드.js</a></div>
<pre><code translate="no" class="language-python">client.load_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>

res = client.get_load_state(
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
<p>하나 이상의 파티션에서 지정된 필드를 로드하려면 다음과 같이 하세요:</p>
<pre><code translate="no" class="language-python">client.load_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],
    load_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>],
    skip_load_dynamic_field=<span class="hljs-literal">True</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">load_fields</code> 에 나열된 필드만 검색 및 쿼리에서 필터링 조건 및 출력 필드로 사용할 수 있습니다. 목록에 항상 기본 키를 포함해야 합니다. 로드에서 제외된 필드 이름은 필터링이나 출력에 사용할 수 없습니다.</p>
<p><code translate="no">skip_load_dynamic_field=True</code> 을 사용하여 동적 필드 로드를 건너뛸 수 있습니다. Milvus는 동적 필드를 단일 필드로 취급하므로 동적 필드의 모든 키가 함께 포함되거나 제외됩니다.</p>
<h3 id="Release-Partitions" class="common-anchor-header">파티션 해제</h3><div class="language-python">
<p>컬렉션의 모든 파티션을 해제하려면 간단히 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md"><code translate="no">release_collection()</code></a>. 컬렉션의 특정 파티션을 해제하려면 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/release_partitions.md"><code translate="no">release_partitions()</code></a>.</p>
</div>
<div class="language-java">
<p>컬렉션의 모든 파티션을 해제하려면 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a>. 컬렉션의 특정 파티션을 해제하려면 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/releasePartitions.md"><code translate="no">releasePartitions()</code></a>.</p>
</div>
<div class="language-javascript">
<p>컬렉션의 모든 파티션을 해제하려면 다음을 호출하면 됩니다. <a href="https://milvus.io/api-reference/node/v2.4.x/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a>. 컬렉션의 특정 파티션을 해제하려면 <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/releasePartitions.md"><code translate="no">releasePartitions()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
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
<p>한 번에 여러 파티션을 해제하려면 다음과 같이 하세요:</p>
<pre><code translate="no" class="language-python">client.release_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;_default&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-Partitions" class="common-anchor-header">파티션 삭제<button data-href="#Drop-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>파티션을 릴리스한 후 더 이상 필요하지 않은 경우 파티션을 삭제할 수 있습니다.</p>
<div class="language-python">
<p>파티션을 삭제하려면 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/drop_partition.md"><code translate="no">drop_partition()</code></a>.</p>
</div>
<div class="language-java">
<p>파티션을 삭제하려면 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/dropPartition.md"><code translate="no">dropPartition()</code></a>.</p>
</div>
<div class="language-javascript">
<p>파티션을 삭제하려면 <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/dropPartition.md"><code translate="no">dropPartition()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">노드.js</a></div>
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
<p><b>참고</b></p>
<p>파티션을 삭제하기 전에 메모리에서 파티션을 해제해야 합니다.</p>
</div>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>파티션에 얼마나 많은 데이터를 저장할 수 있나요?</strong></p>
<p>파티션에는 1B 미만의 데이터를 저장하는 것이 좋습니다.</p></li>
<li><p><strong>생성할 수 있는 파티션의 최대 개수는 몇 개인가요?</strong></p>
<p>기본적으로 Milvus는 최대 1,024개의 파티션을 생성할 수 있습니다. <code translate="no">rootCoord.maxPartitionNum</code> 을 구성하여 최대 파티션 수를 조정할 수 있습니다. 자세한 내용은 <a href="https://milvus.io/docs/configure_rootcoord.md#rootCoordmaxPartitionNum">시스템 구성을</a> 참조하세요.</p></li>
<li><p><strong>파티션과 파티션 키를 어떻게 구분하나요?</strong></p>
<p>파티션은 물리적 저장 단위인 반면, 파티션 키는 지정된 열을 기반으로 특정 파티션에 데이터를 자동으로 할당하는 논리적 개념입니다.</p>
<p>예를 들어 Milvus에서 파티션 키가 <code translate="no">color</code> 필드로 정의된 컬렉션이 있는 경우, 시스템은 각 엔터티의 <code translate="no">color</code> 필드의 해시값을 기반으로 데이터를 파티션에 자동으로 할당합니다. 이 자동화된 프로세스는 사용자가 데이터를 삽입하거나 검색할 때 파티션을 수동으로 지정해야 하는 수고를 덜어줍니다.</p>
<p>반면에 수동으로 파티션을 생성할 때는 파티션 키의 기준에 따라 각 파티션에 데이터를 할당해야 합니다. 예를 들어 <code translate="no">color</code> 필드가 있는 컬렉션이 있는 경우 <code translate="no">color</code> 값이 <code translate="no">red</code> 인 엔티티는 <code translate="no">partition A</code> 에, <code translate="no">color</code> 값이 <code translate="no">blue</code> 인 엔티티는 <code translate="no">partition B</code> 에 수동으로 할당해야 합니다. 이 수동 관리에는 더 많은 노력이 필요합니다.</p>
<p>요약하면, 파티션과 파티션 키는 모두 데이터 계산을 최적화하고 쿼리 효율성을 향상시키는 데 활용됩니다. 파티션 키를 활성화한다는 것은 파티션 데이터 삽입 및 로딩의 수동 관리에 대한 통제권을 포기하는 것을 의미하며, 이러한 프로세스는 Milvus에서 완전히 자동화되어 처리되므로 이를 인식하는 것이 중요합니다.</p></li>
</ul>
