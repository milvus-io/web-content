---
id: prerequisite-docker.md
label: Docker requirements
related_key: Docker
summary: 了解使用 Docker Compose 安裝 Milvus 前的必要準備。
title: 使用 Docker Compose 安裝 Milvus 的需求
---

<h1 id="Requirements-for-Installing-Milvus-with-Docker-Compose" class="common-anchor-header">使用 Docker Compose 安裝 Milvus 的需求<button data-href="#Requirements-for-Installing-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>在安裝 Milvus 實例之前，請檢查您的硬體和軟體是否符合需求。</p>
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
<tr><th>元件</th><th>要求</th><th>建議</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>中央處理器</td><td><ul><li>Intel 第二代 Core CPU 或更高階</li><li>蘋果矽晶片</li></ul></td><td><ul><li>單機：4 核心或以上</li><li>群集：8 核心或更多</li></ul></td><td></td></tr>
<tr><td>CPU 指令集</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Milvus 中的向量相似性搜尋和索引建立需要 CPU 支援單指令、多資料 (SIMD) 延伸集。確保 CPU 至少支援所列的一種 SIMD 擴充集。如需詳細資訊，請參閱<a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">具有 AVX 的 CPU</a>。</td></tr>
<tr><td>記憶體</td><td><ul><li>單機：8G</li><li>群集：32G</li></ul></td><td><ul><li>單機：16G</li><li>群集：128G</li></ul></td><td>RAM 的大小取決於資料量。</td></tr>
<tr><td>硬碟機</td><td>SATA 3.0 SSD 或更高</td><td>NVMe SSD 或更高</td><td>硬碟大小視資料容量而定。</td></tr>
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
<tr><td>macOS 10.14 或更新版本</td><td>Docker 桌面</td><td>設定 Docker 虛擬機器 (VM) 至少使用 2 個虛擬 CPU (vCPU) 和 8 GB 的初始記憶體。否則，安裝可能會失敗。<br/>如需詳細資訊，請參閱<a href="https://docs.docker.com/desktop/mac/install/">在 Mac 上安裝 Docker Desktop</a>。</td></tr>
<tr><td>Linux 平台</td><td><ul><li>Docker 19.03 或更新版本</li><li>Docker Compose 1.25.1 或更新版本</li></ul></td><td>更多資訊請參<a href="https://docs.docker.com/engine/install/">閱安裝 Docker Engine</a>和<a href="https://docs.docker.com/compose/install/">安裝 Docker Compose</a>。</td></tr>
<tr><td>啟用 WSL 2 的 Windows</td><td>Docker 桌面</td><td>我們建議您將原始碼和其他綁定掛載到 Linux containers 的資料存放在 Linux 檔案系統，而不是 Windows 檔案系統。<br/>請參閱<a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">在 Windows 上安裝 Docker Desktop with WSL 2 backend 以</a>取得更多資訊。</td></tr>
</tbody>
</table>
<p>當使用 Docker script 或 Docker Compose 配置安裝 Milvus Standalone 時，會自動取得並配置下列相依性：</p>
<table>
<thead>
<tr><th>軟體</th><th>版本</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>請參閱<a href="#Additional-disk-requirements">其他磁碟需求</a>。</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>脈動星</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">額外的磁碟需求</h3><p>磁碟效能對 etcd 至關重要。強烈建議您使用本機 NVMe SSD。較慢的磁碟回應速度可能會導致頻繁的群集選舉，最終會降低 etcd 服務的效能。</p>
<p>要測試您的磁碟是否合格，請使用<a href="https://github.com/axboe/fio">fio</a>。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>理想情況下，您專用於 etcd 的磁碟應達到 500 IOPS 以上，第 99 百分位數 fsync 延遲應低於 10 毫秒。閱讀 etcd<a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">文件</a>，瞭解更多詳細要求。</p>
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
    </button></h2><p>如果您的硬件和軟件符合上述要求，您可以</p>
<ul>
<li><a href="/docs/zh-hant/v2.5.x/install_standalone-docker.md">在 Docker 中執行 Milvus</a></li>
<li><a href="/docs/zh-hant/v2.5.x/install_standalone-docker-compose.md">使用 Docker Compose 執行 Milvus</a></li>
</ul>
