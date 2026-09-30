---
id: array-operators.md
title: ARRAY 操作符
summary: Milvus 提供了用于过滤 ARRAY 字段以及部分更新 ARRAY 字段值的 ARRAY 操作符。
---
<h1 id="ARRAY-Operators" class="common-anchor-header">ARRAY 操作符<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供了 ARRAY 操作符，用于过滤 ARRAY 字段以及部分更新 ARRAY 字段的值。</p>
<div class="alert note">
<p>数组中的所有元素必须是同一类型，数组中的嵌套结构将被视为普通字符串。因此，在处理 ARRAY 字段时，建议避免过深的嵌套，并确保数据结构尽可能扁平，以获得最佳性能。</p>
</div>
<p>Milvus 中的 ARRAY 操作符涵盖两种使用场景：</p>
<ul>
<li><p>用于查询和搜索的过滤表达式。</p></li>
<li><p><code translate="no">upsert</code> 请求中的部分更新。</p></li>
</ul>
<h2 id="Available-ARRAY-operators" class="common-anchor-header">可用的 ARRAY 操作符<button data-href="#Available-ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>下表列出了 Milvus 中可用的 ARRAY 操作符。</p>
<table>
<thead>
<tr><th>操作符</th><th>适用场景</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/zh/array-operators.md#ARRAYCONTAINS">ARRAY_CONTAINS(标识符, 表达式)</a></td><td>过滤表达式</td><td>检查特定元素是否存在于 ARRAY 字段中。</td></tr>
<tr><td><a href="/docs/zh/array-operators.md#ARRAYCONTAINSALL">ARRAY_CONTAINS_ALL(标识符, 表达式)</a></td><td>筛选表达式</td><td>检查指定列表中的所有元素是否都存在于 ARRAY 字段中。</td></tr>
<tr><td><a href="/docs/zh/array-operators.md#ARRAYCONTAINSANY">ARRAY_CONTAINS_ANY(标识符, 表达式)</a></td><td>筛选表达式</td><td>检查指定列表中的任何元素是否存在于 ARRAY 字段中。</td></tr>
<tr><td><a href="/docs/zh/array-operators.md#ARRAYLENGTH">ARRAY_LENGTH(标识符)</a></td><td>筛选表达式</td><td>返回 ARRAY 字段中的元素个数，可与比较操作符结合用于筛选。</td></tr>
<tr><td><a href="/docs/zh/array-operators.md#ARRAYAPPEND">ARRAY_APPEND</a></td><td><code translate="no">upsert</code> with<code translate="no">field_ops</code></td><td>将有效载荷元素追加到现有的 ARRAY 字段中。在 Milvus v2.6.17 及更高版本中可用。</td></tr>
<tr><td><a href="/docs/zh/array-operators.md#ARRAYREMOVE">ARRAY_REMOVE</a></td><td><code translate="no">upsert</code> 与<code translate="no">field_ops</code></td><td>从现有 ARRAY 字段中移除所有与请求有效载荷中某个值匹配的元素。适用于 Milvus v2.6.17 及更高版本。</td></tr>
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS</code> 操作符用于检查数组字段中是否存在特定元素。当您需要查找数组中包含给定元素的实体时，此操作符非常有用。</p>
<p><strong>示例</strong></p>
<p>假设有一个名为<code translate="no">history_temperatures</code> 的数组字段，其中包含不同年份的最低气温记录。若要查找数组中包含值<code translate="no">23</code> 的所有实体，可使用以下过滤表达式：</p>
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ALL</code> 操作符确保指定列表中的所有元素均存在于数组字段中。当您需要匹配数组中包含多个值的实体时，此操作符非常有用。</p>
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
    </button></h2><p><code translate="no">ARRAY_APPEND</code> 操作符在执行 `<code translate="no">upsert</code> ` 请求时，将有效载荷元素追加到现有的 ARRAY 字段中。它不是过滤表达式。当您希望向数组添加值，而无需先查询当前数组值时，请使用该操作符。</p>
<p>以下 Python 示例将 `<code translate="no">&quot;premium&quot;</code> ` 追加到主键为 `<code translate="no">1</code>` 的实体的 `<code translate="no">tags</code> ` `ARRAY` 字段中：</p>
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
<p>通过<code translate="no">field_ops</code> 将<code translate="no">ARRAY_APPEND</code> 附加到字段上，可为该字段启用部分更新语义。有关完整工作流、支持的元素类型和限制，请参阅<a href="/docs/zh/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode">合并模式下的Upsert ARRAY字段</a>。</p>
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
    </button></h2><p><code translate="no">ARRAY_REMOVE</code> 操作符会在<code translate="no">upsert</code> 请求期间，从现有 ARRAY 字段中移除所有与请求负载中某个值匹配的元素。它并非过滤表达式。当您希望从数组中移除匹配值，且无需先查询当前数组值时，请使用此操作符。</p>
<p>以下 Python 示例将从主键为<code translate="no">1</code> 的实体的<code translate="no">tags</code> ARRAY 字段中移除<code translate="no">&quot;trial&quot;</code> ：</p>
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
<p>通过<code translate="no">field_ops</code> 将<code translate="no">ARRAY_REMOVE</code> 附加到字段，可为该字段启用部分更新语义。有关完整工作流、支持的元素类型和限制，请参阅<a href="/docs/zh/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode">合并模式下的Upsert ARRAY字段</a>。</p>
