---
id: configure-helm.md
label: Helm
related_key: configure
summary: Learn how to configure your Milvus with Helm.
title: ''
---
<h1 id="Configure-Milvus-with-Helm-Charts" class="common-anchor-header">Configure Milvus with Helm Charts<button data-href="#Configure-Milvus-with-Helm-Charts" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to configure your Milvus with Helm charts.</p>
<div class="alert note">
In current release, all parameters take effect only after Milvus restarts.
</div>
<h2 id="Configure-Milvus-via-configuration-file" class="common-anchor-header">Configure Milvus via configuration file<button data-href="#Configure-Milvus-via-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>You can configure Milvus with a configuration file <code translate="no">values.yaml</code>.</p>
<h3 id="Download-a-configuration-file" class="common-anchor-header">Download a configuration file</h3><p><a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml">Download</a> <code translate="no">values.yaml</code> directly or with the following command.</p>
<pre><code translate="no">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Modify-the-configuration-file" class="common-anchor-header">Modify the configuration file</h3><p>Configure your Milvus instance to suit your application scenarios by adjusting corresponding parameters in <code translate="no">values.yaml</code>.</p>
<p>Check the following links for more information about each parameter.</p>
<p>Sorted by:</p>
<div class="filter">
<a href="#component">Components or dependencies</a> <a href="#purpose">Configuration purposes</a> 
</div>
<div class="filter-component table-wrapper">
<table id="component">
<thead>
  <tr>
    <th>Dependencies</th>
    <th>Components</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
        <ul>
            <li><a href="/docs/v2.0.x/configure_etcd.md">etcd</a></li>
            <li><a href="/docs/v2.0.x/configure_minio.md">MinIO or S3</a></li>
            <li><a href="/docs/v2.0.x/configure_pulsar.md">Pulsar</a></li>
            <li><a href="/docs/v2.0.x/configure_rocksmq.md">RocksMQ</a></li>
        </ul>
    </td>
    <td>
        <ul>
            <li><a href="/docs/v2.0.x/configure_rootcoord.md">Root coord</a></li>
            <li><a href="/docs/v2.0.x/configure_proxy.md">Proxy</a></li>
            <li><a href="/docs/v2.0.x/configure_querycoord.md">Query coord</a></li>
            <li><a href="/docs/v2.0.x/configure_querynode.md">Query node</a></li>
            <li><a href="/docs/v2.0.x/configure_indexcoord.md">Index coord</a></li>
            <li><a href="/docs/v2.0.x/configure_indexnode.md">Index node</a></li>
            <li><a href="/docs/v2.0.x/configure_datacoord.md">Data coord</a></li>
            <li><a href="/docs/v2.0.x/configure_datanode.md">Data node</a></li>
            <li><a href="/docs/v2.0.x/configure_localstorage.md">Local storage</a></li>
            <li><a href="/docs/v2.0.x/configure_log.md">Log</a></li>
            <li><a href="/docs/v2.0.x/configure_messagechannel.md">Message channel</a></li>
            <li><a href="/docs/v2.0.x/configure_common.md">Common</a></li>
            <li><a href="/docs/v2.0.x/configure_knowhere.md">Knowhere</a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-purpose table-wrapper">
<table id="purpose">
<thead>
  <tr>
    <th>Purpose</th>
    <th>Parameters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Performance tuning</td>
    <td>
        <ul>
            <li><a href="/docs/v2.0.x/configure_querynode.md#queryNode.gracefulTime"><code translate="no">queryNode.gracefulTime</code></a></li>
            <li><a href="/docs/v2.0.x/configure_rootcoord.md#rootCoord.minSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/v2.0.x/configure_datacoord.md#dataCoord.segment.maxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/v2.0.x/configure_datacoord.md#dataCoord.segment.sealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/v2.0.x/configure_datanode.md#dataNode.flush.insertBufSize"><code translate="no">dataNode.flush.insertBufSize</code></a></li>
            <li><a href="/docs/v2.0.x/configure_querycoord.md#queryCoord.autoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/v2.0.x/configure_querycoord.md#queryCoord.autoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
            <li><a href="/docs/v2.0.x/configure_localstorage.md#localStorage.enabled"><code translate="no">localStorage.enabled</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Data and meta</td>
    <td>
        <ul>
            <li><a href="/docs/v2.0.x/configure_common.md#common.retentionDuration"><code translate="no">common.retentionDuration</code></a></li>
            <li><a href="/docs/v2.0.x/configure_rocksmq.md#rocksmq.retentionTimeInMinutes"><code translate="no">rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="/docs/v2.0.x/configure_datacoord.md#dataCoord.enableCompaction"><code translate="no">dataCoord.enableCompaction</code></a></li>
            <li><a href="/docs/v2.0.x/configure_datacoord.md#dataCoord.enableGarbageCollection"><code translate="no">dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="/docs/v2.0.x/configure_datacoord.md#dataCoord.gc.dropTolerance"><code translate="no">dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Administration</td>
    <td>
        <ul>
            <li><a href="/docs/v2.0.x/configure_log.md#log.level"><code translate="no">log.level</code></a></li>
            <li><a href="/docs/v2.0.x/configure_log.md#log.file.rootPath"><code translate="no">log.file.rootPath</code></a></li>
            <li><a href="/docs/v2.0.x/configure_log.md#log.file.maxAge"><code translate="no">log.file.maxAge</code></a></li>
            <li><a href="/docs/v2.0.x/configure_minio.md#minio.accessKeyID"><code translate="no">minio.accessKeyID</code></a></li>
            <li><a href="/docs/v2.0.x/configure_minio.md#minio.secretAccessKey"><code translate="no">minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<p>For other parameters specifically to Kubernetes installation, See <a href="https://github.com/milvus-io/milvus-helm/tree/master/charts/milvus#configuration">Milvus Helm Chart Configuration</a>.</p>
<h3 id="Start-Milvus" class="common-anchor-header">Start Milvus</h3><p>Having finished modifying the configuration file, you can then start Milvus with the file.</p>
<pre><code translate="no">$ helm upgrade my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Milvus-via-command-line" class="common-anchor-header">Configure Milvus via command line<button data-href="#Configure-Milvus-via-command-line" class="anchor-icon" translate="no">
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
    </button></h2><p>Alternatively, you can upgrade Milvus configurations directly with the Helm command.</p>
<h3 id="Check-the-configurable-parameters" class="common-anchor-header">Check the configurable parameters</h3><p>Before upgrade, you can check the configurable parameters with Helm charts.</p>
<pre><code translate="no">$ helm show values milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Start-Milvus" class="common-anchor-header">Start Milvus</h3><p>Configure and start Milvus by adding <code translate="no">--values</code> or <code translate="no">--set</code> in the command for upgrade.</p>
<pre><code translate="no"><span class="hljs-comment"># For instance, upgrade the Milvus cluster with compaction disabled</span>
$ helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> dataCoord.enableCompaction=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
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
<li><p>If you want to learn how to monitor the Milvus services and create alerts:</p>
<ul>
<li>Learn <a href="/docs/v2.0.x/monitor.md">Monitor Milvus 2.0 with Prometheus Operator on Kubernetes</a></li>
<li>Learn <a href="/docs/v2.0.x/visualize.md">Visualize Milvus Metrics in Grafana</a>.</li>
</ul></li>
<li><p>If you are looking for instructions on how to allocate resources:</p>
<ul>
<li><a href="/docs/v2.0.x/allocate.md#standalone">Allocate Resources on Kubernetes</a></li>
</ul></li>
</ul>
