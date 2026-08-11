---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: 了解在使用使用 Helm 安装 Milvus 之前需要进行的准备工作。
title: 在 Kubernetes 上运行 Milvus 的要求
---
<h1 id="Requirements-for-running-Milvus-on-Kubernetes" class="common-anchor-header">在 Kubernetes 上运行 Milvus 的要求<button data-href="#Requirements-for-running-Milvus-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>本页面列出了使 Milvus 正常运行所需的硬件和软件要求。</p>
<h2 id="Hardware-requirements" class="common-anchor-header">硬件要求<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
<tr><th>组件</th><th>要求</th><th>建议</th><th>注</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>英特尔第二代酷睿处理器或更高版本</li><li>Apple Silicon</li></ul></td><td><ul><li>独立模式：4核或以上</li><li>集群：8 核或以上</li></ul></td><td></td></tr>
<tr><td>CPU 指令集</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>在 Milvus 中进行向量相似性搜索和索引构建需要 CPU 支持单指令多数据（SIMD）扩展集。请确保 CPU 至少支持所列出的其中一种 SIMD 扩展。有关更多信息，请参阅<a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">支持 AVX 的 CPU</a>。</td></tr>
<tr><td>内存</td><td><ul><li>独立服务器：8G</li><li>集群：32G</li></ul></td><td><ul><li>独立部署：16G</li><li>集群：128G</li></ul></td><td>RAM的大小取决于数据量。</td></tr>
<tr><td>硬盘</td><td>SATA 3.0 SSD 或云存储</td><td>NVMe SSD 或更高规格</td><td>硬盘容量取决于数据量。</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">软件要求<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>建议在 Linux 平台上运行 Kubernetes 集群。</p>
<p>kubectl 是 Kubernetes 的命令行工具。请使用与您的集群小版本号相差不超过一个的 kubectl 版本。使用最新版本的 kubectl 有助于避免出现意想不到的问题。</p>
<p>在本地运行 Kubernetes 集群时需要 minikube。minikube 依赖 Docker。请确保在使用 Helm 安装 Milvus 之前已安装 Docker。更多信息请参阅《<a href="https://docs.docker.com/get-docker">获取 Docker</a>》。</p>
<table>
<thead>
<tr><th>操作系统</th><th>软件</th><th>注意</th></tr>
</thead>
<tbody>
<tr><td>Linux 平台</td><td><ul><li>Kubernetes 1.16 或更高版本</li><li>kubectl</li><li>Helm 3.0.0 或更高版本</li><li>minikube（适用于 Milvus Standalone 部署）</li><li>Docker 19.03 或更高版本（适用于 Milvus Standalone）</li></ul></td><td>更多信息请参阅<a href="https://helm.sh/docs/">Helm 文档</a>。</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>软件</th><th>版本</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>请参阅<a href="#Additional-disk-requirements">其他磁盘要求</a>。</td></tr>
<tr><td>MinIO</td><td>RELEASE.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>随 Milvus 捆绑提供（服务模式：<code translate="no">v0.1.36</code> 及以上版本）</td><td>默认消息队列。对于分布式部署，Woodpecker 可以作为专用<strong>服务</strong>运行；请使用<code translate="no">--set woodpecker.image.tag</code> 锁定其版本。从 Woodpecker<code translate="no">v0.1.36</code> 版本起支持服务模式。</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>可选 — 仅当您将消息队列切换为 Pulsar 时才需安装；默认不安装。</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">额外的磁盘要求<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>磁盘性能对 etcd 至关重要。强烈建议您使用本地 NVMe SSD。磁盘响应速度过慢可能会导致集群选举频繁发生，最终导致 etcd 服务性能下降。</p>
<p>要测试您的磁盘是否符合要求，请使用<a href="https://github.com/axboe/fio">fio</a>。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>理想情况下，您的磁盘应达到 500 以上的 IOPS，且第 99 百分位 fsync 延迟应低于 10 毫秒。请查阅 etcd<a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">文档</a>以了解更详细的要求。</p>
<h2 id="FAQs" class="common-anchor-header">常见问题<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">如何在本地启动 K8s 集群用于测试？<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>您可以使用<a href="https://minikube.sigs.k8s.io/docs/">minikube</a>、<a href="https://kind.sigs.k8s.io/">kind</a> 和<a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> 等工具，快速在本地搭建 Kubernetes 集群。以下步骤以 minikube 为例进行说明。</p>
<ol>
<li>下载 minikube</li>
</ol>
<p>访问<a href="https://minikube.sigs.k8s.io/docs/start/">“入门”</a>页面，确认您是否满足<strong>“所需条件”</strong>部分列出的要求，点击对应目标平台的按钮，并复制相关命令以下载并安装二进制文件。</p>
<ol start="2">
<li>使用 minikube 启动 K8s 集群</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>检查 K8s 集群的状态</li>
</ol>
<p>您可以通过以下命令检查已安装的 K8s 集群状态。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>请确保您可以通过<code translate="no">kubectl</code> 访问 K8s 集群。如果您尚未在本地安装<code translate="no">kubectl</code> ，请参阅《<a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">在 minikube 中使用 kubectl</a>》。</p>
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
<li><p>如果您的硬件和软件满足要求，您可以：</p>
<ul>
<li><a href="/docs/zh/install_cluster-milvusoperator.md">使用 Milvus Operator 在 Kubernetes 中运行 Milvus</a></li>
<li><a href="/docs/zh/install_cluster-helm.md">使用 Helm 在 Kubernetes 中运行 Milvus</a></li>
</ul></li>
<li><p>有关安装 Milvus 时可设置的参数，请参阅《<a href="/docs/zh/system_configuration.md">系统配置》</a>。</p></li>
</ul>
