---
id: scale-dependencies.md
title: Skalenabhängigkeiten
---
<h1 id="Scale-Milvus-Dependencies" class="common-anchor-header">Milvus-Abhängigkeiten skalieren<button data-href="#Scale-Milvus-Dependencies" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus stützt sich auf verschiedene Abhängigkeiten wie MinIO, Kafka, Pulsar und etcd. Die Skalierung dieser Komponenten kann die Anpassungsfähigkeit von Milvus an unterschiedliche Anforderungen verbessern.</p>
<div class="alert note">
<p>Für Milvus Operator-Benutzer: <a href="/docs/de/v2.4.x/object_storage_operator.md">Konfigurieren Sie Objektspeicher mit Milvus Operator</a>, <a href="/docs/de/v2.4.x/meta_storage_operator.md">Konfigurieren Sie Metaspeicher mit Milvus Operator</a> und <a href="/docs/de/v2.4.x/message_storage_operator.md">Konfigurieren Sie Nachrichtenspeicher mit Milvus Operator</a>.</p>
</div>
<h2 id="Scale-MinIO" class="common-anchor-header">MinIO skalieren<button data-href="#Scale-MinIO" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Increase-resources-per-MinIO-pod" class="common-anchor-header">Erhöhen Sie die Ressourcen pro MinIO-Pod</h3><p>Bei MinIO, einem von Milvus verwendeten Objektspeichersystem, können die CPU- und Speicherressourcen für jeden Pod erhöht werden.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
minio:
  resources:
     limits:
       cpu: <span class="hljs-number">2</span>
       memory: 8Gi
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Sie die Datei gespeichert haben, wenden Sie die Änderungen mit dem folgenden Befehl an:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Sie können die Festplattenkapazität für den MioIO-Cluster auch erhöhen, indem Sie den Wert von <code translate="no">spec.resources.requests.storage</code> für jeden MioIO Persistent Volume Claim (PVC) manuell ändern. Beachten Sie, dass Ihre Standardspeicherklasse eine Volume-Erweiterung ermöglichen sollte.</p>
<h3 id="Add-an-extra-MinIO-server-pool-Recommended" class="common-anchor-header">Fügen Sie einen zusätzlichen MinIO-Serverpool hinzu (empfohlen)</h3><p>Wir empfehlen Ihnen, einen zusätzlichen MioIO-Server-Pool für Ihre Milvus-Instanz hinzuzufügen.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yam;</span>
minio:
  zones: <span class="hljs-number">2</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Sie die Datei gespeichert haben, wenden Sie die Änderungen mit dem folgenden Befehl an:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Dadurch wird Ihrem MinIO-Cluster ein zusätzlicher Serverpool hinzugefügt, der es Milvus ermöglicht, auf der Grundlage der freien Festplattenkapazität jedes Serverpools in den MinIO-Serverpool zu schreiben. Wenn beispielsweise eine Gruppe von drei Pools über insgesamt 10 TiB freien Speicherplatz verfügt, der sich wie folgt auf die Pools verteilt:</p>
<table>
<thead>
<tr><th></th><th>Freier Speicherplatz</th><th>Schreibmöglichkeit</th></tr>
</thead>
<tbody>
<tr><td>Pool A</td><td>3 TiB</td><td>30% (3/10)</td></tr>
<tr><td>Pool B</td><td>2 TiB</td><td>20% (2/10)</td></tr>
<tr><td>Pool C</td><td>5 TiB</td><td>50% (5/10)</td></tr>
</tbody>
</table>
<div class="alert note">
<p>MinIO nimmt keine automatische Neuverteilung von Objekten auf neue Serverpools vor. Sie können bei Bedarf manuell einen Rebalance-Vorgang mit <code translate="no">mc admin rebalance</code> initiieren.</p>
</div>
<h2 id="Kafka" class="common-anchor-header">Kafka<button data-href="#Kafka" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Increase-resource-per-Kafka-broker-pod" class="common-anchor-header">Erhöhung der Ressourcen pro Kafka-Broker-Pod</h3><p>Erhöhen Sie die Kapazität des Kafka-Brokers, indem Sie die CPU- und Speicherressourcen für jeden Broker-Pod anpassen.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
kafka:
  resources:
     limits:
        cpu: <span class="hljs-number">2</span>
        memory: 12Gi
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Sie die Datei gespeichert haben, wenden Sie die Änderungen mit dem folgenden Befehl an:</p>
<pre><code translate="no" class="language-bash">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Sie können auch die Festplattenkapazität für den Kafka-Cluster erhöhen, indem Sie den Wert von <code translate="no">spec.resources.requests.storage</code> für jeden Kafka Persistent Volume Claim (PVC) manuell ändern. Stellen Sie sicher, dass Ihre Standardspeicherklasse eine Volume-Erweiterung zulässt.</p>
<h2 id="Add-an-extra-Kafka-broker-pool-Recommended" class="common-anchor-header">Fügen Sie einen zusätzlichen Kafka-Broker-Pool hinzu (empfohlen)<button data-href="#Add-an-extra-Kafka-broker-pool-Recommended" class="anchor-icon" translate="no">
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
    </button></h2><p>Wir empfehlen Ihnen, einen zusätzlichen Kafka-Server-Pool für Ihre Milvus-Instanz hinzuzufügen.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
kafka:
  replicaCount: <span class="hljs-number">4</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Sie die Datei gespeichert haben, wenden Sie die Änderungen mit dem folgenden Befehl an:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Dadurch wird Ihrem Kafka-Cluster ein zusätzlicher Broker hinzugefügt.</p>
<div class="alert note">
<p>Kafka gleicht die Themen nicht automatisch zwischen allen Brokern aus. Verteilen Sie Themen/Partitionen manuell auf alle Kafka-Broker, indem Sie <code translate="no">bin/kafka-reassign-partitions.sh</code> verwenden, nachdem Sie sich bei jedem Kafka-Broker-Pod angemeldet haben, falls erforderlich.</p>
</div>
<h2 id="Pulsar" class="common-anchor-header">Pulsar<button data-href="#Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar trennt Berechnungen und Speicher. Sie können die Kapazität von Pulsar-Brokern (Berechnungen) und Pulsar-Bookies (Speicher) unabhängig voneinander erhöhen.</p>
<h2 id="Increase-resources-per-Pulsar-broker-pod" class="common-anchor-header">Erhöhung der Ressourcen pro Pulsar-Broker-Pod<button data-href="#Increase-resources-per-Pulsar-broker-pod" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  broker:
    resources:
       limits:
         cpu: <span class="hljs-number">4</span>
         memory: 16Gi
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Sie die Datei gespeichert haben, wenden Sie die Änderungen mit dem folgenden Befehl an:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Increase-resources-per-Pulsar-bookie-pod" class="common-anchor-header">Ressourcen pro Pulsar-Bookie-Pod erhöhen<button data-href="#Increase-resources-per-Pulsar-bookie-pod" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  bookkeeper:
    resources:
       limits:
         cpu: <span class="hljs-number">4</span>
         memory: 16Gi
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Sie die Datei gespeichert haben, wenden Sie die Änderungen mit dem folgenden Befehl an:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Sie können die Festplattenkapazität für den Pulsar-Cluster auch erhöhen, indem Sie den Wert von <code translate="no">spec.resources.requests.storage</code> für den Persistent Volume Claim (PVC) jedes Pulsar-Bookies manuell ändern. Beachten Sie, dass Ihre Standardspeicherklasse eine Volume-Erweiterung zulassen sollte.</p>
<p>Ein Pulsar-Bookie-Pod hat zwei Arten von Speicher: <code translate="no">journal</code> und <code translate="no">legers</code>. Für den Speichertyp <code translate="no">journal</code> sollten Sie <code translate="no">ssd</code> oder <code translate="no">gp3</code> als Speicherklasse verwenden. Hier ist ein Beispiel für die Angabe der Speicherklasse für Pulsar Journal.</p>
<pre><code translate="no">pulsar:
  bookkeeper:
    volumes:
      journal:
        size: 20Gi
        storageClassName: gp3
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-an-extra-Pulsar-broker-pod" class="common-anchor-header">Hinzufügen eines zusätzlichen Pulsar-Broker-Pods</h3><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  broker:
    replicaCount: <span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Sie die Datei gespeichert haben, wenden Sie die Änderungen mit dem folgenden Befehl an:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-an-extra-Pulsar-bookie-pod-Recommended" class="common-anchor-header">Hinzufügen eines zusätzlichen Pulsar-Bookie-Pods (empfohlen)</h3><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  bookkeeper:
    replicaCount: <span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Sie die Datei gespeichert haben, wenden Sie die Änderungen mit dem folgenden Befehl an:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="etcd" class="common-anchor-header">etcd<button data-href="#etcd" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Increase-resources-per-etcd-pod-recommended" class="common-anchor-header">Erhöhen Sie die Ressourcen pro etcd-Pod (empfohlen)</h3><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
etcd:
  resources:
     limits:
       cpu: <span class="hljs-number">2</span>
       memory: 8Gi
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Sie die Datei gespeichert haben, wenden Sie die Änderungen mit dem folgenden Befehl an:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-extra-etcd-pods" class="common-anchor-header">Zusätzliche etcd-Pods hinzufügen</h3><p>Die Gesamtzahl der etcd-Pods sollte eine ungerade Zahl sein.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
etcd:
  replicaCount: <span class="hljs-number">5</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Sie die Datei gespeichert haben, wenden Sie die Änderungen mit dem folgenden Befehl an:</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
