---
id: visualize.md
title: 指标可视化
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
<p>如<a href="/docs/zh/monitor.md">监控指南</a>所述，指标包含有用的信息，例如特定 Milvus 组件占用的内存量。监控指标有助于您更好地了解 Milvus 的性能及其运行状态，从而能够及时调整资源分配。</p>
<p>可视化是指通过图表展示资源使用情况随时间的变化趋势，这使您能够更轻松地快速查看并察觉资源使用情况的变化，尤其是在发生事件时。</p>
<p>本教程使用 Grafana（一个用于时间序列分析的开源平台）来可视化部署在 Kubernetes（K8s）上的 Milvus 集群的各项性能指标。</p>
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
    </button></h2><ul>
<li>您已在<a href="/docs/zh/install_cluster-helm.md">K8s 上安装了 Milvus 集群。</a></li>
<li>在使用 Grafana 进行指标可视化之前，您需要<a href="/docs/zh/monitor.md">配置 Prometheus</a>来监控和收集指标。如果配置成功，您可以通过<code translate="no">http://localhost:3000</code> 访问 Grafana。或者，您也可以通过 Grafana 的默认地址<code translate="no">user:password</code> 或<code translate="no">admin:admin</code> 访问 Grafana。</li>
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1. 下载并导入仪表盘<button data-href="#1-Download-and-import-dashboard" class="anchor-icon" translate="no">
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
    </button></h3><p>从 JSON 文件下载并导入 Milvus 仪表盘。</p>
<pre><code translate="no" class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/v3.0.5/deployments/monitor/grafana/milvus-dashboard.json
<button class="copy-code-btn"></button></code></pre>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" /> 
   <span>下载_并_导入</span>
  
 </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2. 查看指标<button data-href="#2-View-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>选择您要监控的 Milvus 实例。随后您将看到 Milvus 组件面板。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" /> 
   <span>选择_实例</span>
  
 </span></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" /> 
   <span>Grafana_面板</span>
  
 </span></p>
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
<li>如果您已将 Grafana 配置为可视化 Milvus 指标，您可能还想：
<ul>
<li>了解如何<a href="/docs/zh/alert.md">为 Milvus 服务创建告警</a></li>
<li>调整<a href="/docs/zh/allocate.md">资源分配</a></li>
<li><a href="/docs/zh/scaleout.md">对 Milvus 集群进行横向扩展或缩减</a></li>
</ul></li>
<li>如果您有兴趣升级 Milvus 版本，
<ul>
<li>请阅读《<a href="/docs/zh/upgrade_milvus_cluster-operator.md">Milvus 集群升级指南</a>》和<a href="/docs/zh/upgrade_milvus_standalone-operator.md">《Milvus Standalone 升级指南》</a>。</li>
</ul></li>
</ul>
