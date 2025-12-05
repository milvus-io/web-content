---
id: kotaemon_with_milvus.md
summary: 本教程将指导您如何使用 Milvus 定制 kotaemon 应用程序。
title: 使用 Milvus 的 Kotaemon RAG
---
<h1 id="Kotaemon-RAG-with-Milvus" class="common-anchor-header">使用 Milvus 的 Kotaemon RAG<button data-href="#Kotaemon-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/Cinnamon/kotaemon">Kotaemon</a>是一款开源、简洁、可定制的 RAG UI，用于与您的文档聊天。它的构建同时考虑到了最终用户和开发人员。</p>
<p>Kotaemon 提供了一个可定制的多用户文档 QA Web-UI，支持本地和基于 API 的 LLMs。它提供了一个具有全文和向量检索功能的混合 RAG 管道、针对带有图表的文档的多模式 QA 以及带有文档预览功能的高级引用。它支持 ReAct 和 ReWOO 等复杂的推理方法，并为检索和生成提供可配置的设置。</p>
<p>本教程将指导您如何使用<a href="https://milvus.io/">Milvus</a> 自定义 kotaemon 应用程序。</p>
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
    </button></h2><h3 id="Installation" class="common-anchor-header">安装</h3><p>我们推荐使用这种方式安装 kotaemon：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># optional (setup env)</span>
conda create -n kotaemon python=3.10
conda activate kotaemon

git <span class="hljs-built_in">clone</span> https://github.com/Cinnamon/kotaemon
<span class="hljs-built_in">cd</span> kotaemon

pip install -e <span class="hljs-string">&quot;libs/kotaemon[all]&quot;</span>
pip install -e <span class="hljs-string">&quot;libs/ktem&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>除此以外，还有其他一些安装 kotaemon 的方法。详情请参考<a href="https://github.com/Cinnamon/kotaemon?tab=readme-ov-file#installation">官方文档</a>。</p>
<h3 id="Set-Milvus-as-the-default-vector-storage" class="common-anchor-header">将 Milvus 设置为默认向量存储空间</h3><p>要将默认向量存储改为 Milvus，必须修改<code translate="no">flowsettings.py</code> 文件，将<code translate="no">KH_VECTORSTORE</code> 切换为：</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;__type__&quot;</span>: <span class="hljs-string">&quot;kotaemon.storages.MilvusVectorStore&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Environment-Variables" class="common-anchor-header">设置环境变量</h3><p>您可以通过<code translate="no">.env</code> 文件配置模型，其中包含连接到 LLMs 和嵌入模型所需的信息。例如，OpenAI、Azure、Ollama 等。</p>
<h3 id="Run-Kotaemon" class="common-anchor-header">运行 Kotaemon</h3><p>设置好环境变量并更改向量存储后，就可以通过运行以下命令来运行 Kotaemon：</p>
<pre><code translate="no" class="language-shell">python app.py
<button class="copy-code-btn"></button></code></pre>
<p>默认用户名/密码为 <code translate="no">admin</code> /<code translate="no">admin</code></p>
<h2 id="Start-RAG-with-kotaemon" class="common-anchor-header">使用 kotaemon 启动 RAG<button data-href="#Start-RAG-with-kotaemon" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Add-your-AI-models" class="common-anchor-header">1.添加人工智能模型</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/kotaemon_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>在<code translate="no">Resources</code> 选项卡中，您可以添加和设置您的 LLMs 和 Embeddings 模型。您可以添加多个模型，并将它们设置为活动或非活动。您只需提供至少一个。您也可以提供多个模型，以便在它们之间切换。</p>
<h3 id="2-Upload-your-documents" class="common-anchor-header">2.上传文件</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/kotaemon_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>为了对文档进行质量保证，您需要先将文档上传到应用程序。导航到<code translate="no">File Index</code> 选项卡，您就可以上传和管理自定义文档。</p>
<p>默认情况下，所有应用程序数据都存储在<code translate="no">./ktem_app_data</code> 文件夹中。Milvus 数据库数据存储在<code translate="no">./ktem_app_data/user_data/vectorstore</code> 中。你可以备份或复制该文件夹，以便将安装转移到新机器上。</p>
<h3 id="3-Chat-with-your-documents" class="common-anchor-header">3.与文件聊天</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/kotaemon_3.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>现在返回<code translate="no">Chat</code> 选项卡。聊天 "选项卡由 3 个区域组成："对话设置面板"，用于管理对话和文件引用；"聊天面板"，用于与聊天机器人互动；以及 "信息面板"，用于显示支持证据、置信度分数和答案的相关性评级。</p>
<p>您可以在对话设置面板中选择文件。然后，只需在输入框中键入一条信息，就可以用文档启动 RAG，并将其发送给聊天机器人。</p>
<p>如果你想深入了解如何使用 kotaemon，可以从<a href="https://cinnamon.github.io/kotaemon/usage/">官方文档</a>中获得全面指导。</p>
