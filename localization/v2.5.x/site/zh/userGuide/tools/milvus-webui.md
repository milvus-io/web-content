---
id: milvus-webui.md
summary: Milvus Web UI 是 Milvus 的图形化管理工具。它以简单直观的界面提高了系统的可观察性。你可以
title: Milvus WebUI
---
<h1 id="Milvus-WebUI" class="common-anchor-header">Milvus WebUI<button data-href="#Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Web UI 是 Milvus 的图形化管理工具。它以简单直观的界面增强了系统的可观察性。您可以使用 Milvus Web UI 观察 Milvus 组件和依赖关系的统计和指标，检查数据库和 Collections 的详细信息，并列出详细的 Milvus 配置。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UI 与 Birdwatcher 和 Attu 不同，它是一个内置工具，以简单直观的界面提供整体系统可观察性。</p>
<p>下表比较了 Milvus Web UI 和 Birdwatcher/Attu 的功能：</p>
<table>
<thead>
<tr><th>功能</th><th>Milvus 网络用户界面</th><th>Birdwatcher</th><th>Attu</th></tr>
</thead>
<tbody>
<tr><td>操作符</td><td>图形用户界面</td><td>CLI</td><td>图形用户界面</td></tr>
<tr><td>目标用户</td><td>维护人员、开发人员</td><td>维护人员</td><td>开发人员</td></tr>
<tr><td>安装</td><td>内置</td><td>独立工具</td><td>独立工具</td></tr>
<tr><td>依赖关系</td><td>Milvus</td><td>Milvus / etcd</td><td>Milvus</td></tr>
<tr><td>主要功能</td><td>运行环境、数据库/ Collections 详情、段、通道、任务和慢查询请求</td><td>元数据检查和 Milvus API 执行</td><td>数据库管理和操作任务</td></tr>
</tbody>
</table>
<p>您可以使用以下 URL 访问 Milvus Web UI：</p>
<pre><code translate="no">http://localhost:9091/webui
<button class="copy-code-btn"></button></code></pre>
<h2 id="Features" class="common-anchor-header">功能<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UI 提供以下功能：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-webui-overview.png" alt="Milvus Web UI overview" class="doc-image" id="milvus-web-ui-overview" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 概述</span> </span></p>
<ul>
<li><p><a href="#Home">主页</a></p>
<p>您可以找到有关当前运行的 Milvus 实例、其组件、连接的客户端和依赖项的信息。</p></li>
<li><p><a href="#Collections">Collections</a></p>
<p>可查看 Milvus 当前的数据库和 Collections 列表，并检查其详细信息。</p></li>
<li><p><a href="#Query">查询</a></p>
<p>您可以查看收集到的查询节点和查询协调器在网段、通道、副本和资源组方面的统计数据。</p></li>
<li><p><a href="#Data">数据</a></p>
<p>您可以查看收集到的数据节点在网段和通道方面的统计数据。</p></li>
<li><p><a href="#Tasks">任务</a></p>
<p>可以查看 Milvus 中运行的任务列表，包括 Querycoord 调度器任务、压缩任务、索引构建任务、导入任务和数据同步任务。</p></li>
<li><p><a href="#Slow-requests">慢速请求</a></p>
<p>可以查看 Milvus 中的慢请求列表，包括请求类型、请求持续时间和请求参数。</p></li>
<li><p><a href="#Configurations">配置</a></p>
<p>可以查看 Milvus 配置及其值的列表。</p></li>
<li><p><a href="#Tools">工具</a></p>
<p>您可以从 Web UI 访问两个内置工具，即 pprof 和 Milvus 数据可视化工具。</p></li>
</ul>
<h2 id="Home" class="common-anchor-header">主页<button data-href="#Home" class="anchor-icon" translate="no">
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
    </button></h2><p>在主页上，您可以找到以下信息：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-home.png" alt="Milvus Web UI Home" class="doc-image" id="milvus-web-ui-home" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 主页</span> </span></p>
<ul>
<li><p><strong>系统信息</strong>：查看系统信息，包括部署模式、部署中使用的映像和相关信息。</p></li>
<li><p><strong>组件信息</strong>：查看 Milvus 中组件的状态和指标，包括查询节点、数据节点、索引节点、协调器和代理的状态和指标。</p></li>
<li><p><strong>已连接客户端</strong>：查看已连接的客户端及其信息，包括 SDK 类型和版本、用户名及其访问历史记录。</p></li>
<li><p><strong>系统依赖关系</strong>：查看 Milvus 依赖项的状态和指标，包括元存储、消息队列和对象存储的状态和指标。</p></li>
</ul>
<h2 id="Collections" class="common-anchor-header">Collections<button data-href="#Collections" class="anchor-icon" translate="no">
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
    </button></h2><p>在 "Collections "页面，您可以查看 Milvus 当前的数据库和 Collections 列表，并检查它们的详细信息。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-collections.png" alt="Milvus Web UI Collections" class="doc-image" id="milvus-web-ui-collections" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 集合</span> </span></p>
<ul>
<li><p><strong>数据库</strong>：查看当前 Milvus 中的数据库列表及其详细信息。</p></li>
<li><p><strong>Collections</strong>：查看每个数据库中的 Collection 列表及其详细信息。</p>
<p>可以点击某个 Collection 查看其详细信息，包括字段数量、分区、索引等详细信息。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-collection-details.png" alt="Milvus Web UI Collection Details" class="doc-image" id="milvus-web-ui-collection-details" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI Collectionions 详情</span> </span></p></li>
</ul>
<h2 id="Query" class="common-anchor-header">查询<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-query.png" alt="Milvus Web UI Query Page" class="doc-image" id="milvus-web-ui-query-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 查询页面</span> </span></p>
<ul>
<li><p><strong>分段</strong>：查看分段列表及其详细信息，包括分段 ID、对应的 Collections、状态、大小等详细信息。</p>
<p>在 "<strong>来自 "</strong>列中，您可以找到段的来源。可能的来源指标如下：</p>
<ul>
<li><p><strong>QN</strong>：查询节点</p></li>
<li><p><strong>CT</strong>：查询节点中的当前目标</p></li>
<li><p><strong>NT</strong>：QueryCoord 中的下一个目标</p></li>
<li><p><strong>DIST</strong>：QueryCoord 中的分布</p></li>
</ul></li>
<li><p><strong>通道</strong>：查看频道列表及其详细信息，包括频道名称、对应的 Collections 等。</p>
<p>在 "<strong>来自 "</strong>列中，您可以找到数据段的来源。可能的来源指标如下：</p>
<ul>
<li><p><strong>QN</strong>：查询节点</p></li>
<li><p><strong>CT</strong>：QueryCoord 中的当前目标</p></li>
<li><p><strong>NT</strong>：QueryCoord 中的下一个目标</p></li>
<li><p><strong>DIST</strong>：查询记录中的分布</p></li>
</ul></li>
<li><p><strong>副本</strong>：查看副本列表及其详细信息，包括副本 ID、对应的 Collections 等。</p></li>
<li><p><strong>资源组</strong>：查看资源组列表及其详细信息，包括资源组名称、组中查询节点的数量及其配置等。</p></li>
</ul>
<h2 id="Data" class="common-anchor-header">数据<button data-href="#Data" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-data.png" alt="Milvus Web UI Data Page" class="doc-image" id="milvus-web-ui-data-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 数据页面</span> </span></p>
<ul>
<li><p><strong>分段</strong>：查看数据节点/协调器的分段列表及其详细信息，包括分段 ID、对应的 Collections、状态、大小等。</p></li>
<li><p><strong>通道</strong>：查看数据节点/协调器的通道列表及其详细信息，包括通道名称、相应的 Collections 等。</p></li>
</ul>
<h2 id="Tasks" class="common-anchor-header">任务<button data-href="#Tasks" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-tasks.png" alt="Milvus Web UI Tasks Page" class="doc-image" id="milvus-web-ui-tasks-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 任务页面</span> </span></p>
<ul>
<li><p><strong>任务</strong>：查看在 Milvus 中运行的任务列表，包括任务类型、状态和操作。</p>
<ul>
<li><p><strong>QueryCoord 任务</strong>：查看所有 QueryCoord 调度器任务，包括过去 15 分钟内的平衡器、索引/区段/通道/领导者检查器。</p></li>
<li><p><strong>压缩任务</strong>：查看过去 15 分钟内来自数据协调器的所有压缩任务。</p></li>
<li><p><strong>索引建立任务</strong>：查看数据协调人员在过去 30 分钟内执行的所有索引建立任务。</p></li>
<li><p><strong>导入任务</strong>：查看过去 30 分钟内数据协调人员的所有导入任务。</p></li>
<li><p><strong>数据同步任务</strong>：查看过去 15 分钟内数据节点的所有数据同步任务。</p></li>
</ul></li>
</ul>
<h2 id="Slow-requests" class="common-anchor-header">慢请求<button data-href="#Slow-requests" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-slow-requests.png" alt="Milvus Web UI Slow Requests Page" class="doc-image" id="milvus-web-ui-slow-requests-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 慢请求页面</span> </span></p>
<ul>
<li><strong>慢请求</strong>：慢请求是指延迟时间超过配置中指定的<code translate="no">proxy.slowQuerySpanInSeconds</code> 值的搜索或查询。慢速请求列表显示最近 15 分钟内的所有慢速请求。</li>
</ul>
<h2 id="Configurations" class="common-anchor-header">配置<button data-href="#Configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-configurations.png" alt="Milvus Web UI Configurations Page" class="doc-image" id="milvus-web-ui-configurations-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 配置页面</span> </span></p>
<ul>
<li><strong>配置</strong>：查看 Milvus 运行时配置及其值的列表。</li>
</ul>
<h2 id="Tools" class="common-anchor-header">工具<button data-href="#Tools" class="anchor-icon" translate="no">
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
<li><p><strong>pprof</strong>：访问用于剖析和调试 Milvus 的 pprof 工具。</p></li>
<li><p><strong>Milvus 数据可视化工具</strong>：访问 Milvus 数据可视化工具，以可视化 Milvus 中的数据。</p></li>
</ul>
