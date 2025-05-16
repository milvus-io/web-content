---
id: use_milvus_in_anythingllm.md
summary: 本指南將引導您在 AnythingLLM 中配置 Milvus 作為向量資料庫，讓您能夠嵌入、儲存和搜尋您的文件，以進行智慧型檢索和聊天。
title: 在AnythingLLM中使用Milvus
---
<h1 id="Use-Milvus-in-AnythingLLM" class="common-anchor-header">在AnythingLLM中使用Milvus<button data-href="#Use-Milvus-in-AnythingLLM" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://anythingllm.com/">AnythingLLM</a>是一個功能強大、注重隱私、多合一的 AI 桌面應用程式，支援各種 LLM、文件類型和向量資料庫。它可以讓您建立一個私人的、類似 ChatGPT 的助理，可以在本機執行或遠端託管，讓您可以與您提供的任何文件進行智慧型聊天。</p>
<p>本指南將教您如何在AnythingLLM中配置Milvus作為向量資料庫，使您能夠嵌入、儲存和搜索您的文件，進行智能檢索和聊天。</p>
<blockquote>
<p>本教學是基於官方 AnythingLLM 文件和實際使用步驟。如果UI或步驟有變更，請參考最新的官方文檔，並隨時提出改進建議。</p>
</blockquote>
<hr>
<h2 id="1-Prerequisites" class="common-anchor-header">1.先決條件<button data-href="#1-Prerequisites" class="anchor-icon" translate="no">
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
<li>本機已安裝<a href="https://milvus.io/docs/install-overview.md">Milvus</a>或有<a href="https://zilliz.com/cloud">Zilliz Cloud 帳號</a></li>
<li>已安裝<a href="https://anythingllm.com/desktop">AnythingLLM 桌面</a></li>
<li>準備好上傳和嵌入的文件或資料來源（PDF、Word、CSV、網頁等）</li>
</ul>
<hr>
<h2 id="2-Configure-Milvus-as-the-Vector-Database" class="common-anchor-header">2.設定 Milvus 為向量資料庫<button data-href="#2-Configure-Milvus-as-the-Vector-Database" class="anchor-icon" translate="no">
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
<li>打開AnythingLLM，點擊左下角的<strong>設置</strong>圖標<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_dashboard.png" alt="Open Settings" class="doc-image" id="open-settings" />
   </span> <span class="img-wrapper"> <span>打開設置</span> </span></li>
</ol>
<ol start="2">
<li><p>在左側菜單中，選擇<code translate="no">AI Providers</code> &gt;<code translate="no">Vector Database</code> <br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_config.png" alt="Select Vector Database" class="doc-image" id="select-vector-database" />
   </span> <span class="img-wrapper"> <span>選擇向量資料庫</span> </span></p></li>
<li><p>在向量資料庫提供者下拉選單中，選擇<strong>Milvus</strong>(或 Zilliz Cloud)<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_vectordb.png" alt="Choose Milvus" class="doc-image" id="choose-milvus" />
   </span> <span class="img-wrapper"> <span>選擇 Milvus</span> </span></p></li>
<li><p>填入您的 Milvus 連線詳細資料（適用於本機 Milvus）。以下是一個範例：</p>
<ul>
<li><strong>Milvus DB 地址：</strong> <code translate="no">http://localhost:19530</code></li>
<li><strong>Milvus 用戶名：</strong> <code translate="no">root</code></li>
<li><strong>Milvus 密碼</strong>：<code translate="no">Milvus</code>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_milvus.png" alt="Milvus Connection" class="doc-image" id="milvus-connection" />
   </span> <span class="img-wrapper"> <span>Milvus 連線</span> </span></li>
</ul>
<blockquote>
<p>如果使用 Zilliz Cloud，請輸入您的 Cluster Endpoint 和 API Token：</p>
</blockquote>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_zilliz_cloud.png" alt="Zilliz Cloud Connection" class="doc-image" id="zilliz-cloud-connection" />
   </span> <span class="img-wrapper"> <span>Zilliz Cloud 連線</span> </span></p></li>
<li><p>按一下<strong>儲存變更</strong>以套用您的設定。</p></li>
</ol>
<hr>
<h2 id="3-Create-a-Workspace-and-Upload-Documents" class="common-anchor-header">3.建立工作區並上傳文件<button data-href="#3-Create-a-Workspace-and-Upload-Documents" class="anchor-icon" translate="no">
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
<li><p>輸入您的工作區，然後按一下<strong>上傳</strong>圖示以開啟文件上傳對話框<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_file.png" alt="Open Upload Dialog" class="doc-image" id="open-upload-dialog" />
   </span> <span class="img-wrapper"> <span>開啟上傳對話框</span> </span></p></li>
<li><p>您可以上傳各種資料來源：</p>
<ul>
<li><strong>本機檔案</strong>：PDF、Word、CSV、TXT、音訊檔案等。</li>
<li><strong>網頁</strong>：貼上 URL 並直接取得網站內容。</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_interface.png" alt="Upload Documents" class="doc-image" id="upload-documents" />
   </span> <span class="img-wrapper"> <span>上傳文件</span> </span></p></li>
<li><p>上傳或取得內容後，按一下<strong>Move to Workspace</strong>可將文件或資料移動到目前的工作區中<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_move_to_workspace.png" alt="Move to Workspace" class="doc-image" id="move-to-workspace" />
   </span> <span class="img-wrapper"> <span>移動到工作區</span> </span></p></li>
<li><p>選擇文件或資料，然後點擊<strong>保存和嵌入</strong>。AnythingLLM 將自動分塊、嵌入並儲存您的內容到 Milvus 中。<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_save_and_embed.png" alt="Save and Embed" class="doc-image" id="save-and-embed" />
   </span> <span class="img-wrapper"> <span>儲存和嵌入</span> </span></p></li>
</ol>
<hr>
<h2 id="4-Chat-and-Retrieve-Answers-from-Milvus" class="common-anchor-header">4.聊天並從 Milvus 擷取答案<button data-href="#4-Chat-and-Retrieve-Answers-from-Milvus" class="anchor-icon" translate="no">
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
<li>回到工作區聊天介面並提出問題。AnythingLLM 將搜索您的 Milvus 向量資料庫中的相關內容，並使用 LLM 產生答案。<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_chat.png" alt="Chat with Docs" class="doc-image" id="chat-with-docs" />
   </span> <span class="img-wrapper"> <span>與文件聊天</span> </span></li>
</ol>
<hr>
