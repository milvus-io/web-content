---
id: how_to_enhance_your_rag.md
summary: >-
  随着检索增强一代 RAG 应用程序的日益普及，人们越来越关注如何提高其性能。本文介绍了优化 RAG
  管道的所有可能方法，并提供了相应的图解，帮助您快速了解主流的 RAG 优化策略。
title: 如何提高 RAG 管道的性能
---
<h1 id="How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="common-anchor-header">如何提高 RAG 管道的性能<button data-href="#How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>随着检索增强生成<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">(RAG</a>) 应用程序的日益普及，人们越来越关注如何提高其性能。本文介绍了优化 RAG 管道的所有可能方法，并提供了相应的图解，帮助您快速了解主流的 RAG 优化策略。</p>
<p>值得注意的是，我们将仅对这些策略和技术进行高层次的探讨，重点关注它们如何集成到 RAG 系统中。但是，我们不会深入探讨复杂的细节，也不会指导您逐步实施。</p>
<h2 id="A-Standard-RAG-Pipeline" class="common-anchor-header">标准 RAG 管道<button data-href="#A-Standard-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>下图显示了最简单的 RAG 流水线。首先，文档块被载入向量存储（如<a href="https://milvus.io/docs">Milvus</a>或<a href="https://zilliz.com/cloud">Zilliz Cloud</a>）。然后，向量存储检索与查询最相关的前 K 个文档块。然后，将这些相关块注入<a href="https://zilliz.com/glossary/large-language-models-(llms)">LLM</a> 的上下文提示中，最后，LLM 返回最终答案。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/vanilla_rag.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Various-Types-of-RAG-Enhancement-Techniques" class="common-anchor-header">各类 RAG 增强技术<button data-href="#Various-Types-of-RAG-Enhancement-Techniques" class="anchor-icon" translate="no">
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
    </button></h2><p>我们可以根据 RAG 管道各阶段的作用对不同的 RAG 增强方法进行分类。</p>
<ul>
<li><strong>查询增强</strong>：修改和处理 RAG 输入的查询过程，以便更好地表达或处理查询意图。</li>
<li><strong>增强索引</strong>：使用多分块、分步索引或多向索引等技术优化分块索引的创建。</li>
<li><strong>检索器增强</strong>：在检索过程中应用优化技术和策略。</li>
<li><strong>生成器增强</strong>：在为 LLM 生成提示时调整和优化提示，以提供更好的响应。</li>
<li><strong>增强 RAG 管道</strong>：在整个 RAG 管道中动态切换流程，包括使用 Agents 或工具来优化 RAG 管道中的关键步骤。</li>
</ul>
<p>接下来，我们将介绍每个类别下的具体方法。</p>
<h2 id="Query-Enhancement" class="common-anchor-header">查询增强<button data-href="#Query-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>让我们探索四种有效的方法来增强您的查询体验：假设问题、假设文档嵌入、子查询和回溯提示。</p>
<h3 id="Creating-Hypothetical-Questions" class="common-anchor-header">创建假设问题</h3><p>创建假设问题涉及利用 LLM 生成用户可能会就每个文档块中的内容提出的多个问题。在用户的实际查询到达 LLM 之前，向量存储会检索与实际查询最相关的假设问题及其相应的文档块，并将其转发给 LLM。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/hypothetical_question.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>这种方法通过直接参与查询到查询的搜索，绕过了向量搜索过程中的跨域不对称问题，减轻了向量搜索的负担。不过，它在生成假设问题时引入了额外的开销和不确定性。</p>
<h3 id="HyDE-Hypothetical-Document-Embeddings" class="common-anchor-header">HyDE（假设文档嵌入）</h3><p>HyDE 是假设文档嵌入的缩写。它利用 LLM 制作一个<strong><em>&quot;假设文档</em></strong>&quot;或<strong><em>假</em></strong>答案，以回应没有上下文信息的用户查询。然后，这个假答案会被转换成向量嵌入，并用于查询向量数据库中最相关的文档块。随后，向量数据库会检索出 Top-K 最相关的文档块，并将它们传送给 LLM 和原始用户查询，从而生成最终答案。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/hyde.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>这种方法在解决向量搜索中的跨域不对称问题方面与假设问题技术类似。不过，它也有缺点，如增加了计算成本和生成虚假答案的不确定性。</p>
<p>更多信息，请参阅<a href="https://arxiv.org/abs/2212.10496">HyDE</a>论文。</p>
<h3 id="Creating-Sub-Queries" class="common-anchor-header">创建子查询</h3><p>当用户查询过于复杂时，我们可以使用 LLM 将其分解为更简单的子查询，然后再将其传递给向量数据库和 LLM。让我们来看一个例子。</p>
<p>设想有用户问：<strong><em>&quot;Milvus 和 Zilliz Cloud 在功能上有什么不同？</em></strong>&quot; 这个问题相当复杂，在我们的知识库中可能没有直接的答案。为了解决这个问题，我们可以将其拆分成两个更简单的子查询：</p>
<ul>
<li>子查询 1："Milvus 有哪些功能？"</li>
<li>子查询 2："Zilliz Cloud 有哪些功能？"</li>
</ul>
<p>有了这些子查询后，我们将它们全部转换成向量嵌入后发送给向量数据库。然后，向量数据库会找出与每个子查询最相关的 Top-K 文档块。最后，LLM 利用这些信息生成更好的答案。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>通过将用户查询分解为子查询，我们可以让系统更容易地找到相关信息并提供准确的答案，即使是复杂的问题也不例外。</p>
<h3 id="Creating-Stepback-Prompts" class="common-anchor-header">创建回退提示</h3><p>简化复杂用户查询的另一种方法是创建<strong><em>回溯提示</em></strong>。这种技术包括使用 LLM 将复杂的用户查询抽象为<em><em>&quot;</em>回溯问题</em>&quot;**。然后，向量数据库利用这些回溯问题来检索最相关的文档块。最后，LLM 根据这些检索到的文档块生成更准确的答案。</p>
<p>让我们用一个例子来说明这种技术。请看下面这个查询，它相当复杂，无法直接回答：</p>
<p><strong><em>原始用户查询："我有一个包含 100 亿条记录的数据集，想把它存储到 Milvus 中进行查询。可以吗？</em></strong></p>
<p>为了简化这个用户查询，我们可以使用 LLM 生成一个更直接的回溯问题：</p>
<p><strong><em>回退问题："Milvus 可以处理的数据集大小限制是多少？"</em></strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/stepback.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>这种方法可以帮助我们更好、更准确地回答复杂的查询。它将原始问题分解为更简单的形式，使我们的系统更容易找到相关信息并提供准确的回复。</p>
<h2 id="Indexing-Enhancement" class="common-anchor-header">增强索引<button data-href="#Indexing-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>增强索引是提高 RAG 应用程序性能的另一种策略。让我们来探讨三种索引增强技术。</p>
<h3 id="Merging-Document-Chunks-Automatically" class="common-anchor-header">自动合并文档块</h3><p>在建立索引时，我们可以采用两种粒度：子块及其对应的父块。起初，我们以更细的粒度搜索子块。然后，我们采用一种合并策略：如果前<strong><em>k 个子</em></strong>块中有特定数量（<strong><em>n</em></strong>）的子块属于同一个父块，我们就把这个父块作为上下文信息提供给 LLM。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/merge_chunks.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>这种方法已在<a href="https://docs.llamaindex.ai/en/stable/examples/retrievers/recursive_retriever_nodes.html">LlamaIndex</a> 中实现。</p>
<h3 id="Constructing-Hierarchical-Indices" class="common-anchor-header">构建分层索引</h3><p>在创建文档索引时，我们可以建立两级索引：一级是文档摘要索引，另一级是文档块索引。向量搜索过程包括两个阶段：首先，我们根据摘要过滤相关文档，随后，我们在这些相关文档中专门检索相应的文档块。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/hierarchical_index.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>在涉及大量数据或数据分层的情况下，例如图书馆 Collections 中的内容检索，这种方法证明是有益的。</p>
<h3 id="Hybrid-Retrieval-and-Reranking" class="common-anchor-header">混合检索和重新排名</h3><p>混合检索和重排技术将一种或多种辅助检索方法与<a href="https://zilliz.com/learn/vector-similarity-search">向量相似性检索</a>相结合。然后，<a href="https://zilliz.com/learn/optimize-rag-with-rerankers-the-role-and-tradeoffs#What-is-a-Reranker">Reranker</a>会根据检索结果与用户查询的相关性对检索结果重新排序。</p>
<p>常见的补充检索算法包括基于词频的方法（如<a href="https://milvus.io/docs/embed-with-bm25.md">BM25）</a>或利用稀疏嵌入的大模型（如<a href="https://zilliz.com/learn/discover-splade-revolutionize-sparse-data-processing">SPLADE</a>）。重新排序算法包括 RRF 或更复杂的模型，如<a href="https://www.sbert.net/examples/applications/cross-encoder/README.html">Cross-Encoder</a>（类似于 BERT 的架构）。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>这种方法利用不同的检索方法来提高检索质量，并解决向量召回中的潜在差距。</p>
<h2 id="Retriever-Enhancement" class="common-anchor-header">改进检索器<button data-href="#Retriever-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>改进 RAG 系统中的检索器组件也能改进 RAG 应用。让我们来探讨一些增强检索器的有效方法。</p>
<h3 id="Sentence-Window-Retrieval" class="common-anchor-header">句子窗口检索</h3><p>在基本的 RAG 系统中，提供给 LLM 的文档块是一个包含检索到的 embedding 块的较大窗口。这样可以确保提供给 LLM 的信息包含更广泛的上下文细节，从而最大限度地减少信息丢失。句子窗口检索技术将用于嵌入检索的文档块与提供给 LLM 的块分离开来。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/sentence_window.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>不过，扩大窗口大小可能会引入额外的干扰信息。我们可以根据具体的业务需求调整窗口扩展的大小。</p>
<h3 id="Meta-data-Filtering" class="common-anchor-header">元数据过滤</h3><p>为了确保更精确的答案，我们可以在将文档传递给 LLM 之前，通过过滤时间和类别等元数据来完善检索到的文档。例如，如果检索到的财务报告跨越多个年份，那么根据所需的年份进行过滤就能完善信息，满足特定要求。事实证明，这种方法在需要大量数据和详细元数据的情况下非常有效，例如图书馆 Collections 中的内容检索。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/metadata_filtering.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Generator-Enhancement" class="common-anchor-header">生成器增强<button data-href="#Generator-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>让我们通过改进 RAG 系统中的生成器来探索更多 RAG 优化技术。</p>
<h3 id="Compressing-the-LLM-prompt" class="common-anchor-header">压缩 LLM 提示</h3><p>检索文档块中的噪声信息会严重影响 RAG 最终答案的准确性。LLMs 中有限的提示窗口也是获得更准确答案的障碍。为了应对这一挑战，我们可以压缩无关细节，强调关键段落，并减少检索文档块的整体上下文长度。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/compress_prompt.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>这种方法类似于之前讨论过的混合检索和重排方法，即利用 Rerankers 筛选出不相关的文档块。</p>
<h3 id="Adjusting-the-chunk-order-in-the-prompt" class="common-anchor-header">调整提示中的块顺序</h3><p>在论文<a href="https://arxiv.org/abs/2307.03172">&quot;迷失在中间</a>&quot;中，研究人员观察到，LLMs 在推理过程中经常会忽略给定文档中间的信息。相反，他们往往更依赖于文档开头和结尾的信息。</p>
<p>根据这一观察结果，我们可以调整检索知识块的顺序来提高答案质量：在检索多个知识块时，将置信度相对较低的知识块放在中间，而将置信度相对较高的知识块放在两端。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/adjust_order.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="RAG-Pipeline-Enhancement" class="common-anchor-header">增强 RAG 管道<button data-href="#RAG-Pipeline-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>我们还可以通过增强整个 RAG 管道来提高 RAG 应用程序的性能。</p>
<h3 id="Self-reflection" class="common-anchor-header">自我反思</h3><p>这种方法在人工智能 Agents 中融入了自我反思的概念。那么，这种技术是如何工作的呢？</p>
<p>一些最初检索到的 Top-K 文档块是模棱两可的，可能无法直接回答用户的问题。在这种情况下，我们可以进行第二轮反思，以验证这些文档块是否能真正解决查询问题。</p>
<p>我们可以使用高效的反思方法（如自然语言推理（NLI）模型）进行反思，也可以使用互联网搜索等其他工具进行验证。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/self_reflection.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>自我反思的概念已在多篇论文或多个项目中进行了探讨，包括<a href="https://arxiv.org/pdf/2310.11511.pdf">Self-RAG</a>、<a href="https://arxiv.org/pdf/2401.15884.pdf">Corrective RAG</a>、<a href="https://github.com/langchain-ai/langgraph/blob/main/examples/reflexion/reflexion.ipynb">LangGraph</a> 等。</p>
<h3 id="Query-Routing-with-an-Agent" class="common-anchor-header">使用代理进行查询路由选择</h3><p>有时，我们不必使用 RAG 系统来回答简单的问题，因为它可能会导致更多的误解和对误导信息的推断。在这种情况下，我们可以在查询阶段使用代理作为路由器。这个 Agents 会评估查询是否需要通过 RAG 管道。如果需要，则启动后续的 RAG 管道；否则，LLM 直接处理查询。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/query_routing.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/query_routing_with_sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Agents 可以有多种形式，包括 LLM、小型分类模型，甚至是一组规则。</p>
<p>通过根据用户意图路由查询，可以重新定向部分查询，从而显著提高响应时间，并明显减少不必要的噪音。</p>
<p>我们可以将查询路由技术扩展到 RAG 系统内的其他流程，例如确定何时利用网络搜索等工具、进行子查询或搜索图片。这种方法可确保 RAG 系统中的每个步骤都能根据查询的具体要求进行优化，从而提高信息检索的效率和准确性。</p>
<h2 id="Summary" class="common-anchor-header">总结<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>普通的 RAG 管道看似简单，但要实现最佳的业务性能，往往需要更复杂的优化技术。</p>
<p>本文总结了提高 RAG 应用程序性能的各种常用方法。我们还提供了清晰的插图，帮助您快速理解这些概念和技术，并加快其实施和优化。</p>
<p>您可以通过此<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag">GitHub 链接</a>获得本文所列主要方法的简单实现。</p>
