---
id: alert.md
title: Create an alert
related_key: monitor and alert.
summary: Learn how to create an alert for Milvus services in Grafana.
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">Create an Alert for Milvus Services<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic introduces the alert mechanism for Milvus services and explains why, when, and how to create alerts in Milvus.</p>
<p>By creating alerts, you can receive notifications when the value of a specific metric exceeds the threshold you have predefined.</p>
<p>For example, you create an alert and set 80 MB as the maximum value for memory usage by Milvus components. If the actual usage exceeds the predefined number, you will receive alerts reminding you that the memory usage by Milvus component surpasses 80 MB. Upon the alert, you can then adjust the allocation of resources accordingly and timely to ensure service availability.</p>
<h2 id="Scenarios-for-creating-alerts" class="common-anchor-header">Scenarios for creating alerts<button data-href="#Scenarios-for-creating-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>Below are some common scenarios where you need to create an alert for.</p>
<ul>
<li>CPU or memory usage by Milvus components is too high.</li>
<li>Milvus component pods are running low on disk space.</li>
<li>Milvus component pods are restarting too frequently.</li>
</ul>
<p>The following metrics are available for alerting configuration:</p>
<table>
<thead>
<tr><th>Metric</th><th>Description</th><th>Unit of measure</th></tr>
</thead>
<tbody>
<tr><td>CPU Usage</td><td>CPU usage by Milvus components that is indicated by the running time of CPU.</td><td>Second</td></tr>
<tr><td>Memory</td><td>Memory resources consumed by Milvus components.</td><td>MB</td></tr>
<tr><td>Goroutines</td><td>Concurrent executing activities in GO language.</td><td>/</td></tr>
<tr><td>OS Threads</td><td>Threads, or lightweight processes in an operating system.</td><td>/</td></tr>
<tr><td>Process Opened Fds</td><td>The current number of used file descriptors.</td><td>/</td></tr>
</tbody>
</table>
<h2 id="Set-up-alerts" class="common-anchor-header">Set up alerts<button data-href="#Set-up-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>This guide takes the example of creating an alert for the memory usage of Milvus components. To create other types of alerts, please adjust your commands accordingly. If you encounter any problems during the process, feel free to ask in the <a href="https://discuss.milvus.io/">Milvus forum</a> or initiate a discussion on <a href="https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ">Slack</a>.</p>
<h3 id="Prerequisites" class="common-anchor-header">Prerequisites</h3><p>This tutorial assumes that you have Grafana installed and configured. If not, we recommend reading the <a href="/docs/v2.0.x/monitor.md">monitoring guide</a>.</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. Add a new query</h3><p>To add an alert for the memory usage of Milvus components, edit the Memory panel. Then, add a new query with the metric: <code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" />
    <span>Alert_metric</span>
  </span>
</p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. Save the dashboard</h3><p>Save the dashboard, and wait for a few minutes to see the alert.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" />
    <span>Alert_dashboard</span>
  </span>
</p>
<p>Grafana alert query does not support template variables. Therefore, you should add a second query without any template variables in the labels. The second query is named as “A” by default. You can rename it by clicking on the dropdown.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" />
    <span>Alert_query</span>
  </span>
</p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. Add alert notifications</h3><p>To receive alert notifications, add a &quot;notification channel&quot;. Then, specify the channel in the field &quot;Send to&quot;.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" />
    <span>Alert_notification</span>
  </span>
</p>
<p>If the alert is successfully created and triggered, you will receive the notification as shown in the screenshot below.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" />
    <span>Notification_message</span>
  </span>
</p>
<p>To delete an alert, go to the “Alert” panel and click the delete button.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" />
    <span>Delete_alert</span>
  </span>
</p>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>If you need to start monitoring services for Milvus:
<ul>
<li>Read the <a href="/docs/v2.0.x/monitor.md">monitoring guide</a></li>
<li>Learn how to <a href="/docs/v2.0.x/visualize.md">visualize monitoring metrics</a></li>
</ul></li>
<li>If you have created alerts for memory usage by Milvus components:
<ul>
<li>Learn how to <a href="/docs/v2.0.x/allocate.md#standalone">allocate resources</a></li>
</ul></li>
<li>If you are looking for information about how to scale a Milvus cluster:
<ul>
<li>Learn <a href="/docs/v2.0.x/scaleout.md">scale a Milvus cluster</a></li>
</ul></li>
</ul>
