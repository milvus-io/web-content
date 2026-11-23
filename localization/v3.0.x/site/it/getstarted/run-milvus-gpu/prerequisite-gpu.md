---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: >-
  Scopri quali sono i preparativi necessari prima di installare Milvus con la
  GPU.
title: Requisiti per l'installazione di Milvus con GPU
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
    </button></h1><p>Questa pagina elenca i requisiti hardware e software necessari per configurare Milvus con il supporto GPU.</p>
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
    </button></h2><p>L'immagine GPU di Milvus <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> è progettata per dispositivi GPU con capacità di calcolo 7.0, 7.5, 8.0, 8.6, 9.0, 10.0 o 12.0. Il dispositivo GPU in uso deve disporre di una di queste capacità di calcolo oppure di una capacità di calcolo successiva in grado di eseguire codice creato per una di esse, ad esempio 8.9 o 12.1. Per ulteriori dettagli, consultare <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html#binary-compatibility">Compatibilità binaria</a> e <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/compute-capabilities.html#family-specific-features">Funzionalità specifiche per famiglia</a>.</p>
<p>Per verificare se la propria GPU soddisfa i requisiti, consultare <a href="https://developer.nvidia.com/cuda-gpus">la sezione "Capacità di calcolo della GPU</a> " sul sito web per sviluppatori NVIDIA.</p>
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
    </button></h2><p>L’host deve utilizzare una delle <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html">distribuzioni Linux supportate da NVIDIA Container Toolkit</a> e avere installato il driver NVIDIA per la propria GPU.</p>
<p>L'immagine GPU Milvus <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> si basa su CUDA 12.9 Update 1. La sua impostazione " <code translate="no">NVIDIA_REQUIRE_CUDA</code> " richiede " <code translate="no">cuda&gt;=12.9</code>", pertanto il driver NVIDIA deve supportare CUDA 12.9 o versioni successive. Per CUDA 12.9 Update 1, NVIDIA indica la versione del driver 575.57.08 o successive su Linux x86_64. Per le versioni dei driver relative a ciascuna release di CUDA, consultare <a href="https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html#cuda-driver">le note di rilascio del CUDA Toolkit</a>.</p>
<p>La stessa impostazione accetta anche driver dei rami 535, 550, 560, 565 e 570 su alcune marche di GPU, ma non sulle GPU GeForce o Titan. Con questi driver, l’immagine si basa sulla <a href="https://docs.nvidia.com/deploy/cuda-compatibility/forward-compatibility.html">compatibilità forward di CUDA</a>, che NVIDIA supporta solo sulle GPU NVIDIA Data Center, su alcuni modelli NGC Server Ready delle schede RTX e sulle schede Jetson. Se il driver non soddisfa questi requisiti, NVIDIA Container Toolkit segnala un errore « <code translate="no">unsatisfied condition</code> » e non configura la GPU per il container.</p>
<p>Gli utenti di Ubuntu 22.04 possono installare il driver con il seguente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-580 nvidia-utils-580</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le GPU con capacità di calcolo 10.0 o 12.0 (Blackwell) sono supportate solo dai moduli del kernel open source del driver NVIDIA. Per queste GPU, installare <code translate="no">nvidia-headless-580-open</code> anziché <code translate="no">nvidia-headless-580</code>. I moduli open source del kernel non supportano le GPU precedenti a Turing (capacità di calcolo 7.5), come Volta (7.0); per queste ultime, mantenere <code translate="no">nvidia-headless-580</code>.</p>
<p>Per altre distribuzioni Linux, consultare la <a href="https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/index.html">Guida all’installazione del driver NVIDIA</a>.</p>
<p>È possibile verificare se il driver è stato installato correttamente eseguendo il seguente comando. L'output mostra la versione del driver installato.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="NVIDIA-Container-Toolkit" class="common-anchor-header">NVIDIA Container Toolkit<button data-href="#NVIDIA-Container-Toolkit" class="anchor-icon" translate="no">
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
    </button></h2><p>Installare NVIDIA Container Toolkit seguendo i passaggi relativi alla propria distribuzione Linux riportati nella <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">guida all’installazione di NVIDIA Container Toolkit</a>.</p>
<p>Se si installa Milvus con Docker Compose, configurare Docker per utilizzare NVIDIA Container Runtime, riavviare il daemon di Docker, quindi eseguire un carico di lavoro di esempio per verificare che i container possano accedere alla GPU:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> nvidia-ctk runtime configure --runtime=docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker run --<span class="hljs-built_in">rm</span> --runtime=nvidia --gpus all ubuntu nvidia-smi</span>
<button class="copy-code-btn"></button></code></pre>
<p>L’ultimo comando esegue ` <code translate="no">nvidia-smi</code> ` in un container e visualizza le informazioni relative ai dispositivi GPU presenti sull’host. Se si installa Milvus su Kubernetes, preparare invece i nodi di lavoro GPU come descritto nelle FAQ alla fine di questa pagina.</p>
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
    </button></h2><p>I requisiti riportati in questa sezione e nelle FAQ sottostanti si applicano quando si installa Milvus con supporto GPU su Kubernetes utilizzando Helm.</p>
<p>Si consiglia di eseguire il cluster Kubernetes su piattaforme Linux.</p>
<ul>
<li>kubectl è lo strumento da riga di comando per Kubernetes. Utilizzare una versione di kubectl che differisca di non più di una versione minore rispetto a quella del proprio cluster. L’utilizzo dell’ultima versione di kubectl aiuta a evitare problemi imprevisti.</li>
<li>minikube è necessario quando si esegue un cluster Kubernetes in locale. minikube richiede Docker come dipendenza. Assicurarsi di installare Docker prima di installare Milvus utilizzando Helm. Per ulteriori informazioni, consultare la sezione " <a href="https://docs.docker.com/get-docker">Ottenere Docker</a> ".</li>
</ul>
<table>
<thead>
<tr><th>Sistema operativo</th><th>Software</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>Piattaforme Linux</td><td><ul><li>Kubernetes 1.16 o versioni successive</li><li>kubectl</li><li>Helm 3.0.0 o versioni successive</li><li>minikube (per Milvus in modalità standalone)</li><li>Docker 19.03 o versioni successive (per Milvus standalone)</li></ul></td><td>Per ulteriori informazioni, consultare <a href="https://helm.sh/docs/">la documentazione di Helm</a>.</td></tr>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Come posso avviare un cluster K8s in locale a scopo di test?<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>È possibile utilizzare strumenti come <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> e <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> per configurare rapidamente un cluster Kubernetes in locale. La procedura seguente utilizza minikube come esempio.</p>
<ol>
<li>Scarica minikube</li>
</ol>
<p>Vai alla pagina <a href="https://minikube.sigs.k8s.io/docs/start/">"Get Started</a> ", verifica di soddisfare i requisiti elencati nella sezione <strong>"What you’ll need</strong> ", fai clic sui pulsanti corrispondenti alla tua piattaforma di destinazione e copia i comandi per scaricare e installare il file binario.</p>
<ol start="2">
<li>Avvia un cluster K8s utilizzando minikube</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Verifica lo stato del cluster K8s</li>
</ol>
<p>È possibile verificare lo stato del cluster K8s installato utilizzando il seguente comando.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Assicurati di poter accedere al cluster K8s tramite <code translate="no">kubectl</code>. Se non hai installato <code translate="no">kubectl</code> localmente, consulta la sezione " <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Utilizzo di kubectl all'interno di minikube</a>".</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">Come posso avviare un cluster K8s con nodi worker dotati di GPU?<button data-href="#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>Se si preferisce utilizzare nodi di lavoro con GPU, è possibile seguire i passaggi riportati di seguito per creare un cluster K8s con nodi di lavoro con GPU. Si consiglia di installare Milvus su un cluster K8s con nodi di lavoro con GPU e di utilizzare la classe di archiviazione predefinita fornita.</p>
<ol>
<li>Preparazione dei nodi worker con GPU</li>
</ol>
<p>Per utilizzare nodi di lavoro con GPU, segui i passaggi descritti in <a href="https://github.com/NVIDIA/k8s-device-plugin#preparing-your-gpu-nodes">Preparazione dei nodi GPU</a>.</p>
<ol start="2">
<li>Abilitare il supporto GPU su K8s</li>
</ol>
<p>Distribuisci il <strong>plugin nvidia-device-plugin</strong> con Helm seguendo <a href="https://github.com/NVIDIA/k8s-device-plugin#deployment-via-helm">questi passaggi</a>.</p>
<p>Dopo la configurazione, visualizza le risorse GPU con il seguente comando. Sostituisci <code translate="no">&lt;gpu-worker-node&gt;</code> con il nome effettivo del nodo.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">  $ </span><span class="language-bash">kubectl describe node &lt;gpu-worker-node&gt;</span>

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
