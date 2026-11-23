---
id: monitor.md
title: 部署监控服务
related_key: 'monitor, alert'
summary: 了解如何使用 Prometheus 为 Milvus 集群部署监控服务。
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">在 Kubernetes 上部署监控服务<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍了如何使用 Prometheus 在 Kubernetes 上为 Milvus 集群部署监控服务。</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">使用 Prometheus 监控指标<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>指标是反映系统运行状态的指标。例如，通过指标，您可以了解 Milvus 中的数据节点消耗了多少内存或 CPU 资源。了解 Milvus 集群中各组件的性能和状态，有助于您掌握全面信息，从而做出更明智的决策，并更及时地调整资源分配。</p>
<p>通常，指标会存储在<a href="https://prometheus.io/">Prometheus</a> 这样的时间序列数据库（TSDB）中，并带有时间戳。在监控 Milvus 服务时，您可以使用 Prometheus 从导出器设置的端点拉取数据。随后，Prometheus 会将每个 Milvus 组件的指标导出到<code translate="no">http://&lt;component-host&gt;:9091/metrics</code> 。</p>
<p>然而，一个组件可能拥有多个副本，这会导致 Prometheus 的手动配置过于复杂。因此，您可以使用<a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator</a>（Kubernetes 的一个扩展）来自动且高效地管理 Prometheus 监控实例。使用 Prometheus Operator 可免去您手动添加指标目标和服务提供商的麻烦。</p>
<p>ServiceMonitor 自定义资源定义 (CRD) 使您能够以声明式方式定义如何监控一组动态服务。它还允许通过标签选择，根据所需配置来选择要监控的服务。借助 Prometheus Operator，您可以引入规范来指定指标的暴露方式。 新服务将根据您设定的约定被自动发现，无需手动重新配置。</p>
<p>下图展示了 Prometheus 的工作流。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" /> 
   <span>Prometheus_architecture</span>
  
 </span></p>
<h2 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>本教程使用<a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus</a>，以省去您安装和手动配置每个监控及告警组件的麻烦。</p>
<p>kube-prometheus 汇集了 Kubernetes 清单、<a href="http://grafana.com/">Grafana</a>仪表板和<a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">Prometheus 规则</a>，并附有文档和脚本。</p>
<p>在部署监控服务之前，您需要使用 kube-prometheus manifests 目录中的配置创建一个监控堆栈。</p>
<p>以下命令使用 kube-prometheus 的<code translate="no">release-0.19</code> 分支，该分支支持 Kubernetes 1.35、1.36 和 1.37 版本。要根据您的 Kubernetes 版本选择相应分支，请参阅<a href="https://github.com/prometheus-operator/kube-prometheus#compatibility">kube-prometheus 兼容性矩阵</a>。</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> --branch release-0.19 https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
默认的 prometheus-k8s 集群角色无法捕获 milvus 的指标，需要进行补丁修改：
</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>要删除一个堆栈，请运行 `<code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code>`。</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">在 Kubernetes 上部署监控服务<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. 访问仪表盘<button data-href="#1-Access-the-dashboards" class="anchor-icon" translate="no">
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
    </button></h3><p>将 Prometheus 服务转发至端口<code translate="no">9090</code> ，将 Grafana 服务转发至端口<code translate="no">3000</code> 。</p>
<pre><code translate="no" class="language-bash">$ kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. 启用 ServiceMonitor<button data-href="#2-Enable-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus Helm 默认未启用 ServiceMonitor。在 Kubernetes 集群中安装 Prometheus Operator 后，可通过添加参数<code translate="no">metrics.serviceMonitor.enabled=true</code> 来启用它。</p>
<h4 id="With-Helm" class="common-anchor-header">使用 Helm</h4><p>如果您已安装 Milvus Helm 图表，可通过如下方式设置参数<code translate="no">metrics.serviceMonitor.enabled=true</code> 来启用 ServiceMonitor。</p>
<pre><code translate="no" class="language-bash">$ helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>此命令使用<code translate="no">--reset-then-reuse-values</code> ，该功能需要 Helm 3.14 或更高版本。使用此选项时，Helm 会将值重置为<code translate="no">--version</code> 中设置的图版本默认值，应用当前发布版本的值，然后应用<code translate="no">--set</code> 中的值。要查找<code translate="no">&lt;current-chart-version&gt;</code> ，请运行<code translate="no">helm list</code> ，并从<code translate="no">CHART</code> 列中的值中删除<code translate="no">milvus-</code> 前缀。 如果您在运行<code translate="no">helm upgrade</code> 时使用了<code translate="no">-f</code> 或<code translate="no">--set</code> ，但未包含<code translate="no">--reset-then-reuse-values</code> 或<code translate="no">--reuse-values</code> ，Helm 将不会保留您在安装时设置的值。</p>
</div>
<p>安装完成后，请使用<code translate="no">kubectl</code> 检查 ServiceMonitor 资源。</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator</h4><p>如果您是通过 Milvus Operator 安装的 Milvus，则该 Operator 会创建 PodMonitor 而不是 ServiceMonitor。该 PodMonitor 的名称与 Milvus 自定义资源的名称相同。 只有当自定义资源中未禁用指标，且集群中存在 PodMonitor CRD 时，操作员才会创建它。kube-prometheus 的<code translate="no">manifests/setup</code> 目录会安装此 CRD。要确保指标已启用，请按以下步骤操作。</p>
<ol>
<li><p>运行以下命令来编辑 Milvus 自定义资源。以下命令假设该自定义资源名为<code translate="no">my-release</code> 。</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p>将<code translate="no">spec.components.disableMetric</code> 字段修改为<code translate="no">false</code> 。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetric:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>保存并退出编辑器。</p></li>
<li><p>等待操作员同步这些更改。您可以通过运行以下命令来检查 PodMonitor。</p>
<pre><code translate="no" class="language-bash">$ kubectl get podmonitor my-release
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. 检查指标<button data-href="#3-Check-the-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>启用 ServiceMonitor 或 PodMonitor 后，您可以通过<code translate="no">http://localhost:9090/</code> 访问 Prometheus 仪表盘。</p>
<p>点击“<code translate="no">Status</code> ”选项卡，然后选择“<code translate="no">Targets</code> ”。您应能看到 Milvus 组件的目标。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" /> 
   <span>Prometheus_targets</span>
  
 </span></p>
<p>点击“<code translate="no">Graph</code> ”选项卡，并在表达式输入框中输入表达式<code translate="no">up{app_kubernetes_io_instance=&quot;my-release&quot;}</code> 。此时应能看到 Milvus 组件的指标。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" /> 
   <span>Prometheus_graph</span>
  
 </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4. 检查 ServiceMonitor<button data-href="#4-Check-the-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>如果您是通过 Helm 安装的 Milvus，请运行以下命令列出 ServiceMonitor。该图表将 Milvus 集群的 ServiceMonitor 命名为<code translate="no">my-release-milvus</code> ，将 Milvus Standalone 的 ServiceMonitor 命名为<code translate="no">my-release-milvus-standalone</code> 。</p>
<pre><code translate="no" class="language-bash">$ kubectl get servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">NAME                           AGE
my-release-milvus              54s
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
    </button></h2><ul>
<li>如果您已为 Milvus 集群部署了监控服务，您可能还想了解如何：
<ul>
<li><a href="/docs/zh/visualize.md">在 Grafana 中可视化 Milvus 指标</a></li>
<li><a href="/docs/zh/alert.md">为 Milvus 服务创建告警</a></li>
<li>调整<a href="/docs/zh/allocate.md">资源分配</a></li>
</ul></li>
<li>如果您正在寻找有关如何扩展 Milvus 集群的信息：
<ul>
<li>了解<a href="/docs/zh/scaleout.md">如何扩展 Milvus 集群</a></li>
</ul></li>
<li>如果您有兴趣升级 Milvus 版本，
<ul>
<li>请阅读《<a href="/docs/zh/upgrade_milvus_cluster-operator.md">Milvus 集群升级指南</a>》和<a href="/docs/zh/upgrade_milvus_standalone-operator.md">《Milvus Standalone 升级指南》</a>。</li>
</ul></li>
</ul>
