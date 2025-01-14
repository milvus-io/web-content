---
id: connect_kafka_ssl.md
title: الاتصال بكافكا باستخدام SASL/SSL
related_key: 'kafka, sasl, tls'
summary: >-
  يسرد هذا الدليل عدة طرق لتوصيل ميلفوس بكافكا، من أبسطها بدون SASL/SSL إلى
  الطريقة المؤمنة بالكامل مع SASL/SSL.
---
<h1 id="Connecting-to-Kafka-with-SASLSSL" class="common-anchor-header">الاتصال بكافكا باستخدام SASL/SSL<button data-href="#Connecting-to-Kafka-with-SASLSSL" class="anchor-icon" translate="no">
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
    </button></h1><p>يسرد هذا الدليل عدة طرق لتوصيل ميلفوس بكافكا، من أبسط الطرق بدون SASL/SSL إلى الطريقة المؤمنة بالكامل باستخدام SASL/SSL.</p>
<h2 id="Connect-Milvus-to-Kafka-Without-SASLSSL" class="common-anchor-header">وصل ميلفوس بكافكا بدون SASL/SSL<button data-href="#Connect-Milvus-to-Kafka-Without-SASLSSL" class="anchor-icon" translate="no">
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
    </button></h2><p>لبدء تشغيل ميلفوس وكافكا بدون SASL/SSL، يمكنك تعطيل المصادقة والتشفير لكل من كافكا وميلفوس. استخدمها فقط في بيئة موثوقة.</p>
<h3 id="1-Start-a-Kafka-service-without-SASLSSL" class="common-anchor-header">1. ابدأ خدمة كافكا بدون SASL/SSL</h3><p>يمكنك استخدام ملف <code translate="no">docker-compose.yaml</code> التالي لبدء خدمة كافكا بدون SASL/SSL:</p>
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
<p>ثم يمكنك بدء خدمة كافكا باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">$ docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus-and-Connect-to-Kafka" class="common-anchor-header">2. بدء تشغيل ميلفوس والاتصال بكافكا</h3><p>بمجرد بدء تشغيل خدمة كافكا، يمكنك بدء تشغيل ميلفوس والاتصال بها. استخدم الملف التالي <code translate="no">docker-compose.yaml</code> لبدء تشغيل ميلفوس والاتصال بكافكا بدون SASL/SSL:</p>
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
<p>استخدم الأمر التالي لتنزيل قالب ملف تهيئة ميلفوس:</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>وقم بتعيين المعلمات التالية:</p>
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
<p>ثم يمكنك بدء تشغيل ميلفوس باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">$ docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-Milus-to-Kafka-with-SASLPLAIN-Alone" class="common-anchor-header">قم بتوصيل ميلفوس بكافكا باستخدام SASL/PLAIN وحده<button data-href="#Connect-Milus-to-Kafka-with-SASLPLAIN-Alone" class="anchor-icon" translate="no">
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
    </button></h2><p>لبدء تشغيل كافكا بمصادقة SASL/PLAIN، تحتاج إلى إضافة ملف <code translate="no">kafka_server_jass.conf</code> بالإعدادات المناسبة.</p>
<h3 id="1-Start-a-Kafka-service-with-SASLPLAIN" class="common-anchor-header">1. ابدأ خدمة كافكا باستخدام SASL/PLAIN</h3><p>ضع الملف التالي <code translate="no">docker-compose.yaml</code> والملف <code translate="no">kafka_server_jaas.conf</code> في نفس الدليل.</p>
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
<p>في الملف <code translate="no">kafka_server_jass.conf</code> ، قم بتعيين المعلمات التالية:</p>
<pre><code translate="no" class="language-conf"><span class="hljs-title class_">KafkaServer</span> {
    org.<span class="hljs-property">apache</span>.<span class="hljs-property">kafka</span>.<span class="hljs-property">common</span>.<span class="hljs-property">security</span>.<span class="hljs-property">plain</span>.<span class="hljs-property">PlainLoginModule</span> required
    username=<span class="hljs-string">&quot;kafka&quot;</span>
    password=<span class="hljs-string">&quot;pass123&quot;</span>
    user_kafka=<span class="hljs-string">&quot;pass123&quot;</span>;
};
<button class="copy-code-btn"></button></code></pre>
<p>ثم يمكنك بدء تشغيل خدمة كافكا باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">$ docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus-and-Connect-to-Kafka" class="common-anchor-header">2. بدء تشغيل ميلفوس والاتصال بكافكا</h3><p>بمجرد بدء تشغيل خدمة كافكا، يمكنك بدء تشغيل ميلفوس والاتصال بها. استخدم الملف التالي <code translate="no">docker-compose.yaml</code> لبدء تشغيل ميلفوس والاتصال بكافكا باستخدام SASL/PLAIN:</p>
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
<p>استخدم الأمر التالي لتنزيل قالب ملف تهيئة ميلفوس:</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>وقم بتعيين المعلمات التالية:</p>
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
<p>ثم يمكنك بدء تشغيل ميلفوس باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">$ docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-Milvus-to-Kafka-with-SSL-Alone" class="common-anchor-header">ربط ميلفوس بكافكا باستخدام SSL وحده<button data-href="#Connect-Milvus-to-Kafka-with-SSL-Alone" class="anchor-icon" translate="no">
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
    </button></h2><p>لبدء تشغيل كافكا بمصادقة SSL، تحتاج إلى الحصول على بعض ملفات الشهادات أو إنشاء شهادات موقعة ذاتيًا. في هذا المثال، نستخدم الشهادات الموقعة ذاتيًا.</p>
<h3 id="1-Generate-Self-Signed-Certificates" class="common-anchor-header">1. إنشاء شهادات موقعة ذاتيًا</h3><p>أنشئ مجلدًا باسم <code translate="no">my_secrets</code> ، وأضف برنامج نصي باش باسم <code translate="no">gen-ssl-certs.sh</code> فيه، والصق المحتوى التالي فيه:</p>
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
<p>في البرنامج النصي أعلاه، يتم تطبيق كلمة المرور الافتراضية <code translate="no">abcdefgh</code>. لتغيير كلمة المرور، قم بإنشاء ملف نصي باسم <code translate="no">cert_creds</code> وأدخل كلمة المرور في السطر الأول.</p>
<p>ثم قم بتشغيل الأمر التالي لإنشاء الشهادات:</p>
<ul>
<li><p>إنشاء شهادة CA:</p>
<p>يفترض ما يلي أن ملف شهادة المرجع المصدق (CA) يحمل الاسم <code translate="no">ca-cert</code> واسم المضيف للوسيط هو <code translate="no">kafka-ssl</code>:</p>
<pre><code translate="no" class="language-shell">$ ./gen-ssl-certs.sh ca ca-cert kafka-ssl
<button class="copy-code-btn"></button></code></pre></li>
<li><p>إنشاء شهادة الخادم ومخزن المفاتيح:</p>
<p>يفترض ما يلي أن ملف شهادة CA هو المسمى <code translate="no">ca-cert</code> ، وأن البادئة لجميع ملفات الإخراج هي <code translate="no">kafka_</code> ، وأن اسم المضيف للوسيط هو <code translate="no">kafka-ssl</code>:</p>
<pre><code translate="no" class="language-shell">$ ./gen-ssl-certs.sh -k server ca-cert kafka_ kafka-ssl
<button class="copy-code-btn"></button></code></pre></li>
<li><p>إنشاء مفاتيح العميل:</p>
<p>يفترض ما يلي أن ملف شهادة CA هو المسمى <code translate="no">ca-cert</code> ، والبادئة لجميع ملفات الإخراج هي <code translate="no">kafka_</code> ، واسم العميل هو <code translate="no">kafka-client</code>:</p>
<pre><code translate="no" class="language-shell">$ ./gen-ssl-certs.sh client ca-cert kafka_ kafka-client
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>بمجرد إنشاء جميع الشهادات اللازمة، يمكنك رؤية الملفات التالية في المجلد <code translate="no">my_secrets</code>:</p>
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
<h3 id="2-Start-a-Kafka-service-with-SSL" class="common-anchor-header">2. بدء خدمة كافكا مع SSL</h3><p>استخدم الملف التالي <code translate="no">docker-compose.yaml</code> لبدء خدمة كافكا باستخدام SSL:</p>
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
<p>ثم ابدأ تشغيل خدمة كافكا باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">$ docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Start-Milvus-and-Connect-to-Kafka-with-SSL" class="common-anchor-header">3. بدء تشغيل ميلفوس والاتصال بكافكا باستخدام SSL</h3><p>بمجرد بدء تشغيل خدمة كافكا، يمكنك بدء تشغيل ميلفوس والاتصال بها. استخدم الملف التالي <code translate="no">docker-compose.yaml</code> لبدء تشغيل ميلفوس والاتصال بكافكا باستخدام SSL:</p>
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
<p>استخدم الأمر التالي لتنزيل قالب ملف تكوين ملف Milvus:</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>وقم بتعيين المعلمات التالية:</p>
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
<p>ثم ابدأ تشغيل ميلفوس باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">$ docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-Milvus-to-Kafka-with-SASLPLAIN-and-SSL" class="common-anchor-header">ربط ميلفوس بكافكا باستخدام SASL/PLAIN و SSL<button data-href="#Connect-Milvus-to-Kafka-with-SASLPLAIN-and-SSL" class="anchor-icon" translate="no">
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
    </button></h2><p>لتوصيل ميلفوس بكافكا باستخدام SASL/PLAIN و SSL، تحتاج إلى تكرار الخطوات في توصيل ميلفوس بكافكا <a href="#Connect-Milus-to-Kafka-with-SASLPLAIN-Alone">باستخدام SASL/PLAIN وحده</a> <a href="#Connect-Milus-to-Kafka-with-SSL-Alone">وتوصيل ميلفوس بكافكا باستخدام SSL وحده</a>.</p>
<h3 id="1-Start-a-Kafka-service-with-SASLPLAIN-and-SSL" class="common-anchor-header">1. ابدأ خدمة كافكا باستخدام SASL/PLAIN و SSL</h3><p>استخدم الملف <code translate="no">kafka_server_jass.conf</code> المذكور في <a href="#Connect-Milus-to-Kafka-with-SASLPLAIN-Alone">Connect Milus إلى</a> كافكا مع SASL/PLAIN <a href="#Connect-Milus-to-Kafka-with-SASLPLAIN-Alone">Alone</a> والمجلد <code translate="no">my_secrets</code> الذي تم إنشاؤه في <a href="#Connect-Milus-to-Kafka-with-SSL-Alone">Connect Milus إلى كافكا مع SSL Alone</a> لبدء خدمة كافكا مع SASL/PLAIN و SSL.</p>
<p>يمكن استخدام الملف التالي <code translate="no">docker-compose.yaml</code> لبدء خدمة كافكا مع SASL/PLAIN و SSL:</p>
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
<p>ثم ابدأ تشغيل خدمة كافكا باستخدام الأمر التالي:</p>
<pre><code translate="no" class="language-shell">$ docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus-and-Connect-to-Kafka-with-SASLPLAIN-and-SSL" class="common-anchor-header">2. بدء تشغيل ميلفوس والاتصال بخدمة كافكا باستخدام SASL/PLAIN و SSL</h3><p>بمجرد بدء تشغيل خدمة كافكا، يمكنك بدء تشغيل ميلفوس والاتصال بها. استخدم الملف التالي <code translate="no">docker-compose.yaml</code> لبدء تشغيل Milvus والاتصال بكافكا باستخدام SASL/PLAIN و SSL:</p>
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
<p>استخدم الأمر التالي لتنزيل قالب ملف تكوين ملف Milvus:</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>وقم بتعيين المعلمات التالية:</p>
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
