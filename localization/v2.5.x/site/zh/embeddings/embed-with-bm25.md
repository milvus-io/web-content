---
id: embed-with-bm25.md
order: 5
summary: BM25 是信息检索中使用的一种排序函数，用于估计文档与给定搜索查询的相关性。
title: BM25
---
<h1 id="BM25" class="common-anchor-header">BM25<button data-href="#BM25" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://en.wikipedia.org/wiki/Okapi_BM25">BM25</a>是信息检索中的一种排序函数，用于估计文档与给定搜索查询的相关性。它结合了文档长度归一化和术语频率饱和，从而增强了基本术语频率方法。BM25 可以通过将文档表示为术语重要性得分向量来生成稀疏嵌入，从而在稀疏向量空间中实现高效检索和排序。</p>
<p>Milvus 使用<strong>BM25EmbeddingFunction</strong>类与<strong>BM25</strong>模型集成。该类处理嵌入的计算，并以与 Milvus 兼容的格式返回，用于索引和搜索。这一过程的关键是建立一个标记化分析器。</p>
<p>要使用这一功能，请安装必要的依赖项：</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>要轻松创建一个标记化器，Milvus 提供了一个默认的分析器，只需指定文本的语言即可。</p>
<p><strong>例如</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.sparse.bm25.tokenizers <span class="hljs-keyword">import</span> build_default_analyzer
<span class="hljs-keyword">from</span> pymilvus.model.sparse <span class="hljs-keyword">import</span> BM25EmbeddingFunction

<span class="hljs-comment"># there are some built-in analyzers for several languages, now we use &#x27;en&#x27; for English.</span>
analyzer = build_default_analyzer(language=<span class="hljs-string">&quot;en&quot;</span>)

corpus = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># analyzer can tokenize the text into tokens</span>
tokens = analyzer(corpus[<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;tokens:&quot;</span>, tokens)
<button class="copy-code-btn"></button></code></pre>
<p><strong>参数</strong>：</p>
<ul>
<li><p><strong>语言</strong><em>（字符串）</em></p>
<p>要标记化的文本语言。有效选项为<strong>en</strong>（英语）、<strong>de</strong>（德语）、<strong>fr</strong>（法语）、<strong>ru</strong>（俄语）、<strong>sp</strong>（西班牙语）、<strong>it</strong>（意大利语）、<strong>pt</strong>（葡萄牙语）、<strong>zh</strong>（中文）、<strong>jp</strong>（日语）、<strong>kr</strong>（韩语）。</p></li>
</ul>
<p>预期的输出结果类似于下图：</p>
<pre><code translate="no" class="language-python"><span class="hljs-attr">tokens</span>: [<span class="hljs-string">&#x27;artifici&#x27;</span>, <span class="hljs-string">&#x27;intellig&#x27;</span>, <span class="hljs-string">&#x27;found&#x27;</span>, <span class="hljs-string">&#x27;academ&#x27;</span>, <span class="hljs-string">&#x27;disciplin&#x27;</span>, <span class="hljs-string">&#x27;1956&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
<p>BM25 算法在处理文本时，首先使用内置分析器将文本分解成词块，如图所示的<strong>"artifici"、</strong> <strong>"intellig "</strong>和<strong>"academ "</strong>等英语词块<strong>。</strong>然后，它收集这些词素的统计数据，评估它们在文档中的出现频率和分布情况。BM25 的核心是根据每个标记的重要性计算其相关性得分，较罕见的标记得分较高。这一简洁的过程可以根据与查询的相关性对文档进行有效的排序。</p>
<p>要收集语料库的统计数据，请使用<strong>fit()</strong>方法：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the analyzer to instantiate the BM25EmbeddingFunction</span>
bm25_ef = BM25EmbeddingFunction(analyzer)

<span class="hljs-comment"># Fit the model on the corpus to get the statstics of the corpus</span>
bm25_ef.fit(corpus)
<button class="copy-code-btn"></button></code></pre>
<p>然后，使用<strong>encode_documents()</strong>为文档创建 Embeddings：</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;The field of artificial intelligence was established as an academic subject in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the pioneer in conducting significant research in artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;Originating in Maida Vale, London, Turing grew up in the southern regions of England.&quot;</span>,
    <span class="hljs-string">&quot;In 1956, artificial intelligence emerged as a scholarly field.&quot;</span>,
    <span class="hljs-string">&quot;Turing, originally from Maida Vale, London, was brought up in the south of England.&quot;</span>
]

<span class="hljs-comment"># Create embeddings for the documents</span>
docs_embeddings = bm25_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sparse dim:&quot;</span>, bm25_ef.dim, <span class="hljs-built_in">list</span>(docs_embeddings)[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>预期输出结果类似于下图：</p>
<pre><code translate="no" class="language-python">Embeddings:   (0, 0)        1.0208816705336425
  (0, 1)        1.0208816705336425
  (0, 3)        1.0208816705336425
...
  (4, 16)        0.9606986899563318
  (4, 17)        0.9606986899563318
  (4, 20)        0.9606986899563318
Sparse dim: 21 (1, 21)
<button class="copy-code-btn"></button></code></pre>
<p>使用<strong>encode_queries()</strong>方法为查询创建 embeddings：</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = bm25_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sparse dim:&quot;</span>, bm25_ef.dim, <span class="hljs-built_in">list</span>(query_embeddings)[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>预期输出类似于下图：</p>
<pre><code translate="no" class="language-python">Embeddings:   (0, 0)        0.5108256237659907
  (0, 1)        0.5108256237659907
  (0, 2)        0.5108256237659907
  (1, 6)        0.5108256237659907
  (1, 7)        0.11554389108992644
  (1, 14)        0.5108256237659907
Sparse dim: 21 (1, 21)
<button class="copy-code-btn"></button></code></pre>
<p><strong>注释：</strong></p>
<p>使用<strong>BM25EmbeddingFunction</strong> 时，请注意<strong>encoding_queries()</strong>和<strong>encoding_documents()</strong>操作符不能在数学上互换。因此，没有可用的<strong>bm25_ef(text)</strong>。</p>
