---
id: monitor_overview.md
title: 显示器概述
related_key: 'monitor, alert'
summary: 了解 Milvus 中如何利用 Prometheus 和 Grafana 来实现服务监控和告警。
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
    </button></h1><p>本主题介绍了 Milvus 如何利用 Prometheus 监控指标，以及如何利用 Grafana 进行指标可视化并创建告警。</p>
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a>是一个面向 Kubernetes 实现的开源监控和告警工具包。它将指标作为时间序列数据进行收集和存储。这意味着指标在记录时会附带时间戳，并可选地附带称为“标签”的键值对。</p>
<p>目前，Milvus 使用 Prometheus 的以下组件：</p>
<ul>
<li>Prometheus 端点，用于从导出器设置的端点拉取数据。</li>
<li>Prometheus 操作员，用于有效管理 Prometheus 监控实例。</li>
<li>Kube-prometheus，用于提供易于操作的端到端 Kubernetes 集群监控。</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">指标名称<button data-href="#Metric-names" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus 中有效的指标名称包含三个部分：命名空间、子系统和名称。这三个部分用“_”连接。</p>
<p>由 Prometheus 监控的 Milvus 指标的命名空间为“milvus”。 指标的子系统为以下之一：“CDC”、“cgo”、“datacoord”、“datanode”、“indexnode”、“logging”、“meta”、“msg_queue”、“msgstream”、 "proxy"、"querycoord"、"querynode"、"rootcoord"、"storage"、"streaming"、"streamingcoord"、"streamingnode" 以及 "wal"。少数指标（例如<code translate="no">milvus_build_info</code> 和<code translate="no">milvus_num_node</code> ）没有子系统。</p>
<p>例如，用于计算被查询向量总数的 Milvus 指标名为<code translate="no">milvus_proxy_search_vectors_count</code> 。</p>
<h3 id="Metric-types" class="common-anchor-header">指标类型<button data-href="#Metric-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus 支持四种指标类型：</p>
<ul>
<li>计数器（Counter）：一种累积型指标，其值只能增加，或在重启时重置为零。</li>
<li>Gauge：一种指标类型，其值既可能上升也可能下降。</li>
<li>直方图（Histogram）：一种基于可配置桶进行计数的指标。常见的例子是请求时长。</li>
<li>汇总指标（Summary）：一种类似于直方图的指标类型，用于在滑动时间窗口内计算可配置的分位数。</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">指标标签<button data-href="#Metric-labels" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus 通过标签来区分具有相同指标名称的样本。标签是指标的特定属性。名称相同的指标，其 `<code translate="no">variable_labels</code> ` 字段的值必须相同。下表列出了 Milvus 指标中常见标签的名称及其含义。</p>
<table>
<thead>
<tr><th>标签名称</th><th>定义</th><th>值</th></tr>
</thead>
<tbody>
<tr><td>“node_id”</td><td>角色的唯一标识符。</td><td>由 milvus 生成的全局唯一 ID。</td></tr>
<tr><td>“status”</td><td>已处理的操作或请求的状态。</td><td>“abandon”、“success”或“fail”。</td></tr>
<tr><td>“query_type”</td><td>读取请求的类型。</td><td>“search” 或 “query”。</td></tr>
<tr><td>“msg_type”</td><td>消息的类型。</td><td>“insert”、“delete”、“search”或“query”。</td></tr>
<tr><td>“segment_state”</td><td>分段的状态。</td><td>“已封存”、“正在增长”、“已刷新”、“正在刷新”、“已删除”或“正在导入”。</td></tr>
<tr><td>“cache_state”</td><td>缓存对象的状态。</td><td>“命中”或“未命中”。</td></tr>
<tr><td>“cache_name”</td><td>缓存对象的名称。该标签需与“cache_state”标签配合使用。</td><td>例如：“CollectionID”、“Schema”等。</td></tr>
<tr><td>“channel_name”</td><td>消息存储（Pulsar 或 Kafka）中的物理主题。</td><td>例如：“by-dev-rootcoord-dml_0”、“by-dev-rootcoord-dml_255”等。</td></tr>
<tr><td>“function_name”</td><td>处理特定请求的函数名称。</td><td>例如：“CreateCollection”、“CreatePartition”、“CreateIndex”等。</td></tr>
<tr><td>“user_name”</td><td>用于身份验证的用户名。</td><td>可自行选择的用户名。</td></tr>
<tr><td>“index_task_status”</td><td>元数据存储中索引任务的状态。</td><td>“unissued”、“in-progress”、“failed”、“finished”或“recycled”。</td></tr>
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a>是一个开源的可视化平台，可连接所有数据源。通过提取指标，它帮助用户理解、分析和监控海量数据。</p>
<p>Milvus 利用 Grafana 可自定义的仪表盘来实现指标可视化。</p>
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
    </button></h2><p>在了解了监控和告警的基本工作流后，请学习：</p>
<ul>
<li><a href="/docs/zh/monitor.md">部署监控服务</a></li>
<li><a href="/docs/zh/visualize.md">可视化 Milvus 指标</a></li>
<li><a href="/docs/zh/alert.md">创建告警</a></li>
</ul>
