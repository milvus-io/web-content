---
id: grouping-search-with-structarray.md
title: Pengelompokan Hasil Pencarian dengan StructArray
summary: >-
  Gunakan halaman ini untuk mengelompokkan hasil pencarian tingkat elemen
  StructArray berdasarkan entitas induknya. Pencarian tingkat elemen dapat
  menghasilkan beberapa hasil dari entitas yang sama jika beberapa elemen Struct
  cocok dengan kueri. Pengelompokan ini menggabungkan hasil-hasil elemen
  tersebut sehingga setiap entitas induk muncul paling banyak sekali.
---
<h1 id="Grouping-Search-with-StructArray" class="common-anchor-header">Pengelompokan Hasil Pencarian dengan StructArray<button data-href="#Grouping-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Gunakan halaman ini untuk mengelompokkan hasil pencarian tingkat elemen StructArray berdasarkan entitas induknya. Pencarian tingkat elemen dapat menghasilkan beberapa hasil dari entitas yang sama jika beberapa elemen Struct cocok dengan kueri. Pengelompokan ini menggabungkan hasil-hasil elemen tersebut sehingga setiap entitas induk muncul paling banyak satu kali.</p>
<p>Halaman ini menggunakan koleksi <code translate="no">tech_articles</code> dari <a href="/docs/id/create-structarray-field.md">Buat Bidang StructArray</a>. Koleksi tersebut memiliki bidang StructArray bernama <code translate="no">chunks</code>. Subbidang vektor <code translate="no">chunks[emb]</code> diindeks untuk pencarian tingkat elemen dengan metrik vektor reguler.</p>
<h2 id="How-grouping-applies-to-StructArray" class="common-anchor-header">Bagaimana pengelompokan diterapkan pada StructArray<button data-href="#How-grouping-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>Mode pencarian</th><th>Perilaku pengelompokan</th><th>Perilaku hasil</th></tr>
</thead>
<tbody>
<tr><td>Pencarian EmbeddingList</td><td>Tidak didukung.</td><td>Tidak berlaku.</td></tr>
<tr><td>Pencarian tingkat elemen</td><td>Didukung dengan pengelompokan berdasarkan kunci utama.</td><td>Mengembalikan paling banyak satu hasil per entitas induk. Metadata tingkat elemen dipertahankan, sehingga indeks atau offset elemen yang dipilih dapat dikembalikan saat diekspos oleh API atau SDK.</td></tr>
<tr><td>Pencarian hibrida</td><td>Didukung hanya jika semua sub-pencarian menargetkan bidang vektor tingkat elemen di bawah bidang StructArray yang sama.</td><td>Pencarian sub-tingkat elemen dikelompokkan berdasarkan kunci utama sebelum penanganan hasil akhir.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Gunakan pengelompokan jika pencarian tingkat elemen tanpa pengelompokan mengembalikan terlalu banyak entitas induk yang duplikat. Jika Anda ingin setiap elemen Struct yang cocok ditampilkan sebagai hasil terpisah, gunakan <a href="/docs/id/basic-vector-search-with-structarray.md">Pencarian Vektor Dasar dengan StructArray</a> tanpa opsi ` <code translate="no">group_by_field</code>`.</p>
</div>
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
    </button></h2><p>Siapkan koleksi, data, dan indeks sebelum menjalankan pencarian pengelompokan.</p>
<table>
<thead>
<tr><th>Persyaratan</th><th>Rincian</th></tr>
</thead>
<tbody>
<tr><td>Subbidang vektor tingkat elemen</td><td>Gunakan subbidang vektor StructArray seperti <code translate="no">chunks[emb]</code>, yang diindeks dengan metrik vektor biasa.</td></tr>
<tr><td>Kueri vektor biasa</td><td>Gunakan vektor kueri biasa, bukan <code translate="no">EmbeddingList</code>.</td></tr>
<tr><td>Pengelompokan berdasarkan kunci utama</td><td>Gunakan kunci utama koleksi sebagai <code translate="no">group_by_field</code>, seperti <code translate="no">doc_id</code>.</td></tr>
<tr><td>Tanpa parameter rentang</td><td>Jangan menggabungkan pencarian pengelompokan dengan parameter pencarian rentang seperti <code translate="no">radius</code> atau <code translate="no">range_filter</code>.</td></tr>
</tbody>
</table>
<p>Untuk pengaturan indeks, lihat <a href="/docs/id/index-structarray-fields.md">Bidang StructArray Indeks</a>.</p>
<h2 id="Run-grouped-element-level-search" class="common-anchor-header">Jalankan pencarian tingkat elemen yang dikelompokkan<button data-href="#Run-grouped-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut ini terlebih dahulu mencari potongan-potongan individual, kemudian mengelompokkan hasil elemen berdasarkan kunci utama entitas induk.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>Tanpa pengelompokan, <code translate="no">doc_id</code> yang sama dapat muncul beberapa kali jika beberapa chunk cocok dengan kueri. Dengan <code translate="no">group_by_field=&quot;doc_id&quot;</code>, setiap entitas induk muncul paling banyak sekali. Pengelompokan mempertahankan metadata tingkat elemen, sehingga hasil yang dikelompokkan masih dapat menyertakan indeks atau offset elemen Struct yang dipilih saat API atau SDK menampilkannya.</p>
<h2 id="Add-scalar-filters" class="common-anchor-header">Tambahkan filter skalar<button data-href="#Add-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat menggabungkan pencarian pengelompokan dengan penyaringan skalar StructArray. Gunakan ` <code translate="no">element_filter</code> ` ketika kondisi skalar harus membatasi elemen Struct mana yang berpartisipasi dalam pencarian vektor tingkat elemen.</p>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Predikat tingkat atas memilih entitas kandidat. Predikat ` <code translate="no">element_filter</code> ` membatasi pencarian vektor tingkat elemen hanya pada elemen Struct yang cocok. Pengelompokan kemudian menggabungkan hasil elemen yang cocok berdasarkan kunci utama.</p>
<h2 id="Use-grouping-in-hybrid-search" class="common-anchor-header">Gunakan pengelompokan dalam pencarian hibrida<button data-href="#Use-grouping-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Pengelompokan hibrida dengan StructArray merupakan fitur tingkat elemen. Fitur ini hanya didukung jika semua sub-pencarian menargetkan bidang vektor tingkat elemen di bawah bidang StructArray yang sama. Jangan gunakan permintaan tingkat EmbeddingList dalam pencarian hibrida StructArray yang dikelompokkan.</p>
<p>Contoh berikut mengasumsikan bahwa bidang StructArray ` <code translate="no">chunks</code> ` memiliki dua subbidang vektor tingkat elemen, ` <code translate="no">chunks[emb]</code> ` dan ` <code translate="no">chunks[code_emb]</code>`, dan keduanya diindeks dengan metrik vektor reguler.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, kedua sub-permintaan menargetkan bidang vektor tingkat elemen di bawah bidang StructArray yang sama, yaitu ` <code translate="no">chunks</code>`. Pencarian hibrida tidak mendukung pengelompokan tingkat elemen jika mencampurkan bidang vektor biasa, bidang StructArray yang berbeda, atau permintaan tingkat EmbeddingList.</p>
<h2 id="Interpret-grouped-results" class="common-anchor-header">Menafsirkan hasil yang dikelompokkan<button data-href="#Interpret-grouped-results" class="anchor-icon" translate="no">
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
<tr><th>Item hasil</th><th>Arti</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Kunci utama dari entitas induk yang dikelompokkan.</td></tr>
<tr><td><code translate="no">distance</code> atau skor</td><td>Skor atau jarak elemen Struct yang dipilih untuk entitas induk tersebut.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Posisi berbasis nol dari elemen Struct yang dipilih saat dikembalikan.</td></tr>
<tr><td>Kunci utama yang berulang</td><td>Tidak diharapkan saat pengelompokan berdasarkan kunci utama.</td></tr>
<tr><td><code translate="no">limit</code></td><td>Berlaku untuk hasil entitas induk yang dikelompokkan.</td></tr>
</tbody>
</table>
<h2 id="Limitations" class="common-anchor-header">Batasan<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>Pencarian pengelompokan hanya berlaku untuk pencarian vektor StructArray tingkat elemen. Pencarian EmbeddingList dan pencarian hibrida tingkat EmbeddingList tidak mendukung pengelompokan.</p></li>
<li><p>Gunakan kunci utama sebagai ` <code translate="no">group_by_field</code>`. Pengelompokan tingkat elemen StructArray bukanlah pengelompokan serbaguna berdasarkan bidang skalar sembarang.</p></li>
<li><p>Jangan menggabungkan pencarian pengelompokan dengan pencarian rentang.</p></li>
<li><p>Jangan gunakan kueri ` <code translate="no">EmbeddingList</code> ` atau metrik ` <code translate="no">MAX_SIM*</code> ` untuk pencarian pengelompokan.</p></li>
<li><p>Pengelompokan hibrida hanya didukung jika semua sub-pencarian menargetkan bidang vektor tingkat elemen di bawah bidang StructArray yang sama.</p></li>
<li><p>Pengelompokan hibrida tidak didukung jika pencarian hibrida mencampurkan bidang vektor normal, bidang StructArray yang berbeda, atau permintaan tingkat EmbeddingList.</p></li>
</ul>
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
<li><p>Menggunakan pengelompokan dengan ` <code translate="no">chunks[emb_list_vector]</code>`, yang dimaksudkan untuk pencarian `EmbeddingList`.</p></li>
<li><p>Pengelompokan berdasarkan bidang skalar non-kunci utama.</p></li>
<li><p>Pengelompokan berdasarkan beberapa bidang. Pengelompokan StructArray tingkat elemen hanya mendukung pengelompokan berdasarkan kunci utama.</p></li>
<li><p>Mengharapkan hasil yang dikelompokkan mewakili setiap elemen Struct yang cocok. Pengelompokan mengembalikan paling banyak satu hasil per entitas induk.</p></li>
<li><p>Mengasumsikan bahwa pencarian tingkat elemen yang dikelompokkan menghitung ulang skor " <code translate="no">MAX_SIM*</code> " bergaya EmbeddingList. Pengelompokan menggabungkan hasil pencocokan tingkat elemen; hal ini tidak mengubah model penilaian.</p></li>
<li><p>Menggabungkan " <code translate="no">group_by_field</code> " dengan " <code translate="no">radius</code> " atau " <code translate="no">range_filter</code>".</p></li>
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
<li><p>Untuk mempelajari pencarian tingkat elemen tanpa pengelompokan terlebih dahulu, baca " <a href="/docs/id/basic-vector-search-with-structarray.md">Basic Vector Search with StructArray</a>".</p></li>
<li><p>Untuk menambahkan filter skalar ke pencarian yang dikelompokkan, baca " <a href="/docs/id/filtered-search-with-structarray.md">Filtered Search with StructArray</a>".</p></li>
<li><p>Untuk menggunakan batas skor atau jarak sebagai pengganti pengelompokan, baca " <a href="/docs/id/range-search-with-structarray.md">Pencarian Rentang dengan StructArray</a>".</p></li>
<li><p>Untuk memeriksa batasan pencarian StructArray, baca <a href="/docs/id/structarray-limits.md">Batasan StructArray</a>.</p></li>
</ol>
