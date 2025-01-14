---
id: schema.md
summary: Pelajari cara mendefinisikan skema di Milvus.
title: Mengelola Skema
---
<h1 id="Manage-Schema" class="common-anchor-header">Mengelola Skema<button data-href="#Manage-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini memperkenalkan skema di Milvus. Skema digunakan untuk mendefinisikan properti koleksi dan field-field di dalamnya.</p>
<h2 id="Field-schema" class="common-anchor-header">Skema bidang<button data-href="#Field-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Skema field adalah definisi logis dari sebuah field. Ini adalah hal pertama yang perlu Anda definisikan sebelum mendefinisikan <a href="#Collection-schema">skema koleksi</a> dan <a href="/docs/id/manage-collections.md">mengelola koleksi</a>.</p>
<p>Milvus hanya mendukung satu field kunci utama dalam sebuah koleksi.</p>
<h3 id="Field-schema-properties" class="common-anchor-header">Properti skema field</h3><table class="properties">
    <thead>
    <tr>
        <th>Properti</th>
        <th>Deskripsi</th>
        <th>Catatan</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">name</code></td>
        <td>Nama bidang dalam koleksi yang akan dibuat</td>
        <td>Tipe data: String.<br/>Wajib</td>
    </tr>
    <tr>
        <td><code translate="no">dtype</code></td>
        <td>Tipe data dari field tersebut</td>
        <td>Wajib</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Deskripsi bidang</td>
        <td>Tipe data: String.<br/>Opsional</td>
    </tr>
    <tr>
        <td><code translate="no">is_primary</code></td>
        <td>Apakah akan menetapkan bidang sebagai bidang kunci utama atau tidak</td>
        <td>Tipe data: Boolean (<code translate="no">true</code> atau <code translate="no">false</code>).<br/>Wajib untuk bidang kunci utama</td>
    </tr>
        <tr>
            <td><code translate="no">auto_id</code> (Wajib untuk bidang kunci utama)</td>
            <td>Beralih untuk mengaktifkan atau menonaktifkan alokasi ID (kunci utama) otomatis.</td>
            <td><code translate="no">True</code> atau <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (Wajib untuk bidang VARCHAR)</td>
            <td>Panjang byte maksimum untuk string yang diizinkan untuk disisipkan. Perhatikan bahwa karakter multibyte (misalnya, karakter Unicode) dapat menempati lebih dari satu byte, jadi pastikan panjang byte string yang disisipkan tidak melebihi batas yang ditentukan.</td>
            <td>[1, 65,535]</td>
        </tr>
    <tr>
        <td><code translate="no">dim</code></td>
        <td>Dimensi vektor</td>
            <td>Tipe data: Bilangan bulat &isin;[1, 32768].<br/>Wajib untuk bidang vektor yang padat. Hilangkan untuk bidang <a href="https://milvus.io/docs/sparse_vector.md">vektor</a> yang <a href="https://milvus.io/docs/sparse_vector.md">jarang</a>.</td>
    </tr>
    <tr>
        <td><code translate="no">is_partition_key</code></td>
        <td>Apakah bidang ini merupakan bidang kunci-partisi.</td>
        <td>Tipe data: Boolean (<code translate="no">true</code> atau <code translate="no">false</code>).</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-field-schema" class="common-anchor-header">Membuat skema bidang</h3><p>Untuk mengurangi kerumitan dalam penyisipan data, Milvus mengizinkan Anda untuk menentukan nilai default untuk setiap field skalar selama pembuatan skema field, tidak termasuk field kunci utama. Hal ini mengindikasikan bahwa jika Anda mengosongkan sebuah field ketika memasukkan data, nilai default yang Anda tentukan untuk field tersebut akan berlaku.</p>
<p>Membuat skema bidang biasa:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, FieldSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># The following creates a field and use it as the partition key</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Membuat skema bidang dengan nilai bidang default:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, FieldSchema

fields = [
  FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
  <span class="hljs-comment"># configure default value `25` for field `age`</span>
  FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, default_value=<span class="hljs-number">25</span>, description=<span class="hljs-string">&quot;age&quot;</span>),
  embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Supported-data-types" class="common-anchor-header">Tipe data yang didukung</h3><p><code translate="no">DataType</code> menentukan jenis data yang berisi bidang. Bidang yang berbeda mendukung tipe data yang berbeda.</p>
<ul>
<li><p>Mendukung bidang kunci utama:</p>
<ul>
<li>INT64: numpy.int64</li>
<li>VARCHAR: VARCHAR</li>
</ul></li>
<li><p>Mendukung bidang skalar:</p>
<ul>
<li>BOOL: Boolean (<code translate="no">true</code> atau <code translate="no">false</code>)</li>
<li>INT8: numpy.int8</li>
<li>INT16: numpy.int16</li>
<li>INT32: numpy.int32</li>
<li>INT64: numpy.int64</li>
<li>FLOAT: numpy.float32</li>
<li>DOUBLE: numpy.double</li>
<li>VARCHAR: VARCHAR</li>
<li>JSON: <a href="/docs/id/use-json-fields.md">JSON</a></li>
<li>Larik <a href="/docs/id/array_data_type.md">Larik</a></li>
</ul>
<p>JSON sebagai tipe data gabungan tersedia. Bidang JSON terdiri dari pasangan kunci-nilai. Setiap kunci adalah string, dan nilai dapat berupa angka, string, nilai boolean, larik, atau daftar. Untuk detailnya, lihat <a href="/docs/id/use-json-fields.md">JSON: tipe data baru</a>.</p></li>
<li><p>Mendukung bidang vektor:</p>
<ul>
<li>BINARY_VECTOR: Menyimpan data biner sebagai urutan 0 dan 1, yang digunakan untuk representasi fitur yang ringkas dalam pemrosesan gambar dan pengambilan informasi.</li>
<li>FLOAT_VECTOR: Menyimpan angka floating-point 32-bit, yang biasa digunakan dalam komputasi ilmiah dan pembelajaran mesin untuk merepresentasikan bilangan real.</li>
<li>FLOAT16_VECTOR: Menyimpan angka floating-point setengah presisi 16-bit, digunakan dalam pembelajaran mendalam dan komputasi GPU untuk efisiensi memori dan bandwidth.</li>
<li>BFLOAT16_VECTOR: Menyimpan angka floating-point 16-bit dengan presisi yang berkurang tetapi rentang eksponen yang sama dengan Float32, populer dalam deep learning untuk mengurangi kebutuhan memori dan komputasi tanpa memengaruhi akurasi secara signifikan.</li>
<li>SPARSE_FLOAT_VECTOR: Menyimpan daftar elemen bukan nol dan indeks yang sesuai, yang digunakan untuk merepresentasikan vektor jarang. Untuk informasi lebih lanjut, lihat <a href="/docs/id/sparse_vector.md">Vektor</a> Jarang.</li>
</ul>
<p>Milvus mendukung beberapa bidang vektor dalam sebuah koleksi. Untuk informasi lebih lanjut, lihat <a href="/docs/id/multi-vector-search.md">Pencarian Hibrid</a>.</p></li>
</ul>
<h2 id="Collection-schema" class="common-anchor-header">Skema koleksi<button data-href="#Collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Skema koleksi adalah definisi logis dari sebuah koleksi. Biasanya Anda perlu mendefinisikan <a href="#Field-schema">skema bidang</a> sebelum mendefinisikan skema koleksi dan <a href="/docs/id/manage-collections.md">mengelola koleksi</a>.</p>
<h3 id="Collection-schema-properties" class="common-anchor-header">Properti skema koleksi</h3><table class="properties">
    <thead>
    <tr>
        <th>Properti</th>
        <th>Deskripsi</th>
        <th>Catatan</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">field</code></td>
        <td>Bidang dalam koleksi yang akan dibuat</td>
        <td>Wajib</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Deskripsi koleksi</td>
        <td>Tipe data: String.<br/>Opsional</td>
    </tr>
    <tr>
        <td><code translate="no">partition_key_field</code></td>
        <td>Nama bidang yang dirancang untuk bertindak sebagai kunci partisi.</td>
        <td>Tipe data: String.<br/>Opsional</td>
    </tr>
    <tr>
        <td><code translate="no">enable_dynamic_field</code></td>
        <td>Apakah akan mengaktifkan skema dinamis atau tidak</td>
        <td>Tipe data: Boolean (<code translate="no">true</code> atau <code translate="no">false</code>).<br/>Opsional, nilai defaultnya adalah <code translate="no">False</code>.<br/>Untuk detail mengenai skema dinamis, lihat <a herf="enable-dynamic-field.md">Skema Dinam</a> is dan panduan pengguna untuk mengelola koleksi.</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-collection-schema" class="common-anchor-header">Membuat skema koleksi</h3><div class="alert note">
  Tentukan skema bidang sebelum menentukan skema koleksi.</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, FieldSchema, CollectionSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># Enable partition key on a field if you need to implement multi-tenancy based on the partition-key field</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Set enable_dynamic_field to True if you need to use dynamic fields. </span>
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;desc of a collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Buat koleksi dengan skema yang ditentukan:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>, connections
conn = connections.<span class="hljs-title function_">connect</span>(host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, port=<span class="hljs-number">19530</span>)
collection_name1 = <span class="hljs-string">&quot;tutorial_1&quot;</span>
collection1 = <span class="hljs-title class_">Collection</span>(name=collection_name1, schema=schema, using=<span class="hljs-string">&#x27;default&#x27;</span>, shards_num=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Anda dapat menentukan nomor pecahan dengan <code translate="no">shards_num</code>.</li>
<li>Anda dapat menentukan server Milvus tempat Anda ingin membuat koleksi dengan menentukan alias di <code translate="no">using</code>.</li>
<li>Anda dapat mengaktifkan fitur kunci partisi pada bidang dengan mengatur <code translate="no">is_partition_key</code> ke <code translate="no">True</code> pada bidang jika Anda perlu mengimplementasikan <a href="/docs/id/multi_tenancy.md">multi-tenancy berbasis kunci partisi</a>.</li>
<li>Anda dapat mengaktifkan skema dinamis dengan mengatur <code translate="no">enable_dynamic_field</code> ke <code translate="no">True</code> pada skema koleksi jika Anda perlu <a href="/docs/id/enable-dynamic-field.md">mengaktifkan field dinamis</a>.</li>
</ul>
</div>
<p><br/>
Anda juga dapat membuat koleksi dengan <code translate="no">Collection.construct_from_dataframe</code>, yang secara otomatis membuat skema koleksi dari DataFrame dan membuat koleksi.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
df = pd.DataFrame({
    <span class="hljs-string">&quot;id&quot;</span>: [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;age&quot;</span>: [random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;embedding&quot;</span>: [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;position&quot;</span>: <span class="hljs-string">&quot;test_pos&quot;</span>
})

collection, ins_res = Collection.construct_from_dataframe(
    <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    df,
    primary_field=<span class="hljs-string">&#x27;id&#x27;</span>,
    auto_id=<span class="hljs-literal">False</span>
    )
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Pelajari cara menyiapkan skema saat <a href="/docs/id/manage-collections.md">mengelola koleksi</a>.</li>
<li>Baca lebih lanjut tentang <a href="/docs/id/enable-dynamic-field.md">skema dinamis</a>.</li>
<li>Baca lebih lanjut tentang kunci-partisi di <a href="/docs/id/multi_tenancy.md">Multi-penyewaan</a>.</li>
</ul>
