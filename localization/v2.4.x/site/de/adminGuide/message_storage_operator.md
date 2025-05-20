---
id: message_storage_operator.md
title: Konfigurieren Sie den Nachrichtenspeicher mit Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: >-
  Erfahren Sie, wie Sie die Nachrichtenspeicherung mit Milvus Operator
  konfigurieren.
---
<h1 id="Configure-Message-Storage-with-Milvus-Operator" class="common-anchor-header">Konfigurieren der Nachrichtenspeicherung mit Milvus Operator<button data-href="#Configure-Message-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus verwendet RocksMQ, Pulsar oder Kafka für die Verwaltung von Protokollen der letzten Änderungen, die Ausgabe von Stream-Protokollen und die Bereitstellung von Protokollabonnements. In diesem Thema wird beschrieben, wie Sie die Abhängigkeiten für den Nachrichtenspeicher konfigurieren, wenn Sie Milvus mit Milvus Operator installieren. Weitere Details finden Sie unter <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">Konfigurieren des Nachrichtenspeichers mit Milvus Operator</a> im Milvus Operator Repository.</p>
<p>Dieses Thema setzt voraus, dass Sie Milvus Operator installiert haben.</p>
<div class="alert note">Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Bereitstellen von Milvus Operator</a>. </div>
<p>Sie müssen eine Konfigurationsdatei für die Verwendung von Milvus Operator angeben, um einen Milvus-Cluster zu starten.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sie müssen nur die Codevorlage in <code translate="no">milvus_cluster_default.yaml</code> bearbeiten, um die Abhängigkeiten von Dritten zu konfigurieren. In den folgenden Abschnitten wird beschrieben, wie Sie Objektspeicher, etcd und Pulsar konfigurieren.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Bevor Sie beginnen<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Die folgende Tabelle zeigt, ob RocksMQ, NATS, Pulsar und Kafka im Milvus-Einzelplatz- und Clustermodus unterstützt werden.</p>
<table>
<thead>
<tr><th style="text-align:center"></th><th style="text-align:center">RocksMQ</th><th style="text-align:center">NATS</th><th style="text-align:center">Pulsar</th><th style="text-align:center">Kafka</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">Eigenständiger Modus</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
<tr><td style="text-align:center">Cluster-Modus</td><td style="text-align:center">✖️</td><td style="text-align:center">✖️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>Es gibt noch weitere Einschränkungen bei der Angabe des Nachrichtenspeichers:</p>
<ul>
<li>Es wird nur ein Nachrichtenspeicher für eine Milvus-Instanz unterstützt. Wir haben jedoch immer noch Abwärtskompatibilität mit mehreren Nachrichtenspeichern für eine Instanz. Die Priorität ist wie folgt:<ul>
<li>Standalone-Modus:  RocksMQ (Standard) &gt; Pulsar &gt; Kafka</li>
<li>Clustermodus: Pulsar (Voreinstellung) &gt; Kafka</li>
<li>Nats, die in 2.3 eingeführt wurden, nehmen aus Gründen der Abwärtskompatibilität nicht an diesen Prioritätsregeln teil.</li>
</ul></li>
<li>Der Nachrichtenspeicher kann nicht geändert werden, während das Milvus-System läuft.</li>
<li>Es wird nur die Kafka-Version 2.x oder 3.x unterstützt.</li>
</ul>
<h2 id="Configure-RocksMQ" class="common-anchor-header">RocksMQ konfigurieren<button data-href="#Configure-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><p>RocksMQ ist der Standard-Nachrichtenspeicher in Milvus Standalone.</p>
<div class="alert note">
<p>Derzeit können Sie RocksMQ als Nachrichtenspeicher für Milvus standalone nur mit Milvus Operator konfigurieren.</p>
</div>
<h4 id="Example" class="common-anchor-header">Beispiel</h4><p>Das folgende Beispiel konfiguriert einen RocksMQ-Dienst.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: milvus
spec:
  dependencies: {}
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-NATS" class="common-anchor-header">NATS konfigurieren<button data-href="#Configure-NATS" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS ist ein alternativer Nachrichtenspeicher für NATS.</p>
<h4 id="Example" class="common-anchor-header">Beispiel</h4><p>Im folgenden Beispiel wird ein NATS-Dienst konfiguriert.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: milvus
spec:
  dependencies: 
    msgStreamType: <span class="hljs-string">&#x27;natsmq&#x27;</span>
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
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<p>Um den Nachrichtenspeicher von RocksMQ zu NATS zu migrieren, gehen Sie wie folgt vor:</p>
<ol>
<li><p>Stoppen Sie alle DDL-Vorgänge.</p></li>
<li><p>Rufen Sie die FlushAll-API auf und stoppen Sie Milvus, sobald die Ausführung des API-Aufrufs beendet ist.</p></li>
<li><p>Ändern Sie <code translate="no">msgStreamType</code> in <code translate="no">natsmq</code> und nehmen Sie die erforderlichen Änderungen an den NATS-Einstellungen in <code translate="no">spec.dependencies.natsmq</code> vor.</p></li>
<li><p>Starten Sie Milvus erneut und überprüfen Sie, ob:</p>
<ul>
<li>Ein Protokolleintrag, der <code translate="no">mqType=natsmq</code> lautet, ist in den Protokollen vorhanden.</li>
<li>Ein Verzeichnis mit dem Namen <code translate="no">jetstream</code> in dem in <code translate="no">spec.dependencies.natsmq.server.storeDir</code> angegebenen Verzeichnis vorhanden ist.</li>
</ul></li>
<li><p>(Optional) Sichern und bereinigen Sie die Datendateien im RocksMQ-Speicherverzeichnis.</p></li>
</ol>
<div class="alert note">
<p><strong>Zwischen RocksMQ und NATS wählen?</strong></p>
<p>RockMQ verwendet CGO für die Interaktion mit RocksDB und verwaltet den Speicher selbst, während das in die Milvus-Installation eingebettete reine Go-NATS seine Speicherverwaltung an den Garbage Collector (GC) von Go delegiert.</p>
<p>In dem Szenario, in dem das Datenpaket kleiner als 64 kb ist, schneidet RocksDB in Bezug auf Speicherverbrauch, CPU-Nutzung und Antwortzeit besser ab. Ist das Datenpaket hingegen größer als 64 KB, so ist NATS bei ausreichendem Speicher und idealer GC-Planung in Bezug auf die Antwortzeit überlegen.</p>
<p>Derzeit wird empfohlen, NATS nur für Experimente zu verwenden.</p>
</div>
<h2 id="Configure-Pulsar" class="common-anchor-header">Pulsar konfigurieren<button data-href="#Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar verwaltet Protokolle der letzten Änderungen, gibt Stream-Protokolle aus und bietet Protokollabonnements. Die Konfiguration von Pulsar für die Nachrichtenspeicherung wird sowohl in Milvus standalone als auch in Milvus cluster unterstützt. Mit Milvus Operator können Sie Pulsar jedoch nur als Nachrichtenspeicher für Milvus-Cluster konfigurieren. Fügen Sie die erforderlichen Felder unter <code translate="no">spec.dependencies.pulsar</code> hinzu, um Pulsar zu konfigurieren.</p>
<p><code translate="no">pulsar</code> unterstützt <code translate="no">external</code> und <code translate="no">inCluster</code>.</p>
<h3 id="External-Pulsar" class="common-anchor-header">Externer Pulsar</h3><p><code translate="no">external</code> gibt an, dass ein externer Pulsar-Dienst verwendet wird. Die zur Konfiguration eines externen Pulsar-Dienstes verwendeten Felder umfassen:</p>
<ul>
<li><code translate="no">external</code>:  Ein <code translate="no">true</code> Wert zeigt an, dass Milvus einen externen Pulsar-Dienst verwendet.</li>
<li><code translate="no">endpoints</code>: Die Endpunkte von Pulsar.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Beispiel</h4><p>Das folgende Beispiel konfiguriert einen externen Pulsar-Dienst.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies: <span class="hljs-comment"># Optional</span>
    pulsar: <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external pulsar as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new pulsar inside the same kubernetes cluster for milvus.</span>
      external: true <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external pulsar endpoints if external=true</span>
      endpoints:
      - <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span>:<span class="hljs-number">6650</span>
  components: {}
  config: {}           
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-Pulsar" class="common-anchor-header">Interner Pulsar</h3><p><code translate="no">inCluster</code> zeigt an, dass beim Start eines Milvus-Clusters automatisch ein Pulsar-Dienst im Cluster gestartet wird.</p>
<h4 id="Example" class="common-anchor-header">Beispiel</h4><p>Das folgende Beispiel konfiguriert einen internen Pulsar-Dienst.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies:
    pulsar:
      inCluster:
        values:
          components:
            autorecovery: <span class="hljs-literal">false</span>
          zookeeper:
            replicaCount: 1
          bookkeeper:
            replicaCount: 1
            resoureces:
              <span class="hljs-built_in">limit</span>:
                cpu: <span class="hljs-string">&#x27;4&#x27;</span>
              memory: 8Gi
            requests:
              cpu: 200m
              memory: 512Mi
          broker:
            replicaCount: 1
            configData:
              <span class="hljs-comment">## Enable `autoSkipNonRecoverableData` since bookkeeper is running</span>
              <span class="hljs-comment">## without persistence</span>
              autoSkipNonRecoverableData: <span class="hljs-string">&quot;true&quot;</span>
              managedLedgerDefaultEnsembleSize: <span class="hljs-string">&quot;1&quot;</span>
              managedLedgerDefaultWriteQuorum: <span class="hljs-string">&quot;1&quot;</span>
              managedLedgerDefaultAckQuorum: <span class="hljs-string">&quot;1&quot;</span>
          proxy:
            replicaCount: 1
  components: {}
  config: {}            
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Dieses Beispiel gibt die Anzahl der Replikate jeder Komponente von Pulsar, die Rechenressourcen von Pulsar BookKeeper und andere Konfigurationen an.</div>
<div class="alert note">Die vollständigen Konfigurationseinträge zur Konfiguration eines internen Pulsar-Dienstes finden Sie in <a href="https://artifacthub.io/packages/helm/apache/pulsar/2.7.8?modal=values">values.yaml</a>. Fügen Sie die Konfigurationselemente nach Bedarf unter <code translate="no">pulsar.inCluster.values</code> hinzu, wie im vorangegangenen Beispiel gezeigt.</div>
<p>Unter der Annahme, dass die Konfigurationsdatei den Namen <code translate="no">milvuscluster.yaml</code> trägt, führen Sie den folgenden Befehl aus, um die Konfiguration anzuwenden.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka" class="common-anchor-header">Konfigurieren Sie Kafka<button data-href="#Configure-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar ist der Standardspeicher für Nachrichten in einem Milvus-Cluster. Wenn Sie Kafka verwenden möchten, fügen Sie das optionale Feld <code translate="no">msgStreamType</code> hinzu, um Kafka zu konfigurieren.</p>
<p><code translate="no">kafka</code> unterstützt <code translate="no">external</code> und <code translate="no">inCluster</code>.</p>
<h3 id="External-Kafka" class="common-anchor-header">Externes Kafka</h3><p><code translate="no">external</code> gibt die Verwendung eines externen Kafka-Dienstes an.</p>
<p>Folgende Felder werden zur Konfiguration eines externen Kafka-Dienstes verwendet:</p>
<ul>
<li><code translate="no">external</code>: Der Wert <code translate="no">true</code> zeigt an, dass Milvus einen externen Kafka-Dienst verwendet.</li>
<li><code translate="no">brokerList</code>: Die Liste der Makler, an die die Nachrichten gesendet werden sollen.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Beispiel</h4><p>Das folgende Beispiel konfiguriert einen externen Kafka-Dienst.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  config:
    kafka:
      <span class="hljs-comment"># securityProtocol supports: PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL </span>
      securityProtocol: PLAINTEXT
      <span class="hljs-comment"># saslMechanisms supports: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512</span>
      saslMechanisms: PLAIN
      saslUsername: <span class="hljs-string">&quot;&quot;</span>
      saslPassword: <span class="hljs-string">&quot;&quot;</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    <span class="hljs-comment"># Omit other fields ...</span>
    msgStreamType: <span class="hljs-string">&quot;kafka&quot;</span>
    kafka:
      external: true
      brokerList: 
        - <span class="hljs-string">&quot;kafkaBrokerAddr1:9092&quot;</span>
        - <span class="hljs-string">&quot;kafkaBrokerAddr2:9092&quot;</span>
        <span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>SASL-Konfigurationen werden in der Version operator v0.8.5 oder höher unterstützt.</p>
</blockquote>
<h3 id="Internal-Kafka" class="common-anchor-header">Internes Kafka</h3><p><code translate="no">inCluster</code> gibt an, dass beim Start eines Milvus-Clusters automatisch ein Kafka-Dienst im Cluster gestartet wird.</p>
<h4 id="Example" class="common-anchor-header">Beispiel</h4><p>Das folgende Beispiel konfiguriert einen internen Kafka-Dienst.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec: 
  dependencies:
    msgStreamType: <span class="hljs-string">&quot;kafka&quot;</span>
    kafka:
      inCluster: 
        values: {} <span class="hljs-comment"># values can be found in https://artifacthub.io/packages/helm/bitnami/kafka</span>
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<p><a href="https://artifacthub.io/packages/helm/bitnami/kafka">Hier</a> finden Sie die vollständige Konfiguration für einen internen Kafka-Dienst. Fügen Sie die Konfigurationselemente nach Bedarf unter <code translate="no">kafka.inCluster.values</code> hinzu.</p>
<p>Unter der Annahme, dass die Konfigurationsdatei den Namen <code translate="no">milvuscluster.yaml</code> trägt, führen Sie den folgenden Befehl aus, um die Konfiguration anzuwenden.</p>
<pre><code translate="no">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Erfahren Sie, wie Sie andere Milvus-Abhängigkeiten mit Milvus Operator konfigurieren können:</p>
<ul>
<li><a href="/docs/de/v2.4.x/object_storage_operator.md">Konfigurieren Sie Objektspeicher mit Milvus Operator</a></li>
<li><a href="/docs/de/v2.4.x/meta_storage_operator.md">Konfigurieren Sie Meta-Speicher mit Milvus Operator</a></li>
</ul>
