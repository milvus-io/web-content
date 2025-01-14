---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: 了解使用 Helm 安裝 Milvus 前的必要準備。
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
    </button></h1><p>本頁面列出啟動並執行 Milvus 所需的硬體與軟體需求。</p>
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
<tr><td>中央處理器</td><td><ul><li>Intel 第二代 Core CPU 或更高階</li><li>蘋果矽晶片</li></ul></td><td><ul><li>單機：4 核心或以上</li><li>群集：8 核心或更多</li></ul></td><td></td></tr>
<tr><td>CPU 指令集</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Milvus 中的向量相似性搜尋和索引建立需要 CPU 支援單指令、多資料 (SIMD) 延伸集。確保 CPU 至少支援所列的一種 SIMD 擴充集。如需詳細資訊，請參閱<a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">具有 AVX 的 CPU</a>。</td></tr>
<tr><td>記憶體</td><td><ul><li>單機：8G</li><li>群集：32G</li></ul></td><td><ul><li>單機：16G</li><li>群集：128G</li></ul></td><td>RAM 的大小取決於資料量。</td></tr>
<tr><td>硬碟機</td><td>SATA 3.0 SSD 或 CloudStorage</td><td>NVMe SSD 或更高規格</td><td>硬碟大小視資料容量而定。</td></tr>
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
    </button></h2><p>建議您在 Linux 平台上執行 Kubernetes 叢集。</p>
<p>kubectl 是 Kubernetes 的命令列工具。使用與您的叢集相差一個次要版本之內的 kubectl 版本。使用最新版本的 kubectl 有助於避免不可預見的問題。</p>
<p>在本機執行 Kubernetes 叢集時需要 minikube。使用 Helm 安裝 Milvus 前，請確認已安裝 Docker。如需詳細資訊，請參閱<a href="https://docs.docker.com/get-docker">Get Docker</a>。</p>
<table>
<thead>
<tr><th>作業系統</th><th>軟體</th><th>注意事項</th></tr>
</thead>
<tbody>
<tr><td>Linux 平台</td><td><ul><li>Kubernetes 1.16 或更新版本</li><li>kubectl</li><li>Helm 3.0.0 或更新版本</li><li>minikube (適用於 Milvus 單機版)</li><li>Docker 19.03 或更新版本 (適用於 Milvus 單機版)</li></ul></td><td>如需詳細資訊，請參閱<a href="https://helm.sh/docs/">Helm 文件</a>。</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>軟體</th><th>版本</th><th>注意事項</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>請參閱<a href="#Additional-disk-requirements">其他磁碟需求</a>。</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>脈動星</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">額外的磁碟需求</h3><p>磁碟效能對 etcd 至關重要。強烈建議您使用本機 NVMe SSD。較慢的磁碟回應速度可能會導致頻繁的群集選舉，最終會降低 etcd 服務的效能。</p>
<p>要測試磁碟是否合格，請使用<a href="https://github.com/axboe/fio">fio</a>。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>理想情況下，您的磁碟應達到 500 IOPS 以上，第 99 百分位數的 fsync 延遲應低於 10 毫秒。閱讀 etcd<a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">文件</a>以瞭解更詳細的要求。</p>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">如何在本機啟動 K8s 叢集進行測試？</h3><p>您可以使用<a href="https://minikube.sigs.k8s.io/docs/">minikube</a>、<a href="https://kind.sigs.k8s.io/">kind</a> 和<a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> 等工具在本機快速建立 Kubernetes 叢集。以下程序以 minikube 為例。</p>
<ol>
<li>下載 minikube</li>
</ol>
<p>前往<a href="https://minikube.sigs.k8s.io/docs/start/">Get Started</a>頁面，檢查您是否符合<strong>What you'll need</strong>章節所列的條件，按一下描述您目標平台的按鈕，然後複製指令下載並安裝二進位檔案。</p>
<ol start="2">
<li>使用 minikube 啟動 K8s 叢集</li>
</ol>
<pre><code translate="no" class="language-shell">$ minikube start
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>檢查 K8s 叢集的狀態</li>
</ol>
<p>您可以使用下列指令檢查已安裝 K8s 叢集的狀態。</p>
<pre><code translate="no" class="language-shell">$ kubectl cluster-info
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>確保您可以透過<code translate="no">kubectl</code> 存取 K8s 叢集。如果您尚未在本機安裝<code translate="no">kubectl</code> ，請參閱在<a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">minikube 內使用 kubectl</a>。</p>
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
<li><p>如果您的硬體和軟體符合要求，您可以</p>
<ul>
<li><a href="/docs/zh-hant/install_cluster-milvusoperator.md">使用 Milvus Operator 在 Kubernets 中執行 Milvus</a></li>
<li><a href="/docs/zh-hant/install_cluster-helm.md">使用 Helm 在 Kubernetes 中執行 Milvus</a></li>
</ul></li>
<li><p>安裝 Milvus 時可以設定的參數，請參閱<a href="/docs/zh-hant/system_configuration.md">系統組態</a>。</p></li>
</ul>
