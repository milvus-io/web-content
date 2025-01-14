---
id: kotaemon_with_milvus.md
summary: 本教學將引導您如何使用 Milvus 自訂您的 kotaemon 應用程式。
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
    </button></h1><p><a href="https://github.com/Cinnamon/kotaemon">Kotaemon</a>是一個開放原始碼、簡潔且可自訂的 RAG UI，用來與您的文件聊天。以最終使用者和開發者為中心而建立。</p>
<p>Kotaemon 提供可客製化、多使用者的文件 QA 網頁使用者介面，支援本機和以 API 為基礎的 LLM。它提供混合 RAG 輸送管道，包含全文檢索與向量檢索、含圖表文件的多模式 QA，以及含文件預覽的進階引文。它支援 ReAct 和 ReWOO 等複雜的推理方法，並提供可設定的擷取與產生設定。</p>
<p>本教學將引導您如何使用<a href="https://milvus.io/">Milvus</a> 自訂您的 kotaemon 應用程式。</p>
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
    </button></h2><h3 id="Installation" class="common-anchor-header">安裝</h3><p>我們建議使用此方式安裝 kotaemon：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># optional (setup env)</span>
conda create -n kotaemon python=3.10
conda activate kotaemon

git <span class="hljs-built_in">clone</span> https://github.com/Cinnamon/kotaemon
<span class="hljs-built_in">cd</span> kotaemon

pip install -e <span class="hljs-string">&quot;libs/kotaemon[all]&quot;</span>
pip install -e <span class="hljs-string">&quot;libs/ktem&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>除了這種方式，還有一些其他的方式來安裝 kotaemon。您可以參考<a href="https://github.com/Cinnamon/kotaemon?tab=readme-ov-file#installation">官方文件</a>以獲得更多詳細資訊。</p>
<h3 id="Set-Milvus-as-the-default-vector-storage" class="common-anchor-header">設定 Milvus 為預設向量儲存空間</h3><p>若要變更預設向量儲存為 Milvus，您必須修改<code translate="no">flowsettings.py</code> 檔案，將<code translate="no">KH_VECTORSTORE</code> 切換為：</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;__type__&quot;</span>: <span class="hljs-string">&quot;kotaemon.storages.MilvusVectorStore&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Environment-Variables" class="common-anchor-header">設定環境變數</h3><p>您可以透過<code translate="no">.env</code> 檔案，設定連接 LLM 和嵌入模型所需的資訊。例如：OpenAI、Azure、Ollama 等。</p>
<h3 id="Run-Kotaemon" class="common-anchor-header">執行 Kotaemon</h3><p>設定環境變數並變更向量儲存後，您可以執行以下指令來執行 kotaemon：</p>
<pre><code translate="no" class="language-shell">python app.py
<button class="copy-code-btn"></button></code></pre>
<p>預設使用者名稱 / 密碼為 <code translate="no">admin</code> /<code translate="no">admin</code></p>
<h2 id="Start-RAG-with-kotaemon" class="common-anchor-header">使用 kotaemon 啟動 RAG<button data-href="#Start-RAG-with-kotaemon" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Add-your-AI-models" class="common-anchor-header">1.新增您的 AI 模型</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/kotaemon_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>在<code translate="no">Resources</code> 標籤中，您可以新增並設定您的 LLM 和嵌入模型。您可以新增多個模型，並將它們設定為作用中或非作用中。您只需要提供至少一個。您也可以提供多個模型，以便在它們之間切換。</p>
<h3 id="2-Upload-your-documents" class="common-anchor-header">2.上傳您的文件</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/kotaemon_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>為了對您的文件進行 QA，您需要先將它們上傳到應用程式。導覽到<code translate="no">File Index</code> 索引標籤，您就可以上傳和管理您的自訂文件。</p>
<p>預設情況下，所有應用程式資料都儲存在<code translate="no">./ktem_app_data</code> 資料夾。Milvus 資料庫資料儲存在<code translate="no">./ktem_app_data/user_data/vectorstore</code> 。您可以備份或複製這個資料夾，以便將安裝移到新的機器上。</p>
<h3 id="3-Chat-with-your-documents" class="common-anchor-header">3.與您的文件聊天</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/kotaemon_3.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>現在導航回到<code translate="no">Chat</code> 標籤。聊天」標籤由 3 個區域組成：「會談設定面板」，您可在此管理會談和檔案參考；「聊天面板」，用於與聊天機器人互動；以及「資訊面板」，用於顯示支持證據、置信度分數和答案的相關性評分。</p>
<p>您可以在「會話設定面板」中選擇您的文件。然後只要在輸入框中輸入訊息，就可以用您的文件啟動 RAG，並將訊息傳送給聊天機器人。</p>
<p>如果您想深入了解如何使用 kotaemon，您可以從<a href="https://cinnamon.github.io/kotaemon/usage/">官方文件</a>獲得完整的指導。</p>
