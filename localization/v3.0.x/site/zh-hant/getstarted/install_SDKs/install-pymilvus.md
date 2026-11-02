---
id: install-pymilvus.md
label: Install PyMilvus
related_key: SDK
summary: 瞭解如何安裝 Milvus 的 Python SDK。
title: 安裝 Milvus Python SDK
---
<h1 id="Install-Milvus-Python-SDK" class="common-anchor-header">安裝 Milvus Python SDK<button data-href="#Install-Milvus-Python-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁面說明如何安裝 PyMilvus（Milvus 的 Python SDK），並選擇用於本地資料庫或嵌入式模型的可選依賴項。</p>
<h2 id="Requirements" class="common-anchor-header">系統需求<button data-href="#Requirements" class="anchor-icon" translate="no">
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
<li>PyMilvus 3.0.2 需使用 Python 3.9 或更新版本，才能連線至遠端 Milvus 伺服器。</li>
<li>本地的 Milvus Lite 3.2.2 範例程式需使用 Python 3.10 或更高版本，並需在受支援的平台上<a href="/docs/zh-hant/milvus_lite.md">執行</a>。請參閱《<a href="/docs/zh-hant/milvus_lite.md">在本地執行 Milvus Lite</a>》。</li>
<li>請透過 `<code translate="no">pip</code>` 安裝依賴項。PyMilvus 3.0.2 需要 `<code translate="no">protobuf&gt;=5.27.2</code>`；請勿另行指定 `<code translate="no">protobuf==3.20.0</code>`。使用此 SDK 時無需 `<code translate="no">grpcio-tools</code> `。</li>
</ul>
<h2 id="Install-PyMilvus-via-pip" class="common-anchor-header">透過 pip 安裝 PyMilvus<button data-href="#Install-PyMilvus-via-pip" class="anchor-icon" translate="no">
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
    </button></h2><p>PyMilvus 可在<a href="https://pypi.org/project/pymilvus/">Python 套件索引</a>(Python Package<a href="https://pypi.org/project/pymilvus/">Index</a>) 中取得。</p>
<div class="alert note">
建議安裝與您已安裝的 Milvus 伺服器版本相符的 PyMilvus 版本。如需更多資訊，請參閱《<a href="/docs/zh-hant/release_notes.md">發行說明》</a>。
</div>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus==3.0.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>此安裝程序會安裝用於連線至遠端 Milvus 伺服器的客戶端，但不會安裝 Milvus Lite 或嵌入式模型。</p>
<p>若要使用<a href="/docs/zh-hant/quickstart.md">「快速入門」</a>中的本機資料庫，請安裝<code translate="no">milvus-lite</code> 附加元件及對應的 Lite 套件：</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>若需嵌入式輔助工具，請安裝獨立的<code translate="no">model</code> 附加套件：</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[model]==3.0.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在 Windows 系統上，由於平台標記的關係，pip 會跳過 PyMilvus 3.0.2 的「<code translate="no">milvus-lite</code> 」附加元件。上述指令明確指定了 `<code translate="no">milvus-lite</code> `，因此只要您的 Python 版本中存在<code translate="no">faiss-cpu</code> 和<code translate="no">pyarrow</code> 的 wheels 檔案，即可在 Windows 上完成安裝。</p>
<h2 id="Verify-installation" class="common-anchor-header">驗證安裝<button data-href="#Verify-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>若 PyMilvus 已正確安裝，執行以下指令時將不會拋出任何例外。</p>
<pre><code translate="no" class="language-bash">python3 -c <span class="hljs-string">&quot;from pymilvus import MilvusClient&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>此步驟僅檢查 SDK 的匯入狀況，並非測試伺服器連線。請依照<a href="/docs/zh-hant/quickstart.md">《快速入門》</a>指南建立本機資料集、插入資料並執行搜尋。</p>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>安裝 PyMilvus 後，您可以：</p>
<ul>
<li><p>學習 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh-hant/manage-collections.md">管理資料集</a></li>
<li><a href="/docs/zh-hant/manage-partitions.md">管理分區</a></li>
<li><a href="/docs/zh-hant/insert-update-delete.md">插入、Upsert 及刪除</a></li>
<li><a href="/docs/zh-hant/single-vector-search.md">單向量搜尋</a></li>
<li><a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a></li>
</ul></li>
<li><p>探索<a href="/api-reference/pymilvus/v3.0.x/About.md">PyMilvus API 參考手冊</a></p></li>
</ul>
