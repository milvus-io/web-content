---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: >-
  Erfahren Sie, wie Sie Milvus eigenständig mit Docker Desktop für Windows
  installieren.
title: Milvus in Docker ausführen (Linux)
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">Milvus in Docker ausführen (Windows)<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite wird gezeigt, wie Milvus unter Windows mit Docker Desktop für Windows ausgeführt werden kann.</p>
<h2 id="Prerequisites​" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites​" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Installieren Sie Docker Desktop</a>.</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Installieren Sie Windows Subsystem für Linux 2 (WSL 2)</a>.</p></li>
<li><p>Installieren Sie Python 3.8+.</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">Ausführen von Milvus in Docker<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus bietet ein Installationsskript, um es als Docker-Container zu installieren. Sobald Sie Docker Desktop unter Microsoft Windows installiert haben, können Sie über PowerShell oder die Windows-Eingabeaufforderung im <strong>Administratormodus</strong> und über WSL 2 auf die Docker-CLI zugreifen. </p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Von PowerShell oder der Windows-Eingabeaufforderung aus</h3><p>Wenn Sie mit PowerShell oder der Windows-Eingabeaufforderung besser vertraut sind, sehen Sie die Eingabeaufforderung wie folgt.</p>
<ol>
<li><p>Öffnen Sie Docker Desktop im Administratormodus, indem Sie mit der rechten Maustaste klicken und <strong>Als Administrator ausführen</strong> wählen.</p></li>
<li><p>Laden Sie das Installationsskript herunter und speichern Sie es unter <code translate="no">standalone.bat</code>.</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-attr">C</span>:\&gt;<span class="hljs-title class_">Invoke</span>-<span class="hljs-title class_">WebRequest</span> <span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/milvus-io/milvus/blob/master/scripts/standalone_embed.bat -OutFile standalone.bat​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Führen Sie das heruntergeladene Skript aus, um Milvus als Docker-Container zu starten.</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-attr">C</span>:\&gt;standalone.<span class="hljs-property">bat</span> start​
<span class="hljs-title class_">Wait</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">Milvus</span> starting...​
<span class="hljs-title class_">Start</span> successfully.​
<span class="hljs-title class_">To</span> change the <span class="hljs-keyword">default</span> <span class="hljs-title class_">Milvus</span> configuration, edit user.<span class="hljs-property">yaml</span> and restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Sie das Installationsskript ausgeführt haben.</p>
<ul>
<li><p>Ein Docker-Container namens <strong>milvus-standalone</strong> wurde an Port <strong>19530</strong> gestartet.</p></li>
<li><p>Ein embed etcd wird zusammen mit Milvus im selben Container installiert und dient an Port <strong>2379</strong>. Seine Konfigurationsdatei wird auf <strong>embedEtcd.yaml</strong> im aktuellen Ordner abgebildet.</p></li>
<li><p>Das Milvus-Datenvolumen wird im aktuellen Ordner auf <strong>volumes/milvus</strong> abgebildet.</p></li>
</ul>
<p>Sie können die folgenden Befehle verwenden, um den Milvus-Container und die gespeicherten Daten zu verwalten.</p>
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
<h3 id="From-WSL-2​" class="common-anchor-header">Von WSL 2 aus</h3><p>Wenn Sie es vorziehen, Milvus mit Linux-Befehlen und Shell-Skripten unter Windows zu starten, stellen Sie sicher, dass Sie den Befehl WSL 2 bereits installiert haben. Einzelheiten zur Installation des WSL 2-Befehls finden Sie in diesem <a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Microsoft-Artikel</a>.</p>
<ol>
<li><p>Starten Sie WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Laden Sie das Installationsskript herunter</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Download the installation script​</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh​
​
<span class="hljs-comment"># Start the Docker container​</span>
$ bash standalone_embed.sh start​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Starten Sie Milvus als Docker-Container.</p>
<pre><code translate="no" class="language-bash">$ bash standalone_embed.sh start​
Wait <span class="hljs-keyword">for</span> Milvus Starting...​
Start successfully.​
To change the <span class="hljs-literal">default</span> Milvus configuration, <span class="hljs-keyword">add</span> your settings to the user.yaml file <span class="hljs-keyword">and</span> then restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>Sie können die folgenden Befehle verwenden, um den Milvus-Container und die gespeicherten Daten zu verwalten.</p>
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
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">Milvus mit Docker Compose starten<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Sie Docker Desktop unter Microsoft Windows installiert haben, können Sie über die PowerShell oder die Windows-Eingabeaufforderung im <strong>Administratormodus</strong> auf die Docker-CLI zugreifen. Sie können Docker Compose entweder in PowerShell, der Windows-Eingabeaufforderung oder WSL 2 ausführen, um Milvus zu starten.</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Von PowerShell oder der Windows-Eingabeaufforderung aus</h3><ol>
<li><p>Öffnen Sie Docker Desktop im Administratormodus, indem Sie mit der rechten Maustaste klicken und <strong>Als Administrator ausführen</strong> wählen.</p></li>
<li><p>Führen Sie die folgenden Befehle in PowerShell oder der Windows-Eingabeaufforderung aus, um die Docker Compose-Konfigurationsdatei für Milvus Standalone herunterzuladen und Milvus zu starten.</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-comment"># Download the configuration file and rename it as docker-compose.yml​</span>
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.4.15/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
<span class="hljs-comment"># Start Milvus​</span>
C:\&gt;docker compose up -d​
Creating milvus-etcd  ... <span class="hljs-keyword">done</span>​
Creating milvus-minio ... <span class="hljs-keyword">done</span>​
Creating milvus-standalone ... <span class="hljs-keyword">done</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Abhängig von Ihrer Netzwerkverbindung kann das Herunterladen der Images für die Milvus-Installation eine Weile dauern. Sobald die Container mit den Namen <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> und <strong>milvus-etcd</strong> gestartet sind, können Sie sehen, dass</p>
<ul>
<li><p>Der <strong>milvus-etcd-Container</strong> gibt keine Ports an den Host weiter und ordnet seine Daten den <strong>Volumes/etcd</strong> im aktuellen Ordner zu.</p></li>
<li><p>Der <strong>milvus-minio-Container</strong> bedient die Ports <strong>9090</strong> und <strong>9091</strong> lokal mit den Standard-Authentifizierungsdaten und ordnet seine Daten den <strong>Volumes/minio</strong> im aktuellen Ordner zu.</p></li>
<li><p>Der <strong>milvus-standalone-Container</strong> bedient lokal die Ports <strong>19530</strong> mit den Standardeinstellungen und ordnet seine Daten den <strong>Volumes/milvus</strong> im aktuellen Ordner zu.</p></li>
</ul></li>
</ol>
<p>Sie können auch die Linux-Version der Docker Compose-Befehle aufrufen, wenn Sie WSL 2 installiert haben.</p>
<h3 id="From-WSL-2​" class="common-anchor-header">Von WSL 2 aus</h3><p>Die Vorgehensweise ist ähnlich wie bei der Verwendung von Docker Compose zur Installation von Milvus in Linux-Systemen.</p>
<ol>
<li><p>Starten Sie WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Laden Sie die Milvus-Konfigurationsdatei herunter.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.17/milvus-standalone-docker-compose.yml -O docker-compose.yml​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Starten Sie Milvus.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose up -d​
​
Creating milvus-etcd  ... <span class="hljs-keyword">done</span>​
Creating milvus-minio ... <span class="hljs-keyword">done</span>​
Creating milvus-standalone ... <span class="hljs-keyword">done</span>​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">Häufig gestellte Fragen<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header">Wie kann ich mit dem Fehler <code translate="no">Docker Engine stopped</code> umgehen?</h3><p>Nach der Installation von Docker Desktop unter Windows kann die Fehlermeldung <code translate="no">Docker Engine stopped</code> auftreten, wenn Ihr Computer nicht richtig konfiguriert ist. In diesem Fall müssen Sie möglicherweise die folgenden Überprüfungen durchführen.</p>
<ol>
<li><p>Prüfen Sie, ob die Virtualisierung aktiviert ist.</p>
<p>Sie können überprüfen, ob die Virtualisierung aktiviert ist, indem Sie die Registerkarte <strong>Leistung</strong> im <strong>Task-Manager</strong> aufrufen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" />
   </span> <span class="img-wrapper"> <span>Virtualisierung im Task-Manager</span> </span></p>
<p>Wenn die Virtualisierung deaktiviert ist, müssen Sie möglicherweise die BIOS-Einstellungen der Firmware Ihres Motherboards überprüfen. Die Art und Weise, wie Sie die Virtualisierung in den BIOS-Einstellungen aktivieren können, variiert je nach Motherboard-Hersteller. Für die ASUS-Hauptplatine können Sie zum Beispiel <a href="https://www.asus.com/support/faq/1043786/">diesen Artikel</a> zur Aktivierung der Virtualisierung lesen.</p>
<p>Anschließend müssen Sie Ihren Computer neu starten und Hyper-V aktivieren. Weitere Informationen finden Sie in diesem <a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">Microsoft-Artikel</a>.</p></li>
<li><p>Überprüfen Sie, ob der Docker Desktop Service gestartet wurde.</p>
<p>Sie können den folgenden Befehl ausführen, um den Docker Desktop Service zu starten.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker <span class="hljs-keyword">for</span> Windows Service service <span class="hljs-keyword">is</span> starting.​
The Docker <span class="hljs-keyword">for</span> Windows Service service was started successfully.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Überprüfen Sie, ob die WSL ordnungsgemäß installiert wurde.</p>
<p>Sie können den folgenden Befehl ausführen, um den WSL 2-Befehl zu installieren oder zu aktualisieren.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking <span class="hljs-keyword">for</span> updates.​
The most recent version of Windows Subsystem <span class="hljs-keyword">for</span> Linux <span class="hljs-keyword">is</span> already installed.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Prüfen Sie, ob Docker Daemon gestartet wurde.</p>
<p>Sie müssen in das Installationsverzeichnis von Docker Desktop wechseln und <code translate="no">.\DockerCli.exe -SwitchDaemon</code> ausführen, um Docker Daemon zu starten.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd <span class="hljs-string">&quot;C:\Program Files\Docker\Docker&quot;</span>​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post <span class="hljs-string">&quot;http://ipc/engine/switch&quot;</span>: <span class="hljs-built_in">open</span> \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Prüfen Sie, ob Sie Docker Desktop im <strong>Administratormodus</strong> gestartet haben.</p>
<p>Stellen Sie sicher, dass Sie Docker Desktop im Administratormodus gestartet haben. Klicken Sie dazu mit der rechten Maustaste auf <strong>Docker Desktop</strong> und wählen Sie <strong>Als Administrator ausführen</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" />
   </span> <span class="img-wrapper"> <span>Docker Desktop als Administrator starten</span> </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">Wie kann ich mit WSL-bezogenen Problemen bei der Bereitstellung von Milvus umgehen?</h3><p>Wenn bei der Ausführung von Milvus von WSL 2 aus WSL-bezogene Probleme auftreten, müssen Sie möglicherweise überprüfen, ob Sie Docker Desktop wie folgt für die Verwendung der WSL 2-basierten Engine konfiguriert haben.</p>
<ol>
<li><p>Stellen Sie sicher, dass unter <strong>Einstellungen</strong> &gt; <strong>Allgemein</strong> die Option "WSL 2-basierte Engine verwenden" aktiviert ist. </p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>Verwenden der WSL 2-basierten Engine in den Docker Desktop-Einstellungen</span> </span></p></li>
<li><p>Wählen Sie aus Ihren installierten WSL 2-Distributionen diejenige aus, für die Sie die Docker-Integration aktivieren möchten, indem Sie zu: <strong>Einstellungen</strong> &gt; <strong>Ressourcen</strong> &gt; <strong>WSL-Integration</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>Wählen Sie WSL 2-Distributionen in den Docker-Desktop-Einstellungen aus</span> </span>.</p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header">Wie kann ich mit den volumenbezogenen Fehlern umgehen, die während des Starts von Milvus angezeigt werden, das <code translate="no">Read config failed</code> liest?</h3><p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" />
   </span> <span class="img-wrapper"> <span>Fehlermeldung "Read config failed" beim Starten von Milvus</span> </span></p>
<p>Um die Fehlermeldung beim Starten von Milvus "Read config failed" zu beheben, müssen Sie überprüfen, ob das in den Milvus-Container eingebundene Volume korrekt ist. Wenn das Volume korrekt in den Container eingebunden ist, können Sie den Befehl <code translate="no">docker exec</code> verwenden, um in den Container zu gehen und den Ordner <strong>/milvus/configs</strong> wie folgt aufzulisten.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" />
   </span> <span class="img-wrapper"> <span>Milvus-Konfigurationsdateien auflisten</span> </span></p>
<p></p>
