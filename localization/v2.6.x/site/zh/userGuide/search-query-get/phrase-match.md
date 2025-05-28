---
id: phrase-match.md
title: 短语匹配
summary: >-
  短语匹配可让您搜索包含精确短语查询词的文档。默认情况下，单词必须以相同的顺序出现，并且彼此直接相邻。例如，查询 "机器人机器学习
  "会匹配"......典型的机器人机器学习模型...... "这样的文本，其中 "机器人"、"机器 "和 "学习 "依次出现，中间没有其他词。
---
<h1 id="Phrase-Match" class="common-anchor-header">短语匹配<button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>短语匹配可让您搜索包含精确短语查询词的文档。默认情况下，单词必须以相同的顺序出现，并且彼此直接相邻。例如，<strong>"机器人机器学习 "</strong>的查询会匹配"<em>...典型的机器人机器学习模型... "</em>这样的文本，其中<strong>"机器人"、</strong> <strong>"</strong> <strong>机器 "</strong>和<strong>"学习 "</strong>依次出现，中间没有其他词。</p>
<p>然而，在现实世界中，严格的短语匹配可能过于死板。您可能希望匹配的文本是<em>"......机器人技术中广泛采用的机器学习模型.</em>....."。在这种情况下，相同的关键词会出现，但不会并排出现，也不会按照原来的顺序排列。为了处理这种情况，短语匹配支持一个<code translate="no">slop</code> 参数，从而增加了灵活性。<code translate="no">slop</code> 的值定义了短语中的词语之间允许多少次位置移动。例如，当<code translate="no">slop</code> 为 1 时，<strong>"机器学习 "</strong>查询可以匹配<em>"......机器深度学习...... "</em>这样的文本，其中一个单词（<strong>"deep"）</strong>分隔了原始术语。</p>
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
    </button></h2><p>短语匹配由<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>搜索引擎库提供支持，通过分析文档中单词的位置信息来实现。下图说明了这一过程：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" />
   </span> <span class="img-wrapper"> <span>短语匹配工作流程</span> </span></p>
<ol>
<li><p><strong>文档标记化</strong>：将文档插入 Milvus 时，使用分析器将文本分割成标记（单个词或术语），并记录每个标记的位置信息。例如，<strong>doc_1</strong>被标记为<strong>["machine" (pos=0), "learning" (pos=1), "boosts" (pos=2), "efficiency" (pos=3)]</strong>。有关分析器的更多信息，请参阅<a href="/docs/zh/analyzer-overview.md">分析器概述</a>。</p></li>
<li><p><strong>反向索引创建</strong>：Milvus 建立一个倒排索引，将每个标记映射到出现该标记的文档以及标记在这些文档中的位置。</p></li>
<li><p><strong>短语匹配</strong>：当执行短语查询时，Milvus 会查找倒排索引中的每个标记，并检查它们的位置，以确定它们是否以正确的顺序和相邻关系出现。<code translate="no">slop</code> 参数控制匹配标记之间允许的最大位置数：</p>
<ul>
<li><p><strong>slop = 0</strong>表示词组必须<strong>以完全相同的顺序</strong>出现<strong>，并且紧邻</strong>（即中间没有多余的字）。</p>
<ul>
<li>在示例中，只有<strong>doc_1</strong>（<strong>"machine "</strong>在<strong>位置 0</strong>，<strong>"learning "</strong>在<strong>位置 1</strong>）完全匹配。</li>
</ul></li>
<li><p><strong>slop = 2</strong>允许匹配词之间最多有两个位置的灵活性或重新排列。</p>
<ul>
<li><p>这就允许颠倒顺序（<strong>"学习机器"）</strong>或在词组之间留出小间隙。</p></li>
<li><p>因此，<strong>doc_</strong> <strong>1</strong>、<strong>doc_2</strong>（<strong>"learning "</strong>在<strong>位置=0</strong>，<strong>"machine "</strong>在<strong>位置=1</strong>）和<strong>doc_3</strong>（<strong>"learning "</strong>在<strong>位置=1</strong>，<strong>"machine</strong> <strong>"</strong>在<strong>位置=2</strong>）全部匹配。</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">启用短语匹配<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>短语匹配适用于<code translate="no">VARCHAR</code> 字段类型，即 Milvus 中的字符串数据类型。要启用短语匹配，请配置您的 Collections Schema，将<code translate="no">enable_analyzer</code> 和<code translate="no">enable_match</code> 参数都设置为<code translate="no">True</code> ，类似于<a href="/docs/zh/keyword-match.md">文本匹配</a>。</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">设置<code translate="no">enable_analyzer</code> 和<code translate="no">enable_match</code></h3><p>要启用特定<code translate="no">VARCHAR</code> 字段的短语匹配，可在定义字段 Schema 时将<code translate="no">enable_analyzer</code> 和<code translate="no">enable_match</code> 参数设置为<code translate="no">True</code> 。该配置指示 Milvus 对文本进行标记化，并创建一个具有位置信息的反向索引，以实现高效的短语匹配。</p>
<p>下面是启用短语匹配的 Schema 定义示例：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a schema for a new collection</span>
schema = MilvusClient.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>
)
<span class="hljs-comment"># Add a VARCHAR field configured for phrase matching</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR (string)</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">可选：配置分析器</h3><p>短语匹配的准确性在很大程度上取决于用于标记文本数据的分析器。不同的分析器适用于不同的语言和文本格式，会影响标记化和定位的准确性。根据具体使用情况选择合适的分析器，可以优化短语匹配结果。</p>
<p>默认情况下，Milvus 使用标准分析器，根据空白和标点符号对文本进行标记化，删除长度超过 40 个字符的标记，并将文本转换为小写。默认用法不需要额外参数。详情请参阅<a href="/docs/zh/standard-analyzer.md">标准分析器</a>。</p>
<p>如果您的应用程序需要特定的分析器，请使用<code translate="no">analyzer_params</code> 参数进行配置。例如，以下是如何配置<code translate="no">english</code> 分析器，用于英文文本中的短语匹配：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 支持针对不同语言和用例定制的多种分析器。有关详细信息，请参阅<a href="/docs/zh/analyzer-overview.md">分析器概述</a>。</p>
<h2 id="Use-phrase-match" class="common-anchor-header">使用短语匹配<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>为 Collections Schema 中的<code translate="no">VARCHAR</code> 字段启用匹配后，就可以使用<code translate="no">PHRASE_MATCH</code> 表达式执行短语匹配。</p>
<div class="alert note">
<p><code translate="no">PHRASE_MATCH</code> 表达式不区分大小写。可以使用<code translate="no">PHRASE_MATCH</code> 或<code translate="no">phrase_match</code> 。</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">PHRASE_MATCH 表达式语法</h3><p>搜索时，使用<code translate="no">PHRASE_MATCH</code> 表达式指定字段、短语和可选的灵活性 (<code translate="no">slop</code>)。语法如下</p>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong>执行短语匹配的<code translate="no">VARCHAR</code> 字段名称。</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong>要搜索的确切短语。</p></li>
<li><p><code translate="no">slop</code> (可选）<strong>：</strong>一个整数，指定匹配标记中允许的最大位置数。</p>
<ul>
<li><p><code translate="no">0</code> (默认）：只匹配精确短语。例如<strong>机器学习 "</strong>过滤器将精确匹配<strong>"</strong> <strong>machine learning"</strong>，但不匹配<strong>"machine boosts learning "</strong>或<strong>"learning machine"。</strong></p></li>
<li><p><code translate="no">1</code>:允许细微变化，例如多一个词或位置上的细微变化。例如<strong>机器学习 "</strong>过滤器将匹配<strong>"machine boosts learning"</strong>（<strong>"machine "</strong>和<strong>"learning "</strong>之间有一个标记<strong>）</strong>，但不匹配<strong>"learning machine"</strong>（术语颠倒）。</p></li>
<li><p><code translate="no">2</code>:允许更多的灵活性，包括术语顺序颠倒或最多在两个词组之间。例如<strong>机器学习 "</strong>过滤器将匹配<strong>"学习机器"</strong>（词序颠倒）或<strong>"机器快速促进学习"</strong>（<strong>"机器 "</strong>和<strong>"学习 "</strong>之间有两个词组<strong>）</strong>。</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">数据集示例</h3><p>假设您有一个名为<strong>tech_articles 的</strong>Collections，其中包含以下五个实体：</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"机器学习提高了大规模数据分析的效率</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"学习基于机器的方法对现代人工智能的发展至关重要" 3</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"深度学习机器架构优化了计算负荷"</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>"机器迅速提高持续学习的模型性能"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"学习先进的机器算法，扩展人工智能能力</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">短语匹配查询</h3><p>使用<code translate="no">query()</code> 方法时，<strong>PHRASE_MATCH 充当</strong>标量过滤器。只有包含指定短语的文档才会返回（取决于允许的斜率）。</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">示例：slop = 0（精确匹配）</h4><p>此示例返回包含精确短语<strong>"machine learning "</strong>的文档，中间不包含任何额外标记。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>预期匹配结果</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"机器学习提高了大规模数据分析的效率</p></td>
   </tr>
</table>
<p>只有文档 1 按指定顺序包含精确短语<strong>"machine learning"</strong>，且没有额外标记。</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">使用短语匹配进行搜索</h3><p>在搜索操作中，<strong>PHRASE_MATCH</strong>用于在应用向量相似性排序之前过滤文档。这种两步法首先通过文本匹配缩小候选集的范围，然后根据向量嵌入重新对这些候选集进行排序。</p>
<h4 id="Example-slop--1" class="common-anchor-header">示例：斜率 = 1</h4><p>这里，我们允许斜率为 1。该过滤器适用于包含<strong>"学习机 "</strong>短语的文档，并略有灵活性。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter_slop1 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

result_slop1 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,
    data=[query_vector],
    <span class="hljs-built_in">filter</span>=filter_slop1,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>匹配结果</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"学习基于机器的方法对现代人工智能的进步至关重要"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"深度学习机器架构优化了计算负荷" 4</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"学习先进的机器算法可扩展人工智能能力" 6</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">示例：斜率 = 2</h4><p>此示例允许 2 个斜率，即在<strong>"机器 "</strong>和<strong>"学习 "</strong>之间允许最多两个额外的词块（或反义词）<strong>。</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter_slop2 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop2,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>匹配结果</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"机器学习提高了大规模数据分析的效率</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"深度学习机器架构优化了计算负荷"</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">示例：斜率 = 3</h4><p>在本例中，斜率为 3 提供了更大的灵活性。该过滤器搜索<strong>"机器学习"</strong>，词与词之间最多允许有三个标记位置。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter_slop3 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop3,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>匹配结果</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"机器学习提高了大规模数据分析的效率</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"学习基于机器的方法对现代人工智能的进步至关重要"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"深度学习机器架构优化了计算负荷" 4</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"学习先进的机器算法可扩展人工智能能力" 6</p></td>
   </tr>
</table>
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
<li><p>为字段启用短语匹配会触发倒排索引的创建，从而消耗存储资源。在决定是否启用此功能时，请考虑对存储的影响，因为它根据文本大小、唯一标记和所使用的分析器而有所不同。</p></li>
<li><p>在 Schema 中定义分析器后，其设置将永久适用于该 Collections。如果您认为不同的分析器更适合您的需要，可以考虑删除现有的 Collections，然后使用所需的分析器配置创建一个新的 Collections。</p></li>
<li><p>短语匹配性能取决于文本标记化的方式。在将分析器应用到整个 Collections 之前，请使用<code translate="no">run_analyzer</code> 方法查看标记化输出。有关详细信息，请参阅<a href="/docs/zh/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">分析器概述</a>。</p></li>
<li><p><code translate="no">filter</code> 表达式中的转义规则：</p>
<ul>
<li><p>表达式中用双引号或单引号括起来的字符被解释为字符串常量。如果字符串常量包含转义字符，则必须使用转义序列来表示转义字符。例如，用<code translate="no">\\</code> 表示<code translate="no">\</code> ，用<code translate="no">\\t</code> 表示制表符<code translate="no">\t</code> ，用<code translate="no">\\n</code> 表示换行符。</p></li>
<li><p>如果字符串常量由单引号括起来，常量内的单引号应表示为<code translate="no">\\'</code> ，而双引号可表示为<code translate="no">&quot;</code> 或<code translate="no">\\&quot;</code> 。 示例：<code translate="no">'It\\'s milvus'</code> 。</p></li>
<li><p>如果字符串常量由双引号括起来，常量中的双引号应表示为<code translate="no">\\&quot;</code> ，而单引号可表示为<code translate="no">'</code> 或<code translate="no">\\'</code> 。 示例：<code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code> 。</p></li>
</ul></li>
</ul>
