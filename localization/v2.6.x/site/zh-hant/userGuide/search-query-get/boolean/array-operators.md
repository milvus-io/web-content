---
id: array-operators.md
title: ARRAY 運算子
summary: Milvus 提供了 ARRAY 運算子，用於篩選 ARRAY 欄位以及部分更新 ARRAY 欄位的值。
---
<h1 id="ARRAY-Operators" class="common-anchor-header">ARRAY 運算子<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供 ARRAY 運算子，用於篩選 ARRAY 欄位以及部分更新 ARRAY 欄位值。</p>
<div class="alert note">
<p>陣列中的所有元素必須為相同類型，且陣列內的嵌套結構將被視為普通字串。因此，在處理 ARRAY 欄位時，建議避免過度深層的嵌套，並確保資料結構盡可能扁平化，以獲得最佳效能。</p>
</div>
<p>Milvus 中的 ARRAY 運算子涵蓋兩種使用情境：</p>
<ul>
<li><p>用於查詢與搜尋的篩選表達式。</p></li>
<li><p><code translate="no">upsert</code> 請求中的部分更新。</p></li>
</ul>
<h2 id="Available-ARRAY-operators" class="common-anchor-header">可用的 ARRAY 運算子<button data-href="#Available-ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>下表列出了 Milvus 中可用的 ARRAY 運算子。</p>
<table>
<thead>
<tr><th>運算子</th><th>適用於</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/zh-hant/v2.6.x/array-operators.md#ARRAYCONTAINS">ARRAY_CONTAINS(識別碼, 表達式)</a></td><td>篩選表達式</td><td>檢查特定元素是否存在於 ARRAY 欄位中。</td></tr>
<tr><td><a href="/docs/zh-hant/v2.6.x/array-operators.md#ARRAYCONTAINSALL">ARRAY_CONTAINS_ALL(識別碼, 表達式)</a></td><td>篩選式</td><td>檢查指定清單中的所有元素是否皆存在於 ARRAY 欄位中。</td></tr>
<tr><td><a href="/docs/zh-hant/v2.6.x/array-operators.md#ARRAYCONTAINSANY">ARRAY_CONTAINS_ANY(識別碼, 表達式)</a></td><td>篩選表達式</td><td>檢查指定清單中的任何元素是否存在於 ARRAY 欄位中。</td></tr>
<tr><td><a href="/docs/zh-hant/v2.6.x/array-operators.md#ARRAYLENGTH">ARRAY_LENGTH(識別碼)</a></td><td>篩選表達式</td><td>返回 ARRAY 欄位中的元素數量，並可與比較運算子結合進行篩選。</td></tr>
<tr><td><a href="/docs/zh-hant/v2.6.x/array-operators.md#ARRAYAPPEND">ARRAY_APPEND</a></td><td><code translate="no">upsert</code> with<code translate="no">field_ops</code></td><td>將有效載荷元素追加至現有的 ARRAY 欄位。適用於 Milvus v2.6.17 及後續版本。</td></tr>
<tr><td><a href="/docs/zh-hant/v2.6.x/array-operators.md#ARRAYREMOVE">ARRAY_REMOVE</a></td><td><code translate="no">upsert</code> 與<code translate="no">field_ops</code></td><td>從現有的 ARRAY 欄位中移除所有與請求有效載荷中某個值相符的元素。適用於 Milvus v2.6.17 及後續版本。</td></tr>
</tbody>
</table>
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS</code> 運算子用於檢查陣列欄位中是否存在特定元素。當您需要查找陣列中包含特定元素的實體時，此功能非常實用。</p>
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
<p>若要找出所有<code translate="no">history_temperatures</code> 陣列同時包含<code translate="no">23</code> 和<code translate="no">24</code> 的實體，可使用：</p>
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ANY</code> 運算子會檢查陣列欄位中是否包含指定清單中的任何元素。當您希望匹配陣列中至少包含其中一個指定值的實體時，此功能非常實用。</p>
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
    </button></h2><p><code translate="no">ARRAY_LENGTH</code> 會傳回陣列欄位的長度（元素數量）。此函式僅接受一個參數：陣列欄位識別碼。</p>
<p><strong>範例</strong></p>
<p>要查詢所有<code translate="no">history_temperatures</code> 陣列元素數少於 10 個的實體：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>這將回傳所有其 `<code translate="no">history_temperatures</code> ` 陣列元素數少於 10 個的實體。</p>
<h2 id="ARRAYAPPEND--Milvus-2617+" class="common-anchor-header">ARRAY_APPEND<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYAPPEND--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_APPEND</code> 運算子會在執行<code translate="no">upsert</code> 請求時，將有效載荷元素追加至現有的 ARRAY 欄位中。它並非篩選表達式。當您希望直接向陣列新增值，而無需先查詢當前陣列值時，請使用此運算子。</p>
<p>以下 Python 範例將 `<code translate="no">&quot;premium&quot;</code> ` 附加至主鍵為 `<code translate="no">1</code>` 的實體之 `<code translate="no">tags</code> ` ARRAY 欄位：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>透過 `<code translate="no">field_ops</code> ` 將 `<code translate="no">ARRAY_APPEND</code> ` 附加至欄位，可為該欄位啟用部分更新語義。有關完整工作流程、受支援的元素類型及限制，請參閱《<a href="/docs/zh-hant/v2.6.x/upsert-entities.md#Upsert-ARRAY-fields-with-partial-update-operators">使用部分更新運算子對 ARRAY 欄位進行 Upsert》</a>。</p>
<h2 id="ARRAYREMOVE--Milvus-2617+" class="common-anchor-header">ARRAY_REMOVE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYREMOVE--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_REMOVE</code> 運算子會在執行<code translate="no">upsert</code> 請求時，從現有的 ARRAY 欄位中移除所有與請求載荷中某個值相符的元素。這並非篩選表達式。當您希望從陣列中移除相符的值，且無需事先查詢當前陣列值時，請使用此運算子。</p>
<p>以下 Python 範例會從主鍵為<code translate="no">1</code> 的實體之<code translate="no">tags</code> ARRAY 欄位中，移除<code translate="no">&quot;trial&quot;</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_remove()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>透過 `<code translate="no">field_ops</code> ` 將 `<code translate="no">ARRAY_REMOVE</code> ` 附加至欄位，可為該欄位啟用部分更新語義。有關完整工作流程、受支援的元素類型及限制，請參閱《<a href="/docs/zh-hant/v2.6.x/upsert-entities.md#Upsert-ARRAY-fields-with-partial-update-operators">使用部分更新運算子對 ARRAY 欄位進行 Upsert》</a>。</p>
