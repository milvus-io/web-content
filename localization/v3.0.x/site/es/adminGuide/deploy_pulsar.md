---
id: deploy_pulsar.md
title: Configurar el almacenamiento de mensajes con Docker Compose o Helm
related_key: 'Pulsar, storage'
summary: >-
  Descubre cómo configurar el almacenamiento de mensajes con Docker Compose o
  Helm.
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
    </button></h1><p>Milvus utiliza una cola de mensajes para gestionar los registros de los cambios recientes, generar registros de flujo y ofrecer suscripciones a registros. A partir de la versión 3.0.x de Milvus, Woodpecker es la cola de mensajes recomendada por defecto; en este tema se explica cómo configurar Pulsar o Kafka con Docker Compose o Helm.</p>
<p>Puedes configurar Pulsar con <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> o en K8s, y configurar Kafka en K8s.</p>
<div class="alert note">
<p><strong>Limitaciones de la cola de mensajes</strong>: al actualizar a Milvus v3.0.5, debes mantener la cola de mensajes que tengas elegida actualmente. No se admite el cambio entre diferentes sistemas de colas de mensajes durante la actualización. La compatibilidad con el cambio de sistemas de colas de mensajes estará disponible en futuras versiones.</p>
</div>
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1. Configurar Pulsar<button data-href="#1-Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h3><p>La configuración de Docker Compose adjunta a la versión de Milvus no incluye un servicio de Pulsar. Para utilizar un servicio de Pulsar existente con Milvus en modo autónomo, crea un archivo « <code translate="no">user.yaml</code> » e introduce tus valores en la sección « <code translate="no">pulsar</code> »:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;your_pulsar_address&gt;</span> <span class="hljs-comment"># Address of pulsar</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">2097152</span> <span class="hljs-comment"># 2 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>En su archivo de Docker Compose, establezca ` <code translate="no">MQ_TYPE</code> ` como ` <code translate="no">pulsar</code> ` en la sección ` <code translate="no">environment</code> ` del servicio ` <code translate="no">standalone</code> `, y asigne la ruta local a su archivo ` <code translate="no">user.yaml</code> ` a ` <code translate="no">/milvus/configs/user.yaml</code> ` en su sección ` <code translate="no">volumes</code> `. Mantenga las entradas existentes en ambas secciones:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-attr">MINIO_REGION:</span> <span class="hljs-string">us-east-1</span>
      <span class="hljs-attr">ETCD_ENDPOINTS:</span> <span class="hljs-string">etcd:2379</span>
      <span class="hljs-attr">MINIO_ADDRESS:</span> <span class="hljs-string">minio:9000</span>
      <span class="hljs-attr">MQ_TYPE:</span> <span class="hljs-string">pulsar</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/local/path/to/your/user.yaml:/milvus/configs/user.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus lee <code translate="no">/milvus/configs/user.yaml</code> después de <code translate="no">milvus.yaml</code>, por lo que los valores de <code translate="no">user.yaml</code> anulan los valores predeterminados. La variable de entorno <code translate="no">MQ_TYPE</code> establece <code translate="no">mq.type</code>, que selecciona la cola de mensajes, y tiene prioridad sobre los archivos de configuración.</p>
<p>Configura la cola de mensajes antes de iniciar una nueva implementación por primera vez. Milvus registra <code translate="no">mq.type</code> en etcd al iniciarse por primera vez y no sobrescribe el valor registrado posteriormente.</p>
<p>Consulta <a href="/docs/es/configure_pulsar.md">las configuraciones relacionadas con Pulsar</a> para obtener más información.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Ejecutar Milvus<button data-href="#2-Run-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Ejecute el siguiente comando para iniciar Milvus utilizando las configuraciones de Pulsar.</p>
<pre><code translate="no"><span class="hljs-attribute">docker</span> compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Las configuraciones solo surten efecto una vez que Milvus se ha iniciado. Consulta <a href="/docs/es/install_standalone-docker-compose.md#Install-Milvus">«Instalar Milvus»</a> para obtener más información.</div>
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
    </button></h2><p>Para los clústeres de Milvus en K8s, puede configurar Pulsar en el mismo comando que inicia Milvus. Como alternativa, puede configurar Pulsar utilizando el archivo « <code translate="no">values.yaml</code> », ubicado en la ruta «/charts/milvus» del repositorio <a href="https://github.com/zilliztech/milvus-helm/tree/master/charts/milvus">«milvus-helm»</a>, antes de iniciar Milvus.</p>
<p>Para obtener más información sobre cómo configurar Milvus mediante Helm, consulta <a href="/docs/es/configure-helm.md">«Configurar Milvus con gráficos de Helm</a>». Para obtener más información sobre los elementos de configuración relacionados con Pulsar, consulta <a href="/docs/es/configure_pulsar.md">«Configuraciones relacionadas con Pulsar</a>».</p>
<p>Añade el repositorio de gráficos Helm de Milvus y actualiza el índice de gráficos local antes de instalar Milvus con cualquiera de los comandos de Helm que aparecen en esta página:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Uso del archivo YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Configure la sección « <code translate="no">extraConfigFiles</code> » en el archivo « <code translate="no">values.yaml</code> ».</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    pulsar:
      address: localhost # Address of pulsar
      port: 6650 # Port of Pulsar
      webport: 80 # Web port of pulsar, if you connect directly without proxy, should use 8080
      maxMessageSize: 2097152 # 2 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.
      tenant: public
      namespace: default    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Tras configurar las secciones anteriores y guardar el archivo ` <code translate="no">values.yaml</code> `, ejecute el siguiente comando para instalar Milvus utilizando las configuraciones de Pulsar.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; zilliztech/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Woodpecker-with-Helm" class="common-anchor-header">Configurar Woodpecker con Helm<button data-href="#Configure-Woodpecker-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Para los clústeres de Milvus en K8s, puede configurar Woodpecker en el mismo comando que inicia Milvus. Como alternativa, puede configurar Woodpecker utilizando el archivo <code translate="no">values.yaml</code>, ubicado en la ruta /charts/milvus del repositorio <a href="https://github.com/zilliztech/milvus-helm/tree/master/charts/milvus">milvus-helm</a>, antes de iniciar Milvus.</p>
<p>Para obtener más información sobre cómo configurar Milvus con Helm, consulta <a href="/docs/es/configure-helm.md">«Configurar Milvus con Helm Charts</a>». Para obtener más información sobre los elementos de configuración relacionados con Woodpecker, consulta <a href="/docs/es/woodpecker.md">«Configuraciones relacionadas con Woodpecker</a>».</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Uso del archivo YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Configure la sección « <code translate="no">extraConfigFiles</code> » en el archivo « <code translate="no">values.yaml</code> ».</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    woodpecker:
      meta:
        type: etcd # The Type of the metadata provider. currently only support etcd.
        prefix: woodpecker # The Prefix of the metadata provider. default is woodpecker.
      client:
        segmentAppend:
          queueSize: 10000 # The size of the queue for pending messages to be sent of each log.
          maxRetries: 3 # Maximum number of retries for segment append operations.
        segmentRollingPolicy:
          maxSize: 256M # Maximum size of a segment.
          maxInterval: 10m # Maximum interval between two segments, default is 10 minutes.
          maxBlocks: 1000 # Maximum number of blocks in a segment
        auditor:
          maxInterval: 10s # Maximum interval between two auditing operations, default is 10 seconds.
      logstore:
        segmentSyncPolicy:
          maxInterval: 200ms # Maximum interval between two sync operations, default is 200 milliseconds.
          maxIntervalForLocalStorage: 10ms # Maximum interval between two sync operations local storage backend, default is 10 milliseconds.
          maxBytes: 256M # Maximum size of write buffer in bytes.
          maxEntries: 10000 # Maximum entries number of write buffer.
          maxFlushRetries: 5 # Maximum number of flush retries.
          retryInterval: 1000ms # Maximum interval between two retries. default is 1000 milliseconds.
          maxFlushSize: 2M # Maximum size of a fragment in bytes to flush.
          maxFlushThreads: 32 # Maximum number of threads to flush data
        segmentCompactionPolicy:
          maxSize: 2M # The maximum size of the merged files.
          maxParallelUploads: 4 # The maximum number of parallel upload threads for compaction.
          maxParallelReads: 8 # The maximum number of parallel read threads for compaction.
        segmentReadPolicy:
          maxBatchSize: 16M # Maximum size of a batch in bytes.
          maxFetchThreads: 32 # Maximum number of threads to fetch data.
      storage:
        type: minio # The Type of the storage provider. Valid values: [minio, local]
        rootPath: /var/lib/milvus/woodpecker # The root path of the storage provider.    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Tras configurar las secciones anteriores y guardar el archivo « <code translate="no">values.yaml</code> », ejecute el siguiente comando para instalar Milvus utilizando las configuraciones de Woodpecker.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; zilliztech/milvus -f values.yaml
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
    </button></h2><p>Para los clústeres de Milvus en K8s, puede configurar Kafka en el mismo comando que inicia Milvus. Como alternativa, puede configurar Kafka utilizando el archivo <code translate="no">values.yaml</code>, ubicado en la ruta /charts/milvus del repositorio <a href="https://github.com/zilliztech/milvus-helm/tree/master/charts/milvus">milvus-helm</a>, antes de iniciar Milvus.</p>
<p>Para obtener más información sobre cómo configurar Milvus con Helm, consulta <a href="/docs/es/configure-helm.md">«Configurar Milvus con Helm Charts</a>». Para obtener más información sobre los elementos de configuración relacionados con Pulsar, consulta <a href="/docs/es/configure_pulsar.md">«Configuraciones relacionadas con Pulsar</a>».</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Uso del archivo YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Configure la sección « <code translate="no">extraConfigFiles</code> » del archivo « <code translate="no">values.yaml</code> » si desea utilizar Kafka como sistema de almacenamiento de mensajes.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    kafka:
      brokerList:
        -  &lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;
      saslUsername:
      saslPassword:
      saslMechanisms: PLAIN
      securityProtocol: SASL_SSL    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Tras configurar las secciones anteriores y guardar el archivo ` <code translate="no">values.yaml</code> `, ejecute el siguiente comando para instalar Milvus con las configuraciones de Kafka.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; zilliztech/milvus -f values.yaml
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
    </button></h2><p>RocksMQ era el almacenamiento de mensajes predeterminado en Milvus independiente hasta la versión 2.5.x; a partir de la versión 2.6.x, el valor predeterminado es Woodpecker. Para conocer los pasos detallados sobre cómo configurar Milvus con Helm, consulta <a href="/docs/es/configure-helm.md">«Configurar Milvus con Helm Charts</a>». Para obtener más información sobre los elementos de configuración relacionados con RocksMQ, consulta <a href="/docs/es/configure_rocksmq.md">«Configuraciones relacionadas con RocksMQ</a>».</p>
<ul>
<li><p>Si ha iniciado Milvus con RocksMQ y desea modificar su configuración, puede ejecutar « <code translate="no">helm upgrade -f</code> » con los ajustes modificados en el siguiente archivo YAML.</p></li>
<li><p>Si ha instalado Milvus de forma independiente mediante Helm con un almacén de mensajes distinto de RocksMQ y desea volver a RocksMQ, ejecute « <code translate="no">helm upgrade -f</code> » con el siguiente archivo YAML después de haber vaciado todas las colecciones y detenido Milvus.</p></li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    rocksmq:
      # The path where the message is stored in rocksmq
      # please adjust in embedded Milvus: /tmp/milvus/rdb_data
      path: /var/lib/milvus/rdb_data
      lrucacheratio: 0.06 # rocksdb cache memory ratio
      rocksmqPageSize: 67108864 # 64 MB, 64 * 1024 * 1024 bytes, The size of each page of messages in rocksmq
      retentionTimeInMinutes: 4320 # 3 days, 3 * 24 * 60 minutes, The retention time of the message in rocksmq.
      retentionSizeInMB: 8192 # 8 GB, 8 * 1024 MB, The retention size of the message in rocksmq.
      compactionInterval: 86400 # 1 day, trigger rocksdb compaction every day to remove deleted data
      # compaction compression type, only support use 0,7.
      # 0 means not compress, 7 will use zstd
      # len of types means num of rocksdb level.
      compressionTypes: [0, 0, 7, 7, 7]    
</span><button class="copy-code-btn"></button></code></pre>
<div class="alert warning">
<p>No se recomienda cambiar el almacén de mensajes. Si, a pesar de todo, desea hacerlo, detenga todas las operaciones DDL, a continuación llame a la API FlushAll para vaciar todas las colecciones y, por último, detenga Milvus antes de cambiar realmente el almacén de mensajes.</p>
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
    </button></h2><p>Descubre cómo configurar otras dependencias de Milvus con Docker Compose o Helm:</p>
<ul>
<li><a href="/docs/es/deploy_s3.md">Configurar el almacenamiento de objetos con Docker Compose o Helm</a></li>
<li><a href="/docs/es/deploy_etcd.md">Configurar el almacenamiento de metadatos con Docker Compose o Helm</a></li>
</ul>
