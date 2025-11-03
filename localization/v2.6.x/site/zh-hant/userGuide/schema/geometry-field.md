---
id: geometry-field.md
title: 幾何領域Compatible with Milvus 2.6.4+
summary: >-
  在建立地理資訊系統 (GIS)、繪圖工具或定位服務等應用程式時，您經常需要儲存和查詢幾何資料。Milvus 中的 GEOMETRY
  資料類型透過提供儲存和查詢彈性幾何資料的原生方式，解決了這個難題。
beta: Milvus 2.6.4+
---
<h1 id="Geometry-Field" class="common-anchor-header">幾何領域<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Geometry-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>在建立地理資訊系統 (GIS)、繪圖工具或定位服務等應用程式時，您經常需要儲存和查詢幾何資料。Milvus 中的<code translate="no">GEOMETRY</code> 資料類型提供了儲存和查詢彈性幾何資料的原生方式，解決了這個難題。</p>
<p>例如，當您需要結合向量相似性與空間限制時，請使用 GEOMETRY 欄位：</p>
<ul>
<li><p>位置基礎服務 (LBS)：「尋找此城市區塊<strong>內</strong>相似的 POI」。</p></li>
<li><p>多模式搜尋："檢索此點<strong>1 公里範圍內的</strong>相似照片</p></li>
<li><p>地圖與物流：「區域<strong>內的</strong>資產 」或<strong>「與</strong>路徑<strong>相交的</strong>路線」</p></li>
</ul>
<div class="alert note">
<p>GEOMETRY 欄位需要 PyMilvus 2.7.0rc46 或更新版本。這個版本目前只能從原始碼建立。有關說明，請參閱<a href="https://github.com/milvus-io/pymilvus#faq">如何從原始碼建立 PyMilvus</a>。</p>
</div>
<h2 id="What-is-a-GEOMETRY-field" class="common-anchor-header">什麼是 GEOMETRY 欄位？<button data-href="#What-is-a-GEOMETRY-field" class="anchor-icon" translate="no">
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
    </button></h2><p>GEOMETRY 欄位是 Milvus 中一個模式定義的資料類型 (<code translate="no">DataType.GEOMETRY</code>) ，用來儲存幾何資料。當處理幾何欄位時，您使用<a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">Well-Known Text (WKT)</a>格式與資料互動，這是一種人類可讀的表示法，用於插入資料和查詢。在內部，Milvus 會將 WKT 轉換為<a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry#Well-known_binary">Well-Known Binary (WKB)</a>，以提高儲存和處理效率，但您不需要直接處理 WKB。</p>
<p><code translate="no">GEOMETRY</code> 資料類型支援下列幾何物件：</p>
<ul>
<li><p><strong>POINT</strong>:<code translate="no">POINT (x y)</code>; 例如，<code translate="no">POINT (13.403683 52.520711)</code> ，其中<code translate="no">x</code> = 經度，<code translate="no">y</code> = 緯度</p></li>
<li><p><strong>LINESTRING</strong>:<code translate="no">LINESTRING (x1 y1, x2 y2, …)</code>; 舉例來說、<code translate="no">LINESTRING (13.40 52.52, 13.41 52.51)</code></p></li>
<li><p><strong>POLYGON</strong>:<code translate="no">POLYGON ((x1 y1, x2 y2, x3 y3, x1 y1))</code>; 例如、<code translate="no">POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))</code></p></li>
<li><p><strong>MULTIPOINT</strong>:<code translate="no">MULTIPOINT ((x1 y1), (x2 y2), …)</code>, 例如、<code translate="no">MULTIPOINT ((10 40), (40 30), (20 20), (30 10))</code></p></li>
<li><p><strong>multilinestring</strong>：<code translate="no">MULTILINESTRING ((x1 y1, …), (xk yk, …))</code>, 例如<code translate="no">MULTILINESTRING ((10 10, 20 20, 10 40), (40 40, 30 30, 40 20, 30 10))</code></p></li>
<li><p><strong>MULTIPOLYGON</strong>:<code translate="no">MULTIPOLYGON (((outer ring ...)), ((outer ring ...)))</code>, 例如、<code translate="no">MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))</code></p></li>
<li><p><strong>GEOMETRYCOLLECTION</strong>:<code translate="no">GEOMETRYCOLLECTION(POINT(x y), LINESTRING(x1 y1, x2 y2), ...)</code>, 例如、<code translate="no">GEOMETRYCOLLECTION (POINT (40 10), LINESTRING (10 10, 20 20, 10 40), POLYGON ((40 40, 20 45, 45 30, 40 40)))</code></p></li>
</ul>
<h2 id="Basic-operations" class="common-anchor-header">基本操作<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p>使用<code translate="no">GEOMETRY</code> 欄位的工作流程包括在集合模式中定義、插入幾何資料，然後再使用特定的篩選表達式查詢資料。</p>
<h3 id="Step-1-Define-a-GEOMETRY-field" class="common-anchor-header">步驟 1：定義 GEOMETRY 欄位<button data-href="#Step-1-Define-a-GEOMETRY-field" class="anchor-icon" translate="no">
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
    </button></h3><p>要使用<code translate="no">GEOMETRY</code> 欄位，請在建立集合時，在集合模式中明確定義。以下範例示範如何建立具有<code translate="no">geo</code> 欄位類型<code translate="no">DataType.GEOMETRY</code> 的集合。</p>
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
<p>在這個範例中，在集合模式中定義的<code translate="no">GEOMETRY</code> 欄位允許使用<code translate="no">nullable=True</code> 的 null 值。詳情請參閱<a href="/docs/zh-hant/nullable-and-default.md">Nullable &amp; Default</a>。</p>
</div>
<h3 id="Step-2-Insert-data" class="common-anchor-header">步驟 2：插入資料<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>以<a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">WKT</a>格式插入具有幾何資料的實體。下面是一個有幾個地理點的範例：</p>
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
<h3 id="Step-3-Filtering-operations" class="common-anchor-header">步驟 3：篩選作業<button data-href="#Step-3-Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p>在您可以對<code translate="no">GEOMETRY</code> 欄位執行篩選操作之前，請確定：</p>
<ul>
<li><p>您已為每個向量欄位建立索引。</p></li>
<li><p>集合已載入記憶體。</p></li>
</ul>
<p><details></p>
<p><summary>顯示程式碼</summary></p>
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
<p>一旦滿足這些要求，您就可以使用具有專用幾何運算符號的表達式，根據幾何值篩選集合。</p>
<h4 id="Define-filter-expressions" class="common-anchor-header">定義篩選表達式</h4><p>若要對<code translate="no">GEOMETRY</code> 欄位進行篩選，請使用具備下列表達式格式的幾何專用運算符：<code translate="no">&quot;{operator}(geo_field,'{wkt}')&quot;</code>其中：</p>
<ul>
<li><p><code translate="no">{operator}</code> 是支援的幾何運算符號 (例如<code translate="no">ST_CONTAINS</code>,<code translate="no">ST_INTERSECTS</code>)。如需可用運算符的完整清單，請參閱<a href="/docs/zh-hant/geometry-operators.md">幾何運算符</a>。</p></li>
<li><p><code translate="no">geo_field</code> 是在集合模式中定義的<code translate="no">GEOMETRY</code> 欄位的名稱。</p></li>
<li><p><code translate="no">'{wkt}'</code> 是 WKT 字串，代表您要篩選的幾何物件。</p></li>
</ul>
<div class="alert note">
<p>某些運算符號，例如<code translate="no">ST_DWITHIN</code> ，可能需要額外的參數。有關各運算符的詳細資訊和使用範例，請參閱<a href="/docs/zh-hant/geometry-operators.md">幾何運算符</a>。</p>
</div>
<p>以下範例示範如何在篩選表達式中使用不同的特定幾何運算符：</p>
<h4 id="Example-1-Find-entities-within-a-rectangular-area" class="common-anchor-header">範例 1：尋找矩形區域內的實體</h4><div class="multipleCode">
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
<h4 id="Example-2-Find-entities-within-1km-of-a-central-point" class="common-anchor-header">範例 2：尋找距離中心點 1 公里範圍內的實體</h4><div class="multipleCode">
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
<h4 id="Example-3-Combine-vector-similarity-with-a-spatial-filter" class="common-anchor-header">範例 3：結合向量相似性與空間篩選器</h4><div class="multipleCode">
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
<h2 id="Next-Accelerate-queries" class="common-anchor-header">下一個：加速查詢<button data-href="#Next-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>預設情況下，在沒有索引的情況下，對<code translate="no">GEOMETRY</code> 欄位進行查詢時，會對所有行執行完整掃描，這在大型資料集上可能會很慢。若要加速幾何查詢，請在 GEOMETRY 欄位上建立<code translate="no">RTREE</code> 索引。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/rtree.md">RTREE</a>。</p>
<h2 id="FAQ" class="common-anchor-header">常見問題<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="If-Ive-enabled-the-dynamic-field-feature-for-my-collection-can-I-insert-geometric-data-into-a-dynamic-field-key" class="common-anchor-header">如果我啟用了資料集的動態欄位功能，我可以將幾何資料插入動態欄位鍵嗎？<button data-href="#If-Ive-enabled-the-dynamic-field-feature-for-my-collection-can-I-insert-geometric-data-into-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>不可以，幾何資料不能插入動態欄位。在插入幾何資料之前，請確定<code translate="no">GEOMETRY</code> 欄位已在您的資料庫模式中明確定義。</p>
<h3 id="Does-the-GEOMETRY-field-support-the-mmap-feature" class="common-anchor-header">GEOMETRY 欄位是否支援 mmap 功能？<button data-href="#Does-the-GEOMETRY-field-support-the-mmap-feature" class="anchor-icon" translate="no">
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
    </button></h3><p>是的，<code translate="no">GEOMETRY</code> 欄位支援 mmap。如需詳細資訊，請參閱<a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">使用 mmap</a>。</p>
<h3 id="Can-I-define-the-GEOMETRY-field-as-nullable-or-set-a-default-value" class="common-anchor-header">我是否可以將 GEOMETRY 欄位定義為可為空或設定預設值？<button data-href="#Can-I-define-the-GEOMETRY-field-as-nullable-or-set-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>可以，GEOMETRY 欄位支援<code translate="no">nullable</code> 屬性和 WKT 格式的預設值。如需詳細資訊，請參閱<a href="/docs/zh-hant/nullable-and-default.md">Nullable &amp; Default</a>。</p>
