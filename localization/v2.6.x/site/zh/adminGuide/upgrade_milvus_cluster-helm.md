---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: 了解如何使用 Helm 图表升级 Milvus 集群。
title: 使用 Helm 图表升级 Milvus 集群
---
<div class="tab-wrapper"><a href="/docs/zh/upgrade_milvus_cluster-operator.md" class=''>Milvus</a><a href="/docs/zh/upgrade_milvus_cluster-helm.md" class='active '>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Helm-Chart" class="common-anchor-header">使用 Helm 图表升级 Milvus 集群<button data-href="#Upgrade-Milvus-Cluster-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南介绍如何使用 Helm Chart 将 Milvus 集群从 v2.5.x 升级到 v2.6.6。</p>
<h2 id="Before-you-start" class="common-anchor-header">开始之前<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-new-in-v266" class="common-anchor-header">版本 2.6.6 的新功能<button data-href="#Whats-new-in-v266" class="anchor-icon" translate="no">
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
    </button></h3><p>从 Milvus 2.5.x 升级到 2.6.6 涉及重大架构变化：</p>
<ul>
<li><strong>协调器合并</strong>：传统的独立协调器 (<code translate="no">dataCoord</code>,<code translate="no">queryCoord</code>,<code translate="no">indexCoord</code>) 已合并为单一的协调器。<code translate="no">mixCoord</code></li>
<li><strong>新组件</strong>：引入流节点，增强数据处理能力</li>
<li><strong>删除组件</strong>：删除并合并<code translate="no">indexNode</code> </li>
</ul>
<p>此升级过程可确保向新架构的适当迁移。有关架构变化的更多信息，请参阅<a href="/docs/zh/architecture_overview.md">Milvus 架构概述</a>。</p>
<h3 id="Requirements" class="common-anchor-header">系统要求<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>系统要求</strong></p>
<ul>
<li>Helm 版本 &gt;= 3.14.0</li>
<li>Kubernetes 版本 &gt;= 1.20.0</li>
<li>通过 Helm 图表部署 Milvus 集群</li>
</ul>
<p><strong>兼容性要求：</strong></p>
<ul>
<li>Milvus v2.6.0-rc1 与 v2.6.6<strong>不兼容</strong>。不支持从候选版本直接升级。</li>
<li>如果您当前正在运行 v2.6.0-rc1，并需要保留数据，请参考<a href="https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997">本社区指南</a>以获取迁移帮助。</li>
<li>在升级到 v2.6.6 之前，您<strong>必须</strong>升级到 v2.5.16 或更高版本，并启用<code translate="no">mixCoordinator</code> 。</li>
</ul>
<p><strong>消息队列限制</strong>：升级到 Milvus v2.6.6 时，您必须保持当前的消息队列选择。不支持在升级过程中在不同的消息队列系统之间切换。未来版本将支持更改消息队列系统。</p>
<div class="alert note">
自 Milvus Helm 图表 4.2.21 版起，我们引入了 pulsar-v3.x 图表作为依赖。为了向后兼容，请将 Helm 升级到 v3.14 或更高版本，并确保在使用<code translate="no">helm upgrade</code> 时添加<code translate="no">--reset-then-reuse-values</code> 选项。</div>
<h2 id="Upgrade-process" class="common-anchor-header">升级过程<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Upgrade-Helm-Chart" class="common-anchor-header">步骤 1：升级 Helm 图表<button data-href="#Step-1-Upgrade-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h3><p>首先，将您的 Milvus Helm 图表升级到 5.0.0 版本：</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
位于<code translate="no">https://milvus-io.github.io/milvus-helm/</code> 的 Milvus Helm 图表 repo 已归档。对于 4.0.31 及更高版本的图表，请使用新版本库<code translate="no">https://zilliztech.github.io/milvus-helm/</code> 。</div>
<p>要检查 Helm 图表版本与 Milvus 版本的兼容性：</p>
<pre><code translate="no" class="language-bash">helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<p>本指南假定您安装的是最新版本。如果需要安装特定版本，请相应指定<code translate="no">--version</code> 参数。</p>
<h3 id="Step-2-Upgrade-to-v2516-with-mixCoordinator" class="common-anchor-header">步骤 2：使用 mixCoordinator 升级到 v2.5.16<button data-href="#Step-2-Upgrade-to-v2516-with-mixCoordinator" class="anchor-icon" translate="no">
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
    </button></h3><p>检查您的群集当前是否使用单独的协调器：</p>
<pre><code translate="no" class="language-bash">kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>如果看到单独的协调器 pod (<code translate="no">datacoord</code>,<code translate="no">querycoord</code>,<code translate="no">indexcoord</code>) ，请升级到 v2.5.16 并启用<code translate="no">mixCoordinator</code> ：</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.5.16&quot;</span> \
  --<span class="hljs-built_in">set</span> mixCoordinator.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> rootCoordinator.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> indexCoordinator.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> queryCoordinator.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> dataCoordinator.enabled=<span class="hljs-literal">false</span> \
  --reset-then-reuse-values \
  --version=4.2.58
<button class="copy-code-btn"></button></code></pre>
<div class="alert-note">
<p>如果群集已使用<code translate="no">mixCoordinator</code> ，只需升级映像即可：</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.5.16&quot;</span> \
  --reset-then-reuse-values \
  --version=4.2.58
<button class="copy-code-btn"></button></code></pre>
</div>
<p>等待升级完成：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Verify all pods are ready</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Upgrade-to-v266" class="common-anchor-header">步骤 3：升级到 v2.6.6<button data-href="#Step-3-Upgrade-to-v266" class="anchor-icon" translate="no">
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
    </button></h3><p>一旦 v2.5.16 成功运行<code translate="no">mixCoordinator</code> ，请升级到 v2.6.6：</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.6.6&quot;</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span> \
  --reset-then-reuse-values \
  --version=5.0.0
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-upgrade" class="common-anchor-header">验证升级<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>确认群集正在运行新版本：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check pod status</span>
kubectl get pods

<span class="hljs-comment"># Verify Helm release</span>
helm list
<button class="copy-code-btn"></button></code></pre>
<p>如需其他支持，请查阅<a href="https://milvus.io/docs">Milvus 文档</a>或<a href="https://github.com/milvus-io/milvus/discussions">社区论坛</a>。</p>
