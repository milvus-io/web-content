---
id: delete-entities.md
title: Hapus Entitas
---
<h1 id="Delete-Entities​" class="common-anchor-header">Menghapus Entitas<button data-href="#Delete-Entities​" class="anchor-icon" translate="no">
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
    </button></h1><p>Anda dapat menghapus entitas yang tidak lagi dibutuhkan dengan memfilter kondisi atau primary key-nya.</p>
<h2 id="Delete-Entities-by-Filtering-Conditions​" class="common-anchor-header">Menghapus Entitas dengan Memfilter Kondisi<button data-href="#Delete-Entities-by-Filtering-Conditions​" class="anchor-icon" translate="no">
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
    </button></h2><p>Ketika menghapus beberapa entitas yang memiliki beberapa atribut yang sama dalam satu kelompok, Anda dapat menggunakan ekspresi penyaringan. Contoh kode di bawah ini menggunakan operator <strong>in</strong> untuk menghapus secara massal semua Entitas dengan bidang <strong>warna</strong> yang diatur ke nilai <strong>merah</strong> dan <strong>hijau</strong>. Anda juga dapat menggunakan operator lain untuk membuat ekspresi filter yang sesuai dengan kebutuhan Anda. Untuk informasi lebih lanjut tentang ekspresi filter, silakan lihat Pemfilteran <a href="/docs/id/boolean.md">Metadata</a>.</p>
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
<h2 id="Delete-Entities-by-Primary-Keys​" class="common-anchor-header">Menghapus Entitas dengan Kunci Primer<button data-href="#Delete-Entities-by-Primary-Keys​" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada kebanyakan kasus, kunci primer mengidentifikasi Entitas secara unik. Anda dapat menghapus Entitas dengan mengatur kunci primernya dalam permintaan hapus. Contoh kode di bawah ini menunjukkan cara menghapus dua entitas dengan kunci primer <strong>18</strong> dan <strong>19</strong>.</p>
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
<h2 id="Delete-Entities-from-Partitions​" class="common-anchor-header">Menghapus Entitas dari Partisi<button data-href="#Delete-Entities-from-Partitions​" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda juga dapat menghapus entitas yang disimpan dalam partisi tertentu. Cuplikan kode berikut ini mengasumsikan bahwa Anda memiliki partisi bernama <strong>PartitionA</strong> dalam koleksi Anda.</p>
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
