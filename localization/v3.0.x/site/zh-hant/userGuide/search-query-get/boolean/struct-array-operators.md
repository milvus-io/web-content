---
id: struct-array-operators.md
title: StructArray 運算子
summary: >-
  StructArray 運算子會透過評估 StructArray 欄位內標量子欄位的謂詞，來篩選實體。請將本頁作為
  element_filter、MATCH_* 運算子家族，以及 StructArray 路徑上列級謂詞的語法參考。
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
    </button></h1><p>StructArray 運算子透過評估 StructArray 欄位內標量子欄位的判別式，來篩選實體。本頁可作為<code translate="no">element_filter</code> 、<code translate="no">MATCH_*</code> 運算子家族，以及 StructArray 路徑上列級判別式的語法參考。</p>
<p>StructArray 篩選包含兩個運算子家族及一組行級路徑謂詞：</p>
<table>
<thead>
<tr><th>篩選形式</th><th>主要用途</th><th>結果行為</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>匹配滿足標量謂詞的 Struct 元素。</td><td>在元素層級搜尋中，匹配結果可能包含元素偏移量。在列層級查詢或篩選搜尋中，結果的形狀取決於 API 及輸出欄位。</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>根據滿足標量判定的 Struct 元素數量來選取實體。</td><td>行級篩選。這些運算子本身不會回傳元素偏移量。</td></tr>
<tr><td>行級路徑謂詞</td><td>在不使用「<code translate="no">$[...]</code> 」謂詞的情況下，測試單一元素位置、計算 Struct 元素數量，或跨元素測試子欄位值。</td><td>行級篩選。這些判別式不會回傳元素偏移量。</td></tr>
</tbody>
</table>
<p>在 StructArray 運算子中使用標量子欄位。向量子欄位用於向量搜尋路徑，並非標量謂詞的輸入。</p>
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
    </button></h2><p>請根據您的篩選目標選擇運算子：</p>
<table>
<thead>
<tr><th>目標</th><th>使用</th></tr>
</thead>
<tbody>
<tr><td>將元素層級的向量搜尋限制為符合標量條件的元素。</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>在同一個 Struct 元素內匹配多個標量條件。</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>僅回傳至少有一個 Struct 元素滿足某個謂詞的實體。</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>僅回傳所有 Struct 元素均滿足某個謂詞的實體。</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>僅回傳至少、至多或恰好有<code translate="no">N</code> 個 Struct 元素滿足某個謂詞的實體。</td><td><code translate="no">MATCH_LEAST</code>、<code translate="no">MATCH_MOST</code> ，或<code translate="no">MATCH_EXACT</code></td></tr>
<tr><td>檢查特定位置的 Struct 元素，例如第一個區塊。</td><td>位置路徑，例如<code translate="no">chunks[0][section]</code></td></tr>
<tr><td>根據實體中的 Struct 元素數量進行篩選。</td><td><code translate="no">array_length(chunks)</code></td></tr>
<tr><td>檢查是否有任何結構元素包含子欄位值，且不將同一元素上的條件組合在一起。</td><td><code translate="no">array_contains</code>，<code translate="no">array_contains_any</code> ，或<code translate="no">array_contains_all</code> ，並在子欄位路徑上，例如<code translate="no">chunks[section]</code></td></tr>
</tbody>
</table>
<h2 id="Example-data" class="common-anchor-header">範例資料<button data-href="#Example-data" class="anchor-icon" translate="no">
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
    </button></h2><p>以下實體片段範例僅<strong>顯示實體 A</strong> <strong>和實體 B</strong> 的<code translate="no">chunks</code> 欄位，並非完整的插入資料包。</p>
<p><strong>實體 A</strong>：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.74</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.72</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.83</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.87</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>實體 B</strong>：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.95</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.97</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>使用 `<code translate="no">element_filter(structArrayField, predicate)</code> ` 來匹配 StructArray 欄位中的 Struct 元素。</p>
<p>在謂詞內部，請使用 `<code translate="no">$[subfield]</code> ` 來引用當前 Struct 元素的標量子欄位。</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>實體 A 和實體 B 均符合條件：所示的七個元素皆將 `<code translate="no">section</code> ` 設定為 `<code translate="no">&quot;index&quot;</code>`。</p>
<p>當在謂詞內使用多個條件時，所有<code translate="no">$[subfield]</code> 引用均適用於同一個 Struct 元素：</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)
<button class="copy-code-btn"></button></code></pre>
<p>僅實體 B 符合條件：其所有三個元素均同時滿足兩項條件。</p>
<p>當您將實體層級的謂詞與 `<code translate="no">element_filter</code>` 結合使用時，請將 `<code translate="no">element_filter</code> ` 置於表達式的末尾：</p>
<pre><code translate="no" class="language-text"># Correct
category == &quot;index&quot; &amp;&amp; element_filter(chunks, $[quality_score] &gt; 0.9)

# Incorrect
element_filter(chunks, $[quality_score] &gt; 0.9) &amp;&amp; category == &quot;index&quot;
<button class="copy-code-btn"></button></code></pre>
<p>此<code translate="no">category</code> 範例說明了表達式的排序規則，與範例資料無關，該資料並未定義<code translate="no">category</code> 。</p>
<p><code translate="no">element_filter</code> 在篩選表達式中，<code translate="no">element_filter</code> 只能出現一次。請勿將 或<code translate="no">MATCH_*</code> 嵌套在另一個<code translate="no">element_filter</code> 之中。</p>
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
    </button></h2><p>當需根據滿足某個謂詞的 Struct 元素數量來選取實體時，請使用<code translate="no">MATCH_*</code> 運算子。這些運算子的含義如下：</p>
<table>
<thead>
<tr><th>運算子</th><th>含義</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>至少有一個 Struct 元素滿足該謂詞。</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>所有 Struct 元素皆滿足該謂詞。</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>至少有<code translate="no">N</code> 個 Struct 元素滿足該謂詞。</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td>至多有<code translate="no">N</code> 個 Struct 元素滿足該謂詞。</td></tr>
<tr><td><code translate="no">MATCH_EXACT(field, predicate, threshold=N)</code></td><td>恰有<code translate="no">N</code> 個 Struct 元素滿足該謂詞。</td></tr>
</tbody>
</table>
<p><code translate="no">MATCH_ANY</code> 而 `<code translate="no">element_filter</code> ` 兩者皆可表示至少有一個 Struct 元素滿足該謂詞。當您僅需進行列級篩選時，請使用 `<code translate="no">MATCH_ANY</code> `；當您需要元素級約束（例如篩選哪些 Struct 元素會參與元素級向量搜尋）時，請使用 `<code translate="no">element_filter</code> `。</p>
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
<pre><code translate="no" class="language-text">MATCH_ANY(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>實體 A 和實體 B 皆符合條件，因為兩者各有至少一個元素的<code translate="no">section</code> 設定為<code translate="no">&quot;index&quot;</code> 。</p>
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
    </button></h3><p><code translate="no">MATCH_ALL</code> 若 StructArray 中的每個元素都滿足該謂詞，則其評估結果為<code translate="no">true</code> 。</p>
<pre><code translate="no" class="language-text">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>實體 A 和實體 B 均符合條件，因為每個顯示的元素皆將<code translate="no">has_code</code> 設定為<code translate="no">true</code> 。</p>
<p>對於空的 StructArray，<code translate="no">MATCH_ALL</code> 會傳回<code translate="no">true</code> 。</p>
<h3 id="MATCHLEAST" class="common-anchor-header">MATCH_LEAST<button data-href="#MATCHLEAST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> 若滿足該謂詞的元素數量大於或等於<code translate="no">threshold</code> ，則評估結果為<code translate="no">true</code> 。</p>
<pre><code translate="no" class="language-text">MATCH_LEAST(chunks, $[quality_score] &gt; 0.9, threshold=2)
<button class="copy-code-btn"></button></code></pre>
<p>只有實體 B 符合條件：實體 A 沒有符合條件的元素，而實體 B 有三個。</p>
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
    </button></h3><p><code translate="no">MATCH_MOST</code> 若滿足該謂詞的元素數量小於或等於<code translate="no">threshold</code> ，則 MATCH_MOST 的評估結果為<code translate="no">true</code> 。</p>
<pre><code translate="no" class="language-text">MATCH_MOST(chunks, $[has_code] == true, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>兩者皆不符：實體 A 有四個符合條件的元素，而實體 B 有三個。</p>
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> 若滿足該謂詞的元素數量恰好等於<code translate="no">threshold</code> ，則其評估結果為<code translate="no">true</code> 。</p>
<pre><code translate="no" class="language-text">MATCH_EXACT(chunks, $[section] == &quot;filter&quot;, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>由於沒有任何實體的<code translate="no">section</code> 被設定為<code translate="no">&quot;filter&quot;</code> ，因此沒有任何實體符合條件。</p>
<p>對於<code translate="no">MATCH_EXACT</code> ，<code translate="no">threshold</code> 可以是零或正整數。</p>
<h2 id="Row-level-predicates-on-StructArray-paths" class="common-anchor-header">StructArray 路徑上的行級謂詞<button data-href="#Row-level-predicates-on-StructArray-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>除了 `<code translate="no">element_filter</code> ` 和 `<code translate="no">MATCH_*</code>` 之外，一般篩選表達式亦可直接參照 StructArray 欄位或其標量子欄位之一。這些謂詞在實體層級進行評估，且不會回傳元素偏移量。</p>
<h3 id="Subfield-access" class="common-anchor-header">子欄位存取<button data-href="#Subfield-access" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Access-a-Struct-element-by-position" class="common-anchor-header">依位置存取 Struct 元素</h4><p>使用<code translate="no">structArrayField[index][subfield]</code> 來引用 Struct 元素中以零為起點的某個標量子欄位。先寫位置，再寫子欄位名稱。反向路徑<code translate="no">chunks[quality_score][0] &gt; 0.8</code> 是不合規的。</p>
<p>例如，測試第一個元素的品質分數：</p>
<pre><code translate="no" class="language-text">chunks[0][quality_score] &gt; 0.8
<button class="copy-code-btn"></button></code></pre>
<p>僅實體 B 符合此表達式。</p>
<pre><code translate="no" class="language-text"># The first chunk belongs to the &quot;index&quot; section.
chunks[0][section] == &quot;index&quot;

# The second chunk has a high quality score.
chunks[1][quality_score] &gt; 0.9

# The first chunk is on page 1, 2, or 3.
chunks[0][page] in [1, 2, 3]

# Chained range on a positional path.
0.8 &lt; chunks[0][quality_score] &lt; 0.95
<button class="copy-code-btn"></button></code></pre>
<p>對於實體 A 和實體 B，第一個區段謂詞與兩者皆匹配，第二個分數謂詞僅與實體 B 匹配，而嚴格的分數範圍則與兩者皆不匹配。<code translate="no">page</code> 謂詞僅為通用範例；範例資料中並未定義<code translate="no">page</code> 。</p>
<p>位置路徑支援對標量子欄位的比較、<code translate="no">in</code> 、<code translate="no">not in</code> 以及鏈式範圍謂詞。若實體的 StructArray 欄位在該位置沒有元素，則該實體不匹配。</p>
<h3 id="ARRAY-operators" class="common-anchor-header">ARRAY 運算子<button data-href="#ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Count-Struct-elements" class="common-anchor-header">計數 Struct 元素</h4><p>使用<code translate="no">array_length(structArrayField)</code> 根據實體中的 Struct 元素數量進行篩選。若在子欄位路徑上使用<code translate="no">array_length</code> （例如<code translate="no">array_length(chunks[section])</code> ），則會返回相同的計數，因為每個子欄位都會針對每個 Struct 元素儲存一個值。</p>
<pre><code translate="no" class="language-text"># Articles with at least three chunks.
array_length(chunks) &gt;= 3

# Articles with exactly one chunk.
array_length(chunks) == 1
<button class="copy-code-btn"></button></code></pre>
<p>對於 `<code translate="no">&gt;= 3</code> `，父欄位的計數判準會匹配兩個實體；而對於 `<code translate="no">== 1</code>`，則兩個實體皆不匹配。您也可以針對子欄位路徑計算值：</p>
<pre><code translate="no" class="language-text">ARRAY_LENGTH(chunks[quality_score]) == 3
<button class="copy-code-btn"></button></code></pre>
<p>僅有實體 B 符合條件，因為其<code translate="no">quality_score</code> 子欄位有三個值。</p>
<h4 id="Test-subfield-values-across-elements" class="common-anchor-header">跨元素測試子欄位值</h4><p>例如，測試是否有任何品質分數等於<code translate="no">0.74</code> ：</p>
<pre><code translate="no" class="language-text">ARRAY_CONTAINS(chunks[quality_score], 0.74)
<button class="copy-code-btn"></button></code></pre>
<p>僅有實體 A 符合條件。</p>
<p>在標量子欄位路徑上使用<code translate="no">array_contains</code> 、<code translate="no">array_contains_any</code> 或<code translate="no">array_contains_all</code> ，可測試該實體中所有 Struct 元素所屬子欄位的值。每個子欄位路徑皆獨立評估，因此不同子欄位的條件可由不同的 Struct 元素滿足。</p>
<pre><code translate="no" class="language-text"># At least one chunk belongs to the &quot;index&quot; section.
array_contains(chunks[section], &quot;index&quot;)

# At least one chunk belongs to the &quot;index&quot; or the &quot;search&quot; section.
array_contains_any(chunks[section], [&quot;index&quot;, &quot;search&quot;])

# The chunks cover both the &quot;index&quot; and the &quot;search&quot; sections,
# not necessarily in the same chunk.
array_contains_all(chunks[section], [&quot;index&quot;, &quot;search&quot;])
<button class="copy-code-btn"></button></code></pre>
<p>以範例資料而言，<code translate="no">array_contains</code> 和<code translate="no">array_contains_any</code> 這兩項表達式皆能匹配兩個實體。<code translate="no">array_contains_all</code> 則無法匹配任何一個實體，因為兩個實體均未包含<code translate="no">&quot;search&quot;</code> 區段。這些範例並未展示由不同元素在不同子欄位上滿足條件的情況。</p>
<p><code translate="no">array_contains(chunks[section], &quot;index&quot;)</code> 與<code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code> 選取相同的實體。當同一 Struct 元素必須滿足多個條件時，請使用<code translate="no">MATCH_*</code> 或<code translate="no">element_filter</code> ，因為<code translate="no">$[...]</code> 謂詞是針對每個元素分別進行評估的。</p>
<h3 id="Test-whether-a-nullable-StructArray-field-is-null" class="common-anchor-header">測試可為 null 的 StructArray 欄位是否為 null<button data-href="#Test-whether-a-nullable-StructArray-field-is-null" class="anchor-icon" translate="no">
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
    </button></h3><p>對可為空的 StructArray 欄位使用<code translate="no">IS NULL</code> 或<code translate="no">IS NOT NULL</code> 來測試整個欄位值。NULL 適用於整個 StructArray 欄位，因此這些謂詞僅接受欄位名稱，不接受子欄位路徑。</p>
<pre><code translate="no" class="language-text"># Entities that have no chunks value.
chunks is null

# Entities that have a chunks value.
chunks is not null
<button class="copy-code-btn"></button></code></pre>
<p>關於適用性，請參閱<a href="/docs/zh-hant/structarray-limits.md#Nullable-and-dynamic-schema-limits">《可為空與動態架構限制》</a>。實體 A 和實體 B 均具有非 NULL 的 StructArray 值。</p>
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
    </button></h2><p><code translate="no">$[...]</code> 語法代表當前 Struct 元素的標量值。謂詞的支援情況取決於標量子欄位的類型：</p>
<table>
<thead>
<tr><th>子欄位類型</th><th>元素層級的謂詞支援</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>如 `<code translate="no">$[has_code] == true</code> ` 或 `<code translate="no">!($[has_code] == true)</code>` 之類的標量謂詞。請避免使用如 `<code translate="no">$[has_code]</code>` 這類未加引號的布林運算式。</td></tr>
<tr><td><code translate="no">INT8</code>、<code translate="no">INT16</code> 、<code translate="no">INT32</code> 、<code translate="no">INT64</code></td><td>比較運算、鏈式範圍、<code translate="no">in</code> 、<code translate="no">not in</code> ，以及以<code translate="no">+</code> 、<code translate="no">-</code> 、<code translate="no">*</code> 、<code translate="no">/</code> 或<code translate="no">%</code> 開頭並後接比較運算的算術表達式，以及邏輯組合。</td></tr>
<tr><td><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code></td><td>比較、鏈式範圍、<code translate="no">in</code> 、<code translate="no">not in</code> 、以<code translate="no">+</code> 、<code translate="no">-</code> 、<code translate="no">*</code> 或<code translate="no">/</code> 開頭並後接比較運算的算術表達式，以及邏輯組合。<code translate="no">%</code> 運算子不支援浮點數子欄位。</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>字串比較、鏈式範圍、<code translate="no">in</code> 、<code translate="no">not in</code> 、<code translate="no">like</code> 、<code translate="no">=~</code> 、<code translate="no">!~</code> 以及邏輯組合。</td></tr>
<tr><td>向量子欄位</td><td>不支援作為<code translate="no">$[...]</code> 標量謂詞的輸入。請改用 EmbeddingList 搜尋或元素層級向量搜尋來處理向量子欄位。</td></tr>
</tbody>
</table>
<p>邏輯運算子（例如<code translate="no">&amp;&amp;</code> 、<code translate="no">||</code> 及<code translate="no">!</code> ）適用於謂詞表達式。例如，請寫作<code translate="no">!($[has_code] == true)</code> 而非<code translate="no">!$[has_code]</code> 。</p>
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
<li><p>陣列容器函式，例如<code translate="no">array_contains</code> 、<code translate="no">array_contains_all</code> 、<code translate="no">array_contains_any</code> 或<code translate="no">array_length</code> （參見<code translate="no">$[subfield]</code> ）。請改為在列級謂詞中，對子欄位路徑（例如<code translate="no">chunks[section]</code> ）使用這些函式。</p></li>
<li><p><code translate="no">$[subfield] is null</code> 或<code translate="no">$[subfield] is not null</code> 。</p></li>
<li><p>幾何／GIS 函數。</p></li>
<li><p>timestamptz 表達式。</p></li>
<li><p><code translate="no">random_sample(...)</code>。</p></li>
<li><p>欄位層級向量判別式。</p></li>
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
    </button></h2><p>請遵循以下語法規則：</p>
<ul>
<li><p><code translate="no">MATCH_*</code> 運算子名稱不區分大小寫。</p></li>
<li><p>僅可在 `<code translate="no">element_filter</code> ` 或 `<code translate="no">MATCH_*</code> ` 謂詞內使用 `<code translate="no">$[subfield]</code> `。例如，<code translate="no">array_length($[section])</code> 將被拒絕。</p></li>
<li><p>請勿將 `<code translate="no">$[subfield]</code> ` 用作 JSON 路徑、陣列容器或向量欄位參照。</p></li>
<li><p>請勿將<code translate="no">element_filter</code> 或<code translate="no">MATCH_*</code> 嵌套在另一個 StructArray 運算子之中。</p></li>
<li><p>請使用命名過的<code translate="no">threshold=N</code> 來表示<code translate="no">MATCH_LEAST</code> 、<code translate="no">MATCH_MOST</code> 以及<code translate="no">MATCH_EXACT</code> 。</p></li>
<li><p>在位置路徑中，請將元素位置寫在子欄位名稱之前：<code translate="no">chunks[0][section]</code> ，而非<code translate="no">chunks[section][0]</code> 。</p></li>
<li><p>僅在整個 StructArray 欄位上使用<code translate="no">IS NULL</code> 和<code translate="no">IS NOT NULL</code> ，例如<code translate="no">chunks is null</code> 。請勿在子欄位路徑（如<code translate="no">chunks[section]</code> ）或<code translate="no">$[subfield]</code> 上使用它們。</p></li>
<li><p><code translate="no">MATCH_ANY</code> 若對空的 StructArray 執行此操作，將返回<code translate="no">false</code> 。</p></li>
<li><p><code translate="no">MATCH_ALL</code> 若對空的 StructArray 進行此操作，將傳回<code translate="no">true</code> 。</p></li>
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
    </button></h2><p>有關相關指引，請參閱：</p>
<ul>
<li><p><a href="/docs/zh-hant/filtered-search-with-structarray.md">使用 StructArray 進行篩選搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/basic-vector-search-with-structarray.md">使用 StructArray 進行基本向量搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/index-structarray-fields.md">索引 StructArray 欄位</a></p></li>
<li><p><a href="/docs/zh-hant/structarray-limits.md">StructArray 的限制</a></p></li>
</ul>
