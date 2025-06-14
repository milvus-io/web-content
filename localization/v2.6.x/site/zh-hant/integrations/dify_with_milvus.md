---
id: dify_with_milvus.md
summary: 在本教程中，我們將教您如何使用 Milvus 部署 Dify，以實現高效的檢索和 RAG 引擎。
title: 使用 Milvus 部署 Dify
---
<h1 id="Deploying-Dify-with-Milvus" class="common-anchor-header">使用 Milvus 部署 Dify<button data-href="#Deploying-Dify-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://dify.ai/">Dify</a>是一個開放原始碼平台，旨在透過結合 Backend-as-a-Service 與 LLMOps 來簡化 AI 應用程式的建置。它支援主流的 LLM，提供直覺的提示協調介面、高品質的 RAG 引擎以及彈性的 AI 代理框架。Dify 具備低程式碼工作流程、易於使用的介面和 API，讓開發人員和非技術使用者都能專注於建立創新、真實世界的 AI 解決方案，而無需處理複雜的問題。</p>
<p>在本教程中，我們將教您如何使用 Milvus 部署 Dify，以實現高效的檢索和 RAG 引擎。</p>
<h2 id="Clone-the-Repository" class="common-anchor-header">克隆儲存庫<button data-href="#Clone-the-Repository" class="anchor-icon" translate="no">
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
    </button></h2><p>克隆 Dify 原始碼到您的本機：</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-the-Environment-Variables" class="common-anchor-header">設定環境變數<button data-href="#Set-the-Environment-Variables" class="anchor-icon" translate="no">
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
    </button></h2><p>導覽到 Dify 原始碼中的 Docker 目錄</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>複製環境配置檔案</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<p>變更<code translate="no">.env</code> 檔案中的值<code translate="no">VECTOR_STORE</code> </p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<button class="copy-code-btn"></button></code></pre>
<p>確保<code translate="no">.env</code> 檔案中的 Milvus 配置有以下一行：</p>
<pre><code translate="no"><span class="hljs-attr">MILVUS_URI</span>=http://host.docker.internal:<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>注意指定<code translate="no">VECTOR_STORE=milvus</code>, Dify 會在 docker 中啟動 Milvus Standalone 伺服器。即使您可以透過<code translate="no">http://localhost:19530</code> 從 Docker 外部存取伺服器，其他 Dify 容器若要在 Docker 環境內與它對話，就需要連線到特殊的 DNS 名稱<code translate="no">host.docker.internal</code> 。因此，我們將<code translate="no">http://host.docker.internal:19530</code> 設定為<code translate="no">MILVUS_URI</code> 。</p>
<p>對於生產部署，您可能想要自訂認證。關於如何在 Milvus 設定 token 或使用者名稱和密碼的詳細資訊，您可以參考<a href="https://milvus.io/docs/authenticate.md?tab=docker#Update-user-password">authenticate 頁面</a>。</p>
<h2 id="Start-the-Docker-Containers" class="common-anchor-header">啟動 Docker Containers<button data-href="#Start-the-Docker-Containers" class="anchor-icon" translate="no">
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
    </button></h2><p>根據您系統上的 Docker Compose 版本，選擇適當的指令來啟動容器。您可以使用<code translate="no">$ docker compose version</code> 指令檢查版本，更多資訊請參考 Docker 文件：</p>
<p>如果您有 Docker Compose V2，請使用下列指令：</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<p>如果您有 Docker Compose V1，請使用下列指令：</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Log-in-to-Dify" class="common-anchor-header">登入 Dify<button data-href="#Log-in-to-Dify" class="anchor-icon" translate="no">
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
    </button></h2><p>開啟瀏覽器並進入 Dify 安裝頁面，您可以在這裡設定您的管理帳號：<code translate="no">http://localhost/install</code> ，然後登入 Dify 主頁面進一步使用。</p>
<p>進一步的使用方法及指導，請參考<a href="https://docs.dify.ai/">Dify 說明文件</a>。</p>
