---
id: mmap.md
title: Gunakan mmap
summary: >-
  Pemetaan memori (Mmap) memungkinkan akses memori langsung ke berkas-berkas
  berukuran besar di disk, sehingga Milvus dapat menyimpan indeks dan data baik
  di memori maupun di hard drive. Pendekatan ini membantu mengoptimalkan
  kebijakan penempatan data berdasarkan frekuensi akses, sekaligus memperluas
  kapasitas penyimpanan untuk koleksi tanpa secara signifikan memengaruhi
  kinerja pencarian. Halaman ini membantu Anda memahami bagaimana Milvus
  menggunakan mmap untuk memungkinkan penyimpanan dan pengambilan data yang
  cepat dan efisien.
---
<h1 id="Use-mmap" class="common-anchor-header">Gunakan mmap<button data-href="#Use-mmap" class="anchor-icon" translate="no">
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
    </button></h1><p>Pemetaan memori (mmap) memungkinkan akses langsung ke memori untuk file berukuran besar di disk, sehingga Milvus dapat menyimpan indeks dan data baik di memori maupun di hard drive. Pendekatan ini membantu mengoptimalkan kebijakan penempatan data berdasarkan frekuensi akses, memperluas kapasitas penyimpanan untuk koleksi tanpa secara signifikan memengaruhi kinerja pencarian. Halaman ini membantu Anda memahami bagaimana Milvus menggunakan mmap untuk memungkinkan penyimpanan dan pengambilan data yang cepat dan efisien.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menggunakan koleksi untuk mengatur embedding vektor dan metadata-nya, dan setiap baris dalam koleksi mewakili sebuah entitas. Seperti yang ditunjukkan pada gambar di sebelah kiri di bawah ini, bidang vektor menyimpan embedding vektor, sedangkan bidang skalar menyimpan metadata-nya. Saat Anda telah membuat indeks pada bidang tertentu dan memuat koleksi, Milvus akan memuat indeks yang dibuat serta data mentah bidang ke dalam memori.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/mmap-illustrated.png" alt="Mmap Illustrated" class="doc-image" id="mmap-illustrated" /> 
   <span>Ilustrasi mmap</span>
  
 </span></p>
<p>Milvus adalah sistem basis data yang intensif memori, dan ukuran memori yang tersedia menentukan kapasitas suatu koleksi. Memuat bidang yang berisi volume data besar ke dalam memori tidak mungkin dilakukan jika ukuran data melebihi kapasitas memori, yang umumnya terjadi pada aplikasi berbasis AI.</p>
<p>Untuk mengatasi masalah tersebut, Milvus memperkenalkan mmap guna menyeimbangkan pemuatan data "hot" dan "cold" dalam koleksi. Seperti yang ditunjukkan pada gambar di sebelah kanan di atas, Anda dapat mengonfigurasi Milvus untuk memetakan data mentah pada bidang tertentu ke memori alih-alih memuatnya sepenuhnya ke dalam memori. Dengan cara ini, Anda dapat memperoleh akses memori langsung ke bidang-bidang tersebut tanpa perlu khawatir tentang masalah memori dan memperluas kapasitas koleksi.</p>
<p>Dengan membandingkan prosedur penempatan data pada gambar kiri dan kanan, Anda dapat menyimpulkan bahwa penggunaan memori pada gambar kiri jauh lebih tinggi daripada pada gambar kanan. Dengan mmap diaktifkan, data yang seharusnya dimuat ke dalam memori dialihkan ke hard drive dan disimpan dalam cache halaman sistem operasi, sehingga mengurangi penggunaan memori. Namun, kegagalan cache hit dapat mengakibatkan penurunan kinerja. Untuk detailnya, lihat <a href="https://en.wikipedia.org/wiki/Mmap">artikel ini</a>.</p>
<p>Saat Anda mengonfigurasi mmap di Milvus, ada prinsip yang harus selalu Anda patuhi: Selalu jaga agar data dan indeks yang sering diakses tetap dimuat sepenuhnya ke dalam memori, dan gunakan mmap untuk data dan indeks di bidang-bidang lainnya.</p>
<h2 id="Use-mmap-in-Milvus" class="common-anchor-header">Menggunakan mmap di Milvus<button data-href="#Use-mmap-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menyediakan pengaturan mmap hierarkis pada tingkat global, bidang, indeks, dan koleksi, di mana tingkat indeks dan bidang memiliki prioritas lebih tinggi daripada tingkat koleksi, dan tingkat koleksi lebih tinggi daripada tingkat global.</p>
<h3 id="Global-mmap-settings" class="common-anchor-header">Pengaturan mmap global<button data-href="#Global-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Pengaturan tingkat klaster adalah pengaturan global dan memiliki prioritas terendah. Milvus menyediakan beberapa pengaturan terkait mmap di <code translate="no">milvus.yaml</code>. Pengaturan ini akan berlaku untuk semua koleksi di klaster.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">mmap:</span>
    <span class="hljs-attr">scalarField:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">scalarIndex:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">vectorField:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">vectorIndex:</span> <span class="hljs-literal">false</span>
    <span class="hljs-comment"># The following should be a path on a high-performance disk</span>
    <span class="hljs-attr">mmapDirPath:</span> <span class="hljs-string">any/valid/path</span> 
<span class="hljs-string">....</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Konfigurasi Item</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Nilai Default</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.scalarField</code></p></td>
     <td><p>Menentukan apakah data mentah dari semua bidang skalar akan dimapping ke memori. Mengatur ini ke <code translate="no">true</code> membuat Milvus memapping data mentah bidang skalar dari sebuah koleksi ke memori, alih-alih memuatnya sepenuhnya saat menerima permintaan pemuatan terhadap koleksi tersebut.</p></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.scalarIndex</code></p></td>
     <td><p>Menentukan apakah semua indeks bidang skalar akan dimapping ke memori. Mengatur nilai ini ke ` <code translate="no">true</code> ` membuat Milvus memetakan indeks bidang skalar dari suatu koleksi ke memori, alih-alih memuatnya sepenuhnya saat menerima permintaan pemuatan terhadap koleksi tersebut.</p><p>Saat ini, hanya bidang skalar yang menggunakan tipe indeks berikut yang didukung:</p><ul><li>INVERTED</li></ul></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.vectorField</code></p></td>
     <td><p>Menentukan apakah data mentah dari semua bidang vektor akan dimapping ke memori. Mengatur nilai ini ke ` <code translate="no">true</code> ` membuat Milvus memetakan data mentah bidang vektor dari suatu koleksi ke memori, alih-alih memuatnya sepenuhnya saat menerima permintaan pemuatan terhadap koleksi tersebut.</p></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.vectorIndex</code></p></td>
     <td><p>Menentukan apakah semua indeks bidang vektor akan dimapping ke memori. Mengatur nilai ini ke ` <code translate="no">true</code> ` membuat Milvus memetakan indeks bidang vektor dari suatu koleksi ke memori, alih-alih memuatnya sepenuhnya saat menerima permintaan pemuatan terhadap koleksi tersebut.</p><p>Saat ini, hanya bidang vektor yang menggunakan jenis indeks berikut yang didukung:</p><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>HNSW</p></li><li><p>SCANN</p></li><li><p>SPARSE_INVERTED_INDEX</p></li><li><p>SPARSE_WAND</p></li></ul></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.mmapDirPath</code></p></td>
     <td><p>Menentukan jalur ke berkas yang dipetakan ke memori. Nilai default akan diterapkan jika parameter ini tidak ditentukan. </p><p>Tanda tempat " <code translate="no">localStorage.path</code> " dalam nilai default menunjukkan hard drive pada Milvus QueryNodes. Pastikan QueryNodes Anda dilengkapi dengan hard drive berkinerja tinggi untuk memaksimalkan manfaat mmap.</p></td>
     <td><p><code translate="no">{localStorage.path}/mmap</code></p></td>
   </tr>
</table>
<p>Untuk menerapkan pengaturan di atas ke kluster Milvus Anda, ikuti langkah-langkah dalam <a href="/docs/id/configure-helm.md#Configure-Milvus-via-configuration-file">Konfigurasi Milvus dengan Helm</a> dan <a href="/docs/id/configure_operator.md">Konfigurasi Milvus dengan Milvus Operators</a>.</p>
<p>Terkadang, pengaturan mmap global tidak fleksibel saat menghadapi kasus penggunaan tertentu. Untuk menerapkan pengaturan alternatif ke koleksi tertentu atau indeksnya, pertimbangkan untuk mengonfigurasi mmap khusus untuk koleksi, bidang, atau indeks. Anda perlu merilis dan memuat koleksi sebelum perubahan pada pengaturan mmap berlaku.</p>
<h3 id="Field-specific-mmap-settings" class="common-anchor-header">Pengaturan mmap khusus bidang<button data-href="#Field-specific-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk mengonfigurasi mmap khusus bidang, Anda perlu menyertakan parameter ` <code translate="no">mmap_enabled</code> ` saat menambahkan bidang. Anda dapat mengaktifkan mmap pada bidang spesifik ini dengan mengatur parameter ini ke ` <code translate="no">True</code>`.</p>
<p>Contoh berikut menunjukkan cara mengonfigurasi mmap khusus bidang saat Anda menambahkan bidang.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN
)

schema = MilvusClient.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

schema = MilvusClient.create_schema()

<span class="hljs-comment"># Add a scalar field and enable mmap</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_chunk&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    mmap_enabled=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Alter mmap settings on a specific field</span>
<span class="hljs-comment"># The following assumes that you have a collection named `my_collection`</span>
client.alter_collection_field(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;doc_chunk&quot;</span>,
    field_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.Constant;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.*;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

Map&lt;String, String&gt; typeParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, String&gt;() {{
    put(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>);
}};
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;doc_chunk&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .typeParams(typeParams)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">req</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(req);

client.alterCollectionField(AlterCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;doc_chunk&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;true&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>=<span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TOKEN</span>=<span class="hljs-string">&quot;YOUR_TOKEN&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">await</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-variable constant_">TOKEN</span>
});

<span class="hljs-keyword">const</span> schema = [
{
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>
},
{
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;doc_chunk&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">false</span>,
}
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionFieldProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;doc_chunk&quot;</span>,
    <span class="hljs-attr">properties</span>: {<span class="hljs-string">&quot;mmap_enable&quot;</span>: <span class="hljs-literal">true</span>}
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment">#restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> idField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512
    },
    &quot;isPrimary&quot;: true,
    &quot;autoId&quot;: false
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> docChunkField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;doc_chunk&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512,
        &quot;mmap.enabled&quot;: false
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$idField</span>,
        <span class="hljs-variable">$docChunkField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/fields/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;fieldName&quot;: &quot;doc_chunk&quot;,
    &quot;fieldParams&quot;:{
        &quot;mmap.enabled&quot;: true
    }
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Pertimbangkan untuk mengaktifkan mmap pada bidang yang menyimpan data dalam volume besar. Baik bidang skalar maupun bidang vektor didukung.</p>
</div>
<p>Kemudian, Anda dapat membuat koleksi menggunakan skema yang dibuat di atas. Saat menerima permintaan untuk memuat koleksi, Milvus memetakan data mentah dari bidang ` <strong>doc_chunk</strong> ` ke dalam memori menggunakan `memory-map`.</p>
<h3 id="Index-specific-mmap-settings" class="common-anchor-header">Pengaturan mmap khusus indeks<button data-href="#Index-specific-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk mengonfigurasi mmap khusus indeks, Anda perlu menyertakan properti ` <code translate="no">mmap.enable</code> ` dalam parameter indeks saat menambahkan indeks. Anda dapat mengaktifkan mmap pada indeks khusus ini dengan mengatur properti tersebut ke ` <code translate="no">true</code>`.</p>
<p>Contoh berikut menunjukkan cara mengonfigurasi mmap khusus indeks saat Anda menambahkan indeks.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a varchar field</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>   
)

index_params = MilvusClient.prepare_index_params()

<span class="hljs-comment"># Create index on the varchar field with mmap settings</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
<span class="highlighted-wrapper-line">    params={ <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-string">&quot;false&quot;</span> }</span>
)

<span class="hljs-comment"># Change mmap settings for an index</span>
<span class="hljs-comment"># The following assumes that you have a collection named `my_collection`</span>
client.alter_index_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_name=<span class="hljs-string">&quot;title&quot;</span>,
    properties={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
        
List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(Constant.MMAP_ENABLED, <span class="hljs-literal">false</span>);
}};
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
        
client.alterIndexProperties(AlterIndexPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexName(<span class="hljs-string">&quot;title&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;true&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create index on the varchar field with mmap settings</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">false</span> }
});

<span class="hljs-comment">// Change mmap settings for an index</span>
<span class="hljs-comment">// The following assumes that you have a collection named `my_collection`</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterIndexProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-attr">properties</span>:{<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">true</span>}
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;doc_chunk&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
                &quot;mmap.enabled&quot;: true
            }
        }
    ]
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexName&quot;: &quot;doc_chunk&quot;,
    &quot;properties&quot;: {
        &quot;mmap.enabled&quot;: false
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Hal ini berlaku untuk indeks bidang vektor maupun skalar.</p>
</div>
<p>Kemudian, Anda dapat merujuk parameter indeks dalam sebuah koleksi. Saat menerima permintaan untuk memuat koleksi, Milvus memetakan indeks bidang <strong>judul</strong> ke dalam memori.</p>
<h3 id="Collection-specific-mmap-settings" class="common-anchor-header">Pengaturan mmap khusus koleksi<button data-href="#Collection-specific-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk mengonfigurasi strategi mmap di seluruh koleksi, Anda perlu menyertakan properti ` <code translate="no">mmap.enabled</code> ` dalam permintaan untuk membuat koleksi. Anda dapat mengaktifkan mmap untuk sebuah koleksi dengan mengatur properti ini ke ` <code translate="no">true</code>`.</p>
<p>Contoh berikut menunjukkan cara mengaktifkan mmap pada koleksi bernama <strong>`my_collection</strong> ` saat dibuat. Saat menerima permintaan untuk memuat koleksi, Milvus memetakan data mentah dari semua bidang ke dalam memori.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Enable mmap when creating a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    properties={ <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-string">&quot;true&quot;</span> }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">req</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>)
        .build();
client.createCollection(req);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">scheme</span>: schema,
    <span class="hljs-attr">properties</span>: { <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">false</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: {
        \&quot;mmap.enabled\&quot;: \&quot;false\&quot;
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Anda juga dapat mengubah pengaturan mmap pada koleksi yang sudah ada.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Release collection before change mmap settings</span>
client.release_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)

<span class="hljs-comment"># Ensure that the collection has already been released </span>
<span class="hljs-comment"># and run the following</span>
client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={
        <span class="hljs-string">&quot;mmap.enabled&quot;</span>: false
    }
)

<span class="hljs-comment"># Load the collection to make the above change take effect</span>
client.load_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.releaseCollection(ReleaseCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());
        
client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>)
        .build());

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());
       
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Release collection before change mmap settings</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releaseCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
});

<span class="hljs-comment">// Ensure that the collection has already been released </span>
<span class="hljs-comment">// and run the following</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">false</span>
    }
});

<span class="hljs-comment">// Load the collection to make the above change take effect</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/release&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;properties&quot;: {
        &quot;mmmap.enabled&quot;: false
    }
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Anda perlu melepaskan koleksi tersebut untuk mengubah propertinya dan memuat ulang koleksi tersebut agar perubahan berlaku.</p>
