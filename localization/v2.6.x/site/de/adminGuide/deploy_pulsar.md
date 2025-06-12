---
id: deploy_pulsar.md
title: Konfigurieren Sie den Nachrichtenspeicher mit Docker Compose oder Helm
related_key: 'Pulsar, storage'
summary: >-
  Erfahren Sie, wie Sie den Nachrichtenspeicher mit Docker Compose oder Helm
  konfigurieren.
---
<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Konfigurieren Sie den Nachrichtenspeicher mit Docker Compose oder Helm<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus verwendet Pulsar oder Kafka für die Verwaltung von Protokollen der letzten Änderungen, die Ausgabe von Stream-Protokollen und die Bereitstellung von Protokollabonnements. Pulsar ist das standardmäßige Nachrichtenspeichersystem. In diesem Thema wird beschrieben, wie Sie den Nachrichtenspeicher mit Docker Compose oder Helm konfigurieren.</p>
<p>Sie können Pulsar mit <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> oder auf K8s konfigurieren und Kafka auf K8s konfigurieren.</p>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">Konfigurieren von Pulsar mit Docker Compose<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1. Pulsar konfigurieren</h3><p>Um Pulsar mit Docker Compose zu konfigurieren, geben Sie Ihre Werte für den Abschnitt <code translate="no">pulsar</code> in der Datei <code translate="no">milvus.yaml</code> im Pfad milvus/configs an.</p>
<pre><code translate="no"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span> <span class="hljs-comment"># Address of pulsar</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Siehe <a href="/docs/de/configure_pulsar.md">Pulsar-bezogene Konfigurationen</a> für weitere Informationen.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Starten Sie Milvus</h3><p>Führen Sie den folgenden Befehl aus, um Milvus zu starten, das die Pulsar-Konfigurationen verwendet.</p>
<pre><code translate="no"><span class="hljs-attribute">docker</span> compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Die Konfigurationen werden erst nach dem Start von Milvus wirksam. Siehe <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Starten von Milvus</a> für weitere Informationen.</div>
<h2 id="Configure-Pulsar-with-Helm" class="common-anchor-header">Konfigurieren Sie Pulsar mit Helm<button data-href="#Configure-Pulsar-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Für Milvus-Cluster auf K8s können Sie Pulsar mit demselben Befehl konfigurieren, mit dem Milvus gestartet wird. Alternativ können Sie Pulsar mit der Datei <code translate="no">values.yml</code> im Pfad /charts/milvus im <a href="https://github.com/milvus-io/milvus-helm">milvus-helm-Repository</a> konfigurieren, bevor Sie Milvus starten.</p>
<p>Einzelheiten zur Konfiguration von Milvus mit Helm finden Sie unter <a href="/docs/de/configure-helm.md">Konfigurieren von Milvus mit Helm Charts</a>. Details zu Pulsar-bezogenen Konfigurationselementen finden Sie unter <a href="/docs/de/configure_pulsar.md">Pulsar-bezogene Konfigurationen</a>.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Verwendung der YAML-Datei</h3><ol>
<li>Konfigurieren Sie den Abschnitt <code translate="no">externalConfigFiles</code> in der Datei <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    pulsar:
      address: localhost # Address of pulsar
      port: 6650 # Port of Pulsar
      webport: 80 # Web port of pulsar, if you connect direcly without proxy, should use 8080
      maxMessageSize: 5242880 # 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.
      tenant: public
      namespace: default    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Nachdem Sie die vorangegangenen Abschnitte konfiguriert und die Datei <code translate="no">values.yaml</code> gespeichert haben, führen Sie den folgenden Befehl aus, um Milvus zu installieren, das die Pulsar-Konfigurationen verwendet.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka-with-Helm" class="common-anchor-header">Konfigurieren Sie Kafka mit Helm<button data-href="#Configure-Kafka-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Für Milvus-Cluster auf K8s können Sie Kafka mit demselben Befehl konfigurieren, mit dem Milvus gestartet wird. Alternativ können Sie Kafka mit der Datei <code translate="no">values.yml</code> unter dem Pfad /charts/milvus im <a href="https://github.com/milvus-io/milvus-helm">milvus-helm-Repository</a> konfigurieren, bevor Sie Milvus starten.</p>
<p>Einzelheiten zur Konfiguration von Milvus mit Helm finden Sie unter <a href="/docs/de/configure-helm.md">Konfigurieren von Milvus mit Helm Charts</a>. Details zu Pulsar-bezogenen Konfigurationselementen finden Sie unter <a href="/docs/de/configure_pulsar.md">Pulsar-bezogene Konfigurationen</a>.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Verwendung der YAML-Datei</h3><ol>
<li>Konfigurieren Sie den Abschnitt <code translate="no">externalConfigFiles</code> in der Datei <code translate="no">values.yaml</code>, wenn Sie Kafka als Nachrichtenspeichersystem verwenden möchten.</li>
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
<li>Nachdem Sie die vorangegangenen Abschnitte konfiguriert und die Datei <code translate="no">values.yaml</code> gespeichert haben, führen Sie den folgenden Befehl aus, um Milvus zu installieren, das die Kafka-Konfigurationen verwendet.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-RocksMQ-with-Helm" class="common-anchor-header">Konfigurieren Sie RocksMQ mit Helm<button data-href="#Configure-RocksMQ-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standalone verwendet RocksMQ als Standard-Nachrichtenspeicher. Detaillierte Schritte zur Konfiguration von Milvus mit Helm finden Sie unter <a href="/docs/de/configure-helm.md">Konfigurieren von Milvus mit Helm-Diagrammen</a>. Einzelheiten zu RocksMQ-bezogenen Konfigurationselementen finden Sie unter <a href="/docs/de/configure_rocksmq.md">RocksMQ-bezogene Konfigurationen</a>.</p>
<ul>
<li><p>Wenn Sie Milvus mit RocksMQ starten und seine Einstellungen ändern möchten, können Sie <code translate="no">helm upgrade -f</code> mit den geänderten Einstellungen in der folgenden YAML-Datei ausführen.</p></li>
<li><p>Wenn Sie Milvus eigenständig mit Helm mit einem anderen Nachrichtenspeicher als RocksMQ installiert haben und wieder zu RocksMQ wechseln möchten, führen Sie <code translate="no">helm upgrade -f</code> mit der folgenden YAML-Datei aus, nachdem Sie alle Sammlungen geleert und Milvus gestoppt haben.</p></li>
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
<p>Das Ändern des Nachrichtenspeichers wird nicht empfohlen. Wenn Sie dies tun möchten, stoppen Sie alle DDL-Vorgänge, rufen Sie dann die FlushAll-API auf, um alle Sammlungen zu flushen, und stoppen Sie schließlich Milvus, bevor Sie den Nachrichtenspeicher tatsächlich ändern.</p>
</div>
<h2 id="Configure-NATS-with-Helm" class="common-anchor-header">Konfigurieren Sie NATS mit Helm<button data-href="#Configure-NATS-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS ist eine experimentelle Nachrichtenspeicher-Alternative zu RocksMQ. Detaillierte Schritte zur Konfiguration von Milvus mit Helm finden Sie unter <a href="/docs/de/configure-helm.md">Konfigurieren von Milvus mit Helm-Diagrammen</a>. Einzelheiten zu RocksMQ-bezogenen Konfigurationselementen finden Sie unter <a href="/docs/de/configure_natsmq.md">NATS-bezogene Konfigurationen</a>.</p>
<ul>
<li><p>Wenn Sie Milvus mit NATS starten und seine Einstellungen ändern möchten, können Sie <code translate="no">helm upgrade -f</code> mit den geänderten Einstellungen in der folgenden YAML-Datei ausführen.</p></li>
<li><p>Wenn Sie Milvus standalone mit einem anderen Nachrichtenspeicher als NATS installiert haben und diesen auf NATS umstellen wollen, führen Sie <code translate="no">helm upgrade -f</code> mit der folgenden YAML-Datei aus, nachdem Sie alle Collections geleert und Milvus gestoppt haben.</p></li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    mq:
      type: natsmq
    natsmq:
      # server side configuration for natsmq.
      server: 
        # 4222 by default, Port for nats server listening.
        port: 4222 
        # /var/lib/milvus/nats by default, directory to use for JetStream storage of nats.
        storeDir: /var/lib/milvus/nats 
        # (B) 16GB by default, Maximum size of the &#x27;file&#x27; storage.
        maxFileStore: 17179869184 
        # (B) 8MB by default, Maximum number of bytes in a message payload.
        maxPayload: 8388608 
        # (B) 64MB by default, Maximum number of bytes buffered for a connection applies to client connections.
        maxPending: 67108864 
        # (√ms) 4s by default, waiting for initialization of natsmq finished.
        initializeTimeout: 4000 
        monitor:
          # false by default, If true enable debug log messages.
          debug: false 
          # true by default, If set to false, log without timestamps.
          logTime: true 
          # no log file by default, Log file path relative to.. .
          logFile: 
          # (B) 0, unlimited by default, Size in bytes after the log file rolls over to a new one.
          logSizeLimit: 0 
        retention:
          # (min) 3 days by default, Maximum age of any message in the P-channel.
          maxAge: 4320 
          # (B) None by default, How many bytes the single P-channel may contain. Removing oldest messages if the P-channel exceeds this size.
          maxBytes:
          # None by default, How many message the single P-channel may contain. Removing oldest messages if the P-channel exceeds this limit.    
          maxMsgs: 
</span><button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Zwischen RocksMQ und NATS wählen?</strong></p>
<p>RockMQ verwendet CGO für die Interaktion mit RocksDB und verwaltet den Speicher selbst, während das in die Milvus-Installation eingebettete reine Go-NATS die Speicherverwaltung an den Garbage Collector (GC) von Go delegiert.</p>
<p>In dem Szenario, in dem das Datenpaket kleiner als 64 kb ist, schneidet RocksDB in Bezug auf Speicherverbrauch, CPU-Nutzung und Antwortzeit besser ab. Ist das Datenpaket hingegen größer als 64 kb, so ist NATS bei ausreichendem Speicher und idealer GC-Planung in Bezug auf die Antwortzeit überlegen.</p>
<p>Derzeit wird empfohlen, NATS nur für Experimente zu verwenden.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Erfahren Sie, wie Sie andere Milvus-Abhängigkeiten mit Docker Compose oder Helm konfigurieren können:</p>
<ul>
<li><a href="/docs/de/deploy_s3.md">Konfigurieren von Objektspeicher mit Docker Compose oder Helm</a></li>
<li><a href="/docs/de/deploy_etcd.md">Konfigurieren Sie Meta Storage mit Docker Compose oder Helm</a></li>
</ul>
