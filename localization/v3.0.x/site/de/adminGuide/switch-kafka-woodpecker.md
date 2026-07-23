---
id: switch-kafka-woodpecker.md
title: Wechsel zwischen Kafka und Woodpecker
summary: >-
  Wechseln Sie die Nachrichtenwarteschlange eines Milvus-Clusters mithilfe von
  Helm oder Milvus Operator zwischen Kafka und Woodpecker.
---
<h1 id="Switch-between-Kafka-and-Woodpecker" class="common-anchor-header">Wechsel zwischen Kafka und Woodpecker<button data-href="#Switch-between-Kafka-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite wird beschrieben, wie Sie die Nachrichtenwarteschlange (MQ) eines <strong>Milvus-Clusters</strong> in beide Richtungen zwischen <strong>Kafka</strong> (integriert oder extern) und <strong>Woodpecker</strong> (MinIO-Backend) umschalten können. Informationen zum allgemeinen Arbeitsablauf und zu den Voraussetzungen finden Sie unter <a href="/docs/de/switch-mq-type.md">„MQ-Typ umschalten</a>“.</p>
<div class="alert note">
<p><strong>Voraussetzung:</strong> Die Funktion „MQ wechseln“ ist <strong>ab Milvus 3.0</strong> verfügbar. Aktualisieren Sie Ihre Milvus-Instanz auf Milvus 3.0 oder <strong>höher</strong>, bevor Sie beginnen – die Funktion ist in früheren Versionen nicht verfügbar.</p>
</div>
<div class="alert warning">
<p>Das Umschalten der Nachrichtenwarteschlange ist ein <strong>risikoreicher Vorgang</strong>. Wählen Sie den Abschnitt aus, der <strong>Ihrer</strong> Bereitstellungsmethode entspricht – <strong>„Mit Helm“</strong> oder <strong>„Mit Milvus Operator“</strong> – und befolgen Sie die Anweisungen von oben nach unten. Mischen Sie keine Helm- und Operator-Befehle.</p>
</div>
<h2 id="With-Helm" class="common-anchor-header">Mit Helm<button data-href="#With-Helm" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Kafka-to-Woodpecker-Helm" class="common-anchor-header">Wechsel von Kafka zu Woodpecker (Helm)<button data-href="#Switch-from-Kafka-to-Woodpecker-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Schritt 1: Überprüfen Sie, ob die Milvus-Instanz läuft.</strong> Stellen Sie sicher, dass Ihr Milvus-Cluster ordnungsgemäß funktioniert – beispielsweise durch das Erstellen einer Test-Sammlung, das Einfügen von Daten und das Ausführen einer Abfrage.</p>
<p><strong>Schritt 2: Führen Sie den MQ-Wechsel durch.</strong> Stellen Sie die MixCoord-Verwaltungsschnittstelle bereit und rufen Sie dann die Switch-API auf:</p>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>In einem anderen Terminal:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Schritt 3: Überprüfen Sie, ob der Wechsel abgeschlossen ist.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Bei einem erfolgreichen Wechsel wird „ <code translate="no">[mqTypeValue=woodpecker]</code> “ protokolliert.</p>
<p><strong>Schritt 4: (Optional) Stoppen Sie Kafka und führen Sie eine Bereinigung durch.</strong> Bei <strong>integriertem</strong> Kafka entfernen Sie die Kafka-Pods und deren PVCs. Bei <strong>externem</strong> Kafka bereinigen Sie die Milvus-Topics in der externen Kafka-Instanz – diese folgen dem Format <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code>.</p>
<div class="alert note">
<p>Wenn Sie später wieder zu Kafka zurückwechseln möchten, bereinigen Sie zunächst die Daten/Themen, um Konflikte zu vermeiden.</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Kafka-Helm" class="common-anchor-header">Wechsel von Woodpecker zu Kafka (Helm)<button data-href="#Switch-from-Woodpecker-to-Kafka-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Schritt 1: Überprüfen Sie, ob die Milvus-Instanz läuft.</strong></p>
<p><strong>Schritt 2: Konfigurieren Sie die Ziel-Kafka-Verbindung und starten Sie Milvus neu.</strong> Für den Wechsel muss Milvus die Kafka-Verbindung bereits kennen; schreiben Sie diese daher über ` <code translate="no">extraConfigFiles</code> ` in ` <code translate="no">user.yaml</code> ` und wenden Sie die Änderung mit ` <code translate="no">helm upgrade</code> ` an (wodurch die Pods neu gestartet werden). ` <code translate="no">streaming.enabled=true</code> ` ist für die „Switch MQ“-Funktion erforderlich. Details zu SASL/SSL finden Sie unter <a href="/docs/de/connect_kafka_ssl.md">„Verbindung zu Kafka mit SASL/SSL herstellen</a>“.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># values.yaml</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    kafka:
      brokerList:
        - &lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;
      saslUsername:
      saslPassword:
      saslMechanisms: PLAIN
      securityProtocol: SASL_SSL
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release zilliztech/milvus \
  --set kafka.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Warten Sie, bis alle Pods bereit sind, und überprüfen Sie anschließend, ob die Kafka-Zugriffskonfiguration in die Milvus-Konfiguration übernommen wurde.</p>
<p><strong>Schritt 3: Führen Sie den MQ-Wechsel durch.</strong></p>
<div class="alert note">
<p>Stellen Sie sicher, dass das Ziel-Kafka keine Milvus-Themen aus einer früheren Konfiguration enthält. Wenn dies Ihr erster Wechsel zu Kafka ist, überspringen Sie diesen Hinweis; andernfalls bereinigen Sie zunächst verbleibende Milvus-Themen mit denselben Namen.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>In einem anderen Terminal:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;kafka&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Schritt 4: Überprüfen Sie, ob der Wechsel abgeschlossen ist.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Bei einem erfolgreichen Wechsel wird Folgendes protokolliert: „ <code translate="no">[mqTypeValue=kafka]</code> “.</p>
<p><strong>Schritt 5: (Optional) Woodpecker-Daten bereinigen.</strong> Löschen Sie die Woodpecker-Daten auf MinIO/S3 (unter „ <code translate="no">&lt;rootPath&gt;/wp/...</code> “, typischerweise „ <code translate="no">files/wp/...</code> “) sowie die Woodpecker-Metadaten in etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). Wenn Sie später wieder zu Woodpecker zurückwechseln möchten, bereinigen Sie diese Dateien zunächst.</p>
<h2 id="With-Milvus-Operator" class="common-anchor-header">Mit dem Milvus Operator<button data-href="#With-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Kafka-to-Woodpecker-Milvus-Operator" class="common-anchor-header">Wechsel von Kafka zu Woodpecker (Milvus Operator)<button data-href="#Switch-from-Kafka-to-Woodpecker-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Schritt 1: Überprüfen Sie, ob die Milvus-Instanz läuft.</strong></p>
<p><strong>Schritt 2: Führen Sie den MQ-Wechsel durch.</strong> Da der MixCoord-Dienst nicht öffentlich zugänglich ist, führen Sie die Switch-API aus dem MixCoord-Pod heraus aus:</p>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Schritt 3: Überprüfen Sie, ob der Wechsel abgeschlossen ist.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Bei einem erfolgreichen Wechsel wird „ <code translate="no">[mqTypeValue=woodpecker]</code> “ protokolliert.</p>
<p><strong>Schritt 4: Aktualisieren Sie den MQ-Typ im Operator.</strong> Passen Sie die vom Operator verwaltete Konfiguration an, damit der Operator die Umstellung nicht rückgängig macht. Erstellen Sie „ <code translate="no">change_configmap.yaml</code> “:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p><strong>Schritt 5: (Optional) Stoppen Sie Kafka und führen Sie eine Bereinigung durch.</strong> Bei <strong>integriertem</strong> Kafka entfernen Sie die Kafka-Pods und deren PVCs. Bei <strong>externem</strong> Kafka bereinigen Sie die Milvus-Themen (Format: <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code>).</p>
<h3 id="Switch-from-Woodpecker-to-Kafka-Milvus-Operator" class="common-anchor-header">Wechsel von Woodpecker zu Kafka (Milvus-Operator)<button data-href="#Switch-from-Woodpecker-to-Kafka-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Schritt 1: Überprüfen Sie, ob die Milvus-Instanz läuft.</strong></p>
<p><strong>Schritt 2: Konfigurieren Sie die Verbindung zum Ziel-Kafka und starten Sie Milvus neu.</strong> Tragen Sie die Kafka-Verbindung unter <code translate="no">spec.config</code> ein (der Operator wandelt <code translate="no">spec.config</code> in <code translate="no">user.yaml</code> um) und legen Sie den MQ-Typ fest; durch das Anwenden des CR werden die Pods mit der neuen Konfiguration neu gestartet. Details zu SASL/SSL finden Sie unter <a href="/docs/de/connect_kafka_ssl.md">„Verbindung zu Kafka mit SASL/SSL herstellen</a>“.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change_configmap.yaml</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-attr">brokerList:</span>
        <span class="hljs-bullet">-</span> <span class="hljs-string">&lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;</span>
      <span class="hljs-attr">saslUsername:</span>
      <span class="hljs-attr">saslPassword:</span>
      <span class="hljs-attr">saslMechanisms:</span> <span class="hljs-string">PLAIN</span>
      <span class="hljs-attr">securityProtocol:</span> <span class="hljs-string">SASL_SSL</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">kafka</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p>Warten Sie, bis alle Pods bereit sind, und überprüfen Sie anschließend, ob die Kafka-Zugriffskonfiguration in die Milvus-Konfiguration übernommen wurde.</p>
<p><strong>Schritt 3: Führen Sie den MQ-Wechsel durch.</strong></p>
<div class="alert note">
<p>Stellen Sie sicher, dass das Ziel-Kafka keine Milvus-Themen aus einer früheren Konfiguration enthält. Wenn dies Ihr erster Wechsel zu Kafka ist, überspringen Sie diesen Hinweis; andernfalls bereinigen Sie zunächst verbleibende Milvus-Themen mit denselben Namen.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;kafka&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Schritt 4: Überprüfen Sie, ob der Wechsel abgeschlossen ist.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Bei einem erfolgreichen Wechsel wird „ <code translate="no">[mqTypeValue=kafka]</code> “ protokolliert.</p>
<p><strong>Schritt 5: (Optional) Woodpecker-Daten bereinigen.</strong> Löschen Sie die Woodpecker-Daten auf MinIO/S3 (unter „ <code translate="no">&lt;rootPath&gt;/wp/...</code> “, typischerweise „ <code translate="no">files/wp/...</code> “) sowie die Woodpecker-Metadaten in etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). Wenn Sie später wieder zu Woodpecker zurückwechseln möchten, bereinigen Sie diese Dateien zunächst.</p>
<h2 id="Supported-scenarios" class="common-anchor-header">Unterstützte Szenarien<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Quell-MQ</th><th>Ziel-MQ</th><th>Helm</th><th>Milvus-Operator</th></tr>
</thead>
<tbody>
<tr><td>Integriertes Kafka</td><td>Woodpecker (MinIO)</td><td><strong>Unterstützt</strong></td><td><strong>Unterstützt</strong></td></tr>
<tr><td>Externes Kafka</td><td>Woodpecker (MinIO)</td><td><strong>Unterstützt</strong></td><td><strong>Unterstützt</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Externes Kafka</td><td><strong>Unterstützt</strong></td><td><strong>Unterstützt</strong></td></tr>
<tr><td>Kafka</td><td>Woodpecker (lokal)</td><td><strong>Unterstützt, aber nicht empfohlen</strong> (alle Pods benötigen ein gemeinsames Dateisystem)</td><td><strong>Nicht unterstützt</strong></td></tr>
</tbody>
</table>
