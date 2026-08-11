---
id: prerequisite-docker.md
label: Standalone requirements
related_key: Standalone
summary: 了解安裝 Milvus Standalone 之前所需的準備工作。
title: 安裝 Milvus 獨立執行版本的系統需求
---
<h1 id="Requirements-for-Installing-Milvus-Standalone" class="common-anchor-header">安裝 Milvus 獨立執行版本的系統需求<button data-href="#Requirements-for-Installing-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>在安裝 Milvus 獨立執行個體之前，請檢查您的硬體和軟體是否符合要求。</p>
<h2 id="Hardware-requirements" class="common-anchor-header">硬體需求<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>元件</th><th>需求</th><th>建議</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>Intel 第二代 Core 處理器或更高規格</li><li>Apple Silicon</li></ul></td><td><ul><li>獨立模式：4 核心或以上</li><li>叢集模式：8 核心或以上</li></ul></td><td></td></tr>
<tr><td>CPU 指令集</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>在 Milvus 中進行向量相似性搜尋與索引建置，需要 CPU 支援單一指令、多資料 (SIMD) 擴充集。請確保 CPU 至少支援下列 SIMD 擴充集之一。如需更多資訊，請參閱「<a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">具備 AVX 的 CPU</a>」。</td></tr>
<tr><td>記憶體</td><td><ul><li>獨立系統：8G</li><li>叢集：32G</li></ul></td><td><ul><li>獨立系統：16G</li><li>叢集：128G</li></ul></td><td>RAM 的大小取決於資料量。</td></tr>
<tr><td>硬碟</td><td>SATA 3.0 SSD 或更高規格</td><td>NVMe SSD 或更高規格</td><td>硬碟容量取決於資料量。</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">軟體需求<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>作業系統</th><th>軟體</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>macOS 10.14 或更新版本</td><td>Docker Desktop</td><td>請將 Docker 虛擬機器 (VM) 設定為至少使用 2 個虛擬 CPU (vCPU) 及 8 GB 的初始記憶體。否則，安裝可能會失敗。<br/>如需更多資訊，請參閱《<a href="https://docs.docker.com/desktop/mac/install/">在 Mac 上安裝 Docker Desktop</a>》。</td></tr>
<tr><td>Linux 平台</td><td><ul><li>Docker 19.03 或更新版本</li><li>Docker Compose 1.25.1 或更新版本</li></ul></td><td>如需更多資訊，請參閱《<a href="https://docs.docker.com/engine/install/">安裝 Docker Engine</a>》及《<a href="https://docs.docker.com/compose/install/">安裝 Docker Compose</a>》。</td></tr>
<tr><td>已啟用 WSL 2 的 Windows</td><td>Docker Desktop</td><td>我們建議您將源碼及其他透過綁定掛載存入 Linux 容器的資料，儲存於 Linux 檔案系統中，而非 Windows 檔案系統。<br/>更多資訊請參閱《<a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">在採用 WSL 2 後端的 Windows 上安裝 Docker Desktop</a>》。</td></tr>
</tbody>
</table>
<p>當您使用 Docker 腳本或 Docker Compose 配置安裝 Milvus Standalone 時，系統將自動取得並設定以下依賴項：</p>
<table>
<thead>
<tr><th>軟體</th><th>版本</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>請參閱<a href="#Additional-disk-requirements">額外的磁碟需求</a>。</td></tr>
<tr><td>MinIO</td><td>發行版.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>隨 Milvus 一併提供</td><td>預設訊息佇列（內嵌）；無需安裝獨立服務。</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>可選 — 僅當您將訊息佇列切換至 Pulsar 時才需安裝；預設不會安裝。</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">額外的磁碟需求<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>磁碟效能對 etcd 至關重要。強烈建議您使用本機 NVMe SSD。若磁碟回應速度較慢，可能會導致叢集選舉頻繁發生，最終將導致 etcd 服務效能下降。</p>
<p>若要測試您的磁碟是否符合資格，請使用<a href="https://github.com/axboe/fio">fio</a>。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>理想情況下，專門用於 etcd 的磁碟應達到超過 500 IOPS，且第 99 百分位 fsync 延遲應低於 10 毫秒。請參閱 etcd<a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">文件</a>以了解更詳細的要求。</p>
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
    </button></h2><p>若您的硬體和軟體符合上述要求，您可以</p>
<ul>
<li><a href="/docs/zh-hant/install_standalone-docker.md">在 Docker 中執行 Milvus</a></li>
<li><a href="/docs/zh-hant/install_standalone-docker-compose.md">使用 Docker Compose 執行 Milvus</a></li>
</ul>
