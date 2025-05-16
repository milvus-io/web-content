---
id: deploy_pulsar.md
title: Configurar el almacenamiento de mensajes con Docker Compose o Helm
related_key: 'Pulsar, storage'
summary: Aprenda a configurar el almacenamiento de mensajes con Docker Compose o Helm.
---
<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Configurar el almacenamiento de mensajes con Docker Compose o Helm<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utiliza Pulsar o Kafka para gestionar los registros de cambios recientes, generar registros de flujo y proporcionar suscripciones a registros. Pulsar es el sistema de almacenamiento de mensajes por defecto. Este tema presenta cómo configurar el almacenamiento de mensajes con Docker Compose o Helm.</p>
<p>Puede configurar Pulsar con <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> o en K8s y configurar Kafka en K8s.</p>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">Configurar Pulsar con Docker Compose<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1. Configurar Pulsar</h3><p>Para configurar Pulsar con Docker Compose, proporcione sus valores para la sección <code translate="no">pulsar</code> en el archivo <code translate="no">milvus.yaml</code> en la ruta milvus/configs.</p>
<pre><code translate="no">pulsar:
  address: localhost <span class="hljs-comment"># Address of pulsar</span>
  port: <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  maxMessageSize: <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Consulte <a href="/docs/es/v2.4.x/configure_pulsar.md">las configuraciones relacionadas con Pulsar</a> para obtener más información.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Ejecute Milvus</h3><p>Ejecute el siguiente comando para iniciar Milvus que utiliza las configuraciones de Pulsar.</p>
<pre><code translate="no">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Las configuraciones sólo tienen efecto una vez iniciado Milvus. Consulte <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Iniciar Milvus</a> para obtener más información.</div>
<h2 id="Configure-Pulsar-with-Helm" class="common-anchor-header">Configurar Pulsar con Helm<button data-href="#Configure-Pulsar-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Para clusters Milvus en K8s, puede configurar Pulsar en el mismo comando que inicia Milvus. Alternativamente, puede configurar Pulsar utilizando el archivo <code translate="no">values.yml</code> en la ruta /charts/milvus en el repositorio <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> antes de iniciar Milvus.</p>
<p>Para más detalles sobre cómo configurar Milvus utilizando Helm, consulte <a href="/docs/es/v2.4.x/configure-helm.md">Configurar Milvus con Helm Charts</a>. Para más detalles sobre los elementos de configuración relacionados con Pulsar, consulte <a href="/docs/es/v2.4.x/configure_pulsar.md">Configuraciones relacionadas con Pulsar</a>. |</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Usando el archivo YAML</h3><ol>
<li>Configure la sección <code translate="no">externalConfigFiles</code> en el archivo <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    pulsar:
      address: localhost <span class="hljs-comment"># Address of pulsar</span>
      port: <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of Pulsar</span>
      webport: <span class="hljs-number">80</span> <span class="hljs-comment"># Web port of pulsar, if you connect direcly without proxy, should use 8080</span>
      maxMessageSize: <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
      tenant: public
      namespace: default    
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Después de configurar las secciones anteriores y guardar el archivo <code translate="no">values.yaml</code>, ejecute el siguiente comando para instalar Milvus que utiliza las configuraciones de Pulsar.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka-with-Helm" class="common-anchor-header">Configurar Kafka con Helm<button data-href="#Configure-Kafka-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Para clusters Milvus en K8s, puede configurar Kafka en el mismo comando que inicia Milvus. Alternativamente, puede configurar Kafka utilizando el archivo <code translate="no">values.yml</code> en la ruta /charts/milvus en el repositorio <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> antes de iniciar Milvus.</p>
<p>Para más detalles sobre cómo configurar Milvus utilizando Helm, consulte <a href="/docs/es/v2.4.x/configure-helm.md">Configurar Milvus con Helm Charts</a>. Para más detalles sobre los elementos de configuración relacionados con Pulsar, consulte <a href="/docs/es/v2.4.x/configure_pulsar.md">Configuraciones relacionadas con Pulsar</a>.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Uso del archivo YAML</h3><ol>
<li>Configure la sección <code translate="no">externalConfigFiles</code> en el archivo <code translate="no">values.yaml</code> si desea utilizar Kafka como sistema de almacenamiento de mensajes.</li>
</ol>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    kafka:
      brokerList:
        -  &lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;
      saslUsername:
      saslPassword:
      saslMechanisms: PLAIN
      securityProtocol: SASL_SSL    
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Después de configurar las secciones anteriores y guardar el archivo <code translate="no">values.yaml</code>, ejecute el siguiente comando para instalar Milvus que utiliza las configuraciones de Kafka.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-RocksMQ-with-Helm" class="common-anchor-header">Configurar RocksMQ con Helm<button data-href="#Configure-RocksMQ-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus standalone utiliza RocksMQ como almacenamiento de mensajes por defecto. Para pasos detallados sobre cómo configurar Milvus con Helm, consulte <a href="/docs/es/v2.4.x/configure-helm.md">Configurar Milvus con Helm Charts</a>. Para detalles sobre elementos de configuración relacionados con RocksMQ, refiérase a <a href="/docs/es/v2.4.x/configure_rocksmq.md">Configuraciones relacionadas con RocksMQ</a>.</p>
<ul>
<li><p>Si inicia Milvus con RocksMQ y desea cambiar su configuración, puede ejecutar <code translate="no">helm upgrade -f</code> con la configuración cambiada en el siguiente archivo YAML.</p></li>
<li><p>Si ha instalado Milvus standalone usando Helm con un almacén de mensajes distinto a RocksMQ y quiere cambiarlo de nuevo a RocksMQ, ejecute <code translate="no">helm upgrade -f</code> con el siguiente archivo YAML después de haber vaciado todas las colecciones y parado Milvus.</p></li>
</ul>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    rocksmq:
      <span class="hljs-comment"># The path where the message is stored in rocksmq</span>
      <span class="hljs-comment"># please adjust in embedded Milvus: /tmp/milvus/rdb_data</span>
      path: /var/lib/milvus/rdb_data
      lrucacheratio: <span class="hljs-number">0.06</span> <span class="hljs-comment"># rocksdb cache memory ratio</span>
      rocksmqPageSize: <span class="hljs-number">67108864</span> <span class="hljs-comment"># 64 MB, 64 * 1024 * 1024 bytes, The size of each page of messages in rocksmq</span>
      retentionTimeInMinutes: <span class="hljs-number">4320</span> <span class="hljs-comment"># 3 days, 3 * 24 * 60 minutes, The retention time of the message in rocksmq.</span>
      retentionSizeInMB: <span class="hljs-number">8192</span> <span class="hljs-comment"># 8 GB, 8 * 1024 MB, The retention size of the message in rocksmq.</span>
      compactionInterval: <span class="hljs-number">86400</span> <span class="hljs-comment"># 1 day, trigger rocksdb compaction every day to remove deleted data</span>
      <span class="hljs-comment"># compaction compression type, only support use 0,7.</span>
      <span class="hljs-comment"># 0 means not compress, 7 will use zstd</span>
      <span class="hljs-comment"># len of types means num of rocksdb level.</span>
      compressionTypes: [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>]    
<button class="copy-code-btn"></button></code></pre>
<div class="alert warning">
<p>No se recomienda cambiar el almacén de mensajes. Si quiere hacerlo, detenga todas las operaciones DDL, luego llame a la API FlushAll para vaciar todas las colecciones, y finalmente detenga Milvus antes de cambiar el almacén de mensajes.</p>
</div>
<h2 id="Configure-NATS-with-Helm" class="common-anchor-header">Configurar NATS con Helm<button data-href="#Configure-NATS-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS es un almacén de mensajes experimental alternativo a RocksMQ. Para pasos detallados sobre cómo configurar Milvus con <a href="/docs/es/v2.4.x/configure-helm.md">Helm</a>, consulte <a href="/docs/es/v2.4.x/configure-helm.md">Configurar Milvus con Helm Charts</a>. Para más detalles sobre los elementos de configuración relacionados con RocksMQ, consulte <a href="/docs/es/v2.4.x/configure_natsmq.md">Configuraciones relacionadas con NATS</a>.</p>
<ul>
<li><p>Si inicia Milvus con NATS y desea cambiar su configuración, puede ejecutar <code translate="no">helm upgrade -f</code> con la configuración modificada en el siguiente archivo YAML.</p></li>
<li><p>Si ha instalado Milvus standalone con un almacén de mensajes distinto de NATS y desea cambiarlo a NATS, ejecute <code translate="no">helm upgrade -f</code> con el siguiente archivo YAML después de haber vaciado todas las colecciones y detenido Milvus.</p></li>
</ul>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    mq:
      <span class="hljs-built_in">type</span>: natsmq
    natsmq:
      <span class="hljs-comment"># server side configuration for natsmq.</span>
      server: 
        <span class="hljs-comment"># 4222 by default, Port for nats server listening.</span>
        port: <span class="hljs-number">4222</span> 
        <span class="hljs-comment"># /var/lib/milvus/nats by default, directory to use for JetStream storage of nats.</span>
        storeDir: /var/lib/milvus/nats 
        <span class="hljs-comment"># (B) 16GB by default, Maximum size of the &#x27;file&#x27; storage.</span>
        maxFileStore: <span class="hljs-number">17179869184</span> 
        <span class="hljs-comment"># (B) 8MB by default, Maximum number of bytes in a message payload.</span>
        maxPayload: <span class="hljs-number">8388608</span> 
        <span class="hljs-comment"># (B) 64MB by default, Maximum number of bytes buffered for a connection applies to client connections.</span>
        maxPending: <span class="hljs-number">67108864</span> 
        <span class="hljs-comment"># (√ms) 4s by default, waiting for initialization of natsmq finished.</span>
        initializeTimeout: <span class="hljs-number">4000</span> 
        monitor:
          <span class="hljs-comment"># false by default, If true enable debug log messages.</span>
          debug: false 
          <span class="hljs-comment"># true by default, If set to false, log without timestamps.</span>
          logTime: true 
          <span class="hljs-comment"># no log file by default, Log file path relative to.. .</span>
          logFile: 
          <span class="hljs-comment"># (B) 0, unlimited by default, Size in bytes after the log file rolls over to a new one.</span>
          logSizeLimit: <span class="hljs-number">0</span> 
        retention:
          <span class="hljs-comment"># (min) 3 days by default, Maximum age of any message in the P-channel.</span>
          maxAge: <span class="hljs-number">4320</span> 
          <span class="hljs-comment"># (B) None by default, How many bytes the single P-channel may contain. Removing oldest messages if the P-channel exceeds this size.</span>
          maxBytes:
          <span class="hljs-comment"># None by default, How many message the single P-channel may contain. Removing oldest messages if the P-channel exceeds this limit.    </span>
          maxMsgs: 
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>¿Elegir entre RocksMQ y NATS?</strong></p>
<p>RockMQ utiliza CGO para interactuar con RocksDB y gestiona la memoria por sí mismo, mientras que el NATS puro de Go incrustado en la instalación de Milvus delega su gestión de memoria al recolector de basura (GC) de Go.</p>
<p>En el escenario en el que el paquete de datos es inferior a 64 kb, RocksDB supera en términos de uso de memoria, uso de CPU y tiempo de respuesta. Por otro lado, si el paquete de datos es mayor de 64 kb, NATS sobresale en términos de tiempo de respuesta con suficiente memoria y una programación ideal del GC.</p>
<p>Actualmente, se aconseja utilizar NATS sólo para experimentos.</p>
</div>
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
    </button></h2><p>Aprenda a configurar otras dependencias de Milvus con Docker Compose o Helm:</p>
<ul>
<li><a href="/docs/es/v2.4.x/deploy_s3.md">Configurar el almacenamiento de objetos con Docker Compose o Helm</a></li>
<li><a href="/docs/es/v2.4.x/deploy_etcd.md">Configurar Meta Storage con Docker Compose o Helm</a></li>
</ul>
