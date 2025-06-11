---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  Indeks SPARSE_INVERTED_INDEX adalah jenis indeks yang digunakan oleh Milvus
  untuk menyimpan dan mencari vektor yang jarang secara efisien. Jenis indeks
  ini memanfaatkan prinsip-prinsip pengindeksan terbalik untuk membuat struktur
  pencarian yang sangat efisien untuk data yang jarang. Untuk informasi lebih
  lanjut, lihat INVERTED.
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>Indeks <code translate="no">SPARSE_INVERTED_INDEX</code> adalah jenis indeks yang digunakan oleh Milvus untuk menyimpan dan mencari vektor yang jarang secara efisien. Jenis indeks ini memanfaatkan prinsip-prinsip pengindeksan terbalik untuk membuat struktur pencarian yang sangat efisien untuk data yang jarang. Untuk informasi lebih lanjut, lihat <a href="/docs/id/inverted.md">INVERTED</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Membangun indeks<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk membangun indeks <code translate="no">SPARSE_INVERTED_INDEX</code> pada bidang vektor yang jarang di Milvus, gunakan metode <code translate="no">add_index()</code>, tentukan <code translate="no">index_type</code>, <code translate="no">metric_type</code>, dan parameter tambahan untuk indeks.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_sparse_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># Algorithm used for building and querying the index</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">index_type</code>: Jenis indeks yang akan dibangun. Dalam contoh ini, tetapkan nilainya ke <code translate="no">SPARSE_INVERTED_INDEX</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Metrik yang digunakan untuk menghitung kemiripan antara vektor jarang. Nilai yang valid:</p>
<ul>
<li><p><code translate="no">IP</code> (Inner Product): Mengukur kemiripan menggunakan produk titik.</p></li>
<li><p><code translate="no">BM25</code>: Biasanya digunakan untuk pencarian teks lengkap, dengan fokus pada kemiripan tekstual.</p>
<p>Untuk detail lebih lanjut, lihat <a href="/docs/id/metric.md">Jenis Metrik</a> dan <a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a>.</p></li>
</ul></li>
<li><p><code translate="no">params.inverted_index_algo</code>: Algoritme yang digunakan untuk membangun dan menanyakan indeks. Nilai yang valid:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code> (default): Pemrosesan kueri Dokumen per Dokumen (DAAT) yang dioptimalkan menggunakan algoritme MaxScore. MaxScore memberikan kinerja yang lebih baik untuk nilai <em>k</em> yang tinggi atau kueri dengan banyak istilah dengan melewatkan istilah dan dokumen yang kemungkinan besar memiliki dampak minimal. Hal ini dicapai dengan mempartisi istilah ke dalam kelompok penting dan tidak penting berdasarkan nilai dampak maksimumnya, dengan fokus pada istilah yang dapat berkontribusi pada hasil k teratas.</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Pemrosesan kueri DAAT yang dioptimalkan menggunakan algoritme WAND. WAND mengevaluasi lebih sedikit dokumen yang terkena dampak dengan memanfaatkan nilai dampak maksimum untuk melewatkan dokumen yang tidak kompetitif, tetapi memiliki overhead per hit yang lebih tinggi. Hal ini membuat WAND lebih efisien untuk kueri dengan nilai <em>k</em> kecil atau kueri pendek, di mana melewatkan lebih memungkinkan.</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Pemrosesan kueri dasar Term-at-a-Time (TAAT). Meskipun lebih lambat dibandingkan dengan <code translate="no">DAAT_MAXSCORE</code> dan <code translate="no">DAAT_WAND</code>, <code translate="no">TAAT_NAIVE</code> menawarkan keuntungan yang unik. Tidak seperti algoritme DAAT, yang menggunakan skor dampak maksimum yang di-cache yang tetap statis terlepas dari perubahan pada parameter koleksi global (avgdl), <code translate="no">TAAT_NAIVE</code> secara dinamis beradaptasi dengan perubahan tersebut.</p></li>
</ul>
<p>Untuk mempelajari lebih lanjut parameter pembuatan yang tersedia untuk indeks <code translate="no">SPARSE_INVERTED_INDEX</code>, lihat Parameter <a href="/docs/id/sparse-inverted-index.md#Index-building-params">pembuatan indeks</a>.</p></li>
</ul>
<p>Setelah parameter indeks dikonfigurasi, Anda dapat membuat indeks dengan menggunakan metode <code translate="no">create_index()</code> secara langsung atau mengoper parameter indeks dalam metode <code translate="no">create_collection</code>. Untuk detailnya, lihat <a href="/docs/id/create-collection.md">Membuat Koleksi</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Mencari di indeks<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah indeks dibuat dan entitas dimasukkan, Anda dapat melakukan pencarian kemiripan pada indeks.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare search parameters</span>
search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># Additional optional search parameters</span>
}

<span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=query_vector,  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi ini:</p>
<ul>
<li><p><code translate="no">params</code>: Opsi konfigurasi tambahan untuk pencarian pada indeks.</p>
<ul>
<li><code translate="no">drop_ratio_search</code>: Menyempurnakan kinerja pencarian dengan menentukan proporsi nilai vektor kecil yang akan diabaikan selama proses pencarian. Misalnya, dengan <code translate="no">{&quot;drop_ratio_search&quot;: 0.2}</code>, 20% nilai terkecil dalam vektor kueri akan diabaikan selama pencarian.</li>
</ul>
<p>Untuk mempelajari lebih lanjut parameter pencarian yang tersedia untuk indeks <code translate="no">SPARSE_INVERTED_INDEX</code>, lihat Parameter <a href="/docs/id/ivf-flat.md#share-KDWodFEx6oCm2yxgEUAcXaUDnwg">pencarian khusus indeks</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Parameter indeks<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini memberikan gambaran umum tentang parameter yang digunakan untuk membangun indeks dan melakukan pencarian pada indeks.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembangunan indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="/docs/id/sparse-inverted-index.md#Build-index">membangun indeks.</a></p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>Algoritme yang digunakan untuk membangun dan melakukan kueri indeks. Ini menentukan bagaimana indeks memproses kueri.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code> (default), <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code></p></td>
     <td><p>Gunakan <code translate="no">"DAAT_MAXSCORE"</code> untuk skenario dengan nilai k yang tinggi atau kueri dengan banyak istilah, yang dapat mengambil manfaat dari melewatkan dokumen yang tidak kompetitif. 
 Pilih <code translate="no">"DAAT_WAND"</code> untuk kueri dengan nilai k kecil atau kueri pendek untuk memanfaatkan pelompatan yang lebih efisien.</p>
<p>Gunakan <code translate="no">"TAAT_NAIVE"</code> jika penyesuaian dinamis terhadap perubahan koleksi (misalnya, avgdl) diperlukan.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parameter pencarian khusus indeks</h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> ketika melakukan <a href="/docs/id/sparse-inverted-index.md#Search-on-index">pencarian di indeks</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyetelan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>Proporsi nilai terkecil yang akan diabaikan selama pencarian, untuk membantu mengurangi noise.</p></td>
     <td><p>Fraksi antara 0,0 dan 1,0 (misalnya, 0,2 mengabaikan 20% nilai terkecil)</p></td>
     <td><p>Setel parameter ini berdasarkan tingkat sparsitas dan derau vektor kueri Anda. Misalnya, mengaturnya ke 0,2 dapat membantu fokus pada nilai yang lebih signifikan selama pencarian, yang berpotensi meningkatkan akurasi.</p></td>
   </tr>
</table>
