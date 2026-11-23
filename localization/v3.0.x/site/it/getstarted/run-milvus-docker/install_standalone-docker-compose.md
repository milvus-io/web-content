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
<li>Installare il <a href="https://docs.docker.com/compose/install/linux/">plugin Docker Compose</a> (versione 2 o successive) e verificarne il funzionamento con il comando ` <code translate="no">docker compose version</code>`. Queste istruzioni utilizzano il comando ` <code translate="no">docker compose</code>`, non il comando legacy ` <code translate="no">docker-compose</code> ` (versione 1).</li>
<li><a href="/docs/it/prerequisite-docker.md">Verificare i requisiti hardware e software</a> prima dell’installazione.</li>
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
    </button></h2><p>Milvus fornisce un file di configurazione Docker Compose nel repository di Milvus. Scaricare la configurazione per la versione v3.0.5 utilizzando il comando <code translate="no">wget</code> riportato di seguito. Subito dopo il download, prima di modificare il file o avviare Milvus con <code translate="no">sudo docker compose up -d</code>, eseguire <code translate="no">sha256sum docker-compose.yaml</code> e confrontare il risultato con il digest <code translate="no">sha256</code> indicato per <code translate="no">milvus-standalone-docker-compose.yaml</code> nella <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">pagina di rilascio della versione v3.0.5</a>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yaml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Distribuzione predefinita (v3.0.5):</strong> <code translate="no">docker compose up -d</code> avvia tre container a esecuzione prolungata: <code translate="no">milvus-etcd</code> (metadati), <code translate="no">milvus-minio</code> (archiviazione a oggetti) e <code translate="no">milvus-standalone</code>. La coda dei messaggi è <strong>Woodpecker (integrata, con MinIO / archiviazione a oggetti come backend WAL)</strong>, quindi non è necessario alcun container separato per la coda dei messaggi.</p>
<p>La configurazione esegue inoltre il servizio "one-shot" <code translate="no">milvus-volume-init</code> per preparare la proprietà della directory dei dati. Il servizio termina dopo aver completato tale attività.</p>
<p><strong>Coda di messaggi predefinita in base alla versione:</strong></p>
<ul>
<li><strong>2.5.x</strong> — la coda dei messaggi predefinita è <strong>RocksMQ</strong>.</li>
<li><strong>2.6.x e successive</strong> — la coda di messaggi predefinita è <strong>Woodpecker (integrata)</strong>.</li>
</ul>
<p>Utilizzare la configurazione allegata alla versione che si intende installare. Per una distribuzione esistente, seguire le istruzioni di aggiornamento invece di sostituire la configurazione con un file di nuova installazione.</p>
<ul>
<li><p>Se <code translate="no">docker compose</code> non è disponibile, installare il plugin Compose seguendo le <a href="https://docs.docker.com/compose/install/linux/">istruzioni per Docker</a>.</p></li>
<li><p>Se si riscontrano problemi durante il download dell’immagine, contattateci all’indirizzo <a href="mailto:community@zilliz.com">community@zilliz.com</a> fornendo i dettagli del problema e vi forniremo l’assistenza necessaria.</p></li>
</ul>
</div>
<p>Dopo l'avvio di Milvus,</p>
<ul>
<li>i container denominati <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> e <strong>milvus-etcd</strong> saranno attivi.
<ul>
<li>Il container <strong>milvus-etcd</strong> non espone alcuna porta all’host e mappa i propri dati su <strong>volumes/etcd</strong> nella cartella corrente.</li>
<li>Il container <strong>milvus-minio</strong> espone le porte <strong>9000</strong> e <strong>9001</strong> con le credenziali di autenticazione predefinite e mappa i propri dati nella cartella <strong>volumes/minio</strong> nella directory corrente.</li>
<li>Il container <strong>milvus-standalone</strong> espone le porte <strong>19530</strong> e <strong>9091</strong> con le impostazioni predefinite e mappa i propri dati nella <strong>cartella volumes/milvus</strong> all’interno della directory corrente.</li>
</ul></li>
</ul>
<p>Il servizio <code translate="no">standalone</code> imposta ` <code translate="no">security_opt: seccomp:unconfined</code>`, in modo che il container Milvus venga eseguito senza il profilo seccomp predefinito di Docker.</p>
<div class="alert warning">
<blockquote>
<p>Il file di configurazione espone queste porte senza un indirizzo host. Docker espone una porta senza indirizzo host su tutti gli indirizzi host, pertanto anche altre macchine in grado di raggiungere questo host possono connettersi a Milvus e MinIO. MinIO utilizza la chiave di accesso e la chiave segreta <code translate="no">minioadmin</code>, impostate nel file di configurazione. Per limitare l’accesso a questo host, aggiungere <code translate="no">127.0.0.1:</code> alle voci <code translate="no">ports</code> dei servizi <code translate="no">minio</code> e <code translate="no">standalone</code> in <code translate="no">docker-compose.yaml</code>, ad esempio <code translate="no">&quot;127.0.0.1:19530:19530&quot;</code>, ed eseguire nuovamente <code translate="no">sudo docker compose up -d</code>. Per utilizzare altre credenziali MinIO, modificare <code translate="no">MINIO_ACCESS_KEY</code> e <code translate="no">MINIO_SECRET_KEY</code> del servizio <code translate="no">minio</code> e impostare gli stessi valori in <code translate="no">minio.accessKeyID</code> e <code translate="no">minio.secretAccessKey</code> della configurazione di Milvus. Per richiedere credenziali per le connessioni a Milvus, consultare <a href="/docs/it/authenticate.md">Autenticazione dell’accesso utente</a>.</p>
</blockquote>
</div>
<p>È possibile verificare se i container sono attivi e in esecuzione utilizzando il seguente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>

NAME                IMAGE   COMMAND                  SERVICE      CREATED         STATUS                   PORTS
milvus-etcd         …       &quot;etcd -advertise-cli…&quot;   etcd         2 minutes ago   Up 2 minutes (healthy)   2379-2380/tcp
milvus-minio        …       &quot;/usr/bin/docker-ent…&quot;   minio        2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9000-9001-&gt;9000-9001/tcp
milvus-standalone   …       &quot;/tini -- milvus run…&quot;   standalone   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9091-&gt;9091/tcp, 0.0.0.0:19530-&gt;19530/tcp
<button class="copy-code-btn"></button></code></pre>
<p>La colonna " <code translate="no">PORTS</code> " può anche elencare ciascuna porta pubblicata con l'indirizzo IPv6 <code translate="no">[::]</code>, ad esempio <code translate="no">[::]:19530-&gt;19530/tcp</code>, poiché Docker pubblica una porta senza un indirizzo host sia su <code translate="no">0.0.0.0</code> che su <code translate="no">[::]</code>.</p>
<p>È inoltre possibile accedere all’interfaccia web di Milvus all’indirizzo <code translate="no">http://127.0.0.1:9091/webui/</code> per ottenere ulteriori informazioni sulla propria istanza di Milvus. Per i dettagli, consultare la documentazione relativa <a href="/docs/it/milvus-webui.md">all’interfaccia web di Milvus</a>.</p>
<p>Per provare il server in esecuzione, seguire il percorso <strong>"Utilizza un server Milvus esistente</strong> " nella <a href="/docs/it/quickstart.md">Guida rapida</a> e connettersi a <code translate="no">http://localhost:19530</code>. Non utilizzare il blocco di connessione locale <code translate="no">.db</code>, che avvia un database Milvus Lite separato.</p>
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
    </button></h2><p>Per aggiornare la configurazione di Milvus in base alle proprie esigenze, inserire le impostazioni in un file <code translate="no">user.yaml</code> sull’host e montarlo in <code translate="no">/milvus/configs/user.yaml</code> all’interno del container <code translate="no">milvus-standalone</code>. Il file di configurazione monta solo <code translate="no">/var/lib/milvus</code> in questo container, pertanto un file <code translate="no">user.yaml</code> modificato all’interno del container andrà perso quando Compose ricrea il container, ad esempio dopo una modifica a <code translate="no">docker-compose.yaml</code> o all’immagine di Milvus.</p>
<ol>
<li><p>Creare <code translate="no">user.yaml</code> nella cartella che contiene <code translate="no">docker-compose.yaml</code>. Creare il file prima di montarlo: se il percorso di origine non esiste, Compose crea invece una directory con quel nome.
Quanto segue presuppone che sia necessario sovrascrivere il valore predefinito <code translate="no">proxy.healthCheckTimeout</code>. Per le voci di configurazione applicabili, fare riferimento a <a href="/docs/it/system_configuration.md">Configurazione di sistema</a>.</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p>In <code translate="no">docker-compose.yaml</code>, aggiungere il file all’elenco <code translate="no">volumes</code> del servizio <code translate="no">standalone</code>. Mantenere invariate le altre impostazioni del servizio, quali <code translate="no">security_opt</code>, <code translate="no">healthcheck</code> e <code translate="no">depends_on</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Applicare la modifica. Poiché la configurazione del servizio è cambiata, Compose ricrea il container <code translate="no">milvus-standalone</code> e conserva i dati nei suoi volumi montati.</p>
<pre><code translate="no" class="language-shell">sudo docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Una volta montato il file, riavviare il servizio <code translate="no">standalone</code> per applicare le modifiche successive a <code translate="no">user.yaml</code>:</p>
<pre><code translate="no" class="language-shell">sudo docker compose restart standalone
<button class="copy-code-btn"></button></code></pre>
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
<h2 id="Upgrade-an-existing-deployment" class="common-anchor-header">Aggiornare una distribuzione esistente<button data-href="#Upgrade-an-existing-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Per una distribuzione autonoma di Milvus 2.6.x, seguire <a href="/docs/it/upgrade_milvus_standalone-docker.md">la guida Aggiornamento di Milvus Standalone con Docker Compose</a>. Eseguire il backup dei metadati e dei dati persistenti, preservare le dipendenze e la configurazione esistenti e verificare il percorso di aggiornamento da sorgente a destinazione documentato prima di modificare l’immagine di Milvus. Non sostituire il file Compose di una distribuzione precedente con la configurazione per la nuova installazione sopra indicata.</p>
<p><strong>Limiti delle code di messaggi</strong>: durante l’aggiornamento a Milvus v3.0.5, è necessario mantenere la scelta attuale della coda di messaggi. Il passaggio tra diversi sistemi di code di messaggi durante l’aggiornamento non è supportato. Il supporto per la modifica dei sistemi di code di messaggi sarà disponibile nelle versioni future.</p>
<p>Milvus 2.6.x e versioni successive utilizzano Woodpecker come impostazione predefinita, mentre le distribuzioni 2.5.x utilizzano <strong>RocksMQ</strong> come impostazione predefinita. Se la distribuzione che si sta aggiornando utilizza ancora RocksMQ, fissarla in <code translate="no">user.yaml</code> prima di modificare l’immagine di Milvus, in modo che l’istanza aggiornata mantenga la coda di messaggi esistente invece di avviare con la nuova impostazione predefinita:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml — keep RocksMQ across the upgrade</span>
<span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una volta che l’istanza aggiornata è in esecuzione sulla versione 3.0.5, è possibile passare da RocksMQ a Woodpecker utilizzando <a href="/docs/it/switch-mq-type.md">la funzione “Switch Message Queue”</a>, disponibile in Milvus 3.0 e versioni successive.</p>
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
    </button></h2><p>Questa distribuzione utilizza <strong>Woodpecker</strong> (integrato, backend WAL MinIO) per la messaggistica, <strong>etcd</strong> per i metadati e <strong>MinIO</strong> per l’archiviazione degli oggetti. Per utilizzare una coda di messaggi diversa o collegare un sistema di archiviazione oggetti/metadati esterno, consultare:</p>
<ul>
<li>Coda di messaggi: <a href="/docs/it/woodpecker.md">Woodpecker</a> (predefinita) · <a href="/docs/it/mq_pulsar.md">Pulsar</a> · <a href="/docs/it/mq_kafka.md">Kafka</a> · <a href="/docs/it/mq_rocksmq.md">RocksMQ</a></li>
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
<li><p><a href="/docs/it/upgrade_milvus_standalone-docker.md">Aggiornamento di Milvus Standalone con Docker Compose</a>.</p></li>
<li><p><a href="/docs/it/scaleout.md">Scalare un cluster Milvus</a> su Kubernetes. Tale procedura utilizza Helm e non si applica a questa distribuzione Docker.</p></li>
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
