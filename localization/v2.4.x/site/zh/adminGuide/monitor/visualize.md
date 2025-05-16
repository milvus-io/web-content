---
id: visualize.md
title: 可视化指标
related_key: 'monitor, alert'
summary: 了解如何在 Grafana 中可视化 Milvus 指标。
---
<h1 id="Visualize-Milvus-Metrics-in-Grafana" class="common-anchor-header">在 Grafana 中可视化 Milvus 指标<button data-href="#Visualize-Milvus-Metrics-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍如何使用 Grafana 可视化 Milvus 指标。</p>
<p>如<a href="/docs/zh/v2.4.x/monitor.md">监控指南</a>所述，指标包含有用的信息，例如特定 Milvus 组件使用了多少内存。监控指标可帮助您更好地了解 Milvus 性能及其运行状态，以便及时调整资源分配。</p>
<p>可视化是显示资源使用量随时间变化的图表，它能让你更容易地快速查看和注意到资源使用量的变化，尤其是在事件发生时。</p>
<p>本教程使用时间序列分析开源平台 Grafana 来可视化部署在 Kubernetes (K8s) 上的 Milvus 集群的各种性能指标。</p>
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
<li>您已<a href="/docs/zh/v2.4.x/install_cluster-helm.md">在 K8s 上安装了 Milvus 集群</a>。）</li>
<li>在使用 Grafana 可视化指标之前，您需要<a href="/docs/zh/v2.4.x/monitor.md">配置 Prometheus</a>以监控和收集指标。如果设置成功，您可以从<code translate="no">http://localhost:3000</code> 访问 Grafana。或者也可以使用<code translate="no">admin:admin</code> 的默认 Grafana<code translate="no">user:password</code> 访问 Grafana。</li>
</ul>
<h2 id="Visualize-metrics-using-Grafana" class="common-anchor-header">使用 Grafana 可视化指标<button data-href="#Visualize-metrics-using-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1.下载并导入仪表盘</h3><p>从 JSON 文件下载并导入 Milvus 仪表板。</p>
<pre><code translate="no">wget https://raw.githubusercontent.com/milvus-io/milvus/2.2.0/deployments/monitor/grafana/milvus-dashboard.json
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" />
   </span> <span class="img-wrapper"> <span>下载并导入</span> </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2.查看指标</h3><p>选择要监控的 Milvus 实例。然后就能看到 Milvus 组件面板。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" />
   </span> <span class="img-wrapper"> <span>选择实例</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" />
   </span> <span class="img-wrapper"> <span>面板</span> </span></p>
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
<li>如果您已将 Grafana 设置为可视化 Milvus 指标，您可能还想：<ul>
<li>了解如何<a href="/docs/zh/v2.4.x/alert.md">为 Milvus 服务创建警报</a></li>
<li>调整<a href="/docs/zh/v2.4.x/allocate.md">资源分配</a></li>
<li><a href="/docs/zh/v2.4.x/scaleout.md">扩大或缩小 Milvus 集群规模</a></li>
</ul></li>
<li>如果你有兴趣升级 Milvus 版本、<ul>
<li>阅读<a href="/docs/zh/v2.4.x/upgrade_milvus_cluster-operator.md">Milvus 集群升级指南</a>和<a href="/docs/zh/v2.4.x/upgrade_milvus_standalone-operator.md">Milvus 独立升级</a> <a href="/docs/zh/v2.4.x/upgrade_milvus_cluster-operator.md">指南</a>。</li>
</ul></li>
</ul>
