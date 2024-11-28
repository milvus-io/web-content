---
id: analyzer-overview.md
title: 分析器概述
summary: >-
  在文本处理中，分析器是将原始文本转换为结构化可搜索格式的关键组件。每个分析器通常由两个核心部件组成：标记器和过滤器。它们共同将输入文本转换为标记，完善这些标记，并为高效索引和检索做好准备。
---
<h1 id="Analyzer-Overview​" class="common-anchor-header">分析器概述<button data-href="#Analyzer-Overview​" class="anchor-icon" translate="no">
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
    </button></h1><p>在文本处理中，<strong>分析器</strong>是将原始文本转换为结构化可搜索格式的关键组件。每个分析器通常由两个核心部件组成：<strong>标记器</strong>和<strong>过滤器</strong>。它们共同将输入文本转换为标记，完善这些标记，并为高效索引和检索做好准备。</p>
<p>在 Milvus 中，创建 Collections 时，将<code translate="no">VARCHAR</code> 字段添加到 Collections Schema 时，会对分析器进行配置。分析器生成的标记可用于建立文本匹配索引，或转换为稀疏嵌入以进行全文检索。更多信息，请参阅<a href="/docs/zh/keyword-match.md">文本匹配</a>或<a href="/docs/zh/full-text-search.md">全文搜索</a>。</p>
<div class="alert note">
<p>使用分析器可能会影响性能。</p>
<ul>
<li><p><strong>全文搜索：</strong>对于全文搜索，数据节点和<strong>查询节点</strong>通道消耗数据的速度更慢，因为它们必须等待标记化完成。因此，新输入的数据需要更长时间才能用于搜索。</p></li>
<li><p><strong>文本匹配：</strong>对于文本匹配，索引创建速度也较慢，因为标记化需要在建立索引之前完成。</p></li>
</ul>
</div>
<h2 id="Anatomy-of-an-analyzer​" class="common-anchor-header">分析器剖析<button data-href="#Anatomy-of-an-analyzer​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 的分析器由一个<strong>标记化器</strong>和<strong>零个或多个</strong>过滤器组成。</p>
<ul>
<li><p><strong>标记化器</strong>：标记器将输入文本分解为称为标记的离散单元。根据标记符类型的不同，这些标记符可以是单词或短语。</p></li>
<li><p><strong>过滤器</strong>：可以对标记符进行过滤，以进一步细化标记符，例如，将标记符变成小写或删除常用词。</p></li>
</ul>
<p>下面的工作流程显示了分析器是如何处理文本的。</p>
<p><img translate="no" src="/docs/v2.5.x/assets/analyzer-overview.png" alt="analyzer-overview" width="400"/></p>
<h2 id="Analyzer-types​" class="common-anchor-header">分析器类型<button data-href="#Analyzer-types​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供两种类型的分析器，以满足不同的文本处理需求。</p>
<ul>
<li><p><strong>内置分析器</strong>：这些是预定义配置，只需最少的设置即可完成常见的文本处理任务。内置分析器不需要复杂的配置，是通用搜索的理想选择。</p></li>
<li><p><strong>自定义分析器</strong>：对于更高级的需求，自定义分析器允许你通过指定标记器和零个或多个过滤器来定义自己的配置。这种自定义级别对于需要精确控制文本处理的特殊用例尤其有用。</p></li>
</ul>
<div class="alert note">
<p>如果在创建 Collections 时省略了分析器配置，Milvus 默认使用<code translate="no">standard</code> 分析器进行所有文本处理。详情请参阅 "<a href="/docs/zh/standard-analyzer.md">标准</a>"。</p>
</div>
<h3 id="Built-in-analyzer​" class="common-anchor-header">内置分析器</h3><p>Milvus 中的内置分析器预先配置了特定的标记符号化器和过滤器，使您可以立即使用它们，而无需自己定义这些组件。每个内置分析器都是一个模板，包括预设的标记化器和过滤器，以及用于自定义的可选参数。</p>
<p>例如，要使用<code translate="no">standard</code> 内置分析器，只需将其名称<code translate="no">standard</code> 指定为<code translate="no">type</code> ，并可选择包含该分析器类型的特定额外配置，如<code translate="no">stop_words</code> 。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Uses the standard built-in analyzer​</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment"># Defines a list of common words (stop words) to exclude from tokenization​</span>
}​

<button class="copy-code-btn"></button></code></pre>
<p>上述<code translate="no">standard</code> 内置分析仪的配置等同于使用以下参数设置自定义分析仪，其中<code translate="no">tokenizer</code> 和<code translate="no">filter</code> 选项是为实现相同功能而明确定义的：</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]​
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre>
<p>Milvus 提供以下内置分析器，每个分析器都可以通过指定其名称作为<code translate="no">type</code> 参数直接使用。</p>
<ul>
<li><p><code translate="no">standard</code>:适用于通用文本处理，应用标准标记化和小写过滤。</p></li>
<li><p><code translate="no">english</code>:针对英语文本进行了优化，支持英语停止词。</p></li>
<li><p><code translate="no">chinese</code>:专门用于处理中文文本，包括针对中文语言结构的标记化。</p></li>
</ul>
<h3 id="Custom-analyzer​" class="common-anchor-header">自定义分析器</h3><p>对于更高级的文本处理，Milvus 中的自定义分析器允许您通过指定<strong>标记化器</strong>和过滤器来构建定制的文本处理管道。这种设置非常适合需要精确控制的特殊用例。</p>
<h4 id="Tokenizer​" class="common-anchor-header">标记器</h4><p><strong>标记化器</strong>是自定义分析器的<strong>必备</strong>组件，它通过将输入文本分解为离散单元或<strong>标记来</strong>启动分析器管道。标记化遵循特定的规则，例如根据标记化器的类型用空白或标点符号分割。这一过程可以更精确、更独立地处理每个单词或短语。</p>
<p>例如，标记化器会将文本<code translate="no">&quot;Vector Database Built for Scale&quot;</code> 转换为单独的标记。</p>
<pre><code translate="no" class="language-Plain Text">[<span class="hljs-string">&quot;Vector&quot;</span>, <span class="hljs-string">&quot;Database&quot;</span>, <span class="hljs-string">&quot;Built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;Scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p><strong>指定标记符的示例</strong>。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filter​" class="common-anchor-header">过滤器</h4><p><strong>过滤器</strong>是<strong>可选</strong>组件，用于处理标记符生成的标记，根据需要对其进行转换或细化。例如，在对标记化术语<code translate="no">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]</code> 应用<code translate="no">lowercase</code> 过滤器后，结果可能是。</p>
<pre><code translate="no" class="language-SQL">[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p>自定义分析器中的过滤器可以是<strong>内置的</strong>，也可以是<strong>自定义的</strong>，具体取决于配置需求。</p>
<ul>
<li><p><strong>内置过滤器</strong>：由 Milvus 预先配置，只需最少的设置。您只需指定过滤器的名称，就能立即使用这些过滤器。以下是可直接使用的内置过滤器。</p>
<ul>
<li><p><code translate="no">lowercase</code>:将文本转换为小写，确保不区分大小写进行匹配。有关详情，请参阅<a href="/docs/zh/lowercase-filter.md">小写</a>。</p></li>
<li><p><code translate="no">asciifolding</code>:将非 ASCII 字符转换为 ASCII 对应字符，简化多语言文本处理。有关详情，请参阅<a href="/docs/zh/ascii-folding-filter.md">ASCII 折叠</a>。</p></li>
<li><p><code translate="no">alphanumonly</code>:只保留字母数字字符，删除其他字符。有关详情，请参阅<a href="/docs/zh/alphanumonly-filter.md">Alphanumonly</a>。</p></li>
<li><p><code translate="no">cnalphanumonly</code>:删除包含除汉字、英文字母或数字以外的任何字符的标记。有关详情，请参阅<a href="/docs/zh/cnalphanumonly-filter.md">Cnalphanumonly</a>。</p></li>
<li><p><code translate="no">cncharonly</code>:删除包含任何非汉字的标记。详情请参阅<a href="/docs/zh/cncharonly-filter.md">Cncharonly</a>。</p></li>
</ul>
<p><strong>使用内置过滤器的示例。</strong></p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment"># Optional: Built-in filter that converts text to lowercase​</span>
}​
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>自定义过滤器</strong>：自定义过滤器允许进行专门配置。您可以通过选择有效的过滤器类型 (<code translate="no">filter.type</code>) 并为每种过滤器类型添加特定设置来定义自定义过滤器。支持自定义的过滤器类型示例。</p>
<ul>
<li><p><code translate="no">stop</code>:通过设置停止词列表（如<code translate="no">&quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]</code> ）删除指定的常用词。有关详情，请参阅<a href="/docs/zh/stop-filter.md">停止</a>。</p></li>
<li><p><code translate="no">length</code>:根据长度标准（如设置最大标记长度）排除标记。详情请参阅<a href="/docs/zh/length-filter.md">长度</a>。</p></li>
<li><p><code translate="no">stemmer</code>:将单词还原为词根形式，以便更灵活地进行匹配。详情请参阅<a href="/docs/zh/stemmer-filter.md">词根</a>。</p></li>
</ul>
<p><strong>配置自定义过滤器的示例。</strong></p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies &#x27;stop&#x27; as the filter type​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment"># Customizes stop words for this filter type​</span>
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Example-use​" class="common-anchor-header">使用示例<button data-href="#Example-use​" class="anchor-icon" translate="no">
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
    </button></h2><p>在此示例中，我们定义了一个 Collections 模式，其中包含一个用于嵌入的向量字段和两个用于文本处理功能的<code translate="no">VARCHAR</code> 字段。每个<code translate="no">VARCHAR</code> 字段都配置了自己的分析器设置，以处理不同的处理需求。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
<span class="hljs-comment"># Set up a Milvus client​</span>
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
)​
​
<span class="hljs-comment"># Create schema​</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
<span class="hljs-comment"># Add fields to schema​</span>
​
<span class="hljs-comment"># Use a built-in analyzer​</span>
analyzer_params_built_in = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title_en`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title_en&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_built_in,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Configure a custom analyzer​</span>
analyzer_params_custom = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-comment"># Built-in filter​</span>
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>​
        },​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]​
        }​
    ]​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_custom,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Add vector field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)​
<span class="hljs-comment"># Add primary field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
​
<span class="hljs-comment"># Set up index params for vector field​</span>
index_params = client.prepare_index_params()​
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>)​
​
<span class="hljs-comment"># Create collection with defined schema​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​
<button class="copy-code-btn"></button></code></pre>
<p></p>
