---
id: use_milvus_in_anythingllm.md
summary: >-
  This guide will walk you through configuring Milvus as the vector database in
  AnythingLLM, enabling you to embed, store, and search your documents for
  intelligent retrieval and chat.
title: Use Milvus in AnythingLLM
---
<h1 id="Use-Milvus-in-AnythingLLM" class="common-anchor-header">Use Milvus in AnythingLLM<button data-href="#Use-Milvus-in-AnythingLLM" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://anythingllm.com/">AnythingLLM</a> is a powerful, privacy-focused, all-in-one AI desktop application that supports various LLMs, document types, and vector databases. It enables you to build a private, ChatGPT-like assistant that can run locally or be hosted remotely, allowing you to chat intelligently with any documents you provide.</p>
<p>This guide will walk you through configuring Milvus as the vector database in AnythingLLM, enabling you to embed, store, and search your documents for intelligent retrieval and chat.</p>
<blockquote>
<p>This tutorial is based on the official AnythingLLM documentation and real usage steps. If the UI or steps change, please refer to the latest official docs and feel free to suggest improvements.</p>
</blockquote>
<hr>
<h2 id="1-Prerequisites" class="common-anchor-header">1. Prerequisites<button data-href="#1-Prerequisites" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/docs/install-overview.md">Milvus</a> installed locally or a <a href="https://zilliz.com/cloud">Zilliz Cloud</a> account</li>
<li><a href="https://anythingllm.com/desktop">AnythingLLM Desktop</a> installed</li>
<li>Documents or data sources ready for upload and embedding (PDF, Word, CSV, web pages, etc.)</li>
</ul>
<hr>
<h2 id="2-Configure-Milvus-as-the-Vector-Database" class="common-anchor-header">2. Configure Milvus as the Vector Database<button data-href="#2-Configure-Milvus-as-the-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Open AnythingLLM and click the <strong>settings</strong> icon in the lower left corner<br>

  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/anythingllm_dashboard.png" alt="Open Settings" class="doc-image" id="open-settings" />
    <span>Open Settings</span>
  </span>
</li>
</ol>
<ol start="2">
<li><p>In the left menu, select <code translate="no">AI Providers</code> > <code translate="no">Vector Database</code>  <br>

  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/anythingllm_config.png" alt="Select Vector Database" class="doc-image" id="select-vector-database" />
    <span>Select Vector Database</span>
  </span>
</p></li>
<li><p>In the Vector Database Provider dropdown, select <strong>Milvus</strong> (or Zilliz Cloud)<br>

  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/anythingllm_vectordb.png" alt="Choose Milvus" class="doc-image" id="choose-milvus" />
    <span>Choose Milvus</span>
  </span>
</p></li>
<li><p>Fill in your Milvus connection details (for local Milvus). Here is an example:</p>
<ul>
<li><strong>Milvus DB Address</strong>: <code translate="no">http://localhost:19530</code></li>
<li><strong>Milvus Username</strong>: <code translate="no">root</code></li>
<li><strong>Milvus Password</strong>: <code translate="no">Milvus</code>

  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/anythingllm_milvus.png" alt="Milvus Connection" class="doc-image" id="milvus-connection" />
    <span>Milvus Connection</span>
  </span>
</li>
</ul>
<blockquote>
<p>If using Zilliz Cloud, enter your Cluster Endpoint and API Token instead:</p>
</blockquote>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/anythingllm_zilliz_cloud.png" alt="Zilliz Cloud Connection" class="doc-image" id="zilliz-cloud-connection" />
    <span>Zilliz Cloud Connection</span>
  </span>
</p></li>
<li><p>Click <strong>Save changes</strong> to apply your settings.</p></li>
</ol>
<hr>
<h2 id="3-Create-a-Workspace-and-Upload-Documents" class="common-anchor-header">3. Create a Workspace and Upload Documents<button data-href="#3-Create-a-Workspace-and-Upload-Documents" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Enter your workspace and click the <strong>upload</strong> icon to open the document upload dialog<br>

  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_file.png" alt="Open Upload Dialog" class="doc-image" id="open-upload-dialog" />
    <span>Open Upload Dialog</span>
  </span>
</p></li>
<li><p>You can upload a wide variety of data sources:</p>
<ul>
<li><strong>Local files</strong>: PDF, Word, CSV, TXT, audio files, etc.</li>
<li><strong>Web pages</strong>: Paste a URL and fetch website content directly.</li>
</ul>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_interface.png" alt="Upload Documents" class="doc-image" id="upload-documents" />
    <span>Upload Documents</span>
  </span>
</p></li>
<li><p>After uploading or fetching, click <strong>Move to Workspace</strong> to move the document or data into your current workspace<br>

  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/anythingllm_move_to_workspace.png" alt="Move to Workspace" class="doc-image" id="move-to-workspace" />
    <span>Move to Workspace</span>
  </span>
</p></li>
<li><p>Select the document or data and click <strong>Save and Embed</strong>. AnythingLLM will automatically chunk, embed, and store your content in Milvus<br>

  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/anythingllm_save_and_embed.png" alt="Save and Embed" class="doc-image" id="save-and-embed" />
    <span>Save and Embed</span>
  </span>
</p></li>
</ol>
<hr>
<h2 id="4-Chat-and-Retrieve-Answers-from-Milvus" class="common-anchor-header">4. Chat and Retrieve Answers from Milvus<button data-href="#4-Chat-and-Retrieve-Answers-from-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Return to the workspace chat interface and ask questions. AnythingLLM will search your Milvus vector database for relevant content and use the LLM to generate answers<br>

  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/anythingllm_chat.png" alt="Chat with Docs" class="doc-image" id="chat-with-docs" />
    <span>Chat with Docs</span>
  </span>
</li>
</ol>
<hr>
