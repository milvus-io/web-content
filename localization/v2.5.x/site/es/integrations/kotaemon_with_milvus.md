---
id: kotaemon_with_milvus.md
summary: >-
  This tutorial will guide you on how to customize your kotaemon application
  using Milvus.
title: Kotaemon RAG with Milvus
---
<h1 id="Kotaemon-RAG-with-Milvus" class="common-anchor-header">Kotaemon RAG with Milvus<button data-href="#Kotaemon-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/Cinnamon/kotaemon">Kotaemon</a> is an open-source clean &amp; customizable RAG UI for chatting with your documents. Built with both end users and developers in mind.</p>
<p>Kotaemon provides a customizable, multi-user document QA web-UI supporting local and API-based LLMs. It offers a hybrid RAG pipeline with full-text and vector retrieval, multi-modal QA for documents with figures and tables, and advanced citations with document previews. It supports complex reasoning methods like ReAct and ReWOO, and provides configurable settings for retrieval and generation.</p>
<p>This tutorial will guide you on how to customize your kotaemon application using <a href="https://milvus.io/">Milvus</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Installation" class="common-anchor-header">Installation</h3><p>We recommend installing kotaemon in this way:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># optional (setup env)</span>
conda create -n kotaemon python=3.10
conda activate kotaemon

git <span class="hljs-built_in">clone</span> https://github.com/Cinnamon/kotaemon
<span class="hljs-built_in">cd</span> kotaemon

pip install -e <span class="hljs-string">&quot;libs/kotaemon[all]&quot;</span>
pip install -e <span class="hljs-string">&quot;libs/ktem&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Besides this way, there are some other ways to install kotaemon. You can refer to the <a href="https://github.com/Cinnamon/kotaemon?tab=readme-ov-file#installation">official documentation</a> for more details.</p>
<h3 id="Set-Milvus-as-the-default-vector-storage" class="common-anchor-header">Set Milvus as the default vector storage</h3><p>To change the default vector storage to Milvus, you have to modify the <code translate="no">flowsettings.py</code> file by switching <code translate="no">KH_VECTORSTORE</code> to:</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;__type__&quot;</span>: <span class="hljs-string">&quot;kotaemon.storages.MilvusVectorStore&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Environment-Variables" class="common-anchor-header">Set Environment Variables</h3><p>you can configure the models via the <code translate="no">.env</code> file with the information needed to connect to the LLMs and embedding models. e.g. OpenAI, Azure, Ollama, etc.</p>
<h3 id="Run-Kotaemon" class="common-anchor-header">Run Kotaemon</h3><p>After setting up the environment variables and changing the vector storage, you can run kotaemon by running the following command:</p>
<pre><code translate="no" class="language-shell">python app.py
<button class="copy-code-btn"></button></code></pre>
<p>Default username / password are: <code translate="no">admin</code> / <code translate="no">admin</code></p>
<h2 id="Start-RAG-with-kotaemon" class="common-anchor-header">Start RAG with kotaemon<button data-href="#Start-RAG-with-kotaemon" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Add-your-AI-models" class="common-anchor-header">1. Add your AI models</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/kotaemon_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>In the <code translate="no">Resources</code> tab, you can add and set your LLMs and embedding models. You can add multiple models and set them as active or inactive. You only need to provide at least one. You can also provide multiple models to allow switching between them.</p>
<h3 id="2-Upload-your-documents" class="common-anchor-header">2. Upload your documents</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/kotaemon_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>In order to do QA on your documents, you need to upload them to the application first.
Navigate to the <code translate="no">File Index</code> tab, and you can upload and manage your custom documents.</p>
<p>By default, all application data are stored in <code translate="no">./ktem_app_data</code> folder. The Milvus database data is stored in <code translate="no">./ktem_app_data/user_data/vectorstore</code>. You can back up or copy this folder to move your installation to a new machine.</p>
<h3 id="3-Chat-with-your-documents" class="common-anchor-header">3. Chat with your documents</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/kotaemon_3.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Now navigate back to the <code translate="no">Chat</code> tab. The Chat tab consists of 3 regions: the Conversation Settings Panel, where you manage conversations and file references; the Chat Panel for interacting with the chatbot; and the Information Panel, which displays supporting evidence, confidence scores, and relevance ratings for answers.</p>
<p>You can select your documents in the Conversation Settings Panel. Then just start RAG with your documents by typing a message in the input box and send it to the chatbot.</p>
<p>If you want to dive deep into how to use kotaemon, you can get a full guidance from the <a href="https://cinnamon.github.io/kotaemon/usage/">official documentation</a>.</p>
