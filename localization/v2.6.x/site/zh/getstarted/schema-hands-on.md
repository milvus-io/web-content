---
id: schema-hands-on.md
title: 搜索数据模型设计
summary: >-
  信息检索系统，又称搜索引擎，对于检索增强生成（RAG）、视觉搜索和产品推荐等各种人工智能应用至关重要。这些系统的核心是精心设计的数据模型，用于组织、索引和检索信息。
---
<h1 id="Data-Model-Design-for-Search" class="common-anchor-header">搜索数据模型设计<button data-href="#Data-Model-Design-for-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>信息检索系统（又称搜索引擎）是各种人工智能应用（如检索增强生成（RAG）、可视化搜索和产品推荐）的关键。这些系统的核心是精心设计的数据模型，用于组织、索引和检索信息。</p>
<p>Milvus 允许您通过 Collect schema 指定搜索数据模型，组织非结构化数据、它们的密集或稀疏向量表示以及结构化元数据。无论您处理的是文本、图像还是其他数据类型，本实践指南都将帮助您理解和应用关键的 Schema 概念，在实践中设计搜索数据模型。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data-model-anatomy.png" alt="Data Model Anatomy" class="doc-image" id="data-model-anatomy" />
   </span> <span class="img-wrapper"> <span>数据模型剖析</span> </span></p>
<h2 id="Data-Model" class="common-anchor-header">数据模型<button data-href="#Data-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>搜索系统的数据模型设计包括分析业务需求，并将信息抽象为模式表达的数据模型。定义明确的 Schema 对于使数据模型与业务目标保持一致、确保数据一致性和服务质量非常重要。  此外，选择适当的数据类型和索引对于经济地实现业务目标也很重要。</p>
<h3 id="Analyzing-Business-Needs" class="common-anchor-header">分析业务需求</h3><p>要有效满足业务需求，首先要分析用户将执行的查询类型，并确定最合适的搜索方法。</p>
<ul>
<li><p><strong>用户查询：</strong>确定用户预期执行的查询类型。这有助于确保您的 Schema 支持真实世界的用例并优化搜索性能。这些查询可能包括</p>
<ul>
<li><p>检索与自然语言查询相匹配的文档</p></li>
<li><p>查找与参考图片相似或匹配文本描述的图片</p></li>
<li><p>根据名称、类别或品牌等属性搜索产品</p></li>
<li><p>根据结构化元数据（如出版日期、标签、评分）过滤项目</p></li>
<li><p>在混合查询中结合多种标准（例如，在视觉搜索中，同时考虑图像及其标题的语义相似性）</p></li>
</ul></li>
<li><p><strong>搜索方法：</strong>根据用户将执行的查询类型选择适当的搜索技术。不同的方法服务于不同的目的，通常可以结合使用以获得更强大的结果：</p>
<ul>
<li><p><strong>语义搜索</strong>：使用密集向量相似性来查找具有相似含义的项目，非常适合文本或图像等非结构化数据。</p></li>
<li><p><strong>全文搜索</strong>：用关键字匹配补充语义搜索。  全文搜索可利用词法分析，避免将长词分解成零散的标记，在检索过程中抓住特殊术语。</p></li>
<li><p><strong>元数据过滤</strong>：在向量搜索的基础上，应用日期范围、类别或标签等约束条件。</p></li>
</ul></li>
</ul>
<h3 id="Translates-Business-Requirements-into-a-Search-Data-Model" class="common-anchor-header">将业务需求转化为搜索数据模型</h3><p>下一步是将业务需求转化为具体的数据模型，方法是确定信息的核心组件及其搜索方法：</p>
<ul>
<li><p>定义需要存储的数据，如原始内容（文本、图像、音频）、相关元数据（标题、标签、作者）和上下文属性（时间戳、用户行为等）。</p></li>
<li><p>为每个元素确定适当的数据类型和格式。例如</p>
<ul>
<li><p>文本描述 → 字符串</p></li>
<li><p>图像或文档 Embeddings → 密集或稀疏向量</p></li>
<li><p>类别、标签或标志 → 字符串、数组和 bool</p></li>
<li><p>价格或评级等数字属性 → 整数或浮点数</p></li>
<li><p>结构化信息，如作者详细信息 -&gt; json</p></li>
</ul></li>
</ul>
<p>明确定义这些元素可确保数据的一致性、搜索结果的准确性以及与下游应用逻辑集成的便捷性。</p>
<h2 id="Schema-Design" class="common-anchor-header">Schema 设计<button data-href="#Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中，数据模型通过 Collections Schema 表达。在 Collections 模式中设计正确的字段是实现有效检索的关键。每个字段都定义了存储在 Collections 中的特定数据类型，并在搜索过程中扮演着不同的角色。在高层次上，Milvus 支持两种主要类型的字段：<strong>向量字段</strong>和<strong>标量字段</strong>。</p>
<p>现在，您可以将数据模型映射到字段 Schema 中，包括向量和任何辅助标量字段。确保每个字段都与数据模型中的属性相关联，尤其要注意向量类型（密集型或标量型）及其维度。</p>
<h3 id="Vector-Field" class="common-anchor-header">向量字段</h3><p>向量字段存储文本、图像和音频等非结构化数据类型的嵌入。这些嵌入可能是密集型、稀疏型或二进制型，具体取决于数据类型和使用的检索方法。通常，密集向量用于语义搜索，而稀疏向量则更适合全文或词性匹配。当存储和计算资源有限时，二进制向量很有用。一个 Collections 可能包含多个向量场，以实现多模式或混合检索策略。有关该主题的详细指南，请参阅<a href="/docs/zh/multi-vector-search.md">多向量混合检索</a>。</p>
<p>Milvus 支持向量数据类型：<code translate="no">FLOAT_VECTOR</code> 表示<a href="/docs/zh/dense-vector.md">密集</a>向量，<code translate="no">SPARSE_FLOAT_VECTOR</code> 表示<a href="/docs/zh/sparse_vector.md">稀疏向量</a>，<code translate="no">BINARY_VECTOR</code> 表示<a href="/docs/zh/binary-vector.md">二进制向量</a></p>
<h3 id="Scalar-Field" class="common-anchor-header">标量字段</h3><p>标量字段存储原始的结构化值，通常称为元数据，如数字、字符串或日期。这些值可以与向量搜索结果一起返回，对于筛选和排序至关重要。它们允许你根据特定属性缩小搜索结果的范围，比如将文档限制在特定类别或定义的时间范围内。</p>
<p>Milvus 支持标量类型，如<code translate="no">BOOL</code>,<code translate="no">INT8/16/32/64</code>,<code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code>,<code translate="no">VARCHAR</code>,<code translate="no">JSON</code> 和<code translate="no">ARRAY</code> ，用于存储和过滤非向量数据。这些类型提高了搜索操作的精度和定制化程度。</p>
<h2 id="Leverage-Advanced-Features-in-Schema-Design" class="common-anchor-header">在模式设计中利用高级功能<button data-href="#Leverage-Advanced-Features-in-Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>在设计 Schema 时，仅仅使用支持的数据类型将数据映射到字段是不够的。必须全面了解字段之间的关系以及可用的配置策略。在设计阶段牢记关键功能，可确保 Schema 不仅能满足当前的数据处理要求，还具有可扩展性和适应性，以满足未来的需求。通过精心整合这些功能，您可以构建一个强大的数据架构，最大限度地发挥 Milvus 的功能，并支持您更广泛的数据策略和目标。以下是创建 Collections Schema 的主要功能概述：</p>
<h3 id="Primary-Key" class="common-anchor-header">主键</h3><p>主键字段是 Schema 的基本组成部分，因为它能唯一标识 Collections 中的每个实体。必须定义主键。它必须是整数或字符串类型的标量字段，并标记为<code translate="no">is_primary=True</code> 。可选择为主键启用<code translate="no">auto_id</code> ，主键会自动分配整数，随着更多数据被采集到 Collections 中，整数也会随之增长。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/primary-field.md">主字段和自动 ID</a>。</p>
<h3 id="Partitioning" class="common-anchor-header">分区</h3><p>为了加快搜索速度，可以选择打开分区。通过为分区指定一个特定的标量字段，并在搜索过程中根据该字段指定过滤条件，可以有效地将搜索范围限制在相关的分区中。这种方法通过缩小搜索域，大大提高了检索操作的效率。</p>
<p>更多详情，请参阅<a href="/docs/zh/use-partition-key.md">使用 Partition Key</a>。</p>
<h3 id="Analyzer" class="common-anchor-header">分析器</h3><p>分析器是处理和转换文本数据的重要工具。它的主要功能是将原始文本转换为标记，并对其进行结构化处理，以便编制索引和进行检索。具体做法是对字符串进行标记化处理，去掉停顿词，并将单个词的词干转化为标记。</p>
<p>更多详情，请参阅<a href="/docs/zh/analyzer-overview.md">分析器概述</a>。</p>
<h3 id="Function" class="common-anchor-header">功能</h3><p>Milvus 允许你定义内置函数作为 Schema 的一部分，以自动推导出某些字段。例如，您可以添加内置 BM25 函数，从<code translate="no">VARCHAR</code> 字段生成稀疏向量，以支持全文搜索。这些函数派生字段可简化预处理，并确保 Collections 保持自足和查询就绪。</p>
<p>更多详情，请参阅<a href="/docs/zh/full-text-search.md">全文检索</a>。</p>
<h2 id="A-Real-World-Example" class="common-anchor-header">真实世界示例<button data-href="#A-Real-World-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>在本节中，我们将概述上图所示多媒体文档搜索应用程序的 Schema 设计和代码示例。该 Schema 设计用于管理包含文章的数据集，文章数据映射到以下字段：</p>
<table>
   <tr>
     <th><p><strong>字段</strong></p></th>
     <th><p><strong>数据源</strong></p></th>
     <th><p><strong>搜索方法使用</strong></p></th>
     <th><p><strong>主键</strong></p></th>
     <th><p><strong>分区键</strong></p></th>
     <th><p><strong>分析器</strong></p></th>
     <th><p><strong>函数输入/输出</strong></p></th>
   </tr>
   <tr>
     <td><p>article_id (<code translate="no">INT64</code>)</p></td>
     <td><p>启用后自动生成<code translate="no">auto_id</code></p></td>
     <td><p><a href="/docs/zh/get-and-scalar-query.md">使用 "获取 "进行查询</a></p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>标题 (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>文章标题</p></td>
     <td><p><a href="/docs/zh/keyword-match.md">文本匹配</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>时间戳 (<code translate="no">INT32</code>)</p></td>
     <td><p>发布日期</p></td>
     <td><p><a href="/docs/zh/use-partition-key.md">按分区密钥过滤</a></p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>文本 (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>文章原始文本</p></td>
     <td><p><a href="/docs/zh/multi-vector-search.md">多向量混合搜索</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>输入</p></td>
   </tr>
   <tr>
     <td><p>文本密集向量 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>由文本 Embeddings 模型生成的密集向量</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/BaGlwzDmyiyVvVk6NurcFclInCd?from=from_parent_docs">基本向量搜索</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>文本稀疏向量 (<code translate="no">SPARSE_FLOAT_VECTOR</code>)</p></td>
     <td><p>由内置 BM25 函数自动生成的稀疏向量</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/RQTRwhOVPiwnwokqr4scAtyfnBf?from=from_parent_docs">全文搜索</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>输出</p></td>
   </tr>
</table>
<p>有关<a href="/docs/zh/schema.md">Schema 的</a>更多信息以及添加各类字段的详细指导，请参阅<a href="/docs/zh/schema.md">Schema Explained</a>。</p>
<h3 id="Initialize-schema" class="common-anchor-header">初始化模式</h3><p>首先，我们需要创建一个空模式。这一步为定义数据模型建立了基础结构。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create an empty schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">//Skip this step using JavaScript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Skip this step using cURL</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-fields" class="common-anchor-header">添加字段</h3><p>创建 Schema 后，下一步就是指定构成数据的字段。每个字段都与各自的数据类型和属性相关联。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, enable_analyzer=<span class="hljs-literal">True</span>, enable_match=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;timestamp&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish date&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">2000</span>, enable_analyzer=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article text content&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;text dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;text sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;timestamp&quot;</span>)
        .dataType(DataType.Int32)
        .build())
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">2000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;timestamp&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int32</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">2000</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_dense_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;article_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article id&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">200</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithEnableMatch(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article title&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithDataType(entity.FieldTypeInt32).
    WithDescription(<span class="hljs-string">&quot;publish date&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">2000</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article text content&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>).
    WithDescription(<span class="hljs-string">&quot;text dense vector&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector).
    WithDescription(<span class="hljs-string">&quot;text sparse vector&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> fields=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;article_id&quot;,
        &quot;dataType&quot;: &quot;Int64&quot;,
        &quot;isPrimary&quot;: true
    },
    {
        &quot;fieldName&quot;: &quot;title&quot;,
        &quot;dataType&quot;: &quot;VarChar&quot;,
        &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 200,
            &quot;enable_analyzer&quot;: true,
            &quot;enable_match&quot;: true
        }
    },
    {
        &quot;fieldName&quot;: &quot;timestamp&quot;,
        &quot;dataType&quot;: &quot;Int32&quot;
    },
    {
       &quot;fieldName&quot;: &quot;text&quot;,
       &quot;dataType&quot;: &quot;VarChar&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 2000,
            &quot;enable_analyzer&quot;: true
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_dense_vector&quot;,
       &quot;dataType&quot;: &quot;FloatVector&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;dim&quot;: 768
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_sparse_vector&quot;,
       &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在本例中，为字段指定了以下属性：</p>
<ul>
<li><p>主键：<code translate="no">article_id</code> 用作主键，可自动为输入实体分配主键。</p></li>
<li><p>Partition Key：<code translate="no">timestamp</code> 被指定为分区键，允许通过分区进行过滤。这可能是</p></li>
<li><p>文本分析器：文本分析器应用于 2 个字符串字段<code translate="no">title</code> 和<code translate="no">text</code> ，分别支持文本匹配和全文搜索。</p></li>
</ul>
<h3 id="Optional-Add-functions" class="common-anchor-header">(可选）添加功能</h3><p>为增强数据查询功能，可在 Schema 中加入函数。例如，可以创建一个函数来处理与特定字段相关的数据。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse_vector&quot;</span>],
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">FunctionType</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;text_sparse_vector&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> myFunctions=<span class="hljs-string">&#x27;[
    {
        &quot;name&quot;: &quot;text_bm25&quot;,
        &quot;type&quot;: &quot;BM25&quot;,
        &quot;inputFieldNames&quot;: [&quot;text&quot;],
        &quot;outputFieldNames&quot;: [&quot;text_sparse_vector&quot;],
        &quot;params&quot;: {}
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
    \&quot;functions\&quot;: <span class="hljs-variable">$myFunctions</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>本例在 Schema 中添加了一个内置 BM25 函数，利用<code translate="no">text</code> 字段作为输入，并将生成的稀疏向量存储在<code translate="no">text_sparse_vector</code> 字段中。</p>
<h2 id="Next-Steps" class="common-anchor-header">下一步<button data-href="#Next-Steps" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/zh/create-collection.md">创建 Collection</a></p></li>
<li><p><a href="/docs/zh/alter-collection-field.md">更改 Collections 字段</a></p></li>
</ul>
