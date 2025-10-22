---
id: geometry-operators.md
title: ジオメトリ演算子
summary: >-
  MilvusはGEOMETRYフィールドの空間フィルタリングのための一連の演算子をサポートしており、これは幾何学的データの管理と分析に不可欠です。これらの演算子により、オブジェクト間の幾何学的関係に基づいてエンティティを検索することができます。
---
<h1 id="Geometry-Operators" class="common-anchor-header">ジオメトリ演算子<button data-href="#Geometry-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、ジオメトリデータの管理や分析に不可欠な、<code translate="no">GEOMETRY</code> フィールドに対する空間フィルタリングのための演算子群をサポートしています。これらの演算子により、オブジェクト間の幾何学的関係に基づいてエンティティを検索することができます。</p>
<p>すべてのジオメトリ演算子は、コレクションスキーマで定義された<code translate="no">GEOMETRY</code> フィールド名と、WKT（<a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">Well-Known Text</a>）形式で表現されたターゲットジオメトリオブジェクトの 2 つのジオメトリ引数を取ることで機能します。</p>
<p>Milvus の<code translate="no">GEOMETRY</code> フィールドの詳細については、<a href="/docs/ja/geometry-field.md">ジオメトリ フィールドを</a>参照してください。</p>
<h2 id="Supported-geometry-operators" class="common-anchor-header">サポートされているジオメトリ演算子<button data-href="#Supported-geometry-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の表は、Milvus で使用できるジオメトリ演算子の一覧です。</p>
<div class="alert note">
<p>演算子名は<strong>すべて大文字</strong>または<strong>すべて小文字に</strong>する必要があります。同じオペレータ名内で大文字と小文字を混在させないでください。</p>
</div>
<table>
   <tr>
     <th><p>演算子</p></th>
     <th><p>説明</p></th>
     <th><p>例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ST_EQUALS(A, B)</code> /<code translate="no">st_equals(A, B)</code></p></td>
     <td><p>2つのジオメトリが空間的に同一である場合、つまり点の集合と次元が同じである場合に TRUE を返します。</p></td>
     <td><p>2つの形状（AとB）は空間的に全く同じか？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CONTAINS(A, B)</code> /<code translate="no">st_contains(A, B)</code></p></td>
     <td><p>形状 A が形状 B を完全に含み、それらの内部が少なくとも 1 つの共通点を持つ場合に TRUE を返す。</p></td>
     <td><p>都市の境界（A）は特定の公園（B）を含むか？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CROSSES(A, B)</code> /<code translate="no">st_crosses(A, B)</code></p></td>
     <td><p>形状 A と B が部分的に交差しているが、完全に含まれていない場合に TRUE を返す。</p></td>
     <td><p>2つの道路（AとB）は交差点で交差しているか？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_INTERSECTS(A, B)</code> /<code translate="no">st_intersects(A, B)</code></p></td>
     <td><p>ジオメトリAとBが少なくとも1つの共通点を持つ場合にTRUEを返す。これは最も一般的で広く使われている空間クエリです。</p></td>
     <td><p>検索エリア(A)は店舗ロケーション(B)のいずれかと交差するか？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_OVERLAPS(A, B)</code> /<code translate="no">st_overlaps(A, B)</code></p></td>
     <td><p>ジオメトリ A と B が同じ次元で、部分的に重なり、どちらも他方を完全に含まない場合に TRUE を返す。</p></td>
     <td><p>2つの土地区画（AとB）は重なっているか？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_TOUCHES(A, B)</code> /<code translate="no">st_touches(A, B)</code></p></td>
     <td><p>ジオメトリ A と B が共通の境界を共有しているが、内部が交差していない場合に TRUE を返す。</p></td>
     <td><p>隣接する2つの敷地（AとB）は境界を共有しているか？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_WITHIN(A, B)</code> /<code translate="no">st_within(A, B)</code></p></td>
     <td><p>ジオメトリ A がジオメトリ B に完全に含まれ、それらの内部が少なくとも 1 つの共通点を持つ場合に TRUE を返します。これは<code translate="no">ST_Contains(B, A)</code> の逆数です。</p></td>
     <td><p>指定された検索半径（B）内に特定の注目点（A）があるか。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_DWITHIN(A, B, distance)</code> /<code translate="no">st_dwithin(A, B, distance)</code></p></td>
     <td><p>ジオメトリ A とジオメトリ B の距離が指定された距離以下であれば TRUE を返す。</p><p><strong>注</strong>：ジオメトリ B は現在ポイントのみをサポートしています。距離の単位はメートルです。</p></td>
     <td><p>特定の点（B）から 5000 メートル以内のすべての点を検索します。</p></td>
   </tr>
</table>
<h2 id="STEQUALS--stequals" class="common-anchor-header">ST_EQUALS / st_equals<button data-href="#STEQUALS--stequals" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_EQUALS</code> 演算子は、2 つのジオメトリが空間的に同一である場合、つまり点の集合と寸法が同じである場合に TRUE を返します。これは、格納されている 2 つのジオメトリ オブジェクトがまったく同じ位置と形状を表しているかどうかを確認するのに便利です。</p>
<p><strong>例</strong></p>
<p>ストアされたジオメトリ（点や多角形など）がターゲット ジオメトリとまったく同じかどうかを確認したいとします。例えば、保存されている点と特定の点を比較することができます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to check if a geometry matches a specific point</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_EQUALS(geo_field, &#x27;POINT(10 20)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STCONTAINS--stcontains" class="common-anchor-header">ST_CONTAINS / st_contains<button data-href="#STCONTAINS--stcontains" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_CONTAINS</code> 演算子は、1 番目のジオメトリが 2 番目のジオメトリを完全に含む場合に TRUE を返します。これは、多角形内の点や、大きな多角形内の小さな多角形を見つけるのに便利です。</p>
<p><strong>例</strong></p>
<p>市区町村のコレクションがあり、指定した市区町村の境界内にある特定のポイント（レストランなど）を見つけたいとします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries completely within a specific polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_CONTAINS(geo_field, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STCROSSES--stcrosses" class="common-anchor-header">ST_CROSSES / st_crosses<button data-href="#STCROSSES--stcrosses" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_CROSSES</code> 演算子は、2 つのジオメトリの交点が元のジオメトリよりも小さい次元のジオメトリを形成する場合、<code translate="no">TRUE</code> を返します。これは通常、多角形や他の線と交差する線に適用されます。</p>
<p><strong>例</strong></p>
<p>特定の境界線（別の線文字列）を横切るか、保護区域（ポリゴン）に入るすべてのハイキング・コース（線文字列）を見つけたい。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that cross a line string.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_CROSSES(geo_field, &#x27;LINESTRING(5 0, 5 10)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STINTERSECTS--stintersects" class="common-anchor-header">ST_INTERSECTS / st_intersects<button data-href="#STINTERSECTS--stintersects" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_INTERSECTS</code> 演算子は、2 つのジオメトリの境界または内部に共通点がある場合、<code translate="no">TRUE</code> を返します。これは、あらゆる形式の空間的な重なりを検出するための汎用演算子です。</p>
<p><strong>例</strong></p>
<p>道路のコレクションがあり、提案されている新しい道路を表す特定の線文字列を横切る、または接触するすべての道路を見つけたい場合、<code translate="no">ST_INTERSECTS</code> を使用できます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that intersect with a specific line string.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_INTERSECTS(geo_field, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STOVERLAPS--stoverlaps" class="common-anchor-header">ST_OVERLAPS / st_overlaps<button data-href="#STOVERLAPS--stoverlaps" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_OVERLAPS</code> 演算子は、同じ次元の2つのジオメトリが部分的に交差する場合、<code translate="no">TRUE</code> を返します。交差点自体は元のジオメトリと同じ次元ですが、どちらとも等しくありません。</p>
<p><strong>例</strong></p>
<p>重なっている販売地域のセットがあり、新しい販売地域案と部分的に重なっているすべての地域を見つけたい。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that partially overlap with a polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_OVERLAPS(geo_field, &#x27;POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STTOUCHES--sttouches" class="common-anchor-header">ST_TOUCHES / st_touches<button data-href="#STTOUCHES--sttouches" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_TOUCHES</code> 演算子は、2 つのジオメトリの境界が接触しているが、内部が交差していない場合、<code translate="no">TRUE</code> を返します。これは隣接を検出するのに便利です。</p>
<p><strong>例</strong></p>
<p>不動産区画のマップがあり、公共公園に重複なく直接隣接する区画をすべて見つけたい場合。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that only touch a line string at their boundaries.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_TOUCHES(geo_field, &#x27;LINESTRING(0 0, 1 1)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STWITHIN--stwithin" class="common-anchor-header">ST_WITHIN / st_within<button data-href="#STWITHIN--stwithin" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_WITHIN</code> 演算子は、1 番目のジオメトリが 2 番目のジオメトリの内部または境界に完全に含まれる場合、<code translate="no">TRUE</code> を返します。これは<code translate="no">ST_CONTAINS</code> の逆数です。</p>
<p><strong>例</strong></p>
<p>指定された大きな公園区域内にある小さな住宅地をすべて検索したい。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that are completely within a larger polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_WITHIN(geo_field, &#x27;POLYGON((110 38, 115 38, 115 42, 110 42, 110 38))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">GEOMETRY</code> フィールドの使用方法の詳細については、<a href="/docs/ja/geometry-field.md">ジオメトリ フィールドを</a>参照してください。</p>
<h2 id="STDWITHIN--stdwithin" class="common-anchor-header">ST_DWITHIN / st_dwithin<button data-href="#STDWITHIN--stdwithin" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ST_DWITHIN</code> 演算子は、ジオメトリ A とジオメトリ B の距離が指定された値（メートル単位）以下の場合に<code translate="no">TRUE</code> を返します。現在、ジオメトリ B は点でなければなりません。</p>
<p><strong>例</strong></p>
<p>店舗位置のコレクションがあり、特定の顧客の位置から 5,000 メートル以内のすべての店舗を検索したいとします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Find all stores within 5000 meters of the point (120 30)</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_DWITHIN(geo_field, &#x27;POINT(120 30)&#x27;, 5000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
