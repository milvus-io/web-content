---
id: azure.md
title: Distribuzione di Milvus su Microsoft Azure con Kubernetes
related_key: cluster
summary: Scoprite come distribuire un cluster Milvus su Azure.
---
<h1 id="Deploy-Milvus-on-Azure-with-AKS" class="common-anchor-header">Distribuzione di Milvus su Azure con AKS<button data-href="#Deploy-Milvus-on-Azure-with-AKS" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento descrive come eseguire il provisioning e creare un cluster con <a href="https://azure.microsoft.com/en-us/services/kubernetes-service/#overview">Azure Kubernetes Service</a> (AKS) e il <a href="https://portal.azure.com">portale Azure</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Assicuratevi che il vostro progetto Azure sia stato configurato correttamente e che abbiate accesso alle risorse che volete utilizzare. Contattare gli amministratori se non si è sicuri delle proprie autorizzazioni di accesso.</p>
<h2 id="Software-requirements" class="common-anchor-header">Requisiti software<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
<li><a href="https://docs.microsoft.com/en-us/cli/azure/install-azure-cli#install">CLI di Azure</a></li>
<li><a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a></li>
<li><a href="https://helm.sh/docs/intro/install/">Helm</a></li>
</ul>
<p>In alternativa, è possibile utilizzare <a href="https://learn.microsoft.com/en-us/azure/cloud-shell/overview">Cloud Shell</a>, che ha preinstallato Azure CLI, kubectl e Helm.</p>
<div class="alert note">Dopo aver installato la Azure CLI, assicuratevi di essere autenticati correttamente. </div>
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
    </button></h2><ol>
<li>Accedete al portale Azure.</li>
<li>Nel menu del portale Azure o nella pagina <strong>iniziale</strong>, selezionate <strong>Crea una risorsa</strong>.</li>
<li>Selezionate <strong>Containers</strong> &gt; <strong>Kubernetes Service</strong>.</li>
<li>Nella pagina <strong>Fondamenti</strong>, configurate le seguenti opzioni:</li>
</ol>
<ul>
<li><p><strong>Dettagli progetto</strong>:</p>
<ul>
<li><p><strong>Sottoscrizione</strong>: Contattare l'amministratore Azure dell'organizzazione per determinare la sottoscrizione da utilizzare.</p>
<ul>
<li><strong>Gruppo di risorse</strong>: Contattare l'amministratore Azure dell'organizzazione per determinare il gruppo di risorse da utilizzare.</li>
</ul></li>
</ul></li>
<li><p><strong>Dettagli cluster</strong>:</p>
<ul>
<li><p><strong>Nome del cluster Kubernetes</strong>: inserire il nome del cluster.</p></li>
<li><p><strong>Regione</strong>: Selezionare una regione.</p></li>
<li><p><strong>Zone di disponibilità</strong>: Selezionare le <a href="https://docs.microsoft.com/en-us/azure/aks/availability-zones#overview-of-availability-zones-for-aks-clusters">zone di disponibilità</a> necessarie. Per i cluster di produzione, si consiglia di selezionare più zone di disponibilità.</p></li>
</ul></li>
<li><p><strong>Pool di nodi primari</strong>:</p>
<ul>
<li><p><strong>Dimensione del nodo</strong>: Si consiglia di scegliere macchine virtuali con un minimo di 16 GB di RAM, ma è possibile selezionare le dimensioni delle macchine virtuali in base alle proprie esigenze.</p></li>
<li><p><strong>Metodo di scala</strong>: Scegliete un metodo di scala.</p></li>
<li><p><strong>Intervallo di conteggio dei nodi</strong>: Selezionare un intervallo per il numero di nodi.</p></li>
</ul></li>
<li><p><strong>Pool di nodi</strong>:</p>
<ul>
<li><p><strong>Abilita i nodi virtuali</strong>: Selezionare la casella di controllo per abilitare i nodi virtuali.</p></li>
<li><p><strong>Abilita i set di scala delle macchine virtuali</strong>: Si consiglia di scegliere <code translate="no">enabled</code>.</p></li>
</ul></li>
<li><p><strong>Rete</strong>:</p>
<ul>
<li><p><strong>Configurazione di rete</strong>: Si consiglia di scegliere <code translate="no">Kubenet</code>.</p></li>
<li><p><strong>Prefisso del nome DNS</strong>: Inserire un prefisso di nome DNS.</p></li>
<li><p><strong>Instradamento del traffico</strong>:</p>
<ul>
<li><p><strong>Bilanciatore di carico</strong>: <code translate="no">Standard</code>.</p></li>
<li><p><strong>Instradamento delle applicazioni HTTP</strong>: Non richiesto.</p></li>
</ul></li>
</ul></li>
</ul>
<ol start="5">
<li>Dopo aver configurato le opzioni, fare clic su <strong>Revisione + crea</strong> e poi su <strong>Crea</strong> al termine della convalida. La creazione del cluster richiede alcuni minuti.</li>
</ol>
<h2 id="Connect-to-the-cluster" class="common-anchor-header">Connettersi al cluster<button data-href="#Connect-to-the-cluster" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Passare al cluster creato nei servizi Kubernetes e fare clic su di esso.</li>
<li>Nel riquadro di navigazione a sinistra, fare clic su <code translate="no">Overview</code>.</li>
<li>Nella pagina <strong>Panoramica</strong> visualizzata, fare clic su <strong>Connetti</strong> per visualizzare il gruppo di risorse e l'abbonamento.</li>
</ol>
<h2 id="Set-a-subscription-and-credentials" class="common-anchor-header">Impostare un abbonamento e le credenziali<button data-href="#Set-a-subscription-and-credentials" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">È possibile utilizzare Azure Cloud Shell per eseguire le seguenti procedure.</div>
<ol>
<li>Eseguite il seguente comando per impostare l'abbonamento.</li>
</ol>
<pre><code translate="no" class="language-shell">az account <span class="hljs-built_in">set</span> --subscription EXAMPLE-SUBSCRIPTION-ID
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Eseguite il seguente comando per scaricare le credenziali e configurare la CLI di Kubernetes per utilizzarle.</li>
</ol>
<pre><code translate="no" class="language-shell">az aks <span class="hljs-keyword">get</span>-credentials --resource-<span class="hljs-keyword">group</span> YOUR-RESOURCE-GROUP --name YOUR-CLUSTER-NAME
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Utilizzate la stessa shell per le procedure seguenti. Se si passa a un'altra shell, eseguire nuovamente i comandi precedenti.</div>
<h2 id="Using-Azure-Blob-Storage-as-external-object-storage" class="common-anchor-header">Utilizzo di Azure Blob Storage come archivio oggetti esterno<button data-href="#Using-Azure-Blob-Storage-as-external-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Azure Blob Storage è la versione di Azure di AWS Simple Storage Service (S3).</p>
<ul>
<li>Creare l'account di archiviazione e il contenitore</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account create -n milvustesting1 -g MyResourceGroup -l eastus --sku Standard_LRS --<span class="hljs-built_in">min</span>-tls-version TLS1_2
az storage container create -n testmilvus --account-name milvustesting1
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>ottenere la chiave segreta, utilizzare il primo valore</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account keys list --account-name milvustesting2
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Aggiungere values.yaml</li>
</ul>
<pre><code translate="no" class="language-yaml">cluster:
  enabled: <span class="hljs-literal">true</span>

service:
  <span class="hljs-built_in">type</span>: LoadBalancer

extraConfigFiles:
  user.yaml: |+
    common:
      storageType: remote

minio:
  enabled: <span class="hljs-literal">false</span>

externalS3:
  enabled: <span class="hljs-literal">true</span>
  host: core.windows.net
  port: 443
  rootPath: my-release
  bucketName: testmilvus <span class="hljs-comment"># the storage account container name</span>
  cloudProvider: azure
  useSSL: <span class="hljs-literal">true</span>
  accessKey: <span class="hljs-string">&quot;milvustesting1&quot;</span> <span class="hljs-comment"># the storage account name</span>
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
<p>Notate il valore config <code translate="no">service.type</code>, che indica che vogliamo esporre l'istanza Milvus attraverso un bilanciatore di carico Layer-4.</p>
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
    </button></h2><p>Fare riferimento a <a href="https://milvus.io/docs/v2.3.x/example_code.md">Hello Milvus</a>, modificare il valore host in indirizzo IP esterno ed eseguire il codice.</p>
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
<li><a href="/docs/it/v2.4.x/gcp.md">Distribuire il cluster Milvus su GCP con Kubernetes</a></li>
</ul>
