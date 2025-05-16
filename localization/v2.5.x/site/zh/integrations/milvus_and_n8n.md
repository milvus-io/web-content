---
id: milvus_and_n8n.md
summary: >-
  n8n 是一个功能强大的开源工作流自动化平台，可将各种应用程序、服务和 API 连接在一起，无需编码即可创建自动化工作流。n8n
  采用基于节点的可视化界面，用户只需连接代表不同服务或操作的节点，即可构建复杂的自动化流程。它可自行托管，具有高度可扩展性，并支持公平代码和企业许可。
title: 开始使用 Milvus 和 n8n
---
<h1 id="Getting-Started-with-Milvus-and-n8n" class="common-anchor-header">Milvus 和 n8n 入门<button data-href="#Getting-Started-with-Milvus-and-n8n" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="common-anchor-header">n8n 和 Milvus 向量存储节点介绍<button data-href="#Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://n8n.io/">n8n</a>是一个功能强大的开源工作流自动化平台，允许用户将各种应用程序、服务和 API 连接在一起，无需编码即可创建自动化工作流。n8n 采用基于节点的可视化界面，用户只需连接代表不同服务或操作的节点，即可构建复杂的自动化流程。它可自行托管，具有高度可扩展性，并支持公平代码和企业许可。</p>
<p>n8n 中的<strong>Milvus 向量存储</strong>节点将<a href="https://milvus.io/">Milvus</a>集成到您的自动化工作流程中。这样，您就可以在 n8n 生态系统中执行语义搜索，为检索增强生成（RAG）系统提供动力，并构建智能 AI 应用程序。</p>
<p>本文档主要基于<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">n8n Milvus Vector Store</a> 官方<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">文档</a>。如果您发现任何过时或不一致的内容，请优先使用官方文档，并随时向我们提出问题。</p>
<h2 id="Key-Features" class="common-anchor-header">主要功能<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>通过 n8n 中的 Milvus 向量存储节点，您可以</p>
<ul>
<li>以<a href="https://docs.n8n.io/glossary/#ai-vector-store">向量存储</a>的方式与你的 Milvus 数据库互动</li>
<li>向 Milvus 插入文档</li>
<li>从 Milvus 获取文档</li>
<li>检索文件，将其提供给连接到<a href="https://docs.n8n.io/glossary/#ai-chain">链</a>上的检索器</li>
<li>作为<a href="https://docs.n8n.io/glossary/#ai-tool">工具</a>直接连接<a href="https://docs.n8n.io/glossary/#ai-agent">Agents</a></li>
<li>根据元数据过滤文档</li>
</ul>
<h2 id="Node-Usage-Patterns" class="common-anchor-header">节点使用模式<button data-href="#Node-Usage-Patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>你可以在 n8n 中以以下模式使用 Milvus 向量存储节点。</p>
<h3 id="Use-as-a-regular-node-to-insert-and-retrieve-documents" class="common-anchor-header">作为常规节点插入和检索文档</h3><p>你可以把 Milvus 向量存储作为一个常规节点来插入或获取文档。这种模式把 Milvus 向量存储放在常规连接流中，而不使用 Agents。</p>
<p>请参阅本<a href="https://n8n.io/workflows/3573-create-a-rag-system-with-paul-essays-milvus-and-openai-for-cited-answers/">示例模板</a>，了解如何构建一个在 Milvus 中存储文档并检索文档的系统，以支持引用、基于聊天的回答。</p>
<h3 id="Connect-directly-to-an-AI-agent-as-a-tool" class="common-anchor-header">作为工具直接连接人工智能 Agents</h3><p>你可以将 Milvus 向量存储节点直接连接到<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/">人工智能 Agents</a>的工具连接器，以便在回答查询时使用向量存储作为资源。</p>
<p>连接方式如下AI 代理（工具连接器）-&gt; Milvus 向量存储节点。请看这个<a href="https://n8n.io/workflows/3576-paul-graham-essay-search-and-chat-with-milvus-vector-database/">示例模板</a>，数据被 Embeddings 并索引到 Milvus 中，AI Agent 将向量存储作为知识工具用于回答问题。</p>
<h3 id="Use-a-retriever-to-fetch-documents" class="common-anchor-header">使用检索器获取文档</h3><p>你可以将向量<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/">存储检索器</a>节点与 Milvus 向量存储节点一起使用，从 Milvus 向量存储节点中获取文档。这通常与<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/">问答链</a>节点一起使用，以便从向量存储中获取与给定聊天输入相匹配的文档。</p>
<p>典型的节点连接流程如下：问答链（Retriever 连接器）-&gt; 向量存储 Retriever（向量存储连接器）-&gt; Milvus 向量存储。</p>
<p>查看这个<a href="https://n8n.io/workflows/3574-create-a-paul-graham-essay-qanda-system-with-openai-and-milvus-vector-database/">工作流程示例</a>，了解如何将外部数据摄入 Milvus 并构建基于聊天的语义问答系统。</p>
<h3 id="Use-the-Vector-Store-Question-Answer-Tool-to-answer-questions" class="common-anchor-header">使用 Vector Store 问题解答工具回答问题</h3><p>另一种模式是使用<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">Vector Store Question Answer Tool（向量存储问题解答工具</a>）来汇总 Milvus Vector Store 节点的结果并回答问题。这种模式不是直接连接 Milvus 向量存储作为一个工具，而是使用一个专门用于汇总向量存储中数据的工具。</p>
<p>连接流程如下人工智能代理（工具连接器）-&gt; 向量存储问题解答工具（向量存储连接器）-&gt; Milvus 向量存储。</p>
<h2 id="Node-Operation-Modes" class="common-anchor-header">节点操作符<button data-href="#Node-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 向量存储节点支持多种操作模式，每种模式都是为不同的工作流程用例量身定制的。了解这些模式有助于设计更有效的工作流程。</p>
<p>下面我们将提供可用操作模式和选项的高级概览。有关每种模式的输入参数和配置选项的完整列表，请参阅<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">官方文档</a>。</p>
<hr>
<h3 id="Operation-Modes-Overview" class="common-anchor-header">操作模式概述</h3><p>Milvus 向量存储节点支持四种不同的模式：</p>
<ul>
<li><strong>获取多个</strong>：根据与提示语义的相似性检索多个文档。</li>
<li><strong>插入文档</strong>：向您的 Milvus Collections 中插入新文档。</li>
<li><strong>检索文档（作为链/工具的向量存储）</strong>：在基于链的系统中将节点用作检索器。</li>
<li><strong>检索文件（作为人工智能 Agents 的工具）</strong>：在回答问题时，将节点用作人工智能代理的工具资源。</li>
</ul>
<h3 id="Additional-Node-Options" class="common-anchor-header">其他节点选项</h3><ul>
<li><strong>元数据过滤器</strong>（仅限 "获取许多 "模式）：根据自定义元数据关键字过滤结果。多个字段应用 AND 条件。</li>
<li><strong>清除 Collections</strong>（仅限插入文档模式）：在插入新文档之前从 Collections 中删除现有文档。</li>
</ul>
<h3 id="Related-Resources" class="common-anchor-header">相关资源</h3><ul>
<li><a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">n8n Milvus 集成文档</a></li>
<li><a href="https://js.langchain.com/docs/integrations/vectorstores/milvus/">LangChain Milvus 文档</a></li>
<li><a href="https://docs.n8n.io/advanced-ai/">n8n 高级人工智能文档</a></li>
</ul>
