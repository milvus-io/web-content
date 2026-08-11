---
id: array-operators.md
title: 陣列運算子
summary: Milvus 提供了強大的運算子來查詢陣列欄位，讓您能夠根據陣列的內容來篩選並擷取實體。
---
<h1 id="ARRAY-Operators" class="common-anchor-header">陣列運算子<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供強大的運算子來查詢陣列欄位，讓您能夠根據陣列的內容來篩選並擷取實體。</p>
<div class="alert note">
<p>陣列中的所有元素必須為相同類型，且陣列內的嵌套結構將被視為純文字。因此，在處理 ARRAY 欄位時，建議避免過度深層的嵌套，並確保資料結構盡可能扁平化，以獲得最佳效能。</p>
</div>
<h2 id="Available-ARRAY-Operators" class="common-anchor-header">可用的 ARRAY 運算子<button data-href="#Available-ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>ARRAY 運算子可讓您在 Milvus 中對陣列欄位進行細粒度的查詢。這些運算子包括：</p>
<ul>
<li><p><a href="/docs/zh-hant/v2.6.x/array-operators.md#ARRAYCONTAINS"><code translate="no">ARRAY_CONTAINS(identifier, expr)</code></a>: 檢查特定元素是否存在於陣列欄位中。</p></li>
<li><p><a href="/docs/zh-hant/v2.6.x/array-operators.md#ARRAYCONTAINSALL"><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code></a>: 確保指定清單中的所有元素均存在於陣列欄位中。</p></li>
<li><p><a href="/docs/zh-hant/v2.6.x/array-operators.md#ARRAYCONTAINSANY"><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code></a>: 檢查陣列欄位中是否包含指定清單中的任何元素。</p></li>
<li><p><a href="/docs/zh-hant/v2.6.x/array-operators.md#ARRAYLENGTH"><code translate="no">ARRAY_LENGTH(identifier)</code></a>: 返回陣列欄位中的元素數量，並可與比較運算子結合使用以進行篩選。</p></li>
</ul>
<h2 id="ARRAYCONTAINS" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS</code> 運算子用於檢查陣列欄位中是否存在特定元素。當您需要找出陣列中包含特定元素的實體時，此運算子非常實用。</p>
<p><strong>範例</strong></p>
<p>假設您有一個名為 `<code translate="no">history_temperatures</code>` 的陣列欄位，其中包含各年份的最低氣溫紀錄。若要找出陣列中包含值 `<code translate="no">23</code>` 的所有實體，可使用以下篩選表達式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>這將回傳所有<code translate="no">history_temperatures</code> 陣列中包含值<code translate="no">23</code> 的實體。</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ALL</code> 運算子可確保指定清單中的所有元素均存在於陣列欄位中。當您需要篩選陣列中包含多個值的實體時，此運算子便十分實用。</p>
<p><strong>範例</strong></p>
<p>若要找出所有<code translate="no">history_temperatures</code> 陣列同時包含<code translate="no">23</code> 與<code translate="no">24</code> 的實體，可使用：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>這將回傳所有<code translate="no">history_temperatures</code> 陣列同時包含上述兩個指定值的實體。</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ANY</code> 運算子會檢查陣列欄位中是否包含指定清單中的任何元素。當您希望匹配陣列中至少包含一個指定值的實體時，此功能非常實用。</p>
<p><strong>範例</strong></p>
<p>若要找出所有<code translate="no">history_temperatures</code> 陣列中包含<code translate="no">23</code> 或<code translate="no">24</code> 任一項的實體，可使用以下語法：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>這將回傳所有<code translate="no">history_temperatures</code> 陣列中至少包含<code translate="no">23</code> 或<code translate="no">24</code> 其中一個值的實體。</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_LENGTH</code> 會傳回陣列欄位的長度（元素數量）。它僅接受一個參數：陣列欄位識別碼。</p>
<p><strong>範例</strong></p>
<p>要查詢所有<code translate="no">history_temperatures</code> 陣列元素數少於 10 個的實體：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>這將回傳所有<code translate="no">history_temperatures</code> 陣列元素數少於 10 個的實體。</p>
