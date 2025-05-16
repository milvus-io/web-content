---
id: install_cluster-helm.md
label: Helm
related_key: Kubernetes
summary: Scoprite come installare il cluster Milvus su Kubernetes.
title: Installare il cluster Milvus con Helm
---
<h1 id="Run-Milvus-in-Kubernetes-with-Helm" class="common-anchor-header">Eseguire Milvus in Kubernetes con Helm<button data-href="#Run-Milvus-in-Kubernetes-with-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa pagina illustra come avviare un'istanza di Milvus in Kubernetes utilizzando i <a href="https://github.com/zilliztech/milvus-helm">grafici di Milvus Helm</a>.</p>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Helm utilizza un formato di packaging chiamato chart. Un grafico è una raccolta di file che descrivono un insieme correlato di risorse Kubernetes. Milvus fornisce una serie di grafici per aiutare a distribuire le dipendenze e i componenti di Milvus.</p>
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
    </button></h2><ul>
<li><p><a href="https://helm.sh/docs/intro/install/">Installare Helm CLI</a>.</p></li>
<li><p><a href="/docs/it/v2.4.x/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">Creare un cluster K8s</a>.</p></li>
<li><p>Installare una <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. È possibile verificare la StorageClass installata come segue.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verificare <a href="/docs/it/v2.4.x/prerequisite-helm.md">i requisiti hardware e software</a> prima dell'installazione.</p></li>
<li><p>Prima di installare Milvus, si consiglia di utilizzare <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> per stimare i requisiti hardware in base alle dimensioni dei dati. Questo aiuta a garantire prestazioni e allocazione delle risorse ottimali per l'installazione di Milvus.</p></li>
</ul>
<div class="alert note">
<p>Se si riscontrano problemi nell'estrazione dell'immagine, contattateci all'indirizzo <a href="mailto:community@zilliz.com">community@zilliz.com</a> con i dettagli del problema e vi forniremo il supporto necessario.</p>
</div>
<h2 id="Install-Milvus-Helm-Chart" class="common-anchor-header">Installare Milvus Helm Chart<button data-href="#Install-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di installare Milvus Helm Charts, è necessario aggiungere il repository Milvus Helm.</p>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Il repository di Milvus Helm Charts all'indirizzo <code translate="no">https://github.com/milvus-io/milvus-helm</code> è stato archiviato ed è possibile ottenere ulteriori aggiornamenti da <code translate="no">https://github.com/zilliztech/milvus-helm</code> come segue:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Il repo archiviato è ancora disponibile per i grafici fino alla versione 4.0.31. Per le versioni successive, utilizzare invece il nuovo repo.</p>
</div>
<p>Quindi prelevare i grafici di Milvus dal repository come segue:</p>
<pre><code translate="no">$ helm repo update
<button class="copy-code-btn"></button></code></pre>
<p>È sempre possibile eseguire questo comando per recuperare i grafici Milvus Helm più recenti.</p>
<h2 id="Online-install" class="common-anchor-header">Installazione online<button data-href="#Online-install" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Distribuire un cluster Milvus</h3><p>Una volta installato il grafico Helm, è possibile avviare Milvus su Kubernetes. Questa sezione vi guiderà attraverso le fasi di avvio di Milvus.</p>
<pre><code translate="no" class="language-shell">$ helm install my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Nel comando precedente, <code translate="no">my-release</code> è il nome della release e <code translate="no">milvus/milvus</code> è il repository del grafico installato localmente. Per usare un nome diverso, sostituire <code translate="no">my-release</code> con quello che si ritiene opportuno.</p>
<p>Il comando precedente distribuisce un cluster Milvus con i suoi componenti e le sue dipendenze utilizzando le configurazioni predefinite. Per personalizzare queste impostazioni, si consiglia di usare <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> per regolare le configurazioni in base alle dimensioni effettive dei dati e scaricare il file YAML corrispondente. Per saperne di più sui parametri di configurazione, consultare la <a href="https://milvus.io/docs/system_configuration.md">lista di controllo delle configurazioni del sistema Milvus</a>.</p>
<div class="alert note">
  <ul>
    <li>Il nome della release deve contenere solo lettere, numeri e trattini. I punti non sono ammessi nel nome della release.</li>
    <li>La linea di comando predefinita installa la versione cluster di Milvus durante l'installazione di Milvus con Helm. Per l'installazione di Milvus standalone sono necessarie ulteriori impostazioni.</li>
    <li>Secondo la <a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">guida alla migrazione delle API deprecate di Kubernetes</a>, la versione API <b>policy/v1beta1</b> di PodDisruptionBudget non viene più utilizzata a partire dalla v1.25. Si suggerisce di migrare i manifesti e i client API per utilizzare invece la versione API <b>policy/v1</b>. <br/>Come soluzione per gli utenti che utilizzano ancora la versione API <b>policy/v1beta1</b> di PodDisruptionBudget su Kubernetes v1.25 e successivi, è possibile eseguire il seguente comando per installare Milvus:<br/>. <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
    <li>Per ulteriori informazioni, consultare <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a> e <a href="https://helm.sh/docs/">Helm</a>.</li>
  </ul>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Controllare lo stato del cluster Milvus</h3><p>Eseguite il seguente comando per verificare lo stato di tutti i pod nel vostro cluster Milvus.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<p>Una volta che tutti i pod sono in esecuzione, l'output del comando precedente dovrebbe essere simile al seguente:</p>
<pre><code translate="no">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-indexnode-5c5f7b5bd9-l8hjg     1/1    Running   0        3m24s
my-release-milvus-mixcoord-7fb9488465-dmbbj      1/1    Running   0        3m23s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-minio-0                               1/1    Running   0        3m23s
my-release-minio-1                               1/1    Running   0        3m23s
my-release-minio-2                               1/1    Running   0        3m23s
my-release-minio-3                               1/1    Running   0        3m23s
my-release-pulsar-autorecovery-86f5dbdf77-lchpc  1/1    Running   0        3m24s
my-release-pulsar-bookkeeper-0                   1/1    Running   0        3m23s
my-release-pulsar-bookkeeper-1                   1/1    Running   0        98s
my-release-pulsar-broker-556ff89d4c-2m29m        1/1    Running   0        3m23s
my-release-pulsar-proxy-6fbd75db75-nhg4v         1/1    Running   0        3m23s
my-release-pulsar-zookeeper-0                    1/1    Running   0        3m23s
my-release-pulsar-zookeeper-metadata-98zbr       0/1   Completed  0        3m24s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Inoltrare una porta locale a Milvus</h3><p>Eseguite il seguente comando per ottenere la porta su cui il vostro cluster Milvus serve.</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-6b</span>d7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>L'output mostra che l'istanza di Milvus serve sulla porta predefinita <strong>19530</strong>.</p>
<div class="alert note">
<p>Se avete distribuito Milvus in modalità standalone, cambiate il nome del pod da <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> a <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code>.</p>
</div>
<p>Quindi, eseguite il seguente comando per inoltrare una porta locale alla porta su cui Milvus serve.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>Facoltativamente, si può usare <code translate="no">:19530</code> invece di <code translate="no">27017:19530</code> nel comando precedente per lasciare che <code translate="no">kubectl</code> assegni una porta locale al posto nostro, in modo da non dover gestire conflitti di porte.</p>
<p>Per impostazione predefinita, il port-forwarding di kubectl ascolta solo su <code translate="no">localhost</code>. Usate il flag <code translate="no">address</code> se volete che Milvus ascolti su uno o tutti gli indirizzi IP selezionati. Il comando seguente fa sì che il port-forward ascolti tutti gli indirizzi IP della macchina host.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-install" class="common-anchor-header">Installazione offline<button data-href="#Offline-install" class="anchor-icon" translate="no">
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
    </button></h2><p>Se vi trovate in un ambiente con limitazioni di rete, seguite la procedura di questa sezione per avviare un cluster Milvus.</p>
<h3 id="1-Get-Milvus-manifest" class="common-anchor-header">1. Ottenere il manifesto di Milvus</h3><p>Eseguite il seguente comando per ottenere il manifest di Milvus.</p>
<pre><code translate="no" class="language-shell">$ helm template my-release milvus/milvus &gt; milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Il comando precedente esegue il rendering dei modelli di grafico per un cluster Milvus e salva l'output in un file di manifest chiamato <code translate="no">milvus_manifest.yaml</code>. Utilizzando questo manifest, è possibile installare un cluster Milvus con i suoi componenti e le sue dipendenze in pod separati.</p>
<div class="alert note">
<ul>
<li>Per installare un'istanza di Milvus in modalità standalone, dove tutti i componenti di Milvus sono contenuti in un singolo pod, si deve invece eseguire <code translate="no">helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsar.enabled=false milvus/milvus &gt; milvus_manifest.yaml</code> per eseguire il rendering dei modelli di grafico per un'istanza di Milvus in modalità standalone.</li>
<li>Per modificare le configurazioni di Milvus, scaricare il modello <a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml"><code translate="no">value.yaml</code></a> scaricare il modello, inserirvi le impostazioni desiderate e utilizzare <code translate="no">helm template -f values.yaml my-release milvus/milvus &gt; milvus_manifest.yaml</code> per eseguire il rendering del manifest di conseguenza.</li>
</ul>
</div>
<h3 id="2-Download-image-pulling-script" class="common-anchor-header">2. Scaricare lo script di estrazione delle immagini</h3><p>Lo script di estrazione delle immagini è sviluppato in Python. È necessario scaricare lo script insieme alle sue dipendenze nel file <code translate="no">requirement.txt</code>.</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt</span>
$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Pull-and-save-images" class="common-anchor-header">3. Estrarre e salvare le immagini</h3><p>Eseguire il seguente comando per estrarre e salvare le immagini richieste.</p>
<pre><code translate="no" class="language-shell">$ pip3 install -r requirements.txt
$ python3 save_image.py --manifest milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Le immagini vengono estratte in una sottocartella denominata <code translate="no">images</code> nella directory corrente.</p>
<h3 id="4-Load-images" class="common-anchor-header">4. Caricare le immagini</h3><p>Ora è possibile caricare le immagini sugli host nell'ambiente con restrizioni di rete come segue:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> $(find . -<span class="hljs-built_in">type</span> f -name <span class="hljs-string">&quot;*.tar.gz&quot;</span>) ; <span class="hljs-keyword">do</span> gunzip -c <span class="hljs-variable">$image</span> | docker load; <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="5-Deploy-Milvus" class="common-anchor-header">5. Distribuire Milvus</h3><pre><code translate="no" class="language-shell">$ kubectl apply -f milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>A questo punto, è possibile seguire i passaggi <a href="#2-Check-Milvus-cluster-status">2</a> e <a href="#3-Forward-a-local-port-to-Milvus">3</a> dell'installazione online per controllare lo stato del cluster e inoltrare una porta locale a Milvus.</p>
<h2 id="Upgrade-running-Milvus-cluster" class="common-anchor-header">Aggiornamento del cluster Milvus in esecuzione<button data-href="#Upgrade-running-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Eseguite il seguente comando per aggiornare il cluster Milvus in esecuzione alla versione più recente:</p>
<pre><code translate="no" class="language-shell">$ helm repo update
$ helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Disinstallare Milvus<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Eseguite il seguente comando per disinstallare Milvus.</p>
<pre><code translate="no" class="language-bash">$ helm uninstall my-release
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
    </button></h2><p>Dopo aver installato Milvus in Docker, è possibile:</p>
<ul>
<li><p>Controllare <a href="/docs/it/v2.4.x/quickstart.md">Hello Milvus</a> per vedere cosa può fare Milvus.</p></li>
<li><p>Imparare le operazioni di base di Milvus:</p>
<ul>
<li><a href="/docs/it/v2.4.x/manage_databases.md">Gestire i database</a></li>
<li><a href="/docs/it/v2.4.x/manage-collections.md">Gestire le collezioni</a></li>
<li><a href="/docs/it/v2.4.x/manage-partitions.md">Gestire le partizioni</a></li>
<li><a href="/docs/it/v2.4.x/insert-update-delete.md">Inserire, inserire ed eliminare</a></li>
<li><a href="/docs/it/v2.4.x/single-vector-search.md">Ricerca a vettore singolo</a></li>
<li><a href="/docs/it/v2.4.x/multi-vector-search.md">Ricerca ibrida</a></li>
</ul></li>
<li><p><a href="/docs/it/v2.4.x/upgrade_milvus_cluster-helm.md">Aggiornare Milvus usando Helm Chart</a>.</p></li>
<li><p><a href="/docs/it/v2.4.x/scaleout.md">Scalare il cluster Milvus</a>.</p></li>
<li><p>Distribuire il cluster Milvus su cloud:</p>
<ul>
<li><a href="/docs/it/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/it/v2.4.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/it/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Esplorate <a href="/docs/it/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>, uno strumento open-source per il backup dei dati di Milvus.</p></li>
<li><p>Esplorate <a href="/docs/it/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, uno strumento open-source per il debug di Milvus e gli aggiornamenti dinamici della configurazione.</p></li>
<li><p>Esplorate <a href="https://milvus.io/docs/attu.md">Attu</a>, uno strumento open-source per la gestione intuitiva di Milvus.</p></li>
<li><p><a href="/docs/it/v2.4.x/monitor.md">Monitorate Milvus con Prometheus</a>.</p></li>
</ul>
