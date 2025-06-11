---
id: deploy_pulsar.md
title: Настройте хранилище сообщений с помощью Docker Compose или Helm
related_key: "Pulsar, storage"
summary: "Узнайте, как настроить хранение сообщений с помощью Docker Compose или Helm."
---

<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Настройте хранилище сообщений с помощью Docker Compose или Helm<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus использует Pulsar или Kafka для управления журналами последних изменений, вывода потоковых журналов и обеспечения подписки на журналы. Pulsar является системой хранения сообщений по умолчанию. В этой теме рассказывается о том, как настроить хранилище сообщений с помощью Docker Compose или Helm.</p>
<p>Вы можете настроить Pulsar с помощью <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> или на K8s и сконфигурировать Kafka на K8s.</p>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">Настройка Pulsar с помощью Docker Compose<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1. Настройка Pulsar</h3><p>Чтобы настроить Pulsar с помощью Docker Compose, укажите значения для секции <code translate="no">pulsar</code> в файле <code translate="no">milvus.yaml</code> по пути milvus/configs.</p>
<pre><code translate="no">pulsar:
  address: localhost <span class="hljs-comment"># Address of pulsar</span>
  port: <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  maxMessageSize: <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Дополнительные сведения см. в разделе <a href="/docs/ru/v2.5.x/configure_pulsar.md">Конфигурации, связанные с Pulsar</a>.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Запустите Milvus</h3><p>Выполните следующую команду, чтобы запустить Milvus, использующий конфигурации Pulsar.</p>
<pre><code translate="no">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Конфигурации вступают в силу только после запуска Milvus. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Запуск Milvus</a>.</div>
<h2 id="Configure-Pulsar-with-Helm" class="common-anchor-header">Настройка Pulsar с помощью Helm<button data-href="#Configure-Pulsar-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Для кластеров Milvus на K8s можно настроить Pulsar в той же команде, которая запускает Milvus. В качестве альтернативы можно настроить Pulsar с помощью файла <code translate="no">values.yml</code> по пути /charts/milvus в репозитории <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> перед запуском Milvus.</p>
<p>Подробнее о том, как настроить Milvus с помощью Helm, см. в разделе <a href="/docs/ru/v2.5.x/configure-helm.md">Настройка Milvus с помощью Helm Charts</a>. Подробные сведения об элементах конфигурации, связанных с Pulsar, см. в разделе <a href="/docs/ru/v2.5.x/configure_pulsar.md">Конфигурации, связанные с Pulsar</a>.|</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Использование файла YAML</h3><ol>
<li>Настройте секцию <code translate="no">externalConfigFiles</code> в файле <code translate="no">values.yaml</code>.</li>
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
<li>После настройки предыдущих разделов и сохранения файла <code translate="no">values.yaml</code> выполните следующую команду для установки Milvus, который использует конфигурации Pulsar.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka-with-Helm" class="common-anchor-header">Настройка Kafka с помощью Helm<button data-href="#Configure-Kafka-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Для кластеров Milvus на K8s вы можете настроить Kafka в той же команде, которая запускает Milvus. В качестве альтернативы можно настроить Kafka с помощью файла <code translate="no">values.yml</code> по пути /charts/milvus в репозитории <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> перед запуском Milvus.</p>
<p>Подробнее о том, как настроить Milvus с помощью Helm, см. в разделе <a href="/docs/ru/v2.5.x/configure-helm.md">Настройка Milvus с помощью диаграмм Helm</a>. Подробные сведения об элементах конфигурации, связанных с Pulsar, см. в разделе <a href="/docs/ru/v2.5.x/configure_pulsar.md">Конфигурации, связанные с Pulsar</a>.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Использование файла YAML</h3><ol>
<li>Настройте раздел <code translate="no">externalConfigFiles</code> в файле <code translate="no">values.yaml</code>, если вы хотите использовать Kafka в качестве системы хранения сообщений.</li>
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
<li>После настройки предыдущих разделов и сохранения файла <code translate="no">values.yaml</code> выполните следующую команду, чтобы установить Milvus, использующий конфигурации Kafka.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-RocksMQ-with-Helm" class="common-anchor-header">Настройка RocksMQ с помощью Helm<button data-href="#Configure-RocksMQ-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Автономный Milvus использует RocksMQ в качестве хранилища сообщений по умолчанию. Подробные шаги по настройке Milvus с помощью Helm см. в разделе <a href="/docs/ru/v2.5.x/configure-helm.md">Настройка Milvus с помощью диаграмм Helm</a>. Подробные сведения об элементах конфигурации, связанных с RocksMQ, см. в разделе <a href="/docs/ru/v2.5.x/configure_rocksmq.md">Конфигурации, связанные с RocksMQ</a>.</p>
<ul>
<li><p>Если вы запустили Milvus с RocksMQ и хотите изменить его настройки, вы можете запустить <code translate="no">helm upgrade -f</code> с измененными настройками в следующем YAML-файле.</p></li>
<li><p>Если вы установили автономный Milvus с помощью Helm с хранилищем сообщений, отличным от RocksMQ, и хотите изменить его обратно на RocksMQ, запустите <code translate="no">helm upgrade -f</code> со следующим YAML-файлом после того, как вы промоете все коллекции и остановите Milvus.</p></li>
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
<p>Менять хранилище сообщений не рекомендуется. Если вы хотите это сделать, остановите все операции DDL, затем вызовите API FlushAll для промывки всех коллекций и, наконец, остановите Milvus до того, как вы действительно измените хранилище сообщений.</p>
</div>
<h2 id="Configure-NATS-with-Helm" class="common-anchor-header">Настройка NATS с помощью Helm<button data-href="#Configure-NATS-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS - это экспериментальное хранилище сообщений, альтернативное RocksMQ. Подробные шаги по настройке Milvus с помощью Helm см. в разделе <a href="/docs/ru/v2.5.x/configure-helm.md">Настройка Milvus с помощью диаграмм Helm</a>. Подробные сведения о конфигурационных элементах, связанных с RocksMQ, см. в разделе <a href="/docs/ru/v2.5.x/configure_natsmq.md">Конфигурации, связанные с NATS</a>.</p>
<ul>
<li><p>Если вы запустили Milvus с NATS и хотите изменить его настройки, вы можете запустить <code translate="no">helm upgrade -f</code> с измененными настройками в следующем YAML-файле.</p></li>
<li><p>Если вы установили Milvus standalone с хранилищем сообщений, отличным от NATS, и хотите изменить его на NATS, запустите <code translate="no">helm upgrade -f</code> со следующим YAML-файлом после того, как вы промыли все коллекции и остановили Milvus.</p></li>
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
<p><strong>Выбор между RocksMQ и NATS?</strong></p>
<p>RockMQ использует CGO для взаимодействия с RocksDB и самостоятельно управляет памятью, в то время как NATS, встроенный в Milvus, делегирует управление памятью сборщику мусора (GC) Go.</p>
<p>В сценарии, когда пакет данных меньше 64 кб, RocksDB превосходит по использованию памяти, загрузке процессора и времени отклика. С другой стороны, если пакет данных больше 64 кб, NATS превосходит по времени отклика при достаточном объеме памяти и идеальном планировании GC.</p>
<p>В настоящее время рекомендуется использовать NATS только для экспериментов.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Узнайте, как настроить другие зависимости Milvus с помощью Docker Compose или Helm:</p>
<ul>
<li><a href="/docs/ru/v2.5.x/deploy_s3.md">Настройка объектного хранилища с помощью Docker Compose или Helm</a></li>
<li><a href="/docs/ru/v2.5.x/deploy_etcd.md">Настройка метахранилища с помощью Docker Compose или Helm</a></li>
</ul>
