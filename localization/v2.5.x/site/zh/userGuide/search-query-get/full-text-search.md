---
id: full-text-search.md
title: 全文检索
related_key: 'full, text, search'
summary: 全文搜索是一种在文本数据集中检索包含特定术语或短语的文档，然后根据相关性对结果进行排序的功能。
---
<h1 id="Full-Text-Search​" class="common-anchor-header">全文搜索<button data-href="#Full-Text-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>全文搜索是一种在文本数据集中检索包含特定术语或短语的文档，然后根据相关性对结果进行排序的功能。该功能克服了语义搜索的局限性（语义搜索可能会忽略精确的术语），确保您获得最准确且与上下文最相关的结果。此外，它还通过接受原始文本输入来简化向量搜索，自动将您的文本数据转换为稀疏嵌入，而无需手动生成向量嵌入。</p>
<p>该功能使用 BM25 算法进行相关性评分，在检索增强生成 (RAG) 场景中尤为重要，它能优先处理与特定搜索词密切匹配的文档。</p>
<div class="alert note">
<p>通过将全文检索与基于语义的密集向量搜索相结合，可以提高搜索结果的准确性和相关性。更多信息，请参阅<a href="/docs/zh/multi-vector-search.md">混合搜索</a>。</p>
</div>
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
    </button></h2><p>全文搜索无需手动嵌入，从而简化了基于文本的搜索过程。该功能通过以下工作流程进行操作符。</p>
<ol>
<li><p><strong>文本输入</strong>：插入原始文本文档或提供查询文本，无需手动嵌入。</p></li>
<li><p><strong>文本分析</strong>：Milvus 使用分析器将输入文本标记为可搜索的单个术语。</p></li>
<li><p><strong>函数处理</strong>：内置函数接收标记化术语，并将其转换为稀疏向量表示。</p></li>
<li><p><strong>Collections 存储</strong>：Milvus 将这些稀疏嵌入存储在 Collections 中，以便高效检索。</p></li>
<li><p><strong>BM25 评分</strong>：在搜索过程中，Milvus 应用 BM25 算法为存储的文档计算分数，并根据与查询文本的相关性对匹配结果进行排序。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/full-text-search.png" alt="Full text search" class="doc-image" id="full-text-search" />
   </span> <span class="img-wrapper"> <span>全文搜索</span> </span></p>
<p>要使用全文搜索，请遵循以下主要步骤。</p>
<ol>
<li><p><a href="#Create-a-collection-for-full-text-search">创建 Collections</a>：设置带有必要字段的 Collections，并定义一个将原始文本转换为稀疏嵌入的函数。</p></li>
<li><p><a href="#Insert-text-data">插入数据</a>：将原始文本文档插入 Collections。</p></li>
<li><p><a href="#Perform-full-text-search">执行搜索</a>：使用查询文本搜索你的 Collections 并检索相关结果。</p></li>
</ol>
<h2 id="Create-a-collection-for-full-text-search​" class="common-anchor-header">创建用于全文搜索的 Collections<button data-href="#Create-a-collection-for-full-text-search​" class="anchor-icon" translate="no">
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
    </button></h2><p>要启用全文搜索，请创建一个具有特定 Schema 的 Collections。此 Schema 必须包括三个必要字段。</p>
<ul>
<li><p>唯一标识 Collections 中每个实体的主字段。</p></li>
<li><p>一个<code translate="no">VARCHAR</code> 字段，用于存储原始文本文档，其<code translate="no">enable_analyzer</code> 属性设置为<code translate="no">True</code> 。这允许 Milvus 将文本标记为特定术语，以便进行函数处理。</p></li>
<li><p>一个<code translate="no">SPARSE_FLOAT_VECTOR</code> 字段，预留用于存储稀疏嵌入，Milvus 将为<code translate="no">VARCHAR</code> 字段自动生成稀疏嵌入。</p></li>
</ul>
<h3 id="Define-the-collection-schema" class="common-anchor-header">定义 Collections 模式</h3><p>首先，创建 Schema 并添加必要的字段。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType​
​
schema = MilvusClient.create_schema()​
​
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​

<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><p><code translate="no">id</code>: 作为主键，由<code translate="no">auto_id=True</code> 自动生成。</p></li>
<li><p><code translate="no">text</code>:存储原始文本数据，用于全文搜索操作。数据类型必须是<code translate="no">VARCHAR</code> ，因为<code translate="no">VARCHAR</code> 是 Milvus 用于文本存储的字符串数据类型。设置<code translate="no">enable_analyzer=True</code> 以允许 Milvus 对文本进行标记化。默认情况下，Milvus 使用<a href="/docs/zh/standard-analyzer.md">标准分析器</a>进行文本分析。要配置不同的分析器，请参阅<a href="/docs/zh/analyzer-overview.md">概述</a>。</p></li>
<li><p><code translate="no">sparse</code>矢量字段：保留一个矢量字段，用于存储内部生成的稀疏嵌入，以进行全文搜索操作。数据类型必须是<code translate="no">SPARSE_FLOAT_VECTOR</code> 。</p></li>
</ul>
<p>现在，定义一个将文本转换为稀疏向量表示的函数，然后将其添加到 Schema 中。</p>
<pre><code translate="no" class="language-python">bm25_function = Function(​
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name​</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data​</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings​</span>
    function_type=FunctionType.BM25,​
)​
​
schema.add_function(bm25_function)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="EfAfdS3iXoAULPxQ3mwckzTrnUb"><thead><tr><th data-block-token="O3sLd5KNXou4Egxq6XVcoNiJnMW" colspan="1" rowspan="1"><p data-block-token="QRttdgJBpo2hEuxb438c7eOgn2f">参数</p>
</th><th data-block-token="SMGGduN8zo3cgXxVnwZcW0UAnbA" colspan="1" rowspan="1"><p data-block-token="LY39dA2eOoyVUUxvKwlcyyjdn3e">说明</p>
</th></tr></thead><tbody><tr><td data-block-token="Pbj3dPvuno3x6kxnCsWcTb3knag" colspan="1" rowspan="1"><p data-block-token="EeHOdxCjloFUAGxuY1CcScCTnDe"><code translate="no">name</code></p>
<p data-block-token="FzAJdVbrzozmTdxwy4fcJQkQnlh"></p>
</td><td data-block-token="VJWydnWHJoV66jx6oEPcH9lGnvh" colspan="1" rowspan="1"><p data-block-token="Clg3dWrJpo39lfxSWjVcbE7GnYm">函数名称。该函数将<code translate="no">text</code> 字段中的原始文本转换为可搜索的向量，这些向量将存储在<code translate="no">sparse</code> 字段中。</p>
</td></tr><tr><td data-block-token="ShPJdlvMQoXnSHxIQ1GcoyegnEb" colspan="1" rowspan="1"><p data-block-token="HFT1dYVCioUj4PxnNSVcYIBInNh"><code translate="no">input_field_names</code></p>
</td><td data-block-token="YiZCdrUaaovWnrxef29cmpQFn9c" colspan="1" rowspan="1"><p data-block-token="YFVOd29cUovDpXx7L2zcJK37n1g">需要将文本转换为稀疏向量的<code translate="no">VARCHAR</code> 字段的名称。对于<code translate="no">FunctionType.BM25</code> ，该参数只接受一个字段名称。</p>
</td></tr><tr><td data-block-token="QpcMdDoXfo62aNxQfoyc2E6lneg" colspan="1" rowspan="1"><p data-block-token="D1LkdH1KIojwKDx14HUcHdDJnPh"><code translate="no">output_field_names</code></p>
</td><td data-block-token="TrvodS2xDoF6UhxeFNScRg86nuf" colspan="1" rowspan="1"><p data-block-token="CO6bdbNhQo9ZprxlGdecjs9RnEf">存储内部生成的稀疏向量的字段名称。对于<code translate="no">FunctionType.BM25</code> ，该参数只接受一个字段名称。</p>
</td></tr><tr><td data-block-token="UvgkdWp5RoXa0QxL3CKcoEZVnIf" colspan="1" rowspan="1"><p data-block-token="PWZSd2E48oWB2QxqVoVcMHGxn7c"><code translate="no">function_type</code></p>
</td><td data-block-token="VdcmdmiiWoy0nex8a29clnslnQg" colspan="1" rowspan="1"><p data-block-token="Q2eSdvOqeoNa6dxcGjcc2LKinDg">要使用的函数类型。将值设为<code translate="no">FunctionType.BM25</code> 。</p>
</td></tr></tbody></table>
<div class="alert note">
<p>对于有多个<code translate="no">VARCHAR</code> 字段需要进行文本到稀疏向量转换的 Collections，请在 Collections Schema 中添加单独的函数，确保每个函数都有唯一的名称和<code translate="no">output_field_names</code> 值。</p>
</div>
<h3 id="Configure-the-index" class="common-anchor-header">配置索引</h3><p>在定义了包含必要字段和内置函数的 Schema 后，请为 Collections 设置索引。为简化这一过程，请使用<code translate="no">AUTOINDEX</code> 作为<code translate="no">index_type</code> ，该选项允许 Milvus 根据数据结构选择和配置最合适的索引类型。</p>
<pre><code translate="no" class="language-python">index_params = <span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, ​
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="XEoodLxOFoukWJx9aLXcH46snXc"><thead><tr><th data-block-token="PfGNdbuq9o9PEWxzAWecWWoInUf" colspan="1" rowspan="1"><p data-block-token="KX1VdsOJCoO0Exxhg8acsduwncd">参数</p>
</th><th data-block-token="VNwBdAyWKoPktSxYaBtcn5rKnNb" colspan="1" rowspan="1"><p data-block-token="Oo1PduIsxo4HcMx2NRmcxvAMnld">说明</p>
</th></tr></thead><tbody><tr><td data-block-token="UxxWdkIBPoSbjOx7MO8csiFEn5d" colspan="1" rowspan="1"><p data-block-token="NYODddTbmoYoBrxPQ8ectvGxnPe"><code translate="no">field_name</code></p>
</td><td data-block-token="L2ZGdkB2voKhmsx8ezecoPxmnVf" colspan="1" rowspan="1"><p data-block-token="Y16fdZ6hPoXVlgxSTQjctsTonac">要索引的向量字段的名称。对于全文检索，这应该是存储生成的稀疏向量的字段。在本例中，将值设为<code translate="no">sparse</code> 。</p>
</td></tr><tr><td data-block-token="Wn1rdzso5o8AmqxqxiqccBpCnD4" colspan="1" rowspan="1"><p data-block-token="WLDrdOzSXoiKEOxoDREctDounRf"><code translate="no">index_type</code></p>
</td><td data-block-token="I9TpdLWlXozM3Hx2Z9mcWvDHnNc" colspan="1" rowspan="1"><p data-block-token="Q3cgdK7OTo3kzXxQ1Y2cSarZned">要创建的索引类型。<code translate="no">AUTOINDEX</code> 允许 Milvus 自动优化索引设置。如果需要对索引设置进行更多控制，可以从 Milvus 中稀疏向量可用的各种索引类型中进行选择。更多信息，请参阅<a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Milvus 支持的索引</a>。</p>
</td></tr><tr><td data-block-token="KJfgdQmD1odMgdxkG6uczBYknQh" colspan="1" rowspan="1"><p data-block-token="XVCsdz9Ulo93A2xavPtcF9Bvnec"><code translate="no">metric_type</code></p>
</td><td data-block-token="S3NHds6MTodtrsxRILIc8E1wngh" colspan="1" rowspan="1"><p data-block-token="G9i7dPczzoyJRHxyXbecrWBBn0d">该参数的值必须设置为<code translate="no">BM25</code> ，专门用于全文搜索功能。</p>
</td></tr></tbody></table>
<h3 id="Create-the-collection​" class="common-anchor-header">创建 Collections</h3><p>现在使用定义的 Schema 和索引参数创建 Collections。</p>
<pre><code translate="no" class="language-python"><span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, ​
    schema=schema, ​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-text-data" class="common-anchor-header">插入文本数据<button data-href="#Insert-text-data" class="anchor-icon" translate="no">
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
    </button></h2><p>设置好集合和索引后，就可以插入文本数据了。在此过程中，您只需提供原始文本。我们之前定义的内置函数会自动为每个文本条目生成相应的稀疏向量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">insert</span>(<span class="hljs-string">&#x27;demo&#x27;</span>, [​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Artificial intelligence was founded as an academic discipline in 1956.&#x27;</span>},​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Alan Turing was the first person to conduct substantial research in AI.&#x27;</span>},​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Born in Maida Vale, London, Turing was raised in southern England.&#x27;</span>},​
])​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Perform-full-text-search" class="common-anchor-header">执行全文搜索<button data-href="#Perform-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>将数据插入 Collections 后，就可以使用原始文本查询执行全文搜索了。Milvus 会自动将你的查询转换成稀疏向量，并使用 BM25 算法对匹配的搜索结果进行排序，然后返回 topK (<code translate="no">limit</code>) 结果。</p>
<pre><code translate="no" class="language-python">search_params = {​
    <span class="hljs-string">&#x27;params&#x27;</span>: {<span class="hljs-string">&#x27;drop_ratio_search&#x27;</span>: 0.6},​
}​
​
MilvusClient.search(​
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, ​
    data=[<span class="hljs-string">&#x27;Who started AI research?&#x27;</span>],​
    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,​
    <span class="hljs-built_in">limit</span>=3,​
    search_params=search_params​
)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="M37Zdx7XdoYN41xdKtfcHcJpnqh"><thead><tr><th data-block-token="UhTwdxk3Mo5eLjxff0PcL1CHn8b" colspan="1" rowspan="1"><p data-block-token="OwUXdMhOgoRxjzx5t9ecKR9Zn6J">参数</p>
</th><th data-block-token="GM88dTMzTof30QxS9O2cVyrnnJd" colspan="1" rowspan="1"><p data-block-token="Nlp5dAJY8or40nxV6auc20XHnjh">说明</p>
</th></tr></thead><tbody><tr><td data-block-token="QpGIdQ2m0oogCvxColKcNWnYnUc" colspan="1" rowspan="1"><p data-block-token="TkffdBxkKo2hVvx9gGucca46nic"><code translate="no">search_params</code></p>
</td><td data-block-token="HYemdqt6Dow9tvxOcYScmYdPn8e" colspan="1" rowspan="1"><p data-block-token="JiIOdJrBcoGIQ4xrqYycMdjnn7g">包含搜索参数的字典。</p>
</td></tr><tr><td data-block-token="DJDgdH5WUoZQxkxmLzQcXqcXnQh" colspan="1" rowspan="1"><p data-block-token="LKWbdw498o9mtRxm9gDcg28FnQd"><code translate="no">params.drop_ratio_search</code></p>
</td><td data-block-token="SEJ7d5y18otFTOxy7gLcvLYRnfb" colspan="1" rowspan="1"><p data-block-token="MnladDjOGoUphGxrZzXchD0anzf">搜索时要忽略的低频词比例。详情请参阅<a href="/docs/zh/sparse_vector.md">稀疏向量</a>。</p>
</td></tr><tr><td data-block-token="XPPYdAYUPoASg5xuIYmcyxqHnPe" colspan="1" rowspan="1"><p data-block-token="T90ndG7H0okLa4xa1wzcHQmEnEg"><code translate="no">data</code></p>
</td><td data-block-token="NMhsduxr1oUESPx2J8YcA8csnA1" colspan="1" rowspan="1"><p data-block-token="ZmEQdkdGtofQsAx9YXNcsnlHnYe">原始查询文本。</p>
</td></tr><tr><td data-block-token="O4OVdL9BIollH1xORz3czhInnSh" colspan="1" rowspan="1"><p data-block-token="CYdGd82dRopaWrxfJ9ycWQQnnPc"><code translate="no">anns_field</code></p>
</td><td data-block-token="MsKIdxGj6oWeBExoFurcxWCnnGh" colspan="1" rowspan="1"><p data-block-token="RsMDdgo0roTSBuxYwm6cGw3inZd">包含内部生成的稀疏向量的字段名称。</p>
</td></tr><tr><td data-block-token="G0ewd9TQ1o1RQRxZA9ucMO9tnBK" colspan="1" rowspan="1"><p data-block-token="JOyTdUmLIo5aV0x4ChOcLiDQnLh"><code translate="no">limit</code></p>
</td><td data-block-token="H21hdYGZQoQe5FxYnwCch58qn0g" colspan="1" rowspan="1"><p data-block-token="ATKidHgXoo7c7dxM7cgcE46engb">要返回的最大匹配次数。</p>
</td></tr></tbody></table>
<p></p>
