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
    </button></h1><p>本主题介绍如何使用 Prometheus 为 Kubernetes 上的 Milvus 群集部署监控服务。</p>
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
    </button></h2><p>指标是提供系统运行状态信息的指示器。例如，通过指标，您可以了解 Milvus 中数据节点消耗了多少内存或 CPU 资源。了解 Milvus 集群中各组件的性能和状态，可以让你充分了解情况，从而做出更好的决策，更及时地调整资源分配。</p>
<p>一般来说，度量指标存储在时间序列数据库（TSDB）中，如<a href="https://prometheus.io/">Prometheus</a>，度量指标记录有时间戳。在监控 Milvus 服务的情况下，可以使用 Prometheus 从出口程序设置的端点提取数据。然后，Prometheus 在<code translate="no">http://&lt;component-host&gt;:9091/metrics</code> 导出每个 Milvus 组件的指标。</p>
<p>不过，一个组件可能有多个副本，这使得 Prometheus 的手动配置过于复杂。因此，您可以使用<a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator</a>（Kubernetes 的扩展）来自动有效地管理 Prometheus 监控实例。使用 Prometheus Operator 可以省去手动添加度量目标和服务提供商的麻烦。</p>
<p>通过 ServiceMonitor 定制资源定义（CRD），您可以声明式地定义如何监控一组动态服务。它还允许使用标签选择以所需配置监控哪些服务。使用 Prometheus Operator，您可以引入约定，指定如何暴露度量。新服务可以按照您设置的约定自动发现，而无需手动重新配置。</p>
<p>下图说明了 Prometheus 工作流程。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" />
   </span> <span class="img-wrapper"> <span>普罗米修斯架构</span> </span></p>
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
    </button></h2><p>本教程使用<a href="https://github.com/prometheus-operator/kube-prometheus">Kube-prometheus</a>，省去了安装和手动配置每个监控和警报组件的麻烦。</p>
<p>Kube-prometheus 收集了 Kubernetes 清单、<a href="http://grafana.com/">Grafana</a>面板和<a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">Prometheus 规则</a>以及文档和脚本。</p>
<p>在部署监控服务之前，您需要使用 kube-prometheus manifests 目录中的配置创建一个监控栈。</p>
<pre><code translate="no">$ git <span class="hljs-built_in">clone</span> https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
默认的 prometheus-k8s clusterrole 无法捕获 milvus 的指标，需要打补丁：</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>要删除堆栈，请运行<code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code> 。</p>
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1.访问仪表板</h3><p>将 Prometheus 服务转发至<code translate="no">9090</code> 端口，将 Grafana 服务转发至<code translate="no">3000</code> 端口。</p>
<pre><code translate="no">$ kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2.启用服务监控器</h3><p>Milvus Helm 默认未启用 ServiceMonitor。在 Kubernetes 集群中安装 Prometheus 操作器后，可以通过添加参数<code translate="no">metrics.serviceMonitor.enabled=true</code> 来启用它。</p>
<pre><code translate="no">$ helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span> --reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>安装完成后，使用<code translate="no">kubectl</code> 检查 ServiceMonitor 资源。</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                           AGE
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
<li>如果你已经为 Milvus 群集部署了监控服务，你可能还想学习以下内容：<ul>
<li><a href="/docs/zh/v2.4.x/visualize.md">在 Grafana 中可视化 Milvus 指标</a></li>
<li><a href="/docs/zh/v2.4.x/alert.md">为 Milvus 服务创建警报</a></li>
<li>调整<a href="/docs/zh/v2.4.x/allocate.md">资源分配</a></li>
</ul></li>
<li>如果你正在寻找有关如何扩展 Milvus 集群的信息：<ul>
<li>了解如何<a href="/docs/zh/v2.4.x/scaleout.md">扩展 Milvus 集群</a></li>
</ul></li>
<li>如果你有兴趣升级 Milvus 版本、<ul>
<li>请阅读<a href="/docs/zh/v2.4.x/upgrade_milvus_cluster-operator.md">Milvus 集群升级指南</a>和<a href="/docs/zh/v2.4.x/upgrade_milvus_standalone-operator.md">Milvus 独立版本升级</a> <a href="/docs/zh/v2.4.x/upgrade_milvus_cluster-operator.md">指南</a>。</li>
</ul></li>
</ul>
