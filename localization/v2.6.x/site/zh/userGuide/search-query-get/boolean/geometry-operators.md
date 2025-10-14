---
id: geometry-operators.md
title: 几何操作符
summary: Milvus 支持对几何字段进行空间过滤的一系列操作符，这些操作符对于管理和分析几何数据至关重要。通过这些操作符，可以根据对象之间的几何关系检索实体。
---
<h1 id="Geometry-Operators" class="common-anchor-header">几何操作符<button data-href="#Geometry-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 支持对<code translate="no">GEOMETRY</code> 字段进行空间过滤的一系列操作符，这对于管理和分析几何数据至关重要。这些操作符允许您根据对象之间的几何关系检索实体。</p>
<p>所有几何操作符都需要两个几何参数：Collection schema 中定义的<code translate="no">GEOMETRY</code> <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">字段名</a>和以<a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">Well-Known Text</a>(WKT) 格式表示的目标几何对象。</p>
<p>要了解有关 Milvus 中<code translate="no">GEOMETRY</code> 字段的更多信息，请参阅<a href="/docs/zh/geometry-field.md">几何字段</a>。</p>
<h2 id="Supported-geometry-operators" class="common-anchor-header">支持的几何操作符<button data-href="#Supported-geometry-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>下表列出了 Milvus 中可用的几何操作符。</p>
<div class="alert note">
<p>操作符名称必须<strong>全部大写</strong>或<strong>全部小写</strong>。请勿在同一操作符名称中混合使用大小写。</p>
</div>
<table>
   <tr>
     <th><p>操作符</p></th>
     <th><p>说明</p></th>
     <th><p>示例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ST_EQUALS(A, B)</code> /<code translate="no">st_equals(A, B)</code></p></td>
     <td><p>如果两个几何图形在空间上完全相同，即具有相同的点集和尺寸，则返回 TRUE。</p></td>
     <td><p>两个几何图形（A 和 B）在空间上是否完全相同？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CONTAINS(A, B)</code> /<code translate="no">st_contains(A, B)</code></p></td>
     <td><p>如果几何体 A 完全包含几何体 B，且它们的内部至少有一个共同点，则返回 TRUE。</p></td>
     <td><p>一个城市边界（A）是否包含一个特定的公园（B）？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CROSSES(A, B)</code> /<code translate="no">st_crosses(A, B)</code></p></td>
     <td><p>如果几何体 A 和 B 部分相交但不完全包含对方，则返回 TRUE。</p></td>
     <td><p>两条道路（A 和 B）是否交叉？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_INTERSECTS(A, B)</code> /<code translate="no">st_intersects(A, B)</code></p></td>
     <td><p>如果几何图形 A 和 B 至少有一个公共点，则返回 TRUE。这是最通用、使用最广泛的空间查询。</p></td>
     <td><p>搜索区域（A）是否与任何商店位置（B）相交？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_OVERLAPS(A, B)</code> /<code translate="no">st_overlaps(A, B)</code></p></td>
     <td><p>如果几何图形 A 和 B 的尺寸相同、部分重叠且都不完全包含其他几何图形，则返回 TRUE。</p></td>
     <td><p>两个地块（A 和 B）是否重叠？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_TOUCHES(A, B)</code> /<code translate="no">st_touches(A, B)</code></p></td>
     <td><p>如果几何图形 A 和 B 有共同的边界，但内部不相交，则返回 TRUE。</p></td>
     <td><p>两个相邻的属性（A 和 B）有共同边界吗？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_WITHIN(A, B)</code> /<code translate="no">st_within(A, B)</code></p></td>
     <td><p>如果几何体 A 完全包含在几何体 B 中，且它们的内部至少有一个共同点，则返回 TRUE。这是<code translate="no">ST_Contains(B, A)</code> 的逆运算。</p></td>
     <td><p>特定兴趣点（A）是否在定义的搜索半径（B）内？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_DWITHIN(A, B, distance)</code> /<code translate="no">st_dwithin(A, B, distance)</code></p></td>
     <td><p>如果几何体 A 和几何体 B 之间的距离小于或等于指定距离，则返回 TRUE。</p><p><strong>注意</strong>：几何体 B 目前只支持点。距离单位为米。</p></td>
     <td><p>查找距离特定点（B）5000 米以内的所有点。</p></td>
   </tr>
</table>
<h2 id="STEQUALS--stequals" class="common-anchor-header">ST_EQUALS / ST_equals<button data-href="#STEQUALS--stequals" class="anchor-icon" translate="no">
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
    </button></h2><p>如果两个几何图形在空间上相同，即具有相同的点集和尺寸，则<code translate="no">ST_EQUALS</code> 操作符返回 TRUE。这对于验证两个存储的几何对象是否代表完全相同的位置和形状非常有用。</p>
<p><strong>示例</strong></p>
<p>假设您要检查存储的几何体（如点或多边形）是否与目标几何体完全相同。例如，您可以将存储的点与特定的兴趣点进行比较。</p>
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
    </button></h2><p>如果第一个几何体完全包含第二个几何体，则<code translate="no">ST_CONTAINS</code> 操作符返回 TRUE。这对于查找多边形中的点或较大多边形中的较小多边形非常有用。</p>
<p><strong>示例</strong></p>
<p>假设您有一个城市区域 Collections，并希望找到一个特定的兴趣点（如餐馆），该兴趣点位于给定区域的边界内。</p>
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
    </button></h2><p>如果两个几何图形的交点形成的几何图形的维度低于原始几何图形的维度，则<code translate="no">ST_CROSSES</code> 操作符返回<code translate="no">TRUE</code> 。这通常适用于与多边形或另一条直线相交的直线。</p>
<p><strong>示例</strong></p>
<p>您想查找所有穿越特定边界线（另一条线串）或进入保护区（多边形）的远足路径（线串）。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that cross a line string.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_CROSSES(geo_field, &#x27;LINESTRING(5 0, 5 10)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STINTERSECTS--stintersects" class="common-anchor-header">ST_INTERSECTS / ST_intersects<button data-href="#STINTERSECTS--stintersects" class="anchor-icon" translate="no">
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
    </button></h2><p>如果两个几何图形的边界或内部有任何共同点，<code translate="no">ST_INTERSECTS</code> 操作符会返回<code translate="no">TRUE</code> 。这是一个通用操作符，用于检测任何形式的空间重叠。</p>
<p><strong>示例</strong></p>
<p>如果您有一个道路 Collections，并希望找到所有与代表拟建新道路的特定线串交叉或接触的道路，您可以使用<code translate="no">ST_INTERSECTS</code>.</p>
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
    </button></h2><p>如果两个尺寸相同的几何图形有部分交集，即交集本身的尺寸与原始几何图形相同，但不等于其中任何一个，则<code translate="no">ST_OVERLAPS</code> 操作符返回<code translate="no">TRUE</code> 。</p>
<p><strong>示例</strong></p>
<p>您有一组重叠的销售区域，希望找到与新提议的销售区域部分重叠的所有区域。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that partially overlap with a polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_OVERLAPS(geo_field, &#x27;POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STTOUCHES--sttouches" class="common-anchor-header">ST_TOUCHES / ST_TOUCHES<button data-href="#STTOUCHES--sttouches" class="anchor-icon" translate="no">
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
    </button></h2><p>如果两个几何图形的边界相接触，但内部不相交，<code translate="no">ST_TOUCHES</code> 操作符会返回<code translate="no">TRUE</code> 。这对检测相邻关系非常有用。</p>
<p><strong>示例</strong></p>
<p>如果您有一张地产地块地图，并希望找到所有与公共公园直接相邻且没有任何重叠的地块。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that only touch a line string at their boundaries.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_TOUCHES(geo_field, &#x27;LINESTRING(0 0, 1 1)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STWITHIN--stwithin" class="common-anchor-header">ST_WITHIN / ST_within<button data-href="#STWITHIN--stwithin" class="anchor-icon" translate="no">
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
    </button></h2><p>如果第一个几何图形完全位于第二个几何图形的内部或边界上，则<code translate="no">ST_WITHIN</code> 操作符返回<code translate="no">TRUE</code> 。它是<code translate="no">ST_CONTAINS</code> 的逆运算。</p>
<p><strong>示例</strong></p>
<p>您想查找完全位于一个较大的指定公园区域内的所有小型住宅区。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that are completely within a larger polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_WITHIN(geo_field, &#x27;POLYGON((110 38, 115 38, 115 42, 110 42, 110 38))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关如何使用<code translate="no">GEOMETRY</code> 字段的更多信息，请参阅<a href="/docs/zh/geometry-field.md">几何字段</a>。</p>
<h2 id="STDWITHIN--stdwithin" class="common-anchor-header">ST_DWITHIN / ST_D WITHIN<button data-href="#STDWITHIN--stdwithin" class="anchor-icon" translate="no">
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
    </button></h2><p>如果几何体 A 与几何体 B 之间的距离小于或等于指定值（以米为单位），<code translate="no">ST_DWITHIN</code> 操作符将返回<code translate="no">TRUE</code> 。目前，几何体 B 必须是一个点。</p>
<p><strong>示例</strong></p>
<p>假设您有一个商店位置 Collections，想要查找距离特定客户位置 5000 米以内的所有商店。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Find all stores within 5000 meters of the point (120 30)</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_DWITHIN(geo_field, &#x27;POINT(120 30)&#x27;, 5000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
