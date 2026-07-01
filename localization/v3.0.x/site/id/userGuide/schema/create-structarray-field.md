---
id: create-structarray-field.md
title: Membuat Bidang StructArray
summary: >-
  Buatlah bidang StructArray jika suatu entitas perlu berisi daftar elemen
  terstruktur yang terurut. Bidang StructArray adalah bidang Array yang tipe
  elemennya adalah Struct. Setiap elemen Struct mengikuti skema yang sama dan
  dapat berisi subbidang skalar, subbidang vektor, atau keduanya.
---
<h1 id="Create-a-StructArray-Field" class="common-anchor-header">Membuat Bidang StructArray<button data-href="#Create-a-StructArray-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Buat bidang StructArray jika suatu entitas perlu berisi daftar terurut dari elemen-elemen terstruktur. Bidang StructArray adalah bidang Array yang tipe elemennya adalah Struct. Setiap elemen Struct mengikuti skema yang sama dan dapat berisi subbidang skalar, subbidang vektor, atau keduanya.</p>
<p>Halaman ini menunjukkan cara mendefinisikan skema Struct, menambahkannya sebagai bidang StructArray, memilih subbidang untuk pencarian dan penyaringan di kemudian hari, serta memahami aturan skema yang berlaku sebelum Anda menyisipkan atau mengindeks data.</p>
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
    </button></h2><p>Halaman ini menggunakan koleksi bernama <code translate="no">tech_articles</code>. Setiap entitas mewakili satu artikel teknis, dan bidang <code translate="no">chunks</code> menyimpan data tingkat chunk sebagai elemen Struct.</p>
<table>
<thead>
<tr><th>Bidang</th><th>Tipe</th><th>Tujuan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>Kunci utama untuk artikel.</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>Judul artikel.</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>Kategori tingkat artikel.</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Bidang vektor tingkat artikel, yang akan digunakan nanti dalam contoh pencarian hibrida.</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>Bidang StructArray yang menyimpan teks tingkat chunk, metadata, dan embedding.</td></tr>
</tbody>
</table>
<p>Bidang StructArray " <code translate="no">chunks</code> " berisi subbidang berikut.</p>
<table>
<thead>
<tr><th>Subbidang</th><th>Jenis</th><th>Tujuan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>Teks chunk.</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td>Nama bagian, seperti <code translate="no">index</code>, <code translate="no">search</code>, atau <code translate="no">filter</code>.</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>Nomor halaman atau posisi logis dari chunk tersebut.</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>Skor tingkat potongan yang digunakan dalam penyaringan skalar dan contoh rentang.</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>Apakah potongan tersebut berisi kode.</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Subbidang vektor untuk pencarian EmbeddingList dengan metrik <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Subbidang vektor untuk pencarian tingkat elemen dengan metrik vektor biasa.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Sebuah bidang vektor atau subbidang vektor hanya menerima satu indeks. Jika Anda memerlukan baik pencarian EmbeddingList maupun pencarian tingkat elemen, tentukan dua subbidang vektor terpisah. Dalam contoh ini, ` <code translate="no">chunks[emb_list_vector]</code> ` digunakan untuk pencarian EmbeddingList, dan ` <code translate="no">chunks[emb]</code> ` digunakan untuk pencarian tingkat elemen.</p>
</div>
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
    </button></h2><p>Bidang StructArray menyimpan satu nilai array untuk setiap subbidang Struct. Saat Anda mendefinisikan skema Struct, pilih tipe subbidang dari keluarga skalar dan vektor yang didukung.</p>
<table>
<thead>
<tr><th>Tipe fisik subbidang Struct</th><th>Dukungan</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>Didukung</td><td>Tentukan subbidang sebagai ` <code translate="no">DataType.BOOL</code>`.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code>, atau <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.FLOAT</code> atau <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.VARCHAR</code> dan atur <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.FLOAT_VECTOR</code> dan tetapkan <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.FLOAT16_VECTOR</code> dan atur <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.BFLOAT16_VECTOR</code> dan atur <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.INT8_VECTOR</code> dan atur <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Didukung</td><td>Tentukan subbidang sebagai <code translate="no">DataType.BINARY_VECTOR</code> dan atur <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Tidak didukung</td><td>Subbidang vektor sparce tidak didukung dalam bidang StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Tidak didukung</td><td>Gunakan <code translate="no">VARCHAR</code>, bukan <code translate="no">String</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Tidak didukung</td><td>Subbidang JSON tidak didukung dalam bidang StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Tidak didukung</td><td>Subbidang geometri dan fungsi GIS tidak didukung dalam bidang StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Tidak didukung</td><td>Subbidang teks tidak didukung dalam bidang StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Tidak didukung</td><td>Subbidang timestamptz dan ekspresi berbasis waktu tidak didukung dalam bidang StructArray.</td></tr>
<tr><td><code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code>, atau <code translate="no">ArrayOfStruct</code></td><td>Tidak didukung</td><td>Bidang StructArray tidak dapat berisi array bersarang, array vektor bersarang, bidang Struct bersarang, atau bidang Array-of-Struct bersarang.</td></tr>
</tbody>
</table>
<p>Untuk dukungan versi tertentu, perilaku nullable, dan batasan lainnya, lihat <a href="/docs/id/structarray-limits.md">Batasan StructArray</a>.</p>
<h2 id="Create-a-collection-with-a-StructArray-field" class="common-anchor-header">Buat koleksi dengan bidang StructArray<button data-href="#Create-a-collection-with-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk membuat bidang StructArray, pertama-tama tentukan skema Struct yang digunakan oleh setiap elemen. Kemudian tambahkan bidang Array dan tetapkan tipe elemennya ke Struct.</p>
<ol>
<li><p>Buat skema koleksi.</p></li>
<li><p>Tambahkan bidang tingkat koleksi, seperti kunci utama dan bidang tingkat artikel.</p></li>
<li><p>Buat skema Struct untuk elemen yang disimpan di dalam bidang StructArray.</p></li>
<li><p>Tambahkan subbidang skalar dan vektor ke skema Struct.</p></li>
<li><p>Tambahkan bidang Array dengan nilai ` <code translate="no">element_type=DataType.STRUCT</code>`.</p></li>
<li><p>Tetapkan ` <code translate="no">struct_schema</code> ` ke skema Struct.</p></li>
<li><p>Tetapkan ` <code translate="no">max_capacity</code> ` untuk membatasi jumlah elemen Struct yang dapat disimpan oleh setiap entitas di dalam bidang tersebut.</p></li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

<span class="hljs-comment"># Collection-level fields.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Struct schema used by each element in the StructArray field.</span>
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)

<span class="hljs-comment"># Vector subfield for EmbeddingList search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Vector subfield for element-level search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Add the StructArray field.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    schema=schema,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Understand-StructArray-field-paths" class="common-anchor-header">Memahami jalur bidang StructArray<button data-href="#Understand-StructArray-field-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah Anda membuat bidang StructArray, rujuk subbidangnya dengan sintaks jalur ` <code translate="no">structArray[subfield]</code> `. Gunakan sintaks ini saat Anda membuat indeks, mencari subbidang vektor, mengeluarkan subbidang, atau membuat filter skalar.</p>
<table>
<thead>
<tr><th>Jalur</th><th>Arti</th><th>Penggunaan umum</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[text]</code></td><td>Subbidang ` <code translate="no">text</code> ` di dalam setiap elemen Struct.</td><td>Bidang keluaran atau penyaringan skalar.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td>Label bagian untuk setiap chunk.</td><td>Penyaringan skalar.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td>Skor kualitas tingkat chunk.</td><td>Penyaringan skalar atau indeks skalar.</td></tr>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td>Subbidang vektor yang digunakan sebagai daftar embedding.</td><td>Pencarian EmbeddingList dengan <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td>Subbidang vektor yang digunakan oleh setiap elemen Struct secara independen.</td><td>Pencarian vektor pada tingkat elemen.</td></tr>
</tbody>
</table>
<h2 id="Make-a-StructArray-field-nullable" class="common-anchor-header">Jadikan bidang StructArray dapat bernilai null<button data-href="#Make-a-StructArray-field-nullable" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x mendukung bidang StructArray yang dapat bernilai null. Bidang StructArray yang dapat bernilai null memungkinkan suatu entitas menyimpan nilai ` <code translate="no">null</code> ` untuk seluruh bidang StructArray tersebut.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Peringatan
Bidang StructArray yang dapat bernilai null hanya tersedia di Milvus v3.0.x. Untuk bidang StructArray yang dapat bernilai null, suatu entitas dapat menyediakan nilai StructArray yang valid atau menetapkan seluruh bidang tersebut ke ` <code translate="no">null</code>`. Saat memasukkan nilai StructArray yang valid, semua subbidang harus bernilai null atau memiliki nilai yang valid. Menyisipkan entitas dengan beberapa subbidang yang ditetapkan ke null dan yang lainnya ditetapkan ke nilai yang valid akan mengakibatkan kesalahan. Untuk detailnya, lihat <a href="/docs/id/structarray-limits.md">Batasan StructArray</a>.</p>
</div>
<h2 id="Add-a-StructArray-field-to-an-existing-collection" class="common-anchor-header">Menambahkan bidang StructArray ke koleksi yang sudah ada<button data-href="#Add-a-StructArray-field-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x mendukung penambahan bidang StructArray ke koleksi yang sudah ada. Bidang StructArray yang ditambahkan harus dapat bernilai null, karena entitas yang sudah ada dalam koleksi tersebut belum memiliki nilai untuk bidang baru tersebut.</p>
<p>Untuk menambahkan bidang StructArray ke koleksi yang sudah ada, tentukan skema Struct terlebih dahulu. Kemudian panggil ` <code translate="no">add_collection_struct_field()</code> ` dan atur ` <code translate="no">nullable=True</code>`.</p>
<pre><code translate="no" class="language-python">chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Setelah bidang StructArray ditambahkan, entitas yang sudah ada akan mengembalikan ` <code translate="no">null</code> ` untuk bidang baru tersebut di seluruh subbidangnya.</p>
<p>Setelah bidang StructArray dibuat, Anda tidak dapat menambahkan subbidang baru ke bidang StructArray yang sudah ada tersebut. Jika Anda memerlukan atribut elemen tambahan di kemudian hari, panggil ` <code translate="no">drop_collection_field()</code> ` untuk menghapus bidang StructArray tersebut, lalu tambahkan bidang StructArray baru dengan skema Struct yang telah diperbarui.</p>
<pre><code translate="no" class="language-python">client.drop_collection_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=updated_chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Schema-rules" class="common-anchor-header">Aturan skema<button data-href="#Schema-rules" class="anchor-icon" translate="no">
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
<tr><th>Aturan</th><th>Penjelasan</th></tr>
</thead>
<tbody>
<tr><td>Struct digunakan sebagai tipe elemen Array.</td><td>Buat bidang StructArray sebagai bidang Array dengan <code translate="no">element_type=STRUCT</code>. Jangan buat Struct sebagai bidang koleksi tingkat atas.</td></tr>
<tr><td>Semua elemen berbagi satu skema.</td><td>Setiap elemen Struct dalam bidang StructArray yang sama mengikuti skema Struct yang telah ditentukan untuk bidang tersebut.</td></tr>
<tr><td><code translate="no">max_capacity</code> diperlukan.</td><td>Ini membatasi jumlah elemen Struct yang dapat disimpan oleh setiap entitas dalam bidang StructArray.</td></tr>
<tr><td>Hanya tipe subbidang yang didukung yang diperbolehkan.</td><td>Gunakan tipe subbidang skalar dan vektor yang didukung oleh StructArray. Jangan mendefinisikan subbidang JSON, Geometry, Text, Timestamptz, SparseFloatVector, atau subbidang Struct / Array bersarang.</td></tr>
<tr><td>Subbidang vektor memerlukan indeks sebelum pencarian.</td><td>Buat indeks pada jalur seperti <code translate="no">chunks[emb_list_vector]</code> atau <code translate="no">chunks[emb]</code> sebelum menjalankan pencarian vektor.</td></tr>
<tr><td>Satu subfield vektor memiliki satu indeks.</td><td>Jika Anda memerlukan pencarian EmbeddingList dan pencarian tingkat elemen, buat dua subbidang vektor terpisah.</td></tr>
<tr><td>Subbidang StructArray yang sudah ada bersifat tetap.</td><td>Setelah membuat bidang StructArray, jangan berharap dapat menambahkan subbidang lain ke bidang StructArray yang sama.</td></tr>
<tr><td>Fungsi tidak didukung di dalam Struct.</td><td>Jangan mendefinisikan fungsi untuk bidang atau subbidang di dalam bidang StructArray.</td></tr>
<tr><td>Subbidang skalar harus sesuai dengan kebutuhan filter.</td><td>Tambahkan bidang seperti <code translate="no">section</code>, <code translate="no">quality_score</code>, atau <code translate="no">has_code</code> hanya jika Anda perlu memfilter, mengelompokkan, atau menampilkannya nanti.</td></tr>
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
<li><p>Membuat ` <code translate="no">DataType.STRUCT</code> ` sebagai bidang koleksi tingkat atas alih-alih menggunakannya sebagai tipe elemen dari bidang `Array`.</p></li>
<li><p>Lupa menetapkan ` <code translate="no">max_capacity</code> ` pada bidang `StructArray`.</p></li>
<li><p>Mendefinisikan tipe subbidang yang tidak didukung, seperti JSON, Geometry, Text, Timestamptz, SparseFloatVector, Array bersarang, Struct bersarang, atau Array-of-Struct.</p></li>
<li><p>Menggunakan ` <code translate="no">String</code> ` sebagai tipe subbidang. Gunakan ` <code translate="no">VARCHAR</code> ` dan atur ` <code translate="no">max_length</code>`.</p></li>
<li><p>Menggunakan satu subbidang vektor untuk pencarian EmbeddingList dan pencarian tingkat elemen.</p></li>
<li><p>Hanya menambahkan subbidang vektor dan mengabaikan subbidang skalar yang diperlukan untuk penyaringan, seperti <code translate="no">section</code>, <code translate="no">quality_score</code>, atau <code translate="no">has_code</code>.</p></li>
<li><p>Memperlakukan subbidang vektor sebagai masukan predikat skalar <code translate="no">$[...]</code>. Gunakan subbidang vektor untuk pencarian vektor, dan subbidang skalar untuk predikat skalar.</p></li>
<li><p>Mengasumsikan subbidang baru dapat ditambahkan ke bidang StructArray yang sudah ada setelah bidang tersebut dibuat.</p></li>
<li><p>Menggunakan <code translate="no">chunks.emb</code> atau <code translate="no">chunks.emb_list_vector</code> alih-alih sintaks jalur yang diwajibkan <code translate="no">chunks[emb]</code> atau <code translate="no">chunks[emb_list_vector]</code>.</p></li>
<li><p>Menganggap perilaku StructArray yang dapat bernilai null tersedia di setiap versi target.</p></li>
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
<li><p>Untuk menyisipkan data bersarang ke dalam bidang StructArray, baca <a href="/docs/id/insert-data-into-structarray-fields.md">Menyisipkan Data ke dalam Bidang StructArray</a>.</p></li>
<li><p>Untuk membuat indeks vektor dan skalar, baca " <a href="/docs/id/index-structarray-fields.md">Index StructArray Fields</a>".</p></li>
<li><p>Untuk mencari subbidang vektor StructArray, baca "Pencarian Vektor Dasar dengan StructArray".</p></li>
<li><p>Untuk meninjau tipe data yang didukung, perilaku nullable, dan batasan khusus versi, baca " <a href="/docs/id/structarray-limits.md">Batasan StructArray</a>".</p></li>
</ol>
