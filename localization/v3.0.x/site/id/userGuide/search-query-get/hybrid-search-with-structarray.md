---
id: hybrid-search-with-structarray.md
title: Pencarian Hibrida dengan StructArray
summary: >-
  Gunakan halaman ini untuk menggabungkan pencarian vektor StructArray dengan
  pencarian vektor lainnya dalam satu permintaan pencarian hibrida. Pencarian
  hibrida StructArray dapat menghasilkan hasil pada tingkat entitas atau hasil
  pada tingkat elemen, tergantung pada objek AnnSearchRequest yang Anda
  gabungkan.
---
<h1 id="Hybrid-Search-with-StructArray" class="common-anchor-header">Pencarian Hibrida dengan StructArray<button data-href="#Hybrid-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Gunakan halaman ini untuk menggabungkan pencarian vektor StructArray dengan pencarian vektor lainnya dalam satu permintaan pencarian hibrida. Pencarian hibrida StructArray dapat menghasilkan hasil tingkat entitas atau hasil tingkat elemen, tergantung pada objek <code translate="no">AnnSearchRequest</code> yang Anda gabungkan.</p>
<p>Halaman ini menggunakan koleksi <code translate="no">tech_articles</code> dari <a href="/docs/id/create-structarray-field.md">Buat Bidang StructArray</a>. Koleksi tersebut memiliki bidang vektor tingkat atas bernama <code translate="no">title_vector</code> dan bidang StructArray bernama <code translate="no">chunks</code>. Subbidang <code translate="no">chunks[emb_list_vector]</code> diindeks untuk pencarian EmbeddingList, sedangkan <code translate="no">chunks[emb]</code> diindeks untuk pencarian tingkat elemen.</p>
<h2 id="How-hybrid-search-applies-to-StructArray" class="common-anchor-header">Bagaimana pencarian hibrida diterapkan pada StructArray<button data-href="#How-hybrid-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th><code translate="no">AnnSearchRequest</code> kombinasi</th><th>Cakupan kandidat akhir</th><th>Perilaku hasil</th><th><code translate="no">element_scope</code></th></tr>
</thead>
<tbody>
<tr><td>Bidang vektor tingkat koleksi + subbidang EmbeddingList StructArray</td><td>Tingkat entitas</td><td>Kandidat akhir diindeks berdasarkan kunci utama.</td><td>Jangan gunakan.</td></tr>
<tr><td>Bidang vektor tingkat koleksi + subbidang tingkat elemen StructArray</td><td>Tingkat entitas</td><td>Hasil pencocokan tingkat elemen digabungkan menjadi kandidat tingkat entitas sebelum pemeringkatan ulang hibrida.</td><td>Konfigurasi penggabungan opsional pada tingkat elemen StructArray <code translate="no">AnnSearchRequest</code>.</td></tr>
<tr><td>Beberapa subbidang tingkat elemen di bawah bidang StructArray yang sama</td><td>Tingkat elemen</td><td>Kandidat akhir diindeks berdasarkan kunci utama ditambah offset elemen Struct.</td><td>Jangan gunakan.</td></tr>
<tr><td>Subbidang tingkat elemen di bawah bidang StructArray yang berbeda</td><td>Tingkat entitas</td><td>Offset elemen tidak berbagi identitas, sehingga setiap <code translate="no">AnnSearchRequest</code> tingkat elemen StructArray diringkas sebelum diurutkan ulang.</td><td>Konfigurasi penggabungan opsional pada setiap sub <code translate="no">AnnSearchRequest</code> tingkat elemen StructArray.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Peringatan</p>
<p>Gunakan ` <code translate="no">element_scope</code> ` hanya untuk mengonfigurasi penggabungan pada objek ` <code translate="no">AnnSearchRequest</code> ` tingkat elemen StructArray dalam pencarian hibrida tingkat elemen yang tidak menggunakan struktur yang sama. Jangan gunakan ini untuk permintaan EmbeddingList, permintaan vektor tingkat koleksi, atau pencarian hibrida tingkat elemen StructArray yang menggunakan struktur yang sama.</p>
</div>
<h2 id="Before-you-begin" class="common-anchor-header">Sebelum memulai<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Siapkan koleksi, data, dan indeks sebelum menjalankan pencarian hibrida.</p>
<table>
<thead>
<tr><th>Persyaratan</th><th>Rincian</th></tr>
</thead>
<tbody>
<tr><td>Bidang StructArray</td><td>Koleksi tersebut berisi bidang StructArray seperti <code translate="no">chunks</code>.</td></tr>
<tr><td>Subbidang vektor</td><td>Gunakan subbidang vektor terpisah untuk pencarian EmbeddingList dan pencarian tingkat elemen.</td></tr>
<tr><td>Indeks</td><td><code translate="no">chunks[emb_list_vector]</code> menggunakan metrik <code translate="no">MAX_SIM*</code>. <code translate="no">chunks[emb]</code> menggunakan metrik vektor biasa seperti <code translate="no">COSINE</code>, <code translate="no">IP</code>, atau <code translate="no">L2</code>.</td></tr>
<tr><td>Reranker</td><td>Pilih reranker hibrida seperti <code translate="no">RRFRanker</code> atau reranker lain yang didukung oleh aplikasi Anda.</td></tr>
</tbody>
</table>
<p>Untuk pengaturan indeks, lihat <a href="/docs/id/index-structarray-fields.md">Bidang StructArray Indeks</a>.</p>
<h2 id="Run-hybrid-search-with-an-EmbeddingList-request" class="common-anchor-header">Jalankan pencarian hibrida dengan permintaan EmbeddingList<button data-href="#Run-hybrid-search-with-an-EmbeddingList-request" class="anchor-icon" translate="no">
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
    </button></h2><p>Pencarian EmbeddingList pada subbidang vektor StructArray bersifat tingkat entitas dalam pencarian hibrida. Perilakunya mirip dengan permintaan pencarian vektor tingkat entitas dan tidak mengembalikan satu offset elemen Struct yang cocok.</p>
<pre><code translate="no">from pymilvus import AnnSearchRequest, MilvusClient, RRFRanker
from pymilvus.client.embedding_list import EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [0.19, 0.24, 0.30, 0.37]

query_list = EmbeddingList()
query_list.add([0.12, 0.21, 0.32, 0.44])
query_list.add([0.18, 0.23, 0.29, 0.36])

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=10,
)

chunk_list_req = AnnSearchRequest(
    data=[query_list],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=10,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_list_req],
    ranker=RRFRanker(),
    limit=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, kedua objek ` <code translate="no">AnnSearchRequest</code> ` menghasilkan kandidat tingkat entitas. Hasil akhir diindeks berdasarkan kunci utama entitas induk. Jangan tambahkan ` <code translate="no">element_scope</code> ` ke permintaan `EmbeddingList`.</p>
<h2 id="Run-same-StructArray-element-level-hybrid-search" class="common-anchor-header">Jalankan pencarian hibrida tingkat elemen pada StructArray yang sama<button data-href="#Run-same-StructArray-element-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Ketika semua objek ` <code translate="no">AnnSearchRequest</code> ` menargetkan subbidang vektor tingkat elemen di bawah bidang `StructArray` yang sama, pencarian hibrida dapat mempertahankan kandidat tingkat elemen melalui penataan ulang peringkat. Ini adalah satu-satunya mode hibrida `StructArray` di mana hasil akhir tetap berada pada tingkat elemen.</p>
<p>Contoh berikut mengasumsikan bidang StructArray <code translate="no">chunks</code> memiliki dua subbidang vektor tingkat elemen, <code translate="no">chunks[emb]</code> dan <code translate="no">chunks[code_emb]</code>, dan keduanya menggunakan metrik vektor reguler.</p>
<pre><code translate="no">index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
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
<p>Kedua objek ` <code translate="no">AnnSearchRequest</code> ` tersebut mencari subbidang vektor di bawah ` <code translate="no">chunks</code>`. Offset berbasis nol yang sama merujuk ke elemen Struct yang sama, sehingga pengurut ulang hibrida dapat langsung mengurutkan kandidat elemen. Jangan atur ` <code translate="no">element_scope</code> ` dalam mode ini karena tidak dilakukan penggabungan tingkat entitas.</p>
<h2 id="Collapse-element-level-hits-for-entity-level-hybrid-search" class="common-anchor-header">Menggabungkan hasil pencocokan tingkat elemen untuk pencarian hibrida tingkat entitas<button data-href="#Collapse-element-level-hits-for-entity-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Jika pencarian hibrida menggabungkan permintaan " <code translate="no">AnnSearchRequest</code> " tingkat elemen StructArray dengan permintaan vektor tingkat koleksi, permintaan EmbeddingList, atau permintaan tingkat elemen di bawah bidang StructArray yang berbeda, cakupan kandidat akhir berada pada tingkat entitas. Dalam hal ini, setiap permintaan " <code translate="no">AnnSearchRequest</code> " tingkat elemen StructArray digabungkan menjadi kandidat tingkat entitas sebelum pengurutan ulang hibrida.</p>
<p>Gunakan ` <code translate="no">element_scope</code> ` di dalam ` <code translate="no">params</code> ` dari ` <code translate="no">AnnSearchRequest</code> ` tingkat elemen StructArray jika Anda perlu mengontrol cara beberapa elemen yang cocok dari entitas yang sama digabungkan.</p>
<pre><code translate="no">title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;element_scope&quot;</span>: {
                <span class="hljs-string">&quot;collapse&quot;</span>: {
                    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;topk_sum&quot;</span>,
                    <span class="hljs-string">&quot;topk&quot;</span>: 3,
                },
            },
        },
    },
    <span class="hljs-built_in">limit</span>=30,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[quality_score] &gt; 0.8)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
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
<p>Dalam contoh ini, ` <code translate="no">title_req</code> ` berada pada tingkat entitas, sehingga hasil hibrida akhir juga berada pada tingkat entitas. Permintaan ` <code translate="no">chunk_req</code> ` terlebih dahulu mengembalikan hasil elemen dari ` <code translate="no">chunks[emb]</code>`, kemudian menggabungkan elemen yang dikembalikan dari entitas yang sama dengan menjumlahkan tiga skor elemen terbaik. Jika ` <code translate="no">element_scope</code> ` diabaikan saat penggabungan tingkat entitas diperlukan, strategi penggabungan secara default akan menggunakan ` <code translate="no">max</code>`.</p>
<h2 id="Choose-a-collapse-strategy" class="common-anchor-header">Pilih strategi penggabungan<button data-href="#Choose-a-collapse-strategy" class="anchor-icon" translate="no">
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
<tr><th>Strategi</th><th>Perilaku</th><th><code translate="no">topk</code></th><th>Persyaratan metrik</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max</code></td><td>Pertahankan skor elemen terbaik yang dikembalikan untuk entitas tersebut.</td><td>Tidak diperbolehkan.</td><td>Metrik vektor reguler apa pun yang didukung.</td></tr>
<tr><td><code translate="no">sum</code></td><td>Jumlahkan semua skor elemen yang dikembalikan untuk entitas tersebut.</td><td>Tidak diperbolehkan.</td><td>Hanya metrik korelasi positif, seperti <code translate="no">IP</code> atau <code translate="no">COSINE</code>.</td></tr>
<tr><td><code translate="no">avg</code></td><td>Rata-rata semua skor elemen yang dikembalikan untuk entitas tersebut.</td><td>Tidak diperbolehkan.</td><td>Metrik vektor reguler apa pun yang didukung.</td></tr>
<tr><td><code translate="no">topk_sum</code></td><td>Jumlahkan skor elemen terbaik yang dikembalikan oleh <code translate="no">K</code> untuk entitas tersebut.</td><td>Diperlukan dan harus bernilai positif.</td><td>Hanya metrik dengan korelasi positif, seperti <code translate="no">IP</code> atau <code translate="no">COSINE</code>.</td></tr>
<tr><td><code translate="no">topk_avg</code></td><td>Hitung rata-rata skor elemen terbaik yang dikembalikan oleh " <code translate="no">K</code> " untuk entitas tersebut.</td><td>Wajib dan harus bernilai positif.</td><td>Metrik vektor reguler apa pun yang didukung.</td></tr>
</tbody>
</table>
<p>Collapse hanya menggunakan hit elemen yang dikembalikan oleh <code translate="no">AnnSearchRequest</code> tingkat elemen StructArray tersebut. Fitur ini tidak memindai setiap elemen Struct dalam entitas setelah pencarian ANN. Tetapkan <code translate="no">limit</code> permintaan cukup tinggi agar elemen yang Anda inginkan tersedia untuk collapse.</p>
<h2 id="Add-filters-range-search-and-grouping" class="common-anchor-header">Tambahkan filter, pencarian rentang, dan pengelompokan<button data-href="#Add-filters-range-search-and-grouping" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat melampirkan <code translate="no">element_filter</code> ke <code translate="no">AnnSearchRequest</code> tingkat elemen StructArray ketika kondisi skalar harus diterapkan pada elemen Struct yang sama yang berpartisipasi dalam pencarian vektor. Anda juga dapat menggunakan <code translate="no">filter</code> tingkat atas pada <code translate="no">hybrid_search()</code> untuk kondisi entitas induk.</p>
<p>Bidang vektor tingkat elemen StructArray mendukung pencarian rentang dalam pencarian hibrida. Tambahkan <code translate="no">radius</code> dan, secara opsional, <code translate="no">range_filter</code> ke <code translate="no">AnnSearchRequest</code> tingkat elemen. Permintaan StructArray tingkat EmbeddingList tidak mendukung pencarian rentang.</p>
<p>Pengelompokan hibrida tingkat elemen hanya didukung jika semua objek ` <code translate="no">AnnSearchRequest</code> ` menargetkan bidang vektor tingkat elemen di bawah bidang `StructArray` yang sama, dan ` <code translate="no">group_by_field</code> ` harus menjadi kunci utama. Pengelompokan hibrida tidak didukung jika permintaan mencampurkan bidang vektor tingkat koleksi, bidang `StructArray` yang berbeda, atau permintaan tingkat `EmbeddingList`. Jangan menggabungkan pencarian rentang dengan pengelompokan.</p>
<h2 id="Interpret-hybrid-results" class="common-anchor-header">Menafsirkan hasil hibrida<button data-href="#Interpret-hybrid-results" class="anchor-icon" translate="no">
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
<tr><th>Cakupan kandidat akhir</th><th>Kunci hasil</th><th>Perilaku offset</th><th>Kapan hal ini terjadi</th></tr>
</thead>
<tbody>
<tr><td>Tingkat entitas</td><td>Kunci utama.</td><td>Tidak ada offset elemen dalam hasil akhir.</td><td>Permintaan hibrida mencakup bidang vektor tingkat koleksi, permintaan EmbeddingList, atau permintaan tingkat elemen di bawah bidang StructArray yang berbeda.</td></tr>
<tr><td>Tingkat elemen</td><td>Kunci utama ditambah bidang StructArray induk ditambah offset elemen.</td><td>Offset elemen yang dipilih dapat dikembalikan saat diekspos oleh API atau SDK.</td><td>Semua objek ` <code translate="no">AnnSearchRequest</code> ` berada di tingkat elemen dan berada di bawah bidang `StructArray` yang sama.</td></tr>
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
<li><p>Gunakan <code translate="no">element_scope</code> hanya untuk objek <code translate="no">AnnSearchRequest</code> tingkat elemen StructArray yang harus dikompres menjadi kandidat tingkat entitas dalam pencarian hibrida.</p></li>
<li><p>Jangan gunakan <code translate="no">element_scope</code> untuk permintaan EmbeddingList, permintaan vektor tingkat koleksi, atau pencarian hibrida tingkat elemen StructArray yang sama.</p></li>
<li><p><code translate="no">sum</code> dan strategi penggabungan <code translate="no">topk_sum</code> memerlukan metrik korelasi positif, seperti <code translate="no">IP</code> atau <code translate="no">COSINE</code>. Jangan gunakan metrik tersebut dengan <code translate="no">L2</code>.</p></li>
<li><p><code translate="no">topk_sum</code> dan <code translate="no">topk_avg</code> memerlukan nilai <code translate="no">topk</code> yang positif. Strategi penggabungan lainnya tidak boleh menyertakan <code translate="no">topk</code>.</p></li>
<li><p>Permintaan StructArray tingkat EmbeddingList tidak mendukung pencarian rentang atau pengelompokan berdasarkan grup.</p></li>
<li><p>Pengelompokan hibrida hanya didukung untuk pencarian hibrida tingkat elemen StructArray yang sama dan hanya berdasarkan kunci utama.</p></li>
<li><p>Jangan menggabungkan pencarian rentang dengan pengelompokan.</p></li>
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
<li><p>Menambahkan ` <code translate="no">element_scope</code> ` ke permintaan hibrida tingkat elemen `StructArray` yang sama. Permintaan tersebut tetap berada di tingkat elemen dan tidak melakukan penggabungan (collapse) di tingkat entitas.</p></li>
<li><p>Menambahkan ` <code translate="no">element_scope</code> ` ke ` <code translate="no">chunks[emb_list_vector]</code>`. Pencarian `EmbeddingList` sudah berada di tingkat entitas.</p></li>
<li><p>Mengasumsikan dua bidang StructArray berbagi offset elemen. Offset ` <code translate="no">3</code> ` dalam ` <code translate="no">chunks</code> ` dan offset ` <code translate="no">3</code> ` dalam bidang StructArray lain merupakan elemen yang berbeda, sehingga permintaan hibrida menjadi tingkat entitas.</p></li>
<li><p>Gunakan <code translate="no">topk_sum</code> dengan <code translate="no">L2</code>. Gunakan <code translate="no">max</code>, <code translate="no">avg</code>, atau <code translate="no">topk_avg</code> untuk metrik jarak negatif.</p></li>
<li><p>Diharapkan hasil hibrida tingkat entitas mencakup offset elemen Struct yang dipilih setelah penggabungan.</p></li>
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
<li><p>Untuk mempelajari dua mode pencarian vektor StructArray dasar, baca <a href="/docs/id/basic-vector-search-with-structarray.md">Pencarian Vektor Dasar dengan StructArray</a>.</p></li>
<li><p>Untuk menambahkan filter skalar ke pencarian hibrida, baca " <a href="/docs/id/filtered-search-with-structarray.md">Pencarian Terfilter dengan StructArray</a>".</p></li>
<li><p>Untuk menggunakan batas skor atau jarak dalam pencarian hibrida, baca " <a href="/docs/id/range-search-with-structarray.md">Pencarian Rentang dengan StructArray</a>".</p></li>
<li><p>Untuk mengelompokkan hasil pencarian hibrida tingkat elemen berdasarkan entitas induk, baca " <a href="/docs/id/grouping-search-with-structarray.md">Pengelompokan Pencarian dengan StructArray</a>".</p></li>
<li><p>Untuk memeriksa batasan pencarian StructArray, baca " <a href="/docs/id/structarray-limits.md">Batasan StructArray</a>".</p></li>
</ol>
