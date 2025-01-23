---
id: array_data_type.md
title: Bidang Array
summary: >-
  Tipe Array digunakan untuk menyimpan bidang yang berisi beberapa nilai dengan
  tipe data yang sama. Tipe ini menyediakan cara yang fleksibel untuk menyimpan
  atribut dengan banyak elemen, sehingga sangat berguna dalam skenario di mana
  sekumpulan data terkait perlu disimpan. Di Milvus, Anda dapat menyimpan bidang
  Array bersama data vektor, sehingga memungkinkan kueri yang lebih kompleks dan
  persyaratan pemfilteran.
---
<h1 id="Array-Field​" class="common-anchor-header">Bidang Array<button data-href="#Array-Field​" class="anchor-icon" translate="no">
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
    </button></h1><p>Tipe Array digunakan untuk menyimpan bidang yang berisi beberapa nilai dengan tipe data yang sama. Tipe ini menyediakan cara yang fleksibel untuk menyimpan atribut dengan banyak elemen, sehingga sangat berguna dalam skenario di mana sekumpulan data terkait perlu disimpan. Di Milvus, Anda dapat menyimpan bidang Array di samping data vektor, sehingga memungkinkan kueri yang lebih kompleks dan persyaratan pemfilteran.</p>
<p>Sebagai contoh, dalam sistem rekomendasi musik, bidang Array dapat menyimpan daftar tag untuk sebuah lagu; dalam analisis perilaku pengguna, bidang ini dapat menyimpan peringkat pengguna untuk lagu. Di bawah ini adalah contoh bidang Array yang khas.</p>
<pre><code translate="no" class="language-JSON">{​
  <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>],​
  <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>]​
}​

<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, <code translate="no">tags</code> dan <code translate="no">ratings</code> keduanya adalah bidang Array. Bidang <code translate="no">tags</code> adalah larik string yang mewakili genre lagu seperti pop, rock, dan klasik, sedangkan bidang <code translate="no">ratings</code> adalah larik bilangan bulat yang mewakili peringkat pengguna untuk lagu tersebut, mulai dari 1 hingga 5. Bidang Array ini menyediakan cara yang fleksibel untuk menyimpan data multi-nilai, sehingga lebih mudah untuk melakukan analisis terperinci selama kueri dan pemfilteran.</p>
<h2 id="Add-Array-field​" class="common-anchor-header">Menambahkan bidang Array<button data-href="#Add-Array-field​" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menggunakan bidang Array di Milvus, tentukan jenis bidang yang relevan saat membuat skema koleksi. Proses ini meliputi.</p>
<ol>
<li><p>Mengatur <code translate="no">datatype</code> ke tipe data Array yang didukung, <code translate="no">ARRAY</code>.</p></li>
<li><p>Menggunakan parameter <code translate="no">element_type</code> untuk menentukan tipe data dari elemen-elemen di dalam larik. Ini bisa berupa tipe data skalar apa pun yang didukung oleh Milvus, seperti <code translate="no">VARCHAR</code> atau <code translate="no">INT64</code>. Semua elemen dalam Larik yang sama harus memiliki tipe data yang sama.</p></li>
<li><p>Menggunakan parameter <code translate="no">max_capacity</code> untuk mendefinisikan kapasitas maksimum larik, yaitu jumlah maksimum elemen yang dapat ditampung.</p></li>
</ol>
<p>Berikut ini cara mendefinisikan skema koleksi yang menyertakan bidang Array.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
​
schema = client.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_fields=<span class="hljs-literal">True</span>,​
)​
​
<span class="hljs-comment"># Add an Array field with elements of type VARCHAR​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;tags&quot;</span>, datatype=DataType.ARRAY, element_type=DataType.VARCHAR, max_capacity=<span class="hljs-number">10</span>, max_length=<span class="hljs-number">65535</span>)​
<span class="hljs-comment"># Add an Array field with elements of type INT64​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;ratings&quot;</span>, datatype=DataType.ARRAY, element_type=DataType.INT64, max_capacity=<span class="hljs-number">5</span>)​
​
<span class="hljs-comment"># Add primary field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
​
<span class="hljs-comment"># Add vector field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
        ​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)​
        .dataType(DataType.Array)​
        .elementType(DataType.VarChar)​
        .maxCapacity(<span class="hljs-number">10</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;ratings&quot;</span>)​
        .dataType(DataType.Array)​
        .elementType(DataType.Int64)​
        .maxCapacity(<span class="hljs-number">5</span>)​
        .maxLength(<span class="hljs-number">65535</span>)
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">3</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
<span class="hljs-keyword">const</span> schema = [​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;tags&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,​
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">10</span>,​
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span>​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;rating&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,​
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
    <span class="hljs-attr">dim</span>: <span class="hljs-number">3</span>,​
  },​
];​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> arrayField1=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;tags&quot;,​
    &quot;dataType&quot;: &quot;Array&quot;,​
    &quot;elementDataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_capacity&quot;: 10,​
        &quot;max_length&quot;: 65535​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> arrayField2=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;ratings&quot;,​
    &quot;dataType&quot;: &quot;Array&quot;,​
    &quot;elementDataType&quot;: &quot;Int64&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_capacity&quot;: 5​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;pk&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;embedding&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 3​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$arrayField1</span>,​
        <span class="hljs-variable">$arrayField2</span>,​
        <span class="hljs-variable">$pkField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini.</p>
<ul>
<li><p><code translate="no">tags</code> adalah larik string dengan <code translate="no">element_type</code> disetel ke <code translate="no">VARCHAR</code>, yang mengindikasikan bahwa elemen dalam larik harus berupa string. <code translate="no">max_capacity</code> disetel ke 10, yang berarti larik dapat berisi hingga 10 elemen.</p></li>
<li><p><code translate="no">ratings</code> adalah larik bilangan bulat dengan <code translate="no">element_type</code> diatur ke <code translate="no">INT64</code>, yang menunjukkan bahwa elemen harus berupa bilangan bulat. <code translate="no">max_capacity</code> diatur ke 5, yang memungkinkan hingga 5 peringkat.</p></li>
<li><p>Kami juga menambahkan bidang kunci utama <code translate="no">pk</code> dan bidang vektor <code translate="no">embedding</code>.</p></li>
</ul>
<div class="alert note">
<p>Bidang utama dan bidang vektor wajib ada saat Anda membuat koleksi. Bidang utama mengidentifikasi setiap entitas secara unik, sedangkan bidang vektor sangat penting untuk pencarian kemiripan. Untuk lebih jelasnya, lihat <a href="/docs/id/primary-field.md">Bidang Utama &amp; AutoID</a>, <a href="/docs/id/dense-vector.md">Vektor Padat</a>, <a href="/docs/id/binary-vector.md">Vektor Biner</a>, atau <a href="/docs/id/sparse_vector.md">Vektor</a> <a href="/docs/id/binary-vector.md">Jarang</a>.</p>
</div>
<h2 id="Set-index-params​" class="common-anchor-header">Mengatur parameter indeks<button data-href="#Set-index-params​" class="anchor-icon" translate="no">
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
    </button></h2><p>Menetapkan parameter indeks untuk bidang Array bersifat opsional, namun dapat meningkatkan efisiensi pencarian secara signifikan.</p>
<p>Pada contoh berikut, kita membuat <code translate="no">AUTOINDEX</code> untuk field <code translate="no">tags</code>, yang berarti Milvus akan secara otomatis membuat indeks skalar yang sesuai berdasarkan tipe data.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters​</span>
index_params = client.prepare_index_params()  <span class="hljs-comment"># Prepare IndexParams object​</span>
​
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;tags&quot;</span>,  <span class="hljs-comment"># Name of the Array field to index​</span>
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Index type​</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span>  <span class="hljs-comment"># Index name​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;​
<span class="hljs-keyword">import</span> java.util.*;​
​
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
indexes.add(IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;tags&quot;</span>)​
        .indexName(<span class="hljs-string">&quot;inverted_index&quot;</span>)​
        .indexType(IndexParam.IndexType.AUTOINDEX)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = [{​
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;inverted_index&#x27;</span>,​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;tags&#x27;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,​
)];​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;tags&quot;,​
            &quot;indexName&quot;: &quot;inverted_index&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Selain <code translate="no">AUTOINDEX</code>, Anda dapat menentukan jenis indeks skalar lain seperti <code translate="no">INVERTED</code> atau <code translate="no">BITMAP</code>. Untuk jenis indeks yang didukung, lihat <a href="/docs/id/index-scalar-fields.md">Indeks Skalar</a>.</p>
<p>Selain itu, Anda harus membuat indeks untuk bidang vektor sebelum membuat koleksi. Dalam contoh ini, kita menggunakan <code translate="no">AUTOINDEX</code> untuk menyederhanakan penyiapan indeks vektor.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add vector index​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Use automatic indexing to simplify complex index settings​</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>  <span class="hljs-comment"># Specify similarity metric type, such as L2, COSINE, or IP​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">indexes.<span class="hljs-keyword">add</span>(IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .indexType(IndexParam.IndexType.AUTOINDEX)​
        .metricType(IndexParam.MetricType.COSINE)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"> indexParams.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;embedding_index&#x27;</span>,​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;embedding&#x27;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;tags&quot;,​
            &quot;indexName&quot;: &quot;inverted_index&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        },​
        {​
            &quot;fieldName&quot;: &quot;embedding&quot;,​
            &quot;metricType&quot;: &quot;COSINE&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-collection​" class="common-anchor-header">Membuat koleksi<button data-href="#Create-collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan skema dan parameter indeks yang ditentukan untuk membuat koleksi.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;my_array_collection&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_array_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexes)​
        .build();​
client.createCollection(requestCreate);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">create_collection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_array_collection&quot;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">index_params</span>: indexParams​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_array_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data​" class="common-anchor-header">Menyisipkan data<button data-href="#Insert-data​" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah membuat koleksi, Anda dapat menyisipkan data yang menyertakan bidang Array.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">data = [​
    {​
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>],​
        <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>],​
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,​
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]​
    },​
    {​
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;jazz&quot;</span>, <span class="hljs-string">&quot;blues&quot;</span>],​
        <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>],​
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,​
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.78</span>, <span class="hljs-number">0.91</span>, <span class="hljs-number">0.23</span>]​
    },​
    {​
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronic&quot;</span>, <span class="hljs-string">&quot;dance&quot;</span>],​
        <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>],​
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,​
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.67</span>, <span class="hljs-number">0.45</span>, <span class="hljs-number">0.89</span>]​
    }​
]​
​
client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;my_array_collection&quot;</span>,​
    data=data​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;tags\&quot;: [\&quot;pop\&quot;, \&quot;rock\&quot;, \&quot;classic\&quot;], \&quot;ratings\&quot;: [5, 4, 3], \&quot;pk\&quot;: 1, \&quot;embedding\&quot;: [0.1, 0.2, 0.3]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;tags\&quot;: [\&quot;jazz\&quot;, \&quot;blues\&quot;], \&quot;ratings\&quot;: [4, 5], \&quot;pk\&quot;: 2, \&quot;embedding\&quot;: [0.4, 0.5, 0.6]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;tags\&quot;: [\&quot;electronic\&quot;, \&quot;dance\&quot;], \&quot;ratings\&quot;: [3, 3, 4], \&quot;pk\&quot;: 3, \&quot;embedding\&quot;: [0.7, 0.8, 0.9]}&quot;</span>, JsonObject.class));​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_array_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
    {​
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>],​
        <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>],​
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,​
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]​
    },​
    {​
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;jazz&quot;</span>, <span class="hljs-string">&quot;blues&quot;</span>],​
        <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>],​
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,​
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.78</span>, <span class="hljs-number">0.91</span>, <span class="hljs-number">0.23</span>]​
    },​
    {​
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronic&quot;</span>, <span class="hljs-string">&quot;dance&quot;</span>],​
        <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>],​
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,​
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.67</span>, <span class="hljs-number">0.45</span>, <span class="hljs-number">0.89</span>]​
    }​
];​
​
client.<span class="hljs-title function_">insert</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_array_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: data,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {​
        &quot;tags&quot;: [&quot;pop&quot;, &quot;rock&quot;, &quot;classic&quot;],​
        &quot;ratings&quot;: [5, 4, 3],​
        &quot;pk&quot;: 1,​
        &quot;embedding&quot;: [0.12, 0.34, 0.56]​
    },​
    {​
        &quot;tags&quot;: [&quot;jazz&quot;, &quot;blues&quot;],​
        &quot;ratings&quot;: [4, 5],​
        &quot;pk&quot;: 2,​
        &quot;embedding&quot;: [0.78, 0.91, 0.23]​
    },​
    {​
        &quot;tags&quot;: [&quot;electronic&quot;, &quot;dance&quot;],​
        &quot;ratings&quot;: [3, 3, 4],​
        &quot;pk&quot;: 3,​
        &quot;embedding&quot;: [0.67, 0.45, 0.89]​
    }       ​
    ],​
    &quot;collectionName&quot;: &quot;my_array_collection&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini.</p>
<ul>
<li><p>Setiap entri data mencakup bidang utama (<code translate="no">pk</code>), sedangkan <code translate="no">tags</code> dan <code translate="no">ratings</code> adalah bidang Array yang digunakan untuk menyimpan tag dan peringkat.</p></li>
<li><p><code translate="no">embedding</code> adalah bidang vektor 3 dimensi yang digunakan untuk pencarian kemiripan vektor.</p></li>
</ul>
<h2 id="Search-and-query​" class="common-anchor-header">Pencarian dan kueri<button data-href="#Search-and-query​" class="anchor-icon" translate="no">
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
    </button></h2><p>Bidang larik memungkinkan pemfilteran skalar selama pencarian, meningkatkan kemampuan pencarian vektor Milvus. Anda dapat membuat kueri berdasarkan properti bidang Array di samping pencarian kemiripan vektor.</p>
<h3 id="Filter-queries​" class="common-anchor-header">Menyaring kueri</h3><p>Anda dapat memfilter data berdasarkan properti bidang Array, seperti mengakses elemen tertentu atau memeriksa apakah elemen array memenuhi kondisi tertentu.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ratings[0] &lt; 4&#x27;</span>​
​
res = client.query(​
    collection_name=<span class="hljs-string">&quot;my_array_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    output_fields=[<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;{&#x27;pk&#x27;: 3, &#x27;tags&#x27;: [&#x27;electronic&#x27;, &#x27;dance&#x27;], &#x27;ratings&#x27;: [3, 3, 4], &#x27;embedding&#x27;: [np.float32(0.67), np.float32(0.45), np.float32(0.89)]}&quot;] ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ratings[0] &lt; 4&quot;</span>;​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_array_collection&quot;</span>)​
        .filter(filter)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>))​
        .build());​
​
System.out.println(resp.getQueryResults());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [QueryResp.QueryResult(entity={ratings=[3, 3, 4], pk=3, embedding=[0.7, 0.8, 0.9], tags=[electronic, dance]})]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.query({​
    collection_name: <span class="hljs-string">&#x27;my_array_collection&#x27;</span>,​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;ratings[0] &lt; 4&#x27;</span>,​
    output_fields: [<span class="hljs-string">&#x27;tags&#x27;</span>, <span class="hljs-string">&#x27;ratings&#x27;</span>, <span class="hljs-string">&#x27;embedding&#x27;</span>]​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_array_collection&quot;,​
    &quot;filter&quot;: &quot;ratings[0] &lt; 4&quot;,​
    &quot;outputFields&quot;: [&quot;tags&quot;, &quot;ratings&quot;, &quot;embedding&quot;]​
}&#x27;</span>​
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;embedding&quot;:[0.67,0.45,0.89],&quot;pk&quot;:3,&quot;ratings&quot;:{&quot;Data&quot;:{&quot;LongData&quot;:{&quot;data&quot;:[3,3,4]}}},&quot;tags&quot;:{&quot;Data&quot;:{&quot;StringData&quot;:{&quot;data&quot;:[&quot;electronic&quot;,&quot;dance&quot;]}}}}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Dalam kueri ini, Milvus menyaring entitas yang elemen pertama larik <code translate="no">ratings</code> kurang dari 4, dan mengembalikan entitas yang sesuai dengan kondisi tersebut.</p>
<h3 id="Vector-search-with-Array-filtering​" class="common-anchor-header">Pencarian vektor dengan pemfilteran Array</h3><p>Dengan menggabungkan kemiripan vektor dengan pemfilteran Array, Anda dapat memastikan bahwa data yang diambil tidak hanya mirip secara semantik tetapi juga memenuhi kondisi tertentu, sehingga hasil pencarian lebih akurat dan selaras dengan kebutuhan bisnis.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags[0] == &quot;pop&quot;&#x27;</span>​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_array_collection&quot;</span>,​
    data=[[<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>]],​
    limit=<span class="hljs-number">5</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    output_fields=[<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: 1.1276001930236816, &#x27;entity&#x27;: {&#x27;ratings&#x27;: [5, 4, 3], &#x27;embedding&#x27;: [0.11999999731779099, 0.3400000035762787, 0.5600000023841858], &#x27;tags&#x27;: [&#x27;pop&#x27;, &#x27;rock&#x27;, &#x27;classic&#x27;]}}]&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;tags[0] == \&quot;pop\&quot;&quot;</span>;​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_array_collection&quot;</span>)​
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3f</span>, -<span class="hljs-number">0.6f</span>, <span class="hljs-number">0.1f</span>})))​
        .topK(<span class="hljs-number">5</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;tags&quot;</span>, <span class="hljs-string">&quot;ratings&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>))​
        .filter(filter)​
        .build());​
​
System.out.println(resp.getSearchResults());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={ratings=[5, 4, 3], embedding=[0.1, 0.2, 0.3], tags=[pop, rock, classic]}, score=-0.2364331, id=1)]]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.search({​
    collection_name: <span class="hljs-string">&#x27;my_array_collection&#x27;</span>,​
    data: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>],​
    limit: <span class="hljs-number">5</span>,​
    output_fields: [<span class="hljs-string">&#x27;tags&#x27;</span>, <span class="hljs-string">&#x27;ratings&#x27;</span>, <span class="hljs-string">&#x27;embdding&#x27;</span>],​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;tags[0] == &quot;pop&quot;&#x27;</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_array_collection&quot;,​
    &quot;data&quot;: [​
        [0.3, -0.6, 0.1]​
    ],​
    &quot;annsField&quot;: &quot;embedding&quot;,​
    &quot;limit&quot;: 5,​
    &quot;filter&quot;: &quot;tags[0] == \&quot;pop\&quot;&quot;,​
    &quot;outputFields&quot;: [&quot;tags&quot;, &quot;ratings&quot;, &quot;embedding&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;distance&quot;:-0.24793813,&quot;embedding&quot;:[0.12,0.34,0.56],&quot;id&quot;:1,&quot;ratings&quot;:{&quot;Data&quot;:{&quot;LongData&quot;:{&quot;data&quot;:[5,4,3]}}},&quot;tags&quot;:{&quot;Data&quot;:{&quot;StringData&quot;:{&quot;data&quot;:[&quot;pop&quot;,&quot;rock&quot;,&quot;classic&quot;]}}}}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, Milvus mengembalikan 5 entitas teratas yang paling mirip dengan vektor kueri, dengan elemen pertama larik <code translate="no">tags</code> adalah <code translate="no">&quot;pop&quot;</code>.</p>
<p>Selain itu, Milvus mendukung operator pemfilteran Array tingkat lanjut seperti <code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, dan <code translate="no">ARRAY_LENGTH</code> untuk lebih meningkatkan kemampuan kueri. Untuk lebih jelasnya, lihat Pemfilteran <a href="/docs/id/boolean.md">Metadata</a>.</p>
<h2 id="Limits​" class="common-anchor-header">Batasan<button data-href="#Limits​" class="anchor-icon" translate="no">
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
<li><p><strong>Tipe Data</strong>: Semua elemen dalam bidang Array harus memiliki tipe data yang sama, seperti yang ditentukan oleh <code translate="no">element_type</code>.</p></li>
<li><p><strong>Kapasitas Larik</strong>: Jumlah elemen dalam bidang Array harus kurang dari atau sama dengan kapasitas maksimum yang ditentukan saat Array dibuat, seperti yang ditentukan oleh <code translate="no">max_capacity</code>.</p></li>
<li><p><strong>Penanganan String</strong>: Nilai string dalam bidang Array disimpan apa adanya, tanpa pelarian atau konversi semantik. Misalnya, <code translate="no">'a&quot;b'</code>, <code translate="no">&quot;a'b&quot;</code>, <code translate="no">'a\'b'</code>, dan <code translate="no">&quot;a\&quot;b&quot;</code> disimpan seperti yang dimasukkan, sedangkan <code translate="no">'a'b'</code> dan <code translate="no">&quot;a&quot;b&quot;</code> dianggap sebagai nilai yang tidak valid.</p></li>
</ul>
