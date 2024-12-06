---
id: connect_kafka_ssl.md
title: Connecting to Kafka with SASL/SSL
related_key: 'kafka, sasl, tls'
summary: >-
  This guide lists several ways to connect Milvus to Kafka, from the simplest
  one without SASL/SSL to the fully secured one with SASL/SSL.
---
<h1 id="Connecting-to-Kafka-with-SASLSSL" class="common-anchor-header">Connecting to Kafka with SASL/SSL<button data-href="#Connecting-to-Kafka-with-SASLSSL" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide lists several ways to connect Milvus to Kafka, from the simplest one without SASL/SSL to the fully secured one with SASL/SSL.</p>
<h2 id="Connect-Milvus-to-Kafka-Without-SASLSSL" class="common-anchor-header">Connect Milvus to Kafka Without SASL/SSL<button data-href="#Connect-Milvus-to-Kafka-Without-SASLSSL" class="anchor-icon" translate="no">
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
    </button></h2><p>To start Milvus and Kafka without SASL/SSL, you disable authentication and encryption for both Kafka and Milvus. Use them only in a trusted environment.</p>
<h3 id="1-Start-a-Kafka-service-without-SASLSSL" class="common-anchor-header">1. Start a Kafka service without SASL/SSL</h3><p>You can use the following <code translate="no">docker-compose.yaml</code> file to start a Kafka service without SASL/SSL:</p>
<pre><code translate="no" class="language-yaml">version: <span class="hljs-string">&#x27;3&#x27;</span>
services:
  zookeeper:
    image: wurstmeister/zookeeper:latest
    container_name: zookeeper
    ports:
      - 2181:2181
    restart: always

  kafka:
    image: wurstmeister/kafka:latest
    container_name: kafka
    ports:
      - 9092:9092
    environment:
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
      - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092
      - KAFKA_LISTENERS=PLAINTEXT://:9092
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    restart: always
<button class="copy-code-btn"></button></code></pre>
<p>Then you can start the Kafka service with the following command:</p>
<pre><code translate="no" class="language-shell">$ docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus-and-Connect-to-Kafka" class="common-anchor-header">2. Start Milvus and Connect to Kafka</h3><p>Once the Kafka service is started, you can start Milvus and connect to it. Use the following <code translate="no">docker-compose.yaml</code> file to start Milvus and connect to Kafka without SASL/SSL:</p>
<pre><code translate="no" class="language-yaml">version: <span class="hljs-string">&#x27;3.5&#x27;</span>

services:
  etcd:
    ......
    
  minio:
    ......
      
  standalone:
    container_name: milvus-standalone
    ......
    volumes:
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/volumes/milvus:/var/lib/milvus
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/milvus.yaml:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Use the following command to download a Milvus configuration file template:</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>And set the following parameters:</p>
<pre><code translate="no" class="language-yaml">mq:
  <span class="hljs-built_in">type</span>: kafka

kafka:
  brokerList: <span class="hljs-string">&quot;127.0.0.1:9092&quot;</span>
  saslUsername:
  saslPassword:
  saslMechanisms:
  securityProtocol:
  readTimeout: <span class="hljs-number">10</span> <span class="hljs-comment"># read message timeout in seconds</span>
  ssl:
    enabled: false <span class="hljs-comment"># Whether to support kafka secure connection mode</span>
    tlsCert: 
    tlsKey:
    tlsCACert:
    tlsKeyPassword:
<button class="copy-code-btn"></button></code></pre>
<p>Then you can start Milvus with the following command:</p>
<pre><code translate="no" class="language-shell">$ docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-Milus-to-Kafka-with-SASLPLAIN-Alone" class="common-anchor-header">Connect Milus to Kafka with SASL/PLAIN Alone<button data-href="#Connect-Milus-to-Kafka-with-SASLPLAIN-Alone" class="anchor-icon" translate="no">
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
    </button></h2><p>To start Kafka with SASL/PLAIN authentication, you need to add the <code translate="no">kafka_server_jass.conf</code> file with proper settings.</p>
<h3 id="1-Start-a-Kafka-service-with-SASLPLAIN" class="common-anchor-header">1. Start a Kafka service with SASL/PLAIN</h3><p>Put the following <code translate="no">docker-compose.yaml</code> file and <code translate="no">kafka_server_jaas.conf</code> file in the same directory.</p>
<pre><code translate="no" class="language-yaml">version: <span class="hljs-string">&#x27;3&#x27;</span>
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    container_name: zookeeper
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - 2181:2181

  kafka:
    image: confluentinc/cp-kafka:latest
    container_name: kafka
    depends_on:
      - zookeeper
    ports:
      - 9092:9092
      - 9093:9093
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: <span class="hljs-string">&#x27;zookeeper:2181&#x27;</span>
      ZOOKEEPER_SASL_ENABLED: <span class="hljs-string">&quot;false&quot;</span>
      KAFKA_ADVERTISED_LISTENERS: SASL_PLAINTEXT://localhost:9093
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: SASL_PLAINTEXT:SASL_PLAINTEXT
      KAFKA_SECURITY_INTER_BROKER_PROTOCOL: SASL_PLAINTEXT
      KAFKA_SASL_MECHANISM_INTER_BROKER_PROTOCOL: PLAIN
      KAFKA_SASL_ENABLED_MECHANISMS: PLAIN
      KAFKA_CONFLUENT_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_DEFAULT_REPLICATION_FACTOR: 1
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_OPTS: <span class="hljs-string">&quot;-Djava.security.auth.login.config=/etc/kafka/configs/kafka_server_jass.conf&quot;</span>
    volumes:
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/kafka_server_jass.conf:/etc/kafka/configs/kafka_server_jass.conf
<button class="copy-code-btn"></button></code></pre>
<p>In the <code translate="no">kafka_server_jass.conf</code> file, set the following parameters:</p>
<pre><code translate="no" class="language-conf"><span class="hljs-title class_">KafkaServer</span> {
    org.<span class="hljs-property">apache</span>.<span class="hljs-property">kafka</span>.<span class="hljs-property">common</span>.<span class="hljs-property">security</span>.<span class="hljs-property">plain</span>.<span class="hljs-property">PlainLoginModule</span> required
    username=<span class="hljs-string">&quot;kafka&quot;</span>
    password=<span class="hljs-string">&quot;pass123&quot;</span>
    user_kafka=<span class="hljs-string">&quot;pass123&quot;</span>;
};
<button class="copy-code-btn"></button></code></pre>
<p>Then you can start the Kafka service with the following command:</p>
<pre><code translate="no" class="language-shell">$ docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus-and-Connect-to-Kafka" class="common-anchor-header">2. Start Milvus and Connect to Kafka</h3><p>Once the Kafka service is started, you can start Milvus and connect to it. Use the following <code translate="no">docker-compose.yaml</code> file to start Milvus and connect to Kafka with SASL/PLAIN:</p>
<pre><code translate="no" class="language-yaml">version: <span class="hljs-string">&#x27;3.5&#x27;</span>

services:
  etcd:
    ......
    
  minio:
    ......
      
  standalone:
    container_name: milvus-standalone
    ......
    volumes:
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/volumes/milvus:/var/lib/milvus
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/milvus.yaml:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Use the following command to download a Milvus configuration file template:</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>And set the following parameters:</p>
<pre><code translate="no" class="language-yaml">mq:
  <span class="hljs-built_in">type</span>: kafka

kafka:
  brokerList: <span class="hljs-string">&quot;127.0.0.1:9093&quot;</span>
  saslUsername: kafka
  saslPassword: pass123
  saslMechanisms: PLAIN
  securityProtocol: SASL_PLAINTEXT
  readTimeout: <span class="hljs-number">10</span> <span class="hljs-comment"># read message timeout in seconds</span>
  ssl:
    enabled: false <span class="hljs-comment"># Whether to support kafka secure connection mode</span>
    tlsCert: <span class="hljs-comment"># path to client&#x27;s public key</span>
    tlsKey: <span class="hljs-comment"># path to client&#x27;s private key</span>
    tlsCACert: <span class="hljs-comment"># file or directory path to CA certificate</span>
    tlsKeyPassword: <span class="hljs-comment"># private key passphrase for use with private key, if any</span>
<button class="copy-code-btn"></button></code></pre>
<p>Then you can start Milvus with the following command:</p>
<pre><code translate="no" class="language-shell">$ docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-Milvus-to-Kafka-with-SSL-Alone" class="common-anchor-header">Connect Milvus to Kafka with SSL Alone<button data-href="#Connect-Milvus-to-Kafka-with-SSL-Alone" class="anchor-icon" translate="no">
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
    </button></h2><p>To start Kafka with SSL authentication, you need to obtain some certificates files or generate self-signed ones. In this example, we use self-signed certificates.</p>
<h3 id="1-Generate-Self-Signed-Certificates" class="common-anchor-header">1. Generate Self-Signed Certificates</h3><p>Create a folder named <code translate="no">my_secrets</code>, add a bash script named <code translate="no">gen-ssl-certs.sh</code> in it, and paste the following content into it:</p>
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
<p>In the above script, a default password <code translate="no">abcdefgh</code> applies. To change the password, create a text file named <code translate="no">cert_creds</code> and input the password in the first line.</p>
<p>Then run the following command to generate the certificates:</p>
<ul>
<li><p>Generate CA certificate:</p>
<p>The following assumes the CA certificate file is named <code translate="no">ca-cert</code> and the hostname of the broker is <code translate="no">kafka-ssl</code>:</p>
<pre><code translate="no" class="language-shell">$ ./gen-ssl-certs.sh ca ca-cert kafka-ssl
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Generate server certificate and keystore:</p>
<p>The following assumes the CA certificate file is named <code translate="no">ca-cert</code>, the prefix for all output files is <code translate="no">kafka_</code>, and the hostname of the broker is <code translate="no">kafka-ssl</code>:</p>
<pre><code translate="no" class="language-shell">$ ./gen-ssl-certs.sh -k server ca-cert kafka_ kafka-ssl
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Generate client keys:</p>
<p>The following assumes the CA certificate file is named <code translate="no">ca-cert</code>, the prefix for all output files is <code translate="no">kafka_</code>, and the client name is <code translate="no">kafka-client</code>:</p>
<pre><code translate="no" class="language-shell">$ ./gen-ssl-certs.sh client ca-cert kafka_ kafka-client
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Once all necessary certificates are generated, you can see the following files in the <code translate="no">my_secrets</code> folder:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">ls</span> -l my_secrets
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
<h3 id="2-Start-a-Kafka-service-with-SSL" class="common-anchor-header">2. Start a Kafka service with SSL</h3><p>Use the following <code translate="no">docker-compose.yaml</code> file to start a Kafka service with SSL:</p>
<pre><code translate="no" class="language-yaml">version: <span class="hljs-string">&#x27;3&#x27;</span>
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    container_name: zookeeper
    hostname: zookeeper
    ports:
      - 2181:2181
    environment:
      ZOOKEEPER_SERVER_ID: 1
      ZOOKEEPER_CLIENT_PORT: 2181

  kafka-ssl:
    image: confluentinc/cp-kafka:latest
    container_name: kafka-ssl
    hostname: kafka-ssl
    ports:
      - 9093:9093
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: <span class="hljs-string">&#x27;zookeeper:2181&#x27;</span>
      ZOOKEEPER_SASL_ENABLED: <span class="hljs-string">&quot;false&quot;</span>
      KAFKA_ADVERTISED_LISTENERS: SSL://kafka-ssl:9093
      KAFKA_SSL_KEYSTORE_FILENAME: kafka_server.keystore.jks
      KAFKA_SSL_KEYSTORE_CREDENTIALS: cert_creds
      KAFKA_SSL_KEY_CREDENTIALS: cert_creds
      KAFKA_SSL_TRUSTSTORE_FILENAME: kafka_server.truststore.jks
      KAFKA_SSL_TRUSTSTORE_CREDENTIALS: cert_creds
      KAFKA_SSL_CLIENT_AUTH: <span class="hljs-string">&#x27;required&#x27;</span>
      KAFKA_SECURITY_PROTOCOL: SSL
      KAFKA_SECURITY_INTER_BROKER_PROTOCOL: SSL
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

    volumes:
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/my_secrets:/etc/kafka/secrets
<button class="copy-code-btn"></button></code></pre>
<p>Then start the Kafka service with the following command:</p>
<pre><code translate="no" class="language-shell">$ docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Start-Milvus-and-Connect-to-Kafka-with-SSL" class="common-anchor-header">3. Start Milvus and Connect to Kafka with SSL</h3><p>Once the Kafka service is started, you can start Milvus and connect to it. Use the following <code translate="no">docker-compose.yaml</code> file to start Milvus and connect to Kafka with SSL:</p>
<pre><code translate="no" class="language-yaml">version: <span class="hljs-string">&#x27;3.5&#x27;</span>

services:
  etcd:
    ......
    
  minio:
    ......
      
  standalone:
    container_name: milvus-standalone
    ......
    volumes:
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/volumes/milvus:/var/lib/milvus
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/milvus.yaml:/milvus/configs/milvus.yaml
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/my_secrets:/milvus/secrets
<button class="copy-code-btn"></button></code></pre>
<p>Use the following command to download a Milvus configuration file template:</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>And set the following parameters:</p>
<pre><code translate="no" class="language-yaml">mq:
  <span class="hljs-built_in">type</span>: kafka

kafka:
  brokerList: <span class="hljs-string">&quot;127.0.0.1:9093&quot;</span>
  saslUsername: 
  saslPassword: 
  saslMechanisms: 
  securityProtocol: SSL
  readTimeout: <span class="hljs-number">10</span> <span class="hljs-comment"># read message timeout in seconds</span>
  ssl:
    enabled: true <span class="hljs-comment"># Whether to support kafka secure connection mode</span>
    tlsCert: /milvus/secrets/kafka_client.pem <span class="hljs-comment"># path to client&#x27;s public key</span>
    tlsKey: /milvus/secrets/kafka_client.key <span class="hljs-comment"># path to client&#x27;s private key</span>
    tlsCACert: /milvus/secrets/ca-cert <span class="hljs-comment"># file or directory path to CA certificate</span>
    tlsKeyPassword: abcdefgh <span class="hljs-comment"># private key passphrase for use with private key, if any</span>
<button class="copy-code-btn"></button></code></pre>
<p>Then start Milvus with the following command:</p>
<pre><code translate="no" class="language-shell">$ docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-Milvus-to-Kafka-with-SASLPLAIN-and-SSL" class="common-anchor-header">Connect Milvus to Kafka with SASL/PLAIN and SSL<button data-href="#Connect-Milvus-to-Kafka-with-SASLPLAIN-and-SSL" class="anchor-icon" translate="no">
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
    </button></h2><p>To connect Milvus to Kafka with SASL/PLAIN and SSL, you need to repeat the steps in <a href="#Connect-Milus-to-Kafka-with-SASLPLAIN-Alone">Connect Milus to Kafka with SASL/PLAIN Alone</a> and <a href="#Connect-Milus-to-Kafka-with-SSL-Alone">Connect Milus to Kafka with SSL Alone</a>.</p>
<h3 id="1-Start-a-Kafka-service-with-SASLPLAIN-and-SSL" class="common-anchor-header">1. Start a Kafka service with SASL/PLAIN and SSL</h3><p>Use the <code translate="no">kafka_server_jass.conf</code> file mentioned in <a href="#Connect-Milus-to-Kafka-with-SASLPLAIN-Alone">Connect Milus to Kafka with SASL/PLAIN Alone</a> and the <code translate="no">my_secrets</code> folder generated in <a href="#Connect-Milus-to-Kafka-with-SSL-Alone">Connect Milus to Kafka with SSL Alone</a> to start a Kafka service with SASL/PLAIN and SSL.</p>
<p>The following <code translate="no">docker-compose.yaml</code> file can be used to start a Kafka service with SASL/PLAIN and SSL:</p>
<pre><code translate="no" class="language-yaml">version: <span class="hljs-string">&#x27;3&#x27;</span>
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    container_name: zookeeper
    hostname: zookeeper
    ports:
      - 2181:2181
    environment:
      ZOOKEEPER_SERVER_ID: 1
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000


  kafka-ssl:
    image: confluentinc/cp-kafka:latest
    container_name: kafka-ssl
    hostname: kafka-ssl
    ports:
      - 9093:9093
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: <span class="hljs-string">&#x27;zookeeper:2181&#x27;</span>
      ZOOKEEPER_SASL_ENABLED: <span class="hljs-string">&quot;false&quot;</span>
      KAFKA_ADVERTISED_LISTENERS: SASL_SSL://kafka-ssl:9093
      KAFKA_SSL_KEYSTORE_FILENAME: kafka_server.keystore.jks
      KAFKA_SSL_KEYSTORE_CREDENTIALS: cert_creds
      KAFKA_SSL_KEY_CREDENTIALS: cert_creds
      KAFKA_SSL_TRUSTSTORE_FILENAME: kafka_server.truststore.jks
      KAFKA_SSL_TRUSTSTORE_CREDENTIALS: cert_creds
      KAFKA_SSL_CLIENT_AUTH: <span class="hljs-string">&#x27;required&#x27;</span>
      KAFKA_SECURITY_PROTOCOL: SASL_SSL
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: SASL_SSL:SASL_SSL
      KAFKA_SECURITY_INTER_BROKER_PROTOCOL: SASL_SSL
      KAFKA_SASL_MECHANISM_INTER_BROKER_PROTOCOL: PLAIN
      KAFKA_SASL_ENABLED_MECHANISMS: PLAIN
      KAFKA_CONFLUENT_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_DEFAULT_REPLICATION_FACTOR: 1
      KAFKA_OPTS: <span class="hljs-string">&quot;-Djava.security.auth.login.config=/etc/kafka/configs/kafka_server_jass.conf&quot;</span>

    volumes:
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/my_secrets:/etc/kafka/secrets
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/kafka_server_jass.conf:/etc/kafka/configs/kafka_server_jass.conf
<button class="copy-code-btn"></button></code></pre>
<p>Then start the Kafka service with the following command:</p>
<pre><code translate="no" class="language-shell">$ docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus-and-Connect-to-Kafka-with-SASLPLAIN-and-SSL" class="common-anchor-header">2. Start Milvus and Connect to Kafka with SASL/PLAIN and SSL</h3><p>Once the Kafka service is started, you can start Milvus and connect to it. Use the following <code translate="no">docker-compose.yaml</code> file to start Milvus and connect to Kafka with SASL/PLAIN and SSL:</p>
<pre><code translate="no" class="language-yaml">version: <span class="hljs-string">&#x27;3.5&#x27;</span>

services:
  etcd:
    ......
    
  minio:
    ......
    
  standalone:
    container_name: milvus-standalone
    ......
    volumes:
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/volumes/milvus:/var/lib/milvus
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/milvus.yaml:/milvus/configs/milvus.yaml
      - <span class="hljs-variable">${DOCKER_VOLUME_DIRECTORY:-.}</span>/my_secrets:/milvus/secrets
<button class="copy-code-btn"></button></code></pre>
<p>Use the following command to download a Milvus configuration file template:</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>And set the following parameters:</p>
<pre><code translate="no" class="language-yaml">mq:
  <span class="hljs-built_in">type</span>: kafka

kafka:
  brokerList: <span class="hljs-string">&quot;127.0.0.1:9093&quot;</span>
  saslUsername: kafka
  saslPassword: pass123
  saslMechanisms: PLAIN
  securityProtocol: SASL_SSL
  readTimeout: <span class="hljs-number">10</span> <span class="hljs-comment"># read message timeout in seconds</span>
  ssl:
    enabled: true <span class="hljs-comment"># Whether to support kafka secure connection mode</span>
    tlsCert: /milvus/secrets/kafka_client.pem <span class="hljs-comment"># path to client&#x27;s public key</span>
    tlsKey: /milvus/secrets/kafka_client.key <span class="hljs-comment"># path to client&#x27;s private key</span>
    tlsCACert: /milvus/secrets/ca-cert <span class="hljs-comment"># file or directory path to CA certificate</span>
    tlsKeyPassword: abcdefgh <span class="hljs-comment"># private key passphrase for use with private key, if any</span>
<button class="copy-code-btn"></button></code></pre>
