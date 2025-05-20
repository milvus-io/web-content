---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: 了解使用 Helm 安装 Milvus 之前的必要准备工作。
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
    </button></h1><p>本页列出了启动和运行 Milvus 所需的硬件和软件要求。</p>
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
<tr><th>组件</th><th>要求</th><th>建议</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td>中央处理器</td><td><ul><li>英特尔第二代酷睿处理器或更高版本</li><li>苹果硅</li></ul></td><td><ul><li>独立：4 核或更高</li><li>集群：8 核或更多</li></ul></td><td></td></tr>
<tr><td>CPU 指令集</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Milvus 中的向量相似性搜索和索引构建要求 CPU 支持单指令、多数据（SIMD）扩展集。确保 CPU 至少支持所列 SIMD 扩展之一。有关详细信息，请参阅<a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">带 AVX 的 CPU</a>。</td></tr>
<tr><td>内存</td><td><ul><li>单机：8G</li><li>集群：32G</li></ul></td><td><ul><li>单机：16G</li><li>集群： 128G128G</li></ul></td><td>内存大小取决于数据量。</td></tr>
<tr><td>硬盘</td><td>SATA 3.0 固态硬盘或 CloudStorage</td><td>NVMe SSD 或更高版本</td><td>硬盘大小取决于数据量。</td></tr>
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
<p>kubectl 是 Kubernetes 的命令行工具。使用的 kubectl 版本应与群集的版本相差一个小版本。使用最新版本的 kubectl 有助于避免不可预见的问题。</p>
<p>本地运行 Kubernetes 集群时需要 minikube。确保在使用 Helm 安装 Milvus 之前安装 Docker。更多信息，请参阅<a href="https://docs.docker.com/get-docker">获取 Docker</a>。</p>
<table>
<thead>
<tr><th>操作系统</th><th>软件</th><th>注意</th></tr>
</thead>
<tbody>
<tr><td>Linux 平台</td><td><ul><li>Kubernetes 1.16 或更高版本</li><li>kubectl</li><li>Helm 3.0.0 或更高版本</li><li>minikube（适用于 Milvus 单机版）</li><li>Docker 19.03 或更高版本（适用于 Milvus 单机版）</li></ul></td><td>更多信息，请参阅<a href="https://helm.sh/docs/">Helm 文档</a>。</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>软件</th><th>版本</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>请参阅<a href="#Additional-disk-requirements">其他磁盘要求</a>。</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>脉冲星</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">其他磁盘要求</h3><p>磁盘性能对 etcd 至关重要。强烈建议使用本地 NVMe SSD。较慢的磁盘响应速度可能会导致频繁的群集选举，最终降低 etcd 服务的性能。</p>
<p>要测试磁盘是否合格，请使用<a href="https://github.com/axboe/fio">fio</a>。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>理想情况下，磁盘应达到 500 IOPS 以上，第 99 百分位数 fsync 延迟应低于 10 毫秒。请阅读 etcd<a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">文档</a>了解更多详细要求。</p>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">如何在本地启动 K8s 集群进行测试？</h3><p>你可以使用<a href="https://minikube.sigs.k8s.io/docs/">minikube</a>、<a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">kind</a> 和<a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> 等工具在本地快速建立 Kubernetes 集群。下面的步骤以 minikube 为例。</p>
<ol>
<li>下载 minikube</li>
</ol>
<p>转到 "<a href="https://minikube.sigs.k8s.io/docs/start/">开始</a>"页面，检查是否满足 "<strong>你需要什么 "</strong>部分列出的条件，点击描述目标平台的按钮，然后复制命令下载并安装二进制文件。</p>
<ol start="2">
<li>使用 minikube 启动 K8s 集群</li>
</ol>
<pre><code translate="no" class="language-shell">$ minikube start
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>检查 K8s 群集的状态</li>
</ol>
<p>您可以使用以下命令检查已安装的 K8s 群集的状态。</p>
<pre><code translate="no" class="language-shell">$ kubectl cluster-info
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>确保可以通过<code translate="no">kubectl</code> 访问 K8s 群集。如果您尚未在本地安装<code translate="no">kubectl</code> ，请参阅<a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">在 minikube 内使用 kubectl</a>。</p>
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
<li><p>如果你的硬件和软件符合要求，你就可以</p>
<ul>
<li><a href="/docs/zh/v2.4.x/install_cluster-milvusoperator.md">使用 Milvus Operator 在 Kubernets 中运行 Milvus</a></li>
<li><a href="/docs/zh/v2.4.x/install_cluster-helm.md">使用 Helm 在 Kubernetes 中运行 Milvus</a></li>
</ul></li>
<li><p>有关安装 Milvus 时可设置的参数，请参阅<a href="/docs/zh/v2.4.x/system_configuration.md">系统配置</a>。</p></li>
</ul>
