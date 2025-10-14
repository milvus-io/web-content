---
id: geometry-operators.md
title: 幾何運算符號
summary: >-
  Milvus 支援一系列運算符號，用於在 GEOMETRY
  欄位上進行空間篩選，這些運算符號對於管理和分析幾何資料非常重要。這些運算符允許您根據物件之間的幾何關係檢索實體。
---
<h1 id="Geometry-Operators" class="common-anchor-header">幾何運算符號<button data-href="#Geometry-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 支援一組運算元，用於<code translate="no">GEOMETRY</code> 欄位的空間篩選，對於管理和分析幾何資料非常重要。這些運算符允許您根據物件之間的幾何關係檢索實體。</p>
<p>所有幾何運算符號都使用兩個幾何參數：在您的集合模式中定義的<code translate="no">GEOMETRY</code> 欄位名稱，以及以<a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">Well-Known Text</a>(WKT) 格式表示的目標幾何物件。</p>
<p>要了解更多關於 Milvus 中<code translate="no">GEOMETRY</code> 欄位的資訊，請參考幾何<a href="/docs/zh-hant/geometry-field.md">欄位</a>。</p>
<h2 id="Supported-geometry-operators" class="common-anchor-header">支援的幾何運算符號<button data-href="#Supported-geometry-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>下表列出 Milvus 中可用的幾何運算符號。</p>
<div class="alert note">
<p>操作符名稱必須<strong>全大楷</strong> <strong>或全小楷</strong>。請勿在同一操作符名稱中混合大小寫。</p>
</div>
<table>
   <tr>
     <th><p>運算符號</p></th>
     <th><p>說明</p></th>
     <th><p>範例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ST_EQUALS(A, B)</code> /<code translate="no">st_equals(A, B)</code></p></td>
     <td><p>如果兩個幾何圖形在空間上完全相同，表示它們具有相同的點集和尺寸，則返回 TRUE。</p></td>
     <td><p>兩個幾何圖形 (A 和 B) 在空間上是否完全相同？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CONTAINS(A, B)</code> /<code translate="no">st_contains(A, B)</code></p></td>
     <td><p>如果幾何圖 A 完全包含幾何圖 B，且兩者內部至少有一個共同點，則回傳 TRUE。</p></td>
     <td><p>城市邊界 (A) 是否包含特定公園 (B)？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CROSSES(A, B)</code> /<code translate="no">st_crosses(A, B)</code></p></td>
     <td><p>如果幾何圖 A 和 B 部分相交，但不完全包含對方，則傳回值為 TRUE。</p></td>
     <td><p>兩條道路 (A 和 B) 是否交叉？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_INTERSECTS(A, B)</code> /<code translate="no">st_intersects(A, B)</code></p></td>
     <td><p>如果幾何圖 A 和 B 至少有一個共同點，則傳回值為 TRUE。這是最廣泛使用的空間查詢。</p></td>
     <td><p>搜尋區域 (A) 是否與任何商店位置 (B) 相交？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_OVERLAPS(A, B)</code> /<code translate="no">st_overlaps(A, B)</code></p></td>
     <td><p>如果幾何圖 A 和 B 的尺寸相同、部分重疊且兩者都不完全包含對方，則傳回 TRUE。</p></td>
     <td><p>兩個地塊 (A 和 B) 是否重疊？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_TOUCHES(A, B)</code> /<code translate="no">st_touches(A, B)</code></p></td>
     <td><p>如果幾何圖 A 和 B 有共同邊界，但內部沒有相交，則回傳 TRUE。</p></td>
     <td><p>兩個鄰近的屬性 (A 和 B) 是否共用邊界？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_WITHIN(A, B)</code> /<code translate="no">st_within(A, B)</code></p></td>
     <td><p>如果幾何圖形 A 完全包含在幾何圖形 B 中，且它們的內部至少有一個共同點，則傳回值為 TRUE。這是<code translate="no">ST_Contains(B, A)</code> 的逆向。</p></td>
     <td><p>特定興趣點 (A) 是否在定義的搜尋半徑 (B) 內？</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_DWITHIN(A, B, distance)</code> /<code translate="no">st_dwithin(A, B, distance)</code></p></td>
     <td><p>如果幾何圖 A 與幾何圖 B 之間的距離小於或等於指定的距離，則傳回 TRUE。</p><p><strong>注意</strong>：目前幾何體 B 只支援點。距離單位為公尺。</p></td>
     <td><p>尋找距離特定點 (B) 5000 公尺內的所有點。</p></td>
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
    </button></h2><p>如果兩個幾何圖形在空間上相同，也就是擁有相同的點集和尺寸，<code translate="no">ST_EQUALS</code> 運算符號會回傳 TRUE。這對於驗證兩個儲存的幾何物件是否代表完全相同的位置和形狀非常有用。</p>
<p><strong>範例</strong></p>
<p>假設您要檢查儲存的幾何（如點或多邊形）是否與目標幾何完全相同。例如，您可以比較儲存的點與特定的興趣點。</p>
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
    </button></h2><p>如果第一個幾何圖形完全包含第二個幾何圖形，<code translate="no">ST_CONTAINS</code> 運算符號會返回 TRUE。這對於尋找多邊形中的點或大多邊形中的小多邊形很有用。</p>
<p><strong>範例</strong></p>
<p>假設您有一個城市區域的集合，並且想要尋找一個特定的興趣點，例如一家餐廳，它位於指定區域的邊界內。</p>
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
    </button></h2><p>如果兩個幾何形狀的交點形成一個尺寸比原始幾何形狀低的幾何形狀，<code translate="no">ST_CROSSES</code> 運算符號會返回<code translate="no">TRUE</code> 。這通常適用於與多邊形或另一條線相交的線。</p>
<p><strong>範例</strong></p>
<p>您想要尋找所有跨越特定邊界線（另一條線串）或進入保護區域（多邊形）的遠足路徑（線串）。</p>
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
    </button></h2><p>如果兩個幾何圖形的邊界或內部有任何一點是共通的，<code translate="no">ST_INTERSECTS</code> 運算符號會返回<code translate="no">TRUE</code> 。這是偵測任何形式空間重疊的通用運算子。</p>
<p><strong>範例</strong></p>
<p>如果您有一個道路集合，想要找出所有與代表建議中的新道路的特定線串交叉或接觸的道路，您可以使用<code translate="no">ST_INTERSECTS</code>.</p>
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
    </button></h2><p>如果兩個尺寸相同的幾何圖有部分相交，<code translate="no">ST_OVERLAPS</code> 運算符號會返回<code translate="no">TRUE</code> ，其中相交本身的尺寸與原始幾何圖相同，但不等於其中任何一個。</p>
<p><strong>範例</strong></p>
<p>您有一組重疊的銷售區域，想要找出所有與新建議的銷售區域部分重疊的區域。</p>
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
    </button></h2><p>如果兩個幾何圖形的邊界相觸，但內部沒有相交，<code translate="no">ST_TOUCHES</code> 運算符號會返回<code translate="no">TRUE</code> 。這對於偵測鄰接非常有用。</p>
<p><strong>範例</strong></p>
<p>如果您有一張地塊地圖，想要找出所有直接鄰接公園而沒有重疊的地塊。</p>
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
    </button></h2><p>如果第一個幾何完全在第二個幾何的內部或邊界上，<code translate="no">ST_WITHIN</code> 運算符號會返回<code translate="no">TRUE</code> 。它是<code translate="no">ST_CONTAINS</code> 的逆運算。</p>
<p><strong>範例</strong></p>
<p>您想找出所有完全位於較大的指定公園區域內的小型住宅區。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that are completely within a larger polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_WITHIN(geo_field, &#x27;POLYGON((110 38, 115 38, 115 42, 110 42, 110 38))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有關如何使用<code translate="no">GEOMETRY</code> 欄位的詳細資訊，請參考<a href="/docs/zh-hant/geometry-field.md">幾何欄位</a>。</p>
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
    </button></h2><p>如果幾何圖 A 與幾何圖 B 之間的距離小於或等於指定值（以公尺為單位），<code translate="no">ST_DWITHIN</code> 運算符號會返回<code translate="no">TRUE</code> 。目前，幾何體 B 必須是一個點。</p>
<p><strong>範例</strong></p>
<p>假設您有一個商店位置集合，想要找出距離特定客戶位置 5,000 公尺內的所有商店。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Find all stores within 5000 meters of the point (120 30)</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_DWITHIN(geo_field, &#x27;POINT(120 30)&#x27;, 5000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
