---
id: meta_storage_operator.md
title: Configurazione di Meta Storage con Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Scoprite come configurare il metaconservazione con Milvus Operator.
---
<h1 id="Configure-Meta-Storage-with-Milvus-Operator" class="common-anchor-header">Configurare la memorizzazione dei metadati con Milvus Operator<button data-href="#Configure-Meta-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utilizza etcd per memorizzare i metadati. Questo argomento illustra come configurare la dipendenza del meta storage quando si installa Milvus con Milvus Operator. Per maggiori dettagli, fate riferimento a <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/meta-storage.md">Configurare il meta storage con Milvus Operator</a> nel repository di Milvus Operator.</p>
<p>Questo argomento presuppone che sia stato distribuito Milvus Operator.</p>
<div class="alert note">Per ulteriori informazioni, vedere <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Distribuzione di Milvus Operator</a>. </div>
<p>È necessario specificare un file di configurazione per utilizzare Milvus Operator per avviare un cluster Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>È sufficiente modificare il modello di codice in <code translate="no">milvus_cluster_default.yaml</code> per configurare le dipendenze di terzi. Le sezioni seguenti illustrano come configurare rispettivamente object storage, etcd e Pulsar.</p>
<h2 id="Configure-etcd" class="common-anchor-header">Configurare etcd<button data-href="#Configure-etcd" class="anchor-icon" translate="no">
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
    </button></h2><p>Aggiungere i campi richiesti in <code translate="no">spec.dependencies.etcd</code> per configurare etcd.</p>
<p><code translate="no">etcd</code> supporta <code translate="no">external</code> e <code translate="no">inCluster</code>.</p>
<p>I campi utilizzati per configurare un servizio etcd esterno includono:</p>
<ul>
<li><code translate="no">external</code>: Un valore <code translate="no">true</code> indica che Milvus utilizza un servizio etcd esterno.</li>
<li><code translate="no">endpoints</code>: Gli endpoint di etcd.</li>
</ul>
<h3 id="External-etcd" class="common-anchor-header">etcd esterno</h3><h4 id="Example" class="common-anchor-header">Esempio</h4><p>L'esempio seguente configura un servizio etcd esterno.</p>
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
<h3 id="Internal-etcd" class="common-anchor-header">etcd interno</h3><p><code translate="no">inCluster</code> indica che all'avvio di un cluster Milvus, un servizio etcd si avvia automaticamente nel cluster.</p>
<h4 id="Example" class="common-anchor-header">Esempio</h4><p>L'esempio seguente configura un servizio etcd interno.</p>
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
<div class="alert note">L'esempio precedente specifica il numero di repliche come <code translate="no">5</code> e limita le risorse di calcolo per etcd.</div>
<div class="alert note">Le voci di configurazione complete per configurare un servizio etcd interno si trovano in <a href="https://github.com/bitnami/charts/blob/ba6f8356e725a8342fe738a3b73ae40d5488b2ad/bitnami/etcd/values.yaml">values.yaml</a>. Aggiungere le voci di configurazione necessarie sotto <code translate="no">etcd.inCluster.values</code>, come mostrato nell'esempio precedente.</div>
<p>Supponendo che il file di configurazione sia denominato <code translate="no">milvuscluster.yaml</code>, eseguire il comando seguente per applicare la configurazione.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Cosa succede dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Imparare a configurare altre dipendenze di Milvus con Milvus Operator:</p>
<ul>
<li><a href="/docs/it/v2.4.x/object_storage_operator.md">Configurare la memorizzazione degli oggetti con Milvus Operator</a></li>
<li><a href="/docs/it/v2.4.x/message_storage_operator.md">Configurazione della memorizzazione dei messaggi con Milvus Operator</a></li>
</ul>
