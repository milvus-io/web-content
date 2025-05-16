---
id: dynamic_config.md
related_key: configure
summary: Conozca la configuración dinámica de Milvus.
title: Configurar Milvus sobre la marcha
---
<h1 id="Configure-Milvus-on-the-Fly" class="common-anchor-header">Configurar Milvus sobre la marcha<button data-href="#Configure-Milvus-on-the-Fly" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus le permite cambiar algunas de sus configuraciones sobre la marcha.</p>
<h2 id="Before-you-start" class="common-anchor-header">Antes de empezar<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Necesita asegurarse de que：</p>
<ul>
<li>Tiene Birdwatcher instalado. Para más detalles, consulte <a href="/docs/es/v2.4.x/birdwatcher_install_guides.md">Instalar Birdwatcher</a>,</li>
<li>Tiene instalado etcdctl. Para más detalles, consulte <a href="https://etcd.io/docs/v3.5/dev-guide/interacting_v3/">Interacción con etcd</a>, o</li>
<li>Tiene instalados otros clientes etcd, como el cliente Python.</li>
</ul>
<div class="alert note">
<ul>
<li>Los ejemplos de esta guía cambian el valor de <code translate="no">proxy.minPasswordLength</code> a <code translate="no">8</code>. Puede reemplazar la clave por las que correspondan que se enumeran en <a href="/docs/es/v2.4.x/dynamic_config.md#Applicable-configuration-items">Elementos de configuración aplicables</a>.</li>
<li>Los ejemplos de esta guía asumen que la ruta raíz de su Milvus es <code translate="no">by-dev</code>. Todas las configuraciones se listan bajo la ruta <code translate="no">by-dev/config</code>. La ruta raíz de Milvus varía según la forma en que lo instale. Para las instancias instaladas utilizando las tablas Helm, la ruta raíz por defecto es <code translate="no">by-dev</code>. Si no conoce la ruta raíz, consulte <a href="/docs/es/v2.4.x/birdwatcher_usage_guides.md#Connect-to-etcd">Conectarse a etcd</a>.</li>
</ul>
</div>
<h2 id="Change-configurations" class="common-anchor-header">Cambiar configuraciones<button data-href="#Change-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>En Milvus, <code translate="no">proxy.minPasswordLength</code> está configurado por defecto a <code translate="no">6</code>. Para cambiar este valor, puede hacer lo siguiente:</p>
<pre><code translate="no" class="language-shell">$ etcdctl put by-dev/config/proxy/minPasswordLength 8
<span class="hljs-comment"># or</span>
$ birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,set config-etcd --key by-dev/config/proxy/minPasswordLength --value 8&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, puede comprobar las configuraciones del siguiente modo:</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">get</span> <span class="hljs-keyword">by</span>-dev/config/proxy/minPasswordLength
<button class="copy-code-btn"></button></code></pre>
<h2 id="Roll-back-configurations" class="common-anchor-header">Deshacer configuraciones<button data-href="#Roll-back-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus también le permite deshacer sus configuraciones en caso de que el valor cambiado ya no se aplique.</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">del</span> by-dev/config/proxy/minPasswordLength 
<span class="hljs-comment"># or </span>
$ birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,remove config-etcd --key by-dev/config/proxy/minPasswordLength&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, puede comprobar las configuraciones de la siguiente manera:</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">get</span> <span class="hljs-keyword">by</span>-dev/config/proxy/minPasswordLength
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-configurations" class="common-anchor-header">Ver configuraciones<button data-href="#View-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>En lugar de ver el valor de un elemento de configuración específico, también puede listarlos todos.</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">get</span> --prefix <span class="hljs-keyword">by</span>-dev/config
<span class="hljs-meta"># or</span>
$ birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,show config-etcd&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para ver las configuraciones de un nodo específico:</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect --etcd ip:port 
Milvus(by-dev) &gt; show session          <span class="hljs-comment"># List all nodes with their server ID</span>
Milvus(by-dev) &gt; visit querycoord <span class="hljs-number">1</span>    <span class="hljs-comment"># Visit a node by server ID</span>
QueryCoord-<span class="hljs-number">1</span>(ip:port) &gt; configuration  <span class="hljs-comment"># List the configuration of the node</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Applicable-configuration-items" class="common-anchor-header">Elementos de configuración aplicables<button data-href="#Applicable-configuration-items" class="anchor-icon" translate="no">
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
    </button></h2><p>Actualmente, puede modificar sobre la marcha los siguientes elementos de configuración.</p>
<table>
<thead>
<tr><th>Elemento de configuración</th><th>Valor por defecto</th></tr>
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
<tr><td>autoIndex.params.build</td><td>""</td></tr>
<tr><td>autoIndex.params.extra</td><td>""</td></tr>
<tr><td>autoIndex.params.search</td><td>""</td></tr>
<tr><td>proxy.maxNameLength</td><td>255</td></tr>
<tr><td>proxy.maxUsernameLength</td><td>32</td></tr>
<tr><td>proxy.minPasswordLength</td><td>6</td></tr>
<tr><td>proxy.maxLongitudContraseña</td><td>256</td></tr>
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
<h2 id="Whats-next" class="common-anchor-header">Más información<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Aprenda más sobre <a href="/docs/es/v2.4.x/system_configuration.md">Configuraciones del Sistema</a>.</li>
<li>Aprenda a configurar Milvus instalado usando <a href="/docs/es/v2.4.x/configure_operator.md">Milvus Operator</a>, <a href="/docs/es/v2.4.x/configure-helm.md">gráficos Helm</a> y <a href="/docs/es/v2.4.x/configure-docker.md">Docker</a>.</li>
</ul>
