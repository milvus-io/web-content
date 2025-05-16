---
id: install_cluster-helm.md
label: Helm
related_key: Kubernetes
summary: 了解如何在 Kubernetes 上安装 Milvus 集群。
title: 使用 Helm 安装 Milvus 群集
---
<h1 id="Run-Milvus-in-Kubernetes-with-Helm" class="common-anchor-header">使用 Helm 在 Kubernetes 中运行 Milvus<button data-href="#Run-Milvus-in-Kubernetes-with-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>本页说明如何使用<a href="https://github.com/zilliztech/milvus-helm">Milvus Helm 图表</a>在 Kubernetes 中启动 Milvus 实例。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Helm 使用一种称为图表的打包格式。图表是描述一组相关 Kubernetes 资源的文件 Collections。Milvus 提供了一组图表，可帮助您部署 Milvus 依赖项和组件。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p><a href="https://helm.sh/docs/intro/install/">安装 Helm CLI</a>。</p></li>
<li><p><a href="/docs/zh/v2.4.x/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">创建 K8s 集群</a>。</p></li>
<li><p>安装<a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>。您可以按以下步骤检查已安装的 StorageClass。</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>安装前检查<a href="/docs/zh/v2.4.x/prerequisite-helm.md">硬件和软件要求</a>。</p></li>
<li><p>安装 Milvus 之前，建议使用<a href="https://milvus.io/tools/sizing">Milvus 大小工具</a>，根据数据大小估算硬件需求。这有助于确保 Milvus 安装的最佳性能和资源分配。</p></li>
</ul>
<div class="alert note">
<p>如果您在绘制图像时遇到任何问题，请通过<a href="mailto:community@zilliz.com">community@zilliz.com</a>联系我们，并提供有关问题的详细信息，我们将为您提供必要的支持。</p>
</div>
<h2 id="Install-Milvus-Helm-Chart" class="common-anchor-header">安装 Milvus Helm 图表<button data-href="#Install-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>在安装 Milvus Helm 图表之前，您需要添加 Milvus Helm 资源库。</p>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>位于<code translate="no">https://github.com/milvus-io/milvus-helm</code> 的 Milvus Helm Charts 软件仓库已经存档，您可以从<code translate="no">https://github.com/zilliztech/milvus-helm</code> 获取进一步更新，具体如下：</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>归档软件源仍可用于 4.0.31 之前的图表。对于以后的版本，请使用新版本库。</p>
</div>
<p>然后从软件源中获取 Milvus 图表，如下所示：</p>
<pre><code translate="no">$ helm repo update
<button class="copy-code-btn"></button></code></pre>
<p>你可以随时运行此命令获取最新的 Milvus Helm 图表。</p>
<h2 id="Online-install" class="common-anchor-header">在线安装<button data-href="#Online-install" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1.部署 Milvus 集群</h3><p>安装好 Helm 图表后，就可以在 Kubernetes 上启动 Milvus 了。本节将指导你完成启动 Milvus 的步骤。</p>
<pre><code translate="no" class="language-shell">$ helm install my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>在上述命令中，<code translate="no">my-release</code> 是版本名称，<code translate="no">milvus/milvus</code> 是本地安装的图表版本库。要使用其他名称，请将<code translate="no">my-release</code> 替换为您认为合适的名称。</p>
<p>上述命令使用默认配置部署 Milvus 群集及其组件和依赖项。要自定义这些设置，我们建议你使用<a href="https://milvus.io/tools/sizing">Milvus 大小工具</a>，根据实际数据大小调整配置，然后下载相应的 YAML 文件。要了解有关配置参数的更多信息，请参阅<a href="https://milvus.io/docs/system_configuration.md">Milvus 系统配置检查表</a>。</p>
<div class="alert note">
  <ul>
    <li>版本名称只能包含字母、数字和破折号。版本名称中不允许使用点。</li>
    <li>在使用 Helm 安装 Milvus 时，默认命令行会安装群集版本的 Milvus。独立安装 Milvus 时需要进一步设置。</li>
    <li>根据<a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">Kubernetes 过时的 API 迁移指南</a>，自 v1.25 起，PodDisruptionBudget 的<b>policy/v1beta1</b>API 版本不再提供服务。建议迁移清单和 API 客户端，改用<b>policy/v1</b>API 版本。<br/>对于仍在 Kubernetes v1.25 及更高版本上使用 PodDisruptionBudget 的<b>policy/v1beta1</b>API 版本的用户，作为一种变通方法，您可以运行以下命令来安装 Milvus：<br/> <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
    <li>更多信息请参见<a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a>和<a href="https://helm.sh/docs/">Helm</a>。</li>
  </ul>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2.检查 Milvus 集群状态</h3><p>运行以下命令检查 Milvus 集群中所有 pod 的状态。</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<p>一旦所有 pod 都在运行，上述命令的输出应与下图类似：</p>
<pre><code translate="no">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-indexnode-5c5f7b5bd9-l8hjg     1/1    Running   0        3m24s
my-release-milvus-mixcoord-7fb9488465-dmbbj      1/1    Running   0        3m23s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-minio-0                               1/1    Running   0        3m23s
my-release-minio-1                               1/1    Running   0        3m23s
my-release-minio-2                               1/1    Running   0        3m23s
my-release-minio-3                               1/1    Running   0        3m23s
my-release-pulsar-autorecovery-86f5dbdf77-lchpc  1/1    Running   0        3m24s
my-release-pulsar-bookkeeper-0                   1/1    Running   0        3m23s
my-release-pulsar-bookkeeper-1                   1/1    Running   0        98s
my-release-pulsar-broker-556ff89d4c-2m29m        1/1    Running   0        3m23s
my-release-pulsar-proxy-6fbd75db75-nhg4v         1/1    Running   0        3m23s
my-release-pulsar-zookeeper-0                    1/1    Running   0        3m23s
my-release-pulsar-zookeeper-metadata-98zbr       0/1   Completed  0        3m24s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3.将本地端口转发给 Milvus</h3><p>运行以下命令获取 Milvus 集群的服务端口。</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-6b</span>d7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>输出结果显示，Milvus 实例的默认端口为<strong>19530</strong>。</p>
<div class="alert note">
<p>如果以独立模式部署了 Milvus，请将 pod 名称从<code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> 更改为<code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code> 。</p>
</div>
<p>然后，运行以下命令将本地端口转发到 Milvus 服务的端口。</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>可以选择在上述命令中使用<code translate="no">:19530</code> 而不是<code translate="no">27017:19530</code> ，让<code translate="no">kubectl</code> 为你分配一个本地端口，这样你就不必管理端口冲突了。</p>
<p>默认情况下，kubectl 的端口转发只监听<code translate="no">localhost</code> 。如果想让 Milvus 监听所选或所有 IP 地址，请使用<code translate="no">address</code> 标志。下面的命令将使端口转发监听主机上的所有 IP 地址。</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-install" class="common-anchor-header">离线安装<button data-href="#Offline-install" class="anchor-icon" translate="no">
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
    </button></h2><p>如果处于网络受限的环境，请按照本节的步骤启动 Milvus 群集。</p>
<h3 id="1-Get-Milvus-manifest" class="common-anchor-header">1.获取 Milvus 清单</h3><p>运行以下命令获取 Milvus 清单。</p>
<pre><code translate="no" class="language-shell">$ helm template my-release milvus/milvus &gt; milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>上述命令会渲染 Milvus 群集的图表模板，并将输出保存到名为<code translate="no">milvus_manifest.yaml</code> 的清单文件中。使用此清单，你可以在单独的 pod 中安装 Milvus 群集及其组件和依赖项。</p>
<div class="alert note">
<ul>
<li>要在独立模式下安装 Milvus 实例（所有 Milvus 组件都包含在一个 pod 中），应改成运行<code translate="no">helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsar.enabled=false milvus/milvus &gt; milvus_manifest.yaml</code> ，为独立模式下的 Milvus 实例渲染图表模板。</li>
<li>要更改 Milvus 配置，请下载 <a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml"><code translate="no">value.yaml</code></a>模板，将所需设置放入其中，然后使用<code translate="no">helm template -f values.yaml my-release milvus/milvus &gt; milvus_manifest.yaml</code> 渲染相应的清单。</li>
</ul>
</div>
<h3 id="2-Download-image-pulling-script" class="common-anchor-header">2.下载图像拉取脚本</h3><p>图像提取脚本是用 Python 开发的。您应在<code translate="no">requirement.txt</code> 文件中下载该脚本及其依赖项。</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt</span>
$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Pull-and-save-images" class="common-anchor-header">3.提取并保存图像</h3><p>运行以下命令提取并保存所需的图像。</p>
<pre><code translate="no" class="language-shell">$ pip3 install -r requirements.txt
$ python3 save_image.py --manifest milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>图像会被提取到当前目录下名为<code translate="no">images</code> 的子文件夹中。</p>
<h3 id="4-Load-images" class="common-anchor-header">4.加载图像</h3><p>现在，您可以在网络受限环境中将图像加载到主机上，具体操作如下：</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> $(find . -<span class="hljs-built_in">type</span> f -name <span class="hljs-string">&quot;*.tar.gz&quot;</span>) ; <span class="hljs-keyword">do</span> gunzip -c <span class="hljs-variable">$image</span> | docker load; <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="5-Deploy-Milvus" class="common-anchor-header">5.部署 Milvus</h3><pre><code translate="no" class="language-shell">$ kubectl apply -f milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>到此为止，你可以按照在线安装的步骤<a href="#2-Check-Milvus-cluster-status">2</a>和<a href="#3-Forward-a-local-port-to-Milvus">3</a>检查群集状态，并将本地端口转发给 Milvus。</p>
<h2 id="Upgrade-running-Milvus-cluster" class="common-anchor-header">升级运行中的 Milvus 群集<button data-href="#Upgrade-running-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>运行以下命令将正在运行的 Milvus 群集升级到最新版本：</p>
<pre><code translate="no" class="language-shell">$ helm repo update
$ helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">卸载 Milvus<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>运行以下命令卸载 Milvus。</p>
<pre><code translate="no" class="language-bash">$ helm uninstall my-release
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>在 Docker 中安装 Milvus 后，你可以</p>
<ul>
<li><p>查看<a href="/docs/zh/v2.4.x/quickstart.md">Hello Milvus</a>，了解 Milvus 的功能。</p></li>
<li><p>了解 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/manage_databases.md">管理数据库</a></li>
<li><a href="/docs/zh/v2.4.x/manage-collections.md">管理 Collections</a></li>
<li><a href="/docs/zh/v2.4.x/manage-partitions.md">管理分区</a></li>
<li><a href="/docs/zh/v2.4.x/insert-update-delete.md">插入、倒置和删除</a></li>
<li><a href="/docs/zh/v2.4.x/single-vector-search.md">单向量搜索</a></li>
<li><a href="/docs/zh/v2.4.x/multi-vector-search.md">混合搜索</a></li>
</ul></li>
<li><p><a href="/docs/zh/v2.4.x/upgrade_milvus_cluster-helm.md">使用 Helm 图表升级 Milvus</a>。</p></li>
<li><p><a href="/docs/zh/v2.4.x/scaleout.md">扩展你的 Milvus 集群</a>。</p></li>
<li><p>在云上部署你的 Milvus 集群：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/eks.md">亚马逊 EKS</a></li>
<li><a href="/docs/zh/v2.4.x/gcp.md">谷歌云</a></li>
<li><a href="/docs/zh/v2.4.x/azure.md">微软 Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh/v2.4.x/milvus_backup_overview.md">Milvus 备份</a>，一个用于 Milvus 数据备份的开源工具。</p></li>
<li><p>探索<a href="/docs/zh/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>，用于调试 Milvus 和动态配置更新的开源工具。</p></li>
<li><p>探索<a href="https://milvus.io/docs/attu.md">Attu</a>，一款用于直观管理 Milvus 的开源图形用户界面工具。</p></li>
<li><p><a href="/docs/zh/v2.4.x/monitor.md">使用 Prometheus 监控 Milvus</a>。</p></li>
</ul>
