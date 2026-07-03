---
id: filtered-search-with-structarray.md
title: Pencarian Terfilter dengan StructArray
summary: >-
  Gunakan halaman ini untuk menambahkan penyaringan skalar ke pencarian vektor
  pada bidang StructArray. Penyaringan StructArray memiliki dua tingkatan:
  penyaring tingkat baris memilih entitas induk, sedangkan penyaring tingkat
  elemen membatasi elemen Struct mana saja yang ikut serta dalam pencarian
  vektor tingkat elemen.
---
<h1 id="Filtered-Search-with-StructArray" class="common-anchor-header">Pencarian Terfilter dengan StructArray<button data-href="#Filtered-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Gunakan halaman ini untuk menambahkan penyaringan skalar ke pencarian vektor pada bidang StructArray. Penyaringan StructArray memiliki dua tingkatan: penyaring tingkat baris memilih entitas induk, sedangkan penyaring tingkat elemen membatasi elemen Struct mana yang ikut serta dalam pencarian vektor tingkat elemen.</p>
<p>Halaman ini menggunakan koleksi " <code translate="no">tech_articles</code> " dari <a href="/docs/id/create-structarray-field.md">"Create a StructArray Field</a>". Koleksi tersebut memiliki bidang StructArray bernama " <code translate="no">chunks</code>", dengan subbidang skalar seperti " <code translate="no">section</code>", " <code translate="no">page</code>", " <code translate="no">quality_score</code>", dan " <code translate="no">has_code</code>", serta subbidang vektor untuk pencarian.</p>
<h2 id="Choose-a-filter-type" class="common-anchor-header">Pilih jenis filter<button data-href="#Choose-a-filter-type" class="anchor-icon" translate="no">
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
<tr><th>Tujuan</th><th>Penggunaan</th><th>Perilaku hasil</th></tr>
</thead>
<tbody>
<tr><td>Saring berdasarkan bidang skalar tingkat atas, seperti <code translate="no">category</code>.</td><td>Ekspresi filter biasa.</td><td>Memilih entitas induk sebelum atau selama pencarian.</td></tr>
<tr><td>Membatasi pencarian vektor tingkat elemen ke elemen Struct yang sesuai dengan kondisi skalar.</td><td><code translate="no">element_filter</code>.</td><td>Hanya mencari elemen Struct yang cocok dan dapat mengembalikan offset elemen yang cocok.</td></tr>
<tr><td>Memilih entitas berdasarkan apakah ada, semua, atau sejumlah tertentu elemen Struct yang sesuai dengan predikat.</td><td><code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code>, atau <code translate="no">MATCH_EXACT</code>.</td><td>Penyaringan tingkat baris. Operator-operator ini tidak mengembalikan offset secara langsung.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Halaman ini menjelaskan cara menggunakan filter StructArray dalam alur kerja pencarian. Untuk aturan sintaks lengkap, jenis predikat yang didukung, dan matriks predikat yang tidak didukung, lihat <a href="/docs/id/struct-array-operators.md">Operator StructArray</a>.</p>
</div>
<h2 id="Filter-by-top-level-fields" class="common-anchor-header">Penyaringan berdasarkan bidang tingkat atas<button data-href="#Filter-by-top-level-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan ekspresi filter biasa jika kondisi tersebut berlaku untuk entitas induk, bukan untuk elemen Struct individu. Ini berfungsi baik dengan pencarian EmbeddingList maupun pencarian tingkat elemen.</p>
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
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Filter di atas hanya memilih entitas yang bidang tingkat atasnya <code translate="no">category</code> adalah <code translate="no">&quot;search&quot;</code>. Filter ini tidak mengidentifikasi satu elemen Struct yang cocok.</p>
<h2 id="Filter-element-level-vector-search" class="common-anchor-header">Penyaringan pencarian vektor tingkat elemen<button data-href="#Filter-element-level-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan ` <code translate="no">element_filter(structArrayField, predicate)</code> ` ketika kondisi skalar harus diterapkan pada elemen Struct yang sama yang berpartisipasi dalam pencarian vektor tingkat elemen. Di dalam predikat, gunakan ` <code translate="no">$[subfield]</code> ` untuk merujuk pada subbidang skalar dari elemen Struct saat ini.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9 &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[has_code] == true)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
        <span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
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
<p>Dalam contoh ini, predikat tingkat atas ` <code translate="no">category == &quot;search&quot;</code> ` memilih entitas kandidat, dan ` <code translate="no">element_filter</code> ` membatasi pencarian vektor tingkat elemen pada potongan di mana ` <code translate="no">section</code>`, ` <code translate="no">quality_score</code>`, dan ` <code translate="no">has_code</code> ` semuanya cocok dalam elemen Struct yang sama.</p>
<div class="alert note">
<p>Peringatan</p>
<p>Saat Anda menggabungkan predikat tingkat atas dengan <code translate="no">element_filter</code>, letakkan <code translate="no">element_filter</code> di akhir ekspresi. Ekspresi filter hanya dapat berisi satu <code translate="no">element_filter</code>, dan Anda tidak dapat menyematkan <code translate="no">element_filter</code> atau <code translate="no">MATCH_*</code> di dalam operator StructArray lainnya.</p>
</div>
<h2 id="Filter-entities-with-MATCH-operators" class="common-anchor-header">Menyaring entitas dengan operator MATCH<button data-href="#Filter-entities-with-MATCH-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan operator <code translate="no">MATCH_*</code> ketika filter harus menentukan apakah entitas induk memenuhi syarat berdasarkan elemen Struct-nya. Operator ini merupakan filter tingkat baris: mereka memilih entitas, tetapi tidak mengembalikan offset elemen secara langsung.</p>
<table>
<thead>
<tr><th>Operator</th><th>Gunakan saat</th><th>Contoh</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY</code></td><td>Setidaknya satu elemen Struct harus memenuhi predikat.</td><td><code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code></td></tr>
<tr><td><code translate="no">MATCH_ALL</code></td><td>Semua elemen Struct harus memenuhi predikat.</td><td><code translate="no">MATCH_ALL(chunks, $[quality_score] &gt; 0.5)</code></td></tr>
<tr><td><code translate="no">MATCH_LEAST</code></td><td>Setidaknya <code translate="no">N</code> elemen Struct harus memenuhi predikat tersebut.</td><td><code translate="no">MATCH_LEAST(chunks, $[has_code] == true, threshold=2)</code></td></tr>
<tr><td><code translate="no">MATCH_MOST</code></td><td>Paling banyak <code translate="no">N</code> elemen Struct harus memenuhi predikat tersebut.</td><td><code translate="no">MATCH_MOST(chunks, $[section] == &quot;appendix&quot;, threshold=1)</code></td></tr>
<tr><td><code translate="no">MATCH_EXACT</code></td><td>Tepat <code translate="no">N</code> elemen Struct harus memenuhi predikat tersebut.</td><td><code translate="no">MATCH_EXACT(chunks, $[section] == &quot;summary&quot;, threshold=1)</code></td></tr>
</tbody>
</table>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;MATCH_ANY(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">3</span>,
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
<p>Gunakan ` <code translate="no">MATCH_ANY</code> ` di sini karena hasil pencarian `EmbeddingList` berada pada tingkat entitas. Filter ini mensyaratkan setidaknya satu chunk dalam entitas tersebut merupakan chunk ` <code translate="no">&quot;index&quot;</code> ` dengan kualitas tinggi, namun hasil pencarian itu sendiri tetap mewakili entitas induk.</p>
<h2 id="Use-filters-in-hybrid-search" class="common-anchor-header">Gunakan filter dalam pencarian hibrida<button data-href="#Use-filters-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Dalam pencarian hibrida, terapkan filter StructArray di mana kondisi tersebut harus berlaku. Filter tingkat atas dapat digunakan bersama oleh seluruh pencarian hibrida. <code translate="no">element_filter</code> harus dilampirkan ke permintaan tingkat elemen StructArray yang memerlukan batasan tingkat elemen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">5</span>,
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
<p>Argumen ` <code translate="no">filter</code> ` menerapkan kondisi entitas tingkat atas, sedangkan ` <code translate="no">expr</code> ` pada ` <code translate="no">chunk_req</code> ` hanya membatasi permintaan vektor tingkat elemen StructArray. Untuk kombinasi pencarian hibrida yang didukung dan batasan khusus versi, lihat <a href="/docs/id/hybrid-search-with-structarray.md">Pencarian Hibrida dengan StructArray</a> dan <a href="/docs/id/structarray-limits.md">Batasan StructArray</a>.</p>
<h2 id="Predicate-support-summary" class="common-anchor-header">Ringkasan dukungan predikat<button data-href="#Predicate-support-summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan subbidang skalar dalam predikat StructArray. Subbidang vektor bukanlah masukan predikat skalar.</p>
<table>
<thead>
<tr><th>Jenis subbidang</th><th>Contoh predikat umum</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code>, <code translate="no">!($[has_code] == true)</code></td></tr>
<tr><td>Tipe bilangan bulat</td><td><code translate="no">$[page] &gt;= 2</code>, <code translate="no">$[page] in [1, 2, 3]</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">$[quality_score] &gt; 0.9</code>, <code translate="no">0.7 &lt; $[quality_score] &lt; 0.95</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">$[section] == &quot;index&quot;</code>, <code translate="no">$[text] like &quot;range%&quot;</code></td></tr>
<tr><td>Subbidang vektor</td><td>Tidak didukung sebagai masukan predikat skalar <code translate="no">$[...]</code>. Gunakan subbidang vektor melalui pencarian vektor sebagai gantinya.</td></tr>
</tbody>
</table>
<p>Untuk kasus yang tidak didukung seperti jalur JSON, fungsi wadah array, fungsi pencocokan teks, predikat null pada <code translate="no">$[...]</code>, fungsi Geometri, ekspresi Timestamptz, dan panggilan fungsi generik, lihat <a href="/docs/id/struct-array-operators.md">Operator StructArray</a>.</p>
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
<li><p>Menggunak <code translate="no">$[subfield]</code> di luar <code translate="no">element_filter</code> atau <code translate="no">MATCH_*</code>.</p></li>
<li><p>Menggunakan <code translate="no">chunks.section</code> alih-alih sintaks operator StructArray seperti <code translate="no">element_filter(chunks, $[section] == &quot;index&quot;)</code>.</p></li>
<li><p>Menggunakan <code translate="no">element_filter</code> saat Anda hanya memerlukan penyaringan tingkat baris. Gunakan <code translate="no">MATCH_ANY</code> sebagai gantinya jika Anda hanya perlu memilih entitas.</p></li>
<li><p>Mengharapkan <code translate="no">MATCH_*</code> mengembalikan offset elemen. Operator-operator ini memilih entitas dan tidak mengidentifikasi satu elemen yang cocok secara mandiri.</p></li>
<li><p>Menulis predikat boolean tanpa operator, seperti <code translate="no">$[has_code]</code>. Gunakan perbandingan eksplisit seperti <code translate="no">$[has_code] == true</code>.</p></li>
<li><p>Menempatkan ` <code translate="no">element_filter</code> ` sebelum predikat tingkat atas dalam ekspresi filter yang sama.</p></li>
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
<li><p>Untuk meninjau sintaks filter StructArray secara lengkap, baca <a href="/docs/id/struct-array-operators.md">StructArray Operators</a>.</p></li>
<li><p>Untuk menjalankan pencarian vektor tanpa filter terlebih dahulu, baca <a href="/docs/id/basic-vector-search-with-structarray.md">Pencarian Vektor Dasar dengan StructArray</a>.</p></li>
<li><p>Untuk membuat indeks skalar untuk filter StructArray yang sering digunakan, baca <a href="/docs/id/index-structarray-fields.md">Indeks Bidang StructArray</a>.</p></li>
<li><p>Untuk memeriksa batasan filter dan pencarian yang spesifik untuk versi tertentu, baca <a href="/docs/id/structarray-limits.md">Batasan StructArray</a>.</p></li>
</ol>
