---
id: schema-hands-on.md
title: Desain Skema Secara Langsung
summary: >-
  Sistem Information Retrieval (IR), yang juga dikenal sebagai mesin pencari,
  sangat penting untuk berbagai aplikasi AI seperti Retrieval-augmented
  generation (RAG), pencarian gambar, dan rekomendasi produk. Langkah pertama
  dalam mengembangkan sistem IR adalah merancang model data, yang melibatkan
  analisis kebutuhan bisnis, menentukan cara mengatur informasi, dan mengindeks
  data agar dapat dicari secara semantik.
---
<h1 id="Schema-Design-Hands-On" class="common-anchor-header">Desain Skema Secara Langsung<button data-href="#Schema-Design-Hands-On" class="anchor-icon" translate="no">
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
    </button></h1><p>Sistem Information Retrieval (IR), yang juga dikenal sebagai mesin pencari, sangat penting untuk berbagai aplikasi AI seperti Retrieval-augmented generation (RAG), pencarian gambar, dan rekomendasi produk. Langkah pertama dalam mengembangkan sistem IR adalah mendesain model data, yang melibatkan analisis kebutuhan bisnis, menentukan cara mengatur informasi, dan mengindeks data agar dapat dicari secara semantik.</p>
<p>Milvus mendukung pendefinisian model data melalui skema koleksi. Koleksi mengatur data yang tidak terstruktur seperti teks dan gambar, bersama dengan representasi vektornya, termasuk vektor padat dan vektor jarang dalam berbagai presisi yang digunakan untuk pencarian semantik. Selain itu, Milvus mendukung penyimpanan dan penyaringan tipe data non-vektor yang disebut "Skalar". Tipe-tipe skalar termasuk BOOL, INT8/16/32/64, FLOAT/DOUBLE, VARCHAR, JSON, dan Array.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-hands-on.png" alt="schema-hands-on" class="doc-image" id="schema-hands-on" />
   </span> <span class="img-wrapper"> <span>skema-pengalaman langsung (schema-hands-on</span> </span>)</p>
<p>Desain model data dari sistem pencarian melibatkan analisis kebutuhan bisnis dan abstraksi informasi ke dalam model data yang diekspresikan dengan skema. Misalnya, untuk mencari sepotong teks, teks tersebut harus "diindeks" dengan mengubah string literal menjadi vektor melalui "penyematan", yang memungkinkan pencarian vektor. Di luar persyaratan dasar ini, mungkin perlu untuk menyimpan properti lain seperti stempel waktu publikasi dan penulis. Metadata ini memungkinkan pencarian semantik disempurnakan melalui penyaringan, sehingga hanya menampilkan teks yang diterbitkan setelah tanggal tertentu atau oleh pengarang tertentu. Metadata ini mungkin juga perlu diambil bersama dengan teks utama, untuk menampilkan hasil pencarian dalam aplikasi. Untuk mengatur potongan-potongan teks ini, masing-masing harus diberi pengenal unik, yang dinyatakan sebagai bilangan bulat atau string. Elemen-elemen ini sangat penting untuk mencapai logika pencarian yang canggih.</p>
<p>Skema yang dirancang dengan baik sangat penting karena skema ini mengabstraksikan model data dan memutuskan apakah tujuan bisnis dapat dicapai melalui pencarian. Selain itu, karena setiap baris data yang dimasukkan ke dalam koleksi harus mengikuti skema, hal ini sangat membantu untuk menjaga konsistensi data dan kualitas jangka panjang. Dari perspektif teknis, skema yang terdefinisi dengan baik akan menghasilkan penyimpanan data kolom yang terorganisir dengan baik dan struktur indeks yang lebih bersih, yang dapat meningkatkan kinerja pencarian.</p>
<h2 id="An-Example-News-Search" class="common-anchor-header">Contoh: Pencarian Berita<button data-href="#An-Example-News-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Katakanlah kita ingin membangun pencarian untuk situs web berita dan kita memiliki korpus berita dengan teks, gambar mini, dan metadata lainnya. Pertama, kita perlu menganalisis bagaimana kita ingin memanfaatkan data tersebut untuk mendukung kebutuhan bisnis pencarian. Bayangkan kebutuhannya adalah mengambil berita berdasarkan gambar thumbnail dan ringkasan konten, dan mengambil metadata seperti info penulis dan waktu penerbitan sebagai kriteria untuk memfilter hasil pencarian. Persyaratan ini dapat dibagi lagi menjadi beberapa bagian:</p>
<ul>
<li><p>Untuk mencari gambar melalui teks, kita dapat menyematkan gambar ke dalam vektor melalui model penyematan multimodal yang dapat memetakan data teks dan gambar ke dalam ruang laten yang sama.</p></li>
<li><p>Teks ringkasan artikel disematkan ke dalam vektor melalui model penyematan teks.</p></li>
<li><p>Untuk memfilter berdasarkan waktu penerbitan, tanggal disimpan sebagai bidang skalar dan indeks diperlukan untuk bidang skalar untuk penyaringan yang efisien. Struktur data lain yang lebih kompleks seperti JSON dapat disimpan dalam bentuk skalar dan pencarian yang difilter dilakukan pada isinya (pengindeksan JSON adalah fitur yang akan datang).</p></li>
<li><p>Untuk mengambil byte thumbnail gambar dan merendernya pada halaman hasil pencarian, url gambar juga disimpan. Demikian pula untuk teks ringkasan dan judul. (Sebagai alternatif, kita dapat menyimpan data file teks dan gambar mentah sebagai bidang skalar jika diperlukan).</p></li>
<li><p>Untuk meningkatkan hasil pencarian pada teks ringkasan, kami merancang pendekatan pencarian hybrid. Untuk satu jalur pencarian, kami menggunakan model penyisipan biasa untuk menghasilkan vektor padat dari teks, seperti <code translate="no">text-embedding-3-large</code> milik OpenAI atau sumber terbuka <code translate="no">bge-large-en-v1.5</code>. Model-model ini bagus dalam merepresentasikan keseluruhan semantik teks. Cara lainnya adalah dengan menggunakan model penyematan jarang seperti BM25 atau SPLADE untuk menghasilkan vektor yang jarang, menyerupai pencarian teks lengkap yang baik dalam memahami detail dan konsep individual dalam teks. Milvus mendukung penggunaan keduanya dalam pengumpulan data yang sama berkat fitur multi-vektornya. Pencarian pada beberapa vektor dapat dilakukan dalam satu operasi <code translate="no">hybrid_search()</code>.</p></li>
<li><p>Terakhir, kita juga membutuhkan kolom ID untuk mengidentifikasi setiap halaman berita, yang secara resmi disebut sebagai "entitas" dalam terminologi Milvus. Bidang ini digunakan sebagai kunci utama (atau disingkat "pk").</p></li>
</ul>
<table>
   <tr>
     <th><p>Nama Field</p></th>
     <th><p>article_id (Kunci Primer)</p></th>
     <th><p>judul</p></th>
     <th><p>author_info</p></th>
     <th><p>publish_ts</p></th>
     <th><p>image_url</p></th>
     <th><p>image_vector</p></th>
     <th><p>ringkasan</p></th>
     <th><p>ringkasan_vektor_padat</p></th>
     <th><p>ringkasan_ringkasan_jarang_vektor</p></th>
   </tr>
   <tr>
     <td><p>Tipe</p></td>
     <td><p>INT64</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>JSON</p></td>
     <td><p>INT32</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>VEKTOR FLOAT_JARANG</p></td>
   </tr>
   <tr>
     <td><p>Indeks Kebutuhan</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N (Dukungan segera hadir)</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>Y</p></td>
   </tr>
</table>
<h2 id="How-to-Implement-the-Example-Schema" class="common-anchor-header">Cara Menerapkan Contoh Skema<button data-href="#How-to-Implement-the-Example-Schema" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-Schema" class="common-anchor-header">Membuat Skema</h3><p>Pertama, kita membuat contoh klien Milvus, yang dapat digunakan untuk menyambung ke server Milvus dan mengelola koleksi dan data.</p>
<p>Untuk menyiapkan skema, kita menggunakan <code translate="no">create_schema()</code> untuk membuat objek skema dan <code translate="no">add_field()</code> untuk menambahkan field ke dalam skema.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>

<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;author_info&quot;</span>, datatype=DataType.JSON, description=<span class="hljs-string">&quot;author information&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish timestamp&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;image_url&quot;</span>, datatype=DataType.VARCHAR,  max_length=<span class="hljs-number">500</span>, description=<span class="hljs-string">&quot;image URL&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;image_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;image vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, description=<span class="hljs-string">&quot;article summary&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;summary dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;summary sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .description(<span class="hljs-string">&quot;article id&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .description(<span class="hljs-string">&quot;article title&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;author_info&quot;</span>)
        .dataType(DataType.JSON)
        .description(<span class="hljs-string">&quot;author information&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .dataType(DataType.Int32)
        .description(<span class="hljs-string">&quot;publish timestamp&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;image_url&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">500</span>)
        .description(<span class="hljs-string">&quot;image URL&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .description(<span class="hljs-string">&quot;image vector&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .description(<span class="hljs-string">&quot;article summary&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .description(<span class="hljs-string">&quot;summary dense vector&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .description(<span class="hljs-string">&quot;summary sparse vector&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);
<span class="hljs-keyword">const</span> collectionName = <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">const</span> schema = [
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;INT64&quot;</span>, <span class="hljs-attr">is_primary</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article id&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article title&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;author_info&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;JSON&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;author information&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;publish_ts&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;INT32&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;publish timestamp&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;image_url&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">500</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;image URL&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;image vector&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article summary&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary_dense_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;summary dense vector&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;SPARSE_FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;summary sparse vector&quot;</span> },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> idField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;article_id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> titleField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;title&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 200
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> authorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;author_info&quot;,
    &quot;dataType&quot;: &quot;JSON&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> publishField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;publish_ts&quot;,
    &quot;dataType&quot;: &quot;Int32&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> imgField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;image_url&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 500
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> imgVecField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;image_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 1000
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summaryDenseField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary_dense_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 768
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summarySparseField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary_sparse_vector&quot;,
    &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 768
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$idField</span>,
        <span class="hljs-variable">$titleField</span>,
        <span class="hljs-variable">$authorField</span>,
        <span class="hljs-variable">$publishField</span>,
        <span class="hljs-variable">$imgField</span>,
        <span class="hljs-variable">$imgVecField</span>,
        <span class="hljs-variable">$summaryField</span>,
        <span class="hljs-variable">$summaryDenseField</span>,
        <span class="hljs-variable">$summarySparseField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Anda mungkin melihat argumen <code translate="no">uri</code> di <code translate="no">MilvusClient</code>, yang digunakan untuk menyambung ke server Milvus. Anda dapat mengatur argumen tersebut sebagai berikut:</p>
<ul>
<li><p>Jika Anda hanya membutuhkan basis data vektor lokal untuk data skala kecil atau pembuatan prototipe, mengatur uri sebagai file lokal, misalnya<code translate="no">./milvus.db</code>, adalah metode yang paling mudah, karena secara otomatis menggunakan <a href="/docs/id/milvus_lite.md">Milvus Lite</a> untuk menyimpan semua data dalam file ini.</p></li>
<li><p>Jika Anda memiliki data berskala besar, misalnya lebih dari satu juta vektor, Anda dapat menyiapkan server Milvus yang lebih berkinerja tinggi di <a href="/docs/id/quickstart.md">Docker atau Kubernetes</a>. Dalam pengaturan ini, gunakan alamat dan port server sebagai uri Anda, misalnya<code translate="no">http://localhost:19530</code>. Jika Anda mengaktifkan fitur autentikasi pada Milvus, gunakan "<your_username>:<your_password>" sebagai token, jika tidak, jangan setel token.</p></li>
<li><p>Jika Anda menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, layanan cloud yang dikelola sepenuhnya untuk Milvus, sesuaikan <code translate="no">uri</code> dan <code translate="no">token</code>, yang sesuai dengan Public Endpoint dan API key di Zilliz Cloud.</p></li>
</ul>
<p>Sedangkan untuk <code translate="no">auto_id</code> di <code translate="no">MilvusClient.create_schema</code>, AutoID adalah atribut dari bidang utama yang menentukan apakah akan mengaktifkan kenaikan otomatis untuk bidang utama.  Karena kami menetapkan field<code translate="no">article_id</code> sebagai kunci utama dan ingin menambahkan id artikel secara manual, kami menetapkan <code translate="no">auto_id</code> False untuk menonaktifkan fitur ini.</p>
<p>Setelah menambahkan semua field ke objek skema, objek skema kita setuju dengan entri pada tabel di atas.</p>
<h3 id="Define-Index" class="common-anchor-header">Menentukan Indeks</h3><p>Setelah mendefinisikan skema dengan berbagai bidang, termasuk metadata dan bidang vektor untuk data gambar dan ringkasan, langkah selanjutnya adalah menyiapkan parameter indeks. Pengindeksan sangat penting untuk mengoptimalkan pencarian dan pengambilan vektor, untuk memastikan kinerja kueri yang efisien. Pada bagian berikut, kita akan mendefinisikan parameter indeks untuk bidang vektor dan skalar yang ditentukan dalam koleksi.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .indexType(IndexParam.IndexType.INVERTED)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);
<span class="hljs-keyword">const</span> index_params = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;summary_dense_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;publish_ts&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">INVERTED</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;IndexParam&gt; indexes = <span class="hljs-built_in">new</span> ArrayList&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .indexType(IndexParam.IndexType.INVERTED)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
indexParams=<span class="hljs-string">&#x27;[
  {
    &quot;fieldName&quot;: &quot;image_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;summary_dense_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;summary_sparse_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;publish_ts&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;
    }
  }
]&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Setelah parameter indeks disiapkan dan diterapkan, Milvus dioptimalkan untuk menangani kueri kompleks pada data vektor dan skalar. Pengindeksan ini meningkatkan kinerja dan akurasi pencarian kemiripan di dalam koleksi, sehingga memungkinkan pengambilan artikel secara efisien berdasarkan vektor gambar dan vektor ringkasan. Dengan memanfaatkan <code translate="no">AUTOINDEX</code> untuk vektor padat, <code translate="no">SPARSE_INVERTED_INDEX</code> untuk vektor jarang, dan <code translate="no">INVERTED_INDEX</code> untuk skalar, Milvus dapat dengan cepat mengidentifikasi dan mengembalikan hasil yang paling relevan, sehingga secara signifikan meningkatkan pengalaman pengguna secara keseluruhan dan keefektifan proses pencarian data.</p>
<p>Ada banyak jenis indeks dan metrik. Untuk informasi lebih lanjut tentang mereka, Anda dapat merujuk ke <a href="/docs/id/overview.md#Index-types">jenis indeks Milvus</a> dan <a href="/docs/id/glossary.md#Metric-type">jenis metrik Milvus</a>.</p>
<h3 id="Create-Collection" class="common-anchor-header">Membuat Koleksi</h3><p>Dengan skema dan indeks yang telah ditentukan, kita membuat "collection" dengan parameter-parameter tersebut. Koleksi pada Milvus seperti tabel pada DB relasional.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(collectionName)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: index_params,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;test_collection\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Kita dapat memverifikasi bahwa koleksi telah berhasil dibuat dengan mendeskripsikan koleksi tersebut.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">collection_desc = client.describe_collection(
    collection_name=collection_name
)
<span class="hljs-built_in">print</span>(collection_desc)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">DescribeCollectionResp</span> <span class="hljs-variable">descResp</span> <span class="hljs-operator">=</span> client.describeCollection(DescribeCollectionReq.builder()
        .collectionName(collectionName)
        .build());
System.out.println(descResp);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> collection_desc = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeCollection</span>({
    <span class="hljs-attr">collection_name</span>: collection_name
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(collection_desc);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: $collection_name
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Other-Considerations" class="common-anchor-header">Pertimbangan Lain<button data-href="#Other-Considerations" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Loading-Index" class="common-anchor-header">Memuat Indeks</h3><p>Ketika membuat koleksi di Milvus, Anda dapat memilih untuk memuat indeks dengan segera atau menundanya hingga setelah memasukkan sejumlah data secara massal. Biasanya, Anda tidak perlu membuat pilihan eksplisit tentang hal ini, karena contoh di atas menunjukkan bahwa indeks secara otomatis dibuat untuk setiap data yang di-ingest langsung setelah pembuatan koleksi. Hal ini memungkinkan pencarian data yang telah di-entry dapat dilakukan dengan segera. Namun, jika Anda memiliki sisipan massal yang besar setelah pembuatan koleksi dan tidak perlu mencari data apa pun hingga titik tertentu, Anda dapat menunda pembuatan indeks dengan menghilangkan index_params dalam pembuatan koleksi dan membangun indeks dengan memanggil load secara eksplisit setelah meng-insert semua data. Cara ini lebih efisien untuk membangun indeks pada koleksi yang besar, tetapi tidak ada pencarian yang dapat dilakukan sampai memanggil load().</p>
<h3 id="How-to-Define-Data-Model-For-Multi-tenancy" class="common-anchor-header">Bagaimana Mendefinisikan Model Data Untuk Multi-penyewaan</h3><p>Konsep beberapa penyewa biasanya digunakan dalam skenario di mana satu aplikasi perangkat lunak atau layanan perlu melayani beberapa pengguna atau organisasi independen, masing-masing dengan lingkungan yang terisolasi. Hal ini sering terlihat pada komputasi awan, aplikasi SaaS (Software as a Service), dan sistem basis data. Sebagai contoh, layanan penyimpanan cloud dapat menggunakan multi-tenancy untuk memungkinkan perusahaan yang berbeda untuk menyimpan dan mengelola data mereka secara terpisah sambil berbagi infrastruktur yang sama. Pendekatan ini memaksimalkan pemanfaatan sumber daya dan efisiensi sambil memastikan keamanan dan privasi data untuk setiap penyewa.</p>
<p>Cara termudah untuk membedakan penyewa adalah dengan mengisolasi data dan sumber daya mereka satu sama lain. Setiap penyewa memiliki akses eksklusif ke sumber daya tertentu atau berbagi sumber daya dengan yang lain untuk mengelola entitas Milvus seperti basis data, koleksi, dan partisi. Ada metode khusus yang selaras dengan entitas-entitas ini untuk mengimplementasikan multi-tenancy. Anda dapat merujuk ke <a href="/docs/id/multi_tenancy.md#Multi-tenancy-strategies">halaman multi-tenancy Milvus</a> untuk informasi lebih lanjut.</p>
