---
id: array-of-structs.md
title: Gambaran Umum StructArray
summary: >-
  Gunakan StructArray ketika suatu entitas perlu menyimpan daftar elemen
  terstruktur yang terurut, seperti satu dokumen dengan banyak bagian, satu
  halaman dengan banyak blok visual, atau satu video dengan banyak klip.
  StructArray menyimpan elemen-elemen ini di dalam entitas induknya sambil tetap
  memungkinkan pencarian vektor dan penyaringan skalar pada bidang-bidang di
  dalam setiap elemen.
---
<h1 id="StructArray-Overview" class="common-anchor-header">Gambaran Umum StructArray<button data-href="#StructArray-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Gunakan StructArray ketika suatu entitas perlu menyimpan daftar terurut dari elemen-elemen terstruktur, seperti satu dokumen dengan banyak bagian, satu halaman dengan banyak potongan visual, atau satu video dengan banyak klip. StructArray menyimpan elemen-elemen ini di dalam entitas induk sambil tetap memungkinkan pencarian vektor dan penyaringan skalar pada bidang-bidang di dalam setiap elemen.</p>
<h2 id="What-is-StructArray" class="common-anchor-header">Apa itu StructArray?<button data-href="#What-is-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>StructArray</strong>, yang juga dikenal sebagai array struktur, menyimpan sekumpulan elemen Struct yang terurut di dalam setiap entitas. Setiap elemen Struct dalam array tersebut mengikuti skema yang sama. Elemen Struct dapat berisi subbidang skalar, subbidang vektor, atau keduanya.</p>
<p>Misalnya, sebuah koleksi dapat menyimpan satu artikel sebagai entitas dan menyimpan potongannya dalam bidang StructArray bernama ` <code translate="no">chunks</code>`. Setiap potongan dapat mencakup teks, metadata bagian, skor kualitas, dan satu atau lebih embedding vektor.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Vector search tuning guide&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use HNSW efSearch to trade recall for latency.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.11</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.21</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.31</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.41</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.33</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.39</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Range search returns vectors within a distance boundary.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.86</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.18</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.23</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.29</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.36</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.19</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.37</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Dua subbidang vektor dalam contoh ini mewakili potongan yang sama dari dua perspektif pencarian. ` <code translate="no">chunks[emb_list_vector]</code> ` ditujukan untuk pencarian `EmbeddingList` dengan metrik ` <code translate="no">MAX_SIM*</code> `, sedangkan ` <code translate="no">chunks[emb]</code> ` ditujukan untuk pencarian tingkat elemen dengan metrik vektor reguler seperti ` <code translate="no">COSINE</code>`, ` <code translate="no">IP</code>`, atau ` <code translate="no">L2</code>`.</p>
</div>
<h2 id="When-to-use-StructArray" class="common-anchor-header">Kapan Menggunakan StructArray<button data-href="#When-to-use-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan StructArray jika satuan alami yang ingin Anda kembalikan lebih besar daripada satuan alami yang ingin Anda cari atau saring.</p>
<table>
<thead>
<tr><th>Contoh penggunaan</th><th>Mengapa StructArray membantu</th><th>Bidang StructArray yang umum</th></tr>
</thead>
<tbody>
<tr><td>Pencarian dokumen</td><td>Simpan satu dokumen sebagai entitas sambil melakukan pencarian di seluruh potongannya.</td><td><code translate="no">chunks</code></td></tr>
<tr><td>Pencarian interaksi terlambat</td><td>Menyimpan dokumen atau halaman sebagai daftar embedding dan memberi skor pad <code translate="no">MAX_SIM*</code>.</td><td><code translate="no">chunks[emb_list_vector]</code> atau <code translate="no">patches[emb]</code></td></tr>
<tr><td>Pencarian tingkat elemen</td><td>Kembalikan potongan, klip, patch, atau pengamatan yang paling relevan, termasuk offset array-nya.</td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Penyaringan terstruktur</td><td>Saring berdasarkan subbidang skalar di dalam elemen Struct, seperti section, score, page, atau flags.</td><td><code translate="no">chunks[section]</code>, <code translate="no">chunks[quality_score]</code></td></tr>
<tr><td>Mengurangi hasil induk yang duplikat</td><td>Pertahankan elemen anak di bawah entitas induk yang sama, bukan menyimpan setiap elemen anak sebagai baris terpisah.</td><td><code translate="no">chunks</code>, <code translate="no">clips</code>, <code translate="no">patches</code></td></tr>
</tbody>
</table>
<h2 id="Decision-Matrix" class="common-anchor-header">Matriks Keputusan<button data-href="#Decision-Matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan matriks berikut untuk memilih jalur StructArray yang tepat.</p>
<table>
<thead>
<tr><th>Tujuan</th><th>Jalur yang direkomendasikan</th><th>Tingkat detail hasil</th><th>Mulailah dari sini</th></tr>
</thead>
<tbody>
<tr><td>Membuat satu objek induk dengan banyak objek anak yang terstruktur.</td><td>Buat bidang StructArray.</td><td>Entitas berisi elemen Struct yang terurut.</td><td><a href="/docs/id/create-structarray-field.md">Buat bidang StructArray</a></td></tr>
<tr><td>Sisipkan catatan induk dengan data anak yang bersarang.</td><td>Sisipkan entitas yang bidang StructArray-nya berupa daftar objek Struct.</td><td>Penyisipan di tingkat entitas.</td><td><a href="/docs/id/insert-data-into-structarray-fields.md">Sisipkan Data ke dalam Bidang StructArray</a></td></tr>
<tr><td>Jalankan ColBERT, ColPali, atau pencarian interaksi terlambat di tingkat dokumen.</td><td>Gunakan pencarian EmbeddingList dengan indeks <code translate="no">MAX_SIM*</code>.</td><td>Tingkat entitas.</td><td><a href="/docs/id/search-with-embedding-lists.md">Cari dengan Daftar Embedding</a></td></tr>
<tr><td>Cari potongan, klip, atau patch individual.</td><td>Gunakan pencarian tingkat elemen dengan metrik vektor biasa.</td><td>Tingkat elemen Struct, dengan offset jika tersedia.</td><td>Pencarian Vektor Dasar dengan StructArray</td></tr>
<tr><td>Batasi pencarian vektor tingkat elemen pada elemen yang memenuhi kondisi skalar.</td><td>Gunakan ` <code translate="no">element_filter</code>`.</td><td>Penyaringan tingkat elemen; bentuk hasil bergantung pada jenis pencarian.</td><td>Pencarian yang Disaring dengan StructArray</td></tr>
<tr><td>Pilih entitas berdasarkan jumlah elemen Struct yang memenuhi suatu kondisi.</td><td>Gunakan <code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code>, atau <code translate="no">MATCH_EXACT</code>.</td><td>Tingkat entitas.</td><td><a href="/docs/id/struct-array-operators.md">Operator StructArray</a></td></tr>
<tr><td>Gunakan batas skor atau jarak pada subbidang vektor StructArray.</td><td>Gunakan pencarian rentang tingkat elemen.</td><td>Tingkat elemen Struct.</td><td>Pencarian Rentang dengan StructArray</td></tr>
<tr><td>Kembalikan paling banyak satu hasil per entitas induk setelah pencarian tingkat elemen.</td><td>Gunakan pencarian berkelompok berdasarkan kunci utama.</td><td>Tingkat entitas setelah pengelompokan.</td><td>Pencarian Pengelompokan dengan StructArray</td></tr>
<tr><td>Gabungkan pencarian elemen StructArray dengan bidang vektor lainnya.</td><td>Gunakan pencarian hibrida dengan satu AnnSearchRequest yang menargetkan subbidang vektor StructArray.</td><td>Pencarian sub-elemen, pemeringkatan ulang tingkat entitas.</td><td>Pencarian Hibrida dengan StructArray</td></tr>
</tbody>
</table>
<h2 id="Understand-the-two-search-models" class="common-anchor-header">Memahami dua model pencarian<button data-href="#Understand-the-two-search-models" class="anchor-icon" translate="no">
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
<tr><th>### Pencarian EmbeddingList Pencarian EmbeddingList memperlakukan vektor di dalam subbidang vektor StructArray sebagai satu daftar embedding untuk entitas induk. Kueri juga merupakan daftar embedding. Milvus membandingkan daftar embedding kueri dengan daftar embedding yang tersimpan menggunakan metrik " <code translate="no">MAX_SIM*</code> " dan mengembalikan entitas yang cocok. - Data kueri: daftar embedding. - Keluarga metrik: <code translate="no">MAX_SIM*</code>. - Tingkat granularitas hasil: tingkat entitas. - Cocok untuk: pencarian interaksi lanjutan pada tingkat dokumen atau halaman.</th><th>### Pencarian tingkat elemen Pencarian tingkat elemen memperlakukan setiap elemen Struct sebagai kandidat pencarian vektor yang independen. Setiap hasil yang cocok mewakili elemen yang cocok di dalam bidang StructArray, dan hasil yang tidak dikelompokkan dapat menampilkan offset elemen. - Data kueri: vektor biasa. - Keluarga metrik: metrik vektor biasa. - Tingkat granularitas hasil: tingkat elemen Struct. - Cocok untuk: pencarian pada tingkat chunk, clip, atau patch.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<div class="alert note">
<p>Peringatan</p>
<p>Jika koleksi Anda memerlukan pencarian EmbeddingList dan pencarian tingkat elemen, gunakan dua subbidang vektor terpisah. Bidang vektor atau subbidang vektor hanya menerima satu indeks, dan kedua mode pencarian tersebut memerlukan keluarga metrik yang berbeda.</p>
</div>
<h2 id="Documentation-map" class="common-anchor-header">Peta dokumentasi<button data-href="#Documentation-map" class="anchor-icon" translate="no">
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
    </button></h2><p>Dokumentasi StructArray dibagi menjadi halaman pemodelan dan halaman pencarian. Gunakan halaman pemodelan untuk mendefinisikan dan menyiapkan data. Gunakan halaman pencarian untuk memilih perilaku pengambilan dan penyaringan yang tepat.</p>
<table>
<thead>
<tr><th>Area</th><th>Halaman</th><th>Gunakan untuk</th></tr>
</thead>
<tbody>
<tr><td>Pemodelan</td><td><a href="/docs/id/create-structarray-field.md">Buat Bidang StructArray</a></td><td>Tentukan skema Struct dan tambahkan bidang StructArray.</td></tr>
<tr><td>Pemodelan</td><td><a href="/docs/id/insert-data-into-structarray-fields.md">Masukkan Data ke dalam Bidang StructArray</a></td><td>Siapkan dan masukkan data StructArray bersarang.</td></tr>
<tr><td>Pemodelan</td><td><a href="/docs/id/index-structarray-fields.md">Buat indeks pada bidang StructArray</a></td><td>Buat indeks vektor dan skalar pada subbidang StructArray.</td></tr>
<tr><td>Referensi</td><td><a href="/docs/id/structarray-limits.md">Batasan StructArray</a></td><td>Periksa batasan skema, tipe data, indeks, pencarian, filter, dan versi.</td></tr>
<tr><td>Pencarian</td><td>Pencarian Vektor Dasar dengan StructArray</td><td>Bandingkan pencarian EmbeddingList dan pencarian vektor tingkat elemen.</td></tr>
<tr><td>Pencarian</td><td>Pencarian Rentang dengan StructArray</td><td>Gunakan batasan rentang dengan subbidang vektor StructArray.</td></tr>
<tr><td>Pencarian</td><td>Pencarian Pengelompokan dengan StructArray</td><td>Kelompokkan hasil pencarian tingkat elemen berdasarkan kunci utama.</td></tr>
<tr><td>Pencarian</td><td>Pencarian Hibrida dengan StructArray</td><td>Gabungkan pencarian tingkat elemen StructArray dengan pencarian vektor lainnya.</td></tr>
<tr><td>Pencarian</td><td>Pencarian yang difilter dengan StructArray</td><td>Gunakan filter StructArray dalam pencarian, kueri, dan pencarian hibrida.</td></tr>
<tr><td>Pencarian</td><td><a href="/docs/id/search-with-embedding-lists.md">Pencarian dengan Daftar Embedding</a></td><td>Bangun sistem pengambilan data bergaya ColBERT dan ColPali dengan StructArray.</td></tr>
<tr><td>Filter</td><td><a href="/docs/id/struct-array-operators.md">Operator StructArray</a></td><td>Referensi sintaks untuk operator <code translate="no">element_filter</code> dan <code translate="no">MATCH_*</code>.</td></tr>
</tbody>
</table>
<h2 id="Key-limits-to-check-first" class="common-anchor-header">Batasan kunci yang harus diperiksa terlebih dahulu<button data-href="#Key-limits-to-check-first" class="anchor-icon" translate="no">
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
<li><p>Struct dapat digunakan sebagai tipe elemen dari bidang Array. Struct tidak digunakan sebagai bidang koleksi tingkat atas.</p></li>
<li><p>Semua elemen Struct dalam bidang StructArray yang sama berbagi satu skema yang telah ditentukan sebelumnya.</p></li>
<li><p>Subbidang vektor memerlukan indeks. Pencarian EmbeddingList menggunakan metrik ` <code translate="no">MAX_SIM*</code> `, sedangkan pencarian tingkat elemen menggunakan metrik vektor biasa.</p></li>
<li><p><code translate="no">element_filter</code> dan " <code translate="no">MATCH_*</code> " ditujukan untuk subbidang skalar di dalam bidang StructArray. Gunakan " <code translate="no">$[subfield]</code> " hanya di dalam operator-operator ini.</p></li>
<li><p>Beberapa kombinasi pencarian bergantung pada versi atau spesifik mode. Periksa <a href="/docs/id/structarray-limits.md">Batasan StructArray</a> sebelum mengandalkan pencarian rentang, pencarian pengelompokan, pencarian hibrida, bidang yang dapat bernilai null, atau bidang yang ditambahkan secara dinamis.</p></li>
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
<li><p>Untuk merancang skema, baca <a href="/docs/id/create-structarray-field.md">Buat Bidang StructArray</a>.</p></li>
<li><p>Untuk mempersiapkan data, baca " <a href="/docs/id/insert-data-into-structarray-fields.md">Sisipkan Data ke dalam Bidang StructArray</a>".</p></li>
<li><p>Untuk memilih indeks, baca " <a href="/docs/id/index-structarray-fields.md">Index StructArray Fields</a>".</p></li>
<li><p>Untuk mencari subbidang vektor StructArray, mulailah dengan "Pencarian Vektor Dasar dengan StructArray".</p></li>
<li><p>Untuk menyaring subbidang skalar StructArray, baca " <a href="/docs/id/struct-array-operators.md">Operator StructArray</a> " dan "Pencarian yang Disaring dengan StructArray".</p></li>
</ol>
