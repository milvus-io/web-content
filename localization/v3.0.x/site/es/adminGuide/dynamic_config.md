---
id: dynamic_config.md
related_key: configure
summary: Descubre cómo funciona la configuración dinámica de Milvus.
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
    </button></h1><p>Milvus te permite modificar algunas de sus configuraciones sobre la marcha.</p>
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
    </button></h2><p>Debes asegurarte de que:</p>
<ul>
<li>Tienes instalado Birdwatcher. Para más detalles, consulta <a href="/docs/es/birdwatcher_install_guides.md">Instalar Birdwatcher</a>,</li>
<li>Tienes instalado etcdctl. Para más detalles, consulta <a href="https://etcd.io/docs/v3.5/dev-guide/interacting_v3/">«Interactuar con etcd</a>», o</li>
<li>Tienes instalados otros clientes de etcd, como el cliente de Python.</li>
</ul>
<div class="alert note">
<ul>
<li>Los ejemplos de esta guía cambian el valor de « <code translate="no">proxy.minPasswordLength</code> » por « <code translate="no">8</code> ». Puede sustituir la clave por las correspondientes que se enumeran en <a href="/docs/es/dynamic_config.md#Applicable-configuration-items">«Elementos de configuración aplicables</a>».</li>
<li>Los ejemplos de esta guía dan por hecho que la ruta raíz de su Milvus es <code translate="no">by-dev</code>. Todas las configuraciones se encuentran en la ruta <code translate="no">by-dev/config</code>. La ruta raíz de Milvus varía en función de cómo lo haya instalado. Para las instancias instaladas mediante los gráficos de Helm, la ruta raíz predeterminada es <code translate="no">by-dev</code>. Si no conoce la ruta raíz, consulte <a href="/docs/es/birdwatcher_usage_guides.md#Connect-to-etcd">«Conectarse a etcd</a>».</li>
</ul>
</div>
<h2 id="Change-configurations" class="common-anchor-header">Modificar configuraciones<button data-href="#Change-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>En Milvus, <code translate="no">proxy.minPasswordLength</code> está configurado de forma predeterminada como <code translate="no">6</code>. Para cambiar este valor, puede hacer lo siguiente:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl put by-dev/config/proxy/minPasswordLength 8</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">or</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,set config-etcd --key by-dev/config/proxy/minPasswordLength --value 8&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, puede comprobar las configuraciones de la siguiente manera:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl get by-dev/config/proxy/minPasswordLength</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Roll-back-configurations" class="common-anchor-header">Revertir configuraciones<button data-href="#Roll-back-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus también te permite revertir tus configuraciones en caso de que el valor modificado ya no sea válido.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl del by-dev/config/proxy/minPasswordLength</span> 
<span class="hljs-meta prompt_"># </span><span class="language-bash">or</span> 
<span class="hljs-meta prompt_">$ </span><span class="language-bash">birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,remove config-etcd --key by-dev/config/proxy/minPasswordLength&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, puedes comprobar las configuraciones de la siguiente manera:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl get by-dev/config/proxy/minPasswordLength</span>
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
    </button></h2><p>En lugar de ver el valor de un elemento de configuración concreto, también puedes mostrar una lista con todos ellos.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">etcdctl get --prefix by-dev/config</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">or</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,show config-etcd&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>Para ver las configuraciones de un nodo concreto:</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect --etcd ip:port 
Milvus(by-dev) &gt; show session          # List all nodes with their server ID
Milvus(by-dev) &gt; visit querycoord 1    # Visit a node by server ID
QueryCoord-1(ip:port) &gt; configuration  # List the configuration of the node
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
    </button></h2><p>Actualmente, puedes modificar los siguientes elementos de configuración sobre la marcha.</p>
<table>
<thead>
<tr><th>Elemento de configuración</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td>pulsar.maxMessageSize</td><td>5242880</td></tr>
<tr><td>common.retentionDuration</td><td>86400</td></tr>
<tr><td>common.entityExpiration</td><td>-1</td></tr>
<tr><td>common.gracefulTime</td><td>5000</td></tr>
<tr><td>common.tiempo-de-espera-para-parada-gradual</td><td>30</td></tr>
<tr><td>cuotaYLímites.ddl.habilitado</td><td>FALSO</td></tr>
<tr><td>quotaAndLimits.indexRate.enabled</td><td>FALSO</td></tr>
<tr><td>quotaAndLimits.flushRate.enabled</td><td>FALSO</td></tr>
<tr><td>quotaAndLimits.compactionRate.enabled</td><td>FALSO</td></tr>
<tr><td>quotaAndLimits.dml.enabled</td><td>FALSO</td></tr>
<tr><td>quotaAndLimits.dql.enabled</td><td>FALSO</td></tr>
<tr><td>cuotasYLímites.límites.colección.númMáx</td><td>64</td></tr>
<tr><td>quotaAndLimits.limitWriting.forceDeny</td><td>FALSO</td></tr>
<tr><td>quotaAndLimits.limitWriting.ttProtection.enabled</td><td>FALSO</td></tr>
<tr><td>cuotaYLímites.límiteDeEscritura.protecciónTT.retrasoMáximoDeTickDeTiempo</td><td>9223372036854775807</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.enabled</td><td>VERDADERO</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</td><td>0,85</td></tr>
<tr><td>cuotaYLímites.límiteDeEscritura.protecciónDeMemoria.nivelMínimoDeMemoriaDelNodoDeDatos0,85</td><td>0,95</td></tr>
<tr><td>cuotasYLímites.límiteDeEscritura.protecciónDeMemoria.nivelMínimoDeMemoriaDelNodoDeConsulta</td><td>0,85</td></tr>
<tr><td>cuotasYLímites.límiteDeEscritura.protecciónDeMemoria.nivelMáximoDeMemoriaDelNodoDeConsulta</td><td>0,95</td></tr>
<tr><td>cuotasYLímites.límiteDeEscritura.protecciónDeMemoria.activado</td><td>TRUE</td></tr>
<tr><td>cuotaYLímites.límiteDeEscritura.protecciónDeDisco.cuotaDeDisco</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.forceDeny</td><td>FALSO</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.enabled</td><td>FALSE</td></tr>
<tr><td>cuotaYLímites.límiteDeLectura.protecciónDeCola.umbralDeNqEnCola</td><td>9223372036854775807</td></tr>
<tr><td>quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</td><td>+INF</td></tr>
<tr><td>cuotaYLímites.límiteDeLectura.protecciónDeResultados.activado</td><td>FALSE</td></tr>
<tr><td>cuotaYLímites.límiteDeLectura.protecciónDeResultados.tasaMáximaDeResultadosDeLectura</td><td>+INF</td></tr>
<tr><td>cuotaYLímites.límiteDeLectura.velocidadDeEnfriamiento</td><td>0,9</td></tr>
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
<tr><td>proxy.maxDimension</td><td>32 768</td></tr>
<tr><td>proxy.maxUserNum</td><td>100</td></tr>
<tr><td>proxy.maxRoleNum</td><td>10</td></tr>
<tr><td>queryNode.enableDisk</td><td>TRUE</td></tr>
<tr><td>dataCoord.segment.diskSegmentMaxSize</td><td>2048</td></tr>
<tr><td>dataCoord.compaction.enableAutoCompaction</td><td>VERDADERO</td></tr>
</tbody>
</table>
<h2 id="Whats-next" class="common-anchor-header">Próximos pasos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Más información sobre <a href="/docs/es/system_configuration.md">las configuraciones del sistema</a>.</li>
<li>Descubre cómo configurar Milvus instalado mediante <a href="/docs/es/configure_operator.md">Milvus Operator</a>, <a href="/docs/es/configure-helm.md">Helm charts</a> y <a href="/docs/es/configure-docker.md">Docker</a>.</li>
</ul>
