---
id: NLWeb_with_milvus.md
summary: >-
  學習如何整合 Microsoft NLWeb 與 Milvus，為網站建立強大的自然語言介面。本教學示範如何利用 Milvus 的向量資料庫功能，在
  NLWeb 應用程式中進行有效率的語意搜尋、嵌入儲存和上下文檢索。
title: 使用 Milvus 的 NLWeb
---
<h1 id="Using-NLWeb-with-Milvus" class="common-anchor-header">使用 Milvus 的 NLWeb<button data-href="#Using-NLWeb-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/microsoft/NLWeb">微軟的 NLWeb</a>是一個建議的框架，可使用<a href="https://schema.org/">Schema.org</a>、RSS 等格式以及新興的 MCP 協定，為網站提供自然語言介面。</p>
<p><a href="https://milvus.io/">Milvus</a>作為 NLWeb 內的向量資料庫後端，可支援嵌入儲存和有效的向量相似性搜尋，為自然語言處理應用程式提供強大的上下文檢索功能。</p>
<blockquote>
<p>本文件主要以官方<a href="https://github.com/microsoft/NLWeb/blob/main/HelloWorld.md">快速入門</a>文件為基礎。如果您發現任何過時或不一致的內容，請優先使用官方文件，並隨時向我們提出問題。</p>
</blockquote>
<h2 id="Usage" class="common-anchor-header">使用方法<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>NLWeb 可以配置為使用 Milvus 作為檢索引擎。以下是如何設定和使用NLWeb與Milvus的指南。</p>
<h3 id="Installation" class="common-anchor-header">安裝</h3><p>克隆 repo 並設定您的環境：</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/microsoft/NLWeb
<span class="hljs-built_in">cd</span> NLWeb
python -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate  <span class="hljs-comment"># or `.venv\Scripts\activate` on Windows</span>
<span class="hljs-built_in">cd</span> code
pip install -r requirements.txt
pip install pymilvus  <span class="hljs-comment"># Add Milvus Python client</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-Milvus" class="common-anchor-header">設定 Milvus</h3><p>要使用<strong>Milvus</strong>，請更新您的配置。</p>
<h4 id="Update-config-files-in-codeconfig" class="common-anchor-header">更新配置文件在<code translate="no">code/config</code></h4><p>開啟<code translate="no">config_retrieval.yaml</code> 檔案，並加入 Milvus 配置：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">preferred_endpoint:</span> <span class="hljs-string">milvus_local</span>

<span class="hljs-attr">endpoints:</span>
  <span class="hljs-attr">milvus_local:</span>
    <span class="hljs-attr">database_path:</span> <span class="hljs-string">&quot;../data/milvus.db&quot;</span>
    <span class="hljs-comment"># Set the collection name to use</span>
    <span class="hljs-attr">index_name:</span> <span class="hljs-string">nlweb_collection</span>
    <span class="hljs-comment"># Specify the database type</span>
    <span class="hljs-attr">db_type:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Loading-Data" class="common-anchor-header">載入資料</h3><p>配置完成後，使用 RSS feed 載入您的內容。</p>
<p>從<code translate="no">code</code> 目錄：</p>
<pre><code translate="no" class="language-bash">python -m tools.db_load https://feeds.libsyn.com/121695/rss Behind-the-Tech
<button class="copy-code-btn"></button></code></pre>
<p>這將會把內容攝取到您的 Milvus 套件中，同時儲存文字資料和向量嵌入。</p>
<h3 id="Running-the-Server" class="common-anchor-header">執行伺服器</h3><p>要啟動 NLWeb，從<code translate="no">code</code> 目錄，執行：</p>
<pre><code translate="no" class="language-bash">python app-file.py
<button class="copy-code-btn"></button></code></pre>
<p>現在您可以使用 http://localhost:8000/ 的 Web UI 或直接透過與 MCP 相容的 REST API，透過自然語言查詢您的內容。</p>
<h2 id="Further-Reading" class="common-anchor-header">進一步閱讀<button data-href="#Further-Reading" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/docs">Milvus 文件</a></li>
<li><a href="https://github.com/microsoft/NLWeb">NLWeb 原始碼</a></li>
<li>聊天查詢的生命</li>
<li>透過改變提示修改行為</li>
<li>修改控制流程</li>
<li>修改使用者介面</li>
</ul>
