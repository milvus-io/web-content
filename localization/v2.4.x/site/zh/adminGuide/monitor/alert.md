---
id: alert.md
title: 创建警报
related_key: monitor and alert.
summary: 了解如何在 Grafana 中为 Milvus 服务创建警报。
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
    </button></h1><p>本主题介绍 Milvus 服务的警报机制，并解释在 Milvus 中创建警报的原因、时间和方法。</p>
<p>通过创建警报，当特定指标值超过预定义的阈值时，您就可以收到通知。</p>
<p>例如，创建警报并将 80 MB 设置为 Milvus 组件内存使用的最大值。如果实际使用量超过了预定义的数字，您就会收到警报，提醒您 Milvus 组件的内存使用量超过了 80 MB。收到警报后，您可以及时调整相应的资源分配，以确保服务的可用性。</p>
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
    </button></h2><p>以下是一些需要创建警报的常见情况。</p>
<ul>
<li>Milvus 组件的 CPU 或内存使用率过高。</li>
<li>Milvus 组件 pod 的磁盘空间不足。</li>
<li>Milvus 组件 pod 重启过于频繁。</li>
</ul>
<p>以下指标可用于警报配置：</p>
<table>
<thead>
<tr><th>指标</th><th>描述</th><th>度量单位</th></tr>
</thead>
<tbody>
<tr><td>CPU 使用量</td><td>Milvus 组件的 CPU 占用率，由 CPU 的运行时间表示。</td><td>秒</td></tr>
<tr><td>内存</td><td>Milvus 组件消耗的内存资源。</td><td>MB</td></tr>
<tr><td>程序</td><td>用 GO 语言并发执行的活动。</td><td>/</td></tr>
<tr><td>操作系统线程</td><td>操作系统中的线程或轻量级进程。</td><td>/</td></tr>
<tr><td>进程打开的文件</td><td>当前使用的文件描述符数量。</td><td>/</td></tr>
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
    </button></h2><p>本指南以创建 Milvus 组件内存使用警报为例。要创建其他类型的警报，请相应调整命令。如果在创建过程中遇到任何问题，请随时在<a href="https://github.com/milvus-io/milvus/discussions">Github 讨论区</a>或<a href="https://discord.com/invite/8uyFbECzPX">Discord</a> 上提问。</p>
<h3 id="Prerequisites" class="common-anchor-header">前提条件</h3><p>本教程假定您已安装并配置了 Grafana。如果没有，建议阅读<a href="/docs/zh/v2.4.x/monitor.md">监控指南</a>。</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1.添加新查询</h3><p>要为 Milvus 组件的内存使用情况添加警报，请编辑内存面板。然后，添加一个带有度量的新查询：<code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" />
   </span> <span class="img-wrapper"> <span>Alert_metric</span> </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2.保存仪表盘</h3><p>保存仪表盘，等待几分钟就能看到警报。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" />
   </span> <span class="img-wrapper"> <span>警报仪表盘</span> </span></p>
<p>Grafana 警报查询不支持模板变量。因此，应添加第二个查询，标签中不包含任何模板变量。第二个查询默认命名为 "A"。您可以点击下拉菜单重新命名。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" />
   </span> <span class="img-wrapper"> <span>警报查询</span> </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3.添加警报通知</h3><p>要接收警报通知，请添加一个 &quot;通知通道&quot;。然后在 &quot;发送至 &quot;字段中指定通道。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" />
   </span> <span class="img-wrapper"> <span>警报通知</span> </span></p>
<p>如果警报成功创建并触发，您将收到如下截图所示的通知。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" />
   </span> <span class="img-wrapper"> <span>通知信息</span> </span></p>
<p>要删除警报，请进入 "警报 "面板并点击删除按钮。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" />
   </span> <span class="img-wrapper"> <span>删除警报</span> </span></p>
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
<li>如果您需要开始监控 Milvus 的服务：<ul>
<li>阅读<a href="/docs/zh/v2.4.x/monitor.md">监控指南</a></li>
<li>了解如何<a href="/docs/zh/v2.4.x/visualize.md">可视化监控指标</a></li>
</ul></li>
<li>如果您已经为 Milvus 组件的内存使用情况创建了警报：<ul>
<li>了解如何<a href="/docs/zh/v2.4.x/allocate.md#standalone">分配资源</a></li>
</ul></li>
<li>如果你正在寻找有关如何扩展 Milvus 集群的信息：<ul>
<li>了解如何<a href="/docs/zh/v2.4.x/scaleout.md">扩展 Milvus 集群</a></li>
</ul></li>
</ul>
