---
id: gcp.md
title: Distribuzione di un cluster Milvus su GKE
related_key: cluster
summary: Imparare a distribuire un cluster Milvus su GKE.
---
<h1 id="Deploy-a-Milvus-Cluster-on-GKE" class="common-anchor-header">Distribuzione di un cluster Milvus su GKE<button data-href="#Deploy-a-Milvus-Cluster-on-GKE" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus è un database vettoriale cloud-native e può essere distribuito su vari ambienti cloud. Questa guida illustra tutti i dettagli della configurazione di Milvus su Google Cloud Platform (GCP).</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/gcp-networking.png" alt="Deploy a Milvus cluster on GCP" class="doc-image" id="deploy-a-milvus-cluster-on-gcp" />
   </span> <span class="img-wrapper"> <span>Distribuzione di un cluster Milvus su GCP</span> </span></p>
<h2 id="Before-you-start" class="common-anchor-header">Prima di iniziare<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Per distribuire Milvus su GCP, assicuratevi che</p>
<ul>
<li><p>Esista già un progetto nel vostro account GCP.</p>
<p>Per creare un progetto, fate riferimento a <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">Creazione e gestione dei progetti</a>. Il nome del progetto utilizzato in questa guida è <strong>milvus-testing-nonprod</strong>.</p></li>
<li><p>Avete installato localmente <a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">gcloud CLI</a>, <a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a> e <a href="https://helm.sh/docs/intro/install/">Helm</a> o avete deciso di utilizzare la <a href="https://cloud.google.com/shell">Cloud Shell</a> basata su browser.</p></li>
<li><p>Avete <a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">inizializzato la gcloud CLI</a> con le credenziali del vostro account GCP.</p></li>
</ul>
<h2 id="Set-up-the-network" class="common-anchor-header">Configurazione della rete<button data-href="#Set-up-the-network" class="anchor-icon" translate="no">
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
    </button></h2><p>Per garantire la sicurezza di Milvus, è necessario creare una rete virtuale logicamente isolata nel progetto GCP. Il comando seguente crea una VPC.</p>
<pre><code translate="no" class="language-bash">gcloud compute networks create milvus-network \
    --project=milvus-testing-nonprod \
    --subnet-mode=auto \
    --mtu=1460 \
    --bgp-routing-mode=regional
<button class="copy-code-btn"></button></code></pre>
<p>Per facilitare il lavoro, è necessario impostare diverse regole firewall per consentire il traffico esterno su ICMP, RDP e SSH e il traffico all'interno della VPC.</p>
<pre><code translate="no" class="language-bash">gcloud compute firewall-rules create milvus-network-allow-icmp \
    --project=milvus-testing-nonprod \
    --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network \
    --description=<span class="hljs-string">&quot;Allows ICMP connections from any source to any instance on the network.&quot;</span> \
    --direction=INGRESS \
    --priority=<span class="hljs-number">65534</span> \
    --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span> \
    --action=ALLOW \
    --rules=icmp

gcloud compute firewall-rules create milvus-network-allow-internal \
    --project=milvus-testing-nonprod \
    --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network \
    --description=<span class="hljs-string">&quot;Allows connections from any source in the network IP range to any instance on the network using all protocols.&quot;</span> \
    --direction=INGRESS \
    --priority=<span class="hljs-number">65534</span> \
    --source-ranges=<span class="hljs-number">10.128</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">9</span> \
    --action=ALLOW --rules=<span class="hljs-built_in">all</span>

gcloud compute firewall-rules create milvus-network-allow-rdp \
    --project=milvus-testing-nonprod \
    --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network \
    --description=<span class="hljs-string">&quot;Allows RDP connections from any source to any instance on the network using port 3389.&quot;</span> \
    --direction=INGRESS \
    --priority=<span class="hljs-number">65534</span> \
    --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span> \
    --action=ALLOW \
    --rules=tcp:<span class="hljs-number">3389</span>

gcloud compute firewall-rules create milvus-network-allow-ssh \
    --project=milvus-testing-nonprod \
    --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network \
    --description=<span class="hljs-string">&quot;Allows TCP connections from any source to any instance on the network using port 22.&quot;</span> \
    --direction=INGRESS \
    --priority=<span class="hljs-number">65534</span> \
    --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span> \
    --action=ALLOW \
    --rules=tcp:<span class="hljs-number">22</span>
<button class="copy-code-btn"></button></code></pre>
<p>Infine, è necessario consentire il traffico in entrata all'istanza Milvus che creeremo in seguito sulla porta <strong>19530</strong>.</p>
<pre><code translate="no" class="language-bash">gcloud compute firewall-rules create allow-milvus-<span class="hljs-keyword">in</span> \
    --project=milvus-testing-nonprod  \
    --description=<span class="hljs-string">&quot;Allow ingress traffic for Milvus on port 19530&quot;</span> \
    --direction=<span class="hljs-variable constant_">INGRESS</span> \
    --priority=<span class="hljs-number">1000</span> \
    --network=projects/milvus-testing-nonprod/<span class="hljs-variable language_">global</span>/networks/milvus-network \
    --action=<span class="hljs-variable constant_">ALLOW</span> \
    --rules=<span class="hljs-attr">tcp</span>:<span class="hljs-number">19530</span> \
    --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Provision-a-Kubernetes-cluster" class="common-anchor-header">Provisionare un cluster Kubernetes<button data-href="#Provision-a-Kubernetes-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>In questa guida utilizzeremo il servizio Google Kubernetes Engine (GKE) per eseguire il provisioning di un cluster Kubernetes con due nodi nella zona <strong>us-west1-a</strong>. Ogni nodo è una macchina virtuale <strong>e2-standard-4</strong> Compute Engine che esegue l'immagine <strong>COS_CONTAINERD</strong>.</p>
<div class="alert note">
<p>Si consiglia di utilizzare macchine con una memoria minima di 16 GB per garantire la stabilità del servizio.</p>
</div>
<pre><code translate="no" class="language-bash">gcloud container clusters create <span class="hljs-string">&quot;milvus-cluster-1&quot;</span> \
    --project <span class="hljs-string">&quot;milvus-testing-nonprod&quot;</span> \
    --zone <span class="hljs-string">&quot;us-west1-a&quot;</span> \
    --workload-pool <span class="hljs-string">&quot;milvus-testing-nonprod.svc.id.goog&quot;</span> \
    --no-enable-basic-auth \
    --cluster-version <span class="hljs-string">&quot;1.28.10-gke.1075001&quot;</span> \
    --release-channel <span class="hljs-string">&quot;regular&quot;</span> \
    --machine-<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;c2-standard-4&quot;</span> \
    --image-<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;COS_CONTAINERD&quot;</span> \
    --disk-<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;pd-standard&quot;</span> \
    --disk-size <span class="hljs-string">&quot;100&quot;</span> \
    --<span class="hljs-built_in">max</span>-pods-per-node <span class="hljs-string">&quot;110&quot;</span> \
    --num-nodes <span class="hljs-string">&quot;3&quot;</span> \
    --enable-ip-alias \
    --network <span class="hljs-string">&quot;projects/milvus-testing-nonprod/global/networks/milvus-network&quot;</span> \
    --subnetwork <span class="hljs-string">&quot;projects/milvus-testing-nonprod/regions/us-west1/subnetworks/milvus-network&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>L'avvio del cluster Kubernetes richiede un paio di minuti. Una volta che il cluster è pronto, utilizzare il seguente comando per ottenere le sue credenziali in modo da poter eseguire i comandi <code translate="no">kubectl</code> nel terminale per comunicare con il cluster da remoto.</p>
<pre><code translate="no" class="language-bash">gcloud container clusters <span class="hljs-keyword">get</span>-credentials milvus-cluster<span class="hljs-number">-1</span> --zone <span class="hljs-string">&quot;us-west1-a&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="common-anchor-header">Usare Google Cloud Storage (GCS) come archivio oggetti esterno<button data-href="#Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="anchor-icon" translate="no">
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
<li>Creare il bucket.</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud storage buckets create <span class="hljs-attr">gs</span>:<span class="hljs-comment">//milvus-testing-nonprod --project=milvus-testing-nonprod --default-storage-class=STANDARD --location=us-west1 --uniform-bucket-level-access</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Generare la chiave d'accesso utente e la chiave segreta, andando alla pagina di archiviazione del progetto. Nella barra laterale sinistra della dashboard, fare clic su Google Cloud Storage e poi su Impostazioni. Selezionare la scheda INTEROPERABILITÀ. Se non è già stata attivata, fare clic su Accesso interoperabile. Fare quindi clic sul pulsante CREA UNA CHIAVE per creare.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/access_key.jpg" alt="GCP Access keys for your user account" class="doc-image" id="gcp-access-keys-for-your-user-account" />
   </span> <span class="img-wrapper"> <span>Chiavi di accesso GCP per l'account utente</span> </span></p>
<ul>
<li>Aggiungere values.yaml</li>
</ul>
<pre><code translate="no" class="language-yaml">cluster:
    enabled: <span class="hljs-literal">true</span>

service:
    <span class="hljs-built_in">type</span>: LoadBalancer

minio:
    enabled: <span class="hljs-literal">false</span>

externalS3:
    enabled: <span class="hljs-literal">true</span>
    host: storage.googleapis.com
    port: 443
    rootPath: milvus/my-release
    bucketName: milvus-testing-nonprod
    cloudProvider: gcp
    useSSL: <span class="hljs-literal">true</span>
    accessKey: <span class="hljs-string">&quot;&lt;access-key&gt;&quot;</span>
    secretKey: <span class="hljs-string">&quot;&lt;secret-key&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Milvus" class="common-anchor-header">Distribuire Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Ora il cluster Kubernetes è pronto. Distribuiamo subito Milvus.</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update
helm install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Nei comandi precedenti, aggiungiamo il repo dei grafici di Milvus Helm in locale e aggiorniamo il repo per recuperare i grafici più recenti. Poi installiamo un'istanza di Milvus e la chiamiamo <strong>my-release</strong>.</p>
<p>Notate il valore <code translate="no">service.type</code>, che indica che vogliamo esporre l'istanza di Milvus attraverso un bilanciatore di carico Layer-4.</p>
<p>Se volete esporre la vostra istanza Milvus attraverso un bilanciatore di carico Layer-7, <a href="/docs/it/v2.4.x/gcp_layer7.md">leggete qui</a>.</p>
<h2 id="Verify-the-deployment" class="common-anchor-header">Verificare la distribuzione<button data-href="#Verify-the-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta che tutti i pod sono in esecuzione, eseguire il seguente comando per ottenere l'indirizzo IP esterno.</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> services|grep my-release-milvus|grep LoadBalancer|awk <span class="hljs-string">&#x27;{print $4}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Hello-Milvus" class="common-anchor-header">Ciao Milvus<button data-href="#Hello-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Fare riferimento a <a href="https://milvus.io/docs/v2.3.x/example_code.md">Hello Milvus</a>, modificare il valore host con l'indirizzo IP esterno ed eseguire il codice.</p>
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
    </button></h2><p>Se volete imparare a distribuire Milvus su altri cloud:</p>
<ul>
<li><a href="/docs/it/v2.4.x/eks.md">Implementare il cluster Milvus su AWS con Kubernetes</a></li>
<li><a href="/docs/it/v2.4.x/azure.md">Distribuire il cluster Milvus su Azure con Kubernetes</a></li>
</ul>
