---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  Indeks SPARSE_INVERTED_INDEX adalah jenis indeks yang digunakan oleh Milvus
  untuk menyimpan dan mencari vektor spars secara efisien. Jenis indeks ini
  memanfaatkan prinsip-prinsip pengindeksan terbalik untuk menciptakan struktur
  pencarian yang sangat efisien bagi data spars.
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
    </button></h1><p>Indeks <code translate="no">SPARSE_INVERTED_INDEX</code> adalah jenis indeks yang digunakan oleh Milvus untuk menyimpan dan mencari vektor spars secara efisien. Indeks ini membangun struktur terbalik berdasarkan dimensi yang tidak nol dalam vektor spars. Anda dapat menggunakan indeks ini untuk pencarian teks lengkap BM25 dan untuk pencarian embedding spars berdasarkan hasil kali dalam.</p>
<p>Untuk informasi lebih lanjut mengenai bidang vektor spars, jenis metrik, dan pencarian teks lengkap, lihat <a href="/docs/id/sparse_vector.md">Vektor Spars</a>, <a href="/docs/id/metric.md">Jenis Metrik</a>, dan <a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Membuat indeks<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk membuat indeks " <code translate="no">SPARSE_INVERTED_INDEX</code> " pada bidang vektor langka di Milvus, gunakan metode ` <code translate="no">add_index()</code> ` dan tentukan parameter ` <code translate="no">index_type</code>`, ` <code translate="no">metric_type</code>`, serta parameter indeks.</p>
<p>Untuk pencarian teks lengkap BM25, buat indeks pada bidang vektor langka yang dihasilkan oleh fungsi BM25. Tetapkan ` <code translate="no">metric_type</code> ` ke ` <code translate="no">BM25</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_bm25_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-comment"># Metric type used for full text search</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk pencarian embedding spars, buat indeks pada bidang vektor spars yang menyimpan vektor spars yang dihasilkan secara eksternal. Tetapkan ` <code translate="no">metric_type</code> ` ke ` <code translate="no">IP</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_ip_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;SINDI&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam konfigurasi di atas:</p>
<ul>
<li><p><code translate="no">index_type</code>: Jenis indeks yang akan dibuat. Atur nilai ini ke <code translate="no">SPARSE_INVERTED_INDEX</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Metrik yang digunakan untuk menghitung kemiripan antar vektor spars. Nilai yang valid:</p>
<ul>
<li><p><code translate="no">BM25</code>: Menggunakan penilaian relevansi BM25 untuk pencarian teks lengkap.</p></li>
<li><p><code translate="no">IP</code> (Inner Product): Mengukur kemiripan vektor langka menggunakan hasil kali titik.</p></li>
</ul>
<p>Untuk detailnya, lihat <a href="/docs/id/metric.md">Jenis Metrik</a> dan <a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a>.</p></li>
<li><p><code translate="no">params.inverted_index_algo</code>: Algoritma yang digunakan untuk membangun dan melakukan kueri pada indeks. Nilai yang valid:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code>: Pemrosesan kueri Document-at-a-Time MaxScore. Ini adalah pengaturan default untuk <code translate="no">BM25</code>. Untuk informasi latar belakang, lihat <a href="https://dl.acm.org/doi/10.1016/0306-4573%2895%2900020-H">Evaluasi Kueri: Strategi dan Optimasi</a>.</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Pemrosesan kueri WAND (Document-at-a-Time). Algoritma ini cocok untuk nilai topK yang lebih kecil atau kueri yang lebih pendek. Untuk informasi latar belakang, lihat <a href="https://dl.acm.org/doi/10.1145/956863.956944">Evaluasi Kueri yang Efisien menggunakan Proses Pencarian Dua Tingkat</a>.</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Pemrosesan kueri Basic Term-at-a-Time. Gunakan opsi ini sebagai patokan atau saat Anda memerlukan penilaian skor yang beradaptasi secara dinamis terhadap statistik koleksi global, seperti panjang dokumen rata-rata.</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_MAXSCORE&quot;</code>: Pemrosesan kueri MaxScore dengan metadata skor maksimum tingkat blok. Untuk informasi latar belakang, lihat " <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">Pencarian Dokumen Top-k yang Lebih Cepat Menggunakan Indeks Block-Max</a>".</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_WAND&quot;</code>: Pemrosesan kueri WAND dengan metadata skor maksimum tingkat blok. Untuk informasi latar belakang, lihat " <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">Pencarian Dokumen Top-k yang Lebih Cepat Menggunakan Indeks Block-Max</a>".</p></li>
<li><p><code translate="no">&quot;SINDI&quot;</code>: Indeks terbalik yang jarang (sparse) berdasarkan jendela ID dokumen tetap, dengan akselerasi SIMD untuk pencarian. Ini adalah pengaturan default untuk <code translate="no">IP</code>. Untuk detailnya, lihat <a href="https://arxiv.org/abs/2509.08395">makalah SINDI</a>.</p></li>
</ul>
<p>Jika Anda tidak menentukan ` <code translate="no">inverted_index_algo</code>`, Milvus akan memilih algoritma default berdasarkan <code translate="no">metric_type</code>: ` <code translate="no">DAAT_MAXSCORE</code> ` untuk ` <code translate="no">BM25</code>`, dan ` <code translate="no">SINDI</code> ` untuk ` <code translate="no">IP</code>`.</p>
<p>Untuk mempelajari lebih lanjut mengenai parameter pembuatan indeks yang tersedia untuk indeks <code translate="no">SPARSE_INVERTED_INDEX</code>, lihat <a href="/docs/id/sparse-inverted-index.md#Index-building-params">Parameter Pembuatan Indeks</a>.</p></li>
</ul>
<p>Setelah parameter indeks dikonfigurasi, Anda dapat membuat indeks dengan menggunakan metode ` <code translate="no">create_index()</code> ` secara langsung atau dengan meneruskan parameter indeks ke metode ` <code translate="no">create_collection</code> `. Untuk detailnya, lihat <a href="/docs/id/create-collection.md">Buat Koleksi</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Pencarian pada indeks<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah indeks dibangun dan entitas dimasukkan, Anda dapat melakukan pencarian kesamaan pada indeks tersebut.</p>
<p>Untuk pencarian teks lengkap BM25, gunakan teks mentah sebagai kueri. Milvus mengubah teks kueri menjadi vektor spars melalui fungsi BM25.</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[<span class="hljs-string">&quot;what is information retrieval?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk pencarian embedding spars, gunakan kamus vektor spars sebagai vektor kueri.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    data=query_vector,
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>Secara default, Milvus menggunakan algoritma pencarian yang dikonfigurasi untuk indeks tersebut.</p>
<p>Untuk mempelajari lebih lanjut tentang parameter pencarian yang tersedia untuk indeks <code translate="no">SPARSE_INVERTED_INDEX</code>, lihat <a href="/docs/id/sparse-inverted-index.md#Index-specific-search-params">Parameter pencarian khusus indeks</a>.</p>
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
    </button></h2><p>Bagian ini memberikan gambaran umum tentang parameter yang digunakan untuk membuat indeks dan melakukan pencarian pada indeks tersebut.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter pembuatan indeks<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">params</code> saat <a href="/docs/id/sparse-inverted-index.md#Build-index">membuat indeks</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyesuaian</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>Algoritma yang digunakan untuk membuat dan melakukan kueri pada indeks. Algoritma ini menentukan cara indeks memproses kueri.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code>, <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code>, <code translate="no">"BLOCK_MAX_MAXSCORE"</code>, <code translate="no">"BLOCK_MAX_WAND"</code>, <code translate="no">"SINDI"</code></p><p>Nilai default: <code translate="no">"DAAT_MAXSCORE"</code> untuk <code translate="no">BM25</code>; <code translate="no">"SINDI"</code> untuk <code translate="no">IP</code>.</p></td>
     <td><p>Gunakan <code translate="no">"DAAT_MAXSCORE"</code> untuk beban kerja pencarian teks lengkap BM25 dengan nilai k tinggi atau kueri dengan banyak istilah.</p><p>Gunakan <code translate="no">"DAAT_WAND"</code> untuk beban kerja BM25 dengan nilai k kecil atau kueri pendek.</p><p>Gunakan <code translate="no">"TAAT_NAIVE"</code> sebagai patokan, atau saat Anda memerlukan penilaian yang beradaptasi secara dinamis terhadap statistik koleksi global seperti panjang dokumen rata-rata.</p><p>Gunakan <code translate="no">"BLOCK_MAX_MAXSCORE"</code> atau <code translate="no">"BLOCK_MAX_WAND"</code> untuk menggunakan metadata skor maksimum tingkat blok guna pemangkasan kueri.</p><p>Gunakan ` <code translate="no">"SINDI"</code> ` untuk pencarian embedding yang jarang dengan ` <code translate="no">IP</code>`.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_k1</code></p></td>
     <td><p>Mengontrol saturasi frekuensi istilah untuk penilaian BM25. Parameter ini hanya berlaku jika <code translate="no">metric_type</code> adalah <code translate="no">BM25</code>.</p></td>
     <td><p>Rentang yang disarankan: [1,2; 2,0]</p><p>Nilai default: 1,2</p></td>
     <td><p>Tingkatkan nilai ini untuk memberikan bobot yang lebih besar pada frekuensi istilah dalam peringkat dokumen.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_b</code></p></td>
     <td><p>Mengontrol kekuatan normalisasi panjang dokumen untuk penilaian BM25. Parameter ini hanya berlaku jika <code translate="no">metric_type</code> adalah <code translate="no">BM25</code>.</p></td>
     <td><p>Rentang: [0, 1]</p><p>Nilai default: 0,75</p></td>
     <td><p>Gunakan nilai yang lebih tinggi untuk menerapkan normalisasi panjang yang lebih kuat. Gunakan nilai yang lebih rendah untuk mengurangi pengaruh panjang dokumen terhadap peringkat.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parameter pencarian khusus indeks<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Tabel berikut mencantumkan parameter yang dapat dikonfigurasi di <code translate="no">search_params.params</code> saat <a href="/docs/id/sparse-inverted-index.md#Search-on-index">melakukan pencarian pada indeks</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Rentang Nilai</p></th>
     <th><p>Saran Penyesuaian</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>Proporsi nilai terkecil yang akan diabaikan selama pencarian, yang membantu mengurangi gangguan.</p></td>
     <td><p>Rentang: [0,0; 1,0) (misalnya, 0,2 akan mengabaikan 20% nilai terkecil)</p></td>
     <td><p>Sesuaikan parameter ini berdasarkan tingkat sparsitas dan tingkat noise dari vektor kueri Anda.</p><p>Parameter ini mengontrol proporsi nilai dengan magnitudo rendah yang diabaikan selama pencarian. Meningkatkan nilai ini (misalnya, menjadi <code translate="no">0.2</code>) dapat mengurangi noise dan memfokuskan pencarian pada komponen yang lebih signifikan, yang mungkin meningkatkan presisi dan efisiensi. Namun, mengabaikan lebih banyak nilai juga dapat mengurangi recall dengan mengesampingkan sinyal yang berpotensi relevan. Pilih nilai yang menyeimbangkan recall dan akurasi untuk beban kerja Anda.</p></td>
   </tr>
</table>
