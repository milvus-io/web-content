---
id: boolean.md
title: 过滤说明
summary: >-
  Milvus 提供强大的过滤功能，可对数据进行精确查询。过滤表达式允许你针对特定的标量字段，用不同的条件细化搜索结果。本指南介绍如何在 Milvus
  中使用过滤表达式，并以查询操作符为例进行说明。您还可以在搜索和删除请求中应用这些过滤器。
---
<h1 id="Filtering-Explained" class="common-anchor-header">过滤说明<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供强大的过滤功能，可精确查询数据。过滤表达式允许你针对特定的标量字段，用不同的条件细化搜索结果。本指南介绍如何在 Milvus 中使用过滤表达式，并以查询操作符为例。您还可以在搜索和删除请求中应用这些过滤器。</p>
<h2 id="Basic-operators" class="common-anchor-header">基本操作符<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支持几种用于过滤数据的基本操作符：</p>
<ul>
<li><p><strong>比较操作符</strong>：<code translate="no">==</code>,<code translate="no">!=</code>,<code translate="no">&gt;</code>,<code translate="no">&lt;</code>,<code translate="no">&gt;=</code>, 和<code translate="no">&lt;=</code> 允许基于数字或文本字段进行筛选。</p></li>
<li><p><strong>范围过滤器</strong>：<code translate="no">IN</code> 和<code translate="no">LIKE</code> 可帮助匹配特定的值范围或集合。</p></li>
<li><p><strong>算术操作符</strong>：<code translate="no">+</code>,<code translate="no">-</code>,<code translate="no">*</code>,<code translate="no">/</code>,<code translate="no">%</code>, 和<code translate="no">**</code> 用于涉及数字字段的计算。</p></li>
<li><p><strong>逻辑操作符</strong>：<code translate="no">AND</code>,<code translate="no">OR</code>, 和<code translate="no">NOT</code> 将多个条件组合成复杂的表达式。</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">举例说明：按颜色筛选</h3><p>要在标量字段<code translate="no">color</code> 中查找具有三原色（红色、绿色或蓝色）的实体，请使用以下过滤表达式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">示例过滤 JSON 字段</h3><p>Milvus 允许在 JSON 字段中引用键。例如，如果您有一个带有键<code translate="no">price</code> 和<code translate="no">model</code> 的 JSON 字段<code translate="no">product</code> ，并希望查找具有特定模型且价格低于 1,850 的产品，请使用此过滤表达式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">示例：过滤数组字段</h3><p>如果有一个数组字段<code translate="no">history_temperatures</code> ，其中包含自 2000 年以来各观测站报告的平均气温记录，要查找 2009 年（第 10 次记录）气温超过 23°C 的观测站，请使用此表达式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关这些基本操作符的更多信息，请参阅<a href="/docs/zh/basic-operators.md">基本操作符</a>。</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">过滤表达式模板<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>使用中日韩字符进行筛选时，由于字符集较大且编码不同，处理过程可能会更加复杂。这会导致性能变慢，尤其是使用<code translate="no">IN</code> 操作符时。</p>
<p>Milvus 引入了过滤表达式模板，以优化处理中日韩字符时的性能。通过将动态值从过滤器表达式中分离出来，查询引擎能更有效地处理参数插入。</p>
<h3 id="Example" class="common-anchor-header">示例</h3><p>要查找居住在 "北京"（北京）或 "上海"（上海）的 25 岁以上的个人，请使用以下模板表达式：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>为提高性能，可使用这种带参数的变体：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>这种方法可减少解析开销，提高查询速度。更多信息，请参阅<a href="/docs/zh/filtering-templating.md">过滤器模板</a>。</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">特定数据类型操作符<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 为特定数据类型（如 JSON、ARRAY 和 VARCHAR 字段）提供高级过滤操作符。</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">特定于 JSON 字段的操作符</h3><p>Milvus 为查询 JSON 字段提供高级操作符，可在复杂的 JSON 结构中进行精确过滤：</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>:检查字段中是否存在 JSON 表达式。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>:确保 JSON 表达式的所有元素都存在。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>:筛选 JSON 表达式中至少存在一个元素的实体。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关 JSON 操作符的更多详情，请参阅<a href="/docs/zh/json-operators.md">JSON 操作符</a>。</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">ARRAY 字段特定操作符</h3><p>Milvus 为数组字段提供了高级过滤操作符，如<code translate="no">ARRAY_CONTAINS</code>,<code translate="no">ARRAY_CONTAINS_ALL</code>,<code translate="no">ARRAY_CONTAINS_ANY</code>, 和<code translate="no">ARRAY_LENGTH</code> ，可对数组数据进行细粒度控制：</p>
<p><code translate="no">ARRAY_CONTAINS</code>:过滤包含特定元素的实体。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>:过滤包含列表中所有元素的实体。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>:过滤包含列表中任何元素的实体。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>:根据数组的长度进行过滤。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关数组操作符的更多详情，请参阅<a href="/docs/zh/array-operators.md">ARRAY Operators</a>。</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">VARCHAR 字段专用操作符</h3><p>Milvus 提供专门的操作符，用于对 VARCHAR 字段进行基于文本的精确搜索：</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> 操作符</h4><p><code translate="no">TEXT_MATCH</code> 操作符允许根据特定查询词精确检索文档。它对于结合标量过滤器和向量相似性搜索的过滤搜索特别有用。与语义搜索不同，文本匹配侧重于精确的术语出现。</p>
<p>Milvus 使用 Tantivy 支持倒排索引和基于术语的文本搜索。过程包括</p>
<ol>
<li><p><strong>分析器</strong>：标记化和处理输入文本。</p></li>
<li><p><strong>索引</strong>：创建将唯一标记映射到文档的倒排索引。</p></li>
</ol>
<p>有关详细信息，请参阅<a href="/docs/zh/keyword-match.md">文本匹配</a>。</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> 操作符<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p><strong>PHRASE_MATCH</strong>操作符可根据精确的短语匹配结果精确检索文档，同时考虑查询词的顺序和相邻关系。</p>
<p>更多详情，请参阅<a href="/docs/zh/phrase-match.md">短语匹配</a>。</p>
<h2 id="Random-sampling-operator--Milvus-26x" class="common-anchor-header">随机抽样操作符<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Random-sampling-operator--Milvus-26x" class="anchor-icon" translate="no">
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
    </button></h2><p>随机抽样允许您从段级别的 Collections 中提取数据样本子集，因此非常适合探索和处理海量数据集。该功能对于这些使用案例非常有价值：</p>
<ul>
<li><p><strong>快速数据预览</strong>：它能以最少的资源占用返回具有代表性的样本数据，让你快速掌握大型向量数据集的整体结构和内容。</p></li>
<li><p><strong>组合筛选</strong>：在执行多标准筛选（如按属性选择文档）时，将其与随机抽样相结合，可快速对筛选结果进行统计汇总和预览。</p></li>
<li><p><strong>节省大规模数据处理的资源</strong>：对于超大型数据集来说，汇总和分析全部数据可能会耗费大量资源。随机抽样可以减少处理的数据量，从而降低处理负荷。</p></li>
</ul>
<p>使用以下语法进行随机抽样：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = RANDOM_SAMPLE(<span class="hljs-built_in">float</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">float</code><strong>:</strong>取样因子，取样范围为 (0，1)，不包括边界。例如，<code translate="no">RANDOM_SAMPLE(0.001)</code> 选择约 0.1% 的结果。</li>
</ul>
<div class="alert note">
<p><code translate="no">RANDOM_SAMPLE</code> 表达式不区分大小写。您可以使用<code translate="no">RANDOM_SAMPLE</code> 或<code translate="no">random_sample</code> 。</p>
</div>
<h3 id="Combine-with-other-filters" class="common-anchor-header">与其他筛选器结合使用</h3><p>随机抽样操作符必须与其他过滤表达式结合使用，逻辑表达式为<code translate="no">AND</code> 。例如</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;color = &#x27;red&#x27; and RANDOM_SAMPLE(0.001)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在这里，Milvus 首先应用条件<code translate="no">color = 'red'</code> ，然后对结果集执行随机抽样。</p>
<h3 id="Example-Random-sampling-without-an-additional-filter" class="common-anchor-header">示例无附加过滤器的随机抽样</h3><p>在这个示例中，查询从指定 Collections 的全部数据中随机抽样一个子集（约 1%）：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>

result = MilvusClient.query(
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, 
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Combined-filtering-with-random-sampling" class="common-anchor-header">示例结合过滤和随机取样</h3><p>在本例中，查询首先根据特定属性过滤文档（在本例中，过滤<code translate="no">color</code> 等于<code translate="no">'red'</code> 的文档）。过滤后，应用随机抽样操作符返回大约 0.1% 的过滤结果：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;color = &#x27;red&#x27; and RANDOM_SAMPLE(0.001)&quot;</span>

result = MilvusClient.query(
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, 
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
