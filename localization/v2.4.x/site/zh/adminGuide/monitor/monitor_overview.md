---
id: monitor_overview.md
title: 监视器概述
related_key: 'monitor, alert'
summary: 了解 Milvus 如何将 Prometheus 和 Grafana 用于监控和警报服务。
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Milvus 监控框架概述<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍 Milvus 如何使用 Prometheus 监控指标，以及如何使用 Grafana 可视化指标和创建警报。</p>
<h2 id="Prometheus-in-Milvus" class="common-anchor-header">Milvus 中的 Prometheus<button data-href="#Prometheus-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a>是用于 Kubernetes 实施的开源监控和警报工具包。它以时间序列数据的形式收集和存储指标。这意味着度量值在记录时带有时间戳，并与称为标签的可选键值对一起存储。</p>
<p>目前，Milvus 使用 Prometheus 的以下组件：</p>
<ul>
<li>Prometheus 端点，用于从出口商设置的端点提取数据。</li>
<li>Prometheus 操作员，用于有效管理 Prometheus 监控实例。</li>
<li>Kube-prometheus 提供易于操作的端到端 Kubernetes 集群监控。</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">度量名称</h3><p>Prometheus 中有效的度量名称包含三个元素：命名空间、子系统和名称。这三个元素用&quot;_&quot;连接。</p>
<p>Prometheus 监控的 Milvus 度量的命名空间是 &quot;milvus&quot;。根据度量指标所属的角色，其子系统应为以下八个角色之一：&quot;rootcoord&quot;、&quot;proxy&quot;、&quot;querycoord&quot;、&quot;querynode&quot;、&quot;indexcoord&quot;、&quot;indexnode&quot;、&quot;datacoord&quot;、&quot;datanode&quot;。</p>
<p>例如，计算查询向量总数的 Milvus 指标名为<code translate="no">milvus_proxy_search_vectors_count</code> 。</p>
<h3 id="Metric-types" class="common-anchor-header">度量类型</h3><p>Prometheus 支持四种度量类型：</p>
<ul>
<li>计数器：一种累积度量类型，其值只能在重启时增加或重置为零。</li>
<li>仪表：一种度量类型，其值可以上升或下降。</li>
<li>直方图：一种根据可配置的桶进行计数的指标。常见的例子是请求持续时间。</li>
<li>摘要：与直方图类似的一种度量类型，可在滑动时间窗口内计算可配置的量化值。</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">指标标签</h3><p>Prometheus 通过标签来区分具有相同度量名称的样本。标签是度量指标的特定属性。具有相同名称的度量值必须具有相同的<code translate="no">variable_labels</code> 字段值。下表列出了 Milvus 度量常见标签的名称和含义。</p>
<table>
<thead>
<tr><th>标签名称</th><th>定义</th><th>值</th></tr>
</thead>
<tbody>
<tr><td>"节点 ID</td><td>角色的唯一标识。</td><td>由 milvus 生成的全局唯一 ID。</td></tr>
<tr><td>状态</td><td>已处理操作或请求的状态。</td><td>&quot;放弃&quot;、&quot;成功 &quot;或 &quot;失败&quot;。</td></tr>
<tr><td>"查询类型</td><td>读取请求的类型。</td><td>&quot;搜索 &quot;或 &quot;查询&quot;。</td></tr>
<tr><td>"msg_type</td><td>信息的类型。</td><td>&quot;插入&quot;、&quot;删除&quot;、&quot;搜索 &quot;或 &quot;查询&quot;。</td></tr>
<tr><td>"段状态</td><td>段的状态。</td><td>&quot;密封&quot;、&quot;增长&quot;、&quot;刷新&quot;、&quot;冲洗&quot;、&quot;丢弃 &quot;或 &quot;导入&quot;。</td></tr>
<tr><td>"缓存状态</td><td>缓存对象的状态。</td><td>&quot;命中 &quot;或 &quot;未命中&quot;。</td></tr>
<tr><td>"缓存名称</td><td>缓存对象的名称。该标签与 &quot;cache_state &quot;标签一起使用。</td><td>例如 &quot;CollectionID&quot;、&quot;Schema &quot;等。</td></tr>
<tr><td>&quot;通道名称</td><td>消息存储（Pulsar 或 Kafka）中的物理主题。</td><td>例如：&quot;by-dev-rootcoord-dml_0&quot;、&quot;by-dev-rootcoord-dml_255 &quot;等。</td></tr>
<tr><td>"函数名</td><td>处理特定请求的函数名称。</td><td>例如，&quot;CreateCollection&quot;（创建集合）、&quot;CreatePartition&quot;（创建分区）、&quot;CreateIndex&quot;（创建索引）等。</td></tr>
<tr><td>"用户名</td><td>用于身份验证的用户名。</td><td>用户名由用户自行决定。</td></tr>
<tr><td>"索引任务状态</td><td>索引任务在元存储中的状态。</td><td>&quot;未发布&quot;、&quot;进行中&quot;、&quot;失败&quot;、&quot;已完成 &quot;或 &quot;已回收&quot;。</td></tr>
</tbody>
</table>
<h2 id="Grafana-in-Milvus" class="common-anchor-header">Milvus 中的 Grafana<button data-href="#Grafana-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a>是一个开源的可视化堆栈，可以连接所有数据源。通过调出指标，它可以帮助用户理解、分析和监控海量数据。</p>
<p>Milvus 使用 Grafana 的可定制仪表盘进行指标可视化。</p>
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
    </button></h2><p>了解了监控和警报的基本工作流程后，请学习：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/monitor.md">部署监控服务</a></li>
<li><a href="/docs/zh/v2.4.x/visualize.md">可视化 Milvus 指标</a></li>
<li><a href="/docs/zh/v2.4.x/alert.md">创建警报</a></li>
</ul>
