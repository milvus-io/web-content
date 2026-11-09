---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: >-
  Scopri come installare Milvus in modalità standalone con Docker Desktop per
  Windows.
title: Eseguire Milvus in Docker (Windows)
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">Eseguire Milvus in Docker (Windows)<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><blockquote>
<p>Per impostazione predefinita, questa distribuzione utilizza <strong>Woodpecker</strong> (filesystem locale) come coda dei messaggi, pertanto non è necessario alcun servizio esterno di coda dei messaggi. Vedi <a href="/docs/it/woodpecker.md">Woodpecker</a>.</p>
</blockquote>
<p>Questa pagina illustra come eseguire Milvus su Windows utilizzando Docker Desktop con il backend WSL 2 e i container Linux.</p>
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
<li><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Installare Docker Desktop</a> e soddisfare i requisiti di sistema e hardware per Windows.</li>
<li><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Installare Windows Subsystem for Linux 2 (WSL 2)</a>.</li>
<li>Avviare Docker Desktop, abilitare l’opzione <strong>“Usa il motore basato su WSL 2</strong>” e selezionare “Contenitori Linux”. Per i comandi eseguiti all’interno di una distribuzione WSL, abilitare anche tale distribuzione in <strong>Impostazioni</strong> &gt; <strong>Risorse</strong> &gt; <strong>Integrazione WSL</strong>. Vedere <a href="https://docs.docker.com/desktop/features/wsl/">Backend WSL 2 di Docker Desktop</a>.</li>
</ul>
<p>Eseguire i seguenti controlli in PowerShell o nel Prompt dei comandi di Windows prima di scaricare i file di Milvus:</p>
<pre><code translate="no" class="language-powershell">wsl --version
docker info --format &quot;{{.OSType}}&quot;
docker compose version
</code></pre>
<p>Il tipo di sistema operativo Docker deve essere " <code translate="no">linux</code>". Gli esempi di Compose utilizzano il plugin " <code translate="no">docker compose</code> " (V2 o successive), non il comando legacy " <code translate="no">docker-compose</code> " V1.</p>
<h2 id="Run-Milvus-in-Docker" class="common-anchor-header">Eseguire Milvus in Docker<button data-href="#Run-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Scegliere uno dei seguenti terminali. Eseguire i comandi in una directory di lavoro scrivibile; lo script memorizza lì i file di configurazione e la directory <code translate="no">volumes</code>.</p>
<p>Lo script viene scaricato dal ramo <code translate="no">master</code> di Milvus. Il tag dell’immagine Docker è definito nello script e può differire dalla versione v3.0.5. Per distribuire esattamente quella versione, utilizzare la configurazione Docker Compose con versione specificata riportata di seguito.</p>
<h3 id="From-PowerShell" class="common-anchor-header">Da PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>Scaricare lo script, quindi avviare Milvus:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -OutFile standalone.bat
.\standalone.bat start
</code></pre>
<p>PowerShell richiede il prefisso <code translate="no">.\</code> per eseguire uno script dalla directory di lavoro.</p>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">Dal prompt dei comandi di Windows<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare <code translate="no">curl.exe</code> per scaricare lo script; <code translate="no">Invoke-WebRequest</code> è un comando PowerShell e non funziona nel Prompt dei comandi:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -o standalone.bat
standalone.bat start
</code></pre>
<p>Dopo aver eseguito una delle due sequenze di comandi di Windows:</p>
<ul>
<li>Un container Docker denominato <strong>milvus-standalone</strong> è in ascolto sulla porta <strong>19530</strong>.</li>
<li>Etcd incorporato viene eseguito nello stesso container sulla porta <strong>2379</strong>. Il suo file di configurazione corrisponde a <strong>embedEtcd.yaml</strong> nella directory di lavoro.</li>
<li>Milvus memorizza i dati nella cartella <strong>volumes/milvus</strong> nella directory di lavoro.</li>
<li>Le sostituzioni di configurazione vanno inserite nel <strong>file user.yaml</strong> nella directory di lavoro. Riavviare il container dopo averle modificate.</li>
</ul>
<p>Verificare lo stato dell’immagine e del container in uno dei due terminali:</p>
<pre><code translate="no" class="language-powershell">docker inspect --format &quot;{{.Config.Image}}&quot; milvus-standalone
docker ps --filter name=milvus-standalone
</code></pre>
<p>Per arrestare Milvus da PowerShell, eseguire ` <code translate="no">.\standalone.bat stop</code>`; dal Prompt dei comandi, eseguire ` <code translate="no">standalone.bat stop</code>`. Il comando ` <code translate="no">delete</code> ` rimuove sia il container che i dati in esso memorizzati. Eseguire il backup dei dati prima di utilizzarlo.</p>
<h3 id="From-WSL-2" class="common-anchor-header">Da WSL 2<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>Apri la distribuzione WSL installata da un terminale di Windows:</p>
<pre><code translate="no" class="language-powershell">wsl
</code></pre>
<p>Nel terminale WSL, scaricare lo script Linux e avviare Milvus una volta:</p>
<pre><code translate="no" class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>Per arrestare Milvus, eseguire <code translate="no">bash standalone_embed.sh stop</code>. Il comando <code translate="no">bash standalone_embed.sh delete</code> rimuove il container, la configurazione e i dati; eseguire il backup dei dati prima di utilizzarlo.</p>
<h2 id="Run-Milvus-with-Docker-Compose" class="common-anchor-header">Eseguire Milvus con Docker Compose<button data-href="#Run-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizza la configurazione allegata alla versione v3.0.5. Esegui solo la sequenza di comandi relativa al tuo terminale.</p>
<h3 id="From-PowerShell" class="common-anchor-header">Da PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>Scaricare la configurazione e avviare Milvus:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml&quot; -OutFile docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">Dal Prompt dei comandi di Windows<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>Scarica la configurazione e avvia Milvus:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml&quot; -o docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-WSL-2" class="common-anchor-header">Da WSL 2<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>Apri la tua distribuzione WSL, quindi esegui i comandi Linux:</p>
<pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yml
docker compose up -d
docker compose ps
<button class="copy-code-btn"></button></code></pre>
<p>La configurazione avvia tre container a esecuzione prolungata: <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> e <strong>milvus-etcd</strong>. Esegue inoltre il servizio "one-shot" <code translate="no">milvus-volume-init</code> per preparare la proprietà della directory dei dati. I relativi dati corrispondono a <strong>volumes/milvus</strong>, <strong>volumes/minio</strong> e <strong>volumes/etcd</strong> nella directory di lavoro. MinIO espone le porte <strong>9000</strong> e <strong>9001</strong>; Milvus espone le porte <strong>19530</strong> e <strong>9091</strong>. Per i comandi di configurazione e di gestione del ciclo di vita, consultare <a href="/docs/it/install_standalone-docker-compose.md">Eseguire Milvus con Docker Compose</a>.</p>
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error" class="common-anchor-header">Come posso risolvere l’errore “ <code translate="no">Docker Engine stopped</code> ”?<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus utilizza container Linux. Controlla Docker Desktop e il relativo backend WSL 2 prima di riprovare l’installazione:</p>
<ol>
<li><p>Abilita la virtualizzazione hardware nel BIOS/UEFI se <strong>in Gestione attività</strong> &gt; <strong>Prestazioni</strong> risulta disabilitata. Consulta i <a href="https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements">requisiti di Docker Desktop per Windows</a>.</p></li>
<li><p>Avvia Docker Desktop dal menu Start di Windows e attendi che il suo motore si avvii. Potrebbero essere necessari i privilegi di amministratore per installare o aggiornare WSL o per specifiche modalità di installazione di Docker Desktop; non si tratta di un requisito generale per l’esecuzione di container Linux con il backend WSL 2.</p></li>
<li><p>Verifica WSL da un terminale di Windows. Se è necessario un aggiornamento, esegui il comando di aggiornamento con i privilegi richiesti da Windows:</p>
<pre><code translate="no" class="language-powershell">wsl --version
wsl --update
</code></pre></li>
<li><p>Abilita l’opzione <strong>“Usa il motore basato su WSL 2”</strong> in Docker Desktop. Se il menu di Docker offre l’opzione <strong>“Passa ai container Linux</strong>”, selezionala. Non passare ai container Windows per risolvere i problemi relativi a un’immagine Milvus Linux.</p></li>
<li><p>Esegui il seguente comando nel terminale che utilizzi per l’installazione:</p>
<pre><code translate="no" class="language-powershell">docker info --format &quot;{{.OSType}}&quot;
</code></pre>
<p>Deve restituire " <code translate="no">linux</code>". Se non è possibile connettersi al daemon, seguire <a href="https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/">la procedura di risoluzione dei problemi di Docker Desktop</a> prima di rieseguire lo script Milvus. Il solo avvio di " <code translate="no">com.docker.service</code> " non garantisce che il motore Linux WSL 2 sia in esecuzione.</p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="common-anchor-header">Come posso risolvere i problemi relativi a WSL durante la distribuzione di Milvus?<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Se hai riscontrato problemi relativi a WSL durante l’esecuzione di Milvus da WSL 2, potrebbe essere necessario verificare se hai configurato Docker Desktop per utilizzare il motore basato su WSL 2 come segue:</p>
<ol>
<li><p>Assicurarsi che l’opzione “Usa il motore basato su WSL 2” sia selezionata in <strong>Impostazioni</strong> &gt; <strong>Generale</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>Utilizza il motore basato su WSL 2 nelle impostazioni di Docker Desktop</span>
  
 </span></p></li>
<li><p>Selezionare tra le distribuzioni WSL 2 installate quelle su cui si desidera abilitare l’integrazione con Docker andando su: <strong>Impostazioni</strong> &gt; <strong>Risorse</strong> &gt; <strong>Integrazione WSL</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>Selezione delle distribuzioni WSL 2 nelle impostazioni di Docker Desktop</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="common-anchor-header">Come posso risolvere gli errori relativi al volume che compaiono all’avvio di Milvus con il messaggio “ <code translate="no">Read config failed</code> ”?<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="anchor-icon" translate="no">
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
    </button></h3><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" /> 
   <span>Messaggio di errore “Read config failed” all’avvio di Milvus</span>
  
 </span></p>
<p>Per risolvere l’errore visualizzato all’avvio di Milvus con il messaggio “Read config failed”, è necessario verificare che il volume montato nel container di Milvus sia corretto. Se il volume è montato correttamente nel container, è possibile utilizzare il comando <code translate="no">docker exec</code> per accedere al container ed elencare il contenuto della cartella <strong>/milvus/configs</strong> come segue:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>Elencare i file di configurazione di Milvus</span>
  
 </span></p>
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
    </button></h2><p>Dopo aver installato Milvus in Docker, seguire il percorso <strong>"Utilizza un server Milvus esistente</strong> " nella <a href="/docs/it/quickstart.md">Guida rapida</a> e collegare l'SDK a <code translate="no">http://localhost:19530</code>. Questo percorso del server non richiede Milvus Lite; il blocco di connessione locale <code translate="no">.db</code> avvierà un database locale separato invece di utilizzare questo container.</p>
<p>È inoltre possibile:</p>
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
<li><p>Per le distribuzioni con Compose, seguire la procedura " <a href="/docs/it/upgrade_milvus_standalone-docker.md">Aggiornamento di Milvus Standalone con Docker Compose</a>"; verificare la procedura nel proprio ambiente prima di procedere all'aggiornamento.</p></li>
<li><p><a href="/docs/it/scaleout.md">Scalare il cluster Milvus</a>.</p></li>
<li><p>Distribuite il vostro cluster Milvus su cloud:</p>
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
