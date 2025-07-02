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
<div class="alert note">
<p>本文件主要以<a href="https://docs.dify.ai/">Dify</a> 官方<a href="https://docs.dify.ai/">文件</a>為基礎。如果您發現任何過時或不一致的內容，請優先使用官方文件，並隨時向我們提出問題。</p>
</div>
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
    </button></h2><h3 id="Clone-the-Repository" class="common-anchor-header">克隆儲存庫</h3><p>克隆 Dify 原始碼到您的本機：</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-Environment-Configuration" class="common-anchor-header">準備環境組態</h3><p>導覽到 Dify 原始碼中的 Docker 目錄</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>複製環境配置檔案</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deployment-Options" class="common-anchor-header">部署選項<button data-href="#Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以使用兩種不同的方式，在 Milvus 部署 Dify。選擇最適合您需求的一種：</p>
<h2 id="Option-1-Using-Milvus-with-Docker" class="common-anchor-header">選項 1：使用 Milvus 與 Docker<button data-href="#Option-1-Using-Milvus-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>此選項使用 Docker Compose 在您的本地機器上執行 Milvus 容器與 Dify。</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">設定環境變數</h3><p>使用下列 Milvus 配置編輯<code translate="no">.env</code> 檔案：</p>
<pre><code translate="no">VECTOR_STORE=milvus
MILVUS_URI=http://host.docker.internal:19530
MILVUS_TOKEN=
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><code translate="no">MILVUS_URI</code> 使用<code translate="no">host.docker.internal:19530</code> ，它允許 Docker 容器透過 Docker 的內部網路存取在主機上執行的 Milvus。</li>
<li><code translate="no">MILVUS_TOKEN</code> 對於本機的 Milvus 部署，可以留空。</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">啟動 Docker 容器</h3><p>使用<code translate="no">milvus</code> 設定檔啟動容器，以包含 Milvus 服務：</p>
<pre><code translate="no" class="language-shell">docker compose --profile milvus up -d
<button class="copy-code-btn"></button></code></pre>
<p>此指令會啟動 Dify 服務以及<code translate="no">milvus-standalone</code> 、<code translate="no">etcd</code> 和<code translate="no">minio</code> 容器。</p>
<h2 id="Option-2-Using-Zilliz-Cloud" class="common-anchor-header">選項 2：使用 Zilliz Cloud<button data-href="#Option-2-Using-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>此選項可將 Dify 連接到 Zilliz Cloud 上受管理的 Milvus 服務。</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">設定環境變數</h3><p>使用您的 Zilliz Cloud 連線詳細資訊編輯<code translate="no">.env</code> 檔案：</p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<span class="hljs-attr">MILVUS_URI</span>=YOUR_ZILLIZ_CLOUD_ENDPOINT
<span class="hljs-attr">MILVUS_TOKEN</span>=YOUR_ZILLIZ_CLOUD_API_KEY
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>以 Zilliz Cloud 的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">公共端點</a>取代<code translate="no">YOUR_ZILLIZ_CLOUD_ENDPOINT</code> 。</li>
<li>以 Zilliz Cloud 的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">API 金鑰</a>取代<code translate="no">YOUR_ZILLIZ_CLOUD_API_KEY</code> 。</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">啟動 Docker Containers</h3><p>只啟動 Dify 容器，不啟動 Milvus profile：</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Accessing-Dify" class="common-anchor-header">存取 Dify<button data-href="#Accessing-Dify" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Log-in-to-Dify" class="common-anchor-header">登入 Dify</h3><p>打開瀏覽器，進入 Dify 安裝頁面，您可以在這裡設定您的管理帳號：<code translate="no">http://localhost/install</code> ，然後登入 Dify 主頁面進一步使用。</p>
<p>進一步的使用方法及指導，請參考<a href="https://docs.dify.ai/">Dify 說明文件</a>。</p>
