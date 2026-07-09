---
id: basic-vector-search-with-structarray.md
title: Pencarian Vektor Dasar dengan StructArray
summary: >-
  Gunakan halaman ini untuk melakukan pencarian vektor pada subbidang vektor di
  dalam bidang StructArray. StructArray mendukung dua mode pencarian vektor
  dasar: pencarian EmbeddingList, yang menilai daftar embedding yang disimpan
  dalam setiap entitas, dan pencarian tingkat elemen, yang mencari setiap elemen
  Struct secara terpisah.
---
<h1 id="Basic-Vector-Search-with-StructArray" class="common-anchor-header">Pencarian Vektor Dasar dengan StructArray<button data-href="#Basic-Vector-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Gunakan halaman ini untuk menjalankan pencarian vektor pada subbidang vektor di dalam bidang StructArray. StructArray mendukung dua mode pencarian vektor dasar: pencarian EmbeddingList, yang menilai daftar embedding yang disimpan di setiap entitas, dan pencarian tingkat elemen, yang mencari setiap elemen Struct secara terpisah.</p>
<p>Halaman ini menggunakan koleksi " <code translate="no">tech_articles</code> " dari <a href="/docs/id/create-structarray-field.md">"Create a StructArray Field</a>". Koleksi tersebut memiliki bidang StructArray bernama " <code translate="no">chunks</code>". Setiap chunk berisi teks, metadata skalar, subbidang vektor bernama " <code translate="no">emb_list_vector</code> " dengan indeks untuk pencarian EmbeddingList, dan subbidang vektor bernama " <code translate="no">emb</code> " dengan indeks untuk pencarian tingkat elemen.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Sebelum Anda memulai<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Pastikan skema koleksi, data, dan indeks sudah disiapkan.</p>
<table>
<thead>
<tr><th>Persyaratan</th><th>Di mana mempersiapkannya</th></tr>
</thead>
<tbody>
<tr><td>Buat bidang StructArray, seperti <code translate="no">chunks</code>.</td><td><a href="/docs/id/create-structarray-field.md">Buat bidang StructArray</a></td></tr>
<tr><td>Sisipkan entitas yang bidang ` <code translate="no">chunks</code> `-nya berisi objek Struct.</td><td><a href="/docs/id/insert-data-into-structarray-fields.md">Masukkan Data ke dalam Bidang StructArray</a></td></tr>
<tr><td>Buat indeks ` <code translate="no">MAX_SIM*</code> ` pada ` <code translate="no">chunks[emb_list_vector]</code> ` untuk pencarian `EmbeddingList`.</td><td><a href="/docs/id/index-structarray-fields.md">Indeks Bidang StructArray</a></td></tr>
<tr><td>Buat indeks vektor-metrik biasa pada <code translate="no">chunks[emb]</code> untuk pencarian tingkat elemen.</td><td><a href="/docs/id/index-structarray-fields.md">Indeks Bidang StructArray</a></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Peringatan</p>
<p>Sebuah bidang vektor atau subbidang vektor hanya dapat memiliki satu indeks. Jika Anda memerlukan pencarian EmbeddingList dan pencarian tingkat elemen, buatlah dua subbidang vektor terpisah. Pada halaman ini, <code translate="no">chunks[emb_list_vector]</code> diindeks untuk pencarian EmbeddingList, dan <code translate="no">chunks[emb]</code> diindeks untuk pencarian tingkat elemen.</p>
</div>
<h2 id="Choose-a-search-mode" class="common-anchor-header">Pilih mode pencarian<button data-href="#Choose-a-search-mode" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Aspek</th><th>Pencarian EmbeddingList</th><th>Pencarian tingkat elemen</th></tr>
</thead>
<tbody>
<tr><td>Subbidang target</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Data kueri</td><td>Daftar embedding yang berisi satu atau lebih vektor.</td><td>Vektor biasa.</td></tr>
<tr><td>Keluarga metrik</td><td><code translate="no">MAX_SIM*</code>, seperti <code translate="no">MAX_SIM_COSINE</code>.</td><td>Metrik vektor reguler, seperti <code translate="no">COSINE</code>, <code translate="no">IP</code>, atau <code translate="no">L2</code>.</td></tr>
<tr><td>Apa yang diwakili oleh satu hasil pencocokan</td><td>Entitas yang cocok yang subbidang vektor StructArray-nya mirip dengan daftar embedding kueri.</td><td>Elemen Struct yang cocok di dalam bidang StructArray.</td></tr>
<tr><td>Tingkat granularitas hasil</td><td>Tingkat entitas.</td><td>Tingkat elemen Struct.</td></tr>
<tr><td>Offset</td><td>Tidak berlaku.</td><td>Mengidentifikasi posisi berbasis nol dari elemen Struct yang cocok saat dikembalikan.</td></tr>
<tr><td>Penggunaan umum</td><td>ColBERT, ColPali, dan pola pengambilan data interaksi akhir lainnya.</td><td>Pencarian tingkat chunk, tingkat bagian teks, tingkat klip, tingkat patch, atau tingkat fakta.</td></tr>
</tbody>
</table>
<h2 id="Run-EmbeddingList-search" class="common-anchor-header">Jalankan pencarian EmbeddingList<button data-href="#Run-EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan pencarian EmbeddingList jika kueri itu sendiri berisi beberapa vektor dan subbidang vektor StructArray target diindeks dengan metrik " <code translate="no">MAX_SIM*</code> ". Hasilnya adalah kecocokan tingkat entitas.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;id&quot;</span>], hit[<span class="hljs-string">&quot;distance&quot;</span>], hit[<span class="hljs-string">&quot;entity&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>Dalam mode pencarian ini, <code translate="no">limit</code> mengontrol berapa banyak entitas yang dikembalikan untuk setiap kueri. Output dapat mencakup subbidang StructArray, tetapi hasil pencocokan itu sendiri mewakili entitas induk yang cocok, bukan satu elemen Struct tertentu.</p>
<div class="alert note">
<p>Untuk panduan lengkap bergaya ColBERT atau ColPali, lihat <a href="/docs/id/search-with-embedding-lists.md">Pencarian dengan Daftar Embedding</a>. Halaman ini hanya membahas perilaku pencarian StructArray dasar.</p>
</div>
<h2 id="Run-element-level-search" class="common-anchor-header">Jalankan pencarian tingkat elemen<button data-href="#Run-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan pencarian tingkat elemen jika setiap elemen Struct harus berpartisipasi dalam pencarian vektor secara independen. Kueri berupa vektor biasa, dan subbidang vektor target harus diindeks dengan metrik vektor biasa.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<p>Dalam pencarian tingkat elemen, setiap hasil pencocokan mewakili elemen Struct yang cocok. Nilai " <code translate="no">offset</code> " adalah posisi berbasis nol dari elemen tersebut di bidang StructArray. Entitas yang sama dapat muncul lebih dari sekali jika lebih dari satu elemen Struct cocok dengan kueri. Nilai " <code translate="no">limit</code> " berlaku untuk hasil pencocokan elemen, bukan entitas induk yang unik.</p>
<h2 id="Interpret-results" class="common-anchor-header">Menafsirkan hasil<button data-href="#Interpret-results" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Item hasil</th><th>Pencarian EmbeddingList</th><th>Pencarian tingkat elemen</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Kunci utama entitas yang cocok.</td><td>Kunci utama entitas yang berisi elemen Struct yang cocok.</td></tr>
<tr><td><code translate="no">distance</code> atau skor</td><td>Skor atau jarak antara daftar embedding kueri dan daftar embedding yang tersimpan.</td><td>Skor atau jarak antara vektor kueri dan vektor elemen Struct yang cocok.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Tidak berlaku.</td><td>Posisi berbasis nol dari elemen Struct yang cocok saat dikembalikan.</td></tr>
<tr><td>Kunci utama yang berulang</td><td>Tidak diharapkan untuk satu kueri karena hasilnya berada di tingkat entitas.</td><td>Mungkin terjadi, karena beberapa elemen Struct dalam entitas yang sama dapat cocok.</td></tr>
<tr><td>Bidang keluaran StructArray yang diminta</td><td>Dikembalikan dari entitas yang cocok.</td><td>Dikembalikan dengan bentuk hasil pencocokan tingkat elemen yang didukung oleh API dan SDK target.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">Kesalahan umum<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Menggunak <code translate="no">chunks.emb</code> alih-alih sintaks jalur subbidang yang diperlukan <code translate="no">chunks[emb]</code>.</p></li>
<li><p>Menggunakan kueri EmbeddingList terhadap subbidang vektor yang diindeks dengan metrik vektor biasa.</p></li>
<li><p>Menggunakan kueri vektor biasa terhadap subbidang vektor yang diindeks dengan metrik <code translate="no">MAX_SIM*</code>.</p></li>
<li><p>Mengharapkan pencarian tingkat elemen <code translate="no">limit</code> mengembalikan sejumlah entitas induk yang unik. Pencarian ini mengembalikan hasil elemen.</p></li>
<li><p>Mengharapkan pencarian EmbeddingList mengembalikan satu offset elemen tertentu. Hasilnya adalah kecocokan tingkat entitas.</p></li>
<li><p>Menggunakan kembali satu subbidang vektor untuk kedua mode pencarian. Gunakan subbidang vektor terpisah karena setiap subbidang vektor hanya menerima satu indeks.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Langkah selanjutnya<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Untuk membatasi pencarian tingkat elemen berdasarkan kondisi skalar, baca <a href="/docs/id/filtered-search-with-structarray.md">Pencarian Terfilter dengan StructArray</a>.</p></li>
<li><p>Untuk melakukan pencarian berdasarkan batas skor atau jarak, baca <a href="/docs/id/range-search-with-structarray.md">Pencarian Rentang dengan StructArray</a>.</p></li>
<li><p>Untuk mengembalikan paling banyak satu hasil per entitas induk setelah pencarian tingkat elemen, baca <a href="/docs/id/grouping-search-with-structarray.md">Pencarian Pengelompokan dengan StructArray</a>.</p></li>
<li><p>Untuk menggabungkan pencarian StructArray dengan pencarian vektor lainnya, baca <a href="/docs/id/hybrid-search-with-structarray.md">Pencarian Hibrida dengan StructArray</a>.</p></li>
<li><p>Untuk meninjau tipe data, metrik, filter, dan batasan khusus versi yang didukung, baca <a href="/docs/id/structarray-limits.md">Batasan StructArray</a>.</p></li>
</ol>
