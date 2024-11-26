---
id: keyword-match.md
summary: >-
  Milvus
  中的关键词匹配功能可根据特定术语进行精确的文档检索。该功能主要用于满足特定条件的过滤搜索，并可结合标量过滤来细化查询结果，允许在符合标量标准的向量内进行相似性搜索。
title: 关键词匹配
---
<h1 id="Keyword-Match​" class="common-anchor-header">关键词匹配<button data-href="#Keyword-Match​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 的关键词匹配功能可根据特定术语精确检索文档。该功能主要用于满足特定条件的过滤搜索，并可结合标量过滤来细化查询结果，允许在符合标量标准的向量内进行相似性搜索。</p>
<div class="alert note">
<p>关键词匹配侧重于查找查询词的精确出现，而不对匹配文档的相关性进行评分。如果您想根据查询词的语义和重要性检索最相关的文档，我们建议您使用<a href="/docs/zh/full-text-search.md">全文检索</a>。</p>
</div>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 整合了<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>来支持其底层的倒排索引和关键词搜索。对于每个文本条目，Milvus 都会按照以下程序建立索引。</p>
<ol>
<li><p><a href="/docs/zh/analyzer-overview.md">分析器</a>：分析器将输入文本标记化为单个词或标记，然后根据需要应用过滤器。这样，Milvus 就能根据这些标记建立索引。</p></li>
<li><p><a href="/docs/zh/index-scalar-fields.md">编制索引</a>：文本分析完成后，Milvus 会创建一个倒排索引，将每个独特的标记映射到包含该标记的文档。</p></li>
</ol>
<p>当用户执行关键字匹配时，倒排索引可用于快速检索包含关键字的所有文档。这比逐一扫描每个文档要快得多。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/keyword-match.png" alt="Keyword Match" class="doc-image" id="keyword-match" />
   </span> <span class="img-wrapper"> <span>关键词匹配</span> </span></p>
<h2 id="Enable-keyword-match" class="common-anchor-header">启用关键字匹配<button data-href="#Enable-keyword-match" class="anchor-icon" translate="no">
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
    </button></h2><p>关键词匹配适用于<code translate="no">VARCHAR</code> 字段类型，它在 milvus 中本质上是字符串数据类型。要启用关键字匹配，请将<code translate="no">enable_analyzer</code> 和<code translate="no">enable_match</code> 都设置为<code translate="no">True</code> ，然后在定义 Collections Schema 时选择性地配置文本分析的分析器。</p>
<h3 id="Set-enableanalyzer-and-enablematch​" class="common-anchor-header">设置<code translate="no">enable_analyzer</code> 和<code translate="no">enable_match</code></h3><p>要启用特定<code translate="no">VARCHAR</code> 字段的关键字匹配，可在定义字段 Schema 时将<code translate="no">enable_analyzer</code> 和<code translate="no">enable_match</code> 参数都设为<code translate="no">True</code> 。这将指示 Milvus 对文本进行标记化处理，并为指定字段创建反向索引，从而实现快速、高效的关键字匹配。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to enable text analysis for this field​</span>
    enable_match=<span class="hljs-literal">True</span> <span class="hljs-comment"># Whether to enable text match​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer​" class="common-anchor-header">可选：配置分析器</h3><p>关键词匹配的性能和准确性取决于所选的分析器。不同的分析器适用于不同的语言和文本结构，因此选择正确的分析器会极大地影响特定用例的搜索结果。</p>
<p>默认情况下，Milvus 使用<code translate="no">standard</code> 分析器，该分析器根据空白和标点符号对文本进行标记，删除长度超过 40 个字符的标记，并将文本转换为小写。应用此默认设置无需额外参数。更多信息，请参阅<a href="/docs/zh/standard-analyzer.md">标准</a>。</p>
<p>如果需要不同的分析器，可以使用<code translate="no">analyzer_params</code> 参数进行配置。例如，应用<code translate="no">english</code> 分析器处理英文文本。</p>
<pre><code translate="no" class="language-python">analyzer_params={​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">200</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Milvus 还提供适合不同语言和场景的其他各种分析器。更多详情，请参阅<a href="/docs/zh/analyzer-overview.md">概述</a>。</p>
<h2 id="Use-keyword-match" class="common-anchor-header">使用关键词匹配<button data-href="#Use-keyword-match" class="anchor-icon" translate="no">
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
    </button></h2><p>为 Collections Schema 中的 VARCHAR 字段启用关键字匹配后，就可以使用<code translate="no">TEXT_MATCH</code> 表达式执行关键字匹配。</p>
<h3 id="TEXTMATCH-expression-syntax​" class="common-anchor-header">TEXT_MATCH 表达式语法</h3><p><code translate="no">TEXT_MATCH</code> 表达式用于指定要搜索的字段和关键字。其语法如下。</p>
<pre><code translate="no" class="language-python">TEXT_MATCH(field_name, text)​

<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code>:要搜索的 VARCHAR 字段的名称。</p></li>
<li><p><code translate="no">text</code>:要搜索的关键字。根据语言和配置的分析器，多个关键词可以用空格或其他适当的分隔符分隔。</p></li>
</ul>
<p>默认情况下，<code translate="no">TEXT_MATCH</code> 使用<strong>OR</strong>匹配逻辑，即返回包含任何指定关键词的文档。例如，要在<code translate="no">text</code> 字段中搜索包含关键字<code translate="no">machine</code> 或<code translate="no">deep</code> 的文档，请使用以下表达式。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>您还可以使用逻辑操作符组合多个<code translate="no">TEXT_MATCH</code> 表达式来执行<strong>AND</strong>匹配。例如，要在<code translate="no">text</code> 字段中搜索同时包含<code translate="no">machine</code> 和<code translate="no">deep</code> 的文档，请使用以下表达式。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-keyword-match​" class="common-anchor-header">使用关键字匹配搜索</h3><p>关键词匹配可与向量相似性搜索结合使用，以缩小搜索范围并提高搜索性能。通过在向量相似性搜索前使用关键字匹配过滤 Collections，可以减少需要搜索的文档数量，从而加快查询速度。</p>
<p>在本例中，<code translate="no">filter</code> 表达式将搜索结果过滤为只包含与指定关键字<code translate="no">keyword1</code> 或<code translate="no">keyword2</code> 匹配的文档。然后在此过滤后的文档子集中执行向量相似性搜索。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with `keyword1` or `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>​
​
<span class="hljs-comment"># Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field​</span>
result = MilvusClient.search(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>, <span class="hljs-comment"># Your collection name​</span>
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment"># Vector field name​</span>
    data=[query_vector], <span class="hljs-comment"># Query vector​</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    limit=<span class="hljs-number">10</span>, <span class="hljs-comment"># Max. number of results to return​</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment"># Fields to return​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Query-with-keyword-match​" class="common-anchor-header">使用关键字匹配进行查询</h3><p>关键词匹配也可用于查询操作中的标量过滤。通过在<code translate="no">query()</code> 方法的<code translate="no">expr</code> 参数中指定<code translate="no">TEXT_MATCH</code> 表达式，可以检索与给定关键词匹配的文档。</p>
<p>下面的示例检索了<code translate="no">text</code> 字段同时包含关键字<code translate="no">keyword1</code> 和<code translate="no">keyword2</code> 的文档。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with both `keyword1` and `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>​
​
result = MilvusClient.query(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, ​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]​
)​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Considerations" class="common-anchor-header">注意事项<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>为字段启用关键字匹配会触发倒排索引的创建，从而消耗存储资源。在决定是否启用此功能时，请考虑对存储的影响，因为它根据文本大小、唯一标记和所使用的分析器而有所不同。</p></li>
<li><p>在 Schema 中定义分析器后，其设置将永久适用于该 Collections。如果您认为不同的分析器更适合您的需要，您可以考虑放弃现有的 Collections，然后使用所需的分析器配置创建一个新的 Collections。</p></li>
</ul>
