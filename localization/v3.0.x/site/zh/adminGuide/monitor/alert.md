---
id: alert.md
title: 创建提醒
related_key: monitor and alert.
summary: 了解如何在 Grafana 中为 Milvus 服务创建告警。
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">为 Milvus 服务创建警报<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍了 Milvus 服务的告警机制，并说明了为何、何时以及如何在 Milvus 中创建告警。</p>
<p>通过创建告警，当特定指标的数值超过您预先设定的阈值时，您将收到通知。</p>
<p>例如，您创建一个告警，并将 Milvus 组件的内存使用量上限设置为 80 MB。如果实际使用量超过预设数值，您将收到告警，提醒您 Milvus 组件的内存使用量已超过 80 MB。 收到警报后，您可以据此及时调整资源分配，以确保服务可用性。</p>
<h2 id="Scenarios-for-creating-alerts" class="common-anchor-header">创建警报的场景<button data-href="#Scenarios-for-creating-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>以下是一些需要创建警报的常见场景。</p>
<ul>
<li>Milvus 组件的 CPU 或内存使用率过高。</li>
<li>Milvus 组件 Pod 的磁盘空间不足。</li>
<li>Milvus 组件 Pod 重启过于频繁。</li>
</ul>
<p>以下指标可用于告警配置：</p>
<table>
<thead>
<tr><th>指标</th><th>描述</th><th>计量单位</th></tr>
</thead>
<tbody>
<tr><td>CPU 使用率</td><td>Milvus 组件的 CPU 使用率，以 CPU 运行时间表示。</td><td>秒</td></tr>
<tr><td>内存</td><td>Milvus 组件消耗的内存资源。</td><td>MB</td></tr>
<tr><td>Goroutines</td><td>Go语言中并发执行的活动。</td><td>/</td></tr>
<tr><td>操作系统线程</td><td>操作系统中的线程，即轻量级进程。</td><td>/</td></tr>
<tr><td>进程已打开的文件描述符</td><td>当前已使用的文件描述符数量。</td><td>/</td></tr>
</tbody>
</table>
<h2 id="Set-up-alerts" class="common-anchor-header">设置警报<button data-href="#Set-up-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南以创建 Milvus 组件内存使用情况警报为例。若要创建其他类型的警报，请相应调整您的命令。如果在操作过程中遇到任何问题，欢迎在<a href="https://discuss.milvus.io/">Milvus 论坛</a>提问或在<a href="https://discord.com/invite/8uyFbECzPX">Discord</a> 上发起讨论。</p>
<h3 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><p>本教程假设您已安装并配置好 Grafana。若未安装，建议<a href="/docs/zh/monitor.md">阅读监控指南</a>。</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. 添加新查询<button data-href="#1-Add-a-new-query" class="anchor-icon" translate="no">
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
    </button></h3><p>要为 Milvus 组件的内存使用情况添加告警，请编辑“内存”面板。然后，使用以下指标添加一个新查询：<code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" /> 
   <span>Alert_metric</span>
  
 </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. 保存仪表盘<button data-href="#2-Save-the-dashboard" class="anchor-icon" translate="no">
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
    </button></h3><p>保存仪表盘，并等待几分钟即可看到警报。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" /> 
   <span>Alert_dashboard</span>
  
 </span></p>
<p>Grafana 告警查询不支持模板变量。因此，您应在标签中不包含任何模板变量，并添加第二个查询。该查询默认命名为“A”。您可以通过点击下拉菜单对其进行重命名。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" /> 
   <span>Alert_query</span>
  
 </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. 添加警报通知<button data-href="#3-Add-alert-notifications" class="anchor-icon" translate="no">
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
    </button></h3><p>要接收警报通知，请创建一个联系点。在 Grafana 中，转至<strong>“警报与 IRM</strong>”&gt;<strong>“警报”</strong>&gt;<strong>“通知配置</strong>”，选择<strong>“联系点”</strong>选项卡，然后点击<strong>“+ 新建联系点”</strong>。随后，在警报规则的<strong>“配置通知</strong>”部分，选择该联系点，或通过通知策略转发通知。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" /> 
   <span>Alert_notification</span>
  
 </span></p>
<p>如果告警成功创建并触发，您将收到如下截图所示的通知。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" /> 
   <span>通知_消息</span>
  
 </span></p>
<p>要删除警报，请转至“警报”面板并点击删除按钮。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" /> 
   <span>Delete_alert</span>
  
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
<li>如果您需要开始监控 Milvus 的服务：
<ul>
<li>阅读<a href="/docs/zh/monitor.md">监控指南</a></li>
<li>了解如何<a href="/docs/zh/visualize.md">可视化监控指标</a></li>
</ul></li>
<li>如果您已为 Milvus 组件的内存使用情况创建了告警：
<ul>
<li>了解如何<a href="/docs/zh/allocate.md#standalone">分配资源</a></li>
</ul></li>
<li>如果您正在寻找有关如何扩展 Milvus 集群的信息：
<ul>
<li>了解<a href="/docs/zh/scaleout.md">如何扩展 Milvus 集群</a></li>
</ul></li>
</ul>
