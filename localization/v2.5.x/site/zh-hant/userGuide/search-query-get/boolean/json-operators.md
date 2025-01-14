---
id: json-operators.md
summary: >-
  Milvus 支援先進的運算符號來查詢和過濾 JSON 欄位，使其成為管理複雜、結構化資料的完美工具。這些運算符能夠高效地查詢 JSON 文件，允許您根據
  JSON 欄位中的特定元素、值或條件檢索實體。本節將引導您在 Milvus 中使用 JSON 特定的運算符，並提供實例來說明它們的功能。
title: JSON 運算符號
---
<h1 id="JSON-Operators​" class="common-anchor-header">JSON 運算符號<button data-href="#JSON-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 支援先進的運算符號，用於查詢和過濾 JSON 欄位，使其成為管理複雜、結構化數據的完美工具。這些運算符能夠高效地查詢 JSON 文檔，允許您根據 JSON 欄位中的特定元素、值或條件檢索實體。本節將引導您在 Milvus 中使用 JSON 特定的運算符號，並提供實例來說明它們的功能。</p>
<div class="alert note">
<p>JSON 欄位無法處理複雜的嵌套結構，並將所有嵌套結構視為純字串。因此，在使用 JSON 欄位時，建議避免過深的巢狀結構，並確保您的資料結構盡可能扁平，以獲得最佳效能。</p>
</div>
<h2 id="Available-JSON-Operators​" class="common-anchor-header">可用的 JSON 運算符<button data-href="#Available-JSON-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供了幾個強大的 JSON 運算符，幫助過濾和查詢 JSON 資料，這些運算符有</p>
<ul>
<li><p><a href="#JSON_CONTAINS"><code translate="no">JSON_CONTAINS(identifier, expr)</code></a>:篩選在欄位中找到指定 JSON 表達式的實體。</p></li>
<li><p><a href="#JSON_CONTAINS_ALL"><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code></a>:確保指定的 JSON 表達式的所有元素都存在於欄位中。</p></li>
<li><p><a href="#JSON_CONTAINS_ANY"><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code></a>:篩選至少有一個 JSON 表達式元素存在於欄位中的實體。</p></li>
</ul>
<p>讓我們以範例來探討這些運算符號，看看它們如何應用在實際情況中。</p>
<h2 id="JSONCONTAINS​" class="common-anchor-header">JSON_CONTAINS<button data-href="#JSONCONTAINS​" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains</code> 運算符檢查 JSON 欄位中是否存在特定元素或子陣列。當您想要確保 JSON 陣列或物件包含特定值時，這個運算符很有用。</p>
<p><strong>範例</strong></p>
<p>假設您有一個產品集合，每個產品都有一個<code translate="no">tags</code> 欄位，其中包含一個字串的 JSON 陣列，例如<code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code> 。您想要篩選具有標籤<code translate="no">&quot;sale&quot;</code> 的產品。</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>]}​
filter = <span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>在這個範例中，Milvus 會返回所有<code translate="no">tags</code> 欄位包含<code translate="no">&quot;sale&quot;</code> 元素的產品。</p>
<h2 id="JSONCONTAINSALL​" class="common-anchor-header">json_contains_all<button data-href="#JSONCONTAINSALL​" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains_all</code> 運算子確保指定 JSON 表達式的所有元素都出現在目標欄位中。當您需要匹配 JSON 陣列中的多個值時，它特別有用。</p>
<p><strong>範例</strong></p>
<p>繼續使用產品標籤的情境，如果您想找出所有標籤為<code translate="no">&quot;electronics&quot;</code>,<code translate="no">&quot;sale&quot;</code>, 和<code translate="no">&quot;new&quot;</code> 的產品，您可以使用<code translate="no">json_contains_all</code> 運算符號。</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>, <span class="hljs-string">&quot;discount&quot;</span>]}​
filter = <span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>此查詢將返回<code translate="no">tags</code> 陣列包含所有三個指定元素的所有產品：<code translate="no">&quot;electronics&quot;</code>,<code translate="no">&quot;sale&quot;</code>, 和<code translate="no">&quot;new&quot;</code> 。</p>
<h2 id="JSONCOTAINSANY​" class="common-anchor-header">json_cotains_any<button data-href="#JSONCOTAINSANY​" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains_any</code> 運算符號會過濾至少有一個 JSON 表達式成員存在於欄位中的實體。當您要根據多個可能值中的任何一個來匹配實體時，這非常有用。</p>
<p><strong>範例</strong></p>
<p>假設您想要過濾至少有一個標記<code translate="no">&quot;electronics&quot;</code>,<code translate="no">&quot;sale&quot;</code>, 或<code translate="no">&quot;new&quot;</code> 的產品。您可以使用<code translate="no">json_contains_any</code> 運算符號來達成這個目的。</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>]}​
filter = <span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>在這種情況下，Milvus 會返回清單<code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code> 中至少有一個標籤的所有產品。即使產品只有其中一個標籤，也會包含在結果中。</p>
