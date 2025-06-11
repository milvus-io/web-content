---
id: sparse_vector.md
title: Vektor Jarang
summary: >-
  Vektor jarang adalah metode penting untuk menangkap pencocokan istilah tingkat
  permukaan dalam pencarian informasi dan pemrosesan bahasa alami. Meskipun
  vektor padat lebih unggul dalam pemahaman semantik, vektor jarang sering kali
  memberikan hasil pencocokan yang lebih dapat diprediksi, terutama saat mencari
  istilah khusus atau pengidentifikasi tekstual.
---

<h1 id="Sparse-Vector" class="common-anchor-header">Vektor Jarang<button data-href="#Sparse-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>Vektor jarang adalah metode penting untuk menangkap pencocokan istilah tingkat permukaan dalam pencarian informasi dan pemrosesan bahasa alami. Meskipun vektor padat lebih unggul dalam pemahaman semantik, vektor jarang sering kali memberikan hasil pencocokan yang lebih dapat diprediksi, terutama saat mencari istilah khusus atau pengidentifikasi tekstual.</p>
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
    </button></h2><p>Vektor jarang adalah vektor berdimensi tinggi khusus yang sebagian besar elemennya bernilai nol, dan hanya beberapa dimensi yang memiliki nilai bukan nol. Seperti yang ditunjukkan pada diagram di bawah ini, vektor padat biasanya direpresentasikan sebagai larik kontinu di mana setiap posisi memiliki nilai (misalnya, <code translate="no">[0.3, 0.8, 0.2, 0.3, 0.1]</code>). Sebaliknya, vektor jarang hanya menyimpan elemen non-nol dan indeks dimensinya, yang sering direpresentasikan sebagai pasangan kunci-nilai dari <code translate="no">{ index: value}</code> (misalnya, <code translate="no">[{2: 0.2}, ..., {9997: 0.5}, {9999: 0.7}]</code>).</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/sparse-vector-representation.png" alt="Sparse Vector Representation" class="doc-image" id="sparse-vector-representation" />
   </span> <span class="img-wrapper"> <span>Representasi Vektor Jarang</span> </span></p>
<p>Dengan tokenisasi dan penilaian, dokumen dapat direpresentasikan sebagai vektor kantong kata, di mana setiap dimensi berhubungan dengan kata tertentu dalam kosakata. Hanya kata-kata yang ada di dalam dokumen yang memiliki nilai bukan nol, sehingga menciptakan representasi vektor yang jarang. Vektor jarang dapat dihasilkan dengan menggunakan dua pendekatan:</p>
<ul>
<li><p><strong>Teknik statistik tradisional</strong>, seperti <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf">TF-IDF</a> (Term Frequency-Inverse Document Frequency) dan <a href="https://en.wikipedia.org/wiki/Okapi_BM25">BM25</a> (Best Matching 25), memberikan bobot pada kata-kata berdasarkan frekuensi dan kepentingannya dalam sebuah korpus. Metode-metode ini menghitung statistik sederhana sebagai skor untuk setiap dimensi, yang mewakili sebuah token.  Milvus menyediakan <strong>pencarian teks lengkap</strong> dengan metode BM25, yang secara otomatis mengubah teks menjadi vektor yang jarang, sehingga tidak memerlukan prapemrosesan manual. Pendekatan ini ideal untuk pencarian berbasis kata kunci, di mana ketepatan dan kecocokan yang tepat adalah penting. Lihat <a href="/docs/id/v2.5.x/full-text-search.md">Pencarian Teks Lengkap</a> untuk informasi lebih lanjut.</p></li>
<li><p><strong>Model penyematan jarang saraf</strong> adalah metode yang dipelajari untuk menghasilkan representasi jarang dengan melatih set data yang besar. Model ini biasanya merupakan model pembelajaran mendalam dengan arsitektur Transformer, yang mampu memperluas dan menimbang istilah berdasarkan konteks semantik. Milvus juga mendukung sematan jarang yang dihasilkan secara eksternal dari model seperti <a href="https://arxiv.org/abs/2109.10086">SPLADE</a>. Lihat <a href="/docs/id/v2.5.x/embeddings.md#Embedding-Overview">Penyematan</a> untuk detailnya.</include></p></li>
</ul>
<p>Vektor-vektor jarang dan teks asli dapat disimpan di Milvus untuk pengambilan yang efisien. Diagram di bawah ini menguraikan keseluruhan proses.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/sparse-vector-workflow.png" alt="Sparse Vector Workflow" class="doc-image" id="sparse-vector-workflow" />
   </span> <span class="img-wrapper"> <span>Alur Kerja Vektor Jarang</span> </span></p>
<div class="alert note">
<p>Selain vektor jarang, Milvus juga mendukung vektor padat dan vektor biner. Vektor padat ideal untuk menangkap hubungan semantik yang dalam, sementara vektor biner unggul dalam skenario seperti perbandingan kemiripan cepat dan deduplikasi konten. Untuk informasi lebih lanjut, lihat <a href="/docs/id/v2.5.x/dense-vector.md">Vektor Padat</a> dan <a href="/docs/id/v2.5.x/binary-vector.md">Vektor Biner</a>.</p>
</div>
<h2 id="Data-Formats" class="common-anchor-header">Format Data<button data-href="#Data-Formats" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada bagian berikut, kami mendemonstrasikan cara menyimpan vektor dari model penyematan jarang yang telah dipelajari seperti SPLADE. Jika Anda mencari sesuatu untuk melengkapi pencarian semantik berbasis vektor padat, kami merekomendasikan <a href="/docs/id/v2.5.x/full-text-search.md">Pencarian Teks Lengkap</a> dengan BM25 daripada SPLADE untuk kemudahan. Jika Anda telah melakukan evaluasi kualitas dan berdedikasi untuk menggunakan SPLADE, Anda dapat merujuk ke <a href="/docs/id/v2.5.x/embeddings.md#Embedding-Overview">Penyematan</a> tentang cara menghasilkan vektor jarang dengan SPLADE.</p>
<p>Milvus mendukung input vektor jarang dengan format berikut:</p>
<ul>
<li><p><strong>Daftar Kamus (diformat sebagai <code translate="no">{dimension_index: value, ...}</code>)</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Represent each sparse vector using a dictionary</span>
sparse_vectors = [{<span class="hljs-number">27</span>: <span class="hljs-number">0.5</span>, <span class="hljs-number">100</span>: <span class="hljs-number">0.3</span>, <span class="hljs-number">5369</span>: <span class="hljs-number">0.6</span>} , {<span class="hljs-number">100</span>: <span class="hljs-number">0.1</span>, <span class="hljs-number">3</span>: <span class="hljs-number">0.8</span>}]
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Matriks jarang (menggunakan kelas <code translate="no">scipy.sparse</code> )</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> scipy.sparse <span class="hljs-keyword">import</span> csr_matrix

<span class="hljs-comment"># First vector: indices [27, 100, 5369] with values [0.5, 0.3, 0.6]</span>
<span class="hljs-comment"># Second vector: indices [3, 100] with values [0.8, 0.1]</span>
indices = [[<span class="hljs-number">27</span>, <span class="hljs-number">100</span>, <span class="hljs-number">5369</span>], [<span class="hljs-number">3</span>, <span class="hljs-number">100</span>]]
values = [[<span class="hljs-number">0.5</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.6</span>], [<span class="hljs-number">0.8</span>, <span class="hljs-number">0.1</span>]]
sparse_vectors = [csr_matrix((values, ([<span class="hljs-number">0</span>]\*<span class="hljs-built_in">len</span>(idx), idx)), shape=(<span class="hljs-number">1</span>, <span class="hljs-number">5369</span>+<span class="hljs-number">1</span>)) <span class="hljs-keyword">for</span> idx, vals <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(indices, values)]
<button class="copy-code-btn"></button></code></pre></li>

<li><p><strong>Daftar Tuple Iterables (misalnya <code translate="no">[(dimension_index, value)]</code>)</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Represent each sparse vector using a list of iterables (e.g. tuples)</span>
sparse_vector = [
    [(<span class="hljs-number">27</span>, <span class="hljs-number">0.5</span>), (<span class="hljs-number">100</span>, <span class="hljs-number">0.3</span>), (<span class="hljs-number">5369</span>, <span class="hljs-number">0.6</span>)],
    [(<span class="hljs-number">100</span>, <span class="hljs-number">0.1</span>), (<span class="hljs-number">3</span>, <span class="hljs-number">0.8</span>)]
    ]
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Define-Collection-Schema" class="common-anchor-header">Menentukan Skema Koleksi<button data-href="#Define-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum membuat koleksi, Anda perlu menentukan skema koleksi, yang mendefinisikan bidang dan secara opsional fungsi untuk mengubah bidang teks menjadi representasi vektor jarang yang sesuai.</p>
<h3 id="Add-fields" class="common-anchor-header">Menambahkan bidang</h3><p>Untuk menggunakan vektor jarang di Milvus, Anda perlu membuat koleksi dengan skema yang mencakup bidang-bidang berikut:</p>
<ul>
<li><p>Bidang <code translate="no">SPARSE_FLOAT_VECTOR</code> yang disediakan untuk menyimpan vektor jarang, baik yang dibuat secara otomatis dari bidang <code translate="no">VARCHAR</code> atau disediakan secara langsung di dalam data masukan.</p></li>
<li><p>Biasanya, teks mentah yang diwakili oleh vektor jarang juga disimpan dalam koleksi. Anda dapat menggunakan bidang <code translate="no">VARCHAR</code> untuk menyimpan teks mentah.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(
auto_id=<span class="hljs-literal">True</span>,
enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>, enable_analyzer=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)
        .dataType(DataType.VarChar)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .maxLength(<span class="hljs-number">100</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">65535</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span>,
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;pk&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">100</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;sparse_vector&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">65535</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;pk&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;isPrimary&quot;: true,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 100
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;sparse_vector&quot;,
    &quot;dataType&quot;: &quot;SparseFloatVector&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> textField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;text&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 65535,
        &quot;enable_analyzer&quot;: true
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$textField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, tiga bidang ditambahkan:</p>
<ul>
<li><p><code translate="no">pk</code>: Bidang ini menyimpan kunci utama menggunakan tipe data <code translate="no">VARCHAR</code>, yang dibuat secara otomatis dengan panjang maksimum 100 byte.</p></li>
<li><p><code translate="no">sparse_vector</code>: Bidang ini menyimpan vektor jarang menggunakan tipe data <code translate="no">SPARSE_FLOAT_VECTOR</code>.</p></li>
<li><p><code translate="no">text</code>: Bidang ini menyimpan string teks menggunakan tipe data <code translate="no">VARCHAR</code>, dengan panjang maksimum 65535 byte.</p></li>
</ul>
<div class="alert note">
<p>Untuk mengaktifkan Milvus atau untuk menghasilkan penyematan vektor jarang dari bidang teks yang ditentukan selama penyisipan data, langkah tambahan yang melibatkan sebuah fungsi harus dilakukan. Untuk informasi lebih lanjut, silakan lihat <a href="/docs/id/v2.5.x/full-text-search.md">Pencarian Teks Lengkap</a>.</p>
</div>
<h2 id="Set-Index-Parameters" class="common-anchor-header">Mengatur Parameter Indeks<button data-href="#Set-Index-Parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Proses pembuatan indeks untuk vektor jarang mirip dengan proses pembuatan indeks untuk vektor <a href="/docs/id/v2.5.x/dense-vector.md">padat</a>, tetapi dengan perbedaan pada jenis indeks yang ditentukan (<code translate="no">index_type</code>), metrik jarak (<code translate="no">metric_type</code>), dan parameter indeks (<code translate="no">params</code>).</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,
index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># or &quot;DAAT_WAND&quot; or &quot;TAAT_NAIVE&quot;</span>
)

<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

Map&lt;String,Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>); <span class="hljs-comment">// Algorithm used for building and querying the index</span>

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .indexName(<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.IP)
        .extraParams(extraParams)
        .build());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">const</span> indexParams = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;sparse_vector&#x27;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;sparse_inverted_index&#x27;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>,
    <span class="hljs-attr">params</span>: {
      <span class="hljs-attr">inverted_index_algo</span>: <span class="hljs-string">&#x27;DAAT_MAXSCORE&#x27;</span>, 
    },
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">idx := index.NewSparseInvertedIndex(entity.IP, <span class="hljs-number">0.2</span>)
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;sparse_vector&quot;</span>, idx)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">
<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;sparse_vector&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;sparse_inverted_index&quot;,
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;,
            &quot;params&quot;:{&quot;inverted_index_algo&quot;: &quot;DAAT_MAXSCORE&quot;}
        }
    ]&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Contoh ini menggunakan tipe indeks <code translate="no">SPARSE_INVERTED_INDEX</code> dengan <code translate="no">IP</code> sebagai metrik. Untuk lebih jelasnya, lihat sumber daya berikut ini:</p>
<ul>
<li><a href="/docs/id/v2.5.x/metric.md">Jenis Metrik</a>: Jenis metrik yang didukung untuk berbagai jenis bidang</li>
</ul>
<h2 id="Create-Collection" class="common-anchor-header">Membuat Koleksi<button data-href="#Create-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah pengaturan vektor jarang dan indeks selesai, Anda dapat membuat koleksi yang berisi vektor jarang. Contoh di bawah ini menggunakan metode <code translate="no">create_collection</code> untuk membuat koleksi bernama <code translate="no">my_collection</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
<span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
<span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
<span class="hljs-attr">schema</span>: schema,
<span class="hljs-attr">index_params</span>: indexParams
});
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">Memasukkan data<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda harus menyediakan data untuk semua bidang yang ditentukan selama pembuatan koleksi, kecuali untuk bidang yang dibuat secara otomatis (seperti kunci utama dengan <code translate="no">auto_id</code> yang diaktifkan). Jika Anda menggunakan fungsi BM25 bawaan untuk menghasilkan vektor jarang secara otomatis, Anda juga harus menghilangkan bidang vektor jarang saat memasukkan data.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of study.&quot;</span>,
        <span class="hljs-string">&quot;sparse_vector&quot;</span>: {<span class="hljs-number">1</span>: <span class="hljs-number">0.5</span>, <span class="hljs-number">100</span>: <span class="hljs-number">0.3</span>, <span class="hljs-number">500</span>: <span class="hljs-number">0.8</span>}
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;information retrieval focuses on finding relevant information in large datasets.&quot;</span>,
        <span class="hljs-string">&quot;sparse_vector&quot;</span>: {<span class="hljs-number">10</span>: <span class="hljs-number">0.1</span>, <span class="hljs-number">200</span>: <span class="hljs-number">0.7</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.9</span>}
]

client.insert(
collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
data=data
)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.SortedMap;
<span class="hljs-keyword">import</span> java.util.TreeMap;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

{
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;information retrieval is a field of study.&quot;</span>);
    
    SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();
    sparse.put(<span class="hljs-number">1L</span>, <span class="hljs-number">0.5f</span>);
    sparse.put(<span class="hljs-number">100L</span>, <span class="hljs-number">0.3f</span>);
    sparse.put(<span class="hljs-number">500L</span>, <span class="hljs-number">0.8f</span>);
    row.add(<span class="hljs-string">&quot;sparse_vector&quot;</span>, gson.toJsonTree(sparse));
    rows.add(row);
}
{
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;information retrieval focuses on finding relevant information in large datasets.&quot;</span>);
    
    SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();
    sparse.put(<span class="hljs-number">10L</span>, <span class="hljs-number">0.1f</span>);
    sparse.put(<span class="hljs-number">200L</span>, <span class="hljs-number">0.7f</span>);
    sparse.put(<span class="hljs-number">1000L</span>, <span class="hljs-number">0.9f</span>);
    row.add(<span class="hljs-string">&quot;sparse_vector&quot;</span>, gson.toJsonTree(sparse));
    rows.add(row);
}

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
    {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;information retrieval is a field of study.&#x27;</span>,
        <span class="hljs-attr">sparse_vector</span>: {<span class="hljs-number">1</span>: <span class="hljs-number">0.5</span>, <span class="hljs-number">100</span>: <span class="hljs-number">0.3</span>, <span class="hljs-number">500</span>: <span class="hljs-number">0.8</span>}
    {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;information retrieval focuses on finding relevant information in large datasets.&#x27;</span>,
        <span class="hljs-attr">sparse_vector</span>: {<span class="hljs-number">10</span>: <span class="hljs-number">0.1</span>, <span class="hljs-number">200</span>: <span class="hljs-number">0.7</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.9</span>}
    },
];

client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">texts := []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;information retrieval is a field of study.&quot;</span>,
    <span class="hljs-string">&quot;information retrieval focuses on finding relevant information in large datasets.&quot;</span>,
}
textColumn := entity.NewColumnVarChar(<span class="hljs-string">&quot;text&quot;</span>, texts)

<span class="hljs-comment">// Prepare sparse vectors</span>
sparseVectors := <span class="hljs-built_in">make</span>([]entity.SparseEmbedding, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>)
sparseVector1, _ := entity.NewSliceSparseEmbedding([]<span class="hljs-type">uint32</span>{<span class="hljs-number">1</span>, <span class="hljs-number">100</span>, <span class="hljs-number">500</span>}, []<span class="hljs-type">float32</span>{<span class="hljs-number">0.5</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.8</span>})
sparseVectors = <span class="hljs-built_in">append</span>(sparseVectors, sparseVector1)
sparseVector2, _ := entity.NewSliceSparseEmbedding([]<span class="hljs-type">uint32</span>{<span class="hljs-number">10</span>, <span class="hljs-number">200</span>, <span class="hljs-number">1000</span>}, []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.9</span>})
sparseVectors = <span class="hljs-built_in">append</span>(sparseVectors, sparseVector2)
sparseVectorColumn := entity.NewColumnSparseVectors(<span class="hljs-string">&quot;sparse_vector&quot;</span>, sparseVectors)

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithColumns(
        sparseVectorColumn,
        textColumn
        
    ))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {
            &quot;text&quot;: &quot;information retrieval is a field of study.&quot;,
            &quot;sparse_vector&quot;: {&quot;1&quot;: 0.5, &quot;100&quot;: 0.3, &quot;500&quot;: 0.8}
        },
        {
            &quot;text&quot;: &quot;information retrieval focuses on finding relevant information in large datasets.&quot;,
            &quot;sparse_vector&quot;: {&quot;10&quot;: 0.1, &quot;200&quot;: 0.7, &quot;1000&quot;: 0.9}
        }     
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Perform-Similarity-Search" class="common-anchor-header">Melakukan Pencarian Kemiripan<button data-href="#Perform-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk melakukan pencarian kemiripan menggunakan vektor jarang, siapkan data kueri dan parameter pencarian.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare search parameters</span>
search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># A tunable drop ratio parameter with a valid range between 0 and 1</span>
}

<span class="hljs-comment"># Query with sparse vector</span>
query_data = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.SparseFloatVec;

<span class="hljs-comment">// Prepare search parameters</span>
Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0.2</span>);

<span class="hljs-comment">// Query with the sparse vector</span>
SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();
sparse.put(<span class="hljs-number">1L</span>, <span class="hljs-number">0.2f</span>);
sparse.put(<span class="hljs-number">50L</span>, <span class="hljs-number">0.4f</span>);
sparse.put(<span class="hljs-number">1000L</span>, <span class="hljs-number">0.7f</span>);
<span class="hljs-type">SparseFloatVec</span> <span class="hljs-variable">queryData</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SparseFloatVec</span>(sparse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Prepare search parameters</span>
annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0.2</span>)

<span class="hljs-comment">// Query with the sparse vector</span>
queryData, _ := entity.NewSliceSparseEmbedding([]<span class="hljs-type">uint32</span>{<span class="hljs-number">1</span>, <span class="hljs-number">50</span>, <span class="hljs-number">1000</span>}, []<span class="hljs-type">float32</span>{<span class="hljs-number">0.2</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.7</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Prepare search parameters</span>
<span class="hljs-keyword">const</span> searchParams = {<span class="hljs-attr">drop_ratio_search</span>: <span class="hljs-number">0.2</span>}

<span class="hljs-comment">// Query with the sparse vector</span>
<span class="hljs-keyword">const</span> queryData = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Prepare search parameters</span>
<span class="hljs-built_in">export</span> queryData=<span class="hljs-string">&#x27;[&quot;What is information retrieval?&quot;]&#x27;</span>

<span class="hljs-comment"># Query with the sparse vector</span>
<span class="hljs-built_in">export</span> queryData=<span class="hljs-string">&#x27;[{1: 0.2, 50: 0.4, 1000: 0.7}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian, jalankan pencarian kemiripan menggunakan metode <code translate="no">search</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=query_data,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>],
    search_params=search_params,
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172266&#x27;, &#x27;distance&#x27;: 0.6299999952316284, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172266&#x27;}}, {&#x27;id&#x27;: &#x27;453718927992172265&#x27;, &#x27;distance&#x27;: 0.10000000149011612, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172265&#x27;}}]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-type">SparseFloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SparseFloatVec</span>(sparse);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchR</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryData))
        .annsField(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .searchParams(searchParams)
        .topK(<span class="hljs-number">3</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;pk&quot;</span>))
        .build());
        
System.out.println(searchR.getSearchResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={pk=457270974427187729}, score=0.63, id=457270974427187729), SearchResp.SearchResult(entity={pk=457270974427187728}, score=0.1, id=457270974427187728)]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">data</span>: queryData,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;pk&#x27;</span>],
    <span class="hljs-attr">params</span>: searchParams
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-number">3</span>, <span class="hljs-comment">// limit</span>
    []entity.Vector{queryData},
).WithANNSField(<span class="hljs-string">&quot;sparse_vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;pk&quot;</span>).
    WithAnnParam(annSearchParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;Pks: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>).FieldData().GetScalars())
}

<span class="hljs-comment">// Results:</span>
<span class="hljs-comment">//   IDs:  string_data:{data:&quot;457270974427187705&quot;  data:&quot;457270974427187704&quot;}</span>
<span class="hljs-comment">//   Scores:  [0.63 0.1]</span>
<span class="hljs-comment">//   Pks:  string_data:{data:&quot;457270974427187705&quot;  data:&quot;457270974427187704&quot;}</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: $queryData,
    &quot;annsField&quot;: &quot;sparse_vector&quot;,
    &quot;limit&quot;: 3,
    &quot;searchParams&quot;: $searchParams,
    &quot;outputFields&quot;: [&quot;pk&quot;]
}&#x27;</span>

<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;distance&quot;:0.63,&quot;id&quot;:&quot;453577185629572535&quot;,&quot;pk&quot;:&quot;453577185629572535&quot;},{&quot;distance&quot;:0.1,&quot;id&quot;:&quot;453577185629572534&quot;,&quot;pk&quot;:&quot;453577185629572534&quot;}]}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk informasi lebih lanjut tentang parameter pencarian kemiripan, lihat <a href="/docs/id/v2.5.x/single-vector-search.md">Pencarian Vektor Dasar</a>.</p>
