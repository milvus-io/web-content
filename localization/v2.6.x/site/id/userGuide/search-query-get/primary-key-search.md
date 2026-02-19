---
id: primary-key-search.md
title: Pencarian Kunci UtamaCompatible with Milvus 2.6.9+
summary: >-
  Ketika melakukan pencarian kemiripan, Anda selalu diminta untuk menyediakan
  satu atau lebih vektor kueri, bahkan jika vektor kueri sudah ada di koleksi
  target. Untuk menghindari pengambilan vektor sebelum pencarian, Anda dapat
  menggunakan kunci primer sebagai gantinya.
beta: Milvus 2.6.9+
---
<h1 id="Primary-Key-Search" class="common-anchor-header">Pencarian Kunci Utama<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.9+</span><button data-href="#Primary-Key-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Ketika melakukan pencarian kemiripan, Anda selalu diminta untuk menyediakan satu atau lebih vektor kueri, bahkan jika vektor kueri sudah ada di koleksi target. Untuk menghindari pengambilan vektor sebelum pencarian, Anda dapat menggunakan kunci primer sebagai gantinya.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada platform e-commerce, pengguna dapat memasukkan kata kunci untuk mengambil produk yang cocok dengannya. Setelah pengguna melihat halaman detail produk, platform juga akan menampilkan daftar produk serupa di bagian bawah halaman untuk pengguna yang ingin membandingkannya.</p>
<p>Rekomendasi diurutkan berdasarkan kemiripannya dengan kata kunci atau produk saat ini. Untuk mencapai hal ini, pengembang platform perlu mengambil representasi vektor dari kata kunci atau produk saat ini dari Milvus sebelum pencarian kemiripan yang sebenarnya, yang meningkatkan perjalanan bolak-balik antara platform dan Milvus dan menghasilkan sejumlah besar pelampung berdimensi tinggi yang dikirimkan melalui jaringan.</p>
<p>Untuk menyederhanakan logika interaksi antara aplikasi Anda dan Milvus, mengurangi jumlah perjalanan bolak-balik, dan menghindari pengiriman sejumlah besar nilai floating-point berdimensi tinggi di seluruh jaringan, pertimbangkan untuk menggunakan pencarian kunci utama.</p>
<p>Dalam pencarian kunci utama, Anda tidak perlu memberikan vektor kueri apa pun. Sebaliknya, Anda diminta untuk memberikan kunci utama (<code translate="no">ids</code>) dari entitas yang berisi vektor kueri.</p>
<h2 id="Limits--restrictions" class="common-anchor-header">Batasan &amp; larangan<button data-href="#Limits--restrictions" class="anchor-icon" translate="no">
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
<li><p>Pencarian menggunakan kunci primer berlaku untuk semua tipe data vektor, kecuali bidang vektor jarang yang berasal dari bidang VarChar, seperti pada fungsi BM25.</p></li>
<li><p>Anda dapat menggunakan kunci primer sebagai pengganti vektor kueri dalam pencarian yang difilter, rentang, dan pengelompokan, secara opsional dengan pagination yang diaktifkan. Namun, fitur ini tidak berlaku untuk pencarian hibrida dan iterator pencarian.</p></li>
<li><p>Untuk pencarian kemiripan yang melibatkan daftar sematan, Anda masih perlu mengambil vektor kueri, mengaturnya ke dalam daftar sematan, dan menjalankan pencarian.</p></li>
<li><p>Anda tidak dapat menggunakan kunci primer sebagai pengganti vektor kueri di API RESTful.</p></li>
<li><p>Untuk primary key yang tidak ada atau dalam format yang salah, Milvus akan memunculkan kesalahan.</p></li>
<li><p>Kunci primer dan vektor kueri tidak saling terpisah. Menyediakan keduanya juga akan mengakibatkan kesalahan.</p></li>
</ul>
<h2 id="Examples" class="common-anchor-header">Contoh-contoh<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh-contoh berikut ini mengasumsikan bahwa semua ID Int64 yang disediakan tersedia dalam koleksi target.</p>
<div class="alert note">
<p>Kunci utama tidak digunakan untuk penyaringan; kunci utama hanya digunakan untuk pengambilan vektor.</p>
</div>
<h3 id="Example-1-Basic-primary-key-search" class="common-anchor-header">Contoh 1: Pencarian kunci-primer dasar<button data-href="#Example-1-Basic-primary-key-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk melakukan pencarian kunci-primer dasar, cukup ganti vektor kueri dengan kunci primer.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>], <span class="hljs-comment"># a list of primary keys</span></span>
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtered-search-using-primary-keys" class="common-anchor-header">Contoh 2: Pencarian yang difilter menggunakan kunci utama<button data-href="#Example-2-Filtered-search-using-primary-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Contoh berikut ini mengasumsikan bahwa warna dan suka adalah dua bidang yang ditentukan skema dalam koleksi target.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>], <span class="hljs-comment">#</span></span>
<span class="highlighted-comment-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>],</span>
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-search-using-primary-keys" class="common-anchor-header">Contoh 3: Pencarian rentang menggunakan kunci primer<button data-href="#Example-3-Range-search-using-primary-keys" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    limit=<span class="hljs-number">3</span>,
    search_params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.4</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.6</span></span>
<span class="highlighted-comment-line">        }</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Grouping-search-using-primary-keys" class="common-anchor-header">Contoh 4: Pencarian pengelompokan menggunakan kunci primer<button data-href="#Example-4-Grouping-search-using-primary-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Contoh berikut ini mengasumsikan <code translate="no">docId</code> adalah bidang yang ditentukan skema dalam koleksi target.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    limit=<span class="hljs-number">3</span>,
    group_by_field=<span class="hljs-string">&quot;docId&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;docId&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
