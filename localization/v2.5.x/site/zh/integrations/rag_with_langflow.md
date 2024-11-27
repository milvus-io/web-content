---
id: rag_with_langflow.md
summary: 本指南演示了如何使用 Langflow 与 Milvus 一起构建检索增强生成（RAG）管道。
title: 使用 Langflow 和 Milvus 构建 RAG 系统
---
<h1 id="Building-a-RAG-System-Using-Langflow-with-Milvus" class="common-anchor-header">使用 Langflow 和 Milvus 构建 RAG 系统<button data-href="#Building-a-RAG-System-Using-Langflow-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南演示了如何使用<a href="https://www.langflow.org/">Langflow</a>与<a href="https://milvus.io/">Milvus</a> 一起构建检索增强生成（RAG）管道。</p>
<p>RAG 系统首先从知识库中检索相关文档，然后根据上下文生成新的响应，从而增强文本生成功能。Milvus 用于存储和检索文本嵌入，而 Langflow 则有助于在可视化工作流程中整合检索和生成。</p>
<p>Langflow 可以轻松构建 RAG 管道，将文本块嵌入其中，存储在 Milvus 中，并在进行相关查询时进行检索。这样，语言模型就能根据上下文生成响应。</p>
<p>Milvus 是一个可扩展的向量数据库，可以快速找到语义相似的文本，而 Langflow 则允许您管理管道处理文本检索和生成响应的方式。它们共同为基于文本的增强型应用提供了构建强大 RAG 管道的有效方法。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>在运行本笔记本之前，请确保您已安装以下依赖项：</p>
<pre><code translate="no" class="language-shell">$ python -m pip install langflow -U
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tutorial" class="common-anchor-header">教程<button data-href="#Tutorial" class="anchor-icon" translate="no">
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
    </button></h2><p>安装所有依赖项后，请输入以下命令启动 Langflow 面板：</p>
<pre><code translate="no" class="language-shell">$ python -m langflow run
<button class="copy-code-btn"></button></code></pre>
<p>然后会弹出一个仪表盘，如下所示：<span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_dashboard_start.png" alt="langflow" class="doc-image" id="langflow" /><span>langflow</span> </span></p>
<p>我们要创建一个<strong>Vector Store</strong>项目，所以首先要点击<strong>新建项目</strong>按钮。这时会弹出一个面板，我们选择<strong>向量存储 RAG</strong>选项：<span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_dashboard_new_project.png" alt="panel" class="doc-image" id="panel" /><span>panel</span> </span></p>
<p>Vector Store Rag 项目创建成功后，默认的向量存储是 AstraDB，而我们想使用 Milvus。因此，我们需要用 Milvus 替换这两个 astraDB 模块，以便使用 Milvus 作为向量存储。<span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_default_structure.png" alt="astraDB" class="doc-image" id="astradb" />astraDB </span></p>
<h3 id="Steps-to-replace-astraDB-with-Milvus" class="common-anchor-header">用 Milvus 替换 astraDB 的步骤：</h3><ol>
<li>删除现有的向量存储卡。点击上图中标红的两张 AstraDB 卡，按<strong>退格</strong>键删除它们。</li>
<li>点击侧边栏中的<strong>Vector Store</strong>选项，选择 Milvus 并将其拖入画布。这样做两次，因为我们需要 2 个 Milvus 卡，一个用于存储文件处理工作流，一个用于搜索工作流。</li>
<li>将 Milvus 模块链接到其余组件。请参考下图。</li>
<li>为两个 Milvus 模块配置 Milvus 凭据。最简单的方法是使用 Milvus Lite，将连接 URI 设置为 milvus_demo.db。如果您有自主部署的 Milvus 服务器或在 Zilliz Cloud 上，请将连接 URI 设置为服务器端点，将连接密码设置为令牌（对于 Milvus 是连接 &quot;<username>:<password>&quot;，对于 Zilliz Cloud 是 API Key）。请参考下图：</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_milvus_structure.png" alt="Milvus Structure demo" class="doc-image" id="milvus-structure-demo" />
   </span> <span class="img-wrapper"> <span>Milvus 结构演示</span> </span></p>
<h3 id="Embed-knowledge-into-the-RAG-system" class="common-anchor-header">将知识嵌入 RAG 系统</h3><ol>
<li>通过左下角的文件模块上传文件作为 LLM 的知识库。这里我们上传了一个包含 Milvus 简介的文件</li>
<li>按右下角 Milvus 模块上的运行按钮，运行插入工作流程。这将把知识插入 Milvus 向量存储中。</li>
<li>测试知识是否在内存中。打开 playground，询问与上传文件相关的任何问题。</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_why_milvus.png" alt="why milvus" class="doc-image" id="why-milvus" />
   </span> <span class="img-wrapper"> <span>为什么选择 Milvus？</span> </span></p>
