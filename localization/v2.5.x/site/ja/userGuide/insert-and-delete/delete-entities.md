---
id: delete-entities.md
title: エンティティの削除
---
<h1 id="Delete-Entities​" class="common-anchor-header">エンティティの削除<button data-href="#Delete-Entities​" class="anchor-icon" translate="no">
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
    </button></h1><p>フィルタリング条件や主キーによって不要になったエンティティを削除できます。</p>
<h2 id="Delete-Entities-by-Filtering-Conditions​" class="common-anchor-header">フィルタ条件によるエンティティの削除<button data-href="#Delete-Entities-by-Filtering-Conditions​" class="anchor-icon" translate="no">
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
    </button></h2><p>属性を共有する複数のエンティティを一括削除する場合は、フィルタ式を使用できます。以下のコード例では、<strong>in</strong>演算子を使用して、<strong>色</strong>フィールドが<strong>赤と</strong> <strong>緑の</strong>値に設定されているすべてのエンティティを一括削除しています。他の演算子を使用して、要件に合ったフィルタ式を構築することもできます。フィルタ式の詳細については、「<a href="/docs/ja/boolean.md">メタデータのフィルタリング</a>」を参照してください。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
res = client.delete(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-comment"># highlight-next-line​</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color in [&#x27;red_3314&#x27;, &#x27;purple_7392&#x27;]&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># {&#x27;delete_count&#x27;: 2}​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.DeleteReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.DeleteResp;​
​
<span class="hljs-type">ilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
<span class="hljs-type">DeleteResp</span> <span class="hljs-variable">deleteResp</span> <span class="hljs-operator">=</span> client.delete(DeleteReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .filter(<span class="hljs-string">&quot;color in [&#x27;red_3314&#x27;, &#x27;purple_7392&#x27;]&quot;</span>)​
        .build());​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// 7. Delete entities​</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-comment">// highlight-next-line​</span>
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;color in [&#x27;red&#x27;, &#x27;green&#x27;]&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">delete_cnt</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// 3​</span>
<span class="hljs-comment">// ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/delete&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;filter&quot;: &quot;color in [\&quot;red_3314\&quot;, \&quot;purple_7392\&quot;]&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-Entities-by-Primary-Keys​" class="common-anchor-header">主キーによるエンティティの削除<button data-href="#Delete-Entities-by-Primary-Keys​" class="anchor-icon" translate="no">
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
    </button></h2><p>ほとんどの場合、主キーはエンティティを一意に識別します。削除リクエストに主キーを設定することで、Entity を削除できます。以下のコード例は、主キー<strong>18</strong>と<strong>19</strong> を持つ 2 つのエンティティを削除する方法を示している。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.delete(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-comment"># highlight-next-line​</span>
    ids=[<span class="hljs-number">18</span>, <span class="hljs-number">19</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># {&#x27;delete_count&#x27;: 2}​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.DeleteReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.DeleteResp;​
​
<span class="hljs-keyword">import</span> java.util.Arrays;​
​
​
<span class="hljs-type">DeleteResp</span> <span class="hljs-variable">deleteResp</span> <span class="hljs-operator">=</span> client.delete(DeleteReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .ids(Arrays.asList(<span class="hljs-number">18</span>, <span class="hljs-number">19</span>))​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">ids</span>: [<span class="hljs-number">18</span>, <span class="hljs-number">19</span>]​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">delete_cnt</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// 2​</span>
<span class="hljs-comment">// ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/delete&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;filter&quot;: &quot;id in [18, 19]&quot;​
}&#x27;</span>​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:{}}​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-Entities-from-Partitions​" class="common-anchor-header">パーティションからのエンティティの削除<button data-href="#Delete-Entities-from-Partitions​" class="anchor-icon" translate="no">
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
    </button></h2><p>特定のパーティションに格納されているエンティティを削除することもできます。以下のコード・スニペットは、コレクションに<strong>PartitionAという</strong>パーティションがあると仮定しています。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.delete(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    ids=[<span class="hljs-number">18</span>, <span class="hljs-number">19</span>],​
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># {&#x27;delete_count&#x27;: 2}​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.DeleteReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.DeleteResp;​
​
<span class="hljs-keyword">import</span> java.util.Arrays;​
​
<span class="hljs-type">DeleteResp</span> <span class="hljs-variable">deleteResp</span> <span class="hljs-operator">=</span> client.delete(DeleteReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .ids(Arrays.asList(<span class="hljs-number">18</span>, <span class="hljs-number">19</span>))​
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">ids</span>: [<span class="hljs-number">18</span>, <span class="hljs-number">19</span>],​
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">delete_cnt</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// 2​</span>
<span class="hljs-comment">// ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/delete&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;partitionName&quot;: &quot;partitionA&quot;,​
    &quot;filter&quot;: &quot;id in [18, 19]&quot;​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;cost&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {}​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
