---
id: phrase-match.md
title: 短语匹配Compatible with Milvus 2.5.17+
summary: >-
  短语匹配可让您搜索包含查询词作为精确短语的文档。默认情况下，这些词必须按相同顺序出现，并且彼此紧邻。 例如，查询“robotics machine
  learning”将匹配诸如“…典型的机器人学机器学习模型…”之类的文本，其中“robotics”、“machine”和“learning”这三个词按顺序出现，且之间没有其他词语。
beta: Milvus 2.5.17+
---
<h1 id="Phrase-Match" class="common-anchor-header">短语匹配<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.17+</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>短语匹配可让您搜索包含查询词作为精确短语的文档。默认情况下，这些词必须按相同顺序出现，并且彼此紧邻。 例如，查询<strong>“robotics machine learning”</strong>将匹配诸如<em>“…典型的机器人学机器学习模型…”之类的</em>文本，其中<strong>“robotics”</strong>、<strong>“machine”</strong>和<strong>“learning”</strong>这三个词按顺序出现，且之间没有其他词语。</p>
<p>然而，在实际应用中，严格的短语匹配可能过于僵化。您可能希望匹配<em>诸如“…在机器人技术中广泛采用的机器学习模型…”</em>之类的文本<em>。</em>在此情况下，虽然包含相同的关键词，但它们并非紧邻或按原始顺序排列。为解决此问题，短语匹配支持<code translate="no">slop</code> 参数，从而增加了灵活性。<code translate="no">slop</code> 的值定义了短语中各术语之间允许的位置偏移量。例如，当<code translate="no">slop</code> 设为1时，查询<strong>“machine learning”</strong>可以匹配<em>“…machine deep learning…”</em>这样的文本，其中一个词（<strong>“deep”</strong>）将原始术语分隔开来。</p>
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
    </button></h2><p>短语匹配功能由<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>搜索引擎库提供支持，其工作原理是分析文档中单词的位置信息。下图说明了该过程：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" /> 
   <span>短语匹配工作流</span>
  
 </span></p>
<ol>
<li><p><strong>文档分词</strong>：将文档导入 Milvus 时，系统会使用分析器将文本拆分为词元（单个词或术语），并为每个词元记录位置信息。 例如，<strong>doc_1</strong>被分词为<strong>[“machine”（pos=0），“learning”（pos=1），“boosts”（pos=2），“efficiency”（pos=3）]</strong>。有关分析器的更多信息，请参阅《<a href="/docs/zh/v2.6.x/analyzer-overview.md">分析器概述》</a>。</p></li>
<li><p><strong>倒排索引的创建</strong>：Milvus 会构建一个倒排索引，将每个词元映射到其出现的文档以及该词元在这些文档中的位置。</p></li>
<li><p><strong>短语匹配</strong>：当执行短语查询时，Milvus 会在倒排索引中查找每个词元，并检查其位置，以确定它们是否以正确的顺序和邻近度出现。<code translate="no">slop</code> 参数控制匹配词元之间允许的最大位置差：</p>
<ul>
<li><p><strong>slop = 0</strong>表示词元必须<strong>按完全相同的顺序</strong>出现<strong>且紧邻</strong>（即中间没有多余的词）。</p>
<ul>
<li>在示例中，只有<strong>doc_1</strong>（<strong>“machine”</strong>位于<strong>pos=0</strong>，<strong>“learning”</strong>位于<strong>pos=1</strong>）完全匹配。</li>
</ul></li>
<li><p><strong>slop = 2</strong>允许匹配标记之间最多有两个位置的灵活性或重新排列。</p>
<ul>
<li><p>这允许顺序颠倒（<strong>“learning machine”</strong>）或令牌之间存在微小间隔。</p></li>
<li><p>因此，<strong>doc_1</strong>、<strong>doc_2</strong>（<strong>“learning”</strong>位于<strong>位置 0</strong> <strong>，“machine”</strong>位于<strong>位置 1</strong>）和<strong>doc_3</strong>（<strong>“learning”</strong>位于<strong>位置 1</strong> <strong>，“machine”</strong>位于<strong>位置 2</strong>）均匹配。</p></li>
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
    </button></h2><p>短语匹配适用于<code translate="no">VARCHAR</code> 字段类型，即Milvus中的字符串数据类型。要启用短语匹配，请配置您的Collection Schema，将<code translate="no">enable_analyzer</code> 和<code translate="no">enable_match</code> 参数均设置为<code translate="no">True</code> ，这与<a href="/docs/zh/v2.6.x/keyword-match.md">文本匹配</a>类似。</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">设置<code translate="no">enable_analyzer</code> 和<code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>若要为特定的<code translate="no">VARCHAR</code> 字段启用短语匹配，请在定义字段 Schema 时将<code translate="no">enable_analyzer</code> 和<code translate="no">enable_match</code> 两个参数均设置为<code translate="no">True</code> 。此配置会指示 Milvus 对文本进行分词，并创建包含高效短语匹配所需位置信息的倒排索引。</p>
<p>以下是一个启用短语匹配的示例Schema定义：</p>
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
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string in bytes</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">可选：配置分析器<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>短语匹配的准确性在很大程度上取决于用于对文本数据进行分词的分析器。不同的分析器适用于不同的语言和文本格式，从而影响分词结果和位置匹配的准确性。根据具体用例选择合适的分析器，将有助于优化短语匹配结果。</p>
<p>默认情况下，Milvus 使用标准分析器，该分析器基于空格和标点符号对文本进行分词，移除长度超过 40 个字符的词元，并将文本转换为小写。默认使用时无需额外参数。详情请参阅<a href="/docs/zh/v2.6.x/standard-analyzer.md">“标准分析器”</a>。</p>
<p>如果您的应用需要特定的分析器，请使用<code translate="no">analyzer_params</code> 参数进行配置。例如，以下是配置<code translate="no">english</code> 分析器以进行英语文本短语匹配的方法：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string in bytes</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 支持多种针对不同语言和用例量身定制的分析器。有关详细信息，请参阅《<a href="/docs/zh/v2.6.x/analyzer-overview.md">分析器概述</a>》。</p>
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
    </button></h2><p>在Collection架构中为<code translate="no">VARCHAR</code> 字段启用匹配功能后，即可使用<code translate="no">PHRASE_MATCH</code> 表达式执行短语匹配。</p>
<div class="alert note">
<p><code translate="no">PHRASE_MATCH</code> 表达式不区分大小写。您可以使用<code translate="no">PHRASE_MATCH</code> 或<code translate="no">phrase_match</code> 。</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">PHRASE_MATCH 表达式语法<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>使用<code translate="no">PHRASE_MATCH</code> 表达式在搜索时指定字段、短语以及可选的灵活性（<code translate="no">slop</code> ）。语法如下：</p>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong>用于执行短语匹配的<code translate="no">VARCHAR</code> 字段名称。</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong>要搜索的确切短语。</p></li>
<li><p><code translate="no">slop</code> (可选)<strong>：</strong>一个整数，指定匹配令牌中允许的最大位置数。</p>
<ul>
<li><p><code translate="no">0</code> (默认)：仅匹配完全相同的短语。示例：<strong>针对“machine</strong>learning”的过滤器将精确<strong>匹配“machine</strong>learning<strong>”，但不会匹配“machine boosts</strong> <strong>learning”或“learning machine”。</strong></p></li>
<li><p><code translate="no">1</code>: 允许轻微变体，例如多一个术语或位置的轻微变化。示例：针对<strong>“machine learning”</strong>的过滤器将匹配<strong>“machine boosts learning”</strong>（<strong>“machine”和</strong> <strong>“learning”</strong>之间有一个词素），但不会<strong>匹配“learning machine”</strong>（术语顺序颠倒）。</p></li>
<li><p><code translate="no">2</code>：允许更大的灵活性，包括词序颠倒或中间最多两个词元。示例：过滤条件<strong>“machine learning”</strong>将匹配<strong>“learning machine”</strong>（词序颠倒）<strong>或“machine quickly boosts learning”</strong>（<strong>“machine”</strong>和<strong>“learning”</strong>之间有两个词元）。</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">示例数据集<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>假设您有一个名为<strong>tech_articles</strong>的 Collection，其中包含以下五个实体：</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>“机器学习提高了大规模数据分析的效率”</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>“掌握基于机器的方法对现代人工智能的发展至关重要”</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>“深度学习架构可优化计算负载”</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>“机器能迅速提升模型性能，以支持持续学习”</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>“学习先进的机器算法可拓展人工智能能力”</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">短语匹配查询<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>在使用<code translate="no">query()</code> 方法时，<strong>PHRASE_MATCH</strong>充当标量过滤器。仅返回包含指定短语（在允许的容差范围内）的文档。</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">示例：slop = 0（精确匹配）</h4><p>此示例将返回包含精确<strong>短语“machine learning”</strong>且中间没有额外词元的文档。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>预期匹配结果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>“机器学习提高了大规模数据分析的效率”</p></td>
   </tr>
</table>
<p>只有文档 1 包含按指定顺序排列且没有额外词元的精确<strong>短语“machine learning”</strong>。</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">使用短语匹配进行搜索<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>在搜索操作中，<strong>PHRASE_MATCH</strong>用于在应用向量相似度排序之前对文档进行过滤。这种两步法首先通过文本匹配缩小候选集，然后基于向量 Embeddings 对这些候选结果进行重新排序。</p>
<h4 id="Example-slop--1" class="common-anchor-header">示例：slop = 1</h4><p>在此，我们允许 1 的容差值。该过滤器将应用于包含短语<strong>“learning machine”</strong>且具有轻微灵活性（容差）的文档。</p>
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
<p><strong>匹配结果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>“掌握基于机器的方法对现代人工智能的发展至关重要”</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>“深度学习机器架构可优化计算负载”</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>“掌握先进的机器算法可拓展人工智能的能力”</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">示例：容差 = 2</h4><p><strong>此</strong>示例允许“slop”值为2，这意味着在“machine”和“learning”这两个词之间最多允许出现两个额外的词素（或词序颠倒的词）<strong>。</strong></p>
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
<p><strong>匹配结果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>“机器学习提高了大规模数据分析的效率”</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>“深度学习机器架构可优化计算负载”</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">示例：slop = 3</h4><p>在此示例中，slop 值为 3 提供了更大的灵活性。该过滤器在搜索<strong>“机器学习”</strong>时，允许单词之间最多有三个词素的位置间隔。</p>
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
<p><strong>匹配结果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>“机器学习提升了大规模数据分析的效率”</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>“掌握基于机器的方法对现代人工智能的发展至关重要”</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>“深度学习架构可优化计算负载”</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>“学习先进的机器算法可拓展人工智能的能力”</p></td>
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
<li><p>为字段启用短语匹配功能会触发倒排索引的创建，这会消耗存储资源。在决定是否启用此功能时，请考虑其对存储空间的影响，因为该影响会因文本大小、唯一词元以及所使用的分析器而异。</p></li>
<li><p>在 Schema 中定义分析器后，其设置将对该 Collection 永久生效。若您认为其他分析器更符合需求，可考虑删除现有 Collection，并使用所需的分析器配置创建新 Collection。</p></li>
<li><p>短语匹配的性能取决于文本的分词方式。在将分析器应用于整个 Collection 之前，请使用 `<code translate="no">run_analyzer</code> ` 方法检查分词结果。有关更多信息，请参阅《<a href="/docs/zh/v2.6.x/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">分析器概述》</a>。</p></li>
<li><p><code translate="no">filter</code> 表达式中的转义规则：</p>
<ul>
<li><p>表达式中用双引号或单引号括起的字符将被解释为字符串常量。如果字符串常量包含转义字符，则必须使用转义序列来表示这些转义字符。例如，使用<code translate="no">\\</code> 表示<code translate="no">\</code> ，使用<code translate="no">\\t</code> 表示制表符<code translate="no">\t</code> ，使用<code translate="no">\\n</code> 表示换行符。</p></li>
<li><p>如果字符串常量由单引号包围，则常量内的单引号应表示为<code translate="no">\\'</code> ，而双引号可以表示为<code translate="no">&quot;</code> 或<code translate="no">\\&quot;</code> 。示例：<code translate="no">'It\\'s milvus'</code> 。</p></li>
<li><p>如果字符串常量由双引号包围，则常量内的双引号应表示为<code translate="no">\\&quot;</code> ，而单引号可以表示为<code translate="no">'</code> 或<code translate="no">\\'</code> 。示例：<code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code> 。</p></li>
</ul></li>
</ul>
