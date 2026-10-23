---
id: dynamic_config.md
related_key: configure
summary: Scopri come funziona la configurazione dinamica di Milvus.
title: Configurare Milvus al volo
---
<h1 id="Configure-Milvus-on-the-Fly" class="common-anchor-header">Configurare Milvus al volo<button data-href="#Configure-Milvus-on-the-Fly" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus consente di modificare alcune delle sue impostazioni al volo.</p>
<h2 id="Before-you-start" class="common-anchor-header">Prima di iniziare<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>È necessario assicurarsi che:</p>
<ul>
<li>Birdwatcher sia installato. Per ulteriori dettagli, consultare <a href="/docs/it/birdwatcher_install_guides.md">Installare Birdwatcher</a>,</li>
<li>Di aver installato etcdctl. Per ulteriori dettagli, consultare la sezione " <a href="https://etcd.io/docs/v3.5/dev-guide/interacting_v3/">Interagire con etcd</a>", oppure</li>
<li>Abbiate installato altri client etcd, come ad esempio il client Python.</li>
</ul>
<div class="alert note">
<ul>
<li>Gli esempi in questa guida modificano il valore di ` <code translate="no">proxy.minPasswordLength</code> ` in ` <code translate="no">8</code>`. È possibile sostituire la chiave con quelle applicabili elencate in " <a href="/docs/it/dynamic_config.md#Applicable-configuration-items">Elementi di configurazione applicabili</a>".</li>
<li>Gli esempi in questa guida presuppongono che il percorso radice di Milvus sia <code translate="no">by-dev</code>. Tutte le configurazioni sono elencate nel percorso <code translate="no">by-dev/config</code>. Il percorso radice di Milvus varia a seconda del metodo di installazione. Per le istanze installate utilizzando i chart Helm, il percorso radice predefinito è <code translate="no">by-dev</code>. Se non si conosce il percorso radice, consultare la sezione <a href="/docs/it/birdwatcher_usage_guides.md#Connect-to-etcd">"Connettersi a etcd"</a>.</li>
</ul>
</div>
<h2 id="Change-configurations" class="common-anchor-header">Modifica delle configurazioni<button data-href="#Change-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Su Milvus, il parametro ` <code translate="no">proxy.minPasswordLength</code> ` è impostato di default su ` <code translate="no">6</code> `. Per modificare questo valore, procedere come segue:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl put by-dev/config/proxy/minPasswordLength 8</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">or</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,set config-etcd --key by-dev/config/proxy/minPasswordLength --value 8&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>Successivamente è possibile verificare le configurazioni come segue:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl get by-dev/config/proxy/minPasswordLength</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Roll-back-configurations" class="common-anchor-header">Ripristino delle configurazioni<button data-href="#Roll-back-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus consente inoltre di ripristinare le configurazioni nel caso in cui il valore modificato non sia più applicabile.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl del by-dev/config/proxy/minPasswordLength</span> 
<span class="hljs-meta prompt_"># </span><span class="language-bash">or</span> 
<span class="hljs-meta prompt_">$ </span><span class="language-bash">birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,remove config-etcd --key by-dev/config/proxy/minPasswordLength&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>È quindi possibile verificare le configurazioni come segue:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl get by-dev/config/proxy/minPasswordLength</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-configurations" class="common-anchor-header">Visualizzazione delle configurazioni<button data-href="#View-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Invece di visualizzare il valore di una voce di configurazione specifica, è possibile anche elencarle tutte.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl get --prefix by-dev/config</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">or</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,show config-etcd&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>Per visualizzare le configurazioni di un nodo specifico:</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect --etcd ip:port 
Milvus(by-dev) &gt; show session          # List all nodes with their server ID
Milvus(by-dev) &gt; visit querycoord 1    # Visit a node by server ID
QueryCoord-1(ip:port) &gt; configuration  # List the configuration of the node
<button class="copy-code-btn"></button></code></pre>
<h2 id="Applicable-configuration-items" class="common-anchor-header">Elementi di configurazione applicabili<button data-href="#Applicable-configuration-items" class="anchor-icon" translate="no">
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
    </button></h2><p>Attualmente è possibile modificare al volo le seguenti voci di configurazione.</p>
<table>
<thead>
<tr><th>Elemento di configurazione</th><th>Valore predefinito</th></tr>
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
<tr><td>quotaAndLimits.dml.abilitato</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.dql.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limits.collection.maxNum</td><td>64</td></tr>
<tr><td>quotaAndLimits.limitWriting.forceDeny</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitWriting.ttProtection.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</td><td>9223372036854775807</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.enabled</td><td>VERO</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</td><td>0,85</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</td><td>0,95</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.livelloMinimoMemoriaNodoQuery</td><td>0,85</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.livello massimo di memoria del nodo di query</td><td>0,95</td></tr>
<tr><td>quotaAndLimits.limitWriting.diskProtection.enabled</td><td>TRUE</td></tr>
<tr><td>quotaAndLimits.limitWriting.diskProtection.diskQuota</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.forceDeny</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</td><td>9223372036854775807</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.resultProtection.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitReading.resultProtection.maxReadResultRate</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.velocità di raffreddamento</td><td>0,9</td></tr>
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
<h2 id="Whats-next" class="common-anchor-header">Prossimi passi<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Scopri di più sulle <a href="/docs/it/system_configuration.md">configurazioni di sistema</a>.</li>
<li>Scopri come configurare Milvus installato tramite <a href="/docs/it/configure_operator.md">Milvus Operator</a>, <a href="/docs/it/configure-helm.md">Helm chart</a> e <a href="/docs/it/configure-docker.md">Docker</a>.</li>
</ul>
