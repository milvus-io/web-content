---
id: elasticsearch-queries-to-milvus.md
title: Kueri Elasticsearch ke Milvus
summary: >-
  Elasticsearch, yang dibangun di atas Apache Lucene, adalah mesin pencari
  sumber terbuka terkemuka. Namun, mesin ini menghadapi tantangan dalam aplikasi
  AI modern, termasuk biaya pembaruan yang tinggi, performa real-time yang
  buruk, manajemen pecahan yang tidak efisien, desain yang bukan cloud-native,
  dan permintaan sumber daya yang berlebihan. Sebagai basis data vektor
  cloud-native, Milvus mengatasi masalah ini dengan penyimpanan dan komputasi
  yang terpisah, pengindeksan yang efisien untuk data berdimensi tinggi, dan
  integrasi tanpa batas dengan infrastruktur modern. Milvus menawarkan kinerja
  dan skalabilitas yang unggul untuk beban kerja AI.
---
<h1 id="Elasticsearch-Queries-to-Milvus" class="common-anchor-header">Kueri Elasticsearch ke Milvus<button data-href="#Elasticsearch-Queries-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Elasticsearch, yang dibangun di atas Apache Lucene, adalah mesin pencari sumber terbuka terkemuka. Namun, mesin ini menghadapi tantangan dalam aplikasi AI modern, termasuk biaya pembaruan yang tinggi, performa real-time yang buruk, manajemen pecahan yang tidak efisien, desain yang bukan cloud-native, dan permintaan sumber daya yang berlebihan. Sebagai basis data vektor cloud-native, Milvus mengatasi masalah ini dengan penyimpanan dan komputasi yang terpisah, pengindeksan yang efisien untuk data berdimensi tinggi, dan integrasi tanpa batas dengan infrastruktur modern. Milvus menawarkan kinerja dan skalabilitas yang unggul untuk beban kerja AI.</p>
<p>Artikel ini bertujuan untuk memfasilitasi migrasi basis kode Anda dari Elasticsearch ke Milvus, dengan memberikan berbagai contoh konversi kueri di antaranya.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Di Elasticsearch, operasi dalam konteks kueri menghasilkan nilai relevansi, sedangkan operasi dalam konteks filter tidak. Demikian pula, pencarian Milvus menghasilkan nilai kemiripan, sedangkan kueri yang mirip filter tidak. Ketika memigrasikan basis kode Anda dari Elasticsearch ke Milvus, prinsip kuncinya adalah mengubah bidang yang digunakan dalam konteks kueri Elasticsearch menjadi bidang vektor untuk memungkinkan pembuatan skor kemiripan.</p>
<p>Tabel di bawah ini menguraikan beberapa pola kueri Elasticsearch dan padanannya di Milvus.</p>
<table>
   <tr>
     <th><p>Kueri Elasticsearch</p></th>
     <th><p>Padanan Milvus</p></th>
     <th><p>Keterangan</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Kueri teks lengkap</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/elasticsearch-queries-to-milvus.md#Match-query">Kueri pencocokan</a></p></td>
     <td><p>Pencarian teks lengkap</p></td>
     <td><p>Keduanya menyediakan serangkaian kemampuan yang serupa.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Kueri tingkat istilah</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/elasticsearch-queries-to-milvus.md#IDs">ID</a></p></td>
     <td><p><code translate="no">in</code> operator</p></td>
     <td rowspan="6"><p>Keduanya menyediakan serangkaian kemampuan yang sama atau serupa ketika kueri Elasticsearch ini digunakan dalam konteks filter.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/elasticsearch-queries-to-milvus.md#Prefix-query">Kueri awalan</a></p></td>
     <td><p><code translate="no">like</code> operator</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/elasticsearch-queries-to-milvus.md#Range-query">Kueri rentang</a></p></td>
     <td><p>Operator perbandingan seperti <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, dan <code translate="no">&lt;=</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/elasticsearch-queries-to-milvus.md#Term-query">Kueri istilah</a></p></td>
     <td><p>Operator perbandingan seperti <code translate="no">==</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/elasticsearch-queries-to-milvus.md#Terms-query">Kueri istilah</a></p></td>
     <td><p><code translate="no">in</code> operator</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/elasticsearch-queries-to-milvus.md#Wildcard-query">Kueri karakter pengganti</a></p></td>
     <td><p><code translate="no">like</code> operator</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/elasticsearch-queries-to-milvus.md#Boolean-query">Kueri boolean</a></p></td>
     <td><p>Operator logika seperti <code translate="no">AND</code></p></td>
     <td><p>Keduanya menyediakan serangkaian kemampuan yang serupa ketika digunakan dalam konteks filter.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Kueri vektor</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/elasticsearch-queries-to-milvus.md#Knn-query">kueri kNN</a></p></td>
     <td><p>Pencarian</p></td>
     <td><p>Milvus menyediakan kemampuan pencarian vektor yang lebih canggih.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/id/elasticsearch-queries-to-milvus.md#Reciprocal-rank-fusion">Penggabungan peringkat timbal balik</a></p></td>
     <td><p>Pencarian Hibrida</p></td>
     <td><p>Milvus mendukung beberapa strategi pemeringkatan.</p></td>
   </tr>
</table>
<h2 id="Full-text-queries" class="common-anchor-header">Kueri teks lengkap<button data-href="#Full-text-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Di Elasticsearch, kueri teks lengkap memungkinkan Anda untuk mencari bidang teks yang dianalisis seperti isi email. String kueri diproses menggunakan penganalisis yang sama dengan yang diterapkan pada bidang selama pengindeksan.</p>
<h3 id="Match-query" class="common-anchor-header">Kueri kecocokan</h3><p>Di Elasticsearch, kueri pencocokan mengembalikan dokumen yang cocok dengan teks, angka, tanggal, atau nilai boolean yang disediakan. Teks yang disediakan dianalisis sebelum dicocokkan.</p>
<p>Berikut ini adalah contoh permintaan pencarian Elasticsearch dengan kueri kecocokan.</p>
<pre><code translate="no" class="language-bash">resp = client.search(
    query={
        <span class="hljs-string">&quot;match&quot;</span>: {
            <span class="hljs-string">&quot;message&quot;</span>: {
                <span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;this is a test&quot;</span>
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus menyediakan kemampuan yang sama melalui fitur pencarian teks lengkap. Anda dapat mengubah kueri Elasticsearch di atas menjadi Milvus sebagai berikut:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[<span class="hljs-string">&#x27;How is the weather in Jamaica?&#x27;</span>],
    anns_field=<span class="hljs-string">&quot;message_sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;message&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Pada contoh di atas, <code translate="no">message_sparse</code> adalah bidang vektor jarang yang berasal dari bidang VarChar bernama <code translate="no">message</code>. Milvus menggunakan model penyematan BM25 untuk mengubah nilai di bidang <code translate="no">message</code> menjadi penyematan vektor jarang dan menyimpannya di bidang <code translate="no">message_sparse</code>. Setelah menerima permintaan pencarian, Milvus menyematkan muatan kueri teks biasa menggunakan model BM25 yang sama dan melakukan pencarian vektor jarang dan mengembalikan bidang <code translate="no">id</code> dan <code translate="no">message</code> yang ditentukan dalam parameter <code translate="no">output_fields</code> bersama dengan nilai kemiripan yang sesuai.</p>
<p>Untuk menggunakan fungsi ini, Anda harus mengaktifkan penganalisis pada bidang <code translate="no">message</code> dan mendefinisikan fungsi untuk mendapatkan bidang <code translate="no">message_sparse</code> darinya. Untuk petunjuk terperinci tentang cara mengaktifkan penganalisis dan membuat fungsi turunan di Milvus, lihat <a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a>.</p>
<h2 id="Term-level-queries" class="common-anchor-header">Kueri tingkat istilah<button data-href="#Term-level-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Di Elasticsearch, kueri tingkat istilah digunakan untuk menemukan dokumen berdasarkan nilai yang tepat dalam data terstruktur, seperti rentang tanggal, alamat IP, harga, atau ID produk. Bagian ini menguraikan kemungkinan padanan dari beberapa kueri tingkat istilah Elasticsearch di Milvus. Semua contoh di bagian ini diadaptasi untuk beroperasi dalam konteks penyaringan agar sesuai dengan kemampuan Milvus.</p>
<h3 id="IDs" class="common-anchor-header">ID</h3><p>Di Elasticsearch, Anda dapat menemukan dokumen berdasarkan ID mereka dalam konteks filter sebagai berikut:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;ids&quot;</span>: {
                    <span class="hljs-string">&quot;values&quot;</span>: [
                        <span class="hljs-string">&quot;1&quot;</span>,
                        <span class="hljs-string">&quot;4&quot;</span>,
                        <span class="hljs-string">&quot;100&quot;</span>
                    ]
                }            
            }
        }
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>Di Milvus, Anda juga dapat menemukan entitas berdasarkan ID mereka sebagai berikut:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the filter parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id in [1, 4, 100]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-comment"># Use the ids parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    ids=[<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">100</span>],
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat menemukan contoh Elasticsearch di <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html">halaman ini</a>. Untuk detail tentang permintaan kueri dan permintaan get serta ekspresi penyaringan di Milvus, lihat <a href="/docs/id/get-and-scalar-query.md">Kueri</a> dan <a href="/docs/id/filtering">Penyaringan</a>.</p>
<h3 id="Prefix-query" class="common-anchor-header">Kueri awalan</h3><p>Di Elasticsearch, Anda dapat menemukan dokumen yang mengandung awalan tertentu di bidang yang disediakan dalam konteks filter sebagai berikut:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                 <span class="hljs-string">&quot;prefix&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki&quot;</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Di Milvus, Anda dapat menemukan entitas yang nilainya dimulai dengan awalan tertentu sebagai berikut:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat menemukan contoh Elasticsearch di <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html">halaman ini</a>. Untuk detail tentang operator <code translate="no">like</code> di Milvus, lihat <a href="/docs/id/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching">Menggunakan </a><code translate="no">LIKE</code><a href="/docs/id/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"> untuk Pencocokan Pola</a>.</p>
<h3 id="Range-query" class="common-anchor-header">Kueri rentang</h3><p>Di Elasticsearch, Anda dapat menemukan dokumen yang mengandung istilah dalam rentang yang disediakan sebagai berikut:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;range&quot;</span>: {
                    <span class="hljs-string">&quot;age&quot;</span>: {
                        <span class="hljs-string">&quot;gte&quot;</span>: <span class="hljs-number">10</span>,
                        <span class="hljs-string">&quot;lte&quot;</span>: <span class="hljs-number">20</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Di Milvus, Anda dapat menemukan entitas yang nilainya dalam bidang tertentu berada dalam rentang yang disediakan sebagai berikut:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;10 &lt;= age &lt;= 20&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat melihat contoh Elasticsearch di <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html">halaman ini</a>. Untuk rincian tentang operator perbandingan di Milvus, lihat <a href="/docs/id/basic-operators.md#Comparison-operators">Operator perbandingan</a>.</p>
<h3 id="Term-query" class="common-anchor-header">Kueri istilah</h3><p>Di Elasticsearch, Anda dapat menemukan dokumen yang mengandung istilah yang <strong>tepat</strong> di bidang yang disediakan sebagai berikut:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;status&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;retired&quot;</span>
                    }
                }            
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Di Milvus, Anda dapat menemukan entitas yang nilainya di bidang yang ditentukan sama persis dengan istilah yang ditentukan sebagai berikut:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use ==</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;status==&quot;retired&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(status, &quot;retired&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat menemukan contoh Elasticsearch di <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html">halaman ini</a>. Untuk detail tentang operator perbandingan di Milvus, lihat <a href="/docs/id/basic-operators.md#Comparison-operators">Operator perbandingan</a>.</p>
<h3 id="Terms-query" class="common-anchor-header">Kueri istilah</h3><p>Di Elasticsearch, Anda dapat menemukan dokumen yang mengandung satu atau lebih istilah yang <strong>tepat</strong> di bidang yang disediakan sebagai berikut:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;terms&quot;</span>: {
                    <span class="hljs-string">&quot;degree&quot;</span>: [
                        <span class="hljs-string">&quot;graduate&quot;</span>,
                        <span class="hljs-string">&quot;post-graduate&quot;</span>
                    ]
                }        
            }
        }
    }
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus tidak memiliki padanan yang lengkap untuk istilah ini. Namun, Anda dapat menemukan entitas yang nilainya di bidang yang ditentukan adalah salah satu istilah yang ditentukan sebagai berikut:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use in</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;degree in [&quot;graduate&quot;, &quot;post-graduate&quot;]&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(degree, &quot;graduate post-graduate&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat menemukan contoh Elasticsearch di <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html">halaman ini</a>. Untuk detail tentang operator rentang di Milvus, lihat <a href="/docs/id/basic-operators.md#Range-operators">Operator rentang</a>.</p>
<h3 id="Wildcard-query" class="common-anchor-header">Kueri wildcard</h3><p>Di Elasticsearch, Anda dapat menemukan dokumen yang berisi istilah yang cocok dengan pola wildcard sebagai berikut:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;wildcard&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki*y&quot;</span>
                    }
                }          
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus tidak mendukung wildcard dalam kondisi penyaringannya. Namun, Anda dapat menggunakan operator <code translate="no">like</code> untuk mendapatkan efek yang sama seperti berikut ini:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot; AND user like &quot;%y&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat menemukan contoh Elasticsearch di <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html">halaman ini</a>. Untuk rincian tentang operator rentang di Milvus, lihat <a href="/docs/id/basic-operators.md#Range-operators">Operator rentang</a>.</p>
<h2 id="Boolean-query" class="common-anchor-header">Kueri boolean<button data-href="#Boolean-query" class="anchor-icon" translate="no">
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
    </button></h2><p>Di Elasticsearch, kueri boolean adalah kueri yang mencocokkan dokumen yang cocok dengan kombinasi boolean dari kueri lain.</p>
<p>Contoh berikut ini diadaptasi dari contoh dalam dokumentasi Elasticsearch di <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html">halaman ini</a>. Kueri ini akan mengembalikan pengguna dengan <code translate="no">kimchy</code> dalam nama mereka dengan tag <code translate="no">production</code>.</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;kimchy&quot;</span>
                }
            },
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-string">&quot;production&quot;</span>
                }
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Di Milvus, Anda dapat melakukan hal yang sama seperti berikut:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = 

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;%kimchy%&quot; AND ARRAY_CONTAINS(tags, &quot;production&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Contoh di atas mengasumsikan bahwa Anda memiliki bidang <code translate="no">user</code> dengan tipe <strong>VarChar</strong> dan bidang <code translate="no">tags</code> dengan tipe <strong>Array</strong>, di dalam koleksi target. Kueri akan mengembalikan pengguna dengan <code translate="no">kimchy</code> dalam nama mereka dengan tag <code translate="no">production</code>.</p>
<h2 id="Vector-queries" class="common-anchor-header">Kueri vektor<button data-href="#Vector-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Di Elasticsearch, kueri vektor adalah kueri khusus yang bekerja pada bidang vektor untuk melakukan pencarian semantik secara efisien.</p>
<h3 id="Knn-query" class="common-anchor-header">Kueri Knn</h3><p>Elasticsearch mendukung kueri kNN perkiraan dan kueri kNN brute-force yang tepat. Anda dapat menemukan <em>k</em> vektor terdekat ke vektor kueri dengan salah satu dari kedua cara tersebut, yang diukur dengan metrik kemiripan, sebagai berikut:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    index=<span class="hljs-string">&quot;my-image-index&quot;</span>,
    size=<span class="hljs-number">3</span>,
    query={
        <span class="hljs-string">&quot;knn&quot;</span>: {
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;image-vector&quot;</span>,
            <span class="hljs-string">&quot;query_vector&quot;</span>: [
                -<span class="hljs-number">5</span>,
                <span class="hljs-number">9</span>,
                -<span class="hljs-number">12</span>
            ],
            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">10</span>
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus, sebagai basis data vektor khusus, menggunakan tipe indeks untuk mengoptimalkan pencarian vektor. Biasanya, Milvus memprioritaskan pencarian dengan metode nearest neighbor (ANN) untuk data vektor berdimensi tinggi. Meskipun pencarian brute-force kNN dengan tipe indeks FLAT memberikan hasil yang tepat, namun proses ini memakan waktu dan sumber daya yang intensif. Sebaliknya, pencarian ANN menggunakan AUTOINDEX atau jenis indeks lainnya menyeimbangkan kecepatan dan akurasi, menawarkan kinerja yang jauh lebih cepat dan lebih hemat sumber daya daripada kNN.</p>
<p>Kesetaraan yang serupa dengan kueri vektor di atas di Mlivus adalah sebagai berikut:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    anns_field=<span class="hljs-string">&quot;image-vector&quot;</span>
    data=[[-<span class="hljs-number">5</span>, <span class="hljs-number">9</span>, -<span class="hljs-number">12</span>]],
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat menemukan contoh Elasticsearch di <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-knn-query.html">halaman ini</a>. Untuk detail tentang pencarian ANN di Milvus, baca <a href="/docs/id/single-vector-search.md">Pencarian ANN Dasar</a>.</p>
<h3 id="Reciprocal-Rank-Fusion" class="common-anchor-header">Penggabungan Peringkat Timbal Balik</h3><p>Elasticsearch menyediakan Reciprocal Rank Fusion (RRF) untuk menggabungkan beberapa set hasil dengan indikator relevansi yang berbeda ke dalam satu set hasil berperingkat.</p>
<p>Contoh berikut ini menunjukkan penggabungan pencarian berbasis istilah tradisional dengan pencarian vektor k-nearest neighbors (kNN) untuk meningkatkan relevansi pencarian:</p>
<pre><code translate="no" class="language-python">client.search(
    index=<span class="hljs-string">&quot;my_index&quot;</span>,
    size=<span class="hljs-number">10</span>,
    query={
        <span class="hljs-string">&quot;retriever&quot;</span>: {
            <span class="hljs-string">&quot;rrf&quot;</span>: {
                <span class="hljs-string">&quot;retrievers&quot;</span>: [
                    {
                        <span class="hljs-string">&quot;standard&quot;</span>: {
                            <span class="hljs-string">&quot;query&quot;</span>: {
                                <span class="hljs-string">&quot;term&quot;</span>: {
                                    <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;shoes&quot;</span>
                                }
                            }
                        }
                    },
                    {
                        <span class="hljs-string">&quot;knn&quot;</span>: {
                            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
                            <span class="hljs-string">&quot;query_vector&quot;</span>: [<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>],  <span class="hljs-comment"># Example vector; replace with your actual query vector</span>
                            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">50</span>,
                            <span class="hljs-string">&quot;num_candidates&quot;</span>: <span class="hljs-number">100</span>
                        }
                    }
                ],
                <span class="hljs-string">&quot;rank_window_size&quot;</span>: <span class="hljs-number">50</span>,
                <span class="hljs-string">&quot;rank_constant&quot;</span>: <span class="hljs-number">20</span>
            }
        }
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, RRF menggabungkan hasil dari dua temu kembali:</p>
<ul>
<li><p>Pencarian berbasis istilah standar untuk dokumen yang mengandung istilah <code translate="no">&quot;shoes&quot;</code> di bidang <code translate="no">text</code>.</p></li>
<li><p>Pencarian kNN pada bidang <code translate="no">vector</code> menggunakan vektor kueri yang disediakan.</p></li>
</ul>
<p>Setiap retriever menyumbangkan hingga 50 kecocokan teratas, yang diperingkat ulang oleh RRF, dan 10 hasil teratas akhir dikembalikan.</p>
<p>Di Milvus, Anda dapat mencapai pencarian hibrida yang serupa dengan menggabungkan pencarian di beberapa bidang vektor, menerapkan strategi pemeringkatan ulang, dan mengambil hasil K teratas dari daftar gabungan. Milvus mendukung strategi RRF dan strategi perangkingan ulang berbobot. Untuk lebih jelasnya, lihat <a href="/docs/id/weighted-ranker.md">Perangkingan Ulang</a>.</p>
<p>Berikut ini adalah ekuivalensi tidak ketat dari contoh Elasticsearch di atas di Milvus.</p>
<pre><code translate="no" class="language-python">search_params_dense = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}, 
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">100</span>
}

req_dense = ANNSearchRequest(**search_params_dense)

search_params_sparse = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&quot;shoes&quot;</span>],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}
    }
}

req_sparse = ANNSearchRequest(**search_params_sparse)

res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=[req_dense, req_sparse],
    reranker=RRFRanker(),
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Contoh ini mendemonstrasikan pencarian hibrida di Milvus yang menggabungkan:</p>
<ol>
<li><p><strong>Pencarian vektor padat</strong>: Menggunakan metrik inner product (IP) dengan <code translate="no">nprobe</code> yang disetel ke 10 untuk pencarian perkiraan tetangga terdekat (ANN) pada bidang <code translate="no">vector</code>.</p></li>
<li><p><strong>Pencarian vektor jarang</strong>: Menggunakan metrik kemiripan BM25 dengan parameter <code translate="no">drop_ratio_search</code> sebesar 0,2 pada bidang <code translate="no">text_sparse</code>.</p></li>
</ol>
<p>Hasil dari pencarian ini dieksekusi secara terpisah, digabungkan, dan diberi peringkat ulang menggunakan pemeringkat Reciprocal Rank Fusion (RRF). Pencarian gabungan mengembalikan 10 entitas teratas dari daftar peringkat ulang.</p>
<p>Tidak seperti peringkat RRF Elasticsearch, yang menggabungkan hasil dari kueri berbasis teks standar dan pencarian kNN, Milvus menggabungkan hasil dari pencarian vektor yang jarang dan padat, memberikan kemampuan pencarian hibrida unik yang dioptimalkan untuk data multimodal.</p>
<h2 id="Recap" class="common-anchor-header">Rangkuman<button data-href="#Recap" class="anchor-icon" translate="no">
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
    </button></h2><p>Dalam artikel ini, kami membahas konversi kueri Elasticsearch yang umum ke kueri Milvus, termasuk kueri tingkat istilah, kueri boolean, kueri teks lengkap, dan kueri vektor. Jika Anda memiliki pertanyaan lebih lanjut tentang mengonversi kueri Elasticsearch lainnya, jangan ragu untuk menghubungi kami.</p>
