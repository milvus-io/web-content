---
id: filtering-templating.md
summary: >-
  在 Milvus 中，元素众多的复杂过滤表达式，尤其是涉及中日韩字符等非 ASCII 字符的过滤表达式，会严重影响查询性能。为了解决这个问题，Milvus
  引入了过滤表达式模板机制，旨在通过减少解析复杂表达式所花费的时间来提高效率。本页介绍了在搜索、查询和删除操作中使用过滤表达式模板的方法。
title: 过滤模板
---
<h1 id="Filter-Templating​" class="common-anchor-header">过滤器模板<button data-href="#Filter-Templating​" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，包含大量元素的复杂过滤表达式，尤其是那些涉及非 ASCII 字符（如中日韩字符）的表达式，会严重影响查询性能。为了解决这个问题，Milvus 引入了过滤表达式模板机制，旨在通过减少解析复杂表达式所花费的时间来提高效率。本页介绍了在搜索、查询和删除操作中使用过滤表达式模板的方法。</p>
<h2 id="Overview​" class="common-anchor-header">概述<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>过滤表达式模板化允许你创建带有占位符的过滤表达式，这些占位符可以在查询执行过程中动态替换为值。使用模板，可以避免直接在过滤器中嵌入大型数组或复杂表达式，从而减少解析时间并提高查询性能。</p>
<p>假设有一个涉及两个字段<code translate="no">age</code> 和<code translate="no">city</code> 的过滤器表达式，要查找所有年龄大于 25 岁且居住在 "北京"（北京）或 "上海"（上海）的人。您可以使用模板来代替直接在筛选表达式中嵌入值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>​
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}​

<button class="copy-code-btn"></button></code></pre>
<p>在这里，<code translate="no">{age}</code> 和<code translate="no">{city}</code> 是占位符，在执行查询时将被替换为<code translate="no">filter_params</code> 中的实际值。</p>
<p>在 Milvus 中使用过滤表达式模板有几个主要优点。</p>
<ul>
<li><p><strong>减少解析时间</strong>：通过用占位符替换大型或复杂的过滤器表达式，系统可以减少解析和处理过滤器的时间。</p></li>
<li><p><strong>提高<strong>查询</strong>性能</strong>：解析开销减少后，查询性能就会提高，从而获得更高的 QPS 和更快的响应时间。</p></li>
<li><p><strong>可扩展性</strong>：随着数据集的增长和过滤器表达式的复杂化，模板化可确保性能保持高效和可扩展。</p></li>
</ul>
<h2 id="Search-Operations​" class="common-anchor-header">搜索操作符<button data-href="#Search-Operations​" class="anchor-icon" translate="no">
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
    </button></h2><p>对于 Milvus 中的搜索操作，<code translate="no">filter</code> 表达式用于定义过滤条件，<code translate="no">filter_params</code> 参数用于指定占位符的值。<code translate="no">filter_params</code> 字典包含 Milvus 将用于代入过滤表达式的动态值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>​
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: 25, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}​
res = client.search(​
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,​
    vectors[:nq],​
    filter=<span class="hljs-built_in">expr</span>,​
    <span class="hljs-built_in">limit</span>=10,​
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],​
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;search_list&quot;</span>: 100}},​
    filter_params=filter_params,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>在本例中，Milvus 将在执行搜索时用<code translate="no">25</code> 动态替换<code translate="no">{age}</code> ，用<code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code> 动态替换<code translate="no">{city}</code> 。</p>
<h2 id="Query-Operations​" class="common-anchor-header">查询操作符<button data-href="#Query-Operations​" class="anchor-icon" translate="no">
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
    </button></h2><p>同样的模板机制也可应用于 Milvus 的查询操作符。在<code translate="no">query</code> 函数中，您可以定义过滤表达式，并使用<code translate="no">filter_params</code> 指定要替换的值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>​
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: 25, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}​
res = client.query(​
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,​
    filter=<span class="hljs-built_in">expr</span>,​
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],​
    filter_params=filter_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p>通过使用<code translate="no">filter_params</code> ，Milvus 可以有效处理值的动态插入，提高查询执行速度。</p>
<h2 id="Delete-Operations​" class="common-anchor-header">删除操作符<button data-href="#Delete-Operations​" class="anchor-icon" translate="no">
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
    </button></h2><p>在删除操作中也可以使用过滤表达式模板。与搜索和查询类似，<code translate="no">filter</code> 表达式定义条件，<code translate="no">filter_params</code> 为占位符提供动态值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>​
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: 25, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}​
res = client.delete(​
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,​
    filter=<span class="hljs-built_in">expr</span>,​
    filter_params=filter_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p>这种方法可以提高删除操作的性能，尤其是在处理复杂的过滤条件时。</p>
<h2 id="Conclusion​" class="common-anchor-header">结论<button data-href="#Conclusion​" class="anchor-icon" translate="no">
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
    </button></h2><p>过滤器表达式模板化是优化 Milvus 查询性能的重要工具。通过使用占位符和<code translate="no">filter_params</code> 字典，可以大大减少解析复杂过滤器表达式所花费的时间。这将加快查询执行速度，提高整体性能。</p>
