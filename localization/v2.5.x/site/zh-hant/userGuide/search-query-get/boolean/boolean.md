---
id: boolean.md
title: 篩選說明
summary: >-
  Milvus 提供強大的篩選功能，可精確查詢資料。篩選表達式允許您針對特定的標量欄位，以不同的條件精細化搜尋結果。本指南將解釋如何在 Milvus
  中使用篩選表達式，並以查詢作業為重點範例。您也可以在搜尋和刪除請求中應用這些篩選表達式。
---

<h1 id="Filtering-Explained" class="common-anchor-header">篩選說明<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供強大的篩選功能，使您能夠精確地查詢資料。篩選表達式允許您針對特定的標量欄位，使用不同的條件精煉搜尋結果。本指南解釋如何在 Milvus 中使用篩選表達式，並以查詢操作為主。您也可以在搜尋和刪除請求中套用這些篩選條件。</p>
<h2 id="Basic-operators" class="common-anchor-header">基本運算符號<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援幾種基本運算符號來篩選資料：</p>
<ul>
<li><p><strong>比較運算符</strong>：<code translate="no">==</code>,<code translate="no">!=</code>,<code translate="no">&gt;</code>,<code translate="no">&lt;</code>,<code translate="no">&gt;=</code>, 和<code translate="no">&lt;=</code> 允許基於數值或文字欄位進行篩選。</p></li>
<li><p><strong>範圍篩選器</strong>：<code translate="no">IN</code> 和<code translate="no">LIKE</code> 有助於匹配特定的值範圍或集合。</p></li>
<li><p><strong>算術運算符</strong>：<code translate="no">+</code>,<code translate="no">-</code>,<code translate="no">*</code>,<code translate="no">/</code>,<code translate="no">%</code>, 和<code translate="no">**</code> 用於涉及數字字段的計算。</p></li>
<li><p><strong>邏輯運算符號</strong>：<code translate="no">AND</code>,<code translate="no">OR</code>, 和<code translate="no">NOT</code> 將多個條件結合成複雜的表達式。</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">範例：依顏色篩選</h3><p>若要在標量欄位<code translate="no">color</code> 中找出具有三原色 (紅、綠或藍) 的實體，請使用下列篩選表達式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">範例篩選 JSON 欄位</h3><p>Milvus 允許在 JSON 欄位中參考鍵。例如，如果您有一個 JSON 欄位<code translate="no">product</code> ，其鍵為<code translate="no">price</code> 和<code translate="no">model</code> ，並希望找到具有特定型號和價格低於 1,850 的產品，請使用此過濾表達式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">範例：篩選陣列欄位</h3><p>如果您有一個陣列欄位<code translate="no">history_temperatures</code> ，其中包含天文台自 2000 年以來所報告的平均溫度記錄，並且想要找出 2009 年（第 10 次記錄）溫度超過 23°C 的天文台，請使用此表達式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有關這些基本運算符的詳細資訊，請參閱<a href="/docs/zh-hant/v2.5.x/basic-operators.md">基本運算符</a>。</p>
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
    </button></h2><p>使用中日韓字符進行篩選時，由於其字符集較大且編碼存在差異，處理過程可能會更加複雜。這可能會導致效能變慢，尤其是使用<code translate="no">IN</code> 運算符時。</p>
<p>Milvus 引入了篩選表達式模板，以優化處理中日韓字符時的效能。透過將動態值從篩選表達式中分離出來，查詢引擎可以更有效率地處理參數插入。</p>
<h3 id="Example" class="common-anchor-header">範例</h3><p>要查找居住在 「北京」（Beijing）或 「上海」（Shanghai）的 25 歲以上的個人，請使用以下模板表達式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>為了提高效能，請使用這個帶參數的變體：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>此方法可減少解析開銷，並提高查詢速度。如需詳細資訊，請參閱<a href="/docs/zh-hant/v2.5.x/filtering-templating.md">篩選模板</a>。</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">特定資料類型的運算符號<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 為特定資料類型提供進階過濾運算子，例如 JSON、ARRAY 和 VARCHAR 欄位。</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">JSON 特定欄位運算符號</h3><p>Milvus 為查詢 JSON 欄位提供進階運算子，可在複雜的 JSON 結構中進行精確過濾：</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>:檢查字段中是否存在 JSON 表達式。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>:確保 JSON 表達式的所有元素都存在。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>:篩選 JSON 表達式中至少存在一個元素的實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有關 JSON 運算符的詳細資訊，請參閱<a href="/docs/zh-hant/v2.5.x/json-operators.md">JSON 運算符</a>。</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">ARRAY 特定欄位運算符號</h3><p>Milvus 為陣列欄位提供進階過濾運算符，例如<code translate="no">ARRAY_CONTAINS</code>,<code translate="no">ARRAY_CONTAINS_ALL</code>,<code translate="no">ARRAY_CONTAINS_ANY</code>, 和<code translate="no">ARRAY_LENGTH</code> ，可對陣列資料進行精細控制：</p>
<p><code translate="no">ARRAY_CONTAINS</code>:過濾包含特定元素的實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>:篩選列表中所有元素都存在的實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>:篩選包含清單中任何元素的實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>:根據陣列的長度進行篩選。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有關陣列運算元的詳細資訊，請參閱<a href="/docs/zh-hant/v2.5.x/array-operators.md">ARRAY 運算元</a>。</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">特定於 VARCHAR 欄位的運算符號</h3><p>Milvus 提供了專門的運算符號，用於在 VARCHAR 欄位上進行精確的基於文字的搜尋：</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> 運算符號</h4><p><code translate="no">TEXT_MATCH</code> 運算符允許根據特定查詢字詞進行精確的文件檢索。它對於結合標量篩選與向量相似性搜尋的篩選搜尋特別有用。與語意搜尋不同，文字匹配專注於精確的詞彙出現。</p>
<p>Milvus 使用 Tantivy 來支援倒置索引和基於詞彙的文字搜尋。過程包括</p>
<ol>
<li><p><strong>分析器</strong>：對輸入文字進行標記化和處理。</p></li>
<li><p><strong>建立索引</strong>：建立倒置索引，將唯一的標記對應到文件。</p></li>
</ol>
<p>如需詳細資訊，請參閱「<a href="/docs/zh-hant/v2.5.x/keyword-match.md">文字匹配</a>」。</p>
