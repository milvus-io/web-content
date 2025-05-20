---
id: object_storage_operator.md
title: Configurazione dell'archiviazione a oggetti con Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Scoprite come configurare lo storage a oggetti con Milvus Operator.
---
<h1 id="Configure-Object-Storage-with-Milvus-Operator" class="common-anchor-header">Configurazione dell'archiviazione a oggetti con Milvus Operator<button data-href="#Configure-Object-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utilizza MinIO o S3 come storage di oggetti per conservare file di grandi dimensioni, come i file di indice e i log binari. Questo argomento spiega come configurare le dipendenze dello storage a oggetti quando si installa Milvus con Milvus Operator. Per maggiori dettagli, consultate <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md">Configurazione dello storage a oggetti con Milvus Operator</a> nel repository di Milvus Operator.</p>
<p>Questo argomento presuppone che abbiate installato Milvus Operator.</p>
<div class="alert note">Per ulteriori informazioni, vedere <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Distribuzione di Milvus Operator</a>. </div>
<p>È necessario specificare un file di configurazione per utilizzare Milvus Operator per avviare un cluster Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>È sufficiente modificare il modello di codice in <code translate="no">milvus_cluster_default.yaml</code> per configurare le dipendenze di terzi. Le sezioni seguenti illustrano come configurare rispettivamente object storage, etcd e Pulsar.</p>
<h2 id="Configure-object-storage" class="common-anchor-header">Configurare l'archiviazione degli oggetti<button data-href="#Configure-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Un cluster Milvus utilizza MinIO o S3 come archiviazione a oggetti per conservare file di grandi dimensioni, come i file di indice e i log binari. Aggiungere i campi richiesti sotto <code translate="no">spec.dependencies.storage</code> per configurare l'archiviazione a oggetti; le opzioni possibili sono <code translate="no">external</code> e <code translate="no">inCluster</code>.</p>
<h3 id="Internal-object-storage" class="common-anchor-header">Archiviazione interna degli oggetti</h3><p>Per impostazione predefinita, Milvus Operator distribuisce un MinIO interno al cluster per Milvus. Di seguito è riportato un esempio di configurazione per dimostrare come utilizzare questo MinIO come archivio oggetti interno.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    <span class="hljs-comment"># Omit other fields ...</span>
    storage:
      inCluster:
        values:
          mode: standalone
          resources:
            requests:
              memory: 100Mi
        deletionPolicy: Delete <span class="hljs-comment"># Delete | Retain, default: Retain</span>
        pvcDeletion: true <span class="hljs-comment"># default: false</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dopo aver applicato la configurazione di cui sopra, il MinIO in-cluster funzionerà in modalità standalone con un limite di memoria di 100Mi. Si noti che</p>
<ul>
<li><p>Il campo <code translate="no">deletionPolicy</code> specifica la politica di cancellazione del MinIO in-cluster. È predefinito su <code translate="no">Delete</code> e ha <code translate="no">Retain</code> come opzione alternativa.</p>
<ul>
<li><code translate="no">Delete</code> indica che il deposito di oggetti nel cluster viene cancellato quando si arresta l'istanza Milvus.</li>
<li><code translate="no">Retain</code> indica che il deposito di oggetti nel cluster viene mantenuto come servizio di dipendenza per gli avvii successivi dell'istanza Milvus.</li>
</ul></li>
<li><p>Il campo <code translate="no">pvcDeletion</code> specifica se cancellare il PVC (Persistent Volume Claim) quando il MinIO in-cluster viene cancellato.</p></li>
</ul>
<p>I campi di <code translate="no">inCluster.values</code> sono gli stessi di Milvus Helm Chart e si trovano <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">qui</a>.</p>
<h3 id="External-object-storage" class="common-anchor-header">Archiviazione esterna degli oggetti</h3><p>L'uso di <code translate="no">external</code> nel file YAML del modello indica l'uso di un servizio di archiviazione di oggetti esterno. Per utilizzare un object storage esterno, è necessario impostare correttamente i campi <code translate="no">spec.dependencies.storage</code> e <code translate="no">spec.config.minio</code> nel CRD di Milvus.</p>
<h4 id="Use-Amazon-Web-Service-AWS-S3-as-external-object-storage" class="common-anchor-header">Usare Amazon Web Service (AWS) S3 come archivio oggetti esterno</h4><ul>
<li><p>Configurare l'accesso ad AWS S3 per AK/SK</p>
<p>Di solito si può accedere a un bucket S3 tramite una coppia di chiavi di accesso e una chiave segreta di accesso. È possibile creare un oggetto <code translate="no">Secret</code> per memorizzarli in Kubernetes come segue:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: v1
kind: Secret
metadata:
  name: my-release-s3-secret
<span class="hljs-built_in">type</span>: Opaque
stringData:
  accesskey: &lt;my-access-key&gt;
  secretkey: &lt;my-secret-key&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Quindi è possibile configurare un bucket AWS S3 come storage esterno degli oggetti:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    minio:
      <span class="hljs-comment"># your bucket name</span>
      bucketName: &lt;my-bucket&gt;
      <span class="hljs-comment"># Optional, config the prefix of the bucket milvus will use</span>
      rootPath: milvus/my-release
      useSSL: true
  dependencies:
    storage:
      <span class="hljs-comment"># enable external object storage</span>
      external: true
      <span class="hljs-built_in">type</span>: S3 <span class="hljs-comment"># MinIO | S3</span>
      <span class="hljs-comment"># the endpoint of AWS S3</span>
      endpoint: s3.amazonaws.com:<span class="hljs-number">443</span>
      <span class="hljs-comment"># the secret storing the access key and secret key</span>
      secretRef: <span class="hljs-string">&quot;my-release-s3-secret&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Configurare l'accesso AWS S3 da AssumeRole</p>
<p>In alternativa, si può fare in modo che Milvus acceda al bucket AWS S3 utilizzando <a href="https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html">AssumeRole</a>, in modo da coinvolgere solo le credenziali temporanee invece del proprio AK/SK.</p>
<p>Se questo è ciò che si preferisce, è necessario preparare un ruolo sulla console AWS e ottenere il suo ARN, che di solito è sotto forma di <code translate="no">arn:aws:iam::&lt;your account id&gt;:role/&lt;role-name&gt;</code>.</p>
<p>Quindi creare un oggetto <code translate="no">ServiceAccount</code> per memorizzarlo in Kubernetes come segue:</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    eks.amazonaws.com/role-arn: &lt;my-role-arn&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Una volta impostato il tutto, fare riferimento a <code translate="no">ServiceAccount</code> nel file YAML del modello e impostare <code translate="no">spec.config.minio.useIAM</code> su <code translate="no">true</code> per abilitare AssumeRole.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
    <span class="hljs-comment"># use the above ServiceAccount</span>
    serviceAccountName: my-release-sa
  config:
    minio:
      <span class="hljs-comment"># enable AssumeRole</span>
      useIAM: true
      <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    storage:
      <span class="hljs-comment"># Omit other fields ...</span>
      <span class="hljs-comment"># Note: you must use regional endpoint here, otherwise the minio client that milvus uses will fail to connect</span>
      endpoint: s3.&lt;my-bucket-region&gt;.amazonaws.com:<span class="hljs-number">443</span>
      secretRef: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># we don&#x27;t need to specify the secret here</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h4 id="Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="common-anchor-header">Utilizzare Google Cloud Storage (GCS) come archivio oggetti esterno</h4><p>Lo storage di oggetti AWS S3 non è l'unica scelta possibile. È possibile utilizzare anche il servizio di archiviazione degli oggetti di altri fornitori di cloud pubblici, come Google Cloud.</p>
<ul>
<li><p>Configurazione dell'accesso a GCS da parte di AK/SK</p>
<p>La configurazione è per lo più simile a quella dell'utilizzo di AWS S3. È ancora necessario creare un oggetto <code translate="no">Secret</code> per memorizzare le credenziali in Kubernetes.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: v1
kind: Secret
metadata:
  name: my-release-gcp-secret
<span class="hljs-built_in">type</span>: Opaque
stringData:
  accesskey: &lt;my-access-key&gt;
  secretkey: &lt;my-secret-key&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Quindi, è sufficiente modificare <code translate="no">endpoint</code> in <code translate="no">storage.googleapis.com:443</code> e impostare <code translate="no">spec.config.minio.cloudProvider</code> in <code translate="no">gcp</code> come segue:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    minio:
      cloudProvider: gcp
  dependencies:
    storage:
      <span class="hljs-comment"># Omit other fields ...</span>
      endpoint: storage.googleapis.com:<span class="hljs-number">443</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Configurazione dell'accesso GCS per AssumeRole</p>
<p>Analogamente ad AWS S3, è possibile utilizzare <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">Workload Identity</a> per accedere a GCS con credenziali temporanee se si utilizza GKE come cluster Kubernetes.</p>
<p>L'annotazione di <code translate="no">ServiceAccount</code> è diversa da quella di AWS EKS. È necessario specificare il nome dell'account del servizio GCP invece dell'ARN del ruolo.</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    iam.gke.io/gcp-service-account: &lt;my-gcp-service-account-name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Quindi, è possibile configurare l'istanza Milvus per utilizzare il suddetto <code translate="no">ServiceAccount</code> e abilitare AssumeRole impostando <code translate="no">spec.config.minio.useIAM</code> su <code translate="no">true</code> come segue:</p>
<pre><code translate="no" class="language-YAML">labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
    <span class="hljs-comment"># use the above ServiceAccount</span>
    serviceAccountName: my-release-sa
  config:
    minio:
      cloudProvider: gcp
      <span class="hljs-comment"># enable AssumeRole</span>
      useIAM: true
      <span class="hljs-comment"># Omit other fields ...  </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Cosa fare dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Imparare a configurare le altre dipendenze di Milvus con Milvus Operator:</p>
<ul>
<li><a href="/docs/it/v2.4.x/meta_storage_operator.md">Configurare il Meta Storage con Milvus Operator</a></li>
<li><a href="/docs/it/v2.4.x/message_storage_operator.md">Configurare la memorizzazione dei messaggi con Milvus Operator</a></li>
</ul>
