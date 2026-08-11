---
id: struct-array-operators.md
title: StructArray 運算子
summary: >-
  StructArray 運算子會透過評估 StructArray 欄位內標量子欄位的謂詞，來篩選實體。請將本頁作為 element_filter 及
  MATCH_* 運算子家族的語法參考。
---
<h1 id="StructArray-Operators" class="common-anchor-header">StructArray 運算子<button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>StructArray 運算子會透過評估 StructArray 欄位內部的標量子欄位之謂詞，來篩選實體。請將此頁面作為 `<code translate="no">element_filter</code> ` 及 `<code translate="no">MATCH_*</code> ` 運算子家族的語法參考。</p>
<p>StructArray 篩選包含兩個運算子家族：</p>
<table>
<thead>
<tr><th>運算子家族</th><th>主要用途</th><th>結果行為</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>匹配滿足標量謂詞的 Struct 元素。</td><td>在元素層級搜尋中，匹配結果可能包含元素偏移量。在列層級查詢或篩選搜尋中，結果的形狀取決於 API 及輸出欄位。</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>根據滿足標量判別式的 Struct 元素數量來選取實體。</td><td>列級篩選。這些運算子本身不會回傳元素偏移量。</td></tr>
</tbody>
</table>
<p>在 StructArray 運算子中使用標量子欄位。向量子欄位由向量搜尋路徑使用，並非標量謂詞的輸入。</p>
<h2 id="When-to-use-which-operator" class="common-anchor-header">何時使用哪種運算子<button data-href="#When-to-use-which-operator" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>目標</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td>將元素層級向量搜尋限制為符合標量條件的元素。</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>在同一個 Struct 元素內匹配多個標量條件。</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>僅回傳至少有一個 Struct 元素滿足某個謂詞的實體。</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>僅回傳所有 Struct 元素均滿足某個謂詞的實體。</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>僅回傳至少、至多或恰好有<code translate="no">N</code> 個 Struct 元素滿足某個謂詞的實體。</td><td><code translate="no">MATCH_LEAST</code>、<code translate="no">MATCH_MOST</code> ，或<code translate="no">MATCH_EXACT</code></td></tr>
</tbody>
</table>
<h2 id="Element-Filter" class="common-anchor-header">元素篩選器<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>使用 `<code translate="no">element_filter(structArrayField, predicate)</code> ` 來匹配 `StructArray` 欄位中的 `Struct` 元素。</p>
<p>在謂詞內部，使用<code translate="no">$[subfield]</code> 來引用當前 Struct 元素的標量子欄位。</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>當在謂詞內部使用多個條件時，所有<code translate="no">$[subfield]</code> 引用均適用於同一個 Struct 元素：</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; $[quality_score] &gt; <span class="hljs-number">0.9</span>)
<button class="copy-code-btn"></button></code></pre>
<p>當您將實體層級的謂詞與 `<code translate="no">element_filter</code>` 結合使用時，請將 `<code translate="no">element_filter</code> ` 置於表達式的末尾：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct</span>
category == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>)

<span class="hljs-comment"># Incorrect</span>
element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>) &amp;&amp; category == <span class="hljs-string">&quot;index&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">element_filter</code> 在篩選表達式中只能出現一次。請勿將 `<code translate="no">element_filter</code> ` 或 `<code translate="no">MATCH_*</code> ` 嵌套在另一個 `<code translate="no">element_filter</code>` 之中。</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">匹配家族運算子<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>當需根據滿足某個謂詞的 Struct 元素數量來選取實體時，請使用<code translate="no">MATCH_*</code> 運算子。</p>
<table>
<thead>
<tr><th>運算子</th><th>含義</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>至少有一個 Struct 元素滿足該謂詞。</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>所有 Struct 元素皆滿足該謂詞。</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>至少有<code translate="no">N</code> 個 Struct 元素滿足該謂詞。</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td>至多有<code translate="no">N</code> 個結構體元素滿足該謂詞。</td></tr>
<tr><td><code translate="no">MATCH_EXACT(field, predicate, threshold=N)</code></td><td>恰有<code translate="no">N</code> 個 Struct 元素滿足該謂詞。</td></tr>
</tbody>
</table>
<p><code translate="no">MATCH_ANY</code> 且<code translate="no">element_filter</code> 皆可表示至少有一個 Struct 元素滿足該謂詞。當您僅需進行列級篩選時，請使用<code translate="no">MATCH_ANY</code> 。當您需要元素級約束時（例如篩選哪些 Struct 元素會參與元素級向量搜尋），請使用<code translate="no">element_filter</code> 。</p>
<h3 id="MATCHANY" class="common-anchor-header">MATCH_ANY<button data-href="#MATCHANY" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ANY</code> 若 StructArray 中至少有一個元素滿足該謂詞，則其評估結果為<code translate="no">true</code> 。</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>對於空的 StructArray，<code translate="no">MATCH_ANY</code> 會傳回<code translate="no">false</code> 。</p>
<h3 id="MATCHALL" class="common-anchor-header">MATCH_ALL<button data-href="#MATCHALL" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ALL</code> 若 StructArray 中的每個元素都滿足該謂詞，則評估結果為<code translate="no">true</code> 。</p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>對於空的 StructArray，<code translate="no">MATCH_ALL</code> 會傳回<code translate="no">true</code> 。</p>
<h3 id="MATCHLEAST" class="common-anchor-header">若 StructArray 中滿足該謂詞的元素個數大於或等於 xml-ph-0001@deepl.internal，則 MATCH_LEAST<button data-href="#MATCHLEAST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> 若滿足該謂詞的元素個數大於或等於<code translate="no">threshold</code> ，則<code translate="no">true</code> 的評估結果為 。</p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>, threshold=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<p>對於<code translate="no">MATCH_LEAST</code> ，<code translate="no">threshold</code> 必須為正整數。</p>
<h3 id="MATCHMOST" class="common-anchor-header">MATCH_MOST<button data-href="#MATCHMOST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_MOST</code> 若滿足該謂詞的元素個數小於或等於<code translate="no">threshold</code> ，則評估結果為<code translate="no">true</code> 。</p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[has_code] == true, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>對於<code translate="no">MATCH_MOST</code> ，<code translate="no">threshold</code> 可以是零或正整數。</p>
<h3 id="MATCHEXACT" class="common-anchor-header">MATCH_EXACT<button data-href="#MATCHEXACT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> 若滿足該謂詞的元素個數恰好等於<code translate="no">threshold</code> ，則<code translate="no">true</code> 的評估結果為 。</p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[section] == <span class="hljs-string">&quot;filter&quot;</span>, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>對於<code translate="no">MATCH_EXACT</code> ，<code translate="no">threshold</code> 可以是零或正整數。</p>
<h2 id="Supported-predicates" class="common-anchor-header">受支援的謂詞<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">$[...]</code> 語法代表當前 Struct 元素的標量值。敘述子是否受支援取決於標量子欄位的類型。</p>
<table>
<thead>
<tr><th>子欄位類型</th><th>元素層級的謂詞支援</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>如<code translate="no">$[has_code] == true</code> 或<code translate="no">!($[has_code] == true)</code> 等標量謂詞。請避免使用如<code translate="no">$[has_code]</code> 這類未加引號的布林表達式。</td></tr>
<tr><td><code translate="no">INT8</code>、<code translate="no">INT16</code> 、<code translate="no">INT32</code> 、<code translate="no">INT64</code></td><td>比較運算、鏈式範圍、<code translate="no">in</code> 、<code translate="no">not in</code> 、以<code translate="no">+</code> 、<code translate="no">-</code> 、<code translate="no">*</code> 、<code translate="no">/</code> 或<code translate="no">%</code> 開頭並後接比較運算的算術表達式，以及邏輯組合。</td></tr>
<tr><td><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code></td><td>比較、鏈式範圍、<code translate="no">in</code> 、<code translate="no">not in</code> 、以<code translate="no">+</code> 、<code translate="no">-</code> 、<code translate="no">*</code> 或<code translate="no">/</code> 開頭並後接比較運算的算術表達式，以及邏輯組合。<code translate="no">%</code> 運算子不適用於浮點子欄位。</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>字串比較、鏈式範圍、<code translate="no">in</code> 、<code translate="no">not in</code> 、<code translate="no">like</code> 、<code translate="no">=~</code> 、<code translate="no">!~</code> 以及邏輯組合。</td></tr>
<tr><td>向量子欄位</td><td>不支援作為<code translate="no">$[...]</code> 標量謂詞的輸入。請改用 EmbeddingList 搜尋或元素層級向量搜尋來處理向量子欄位。</td></tr>
</tbody>
</table>
<p>邏輯運算子（例如<code translate="no">&amp;&amp;</code> 、<code translate="no">\|\|</code> 及<code translate="no">!</code> ）適用於謂詞表達式。例如，請寫作<code translate="no">!($[has_code] == true)</code> 而非<code translate="no">!$[has_code]</code> 。</p>
<h2 id="Unsupported-predicates" class="common-anchor-header">不支援的謂詞<button data-href="#Unsupported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>元素層級的<code translate="no">$[...]</code> 謂詞不支援：</p>
<ul>
<li><p>文字比對函式，例如<code translate="no">text_match(field, &quot;...&quot;)</code> 或<code translate="no">phrase_match(field, &quot;...&quot;)</code> 。</p></li>
<li><p>JSON 路徑語法、針對 JSON 路徑的<code translate="no">exists</code> ，或 JSON 函式（例如<code translate="no">json_contains</code> 、<code translate="no">json_contains_all</code> 或<code translate="no">json_contains_any</code> ）。</p></li>
<li><p>陣列容器函式，例如<code translate="no">array_contains</code> 、<code translate="no">array_contains_all</code> 、<code translate="no">array_contains_any</code> 或<code translate="no">array_length</code> 。</p></li>
<li><p><code translate="no">$[subfield] is null</code> 或<code translate="no">$[subfield] is not null</code> 。</p></li>
<li><p>幾何／GIS 函數。</p></li>
<li><p>timestamptz 表達式。</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>欄位層級的向量判別式。</p></li>
<li><p>通用篩選函數呼叫，除非特定函數的簽名與執行路徑明確支援 StructArray 元素層級的謂詞。</p></li>
</ul>
<h2 id="Syntax-rules" class="common-anchor-header">語法規則<button data-href="#Syntax-rules" class="anchor-icon" translate="no">
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
<li><p><code translate="no">MATCH_*</code> 運算子名稱不區分大小寫。</p></li>
<li><p>僅在<code translate="no">element_filter</code> 或<code translate="no">MATCH_*</code> 謂詞中使用<code translate="no">$[subfield]</code> 。</p></li>
<li><p>請勿將 `<code translate="no">$[subfield]</code> ` 用作 JSON 路徑、陣列容器或向量欄位參考。</p></li>
<li><p>請勿將 `<code translate="no">element_filter</code> ` 或 `<code translate="no">MATCH_*</code> ` 嵌套在另一個 `StructArray` 運算子之中。</p></li>
<li><p>請使用命名過的<code translate="no">threshold=N</code> 來表示<code translate="no">MATCH_LEAST</code> 、<code translate="no">MATCH_MOST</code> 以及<code translate="no">MATCH_EXACT</code> 。</p></li>
<li><p><code translate="no">MATCH_ANY</code> 若對空的 StructArray 進行操作，則會傳回<code translate="no">false</code> 。</p></li>
<li><p><code translate="no">MATCH_ALL</code> 對空的 StructArray 呼叫時，會傳回<code translate="no">true</code> 。</p></li>
</ul>
<h2 id="See-also" class="common-anchor-header">另請參閱<button data-href="#See-also" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/zh-hant/filtered-search-with-structarray.md">使用 StructArray 進行篩選搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/basic-vector-search-with-structarray.md">使用 StructArray 進行基本向量搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/index-structarray-fields.md">索引 StructArray 欄位</a></p></li>
<li><p><a href="/docs/zh-hant/structarray-limits.md">StructArray 的限制</a></p></li>
</ul>
