---
id: geometry-field.md
title: ジオメトリ・フィールドCompatible with Milvus 2.6.4+
summary: >-
  地理情報システム(GIS)、マッピングツール、またはロケーションベースのサービスなどのアプリケーションを構築する場合、幾何学的なデータを格納し、クエリする必要があります。MilvusのGEOMETRYデータ型は、柔軟な幾何学データを格納し、照会するネイティブな方法を提供することで、この課題を解決します。
beta: Milvus 2.6.4+
---
<h1 id="Geometry-Field" class="common-anchor-header">ジオメトリ・フィールド<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Geometry-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>地理情報システム(GIS)、マッピングツール、位置情報サービスなどのアプリケーションを構築する際、幾何学的データを格納し、クエリする必要がよくあります。Milvusの<code translate="no">GEOMETRY</code> データ型は、柔軟なジオメトリデータを格納し、クエリするネイティブな方法を提供することで、この課題を解決します。</p>
<p>例えば、ベクトルの類似性と空間制約を組み合わせる必要がある場合、GEOMETRYフィールドを使用します：</p>
<ul>
<li><p>ロケーションベースサービス（LBS）："この街<strong>区内で</strong>類似のPOIを見つける"</p></li>
<li><p>マルチモーダル検索：「この地点から<strong>1km以内の</strong>類似写真を検索する。</p></li>
<li><p>地図と物流："地域<strong>内の</strong>資産 "や "<strong>経路と交差する</strong>ルート"</p></li>
</ul>
<h2 id="What-is-a-GEOMETRY-field" class="common-anchor-header">GEOMETRYフィールドとは？<button data-href="#What-is-a-GEOMETRY-field" class="anchor-icon" translate="no">
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
    </button></h2><p>GEOMETRYフィールドとは、Milvusのスキーマ定義データタイプ(<code translate="no">DataType.GEOMETRY</code>)の一つで、ジオメトリデータを格納するフィールドです。ジオメトリ フィールドを扱う際には、<a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">WKT (Well-Known Text)</a>フォーマットを使用してデータを扱います。Milvusは内部的にWKTを<a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry#Well-known_binary">WKB(Well-Known Binary)</a>に変換して効率的な保存と処理を行っていますが、WKBを直接扱う必要はありません。</p>
<p><code translate="no">GEOMETRY</code> データ型は以下の幾何学オブジェクトをサポートしています：</p>
<ul>
<li><p><strong>POINT</strong>:<code translate="no">POINT (x y)</code>; たとえば、<code translate="no">POINT (13.403683 52.520711)</code> （<code translate="no">x</code> = 経度、<code translate="no">y</code> = 緯度）。</p></li>
<li><p><strong>LINESTRING</strong>:<code translate="no">LINESTRING (x1 y1, x2 y2, …)</code> など、<code translate="no">LINESTRING (13.40 52.52, 13.41 52.51)</code></p></li>
<li><p><strong>POLYGON</strong>:<code translate="no">POLYGON ((x1 y1, x2 y2, x3 y3, x1 y1))</code> など、<code translate="no">POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))</code></p></li>
<li><p><strong>MULTIPOINT</strong>:<code translate="no">MULTIPOINT ((x1 y1), (x2 y2), …)</code> など、<code translate="no">MULTIPOINT ((10 40), (40 30), (20 20), (30 10))</code></p></li>
<li><p><strong>multilinestring</strong>：<code translate="no">MULTILINESTRING ((x1 y1, …), (xk yk, …))</code>例えば<code translate="no">MULTILINESTRING ((10 10, 20 20, 10 40), (40 40, 30 30, 40 20, 30 10))</code></p></li>
<li><p><strong>MULTIPOLYGON</strong>:<code translate="no">MULTIPOLYGON (((outer ring ...)), ((outer ring ...)))</code> など、<code translate="no">MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))</code></p></li>
<li><p><strong>GEOMETRYCOLLECTION</strong>:<code translate="no">GEOMETRYCOLLECTION(POINT(x y), LINESTRING(x1 y1, x2 y2), ...)</code> など、<code translate="no">GEOMETRYCOLLECTION (POINT (40 10), LINESTRING (10 10, 20 20, 10 40), POLYGON ((40 40, 20 45, 45 30, 40 40)))</code></p></li>
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
    </button></h2><p><code translate="no">GEOMETRY</code> フィールドを使用するワークフローでは、コレクションスキーマでそれを定義し、ジオメトリ データを挿入し、特定のフィルタ式を使用してデータをクエリします。</p>
<h3 id="Step-1-Define-a-GEOMETRY-field" class="common-anchor-header">ステップ 1: GEOMETRY フィールドの定義<button data-href="#Step-1-Define-a-GEOMETRY-field" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">GEOMETRY</code> フィールドを使用するには、コレクションの作成時にコレクションスキーマで明示的に定義します。次の例は、<code translate="no">DataType.GEOMETRY</code> 型の<code translate="no">geo</code> フィールドを持つコレクションを作成する方法を示しています。</p>
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
<div class="alert note">
<p>この例では、コレクションスキーマで定義された<code translate="no">GEOMETRY</code> フィールドは、<code translate="no">nullable=True</code> でヌル値を許可します。詳細は、<a href="/docs/ja/nullable-and-default.md">Nullable &amp; Default</a> を参照してください。</p>
</div>
<h3 id="Step-2-Insert-data" class="common-anchor-header">ステップ 2: データの挿入<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">WKT</a>形式のジオメトリデータを持つエンティティを挿入する。以下は、複数のジオポイントを持つ例です：</p>
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
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Filtering-operations" class="common-anchor-header">ステップ 3：フィルタリング操作<button data-href="#Step-3-Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">GEOMETRY</code> フィールドに対してフィルタリング操作を実行する前に、以下を確認してください：</p>
<ul>
<li><p>各ベクトルフィールドにインデックスが作成されている。</p></li>
<li><p>コレクションがメモリにロードされている。</p></li>
</ul>
<p><details></p>
<p><summary>コードの表示</summary></p>
<pre><code translate="no" class="language-python">index_params = milvus_client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;embeddings&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

milvus_client.create_index(collection_name, index_params)
milvus_client.load_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>これらの要件が満たされると、専用のジオメトリ演算子を持つ式を使用して、ジオメトリ値に基づいてコレクションをフィルタリングできます。</p>
<h4 id="Define-filter-expressions" class="common-anchor-header">フィルタ式の定義</h4><p><code translate="no">GEOMETRY</code> フィールドでフィルタするには、ジオメトリ専用の演算子を以下の式形式で使用します：<code translate="no">&quot;{operator}(geo_field,'{wkt}')&quot;</code>ここで</p>
<ul>
<li><p><code translate="no">{operator}</code> はサポートされているジオメトリ演算子（例：<code translate="no">ST_CONTAINS</code>,<code translate="no">ST_INTERSECTS</code> ）。使用可能な演算子の一覧は、「<a href="https://zilliverse.feishu.cn/wiki/SOgiwzPxpisy8MkhtuecZqFbnaf">ジオメトリ演算子</a>」を参照。</p></li>
<li><p><code translate="no">geo_field</code> は、コレクションスキーマで定義されている<code translate="no">GEOMETRY</code> フィールド名です。</p></li>
<li><p><code translate="no">'{wkt}'</code> は、フィルタするジオメトリオブジェクトを表す WKT 文字列です。</p></li>
</ul>
<div class="alert note">
<p><code translate="no">ST_DWITHIN</code> など、一部の演算子には追加のパラメータが必要な場合があります。各演算子の詳細と使用例については、<a href="https://zilliverse.feishu.cn/wiki/SOgiwzPxpisy8MkhtuecZqFbnaf">ジオメトリ演算</a>子を参照してください。</p>
</div>
<p>以下の例では、さまざまなジオメトリ固有の演算子をフィルタ式で使用する方法を示します：</p>
<h4 id="Example-1-Find-entities-within-a-rectangular-area" class="common-anchor-header">例 1：例 1：矩形領域内のエンティティを検索する</h4><pre><code translate="no" class="language-python">top_left_lon, top_left_lat = <span class="hljs-number">13.403683</span>, <span class="hljs-number">52.520711</span>
bottom_right_lon, bottom_right_lat = <span class="hljs-number">13.455868</span>, <span class="hljs-number">52.495862</span>
bounding_box_wkt = <span class="hljs-string">f&quot;POLYGON((<span class="hljs-subst">{top_left_lon}</span> <span class="hljs-subst">{top_left_lat}</span>, <span class="hljs-subst">{bottom_right_lon}</span> <span class="hljs-subst">{top_left_lat}</span>, <span class="hljs-subst">{bottom_right_lon}</span> <span class="hljs-subst">{bottom_right_lat}</span>, <span class="hljs-subst">{top_left_lon}</span> <span class="hljs-subst">{bottom_right_lat}</span>, <span class="hljs-subst">{top_left_lon}</span> <span class="hljs-subst">{top_left_lat}</span>))&quot;</span>

query_results = milvus_client.query(
    collection_name,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;st_within(geo, &#x27;<span class="hljs-subst">{bounding_box_wkt}</span>&#x27;)&quot;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>]
)
<span class="hljs-keyword">for</span> ret <span class="hljs-keyword">in</span> query_results:
    <span class="hljs-built_in">print</span>(ret)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Find-entities-within-1km-of-a-central-point" class="common-anchor-header">例 2：中心点から 1km 以内のエンティティを検索する。</h4><pre><code translate="no" class="language-python">center_point_lon, center_point_lat = <span class="hljs-number">13.403683</span>, <span class="hljs-number">52.520711</span>
radius_meters = <span class="hljs-number">1000.0</span>
central_point_wkt = <span class="hljs-string">f&quot;POINT(<span class="hljs-subst">{center_point_lon}</span> <span class="hljs-subst">{center_point_lat}</span>)&quot;</span>

query_results = milvus_client.query(
    collection_name,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;st_dwithin(geo, &#x27;<span class="hljs-subst">{central_point_wkt}</span>&#x27;, <span class="hljs-subst">{radius_meters}</span>)&quot;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>]
)
<span class="hljs-keyword">for</span> ret <span class="hljs-keyword">in</span> query_results:
    <span class="hljs-built_in">print</span>(ret)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-3-Combine-vector-similarity-with-a-spatial-filter" class="common-anchor-header">例 3: ベクトルの類似性と空間フィルタを組み合わせる</h4><pre><code translate="no" class="language-python">vectors_to_search = rng.random((<span class="hljs-number">1</span>, dim))
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
<button class="copy-code-btn"></button></code></pre>
<h2 id="Next-Accelerate-queries" class="common-anchor-header">次へクエリの高速化<button data-href="#Next-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>デフォルトでは、インデックスのない<code translate="no">GEOMETRY</code> フィールドに対するクエリは、すべての行のフルスキャンを実行します。幾何クエリを高速化するには、GEOMETRY フィールドに<code translate="no">RTREE</code> インデックスを作成します。</p>
<p>詳細については、<a href="https://zilliverse.feishu.cn/wiki/RlY2wylVQiZswikT0G2cBHVznTf">RTREE</a> を参照してください。</p>
<h2 id="FAQ" class="common-anchor-header">よくある質問<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="If-Ive-enabled-the-dynamic-field-feature-for-my-collection-can-I-insert-geometric-data-into-a-dynamic-field-key" class="common-anchor-header">コレクションでダイナミック・フィールド機能を有効にした場合、ダイナミック・フィールド・キーにジオメトリ・データを挿入できますか？<button data-href="#If-Ive-enabled-the-dynamic-field-feature-for-my-collection-can-I-insert-geometric-data-into-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>いいえ。ジオメトリデータをダイナミックフィールドに挿入することはできません。ジオメトリデータを挿入する前に、<code translate="no">GEOMETRY</code> フィールドがコレクションスキーマで明示的に定義されていることを確認してください。</p>
<h3 id="Does-the-GEOMETRY-field-support-the-mmap-feature" class="common-anchor-header">GEOMETRY フィールドは mmap 機能をサポートしていますか?<button data-href="#Does-the-GEOMETRY-field-support-the-mmap-feature" class="anchor-icon" translate="no">
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
    </button></h3><p>はい、<code translate="no">GEOMETRY</code> フィールドは mmap をサポートしています。詳細は、<a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">mmapの使用を</a>参照してください。</p>
<h3 id="Can-I-define-the-GEOMETRY-field-as-nullable-or-set-a-default-value" class="common-anchor-header">GEOMETRYフィールドをNULL可能として定義したり、デフォルト値を設定できますか?<button data-href="#Can-I-define-the-GEOMETRY-field-as-nullable-or-set-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>はい、GEOMETRYフィールドは<code translate="no">nullable</code> 属性とWKTフォーマットのデフォルト値をサポートしています。詳しくは、<a href="/docs/ja/nullable-and-default.md">Nullable &amp; Defaultを</a>参照してください。</p>
