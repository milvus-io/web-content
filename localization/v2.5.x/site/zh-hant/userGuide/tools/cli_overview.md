---
id: cli_overview.md
summary: Milvus Command-Line Interface (CLI) 是一個命令列工具，支援資料庫連線、資料操作及資料匯入匯出。
title: Milvus 命令列介面
---
<h1 id="Milvus-Command-Line-Interface" class="common-anchor-header">Milvus 命令列介面<button data-href="#Milvus-Command-Line-Interface" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Command-Line Interface (CLI) 是一個命令列工具，支援資料庫連線、資料操作、資料匯入與匯出。以<a href="https://github.com/milvus-io/pymilvus">Milvus Python SDK</a> 為基礎，它允許使用互動式命令列提示，透過終端機執行指令。</p>
<h2 id="Recommended-version" class="common-anchor-header">推薦版本<button data-href="#Recommended-version" class="anchor-icon" translate="no">
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
    </button></h2><p>在下表中，您可以根據所使用的 Milvus 版本，找到 PyMilvus 和 Milvus_CLI 的推薦版本。</p>
<table>
<thead>
<tr><th style="text-align:center">Milvus</th><th style="text-align:center">PyMilvus</th><th style="text-align:center">Milvus_CLI</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">1.0.x</td><td style="text-align:center">1.0.1</td><td style="text-align:center">x</td></tr>
<tr><td style="text-align:center">1.1.x</td><td style="text-align:center">1.1.2</td><td style="text-align:center">x</td></tr>
<tr><td style="text-align:center">2.0.0-RC1</td><td style="text-align:center">2.0.0rc1</td><td style="text-align:center">x</td></tr>
<tr><td style="text-align:center">2.0.0-RC2</td><td style="text-align:center">2.0.0rc2</td><td style="text-align:center">0.1.3</td></tr>
<tr><td style="text-align:center">2.0.0-RC4</td><td style="text-align:center">2.0.0rc4</td><td style="text-align:center">0.1.4</td></tr>
<tr><td style="text-align:center">2.0.0-RC5</td><td style="text-align:center">2.0.0rc5</td><td style="text-align:center">0.1.5</td></tr>
<tr><td style="text-align:center">2.0.0-RC6</td><td style="text-align:center">2.0.0rc6</td><td style="text-align:center">0.1.6</td></tr>
<tr><td style="text-align:center">2.0.0-RC7</td><td style="text-align:center">2.0.0rc7</td><td style="text-align:center">0.1.7</td></tr>
<tr><td style="text-align:center">2.0.0-RC8</td><td style="text-align:center">2.0.0rc8</td><td style="text-align:center">0.1.8</td></tr>
<tr><td style="text-align:center">2.0.0-RC9</td><td style="text-align:center">2.0.0rc9</td><td style="text-align:center">0.1.9</td></tr>
<tr><td style="text-align:center">2.1.0</td><td style="text-align:center">2.1.0</td><td style="text-align:center">0.3.0</td></tr>
<tr><td style="text-align:center">2.2.x</td><td style="text-align:center">2.2.x</td><td style="text-align:center">0.4.0</td></tr>
<tr><td style="text-align:center">2.3.x</td><td style="text-align:center">2.3.x</td><td style="text-align:center">0.4.2</td></tr>
<tr><td style="text-align:center">2.4.x</td><td style="text-align:center">2.4.x</td><td style="text-align:center">1.0.1</td></tr>
<tr><td style="text-align:center">2.5.x</td><td style="text-align:center">2.5.x</td><td style="text-align:center">1.0.2</td></tr>
</tbody>
</table>
<div class="alert note">由於儲存格式的改變，Milvus 2.0.0-RC7 及更新版本與 2.0.0-RC6 及更早版本不向後相容。</div>
<h2 id="Current-version" class="common-anchor-header">目前版本<button data-href="#Current-version" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus_CLI 目前的版本是 1.0.2。若要找出您已安裝的版本並查看是否需要更新，請執行<code translate="no">milvus_cli --version</code> 。</p>
