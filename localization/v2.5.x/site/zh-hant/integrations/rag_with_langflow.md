---
id: rag_with_langflow.md
summary: 本指南示範如何使用 Langflow 與 Milvus 建立檢索增強世代 (RAG) 管道。
title: 使用 Langflow 與 Milvus 建立 RAG 系統
---
<h1 id="Building-a-RAG-System-Using-Langflow-with-Milvus" class="common-anchor-header">使用 Langflow 與 Milvus 建立 RAG 系統<button data-href="#Building-a-RAG-System-Using-Langflow-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南示範如何使用<a href="https://www.langflow.org/">Langflow</a>與<a href="https://milvus.io/">Milvus</a> 建立檢索增強生成 (RAG) 管道。</p>
<p>RAG 系統會先從知識庫中擷取相關文件，然後根據此上下文產生新的回應，藉此增強文字的產生。Milvus 用於儲存和擷取文字內嵌，而 Langflow 則有助於將擷取和產生整合到可視化的工作流程中。</p>
<p>Langflow 可以輕鬆建構 RAG 管道，將大量文字嵌入、儲存在 Milvus 中，並在進行相關查詢時擷取。這可讓語言模型產生符合上下文的回應。</p>
<p>Milvus 可作為可擴充的向量資料庫，快速找到語意相似的文字，而 Langflow 則可讓您管理管道處理文字擷取和回應產生的方式。兩者結合起來，提供了一個有效率的方式來建立強大的 RAG 管道，以增強以文字為基礎的應用程式。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>在執行本筆記本之前，請確定您已安裝下列依賴項目：</p>
<pre><code translate="no" class="language-shell">$ python -m pip install langflow -U
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tutorial" class="common-anchor-header">教學<button data-href="#Tutorial" class="anchor-icon" translate="no">
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
    </button></h2><p>安裝好所有相依性後，請輸入下列指令啟動 Langflow 面板：</p>
<pre><code translate="no" class="language-shell">$ python -m langflow run
<button class="copy-code-btn"></button></code></pre>
<p>接著會彈出一個儀表板，如下所示：<span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_dashboard_start.png" alt="langflow" class="doc-image" id="langflow" /><span>langflow</span> </span></p>
<p>我們要建立一個<strong>Vector Store</strong>專案，所以我們首先要點選<strong>New Project</strong>按鈕。會彈出一個面板，我們選擇<strong>Vector Store RAG</strong>選項：<span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_dashboard_new_project.png" alt="panel" class="doc-image" id="panel" /><span>panel</span> </span></p>
<p>一旦成功建立 Vector Store Rag 專案，預設的向量儲存是 AstraDB，而我們想要使用 Milvus。所以我們需要用 Milvus 取代這兩個 astraDB 模組，才能使用 Milvus 作為向量儲存器。<span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_default_structure.png" alt="astraDB" class="doc-image" id="astradb" /><span>astraDB</span> </span></p>
<h3 id="Steps-to-replace-astraDB-with-Milvus" class="common-anchor-header">用 Milvus 取代 astraDB 的步驟：</h3><ol>
<li>移除向量儲存的現有卡片。在上圖中點選兩張標紅的 AstraDB 卡，按下<strong>backspace</strong>鍵刪除它們。</li>
<li>按一下側邊列中的<strong>Vector Store</strong>選項，選擇 Milvus 並將其拖曳到畫布中。這樣做兩次，因為我們需要 2 張 Milvus 卡，一張用於儲存檔案處理工作流程，一張用於搜尋工作流程。</li>
<li>將 Milvus 模組連結到其他元件。請參考下面的圖片。</li>
<li>為兩個 Milvus 模組設定 Milvus 認證。最簡單的方法是使用 Milvus Lite，將 Connection URI 設定為 milvus_demo.db。如果您有自部署的 Milvus 伺服器或在 Zilliz Cloud 上，請將 Connection URI 設定為伺服器端點，並將 Connection Password 設定為 token (對於 Milvus 是 &quot;<username>:<password>&quot;，對於 Zilliz Cloud 是 API Key)。請參考下圖：</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_milvus_structure.png" alt="Milvus Structure demo" class="doc-image" id="milvus-structure-demo" />
   </span> <span class="img-wrapper"> <span>Milvus 結構示範</span> </span></p>
<h3 id="Embed-knowledge-into-the-RAG-system" class="common-anchor-header">將知識嵌入 RAG 系統</h3><ol>
<li>透過左下方的檔案模組上載檔案作為 LLM 的知識庫。這裡我們上傳了一個包含 Milvus 簡介的檔案</li>
<li>按下右下方 Milvus 模組的 run 按鈕，執行插入工作流程。這將插入知識到 Milvus 向量存儲器中。</li>
<li>測試知識是否在記憶體中。打開 playground，詢問任何與您上傳檔案相關的問題。</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_why_milvus.png" alt="why milvus" class="doc-image" id="why-milvus" />
   </span> <span class="img-wrapper"> <span>為什麼選擇 Milvus</span> </span></p>
