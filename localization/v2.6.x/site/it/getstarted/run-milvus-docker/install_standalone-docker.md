---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: Scoprite come installare Milvus standalone con Docker.
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
    </button></h1><p>Questa pagina illustra come lanciare un'istanza di Milvus in Docker.</p>
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
<li><a href="/docs/it/prerequisite-docker.md">Controllare i requisiti hardware e software</a> prima dell'installazione.</li>
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
    </button></h2><p>Milvus fornisce uno script di installazione per installarlo come contenitore Docker. Lo script è disponibile nel <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">repository di Milvus</a>. Per installare Milvus in Docker, è sufficiente eseguire</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se si desidera utilizzare <a href="https://milvus.io/docs/milvus_backup_overview.md">Backup</a> in modalità di distribuzione autonoma, si consiglia di utilizzare il metodo di distribuzione <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Docker Compose</a>.</p>
<p>Se si riscontrano problemi nell'estrazione dell'immagine, contattateci all'indirizzo <a href="mailto:community@zilliz.com">community@zilliz.com</a> con i dettagli del problema e vi forniremo il supporto necessario.</p>
</div>
<p>Dopo aver eseguito lo script di installazione:</p>
<ul>
<li>È stato avviato un contenitore docker chiamato milvus sulla porta <strong>19530</strong>.</li>
<li>Un embed etcd è installato insieme a Milvus nello stesso contenitore e serve alla porta <strong>2379</strong>. Il suo file di configurazione è mappato su <strong>embedEtcd.yaml</strong> nella cartella corrente.</li>
<li>Per modificare la configurazione predefinita di Milvus, aggiungere le proprie impostazioni al file <strong>user.yaml</strong> nella cartella corrente e poi riavviare il servizio.</li>
<li>Il volume di dati Milvus è mappato su <strong>volumes/milvus</strong> nella cartella corrente.</li>
</ul>
<p>È possibile accedere a Milvus WebUI all'indirizzo <code translate="no">http://127.0.0.1:9091/webui/</code> per saperne di più sulla propria istanza Milvus. Per ulteriori informazioni, consultare <a href="/docs/it/milvus-webui.md">Milvus WebUI</a>.</p>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">Arresto e cancellazione di Milvus<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile arrestare ed eliminare questo contenitore come segue</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
<p>È possibile aggiornare l'ultima versione di Milvus come segue</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">upgrade Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh upgrade</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Cosa succede dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Controllare <a href="/docs/it/quickstart.md">Quickstart</a> per vedere cosa può fare Milvus.</p></li>
<li><p>Imparare le operazioni di base di Milvus:</p>
<ul>
<li><a href="/docs/it/manage_databases.md">Gestire i database</a></li>
<li><a href="/docs/it/manage-collections.md">Gestire le collezioni</a></li>
<li><a href="/docs/it/manage-partitions.md">Gestire le partizioni</a></li>
<li><a href="/docs/it/insert-update-delete.md">Inserire, inserire ed eliminare</a></li>
<li><a href="/docs/it/single-vector-search.md">Ricerca a vettore singolo</a></li>
<li><a href="/docs/it/multi-vector-search.md">Ricerca ibrida</a></li>
</ul></li>
<li><p><a href="/docs/it/upgrade_milvus_cluster-helm.md">Aggiornare Milvus usando Helm Chart</a>.</p></li>
<li><p><a href="/docs/it/scaleout.md">Scalare il cluster Milvus</a>.</p></li>
<li><p>Distribuire il cluster Milvus su cloud:</p>
<ul>
<li><a href="/docs/it/eks.md">Amazon EKS</a></li>
<li><a href="/docs/it/gcp.md">Google Cloud</a></li>
<li><a href="/docs/it/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Esplorate <a href="/docs/it/milvus-webui.md">Milvus WebUI</a>, un'interfaccia web intuitiva per l'osservabilità e la gestione di Milvus.</p></li>
<li><p>Esplorate <a href="/docs/it/milvus_backup_overview.md">Milvus Backup</a>, uno strumento open-source per il backup dei dati Milvus.</p></li>
<li><p>Esplorate <a href="/docs/it/birdwatcher_overview.md">Birdwatcher</a>, uno strumento open-source per il debug di Milvus e gli aggiornamenti dinamici della configurazione.</p></li>
<li><p>Esplorate <a href="https://github.com/zilliztech/attu">Attu</a>, uno strumento open-source per la gestione intuitiva di Milvus.</p></li>
<li><p><a href="/docs/it/monitor.md">Monitorate Milvus con Prometheus</a>.</p></li>
</ul>
