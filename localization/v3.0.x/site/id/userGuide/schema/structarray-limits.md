---
id: structarray-limits.md
title: Batasan StructArray
summary: >-
  Dukungan StructArray mencakup definisi skema, data yang dimasukkan,
  pengindeksan, mode pencarian, serta filter khusus StructArray. Gunakan halaman
  ini sebagai panduan batasan sebelum Anda mengandalkan perilaku StructArray
  dalam lingkungan produksi.
---
<h1 id="StructArray-Limits" class="common-anchor-header">Batasan StructArray<button data-href="#StructArray-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>Dukungan StructArray mencakup definisi skema, muatan penyisipan, pengindeksan, mode pencarian, dan filter khusus StructArray. Gunakan halaman ini sebagai referensi batasan sebelum Anda mengandalkan perilaku StructArray dalam lingkungan produksi.</p>
<p>Sebagian besar batasan StructArray berasal dari salah satu dari tiga sumber berikut: model skema StructArray, mode pencarian yang Anda pilih untuk subbidang vektor, dan versi Milvus yang digunakan oleh koleksi Anda.</p>
<h2 id="Limits-at-a-glance" class="common-anchor-header">Sekilas tentang batasan<button data-href="#Limits-at-a-glance" class="anchor-icon" translate="no">
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
<tr><th>Area</th><th>Batasan</th></tr>
</thead>
<tbody>
<tr><td>Bentuk skema</td><td>Sebuah Struct hanya dapat digunakan sebagai tipe elemen dari bidang Array. Struct tidak didukung sebagai bidang koleksi tingkat atas.</td></tr>
<tr><td>Skema subbidang</td><td>Semua elemen Struct dalam bidang StructArray yang sama berbagi satu skema Struct yang telah ditentukan sebelumnya.</td></tr>
<tr><td>Kapasitas</td><td><code translate="no">max_capacity</code> diperlukan dan membatasi jumlah elemen Struct yang dapat disimpan oleh satu entitas dalam bidang StructArray.</td></tr>
<tr><td>Perubahan subbidang</td><td>Setelah bidang StructArray dibuat, Anda tidak dapat menambahkan subbidang ke bidang StructArray yang sudah ada tersebut.</td></tr>
<tr><td>Jalur subbidang</td><td>Gunakan jalur <code translate="no">structArray[subfield]</code>, seperti <code translate="no">chunks[emb]</code>, untuk indeks, target pencarian, bidang keluaran, dan filter. Jangan gunakan <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Bentuk penyisipan</td><td>Sisipkan bidang StructArray sebagai array objek. Jangan gunakan sintaks jalur di dalam muatan penyisipan.</td></tr>
<tr><td>Indeks vektor</td><td>Bidang vektor atau subbidang vektor hanya menerima satu indeks. Gunakan subbidang vektor terpisah untuk pencarian EmbeddingList dan pencarian tingkat elemen.</td></tr>
<tr><td>Fungsi</td><td>Fungsi bidang tidak didukung untuk bidang atau subbidang di dalam bidang StructArray.</td></tr>
<tr><td>Bidang yang dapat bernilai null</td><td>Bidang StructArray yang dapat bernilai null bergantung pada versi. Jika didukung, nilai null berlaku untuk seluruh bidang StructArray, bukan untuk setiap elemen Struct secara terpisah.</td></tr>
<tr><td>Menambahkan bidang secara dinamis</td><td>Penambahan bidang StructArray ke koleksi yang sudah ada bergantung pada versi dan mengharuskan bidang yang ditambahkan bersifat nullable.</td></tr>
</tbody>
</table>
<h2 id="Schema-limits" class="common-anchor-header">Batasan skema<button data-href="#Schema-limits" class="anchor-icon" translate="no">
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
<tr><th>Batasan</th><th>Rincian</th></tr>
</thead>
<tbody>
<tr><td>Struct bukanlah tipe bidang tingkat atas.</td><td>Buat bidang StructArray sebagai ` <code translate="no">datatype=DataType.ARRAY</code> ` dengan ` <code translate="no">element_type=DataType.STRUCT</code> ` dan ` <code translate="no">struct_schema</code>`.</td></tr>
<tr><td>Semua elemen berbagi satu skema.</td><td>Setiap elemen Struct dalam bidang StructArray mengikuti daftar subbidang dan tipe data subbidang yang sama.</td></tr>
<tr><td><code translate="no">max_capacity</code> diperlukan.</td><td>Jumlah elemen Struct dalam satu entitas tidak boleh melebihi <code translate="no">max_capacity</code> yang dikonfigurasi untuk bidang StructArray.</td></tr>
<tr><td>Subfield yang ada bersifat tetap.</td><td>Anda tidak dapat menambahkan subfield baru ke bidang StructArray yang sudah ada. Untuk mengubah skema subfield, hapus bidang StructArray tersebut dan tambahkan kembali dengan skema yang telah diperbarui.</td></tr>
<tr><td>StructArray bersarang tidak didukung.</td><td>Bidang StructArray tidak dapat berisi subbidang <code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code>, atau <code translate="no">ArrayOfStruct</code> yang bersarang.</td></tr>
<tr><td>Fungsi tidak didukung di dalam StructArray.</td><td>Jangan mendefinisikan fungsi bidang untuk bidang StructArray atau subbidangnya.</td></tr>
</tbody>
</table>
<p>Untuk contoh pembuatan skema, lihat <a href="/docs/id/create-structarray-field.md">Membuat Bidang StructArray</a>.</p>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">Tipe data subbidang yang didukung<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Subbidang StructArray dipetakan ke penyimpanan fisik bergaya array. Tabel berikut mencantumkan tipe fisik yang didukung dan tidak didukung.</p>
<table>
<thead>
<tr><th>Tipe fisik subbidang Struct</th><th>Didukung</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>Didukung</td><td>Tentukan subbidang sebagai ` <code translate="no">DataType.BOOL</code>`.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code>, atau <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.FLOAT</code> atau <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.VARCHAR</code> dan tetapkan <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.FLOAT_VECTOR</code> dan tetapkan <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.FLOAT16_VECTOR</code> dan atur <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.BFLOAT16_VECTOR</code> dan atur <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.INT8_VECTOR</code> dan atur <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.BINARY_VECTOR</code> dan atur <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Tidak didukung</td><td>Subbidang vektor sparse tidak didukung dalam bidang StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Tidak didukung</td><td>Gunakan " <code translate="no">VARCHAR</code>", bukan " <code translate="no">String</code>".</td></tr>
<tr><td><code translate="no">Array</code></td><td>Tidak didukung</td><td>Subbidang JSON tidak didukung dalam bidang StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Tidak didukung</td><td>Subbidang geometri dan fungsi GIS tidak didukung dalam bidang StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Tidak didukung</td><td>Subbidang teks tidak didukung dalam bidang StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Tidak didukung</td><td>Subbidang timestamptz dan ekspresi berbasis waktu tidak didukung dalam bidang StructArray.</td></tr>
<tr><td><code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code>, atau <code translate="no">ArrayOfStruct</code></td><td>Tidak didukung</td><td>Bidang StructArray tidak mendukung subbidang array bersarang, array vektor, Struct, atau Array-of-Struct.</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">Batasan skema nullable dan dinamis<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Perilaku StructArray yang dapat bernilai null dan penambahan bidang StructArray dinamis bergantung pada versi.</p>
<table>
<thead>
<tr><th>Kemampuan</th><th>Batasan</th></tr>
</thead>
<tbody>
<tr><td>Bidang StructArray yang dapat bernilai null</td><td>Hanya didukung pada versi yang mencakup dukungan StructArray yang dapat bernilai null dan dukungan array vektor yang dapat bernilai null.</td></tr>
<tr><td>Nilai null dalam Python</td><td>Gunakan ` <code translate="no">None</code> ` untuk menyisipkan nilai StructArray null di Python. Jangan gunakan ` <code translate="no">Null</code> ` atau ` <code translate="no">null</code>`.</td></tr>
<tr><td>Cakupan nilai null</td><td>Null berlaku untuk seluruh bidang StructArray. Misalnya, <code translate="no">chunks=None</code> hanya valid jika <code translate="no">chunks</code> dapat bernilai null.</td></tr>
<tr><td>Nilai StructArray yang sebagian null</td><td>Jika bidang StructArray berisi nilai array yang valid, jangan mencampurkan array subbidang null dengan array subbidang yang valid dalam nilai yang sama.</td></tr>
<tr><td>Penambahan dinamis bidang StructArray</td><td>Penambahan bidang StructArray ke koleksi yang sudah ada hanya didukung pada versi yang menyertakan dukungan bidang StructArray dinamis.</td></tr>
<tr><td>Persyaratan nullable untuk penambahan dinamis</td><td>Bidang StructArray yang ditambahkan ke koleksi yang sudah ada harus dapat bernilai null karena entitas yang sudah ada tidak memiliki nilai untuk bidang baru tersebut.</td></tr>
<tr><td>Entitas yang sudah ada setelah penambahan dinamis</td><td>Entitas yang sudah ada mengembalik <code translate="no">null</code> untuk bidang StructArray yang ditambahkan di seluruh subbidangnya.</td></tr>
</tbody>
</table>
<p>Di Milvus v3.0.x, bidang StructArray yang dapat bernilai null, array vektor yang dapat bernilai null, dan penambahan bidang StructArray dinamis tersedia.</p>
<p>Untuk contoh penyisipan dengan bidang StructArray yang dapat bernilai null, lihat <a href="/docs/id/insert-data-into-structarray-fields.md">Menyisipkan Data ke dalam Bidang StructArray</a>.</p>
<h2 id="Insert-limits" class="common-anchor-header">Batas penyisipan<button data-href="#Insert-limits" class="anchor-icon" translate="no">
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
<tr><th>Batas</th><th>Rincian</th></tr>
</thead>
<tbody>
<tr><td>Bentuk muatan</td><td>Sisipkan bidang StructArray sebagai array objek Struct, seperti <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>Nama subbidang</td><td>Di dalam setiap objek Struct, gunakan nama subbidang seperti <code translate="no">text</code> dan <code translate="no">emb</code>, bukan jalur seperti <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>Kesesuaian skema</td><td>Setiap elemen Struct harus sesuai dengan skema Struct.</td></tr>
<tr><td>Kapasitas</td><td>Jumlah elemen Struct dalam satu entitas tidak boleh melebihi <code translate="no">max_capacity</code>.</td></tr>
<tr><td>Dimensi vektor</td><td>Nilai vektor harus sesuai dengan <code translate="no">dim</code> yang dikonfigurasi untuk subbidang vektornya.</td></tr>
<tr><td>Duplikasi dalam mode pencarian</td><td>Jika Anda memerlukan pencarian EmbeddingList dan pencarian tingkat elemen, tuliskan vektor ke dua subbidang vektor yang terpisah.</td></tr>
</tbody>
</table>
<h2 id="Index-and-metric-limits" class="common-anchor-header">Batas indeks dan metrik<button data-href="#Index-and-metric-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Subbidang vektor StructArray dapat diindeks untuk pencarian EmbeddingList atau pencarian tingkat elemen. Subbidang vektor yang sama tidak dapat menggunakan kedua keluarga metrik tersebut karena setiap bidang vektor atau subbidang vektor hanya menerima satu indeks.</p>
<table>
<thead>
<tr><th>Mode pencarian</th><th>Keluarga metrik</th><th>Tingkat hasil</th></tr>
</thead>
<tbody>
<tr><td>Pencarian EmbeddingList</td><td><code translate="no">MAX_SIM</code>, <code translate="no">MAX_SIM_COSINE</code>, <code translate="no">MAX_SIM_IP</code>, <code translate="no">MAX_SIM_L2</code>, atau metrik biner <code translate="no">MAX_SIM_*</code> </td><td>Hasil tingkat entitas.</td></tr>
<tr><td>Pencarian tingkat elemen</td><td>Metrik vektor biasa seperti <code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code>, <code translate="no">HAMMING</code>, atau <code translate="no">JACCARD</code></td><td>Hasil tingkat elemen yang dapat mencakup offset elemen yang cocok.</td></tr>
</tbody>
</table>
<p>Gunakan subbidang vektor terpisah jika kedua mode diperlukan. Misalnya, gunakan <code translate="no">chunks[emb_list_vector]</code> untuk pencarian EmbeddingList dan <code translate="no">chunks[emb]</code> untuk pencarian tingkat elemen.</p>
<p>Subbidang vektor StructArray dihitung sebagai subbidang vektor saat Anda merencanakan skema koleksi. Pastikan jumlah total bidang vektor dan subbidang vektor tetap dalam batas versi target dan tingkatan layanan Anda.</p>
<p>Untuk matriks tipe indeks dan tipe metrik yang didukung, lihat <a href="/docs/id/index-structarray-fields.md">Bidang StructArray Indeks</a>.</p>
<h2 id="Search-limits" class="common-anchor-header">Batas pencarian<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>Perilaku pencarian</th><th>Dukungan dan batasan</th></tr>
</thead>
<tbody>
<tr><td>Pencarian EmbeddingList Dasar</td><td>Didukung pada subbidang vektor StructArray yang diindeks dengan metrik " <code translate="no">MAX_SIM*</code> ". Mengembalikan hasil tingkat entitas.</td></tr>
<tr><td>Pencarian tingkat elemen dasar</td><td>Didukung pada subbidang vektor StructArray yang diindeks dengan metrik vektor reguler. Dapat mengembalikan offset elemen yang cocok.</td></tr>
<tr><td>Pencarian rentang</td><td>Didukung sesuai dengan mode pencarian dan dukungan indeks/metrik dari versi target. Untuk perilaku rentang pencarian hibrida pada permintaan StructArray tingkat elemen, periksa versi target Anda.</td></tr>
<tr><td>Pencarian pengelompokan</td><td>Pencarian pengelompokan tingkat elemen dapat mengembalikan offset. Perilaku pengelompokan pencarian hibrida untuk permintaan StructArray tingkat elemen bergantung pada versi.</td></tr>
<tr><td>Pencarian hibrida</td><td>Permintaan pencarian hibrida hanya dapat menyertakan permintaan subbidang vektor StructArray jika versi target mendukung kombinasi pencarian tersebut. Setiap permintaan tetap mengikuti keluarga metrik dari subbidang vektor yang diindeks.</td></tr>
<tr><td>Output offset</td><td>Offset tersedia untuk hasil pencarian tingkat elemen. Pencarian EmbeddingList mengembalikan hasil tingkat entitas dan tidak menggunakan offset elemen sebagai unit hasil utama.</td></tr>
</tbody>
</table>
<h2 id="Filter-and-operator-limits" class="common-anchor-header">Batasan filter dan operator<button data-href="#Filter-and-operator-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Penyaringan skalar StructArray ditangani oleh operator StructArray, seperti <code translate="no">element_filter</code> dan keluarga <code translate="no">MATCH_*</code>. Matriks dukungan predikat terperinci terdapat di <a href="/docs/id/struct-array-operators.md">StructArray Operators</a>.</p>
<p>Secara umum:</p>
<ul>
<li><p>Gunakan <code translate="no">$[subfield]</code> hanya di dalam operator StructArray.</p></li>
<li><p>Gunakan subbidang skalar untuk predikat skalar.</p></li>
<li><p>Jangan gunakan subbidang vektor sebagai masukan predikat skalar ` <code translate="no">$[...]</code> `.</p></li>
<li><p>Sintaks JSON path, fungsi JSON, fungsi wadah array, fungsi pencocokan teks, fungsi Geometri/GIS, dan ekspresi Timestamptz tidak didukung untuk predikat tingkat elemen StructArray.</p></li>
<li><p>Lebih disarankan menggunakan perbandingan boolean eksplisit seperti ` <code translate="no">$[has_code] == true</code> ` daripada ekspresi boolean mentah.</p></li>
</ul>
<h2 id="Related-pages" class="common-anchor-header">Halaman terkait<button data-href="#Related-pages" class="anchor-icon" translate="no">
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
<li><p>Untuk membuat bidang StructArray, baca <a href="/docs/id/create-structarray-field.md">Membuat Bidang StructArray</a>.</p></li>
<li><p>Untuk menyisipkan data, baca " <a href="/docs/id/insert-data-into-structarray-fields.md">Menyisipkan Data ke dalam Bidang StructArray</a>".</p></li>
<li><p>Untuk membuat indeks vektor dan skalar, baca " <a href="/docs/id/index-structarray-fields.md">Indeks Bidang StructArray</a>".</p></li>
<li><p>Untuk meninjau sintaks filter StructArray, baca " <a href="/docs/id/struct-array-operators.md">Operator StructArray</a>".</p></li>
</ol>
