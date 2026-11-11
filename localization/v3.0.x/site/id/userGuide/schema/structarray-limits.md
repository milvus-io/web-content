---
id: structarray-limits.md
title: Batasan StructArray
summary: >-
  Dukungan StructArray mencakup definisi skema, data yang dimasukkan,
  pengindeksan, mode pencarian, dan filter khusus StructArray. Gunakan halaman
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
<p>Sebagian besar batasan StructArray berasal dari salah satu dari tiga sumber: model skema StructArray, mode pencarian yang Anda pilih untuk subbidang vektor, dan versi Milvus yang digunakan oleh koleksi Anda.</p>
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
    </button></h2><p>Batasan utama StructArray adalah:</p>
<table>
<thead>
<tr><th>Area</th><th>Batasan</th></tr>
</thead>
<tbody>
<tr><td>Bentuk skema</td><td>Struct hanya dapat digunakan sebagai tipe elemen dari bidang Array. Struct tidak didukung sebagai bidang koleksi tingkat atas.</td></tr>
<tr><td>Skema subbidang</td><td>Semua elemen Struct dalam bidang StructArray yang sama berbagi satu skema Struct yang telah ditentukan sebelumnya.</td></tr>
<tr><td>Subbidang bersarang</td><td>Mulai dari Milvus 3.0.6, Struct dapat berisi subbidang skalar <code translate="no">ARRAY</code> dengan satu tingkat penyarangan. Subbidang <code translate="no">Struct</code>, <code translate="no">ArrayOfStruct</code>, dan JSON yang bersarang tidak didukung di versi mana pun.</td></tr>
<tr><td>Kapasitas</td><td><code translate="no">max_capacity</code> diperlukan dan membatasi berapa banyak elemen Struct yang dapat disimpan oleh satu entitas di bidang StructArray.</td></tr>
<tr><td>Perubahan subbidang</td><td>Mulai dari Milvus 3.0.6, Anda dapat menambahkan subbidang yang elemennya dapat bernilai null ke bidang StructArray yang sudah ada atau menghapus subbidang darinya. Versi sebelumnya mengharuskan Anda menghapus dan menambahkan kembali seluruh bidang StructArray.</td></tr>
<tr><td>Jalur subbidang</td><td>Gunakan jalur <code translate="no">structArray[subfield]</code>, seperti <code translate="no">chunks[emb]</code>, untuk indeks, target pencarian, bidang keluaran, dan filter. Jangan gunakan <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Bentuk penyisipan</td><td>Sisipkan bidang StructArray sebagai array objek. Jangan gunakan sintaks jalur di dalam muatan penyisipan.</td></tr>
<tr><td>Indeks vektor</td><td>Bidang vektor atau subbidang vektor hanya menerima satu indeks. Gunakan subbidang vektor terpisah untuk pencarian EmbeddingList dan pencarian tingkat elemen.</td></tr>
<tr><td>Fungsi</td><td>Fungsi bidang tidak didukung untuk bidang atau subbidang di dalam bidang StructArray.</td></tr>
<tr><td>Bidang yang dapat bernilai null</td><td>Bidang StructArray yang dapat bernilai null bergantung pada versi. Nilai null pada tingkat baris berlaku untuk seluruh bidang StructArray. Mulai dari Milvus 3.0.6, subbidang juga dapat mengizinkan nilai null pada elemen Struct individu: ` <code translate="no">nullable=True</code> ` pada subbidang skalar atau vektor, ` <code translate="no">element_nullable=True</code> ` pada subbidang array. Elemen Struct itu sendiri tidak dapat bernilai null.</td></tr>
<tr><td>Menambahkan bidang secara dinamis</td><td>Penambahan bidang StructArray ke koleksi yang sudah ada bergantung pada versi dan mengharuskan bidang yang ditambahkan dapat bernilai null.</td></tr>
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
    </button></h2><p>Skema StructArray memiliki batasan berikut:</p>
<table>
<thead>
<tr><th>Batasan</th><th>Rincian</th></tr>
</thead>
<tbody>
<tr><td>Struct bukanlah tipe bidang tingkat atas.</td><td>Buat bidang StructArray sebagai ` <code translate="no">datatype=DataType.ARRAY</code> ` dengan ` <code translate="no">element_type=DataType.STRUCT</code> ` dan ` <code translate="no">struct_schema</code>`.</td></tr>
<tr><td>Semua elemen berbagi satu skema.</td><td>Setiap elemen Struct dalam bidang StructArray mengikuti daftar subbidang dan tipe data subbidang yang sama.</td></tr>
<tr><td><code translate="no">max_capacity</code> diperlukan.</td><td>Jumlah elemen Struct dalam satu entitas tidak boleh melebihi <code translate="no">max_capacity</code> yang dikonfigurasi untuk bidang StructArray.</td></tr>
<tr><td>Subbidang skalar <code translate="no">ARRAY</code> memiliki <code translate="no">max_capacity</code> per subbidang.</td><td>Subbidang skalar ` <code translate="no">ARRAY</code> ` mendeklarasikan ` <code translate="no">max_capacity</code> ` untuk array dalamnya, dan Milvus akan menolak elemen `Struct` yang array dalamnya melebihi kapasitas yang dideklarasikan oleh subbidang tersebut. Nilai tidak perlu sama di seluruh subbidang. Nilai harus lebih besar dari 0 dan tidak boleh melebihi ` <code translate="no">proxy.maxArrayCapacity</code>`, yang secara default bernilai 4096.</td></tr>
<tr><td>Subfield dapat mengalami perubahan pada Milvus 3.0.6 dan versi selanjutnya.</td><td>Tambahkan subbidang yang dapat bernilai null, atau hapus subbidang berdasarkan jalurnya, seperti <code translate="no">chunks[lang]</code>. Anda tidak dapat menghapus subbidang terakhir dari bidang StructArray, bidang vektor terakhir dari koleksi, atau subbidang yang digunakan oleh Fungsi. Pada versi sebelumnya, hapus bidang StructArray dan tambahkan kembali dengan skema yang telah diperbarui.</td></tr>
<tr><td>Struct bersarang tidak didukung.</td><td>Sebuah Struct tidak boleh mengandung subfield <code translate="no">Struct</code>, <code translate="no">ArrayOfStruct</code>, atau JSON yang bersarang. Mulai dari Milvus 3.0.6, sebuah Struct dapat mengandung subfield skalar <code translate="no">ARRAY</code> dengan satu tingkat penyarangan. Subfield <code translate="no">ARRAY</code> tidak boleh berisi vektor.</td></tr>
<tr><td>Fungsi tidak didukung di dalam StructArray.</td><td>Jangan mendefinisikan fungsi bidang untuk bidang StructArray atau subbidangnya.</td></tr>
<tr><td>Properti bidang dibatasi pada bidang StructArray.</td><td>Mulai dari Milvus 3.0.6, perintah ` <code translate="no">alter_collection_field()</code> ` pada bidang StructArray atau jalur subbidang hanya menerima ` <code translate="no">mmap.enabled</code>`, ` <code translate="no">field.description</code>`, dan ` <code translate="no">warmup</code>`. Properti lain, seperti ` <code translate="no">max_capacity</code> ` dan ` <code translate="no">max_length</code>`, akan ditolak.</td></tr>
<tr><td>Analisis teks tidak didukung pada subbidang.</td><td>Pengaturan <code translate="no">enable_match</code> atau <code translate="no">enable_analyzer</code> pada subbidang Struct akan ditolak. Indeks teks hanya dibuat untuk bidang tingkat atas.</td></tr>
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
    </button></h2><p>Subbidang StructArray dipetakan ke penyimpanan fisik bergaya array. Tabel berikut mencantumkan tipe fisik yang didukung dan tidak didukung:</p>
<table>
<thead>
<tr><th>Tipe fisik subbidang Struct</th><th>Didukung</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array&lt;Bool&gt;</code></td><td>Didukung</td><td>Tentukan subbidang sebagai ` <code translate="no">DataType.BOOL</code>`.</td></tr>
<tr><td><code translate="no">Array&lt;Int8/Int16/Int32/Int64&gt;</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code>, atau <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array&lt;Float/Double&gt;</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.FLOAT</code> atau <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array&lt;VarChar&gt;</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.VARCHAR</code> dan tetapkan <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;FloatVector&gt;</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.FLOAT_VECTOR</code> dan tetapkan <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Float16Vector&gt;</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.FLOAT16_VECTOR</code> dan atur <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BFloat16Vector&gt;</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.BFLOAT16_VECTOR</code> dan atur <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Int8Vector&gt;</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.INT8_VECTOR</code> dan atur <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BinaryVector&gt;</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.BINARY_VECTOR</code> dan atur <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;SparseFloatVector&gt;</code></td><td>Tidak didukung</td><td>Subbidang vektor sparse tidak didukung dalam bidang StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;String&gt;</code></td><td>Tidak didukung</td><td>Gunakan ` <code translate="no">VARCHAR</code>`, bukan ` <code translate="no">String</code>`.</td></tr>
<tr><td><code translate="no">Array&lt;JSON&gt;</code></td><td>Tidak didukung</td><td>Subbidang JSON tidak didukung dalam bidang StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Geometry&gt;</code></td><td>Tidak didukung</td><td>Subbidang geometri dan fungsi GIS tidak didukung dalam bidang StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Text&gt;</code></td><td>Tidak didukung</td><td>Subbidang teks tidak didukung dalam bidang StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Timestamptz&gt;</code></td><td>Tidak didukung</td><td>Subbidang timestamptz dan ekspresi berbasis waktu tidak didukung di bidang StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Array&gt;</code></td><td>Didukung di Milvus 3.0.6 dan versi selanjutnya</td><td>Tentukan subbidang sebagai ` <code translate="no">DataType.ARRAY</code> ` dengan ` <code translate="no">element_type</code> ` skalar dan ` <code translate="no">max_capacity</code> ` untuk array dalam. Setiap elemen Struct kemudian menyimpan satu array dalam. Atur ` <code translate="no">nullable=True</code> ` pada subbidang untuk mengizinkan array dalam bernilai null dan ` <code translate="no">element_nullable=True</code> ` untuk mengizinkan nilai null di dalamnya.</td></tr>
<tr><td><code translate="no">Array</code> <code translate="no">Array</code>, , dari vektor, , atau <code translate="no">Array</code> <code translate="no">Array</code> <code translate="no">Struct</code> <code translate="no">ArrayOfStruct</code></td><td>Tidak didukung</td><td>Penumpukan array di dalam Struct dibatasi hingga satu tingkat, array dalam tidak dapat berisi vektor, dan subbidang Struct atau Array-of-Struct yang bersarang tidak didukung.</td></tr>
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
    </button></h2><p>Tabel berikut menjelaskan perilaku StructArray nullable dan penambahan bidang StructArray dinamis, dengan ketentuan pernyataan ketersediaan di bawah ini:</p>
<table>
<thead>
<tr><th>Kemampuan</th><th>Batasan</th></tr>
</thead>
<tbody>
<tr><td>Bidang StructArray yang dapat bernilai null</td><td>Tunduk pada pernyataan ketersediaan di bawah ini, tetapkan ` <code translate="no">nullable=True</code> ` pada induk StructArray; jangan konfigurasikan subbidang Struct sebagai nullable secara terpisah.</td></tr>
<tr><td>Nilai NULL di Python</td><td>Gunakan ` <code translate="no">None</code> ` untuk menyisipkan nilai `StructArray` yang null di Python. Jangan gunakan ` <code translate="no">Null</code> ` atau ` <code translate="no">null</code>`.</td></tr>
<tr><td>Cakupan null</td><td>NULL berlaku untuk seluruh bidang StructArray. Misalnya, <code translate="no">chunks=None</code> hanya valid jika <code translate="no">chunks</code> dapat bernilai null.</td></tr>
<tr><td>Nilai StructArray yang sebagian null</td><td>Ketika bidang StructArray berisi nilai array yang valid, jangan mencampurkan array subbidang null dengan array subbidang yang valid dalam nilai yang sama.</td></tr>
<tr><td>Null pada tingkat elemen</td><td>Didukung di Milvus 3.0.6 dan versi selanjutnya. Subbidang skalar, vektor, atau <code translate="no">ARRAY</code> dapat mengizinkan nilai null pada elemen Struct individu: <code translate="no">nullable=True</code> pada subbidang skalar atau vektor, <code translate="no">element_nullable=True</code> pada subbidang <code translate="no">ARRAY</code>. Pengaturan <code translate="no">nullable</code> tingkat baris masih berasal dari induk StructArray; pengaturan <code translate="no">nullable=True</code> pada subbidang mengaktifkan null tingkat elemen, bukan null tingkat baris.</td></tr>
<tr><td>Elemen Struct yang null</td><td>Elemen Struct itu sendiri tidak dapat bernilai null, seperti <code translate="no">[null, {...}]</code>. Atur nilai subfield elemen tersebut menjadi null sebagai gantinya.</td></tr>
<tr><td>Subfield yang dihilangkan</td><td>Mulai Milvus 3.0.6, Anda dapat mengabaikan subfield yang dapat bernilai null pada elemen Struct, dan Milvus akan menyimpan nilai null untuknya. Subfield yang tidak dapat bernilai null harus ada di setiap elemen Struct. Pada versi sebelumnya, setiap elemen Struct harus menyediakan setiap subfield.</td></tr>
<tr><td>Penambahan dinamis bidang StructArray</td><td>Tunduk pada pernyataan ketersediaan di bawah ini.</td></tr>
<tr><td>Persyaratan nullable untuk penambahan dinamis</td><td>Bidang StructArray yang ditambahkan ke koleksi yang sudah ada harus dapat bernilai null karena entitas yang sudah ada tidak memiliki nilai untuk bidang baru tersebut.</td></tr>
<tr><td>Entitas yang sudah ada setelah penambahan dinamis</td><td>Entitas yang sudah ada mengembalik <code translate="no">null</code> untuk bidang StructArray yang ditambahkan.</td></tr>
<tr><td>Subbidang penambahan dinamis</td><td>Didukung di Milvus 3.0.6 dan versi selanjutnya. Subbidang yang ditambahkan harus dibuat dengan nilai ` <code translate="no">nullable=True</code>`; subbidang ` <code translate="no">ARRAY</code> ` yang ditambahkan juga menerima nilai ` <code translate="no">element_nullable=True</code> ` untuk nilai `null` di dalam array dalam. Entitas yang sudah ada mengembalikan nilai `null` untuk subbidang baru di setiap elemen `Struct`-nya, dan entitas yang bidang `StructArray`-nya bernilai `null` tetap `null`.</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 dan rilis selanjutnya mendukung bidang StructArray yang dapat bernilai null, array vektor yang dapat bernilai null, serta penambahan bidang StructArray secara dinamis baik dalam deployment Standalone maupun Distributed. Versi Milvus sebelumnya tidak mendukung kemampuan ini.</p>
<p>Milvus 3.0.6 dan rilis selanjutnya juga mendukung nilai null pada tingkat elemen, subbidang skalar <code translate="no">ARRAY</code>, serta penambahan atau penghapusan subbidang dari bidang StructArray yang sudah ada. Kemampuan ini memerlukan Storage V2 dan tidak tersedia di koleksi eksternal.</p>
<p>Di Zilliz Cloud, fitur-fitur ini tersedia pada On-Demand Clusters yang menjalankan Milvus 3.0.0 atau versi yang lebih baru. Serving Clusters tidak mendukung fitur-fitur ini.</p>
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
    </button></h2><p>Payload penyisipan StructArray memiliki batasan berikut:</p>
<table>
<thead>
<tr><th>Batas</th><th>Rincian</th></tr>
</thead>
<tbody>
<tr><td>Bentuk muatan</td><td>Sisipkan bidang StructArray sebagai array objek Struct, seperti <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>Nama subbidang</td><td>Di dalam setiap objek Struct, gunakan nama subbidang seperti <code translate="no">text</code> dan <code translate="no">emb</code>, bukan jalur seperti <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>Kesesuaian skema</td><td>Setiap elemen Struct harus sesuai dengan skema Struct. Mulai dari Milvus 3.0.6, subfield yang dapat bernilai null dapat dihilangkan atau ditetapkan ke <code translate="no">null</code> dalam elemen Struct.</td></tr>
<tr><td>Kapasitas</td><td>Jumlah elemen Struct dalam satu entitas tidak boleh melebihi <code translate="no">max_capacity</code>.</td></tr>
<tr><td>Dimensi vektor</td><td>Nilai vektor harus sesuai dengan ` <code translate="no">dim</code> ` yang dikonfigurasi untuk subbidang vektornya.</td></tr>
<tr><td>Duplikasi mode pencarian</td><td>Jika Anda memerlukan pencarian EmbeddingList dan pencarian tingkat elemen, tulis vektor ke dua subbidang vektor yang terpisah.</td></tr>
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
    </button></h2><p>Subbidang vektor StructArray dapat diindeks untuk pencarian EmbeddingList atau pencarian tingkat elemen. Subbidang vektor yang sama tidak dapat menggunakan kedua keluarga metrik tersebut karena setiap bidang vektor atau subbidang vektor hanya menerima satu indeks. Mode pencarian menggunakan keluarga metrik berikut:</p>
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
<p>Subbidang vektor StructArray dihitung sebagai bidang vektor terhadap batas tingkat koleksi <code translate="no">proxy.maxVectorFieldNum</code>, yang secara default bernilai 10. Bidang StructArray yang subbidang vektornya merupakan satu-satunya bidang vektor dalam koleksi tersebut dianggap valid, dan penghapusan bidang tersebut akan ditolak jika hal itu akan membuat koleksi tersebut tidak memiliki bidang vektor sama sekali. Pastikan jumlah total bidang vektor dan subbidang vektor tetap dalam batas versi target dan tingkatan layanan Anda.</p>
<p>Mulai Milvus 3.0.6, subbidang vektor yang elemennya dapat bernilai null hanya mendukung pencarian tingkat elemen dengan metrik vektor biasa. Metrik <code translate="no">MAX_SIM*</code>, indeks EmbeddingList, dan pencarian EmbeddingList ditolak pada subbidang vektor yang elemennya dapat bernilai null, dan <code translate="no">AUTOINDEX</code> tidak memilih metrik <code translate="no">MAX_SIM*</code> untuk subbidang tersebut. Vektor null tidak ikut serta dalam pencarian. Indeks skalar tidak didukung pada subbidang yang memungkinkan nilai null pada elemen atau pada subbidang skalar <code translate="no">ARRAY</code>.</p>
<p>Untuk matriks jenis indeks dan jenis metrik yang didukung, lihat <a href="/docs/id/index-structarray-fields.md">Bidang StructArray Indeks</a>.</p>
<h2 id="Search-limits" class="common-anchor-header">Batasan pencarian<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Perilaku pencarian StructArray memiliki batasan berikut:</p>
<table>
<thead>
<tr><th>Perilaku pencarian</th><th>Dukungan dan batasan</th></tr>
</thead>
<tbody>
<tr><td>Pencarian EmbeddingList Dasar</td><td>Didukung pada subbidang vektor StructArray yang diindeks dengan metrik <code translate="no">MAX_SIM*</code>. Mengembalikan hasil tingkat entitas.</td></tr>
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
<li><p>Gunakan ` <code translate="no">$[subfield]</code> ` hanya di dalam operator StructArray.</p></li>
<li><p>Ekspresi filter tingkat baris juga dapat merujuk langsung ke jalur StructArray: <code translate="no">chunks[0][section]</code> untuk posisi satu elemen, <code translate="no">array_length(chunks)</code> untuk jumlah elemen, <code translate="no">array_contains(chunks[section], ...)</code> untuk nilai subbidang di seluruh elemen, dan <code translate="no">chunks is null</code> pada bidang StructArray yang dapat bernilai null.</p></li>
<li><p>Gunakan subbidang skalar untuk predikat skalar.</p></li>
<li><p>Jangan gunakan subbidang vektor sebagai masukan predikat skalar ber <code translate="no">$[...]</code>.</p></li>
</ul>
<ul>
<li>Sintaks JSON path, fungsi JSON, fungsi pencocokan teks, fungsi Geometri/GIS, dan ekspresi Timestamptz tidak didukung untuk predikat tingkat elemen StructArray. Mulai dari Milvus 3.0.6, <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code>, <code translate="no">array_contains_all</code>, dan <code translate="no">array_length</code> didukung pada <code translate="no">$[subfield]</code> untuk subfield skalar <code translate="no">ARRAY</code>, dan <code translate="no">$[subfield] is null</code> / <code translate="no">is not null</code> didukung untuk setiap jenis subfield.</li>
</ul>
<ul>
<li>Mulai dari Milvus 3.0.6, nilai subfield null dalam elemen Struct membuat predikat elemen tersebut menjadi "tidak diketahui" alih-alih "salah". <code translate="no">element_filter</code> hanya mempertahankan elemen yang predikatnya benar, sedangkan <code translate="no">MATCH_*</code> menganggap elemen "tidak diketahui" sebagai "tidak ditemukan". Untuk detailnya, lihat <a href="/docs/id/struct-array-operators.md">Operator StructArray</a>.</li>
</ul>
<ul>
<li>Lebih disarankan untuk menggunakan perbandingan boolean eksplisit seperti ` <code translate="no">$[has_code] == true</code> ` daripada ekspresi boolean biasa.</li>
</ul>
<p><a id="Import-limits"></a></p>
<h2 id="Import-and-storage-limits" class="common-anchor-header">Batas impor dan penyimpanan<button data-href="#Import-and-storage-limits" class="anchor-icon" translate="no">
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
<tr><td>Format file sumber</td><td>File JSON, JSONL, CSV, dan Parquet dapat berisi bidang StructArray. File NumPy menyimpan satu file per bidang tingkat atas dan tidak dapat menyediakan data StructArray; gunakan file JSON, CSV, atau Parquet untuk kumpulan data yang memiliki bidang StructArray. Untuk bentuk file, lihat <a href="/docs/id/prepare-source-data.md#StructArray-fields-in-source-files">Persiapan Data Sumber</a>.</td></tr>
<tr><td>Format penyimpanan</td><td>Subbidang yang dapat bernilai null dan subbidang skalar <code translate="no">ARRAY</code> memerlukan Storage V2. Storage V1 tidak dapat diakses untuk koleksi yang menggunakan subbidang ini: pembuatan koleksi dan penyisipan data mungkin tampak berhasil, tetapi data gagal saat flush, yang bukan merupakan keadaan yang didukung. Storage V3 dengan pengaturan " <code translate="no">common.storage.enableGrowingSourceFlush</code> " ke " <code translate="no">true</code> " akan menolak permintaan yang menggunakan subbidang elemen nullable atau subbidang skalar " <code translate="no">ARRAY</code> ".</td></tr>
<tr><td>Koleksi eksternal</td><td>Subbidang yang dapat bernilai null dan subbidang skalar <code translate="no">ARRAY</code> tidak didukung dalam koleksi eksternal.</td></tr>
<tr><td>Impor cadangan dan snapshot</td><td>Impor binlog, seperti pemulihan cadangan, dan impor dari sumber snapshot akan ditolak untuk koleksi yang memiliki subfield yang dapat bernilai null atau subfield skalar <code translate="no">ARRAY</code>.</td></tr>
<tr><td>Penurunan versi</td><td>Koleksi yang memiliki subbidang dengan elemen nullable atau subbidang skalar <code translate="no">ARRAY</code> tidak dapat dijalankan pada rilis yang lebih lama dari Milvus 3.0.6. Memutar ulang log write-ahead pada rilis yang lebih lama akan menyebabkan sistem macet. Mengupgrade kembali ke Milvus 3.0.6 atau yang lebih baru akan memulihkan data.</td></tr>
</tbody>
</table>
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
<li><p>Untuk membuat bidang StructArray, baca <a href="/docs/id/create-structarray-field.md">Buat Bidang StructArray</a>.</p></li>
<li><p>Untuk menyisipkan data, baca " <a href="/docs/id/insert-data-into-structarray-fields.md">Menyisipkan Data ke Bidang StructArray</a>".</p></li>
<li><p>Untuk membuat indeks vektor dan skalar, baca " <a href="/docs/id/index-structarray-fields.md">Indeks Bidang StructArray</a>".</p></li>
<li><p>Untuk meninjau sintaks filter StructArray, baca " <a href="/docs/id/struct-array-operators.md">Operator StructArray</a>".</p></li>
</ol>
