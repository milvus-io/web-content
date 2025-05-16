---
id: index-scalar-fields.md
order: 2
summary: >-
  Panduan ini akan memandu Anda dalam membuat dan mengonfigurasi indeks skalar
  untuk bidang seperti bilangan bulat, string, dll.
title: Bidang Skalar Indeks
---
<h1 id="Index-Scalar-Fields" class="common-anchor-header">Bidang Skalar Indeks<button data-href="#Index-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>Di Milvus, indeks skalar digunakan untuk mempercepat penyaringan metafilter berdasarkan nilai bidang non-vektor tertentu, mirip dengan indeks basis data tradisional. Panduan ini akan memandu Anda dalam membuat dan mengonfigurasi indeks skalar untuk bidang seperti bilangan bulat, string, dll.</p>
<h2 id="Types-of-scalar-indexing" class="common-anchor-header">Jenis pengindeksan skalar<button data-href="#Types-of-scalar-indexing" class="anchor-icon" translate="no">
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
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Auto-indexing">Pengindeksan otomatis</a></strong>: Milvus secara otomatis menentukan tipe indeks berdasarkan tipe data dari field skalar. Ini cocok bila Anda tidak perlu mengontrol jenis indeks tertentu.</p></li>
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Custom-indexing">Pengindeksan khusus</a></strong>: Anda menentukan jenis indeks yang tepat, seperti indeks terbalik. Ini memberikan kontrol lebih besar atas pemilihan jenis indeks.</p></li>
</ul>
<h2 id="Auto-indexing" class="common-anchor-header">Pengindeksan otomatis<button data-href="#Auto-indexing" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Untuk menggunakan pengindeksan otomatis, hilangkan parameter <strong>index_type</strong> di <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>sehingga Milvus dapat menyimpulkan jenis indeks berdasarkan jenis bidang skalar.</p>
</div>
<div class="language-java">
<p>Untuk menggunakan pengindeksan otomatis, hilangkan parameter <strong>indexType</strong> dalam <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>agar Milvus dapat menyimpulkan tipe indeks berdasarkan tipe field skalar.</p>
</div>
<div class="language-javascript">
<p>Untuk menggunakan pengindeksan otomatis, hilangkan parameter <strong>index_type</strong> dalam <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>sehingga Milvus dapat menyimpulkan tipe indeks berdasarkan tipe field skalar.</p>
</div>
<p>Untuk pemetaan antara tipe data skalar dan algoritme pengindeksan default, lihat <a href="https://milvus.io/docs/scalar_index.md#Scalar-field-indexing-algorithms">Algoritme pengindeksan bidang skalar</a>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Auto indexing</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

index_params = MilvusClient.prepare_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>

index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;&quot;</span>, <span class="hljs-comment"># Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
    index_name=<span class="hljs-string">&quot;default_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
  collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
  index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForScalarField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;scalar_1&quot;</span>) <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    .indexName(<span class="hljs-string">&quot;default_index&quot;</span>) <span class="hljs-comment">// Name of the index to be created</span>
    .indexType(<span class="hljs-string">&quot;&quot;</span>) <span class="hljs-comment">// Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>) <span class="hljs-comment">// Specify the collection name</span>
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment">// Specify the collection name</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;default_index&quot;</span>, <span class="hljs-comment">// Name of the index to be created</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment">// Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
})
<button class="copy-code-btn"></button></code></pre>
<h2 id="Custom-indexing" class="common-anchor-header">Pengindeksan khusus<button data-href="#Custom-indexing" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Untuk menggunakan pengindeksan khusus, tentukan jenis indeks tertentu menggunakan parameter <strong>index_type</strong> di <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>.</p>
</div>
<div class="language-java">
<p>Untuk menggunakan pengindeksan khusus, tentukan jenis indeks tertentu menggunakan parameter <strong>indexType</strong> di dalam file . <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>.</p>
</div>
<div class="language-javascript">
<p>Untuk menggunakan pengindeksan khusus, tentukan jenis indeks tertentu menggunakan parameter <strong>index_type</strong> di <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<p>Contoh di bawah ini membuat indeks terbalik untuk bidang skalar <code translate="no">scalar_2</code>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">index_params = MilvusClient.prepare_index_params() <span class="hljs-comment">#  Prepare an IndexParams object</span>

index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_2&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
  collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
  index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForScalarField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;scalar_1&quot;</span>) <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    .indexName(<span class="hljs-string">&quot;inverted_index&quot;</span>) <span class="hljs-comment">// Name of the index to be created</span>
    .indexType(<span class="hljs-string">&quot;INVERTED&quot;</span>) <span class="hljs-comment">// Type of index to be created</span>
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>) <span class="hljs-comment">// Specify the collection name</span>
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment">// Specify the collection name</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;inverted_index&quot;</span>, <span class="hljs-comment">// Name of the index to be created</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span> <span class="hljs-comment">// Type of index to be created</span>
})
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p><strong>Metode dan Parameter</strong></p>
<ul>
<li><p><strong>prepare_index_params ()</strong></p>
<p>Mempersiapkan objek <strong>IndexParams</strong>.</p></li>
<li><p><strong>add_index()</strong></p>
<p>Menambahkan konfigurasi indeks ke objek <strong>IndexParams</strong>.</p>
<ul>
<li><p><strong>field_name</strong><em>(string</em>)</p>
<p>Nama bidang skalar yang akan diindeks.</p></li>
<li><p><strong>index_type</strong><em>(string</em>):</p>
<p>Jenis indeks skalar yang akan dibuat. Untuk pengindeksan implisit, biarkan kosong atau hilangkan parameter ini.</p>
<p>Untuk pengindeksan khusus, nilai yang valid adalah:</p>
<ul>
<li><p><strong>INVERTED</strong>: (Disarankan) Indeks terbalik terdiri dari kamus istilah yang berisi semua kata bertanda yang diurutkan menurut abjad. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/scalar_index.md">Indeks Skalar</a>.</p></li>
<li><p><strong>STL_SORT</strong>: Mengurutkan bidang skalar menggunakan algoritme pengurutan pustaka templat standar. Hanya mendukung bidang numerik (misalnya, INT8, INT16, INT32, INT64, FLOAT, DOUBLE).</p></li>
<li><p><strong>Trie</strong>: Struktur data pohon untuk pencarian dan pengambilan awalan yang cepat. Mendukung bidang VARCHAR.</p></li>
</ul></li>
<li><p><strong>nama_indeks</strong><em>(string</em>)</p>
<p>Nama indeks skalar yang akan dibuat. Setiap bidang skalar mendukung satu indeks.</p></li>
</ul></li>
<li><p><strong>create_index ()</strong></p>
<p>Membuat indeks dalam koleksi yang ditentukan.</p>
<ul>
<li><p><strong>nama_koleksi</strong><em>(string</em>)</p>
<p>Nama koleksi yang akan dibuat indeksnya.</p></li>
<li><p><strong>index_params</strong></p>
<p>Objek <strong>IndexParams</strong> yang berisi konfigurasi indeks.</p></li>
</ul></li>
</ul>
</div>
<div class="language-java">
<p><strong>Metode dan Parameter</strong></p>
<ul>
<li><strong>IndexParam</strong>Mempersiapkan objek IndexParam.<ul>
<li><strong>fieldName</strong><em>(String</em>) Nama bidang skalar yang akan diindeks.</li>
<li><strong>indexName</strong><em>(String</em>) Nama indeks skalar yang akan dibuat. Setiap bidang skalar mendukung satu indeks.</li>
<li><strong>indexType</strong><em>(String</em>) Jenis indeks skalar yang akan dibuat. Untuk pengindeksan implisit, biarkan kosong atau hilangkan parameter ini. Untuk pengindeksan khusus, nilai yang valid adalah:<ul>
<li><strong>INVERTED</strong>: (Disarankan) Indeks terbalik terdiri dari kamus istilah yang berisi semua kata bertanda yang diurutkan menurut abjad. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/scalar_index.md">Indeks Skalar</a>.</li>
<li><strong>STL_SORT</strong>: Mengurutkan bidang skalar menggunakan algoritme pengurutan pustaka templat standar. Mendukung bidang Boolean dan numerik (misalnya, INT8, INT16, INT32, INT64, FLOAT, DOUBLE).</li>
<li><strong>Trie</strong>: Struktur data pohon untuk pencarian dan pengambilan awalan yang cepat. Mendukung bidang VARCHAR.</li>
</ul></li>
</ul></li>
<li><strong>CreateIndexReq</strong>Membuat indeks dalam koleksi yang ditentukan.<ul>
<li><strong>collectionName</strong><em>(String</em>) Nama koleksi tempat indeks dibuat.</li>
<li><strong>indexParams</strong><em>(Daftar<IndexParam></em>) Daftar objek IndexParam yang berisi konfigurasi indeks.</li>
</ul></li>
</ul>
</div>
<div class="language-javascript">
<p><strong>Metode dan Parameter</strong></p>
<ul>
<li><p><strong>createIndex</strong></p>
<p>Membuat indeks dalam koleksi yang ditentukan.</p>
<ul>
<li><strong>collection_name</strong><em>(string</em>) Nama koleksi tempat indeks dibuat.</li>
<li><strong>field_name</strong><em>(string</em>) Nama bidang skalar yang akan diindeks.</li>
<li><strong>index_name</strong><em>(string</em>) Nama indeks skalar yang akan dibuat. Setiap bidang skalar mendukung satu indeks.</li>
<li><strong>index_type</strong><em>(string</em>) Jenis indeks skalar yang akan dibuat. Untuk pengindeksan implisit, biarkan kosong atau hilangkan parameter ini. Untuk pengindeksan khusus, nilai yang valid adalah:<ul>
<li><strong>INVERTED</strong>: (Disarankan) Indeks terbalik terdiri dari kamus istilah yang berisi semua kata bertanda yang diurutkan menurut abjad. Untuk detailnya, lihat <a href="/docs/id/v2.4.x/scalar_index.md">Indeks Skalar</a>.</li>
<li><strong>STL_SORT</strong>: Mengurutkan bidang skalar menggunakan algoritme pengurutan pustaka templat standar. Mendukung bidang Boolean dan numerik (misalnya, INT8, INT16, INT32, INT64, FLOAT, DOUBLE).</li>
<li><strong>Trie</strong>: Struktur data pohon untuk pencarian dan pengambilan awalan yang cepat. Mendukung bidang VARCHAR.</li>
</ul></li>
</ul></li>
</ul>
</div>
<h2 id="Verifying-the-result" class="common-anchor-header">Memverifikasi hasil<button data-href="#Verifying-the-result" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Gunakan metode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> untuk memverifikasi pembuatan indeks skalar:</p>
</div>
<div class="language-java">
<p>Gunakan metode <code translate="no">listIndexes()</code> untuk memverifikasi pembuatan indeks skalar:</p>
</div>
<div class="language-javascript">
<p>Gunakan metode <code translate="no">listIndexes()</code> untuk memverifikasi pembuatan indeks skalar:</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.list_indexes(
    collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>  <span class="hljs-comment"># Specify the collection name</span>
)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [&#x27;default_index&#x27;,&#x27;inverted_index&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.ListIndexesReq;

<span class="hljs-type">ListIndexesReq</span> <span class="hljs-variable">listIndexesReq</span> <span class="hljs-operator">=</span> ListIndexesReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>)  <span class="hljs-comment">// Specify the collection name</span>
    .build();

List&lt;String&gt; indexNames = client.listIndexes(listIndexesReq);

System.out.println(indexNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;default_index&quot;,</span>
<span class="hljs-comment">//     &quot;inverted_index&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listIndexes</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;test_scalar_index&#x27;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">indexes</span>)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;default_index&quot;,</span>
<span class="hljs-comment">//     &quot;inverted_index&quot;</span>
<span class="hljs-comment">// ]   </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Batasan<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>Saat ini, pengindeksan skalar mendukung tipe data INT8, INT16, INT32, INT64, FLOAT, DOUBLE, BOOL, VARCHAR, dan ARRAY, tetapi tidak mendukung tipe data JSON.</li>
</ul>
