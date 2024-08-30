---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: Imparate i preparativi necessari prima di installare Milvus con la GPU.
title: Requisiti per l'installazione di Milvus con la GPU
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">Requisiti per l'installazione di Milvus con GPU<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa pagina elenca i requisiti hardware e software per configurare Milvus con il supporto GPU.</p>
<h2 id="Compute-capability" class="common-anchor-header">Capacità di calcolo<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>La capacità di calcolo del dispositivo GPU deve essere una delle seguenti: 6.0, 7.0, 7.5, 8.0, 8.6, 9.0.</p>
<p>Per verificare se il dispositivo GPU soddisfa il requisito, controllare la <a href="https://developer.nvidia.com/cuda-gpus">capacità di calcolo della GPU</a> sul sito Web degli sviluppatori NVIDIA.</p>
<h2 id="NVIDIA-driver" class="common-anchor-header">Driver NVIDIA<button data-href="#NVIDIA-driver" class="anchor-icon" translate="no">
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
    </button></h2><p>Il driver NVIDIA per il dispositivo GPU deve essere presente in una delle <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">distribuzioni Linux supportate</a> e l'NVIDIA Container Toolkit deve essere stato installato seguendo <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">questa guida</a>.</p>
<p>Per gli utenti di Ubuntu 22.04, è possibile installare il driver e il Container Toolkit con i seguenti comandi:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545
<button class="copy-code-btn"></button></code></pre>
<p>Per gli altri sistemi operativi, consultare la <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian">guida ufficiale all'installazione</a>.</p>
<p>È possibile verificare se il driver è stato installato correttamente eseguendo il seguente comando:</p>
<pre><code translate="no" class="language-shell">$ modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span>
<span class="hljs-attr">version</span>:        <span class="hljs-number">545.29</span><span class="hljs-number">.06</span>
<button class="copy-code-btn"></button></code></pre>
<p>Si consiglia di utilizzare i driver della versione 545 e successive.</p>
<h2 id="Software-requirements" class="common-anchor-header">Requisiti del software<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Si consiglia di eseguire il cluster Kubernetes su piattaforme Linux.</p>
<ul>
<li>kubectl è lo strumento a riga di comando per Kubernetes. Utilizzare una versione di kubectl con una differenza di versione minore rispetto al proprio cluster. L'uso della versione più recente di kubectl aiuta a evitare problemi imprevisti.</li>
<li>minikube è necessario quando si esegue il cluster Kubernetes in locale. minikube richiede Docker come dipendenza. Assicurarsi di installare Docker prima di installare Milvus con Helm. Per ulteriori informazioni, vedere <a href="https://docs.docker.com/get-docker">Ottenere Docker</a>.</li>
</ul>
<table>
<thead>
<tr><th>Sistema operativo</th><th>Software</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>Piattaforme Linux</td><td><ul><li>Kubernetes 1.16 o successivo</li><li>kubectl</li><li>Helm 3.0.0 o successivo</li><li>minikube (per Milvus standalone)</li><li>Docker 19.03 o successivo (per Milvus standalone)</li></ul></td><td>Per ulteriori informazioni, consultare i <a href="https://helm.sh/docs/">documenti Helm</a>.</td></tr>
</tbody>
</table>
<h2 id="FAQs" class="common-anchor-header">Domande frequenti<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Come posso avviare un cluster K8s localmente a scopo di test?</h3><p>È possibile utilizzare strumenti come <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> e <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> per configurare rapidamente un cluster Kubernetes a livello locale. La procedura seguente utilizza minikube come esempio.</p>
<ol>
<li>Scaricare minikube</li>
</ol>
<p>Accedere alla pagina <a href="https://minikube.sigs.k8s.io/docs/start/">Get Started</a>, verificare se sono soddisfatte le condizioni elencate nella sezione <strong>What you'll need</strong>, fare clic sui pulsanti che descrivono la piattaforma di destinazione e copiare i comandi per scaricare e installare il binario.</p>
<ol start="2">
<li>Avviare un cluster K8s con minikube</li>
</ol>
<pre><code translate="no" class="language-shell">$ minikube start
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Controllare lo stato del cluster K8s</li>
</ol>
<p>È possibile verificare lo stato del cluster K8s installato utilizzando il seguente comando.</p>
<pre><code translate="no" class="language-shell">$ kubectl cluster-info
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Assicurarsi di poter accedere al cluster K8s tramite <code translate="no">kubectl</code>. Se non è stato installato localmente <code translate="no">kubectl</code>, vedere <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Utilizzare kubectl all'interno di minikube</a>.</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">Come posso avviare un cluster K8s con nodi worker GPU?</h3><p>Se si preferisce usare nodi worker abilitati alle GPU, si può seguire la procedura seguente per creare un cluster K8s con nodi worker GPU. Si consiglia di installare Milvus su un cluster K8s con nodi worker GPU e di utilizzare la classe di storage predefinita.</p>
<ol>
<li>Preparare i nodi worker GPU</li>
</ol>
<p>Per utilizzare i nodi worker abilitati alle GPU, seguire i passaggi in <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes">Preparare i nodi GPU</a>.</p>
<ol start="2">
<li>Abilitare il supporto GPU su K8s</li>
</ol>
<p>Distribuire il <strong>plugin nvidia-device</strong> con Helm seguendo <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm">questi passaggi</a>.</p>
<p>Dopo la configurazione, visualizzare le risorse della GPU con il seguente comando. Sostituire <code translate="no">&lt;gpu-worker-node&gt;</code> con il nome effettivo del nodo.</p>
<pre><code translate="no" class="language-shell">  $ kubectl describe node &lt;gpu-worker-node&gt;

  Capacity:
  ...
  nvidia.com/gpu:     4
  ...
  Allocatable:
  ...
  nvidia.com/gpu:     4
  ...
  ```  
<button class="copy-code-btn"></button></code></pre>
