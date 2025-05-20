---
id: configure_grafana_loki.md
title: Configurare Grafana Loki
summary: >-
  Questo argomento descrive come raccogliere i log utilizzando Loki e come
  interrogare i log di un cluster Milvus utilizzando Grafana.
---
<h1 id="Configure-Grafana-Loki" class="common-anchor-header">Configurare Grafana Loki<button data-href="#Configure-Grafana-Loki" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida fornisce istruzioni su come configurare Loki per raccogliere i log e Grafana per interrogare e visualizzare i log per un cluster Milvus.</p>
<p>In questa guida si apprende come:</p>
<ul>
<li>Distribuire <a href="https://grafana.com/docs/loki/latest/get-started/overview/">Loki</a> e <a href="https://grafana.com/docs/loki/latest/send-data/promtail/">Promtail</a> su un cluster Milvus utilizzando Helm.</li>
<li>Configurare lo storage a oggetti per Loki.</li>
<li>Interrogare i log utilizzando Grafana.</li>
</ul>
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
<li>È stato <a href="/docs/it/v2.4.x/install_cluster-helm.md">installato un cluster Milvus su K8s</a>.</li>
<li>Avete installato gli strumenti necessari, compresi <a href="https://helm.sh/docs/intro/install/">Helm</a> e <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
</ul>
<h2 id="Deploy-Loki" class="common-anchor-header">Distribuire Loki<button data-href="#Deploy-Loki" class="anchor-icon" translate="no">
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
    </button></h2><p>Loki è un sistema di aggregazione dei log ispirato a Prometheus. Distribuite Loki usando Helm per raccogliere i log dal vostro cluster Milvus.</p>
<h3 id="1-Add-Grafanas-Helm-Chart-Repository" class="common-anchor-header">1. Aggiungere il repository dei grafici Helm di Grafana</h3><p>Aggiungete il repository dei grafici di Grafana a Helm e aggiornatelo:</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> grafana https:<span class="hljs-comment">//grafana.github.io/helm-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Configure-Object-Storage-for-Loki" class="common-anchor-header">2. Configurare l'archiviazione a oggetti per Loki</h3><p>Scegliere una delle seguenti opzioni di archiviazione e creare un file di configurazione <code translate="no">loki.yaml</code>:</p>
<ul>
<li><p>Opzione 1: Utilizzo di MinIO per lo storage</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki</span>:
  <span class="hljs-attr">commonConfig</span>:
    <span class="hljs-attr">replication_factor</span>: <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled</span>: <span class="hljs-literal">false</span>

<span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Opzione 2: Utilizzo di AWS S3 per lo storage</p>
<p>Nell'esempio seguente, sostituire <code translate="no">&lt;accessKey&gt;</code> e <code translate="no">&lt;keyId&gt;</code> con la propria chiave di accesso e ID S3, <code translate="no">s3.endpoint</code> con l'endpoint S3 e <code translate="no">s3.region</code> con la regione S3.</p>
<pre><code translate="no" class="language-yaml">loki:
  commonConfig:
    replication_factor: 1
  auth_enabled: <span class="hljs-literal">false</span>
  storage:
    bucketNames:
      chunks: loki-chunks
      ruler: loki-ruler
      admin: loki-admin
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&#x27;s3&#x27;</span>
    s3:
      endpoint: s3.us-west-2.amazonaws.com
      region: us-west-2
      secretAccessKey: &lt;accessKey&gt;
      accessKeyId: &lt;keyId&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Install-Loki" class="common-anchor-header">3. Installare Loki</h3><p>Eseguire i seguenti comandi per installare Loki:</p>
<pre><code translate="no" class="language-shell">kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Promtail" class="common-anchor-header">Distribuire Promtail<button data-href="#Deploy-Promtail" class="anchor-icon" translate="no">
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
    </button></h2><p>Promtail è un agente di raccolta dei log per Loki. Legge i log dai pod Milvus e li invia a Loki.</p>
<h3 id="1-Create-Promtail-Configuration" class="common-anchor-header">1. Creare la configurazione di Promtail</h3><p>Creare un file di configurazione <code translate="no">promtail.yaml</code>:</p>
<pre><code translate="no" class="language-yaml">config:
  clients:
    - url: http://loki-gateway/loki/api/v1/push
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Promtail" class="common-anchor-header">2. Installare Promtail</h3><p>Installare Promtail utilizzando Helm:</p>
<pre><code translate="no" class="language-shell">helm install  --values promtail.yaml promtail grafana/promtail -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-Logs-with-Grafana" class="common-anchor-header">Interrogare i log con Grafana<button data-href="#Query-Logs-with-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><p>Distribuire Grafana e configurarlo per connettersi a Loki per interrogare i log.</p>
<h3 id="1-Deploy-Grafana" class="common-anchor-header">1. Installazione di Grafana</h3><p>Installare Grafana utilizzando i seguenti comandi:</p>
<pre><code translate="no" class="language-shell">kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
<button class="copy-code-btn"></button></code></pre>
<p>Prima di poter accedere a Grafana, è necessario recuperare la password <code translate="no">admin</code>:</p>
<pre><code translate="no" class="language-shell">kubectl get secret --namespace monitoring my-grafana -o jsonpath=<span class="hljs-string">&quot;{.data.admin-password}&quot;</span> | <span class="hljs-built_in">base64</span> --decode ; <span class="hljs-built_in">echo</span>
<button class="copy-code-btn"></button></code></pre>
<p>Quindi, inoltrare la porta di Grafana al computer locale:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">POD_NAME</span>=$(kubectl get pods --namespace monitoring -l <span class="hljs-string">&quot;app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana&quot;</span> -o jsonpath=<span class="hljs-string">&quot;{.items[0].metadata.name}&quot;</span>)
kubectl --namespace monitoring port-forward $POD_NAME <span class="hljs-number">3000</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Add-Loki-as-a-Data-Source-in-Grafana" class="common-anchor-header">2. Aggiungere Loki come origine dati in Grafana</h3><p>Una volta che Grafana è in funzione, è necessario aggiungere Loki come origine dati per interrogare i registri.</p>
<ol>
<li>Aprire un browser web e navigare all'indirizzo <code translate="no">127.0.0.1:3000</code>. Accedere utilizzando il nome utente <code translate="no">admin</code> e la password ottenuta in precedenza.</li>
<li>Nel menu di sinistra, scegliere <strong>Connessioni</strong> &gt; <strong>Aggiungi nuova connessione</strong>.</li>
<li>Nella pagina visualizzata, scegliere <strong>Loki</strong> come tipo di origine dati. È possibile inserire <strong>loki</strong> nella barra di ricerca per trovare l'origine dati.</li>
<li>Nelle impostazioni dell'origine dati Loki, specificare il <strong>nome</strong> e l'<strong>URL</strong>, quindi fare clic su <strong>Salva e prova</strong>.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/datasource.jpg" alt="DataSource" class="doc-image" id="datasource" />
   </span> <span class="img-wrapper"> <span>Origine dati</span> </span></p>
<h3 id="3-Query-Milvus-Logs" class="common-anchor-header">3. Interrogazione dei registri Milvus</h3><p>Dopo aver aggiunto Loki come origine dati, è possibile interrogare i log di Milvus in Grafana:</p>
<ol>
<li>Nel menu di sinistra, fare clic su <strong>Esplora</strong>.</li>
<li>Nell'angolo superiore sinistro della pagina, scegliere l'origine dati Loki.</li>
<li>Utilizzare il <strong>browser delle etichette</strong> per selezionare le etichette e interrogare i registri.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvuslog.jpg" alt="Query" class="doc-image" id="query" />
   </span> <span class="img-wrapper"> <span>Interrogazione</span> </span></p>
