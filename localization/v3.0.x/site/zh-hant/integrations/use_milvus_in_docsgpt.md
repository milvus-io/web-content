---
id: use_milvus_in_docsgpt.md
summary: 在本教程中，我們將教您如何使用 Milvus 作為 DocsGPT 的後端向量資料庫。
title: 在 DocsGPT 中使用 Milvus
---
<h1 id="Use-Milvus-in-DocsGPT" class="common-anchor-header">在 DocsGPT 中使用 Milvus<button data-href="#Use-Milvus-in-DocsGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/arc53/DocsGPT">DocsGPT</a>是一個先進的開放原始碼解決方案，它透過整合強大的 GPT 模型，簡化了在專案文件中尋找資訊的過程。它能讓開發人員輕鬆獲得有關專案問題的準確答案，省去耗時的手動搜尋。</p>
<p>在本教程中，我們將教您如何使用 Milvus 作為 DocsGPT 的後端向量資料庫。</p>
<div class="alert note">
<p>本教學主要參考<a href="https://github.com/arc53/DocsGPT?tab=readme-ov-file#quickstart">DocsGPT</a>官方安裝指南。如果您發現本教程有過時的部分，您可以優先按照官方指南進行，並向我們提出問題。</p>
</div>
<h2 id="Requirements" class="common-anchor-header">安裝需求<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>確認您已經安裝<a href="https://docs.docker.com/engine/install/">Docker</a></p>
<h2 id="Clone-the-repository" class="common-anchor-header">複製套件庫<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><p>克隆儲存庫並導航到它：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/arc53/DocsGPT.git</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> DocsGPT</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-dependency" class="common-anchor-header">新增依賴<button data-href="#Add-dependency" class="anchor-icon" translate="no">
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
    </button></h2><p>將<code translate="no">langchain-milvus</code> 依賴附加到<code translate="no">application</code> 資料夾下的<code translate="no">requirements.txt</code> 檔案：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;\nlangchain-milvus==0.1.6&quot;</span> &gt;&gt; ./application/requirements.txt</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-environment-variables" class="common-anchor-header">設定環境變數<button data-href="#Set-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p>在<code translate="no">docker-compose.yaml</code> 檔案中，將<code translate="no">VECTOR_STORE=milvus</code>,<code translate="no">MILVUS_URI=...</code>,<code translate="no">MILVUS_TOKEN=...</code> 加入<code translate="no">backend</code> 和<code translate="no">worker</code> 服務的環境變數，就像這樣：</p>
<pre><code translate="no" class="language-yaml">  <span class="hljs-attr">backend:</span>
    <span class="hljs-attr">build:</span> <span class="hljs-string">./application</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">VECTOR_STORE=milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_URI=...</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_TOKEN=...</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-yaml">  <span class="hljs-attr">worker:</span>
    <span class="hljs-attr">build:</span> <span class="hljs-string">./application</span>
    <span class="hljs-attr">command:</span> <span class="hljs-string">celery</span> <span class="hljs-string">-A</span> <span class="hljs-string">application.app.celery</span> <span class="hljs-string">worker</span> <span class="hljs-string">-l</span> <span class="hljs-string">INFO</span> <span class="hljs-string">-B</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">VECTOR_STORE=milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_URI=...</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_TOKEN=...</span>
<button class="copy-code-btn"></button></code></pre>
<p>對於<code translate="no">MILVUS_URI</code> 和<code translate="no">MILVUS_TOKEN</code> ，您可以使用完全管理的<a href="https://zilliz.com/cloud">Zilliz Cloud</a>(Recommended) 服務或手動啟動的 Milvus 服務。</p>
<ul>
<li><p>對於完全管理的 Zilliz Cloud 服務：我們建議使用 Zilliz Cloud 服務。您可以在<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 上註冊免費試用帳號。之後，您將獲得<code translate="no">MILVUS_URI</code> 和<code translate="no">MILVUS_TOKEN</code> ，它們對應於<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">公共端點和 API 金鑰</a>。</p></li>
<li><p>用於手動啟動 Milvus 服務：如果您想要設定 Milvus 服務，您可以依照<a href="https://milvus.io/docs/install_standalone-docker-compose.md">Milvus 官方文件</a>設定 Milvus 伺服器，然後從伺服器取得<code translate="no">MILVUS_URI</code> 和<code translate="no">MILVUS_TOKEN</code> 。<code translate="no">MILVUS_URI</code> 和<code translate="no">MILVUS_TOKEN</code> 的格式分別為<code translate="no">http://&lt;your_server_ip&gt;:19530</code> 和<code translate="no">&lt;your_username&gt;:&lt;your_password&gt;</code> 。</p></li>
</ul>
<h2 id="Start-the-services" class="common-anchor-header">啟動服務<button data-href="#Start-the-services" class="anchor-icon" translate="no">
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
    </button></h2><p>執行：<code translate="no">./setup.sh</code></p>
<p>然後瀏覽 http://localhost:5173/。</p>
<p>您可以玩弄 UI 並提出有關文件的問題。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/doscgpt_ui.png" alt="alt text" class="doc-image" id="alt-text" />
   </span> <span class="img-wrapper"> <span>選取文字</span> </span></p>
<p>如果要停止服務，執行：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose down</span>
<button class="copy-code-btn"></button></code></pre>
<p>如需更多詳細資訊和更進階的設定，請參閱<a href="https://github.com/arc53/DocsGPT">DocsGPT</a>官方文件。</p>
