---
id: milvus-webui.md
summary: >-
  Milvus Web UI is a graphical management tool for Milvus. It enhances system
  observability with a simple and intuitive interface. You can
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
    </button></h1><p>Milvus Web UI is a graphical management tool for Milvus. It enhances system observability with a simple and intuitive interface. You can use Milvus Web UI to observe the statistics and metrics of the components and dependencies of Milvus, check database and collection details, and list detailed Milvus configurations.</p>
<h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UI differs from Birdwatcher and Attu in that it is a built-in tool to provide overall system observability with a simple and intuitive interface.</p>
<p>The following table compares the features of Milvus Web UI and Birdwatcher/Attu:</p>
<table>
<thead>
<tr><th>Feature</th><th>Milvus Web UI</th><th>Birdwatcher</th><th>Attu</th></tr>
</thead>
<tbody>
<tr><td>Operational form</td><td>GUI</td><td>CLI</td><td>GUI</td></tr>
<tr><td>Target users</td><td>Maintainers, developers</td><td>Maintainers</td><td>Developers</td></tr>
<tr><td>Installation</td><td>Built-in</td><td>Standalone tool</td><td>Standalone tool</td></tr>
<tr><td>Dependencies</td><td>Milvus</td><td>Milvus / etcd</td><td>Milvus</td></tr>
<tr><td>Primary Functionalities</td><td>Runtime environment, database/collection details, segments, channles, tasks, and slow query requests</td><td>Metadata inspection and Milvus API execution</td><td>Database management and operational tasks</td></tr>
<tr><td>Available since</td><td>v2.5.0</td><td>v2.0.0</td><td>v0.1.8</td></tr>
</tbody>
</table>
<p>As of v2.5.0, you can access Milvus Web UI using the following URL on a running Milvus instance:</p>
<pre><code translate="no">http://<span class="hljs-variable">${MILVUS_PROXY_IP}</span>:9091/webui
<button class="copy-code-btn"></button></code></pre>
<h2 id="Features" class="common-anchor-header">Features<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UI provides the following features:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/milvus-webui-overview.png" alt="Milvus Web UI overview" class="doc-image" id="milvus-web-ui-overview" />
    <span>Milvus Web UI overview</span>
  </span>
</p>
<ul>
<li><p><a href="#Home">Home</a></p>
<p>You can find information about the current running Milvus instance, its components, connected clients, and dependencies.</p></li>
<li><p><a href="#Collections">Collections</a></p>
<p>You can view the list of databases and collections currently in Milvus and check their details.</p></li>
<li><p><a href="#Query">Query</a></p>
<p>You can view the collected statistics of the query nodes and query coordinators in terms of segments, channels, replicas, and resource groups.</p></li>
<li><p><a href="#Data">Data</a></p>
<p>You can view the collected statistics of the data nodes in terms of segments and channels.</p></li>
<li><p><a href="#Tasks">Tasks</a></p>
<p>You can view the list of tasks running in Milvus, including Querycoord scheduler tasks, compaction tasks, index-building tasks, import tasks, and data synchronization tasks.</p></li>
<li><p><a href="#Slow-requests">Slow requests</a></p>
<p>You can view the list of slow requests in Milvus, including the request type, request duration, and request parameters.</p></li>
<li><p><a href="#Configurations">Configurations</a></p>
<p>You can view the list of Milvus configurations and their values.</p></li>
<li><p><a href="#Tools">Tools</a></p>
<p>You can access the two built-in tools, pprof and Milvus data visualzation tool, from the Web UI.</p></li>
</ul>
<h2 id="Home" class="common-anchor-header">Home<button data-href="#Home" class="anchor-icon" translate="no">
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
    </button></h2><p>On the Home page, you can find the following information:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/webui-home.png" alt="Milvus Web UI Home" class="doc-image" id="milvus-web-ui-home" />
    <span>Milvus Web UI Home</span>
  </span>
</p>
<ul>
<li><p><strong>System information</strong>: View system information, including information about the deployment mode, image used in the deployment, and related information.</p></li>
<li><p><strong>Component Information</strong>: View the status and metrics of the components in Milvus, including the status and metrics of the query nodes, data nodes, index nodes, coordinators, and proxies.</p></li>
<li><p><strong>Connected clients</strong>: View the connected clients and their information, including the SDK type and version, user name, and their access history.</p></li>
<li><p><strong>System dependencies</strong>: View the status and metrics of the dependencies of Milvus, including the status and metrics of the meta store, message queue, and object storage.</p></li>
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
    </button></h2><p>On the Collections page, you can view the list of databases and collections currently in Milvus and check their details.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/webui-collections.png" alt="Milvus Web UI Collections" class="doc-image" id="milvus-web-ui-collections" />
    <span>Milvus Web UI Collections</span>
  </span>
</p>
<ul>
<li><p><strong>Database</strong>: View the list of databases currently in Milvus and their details.</p></li>
<li><p><strong>Collection</strong>: View the list of collections in each database and their details.</p>
<p>You can click on a collection to view its details, including the number of fields, partitions, indexes, and other information in detail.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/webui-collection-details.png" alt="Milvus Web UI Collection Details" class="doc-image" id="milvus-web-ui-collection-details" />
    <span>Milvus Web UI Collection Details</span>
  </span>
</p></li>
</ul>
<h2 id="Query" class="common-anchor-header">Query<button data-href="#Query" class="anchor-icon" translate="no">
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
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/webui-query.png" alt="Milvus Web UI Query Page" class="doc-image" id="milvus-web-ui-query-page" />
    <span>Milvus Web UI Query Page</span>
  </span>
</p>
<ul>
<li><p><strong>Segments</strong>: View the list of segments and their details, including the segment ID, corresponding collection, state, size, etc.</p></li>
<li><p><strong>Channels</strong>: View the list of channels and their details, including the channel name, corresponding collections, etc.</p></li>
<li><p><strong>Replicas</strong>: View the list of replicas and their details, including the replica ID, corresponding collection, etc.</p></li>
<li><p><strong>Resource groups</strong>: View the list of resource groups and their details, including the resource group name, number of query nodes in the group, and its configurations, etc.</p></li>
</ul>
<h2 id="Data" class="common-anchor-header">Data<button data-href="#Data" class="anchor-icon" translate="no">
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
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/webui-data.png" alt="Milvus Web UI Data Page" class="doc-image" id="milvus-web-ui-data-page" />
    <span>Milvus Web UI Data Page</span>
  </span>
</p>
<ul>
<li><p><strong>Segments</strong>: View the list of segments from the data nodes/coordinators and their details, including the segment ID, corresponding collection, state, size, etc.</p></li>
<li><p><strong>Channels</strong>: View the list of channels from the data nodes/coordinators and their details, including the channel name, corresponding collections, etc.</p></li>
</ul>
<h2 id="Tasks" class="common-anchor-header">Tasks<button data-href="#Tasks" class="anchor-icon" translate="no">
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
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/webui-tasks.png" alt="Milvus Web UI Tasks Page" class="doc-image" id="milvus-web-ui-tasks-page" />
    <span>Milvus Web UI Tasks Page</span>
  </span>
</p>
<ul>
<li><p><strong>Tasks</strong>: View the list of tasks running in Milvus, including the task type, state, and actions.</p>
<ul>
<li><p><strong>QueryCoord Tasks</strong>: View all QueryCoord scheduler tasks, including balancer, index/segment/channel/leader checkers in the last 15 minutes.</p></li>
<li><p><strong>Compaction Tasks</strong>: View all compaction tasks from the data coordinators in the last 15 minutes.</p></li>
<li><p><strong>Index-Building Tasks</strong>: View all index-building tasks from the data coordinators in the last 30 minutes.</p></li>
<li><p><strong>Import Tasks</strong>: View all import tasks from the data coordinators in the last 30 minutes.</p></li>
<li><p><strong>Data Synchronization Tasks</strong>: View all data synchronization tasks from the data nodes in the last 15 minutes.</p></li>
</ul></li>
</ul>
<h2 id="Slow-requests" class="common-anchor-header">Slow requests<button data-href="#Slow-requests" class="anchor-icon" translate="no">
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
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/webui-slow-requests.png" alt="Milvus Web UI Slow Requests Page" class="doc-image" id="milvus-web-ui-slow-requests-page" />
    <span>Milvus Web UI Slow Requests Page</span>
  </span>
</p>
<ul>
<li><strong>Slow requests</strong>: A slow request is a search or a query that has a latency longer than the value of <code translate="no">proxy.slowQuerySpanInSeconds</code> specified in the configuration. The list of slow requests displays all slow requests in the last 15 minutes.</li>
</ul>
<h2 id="Configurations" class="common-anchor-header">Configurations<button data-href="#Configurations" class="anchor-icon" translate="no">
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
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/webui-configurations.png" alt="Milvus Web UI Configurations Page" class="doc-image" id="milvus-web-ui-configurations-page" />
    <span>Milvus Web UI Configurations Page</span>
  </span>
</p>
<ul>
<li><strong>Configurations</strong>: View the list of Milvus runtime configurations and their values.</li>
</ul>
<h2 id="Tools" class="common-anchor-header">Tools<button data-href="#Tools" class="anchor-icon" translate="no">
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
<li><p><strong>pprof</strong>: Access the pprof tool for profiling and debugging Milvus.</p></li>
<li><p><strong>Milvus data visualization tool</strong>: Access the Milvus data visualization tool for visualizing the data in Milvus.</p></li>
</ul>
