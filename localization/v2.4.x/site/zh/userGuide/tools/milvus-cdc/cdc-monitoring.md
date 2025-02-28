---
id: cdc-monitoring.md
order: 4
summary: Milvus CDC 通过 Grafana 面板提供全面的监控功能。
title: 监控
---
<h1 id="Monitoring" class="common-anchor-header">监控<button data-href="#Monitoring" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus CDC 通过 Grafana 面板提供全面的监控功能，使您能够可视化关键指标，并确保您的变更数据捕获 (CDC) 任务和服务器健康的顺利操作。</p>
<h3 id="Metrics-for-CDC-tasks" class="common-anchor-header">CDC 任务的指标</h3><p>要开始使用，请将<a href="https://github.com/zilliztech/milvus-cdc/blob/main/server/configs/cdc-grafana.json">CDC-grafana.json</a>文件导入 Grafana。这将添加一个专门用于监控 CDC 任务状态的仪表盘。</p>
<p><strong>CDC Grafana 仪表板概述</strong>：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-cdc-dashboard.png" alt="milvus-cdc-dashboard" class="doc-image" id="milvus-cdc-dashboard" />
   </span> <span class="img-wrapper"> <span>Milvus-cdc-dashboard</span> </span></p>
<p><strong>关键指标解释：</strong></p>
<ul>
<li><p><strong>任务</strong>：处于不同状态（包括<strong>初始</strong>、<strong>运行</strong>和<strong>暂停）</strong>的 CDC 任务数量。</p></li>
<li><p><strong>请求总数</strong>：Milvus-CDC 收到的请求总数。</p></li>
<li><p><strong>请求成功</strong>：Milvus-CDC 收到的成功请求数。</p></li>
<li><p><strong>任务数</strong>：一段时间内处于<strong>初始</strong>、<strong>暂停</strong>和<strong>运行</strong>状态的任务数。</p></li>
<li><p><strong>任务状态</strong>：单个任务的状态。</p></li>
<li><p><strong>请求数</strong>：成功请求数和总请求数</p></li>
<li><p><strong>请求延迟</strong>：通过 p99 请求的延迟时间、平均值和其他统计数据。</p></li>
<li><p><strong>复制数据速率</strong>：读/写操作的复制数据速率</p></li>
<li><p><strong>复制时滞</strong>：读/写操作的<strong>复制时滞</strong>：读/写操作的复制时滞。</p></li>
<li><p><strong>api 执行次数</strong>：Milvus CDC 不同 API 的执行次数。</p></li>
<li><p><strong>center ts</strong>：读/写任务的时间戳。</p></li>
</ul>
