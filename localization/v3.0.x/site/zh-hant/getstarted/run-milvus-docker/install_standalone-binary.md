---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: 請確認 RPM/DEB 套件的可用性，並選擇一種受支援的 Milvus 獨立安裝方式。
title: 使用 RPM/DEB 套件安裝 Milvus 獨立版
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">使用 RPM/DEB 套件安裝 Milvus 獨立版<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁面說明 Milvus 獨立版套件的可用性，並提供已發布發行版本資源的安裝方法連結。</p>
<h2 id="Check-package-availability" class="common-anchor-header">檢查套件可用性<button data-href="#Check-package-availability" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 3.0.x 版本（包含<a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.3">v3.0.3</a>）僅發布 Docker Compose 配置檔案，但未提供 RPM 或 DEB 套件。請勿為這些版本建立 RPM 或 DEB 下載網址；下載指令中的套件檔名並不會使該資源可供使用。</p>
<p>若為其他版本，請在選擇套件安裝方式前，先查閱該<a href="https://github.com/milvus-io/milvus/releases">Milvus 發行版頁面的</a>「<strong>資源</strong>」區段。請僅使用該發行版中實際列出且與您的系統架構相符的套件。</p>
<h2 id="Install-Milvus-Standalone-with-Docker" class="common-anchor-header">使用 Docker 安裝 Milvus 獨立版<button data-href="#Install-Milvus-Standalone-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>針對 v3.0.3，請選擇以下其中一種安裝方式：</p>
<ul>
<li><a href="/docs/zh-hant/install_standalone-docker-compose.md">透過 Docker Compose 執行 Milvus（Linux）</a>，以使用隨 v3.0.3 發布的 Compose 配置。</li>
<li><a href="/docs/zh-hant/install_standalone-docker.md">在 Docker 中執行 Milvus（Linux）</a>，以使用獨立安裝腳本。執行腳本前，請先檢查腳本中的映像標籤。</li>
<li><a href="/docs/zh-hant/install_standalone-windows.md">在 Docker 中執行 Milvus（Windows）</a>，以使用具備 WSL 2 後端及 Linux 容器的 Docker Desktop。</li>
</ul>
<p><a href="/docs/zh-hant/prerequisite-docker.md">安裝前請先確認硬體與軟體需求</a>。實例運行後，請依照<a href="/docs/zh-hant/quickstart.md">《快速入門》</a>中的<strong>「使用現有 Milvus 伺服器</strong>」路徑，連線至<code translate="no">http://localhost:19530</code> （而非本地的<code translate="no">.db</code> 路徑），以插入資料並執行搜尋。</p>
