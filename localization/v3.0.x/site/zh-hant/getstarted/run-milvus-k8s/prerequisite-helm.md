---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: 了解在使用 Helm 安裝 Milvus 之前所需的準備工作。
title: 在 Kubernetes 上執行 Milvus 的需求
---
<h1 id="Requirements-for-running-Milvus-on-Kubernetes" class="common-anchor-header">在 Kubernetes 上執行 Milvus 的需求<button data-href="#Requirements-for-running-Milvus-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁面列出讓 Milvus 順利運作所需的硬體與軟體需求。</p>
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
<tr><td>CPU 指令集</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>在 Milvus 中進行向量相似性搜尋與索引建置，需要 CPU 支援單一指令、多資料 (SIMD) 擴充集。請確保 CPU 至少支援下列 SIMD 擴充集之一。如需更多資訊，請參閱「<a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">支援 AVX 的 CPU</a>」。</td></tr>
<tr><td>記憶體</td><td><ul><li>獨立系統：8G</li><li>叢集：32G</li></ul></td><td><ul><li>獨立系統：16G</li><li>叢集：128G</li></ul></td><td>RAM 的大小取決於資料量。</td></tr>
<tr><td>硬碟</td><td>SATA 3.0 SSD 或 CloudStorage</td><td>NVMe SSD 或更高規格</td><td>硬碟容量取決於資料量。</td></tr>
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
    </button></h2><p>建議您在 Linux 平台上運行 Kubernetes 叢集。</p>
<p>kubectl 是 Kubernetes 的命令列工具。請使用與您的叢集次版本差異不超過一級的 kubectl 版本。使用最新版本的 kubectl 有助於避免不可預見的問題。</p>
<p>若要在本地端執行 Kubernetes 叢集，則需安裝 minikube。minikube 需依賴 Docker，請務必在透過 Helm 安裝 Milvus 之前先安裝 Docker。更多資訊請參閱《<a href="https://docs.docker.com/get-docker">取得 Docker</a>》。</p>
<table>
<thead>
<tr><th>作業系統</th><th>軟體</th><th>注意事項</th></tr>
</thead>
<tbody>
<tr><td>Linux 平台</td><td><ul><li>Kubernetes 1.16 或更新版本</li><li>kubectl</li><li>Helm 3.0.0 或更新版本</li><li>minikube（適用於 Milvus 獨立部署）</li><li>Docker 19.03 或更新版本（適用於 Milvus 獨立部署）</li></ul></td><td>更多資訊請參閱<a href="https://helm.sh/docs/">Helm 文件</a>。</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>軟體</th><th>版本</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>請參閱<a href="#Additional-disk-requirements">額外的磁碟需求</a>。</td></tr>
<tr><td>MinIO</td><td>發行版 2024-12-18T13:15:44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>隨 Milvus 捆綁提供（服務模式：<code translate="no">v0.1.36</code> 及以上版本）</td><td>預設訊息佇列。對於分散式部署，Woodpecker 可作為專用<strong>服務</strong>運行；請使用<code translate="no">--set woodpecker.image.tag</code> 鎖定其版本。服務模式自 Woodpecker<code translate="no">v0.1.36</code> 起開始支援。</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>可選 — 僅當您將訊息佇列切換至 Pulsar 時才需安裝；預設未安裝。</td></tr>
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
    </button></h3><p>磁碟效能對 etcd 至關重要。強烈建議您使用本機 NVMe SSD。磁碟回應速度過慢可能會導致叢集選舉頻繁發生，最終將導致 etcd 服務效能下降。</p>
<p>若要測試您的磁碟是否符合資格，請使用<a href="https://github.com/axboe/fio">fio</a>。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>理想情況下，您的磁碟應達到超過 500 IOPS，且第 99 百分位 fsync 延遲應低於 10 毫秒。請參閱 etcd<a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">文件</a>以了解更詳細的規格要求。</p>
<h2 id="FAQs" class="common-anchor-header">常見問題<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">如何在本地啟動 K8s 叢集以進行測試？<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>您可以使用<a href="https://minikube.sigs.k8s.io/docs/">minikube</a>、<a href="https://kind.sigs.k8s.io/">kind</a> 和<a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> 等工具，快速在本地端建立 Kubernetes 叢集。以下步驟以 minikube 為例進行說明。</p>
<ol>
<li>下載 minikube</li>
</ol>
<p>前往<a href="https://minikube.sigs.k8s.io/docs/start/">「開始使用</a>」頁面，確認您是否已滿足「<strong>您需要準備什麼</strong>」部分所列的條件，點擊對應您目標平台的按鈕，並複製指令以下載並安裝二進位檔。</p>
<ol start="2">
<li>使用 minikube 啟動 K8s 叢集</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>檢查 K8s 叢集的狀態</li>
</ol>
<p>您可以透過以下指令檢查已安裝的 K8s 叢集狀態。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>請確保您能透過<code translate="no">kubectl</code> 存取 K8s 叢集。若您尚未在本地端安裝<code translate="no">kubectl</code> ，請參閱《<a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">在 minikube 內使用 kubectl</a>》。</p>
</div>
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
    </button></h2><ul>
<li><p>若您的硬體和軟體符合要求，您可以：</p>
<ul>
<li><a href="/docs/zh-hant/install_cluster-milvusoperator.md">使用 Milvus Operator 在 Kubernetes 中執行 Milvus</a></li>
<li><a href="/docs/zh-hant/install_cluster-helm.md">使用 Helm 在 Kubernetes 中執行 Milvus</a></li>
</ul></li>
<li><p>有關安裝 Milvus 時可設定的參數，請參閱《<a href="/docs/zh-hant/system_configuration.md">系統配置》</a>。</p></li>
</ul>
