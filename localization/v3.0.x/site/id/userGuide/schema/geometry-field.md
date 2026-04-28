---
id: geometry-field.md
title: Bidang GeometriCompatible with Milvus 2.6.4+
summary: >-
  Ketika membangun aplikasi seperti Sistem Informasi Geografis (SIG), alat
  pemetaan, atau layanan berbasis lokasi, Anda sering kali perlu menyimpan dan
  melakukan kueri data geometris. Tipe data GEOMETRI di Milvus memecahkan
  tantangan ini dengan menyediakan cara asli untuk menyimpan dan meminta data
  geometris yang fleksibel.
beta: Milvus 2.6.4+
---
<h1 id="Geometry-Field" class="common-anchor-header">Bidang Geometri<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Geometry-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Ketika membangun aplikasi seperti Sistem Informasi Geografis (SIG), alat pemetaan, atau layanan berbasis lokasi, Anda sering kali perlu menyimpan dan melakukan kueri data geometri. Tipe data <code translate="no">GEOMETRY</code> di Milvus memecahkan tantangan ini dengan menyediakan cara asli untuk menyimpan dan meminta data geometris yang fleksibel.</p>
<p>Gunakan bidang GEOMETRI ketika Anda perlu menggabungkan kesamaan vektor dengan batasan spasial, misalnya:</p>
<ul>
<li><p>Layanan Berbasis Lokasi (LBS): "temukan POI yang mirip <strong>dalam</strong> blok kota ini"</p></li>
<li><p>Pencarian multi-modal: "ambil foto yang mirip <strong>dalam jarak 1 km</strong> dari titik ini"</p></li>
<li><p>Peta &amp; logistik: "aset <strong>di dalam</strong> suatu wilayah" atau "rute yang <strong>berpotongan</strong> dengan jalur"</p></li>
</ul>
<div class="alert note">
<p>Untuk menggunakan bidang GEOMETRI, tingkatkan SDK Anda ke versi terbaru.</p>
</div>
<h2 id="What-is-a-GEOMETRY-field" class="common-anchor-header">Apa yang dimaksud dengan bidang GEOMETRI?<button data-href="#What-is-a-GEOMETRY-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Bidang GEOMETRI adalah tipe data yang ditentukan skema (<code translate="no">DataType.GEOMETRY</code>) di Milvus yang menyimpan data geometri. Ketika bekerja dengan bidang geometri, Anda berinteraksi dengan data menggunakan format <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">Well-Known Text (WKT</a> ), representasi yang dapat dibaca oleh manusia yang digunakan untuk menyisipkan data dan melakukan kueri. Secara internal, Milvus mengubah WKT menjadi <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry#Well-known_binary">Well-Known Binary (WKB</a> ) untuk penyimpanan dan pemrosesan yang efisien, tetapi Anda tidak perlu menangani WKB secara langsung.</p>
<p>Tipe data <code translate="no">GEOMETRY</code> mendukung objek-objek geometris berikut ini:</p>
<ul>
<li><p><strong>TITIK</strong>: <code translate="no">POINT (x y)</code>; misalnya, <code translate="no">POINT (13.403683 52.520711)</code> di mana <code translate="no">x</code> = bujur dan <code translate="no">y</code> = lintang</p></li>
<li><p><strong>LINESTRING</strong>: <code translate="no">LINESTRING (x1 y1, x2 y2, …)</code>; sebagai contoh, <code translate="no">LINESTRING (13.40 52.52, 13.41 52.51)</code></p></li>
<li><p><strong>POLIGON</strong>: <code translate="no">POLYGON ((x1 y1, x2 y2, x3 y3, x1 y1))</code>; sebagai contoh, <code translate="no">POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))</code></p></li>
<li><p><strong>MULTIPOINT</strong>: <code translate="no">MULTIPOINT ((x1 y1), (x2 y2), …)</code>, sebagai contoh, <code translate="no">MULTIPOINT ((10 40), (40 30), (20 20), (30 10))</code></p></li>
<li><p><strong>MULTILINESTRING</strong>: <code translate="no">MULTILINESTRING ((x1 y1, …), (xk yk, …))</code>, misalnya, <code translate="no">MULTILINESTRING ((10 10, 20 20, 10 40), (40 40, 30 30, 40 20, 30 10))</code></p></li>
<li><p><strong>MULTIPOLYGON</strong>: <code translate="no">MULTIPOLYGON (((outer ring ...)), ((outer ring ...)))</code>, misalnya, <code translate="no">MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))</code></p></li>
<li><p><strong>KUMPULAN GEOMETRI</strong>: <code translate="no">GEOMETRYCOLLECTION(POINT(x y), LINESTRING(x1 y1, x2 y2), ...)</code>, sebagai contoh, <code translate="no">GEOMETRYCOLLECTION (POINT (40 10), LINESTRING (10 10, 20 20, 10 40), POLYGON ((40 40, 20 45, 45 30, 40 40)))</code></p></li>
</ul>
<h2 id="Basic-operations" class="common-anchor-header">Operasi dasar<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Alur kerja untuk menggunakan bidang <code translate="no">GEOMETRY</code> melibatkan pendefinisiannya dalam skema koleksi Anda, memasukkan data geometri, dan kemudian meminta data menggunakan ekspresi filter tertentu.</p>
<h3 id="Step-1-Define-a-GEOMETRY-field" class="common-anchor-header">Langkah 1: Mendefinisikan bidang GEOMETRI<button data-href="#Step-1-Define-a-GEOMETRY-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk menggunakan bidang <code translate="no">GEOMETRY</code>, tentukan secara eksplisit dalam skema koleksi Anda saat membuat koleksi. Contoh berikut ini menunjukkan cara membuat koleksi dengan field <code translate="no">geo</code> bertipe <code translate="no">DataType.GEOMETRY</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

dim = <span class="hljs-number">8</span>
collection_name = <span class="hljs-string">&quot;geo_collection&quot;</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create schema with a GEOMETRY field</span>
schema = milvus_client.create_schema(enable_dynamic_field=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embeddings&quot;</span>, DataType.FLOAT_VECTOR, dim=dim)
<span class="highlighted-wrapper-line">schema.add_field(<span class="hljs-string">&quot;geo&quot;</span>, DataType.GEOMETRY, nullable=<span class="hljs-literal">True</span>)</span>
schema.add_field(<span class="hljs-string">&quot;name&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">128</span>)

milvus_client.create_collection(collection_name, schema=schema, consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;

<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">String</span> <span class="hljs-variable">COLLECTION_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;geo_collection&quot;</span>;
<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">Integer</span> <span class="hljs-variable">DIM</span> <span class="hljs-operator">=</span> <span class="hljs-number">128</span>;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">collectionSchema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">true</span>)
        .build();
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(DIM)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;geo&quot;</span>)
        .dataType(DataType.Geometry)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;name&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">128</span>)
        .build());
        
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .collectionSchema(collectionSchema)
        .build();
client.createCollection(requestCreate);

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>);
<span class="hljs-keyword">const</span> schema = [
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;embeddings&#x27;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">8</span> },
<span class="highlighted-wrapper-line">  { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;geo&#x27;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Geometry</span>, <span class="hljs-attr">is_nullable</span>: <span class="hljs-literal">true</span> },</span>
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;name&#x27;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">128</span> },
];

<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;geo_collection&#x27;</span>,
  <span class="hljs-attr">fields</span>: schema,
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&#x27;Strong&#x27;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Dalam contoh ini, bidang <code translate="no">GEOMETRY</code> yang didefinisikan dalam skema koleksi mengizinkan nilai null dengan <code translate="no">nullable=True</code>. Untuk detailnya, lihat <a href="/docs/id/nullable-and-default.md">Nullable &amp; Default</a>.</p>
</div>
<h3 id="Step-2-Insert-data" class="common-anchor-header">Langkah 2: Menyisipkan data<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Masukkan entitas dengan data geometri dalam format <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">WKT</a>. Berikut adalah contoh dengan beberapa titik geografis:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">rng = np.random.default_rng(seed=<span class="hljs-number">19530</span>)
geo_points = [
    <span class="hljs-string">&#x27;POINT(13.399710 52.518010)&#x27;</span>,
    <span class="hljs-string">&#x27;POINT(13.403934 52.522877)&#x27;</span>,
    <span class="hljs-string">&#x27;POINT(13.405088 52.521124)&#x27;</span>,
    <span class="hljs-string">&#x27;POINT(13.408223 52.516876)&#x27;</span>,
    <span class="hljs-string">&#x27;POINT(13.400092 52.521507)&#x27;</span>,
    <span class="hljs-string">&#x27;POINT(13.408529 52.519274)&#x27;</span>,
]

rows = [
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop A&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: rng.random((<span class="hljs-number">1</span>, dim))[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">0</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop B&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: rng.random((<span class="hljs-number">1</span>, dim))[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">1</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop C&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: rng.random((<span class="hljs-number">1</span>, dim))[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">2</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop D&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: rng.random((<span class="hljs-number">1</span>, dim))[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">3</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop E&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: rng.random((<span class="hljs-number">1</span>, dim))[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">4</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop F&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: rng.random((<span class="hljs-number">1</span>, dim))[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">5</span>]},
]

insert_result = milvus_client.insert(collection_name, rows)
<span class="hljs-built_in">print</span>(insert_result)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># {&#x27;insert_count&#x27;: 6, &#x27;ids&#x27;: [1, 2, 3, 4, 5, 6]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

List&lt;String&gt; geoPoints = Arrays.asList(
        <span class="hljs-string">&quot;POINT(13.399710 52.518010)&quot;</span>,
        <span class="hljs-string">&quot;POINT(13.403934 52.522877)&quot;</span>,
        <span class="hljs-string">&quot;POINT(13.405088 52.521124)&quot;</span>,
        <span class="hljs-string">&quot;POINT(13.408223 52.516876)&quot;</span>,
        <span class="hljs-string">&quot;POINT(13.400092 52.521507)&quot;</span>,
        <span class="hljs-string">&quot;POINT(13.408529 52.519274)&quot;</span>
);
List&lt;String&gt; names = Arrays.asList(<span class="hljs-string">&quot;Shop A&quot;</span>, <span class="hljs-string">&quot;Shop B&quot;</span>, <span class="hljs-string">&quot;Shop C&quot;</span>, <span class="hljs-string">&quot;Shop D&quot;</span>, <span class="hljs-string">&quot;Shop E&quot;</span>, <span class="hljs-string">&quot;Shop F&quot;</span>);
<span class="hljs-type">Random</span> <span class="hljs-variable">ran</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; geoPoints.size(); i++) {
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, i);
    row.addProperty(<span class="hljs-string">&quot;geo&quot;</span>, geoPoints.get(i));
    row.addProperty(<span class="hljs-string">&quot;name&quot;</span>, names.get(i));
    List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">d</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; d &lt; DIM; ++d) {
        vector.add(ran.nextFloat());
    }
    row.add(<span class="hljs-string">&quot;embeddings&quot;</span>, gson.toJsonTree(vector));
    rows.add(row);
}

client.insert(InsertReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> geo_points = [
    <span class="hljs-string">&#x27;POINT(13.399710 52.518010)&#x27;</span>,
    <span class="hljs-string">&#x27;POINT(13.403934 52.522877)&#x27;</span>,
    <span class="hljs-string">&#x27;POINT(13.405088 52.521124)&#x27;</span>,
    <span class="hljs-string">&#x27;POINT(13.408223 52.516876)&#x27;</span>,
    <span class="hljs-string">&#x27;POINT(13.400092 52.521507)&#x27;</span>,
    <span class="hljs-string">&#x27;POINT(13.408529 52.519274)&#x27;</span>,
];

<span class="hljs-keyword">const</span> rows = [
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop A&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.1</span>,<span class="hljs-number">0.2</span>,<span class="hljs-number">0.3</span>,<span class="hljs-number">0.4</span>,<span class="hljs-number">0.5</span>,<span class="hljs-number">0.6</span>,<span class="hljs-number">0.7</span>,<span class="hljs-number">0.8</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">0</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop B&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.2</span>,<span class="hljs-number">0.3</span>,<span class="hljs-number">0.4</span>,<span class="hljs-number">0.5</span>,<span class="hljs-number">0.6</span>,<span class="hljs-number">0.7</span>,<span class="hljs-number">0.8</span>,<span class="hljs-number">0.9</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">1</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop C&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.3</span>,<span class="hljs-number">0.4</span>,<span class="hljs-number">0.5</span>,<span class="hljs-number">0.6</span>,<span class="hljs-number">0.7</span>,<span class="hljs-number">0.8</span>,<span class="hljs-number">0.9</span>,<span class="hljs-number">1.0</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">2</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop D&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.4</span>,<span class="hljs-number">0.5</span>,<span class="hljs-number">0.6</span>,<span class="hljs-number">0.7</span>,<span class="hljs-number">0.8</span>,<span class="hljs-number">0.9</span>,<span class="hljs-number">1.0</span>,<span class="hljs-number">0.1</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">3</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop E&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.5</span>,<span class="hljs-number">0.6</span>,<span class="hljs-number">0.7</span>,<span class="hljs-number">0.8</span>,<span class="hljs-number">0.9</span>,<span class="hljs-number">1.0</span>,<span class="hljs-number">0.1</span>,<span class="hljs-number">0.2</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">4</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop F&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.6</span>,<span class="hljs-number">0.7</span>,<span class="hljs-number">0.8</span>,<span class="hljs-number">0.9</span>,<span class="hljs-number">1.0</span>,<span class="hljs-number">0.1</span>,<span class="hljs-number">0.2</span>,<span class="hljs-number">0.3</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">5</span>]},
];

<span class="hljs-keyword">const</span> insert_result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;geo_collection&#x27;</span>,
  <span class="hljs-attr">data</span>: rows,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(insert_result);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Filtering-operations" class="common-anchor-header">Langkah 3: Operasi pemfilteran<button data-href="#Step-3-Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p>Sebelum Anda dapat melakukan operasi pemfilteran pada bidang <code translate="no">GEOMETRY</code>, pastikan:</p>
<ul>
<li><p>Anda telah membuat indeks pada setiap bidang vektor.</p></li>
<li><p>Koleksi dimuat ke dalam memori.</p></li>
</ul>
<p><details></p>
<p><summary>Tampilkan kode</summary></p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = milvus_client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;embeddings&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

milvus_client.create_index(collection_name, index_params)
milvus_client.load_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());
client.createIndex(CreateIndexReq.builder()
        .collectionName(COLLECTION_NAME)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">const</span> index_params = {
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;embeddings&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
  <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span>,
  <span class="hljs-attr">params</span>: { <span class="hljs-attr">nlist</span>: <span class="hljs-number">128</span> },
};

<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;geo_collection&#x27;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;embeddings_index&#x27;</span>,
  <span class="hljs-attr">index_params</span>: index_params,
});

<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">loadCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;geo_collection&#x27;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Setelah persyaratan ini terpenuhi, Anda dapat menggunakan ekspresi dengan operator geometri khusus untuk memfilter koleksi Anda berdasarkan nilai geometri.</p>
<h4 id="Define-filter-expressions" class="common-anchor-header">Menentukan ekspresi penyaringan</h4><p>Untuk memfilter pada bidang <code translate="no">GEOMETRY</code>, gunakan operator geometri dalam ekspresi:</p>
<ul>
<li><p>Umum: <code translate="no">{operator}(geo_field, '{wkt}')</code></p></li>
<li><p>Berbasis jarak: <code translate="no">ST_DWITHIN(geo_field, '{wkt}', distance)</code></p></li>
</ul>
<p>Di mana</p>
<ul>
<li><p><code translate="no">operator</code> adalah salah satu operator geometri yang didukung (misalnya, <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_INTERSECTS</code>). Nama operator harus menggunakan huruf besar atau huruf kecil. Untuk daftar operator yang didukung, lihat <a href="/docs/id/geometry-operators.md#Supported-geometry-operators">Operator geometri yang didukung</a>.</p></li>
<li><p><code translate="no">geo_field</code> adalah nama bidang <code translate="no">GEOMETRY</code> Anda.</p></li>
<li><p><code translate="no">'{wkt}'</code> adalah representasi WKT dari geometri yang akan ditanyakan.</p></li>
<li><p><code translate="no">distance</code> adalah ambang batas khusus untuk <code translate="no">ST_DWITHIN</code>.</p></li>
</ul>
<p>Contoh berikut ini menunjukkan cara menggunakan operator khusus geometri yang berbeda dalam ekspresi filter:</p>
<h4 id="Example-1-Find-entities-within-a-rectangular-area" class="common-anchor-header">Contoh 1: Menemukan entitas dalam area persegi panjang</h4><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">top_left_lon, top_left_lat = <span class="hljs-number">13.403683</span>, <span class="hljs-number">52.520711</span>
bottom_right_lon, bottom_right_lat = <span class="hljs-number">13.455868</span>, <span class="hljs-number">52.495862</span>
bounding_box_wkt = <span class="hljs-string">f&quot;POLYGON((<span class="hljs-subst">{top_left_lon}</span> <span class="hljs-subst">{top_left_lat}</span>, <span class="hljs-subst">{bottom_right_lon}</span> <span class="hljs-subst">{top_left_lat}</span>, <span class="hljs-subst">{bottom_right_lon}</span> <span class="hljs-subst">{bottom_right_lat}</span>, <span class="hljs-subst">{top_left_lon}</span> <span class="hljs-subst">{bottom_right_lat}</span>, <span class="hljs-subst">{top_left_lon}</span> <span class="hljs-subst">{top_left_lat}</span>))&quot;</span>

query_results = milvus_client.query(
    collection_name,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;st_within(geo, &#x27;<span class="hljs-subst">{bounding_box_wkt}</span>&#x27;)&quot;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>]
)
<span class="hljs-keyword">for</span> ret <span class="hljs-keyword">in</span> query_results:
    <span class="hljs-built_in">print</span>(ret)
    
<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># {&#x27;name&#x27;: &#x27;Shop D&#x27;, &#x27;geo&#x27;: &#x27;POINT (13.408223 52.516876)&#x27;, &#x27;id&#x27;: 4}</span>
<span class="hljs-comment"># {&#x27;name&#x27;: &#x27;Shop F&#x27;, &#x27;geo&#x27;: &#x27;POINT (13.408529 52.519274)&#x27;, &#x27;id&#x27;: 6}</span>
<span class="hljs-comment"># {&#x27;name&#x27;: &#x27;Shop A&#x27;, &#x27;geo&#x27;: &#x27;POINT (13.39971 52.51801)&#x27;, &#x27;id&#x27;: 1}</span>
<span class="hljs-comment"># {&#x27;name&#x27;: &#x27;Shop B&#x27;, &#x27;geo&#x27;: &#x27;POINT (13.403934 52.522877)&#x27;, &#x27;id&#x27;: 2}</span>
<span class="hljs-comment"># {&#x27;name&#x27;: &#x27;Shop C&#x27;, &#x27;geo&#x27;: &#x27;POINT (13.405088 52.521124)&#x27;, &#x27;id&#x27;: 3}</span>
<span class="hljs-comment"># {&#x27;name&#x27;: &#x27;Shop D&#x27;, &#x27;geo&#x27;: &#x27;POINT (13.408223 52.516876)&#x27;, &#x27;id&#x27;: 4}</span>
<span class="hljs-comment"># {&#x27;name&#x27;: &#x27;Shop E&#x27;, &#x27;geo&#x27;: &#x27;POINT (13.400092 52.521507)&#x27;, &#x27;id&#x27;: 5}</span>
<span class="hljs-comment"># {&#x27;name&#x27;: &#x27;Shop F&#x27;, &#x27;geo&#x27;: &#x27;POINT (13.408529 52.519274)&#x27;, &#x27;id&#x27;: 6}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-type">float</span> <span class="hljs-variable">topLeftLon</span> <span class="hljs-operator">=</span> <span class="hljs-number">13.403683f</span>;
<span class="hljs-type">float</span> <span class="hljs-variable">topLeftLat</span> <span class="hljs-operator">=</span> <span class="hljs-number">52.520711f</span>;
<span class="hljs-type">float</span> <span class="hljs-variable">bottomRightLon</span> <span class="hljs-operator">=</span> <span class="hljs-number">13.455868f</span>;
<span class="hljs-type">float</span> <span class="hljs-variable">bottomRightLat</span> <span class="hljs-operator">=</span> <span class="hljs-number">52.495862f</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">boundingBoxWkt</span> <span class="hljs-operator">=</span> String.format(<span class="hljs-string">&quot;POLYGON((%f %f, %f %f, %f %f, %f %f, %f %f))&quot;</span>,
        topLeftLon, topLeftLat, bottomRightLon, topLeftLat, bottomRightLon, bottomRightLat,
        topLeftLon, bottomRightLat, topLeftLon, topLeftLat);

<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> String.format(<span class="hljs-string">&quot;st_within(geo, &#x27;%s&#x27;)&quot;</span>, boundingBoxWkt);
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(COLLECTION_NAME)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>))
        .build());
List&lt;QueryResp.QueryResult&gt; queryResults = queryResp.getQueryResults();
System.out.println(<span class="hljs-string">&quot;Query results:&quot;</span>);
<span class="hljs-keyword">for</span> (QueryResp.QueryResult result : queryResults) {
    System.out.println(result.getEntity());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> top_left_lon = <span class="hljs-number">13.403683</span>;
<span class="hljs-keyword">const</span> top_left_lat = <span class="hljs-number">52.520711</span>;
<span class="hljs-keyword">const</span> bottom_right_lon = <span class="hljs-number">13.455868</span>;
<span class="hljs-keyword">const</span> bottom_right_lat = <span class="hljs-number">52.495862</span>;
<span class="hljs-keyword">const</span> bounding_box_wkt = <span class="hljs-string">`POLYGON((<span class="hljs-subst">${top_left_lon}</span> <span class="hljs-subst">${top_left_lat}</span>, <span class="hljs-subst">${bottom_right_lon}</span> <span class="hljs-subst">${top_left_lat}</span>, <span class="hljs-subst">${bottom_right_lon}</span> <span class="hljs-subst">${bottom_right_lat}</span>, <span class="hljs-subst">${top_left_lon}</span> <span class="hljs-subst">${bottom_right_lat}</span>, <span class="hljs-subst">${top_left_lon}</span> <span class="hljs-subst">${top_left_lat}</span>))`</span>;

<span class="hljs-keyword">const</span> query_results = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">query</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;geo_collection&#x27;</span>,
<span class="highlighted-wrapper-line">  <span class="hljs-attr">filter</span>: <span class="hljs-string">`st_within(geo, &#x27;<span class="hljs-subst">${bounding_box_wkt}</span>&#x27;)`</span>,</span>
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;name&#x27;</span>, <span class="hljs-string">&#x27;geo&#x27;</span>],
});
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> ret <span class="hljs-keyword">of</span> query_results.<span class="hljs-property">data</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(ret);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Find-entities-within-1km-of-a-central-point" class="common-anchor-header">Contoh 2: Menemukan entitas dalam jarak 1 km dari titik pusat</h4><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">center_point_lon, center_point_lat = <span class="hljs-number">13.403683</span>, <span class="hljs-number">52.520711</span>
radius_meters = <span class="hljs-number">1000.0</span>
central_point_wkt = <span class="hljs-string">f&quot;POINT(<span class="hljs-subst">{center_point_lon}</span> <span class="hljs-subst">{center_point_lat}</span>)&quot;</span>

query_results = milvus_client.query(
    collection_name,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;st_dwithin(geo, &#x27;<span class="hljs-subst">{central_point_wkt}</span>&#x27;, <span class="hljs-subst">{radius_meters}</span>)&quot;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>]
)
<span class="hljs-keyword">for</span> ret <span class="hljs-keyword">in</span> query_results:
    <span class="hljs-built_in">print</span>(ret)
    
<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># hit: {&#x27;id&#x27;: 4, &#x27;distance&#x27;: 0.9823770523071289, &#x27;entity&#x27;: {&#x27;name&#x27;: &#x27;Shop D&#x27;, &#x27;geo&#x27;: &#x27;POINT (13.408223 52.516876)&#x27;}}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-type">float</span> <span class="hljs-variable">centerPointLon</span> <span class="hljs-operator">=</span> <span class="hljs-number">13.403683f</span>;
<span class="hljs-type">float</span> <span class="hljs-variable">centerPointLat</span> <span class="hljs-operator">=</span> <span class="hljs-number">52.520711f</span>;
<span class="hljs-type">float</span> <span class="hljs-variable">radiusMeters</span> <span class="hljs-operator">=</span> <span class="hljs-number">1000.0f</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">centralPointWkt</span> <span class="hljs-operator">=</span> String.format(<span class="hljs-string">&quot;POINT(%f %f)&quot;</span>, centerPointLon, centerPointLat);
String filter=String.format(<span class="hljs-string">&quot;st_dwithin(geo, &#x27;%s&#x27;, %f)&quot;</span>, centralPointWkt, radiusMeters);
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(COLLECTION_NAME)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>))
        .build());
List&lt;QueryResp.QueryResult&gt; queryResults = queryResp.getQueryResults();
System.out.println(<span class="hljs-string">&quot;Query results:&quot;</span>);
<span class="hljs-keyword">for</span> (QueryResp.QueryResult result : queryResults) {
    System.out.println(result.getEntity());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> center_point_lon = <span class="hljs-number">13.403683</span>;
<span class="hljs-keyword">const</span> center_point_lat = <span class="hljs-number">52.520711</span>;
<span class="hljs-keyword">const</span> radius_meters = <span class="hljs-number">1000.0</span>;
<span class="hljs-keyword">const</span> central_point_wkt = <span class="hljs-string">`POINT(<span class="hljs-subst">${center_point_lon}</span> <span class="hljs-subst">${center_point_lat}</span>)`</span>;

<span class="hljs-keyword">const</span> query_results_dwithin = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">query</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;geo_collection&#x27;</span>,
<span class="highlighted-wrapper-line">  <span class="hljs-attr">filter</span>: <span class="hljs-string">`st_dwithin(geo, &#x27;<span class="hljs-subst">${central_point_wkt}</span>&#x27;, <span class="hljs-subst">${radius_meters}</span>)`</span>,</span>
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;name&#x27;</span>, <span class="hljs-string">&#x27;geo&#x27;</span>],
});
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> ret <span class="hljs-keyword">of</span> query_results_dwithin.<span class="hljs-property">data</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(ret);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-3-Combine-vector-similarity-with-a-spatial-filter" class="common-anchor-header">Contoh 3: Menggabungkan kemiripan vektor dengan filter spasial</h4><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">vectors_to_search = rng.random((<span class="hljs-number">1</span>, dim))
result = milvus_client.search(
    collection_name,
    vectors_to_search,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>],
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;st_within(geo, &#x27;<span class="hljs-subst">{bounding_box_wkt}</span>&#x27;)&quot;</span></span>
)
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> result:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;hit: <span class="hljs-subst">{hit}</span>&quot;</span>)
        
<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># hit: {&#x27;id&#x27;: 6, &#x27;distance&#x27;: 1.3406795263290405, &#x27;entity&#x27;: {&#x27;name&#x27;: &#x27;Shop F&#x27;, &#x27;geo&#x27;: &#x27;POINT (13.408529 52.519274)&#x27;}}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-type">Random</span> <span class="hljs-variable">ran</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">d</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; d &lt; DIM; ++d) {
    vector.add(ran.nextFloat());
}
String filter=String.format(<span class="hljs-string">&quot;st_within(geo, &#x27;%s&#x27;)&quot;</span>, boundingBoxWkt);
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(vector)))
        .limit(<span class="hljs-number">3</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>))
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">statusR</span> <span class="hljs-operator">=</span> client.search(request);
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = statusR.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.printf(<span class="hljs-string">&quot;ID: %d, Score: %f, %s\n&quot;</span>, (<span class="hljs-type">long</span>)result.getId(), result.getScore(), result.getEntity().toString());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> vectors_to_search = [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>]];
<span class="hljs-keyword">const</span> search_results = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;geo_collection&quot;</span>,
  <span class="hljs-attr">vectors</span>: vectors_to_search,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>],
<span class="highlighted-wrapper-line">  <span class="hljs-attr">filter</span>: <span class="hljs-string">`st_within(geo, &#x27;<span class="hljs-subst">${bounding_box_wkt}</span>&#x27;)`</span>,</span>
});
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> hits <span class="hljs-keyword">of</span> search_results.<span class="hljs-property">results</span>) {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> hit <span class="hljs-keyword">of</span> hits) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`hit: <span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(hit)}</span>`</span>);
  }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Next-Accelerate-queries" class="common-anchor-header">Berikutnya: Mempercepat kueri<button data-href="#Next-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Secara default, kueri pada bidang <code translate="no">GEOMETRY</code> tanpa indeks akan melakukan pemindaian penuh terhadap semua baris, yang dapat berjalan lambat pada kumpulan data yang besar. Untuk mempercepat kueri geometri, buat indeks <code translate="no">RTREE</code> pada bidang GEOMETRI Anda.</p>
<p>Untuk detailnya, lihat <a href="/docs/id/rtree.md">RTREE</a>.</p>
<h2 id="FAQ" class="common-anchor-header">PERTANYAAN UMUM<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="If-Ive-enabled-the-dynamic-field-feature-for-my-collection-can-I-insert-geometric-data-into-a-dynamic-field-key" class="common-anchor-header">Jika saya telah mengaktifkan fitur bidang dinamis untuk koleksi saya, dapatkah saya memasukkan data geometri ke dalam kunci bidang dinamis?<button data-href="#If-Ive-enabled-the-dynamic-field-feature-for-my-collection-can-I-insert-geometric-data-into-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Tidak, data geometri tidak dapat dimasukkan ke dalam field dinamis. Sebelum memasukkan data geometri, pastikan bidang <code translate="no">GEOMETRY</code> telah didefinisikan secara eksplisit dalam skema koleksi Anda.</p>
<h3 id="Does-the-GEOMETRY-field-support-the-mmap-feature" class="common-anchor-header">Apakah field GEOMETRI mendukung fitur mmap?<button data-href="#Does-the-GEOMETRY-field-support-the-mmap-feature" class="anchor-icon" translate="no">
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
    </button></h3><p>Ya, bidang <code translate="no">GEOMETRY</code> mendukung mmap. Untuk informasi lebih lanjut, lihat <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">Menggunakan mmap</a>.</p>
<h3 id="Can-I-define-the-GEOMETRY-field-as-nullable-or-set-a-default-value" class="common-anchor-header">Dapatkah saya mendefinisikan bidang GEOMETRI sebagai nullable atau menetapkan nilai default?<button data-href="#Can-I-define-the-GEOMETRY-field-as-nullable-or-set-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>Ya, bidang GEOMETRI mendukung atribut <code translate="no">nullable</code> dan nilai default dalam format WKT. Untuk informasi lebih lanjut, lihat <a href="/docs/id/nullable-and-default.md">Nullable &amp; Default</a>.</p>
