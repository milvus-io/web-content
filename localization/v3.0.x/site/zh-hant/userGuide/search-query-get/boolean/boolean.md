---
id: boolean.md
title: 篩選功能說明
summary: >-
  Milvus 提供強大的篩選功能，讓您能夠精確查詢資料。透過篩選表達式，您可以鎖定特定的標量欄位，並運用不同條件來精確篩選搜尋結果。本指南將說明如何在
  Milvus 中使用篩選表達式，並以查詢操作為重點提供範例。您也可以在搜尋和刪除請求中套用這些篩選條件。
---
<h1 id="Filtering-Explained" class="common-anchor-header">篩選功能說明<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供強大的篩選功能，讓您能精確查詢資料。透過篩選表達式，您可以鎖定特定的標量欄位，並運用不同條件來精確篩選搜尋結果。本指南將說明如何在 Milvus 中使用篩選表達式，並以查詢操作為重點提供範例。您亦可在搜尋與刪除請求中套用這些篩選條件。</p>
<h2 id="Basic-operators" class="common-anchor-header">基本運算子<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援多種用於篩選資料的基本運算子：</p>
<ul>
<li><p><strong>比較運算子</strong>：<code translate="no">==</code> 、<code translate="no">!=</code> 、<code translate="no">&gt;</code> 、<code translate="no">&lt;</code> 、<code translate="no">&gt;=</code> 以及<code translate="no">&lt;=</code> ，可根據數值或文字欄位進行篩選。</p></li>
<li><p><strong>範圍與模式篩選器</strong>：<code translate="no">IN</code> 、<code translate="no">LIKE</code> 、<code translate="no">=~</code> 以及<code translate="no">!~</code> 可比對數值、萬用字元模式或正規表達式模式。有關字串模式的詳細資訊，請參閱《<a href="/docs/zh-hant/pattern-matching.md">模式比對</a>》。</p></li>
<li><p><strong>算術運算子</strong>：<code translate="no">+</code> 、<code translate="no">-</code> 、<code translate="no">*</code> 、<code translate="no">/</code> 、<code translate="no">%</code> 以及<code translate="no">**</code> 用於涉及數值欄位的計算。</p></li>
<li><p><strong>位元運算子</strong>：在 Milvus 3.0.0 及後續版本中，<code translate="no">&amp;</code> 、<code translate="no">|</code> 以及<code translate="no">^</code> 用於篩選編碼多個標誌（例如權限或狀態位元）的整數欄位。詳細資訊請參閱「<a href="/docs/zh-hant/basic-operators.md#Bitwise-operators">基本運算子</a>」。</p></li>
<li><p><strong>邏輯運算子</strong>：<code translate="no">AND</code> 、<code translate="no">OR</code> 及<code translate="no">NOT</code> 可將多個條件組合成複雜的表達式。</p></li>
<li><p><strong>IS NULL 與 IS NOT NULL 運算子</strong>：<code translate="no">IS NULL</code> 和<code translate="no">IS NOT NULL</code> 運算子用於根據欄位是否包含空值（無資料）來篩選欄位。詳細資訊請參閱「<a href="/docs/zh-hant/basic-operators.md#IS-NULL-and-IS-NOT-NULL-operators">基本運算子</a>」。</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">範例：依顏色篩選<button data-href="#Example-Filtering-by-Color" class="anchor-icon" translate="no">
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
    </button></h3><p>若要找出在標量欄位<code translate="no">color</code> 中具有主色（紅色、綠色或藍色）的實體，請使用以下篩選表達式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Permission-Bits" class="common-anchor-header">範例：依權限位元篩選<button data-href="#Example-Filtering-by-Permission-Bits" class="anchor-icon" translate="no">
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
    </button></h3><p>若要找出其整數型<code translate="no">permissions</code> 欄位已設定<code translate="no">SHARE</code> 位元的實體，請使用位元與運算子（<code translate="no">&amp;</code> ）：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;(permissions &amp; 4) == 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Regex-Pattern" class="common-anchor-header">範例：根據正規表達式模式篩選<button data-href="#Example-Filtering-by-Regex-Pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>若要查找其 `<code translate="no">message</code> ` 欄位包含錯誤代碼（例如 `<code translate="no">E1001</code>`）的實體，請使用正規表達式匹配運算子 `<code translate="no">=~</code>`：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>正規表達式篩選器採用子字串比對。若要要求整個欄位值與模式完全匹配，請新增<code translate="no">^</code> 和<code translate="no">$</code> 錨點。詳細資訊請參閱「<a href="/docs/zh-hant/pattern-matching.md">模式比對</a>」。</p>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">範例：篩選 JSON 欄位<button data-href="#Example-Filtering-JSON-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 允許引用 JSON 欄位中的鍵。例如，若您有一個 JSON 欄位<code translate="no">product</code> ，其中包含鍵<code translate="no">price</code> 和<code translate="no">model</code> ，且希望找出具有特定型號且價格低於 1,850 的產品，請使用以下篩選表達式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">範例：篩選陣列欄位<button data-href="#Example-Filtering-Array-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>若您有一個陣列欄位<code translate="no">history_temperatures</code> ，其中包含自 2000 年以來各觀測站報告的平均溫度記錄，且希望找出 2009 年（第 10 個記錄年份）溫度超過 23°C 的觀測站，請使用以下表達式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有關這些基本運算子的更多資訊，請參閱《<a href="/docs/zh-hant/basic-operators.md">基本運算子</a>》。</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">篩選表達式範本<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>當使用中日韓（CJK）字元進行篩選時，由於其字元集較大且編碼方式不同，處理過程可能會更為複雜。這可能會導致效能變慢，特別是在使用<code translate="no">IN</code> 運算子時。</p>
<p>Milvus 引入了篩選表達式範本機制，以優化處理 CJK 字元時的效能。透過將動態值與篩選表達式分離，查詢引擎能更有效率地處理參數插入。</p>
<h3 id="Example" class="common-anchor-header">範例<button data-href="#Example" class="anchor-icon" translate="no">
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
    </button></h3><p>若要查找居住於「北京」或「上海」且年齡超過 25 歲的個體，請使用以下範本表達式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>為提升效能，請使用以下帶有參數的變體：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>此方法可減少解析開銷並提升查詢速度。如需更多資訊，請參閱《<a href="/docs/zh-hant/filtering-templating.md">篩選器範本》</a>。</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">特定資料類型的運算子<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 針對特定資料類型（例如 JSON、ARRAY 和 VARCHAR 欄位）提供進階篩選運算子。</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">JSON 欄位專用運算子<button data-href="#JSON-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 提供用於查詢 JSON 欄位的高階運算子，可讓您在複雜的 JSON 結構中進行精確篩選：</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: 檢查該欄位中是否存在特定 JSON 表達式。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: 確保 JSON 表達式中的所有元素均存在。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: 篩選 JSON 表達式中至少存在一個元素的實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有關 JSON 運算子的更多詳細資訊，請參閱<a href="/docs/zh-hant/json-operators.md">JSON 運算子</a>。</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">陣列欄位專用運算子<button data-href="#ARRAY-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 為陣列欄位提供進階篩選運算子，例如 `<code translate="no">ARRAY_CONTAINS</code>`、`<code translate="no">ARRAY_CONTAINS_ALL</code>`、`<code translate="no">ARRAY_CONTAINS_ANY</code>` 及 `<code translate="no">ARRAY_LENGTH</code>`，這些運算子可對陣列資料進行細粒度的控制：</p>
<p><code translate="no">ARRAY_CONTAINS</code>: 篩選包含特定元素的實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: 篩選列表中所有元素均存在的實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: 篩選包含清單中任一元素的實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: 根據陣列長度進行篩選。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有關陣列運算子的更多詳細資訊，請參閱「<a href="/docs/zh-hant/array-operators.md">ARRAY 運算子</a>」。</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">VARCHAR 欄位專用運算子<button data-href="#VARCHAR-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 提供專用的運算子，用於對 VARCHAR 欄位進行精確的文字搜尋：</p>
<h4 id="Pattern-matching-operators" class="common-anchor-header">模式匹配運算子</h4><p><code translate="no">LIKE</code> 、<code translate="no">=~</code> 和<code translate="no">!~</code> 運算子可對<code translate="no">VARCHAR</code> 欄位、JSON 字串路徑以及特定的<code translate="no">ARRAY&lt;VARCHAR&gt;</code> 元素進行字串模式比對。若要使用簡單的萬用字元模式，請使用<code translate="no">LIKE</code> ；若要使用 RE2 正規表達式，請使用<code translate="no">=~</code> 和<code translate="no">!~</code> 。</p>
<p>詳情請參閱「<a href="/docs/zh-hant/pattern-matching.md">模式比對</a>」。</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> 運算子</h4><p><code translate="no">TEXT_MATCH</code> 運算子可根據特定查詢詞彙精確檢索文件。此功能特別適用於結合標量篩選器與向量相似度搜尋的篩選式搜尋。與語義搜尋不同， 著重於詞彙的完全匹配。</p>
<p>Milvus 使用 Tantivy 來支援倒排索引和基於術語的文字搜尋。該流程包含：</p>
<ol>
<li><p><strong>分析器</strong>：將輸入文字分詞並進行處理。</p></li>
<li><p><strong>索引建立</strong>：建立將唯一詞元映射至文檔的倒排索引。</p></li>
</ol>
<p>更多詳細資訊，請參閱「<a href="/docs/zh-hant/keyword-match.md">文字匹配</a>」。</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> 運算子<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p><strong>PHRASE_MATCH</strong>運算子可根據精確短語匹配來精確檢索文件，同時會考量查詢詞彙的順序與相鄰性。</p>
<p>如需更多詳細資訊，請參閱「<a href="/docs/zh-hant/phrase-match.md">短語匹配</a>」。</p>
