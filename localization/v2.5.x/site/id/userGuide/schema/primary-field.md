---
id: primary-field.md
title: Bidang Utama &amp; AutoID
summary: >-
  Field utama secara unik mengidentifikasi sebuah entitas. Halaman ini
  memperkenalkan cara menambahkan field utama dari dua tipe data yang berbeda
  dan cara mengaktifkan Milvus untuk mengalokasikan nilai field utama secara
  otomatis.
---
<h1 id="Primary-Field--AutoID​" class="common-anchor-header">Bidang Utama &amp; AutoID<button data-href="#Primary-Field--AutoID​" class="anchor-icon" translate="no">
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
    </button></h1><p>Field utama mengidentifikasi sebuah entitas secara unik. Halaman ini memperkenalkan cara menambahkan field utama dari dua tipe data yang berbeda dan cara mengaktifkan Milvus untuk mengalokasikan nilai field utama secara otomatis.</p>
<h2 id="Overview​" class="common-anchor-header">Gambaran Umum<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Dalam sebuah koleksi, kunci utama dari setiap entitas harus unik secara global. Ketika menambahkan field utama, Anda harus secara eksplisit mengatur tipe datanya ke <strong>VARCHAR</strong> atau <strong>INT64</strong>. Mengatur tipe data ke <strong>INT64</strong> menunjukkan bahwa kunci utama harus berupa bilangan bulat yang mirip dengan <code translate="no">12345</code>; Mengatur tipe data ke <strong>VARCHAR</strong> menunjukkan bahwa kunci utama harus berupa string yang mirip dengan <code translate="no">my_entity_1234</code>.</p>
<p>Anda juga dapat mengaktifkan <strong>AutoID</strong> untuk membuat Milvus secara otomatis mengalokasikan kunci primer untuk entitas yang masuk. Setelah Anda mengaktifkan <strong>AutoID</strong> di koleksi Anda, jangan sertakan kunci primer saat memasukkan entitas.</p>
<p>Field utama dalam koleksi tidak memiliki nilai default dan tidak boleh bernilai nol.</p>
<h2 id="Use-Int64-Primary-Keys​" class="common-anchor-header">Menggunakan Kunci Primer Int64<button data-href="#Use-Int64-Primary-Keys​" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menggunakan kunci primer bertipe Int64, Anda perlu mengatur <code translate="no">datatype</code> ke <code translate="no">DataType.INT64</code> dan mengatur <code translate="no">is_primary</code> ke <code translate="no">true</code>. Jika Anda juga membutuhkan Milvus untuk mengalokasikan kunci primer untuk entitas yang masuk, atur juga <code translate="no">auto_id</code> ke <code translate="no">true</code>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema()​
​
schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,​
    datatype=DataType.INT64,​
    <span class="hljs-comment"># highlight-start​</span>
    is_primary=<span class="hljs-literal">True</span>,​
    auto_id=<span class="hljs-literal">True</span>,​
    <span class="hljs-comment"># highlight-end​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq; ​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)​
        .dataType(DataType.Int64)​
        <span class="hljs-comment">// highlight-start​</span>
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .autoID(<span class="hljs-literal">true</span>)​
        <span class="hljs-comment">// highlight-end​</span>
        .build());​
);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> schema = [​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,​
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;ID field&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,​
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">100</span>,​
  },​
];​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go 缺失​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_id&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: true,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-VarChar-Primary-Keys​" class="common-anchor-header">Menggunakan Kunci Primer VarChar<button data-href="#Use-VarChar-Primary-Keys​" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menggunakan kunci primer VarChar, selain mengubah nilai parameter <code translate="no">data_type</code> menjadi <code translate="no">DataType.VARCHAR</code>, Anda juga perlu mengatur parameter <code translate="no">max_length</code> untuk field tersebut. </p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,​
    datatype=DataType.VARCHAR,​
    <span class="hljs-comment"># highlight-start​</span>
    is_primary=<span class="hljs-literal">True</span>,​
    auto_id=<span class="hljs-literal">True</span>,​
    max_length=<span class="hljs-number">512</span>,​
    <span class="hljs-comment"># highlight-end​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">DataType</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">collection</span>.<span class="hljs-property">request</span>.<span class="hljs-property">AddFieldReq</span>; ​
​
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_id&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)​
        <span class="hljs-comment">// highlight-start​</span>
        .<span class="hljs-title function_">isPrimaryKey</span>(<span class="hljs-literal">true</span>)​
        .<span class="hljs-title function_">autoID</span>(<span class="hljs-literal">true</span>)​
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">512</span>)​
        <span class="hljs-comment">// highlight-end​</span>
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-comment">// highlight-start​</span>
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">true</span>,​
    <span class="hljs-attr">maxLength</span>: <span class="hljs-number">512</span>​
    <span class="hljs-comment">// highlight-end​</span>
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go 缺失​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_id&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: true,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>​
    ],​
    \&quot;params\&quot;: {​
        \&quot;max_length\&quot;: 512​
    }​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>