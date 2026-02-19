---
id: schema.md
title: Penjelasan Skema
summary: >-
  Skema mendefinisikan struktur data koleksi. Sebelum membuat koleksi, Anda
  perlu membuat desain skemanya. Halaman ini membantu Anda memahami skema
  koleksi dan merancang contoh skema sendiri.
---
<h1 id="Schema-Explained" class="common-anchor-header">Penjelasan Skema<button data-href="#Schema-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Skema mendefinisikan struktur data koleksi. Sebelum membuat koleksi, Anda perlu membuat desain skemanya. Halaman ini membantu Anda memahami skema koleksi dan merancang contoh skema sendiri.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Di Milvus, skema koleksi menyusun tabel dalam basis data relasional, yang mendefinisikan bagaimana Milvus mengatur data di dalam koleksi.</p>
<p>Skema yang dirancang dengan baik sangat penting karena skema ini mengabstraksikan model data dan memutuskan apakah Anda dapat mencapai tujuan bisnis melalui pencarian. Selain itu, karena setiap baris data yang dimasukkan ke dalam koleksi harus mengikuti skema, hal ini membantu menjaga konsistensi data dan kualitas jangka panjang. Dari perspektif teknis, skema yang terdefinisi dengan baik akan menghasilkan penyimpanan data kolom yang terorganisir dengan baik dan struktur indeks yang lebih bersih, sehingga meningkatkan kinerja pencarian.</p>
<p>Skema koleksi memiliki kunci utama, setidaknya satu bidang vektor, dan beberapa bidang skalar. Diagram berikut ini mengilustrasikan cara memetakan artikel ke daftar bidang skema.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/schema-design-anatomy.png" alt="Schema Design Anatomy" class="doc-image" id="schema-design-anatomy" />
   </span> <span class="img-wrapper"> <span>Anatomi Desain Skema</span> </span></p>
<p>Desain model data dari sistem pencarian melibatkan analisis kebutuhan bisnis dan abstraksi informasi ke dalam model data yang diekspresikan dengan skema. Misalnya, pencarian sepotong teks harus "diindeks" dengan mengubah string literal menjadi vektor melalui "penyematan" dan memungkinkan pencarian vektor. Di luar persyaratan penting ini, menyimpan properti lain seperti stempel waktu publikasi dan penulis mungkin diperlukan. Metadata ini memungkinkan pencarian semantik disempurnakan melalui penyaringan, yang hanya mengembalikan teks yang diterbitkan setelah tanggal tertentu atau oleh penulis tertentu. Anda juga dapat mengambil skalar ini dengan teks utama untuk merender hasil pencarian dalam aplikasi. Masing-masing harus diberi pengenal unik untuk mengatur potongan-potongan teks ini, yang dinyatakan sebagai bilangan bulat atau string. Elemen-elemen ini sangat penting untuk mencapai logika pencarian yang canggih.</p>
<p>Lihat Panduan <a href="/docs/id/schema-hands-on.md">Praktis Desain Skema</a> untuk mengetahui cara membuat skema yang dirancang dengan baik.</p>
<h2 id="Create-Schema" class="common-anchor-header">Membuat Skema<button data-href="#Create-Schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Cuplikan kode berikut ini menunjukkan cara membuat skema.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> schema = []
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;fields&quot;: []
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-Primary-Field" class="common-anchor-header">Menambahkan Field Utama<button data-href="#Add-Primary-Field" class="anchor-icon" translate="no">
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
    </button></h2><p>Bidang utama dalam koleksi mengidentifikasi entitas secara unik. Field ini hanya menerima nilai <strong>Int64</strong> atau <strong>VarChar</strong>. Cuplikan kode berikut ini menunjukkan cara menambahkan field utama.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,
    datatype=DataType.INT64,
<span class="highlighted-comment-line">    is_primary=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    auto_id=<span class="hljs-literal">False</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq; 

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
        .dataType(DataType.Int64)
<span class="highlighted-comment-line">        .isPrimaryKey(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .autoID(<span class="hljs-literal">false</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span></span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
<span class="highlighted-comment-line">    WithIsPrimaryKey(<span class="hljs-literal">true</span>).</span>
<span class="highlighted-comment-line">    WithIsAutoID(<span class="hljs-literal">false</span>),</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        $primaryField
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ketika menambahkan sebuah field, Anda dapat secara eksplisit mengklarifikasi field tersebut sebagai field utama dengan menyetel properti <code translate="no">is_primary</code> ke <code translate="no">True</code>. Bidang utama menerima nilai <strong>Int64</strong> secara default. Dalam kasus ini, nilai field utama harus berupa bilangan bulat yang mirip dengan <code translate="no">12345</code>. Jika Anda memilih untuk menggunakan nilai <strong>VarChar</strong> di field utama, nilainya harus berupa string yang mirip dengan <code translate="no">my_entity_1234</code>.</p>
<p>Anda juga dapat mengatur properti <code translate="no">autoId</code> ke <code translate="no">True</code> untuk membuat Milvus secara otomatis mengalokasikan nilai field utama pada saat penyisipan data.</p>
<div class="alert note">
<p>Anda disarankan untuk menggunakan <code translate="no">autoId</code> dalam semua kasus kecuali jika pengaturan kunci primer secara manual bermanfaat.</p>
</div>
<p>Untuk detailnya, lihat <a href="/docs/id/primary-field.md">Field Utama &amp; AutoId</a>.</p>
<h2 id="Add-Vector-Fields" class="common-anchor-header">Menambahkan Bidang Vektor<button data-href="#Add-Vector-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Bidang vektor menerima berbagai penyematan vektor yang jarang dan padat. Di Milvus, Anda dapat menambahkan empat bidang vektor ke sebuah koleksi. Cuplikan kode berikut ini menunjukkan bagaimana cara menambahkan bidang vektor.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">5</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
        .dataType(DataType.FloatVector)
<span class="highlighted-wrapper-line">        .dimension(<span class="hljs-number">5</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span></span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
<span class="highlighted-wrapper-line">    WithDim(<span class="hljs-number">5</span>),</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Parameter <code translate="no">dim</code> pada potongan kode di atas menunjukkan dimensi embedding vektor yang akan ditampung di bidang vektor. Nilai <code translate="no">FLOAT_VECTOR</code> menunjukkan bahwa bidang vektor menyimpan daftar angka mengambang 32-bit, yang biasanya digunakan untuk merepresentasikan antilogaritma, Selain itu, Milvus juga mendukung jenis-jenis penyematan vektor berikut ini:</p>
<ul>
<li><p><code translate="no">FLOAT16_VECTOR</code></p>
<p>Bidang vektor jenis ini menyimpan daftar bilangan mengambang setengah presisi 16-bit dan biasanya berlaku untuk skenario pembelajaran mendalam atau komputasi berbasis GPU yang dibatasi memori atau bandwidth.</p></li>
<li><p><code translate="no">BFLOAT16_VECTOR</code></p>
<p>Bidang vektor jenis ini menyimpan daftar angka floating-point 16-bit yang memiliki presisi lebih rendah namun memiliki rentang eksponen yang sama dengan Float32. Jenis data ini biasanya digunakan dalam skenario pembelajaran mendalam, karena mengurangi penggunaan memori tanpa memengaruhi akurasi secara signifikan.</p></li>
<li><p><code translate="no">INT8_VECTOR</code></p>
<p>Bidang vektor jenis ini menyimpan vektor yang terdiri dari bilangan bulat bertanda 8-bit (int8), dengan setiap komponen berkisar antara -128 hingga 127. Didesain untuk arsitektur pembelajaran mendalam yang terkuantisasi-seperti ResNet dan EfficientNet-secara substansial mengecilkan ukuran model dan meningkatkan kecepatan inferensi, namun dengan kehilangan presisi yang minimal. <strong>Catatan</strong>: Jenis vektor ini hanya didukung untuk indeks HNSW.</p></li>
<li><p><code translate="no">BINARY_VECTOR</code></p>
<p>Bidang vektor jenis ini menyimpan daftar 0 dan 1. Mereka berfungsi sebagai fitur ringkas untuk merepresentasikan data dalam pemrosesan gambar dan skenario pengambilan informasi.</p></li>
<li><p><code translate="no">SPARSE_FLOAT_VECTOR</code></p>
<p>Bidang vektor jenis ini menyimpan daftar angka bukan nol dan nomor urutnya untuk merepresentasikan penyematan vektor yang jarang.</p></li>
</ul>
<h2 id="Add-Scalar-Fields" class="common-anchor-header">Menambahkan Bidang Skalar<button data-href="#Add-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Dalam kasus yang umum, Anda dapat menggunakan bidang skalar untuk menyimpan metadata dari sematan vektor yang disimpan di Milvus, dan melakukan pencarian JST dengan pemfilteran metadata untuk meningkatkan ketepatan hasil pencarian. Milvus mendukung beberapa jenis bidang skalar, termasuk <strong>VarChar</strong>, <strong>Boolean</strong>, <strong>Int</strong>, <strong>Float</strong>, dan <strong>Double</strong>.</p>
<h3 id="Add-String-Fields" class="common-anchor-header">Menambahkan Bidang String<button data-href="#Add-String-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Di Milvus, Anda dapat menggunakan field VarChar untuk menyimpan string. Untuk mengetahui lebih lanjut tentang bidang VarChar, lihat <a href="/docs/id/string.md">Bidang String</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,
    datatype=DataType.VARCHAR,
<span class="highlighted-wrapper-line">    max_length=<span class="hljs-number">512</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)
        .dataType(DataType.VarChar)
<span class="highlighted-wrapper-line">        .maxLength(<span class="hljs-number">512</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span></span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_varchar&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">512</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> varCharField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_varchar&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Number-Fields" class="common-anchor-header">Menambahkan Bidang Angka<button data-href="#Add-Number-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Jenis-jenis angka yang didukung Milvus adalah <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, dan <code translate="no">Double</code>. Untuk informasi lebih lanjut tentang bidang angka, lihat <a href="/docs/id/number.md">Bidang Angka</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_int64&quot;</span>,
    datatype=DataType.INT64,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_int64&quot;</span>)
        .dataType(DataType.Int64)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_int64&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_int64&quot;</span>).
    WithDataType(entity.FieldTypeInt64),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> int64Field=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_int64&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Boolean-Fields" class="common-anchor-header">Menambahkan Bidang Boolean<button data-href="#Add-Boolean-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus mendukung bidang boolean. Cuplikan kode berikut ini mendemonstrasikan cara menambahkan field boolean.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_bool&quot;</span>,
    datatype=DataType.BOOL,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_bool&quot;</span>)
        .dataType(DataType.Bool)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_bool&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Boolean</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_bool&quot;</span>).
    WithDataType(entity.FieldTypeBool),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> boolField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_bool&quot;,
    &quot;dataType&quot;: &quot;Boolean&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$boolField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-Composite-Fields" class="common-anchor-header">Menambahkan Bidang Komposit<button data-href="#Add-Composite-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Di Milvus, bidang komposit adalah bidang yang dapat dibagi menjadi subbidang yang lebih kecil, seperti kunci dalam bidang JSON atau indeks dalam bidang Larik.</p>
<h3 id="Add-JSON-fields" class="common-anchor-header">Menambahkan bidang JSON<button data-href="#Add-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Bidang JSON biasanya menyimpan data JSON setengah terstruktur. Untuk mengetahui lebih lanjut tentang bidang JSON, lihat <a href="/docs/id/json-field">Bidang JSON</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_json&quot;</span>,
    datatype=DataType.JSON,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_json&quot;</span>)
        .dataType(DataType.JSON)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_json&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_json&quot;</span>).
    WithDataType(entity.FieldTypeJSON),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> jsonField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_json&quot;,
    &quot;dataType&quot;: &quot;JSON&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$boolField</span>,
        <span class="hljs-variable">$jsonField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Array-Fields" class="common-anchor-header">Menambahkan Bidang Array<button data-href="#Add-Array-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Bidang array menyimpan daftar elemen. Tipe data dari semua elemen di dalam bidang array harus sama. Untuk mengetahui lebih lanjut tentang bidang array, lihat <a href="/docs/id/array_data_type.md">Bidang Array</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_array&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.VARCHAR,
    max_capacity=<span class="hljs-number">5</span>,
    max_length=<span class="hljs-number">512</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_array&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.VarChar)
        .maxCapacity(<span class="hljs-number">5</span>)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_array&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_array&quot;</span>).
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeInt64).
    WithMaxLength(<span class="hljs-number">512</span>).
    WithMaxCapacity(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> arrayField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_array&quot;,
    &quot;dataType&quot;: &quot;Array&quot;,
    &quot;elementDataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$boolField</span>,
        <span class="hljs-variable">$jsonField</span>,
        <span class="hljs-variable">$arrayField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
