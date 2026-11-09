---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: Scopri come installare Milvus in modalità standalone con Docker.
title: Eseguire Milvus in Docker (Linux)
---
<h1 id="Run-Milvus-in-Docker-Linux" class="common-anchor-header">Eseguire Milvus in Docker (Linux)<button data-href="#Run-Milvus-in-Docker-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa pagina illustra come avviare un'istanza di Milvus in Docker.</p>
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
<li><a href="/docs/it/prerequisite-docker.md">Verificare i requisiti hardware e software</a> prima dell'installazione.</li>
</ul>
<h2 id="Install-Milvus-in-Docker" class="common-anchor-header">Installare Milvus in Docker<button data-href="#Install-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus fornisce uno script di installazione per installarlo come container Docker. Lo script è disponibile nel <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">repository di Milvus</a>. Scaricare e controllare lo script prima di avviare una nuova distribuzione:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Inspect the Docker image selected by the script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">grep -n <span class="hljs-string">&quot;milvusdb/milvus:&quot;</span> standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Lo script viene scaricato dal ramo " <code translate="no">master</code> " di Milvus. Il tag dell'immagine Docker è definito nello script e può differire dalla versione v3.0.5. Per installare esattamente quella versione, utilizzare la configurazione con versione specificata in " <a href="/docs/it/install_standalone-docker-compose.md">Eseguire Milvus con Docker Compose</a>".</p>
<p>Questa distribuzione Docker esegue <strong>Woodpecker</strong> utilizzando il <strong>filesystem locale</strong> come backend WAL, pertanto non è richiesto alcun servizio esterno di coda dei messaggi. Vedere <a href="/docs/it/woodpecker.md">Woodpecker</a>.</p>
<p>Se si desidera utilizzare <a href="/docs/it/milvus_backup_overview.md">Backup</a> in modalità di distribuzione autonoma, si consiglia di utilizzare il metodo di distribuzione <a href="/docs/it/install_standalone-docker-compose.md">Docker Compose</a>.</p>
<p>Se si riscontrano problemi durante il download dell’immagine, contattarci all’indirizzo <a href="mailto:community@zilliz.com">community@zilliz.com</a> fornendo i dettagli del problema e forniremo l’assistenza necessaria.</p>
</div>
<p>Dopo aver eseguito lo script di installazione:</p>
<ul>
<li>È stato avviato un container Docker denominato milvus-standalone sulla porta <strong>19530</strong>.</li>
<li>Insieme a Milvus, nello stesso container è installato un etcd integrato, che opera sulla porta <strong>2379</strong>. Il suo file di configurazione è mappato su <strong>embedEtcd.yaml</strong> nella cartella corrente.</li>
<li>Per modificare la configurazione predefinita di Milvus, aggiungi le tue impostazioni al file <strong>user.yaml</strong> nella cartella corrente, quindi riavvia il servizio.</li>
<li>Il volume di dati di Milvus è mappato su <strong>volumes/milvus</strong> nella cartella corrente.</li>
</ul>
<p>Verifica l'immagine effettiva e lo stato di integrità:</p>
<pre><code translate="no" class="language-bash">docker inspect --format <span class="hljs-string">&#x27;{{.Config.Image}}&#x27;</span> milvus-standalone
docker inspect --format <span class="hljs-string">&#x27;{{.State.Health.Status}}&#x27;</span> milvus-standalone
<button class="copy-code-btn"></button></code></pre>
<p>Attendere che venga visualizzato il messaggio " <code translate="no">healthy</code> " prima di seguire <a href="/docs/it/quickstart.md">la guida rapida</a>. Quando si utilizza questo server, collegare l'SDK a <code translate="no">http://localhost:19530</code>; un URI locale <code translate="no">.db</code> avvia invece Milvus Lite.</p>
<p>È possibile accedere all’interfaccia utente web di Milvus all’indirizzo <code translate="no">http://127.0.0.1:9091/webui/</code> per ottenere ulteriori informazioni sull’istanza di Milvus in uso. Per i dettagli, consultare la documentazione relativa <a href="/docs/it/milvus-webui.md">all’interfaccia utente web di Milvus</a>.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Facoltativo) Aggiornamento delle configurazioni di Milvus<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile modificare le configurazioni di Milvus nel file <strong>user.yaml</strong> presente nella cartella corrente. Ad esempio, per cambiare l'URI da <code translate="no">proxy.healthCheckTimeout</code> a <code translate="no">1000</code> ms, è possibile modificare il file come segue:</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Quindi riavviare il servizio come segue:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per le voci di configurazione applicabili, consultare <a href="/docs/it/system_configuration.md">Configurazione di sistema</a>.</p>
<h2 id="Upgrade-Milvus" class="common-anchor-header">Aggiornamento di Milvus<button data-href="#Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Il comando <code translate="no">upgrade</code> dello script scarica lo script da <code translate="no">master</code> e ricrea il container utilizzando l’immagine selezionata da tale script. Non verifica la validità del percorso di versione da origine a destinazione supportato e può ricreare i file di configurazione generati. Non considerarlo una garanzia che una distribuzione precedente arbitraria possa essere aggiornata in modo sicuro alla versione v3.0.5.</p>
<p>Prima di un aggiornamento, eseguire il backup dei metadati, dei dati persistenti, di <code translate="no">embedEtcd.yaml</code> e di <code translate="no">user.yaml</code>. Verificare la versione di destinazione, la coda dei messaggi e la compatibilità dello storage, e verificare il ripristino in un ambiente non di produzione. Per le distribuzioni gestite con Docker Compose, seguire <a href="/docs/it/upgrade_milvus_standalone-docker.md">la procedura "Aggiornamento di Milvus Standalone con Docker Compose</a>"; non applicare tale procedura direttamente a un container gestito tramite script.</p>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">Arrestare ed eliminare Milvus<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile arrestare ed eliminare questo container come segue</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Optional-dependencies" class="common-anchor-header">Dipendenze opzionali<button data-href="#Optional-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>Per impostazione predefinita, questa distribuzione utilizza <strong>Woodpecker</strong> (WAL su filesystem locale) come coda dei messaggi e un <strong>etcd incorporato</strong> per i metadati — non è necessario installare altro. Per utilizzare una coda dei messaggi diversa o collegare un sistema di archiviazione oggetti/metadati esterno, consultare:</p>
<ul>
<li>Coda di messaggi: <a href="/docs/it/woodpecker.md">Woodpecker</a> (impostazione predefinita) · <a href="/docs/it/mq_pulsar.md">Pulsar</a> · <a href="/docs/it/mq_kafka.md">Kafka</a> · <a href="/docs/it/mq_rocksmq.md">RocksMQ</a></li>
<li>Archiviazione a oggetti: <a href="/docs/it/deploy_s3.md">MinIO</a> (predefinito) · <a href="/docs/it/deploy_s3.md">AWS S3</a> · <a href="/docs/it/abs.md">Azure Blob</a> · <a href="/docs/it/gcs.md">GCP Cloud Storage</a> · <a href="/docs/it/deploy_s3.md">Aliyun OSS</a> · <a href="/docs/it/deploy_s3.md">Tencent COS</a> · <a href="/docs/it/deploy_s3.md">Huawei OBS</a> · <a href="/docs/it/deploy_s3.md">Compatibile con S3</a></li>
<li>Metadati: <a href="/docs/it/deploy_etcd.md">etcd</a></li>
</ul>
<div class="alert note">
<p>Storage V3 è disabilitato per impostazione predefinita. Abilitalo prima di utilizzare le funzionalità che ne dipendono. Per i requisiti e le considerazioni sulla compatibilità, consulta <a href="/docs/it/storage-v3.md">Storage V3</a>.</p>
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
<li><p>Imparare le operazioni di base di Milvus:</p>
<ul>
<li><a href="/docs/it/manage_databases.md">Gestire i database</a></li>
<li><a href="/docs/it/manage-collections.md">Gestire le collezioni</a></li>
<li><a href="/docs/it/manage-partitions.md">Gestire le partizioni</a></li>
<li><a href="/docs/it/insert-update-delete.md">Inserimento, aggiornamento e cancellazione</a></li>
<li><a href="/docs/it/single-vector-search.md">Ricerca su singolo vettore</a></li>
<li><a href="/docs/it/multi-vector-search.md">Ricerca ibrida</a></li>
</ul></li>
<li><p>Prima di cambiare la versione di Milvus, consulta le considerazioni relative all'aggiornamento riportate in questa pagina.</p></li>
<li><p><a href="/docs/it/scaleout.md">Scalare il cluster Milvus</a>.</p></li>
<li><p>Distribuisci il tuo cluster Milvus su cloud:</p>
<ul>
<li><a href="/docs/it/eks.md">Amazon EKS</a></li>
<li><a href="/docs/it/gcp.md">Google Cloud</a></li>
<li><a href="/docs/it/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Scopri <a href="/docs/it/milvus-webui.md">Milvus WebUI</a>, un'interfaccia web intuitiva per l'osservabilità e la gestione di Milvus.</p></li>
<li><p>Scopri <a href="/docs/it/milvus_backup_overview.md">Milvus Backup</a>, uno strumento open source per il backup dei dati di Milvus.</p></li>
<li><p>Scopri <a href="/docs/it/birdwatcher_overview.md">Birdwatcher</a>, uno strumento open source per il debug di Milvus e gli aggiornamenti dinamici della configurazione.</p></li>
<li><p>Scopri <a href="https://github.com/zilliztech/attu">Attu</a>, uno strumento GUI open source per una gestione intuitiva di Milvus.</p></li>
<li><p><a href="/docs/it/monitor.md">Monitora Milvus con Prometheus</a>.</p></li>
</ul>
