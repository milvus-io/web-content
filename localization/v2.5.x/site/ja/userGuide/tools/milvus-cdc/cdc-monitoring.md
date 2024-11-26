---
id: cdc-monitoring.md
order: 4
summary: >-
  Milvus-CDC provides comprehensive monitoring capabilities through Grafana
  dashboards.
title: Monitoring
---
<h1 id="Monitoring" class="common-anchor-header">Monitoring<button data-href="#Monitoring" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC provides comprehensive monitoring capabilities through Grafana dashboards, allowing you to visualize key metrics and ensure the smooth operation of your Change Data Capture (CDC) tasks and server health.</p>
<h3 id="Metrics-for-CDC-tasks" class="common-anchor-header">Metrics for CDC tasks</h3><p>To get started, import the <a href="https://github.com/zilliztech/milvus-cdc/blob/main/server/configs/cdc-grafana.json">cdc-grafana.json</a> file into Grafana. This will add a dashboard specifically designed for monitoring the status of CDC tasks.</p>
<p><strong>CDC Grafana Dashboard Overview</strong>:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/milvus-cdc-dashboard.png" alt="milvus-cdc-dashboard" class="doc-image" id="milvus-cdc-dashboard" />
    <span>milvus-cdc-dashboard</span>
  </span>
</p>
<p><strong>Key Metrics Explained:</strong></p>
<ul>
<li><p><strong>Task</strong>: Number of CDC tasks in different states, including <strong>Initial</strong>, <strong>Running</strong>, and <strong>Paused</strong>.</p></li>
<li><p><strong>Request Total</strong>: Total number of requests received by Milvus-CDC.</p></li>
<li><p><strong>Request Success</strong>: Number of successful requests received by Milvus-CDC.</p></li>
<li><p><strong>task num</strong>: Number of tasks in <strong>Initial</strong>, <strong>Paused</strong>, and <strong>Running</strong> states over time.</p></li>
<li><p><strong>task state</strong>: State of individual tasks.</p></li>
<li><p><strong>request count</strong>: Number of successful and total requests</p></li>
<li><p><strong>request latency</strong>: Latency of requests through p99, average and other statistics.</p></li>
<li><p><strong>replicate data rate</strong>: Replication data rate for read/write operations</p></li>
<li><p><strong>replicate tt lag</strong>: Replication time lag for read/write operations.</p></li>
<li><p><strong>api execute count</strong>: Number of times different Milvus-CDC APIs were executed.</p></li>
<li><p><strong>center ts</strong>: Timestamp for read/write tasks.</p></li>
</ul>
