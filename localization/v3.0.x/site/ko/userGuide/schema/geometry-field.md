---
id: geometry-field.md
title: 기하학 필드Compatible with Milvus 2.6.4+
summary: >-
  지리 정보 시스템(GIS), 매핑 도구 또는 위치 기반 서비스와 같은 애플리케이션을 구축할 때 기하학적 데이터를 저장하고 쿼리해야 하는
  경우가 많습니다. Milvus의 지리 데이터 유형은 유연한 기하학적 데이터를 저장하고 쿼리하는 기본 방법을 제공하여 이 문제를 해결합니다.
beta: Milvus 2.6.4+
---
<h1 id="Geometry-Field" class="common-anchor-header">기하학 필드<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Geometry-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>지리 정보 시스템(GIS), 매핑 도구 또는 위치 기반 서비스와 같은 애플리케이션을 구축할 때 기하학적 데이터를 저장하고 쿼리해야 하는 경우가 많습니다. Milvus의 <code translate="no">GEOMETRY</code> 데이터 유형은 유연한 기하학적 데이터를 저장하고 쿼리하는 기본 방법을 제공하여 이 문제를 해결합니다.</p>
<p>예를 들어 벡터 유사성을 공간 제약 조건과 결합해야 할 때는 기하학 필드를 사용하세요:</p>
<ul>
<li><p>위치 기반 서비스(LBS): "이 도시 블록 <strong>내에서</strong> 유사한 POI 찾기"</p></li>
<li><p>다중 모드 검색: "이 지점에서 <strong>1km 이내에</strong> 있는 유사한 사진 검색"</p></li>
<li><p>지도 및 물류: "한 지역 <strong>내의</strong> 자산" 또는 "경로와 <strong>교차하는</strong> 경로"</p></li>
</ul>
<div class="alert note">
<p>지오메트리 필드를 사용하려면 SDK를 최신 버전으로 업그레이드하세요.</p>
</div>
<h2 id="What-is-a-GEOMETRY-field" class="common-anchor-header">지오메트리 필드란 무엇인가요?<button data-href="#What-is-a-GEOMETRY-field" class="anchor-icon" translate="no">
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
    </button></h2><p>지오메트리 필드는 기하학적 데이터를 저장하는 Milvus의 스키마 정의 데이터 유형(<code translate="no">DataType.GEOMETRY</code>)입니다. 기하학 필드로 작업할 때는 데이터 삽입과 쿼리 모두에 사용되는 사람이 읽을 수 있는 표현인 <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">WKT(잘 알려진 텍스트)</a> 형식을 사용하여 데이터와 상호 작용합니다. 내부적으로 Milvus는 효율적인 저장 및 처리를 위해 WKT를 <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry#Well-known_binary">잘 알려진 바이너리(WKB)</a> 로 변환하지만, 사용자가 직접 WKB를 처리할 필요는 없습니다.</p>
<p><code translate="no">GEOMETRY</code> 데이터 유형은 다음과 같은 기하학적 객체를 지원합니다:</p>
<ul>
<li><p><strong>포인트</strong>: <code translate="no">POINT (x y)</code>; 예: <code translate="no">POINT (13.403683 52.520711)</code>, 여기서 <code translate="no">x</code> = 경도, <code translate="no">y</code> = 위도</p></li>
<li><p><strong>선형</strong>: <code translate="no">LINESTRING (x1 y1, x2 y2, …)</code>; 예, <code translate="no">LINESTRING (13.40 52.52, 13.41 52.51)</code></p></li>
<li><p><strong>다각형</strong>: <code translate="no">POLYGON ((x1 y1, x2 y2, x3 y3, x1 y1))</code>; 예, <code translate="no">POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))</code></p></li>
<li><p><strong>멀티포인트</strong>: <code translate="no">MULTIPOINT ((x1 y1), (x2 y2), …)</code>, 예시, <code translate="no">MULTIPOINT ((10 40), (40 30), (20 20), (30 10))</code></p></li>
<li><p><strong>다중 문자열</strong> <code translate="no">MULTILINESTRING ((x1 y1, …), (xk yk, …))</code> 예를 들어 <code translate="no">MULTILINESTRING ((10 10, 20 20, 10 40), (40 40, 30 30, 40 20, 30 10))</code></p></li>
<li><p><strong>다중다각형</strong>: <code translate="no">MULTIPOLYGON (((outer ring ...)), ((outer ring ...)))</code>, 예를 들어, <code translate="no">MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))</code></p></li>
<li><p><strong>geometrycollection</strong>: <code translate="no">GEOMETRYCOLLECTION(POINT(x y), LINESTRING(x1 y1, x2 y2), ...)</code>, 예를 들어, <code translate="no">GEOMETRYCOLLECTION (POINT (40 10), LINESTRING (10 10, 20 20, 10 40), POLYGON ((40 40, 20 45, 45 30, 40 40)))</code></p></li>
</ul>
<h2 id="Basic-operations" class="common-anchor-header">기본 작업<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">GEOMETRY</code> 필드를 사용하기 위한 워크플로에는 컬렉션 스키마에서 필드를 정의하고, 기하학적 데이터를 삽입한 다음, 특정 필터 표현식을 사용하여 데이터를 쿼리하는 단계가 포함됩니다.</p>
<h3 id="Step-1-Define-a-GEOMETRY-field" class="common-anchor-header">1단계: 기하학 필드 정의하기<button data-href="#Step-1-Define-a-GEOMETRY-field" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">GEOMETRY</code> 필드를 사용하려면 컬렉션을 만들 때 컬렉션 스키마에 명시적으로 정의합니다. 다음 예는 <code translate="no">DataType.GEOMETRY</code> 유형의 <code translate="no">geo</code> 필드가 있는 컬렉션을 만드는 방법을 보여줍니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<p>이 예제에서 컬렉션 스키마에 정의된 <code translate="no">GEOMETRY</code> 필드는 <code translate="no">nullable=True</code> 으로 null 값을 허용합니다. 자세한 내용은 <a href="/docs/ko/nullable-and-default.md">Null 가능 및 기본값을</a> 참조하세요.</p>
</div>
<h3 id="Step-2-Insert-data" class="common-anchor-header">2단계: 데이터 삽입<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>지오메트리 데이터가 있는 엔티티를 <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">WKT</a> 형식으로 삽입합니다. 다음은 여러 지오포인트가 포함된 예제입니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<h3 id="Step-3-Filtering-operations" class="common-anchor-header">3단계: 필터링 작업<button data-href="#Step-3-Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">GEOMETRY</code> 필드에서 필터링 작업을 수행하려면 먼저 다음을 확인해야 합니다:</p>
<ul>
<li><p>각 벡터 필드에 인덱스를 만들었습니다.</p></li>
<li><p>컬렉션이 메모리에 로드됩니다.</p></li>
</ul>
<p><details></p>
<p><summary>코드 보기</summary></p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<p>이러한 요구 사항이 충족되면 전용 기하학 연산자가 포함된 표현식을 사용하여 기하학 값을 기반으로 컬렉션을 필터링할 수 있습니다.</p>
<h4 id="Define-filter-expressions" class="common-anchor-header">필터 표현식 정의하기</h4><p><code translate="no">GEOMETRY</code> 필드를 필터링하려면 표현식에 기하 도형 연산자를 사용합니다:</p>
<ul>
<li><p>일반: <code translate="no">{operator}(geo_field, '{wkt}')</code></p></li>
<li><p>거리 기반: <code translate="no">ST_DWITHIN(geo_field, '{wkt}', distance)</code></p></li>
</ul>
<p>Where:</p>
<ul>
<li><p><code translate="no">operator</code> 는 지원되는 기하 도형 연산자 중 하나입니다(예: <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_INTERSECTS</code>). 연산자 이름은 모두 대문자 또는 모두 소문자여야 합니다. 지원되는 연산자 목록은 <a href="/docs/ko/geometry-operators.md#Supported-geometry-operators">지원되는 지오메트리 연산자를</a> 참조하십시오.</p></li>
<li><p><code translate="no">geo_field</code> 는 <code translate="no">GEOMETRY</code> 필드의 이름입니다.</p></li>
<li><p><code translate="no">'{wkt}'</code> 는 쿼리할 지오메트리의 WKT 표현입니다.</p></li>
<li><p><code translate="no">distance</code> 는 <code translate="no">ST_DWITHIN</code> 에 대한 임계값입니다.</p></li>
</ul>
<p>다음 예에서는 필터 표현식에서 다양한 도형 관련 연산자를 사용하는 방법을 보여 줍니다:</p>
<h4 id="Example-1-Find-entities-within-a-rectangular-area" class="common-anchor-header">예제 1: 예 1: 직사각형 영역 내의 엔티티 찾기</h4><div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<h4 id="Example-2-Find-entities-within-1km-of-a-central-point" class="common-anchor-header">예 2: 중심점으로부터 1km 이내의 엔티티 찾기</h4><div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<h4 id="Example-3-Combine-vector-similarity-with-a-spatial-filter" class="common-anchor-header">예 3: 벡터 유사도를 공간 필터와 결합하기</h4><div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
<h2 id="Next-Accelerate-queries" class="common-anchor-header">다음: 쿼리 가속화<button data-href="#Next-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>기본적으로 인덱스가 없는 <code translate="no">GEOMETRY</code> 필드에 대한 쿼리는 모든 행에 대한 전체 스캔을 수행하므로 대규모 데이터 세트에서는 속도가 느려질 수 있습니다. 기하학 쿼리 속도를 높이려면 GEOMETRY 필드에 <code translate="no">RTREE</code> 인덱스를 만드세요.</p>
<p>자세한 내용은 <a href="/docs/ko/rtree.md">RTREE를</a> 참조하세요.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="If-Ive-enabled-the-dynamic-field-feature-for-my-collection-can-I-insert-geometric-data-into-a-dynamic-field-key" class="common-anchor-header">컬렉션에 동적 필드 기능을 활성화한 경우, 동적 필드 키에 기하 도형 데이터를 삽입할 수 있나요?<button data-href="#If-Ive-enabled-the-dynamic-field-feature-for-my-collection-can-I-insert-geometric-data-into-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>아니요, 도형 데이터는 동적 필드에 삽입할 수 없습니다. 기하 도형 데이터를 삽입하기 전에 컬렉션 스키마에 <code translate="no">GEOMETRY</code> 필드가 명시적으로 정의되어 있는지 확인하세요.</p>
<h3 id="Does-the-GEOMETRY-field-support-the-mmap-feature" class="common-anchor-header">도형 필드가 mmap 기능을 지원하나요?<button data-href="#Does-the-GEOMETRY-field-support-the-mmap-feature" class="anchor-icon" translate="no">
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
    </button></h3><p>예. <code translate="no">GEOMETRY</code> 필드는 mmap을 지원합니다. 자세한 내용은 <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">mmap 사용을</a> 참조하세요.</p>
<h3 id="Can-I-define-the-GEOMETRY-field-as-nullable-or-set-a-default-value" class="common-anchor-header">GEOMETRY 필드를 null 가능으로 정의하거나 기본값을 설정할 수 있나요?<button data-href="#Can-I-define-the-GEOMETRY-field-as-nullable-or-set-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>예, GEOMETRY 필드는 <code translate="no">nullable</code> 속성과 WKT 형식의 기본값을 지원합니다. 자세한 내용은 <a href="/docs/ko/nullable-and-default.md">Null 가능 및 기본값을</a> 참조하세요.</p>
