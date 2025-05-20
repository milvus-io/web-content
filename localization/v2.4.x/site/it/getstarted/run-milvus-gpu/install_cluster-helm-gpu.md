---
id: install_cluster-helm-gpu.md
label: Cluster (Helm)
related_key: Kubernetes
summary: Scoprite come installare il cluster Milvus su Kubernetes.
title: Eseguire Milvus con il supporto GPU usando il diagramma di Helm
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="common-anchor-header">Eseguire Milvus con il supporto GPU usando Helm Chart<button data-href="#Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa pagina illustra come avviare un'istanza di Milvus con supporto GPU usando Helm Chart.</p>
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
    </button></h2><p>Helm utilizza un formato di packaging chiamato chart. Un grafico è una raccolta di file che descrivono un insieme correlato di risorse Kubernetes. Milvus fornisce una serie di grafici per aiutare a distribuire le dipendenze e i componenti di Milvus. <a href="https://artifacthub.io/packages/helm/milvus-helm/milvus">Milvus Helm Chart</a> è una soluzione che avvia la distribuzione di Milvus su un cluster Kubernetes (K8s) utilizzando il gestore di pacchetti Helm.</p>
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
<li><p><a href="/docs/it/v2.4.x/prerequisite-gpu.md#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes">Creare un cluster K8s con nodi worker GPU</a>.</p></li>
<li><p>Installare una <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. È possibile verificare la StorageClass installata come segue.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verificare <a href="/docs/it/v2.4.x/prerequisite-gpu.md">i requisiti hardware e software</a> prima dell'installazione.</p></li>
</ul>
<div class="alert note">
<p>Se si riscontrano problemi nell'estrazione dell'immagine, contattare <a href="mailto:community@zilliz.com">community@zilliz.com</a> con i dettagli del problema e verrà fornito il supporto necessario.</p>
</div>
<h2 id="Install-Helm-Chart-for-Milvus" class="common-anchor-header">Installare Helm Chart per Milvus<button data-href="#Install-Helm-Chart-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Helm è un gestore di pacchetti K8s che può aiutarvi a distribuire Milvus rapidamente.</p>
<ol>
<li>Aggiungere il repository Milvus Helm.</li>
</ol>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Il repository di Milvus Helm Charts all'indirizzo <code translate="no">https://milvus-io.github.io/milvus-helm/</code> è stato archiviato ed è possibile ottenere ulteriori aggiornamenti da <code translate="no">https://zilliztech.github.io/milvus-helm/</code> come segue:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Il repo archiviato è ancora disponibile per i grafici fino alla versione 4.0.31. Per le versioni successive, utilizzare invece il nuovo repo.</p>
</div>
<ol start="2">
<li>Aggiornare i grafici localmente.</li>
</ol>
<pre><code translate="no">$ helm repo update
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus" class="common-anchor-header">Avviare Milvus<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta installato il grafico Helm, è possibile avviare Milvus su Kubernetes. In questa sezione, vi guideremo attraverso i passaggi per avviare Milvus con il supporto GPU.</p>
<p>È necessario avviare Milvus con Helm specificando il nome della release, il grafico e i parametri che si prevede di modificare. In questa guida, utilizziamo <code translate="no">my-release</code> come nome della release. Per utilizzare un nome di release diverso, sostituire <code translate="no">my-release</code> nei comandi seguenti con quello utilizzato.</p>
<p>Milvus consente di assegnare uno o più dispositivi GPU a Milvus.</p>
<h3 id="1-Assign-a-single-GPU-device" class="common-anchor-header">1. Assegnare un singolo dispositivo GPU</h3><p>Milvus con supporto GPU permette di assegnare uno o più dispositivi GPU.</p>
<ul>
<li><p>Cluster Milvus</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus standalone</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
standalone:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Assign-multiple-GPU-devices" class="common-anchor-header">2. Assegnare più dispositivi GPU</h3><p>Oltre a un singolo dispositivo GPU, è possibile assegnare a Milvus anche più dispositivi GPU.</p>
<ul>
<li><p>Cluster Milvus</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nella configurazione precedente, l'indexNode e il queryNode condividono due GPU. Per assegnare GPU diverse all'indexNode e al queryNode, si può modificare la configurazione impostando <code translate="no">extraEnv</code> nel file di configurazione come segue:</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;0&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre>
  <div class="alert note">
    <ul>
      <li>Il nome della release deve contenere solo lettere, numeri e trattini. I punti non sono ammessi nel nome della release.</li>
      <li>La linea di comando predefinita installa la versione cluster di Milvus durante l'installazione di Milvus con Helm. Per l'installazione di Milvus standalone sono necessarie ulteriori impostazioni.</li>
      <li>Secondo la <a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">guida alla migrazione delle API deprecate di Kuberenetes</a>, la versione API <b>policy/v1beta1</b> di PodDisruptionBudget non viene più utilizzata a partire dalla v1.25. Si suggerisce di migrare i manifesti e i client API per utilizzare invece la versione API <b>policy/v1</b>. <br/>Come soluzione per gli utenti che utilizzano ancora la versione API <b>policy/v1beta1</b> di PodDisruptionBudget su Kuberenetes v1.25 e successive, è possibile eseguire il seguente comando per installare Milvus:<br/>. <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
      <li>Per ulteriori informazioni, vedere <a href="https://artifacthub.io/packages/helm/milvus/milvus">Grafico Helm</a> e <a href="https://helm.sh/docs/">Helm</a> <a href="https://artifacthub.io/packages/helm/milvus/milvus">di Milvus</a>.</li>
    </ul>
  </div>
</li>
<li><p>Milvus standalone</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nella configurazione precedente, l'indexNode e il queryNode condividono due GPU. Per assegnare GPU diverse all'indexNode e al queryNode, è possibile modificare la configurazione impostando extraEnv nel file di configurazione come segue:</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;0&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Check-Milvus-status" class="common-anchor-header">2. Controllare lo stato di Milvus</h3><p>Eseguire il seguente comando per verificare lo stato di Milvus:</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<p>Dopo l'avvio di Milvus, la colonna <code translate="no">READY</code> visualizza <code translate="no">1/1</code> per tutti i pod.</p>
<ul>
<li><p>Cluster Milvus</p>
<pre><code translate="no" class="language-shell">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datacoord-6fd4bd885c-gkzwx     1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-indexcoord-5bfcf6bdd8-nmh5l    1/1    Running   0        3m23s
my-release-milvus-indexnode-5c5f7b5bd9-l8hjg     1/1    Running   0        3m24s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querycoord-579cd79455-xht5n    1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-milvus-rootcoord-7fb9488465-dmbbj     1/1    Running   0        3m23s
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
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus standalone</p>
<pre><code translate="no" class="language-shell">NAME                                               READY   STATUS      RESTARTS   AGE
my-release-etcd-0                                  1/1     Running     0          30s
my-release-milvus-standalone-54c4f88cb9-f84pf      1/1     Running     0          30s
my-release-minio-5564fbbddc-mz7f5                  1/1     Running     0          30s
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Inoltrare una porta locale a Milvus</h3><p>Verificare la porta locale su cui è in ascolto il server Milvus. Sostituite il nome del pod con il vostro.</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-6b</span>d7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>Quindi, eseguite il seguente comando per inoltrare una porta locale alla porta su cui Milvus è in ascolto.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>Facoltativamente, si può usare <code translate="no">:19530</code> invece di <code translate="no">27017:19530</code> nel comando precedente per lasciare che <code translate="no">kubectl</code> assegni una porta locale per l'utente, in modo da non dover gestire conflitti di porte.</p>
<p>Per impostazione predefinita, il port-forwarding di kubectl ascolta solo su <code translate="no">localhost</code>. Usate il flag <code translate="no">address</code> se volete che Milvus ascolti su uno o tutti gli indirizzi IP selezionati. Il comando seguente fa sì che il port-forward sia in ascolto su tutti gli indirizzi IP del computer host.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
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
    </button></h2><p>Eseguire il seguente comando per disinstallare Milvus.</p>
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
    </button></h2><p>Dopo aver installato Milvus, è possibile</p>
<ul>
<li><p>Controllare <a href="/docs/it/v2.4.x/quickstart.md">Quickstart</a> per vedere cosa può fare Milvus.</p></li>
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
