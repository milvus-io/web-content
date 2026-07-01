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
<li><a href="/docs/it/v2.6.x/prerequisite-docker.md">Verificare i requisiti hardware e software</a> prima dell'installazione.</li>
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
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose.yml -O docker-compose.yml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Novità della versione 2.6.17:</strong></p>
<ul>
<li><strong>Architettura migliorata</strong>: include il nuovo nodo di streaming e componenti ottimizzati</li>
<li><strong>Dipendenze aggiornate</strong>: include le ultime versioni di MinIO ed etcd</li>
<li><strong>Configurazione migliorata</strong>: impostazioni ottimizzate per prestazioni migliori</li>
</ul>
<p>Scaricare sempre la configurazione Docker Compose più recente per garantire la compatibilità con le funzionalità della v2.6.17.</p>
<ul>
<li><p>Se non sei riuscito a eseguire il comando sopra indicato, verifica se sul tuo sistema è installato Docker Compose V1. In tal caso, ti consigliamo di migrare a Docker Compose V2 in base alle indicazioni riportate in <a href="https://docs.docker.com/compose/">questa pagina</a>.</p></li>
<li><p>Se si riscontrano problemi durante il download dell’immagine, contattateci all’indirizzo <a href="mailto:community@zilliz.com">community@zilliz.com</a> fornendo i dettagli del problema e vi forniremo l’assistenza necessaria.</p></li>
</ul>
</div>
<p>Dopo l’avvio di Milvus,</p>
<ul>
<li>i container denominati <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> e <strong>milvus-etcd</strong> sono attivi.
<ul>
<li>Il container <strong>milvus-etcd</strong> non espone alcuna porta all’host e mappa i propri dati su <strong>volumes/etcd</strong> nella cartella corrente.</li>
<li>Il container <strong>milvus-minio</strong> serve localmente le porte <strong>9090</strong> e <strong>9091</strong> con le credenziali di autenticazione predefinite e mappa i propri dati nella cartella <strong>volumes/minio</strong> nella directory corrente.</li>
<li>Il container <strong>milvus-standalone</strong> serve localmente le porte <strong>19530</strong> con le impostazioni predefinite e mappa i propri dati nella cartella <strong>volumes/milvus</strong> nella directory corrente.</li>
</ul></li>
</ul>
<p>È possibile verificare se i container sono attivi e in esecuzione utilizzando il seguente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker-compose ps</span>

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>È inoltre possibile accedere all’interfaccia web di Milvus all’indirizzo <code translate="no">http://127.0.0.1:9091/webui/</code> per ottenere ulteriori informazioni sull’istanza di Milvus in uso. Per i dettagli, consultare la documentazione relativa <a href="/docs/it/v2.6.x/milvus-webui.md">all’interfaccia web di Milvus</a>.</p>
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
Quanto segue presuppone che sia necessario sovrascrivere il file <code translate="no">proxy.healthCheckTimeout</code> predefinito. Per le voci di configurazione applicabili, fare riferimento a <a href="/docs/it/v2.6.x/system_configuration.md">Configurazione di sistema</a>.</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; /milvus/configs/user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Riavviare il contenitore <code translate="no">milvus-standalone</code> per applicare le modifiche.</p>
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
<li><p>Scopri <a href="/docs/it/v2.6.x/milvus-webui.md">Milvus WebUI</a>, un'interfaccia web intuitiva per l'osservabilità e la gestione di Milvus.</p></li>
<li><p>Scopri <a href="/docs/it/v2.6.x/milvus_backup_overview.md">Milvus Backup</a>, uno strumento open source per il backup dei dati di Milvus.</p></li>
<li><p>Scopri <a href="/docs/it/v2.6.x/birdwatcher_overview.md">Birdwatcher</a>, uno strumento open source per il debug di Milvus e gli aggiornamenti dinamici della configurazione.</p></li>
<li><p>Scopri <a href="https://github.com/zilliztech/attu">Attu</a>, uno strumento GUI open source per una gestione intuitiva di Milvus.</p></li>
<li><p><a href="/docs/it/v2.6.x/monitor.md">Monitora Milvus con Prometheus</a>.</p></li>
</ul>
