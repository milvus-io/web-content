---
id: switch-pulsar-woodpecker.md
title: Wechsel zwischen Pulsar und Woodpecker
summary: >-
  Wechseln Sie die Nachrichtenwarteschlange eines Milvus-Clusters mithilfe von
  Helm oder Milvus Operator zwischen Pulsar und Woodpecker.
---
<h1 id="Switch-between-Pulsar-and-Woodpecker" class="common-anchor-header">Wechsel zwischen Pulsar und Woodpecker<button data-href="#Switch-between-Pulsar-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite wird beschrieben, wie Sie die Nachrichtenwarteschlange (MQ) eines <strong>Milvus-Clusters</strong> in beide Richtungen zwischen <strong>Pulsar</strong> (integriert oder extern) und <strong>Woodpecker</strong> (MinIO-Backend) umschalten können. Informationen zum allgemeinen Arbeitsablauf und zu den Voraussetzungen finden Sie unter <a href="/docs/de/switch-mq-type.md">„MQ-Typ umschalten</a>“.</p>
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
    </button></h2><h3 id="Switch-from-Pulsar-to-Woodpecker-Helm" class="common-anchor-header">Wechsel von Pulsar zu Woodpecker (Helm)<button data-href="#Switch-from-Pulsar-to-Woodpecker-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Schritt 1: Überprüfen Sie, ob die Milvus-Instanz läuft.</strong> Stellen Sie sicher, dass Ihr Milvus-Cluster ordnungsgemäß funktioniert – beispielsweise indem Sie eine Testkollektion erstellen, Daten einfügen und eine Abfrage ausführen.</p>
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
<p><strong>Schritt 4: (Optional) Pulsar anhalten und bereinigen.</strong> Deaktivieren Sie bei <strong>integriertem</strong> Pulsar Pulsar und aktivieren Sie Woodpecker; löschen Sie anschließend die Pulsar-PVCs:</p>
<pre><code translate="no" class="language-shell">helm upgrade my-release zilliztech/milvus \
  --set image.all.tag=v3.0-beta \
  --set pulsarv3.enabled=false \
  --set woodpecker.enabled=true \
  --set streaming.enabled=true \
  --set indexNode.enabled=false
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl get pvc | grep my-release-pulsarv3
kubectl delete pvc &lt;pulsar-pvc-name&gt; ...
<button class="copy-code-btn"></button></code></pre>
<p>Bei <strong>externem</strong> Pulsar bereinigen Sie die Milvus-Themen in der externen Pulsar-Instanz. Milvus-Themen folgen dem Format <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code> (zum Beispiel <code translate="no">by-dev-rootcoord-dml_10_464633776992639586v0</code>).</p>
<div class="alert note">
<p>Wenn Sie später wieder zu Pulsar wechseln möchten, bereinigen Sie zunächst die Daten/Themen, um Konflikte zu vermeiden. Aufgrund von Einschränkungen des Helm-Charts ist ein Wechsel zurück zu einer <strong>integrierten</strong> Pulsar-Instanz derzeit nicht möglich.</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Pulsar-Helm" class="common-anchor-header">Wechsel von Woodpecker zu Pulsar (Helm)<button data-href="#Switch-from-Woodpecker-to-Pulsar-Helm" class="anchor-icon" translate="no">
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
<p><strong>Schritt 2: Konfigurieren Sie die Zielverbindung zu Pulsar und starten Sie Milvus neu.</strong> Für den Wechsel muss Milvus die Pulsar-Verbindung bereits kennen. Tragen Sie diese daher über <code translate="no">extraConfigFiles</code> in „ <code translate="no">user.yaml</code> “ ein und wenden Sie die Änderung mit „ <code translate="no">helm upgrade</code> “ an (wodurch die Pods neu gestartet werden). „ <code translate="no">streaming.enabled=true</code> “ ist für die Switch-MQ-Funktion erforderlich.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># values.yaml</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    pulsar:
      address: &lt;pulsar addr&gt;
      port: &lt;pulsar port, e.g. 6650&gt;
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release zilliztech/milvus \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Warten Sie, bis alle Pods bereit sind, und überprüfen Sie anschließend, ob die Pulsar-Zugriffskonfiguration in die Milvus-Konfiguration übernommen wurde.</p>
<p><strong>Schritt 3: Führen Sie den MQ-Wechsel durch.</strong></p>
<div class="alert note">
<p>Stellen Sie sicher, dass der Ziel-Pulsar keine Milvus-Themen aus einer früheren Konfiguration enthält. Wenn dies Ihr erster Wechsel zu Pulsar ist, überspringen Sie diesen Hinweis; andernfalls bereinigen Sie zunächst verbleibende Milvus-Themen mit denselben Namen.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>In einem anderen Terminal:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Schritt 4: Überprüfen Sie, ob der Wechsel abgeschlossen ist.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Bei einem erfolgreichen Wechsel wird Folgendes protokolliert: „ <code translate="no">[mqTypeValue=pulsar]</code> “.</p>
<p><strong>Schritt 5: (Optional) Woodpecker-Daten bereinigen.</strong> Löschen Sie die Woodpecker-Daten auf MinIO/S3 (unter „ <code translate="no">&lt;rootPath&gt;/wp/...</code> “, typischerweise „ <code translate="no">files/wp/...</code> “) sowie die Woodpecker-Metadaten in etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). Wenn Sie später wieder zu Woodpecker zurückwechseln möchten, bereinigen Sie diese Dateien zunächst.</p>
<h2 id="With-Milvus-Operator" class="common-anchor-header">Mit dem Milvus-Operator<button data-href="#With-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Pulsar-to-Woodpecker-Milvus-Operator" class="common-anchor-header">Wechsel von Pulsar zu Woodpecker (Milvus Operator)<button data-href="#Switch-from-Pulsar-to-Woodpecker-Milvus-Operator" class="anchor-icon" translate="no">
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
<p><strong>Schritt 2: Führen Sie den MQ-Wechsel durch.</strong> Da der MixCoord-Dienst nicht nach außen zugänglich ist, führen Sie die Switch-API innerhalb des MixCoord-Pods aus:</p>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Schritt 3: Überprüfen Sie, ob der Wechsel abgeschlossen ist.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Bei einem erfolgreichen Wechsel wird „ <code translate="no">[mqTypeValue=woodpecker]</code> “ protokolliert.</p>
<p><strong>Schritt 4: Aktualisieren Sie den MQ-Typ im Operator.</strong> Aktualisieren Sie die vom Operator verwaltete Konfiguration, damit der Operator den Wechsel nicht rückgängig macht. Erstellen Sie „ <code translate="no">change_configmap.yaml</code> “:</p>
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
<p><strong>Schritt 5: (Optional) Pulsar anhalten und bereinigen.</strong> Bei <strong>integriertem</strong> Pulsar deinstallieren Sie die Pulsar-Version und löschen Sie deren PVCs:</p>
<pre><code translate="no" class="language-shell">helm uninstall my-release-pulsar
kubectl get pvc | grep my-release-pulsar
kubectl delete pvc &lt;pulsar-pvc-name&gt; ...
<button class="copy-code-btn"></button></code></pre>
<p>Bei <strong>externem</strong> Pulsar bereinigen Sie die Milvus-Themen (Format „ <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code> “).</p>
<div class="alert note">
<p>Wenn Sie später wieder zu Pulsar zurückwechseln möchten, bereinigen Sie zunächst die Daten/Themen, um Konflikte zu vermeiden. Aufgrund von Einschränkungen des Helm-Charts ist ein Rückwechsel zu einer <strong>integrierten</strong> Pulsar-Instanz derzeit nicht möglich.</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Pulsar-Milvus-Operator" class="common-anchor-header">Wechsel von Woodpecker zu Pulsar (Milvus-Operator)<button data-href="#Switch-from-Woodpecker-to-Pulsar-Milvus-Operator" class="anchor-icon" translate="no">
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
<p><strong>Schritt 2: Konfigurieren Sie die Verbindung zur Ziel-Pulsar-Instanz und starten Sie Milvus neu.</strong> Tragen Sie die Pulsar-Verbindung unter „ <code translate="no">spec.config</code> “ ein (der Operator wandelt „ <code translate="no">spec.config</code> “ in „ <code translate="no">user.yaml</code> “ um) und legen Sie den MQ-Typ fest; durch das Anwenden des CR werden die Pods mit der neuen Konfiguration neu gestartet.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change_configmap.yaml</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">pulsar:</span>
      <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;pulsar</span> <span class="hljs-string">addr&gt;</span>
      <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;pulsar</span> <span class="hljs-string">port,</span> <span class="hljs-string">e.g.</span> <span class="hljs-number">6650</span><span class="hljs-string">&gt;
  dependencies:
    msgStreamType: pulsar
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p>Warten Sie, bis alle Pods bereit sind, und überprüfen Sie anschließend, ob die Pulsar-Zugriffskonfiguration in die Milvus-Konfiguration übernommen wurde.</p>
<p><strong>Schritt 3: Führen Sie den MQ-Wechsel durch.</strong></p>
<div class="alert note">
<p>Stellen Sie sicher, dass der Ziel-Pulsar keine Milvus-Themen aus einer früheren Konfiguration enthält. Wenn dies Ihr erster Wechsel zu Pulsar ist, überspringen Sie diesen Hinweis; andernfalls bereinigen Sie zunächst verbleibende Milvus-Themen mit denselben Namen.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Schritt 4: Überprüfen Sie, ob der Wechsel abgeschlossen ist.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Bei einer erfolgreichen Umstellung wird Folgendes protokolliert: „ <code translate="no">[mqTypeValue=pulsar]</code> “.</p>
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
<tr><td>Integriertes Pulsar</td><td>Woodpecker (MinIO)</td><td><strong>Unterstützt</strong></td><td><strong>Unterstützt</strong></td></tr>
<tr><td>Externer Pulsar</td><td>Woodpecker (MinIO)</td><td><strong>Unterstützt</strong></td><td><strong>Unterstützt</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Externer Pulsar</td><td><strong>Unterstützt</strong></td><td><strong>Unterstützt</strong></td></tr>
<tr><td>Pulsar</td><td>Woodpecker (lokal)</td><td><strong>Unterstützt, aber nicht empfohlen</strong> (alle Pods benötigen ein gemeinsames Dateisystem)</td><td><strong>Nicht unterstützt</strong></td></tr>
</tbody>
</table>
