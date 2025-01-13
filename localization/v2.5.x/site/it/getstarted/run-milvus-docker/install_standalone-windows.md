---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: Scoprite come installare Milvus standalone con Docker Desktop per Windows.
title: Eseguire Milvus in Docker (Linux)
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
    </button></h1><p>Questa pagina mostra come eseguire Milvus su Windows utilizzando Docker Desktop per Windows.</p>
<h2 id="Prerequisites​" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites​" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Installare Docker Desktop</a>.</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Installare Windows Subsystem for Linux 2 (WSL 2)</a>.</p></li>
<li><p>Installare Python 3.8+.</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">Eseguire Milvus in Docker<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus fornisce uno script di installazione per installarlo come contenitore Docker. Dopo aver installato Docker Desktop su Microsoft Windows, è possibile accedere alla CLI di Docker da PowerShell o dal Prompt dei comandi di Windows in modalità <strong>amministratore</strong> e da WSL 2. </p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Da PowerShell o dal Prompt dei comandi di Windows</h3><p>Se avete più familiarità con PowerShell o il Prompt dei comandi di Windows, il prompt dei comandi è il seguente.</p>
<ol>
<li><p>Aprire Docker Desktop in modalità amministratore facendo clic con il pulsante destro del mouse e selezionando <strong>Esegui come amministratore</strong>.</p></li>
<li><p>Scaricare lo script di installazione e salvarlo come <code translate="no">standalone.bat</code>.</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-attr">C</span>:\&gt;<span class="hljs-title class_">Invoke</span>-<span class="hljs-title class_">WebRequest</span> <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/refs/heads/master/scripts/standalone_embed.bat -OutFile standalone.bat​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Eseguire lo script scaricato per avviare Milvus come contenitore Docker.</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-attr">C</span>:\&gt;standalone.<span class="hljs-property">bat</span> start​
<span class="hljs-title class_">Wait</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">Milvus</span> starting...​
<span class="hljs-title class_">Start</span> successfully.​
<span class="hljs-title class_">To</span> change the <span class="hljs-keyword">default</span> <span class="hljs-title class_">Milvus</span> configuration, edit user.<span class="hljs-property">yaml</span> and restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>Dopo aver eseguito lo script di installazione.</p>
<ul>
<li><p>È stato avviato un contenitore Docker chiamato <strong>milvus-standalone</strong> sulla porta <strong>19530</strong>.</p></li>
<li><p>Un embed etcd è installato insieme a Milvus nello stesso contenitore e serve alla porta <strong>2379</strong>. Il suo file di configurazione è mappato su <strong>embedEtcd.yaml</strong> nella cartella corrente.</p></li>
<li><p>Il volume di dati di Milvus è mappato su <strong>volumes/milvus</strong> nella cartella corrente.</p></li>
</ul>
<p>È possibile utilizzare i seguenti comandi per gestire il contenitore Milvus e i dati memorizzati.</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-comment"># Stop Milvus​</span>
C:\&gt;standalone.bat stop​
Stop successfully.​
​
<span class="hljs-comment"># Delete Milvus container​</span>
C:\&gt;standalone.bat delete​
Delete Milvus container successfully. <span class="hljs-comment"># Container has been removed.​</span>
Delete successfully. <span class="hljs-comment"># Data has been removed.​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="From-WSL-2​" class="common-anchor-header">Da WSL 2</h3><p>Se si preferisce avviare Milvus usando i comandi di Linux e gli script di shell su Windows, assicurarsi di aver già installato il comando WSL 2. Per i dettagli su come installare il comando WSL 2, potete consultare questo <a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">articolo di Microsoft</a>.</p>
<ol>
<li><p>Avviare WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Scaricare lo script di installazione</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Download the installation script​</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh​
​
<span class="hljs-comment"># Start the Docker container​</span>
$ bash standalone_embed.sh start​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Avviare Milvus come contenitore docker.</p>
<pre><code translate="no" class="language-bash">$ bash standalone_embed.sh start​
Wait <span class="hljs-keyword">for</span> Milvus Starting...​
Start successfully.​
To change the <span class="hljs-literal">default</span> Milvus configuration, <span class="hljs-keyword">add</span> your settings to the user.yaml file <span class="hljs-keyword">and</span> then restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>È possibile utilizzare i seguenti comandi per gestire il contenitore Milvus e i dati memorizzati.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Stop Milvus​</span>
$ bash standalone_embed.sh stop​
Stop successfully.​
​
<span class="hljs-comment"># Delete Milvus data​</span>
$ bash standalone_embed.sh stop​
Delete Milvus container successfully.​
Delete successfully.​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">Eseguire Milvus con Docker Compose<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta installato Docker Desktop su Microsoft Windows, è possibile accedere alla CLI di Docker da PowerShell o dal Prompt dei comandi di Windows in modalità <strong>amministratore</strong>. È possibile eseguire Docker Compose in PowerShell, nel Prompt dei comandi di Windows o in WSL 2 per avviare Milvus.</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Da PowerShell o dal Prompt dei comandi di Windows</h3><ol>
<li><p>Aprire Docker Desktop in modalità amministratore facendo clic con il pulsante destro del mouse e selezionando <strong>Esegui come amministratore</strong>.</p></li>
<li><p>Eseguite i seguenti comandi in PowerShell o nel Prompt dei comandi di Windows per scaricare il file di configurazione di Docker Compose per Milvus Standalone e avviare Milvus.</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-comment"># Download the configuration file and rename it as docker-compose.yml​</span>
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.4.15/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
<span class="hljs-comment"># Start Milvus​</span>
C:\&gt;docker compose up -d​
Creating milvus-etcd  ... <span class="hljs-keyword">done</span>​
Creating milvus-minio ... <span class="hljs-keyword">done</span>​
Creating milvus-standalone ... <span class="hljs-keyword">done</span>​

<button class="copy-code-btn"></button></code></pre>
<p>A seconda della connessione di rete, il download delle immagini per l'installazione di Milvus potrebbe richiedere un po' di tempo. Una volta che i contenitori denominati <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> e <strong>milvus-etcd</strong> sono attivi, si può osservare che</p>
<ul>
<li><p>Il contenitore <strong>milvus-etcd</strong> non espone alcuna porta all'host e mappa i suoi dati nei <strong>volumi/etcd</strong> della cartella corrente.</p></li>
<li><p>Il contenitore <strong>milvus-minio</strong> serve le porte <strong>9090</strong> e <strong>9091</strong> localmente con le credenziali di autenticazione predefinite e mappa i suoi dati su <strong>volumi/minio</strong> nella cartella corrente.</p></li>
<li><p>Il contenitore <strong>milvus-standalone</strong> serve localmente le porte <strong>19530</strong> con le impostazioni predefinite e mappa i suoi dati su <strong>volumi/milvus</strong> nella cartella corrente.</p></li>
</ul></li>
</ol>
<p>È inoltre possibile richiamare la versione Linux dei comandi di Docker Compose se si dispone di WSL 2.</p>
<h3 id="From-WSL-2​" class="common-anchor-header">Da WSL 2</h3><p>La procedura è simile a quella dell'uso di Docker Compose per installare Milvus nei sistemi Linux.</p>
<ol>
<li><p>Avviare WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Scaricare il file di configurazione di Milvus.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.17/milvus-standalone-docker-compose.yml -O docker-compose.yml​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Avviare Milvus.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose up -d​
​
Creating milvus-etcd  ... <span class="hljs-keyword">done</span>​
Creating milvus-minio ... <span class="hljs-keyword">done</span>​
Creating milvus-standalone ... <span class="hljs-keyword">done</span>​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">Domande frequenti<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header">Come posso risolvere l'errore <code translate="no">Docker Engine stopped</code>?</h3><p>Una volta installato Docker Desktop in Windows, si può verificare l'errore <code translate="no">Docker Engine stopped</code> se il computer non è configurato correttamente. In questo caso, potrebbe essere necessario effettuare i seguenti controlli.</p>
<ol>
<li><p>Controllare se la virtualizzazione è abilitata.</p>
<p>È possibile verificare se la virtualizzazione è abilitata guardando la scheda <strong>Prestazioni</strong> in <strong>Task Manager</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" />
   </span> <span class="img-wrapper"> <span>Virtualizzazione in Task Manager</span> </span></p>
<p>Se la virtualizzazione è disabilitata, potrebbe essere necessario controllare le impostazioni del BIOS del firmware della scheda madre. Il modo di abilitare la virtualizzazione nelle impostazioni del BIOS varia a seconda dei produttori di schede madri. Per la scheda madre ASUS, ad esempio, è possibile fare riferimento a <a href="https://www.asus.com/support/faq/1043786/">questo articolo</a> sull'abilitazione della virtualizzazione.</p>
<p>Quindi, è necessario riavviare il computer e abilitare Hyper-V. Per i dettagli, consultare questo <a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">articolo di Microsoft</a>.</p></li>
<li><p>Controllare se il servizio Docker Desktop è stato avviato.</p>
<p>È possibile eseguire il seguente comando per avviare il servizio Docker Desktop.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker <span class="hljs-keyword">for</span> Windows Service service <span class="hljs-keyword">is</span> starting.​
The Docker <span class="hljs-keyword">for</span> Windows Service service was started successfully.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Controllare se WSL è stato installato correttamente.</p>
<p>È possibile eseguire il seguente comando per installare o aggiornare il comando WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking <span class="hljs-keyword">for</span> updates.​
The most recent version of Windows Subsystem <span class="hljs-keyword">for</span> Linux <span class="hljs-keyword">is</span> already installed.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Controllare se il demone Docker è stato avviato.</p>
<p>È necessario andare nella directory di installazione di Docker Desktop ed eseguire <code translate="no">.\DockerCli.exe -SwitchDaemon</code> per avviare Docker Daemon.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd <span class="hljs-string">&quot;C:\Program Files\Docker\Docker&quot;</span>​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post <span class="hljs-string">&quot;http://ipc/engine/switch&quot;</span>: <span class="hljs-built_in">open</span> \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verificare se Docker Desktop è stato avviato in modalità <strong>amministratore</strong>.</p>
<p>Assicurarsi di aver avviato Docker Desktop in modalità amministratore. Per farlo, fate clic con il pulsante destro del mouse su <strong>Docker Desktop</strong> e scegliete <strong>Esegui come amministratore</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" />
   </span> <span class="img-wrapper"> <span>Avviare Docker Desktop come amministratore</span> </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">Come posso risolvere i problemi legati al WSL durante la distribuzione di Milvus?</h3><p>Se avete riscontrato problemi legati a WSL durante l'esecuzione di Milvus da WSL 2, potreste dover verificare se avete configurato Docker Desktop per utilizzare il motore basato su WSL 2 come segue.</p>
<ol>
<li><p>Assicurarsi che "Usa il motore basato su WSL 2" sia selezionato in <strong>Impostazioni</strong> &gt; <strong>Generale</strong>. </p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>Utilizzare il motore basato su WSL 2 in Impostazioni di Docker Desktop</span> </span></p></li>
<li><p>Selezionate tra le distribuzioni WSL 2 installate quella su cui volete abilitare l'integrazione di Docker andando in: <strong>Impostazioni</strong> &gt; <strong>Risorse</strong> &gt; <strong>Integrazione WSL</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>Selezionate le distribuzioni WSL 2 nelle impostazioni di Docker Desktop</span> </span>.</p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header">Come posso gestire gli errori relativi al volume che vengono visualizzati durante l'avvio di Milvus che legge <code translate="no">Read config failed</code>?</h3><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" />
   </span> <span class="img-wrapper"> <span>Errore di lettura della configurazione fallito all'avvio di Milvus</span> </span></p>
<p>Per risolvere l'errore visualizzato durante l'avvio di Milvus, che recita "Read config failed", è necessario verificare se il volume montato nel contenitore Milvus è corretto. Se il volume è montato correttamente nel contenitore, si può usare il comando <code translate="no">docker exec</code> per entrare nel contenitore ed elencare la cartella <strong>/milvus/configs</strong> come segue.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" />
   </span> <span class="img-wrapper"> <span>Elenco dei file di configurazione di Milvus</span> </span></p>
<p></p>
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
<li><p>Esplorate <a href="https://milvus.io/docs/attu.md">Attu</a>, uno strumento open-source per la gestione intuitiva di Milvus.</p></li>
<li><p><a href="/docs/it/monitor.md">Monitorate Milvus con Prometheus</a>.</p></li>
</ul>
