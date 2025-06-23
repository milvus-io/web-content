---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
summary: >-
  Imparare a installare il cluster Milvus su Kubernetes utilizzando Milvus
  Operator
title: Installare il cluster Milvus con Milvus Operator
---
<h1 id="Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="common-anchor-header">Eseguire Milvus in Kubernetes con Milvus Operator<button data-href="#Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa pagina illustra come avviare un'istanza di Milvus in Kubernetes utilizzando <a href="https://github.com/zilliztech/milvus-operator">Milvus Operator</a>.</p>
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
    </button></h2><p>Milvus Operator è una soluzione che aiuta a distribuire e gestire uno stack di servizi Milvus completo su cluster Kubernetes (K8s). Lo stack include tutti i componenti Milvus e le relative dipendenze, come etcd, Pulsar e MinIO.</p>
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
<li><p><a href="/docs/it/v2.6.x/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">Creare un cluster K8s</a>.</p></li>
<li><p>Installare una <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. È possibile verificare la StorageClass installata come segue.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verificare <a href="/docs/it/v2.6.x/prerequisite-helm.md">i requisiti hardware e software</a> prima dell'installazione.</p></li>
<li><p>Prima di installare Milvus, si consiglia di utilizzare <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> per stimare i requisiti hardware in base alle dimensioni dei dati. Questo aiuta a garantire prestazioni e allocazione delle risorse ottimali per l'installazione di Milvus.</p></li>
</ul>
<div class="alert note">
<p>Se si riscontrano problemi nell'estrazione dell'immagine, contattateci all'indirizzo <a href="mailto:community@zilliz.com">community@zilliz.com</a> con i dettagli del problema e vi forniremo il supporto necessario.</p>
</div>
<h2 id="Install-Milvus-Operator" class="common-anchor-header">Installare Milvus Operator<button data-href="#Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operator definisce le risorse personalizzate di un cluster Milvus sopra le <a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/">risorse personalizzate</a> di <a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/">Kubernetes</a>. Quando si definiscono le risorse personalizzate, è possibile utilizzare le API di K8s in modo dichiarativo e gestire lo stack di distribuzione Milvus per garantirne la scalabilità e l'alta disponibilità.</p>
<p>È possibile installare Milvus Operator in uno dei seguenti modi:</p>
<ul>
<li><a href="#Install-with-Helm">Con Helm</a></li>
<li><a href="#Install-with-kubectl">Con kubectl</a></li>
</ul>
<h3 id="Install-with-Helm" class="common-anchor-header">Installazione con Helm</h3><p>Eseguite il seguente comando per installare Milvus Operator con Helm.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm install milvus-operator \
  -n milvus-operator --create-namespace \
  --<span class="hljs-built_in">wait</span> --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.3.0-rc1-hotfix/milvus-operator-1.3.0-rc1-hotfix.tgz</span>
<button class="copy-code-btn"></button></code></pre>
<p>Al termine del processo di installazione si vedrà un risultato simile al seguente.</p>
<pre><code translate="no" class="language-shell">NAME: milvus-operator
LAST DEPLOYED: Thu Jul  7 13:18:40 2022
NAMESPACE: milvus-operator
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Milvus Operator Is Starting, use `kubectl get -n milvus-operator deploy/milvus-operator` to check if its successfully installed
If Operator not started successfully, check the checker&#x27;s log with `kubectl -n milvus-operator logs job/milvus-operator-checker`
Full Installation doc can be found in https://github.com/zilliztech/milvus-operator/blob/main/docs/installation/installation.md
Quick start with `kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_minimum.yaml`
More samples can be found in https://github.com/zilliztech/milvus-operator/tree/main/config/samples
CRD Documentation can be found in https://github.com/zilliztech/milvus-operator/tree/main/docs/CRD
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se avete già installato Milvus Operator, aggiornatelo con il seguente comando:</p>
<pre><code translate="no" class="language-shell">helm upgrade milvus-operator \
  -n milvus-operator --create-namespace \
  --wait --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.3.0-rc1-hotfix/milvus-operator-1.3.0-rc1-hotfix.tgz
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Install-with-kubectl" class="common-anchor-header">Installa con kubectl</h3><p>Eseguire il seguente comando per installare Milvus Operator con <code translate="no">kubectl</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Al termine del processo di installazione verrà visualizzato un output simile al seguente.</p>
<pre><code translate="no" class="language-shell">namespace/milvus-operator created
customresourcedefinition.apiextensions.k8s.io/milvusclusters.milvus.io created
serviceaccount/milvus-operator-controller-manager created
role.rbac.authorization.k8s.io/milvus-operator-leader-election-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-manager-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-metrics-reader created
clusterrole.rbac.authorization.k8s.io/milvus-operator-proxy-role created
rolebinding.rbac.authorization.k8s.io/milvus-operator-leader-election-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-manager-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-proxy-rolebinding created
configmap/milvus-operator-manager-config created
service/milvus-operator-controller-manager-metrics-service created
service/milvus-operator-webhook-service created
deployment.apps/milvus-operator-controller-manager created
<button class="copy-code-btn"></button></code></pre>
<p>È possibile verificare se il pod Milvus Operator è in esecuzione come segue:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods -n milvus-operator</span>

NAME                               READY   STATUS    RESTARTS   AGE
milvus-operator-5fd77b87dc-msrk4   1/1     Running   0          46s
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Distribuire un cluster Milvus</h3><p>Una volta che il pod Milvus Operator è in esecuzione, è possibile distribuire un cluster Milvus come segue.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Il comando precedente distribuisce un cluster Milvus con i suoi componenti e le sue dipendenze in pod separati, utilizzando le configurazioni predefinite. Per personalizzare queste impostazioni, si consiglia di usare <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> per regolare le configurazioni in base alle dimensioni effettive dei dati e quindi scaricare il file YAML corrispondente. Per saperne di più sui parametri di configurazione, consultare la <a href="https://milvus.io/docs/system_configuration.md">lista di controllo delle configurazioni del sistema Milvus</a>.</p>
<div class="alert note">
<ul>
<li>Il nome della release deve contenere solo lettere, numeri e trattini. I punti non sono ammessi nel nome della release.</li>
<li>È anche possibile distribuire un'istanza Milvus in modalità standalone, dove tutti i suoi componenti sono contenuti in un singolo pod. Per farlo, cambiare l'URL del file di configurazione nel comando precedente in <code translate="no">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_default.yaml</code></li>
</ul>
</div>
<h4 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Controllare lo stato del cluster Milvus</h4><p>Eseguire il seguente comando per verificare lo stato del cluster Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get milvus my-release -o yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una volta che il cluster Milvus è pronto, l'output del comando precedente dovrebbe essere simile al seguente. Se il campo <code translate="no">status.status</code> rimane <code translate="no">Unhealthy</code>, il cluster Milvus è ancora in fase di creazione.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">status:</span>
  <span class="hljs-attr">conditions:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;2021-11-02T05:59:41Z&quot;</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">StorageReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">StorageReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;2021-11-02T06:06:23Z&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">Pulsar</span> <span class="hljs-string">is</span> <span class="hljs-string">ready</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">PulsarReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">PulsarReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;2021-11-02T05:59:41Z&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">Etcd</span> <span class="hljs-string">endpoints</span> <span class="hljs-string">is</span> <span class="hljs-string">healthy</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">EtcdReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">EtcdReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;2021-11-02T06:12:36Z&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">All</span> <span class="hljs-string">Milvus</span> <span class="hljs-string">components</span> <span class="hljs-string">are</span> <span class="hljs-string">healthy</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">MilvusClusterHealthy</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">MilvusReady</span>
  <span class="hljs-attr">endpoint:</span> <span class="hljs-string">my-release-milvus.default:19530</span>
  <span class="hljs-attr">status:</span> <span class="hljs-string">Healthy</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus Operator crea le dipendenze di Milvus, come etcd, Pulsar e MinIO, e poi i componenti di Milvus, come proxy, coordinatori e nodi.</p>
<p>Una volta che il cluster Milvus è pronto, lo stato di tutti i pod nel cluster Milvus dovrebbe essere simile al seguente.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods</span>

NAME                                             READY   STATUS    RESTARTS   AGE
my-release-etcd-0                                1/1     Running   0          2m36s
my-release-etcd-1                                1/1     Running   0          2m36s
my-release-etcd-2                                1/1     Running   0          2m36s
my-release-milvus-datanode-58955c65b9-j4j7s      1/1     Running   0          92s
my-release-milvus-mixcoord-686f84968f-jcv5d      1/1     Running   0          92s
my-release-milvus-proxy-646f48fc7c-4lctb         1/1     Running   0          92s
my-release-milvus-querynode-0-d89d7677b-x7j7q    1/1     Running   0          91s
my-release-milvus-streamingnode-556bdcc87c-2qwcc 1/1     Running   0          92s
my-release-minio-0                               1/1     Running   0          2m36s
my-release-minio-1                               1/1     Running   0          2m36s
my-release-minio-2                               1/1     Running   0          2m35s
my-release-minio-3                               1/1     Running   0          2m35s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Inoltrare una porta locale a Milvus</h3><p>Eseguire il seguente comando per ottenere la porta su cui il cluster Milvus opera.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pod my-release-milvus-proxy-84f67cdb7f-pg6wf --template</span>
=&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;
19530
<button class="copy-code-btn"></button></code></pre>
<p>L'output mostra che l'istanza di Milvus serve sulla porta predefinita <strong>19530</strong>.</p>
<div class="alert note">
<p>Se avete distribuito Milvus in modalità standalone, cambiate il nome del pod da <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> a <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code>.</p>
</div>
<p>Quindi, eseguite il seguente comando per inoltrare una porta locale alla porta su cui Milvus serve.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward service/my-release-milvus 27017:19530</span>
Forwarding from 127.0.0.1:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Facoltativamente, si può usare <code translate="no">:19530</code> invece di <code translate="no">27017:19530</code> nel comando precedente per lasciare che <code translate="no">kubectl</code> assegni una porta locale al posto dell'utente, in modo da non dover gestire conflitti di porte.</p>
<p>Per impostazione predefinita, il port-forwarding di kubectl ascolta solo su <code translate="no">localhost</code>. Usate il flag <code translate="no">address</code> se volete che Milvus ascolti su uno o tutti gli indirizzi IP selezionati. Il comando seguente fa sì che il port-forward sia in ascolto su tutti gli indirizzi IP del computer host.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530</span>
Forwarding from 0.0.0.0:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Ora è possibile collegarsi a Milvus utilizzando la porta inoltrata.</p>
<h2 id="Access-Milvus-WebUI" class="common-anchor-header">Accesso all'interfaccia web di Milvus<button data-href="#Access-Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus viene fornito con uno strumento GUI integrato, chiamato Milvus WebUI, a cui si può accedere tramite il browser. Milvus WebUI migliora l'osservabilità del sistema con un'interfaccia semplice e intuitiva. Con Milvus Web UI si possono osservare le statistiche e le metriche dei componenti e delle dipendenze di Milvus, controllare i dettagli del database e della raccolta ed elencare le configurazioni dettagliate di Milvus. Per maggiori informazioni su Milvus Web UI, vedere <a href="/docs/it/v2.6.x/milvus-webui.md">Milvus WebUI</a>.</p>
<p>Per abilitare l'accesso all'interfaccia web di Milvus, è necessario effettuare il port-forward del pod proxy su una porta locale.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091</span>
Forwarding from 0.0.0.0:27018 -&gt; 9091
<button class="copy-code-btn"></button></code></pre>
<p>Ora è possibile accedere all'interfaccia web di Milvus all'indirizzo <code translate="no">http://localhost:27018</code>.</p>
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
    </button></h2><p>Eseguire il seguente comando per disinstallare il cluster Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl delete milvus my-release</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Quando si elimina il cluster Milvus utilizzando la configurazione predefinita, le dipendenze come etcd, Pulsar e MinIO non vengono eliminate. Pertanto, la prossima volta che si installerà la stessa istanza del cluster Milvus, queste dipendenze verranno utilizzate di nuovo.</li>
<li>Per eliminare le dipendenze e le richieste di volume persistente (PVC) insieme al cluster Milvus, vedere il <a href="https://github.com/zilliztech/milvus-operator/blob/main/config/samples/milvus_deletion.yaml">file di configurazione</a>.</li>
</ul>
</div>
<h2 id="Uninstall-Milvus-Operator" class="common-anchor-header">Disinstallare Milvus Operator<button data-href="#Uninstall-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Esistono anche due modi per disinstallare Milvus Operator.</p>
<ul>
<li><a href="#Uninstall-with-Helm">Disinstallare con Helm</a></li>
<li><a href="#Uninstall-with-kubectl">Disinstallazione con kubectl</a></li>
</ul>
<h4 id="Uninstall-with-Helm" class="common-anchor-header">Disinstallare con Helm</h4><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm -n milvus-operator uninstall milvus-operator</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Uninstall-with-kubectl" class="common-anchor-header">Disinstallare con kubectl</h4><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl delete -f https://raw.githubusercontent.com/zilliztech/milvus-operator/v1.3.0-rc1-hotfix/deploy/manifests/deployment.yaml</span>
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
<li><p>Controllare <a href="/docs/it/v2.6.x/quickstart.md">Hello Milvus</a> per vedere cosa può fare Milvus.</p></li>
<li><p>Imparare le operazioni di base di Milvus:</p>
<ul>
<li><a href="/docs/it/v2.6.x/manage_databases.md">Gestire i database</a></li>
<li><a href="/docs/it/v2.6.x/manage-collections.md">Gestire le collezioni</a></li>
<li><a href="/docs/it/v2.6.x/manage-partitions.md">Gestire le partizioni</a></li>
<li><a href="/docs/it/v2.6.x/insert-update-delete.md">Inserire, inserire ed eliminare</a></li>
<li><a href="/docs/it/v2.6.x/single-vector-search.md">Ricerca a vettore singolo</a></li>
<li><a href="/docs/it/v2.6.x/multi-vector-search.md">Ricerca ibrida</a></li>
</ul></li>
<li><p><a href="/docs/it/v2.6.x/upgrade_milvus_cluster-helm.md">Aggiornare Milvus usando Helm Chart</a>.</p></li>
<li><p><a href="/docs/it/v2.6.x/scaleout.md">Scalare il cluster Milvus</a>.</p></li>
<li><p>Distribuire il cluster Milvus su cloud:</p>
<ul>
<li><a href="/docs/it/v2.6.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/it/v2.6.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/it/v2.6.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Esplorate <a href="/docs/it/v2.6.x/milvus-webui.md">Milvus WebUI</a>, un'interfaccia web intuitiva per l'osservabilità e la gestione di Milvus.</p></li>
<li><p>Esplorate <a href="/docs/it/v2.6.x/milvus_backup_overview.md">Milvus Backup</a>, uno strumento open-source per il backup dei dati Milvus.</p></li>
<li><p>Esplorate <a href="/docs/it/v2.6.x/birdwatcher_overview.md">Birdwatcher</a>, uno strumento open-source per il debug di Milvus e gli aggiornamenti dinamici della configurazione.</p></li>
<li><p>Esplorate <a href="https://github.com/zilliztech/attu">Attu</a>, uno strumento open-source per la gestione intuitiva di Milvus.</p></li>
<li><p><a href="/docs/it/v2.6.x/monitor.md">Monitorate Milvus con Prometheus</a>.</p></li>
</ul>
