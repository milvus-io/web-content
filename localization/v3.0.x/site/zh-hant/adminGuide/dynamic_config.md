---
id: dynamic_config.md
related_key: configure
summary: 了解 Milvus 的動態配置。
title: 即時設定 Milvus
---
<h1 id="Configure-Milvus-on-the-Fly" class="common-anchor-header">即時設定 Milvus<button data-href="#Configure-Milvus-on-the-Fly" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 允許您在運行時變更部分設定。</p>
<h2 id="Before-you-start" class="common-anchor-header">開始之前<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>您需要確保：</p>
<ul>
<li>已安裝 Birdwatcher。詳細資訊請參閱《<a href="/docs/zh-hant/birdwatcher_install_guides.md">安裝 Birdwatcher</a>》，</li>
<li>您已安裝 etcdctl。詳細資訊請參閱《<a href="https://etcd.io/docs/v3.5/dev-guide/interacting_v3/">與 etcd 互動</a>》，或</li>
<li>您已安裝其他 etcd 客戶端，例如 Python 客戶端。</li>
</ul>
<div class="alert note">
<ul>
<li>本指南中的範例將<code translate="no">proxy.minPasswordLength</code> 的值變更為<code translate="no">8</code> 。您可以將此金鑰替換為「<a href="/docs/zh-hant/dynamic_config.md#Applicable-configuration-items">適用之配置項目</a>」中列出的適用金鑰。</li>
<li>本指南中的範例假設您的 Milvus 根路徑為<code translate="no">by-dev</code> 。所有設定皆列於路徑<code translate="no">by-dev/config</code> 下。Milvus 的根路徑會因安裝方式而異。對於使用 Helm 圖表安裝的實例，根路徑預設為<code translate="no">by-dev</code> 。若您不清楚根路徑，請參閱《<a href="/docs/zh-hant/birdwatcher_usage_guides.md#Connect-to-etcd">連線至 etcd</a>》。</li>
</ul>
</div>
<h2 id="Change-configurations" class="common-anchor-header">變更設定<button data-href="#Change-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 上，<code translate="no">proxy.minPasswordLength</code> 預設設定為<code translate="no">6</code> 。若要變更此值，請依下列步驟操作：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl put by-dev/config/proxy/minPasswordLength 8</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">or</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,set config-etcd --key by-dev/config/proxy/minPasswordLength --value 8&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>接著可透過以下方式檢查設定：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl get by-dev/config/proxy/minPasswordLength</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Roll-back-configurations" class="common-anchor-header">還原設定<button data-href="#Roll-back-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>若修改後的設定已不再適用，Milvus 亦允許您將設定還原。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl del by-dev/config/proxy/minPasswordLength</span> 
<span class="hljs-meta prompt_"># </span><span class="language-bash">or</span> 
<span class="hljs-meta prompt_">$ </span><span class="language-bash">birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,remove config-etcd --key by-dev/config/proxy/minPasswordLength&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>接著，您可以透過以下方式檢查設定：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl get by-dev/config/proxy/minPasswordLength</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-configurations" class="common-anchor-header">檢視設定<button data-href="#View-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>除了檢視特定設定項目的值之外，您也可以列出所有設定項目。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl get --prefix by-dev/config</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">or</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,show config-etcd&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>若要檢視特定節點的設定：</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect --etcd ip:port 
Milvus(by-dev) &gt; show session          # List all nodes with their server ID
Milvus(by-dev) &gt; visit querycoord 1    # Visit a node by server ID
QueryCoord-1(ip:port) &gt; configuration  # List the configuration of the node
<button class="copy-code-btn"></button></code></pre>
<h2 id="Applicable-configuration-items" class="common-anchor-header">適用的配置項目<button data-href="#Applicable-configuration-items" class="anchor-icon" translate="no">
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
    </button></h2><p>目前，您可以即時變更以下設定項目。</p>
<table>
<thead>
<tr><th>設定項目</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td>pulsar.maxMessageSize</td><td>5242880</td></tr>
<tr><td>common.retentionDuration</td><td>86400</td></tr>
<tr><td>common.entityExpiration</td><td>-1</td></tr>
<tr><td>common.gracefulTime</td><td>5000</td></tr>
<tr><td>common.gracefulStopTimeout</td><td>30</td></tr>
<tr><td>quotaAndLimits.ddl.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.indexRate.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.flushRate.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.compactionRate.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.dml.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.dql.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limits.collection.maxNum</td><td>64</td></tr>
<tr><td>quotaAndLimits.limitWriting.forceDeny</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitWriting.ttProtection.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</td><td>9223372036854775807</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.enabled</td><td>TRUE</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</td><td>0.85</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</td><td>0.95</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</td><td>0.85</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</td><td>0.95</td></tr>
<tr><td>quotaAndLimits.limitWriting.diskProtection.enabled</td><td>TRUE</td></tr>
<tr><td>quotaAndLimits.limitWriting.diskProtection.diskQuota</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.forceDeny</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</td><td>9223372036854775807</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.resultProtection.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitReading.resultProtection.maxReadResultRate</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.coolOffSpeed</td><td>0.9</td></tr>
<tr><td>autoIndex.enable</td><td>FALSE</td></tr>
<tr><td>autoIndex.params.build</td><td>“”</td></tr>
<tr><td>autoIndex.params.extra</td><td>“”</td></tr>
<tr><td>autoIndex.params.search</td><td>“”</td></tr>
<tr><td>proxy.maxNameLength</td><td>255</td></tr>
<tr><td>proxy.maxUsernameLength</td><td>32</td></tr>
<tr><td>proxy.minPasswordLength</td><td>6</td></tr>
<tr><td>proxy.maxPasswordLength</td><td>72</td></tr>
<tr><td>proxy.maxFieldNum</td><td>64</td></tr>
<tr><td>proxy.maxShardNum</td><td>256</td></tr>
<tr><td>proxy.maxDimension</td><td>32768</td></tr>
<tr><td>proxy.maxUserNum</td><td>100</td></tr>
<tr><td>proxy.maxRoleNum</td><td>10</td></tr>
<tr><td>queryNode.enableDisk</td><td>TRUE</td></tr>
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
<li>進一步了解<a href="/docs/zh-hant/system_configuration.md">系統設定</a>。</li>
<li>瞭解如何透過<a href="/docs/zh-hant/configure_operator.md">Milvus Operator</a>、<a href="/docs/zh-hant/configure-helm.md">Helm 圖表</a>及<a href="/docs/zh-hant/configure-docker.md">Docker</a> 來設定已安裝的 Milvus。</li>
</ul>
