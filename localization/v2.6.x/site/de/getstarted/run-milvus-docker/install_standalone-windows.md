---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: >-
  Erfahren Sie, wie Sie Milvus als Standalone-Version mit Docker Desktop für
  Windows installieren.
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
    </button></h1><p>Auf dieser Seite wird gezeigt, wie Sie Milvus unter Windows mit Docker Desktop für Windows ausführen können.​</p>
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Installieren Sie Docker Desktop</a>.​</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Installieren Sie das Windows-Subsystem für Linux 2 (WSL 2)</a>.​</p></li>
<li><p>Installieren Sie Python 3.8 oder höher.</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">Milvus in Docker ausführen​<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus stellt ein Installationsskript bereit, mit dem es als Docker-Container installiert werden kann. Sobald Sie Docker Desktop unter Microsoft Windows installiert haben, können Sie über PowerShell oder die Windows-Eingabeaufforderung im <strong>Administratormodus</strong> sowie über WSL 2 auf die Docker-CLI zugreifen. ​</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Über PowerShell oder die Windows-Eingabeaufforderung​<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn Sie mit PowerShell oder der Windows-Eingabeaufforderung besser vertraut sind, lautet der Befehl wie folgt.​</p>
<ol>
<li><p>Öffnen Sie Docker Desktop im Administratormodus, indem Sie mit der rechten Maustaste darauf klicken und <strong>„Als Administrator ausführen“</strong> auswählen.​</p></li>
<li><p>Laden Sie das Installationsskript herunter und speichern Sie es unter „ <code translate="no">standalone.bat</code> “.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;Invoke-WebRequest https://raw.githubusercontent.com/milvus-io/milvus/refs/heads/master/scripts/standalone_embed.bat -OutFile standalone.bat​

</code></pre></li>
<li><p>Führen Sie das heruntergeladene Skript aus, um Milvus als Docker-Container zu starten.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;standalone.bat start​
Wait for Milvus starting...​
Start successfully.​
To change the default Milvus configuration, edit user.yaml and restart the service.​

</code></pre>
<p>Nach Ausführung des Installationsskripts:​</p>
<ul>
<li><p>Ein Docker-Container namens <strong>„milvus-standalone“</strong> wurde am Port <strong>19530</strong> gestartet.​</p></li>
<li><p>Ein „embed etcd“ wird zusammen mit Milvus im selben Container installiert und ist am Port <strong>2379</strong> erreichbar. Seine Konfigurationsdatei ist auf <strong>„embedEtcd.yaml“</strong> im aktuellen Ordner abgebildet.​</p></li>
<li><p>Das Milvus-Datenvolume ist auf <strong>„volumes/milvus“</strong> im aktuellen Ordner abgebildet.​</p></li>
</ul>
<p>Mit den folgenden Befehlen können Sie den Milvus-Container und die gespeicherten Daten verwalten.​</p>
<pre><code translate="no" class="language-powershell"># Stop Milvus​
C:\&gt;standalone.bat stop​
Stop successfully.​
​
# Delete Milvus container​
C:\&gt;standalone.bat delete​
Delete Milvus container successfully. # Container has been removed.​
Delete successfully. # Data has been removed.​

</code></pre></li>
</ol>
<h3 id="From-WSL-2​" class="common-anchor-header">Unter WSL 2​<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn Sie Milvus unter Windows lieber mit Linux-Befehlen und Shell-Skripten starten möchten, stellen Sie sicher, dass Sie WSL 2 bereits installiert haben. Einzelheiten zur Installation von WSL 2 finden Sie in diesem <a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Microsoft-Artikel</a>.​</p>
<ol>
<li><p>Starten Sie WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>Laden Sie das Installationsskript herunter​</p>
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
To change the default Milvus configuration, add your settings to the user.yaml file and <span class="hljs-keyword">then</span> restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>Mit den folgenden Befehlen können Sie den Milvus-Container und die gespeicherten Daten verwalten.​</p>
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
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">Führen Sie Milvus mit Docker Compose aus​<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Sie Docker Desktop unter Microsoft Windows installiert haben, können Sie im <strong>Administratormodus</strong> über die PowerShell oder die Windows-Eingabeaufforderung auf die Docker-CLI zugreifen. Sie können Docker Compose entweder in der PowerShell, der Windows-Eingabeaufforderung oder in WSL 2 ausführen, um Milvus zu starten.​</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Über die PowerShell oder die Windows-Eingabeaufforderung​<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p>Öffnen Sie Docker Desktop im Administratormodus, indem Sie mit der rechten Maustaste darauf klicken und <strong>„Als Administrator ausführen“</strong> auswählen.</p></li>
<li><p>Führen Sie die folgenden Befehle in der PowerShell oder der Windows-Eingabeaufforderung aus, um die Docker-Compose-Konfigurationsdatei für Milvus Standalone herunterzuladen und Milvus zu starten.​</p>
<pre><code translate="no" class="language-powershell"># Download the configuration file and rename it as docker-compose.yml​
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
# Start Milvus​
C:\&gt;docker compose up -d​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

</code></pre>
<p>Je nach Ihrer Netzwerkverbindung kann das Herunterladen der Images für die Milvus-Installation eine Weile dauern. Sobald die Container mit den Namen <strong>„milvus-standalone“</strong>, <strong>„milvus-minio“</strong> und <strong>„milvus-etcd“</strong> laufen, können Sie feststellen, dass ​</p>
<ul>
<li><p>Der Container <strong>„milvus-etcd“</strong> keine Ports gegenüber dem Host freigibt und seine Daten auf <strong>„volumes/etcd“</strong> im aktuellen Ordner abbildet.</p></li>
<li><p>Der Container <strong>„milvus-minio“</strong> stellt lokal die Ports <strong>9090</strong> und <strong>9091</strong> mit den Standard-Anmeldedaten bereit und ordnet seine Daten dem <strong>Verzeichnis „volumes/minio“</strong> im aktuellen Ordner zu.​</p></li>
<li><p>Der Container <strong>„milvus-standalone“</strong> stellt lokal die Ports <strong>19530</strong> mit den Standardeinstellungen bereit und ordnet seine Daten dem Verzeichnis <strong>„volumes/milvus“</strong> im aktuellen Ordner zu.​</p></li>
</ul></li>
</ol>
<p>Sie können auch die Linux-Version der Docker-Compose-Befehle aufrufen, wenn Sie WSL 2 installiert haben.​</p>
<h3 id="From-WSL-2​" class="common-anchor-header">Unter WSL 2​<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Vorgehensweise ähnelt der Installation von Milvus auf Linux-Systemen mit Docker Compose.​</p>
<ol>
<li><p>Starten Sie WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>Laden Sie die Milvus-Konfigurationsdatei herunter.​</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose.yml -O docker-compose.yml​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Starten Sie Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d​</span>
​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">Häufig gestellte Fragen​<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header">Wie kann ich den Fehler „ <code translate="no">Docker Engine stopped</code> “ beheben?​<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="anchor-icon" translate="no">
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
    </button></h3><p>Nach der Installation von Docker Desktop unter Windows kann der Fehler „ <code translate="no">Docker Engine stopped</code> “ auftreten, wenn Ihr Computer nicht richtig konfiguriert ist. In diesem Fall sollten Sie folgende Überprüfungen vornehmen:​</p>
<ol>
<li><p>Überprüfen Sie, ob die Virtualisierung aktiviert ist.​</p>
<p>Sie können auf der Registerkarte <strong>„Leistung“</strong> im <strong>Task-Manager</strong> überprüfen, ob die Virtualisierung aktiviert ist.​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" /> 
   <span>Virtualisierung im Task-Manager</span>
  
 </span></p>
<p>Wenn die Virtualisierung deaktiviert ist, müssen Sie möglicherweise die BIOS-Einstellungen der Firmware Ihres Motherboards überprüfen. Die Vorgehensweise zum Aktivieren der Virtualisierung in den BIOS-Einstellungen variiert je nach Motherboard-Hersteller. Für ASUS-Motherboards können Sie beispielsweise <a href="https://www.asus.com/support/faq/1043786/">diesen Artikel</a> zum Aktivieren der Virtualisierung zu Rate ziehen.​</p>
<p>Anschließend müssen Sie Ihren Computer neu starten und Hyper-V aktivieren. Weitere Informationen finden Sie in diesem <a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">Microsoft-Artikel</a>.​</p></li>
<li><p>Überprüfen Sie, ob der Docker Desktop-Dienst gestartet wurde.</p>
<p>Sie können den folgenden Befehl ausführen, um den Docker Desktop-Dienst zu starten.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker for Windows Service service is starting.​
The Docker for Windows Service service was started successfully.​

</code></pre></li>
<li><p>Überprüfen Sie, ob WSL ordnungsgemäß installiert wurde.</p>
<p>Mit dem folgenden Befehl können Sie WSL 2 installieren oder aktualisieren.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking for updates.​
The most recent version of Windows Subsystem for Linux is already installed.​

</code></pre></li>
<li><p>Überprüfen Sie, ob der Docker-Daemon gestartet wurde.</p>
<p>Wechseln Sie in das Installationsverzeichnis von Docker Desktop und führen Sie „ <code translate="no">.\DockerCli.exe -SwitchDaemon</code> “ aus, um den Docker-Daemon zu starten.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd &quot;C:\Program Files\Docker\Docker&quot;​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post &quot;http://ipc/engine/switch&quot;: open \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

</code></pre></li>
<li><p>Überprüfen Sie, ob Sie Docker Desktop im <strong>Administratormodus</strong> gestartet haben.</p>
<p>Stellen Sie sicher, dass Sie Docker Desktop im Administratormodus gestartet haben. Klicken Sie dazu mit der rechten Maustaste auf <strong>Docker Desktop</strong> und wählen Sie <strong>„Als Administrator ausführen</strong>“.​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" /> 
   <span>Docker Desktop als Administrator starten</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">Wie kann ich Probleme im Zusammenhang mit WSL bei der Bereitstellung von Milvus beheben?​<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn bei der Ausführung von Milvus unter WSL 2 Probleme im Zusammenhang mit WSL aufgetreten sind, müssen Sie möglicherweise überprüfen, ob Sie Docker Desktop wie folgt für die Verwendung der WSL 2-basierten Engine konfiguriert haben:​</p>
<ol>
<li><p>Stellen Sie sicher, dass unter <strong>„Einstellungen</strong> &gt; <strong>Allgemein“</strong> die Option „WSL 2-basierte Engine verwenden“ aktiviert ist. ​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>Verwenden der WSL 2-basierten Engine in den Docker Desktop-Einstellungen</span>
  
 </span></p></li>
<li><p>Wählen Sie unter <strong>„Einstellungen</strong> &gt; <strong>Ressourcen</strong> &gt; <strong>WSL-Integration</strong>“ aus Ihren installierten WSL 2-Distributionen diejenigen aus, für die Sie die Docker-Integration aktivieren möchten.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>WSL 2-Distributionen in den Docker Desktop-Einstellungen auswählen</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header">Wie kann ich mit den beim Start von Milvus angezeigten volumenbezogenen Fehlern umgehen, die lauten: „ <code translate="no">Read config failed</code> “?​<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="anchor-icon" translate="no">
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
  
   <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" /> 
   <span>Fehlermeldung „Read config failed“ beim Start von Milvus</span>
  
 </span></p>
<p>Um den beim Start von Milvus angezeigten Fehler „Read config failed“ zu beheben, müssen Sie überprüfen, ob das in den Milvus-Container eingebundene Volume korrekt ist. Wenn das Volume korrekt in den Container eingebunden ist, können Sie mit dem Befehl „ <code translate="no">docker exec</code> “ in den Container wechseln und den Ordner <strong> „/milvus/configs“</strong> wie folgt auflisten:​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>Milvus-Konfigurationsdateien auflisten</span>
  
 </span></p>
<p>​</p>
<h2 id="Whats-next" class="common-anchor-header">Was nun<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie Milvus in Docker installiert haben, können Sie:</p>
<ul>
<li><p><a href="/docs/de/v2.6.x/quickstart.md">Im Schnellstart</a> nachsehen, was Milvus alles kann.</p></li>
<li><p>Lernen Sie die grundlegenden Funktionen von Milvus kennen:</p>
<ul>
<li><a href="/docs/de/v2.6.x/manage_databases.md">Datenbanken verwalten</a></li>
<li><a href="/docs/de/v2.6.x/manage-collections.md">Kollektionen verwalten</a></li>
<li><a href="/docs/de/v2.6.x/manage-partitions.md">Partitionen verwalten</a></li>
<li><a href="/docs/de/v2.6.x/insert-update-delete.md">Einfügen, Upsert und Löschen</a></li>
<li><a href="/docs/de/v2.6.x/single-vector-search.md">Einzelvektor-Suche</a></li>
<li><a href="/docs/de/v2.6.x/multi-vector-search.md">Hybride Suche</a></li>
</ul></li>
<li><p><a href="/docs/de/v2.6.x/upgrade_milvus_cluster-helm.md">Milvus mit Helm-Chart aktualisieren</a>.</p></li>
<li><p><a href="/docs/de/v2.6.x/scaleout.md">Skalieren Sie Ihren Milvus-Cluster</a>.</p></li>
<li><p>Stellen Sie Ihren Milvus-Cluster in folgenden Clouds bereit:</p>
<ul>
<li><a href="/docs/de/v2.6.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/de/v2.6.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/de/v2.6.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Entdecken Sie <a href="/docs/de/v2.6.x/milvus-webui.md">Milvus WebUI</a>, eine intuitive Weboberfläche für die Überwachung und Verwaltung von Milvus.</p></li>
<li><p>Entdecken Sie <a href="/docs/de/v2.6.x/milvus_backup_overview.md">Milvus Backup</a>, ein Open-Source-Tool für Milvus-Datensicherungen.</p></li>
<li><p>Entdecken Sie <a href="/docs/de/v2.6.x/birdwatcher_overview.md">Birdwatcher</a>, ein Open-Source-Tool zur Fehlerbehebung in Milvus und für dynamische Konfigurationsaktualisierungen.</p></li>
<li><p>Entdecken Sie <a href="https://github.com/zilliztech/attu">Attu</a>, ein Open-Source-GUI-Tool für die intuitive Verwaltung von Milvus.</p></li>
<li><p><a href="/docs/de/v2.6.x/monitor.md">Überwachen Sie Milvus mit Prometheus</a>.</p></li>
</ul>
