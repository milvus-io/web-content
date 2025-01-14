---
id: use_milvus_in_private_gpt.md
summary: 在本教程中，我們將教您如何使用 Milvus 作為 PrivateGPT 的後端向量資料庫。
title: 在 PrivateGPT 中使用 Milvus
---
<h1 id="Use-Milvus-in-PrivateGPT" class="common-anchor-header">在 PrivateGPT 中使用 Milvus<button data-href="#Use-Milvus-in-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://privategpt.dev/">PrivateGPT</a>是一個生產就緒的 AI 專案，可讓使用者在沒有網際網路連線的情況下，使用大型語言模型針對他們的文件提出問題，同時確保 100% 的隱私。PrivateGPT 提供的 API 分為高階與低階區塊。它也提供 Gradio UI 用戶端和有用的工具，例如大量模型下載腳本和攝取腳本。從概念上來看，PrivateGPT 包覆了 RAG 管道並公開其基元，可立即使用並提供 API 和 RAG 管道的完整實作。</p>
<p>在本教程中，我們將教您如何使用 Milvus 作為 PrivateGPT 的後端向量資料庫。</p>
<div class="alert note">
<p>本教學主要參考<a href="https://docs.privategpt.dev/installation/getting-started/installation">PrivateGPT</a>官方安裝指南。如果您發現本教學有過時的部分，您可以優先按照官方指南，並向我們提出問題。</p>
</div>
<h2 id="Base-requirements-to-run-PrivateGPT" class="common-anchor-header">執行 PrivateGPT 的基本需求<button data-href="#Base-requirements-to-run-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Clone-the-PrivateGPT-Repository" class="common-anchor-header">1.克隆 PrivateGPT 儲存庫</h3><p>複製儲存庫並導航到它：</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/zylon-ai/private-gpt
$ <span class="hljs-built_in">cd</span> private-gpt
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Poetry" class="common-anchor-header">2.安裝 Poetry</h3><p>安裝<a href="https://python-poetry.org/docs/#installing-with-the-official-installer">Poetry</a>用於依賴管理：依照 Poetry 官方網站的指示安裝。</p>
<h3 id="3-Optional-Install-make" class="common-anchor-header">3.（可選）安裝 make</h3><p>若要執行各種腳本，您需要安裝 make。</p>
<p>macOS (使用 Homebrew)：</p>
<pre><code translate="no" class="language-shell">$ brew install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<p>Windows (使用 Chocolatey)：</p>
<pre><code translate="no" class="language-shell">$ choco install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Available-Modules" class="common-anchor-header">安裝可用模組<button data-href="#Install-Available-Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>PrivateGPT 允許自訂某些模組的設定，例如 LLM、Embeddings、Vector Stores、UI。</p>
<p>在本教程中，我們將使用下列模組：</p>
<ul>
<li><strong>LLM</strong>: Ollama</li>
<li><strong>嵌入</strong>：Ollama</li>
<li><strong>向量儲存</strong>：Milvus</li>
<li><strong>UI</strong>：Gradio</li>
</ul>
<p>執行以下指令，使用 poetry 安裝所需的模組相依性：</p>
<pre><code translate="no" class="language-shell">$ poetry install --extras <span class="hljs-string">&quot;llms-ollama embeddings-ollama vector-stores-milvus ui&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Ollama-service" class="common-anchor-header">啟動 Ollama 服務<button data-href="#Start-Ollama-service" class="anchor-icon" translate="no">
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
    </button></h2><p>前往<a href="https://ollama.com/">ollama.ai</a>，依照指示在您的機器上安裝 Ollama。</p>
<p>安裝完成後，確定 Ollama 桌面應用程式已關閉。</p>
<p>現在，啟動 Ollama 服務（它會啟動本機推理伺服器，同時為 LLM 和 Embeddings 服務）：</p>
<pre><code translate="no" class="language-shell">$ ollama serve
<button class="copy-code-btn"></button></code></pre>
<p>安裝要使用的模型，預設<code translate="no">settings-ollama.yaml</code> 設定為使用者<code translate="no">llama3.1</code> 8b LLM (~4GB) 和<code translate="no">nomic-embed-text</code> Embeddings (~275MB)</p>
<p>預設情況下，PrivateGPT 會根據需要自動拉取模型。這個行為可以透過修改<code translate="no">ollama.autopull_models</code> 屬性來改變。</p>
<p>無論如何，如果您想要手動拉取模型，請執行下列指令：</p>
<pre><code translate="no" class="language-shell">$ ollama pull llama3.1
$ ollama pull nomic-embed-text
<button class="copy-code-btn"></button></code></pre>
<p>您可以選擇性地在<code translate="no">settings-ollama.yaml</code> 檔案中變更到您最喜愛的模型，然後手動拉取它們。</p>
<h2 id="Change-Milvus-Settings" class="common-anchor-header">變更 Milvus 設定<button data-href="#Change-Milvus-Settings" class="anchor-icon" translate="no">
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
    </button></h2><p>在檔案<code translate="no">settings-ollama.yaml</code>, 設定 vectorstore 為 milvus：</p>
<pre><code translate="no" class="language-yaml">vectorstore:
  database: milvus
<button class="copy-code-btn"></button></code></pre>
<p>您也可以加入一些 cumstom Milvus 設定來指定您的設定。 像這樣：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">milvus</span>:
  <span class="hljs-attr">uri</span>: <span class="hljs-attr">http</span>:<span class="hljs-comment">//localhost:19530</span>
  <span class="hljs-attr">collection_name</span>: my_collection
<button class="copy-code-btn"></button></code></pre>
<p>可用的設定選項有</p>
<table>
<thead>
<tr><th>欄位 選項</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td>uri</td><td>預設為 "local_data/private_gpt/milvus/milvus_local.db" 作為本機檔案；您也可以在 docker 或 k8s 上設定效能較高的 Milvus 伺服器，例如 http://localhost:19530，作為您的 uri；若要使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>，請將 uri 和 token 調整為 Zilliz Cloud 的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint 和 API key</a>。</td></tr>
<tr><td>令牌</td><td>與 docker 或 k8s 上的 Milvus 伺服器或 Zilliz Cloud 的 api key 配對。</td></tr>
<tr><td>集合名稱</td><td>collection 的名稱，設定為預設的 "milvus_db"。</td></tr>
<tr><td>覆寫</td><td>覆寫資料集中已存在的資料，預設為 True。</td></tr>
</tbody>
</table>
<h2 id="Start-PrivateGPT" class="common-anchor-header">啟動 PrivateGPT<button data-href="#Start-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>完成所有設定後，您就可以使用 Gradio UI 執行 PrivateGPT。</p>
<pre><code translate="no" class="language-shell">PGPT_PROFILES=ollama <span class="hljs-built_in">make</span> run
<button class="copy-code-btn"></button></code></pre>
<p>UI 的網址是<code translate="no">http://0.0.0.0:8001</code> 。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/private_gpt_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>您可以玩弄 UI 並詢問關於您的文件的問題。</p>
<p>如需更多詳細資訊，請參閱<a href="https://docs.privategpt.dev/">PrivateGPT</a>官方說明文件。</p>
