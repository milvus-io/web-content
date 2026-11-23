---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Docker Compose
summary: >-
  Scopri come installare Milvus in modalità standalone con supporto GPU
  utilizzando Docker Compose.
title: Eseguire Milvus con supporto GPU utilizzando Docker Compose
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">Eseguire Milvus con supporto GPU utilizzando Docker Compose<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa pagina illustra come avviare un'istanza di Milvus con supporto GPU utilizzando Docker Compose.</p>
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
<li><a href="https://docs.docker.com/get-docker/">Installare Docker</a>.</li>
<li><a href="/docs/it/prerequisite-gpu.md">Verificare i requisiti hardware e software</a> prima dell’installazione.</li>
</ul>
<div class="alert note">
<p>Se si riscontrano problemi durante il download dell'immagine, contattarci all'indirizzo <a href="mailto:community@zilliz.com">community@zilliz.com</a> fornendo i dettagli del problema e forniremo l'assistenza necessaria.</p>
</div>
<h2 id="Install-Milvus" class="common-anchor-header">Installazione di Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Per installare Milvus con supporto GPU utilizzando Docker Compose, segui questi passaggi.</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. Scarica e configura il file YAML<button data-href="#1-Download-and-configure-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Scarica <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml"><code translate="no">milvus-standalone-docker-compose-gpu.yaml</code></a> e salvalo come docker-compose.yml manualmente o con il seguente comando.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per verificare il download, confronta l'output del seguente comando con il digest <code translate="no">sha256</code> indicato per <code translate="no">milvus-standalone-docker-compose-gpu.yaml</code> nella <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">pagina delle versioni</a>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sha256sum</span> docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>È possibile modificare i dispositivi GPU assegnati a Milvus nella sezione <code translate="no">deploy</code> del servizio <code translate="no">standalone</code> nel file YAML come segue:</p>
<ul>
<li>Per assegnare un dispositivo GPU specifico a Milvus, individuare il campo <code translate="no">deploy.resources.reservations.devices[0].device_ids</code> nella definizione del servizio <code translate="no">standalone</code> e sostituirne il valore con l’ID della GPU desiderata. È possibile utilizzare lo strumento <code translate="no">nvidia-smi</code>, incluso nei driver di visualizzazione delle GPU NVIDIA, per determinare l’ID di un dispositivo GPU. Milvus supporta più dispositivi GPU.</li>
</ul>
<p>Assegnare un singolo dispositivo GPU a Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&quot;0&quot;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Assegnare più dispositivi GPU a Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Avviare Milvus<button data-href="#2-Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Nella directory che contiene il file docker-compose.yml, avviare Milvus eseguendo:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se non si riesce a eseguire il comando sopra indicato, verificare se sul sistema è installato Docker Compose V1. In tal caso, si consiglia di migrare a Docker Compose V2 in base alle indicazioni riportate in <a href="https://docs.docker.com/compose/">questa pagina</a>.</p>
</div>
<p>Dopo l'avvio di Milvus,</p>
<ul>
<li>i container denominati <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> e <strong>milvus-etcd</strong> sono attivi.
<ul>
<li>Il container <strong>milvus-etcd</strong> non espone alcuna porta all’host e mappa i propri dati su <strong>volumes/etcd</strong> nella cartella corrente.</li>
<li>Il container <strong>milvus-minio</strong> serve le porte <strong>9000</strong> e <strong>9001</strong> con le credenziali di autenticazione predefinite e mappa i propri dati nella cartella <strong>volumes/minio</strong> nella directory corrente.</li>
<li>Il container <strong>milvus-standalone</strong> serve le porte <strong>19530</strong> e <strong>9091</strong> con le impostazioni predefinite e mappa i propri dati nella <strong>cartella volumes/milvus</strong> nella directory corrente.</li>
</ul></li>
</ul>
<p>Il servizio ` <code translate="no">standalone</code> ` imposta ` <code translate="no">security_opt: seccomp:unconfined</code>`, in modo che il container Milvus venga eseguito senza il profilo seccomp predefinito di Docker.</p>
<div class="alert warning">
<blockquote>
<p>Il file Compose pubblica queste porte senza un IP host, quindi Docker le associa a tutte le interfacce di rete dell’host e le altre macchine in grado di raggiungere questo host possono connettersi a Milvus e MinIO. MinIO utilizza la chiave di accesso e la chiave segreta <code translate="no">minioadmin</code>, che sono impostate nel file Compose. Per pubblicare le porte solo sull’indirizzo di loopback, aggiungere <code translate="no">127.0.0.1:</code> alle voci <code translate="no">ports</code> dei servizi <code translate="no">minio</code> e <code translate="no">standalone</code> in <code translate="no">docker-compose.yml</code>, ad esempio <code translate="no">&quot;127.0.0.1:19530:19530&quot;</code>, ed eseguire nuovamente <code translate="no">sudo docker compose up -d</code>. Per ulteriori dettagli, consultare <a href="https://docs.docker.com/engine/network/port-publishing/">Pubblicazione e mappatura delle porte</a>. Per utilizzare altre credenziali MinIO, modificare <code translate="no">MINIO_ACCESS_KEY</code> e <code translate="no">MINIO_SECRET_KEY</code> del servizio <code translate="no">minio</code> e impostare gli stessi valori in <code translate="no">minio.accessKeyID</code> e <code translate="no">minio.secretAccessKey</code> della configurazione di Milvus. Per richiedere un nome utente e una password per le connessioni dei client a Milvus, consultare <a href="/docs/it/authenticate.md">Autenticazione dell'accesso utente</a>.</p>
</blockquote>
</div>
<p>È possibile verificare se i container sono attivi e in esecuzione utilizzando il seguente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per impostazione predefinita, il comando elenca solo i container in esecuzione. Verificare che l’output riporti i container <strong>milvus-etcd</strong>, <strong>milvus-minio</strong> e <strong>milvus-standalone</strong> e che la colonna <code translate="no">STATUS</code> di ciascuno di essi inizi con <code translate="no">Up</code>.</p>
<p>È inoltre possibile accedere all’interfaccia web di Milvus all’indirizzo <code translate="no">http://127.0.0.1:9091/webui/</code> per ulteriori informazioni sull’istanza di Milvus in uso. Per i dettagli, consultare la documentazione relativa <a href="/docs/it/milvus-webui.md">all’interfaccia web di Milvus</a>.</p>
<p>Per modificare i dispositivi GPU utilizzati da Milvus dopo l’avvio, modificare il campo <code translate="no">device_ids</code> sotto <code translate="no">deploy.resources.reservations.devices</code> del servizio <code translate="no">standalone</code> nel file docker-compose.yml come mostrato nel passaggio 1, quindi eseguire il comando seguente. Poiché la configurazione del servizio è stata modificata, <code translate="no">docker compose up</code> arresta e ricrea il container <strong>milvus-standalone</strong>. Per ulteriori dettagli, consultare <a href="https://docs.docker.com/compose/how-tos/gpu-support/">Eseguire servizi Docker Compose con accesso alla GPU</a>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<p>È possibile arrestare ed eliminare questo container come segue.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">Configurazione del pool di memoria<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta che Milvus è attivo e in esecuzione, è possibile personalizzare il pool di memoria modificando le impostazioni <code translate="no">initMemSize</code> e <code translate="no">maxMemSize</code> nella sezione <code translate="no">gpu</code> della configurazione di Milvus.</p>
<div class="alert note">
<p>Il file <code translate="no">milvus.yaml</code> si trova nella directory <code translate="no">/milvus/configs/</code> all'interno del container Milvus. Le impostazioni nel file <code translate="no">user.yaml</code> nella stessa directory sostituiscono i valori presenti in <code translate="no">milvus.yaml</code>.</p>
</div>
<p>Per mantenere le impostazioni quando il container viene ricreato, salvarle in un file <code translate="no">user.yaml</code> sull’host e montare il file nel container come segue.</p>
<ol>
<li><p>Nella directory che contiene il file `docker-compose.yml`, creare un file denominato ` <code translate="no">user.yaml</code> ` con le impostazioni che si desidera modificare. L’esempio seguente mostra la sezione ` <code translate="no">gpu</code> ` con i relativi valori predefiniti. Sostituirli con le dimensioni desiderate:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: Dimensione iniziale del pool di memoria, in MB. Il valore predefinito è 2048.</li>
<li><code translate="no">maxMemSize</code>: Dimensione massima del pool di memoria, in MB. Il valore predefinito è 4096.</li>
</ul></li>
<li><p>Nel file docker-compose.yml, aggiungi il file <code translate="no">user.yaml</code> all'elenco <code translate="no">volumes</code> del servizio <code translate="no">standalone</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Ricrea il container Milvus per applicare le modifiche:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Dopo aver montato il file, riavviare il servizio ` <code translate="no">standalone</code> ` per applicare le modifiche successive a ` <code translate="no">user.yaml</code>`:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose restart standalone</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Storage V3 è disabilitato per impostazione predefinita. Abilitalo prima di utilizzare le funzionalità che dipendono da esso. Per i requisiti e le considerazioni sulla compatibilità, consulta <a href="/docs/it/storage-v3.md">Storage V3</a>.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Prossimi passi<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Consultare <a href="/docs/it/quickstart.md">la Guida rapida</a> per scoprire cosa può fare Milvus.</p></li>
<li><p>Consultare <a href="/docs/it/milvus-webui.md">l’interfaccia utente web di Milvus</a> per saperne di più sull’istanza di Milvus.</p></li>
<li><p>Imparare le operazioni di base di Milvus:</p>
<ul>
<li><a href="/docs/it/manage_databases.md">Gestire i database</a></li>
<li><a href="/docs/it/manage-collections.md">Gestire le collezioni</a></li>
<li><a href="/docs/it/manage-partitions.md">Gestire le partizioni</a></li>
<li><a href="/docs/it/insert-update-delete.md">Inserimento, aggiornamento e cancellazione</a></li>
<li><a href="/docs/it/single-vector-search.md">Ricerca su singolo vettore</a></li>
<li><a href="/docs/it/multi-vector-search.md">Ricerca ibrida</a></li>
</ul></li>
<li><p><a href="/docs/it/upgrade_milvus_standalone-docker.md">Eseguire l'aggiornamento di Milvus Standalone con Docker Compose</a>. In quella pagina è riportato il tag dell'immagine CPU. Per questa distribuzione su GPU, mantenere il suffisso <code translate="no">-gpu</code> (<code translate="no">milvusdb/milvus:v3.0.5-gpu</code>) e mantenere le impostazioni <code translate="no">deploy</code> e <code translate="no">user.yaml</code>.</p></li>
<li><p><a href="/docs/it/scaleout.md">Scalare un cluster Milvus</a> su Kubernetes. Tale procedura utilizza Helm e non è applicabile a questa distribuzione Docker.</p></li>
<li><p>Distribuisci il tuo cluster Milvus su cloud:</p>
<ul>
<li><a href="/docs/it/eks.md">Amazon EKS</a></li>
<li><a href="/docs/it/gcp.md">Google Cloud</a></li>
<li><a href="/docs/it/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Scopri <a href="/docs/it/milvus-webui.md">Milvus WebUI</a>, un'interfaccia web intuitiva per il monitoraggio e la gestione di Milvus.</p></li>
<li><p>Scopri <a href="/docs/it/milvus_backup_overview.md">Milvus Backup</a>, uno strumento open source per il backup dei dati di Milvus.</p></li>
<li><p>Scopri <a href="/docs/it/birdwatcher_overview.md">Birdwatcher</a>, uno strumento open source per il debug di Milvus e gli aggiornamenti dinamici della configurazione.</p></li>
<li><p>Scopri <a href="https://github.com/zilliztech/attu">Attu</a>, uno strumento GUI open source per una gestione intuitiva di Milvus.</p></li>
<li><p><a href="/docs/it/monitor.md">Monitora Milvus con Prometheus</a>.</p></li>
</ul>
