---
id: range-search-with-structarray.md
title: Pencarian Rentang dengan StructArray
summary: >-
  Gunakan halaman ini untuk menjalankan pencarian rentang pada subbidang vektor
  StructArray. Pencarian rentang akan mengembalikan hasil vektor yang skor atau
  jaraknya berada dalam batas yang ditentukan. Untuk bidang StructArray, gunakan
  pencarian rentang bersama dengan pencarian vektor tingkat elemen, di mana
  setiap elemen Struct dicari secara terpisah.
---
<h1 id="Range-Search-with-StructArray" class="common-anchor-header">Pencarian Rentang dengan StructArray<button data-href="#Range-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Gunakan halaman ini untuk menjalankan pencarian rentang pada subbidang vektor StructArray. Pencarian rentang mengembalikan hasil vektor yang skor atau jaraknya berada dalam batas yang ditentukan. Untuk bidang StructArray, gunakan pencarian rentang dengan pencarian vektor tingkat elemen, di mana setiap elemen Struct dicari secara terpisah.</p>
<p>Halaman ini menggunakan koleksi " <code translate="no">tech_articles</code> " dari <a href="/docs/id/create-structarray-field.md">"Create a StructArray Field</a>". Koleksi tersebut memiliki bidang StructArray bernama " <code translate="no">chunks</code>". Subbidang vektor " <code translate="no">chunks[emb]</code> " diindeks untuk pencarian tingkat elemen menggunakan metrik vektor standar seperti " <code translate="no">COSINE</code>", " <code translate="no">IP</code>", atau " <code translate="no">L2</code>".</p>
<h2 id="How-range-search-applies-to-StructArray" class="common-anchor-header">Bagaimana pencarian rentang diterapkan pada StructArray<button data-href="#How-range-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>Mode pencarian</th><th>Perilaku pencarian rentang</th><th>Tingkat detail hasil</th></tr>
</thead>
<tbody>
<tr><td>Pencarian EmbeddingList</td><td>Tidak didukung.</td><td>Tidak berlaku.</td></tr>
<tr><td>Pencarian tingkat elemen</td><td>Gunakan kueri vektor biasa dengan ` <code translate="no">radius</code> ` dan, secara opsional, ` <code translate="no">range_filter</code>`.</td><td>Tingkat elemen struktur.</td></tr>
<tr><td>Pencarian hibrida</td><td>Didukung jika permintaan StructArray menargetkan bidang vektor tingkat elemen. Permintaan tingkat EmbeddingList tidak mendukung pencarian rentang.</td><td>Pencarian sub-tingkat elemen, kemudian penentuan peringkat ulang hibrida.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Jika Anda hanya memerlukan elemen Struct terdekat, mulailah dengan <a href="/docs/id/basic-vector-search-with-structarray.md">Pencarian Vektor Dasar dengan StructArray</a>. Gunakan pencarian rentang ketika hasilnya harus memenuhi batas skor atau jarak, bukan hanya peringkat top-K.</p>
</div>
<h2 id="Before-you-begin" class="common-anchor-header">Sebelum Anda mulai<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Siapkan koleksi, data, dan indeks sebelum menjalankan pencarian rentang.</p>
<table>
<thead>
<tr><th>Persyaratan</th><th>Rincian</th></tr>
</thead>
<tbody>
<tr><td>Bidang StructArray</td><td>Koleksi tersebut berisi bidang StructArray seperti <code translate="no">chunks</code>.</td></tr>
<tr><td>Subbidang vektor tingkat elemen</td><td>Subbidang vektor yang dituju adalah <code translate="no">chunks[emb]</code>, bukan <code translate="no">chunks[emb_list_vector]</code>.</td></tr>
<tr><td>Metrik indeks</td><td>Subbidang vektor diindeks dengan metrik vektor reguler, seperti <code translate="no">COSINE</code>, <code translate="no">IP</code>, atau <code translate="no">L2</code>.</td></tr>
<tr><td>Data kueri</td><td>Kueri adalah vektor biasa, bukan <code translate="no">EmbeddingList</code>.</td></tr>
</tbody>
</table>
<p>Untuk pengaturan indeks, lihat <a href="/docs/id/index-structarray-fields.md">Bidang StructArray Indeks</a>.</p>
<h2 id="Use-radius-and-rangefilter" class="common-anchor-header">Gunakan radius dan range_filter<button data-href="#Use-radius-and-rangefilter" class="anchor-icon" translate="no">
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
    </button></h2><p>Tetapkan ` <code translate="no">radius</code> ` untuk menentukan batas pencarian. Tetapkan ` <code translate="no">range_filter</code> ` jika Anda juga memerlukan batas bagian dalam. Arahnya bergantung pada apakah jarak yang lebih kecil lebih baik atau skor kesamaan yang lebih besar lebih baik.</p>
<table>
<thead>
<tr><th>Jenis metrik</th><th>Skor yang lebih tinggi lebih baik?</th><th>Kondisi rentang saat <code translate="no">range_filter</code> digunakan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>Tidak. Jarak yang lebih kecil lebih baik.</td><td><code translate="no">range_filter &lt;= distance &lt; radius</code></td></tr>
<tr><td><code translate="no">IP</code>, <code translate="no">COSINE</code></td><td>Ya. Skor yang lebih besar lebih baik.</td><td><code translate="no">radius &lt; distance &lt;= range_filter</code></td></tr>
</tbody>
</table>
<p>Jika hanya " <code translate="no">radius</code> " yang ditetapkan, pencarian rentang akan mengembalikan hasil yang memenuhi batas luar metrik tersebut. Pilih nilai sesuai dengan skala skor atau jarak dari embedding Anda.</p>
<h2 id="Run-element-level-range-search" class="common-anchor-header">Jalankan pencarian rentang tingkat elemen<button data-href="#Run-element-level-range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut mencari potongan-potongan individual yang vektor <code translate="no">chunks[emb]</code> -nya cukup mirip dengan vektor kueri. Setiap hasil yang cocok mewakili elemen Struct yang sesuai.</p>
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
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
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
<p>Dalam contoh ini, ` <code translate="no">COSINE</code> ` adalah metrik gaya kesamaan, sehingga rentang hasilnya lebih besar dari ` <code translate="no">radius</code> ` dan kurang dari atau sama dengan ` <code translate="no">range_filter</code>`. Nilai ` <code translate="no">offset</code> ` mengidentifikasi elemen Struct yang cocok dalam array ` <code translate="no">chunks</code> ` saat dikembalikan.</p>
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
    </button></h2><p>Anda dapat menggabungkan pencarian rentang tingkat elemen dengan penyaringan skalar StructArray. Gunakan predikat tingkat atas untuk bidang entitas induk, dan gunakan <code translate="no">element_filter</code> untuk membatasi elemen Struct mana yang ikut serta dalam pencarian rentang vektor.</p>
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
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">10</span>,
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
<p>Predikat tingkat atas memilih entitas kandidat. Predikat ` <code translate="no">element_filter</code> ` membatasi pencarian rentang vektor hanya pada elemen Struct yang cocok. Untuk contoh penyaringan lainnya, lihat <a href="/docs/id/filtered-search-with-structarray.md">Pencarian yang Disaring dengan StructArray</a>.</p>
<h2 id="Use-range-search-in-hybrid-search" class="common-anchor-header">Gunakan pencarian rentang dalam pencarian hibrida<button data-href="#Use-range-search-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Bidang vektor tingkat elemen StructArray mendukung pencarian rentang dalam pencarian hibrida. Tambahkan ` <code translate="no">radius</code> ` dan, secara opsional, ` <code translate="no">range_filter</code> ` ke ` <code translate="no">AnnSearchRequest</code> ` yang menargetkan bidang vektor tingkat elemen StructArray.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, hanya sub-permintaan ` <code translate="no">chunks[emb]</code> ` yang menggunakan parameter pencarian rentang. Permintaan StructArray tetap mengikuti semantik tingkat elemen: batas rentang berlaku untuk hasil elemen Struct sebelum pencarian hibrida menggabungkan dan menyusun ulang hasil.</p>
<h2 id="Interpret-range-results" class="common-anchor-header">Menafsirkan hasil rentang<button data-href="#Interpret-range-results" class="anchor-icon" translate="no">
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
<tr><td><code translate="no">id</code></td><td>Kunci utama entitas yang berisi elemen Struct yang cocok.</td></tr>
<tr><td><code translate="no">distance</code> atau skor</td><td>Skor atau jarak antara vektor kueri dan vektor elemen Struct yang cocok.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Posisi berbasis nol dari elemen Struct yang cocok di bidang StructArray saat dikembalikan.</td></tr>
<tr><td>Kunci utama yang berulang</td><td>Mungkin terjadi. Lebih dari satu elemen Struct dalam entitas yang sama dapat berada dalam rentang yang ditentukan.</td></tr>
<tr><td><code translate="no">limit</code></td><td>Berlaku untuk kecocokan elemen, bukan entitas induk yang unik.</td></tr>
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
<li><p>Jangan gunakan kueri " <code translate="no">EmbeddingList</code> " atau metrik " <code translate="no">MAX_SIM*</code> " untuk pencarian rentang pada subbidang vektor StructArray. Pencarian tingkat EmbeddingList tidak mendukung pencarian rentang.</p></li>
<li><p>Jangan menggabungkan pencarian rentang dengan pencarian pengelompokan. Jika Anda memerlukan satu hasil per entitas induk, jalankan pencarian tingkat elemen tanpa parameter rentang dan gunakan pengelompokan jika didukung.</p></li>
<li><p>Pencarian rentang hibrida didukung untuk bidang vektor tingkat elemen StructArray. Fitur ini tidak didukung untuk permintaan StructArray tingkat EmbeddingList.</p></li>
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
<li><p>Menjalankan pencarian rentang terhadap <code translate="no">chunks[emb_list_vector]</code>, yang dimaksudkan untuk pencarian EmbeddingList.</p></li>
<li><p>Menggunakan ` <code translate="no">MAX_SIM_COSINE</code> ` alih-alih metrik biasa seperti ` <code translate="no">COSINE</code> ` untuk pencarian rentang tingkat elemen.</p></li>
<li><p>Menggunakan kueri ` <code translate="no">EmbeddingList</code> ` alih-alih kueri vektor biasa.</p></li>
<li><p>Mengharapkan hasil pencarian rentang bersifat unik berdasarkan entitas induk. Pencarian rentang mengembalikan hasil yang cocok pada elemen Struct.</p></li>
<li><p>Menggunakan ` <code translate="no">chunks.emb</code> ` alih-alih sintaks jalur subfield yang diwajibkan ` <code translate="no">chunks[emb]</code>`.</p></li>
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
<li><p>Untuk mempelajari dua mode pencarian vektor StructArray dasar, baca " <a href="/docs/id/basic-vector-search-with-structarray.md">Pencarian Vektor Dasar dengan StructArray</a>".</p></li>
<li><p>Untuk menambahkan filter skalar ke pencarian rentang, baca " <a href="/docs/id/filtered-search-with-structarray.md">Pencarian Terfilter dengan StructArray</a>".</p></li>
<li><p>Untuk mengembalikan paling banyak satu hasil per entitas induk di mana hal ini didukung, baca <a href="/docs/id/grouping-search-with-structarray.md">Pencarian Berkelompok dengan StructArray</a>.</p></li>
<li><p>Untuk memeriksa batasan pencarian berdasarkan versi, baca <a href="/docs/id/structarray-limits.md">Batasan StructArray</a>.</p></li>
</ol>
