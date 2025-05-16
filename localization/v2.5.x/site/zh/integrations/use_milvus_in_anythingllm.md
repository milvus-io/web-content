---
id: use_milvus_in_anythingllm.md
summary: 本指南将指导您将 Milvus 配置为 AnythingLLM 中的向量数据库，使您能够嵌入、存储和搜索文档，实现智能检索和聊天。
title: 在 AnythingLLM 中使用 Milvus
---
<h1 id="Use-Milvus-in-AnythingLLM" class="common-anchor-header">在 AnythingLLM 中使用 Milvus<button data-href="#Use-Milvus-in-AnythingLLM" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://anythingllm.com/">AnythingLLM</a>是一款功能强大、注重隐私的一体化人工智能桌面应用程序，支持各种 LLMs、文档类型和向量数据库。它能让您建立一个类似于 ChatGPT 的私人助理，可以在本地运行，也可以远程托管，让您可以与您提供的任何文档进行智能聊天。</p>
<p>本指南将指导您在 AnythingLLM 中配置 Milvus 作为向量数据库，使您能够嵌入、存储和搜索您的文档，进行智能检索和聊天。</p>
<blockquote>
<p>本教程基于官方 AnythingLLM 文档和实际使用步骤。如果用户界面或步骤有变化，请参考最新的官方文档，并随时提出改进建议。</p>
</blockquote>
<hr>
<h2 id="1-Prerequisites" class="common-anchor-header">1.前提条件<button data-href="#1-Prerequisites" class="anchor-icon" translate="no">
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
<li>本地已安装<a href="https://milvus.io/docs/install-overview.md">Milvus</a>或有<a href="https://zilliz.com/cloud">Zilliz Cloud</a>账户</li>
<li>已安装<a href="https://anythingllm.com/desktop">AnythingLLM 桌面</a></li>
<li>准备好上传和嵌入的文档或数据源（PDF、Word、CSV、网页等）</li>
</ul>
<hr>
<h2 id="2-Configure-Milvus-as-the-Vector-Database" class="common-anchor-header">2.将 Milvus 配置为向量数据库<button data-href="#2-Configure-Milvus-as-the-Vector-Database" class="anchor-icon" translate="no">
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
<li>打开 AnythingLLM，点击左下角的<strong>设置</strong>图标<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_dashboard.png" alt="Open Settings" class="doc-image" id="open-settings" />
   </span> <span class="img-wrapper"> <span>打开设置</span> </span></li>
</ol>
<ol start="2">
<li><p>在左侧菜单中选择<code translate="no">AI Providers</code> &gt;<code translate="no">Vector Database</code> <br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_config.png" alt="Select Vector Database" class="doc-image" id="select-vector-database" />
   </span> <span class="img-wrapper"> <span>选择向量数据库</span> </span></p></li>
<li><p>在向量数据库提供者下拉菜单中，选择<strong>Milvus</strong>（或 Zilliz Cloud）<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_vectordb.png" alt="Choose Milvus" class="doc-image" id="choose-milvus" />
   </span> <span class="img-wrapper"> <span>选择 Milvus</span> </span></p></li>
<li><p>填写 Milvus 连接详情（本地 Milvus）。下面是一个例子：</p>
<ul>
<li><strong>Milvus DB 地址</strong>：<code translate="no">http://localhost:19530</code></li>
<li><strong>Milvus 用户名：</strong> <code translate="no">root</code></li>
<li><strong>Milvus 密码：</strong> <code translate="no">Milvus</code>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_milvus.png" alt="Milvus Connection" class="doc-image" id="milvus-connection" />
   </span> <span class="img-wrapper"> <span>Milvus 连接</span> </span></li>
</ul>
<blockquote>
<p>如果使用 Zilliz Cloud，请输入您的集群端点和 API 令牌：</p>
</blockquote>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_zilliz_cloud.png" alt="Zilliz Cloud Connection" class="doc-image" id="zilliz-cloud-connection" />
   </span> <span class="img-wrapper"> <span>Zilliz Cloud 连接</span> </span></p></li>
<li><p>单击<strong>保存更改</strong>应用您的设置。</p></li>
</ol>
<hr>
<h2 id="3-Create-a-Workspace-and-Upload-Documents" class="common-anchor-header">3.创建工作区并上传文档<button data-href="#3-Create-a-Workspace-and-Upload-Documents" class="anchor-icon" translate="no">
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
<li><p>输入工作区并单击<strong>上传</strong>图标打开文档上传对话框<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_file.png" alt="Open Upload Dialog" class="doc-image" id="open-upload-dialog" />
   </span> <span class="img-wrapper"> <span>打开上传对话框</span> </span></p></li>
<li><p>您可以上传多种数据源：</p>
<ul>
<li><strong>本地文件</strong>：PDF、Word、CSV、TXT、音频文件等。</li>
<li><strong>网页</strong>：粘贴 URL 并直接获取网站内容。</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_interface.png" alt="Upload Documents" class="doc-image" id="upload-documents" />
   </span> <span class="img-wrapper"> <span>上传文件</span> </span></p></li>
<li><p>上传或获取后，单击 "<strong>移动到工作区</strong>"将文档或数据移动到当前工作区<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_move_to_workspace.png" alt="Move to Workspace" class="doc-image" id="move-to-workspace" />
   </span> <span class="img-wrapper"> <span>移动到工作区</span> </span></p></li>
<li><p>选择文档或数据，点击 "<strong>保存并嵌入</strong>"。AnythingLLM 会自动将您的内容分块、嵌入并存储到 Milvus 中。<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_save_and_embed.png" alt="Save and Embed" class="doc-image" id="save-and-embed" />
   </span> <span class="img-wrapper"> <span>保存并嵌入</span> </span></p></li>
</ol>
<hr>
<h2 id="4-Chat-and-Retrieve-Answers-from-Milvus" class="common-anchor-header">4.聊天并从 Milvus 获取答案<button data-href="#4-Chat-and-Retrieve-Answers-from-Milvus" class="anchor-icon" translate="no">
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
<li>返回工作区聊天界面并提问。AnythingLLM 将搜索您的 Milvus 向量数据库中的相关内容，并使用 LLM 生成答案<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_chat.png" alt="Chat with Docs" class="doc-image" id="chat-with-docs" />
   </span> <span class="img-wrapper"> <span>与文档聊天</span> </span></li>
</ol>
<hr>
