---
id: connect_kafka_ssl.md
title: Подключение к Kafka с использованием SASL/SSL
related_key: 'kafka, sasl, tls'
summary: >-
  В данном руководстве перечислены несколько способов подключения Milvus к Kafka
  — от самого простого, без использования SASL/SSL, до полностью защищённого с
  использованием SASL/SSL.
---
<h1 id="Connecting-to-Kafka-with-SASLSSL" class="common-anchor-header">Подключение к Kafka с использованием SASL/SSL<button data-href="#Connecting-to-Kafka-with-SASLSSL" class="anchor-icon" translate="no">
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
    </button></h1><p>В данном руководстве перечислены несколько способов подключения Milvus к Kafka: от самого простого, без использования SASL/SSL, до полностью защищенного с использованием SASL/SSL.</p>
<h2 id="Connect-Milvus-to-Kafka-Without-SASLSSL" class="common-anchor-header">Подключение Milvus к Kafka без SASL/SSL<button data-href="#Connect-Milvus-to-Kafka-Without-SASLSSL" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы запустить Milvus и Kafka без SASL/SSL, необходимо отключить аутентификацию и шифрование как для Kafka, так и для Milvus. Используйте этот вариант только в доверенной среде.</p>
<h3 id="1-Start-a-Kafka-service-without-SASLSSL" class="common-anchor-header">1. Запуск службы Kafka без SASL/SSL<button data-href="#1-Start-a-Kafka-service-without-SASLSSL" class="anchor-icon" translate="no">
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
    </button></h3><p>Для запуска службы Kafka без SASL/SSL можно использовать следующий файл ` <code translate="no">docker-compose.yaml</code> `:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">version:</span> <span class="hljs-string">&#x27;3&#x27;</span>
<span class="hljs-attr">services:</span>
  <span class="hljs-attr">zookeeper:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">wurstmeister/zookeeper:latest</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">zookeeper</span>
    <span class="hljs-attr">ports:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">2181</span><span class="hljs-string">:2181</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">always</span>

  <span class="hljs-attr">kafka:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">wurstmeister/kafka:2.13-2.8.1</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">kafka</span>
    <span class="hljs-attr">ports:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">9092</span><span class="hljs-string">:9092</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">KAFKA_LISTENERS=PLAINTEXT://:9092</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">always</span>
<button class="copy-code-btn"></button></code></pre>
<p>Затем можно запустить службу Kafka с помощью следующей команды:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus-and-Connect-to-Kafka" class="common-anchor-header">2. Запуск Milvus и подключение к Kafka<button data-href="#2-Start-Milvus-and-Connect-to-Kafka" class="anchor-icon" translate="no">
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
    </button></h3><p>После запуска службы Kafka можно запустить Milvus и подключиться к ней. Используйте следующий файл ` <code translate="no">docker-compose.yaml</code> ` для запуска Milvus и подключения к Kafka без SASL/SSL:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">version:</span> <span class="hljs-string">&#x27;3.5&#x27;</span>

<span class="hljs-attr">services:</span>
  <span class="hljs-attr">etcd:</span>
    <span class="hljs-string">......</span>
    
  <span class="hljs-attr">minio:</span>
    <span class="hljs-string">......</span>
      
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
    <span class="hljs-string">......</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/user.yaml:/milvus/configs/user.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Создайте файл ` <code translate="no">user.yaml</code> ` в том же каталоге, что и файл ` <code translate="no">docker-compose.yaml</code> `, и задайте в нём следующие параметры. Milvus загружает файл ` <code translate="no">configs/user.yaml</code> ` после файла ` <code translate="no">configs/milvus.yaml</code>`, поэтому значения в файле ` <code translate="no">user.yaml</code> ` переопределяют значения по умолчанию:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">kafka</span>

<span class="hljs-attr">kafka:</span>
  <span class="hljs-attr">brokerList:</span> <span class="hljs-string">&quot;127.0.0.1:9092&quot;</span>
  <span class="hljs-attr">saslUsername:</span>
  <span class="hljs-attr">saslPassword:</span>
  <span class="hljs-attr">saslMechanisms:</span>
  <span class="hljs-attr">securityProtocol:</span>
  <span class="hljs-attr">readTimeout:</span> <span class="hljs-number">10</span> <span class="hljs-comment"># read message timeout in seconds</span>
  <span class="hljs-attr">ssl:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Whether to support kafka secure connection mode</span>
    <span class="hljs-attr">tlsCert:</span> 
    <span class="hljs-attr">tlsKey:</span>
    <span class="hljs-attr">tlsCACert:</span>
    <span class="hljs-attr">tlsKeyPassword:</span>
<button class="copy-code-btn"></button></code></pre>
<p>Затем вы можете запустить Milvus с помощью следующей команды:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-Milvus-to-Kafka-with-SASLPLAIN-Alone" class="common-anchor-header">Подключение Milvus к Kafka с использованием только SASL/PLAIN<button data-href="#Connect-Milvus-to-Kafka-with-SASLPLAIN-Alone" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы запустить Kafka с аутентификацией SASL/PLAIN, необходимо добавить файл <code translate="no">kafka_server_jaas.conf</code> с соответствующими настройками.</p>
<h3 id="1-Start-a-Kafka-service-with-SASLPLAIN" class="common-anchor-header">1. Запустите службу Kafka с использованием SASL/PLAIN<button data-href="#1-Start-a-Kafka-service-with-SASLPLAIN" class="anchor-icon" translate="no">
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
    </button></h3><p>Поместите следующие файлы: <code translate="no">docker-compose.yaml</code> и <code translate="no">kafka_server_jaas.conf</code> в один и тот же каталог.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">version:</span> <span class="hljs-string">&#x27;3&#x27;</span>
<span class="hljs-attr">services:</span>
  <span class="hljs-attr">zookeeper:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">confluentinc/cp-zookeeper:latest</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">zookeeper</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-attr">ZOOKEEPER_CLIENT_PORT:</span> <span class="hljs-number">2181</span>
      <span class="hljs-attr">ZOOKEEPER_TICK_TIME:</span> <span class="hljs-number">2000</span>
    <span class="hljs-attr">ports:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">2181</span><span class="hljs-string">:2181</span>

  <span class="hljs-attr">kafka:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">confluentinc/cp-kafka:latest</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">kafka</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">zookeeper</span>
    <span class="hljs-attr">ports:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">9092</span><span class="hljs-string">:9092</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">9093</span><span class="hljs-string">:9093</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-attr">KAFKA_BROKER_ID:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">KAFKA_ZOOKEEPER_CONNECT:</span> <span class="hljs-string">&#x27;zookeeper:2181&#x27;</span>
      <span class="hljs-attr">ZOOKEEPER_SASL_ENABLED:</span> <span class="hljs-string">&quot;false&quot;</span>
      <span class="hljs-attr">KAFKA_ADVERTISED_LISTENERS:</span> <span class="hljs-string">SASL_PLAINTEXT://localhost:9093</span>
      <span class="hljs-attr">KAFKA_LISTENER_SECURITY_PROTOCOL_MAP:</span> <span class="hljs-string">SASL_PLAINTEXT:SASL_PLAINTEXT</span>
      <span class="hljs-attr">KAFKA_SECURITY_INTER_BROKER_PROTOCOL:</span> <span class="hljs-string">SASL_PLAINTEXT</span>
      <span class="hljs-attr">KAFKA_SASL_MECHANISM_INTER_BROKER_PROTOCOL:</span> <span class="hljs-string">PLAIN</span>
      <span class="hljs-attr">KAFKA_SASL_ENABLED_MECHANISMS:</span> <span class="hljs-string">PLAIN</span>
      <span class="hljs-attr">KAFKA_CONFLUENT_TOPIC_REPLICATION_FACTOR:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">KAFKA_DEFAULT_REPLICATION_FACTOR:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">KAFKA_OPTS:</span> <span class="hljs-string">&quot;-Djava.security.auth.login.config=/etc/kafka/configs/kafka_server_jaas.conf&quot;</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/kafka_server_jaas.conf:/etc/kafka/configs/kafka_server_jaas.conf</span>
<button class="copy-code-btn"></button></code></pre>
<p>В файле <code translate="no">kafka_server_jaas.conf</code> задайте следующие параметры:</p>
<pre><code translate="no" class="language-conf">KafkaServer {
    org.apache.kafka.common.security.plain.PlainLoginModule required
    username=&quot;kafka&quot;
    password=&quot;pass123&quot;
    user_kafka=&quot;pass123&quot;;
};
</code></pre>
<p>Затем можно запустить службу Kafka с помощью следующей команды:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus-and-Connect-to-Kafka" class="common-anchor-header">2. Запуск Milvus и подключение к Kafka<button data-href="#2-Start-Milvus-and-Connect-to-Kafka" class="anchor-icon" translate="no">
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
    </button></h3><p>После запуска службы Kafka можно запустить Milvus и подключиться к ней. Используйте следующий файл <code translate="no">docker-compose.yaml</code> для запуска Milvus и подключения к Kafka с помощью SASL/PLAIN:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">version:</span> <span class="hljs-string">&#x27;3.5&#x27;</span>

<span class="hljs-attr">services:</span>
  <span class="hljs-attr">etcd:</span>
    <span class="hljs-string">......</span>
    
  <span class="hljs-attr">minio:</span>
    <span class="hljs-string">......</span>
      
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
    <span class="hljs-string">......</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/user.yaml:/milvus/configs/user.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Создайте файл ` <code translate="no">user.yaml</code> ` в том же каталоге, что и файл ` <code translate="no">docker-compose.yaml</code> `, и задайте в нём следующие параметры. Milvus загружает файл ` <code translate="no">configs/user.yaml</code> ` после файла ` <code translate="no">configs/milvus.yaml</code>`, поэтому значения в файле ` <code translate="no">user.yaml</code> ` переопределяют значения по умолчанию:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">kafka</span>

<span class="hljs-attr">kafka:</span>
  <span class="hljs-attr">brokerList:</span> <span class="hljs-string">&quot;127.0.0.1:9093&quot;</span>
  <span class="hljs-attr">saslUsername:</span> <span class="hljs-string">kafka</span>
  <span class="hljs-attr">saslPassword:</span> <span class="hljs-string">pass123</span>
  <span class="hljs-attr">saslMechanisms:</span> <span class="hljs-string">PLAIN</span>
  <span class="hljs-attr">securityProtocol:</span> <span class="hljs-string">SASL_PLAINTEXT</span>
  <span class="hljs-attr">readTimeout:</span> <span class="hljs-number">10</span> <span class="hljs-comment"># read message timeout in seconds</span>
  <span class="hljs-attr">ssl:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Whether to support kafka secure connection mode</span>
    <span class="hljs-attr">tlsCert:</span> <span class="hljs-comment"># path to client&#x27;s public key</span>
    <span class="hljs-attr">tlsKey:</span> <span class="hljs-comment"># path to client&#x27;s private key</span>
    <span class="hljs-attr">tlsCACert:</span> <span class="hljs-comment"># file or directory path to CA certificate</span>
    <span class="hljs-attr">tlsKeyPassword:</span> <span class="hljs-comment"># private key passphrase for use with private key, if any</span>
<button class="copy-code-btn"></button></code></pre>
<p>Затем вы можете запустить Milvus с помощью следующей команды:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-Milvus-to-Kafka-with-SSL-Alone" class="common-anchor-header">Подключение Milvus к Kafka только с помощью SSL<button data-href="#Connect-Milvus-to-Kafka-with-SSL-Alone" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы запустить Kafka с аутентификацией по SSL, необходимо получить файлы сертификатов или сгенерировать самоподписанные сертификаты. В этом примере мы используем самоподписанные сертификаты.</p>
<h3 id="1-Generate-Self-Signed-Certificates" class="common-anchor-header">1. Сгенерируйте самоподписанные сертификаты<button data-href="#1-Generate-Self-Signed-Certificates" class="anchor-icon" translate="no">
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
    </button></h3><p>Создайте папку с именем <code translate="no">my_secrets</code>, добавьте в неё скрипт bash с именем <code translate="no">gen-ssl-certs.sh</code> и вставьте в него следующее содержимое:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-meta">#!/bin/bash</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># This scripts generates:</span>
<span class="hljs-comment">#  - root CA certificate</span>
<span class="hljs-comment">#  - server certificate and keystore</span>
<span class="hljs-comment">#  - client keys</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># https://cwiki.apache.org/confluence/display/KAFKA/Deploying+SSL+for+Kafka</span>
<span class="hljs-comment">#</span>


<span class="hljs-keyword">if</span> [[ <span class="hljs-string">&quot;<span class="hljs-variable">$1</span>&quot;</span> == <span class="hljs-string">&quot;-k&quot;</span> ]]; <span class="hljs-keyword">then</span>
    USE_KEYTOOL=1
    <span class="hljs-built_in">shift</span>
<span class="hljs-keyword">else</span>
    USE_KEYTOOL=0
<span class="hljs-keyword">fi</span>

OP=<span class="hljs-string">&quot;<span class="hljs-variable">$1</span>&quot;</span>
CA_CERT=<span class="hljs-string">&quot;<span class="hljs-variable">$2</span>&quot;</span>
PFX=<span class="hljs-string">&quot;<span class="hljs-variable">$3</span>&quot;</span>
HOST=<span class="hljs-string">&quot;<span class="hljs-variable">$4</span>&quot;</span>

C=NN
ST=NN
L=NN
O=NN
OU=NN
CN=<span class="hljs-string">&quot;kafka-ssl&quot;</span>
 

<span class="hljs-comment"># Password</span>
PASS=<span class="hljs-string">&quot;abcdefgh&quot;</span>

<span class="hljs-comment"># Cert validity, in days</span>
VALIDITY=365

<span class="hljs-built_in">set</span> -e

<span class="hljs-built_in">export</span> LC_ALL=C

<span class="hljs-keyword">if</span> [[ <span class="hljs-variable">$OP</span> == <span class="hljs-string">&quot;ca&quot;</span> &amp;&amp; ! -z <span class="hljs-string">&quot;<span class="hljs-variable">$CA_CERT</span>&quot;</span> &amp;&amp; ! -z <span class="hljs-string">&quot;<span class="hljs-variable">$3</span>&quot;</span> ]]; <span class="hljs-keyword">then</span>
    CN=<span class="hljs-string">&quot;<span class="hljs-variable">$3</span>&quot;</span>
    openssl req -new -x509 -keyout <span class="hljs-variable">${CA_CERT}</span>.key -out <span class="hljs-variable">$CA_CERT</span> -days <span class="hljs-variable">$VALIDITY</span> -passin <span class="hljs-string">&quot;pass:<span class="hljs-variable">$PASS</span>&quot;</span> -passout <span class="hljs-string">&quot;pass:<span class="hljs-variable">$PASS</span>&quot;</span> &lt;&lt;<span class="hljs-string">EOF
${C}
${ST}
${L}
${O}
${OU}
${CN}
$USER@${CN}
.
.
EOF</span>



<span class="hljs-keyword">elif</span> [[ <span class="hljs-variable">$OP</span> == <span class="hljs-string">&quot;server&quot;</span> &amp;&amp; ! -z <span class="hljs-string">&quot;<span class="hljs-variable">$CA_CERT</span>&quot;</span> &amp;&amp; ! -z <span class="hljs-string">&quot;<span class="hljs-variable">$PFX</span>&quot;</span> &amp;&amp; ! -z <span class="hljs-string">&quot;<span class="hljs-variable">$CN</span>&quot;</span> ]]; <span class="hljs-keyword">then</span>

    <span class="hljs-comment">#Step 1</span>
    <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;############ Generating key&quot;</span>
    keytool -storepass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keypass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keystore <span class="hljs-variable">${PFX}</span>server.keystore.jks -<span class="hljs-built_in">alias</span> localhost -validity <span class="hljs-variable">$VALIDITY</span> -genkey -keyalg RSA &lt;&lt;<span class="hljs-string">EOF
$CN
$OU
$O
$L
$ST
$C
yes
yes
EOF</span>
        
    <span class="hljs-comment">#Step 2</span>
    <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;############ Adding CA&quot;</span>
    keytool -storepass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keypass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keystore <span class="hljs-variable">${PFX}</span>server.truststore.jks -<span class="hljs-built_in">alias</span> CARoot -import -file <span class="hljs-variable">$CA_CERT</span> &lt;&lt;<span class="hljs-string">EOF
yes
EOF</span>
    
    <span class="hljs-comment">#Step 3</span>
    <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;############ Export certificate&quot;</span>
    keytool -storepass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keypass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keystore <span class="hljs-variable">${PFX}</span>server.keystore.jks -<span class="hljs-built_in">alias</span> localhost -certreq -file <span class="hljs-variable">${PFX}</span>cert-file

    <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;############ Sign certificate&quot;</span>
    openssl x509 -req -CA <span class="hljs-variable">$CA_CERT</span> -CAkey <span class="hljs-variable">${CA_CERT}</span>.key -<span class="hljs-keyword">in</span> <span class="hljs-variable">${PFX}</span>cert-file -out <span class="hljs-variable">${PFX}</span>cert-signed -days <span class="hljs-variable">$VALIDITY</span> -CAcreateserial -passin <span class="hljs-string">&quot;pass:<span class="hljs-variable">$PASS</span>&quot;</span>
    
    
    <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;############ Import CA&quot;</span>
    keytool -storepass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keypass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keystore <span class="hljs-variable">${PFX}</span>server.keystore.jks -<span class="hljs-built_in">alias</span> CARoot -import -file <span class="hljs-variable">$CA_CERT</span> &lt;&lt;<span class="hljs-string">EOF
yes
EOF</span>
    
    <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;############ Import signed CA&quot;</span>
    keytool -storepass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keypass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keystore <span class="hljs-variable">${PFX}</span>server.keystore.jks -<span class="hljs-built_in">alias</span> localhost -import -file <span class="hljs-variable">${PFX}</span>cert-signed    

    
<span class="hljs-keyword">elif</span> [[ <span class="hljs-variable">$OP</span> == <span class="hljs-string">&quot;client&quot;</span> &amp;&amp; ! -z <span class="hljs-string">&quot;<span class="hljs-variable">$CA_CERT</span>&quot;</span> &amp;&amp; ! -z <span class="hljs-string">&quot;<span class="hljs-variable">$PFX</span>&quot;</span> &amp;&amp; ! -z <span class="hljs-string">&quot;<span class="hljs-variable">$CN</span>&quot;</span> ]]; <span class="hljs-keyword">then</span>

    <span class="hljs-keyword">if</span> [[ <span class="hljs-variable">$USE_KEYTOOL</span> == 1 ]]; <span class="hljs-keyword">then</span>
        <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;############ Creating client truststore&quot;</span>

        [[ -f <span class="hljs-variable">${PFX}</span>client.truststore.jks ]] || keytool -storepass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keypass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keystore <span class="hljs-variable">${PFX}</span>client.truststore.jks -<span class="hljs-built_in">alias</span> CARoot -import -file <span class="hljs-variable">$CA_CERT</span> &lt;&lt;<span class="hljs-string">EOF
yes
EOF</span>

        <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;############ Generating key&quot;</span>
        keytool -storepass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keypass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keystore <span class="hljs-variable">${PFX}</span>client.keystore.jks -<span class="hljs-built_in">alias</span> localhost -validity <span class="hljs-variable">$VALIDITY</span> -genkey -keyalg RSA &lt;&lt;<span class="hljs-string">EOF
$CN
$OU
$O
$L
$ST
$C
yes
yes
EOF</span>
        <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;########### Export certificate&quot;</span>
        keytool -storepass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keystore <span class="hljs-variable">${PFX}</span>client.keystore.jks -<span class="hljs-built_in">alias</span> localhost -certreq -file <span class="hljs-variable">${PFX}</span>cert-file

        <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;########### Sign certificate&quot;</span>
        openssl x509 -req -CA <span class="hljs-variable">${CA_CERT}</span> -CAkey <span class="hljs-variable">${CA_CERT}</span>.key -<span class="hljs-keyword">in</span> <span class="hljs-variable">${PFX}</span>cert-file -out <span class="hljs-variable">${PFX}</span>cert-signed -days <span class="hljs-variable">$VALIDITY</span> -CAcreateserial -passin pass:<span class="hljs-variable">$PASS</span>        

        <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;########### Import CA&quot;</span>
        keytool -storepass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keypass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keystore <span class="hljs-variable">${PFX}</span>client.keystore.jks -<span class="hljs-built_in">alias</span> CARoot -import -file <span class="hljs-variable">${CA_CERT}</span> &lt;&lt;<span class="hljs-string">EOF
yes
EOF</span>

        <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;########### Import signed CA&quot;</span>
        keytool -storepass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keypass <span class="hljs-string">&quot;<span class="hljs-variable">$PASS</span>&quot;</span> -keystore <span class="hljs-variable">${PFX}</span>client.keystore.jks -<span class="hljs-built_in">alias</span> localhost -import -file <span class="hljs-variable">${PFX}</span>cert-signed

    <span class="hljs-keyword">else</span>
        <span class="hljs-comment"># Standard OpenSSL keys</span>
        <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;############ Generating key&quot;</span>
        openssl genrsa -des3 -passout <span class="hljs-string">&quot;pass:<span class="hljs-variable">$PASS</span>&quot;</span> -out <span class="hljs-variable">${PFX}</span>client.key 2048 
        
        <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;############ Generating request&quot;</span>
        openssl req -passin <span class="hljs-string">&quot;pass:<span class="hljs-variable">$PASS</span>&quot;</span> -passout <span class="hljs-string">&quot;pass:<span class="hljs-variable">$PASS</span>&quot;</span> -key <span class="hljs-variable">${PFX}</span>client.key -new -out <span class="hljs-variable">${PFX}</span>client.req \
                &lt;&lt;<span class="hljs-string">EOF
$C
$ST
$L
$O
$OU
$CN
.
$PASS
.
EOF</span>

        <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;########### Signing key&quot;</span>
        openssl x509 -req -passin <span class="hljs-string">&quot;pass:<span class="hljs-variable">$PASS</span>&quot;</span> -<span class="hljs-keyword">in</span> <span class="hljs-variable">${PFX}</span>client.req -CA <span class="hljs-variable">$CA_CERT</span> -CAkey <span class="hljs-variable">${CA_CERT}</span>.key -CAcreateserial -out <span class="hljs-variable">${PFX}</span>client.pem -days <span class="hljs-variable">$VALIDITY</span>

    <span class="hljs-keyword">fi</span>

    
    

<span class="hljs-keyword">else</span>
    <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Usage: <span class="hljs-variable">$0</span> ca &lt;ca-cert-file&gt; &lt;CN&gt;&quot;</span>
    <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;       <span class="hljs-variable">$0</span> [-k] server|client &lt;ca-cert-file&gt; &lt;file_prefix&gt; &lt;hostname&gt;&quot;</span>
    <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;       -k = Use keytool/Java Keystore, else standard SSL keys&quot;</span>
    <span class="hljs-built_in">exit</span> 1
<span class="hljs-keyword">fi</span>
<button class="copy-code-btn"></button></code></pre>
<p>В приведенном выше скрипте используется пароль по умолчанию <code translate="no">abcdefgh</code>. Чтобы изменить пароль, создайте текстовый файл с именем <code translate="no">cert_creds</code> и введите пароль в первую строку.</p>
<p>Затем выполните следующую команду для генерации сертификатов:</p>
<ul>
<li><p>Генерация сертификата центра сертификации (CA):</p>
<p>Ниже предполагается, что файл сертификата ЦС называется <code translate="no">ca-cert</code>, а имя хоста брокера — <code translate="no">kafka-ssl</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">./gen-ssl-certs.sh ca ca-cert kafka-ssl</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Генерация сертификата сервера и хранилища ключей:</p>
<p>Ниже приведены инструкции, исходя из того, что файл сертификата центра сертификации (CA) имеет имя <code translate="no">ca-cert</code>, префикс для всех выходных файлов — <code translate="no">kafka_</code>, а имя хоста брокера — <code translate="no">kafka-ssl</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">./gen-ssl-certs.sh -k server ca-cert kafka_ kafka-ssl</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Генерация ключей клиента:</p>
<p>Ниже приведены инструкции, исходя из того, что файл сертификата центра сертификации (CA) имеет имя <code translate="no">ca-cert</code>, префикс для всех выходных файлов — <code translate="no">kafka_</code>, а имя клиента — <code translate="no">kafka-client</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">./gen-ssl-certs.sh client ca-cert kafka_ kafka-client</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>После генерации всех необходимых сертификатов в папке <code translate="no">my_secrets</code> появятся следующие файлы:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">ls</span> -l my_secrets</span>
total 12
-rw-rw-r-- 1 1.4K Feb 26 11:53 ca-cert
-rw------- 1 1.9K Feb 26 11:53 ca-cert.key
-rw-rw-r-- 1   41 Feb 26 11:54 ca-cert.srl
-rw-rw-r-- 1    9 Feb 26 12:08 cert_creds
-rwxrwxr-x 1 3.9K Feb 26 17:26 gen-ssl-certs.sh
-rw-rw-r-- 1 1.4K Feb 26 11:54 kafka_cert-file
-rw-rw-r-- 1 1.4K Feb 26 11:54 kafka_cert-signed
-rw------- 1 1.8K Feb 26 11:54 kafka_client.key
-rw-rw-r-- 1 1.2K Feb 26 11:54 kafka_client.pem
-rw-rw-r-- 1 1013 Feb 26 11:54 kafka_client.req
-rw-rw-r-- 1 5.6K Feb 26 11:54 kafka_server.keystore.jks
-rw-rw-r-- 1 1.4K Feb 26 11:54 kafka_server.truststore.jks
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-a-Kafka-service-with-SSL" class="common-anchor-header">2. Запуск службы Kafka с поддержкой SSL<button data-href="#2-Start-a-Kafka-service-with-SSL" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте следующий файл <code translate="no">docker-compose.yaml</code> для запуска службы Kafka с SSL:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">version:</span> <span class="hljs-string">&#x27;3&#x27;</span>
<span class="hljs-attr">services:</span>
  <span class="hljs-attr">zookeeper:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">confluentinc/cp-zookeeper:latest</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">zookeeper</span>
    <span class="hljs-attr">hostname:</span> <span class="hljs-string">zookeeper</span>
    <span class="hljs-attr">ports:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">2181</span><span class="hljs-string">:2181</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-attr">ZOOKEEPER_SERVER_ID:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">ZOOKEEPER_CLIENT_PORT:</span> <span class="hljs-number">2181</span>

  <span class="hljs-attr">kafka-ssl:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">confluentinc/cp-kafka:latest</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">kafka-ssl</span>
    <span class="hljs-attr">hostname:</span> <span class="hljs-string">kafka-ssl</span>
    <span class="hljs-attr">ports:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">9093</span><span class="hljs-string">:9093</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">zookeeper</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-attr">KAFKA_BROKER_ID:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">KAFKA_ZOOKEEPER_CONNECT:</span> <span class="hljs-string">&#x27;zookeeper:2181&#x27;</span>
      <span class="hljs-attr">ZOOKEEPER_SASL_ENABLED:</span> <span class="hljs-string">&quot;false&quot;</span>
      <span class="hljs-attr">KAFKA_ADVERTISED_LISTENERS:</span> <span class="hljs-string">SSL://kafka-ssl:9093</span>
      <span class="hljs-attr">KAFKA_SSL_KEYSTORE_FILENAME:</span> <span class="hljs-string">kafka_server.keystore.jks</span>
      <span class="hljs-attr">KAFKA_SSL_KEYSTORE_CREDENTIALS:</span> <span class="hljs-string">cert_creds</span>
      <span class="hljs-attr">KAFKA_SSL_KEY_CREDENTIALS:</span> <span class="hljs-string">cert_creds</span>
      <span class="hljs-attr">KAFKA_SSL_TRUSTSTORE_FILENAME:</span> <span class="hljs-string">kafka_server.truststore.jks</span>
      <span class="hljs-attr">KAFKA_SSL_TRUSTSTORE_CREDENTIALS:</span> <span class="hljs-string">cert_creds</span>
      <span class="hljs-attr">KAFKA_SSL_CLIENT_AUTH:</span> <span class="hljs-string">&#x27;required&#x27;</span>
      <span class="hljs-attr">KAFKA_SECURITY_PROTOCOL:</span> <span class="hljs-string">SSL</span>
      <span class="hljs-attr">KAFKA_SECURITY_INTER_BROKER_PROTOCOL:</span> <span class="hljs-string">SSL</span>
      <span class="hljs-attr">KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR:</span> <span class="hljs-number">1</span>

    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/my_secrets:/etc/kafka/secrets</span>
<button class="copy-code-btn"></button></code></pre>
<p>Затем запустите службу Kafka с помощью следующей команды:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Start-Milvus-and-Connect-to-Kafka-with-SSL" class="common-anchor-header">3. Запустите Milvus и подключитесь к Kafka с использованием SSL<button data-href="#3-Start-Milvus-and-Connect-to-Kafka-with-SSL" class="anchor-icon" translate="no">
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
    </button></h3><p>После запуска службы Kafka можно запустить Milvus и подключиться к ней. Используйте следующий файл ` <code translate="no">docker-compose.yaml</code> ` для запуска Milvus и подключения к Kafka с использованием SSL:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">version:</span> <span class="hljs-string">&#x27;3.5&#x27;</span>

<span class="hljs-attr">services:</span>
  <span class="hljs-attr">etcd:</span>
    <span class="hljs-string">......</span>
    
  <span class="hljs-attr">minio:</span>
    <span class="hljs-string">......</span>
      
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
    <span class="hljs-string">......</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/user.yaml:/milvus/configs/user.yaml</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/my_secrets:/milvus/secrets</span>
<button class="copy-code-btn"></button></code></pre>
<p>Создайте файл ` <code translate="no">user.yaml</code> ` в том же каталоге, что и файл ` <code translate="no">docker-compose.yaml</code> `, и задайте в нём следующие параметры. Milvus загружает файл ` <code translate="no">configs/user.yaml</code> ` после файла ` <code translate="no">configs/milvus.yaml</code>`, поэтому значения в файле ` <code translate="no">user.yaml</code> ` переопределяют значения по умолчанию:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">kafka</span>

<span class="hljs-attr">kafka:</span>
  <span class="hljs-attr">brokerList:</span> <span class="hljs-string">&quot;127.0.0.1:9093&quot;</span>
  <span class="hljs-attr">saslUsername:</span> 
  <span class="hljs-attr">saslPassword:</span> 
  <span class="hljs-attr">saslMechanisms:</span> 
  <span class="hljs-attr">securityProtocol:</span> <span class="hljs-string">SSL</span>
  <span class="hljs-attr">readTimeout:</span> <span class="hljs-number">10</span> <span class="hljs-comment"># read message timeout in seconds</span>
  <span class="hljs-attr">ssl:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Whether to support kafka secure connection mode</span>
    <span class="hljs-attr">tlsCert:</span> <span class="hljs-string">/milvus/secrets/kafka_client.pem</span> <span class="hljs-comment"># path to client&#x27;s public key</span>
    <span class="hljs-attr">tlsKey:</span> <span class="hljs-string">/milvus/secrets/kafka_client.key</span> <span class="hljs-comment"># path to client&#x27;s private key</span>
    <span class="hljs-attr">tlsCACert:</span> <span class="hljs-string">/milvus/secrets/ca-cert</span> <span class="hljs-comment"># file or directory path to CA certificate</span>
    <span class="hljs-attr">tlsKeyPassword:</span> <span class="hljs-string">abcdefgh</span> <span class="hljs-comment"># private key passphrase for use with private key, if any</span>
<button class="copy-code-btn"></button></code></pre>
<p>Затем запустите Milvus с помощью следующей команды:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-Milvus-to-Kafka-with-SASLPLAIN-and-SSL" class="common-anchor-header">Подключение Milvus к Kafka с использованием SASL/PLAIN и SSL<button data-href="#Connect-Milvus-to-Kafka-with-SASLPLAIN-and-SSL" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы подключить Milvus к Kafka с использованием SASL/PLAIN и SSL, необходимо повторить шаги, описанные в разделах <a href="#Connect-Milvus-to-Kafka-with-SASLPLAIN-Alone">«Подключение Milvus к Kafka только с использованием SASL/PLAIN</a> » и <a href="#Connect-Milvus-to-Kafka-with-SSL-Alone">«Подключение Milvus к Kafka только с использованием SSL</a>».</p>
<h3 id="1-Start-a-Kafka-service-with-SASLPLAIN-and-SSL" class="common-anchor-header">1. Запустите службу Kafka с использованием SASL/PLAIN и SSL<button data-href="#1-Start-a-Kafka-service-with-SASLPLAIN-and-SSL" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте файл <code translate="no">kafka_server_jaas.conf</code>, упомянутый в разделе <a href="#Connect-Milvus-to-Kafka-with-SASLPLAIN-Alone">«Подключение Milvus к Kafka только с использованием SASL/PLAIN»</a>, и папку <code translate="no">my_secrets</code>, сгенерированную в разделе <a href="#Connect-Milvus-to-Kafka-with-SSL-Alone">«Подключение Milvus к Kafka только с использованием SSL»</a>, чтобы запустить службу Kafka с использованием SASL/PLAIN и SSL.</p>
<p>Для запуска службы Kafka с использованием SASL/PLAIN и SSL можно использовать следующий файл <code translate="no">docker-compose.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">version:</span> <span class="hljs-string">&#x27;3&#x27;</span>
<span class="hljs-attr">services:</span>
  <span class="hljs-attr">zookeeper:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">confluentinc/cp-zookeeper:latest</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">zookeeper</span>
    <span class="hljs-attr">hostname:</span> <span class="hljs-string">zookeeper</span>
    <span class="hljs-attr">ports:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">2181</span><span class="hljs-string">:2181</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-attr">ZOOKEEPER_SERVER_ID:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">ZOOKEEPER_CLIENT_PORT:</span> <span class="hljs-number">2181</span>
      <span class="hljs-attr">ZOOKEEPER_TICK_TIME:</span> <span class="hljs-number">2000</span>


  <span class="hljs-attr">kafka-ssl:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">confluentinc/cp-kafka:latest</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">kafka-ssl</span>
    <span class="hljs-attr">hostname:</span> <span class="hljs-string">kafka-ssl</span>
    <span class="hljs-attr">ports:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">9093</span><span class="hljs-string">:9093</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">zookeeper</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-attr">KAFKA_BROKER_ID:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">KAFKA_ZOOKEEPER_CONNECT:</span> <span class="hljs-string">&#x27;zookeeper:2181&#x27;</span>
      <span class="hljs-attr">ZOOKEEPER_SASL_ENABLED:</span> <span class="hljs-string">&quot;false&quot;</span>
      <span class="hljs-attr">KAFKA_ADVERTISED_LISTENERS:</span> <span class="hljs-string">SASL_SSL://kafka-ssl:9093</span>
      <span class="hljs-attr">KAFKA_SSL_KEYSTORE_FILENAME:</span> <span class="hljs-string">kafka_server.keystore.jks</span>
      <span class="hljs-attr">KAFKA_SSL_KEYSTORE_CREDENTIALS:</span> <span class="hljs-string">cert_creds</span>
      <span class="hljs-attr">KAFKA_SSL_KEY_CREDENTIALS:</span> <span class="hljs-string">cert_creds</span>
      <span class="hljs-attr">KAFKA_SSL_TRUSTSTORE_FILENAME:</span> <span class="hljs-string">kafka_server.truststore.jks</span>
      <span class="hljs-attr">KAFKA_SSL_TRUSTSTORE_CREDENTIALS:</span> <span class="hljs-string">cert_creds</span>
      <span class="hljs-attr">KAFKA_SSL_CLIENT_AUTH:</span> <span class="hljs-string">&#x27;required&#x27;</span>
      <span class="hljs-attr">KAFKA_SECURITY_PROTOCOL:</span> <span class="hljs-string">SASL_SSL</span>
      <span class="hljs-attr">KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR:</span> <span class="hljs-number">1</span>

      <span class="hljs-attr">KAFKA_LISTENER_SECURITY_PROTOCOL_MAP:</span> <span class="hljs-string">SASL_SSL:SASL_SSL</span>
      <span class="hljs-attr">KAFKA_SECURITY_INTER_BROKER_PROTOCOL:</span> <span class="hljs-string">SASL_SSL</span>
      <span class="hljs-attr">KAFKA_SASL_MECHANISM_INTER_BROKER_PROTOCOL:</span> <span class="hljs-string">PLAIN</span>
      <span class="hljs-attr">KAFKA_SASL_ENABLED_MECHANISMS:</span> <span class="hljs-string">PLAIN</span>
      <span class="hljs-attr">KAFKA_CONFLUENT_TOPIC_REPLICATION_FACTOR:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">KAFKA_DEFAULT_REPLICATION_FACTOR:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">KAFKA_OPTS:</span> <span class="hljs-string">&quot;-Djava.security.auth.login.config=/etc/kafka/configs/kafka_server_jaas.conf&quot;</span>

    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/my_secrets:/etc/kafka/secrets</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/kafka_server_jaas.conf:/etc/kafka/configs/kafka_server_jaas.conf</span>
<button class="copy-code-btn"></button></code></pre>
<p>Затем запустите службу Kafka с помощью следующей команды:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus-and-Connect-to-Kafka-with-SASLPLAIN-and-SSL" class="common-anchor-header">2. Запустите Milvus и подключитесь к Kafka с использованием SASL/PLAIN и SSL<button data-href="#2-Start-Milvus-and-Connect-to-Kafka-with-SASLPLAIN-and-SSL" class="anchor-icon" translate="no">
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
    </button></h3><p>После запуска службы Kafka можно запустить Milvus и подключиться к ней. Используйте следующий файл ` <code translate="no">docker-compose.yaml</code> ` для запуска Milvus и подключения к Kafka с использованием SASL/PLAIN и SSL:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">version:</span> <span class="hljs-string">&#x27;3.5&#x27;</span>

<span class="hljs-attr">services:</span>
  <span class="hljs-attr">etcd:</span>
    <span class="hljs-string">......</span>
    
  <span class="hljs-attr">minio:</span>
    <span class="hljs-string">......</span>
    
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
    <span class="hljs-string">......</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/user.yaml:/milvus/configs/user.yaml</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/my_secrets:/milvus/secrets</span>
<button class="copy-code-btn"></button></code></pre>
<p>Создайте файл ` <code translate="no">user.yaml</code> ` в том же каталоге, что и файл ` <code translate="no">docker-compose.yaml</code> `, и задайте в нём следующие параметры. Milvus загружает файл ` <code translate="no">configs/user.yaml</code> ` после файла ` <code translate="no">configs/milvus.yaml</code>`, поэтому значения в файле ` <code translate="no">user.yaml</code> ` переопределяют значения по умолчанию:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">kafka</span>

<span class="hljs-attr">kafka:</span>
  <span class="hljs-attr">brokerList:</span> <span class="hljs-string">&quot;127.0.0.1:9093&quot;</span>
  <span class="hljs-attr">saslUsername:</span> <span class="hljs-string">kafka</span>
  <span class="hljs-attr">saslPassword:</span> <span class="hljs-string">pass123</span>
  <span class="hljs-attr">saslMechanisms:</span> <span class="hljs-string">PLAIN</span>
  <span class="hljs-attr">securityProtocol:</span> <span class="hljs-string">SASL_SSL</span>
  <span class="hljs-attr">readTimeout:</span> <span class="hljs-number">10</span> <span class="hljs-comment"># read message timeout in seconds</span>
  <span class="hljs-attr">ssl:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Whether to support kafka secure connection mode</span>
    <span class="hljs-attr">tlsCert:</span> <span class="hljs-string">/milvus/secrets/kafka_client.pem</span> <span class="hljs-comment"># path to client&#x27;s public key</span>
    <span class="hljs-attr">tlsKey:</span> <span class="hljs-string">/milvus/secrets/kafka_client.key</span> <span class="hljs-comment"># path to client&#x27;s private key</span>
    <span class="hljs-attr">tlsCACert:</span> <span class="hljs-string">/milvus/secrets/ca-cert</span> <span class="hljs-comment"># file or directory path to CA certificate</span>
    <span class="hljs-attr">tlsKeyPassword:</span> <span class="hljs-string">abcdefgh</span> <span class="hljs-comment"># private key passphrase for use with private key, if any</span>
<button class="copy-code-btn"></button></code></pre>
