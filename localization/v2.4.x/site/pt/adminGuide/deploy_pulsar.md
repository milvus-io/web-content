---
id: deploy_pulsar.md
title: Configurar o armazenamento de mensagens com o Docker Compose ou Helm
related_key: 'Pulsar, storage'
summary: >-
  Saiba como configurar o armazenamento de mensagens com o Docker Compose ou o
  Helm.
---
<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Configurar o armazenamento de mensagens com Docker Compose ou Helm<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus usa Pulsar ou Kafka para gerenciar logs de mudanças recentes, gerar logs de fluxo e fornecer assinaturas de log. O Pulsar é o sistema de armazenamento de mensagens padrão. Este tópico apresenta como configurar o armazenamento de mensagens com o Docker Compose ou Helm.</p>
<p>É possível configurar o Pulsar com o <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> ou no K8s e configurar o Kafka no K8s.</p>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">Configurar a Pulsar com o Docker Compose<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1. Configurar o Pulsar</h3><p>Para configurar o Pulsar com o Docker Compose, forneça seus valores para a seção <code translate="no">pulsar</code> no arquivo <code translate="no">milvus.yaml</code> no caminho milvus/configs.</p>
<pre><code translate="no">pulsar:
  address: localhost <span class="hljs-comment"># Address of pulsar</span>
  port: <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  maxMessageSize: <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Consulte <a href="/docs/pt/v2.4.x/configure_pulsar.md">Configurações relacionadas ao Pulsar</a> para obter mais informações.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Executar o Milvus</h3><p>Execute o seguinte comando para iniciar o Milvus que usa as configurações do Pulsar.</p>
<pre><code translate="no">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">As configurações só têm efeito depois que o Milvus é iniciado. Consulte <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Iniciar o Milvus</a> para obter mais informações.</div>
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
    </button></h2><p>Para clusters Milvus em K8s, você pode configurar a Pulsar no mesmo comando que inicia o Milvus. Alternativamente, você pode configurar o Pulsar usando o arquivo <code translate="no">values.yml</code> no caminho /charts/milvus no repositório <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> antes de iniciar o Milvus.</p>
<p>Para obter detalhes sobre como configurar o Milvus usando o Helm, consulte <a href="/docs/pt/v2.4.x/configure-helm.md">Configurar o Milvus com Helm Charts</a>. Para obter detalhes sobre os itens de configuração relacionados ao Pulsar, consulte <a href="/docs/pt/v2.4.x/configure_pulsar.md">Configurações relacionadas ao Pulsar</a>.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Usando o arquivo YAML</h3><ol>
<li>Configure a secção <code translate="no">externalConfigFiles</code> no ficheiro <code translate="no">values.yaml</code>.</li>
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
<li>Depois de configurar as seções anteriores e salvar o arquivo <code translate="no">values.yaml</code>, execute o comando a seguir para instalar o Milvus, que usa as configurações do Pulsar.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
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
    </button></h2><p>Para clusters do Milvus no K8s, é possível configurar o Kafka no mesmo comando que inicia o Milvus. Como alternativa, é possível configurar o Kafka usando o arquivo <code translate="no">values.yml</code> no caminho /charts/milvus no repositório <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> antes de iniciar o Milvus.</p>
<p>Para obter detalhes sobre como configurar o Milvus usando o Helm, consulte <a href="/docs/pt/v2.4.x/configure-helm.md">Configurar o Milvus com Helm Charts</a>. Para obter detalhes sobre os itens de configuração relacionados ao Pulsar, consulte <a href="/docs/pt/v2.4.x/configure_pulsar.md">Configurações relacionadas ao Pulsar</a>.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Usando o arquivo YAML</h3><ol>
<li>Configure a secção <code translate="no">externalConfigFiles</code> no ficheiro <code translate="no">values.yaml</code> se pretender utilizar o Kafka como sistema de armazenamento de mensagens.</li>
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
<li>Depois de configurar as seções anteriores e salvar o arquivo <code translate="no">values.yaml</code>, execute o seguinte comando para instalar o Milvus que usa as configurações do Kafka.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
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
    </button></h2><p>O Milvus standalone usa o RocksMQ como armazenamento de mensagens padrão. Para obter etapas detalhadas sobre como configurar o Milvus com o Helm, consulte <a href="/docs/pt/v2.4.x/configure-helm.md">Configurar o Milvus com gráficos do Helm</a>. Para obter detalhes sobre os itens de configuração relacionados ao RocksMQ, consulte <a href="/docs/pt/v2.4.x/configure_rocksmq.md">Configurações relacionadas ao RocksMQ</a>.</p>
<ul>
<li><p>Se você iniciar o Milvus com o RocksMQ e quiser alterar suas configurações, poderá executar <code translate="no">helm upgrade -f</code> com as configurações alteradas no seguinte arquivo YAML.</p></li>
<li><p>Se tiver instalado o Milvus standalone usando o Helm com um armazenamento de mensagens diferente do RocksMQ e quiser alterá-lo de volta para o RocksMQ, execute <code translate="no">helm upgrade -f</code> com o seguinte arquivo YAML depois de ter liberado todas as coleções e parado o Milvus.</p></li>
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
<p>Não é recomendável alterar o armazenamento de mensagens. Se quiser fazer isso, interrompa todas as operações DDL e, em seguida, chame a API FlushAll para liberar todas as coleções e, finalmente, interrompa o Milvus no final, antes de alterar o armazenamento de mensagens.</p>
</div>
<h2 id="Configure-NATS-with-Helm" class="common-anchor-header">Configurar o NATS com o Helm<button data-href="#Configure-NATS-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>O NATS é um armazenamento de mensagens experimental alternativo ao RocksMQ. Para obter etapas detalhadas sobre como configurar o Milvus com o Helm, consulte <a href="/docs/pt/v2.4.x/configure-helm.md">Configurar o Milvus com Helm Charts</a>. Para obter detalhes sobre os itens de configuração relacionados ao RocksMQ, consulte <a href="/docs/pt/v2.4.x/configure_natsmq.md">Configurações relacionadas ao NATS</a>.</p>
<ul>
<li><p>Se você iniciar o Milvus com NATS e quiser alterar suas configurações, poderá executar <code translate="no">helm upgrade -f</code> com as configurações alteradas no seguinte arquivo YAML.</p></li>
<li><p>Se tiver instalado o Milvus standalone com um armazenamento de mensagens diferente do NATS e pretender alterá-lo para o NATS, execute <code translate="no">helm upgrade -f</code> com o seguinte ficheiro YAML depois de ter descarregado todas as colecções e parado o Milvus.</p></li>
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
<p><strong>Escolher entre RocksMQ e NATS?</strong></p>
<p>O RockMQ usa o CGO para interagir com o RocksDB e gerencia a memória por si só, enquanto o NATS puro do Go incorporado na instalação do Milvus delega seu gerenciamento de memória ao coletor de lixo (GC) do Go.</p>
<p>No cenário em que o pacote de dados é menor que 64 kb, o RocksDB tem um desempenho melhor em termos de uso de memória, uso de CPU e tempo de resposta. Por outro lado, se o pacote de dados for maior que 64 kb, o NATS se destaca em termos de tempo de resposta com memória suficiente e agendamento ideal do GC.</p>
<p>Atualmente, aconselha-se a utilização do NATS apenas para experiências.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">O que vem a seguir<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/pt/v2.4.x/deploy_s3.md">Configurar o armazenamento de objetos com o Docker Compose ou Helm</a></li>
<li><a href="/docs/pt/v2.4.x/deploy_etcd.md">Configurar o Meta Storage com o Docker Compose ou Helm</a></li>
</ul>
