---
id: meta_storage_operator.md
title: Konfigurieren Sie Meta Storage mit Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: 'Erfahren Sie, wie Sie Metaspeicher mit Milvus Operator konfigurieren können.'
---
<h1 id="Configure-Meta-Storage-with-Milvus-Operator" class="common-anchor-header">Metaspeicher mit Milvus Operator konfigurieren<button data-href="#Configure-Meta-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus verwendet etcd zum Speichern von Metadaten. In diesem Thema wird beschrieben, wie Sie die Metaspeicher-Abhängigkeit konfigurieren, wenn Sie Milvus mit Milvus Operator installieren. Weitere Details finden Sie unter <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/meta-storage.md">Konfigurieren des Metaspeichers mit Milvus Operator</a> im Milvus Operator Repository.</p>
<p>Dieses Thema setzt voraus, dass Sie Milvus Operator installiert haben.</p>
<div class="alert note">Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Bereitstellen von Milvus Operator</a>. </div>
<p>Sie müssen eine Konfigurationsdatei für die Verwendung von Milvus Operator angeben, um einen Milvus-Cluster zu starten.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sie müssen nur die Codevorlage in <code translate="no">milvus_cluster_default.yaml</code> bearbeiten, um die Abhängigkeiten von Dritten zu konfigurieren. In den folgenden Abschnitten wird die Konfiguration von Objektspeicher, etcd und Pulsar beschrieben.</p>
<h2 id="Configure-etcd" class="common-anchor-header">Konfigurieren von etcd<button data-href="#Configure-etcd" class="anchor-icon" translate="no">
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
    </button></h2><p>Fügen Sie die erforderlichen Felder unter <code translate="no">spec.dependencies.etcd</code> hinzu, um etcd zu konfigurieren.</p>
<p><code translate="no">etcd</code> unterstützt <code translate="no">external</code> und <code translate="no">inCluster</code>.</p>
<p>Zu den Feldern, die zur Konfiguration eines externen etcd-Dienstes verwendet werden, gehören:</p>
<ul>
<li><code translate="no">external</code>: Der Wert <code translate="no">true</code> zeigt an, dass Milvus einen externen etcd-Dienst verwendet.</li>
<li><code translate="no">endpoints</code>: Die Endpunkte von etcd.</li>
</ul>
<h3 id="External-etcd" class="common-anchor-header">Externer etcd</h3><h4 id="Example" class="common-anchor-header">Beispiel</h4><p>Das folgende Beispiel konfiguriert einen externen etcd-Dienst.</p>
<pre><code translate="no" class="language-YAML">kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies: <span class="hljs-comment"># Optional</span>
    etcd: <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external etcd as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new etcd inside the same kubernetes cluster for milvus.</span>
      external: true <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external etcd endpoints if external=true</span>
      endpoints:
      - <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span>:<span class="hljs-number">2379</span>
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-etcd" class="common-anchor-header">Interner etcd</h3><p><code translate="no">inCluster</code> gibt an, dass beim Start eines Milvus-Clusters automatisch ein etcd-Dienst im Cluster gestartet wird.</p>
<h4 id="Example" class="common-anchor-header">Beispiel</h4><p>Das folgende Beispiel konfiguriert einen internen etcd-Dienst.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies:
    etcd:
      inCluster:
        values:
          replicaCount: 5
          resources:
            limits: 
              cpu: <span class="hljs-string">&#x27;4&#x27;</span>
              memory: 8Gi
            requests:
              cpu: 200m
              memory: 512Mi
  components: {}
  config: {}              
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Das vorangehende Beispiel gibt die Anzahl der Replikate als <code translate="no">5</code> an und begrenzt die Rechenressourcen für etcd.</div>
<div class="alert note">Die vollständigen Konfigurationselemente zur Konfiguration eines internen etcd-Dienstes finden Sie in <a href="https://github.com/bitnami/charts/blob/ba6f8356e725a8342fe738a3b73ae40d5488b2ad/bitnami/etcd/values.yaml">values.yaml</a>. Fügen Sie unter <code translate="no">etcd.inCluster.values</code> die erforderlichen Konfigurationseinträge hinzu, wie im vorangegangenen Beispiel gezeigt.</div>
<p>Unter der Annahme, dass die Konfigurationsdatei den Namen <code translate="no">milvuscluster.yaml</code> trägt, führen Sie den folgenden Befehl aus, um die Konfiguration anzuwenden.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
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
<li><a href="/docs/de/v2.4.x/object_storage_operator.md">Konfigurieren von Objektspeicher mit Milvus Operator</a></li>
<li><a href="/docs/de/v2.4.x/message_storage_operator.md">Konfigurieren Sie den Nachrichtenspeicher mit Milvus Operator</a></li>
</ul>
