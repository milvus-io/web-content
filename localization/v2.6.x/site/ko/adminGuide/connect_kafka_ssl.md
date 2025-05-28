---
id: connect_kafka_ssl.md
title: SASL/SSL로 Kafka에 연결하기
related_key: 'kafka, sasl, tls'
summary: >-
  이 가이드에서는 SASL/SSL을 사용하지 않는 가장 간단한 방법부터 SASL/SSL을 사용하여 완전히 보안된 방법까지 Milvus를
  Kafka에 연결하는 여러 가지 방법을 소개합니다.
---
<h1 id="Connecting-to-Kafka-with-SASLSSL" class="common-anchor-header">SASL/SSL로 Kafka에 연결하기<button data-href="#Connecting-to-Kafka-with-SASLSSL" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드에서는 SASL/SSL을 사용하지 않는 가장 간단한 방법부터 SASL/SSL을 사용하여 완전히 보안된 방법까지 Milvus를 Kafka에 연결하는 여러 가지 방법을 나열합니다.</p>
<h2 id="Connect-Milvus-to-Kafka-Without-SASLSSL" class="common-anchor-header">SASL/SSL 없이 Milvus와 Kafka 연결하기<button data-href="#Connect-Milvus-to-Kafka-Without-SASLSSL" class="anchor-icon" translate="no">
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
    </button></h2><p>SASL/SSL 없이 Milvus와 Kafka를 시작하려면 Kafka와 Milvus 모두에 대한 인증 및 암호화를 비활성화하면 됩니다. 신뢰할 수 있는 환경에서만 사용하세요.</p>
<h3 id="1-Start-a-Kafka-service-without-SASLSSL" class="common-anchor-header">1. SASL/SSL 없이 Kafka 서비스 시작하기</h3><p>다음 <code translate="no">docker-compose.yaml</code> 파일을 사용하여 SASL/SSL 없이 Kafka 서비스를 시작할 수 있습니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">version:</span> <span class="hljs-string">&#x27;3&#x27;</span>
<span class="hljs-attr">services:</span>
  <span class="hljs-attr">zookeeper:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">wurstmeister/zookeeper:latest</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">zookeeper</span>
    <span class="hljs-attr">ports:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">2181</span><span class="hljs-string">:2181</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">always</span>

  <span class="hljs-attr">kafka:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">wurstmeister/kafka:latest</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">kafka</span>
    <span class="hljs-attr">ports:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">9092</span><span class="hljs-string">:9092</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">KAFKA_LISTENERS=PLAINTEXT://:9092</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/var/run/docker.sock:/var/run/docker.sock</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">always</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 다음 명령으로 Kafka 서비스를 시작할 수 있습니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus-and-Connect-to-Kafka" class="common-anchor-header">2. Milvus 시작 및 Kafka에 연결하기</h3><p>Kafka 서비스가 시작되면 Milvus를 시작하고 연결할 수 있습니다. 다음 <code translate="no">docker-compose.yaml</code> 파일을 사용하여 Milvus를 시작하고 SASL/SSL 없이 Kafka에 연결할 수 있습니다:</p>
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
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/milvus.yaml:/milvus/configs/milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>다음 명령을 사용하여 Milvus 구성 파일 템플릿을 다운로드합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>그리고 다음 파라미터를 설정합니다:</p>
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
<p>그런 다음 다음 명령으로 Milvus를 시작할 수 있습니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-Milus-to-Kafka-with-SASLPLAIN-Alone" class="common-anchor-header">SASL/PLAIN 단독으로 Milus를 Kafka에 연결하기<button data-href="#Connect-Milus-to-Kafka-with-SASLPLAIN-Alone" class="anchor-icon" translate="no">
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
    </button></h2><p>SASL/PLAIN 인증으로 Kafka를 시작하려면 <code translate="no">kafka_server_jass.conf</code> 파일을 적절한 설정으로 추가해야 합니다.</p>
<h3 id="1-Start-a-Kafka-service-with-SASLPLAIN" class="common-anchor-header">1. SASL/PLAIN으로 Kafka 서비스 시작하기</h3><p>다음 <code translate="no">docker-compose.yaml</code> 파일과 <code translate="no">kafka_server_jaas.conf</code> 파일을 같은 디렉터리에 넣습니다.</p>
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
      <span class="hljs-attr">KAFKA_OPTS:</span> <span class="hljs-string">&quot;-Djava.security.auth.login.config=/etc/kafka/configs/kafka_server_jass.conf&quot;</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/kafka_server_jass.conf:/etc/kafka/configs/kafka_server_jass.conf</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">kafka_server_jass.conf</code> 파일에서 다음 파라미터를 설정합니다:</p>
<pre><code translate="no" class="language-conf">KafkaServer {
    org.apache.kafka.common.security.plain.PlainLoginModule required
    username=&quot;kafka&quot;
    password=&quot;pass123&quot;
    user_kafka=&quot;pass123&quot;;
};
</code></pre>
<p>그런 다음 다음 명령어로 Kafka 서비스를 시작할 수 있습니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus-and-Connect-to-Kafka" class="common-anchor-header">2. Milvus 시작 및 Kafka에 연결하기</h3><p>Kafka 서비스가 시작되면 Milvus를 시작하고 연결할 수 있습니다. 다음 <code translate="no">docker-compose.yaml</code> 파일을 사용하여 Milvus를 시작하고 SASL/PLAIN으로 Kafka에 연결합니다:</p>
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
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/milvus.yaml:/milvus/configs/milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>다음 명령을 사용하여 Milvus 구성 파일 템플릿을 다운로드합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>그리고 다음 매개변수를 설정합니다:</p>
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
<p>그런 다음 다음 명령으로 Milvus를 시작할 수 있습니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-Milvus-to-Kafka-with-SSL-Alone" class="common-anchor-header">SSL 단독으로 Milvus를 Kafka에 연결하기<button data-href="#Connect-Milvus-to-Kafka-with-SSL-Alone" class="anchor-icon" translate="no">
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
    </button></h2><p>SSL 인증으로 Kafka를 시작하려면 일부 인증서 파일을 가져오거나 자체 서명된 인증서를 생성해야 합니다. 이 예에서는 자체 서명된 인증서를 사용합니다.</p>
<h3 id="1-Generate-Self-Signed-Certificates" class="common-anchor-header">1. 자체 서명 인증서 생성하기</h3><p><code translate="no">my_secrets</code> 라는 폴더를 만들고 <code translate="no">gen-ssl-certs.sh</code> 이라는 이름의 bash 스크립트를 추가한 다음 다음 내용을 붙여넣습니다:</p>
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
<p>위 스크립트에서는 기본 비밀번호 <code translate="no">abcdefgh</code> 가 적용됩니다. 비밀번호를 변경하려면 <code translate="no">cert_creds</code> 이라는 이름의 텍스트 파일을 만들고 첫 줄에 비밀번호를 입력합니다.</p>
<p>그런 다음 다음 명령을 실행하여 인증서를 생성합니다:</p>
<ul>
<li><p>CA 인증서 생성:</p>
<p>다음은 CA 인증서 파일의 이름이 <code translate="no">ca-cert</code> 이고 브로커의 호스트 이름이 <code translate="no">kafka-ssl</code> 이라고 가정합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">./gen-ssl-certs.sh ca ca-cert kafka-ssl</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>서버 인증서 및 키 저장소 생성:</p>
<p>다음은 CA 인증서 파일의 이름이 <code translate="no">ca-cert</code> 이고 모든 출력 파일의 접두사는 <code translate="no">kafka_</code> 이며 브로커의 호스트 이름은 <code translate="no">kafka-ssl</code> 이라고 가정합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">./gen-ssl-certs.sh -k server ca-cert kafka_ kafka-ssl</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>클라이언트 키를 생성합니다:</p>
<p>다음은 CA 인증서 파일의 이름은 <code translate="no">ca-cert</code>, 모든 출력 파일의 접두사는 <code translate="no">kafka_</code>, 클라이언트 이름은 <code translate="no">kafka-client</code> 이라고 가정합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">./gen-ssl-certs.sh client ca-cert kafka_ kafka-client</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>필요한 모든 인증서가 생성되면 <code translate="no">my_secrets</code> 폴더에서 다음 파일을 볼 수 있습니다:</p>
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
<h3 id="2-Start-a-Kafka-service-with-SSL" class="common-anchor-header">2. SSL로 Kafka 서비스 시작하기</h3><p>다음 <code translate="no">docker-compose.yaml</code> 파일을 사용하여 SSL로 Kafka 서비스를 시작합니다:</p>
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
<p>그런 다음 다음 명령어로 Kafka 서비스를 시작합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Start-Milvus-and-Connect-to-Kafka-with-SSL" class="common-anchor-header">3. Milvus를 시작하고 SSL로 Kafka에 연결하기</h3><p>Kafka 서비스가 시작되면 Milvus를 시작하고 연결할 수 있습니다. 다음 <code translate="no">docker-compose.yaml</code> 파일을 사용하여 Milvus를 시작하고 SSL로 Kafka에 연결합니다:</p>
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
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/milvus.yaml:/milvus/configs/milvus.yaml</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/my_secrets:/milvus/secrets</span>
<button class="copy-code-btn"></button></code></pre>
<p>다음 명령을 사용하여 Milvus 구성 파일 템플릿을 다운로드합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>그리고 다음 파라미터를 설정합니다:</p>
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
<p>그런 다음 다음 명령으로 Milvus를 시작합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-Milvus-to-Kafka-with-SASLPLAIN-and-SSL" class="common-anchor-header">SASL/PLAIN 및 SSL로 Milvus를 Kafka에 연결하기<button data-href="#Connect-Milvus-to-Kafka-with-SASLPLAIN-and-SSL" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus를 SASL/PLAIN 및 SSL로 Kafka에 연결하려면 <a href="#Connect-Milus-to-Kafka-with-SASLPLAIN-Alone">SASL/PLAIN만으로 Mil</a> us를 Kafka에 연결하기 및 <a href="#Connect-Milus-to-Kafka-with-SSL-Alone">SSL만으로 Milus를 Kafka에 연결</a>하기의 단계를 반복해야 합니다.</p>
<h3 id="1-Start-a-Kafka-service-with-SASLPLAIN-and-SSL" class="common-anchor-header">1. SASL/PLAIN 및 SSL로 Kafka 서비스 시작하기 1.</h3><p><a href="#Connect-Milus-to-Kafka-with-SASLPLAIN-Alone">SASL/PLAIN만으로 Milus와 Kafka</a> 연결하기에서 설명한 <code translate="no">kafka_server_jass.conf</code> 파일과 <a href="#Connect-Milus-to-Kafka-with-SSL-Alone">SSL만으로 Milus와 Kafka 연결하기에서</a> 생성한 <code translate="no">my_secrets</code> 폴더를 사용하여 SASL/PLAIN 및 SSL로 Kafka 서비스를 시작합니다.</p>
<p>다음 <code translate="no">docker-compose.yaml</code> 파일을 사용하여 SASL/PLAIN 및 SSL로 Kafka 서비스를 시작할 수 있습니다:</p>
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
      <span class="hljs-attr">KAFKA_OPTS:</span> <span class="hljs-string">&quot;-Djava.security.auth.login.config=/etc/kafka/configs/kafka_server_jass.conf&quot;</span>

    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/my_secrets:/etc/kafka/secrets</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/kafka_server_jass.conf:/etc/kafka/configs/kafka_server_jass.conf</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 다음 명령어로 Kafka 서비스를 시작합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus-and-Connect-to-Kafka-with-SASLPLAIN-and-SSL" class="common-anchor-header">2. Milvus를 시작하고 SASL/PLAIN 및 SSL로 Kafka에 연결하기</h3><p>Kafka 서비스가 시작되면 Milvus를 시작하고 연결할 수 있습니다. 다음 <code translate="no">docker-compose.yaml</code> 파일을 사용하여 Milvus를 시작하고 SASL/PLAIN 및 SSL로 Kafka에 연결합니다:</p>
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
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/milvus.yaml:/milvus/configs/milvus.yaml</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/my_secrets:/milvus/secrets</span>
<button class="copy-code-btn"></button></code></pre>
<p>다음 명령어를 사용하여 Milvus 구성 파일 템플릿을 다운로드합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>그리고 다음 파라미터를 설정합니다:</p>
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
