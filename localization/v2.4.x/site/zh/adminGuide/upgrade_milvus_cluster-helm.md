---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: 了解如何使用 Helm 图表升级 Milvus 集群。
title: 使用 Helm 图表升级 Milvus 群集
---
<div class="tab-wrapper"><a href="/docs/zh/v2.4.x/upgrade_milvus_cluster-operator.md" class=''>Milvus</a><a href="/docs/zh/v2.4.x/upgrade_milvus_cluster-helm.md" class='active '>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Helm-Chart" class="common-anchor-header">使用 Helm 图表升级 Milvus 群集<button data-href="#Upgrade-Milvus-Cluster-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南介绍如何使用 Milvus Helm 图表升级 Milvus 集群。</p>
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
<li>Helm 版本 &gt;= 3.14.0</li>
<li>Kubernetes 版本 &gt;= 1.20.0</li>
</ul>
<div class="alert note">
<p>自 Milvus Helm 图表 4.2.21 版起，我们引入了 pulsar-v3.x 图表作为依赖。为了向后兼容，请将 Helm 升级到 v3.14 或更高版本，并确保在使用<code translate="no">helm upgrade</code> 时添加<code translate="no">--reset-then-reuse-values</code> 选项。</p>
</div>
<h2 id="Check-Milvus-Helm-Chart" class="common-anchor-header">检查 Milvus Helm 图表<button data-href="#Check-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>运行以下命令检查新的 Milvus 版本。</p>
<pre><code translate="no">$ helm repo update zilliztech
$ helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">https://milvus-io.github.io/milvus-helm/</code> 上的 Milvus Helm Charts repo 已归档，您可以从<code translate="no">https://zilliztech.github.io/milvus-helm/</code> 获取进一步更新，具体如下：</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>归档软件源仍可用于 4.0.31 之前的图表。对于后续版本，请使用新版本库。</p>
</div>
<pre><code translate="no">NAME                    CHART VERSION   APP VERSION             DESCRIPTION                                       
zilliztech/milvus       4.1.34          2.4.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.33          2.4.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.32          2.4.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.31          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.30          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.29          2.4.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.24          2.3.11                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.23          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.22          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.21          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.20          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.18          2.3.10                  Milvus is an open-source vector database built ... 
zilliztech/milvus       4.1.18          2.3.9                   Milvus is an open-source vector database built ...                                       
zilliztech/milvus       4.1.17          2.3.8                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.16          2.3.7                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.15          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.14          2.3.6                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.13          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.12          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.11          2.3.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.10          2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.9           2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.8           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.7           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.6           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.5           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.4           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.3           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.2           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.1           2.3.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.0           2.3.0                   Milvus is an open-source vector database built ...
<button class="copy-code-btn"></button></code></pre>
<p>您可以按以下方式选择 Milvus 的升级路径：</p>
<div style="display: none;">- 进行滚动升级](#conduct-a-rolling-upgrade) 从 Milvus v2.2.3 及以后的版本升级到 v2.4.23。</div>
<ul>
<li><p><a href="#Upgrade-Milvus-using-Helm">使用 Helm 升级 Milvus</a>，从 v2.2.3 之前的次版本升级到 v2.4.23。</p></li>
<li><p>在从 Milvus v2.1.x 升级到 v2.4.23 之前<a href="#Migrate-the-metadata">迁移元数据</a>。</p></li>
</ul>
<div style="display: none;">
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">进行滚动升级<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>自 Milvus 2.2.3 起，您可以将 Milvus 协调器配置为主动待机模式，并为其启用滚动升级功能，这样 Milvus 就能在协调器升级期间响应传入的请求。在以前的版本中，升级时需要移除协调器，然后再创建协调器，这可能会导致服务出现一定的停机时间。</p>
<p>滚动升级要求协调程序以活动-待机模式工作。您可以使用我们提供的<a href="https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh">脚本</a>将协调程序配置为活动-待机模式，然后开始滚动升级。</p>
<p>基于 Kubernetes 提供的滚动更新功能，上述脚本会根据部署的依赖关系对部署进行有序更新。此外，Milvus 还实现了一种机制，确保其组件在升级期间与依赖它们的组件保持兼容，从而大大减少了潜在的服务停机时间。</p>
<p>该脚本仅适用于升级与 Helm 一起安装的 Milvus。下表列出了脚本中可用的命令标志。</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>默认值</th><th>需要</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Milvus 实例名称</td><td><code translate="no">None</code></td><td>为真</td></tr>
<tr><td><code translate="no">n</code></td><td>Milvus 安装的命名空间</td><td><code translate="no">default</code></td><td>假</td></tr>
<tr><td><code translate="no">t</code></td><td>Milvus 目标版本</td><td><code translate="no">None</code></td><td>真</td></tr>
<tr><td><code translate="no">w</code></td><td>新的 Milvus 图像标签</td><td><code translate="no">milvusdb/milvus:v2.2.3</code></td><td>真</td></tr>
<tr><td><code translate="no">o</code></td><td>操作符</td><td><code translate="no">update</code></td><td>假</td></tr>
</tbody>
</table>
<p>确保 Milvus 实例中的所有部署都处于正常状态后。可以运行以下命令将 Milvus 实例升级到 2.4.23。</p>
<pre><code translate="no" class="language-shell">sh rollingUpdate.<span class="hljs-property">sh</span> -n <span class="hljs-keyword">default</span> -i my-release -o update -t <span class="hljs-number">2.4</span><span class="hljs-number">.23</span> -w <span class="hljs-string">&#x27;milvusdb/milvus:v2.4.23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ol>
<li>脚本硬编码了部署的升级顺序，不可更改。</li>
<li>脚本使用<code translate="no">kubectl patch</code> 更新部署，使用<code translate="no">kubectl rollout status</code> 观察部署状态。</li>
<li>脚本使用<code translate="no">kubectl patch</code> 将部署的<code translate="no">app.kubernetes.io/version</code> 标签更新为命令中<code translate="no">-t</code> 标志后指定的标签。</li>
</ol>
</div>
</div>
<h2 id="Upgrade-Milvus-using-Helm" class="common-anchor-header">使用 Helm 升级 Milvus<button data-href="#Upgrade-Milvus-using-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>要将 Milvus 从 v2.2.3 之前的次版本升级到最新版本，请运行以下命令：</p>
<pre><code translate="no" class="language-shell">helm repo update zilliztech
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values --version=<span class="hljs-number">4.1</span><span class="hljs-number">.24</span> <span class="hljs-comment"># use the helm chart version here</span>
<button class="copy-code-btn"></button></code></pre>
<p>在前面的命令中使用 Helm 图表版本。有关如何获取 Helm 图表版本的详细信息，请参阅<a href="#Check-the-Milvus-version">检查 Milvus 版本</a>。</p>
<h2 id="Migrate-the-metadata" class="common-anchor-header">迁移元数据<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>自 Milvus 2.2.0 起，元数据与之前版本的元数据不兼容。以下示例片段假定从 Milvus 2.1.4 升级到 Milvus 2.2.0。</p>
<h3 id="1-Check-the-Milvus-version" class="common-anchor-header">1.检查 Milvus 版本</h3><p>运行<code translate="no">$ helm list</code> 检查 Milvus 应用程序版本。您可以看到<code translate="no">APP VERSION</code> 是 2.1.4。</p>
<pre><code translate="no"><span class="hljs-variable constant_">NAME</span>                <span class="hljs-variable constant_">NAMESPACE</span>   <span class="hljs-variable constant_">REVISION</span>    <span class="hljs-variable constant_">UPDATED</span>                                 <span class="hljs-variable constant_">STATUS</span>      <span class="hljs-variable constant_">CHART</span>           <span class="hljs-variable constant_">APP</span> <span class="hljs-variable constant_">VERSION</span>    
<span class="hljs-keyword">new</span>-release         <span class="hljs-keyword">default</span>     <span class="hljs-number">1</span>           <span class="hljs-number">2022</span>-<span class="hljs-number">11</span>-<span class="hljs-number">21</span> <span class="hljs-number">15</span>:<span class="hljs-number">41</span>:<span class="hljs-number">25.51539</span> +<span class="hljs-number">0800</span> <span class="hljs-variable constant_">CST</span>     deployed    milvus-<span class="hljs-number">3.2</span><span class="hljs-number">.18</span>   <span class="hljs-number">2.1</span><span class="hljs-number">.4</span> 
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Check-the-running-pods" class="common-anchor-header">2.检查正在运行的 pod</h3><p>运行<code translate="no">$ kubectl get pods</code> 检查正在运行的 pod。您可以看到以下输出。</p>
<pre><code translate="no">NAME                                             READY   STATUS      RESTARTS   AGE
my-release-etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-etcd<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-etcd<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-datacoord<span class="hljs-number">-664</span>c58798d-fl75s    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-datanode<span class="hljs-number">-5f</span>75686c55-xfg2r     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-indexcoord<span class="hljs-number">-5f</span>98b97589<span class="hljs-number">-2l</span>48r   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-indexnode<span class="hljs-number">-857b</span>4ddf98-vmd75    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-proxy<span class="hljs-number">-6</span>c548f787f-scspp        <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-querycoord-c454f44cd-dwmwq    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-querynode<span class="hljs-number">-76b</span>b4946d-lbrz6     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-rootcoord<span class="hljs-number">-7764</span>c5b686<span class="hljs-number">-62</span>msm    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-0</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-1</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-2</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-3</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie<span class="hljs-number">-2</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie-<span class="hljs-keyword">init</span>-tjxpj             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-pulsar-<span class="hljs-keyword">init</span>-c8vvc             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">20</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">20</span>m
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-image-tag" class="common-anchor-header">3.检查图像标签</h3><p>检查 pod<code translate="no">my-release-milvus-proxy-6c548f787f-scspp</code> 的图像标签。您可以看到 Milvus 集群的版本是 v2.1.4。</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods my-release-milvus-proxy<span class="hljs-number">-6</span>c548f787f-scspp -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span>
<span class="hljs-meta"># milvusdb/milvus:v2.1.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-Migrate-the-metadata" class="common-anchor-header">4.迁移元数据</h3><p>Milvus 2.2 的一个主要变化是段索引的元数据结构。因此，当 Milvus 从 v2.1.x 升级到 v2.2.0 时，你需要使用 Helm 来迁移元数据。 这里有<a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">一个脚本</a>供你安全迁移元数据。</p>
<p>此脚本仅适用于安装在 K8s 集群上的 Milvus。如果过程中出现错误，请先使用回滚操作符回滚到之前的版本。</p>
<p>下表列出了元数据迁移的操作符。</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>默认值</th><th>需要</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Milvus 实例名称。</td><td><code translate="no">None</code></td><td>真</td></tr>
<tr><td><code translate="no">n</code></td><td>Milvus 安装的命名空间。</td><td><code translate="no">default</code></td><td>假</td></tr>
<tr><td><code translate="no">s</code></td><td>Milvus 源版本。</td><td><code translate="no">None</code></td><td>真</td></tr>
<tr><td><code translate="no">t</code></td><td>目标 Milvus 版本。</td><td><code translate="no">None</code></td><td>目标版本</td></tr>
<tr><td><code translate="no">r</code></td><td>Milvus 元的根路径。</td><td><code translate="no">by-dev</code></td><td>假</td></tr>
<tr><td><code translate="no">w</code></td><td>新的 Milvus 图像标签。</td><td><code translate="no">milvusdb/milvus:v2.2.0</code></td><td>假</td></tr>
<tr><td><code translate="no">m</code></td><td>元迁移图像标签。</td><td><code translate="no">milvusdb/meta-migration:v2.2.0</code></td><td>假</td></tr>
<tr><td><code translate="no">o</code></td><td>元迁移操作符。</td><td><code translate="no">migrate</code></td><td>假</td></tr>
<tr><td><code translate="no">d</code></td><td>迁移完成后是否删除迁移 pod。</td><td><code translate="no">false</code></td><td>否</td></tr>
<tr><td><code translate="no">c</code></td><td>元迁移 pvc 的存储类别。</td><td><code translate="no">default storage class</code></td><td>假</td></tr>
<tr><td><code translate="no">e</code></td><td>Milvus 使用的 etcd enpoint。</td><td><code translate="no">etcd svc installed with milvus</code></td><td>错误</td></tr>
</tbody>
</table>
<h4 id="1-Migrate-the-metadata" class="common-anchor-header">1.迁移元数据</h4><ol>
<li>下载<a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">迁移脚本</a>。</li>
<li>停止 Milvus 组件。Milvus etcd 中的任何实时会话都可能导致迁移失败。</li>
<li>创建 Milvus 元数据备份。</li>
<li>迁移 Milvus 元数据。</li>
<li>使用新镜像启动 Milvus 组件。</li>
</ol>
<h4 id="2-Upgrade-Milvus-from-v21x-to-220" class="common-anchor-header">2.将 Milvus 从 2.1.x 版升级到 2.2.0 版</h4><p>以下命令假定你将 Milvus 从 v2.1.4 升级到 2.2.0。请将它们更改为适合你需要的版本。</p>
<ol>
<li><p>指定 Milvus 实例名称、源 Milvus 版本和目标 Milvus 版本。</p>
<pre><code translate="no">./migrate.sh -i my-release -s 2.1.4 -t 2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>如果你的 Milvus 没有安装在默认的 K8s 命名空间，请用<code translate="no">-n</code> 指定命名空间。</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>如果 Milvus 安装的是自定义<code translate="no">rootpath</code> ，请用<code translate="no">-r</code> 指定根路径。</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev
<button class="copy-code-btn"></button></code></pre></li>
<li><p>如果你的 Milvus 安装的是自定义<code translate="no">image</code> ，请用<code translate="no">-w</code> 指定图片标签。</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -w milvusdb/milvus:v2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>如果想在迁移完成后自动移除迁移 pod，请设置<code translate="no">-d true</code> 。</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -w milvusdb/milvus:v2.2.0 -d <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>如果迁移失败，请回滚并重新迁移。</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -o rollback -w milvusdb/milvus:v2.1.4
./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -o migrate -w milvusdb/milvus:v2.2.0
<button class="copy-code-btn"></button></code></pre></li>
</ol>
