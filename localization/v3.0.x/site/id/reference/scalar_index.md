---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Bandingkan jenis indeks skalar, periksa kompatibilitas kolom, dan pahami
  pemilihan indeks otomatis.
title: Indeks Skalar
---
<h1 id="Scalar-Index" class="common-anchor-header">Indeks Skalar<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Indeks skalar dapat mempercepat <a href="/docs/id/boolean.md">proses penyaringan</a> pada bidang non-vektor. Gunakan panduan ini untuk memilih indeks, memeriksa kompatibilitas bidang, dan memahami pemilihan otomatis.</p>
<p>Pertimbangkan untuk mengindeks bidang yang sering digunakan dalam penyaringan atau yang prosesnya lambat. Untuk setiap bidang yang Anda sertakan dalam permintaan pembuatan indeks, pilih salah satu dari dua opsi berikut:</p>
<ul>
<li><strong>Tentukan jenis indeks:</strong> Pilih yang kompatibel dengan tipe data bidang dan filter Anda.</li>
<li><strong>Gunakan " <code translate="no">AUTOINDEX</code>":</strong> Atur " <code translate="no">index_type</code> " ke " <code translate="no">AUTOINDEX</code> " agar Milvus memilih jenisnya. Lihat <a href="#AUTOINDEX-behavior">perilaku AUTOINDEX</a>.</li>
</ul>
<h2 id="Index-types" class="common-anchor-header">Jenis indeks<button data-href="#Index-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Supported-predicates"></a>
<a id="Comparisons-and-membership"></a>
<a id="String-patterns"></a></p>
<p>Buka panduan indeks untuk mengetahui filter, parameter, dan langkah-langkah pembuatan yang didukung:</p>
<table>
<thead>
<tr><th>Jenis indeks</th><th>Digunakan untuk</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/id/inverted.md">TERBALIK</a></td><td>Filter kesetaraan, keanggotaan, dan rentang.</td></tr>
<tr><td><a href="/docs/id/bitmap.md">BITMAP</a></td><td>Kolom dengan sedikit nilai unik, seperti kode status.</td></tr>
<tr><td><a href="/docs/id/stl-sort.md">STL_SORT</a></td><td>Pencarian nilai dan filter rentang.</td></tr>
<tr><td><a href="/docs/id/trie.md">TRIE</a></td><td>Pencarian string yang tepat dan pencocokan awalan pada bidang- <code translate="no">VARCHAR</code>.</td></tr>
<tr><td><a href="/docs/id/ngram.md">NGRAM</a></td><td>Filter LIKE dan regex yang memenuhi syarat.</td></tr>
<tr><td><a href="/docs/id/rtree.md">RTREE</a></td><td>Filter spasial pada bidang- <code translate="no">GEOMETRY</code>.</td></tr>
</tbody>
</table>
<p>Periksa tabel kompatibilitas bidang di bawah ini dan dukungan filter indeks yang dipilih sebelum membuat indeks.</p>
<p><details id="Filter-execution">
<summary><strong>Cara filter menggunakan indeks</strong></summary></p>
<p>Sebuah indeks hanya melayani ekspresi yang memenuhi syarat; filter lain dapat memindai data. Operasi aritmatika dan perbandingan antar bidang tidak mewarisi akselerasi pencarian literal. Untuk kombinasi logis dan pengujian NULL, lihat <a href="/docs/id/basic-operators.md">Operator Dasar</a>.</p>
<p></details></p>
<p><a id="Choosing-a-scalar-index"></a></p>
<h2 id="Supported-field-types" class="common-anchor-header">Tipe bidang yang didukung<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Array-JSON-and-spatial-predicates"></a>
<a id="JSON-field-indexing"></a></p>
<p>Temukan tipe data bidang Anda untuk melihat indeks eksplisit yang didukungnya. Dalam baris array, " <code translate="no">ARRAY&lt;T&gt;</code> " berarti " <code translate="no">ARRAY</code> " dengan " <code translate="no">element_type=T</code>":</p>
<table>
<thead>
<tr><th>Jenis bidang</th><th>Jenis indeks eksplisit</th><th>Kondisi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Bidang Boolean skalar tidak mendukung <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td><td><code translate="no">BITMAP</code> tidak tersedia pada bidang kunci utama.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td><code translate="no">BITMAP</code> eksplisit tidak tersedia.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, <code translate="no">NGRAM</code></td><td><code translate="no">BITMAP</code> tidak tersedia pada kolom kunci utama. Lihat <a href="#String-pattern-indexes">pemilihan indeks berdasarkan filter</a>.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td>Lihat <a href="/docs/id/timestamptz-field.md">Bidang TIMESTAMPTZ</a>.</td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td>Lihat <a href="/docs/id/rtree.md">RTREE</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Lihat <a href="/docs/id/array_data_type.md#Array-index-support">dukungan indeks array</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code>, <code translate="no">ARRAY&lt;INT16&gt;</code>, <code translate="no">ARRAY&lt;INT32&gt;</code>, <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Lihat <a href="/docs/id/array_data_type.md#Array-index-support">Dukungan indeks array</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">INVERTED</code></td><td>Lihat <a href="/docs/id/array_data_type.md#Array-index-support">dukungan indeks array</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Lihat <a href="/docs/id/array_data_type.md#Array-index-support">Dukungan indeks array</a>.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Tergantung pada jalur yang diindeks dan tipe konversi.</td><td>Periksa <a href="/docs/id/json-indexing.md#Understand-cast-types">kompatibilitas dan persyaratan jalur JSON</a>.</td></tr>
<tr><td>Subbidang StructArray non-vektor</td><td>Tergantung pada tipe data subfield.</td><td>Indeks subbidang secara terpisah; subbidang <code translate="no">BOOL</code> tidak dapat menggunakan <code translate="no">STL_SORT</code> eksplisit. Lihat <a href="/docs/id/index-structarray-fields.md#Create-scalar-indexes">aturan subbidang</a>.</td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Tidak ada</td><td>Indeks skalar yang dibuat pengguna, termasuk ` <code translate="no">AUTOINDEX</code>`, tidak tersedia.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>Indeks skalar, termasuk <code translate="no">AUTOINDEX</code>, tidak mendukung bidang ARRAY rekursif atau array dengan elemen yang dapat bernilai null. Lihat <a href="/docs/id/array_data_type.md#Array-index-support">Dukungan indeks array</a> untuk filter array biasa dan <a href="/docs/id/index-structarray-fields.md#Create-scalar-indexes">Indeks Bidang StructArray</a> untuk aturan subbidang.</p>
</blockquote>
</div>
<p><details id="String-pattern-indexes">
<summary><strong>Pilih indeks untuk filter VARCHAR</strong></summary></p>
<p>Untuk bidang <code translate="no">VARCHAR</code>, bandingkan indeks yang kompatibel berdasarkan filter Anda:</p>
<table>
<thead>
<tr><th>Kebutuhan penyaringan</th><th>Panduan dan kondisi indeks</th></tr>
</thead>
<tbody>
<tr><td>Pencarian string yang tepat dan awalan</td><td><a href="/docs/id/trie.md#Queries-accelerated-by-TRIE">TRIE</a>, <a href="/docs/id/stl-sort.md#Queries-accelerated-by-STLSORT">STL_SORT</a>, atau <a href="/docs/id/inverted.md#Queries-accelerated-by-INVERTED">INVERTED</a>.</td></tr>
<tr><td>Sedikit nilai string yang berbeda</td><td><a href="/docs/id/bitmap.md#Queries-accelerated-by-BITMAP">BITMAP</a>; pola dievaluasi berdasarkan nilai-nilai yang diindeks.</td></tr>
<tr><td>LIKE atau regex dengan literal tetap yang sesuai</td><td><a href="/docs/id/ngram.md#Queries-accelerated-by-NGRAM">NGRAM</a> pada bidang <code translate="no">VARCHAR</code> atau jalur string JSON, tergantung pada panjang gram dan kondisi pemeriksaan ulang.</td></tr>
<tr><td>Regex tanpa literal tetap yang dapat digunakan</td><td>Kueri dapat memindai data atau mengevaluasi banyak nilai terindeks; periksa kondisi indeks yang dipilih.</td></tr>
</tbody>
</table>
<p>Rentang pada <code translate="no">VARCHAR</code> menggunakan urutan string, bahkan ketika string berisi angka. Penggunaan indeks bergantung pada perencanaan kueri, literal yang dapat diekstraksi, kardinalitas, dan distribusi data. Lihat <a href="/docs/id/pattern-matching.md#Accelerate-pattern-matching-with-indexes">Pencocokan Pola</a> untuk aturan perencanaan. Untuk jalur string JSON, periksa persyaratan jalur dan pengonversian dalam <a href="/docs/id/json-indexing.md">Pengindeksan JSON</a>.</p>
<p></details></p>
<p><a id="How-AUTOINDEX-selects"></a></p>
<h2 id="AUTOINDEX-behavior" class="common-anchor-header">Perilaku AUTOINDEX<button data-href="#AUTOINDEX-behavior" class="anchor-icon" translate="no">
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
    </button></h2><p>Atur " <code translate="no">index_type</code> " menjadi " <code translate="no">AUTOINDEX</code> " pada definisi indeks setiap kolom yang dipilih. Milvus memilih tipe berdasarkan tipe data dan, jika berlaku, jumlah nilai unik dalam setiap proses pembuatan indeks:</p>
<table>
<thead>
<tr><th>Tipe bidang</th><th>Pilihan default</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> jika jumlah nilai unik kurang dari 100; jika tidak, gunakan <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">ARRAY</code> dengan <code translate="no">element_type</code> diatur ke <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, atau <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> jika jumlah elemennya kurang dari 100; jika tidak, <code translate="no">INVERTED</code>.</td></tr>
<tr><td><code translate="no">JSON</code> jalur yang dikonversi menjadi <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, atau <code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code> secara default di versi 3.0. <a href="/docs/id/json-indexing.md#Index-requirements">Pengaturan opt-in JSON</a> mengaktifkan strategi bitmap skalar/terurut di atas.</td></tr>
<tr><td><code translate="no">JSON</code> jalur yang dikonversi menjadi <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code>, atau <code translate="no">ARRAY_VARCHAR</code></td><td>Gunakan <code translate="no">INVERTED</code> secara eksplisit; pemetaan default 3.0.6 menolak pemilihan otomatis untuk konversi ini.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Tidak didukung.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>Untuk bidang skalar yang didukung, definisi indeks yang mengabaikan ` <code translate="no">index_type</code> ` juga meminta pemilihan otomatis. Bidang yang tidak termasuk dalam permintaan tidak diindeks.</p>
</blockquote>
</div>
<p><a id="Version-compatibility"></a></p>
<p><details>
<summary><strong>Rincian pemilihan</strong></summary></p>
<ul>
<li><strong>Tata letak internal:</strong> ` <code translate="no">AUTOINDEX</code> ` dapat memilih tata letak yang tidak tersedia sebagai pilihan eksplisit, seperti pengindeksan bitmap untuk ` <code translate="no">FLOAT</code> ` dan ` <code translate="no">DOUBLE</code>`. Strategi berbasis kardinalitas ini disebut ` <code translate="no">HYBRID</code> ` secara internal; Anda tidak dapat menentukannya secara langsung. Indeks yang dipilih menentukan filter mana yang dapat menggunakannya.</li>
<li><strong>Ambang batas kardinalitas:</strong> <a id="Cardinality-threshold"></a>Tetapkan <code translate="no">bitmap_cardinality_limit</code> (rentang: 1–1000) untuk mengganti ambang batas default. Nilai di bawahnya menggunakan bitmap; pada atau di atasnya, tata letak kardinalitas tinggi tipe data berlaku. Pilihan eksplisit <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code>, dan <code translate="no">BITMAP</code> melewati pemilihan berbasis kardinalitas dan mengabaikan ambang batas ini.</li>
<li><strong>Penggantian oleh administrator:</strong> Ubah pemetaan tipe melalui <code translate="no">scalarAutoIndex.params.build</code>. <code translate="no">scalarAutoIndex.enable=false</code> (default) masih mengizinkan <code translate="no">AUTOINDEX</code> eksplisit; <code translate="no">true</code> juga menerapkan pemilihan otomatis pada permintaan manual yang valid.</li>
</ul>
<p></details></p>
<h2 id="Whats-next" class="common-anchor-header">Langkah selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Performance-considerations"></a>
<a id="Estimating-memory-requirements"></a></p>
<p>Pilih panduan untuk tugas Anda berikutnya:</p>
<ul>
<li><strong>Buat indeks:</strong> Gunakan <a href="#Index-types">panduan indeks</a> untuk parameter dan contoh pembuatan.</li>
<li><strong>Rencanakan sumber daya:</strong> Lihat panduan memori untuk <a href="/docs/id/stl-sort.md#Memory-considerations">STL_SORT</a>, <a href="/docs/id/bitmap.md#Memory-considerations">BITMAP</a>, <a href="/docs/id/inverted.md#Memory-considerations">INVERTED</a>, atau <a href="/docs/id/ngram.md#Memory-considerations">NGRAM</a>. Bandingkan penggunaan memori, waktu pembuatan, dan latensi kueri dengan data dan filter yang representatif.</li>
<li><strong>Konfigurasikan pencarian teks:</strong> <a href="/docs/id/keyword-match.md">Text Match</a> dan <a href="/docs/id/full-text-search.md">Full Text Search</a> mencakup analisis teks, BM25, <code translate="no">TEXT_MATCH</code>, dan <code translate="no">PHRASE_MATCH</code>. Indeks skalar <code translate="no">INVERTED</code> tidak mengaktifkan mekanisme ini.</li>
</ul>
<p><details id="Drop-index-compatibility">
<summary><strong>Menghapus indeks skalar pada rilis Milvus yang lebih lama</strong></summary></p>
<p>Pada Milvus v2.6.3 atau versi sebelumnya, lepaskan koleksi sebelum menghapus indeks skalar. Mulai dari v2.6.4 ke atas, Anda dapat menghapusnya tanpa perlu melepaskan koleksi.</p>
<p></details></p>
