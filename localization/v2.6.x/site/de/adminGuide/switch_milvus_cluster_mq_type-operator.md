---
id: switch_milvus_cluster_mq_type-operator.md
summary: >-
  Erfahren Sie, wie Sie den Typ der Nachrichtenwarteschlange für einen
  Milvus-Cluster ändern können.
title: MQ-Typ für Milvus-Cluster wechseln
---
<h1 id="Switch-MQ-Type-for-Milvus-Cluster" class="common-anchor-header">MQ-Typ für Milvus-Cluster wechseln<button data-href="#Switch-MQ-Type-for-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Thema wird beschrieben, wie Sie den Message Queue (MQ)-Typ für eine bestehende Milvus-Cluster-Bereitstellung umschalten. Milvus unterstützt den Online-MQ-Wechsel zwischen Pulsar, Kafka und Woodpecker ohne Ausfallzeit.</p>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Eine laufende Milvus-Cluster-Instanz, die über <a href="/docs/de/v2.6.x/install_cluster-milvusoperator.md">Milvus Operator</a> oder <a href="/docs/de/v2.6.x/install_cluster-helm.md">Helm</a> installiert wurde.</li>
<li>Die Milvus-Instanz wurde auf die neueste Version aktualisiert, die diese MQ-Umschaltfunktion unterstützt.</li>
</ul>
<h2 id="Switch-from-PulsarKafka-to-Woodpecker-MinIO" class="common-anchor-header">Umschalten von Pulsar/Kafka auf Woodpecker (MinIO)<button data-href="#Switch-from-PulsarKafka-to-Woodpecker-MinIO" class="anchor-icon" translate="no">
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
    </button></h2><p>Führen Sie die folgenden Schritte aus, um den MQ-Typ von Pulsar oder Kafka zu Woodpecker mit MinIO-Speicher zu wechseln.</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">Schritt 1: Überprüfen Sie, ob die Milvus-Instanz läuft<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Stellen Sie vor der Umstellung sicher, dass Ihre Milvus-Cluster-Instanz ordnungsgemäß läuft. Sie können dies überprüfen, indem Sie eine Testsammlung erstellen, Daten einfügen und eine Abfrage ausführen.</p>
<h3 id="Step-2-Optional-Verify-Woodpecker-configuration" class="common-anchor-header">Schritt 2: (Optional) Überprüfen der Woodpecker-Konfiguration<button data-href="#Step-2-Optional-Verify-Woodpecker-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>In der Standardkonfiguration von Milvus ist der Woodpecker-Speichertyp bereits auf MinIO eingestellt, so dass in den meisten Fällen keine zusätzliche Konfiguration erforderlich ist.</p>
<p>Wenn Sie die Woodpecker-Konfiguration jedoch zuvor angepasst haben, müssen Sie sicherstellen, dass <code translate="no">woodpecker.storage.type</code> auf <code translate="no">minio</code> eingestellt ist. Aktualisieren Sie die Milvus-Konfiguration <strong>, ohne</strong> den Wert <code translate="no">mqType</code> zu ändern:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Für <strong>Helm</strong>: Anweisungen zur Aktualisierung der Konfiguration finden Sie unter <a href="/docs/de/v2.6.x/configure-helm.md">Konfigurieren von Milvus mit Helm Charts</a>.</li>
<li>Für <strong>Milvus Operator</strong> finden Sie Anweisungen zum Aktualisieren der Konfiguration unter <a href="/docs/de/v2.6.x/configure_operator.md">Konfigurieren von Milvus mit Milvus Operator</a>.</li>
</ul>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">Schritt 3: Führen Sie den MQ-Wechsel aus<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>Führen Sie den folgenden Befehl aus, um den Wechsel zu Woodpecker auszulösen:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Ersetzen Sie <code translate="no">&lt;mixcoord_addr&gt;</code> durch die tatsächliche Adresse Ihres MixCoord-Dienstes.</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">Schritt 4: Prüfen Sie, ob die Umstellung abgeschlossen ist<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>Der Umschaltvorgang wird automatisch abgeschlossen. Überwachen Sie die Milvus-Protokolle auf die folgenden Schlüsselmeldungen, um zu bestätigen, dass die Umstellung abgeschlossen ist:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>In den obigen Protokollmeldungen ist <code translate="no">&lt;MQ1&gt;</code> der Quell-MQ-Typ (z. B. <code translate="no">pulsar</code> oder <code translate="no">kafka</code>) und <code translate="no">&lt;MQ2&gt;</code> ist der Ziel-MQ-Typ (<code translate="no">woodpecker</code>).</p>
<ul>
<li>Die erste Meldung zeigt an, dass der WAL-Wechsel von der Quelle zum Ziel abgeschlossen ist.</li>
<li>Die zweite Meldung zeigt an, dass alle physischen Kanäle umgeschaltet wurden.</li>
<li>Die dritte Meldung zeigt an, dass die Konfiguration von <code translate="no">mq.type</code> in etcd aktualisiert wurde.</li>
</ul>
</div>
<h2 id="Switch-from-Woodpecker-MinIO-to-Pulsar-or-Kafka" class="common-anchor-header">Umschalten von Woodpecker (MinIO) auf Pulsar oder Kafka<button data-href="#Switch-from-Woodpecker-MinIO-to-Pulsar-or-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>Führen Sie die folgenden Schritte aus, um den MQ-Typ von Woodpecker zurück zu Pulsar oder Kafka zu wechseln.</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">Schritt 1: Überprüfen Sie, ob die Milvus-Instanz läuft<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Stellen Sie vor dem Wechsel sicher, dass Ihre Milvus-Cluster-Instanz ordnungsgemäß läuft.</p>
<h3 id="Step-2-Configure-the-target-MQ" class="common-anchor-header">Schritt 2: Konfigurieren Sie die Ziel-MQ<button data-href="#Step-2-Configure-the-target-MQ" class="anchor-icon" translate="no">
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
    </button></h3><p>Bevor Sie die Umschaltung auslösen, müssen Sie sicherstellen, dass der Ziel-MQ-Dienst (Pulsar oder Kafka) verfügbar ist und seine Zugriffskonfiguration in die Milvus-Konfiguration übernommen wird.</p>
<div class="alert note">
<p>Die genauen Schritte in diesem Abschnitt hängen davon ab, ob Sie einen internen (gebündelten) oder externen MQ-Dienst verwenden.</p>
</div>
<h4 id="Option-A-Internal-PulsarKafka-bundled-with-Helm" class="common-anchor-header">Option A: Interner Pulsar/Kafka (gebündelt mit Helm)</h4><p>Wenn Sie den gebündelten Pulsar oder Kafka verwenden, der von Helm bereitgestellt wird, aktualisieren Sie Ihre Helm-Version, um den Ziel-MQ-Dienst zu aktivieren und Woodpecker zu deaktivieren. Das Flag <code translate="no">streaming.enabled=true</code> ist erforderlich, um den Streaming-Knoten zu aktivieren, der eine Voraussetzung für die Funktion "Switch MQ" ist. Zum Beispiel, um zu Pulsar zu wechseln:</p>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release milvus/milvus \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Überprüfen Sie nach dem Upgrade, ob die Ziel-MQ-Zugangskonfiguration in die Milvus-Konfiguration übertragen wurde. Zum Beispiel für Pulsar:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;pulsar-proxy-address&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Option-B-Internal-PulsarKafka-managed-by-Milvus-Operator" class="common-anchor-header">Option B: Interner Pulsar/Kafka (von Milvus Operator verwaltet)</h4><p>Wenn Sie Milvus Operator verwenden, aktualisieren Sie die benutzerdefinierte Milvus-Ressource, um die Ziel-MQ-Zugangskonfiguration aufzunehmen. Einzelheiten zur Aktualisierung der Milvus-Konfiguration finden Sie unter <a href="/docs/de/v2.6.x/configure_operator.md">Konfigurieren von Milvus mit Milvus Operator</a>.</p>
<h4 id="Option-C-External-PulsarKafka" class="common-anchor-header">Option C: Externer Pulsar/Kafka</h4><p>Wenn Sie einen externen Pulsar- oder Kafka-Dienst verwenden, müssen Sie die <code translate="no">mqType</code> nicht ändern. Fügen Sie einfach die externe MQ-Zugangskonfiguration zu Ihrer <code translate="no">values.yaml</code> hinzu und starten Sie die Milvus-Instanz neu, um die Konfiguration zu rendern.</p>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">Schritt 3: Ausführen der MQ-Umschaltung<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>Führen Sie den folgenden Befehl aus, um den Wechsel zu Pulsar auszulösen (ersetzen Sie <code translate="no">pulsar</code> durch <code translate="no">kafka</code>, wenn Sie zu Kafka wechseln):</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Ersetzen Sie <code translate="no">&lt;mixcoord_addr&gt;</code> durch die tatsächliche Adresse Ihres MixCoord-Dienstes.</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">Schritt 4: Überprüfen Sie, ob der Wechsel abgeschlossen ist<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>Der Umstellungsprozess wird automatisch abgeschlossen. Überwachen Sie die Milvus-Protokolle auf die folgenden Schlüsselmeldungen, um zu bestätigen, dass die Umstellung abgeschlossen ist:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>In den obigen Protokollmeldungen steht <code translate="no">&lt;MQ1&gt;</code> für den Quell-MQ-Typ (<code translate="no">woodpecker</code>) und <code translate="no">&lt;MQ2&gt;</code> für den Ziel-MQ-Typ (z. B. <code translate="no">pulsar</code> oder <code translate="no">kafka</code>).</p>
<ul>
<li>Die erste Meldung zeigt an, dass der WAL-Wechsel von der Quelle zum Ziel abgeschlossen ist.</li>
<li>Die zweite Meldung zeigt an, dass alle physischen Kanäle umgeschaltet wurden.</li>
<li>Die dritte Meldung zeigt an, dass die Konfiguration von <code translate="no">mq.type</code> in etcd aktualisiert wurde.</li>
</ul>
</div>
