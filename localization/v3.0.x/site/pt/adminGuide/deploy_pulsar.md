---
id: deploy_pulsar.md
title: Configurar o armazenamento de mensagens com o Docker Compose ou o Helm
related_key: 'Pulsar, storage'
summary: >-
  Saiba como configurar o armazenamento de mensagens com o Docker Compose ou o
  Helm.
---
<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Configurar o armazenamento de mensagens com o Docker Compose ou o Helm<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus utiliza uma fila de mensagens para gerir registos de alterações recentes, emitir registos de fluxo e disponibilizar subscrições de registos. A partir da versão 3.0.x do Milvus, o Woodpecker é a fila de mensagens predefinida recomendada; este tópico explica como configurar o Pulsar ou o Kafka com o Docker Compose ou o Helm.</p>
<p>Pode configurar o Pulsar com <a href="https://docs.docker.com/get-started/overview/">o Docker Compose</a> ou no K8s e configurar o Kafka no K8s.</p>
<div class="alert note">
<p><strong>Limitações da fila de mensagens</strong>: Ao atualizar para o Milvus v3.0.5, deve manter a sua escolha atual de fila de mensagens. A mudança entre diferentes sistemas de filas de mensagens durante a atualização não é suportada. O suporte à alteração de sistemas de filas de mensagens estará disponível em versões futuras.</p>
</div>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">Configurar o Pulsar com o Docker Compose<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1. Configurar o Pulsar<button data-href="#1-Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h3><p>A configuração do Docker Compose incluída na versão do Milvus não inclui um serviço Pulsar. Para utilizar um serviço Pulsar existente com o Milvus autónomo, crie um ficheiro « <code translate="no">user.yaml</code> » e forneça os seus valores para a secção « <code translate="no">pulsar</code> »:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;your_pulsar_address&gt;</span> <span class="hljs-comment"># Address of pulsar</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">2097152</span> <span class="hljs-comment"># 2 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>No seu ficheiro Docker Compose, defina ` <code translate="no">MQ_TYPE</code> ` como ` <code translate="no">pulsar</code> ` na secção ` <code translate="no">environment</code> ` do serviço ` <code translate="no">standalone</code> ` e mapeie o caminho local para o seu ficheiro ` <code translate="no">user.yaml</code> ` para ` <code translate="no">/milvus/configs/user.yaml</code> ` na secção ` <code translate="no">volumes</code> `. Mantenha as entradas existentes em ambas as secções:</p>
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
<p>O Milvus lê <code translate="no">/milvus/configs/user.yaml</code> após <code translate="no">milvus.yaml</code>, pelo que os valores em <code translate="no">user.yaml</code> substituem os valores predefinidos. A variável de ambiente <code translate="no">MQ_TYPE</code> define <code translate="no">mq.type</code>, que seleciona a fila de mensagens, e tem precedência sobre os ficheiros de configuração.</p>
<p>Defina a fila de mensagens antes de iniciar uma nova implementação pela primeira vez. O Milvus regista <code translate="no">mq.type</code> no etcd quando é iniciado pela primeira vez e não sobrescreve o valor registado posteriormente.</p>
<p>Consulte <a href="/docs/pt/configure_pulsar.md">as configurações relacionadas com o Pulsar</a> para obter mais informações.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Executar o Milvus<button data-href="#2-Run-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Execute o seguinte comando para iniciar o Milvus utilizando as configurações do Pulsar.</p>
<pre><code translate="no"><span class="hljs-attribute">docker</span> compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">As configurações só entram em vigor após o arranque do Milvus. Consulte <a href="/docs/pt/install_standalone-docker-compose.md#Install-Milvus">Instalar o Milvus</a> para obter mais informações.</div>
<h2 id="Configure-Pulsar-with-Helm" class="common-anchor-header">Configurar o Pulsar com o Helm<button data-href="#Configure-Pulsar-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Para clusters do Milvus no K8s, pode configurar o Pulsar no mesmo comando que inicia o Milvus. Em alternativa, pode configurar o Pulsar utilizando o ficheiro « <code translate="no">values.yaml</code> » no caminho «/charts/milvus» no repositório <a href="https://github.com/zilliztech/milvus-helm/tree/master/charts/milvus">«milvus-helm»</a> antes de iniciar o Milvus.</p>
<p>Para obter detalhes sobre como configurar o Milvus utilizando o Helm, consulte <a href="/docs/pt/configure-helm.md">«Configurar o Milvus com gráficos do Helm</a>». Para obter detalhes sobre itens de configuração relacionados com o Pulsar, consulte <a href="/docs/pt/configure_pulsar.md">«Configurações relacionadas com o Pulsar</a>».</p>
<p>Adicione o repositório de gráficos Helm do Milvus e atualize o índice de gráficos local antes de instalar o Milvus com qualquer um dos comandos Helm apresentados nesta página:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Utilizando o ficheiro YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
<li>Configure a secção « <code translate="no">extraConfigFiles</code> » no ficheiro « <code translate="no">values.yaml</code> ».</li>
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
<li>Após configurar as secções anteriores e guardar o ficheiro ` <code translate="no">values.yaml</code> `, execute o comando seguinte para instalar o Milvus utilizando as configurações do Pulsar.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; zilliztech/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Woodpecker-with-Helm" class="common-anchor-header">Configurar o Woodpecker com o Helm<button data-href="#Configure-Woodpecker-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Para clusters do Milvus no K8s, pode configurar o Woodpecker no mesmo comando que inicia o Milvus. Em alternativa, pode configurar o Woodpecker utilizando o ficheiro <code translate="no">values.yaml</code> no caminho /charts/milvus no repositório <a href="https://github.com/zilliztech/milvus-helm/tree/master/charts/milvus">milvus-helm</a> antes de iniciar o Milvus.</p>
<p>Para obter detalhes sobre como configurar o Milvus utilizando o Helm, consulte <a href="/docs/pt/configure-helm.md">«Configurar o Milvus com os Charts do Helm</a>». Para obter detalhes sobre os itens de configuração relacionados com o Woodpecker, consulte <a href="/docs/pt/woodpecker.md">«Configurações relacionadas com o Woodpecker</a>».</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Utilizar o ficheiro YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
<li>Configure a secção <code translate="no">extraConfigFiles</code> no ficheiro <code translate="no">values.yaml</code>.</li>
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
<li>Após configurar as secções anteriores e guardar o ficheiro « <code translate="no">values.yaml</code> », execute o comando seguinte para instalar o Milvus utilizando as configurações do Woodpecker.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; zilliztech/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka-with-Helm" class="common-anchor-header">Configurar o Kafka com o Helm<button data-href="#Configure-Kafka-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Para clusters do Milvus no K8s, pode configurar o Kafka no mesmo comando que inicia o Milvus. Em alternativa, pode configurar o Kafka utilizando o ficheiro <code translate="no">values.yaml</code> no caminho /charts/milvus no repositório <a href="https://github.com/zilliztech/milvus-helm/tree/master/charts/milvus">milvus-helm</a> antes de iniciar o Milvus.</p>
<p>Para obter detalhes sobre como configurar o Milvus utilizando o Helm, consulte <a href="/docs/pt/configure-helm.md">«Configurar o Milvus com os Charts do Helm</a>». Para obter detalhes sobre os itens de configuração relacionados com o Pulsar, consulte <a href="/docs/pt/configure_pulsar.md">«Configurações relacionadas com o Pulsar</a>».</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Utilizar o ficheiro YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
<li>Configure a secção <code translate="no">extraConfigFiles</code> no ficheiro <code translate="no">values.yaml</code> se pretender utilizar o Kafka como sistema de armazenamento de mensagens.</li>
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
<li>Após configurar as secções anteriores e guardar o ficheiro « <code translate="no">values.yaml</code> », execute o comando seguinte para instalar o Milvus utilizando as configurações do Kafka.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; zilliztech/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-RocksMQ-with-Helm" class="common-anchor-header">Configurar o RocksMQ com o Helm<button data-href="#Configure-RocksMQ-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>O RocksMQ era o armazenamento de mensagens predefinido no Milvus autónomo até à versão 2.5.x; a partir da versão 2.6.x, o predefinido é o Woodpecker. Para obter passos detalhados sobre como configurar o Milvus com o Helm, consulte <a href="/docs/pt/configure-helm.md">«Configurar o Milvus com os gráficos do Helm</a>». Para obter detalhes sobre os itens de configuração relacionados com o RocksMQ, consulte <a href="/docs/pt/configure_rocksmq.md">«Configurações relacionadas com o RocksMQ</a>».</p>
<ul>
<li><p>Se iniciar o Milvus com o RocksMQ e pretender alterar as suas definições, pode executar « <code translate="no">helm upgrade -f</code> » com as definições alteradas no ficheiro YAML seguinte.</p></li>
<li><p>Se tiver instalado o Milvus de forma autónoma utilizando o Helm com um armazenamento de mensagens diferente do RocksMQ e pretender voltar a utilizar o RocksMQ, execute ` <code translate="no">helm upgrade -f</code> ` com o seguinte ficheiro YAML após ter esvaziado todas as coleções e parado o Milvus.</p></li>
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
<p>Não é recomendável alterar o armazenamento de mensagens. Se pretender fazê-lo, interrompa todas as operações DDL, chame a API FlushAll para esvaziar todas as coleções e, por fim, pare o Milvus antes de efetivamente alterar o armazenamento de mensagens.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Próximos passos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Saiba como configurar outras dependências do Milvus com o Docker Compose ou o Helm:</p>
<ul>
<li><a href="/docs/pt/deploy_s3.md">Configurar o armazenamento de objetos com o Docker Compose ou o Helm</a></li>
<li><a href="/docs/pt/deploy_etcd.md">Configurar o armazenamento de metadados com o Docker Compose ou o Helm</a></li>
</ul>
