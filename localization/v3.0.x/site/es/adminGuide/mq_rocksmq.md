---
id: mq_rocksmq.md
title: RocksMQ
---
<h1 id="Use-RocksMQ-as-the-Milvus-Message-Queue" class="common-anchor-header">Utilizar RocksMQ como cola de mensajes de Milvus<button data-href="#Use-RocksMQ-as-the-Milvus-Message-Queue" class="anchor-icon" translate="no">
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
    </button></h1><p>RocksMQ es una cola de mensajes integrada (WAL) incluida con Milvus, disponible <strong>únicamente</strong> para <strong>Milvus Standalone</strong>. Era la cola de mensajes predeterminada en versiones anteriores de Milvus; en Milvus 3.x, Milvus Standalone utiliza <a href="/docs/es/woodpecker.md">Woodpecker</a> integrado de forma predeterminada.</p>
<h2 id="Version-compatibility" class="common-anchor-header">Compatibilidad de versiones<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
<li><strong>Solo para la versión Standalone</strong>: RocksMQ <strong>no</strong> es compatible con Milvus Distributed (clúster). Consulta la <a href="/docs/es/mqtype-overview.md#Supported-message-queues">matriz de compatibilidad de colas de mensajes</a>.</li>
<li>RocksMQ se incluye con Milvus, por lo que no es necesario instalar ninguna versión por separado.</li>
<li>Era la cola de mensajes predeterminada para la versión independiente en versiones anteriores de Milvus, y en Milvus 3.x ha sido sustituida por Woodpecker integrado.</li>
</ul>
<h2 id="Deploy-Milvus-Standalone-with-RocksMQ-using-Docker" class="common-anchor-header">Implementar Milvus Standalone con RocksMQ mediante Docker<button data-href="#Deploy-Milvus-Standalone-with-RocksMQ-using-Docker" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install" class="common-anchor-header">Instalación<button data-href="#Install" class="anchor-icon" translate="no">
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
    </button></h3><p>Sigue las instrucciones de <a href="/docs/es/install_standalone-docker.md">«Ejecutar Milvus en Docker</a>». En Milvus 3.x, la opción predeterminada para la versión independiente es Woodpecker, por lo que debes cambiar explícitamente el tipo de cola de mensajes a RocksMQ. El script de arranque escribe un nuevo archivo « <code translate="no">user.yaml</code> » en el <strong>primer</strong> inicio ( <code translate="no">start</code>), así que configura el tipo <strong>tras</strong> ese primer inicio y, a continuación, ejecuta « <code translate="no">restart</code> » para aplicar el cambio (un « <code translate="no">restart</code> » conserva el contenido de « <code translate="no">user.yaml</code> »):</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-rocksmq &amp;&amp; <span class="hljs-built_in">cd</span> milvus-rocksmq
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

<span class="hljs-comment"># 1. First start — boots the container and writes a default user.yaml</span>
bash standalone_embed.sh start

<span class="hljs-comment"># 2. Set the message queue to RocksMQ</span>
<span class="hljs-built_in">cat</span> &gt; user.yaml &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
mq:
  <span class="hljs-built_in">type</span>: rocksmq
EOF

<span class="hljs-comment"># 3. Restart to apply the change</span>
bash standalone_embed.sh restart
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
El cambio de <code translate="no">mq.type</code> de esta forma está pensado para una instancia <b>totalmente nueva</b> (que aún no contenga colecciones). Para cambiar la cola de mensajes de una instancia que ya contiene datos, sigue en su lugar el <a href="/docs/es/switch-rocksmq-woodpecker.md">procedimiento de cambio</a>.
</div>
<h3 id="Configure" class="common-anchor-header">Configuración<button data-href="#Configure" class="anchor-icon" translate="no">
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
    </button></h3><p>Para ajustar RocksMQ, añade una sección « <code translate="no">rocksmq</code> » al archivo « <code translate="no">user.yaml</code> » y reinicia el servicio:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<span class="hljs-attr">rocksmq:</span>
  <span class="hljs-attr">path:</span> <span class="hljs-string">/var/lib/milvus/rdb_data</span>   <span class="hljs-comment"># where messages are stored</span>
  <span class="hljs-attr">lrucacheratio:</span> <span class="hljs-number">0.06</span>              <span class="hljs-comment"># rocksdb cache memory ratio</span>
  <span class="hljs-attr">rocksmqPageSize:</span> <span class="hljs-number">67108864</span>        <span class="hljs-comment"># 64 MB, size of each message page</span>
  <span class="hljs-attr">retentionTimeInMinutes:</span> <span class="hljs-number">4320</span>     <span class="hljs-comment"># 3 days</span>
  <span class="hljs-attr">retentionSizeInMB:</span> <span class="hljs-number">8192</span>          <span class="hljs-comment"># 8 GB</span>
  <span class="hljs-attr">compactionInterval:</span> <span class="hljs-number">86400</span>        <span class="hljs-comment"># 1 day, trigger rocksdb compaction</span>
  <span class="hljs-attr">compressionTypes:</span> [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">bash standalone_embed.sh restart
<button class="copy-code-btn"></button></code></pre>
<h3 id="Uninstall" class="common-anchor-header">Desinstalar<button data-href="#Uninstall" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-bash">bash standalone_embed.sh stop
bash standalone_embed.sh delete
<button class="copy-code-btn"></button></code></pre>
<h2 id="Notes" class="common-anchor-header">Notas<button data-href="#Notes" class="anchor-icon" translate="no">
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
<li><strong>Actualización de la versión 2.5.x a la 2.6.x:</strong> <strong>Limitaciones de la cola de mensajes</strong>: Al actualizar a Milvus v3.0-beta, debes mantener tu elección actual de cola de mensajes. No se admite el cambio entre diferentes sistemas de colas de mensajes durante la actualización. La compatibilidad con el cambio de sistemas de colas de mensajes estará disponible en futuras versiones.
Dado que la versión 2.6.x cambia la configuración predeterminada para la versión independiente a Woodpecker, fije <code translate="no">mq.type: rocksmq</code> en su archivo <code translate="no">user.yaml</code> <strong>antes de</strong> actualizar si desea conservar RocksMQ.</li>
<li>Para cambiar la cola de mensajes de una instancia en ejecución, consulta <a href="/docs/es/switch-rocksmq-woodpecker.md">Cambiar de RocksMQ a Woodpecker</a>.</li>
</ul>
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
<li><a href="/docs/es/woodpecker.md">Woodpecker (cola de mensajes predeterminada)</a></li>
<li><a href="/docs/es/switch-rocksmq-woodpecker.md">Cambiar de RocksMQ a Woodpecker</a></li>
</ul>
