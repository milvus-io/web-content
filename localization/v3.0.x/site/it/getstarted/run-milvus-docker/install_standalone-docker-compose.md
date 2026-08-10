---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: Scopri come installare Milvus in modalità standalone con Docker Compose.
title: Eseguire Milvus con Docker Compose (Linux)
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">Eseguire Milvus con Docker Compose (Linux)<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa pagina illustra come avviare un'istanza di Milvus in Docker utilizzando Docker Compose.</p>
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
<h2 id="Install-Milvus" class="common-anchor-header">Installare Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus mette a disposizione un file di configurazione Docker Compose nel repository di Milvus. Per installare Milvus utilizzando Docker Compose, è sufficiente eseguire</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.0/milvus-standalone-docker-compose.yml -O docker-compose.yml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Distribuzione predefinita (v3.0.0):</strong> <code translate="no">docker compose up -d</code> avvia tre container — <code translate="no">milvus-etcd</code> (metadati), <code translate="no">milvus-minio</code> (object storage) e <code translate="no">milvus-standalone</code>. La coda dei messaggi è <strong>Woodpecker (integrata, con MinIO / object storage come backend WAL)</strong>, quindi non è necessario un container separato per la coda dei messaggi.</p>
<p><strong>Coda di messaggi predefinita in base alla versione:</strong></p>
<ul>
<li><strong>2.5.x</strong> — la coda di messaggi predefinita è <strong>RocksMQ</strong>.</li>
<li><strong>2.6.x e successive</strong> — la coda dei messaggi predefinita è <strong>Woodpecker (integrata)</strong>.</li>
</ul>
<p>Scaricare sempre la configurazione Docker Compose più recente per garantire la compatibilità con le funzionalità della versione 3.0.0.</p>
<ul>
<li><p>Se non sei riuscito a eseguire il comando sopra indicato, verifica se sul tuo sistema è installato Docker Compose V1. In tal caso, ti consigliamo di migrare a Docker Compose V2 in base alle indicazioni riportate in <a href="https://docs.docker.com/compose/">questa pagina</a>.</p></li>
<li><p>Se si riscontrano problemi durante il download dell’immagine, contattarci all’indirizzo <a href="mailto:community@zilliz.com">community@zilliz.com</a> fornendo i dettagli del problema e forniremo l’assistenza necessaria.</p></li>
</ul>
</div>
<p>Dopo l’avvio di Milvus,</p>
<ul>
<li>i container denominati <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> e <strong>milvus-etcd</strong> sono attivi.
<ul>
<li>Il container <strong>milvus-etcd</strong> non espone alcuna porta all’host e mappa i propri dati nella cartella <strong>volumes/etcd</strong> all’interno della cartella corrente.</li>
<li>Il container <strong>milvus-minio</strong> serve localmente le porte <strong>9000</strong> e <strong>9001</strong> con le credenziali di autenticazione predefinite e mappa i propri dati nella cartella <strong>volumes/minio</strong> nella directory corrente.</li>
<li>Il container <strong>milvus-standalone</strong> serve localmente le porte <strong>19530</strong> con le impostazioni predefinite e mappa i propri dati nella <strong>cartella volumes/milvus</strong> all’interno della directory corrente.</li>
</ul></li>
</ul>
<p>È possibile verificare se i container sono attivi e in esecuzione utilizzando il seguente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose ps</span>

NAME                IMAGE   COMMAND                  SERVICE      CREATED         STATUS                   PORTS
milvus-etcd         …       &quot;etcd -advertise-cli…&quot;   etcd         2 minutes ago   Up 2 minutes (healthy)   2379-2380/tcp
milvus-minio        …       &quot;/usr/bin/docker-ent…&quot;   minio        2 minutes ago   Up 2 minutes (healthy)   9000-9001/tcp
milvus-standalone   …       &quot;/tini -- milvus run…&quot;   standalone   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9091-&gt;9091/tcp, 0.0.0.0:19530-&gt;19530/tcp
<button class="copy-code-btn"></button></code></pre>
<p>È inoltre possibile accedere all’interfaccia web di Milvus all’indirizzo <code translate="no">http://127.0.0.1:9091/webui/</code> per ottenere ulteriori informazioni sull’istanza di Milvus in uso. Per i dettagli, consultare la documentazione relativa <a href="/docs/it/milvus-webui.md">all’interfaccia web di Milvus</a>.</p>
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
    </button></h2><p>Per aggiornare la configurazione di Milvus in base alle proprie esigenze, è necessario modificare il file <code translate="no">/milvus/configs/user.yaml</code> all’interno del container <code translate="no">milvus-standalone</code>.</p>
<ol>
<li><p>Accedere al container <code translate="no">milvus-standalone</code>.</p>
<pre><code translate="no" class="language-shell">docker exec -it milvus-standalone bash
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Aggiungere ulteriori configurazioni per sovrascrivere quelle predefinite.
Quanto segue presuppone che sia necessario sovrascrivere il file <code translate="no">proxy.healthCheckTimeout</code> predefinito. Per le voci di configurazione applicabili, fare riferimento a <a href="/docs/it/system_configuration.md">Configurazione di sistema</a>.</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; /milvus/configs/user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Riavviare il container <code translate="no">milvus-standalone</code> per applicare le modifiche.</p>
<pre><code translate="no" class="language-shell">docker restart milvus-standalone
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrading-from-Milvus-25x-to-26x" class="common-anchor-header">Aggiornamento da Milvus 2.5.x a 2.6.x<button data-href="#Upgrading-from-Milvus-25x-to-26x" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Limiti della coda dei messaggi</strong>: durante l’aggiornamento a Milvus v3.0.0, è necessario mantenere la coda dei messaggi attualmente in uso. Il passaggio tra diversi sistemi di code dei messaggi durante l’aggiornamento non è supportato. Il supporto per la modifica dei sistemi di code dei messaggi sarà disponibile nelle versioni future.</p>
<p>Poiché la versione 2.6.x imposta Woodpecker come coda dei messaggi predefinita, un’istanza che esegue <strong>RocksMQ</strong> sulla versione 2.5.x deve <strong>fissare esplicitamente RocksMQ prima dell’aggiornamento</strong>; in caso contrario, l’aggiornamento tenterebbe di modificare la coda dei messaggi, operazione non supportata. Dopo aver scaricato il file Docker Compose della versione 2.6.x, reimpostare il tipo di coda dei messaggi su <code translate="no">rocksmq</code> nel file di override <code translate="no">user.yaml</code>, quindi eseguire l’aggiornamento:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml — keep RocksMQ across the 2.5.x → 2.6.x upgrade</span>
<span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per cambiare la coda dei messaggi <em>dopo</em> l’aggiornamento, consultare la sezione " <a href="/docs/it/switch-mq-type.md">Cambiare la coda dei messaggi</a>".</p>
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
    </button></h2><p>Questa distribuzione utilizza <strong>Woodpecker</strong> (integrato, backend WAL MinIO) per la messaggistica, <strong>etcd</strong> per i metadati e <strong>MinIO</strong> per l’archiviazione a oggetti. Per utilizzare una coda di messaggi diversa o collegare un sistema di archiviazione a oggetti o metadati esterno, consultare:</p>
<ul>
<li>Coda dei messaggi: <a href="/docs/it/woodpecker.md">Woodpecker</a> (predefinito) · <a href="/docs/it/mq_pulsar.md">Pulsar</a> · <a href="/docs/it/mq_kafka.md">Kafka</a> · <a href="/docs/it/mq_rocksmq.md">RocksMQ</a></li>
<li>Archiviazione a oggetti: <a href="/docs/it/deploy_s3.md">MinIO</a> (predefinito) · <a href="/docs/it/deploy_s3.md">AWS S3</a> · <a href="/docs/it/abs.md">Azure Blob</a> · <a href="/docs/it/gcs.md">GCP Cloud Storage</a> · <a href="/docs/it/deploy_s3.md">Aliyun OSS</a> · <a href="/docs/it/deploy_s3.md">Tencent COS</a> · <a href="/docs/it/deploy_s3.md">Huawei OBS</a> · <a href="/docs/it/deploy_s3.md">Compatibile con S3</a></li>
<li>Metadati: <a href="/docs/it/deploy_etcd.md">etcd</a></li>
</ul>
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
<li><p>Imparare le operazioni di base di Milvus:</p>
<ul>
<li><a href="/docs/it/manage_databases.md">Gestire i database</a></li>
<li><a href="/docs/it/manage-collections.md">Gestire le raccolte</a></li>
<li><a href="/docs/it/manage-partitions.md">Gestire le partizioni</a></li>
<li><a href="/docs/it/insert-update-delete.md">Inserimento, aggiornamento e cancellazione</a></li>
<li><a href="/docs/it/single-vector-search.md">Ricerca su singolo vettore</a></li>
<li><a href="/docs/it/multi-vector-search.md">Ricerca ibrida</a></li>
</ul></li>
<li><p><a href="/docs/it/upgrade_milvus_cluster-helm.md">Eseguire l'aggiornamento di Milvus utilizzando Helm Chart</a>.</p></li>
<li><p><a href="/docs/it/scaleout.md">Scalare il cluster Milvus</a>.</p></li>
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
