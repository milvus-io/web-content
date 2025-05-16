---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: Imparate i preparativi necessari prima di installare Milvus con Helm.
title: Requisiti per l'esecuzione di Milvus su Kubernetes
---
<h1 id="Requirements-for-running-Milvus-on-Kubernetes" class="common-anchor-header">Requisiti per l'esecuzione di Milvus su Kubernetes<button data-href="#Requirements-for-running-Milvus-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>In questa pagina sono elencati i requisiti hardware e software per far funzionare Milvus.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Requisiti hardware<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Componente</th><th>Requisiti</th><th>Raccomandazione</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>CPU Intel Core di seconda generazione o superiore</li><li>Silicio Apple</li></ul></td><td><ul><li>Standalone: 4 core o più</li><li>Cluster: 8 core o più</li></ul></td><td></td></tr>
<tr><td>Set di istruzioni della CPU</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>La ricerca di similarità vettoriale e la creazione di indici in Milvus richiedono il supporto da parte della CPU di set di estensioni SIMD (single instruction, multiple data). Assicurarsi che la CPU supporti almeno una delle estensioni SIMD elencate. Per ulteriori informazioni, vedere <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">CPU con AVX</a>.</td></tr>
<tr><td>RAM</td><td><ul><li>Standalone: 8G</li><li>Cluster: 32G</li></ul></td><td><ul><li>Standalone: 16G</li><li>Cluster: 128G</li></ul></td><td>La dimensione della RAM dipende dal volume dei dati.</td></tr>
<tr><td>Disco rigido</td><td>SSD SATA 3.0 o CloudStorage</td><td>SSD NVMe o superiore</td><td>Le dimensioni del disco rigido dipendono dal volume dei dati.</td></tr>
</tbody>
</table>
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
    </button></h2><p>Si consiglia di eseguire il cluster Kubernetes su piattaforme Linux.</p>
<p>kubectl è lo strumento a riga di comando per Kubernetes. Utilizzare una versione di kubectl con una differenza di versione minore rispetto al proprio cluster. L'uso della versione più recente di kubectl aiuta a evitare problemi imprevisti.</p>
<p>minikube è necessario quando si esegue il cluster Kubernetes in locale. minikube richiede Docker come dipendenza. Assicurarsi di installare Docker prima di installare Milvus con Helm. Per ulteriori informazioni, vedere <a href="https://docs.docker.com/get-docker">Ottenere Docker</a>.</p>
<table>
<thead>
<tr><th>Sistema operativo</th><th>Software</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>Piattaforme Linux</td><td><ul><li>Kubernetes 1.16 o successivo</li><li>kubectl</li><li>Helm 3.0.0 o successivo</li><li>minikube (per Milvus standalone)</li><li>Docker 19.03 o successivo (per Milvus standalone)</li></ul></td><td>Per ulteriori informazioni, consultare i <a href="https://helm.sh/docs/">documenti di Helm</a>.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Software</th><th>Versione</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Vedere i <a href="#Additional-disk-requirements">requisiti aggiuntivi del disco</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Requisiti aggiuntivi del disco</h3><p>Le prestazioni del disco sono fondamentali per etcd. Si consiglia vivamente di utilizzare unità SSD NVMe locali. Una risposta più lenta del disco può causare frequenti elezioni del cluster che finiranno per degradare il servizio etcd.</p>
<p>Per verificare se il disco è qualificato, usare <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealmente, il disco dovrebbe raggiungere oltre 500 IOPS e meno di 10 ms per la latenza di fsync al 99° percentile. Leggete i <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">documenti di</a> etcd per requisiti più dettagliati.</p>
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
    </button></h2><ul>
<li><p>Se l'hardware e il software soddisfano i requisiti, è possibile:</p>
<ul>
<li><a href="/docs/it/v2.4.x/install_cluster-milvusoperator.md">Eseguire Milvus in Kubernet con Milvus Operator</a></li>
<li><a href="/docs/it/v2.4.x/install_cluster-helm.md">Eseguire Milvus in Kubernetes con Helm.</a></li>
</ul></li>
<li><p>Vedere <a href="/docs/it/v2.4.x/system_configuration.md">Configurazione del sistema</a> per i parametri che si possono impostare durante l'installazione di Milvus.</p></li>
</ul>
