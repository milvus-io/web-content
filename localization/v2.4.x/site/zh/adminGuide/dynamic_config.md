---
id: dynamic_config.md
related_key: configure
summary: 了解 Milvus 的动态配置。
title: 即时配置 Milvus
---
<h1 id="Configure-Milvus-on-the-Fly" class="common-anchor-header">即时配置 Milvus<button data-href="#Configure-Milvus-on-the-Fly" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 允许您即时更改某些配置。</p>
<h2 id="Before-you-start" class="common-anchor-header">开始之前<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>您需要确保</p>
<ul>
<li>安装了 Birdwatcher。有关详情，请参阅<a href="/docs/zh/v2.4.x/birdwatcher_install_guides.md">安装 Birdwatcher</a>、</li>
<li>安装了 etcdctl。有关详情，请参阅<a href="https://etcd.io/docs/v3.5/dev-guide/interacting_v3/">与 etcd 交互</a>，或</li>
<li>安装了其他 etcd 客户端，如 Python 客户端。</li>
</ul>
<div class="alert note">
<ul>
<li>本指南中的示例将<code translate="no">proxy.minPasswordLength</code> 的值更改为<code translate="no">8</code> 。您可以使用 "<a href="/docs/zh/v2.4.x/dynamic_config.md#Applicable-configuration-items">适用的配置项</a>"中列出的适用密钥替换这些密钥。</li>
<li>本指南中的示例假定 Milvus 的根路径是<code translate="no">by-dev</code> 。所有配置都列在<code translate="no">by-dev/config</code> 路径下。Milvus 根路径因安装方式而异。对于使用 Helm 图表安装的实例，根路径默认为<code translate="no">by-dev</code> 。如果不知道根路径，请参阅<a href="/docs/zh/v2.4.x/birdwatcher_usage_guides.md#Connect-to-etcd">连接到 etcd</a>。</li>
</ul>
</div>
<h2 id="Change-configurations" class="common-anchor-header">更改配置<button data-href="#Change-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 上，<code translate="no">proxy.minPasswordLength</code> 默认设置为<code translate="no">6</code> 。要更改此值，可按以下步骤操作：</p>
<pre><code translate="no" class="language-shell">$ etcdctl put by-dev/config/proxy/minPasswordLength 8
<span class="hljs-comment"># or</span>
$ birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,set config-etcd --key by-dev/config/proxy/minPasswordLength --value 8&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>然后按如下步骤检查配置：</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">get</span> <span class="hljs-keyword">by</span>-dev/config/proxy/minPasswordLength
<button class="copy-code-btn"></button></code></pre>
<h2 id="Roll-back-configurations" class="common-anchor-header">回滚配置<button data-href="#Roll-back-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>如果更改的值不再适用，Milvus 还允许您回滚配置。</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">del</span> by-dev/config/proxy/minPasswordLength 
<span class="hljs-comment"># or </span>
$ birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,remove config-etcd --key by-dev/config/proxy/minPasswordLength&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>然后可以按如下方式检查配置：</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">get</span> <span class="hljs-keyword">by</span>-dev/config/proxy/minPasswordLength
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-configurations" class="common-anchor-header">查看配置<button data-href="#View-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>除了查看特定配置项的值，您还可以列出所有配置项。</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">get</span> --prefix <span class="hljs-keyword">by</span>-dev/config
<span class="hljs-meta"># or</span>
$ birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,show config-etcd&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>查看特定节点的配置：</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect --etcd ip:port 
Milvus(by-dev) &gt; show session          <span class="hljs-comment"># List all nodes with their server ID</span>
Milvus(by-dev) &gt; visit querycoord <span class="hljs-number">1</span>    <span class="hljs-comment"># Visit a node by server ID</span>
QueryCoord-<span class="hljs-number">1</span>(ip:port) &gt; configuration  <span class="hljs-comment"># List the configuration of the node</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Applicable-configuration-items" class="common-anchor-header">适用的配置项<button data-href="#Applicable-configuration-items" class="anchor-icon" translate="no">
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
    </button></h2><p>目前，您可以即时更改以下配置项目。</p>
<table>
<thead>
<tr><th>配置项目</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td>pulsar.maxMessageSize</td><td>5242880</td></tr>
<tr><td>common.retentionDuration</td><td>86400</td></tr>
<tr><td>common.entityExpiration</td><td>-1</td></tr>
<tr><td>common.gracefulTime</td><td>5000</td></tr>
<tr><td>common.gracefulStopTimeout</td><td>30</td></tr>
<tr><td>quotaAndLimits.ddl.enabled</td><td>假</td></tr>
<tr><td>quotaAndLimits.indexRate.enabled</td><td>启用</td></tr>
<tr><td>quotaAndLimits.flushRate.enabled</td><td>启用</td></tr>
<tr><td>quotaAndLimits.compactionRate.enabled</td><td>启用</td></tr>
<tr><td>quotaAndLimits.dml.enabled</td><td>启用</td></tr>
<tr><td>quotaAndLimits.dql.enabled</td><td>启用</td></tr>
<tr><td>quotaAndLimits.limits.collection.maxNum</td><td>64</td></tr>
<tr><td>quotaAndLimits.limitWriting.forceDeny</td><td>无</td></tr>
<tr><td>quotaAndLimits.limitWriting.ttProtection.enabled</td><td>启用</td></tr>
<tr><td>quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</td><td>9223372036854775807</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.enabled</td><td>启用</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</td><td>0.85</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</td><td>0.95</td></tr>
<tr><td>配额和限制.limitWriting.memProtection.queryNodeMemoryLowWaterLevel（查询节点内存低水位</td><td>0.85</td></tr>
<tr><td>配额和限制.limitWriting.memProtection.queryNodeMemoryHighWaterLevel（查询节点内存高水位</td><td>0.95</td></tr>
<tr><td>quotaAndLimits.limitWriting.diskProtection.enabled</td><td>启用</td></tr>
<tr><td>quotaAndLimits.limitWriting.diskProtection.diskQuota</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.forceDeny</td><td>假</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.enabled</td><td>启用</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</td><td>9223372036854775807</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.resultProtection.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitReading.resultProtection.maxReadResultRate</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.coolOffSpeed</td><td>0.9</td></tr>
<tr><td>自动索引启用</td><td>假</td></tr>
<tr><td>autoIndex.params.build</td><td>""</td></tr>
<tr><td>autoIndex.params.extra</td><td>""</td></tr>
<tr><td>autoIndex.params.search</td><td>""</td></tr>
<tr><td>proxy.maxNameLength</td><td>255</td></tr>
<tr><td>proxy.maxUsernameLength</td><td>32</td></tr>
<tr><td>proxy.minPasswordLength</td><td>6</td></tr>
<tr><td>proxy.maxPasswordLength</td><td>256</td></tr>
<tr><td>proxy.maxFieldNum</td><td>64</td></tr>
<tr><td>proxy.maxShardNum</td><td>256</td></tr>
<tr><td>代理最大维度</td><td>32768</td></tr>
<tr><td>代理的最大用户数</td><td>100</td></tr>
<tr><td>代理的最大角色数</td><td>10</td></tr>
<tr><td>查询节点启用磁盘</td><td>TRUE</td></tr>
<tr><td>dataCoord.segment.diskSegmentMaxSize</td><td>2048</td></tr>
<tr><td>dataCoord.compaction.enableAutoCompaction</td><td>TRUE</td></tr>
</tbody>
</table>
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
<li>了解有关<a href="/docs/zh/v2.4.x/system_configuration.md">系统配置的</a>更多信息。</li>
<li>了解如何使用<a href="/docs/zh/v2.4.x/configure_operator.md">Milvus Operator</a>、<a href="/docs/zh/v2.4.x/configure-helm.md">Helm 图表</a>和<a href="/docs/zh/v2.4.x/configure-docker.md">Docker</a> 配置已安装的<a href="/docs/zh/v2.4.x/configure_operator.md">Milvus</a>。</li>
</ul>
