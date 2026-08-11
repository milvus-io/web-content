---
id: array-operators.md
title: 数组操作符
summary: Milvus 提供了强大的操作符来查询数组字段，允许您根据数组的内容对实体进行筛选和检索。
---
<h1 id="ARRAY-Operators" class="common-anchor-header">数组操作符<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供了用于查询数组字段的强大操作符，允许您根据数组的内容对实体进行筛选和检索。</p>
<div class="alert note">
<p>数组中的所有元素必须为同一类型，且数组内的嵌套结构将被视为普通字符串。因此，在处理 ARRAY 字段时，建议避免过深的嵌套，并确保数据结构尽可能扁平，以获得最佳性能。</p>
</div>
<h2 id="Available-ARRAY-Operators" class="common-anchor-header">可用的 ARRAY 操作符<button data-href="#Available-ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>ARRAY 操作符支持在 Milvus 中对数组字段进行精细查询。这些操作符包括：</p>
<ul>
<li><p><a href="/docs/zh/v2.6.x/array-operators.md#ARRAYCONTAINS"><code translate="no">ARRAY_CONTAINS(identifier, expr)</code></a>: 检查特定元素是否存在于数组字段中。</p></li>
<li><p><a href="/docs/zh/v2.6.x/array-operators.md#ARRAYCONTAINSALL"><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code></a>: 确保指定列表中的所有元素均存在于数组字段中。</p></li>
<li><p><a href="/docs/zh/v2.6.x/array-operators.md#ARRAYCONTAINSANY"><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code></a>: 检查数组字段中是否包含指定列表中的任意一个元素。</p></li>
<li><p><a href="/docs/zh/v2.6.x/array-operators.md#ARRAYLENGTH"><code translate="no">ARRAY_LENGTH(identifier)</code></a>: 返回数组字段中的元素个数，可与比较操作符结合使用以进行过滤。</p></li>
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS</code> 操作符用于检查数组字段中是否存在特定元素。当您需要查找数组中包含给定元素的实体时，此操作符非常有用。</p>
<p><strong>示例</strong></p>
<p>假设有一个名为<code translate="no">history_temperatures</code> 的数组字段，其中包含不同年份的最低气温记录。要查找数组中包含值<code translate="no">23</code> 的所有实体，可以使用以下过滤表达式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>这将返回所有在<code translate="no">history_temperatures</code> 数组中包含值<code translate="no">23</code> 的实体。</p>
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ALL</code> 操作符确保指定列表中的所有元素都存在于数组字段中。当您需要匹配数组中包含多个值的实体时，此操作符非常有用。</p>
<p><strong>示例</strong></p>
<p>若要查找<code translate="no">history_temperatures</code> 数组同时包含<code translate="no">23</code> 和<code translate="no">24</code> 的所有实体，可使用：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>这将返回所有<code translate="no">history_temperatures</code> 数组中同时包含这两个指定值的实体。</p>
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ANY</code> 操作符用于检查数组字段中是否包含指定列表中的任意一个元素。当您希望匹配数组中至少包含一个指定值的实体时，此操作符非常有用。</p>
<p><strong>示例</strong></p>
<p>若要查找<code translate="no">history_temperatures</code> 数组中包含<code translate="no">23</code> 或<code translate="no">24</code> 任一值的实体，可使用以下代码：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>这将返回所有<code translate="no">history_temperatures</code> 数组中至少包含<code translate="no">23</code> 或<code translate="no">24</code> 其中一个值的实体。</p>
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
    </button></h2><p><code translate="no">ARRAY_LENGTH</code> 返回数组字段的长度（元素个数）。它仅接受一个参数：数组字段标识符。</p>
<p><strong>示例</strong></p>
<p>要查找<code translate="no">history_temperatures</code> 数组中元素少于10个的所有实体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>这将返回所有<code translate="no">history_temperatures</code> 数组元素数少于10个的实体。</p>
