---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Kubernetes
summary: Scopri come installare un cluster Milvus su Kubernetes.
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
<li><a href="/docs/it/v2.6.x/prerequisite-gpu.md">Verificare i requisiti hardware e software</a> prima dell'installazione.</li>
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
    </button></h3><p>Scarica <a href="https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose-gpu.yml"><code translate="no">milvus-standalone-docker-compose-gpu.yml</code></a> e salvalo come docker-compose.yml manualmente o con il seguente comando.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>È necessario apportare alcune modifiche alle variabili d’ambiente del servizio standalone nel file YAML come segue:</p>
<ul>
<li>Per assegnare un dispositivo GPU specifico a Milvus, individuare il campo ` <code translate="no">deploy.resources.reservations.devices[0].devices_ids</code> ` nella definizione del servizio ` <code translate="no">standalone</code> ` e sostituirne il valore con l’ID della GPU desiderata. È possibile utilizzare lo strumento ` <code translate="no">nvidia-smi</code> `, incluso nei driver di visualizzazione delle GPU NVIDIA, per determinare l’ID di un dispositivo GPU. Milvus supporta più dispositivi GPU.</li>
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

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se non si riesce a eseguire il comando sopra indicato, verificare che sul sistema sia installato Docker Compose V1. In tal caso, si consiglia di migrare a Docker Compose V2 in base alle indicazioni riportate in <a href="https://docs.docker.com/compose/">questa pagina</a>.</p>
</div>
<p>Dopo l'avvio di Milvus,</p>
<ul>
<li>i container denominati <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> e <strong>milvus-etcd</strong> sono attivi.
<ul>
<li>Il container <strong>milvus-etcd</strong> non espone alcuna porta all’host e mappa i propri dati su <strong>volumes/etcd</strong> nella cartella corrente.</li>
<li>Il container <strong>milvus-minio</strong> serve localmente le porte <strong>9090</strong> e <strong>9091</strong> con le credenziali di autenticazione predefinite e mappa i propri dati nella cartella <strong>volumes/minio</strong> nella directory corrente.</li>
<li>Il container <strong>milvus-standalone</strong> serve localmente le porte <strong>19530</strong> con le impostazioni predefinite e mappa i propri dati nella cartella <strong>volumes/milvus</strong> nella directory corrente.</li>
</ul></li>
</ul>
<p>È possibile verificare se i container sono attivi e in esecuzione utilizzando il seguente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>È inoltre possibile accedere all’interfaccia web di Milvus all’indirizzo <code translate="no">http://127.0.0.1:9091/webui/</code> per ottenere ulteriori informazioni sull’istanza di Milvus. Per i dettagli, consultare la documentazione relativa <a href="/docs/it/v2.6.x/milvus-webui.md">all’interfaccia web di Milvus</a>.</p>
<p>Se nel file docker-compose.yml sono stati assegnati più dispositivi GPU a Milvus, è possibile specificare quale dispositivo GPU sia visibile o disponibile per l’uso.</p>
<p>Rendere visibile a Milvus il dispositivo GPU <code translate="no">0</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">CUDA_VISIBLE_DEVICES=0 ./milvus run standalone</span>
<button class="copy-code-btn"></button></code></pre>
<p>Rendere visibili a Milvus i dispositivi GPU <code translate="no">0</code> e <code translate="no">1</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone</span>
<button class="copy-code-btn"></button></code></pre>
<p>È possibile arrestare ed eliminare questo container come segue.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">Configurare il pool di memoria<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta avviato Milvus, è possibile personalizzare il pool di memoria modificando le impostazioni <code translate="no">initMemSize</code> e <code translate="no">maxMemSize</code> nel file <code translate="no">milvus.yaml</code>.</p>
<div class="alert note">
<p>Il file <code translate="no">milvus.yaml</code> si trova nella directory <code translate="no">/milvus/configs/</code> all'interno del container Milvus.</p>
</div>
<p>Per configurare il pool di memoria, modificare le impostazioni <code translate="no">initMemSize</code> e <code translate="no">maxMemSize</code> nel file <code translate="no">milvus.yaml</code> come segue.</p>
<ol>
<li><p>Utilizzare il seguente comando per copiare il file ` <code translate="no">milvus.yaml</code> ` dal container Milvus sul proprio computer locale. Sostituire ` <code translate="no">&lt;milvus_container_id&gt;</code> ` con l’ID effettivo del proprio container Milvus.</p>
<pre><code translate="no" class="language-shell">docker cp &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Apri il file <code translate="no">milvus.yaml</code> copiato con il tuo editor di testo preferito. Ad esempio, utilizzando vim:</p>
<pre><code translate="no" class="language-shell">vim milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Modifica le impostazioni <code translate="no">initMemSize</code> e <code translate="no">maxMemSize</code> secondo necessità e salva le modifiche:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: Dimensione iniziale del pool di memoria. Il valore predefinito è 1024.</li>
<li><code translate="no">maxMemSize</code>: Dimensione massima del pool di memoria. Il valore predefinito è 2048.</li>
</ul></li>
<li><p>Utilizza il seguente comando per copiare il file <code translate="no">milvus.yaml</code> modificato nuovamente nel container Milvus. Sostituisci <code translate="no">&lt;milvus_container_id&gt;</code> con l’ID effettivo del tuo container Milvus.</p>
<pre><code translate="no" class="language-shell">docker cp milvus.yaml &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Riavvia il container Milvus per applicare le modifiche:</p>
<pre><code translate="no" class="language-shell">docker stop &lt;milvus_container_id&gt;
docker start &lt;milvus_container_id&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
<li><p>Consultare <a href="/docs/it/v2.6.x/quickstart.md">la Guida rapida</a> per scoprire cosa può fare Milvus.</p></li>
<li><p>Consultare <a href="/docs/it/v2.6.x/milvus-webui.md">l’interfaccia web di Milvus</a> per saperne di più sull’istanza di Milvus.</p></li>
<li><p>Imparare le operazioni di base di Milvus:</p>
<ul>
<li><a href="/docs/it/v2.6.x/manage_databases.md">Gestire i database</a></li>
<li><a href="/docs/it/v2.6.x/manage-collections.md">Gestire le collezioni</a></li>
<li><a href="/docs/it/v2.6.x/manage-partitions.md">Gestire le partizioni</a></li>
<li><a href="/docs/it/v2.6.x/insert-update-delete.md">Inserimento, aggiornamento e cancellazione</a></li>
<li><a href="/docs/it/v2.6.x/single-vector-search.md">Ricerca su singolo vettore</a></li>
<li><a href="/docs/it/v2.6.x/multi-vector-search.md">Ricerca ibrida</a></li>
</ul></li>
<li><p><a href="/docs/it/v2.6.x/upgrade_milvus_cluster-helm.md">Aggiornamento di Milvus tramite Helm Chart</a>.</p></li>
<li><p><a href="/docs/it/v2.6.x/scaleout.md">Scalare il cluster Milvus</a>.</p></li>
<li><p>Distribuisci il tuo cluster Milvus su cloud:</p>
<ul>
<li><a href="/docs/it/v2.6.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/it/v2.6.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/it/v2.6.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Scopri <a href="/docs/it/v2.6.x/milvus-webui.md">Milvus WebUI</a>, un'interfaccia web intuitiva per il monitoraggio e la gestione di Milvus.</p></li>
<li><p>Scopri <a href="/docs/it/v2.6.x/milvus_backup_overview.md">Milvus Backup</a>, uno strumento open source per il backup dei dati di Milvus.</p></li>
<li><p>Scopri <a href="/docs/it/v2.6.x/birdwatcher_overview.md">Birdwatcher</a>, uno strumento open source per il debug di Milvus e gli aggiornamenti dinamici della configurazione.</p></li>
<li><p>Scopri <a href="https://github.com/zilliztech/attu">Attu</a>, uno strumento GUI open source per una gestione intuitiva di Milvus.</p></li>
<li><p><a href="/docs/it/v2.6.x/monitor.md">Monitora Milvus con Prometheus</a>.</p></li>
</ul>
