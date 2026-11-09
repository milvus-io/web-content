---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: >-
  Erfahren Sie, wie Sie Milvus als Standalone-Version mit Docker Desktop für
  Windows installieren.
title: Milvus in Docker ausführen (Windows)
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
    </button></h1><blockquote>
<p>Standardmäßig verwendet diese Bereitstellung <strong>Woodpecker</strong> (lokales Dateisystem) als Nachrichtenwarteschlange, sodass kein externer Nachrichtenwarteschlangendienst erforderlich ist. Siehe <a href="/docs/de/woodpecker.md">Woodpecker</a>.</p>
</blockquote>
<p>Auf dieser Seite wird gezeigt, wie man Milvus unter Windows mit Docker Desktop, dem WSL-2-Backend und Linux-Containern ausführt.</p>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Installieren Sie Docker Desktop</a> und stellen Sie sicher, dass die Windows- und Hardwareanforderungen erfüllt sind.</li>
<li><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Installieren Sie das Windows-Subsystem für Linux 2 (WSL 2)</a>.</li>
<li>Starten Sie Docker Desktop, aktivieren Sie <strong>die Option „WSL 2-basierte Engine verwenden</strong>“ und wählen Sie „Linux-Container“ aus. Für Befehle, die innerhalb einer WSL-Distribution ausgeführt werden sollen, aktivieren Sie diese Distribution zusätzlich unter <strong>„Einstellungen</strong> &gt; <strong>Ressourcen</strong> &gt; <strong>WSL-Integration</strong>“. Siehe <a href="https://docs.docker.com/desktop/features/wsl/">Docker Desktop WSL 2-Backend</a>.</li>
</ul>
<p>Führen Sie vor dem Herunterladen der Milvus-Dateien die folgenden Überprüfungen in PowerShell oder der Windows-Eingabeaufforderung durch:</p>
<pre><code translate="no" class="language-powershell">wsl --version
docker info --format &quot;{{.OSType}}&quot;
docker compose version
</code></pre>
<p>Der Docker-Betriebssystemtyp muss „ <code translate="no">linux</code> “ sein. Die Compose-Beispiele verwenden das Plugin „ <code translate="no">docker compose</code> “ (V2 oder höher), nicht den veralteten Befehl „ <code translate="no">docker-compose</code> “ (V1).</p>
<h2 id="Run-Milvus-in-Docker" class="common-anchor-header">Milvus in Docker ausführen<button data-href="#Run-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Wählen Sie eines der folgenden Terminals aus. Führen Sie die Befehle in einem beschreibbaren Arbeitsverzeichnis aus; das Skript speichert dort Konfigurationsdateien und das Verzeichnis „ <code translate="no">volumes</code> “.</p>
<p>Das Skript wird aus dem Milvus-Zweig „ <code translate="no">master</code> “ heruntergeladen. Sein Docker-Image-Tag ist im Skript definiert und kann von v3.0.5 abweichen. Um genau diese Version bereitzustellen, verwenden Sie die unten stehende versionierte Docker-Compose-Konfiguration.</p>
<h3 id="From-PowerShell" class="common-anchor-header">Über PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>Laden Sie das Skript herunter und starten Sie anschließend Milvus:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -OutFile standalone.bat
.\standalone.bat start
</code></pre>
<p>PowerShell benötigt das Präfix „ <code translate="no">.\</code> “, um ein Skript aus dem Arbeitsverzeichnis auszuführen.</p>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">Über die Windows-Eingabeaufforderung<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie „ <code translate="no">curl.exe</code> “, um das Skript herunterzuladen; „ <code translate="no">Invoke-WebRequest</code> “ ist ein PowerShell-Befehl und lässt sich nicht in der Eingabeaufforderung ausführen:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -o standalone.bat
standalone.bat start
</code></pre>
<p>Nach Ausführung einer der beiden Windows-Befehlsfolgen:</p>
<ul>
<li>Ein Docker-Container namens <strong>„milvus-standalone“</strong> bedient Port <strong>19530</strong>.</li>
<li>Das eingebettete etcd läuft im selben Container auf Port <strong>2379</strong>. Seine Konfigurationsdatei entspricht <strong>der Datei „embedEtcd.yaml“</strong> im Arbeitsverzeichnis.</li>
<li>Milvus speichert Daten im Verzeichnis <strong>„volumes/milvus“</strong> im Arbeitsverzeichnis.</li>
<li>Konfigurationsüberschreibungen gehören in die Datei <strong>„user.yaml“</strong> im Arbeitsverzeichnis. Starten Sie den Container nach Änderungen neu.</li>
</ul>
<p>Überprüfen Sie den Status des Images und des Containers in einem beliebigen Terminal:</p>
<pre><code translate="no" class="language-powershell">docker inspect --format &quot;{{.Config.Image}}&quot; milvus-standalone
docker ps --filter name=milvus-standalone
</code></pre>
<p>Um Milvus über PowerShell zu beenden, führen Sie „ <code translate="no">.\standalone.bat stop</code> “ aus; über die Eingabeaufforderung führen Sie „ <code translate="no">standalone.bat stop</code> “ aus. Der Befehl „ <code translate="no">delete</code> “ entfernt sowohl den Container als auch die darin gespeicherten Daten. Sichern Sie die Daten, bevor Sie sie verwenden.</p>
<h3 id="From-WSL-2" class="common-anchor-header">Von WSL 2 aus<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>Öffnen Sie Ihre installierte WSL-Distribution in einem Windows-Terminal:</p>
<pre><code translate="no" class="language-powershell">wsl
</code></pre>
<p>Laden Sie im WSL-Terminal das Linux-Skript herunter und starten Sie Milvus einmalig:</p>
<pre><code translate="no" class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>Um Milvus zu beenden, führen Sie „ <code translate="no">bash standalone_embed.sh stop</code> “ aus. Der Befehl „ <code translate="no">bash standalone_embed.sh delete</code> “ entfernt den Container, die Konfiguration und die Daten; sichern Sie die Daten vor der Verwendung.</p>
<h2 id="Run-Milvus-with-Docker-Compose" class="common-anchor-header">Milvus mit Docker Compose ausführen<button data-href="#Run-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie die der Version v3.0.5 beiliegende Konfiguration. Führen Sie nur die für Ihr Terminal zutreffende Befehlsfolge aus.</p>
<h3 id="From-PowerShell" class="common-anchor-header">Über PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>Laden Sie die Konfiguration herunter und starten Sie Milvus:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml&quot; -OutFile docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">Über die Windows-Eingabeaufforderung<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>Laden Sie die Konfiguration herunter und starten Sie Milvus:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml&quot; -o docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-WSL-2" class="common-anchor-header">Über WSL 2<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>Öffnen Sie Ihre WSL-Distribution und führen Sie anschließend die folgenden Linux-Befehle aus:</p>
<pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yml
docker compose up -d
docker compose ps
<button class="copy-code-btn"></button></code></pre>
<p>Die Konfiguration startet drei lang laufende Container: <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> und <strong>milvus-etcd</strong>. Außerdem wird der einmalig auszuführende Dienst „ <code translate="no">milvus-volume-init</code> “ ausgeführt, um die Eigentumsrechte für das Datenverzeichnis vorzubereiten. Die Daten dieser Container werden im Arbeitsverzeichnis den Verzeichnissen <strong>„volumes/milvus“</strong>, <strong>„volumes/minio“</strong> und <strong>„volumes/etcd“</strong> zugeordnet. MinIO stellt die Ports <strong>9000</strong> und <strong>9001</strong> bereit; Milvus stellt die Ports <strong>19530</strong> und <strong>9091</strong> bereit. Informationen zu Konfigurations- und Lebenszyklusbefehlen finden Sie unter <a href="/docs/de/install_standalone-docker-compose.md">„Milvus mit Docker Compose ausführen</a>“.</p>
<h2 id="FAQs" class="common-anchor-header">Häufig gestellte Fragen<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error" class="common-anchor-header">Wie kann ich den Fehler „ <code translate="no">Docker Engine stopped</code> “ beheben?<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus verwendet Linux-Container. Überprüfen Sie Docker Desktop und dessen WSL-2-Backend, bevor Sie die Installation erneut versuchen:</p>
<ol>
<li><p>Aktivieren Sie die Hardwarevirtualisierung im BIOS/UEFI, falls unter <strong>„Task-Manager</strong> &gt; <strong>Leistung“</strong> angezeigt wird, dass sie deaktiviert ist. Siehe die <a href="https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements">Windows-Anforderungen für Docker Desktop</a>.</p></li>
<li><p>Starten Sie Docker Desktop über das Windows-Startmenü und warten Sie, bis die Engine läuft. Für die Installation oder Aktualisierung von WSL oder für bestimmte Installationsmodi von Docker Desktop sind möglicherweise Administratorrechte erforderlich; diese sind jedoch keine allgemeine Voraussetzung für die Ausführung von Linux-Containern mit dem WSL 2-Backend.</p></li>
<li><p>Überprüfen Sie WSL über ein Windows-Terminal. Falls ein Update erforderlich ist, führen Sie den Update-Befehl mit den von Windows angeforderten Berechtigungen aus:</p>
<pre><code translate="no" class="language-powershell">wsl --version
wsl --update
</code></pre></li>
<li><p>Aktivieren Sie <strong>die Option „WSL 2-basierte Engine</strong> in Docker Desktop <strong>verwenden</strong> “. Wenn im Docker-Menü die Option <strong>„Zu Linux-Containern wechseln</strong>“ angeboten wird, wählen Sie diese aus. Wechseln Sie nicht zu Windows-Containern, um ein Milvus-Linux-Image zu debuggen.</p></li>
<li><p>Führen Sie im Terminal, das Sie für die Installation verwenden, den folgenden Befehl aus:</p>
<pre><code translate="no" class="language-powershell">docker info --format &quot;{{.OSType}}&quot;
</code></pre>
<p>Die Ausgabe muss „ <code translate="no">linux</code> “ lauten. Wenn keine Verbindung zum Daemon hergestellt werden kann, befolge <a href="https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/">die Anweisungen zur Fehlerbehebung in Docker Desktop</a>, bevor du das Milvus-Skript erneut ausführst. Das bloße Starten von „ <code translate="no">com.docker.service</code> “ reicht nicht aus, um sicherzustellen, dass die WSL 2-Linux-Engine läuft.</p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="common-anchor-header">Wie kann ich WSL-bezogene Probleme bei der Bereitstellung von Milvus beheben?<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn bei der Ausführung von Milvus unter WSL 2 Probleme im Zusammenhang mit WSL aufgetreten sind, müssen Sie möglicherweise überprüfen, ob Sie Docker Desktop wie folgt für die Verwendung der WSL 2-basierten Engine konfiguriert haben:</p>
<ol>
<li><p>Stellen Sie sicher, dass unter <strong>„Einstellungen</strong> &gt; <strong>Allgemein“</strong> die Option „WSL 2-basierte Engine verwenden“ aktiviert ist.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>Verwenden der WSL 2-basierten Engine in den Docker Desktop-Einstellungen</span>
  
 </span></p></li>
<li><p>Wählen Sie unter <strong>„Einstellungen</strong> &gt; <strong>Ressourcen</strong> &gt; <strong>WSL-Integration</strong>“ aus Ihren installierten WSL 2-Distributionen diejenigen aus, für die Sie die Docker-Integration aktivieren möchten.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>WSL 2-Distributionen in den Docker Desktop-Einstellungen auswählen</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="common-anchor-header">Wie kann ich mit den beim Start von Milvus angezeigten volumenbezogenen Fehlern umgehen, die lauten: „ <code translate="no">Read config failed</code> “?<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="anchor-icon" translate="no">
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
   <span>Fehlermeldung „Read config failed“ beim Start von Milvus</span>
  
 </span></p>
<p>Um den beim Start von Milvus angezeigten Fehler „Read config failed“ zu beheben, müssen Sie überprüfen, ob das in den Milvus-Container eingebundene Volume korrekt ist. Wenn das Volume korrekt in den Container eingebunden ist, können Sie mit dem Befehl „ <code translate="no">docker exec</code> “ in den Container wechseln und den Ordner <strong> „/milvus/configs“</strong> wie folgt auflisten:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>Milvus-Konfigurationsdateien auflisten</span>
  
 </span></p>
<div class="alert note">
<p>Storage V3 ist standardmäßig deaktiviert. Aktivieren Sie es, bevor Sie Funktionen nutzen, die davon abhängen. Informationen zu Anforderungen und Kompatibilitätsaspekten finden Sie unter <a href="/docs/de/storage-v3.md">„Storage V3</a>“.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Was als Nächstes zu tun ist<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie Milvus in Docker installiert haben, folgen Sie dem Pfad <strong>„Einen vorhandenen Milvus-Server verwenden“</strong> im <a href="/docs/de/quickstart.md">Schnellstart</a> und verbinden Sie das SDK mit <code translate="no">http://localhost:19530</code>. Für diesen Serverpfad ist Milvus Lite nicht erforderlich; der lokale Verbindungsblock „ <code translate="no">.db</code> “ würde stattdessen eine separate lokale Datenbank starten, anstatt diesen Container zu verwenden.</p>
<p>Sie können außerdem:</p>
<ul>
<li><p>Schauen Sie <a href="/docs/de/quickstart.md">im Schnellstart</a> nach, was Milvus alles kann.</p></li>
<li><p>Lernen Sie die grundlegenden Funktionen von Milvus kennen:</p>
<ul>
<li><a href="/docs/de/manage_databases.md">Datenbanken verwalten</a></li>
<li><a href="/docs/de/manage-collections.md">Sammlungen verwalten</a></li>
<li><a href="/docs/de/manage-partitions.md">Partitionen verwalten</a></li>
<li><a href="/docs/de/insert-update-delete.md">Einfügen, Upsert und Löschen</a></li>
<li><a href="/docs/de/single-vector-search.md">Suche nach einzelnen Vektoren</a></li>
<li><a href="/docs/de/multi-vector-search.md">Hybride Suche</a></li>
</ul></li>
<li><p>Für Compose-Bereitstellungen befolgen Sie die <a href="/docs/de/upgrade_milvus_standalone-docker.md">Anleitung „Upgrade von Milvus Standalone mit Docker Compose“</a>; überprüfen Sie die Vorgehensweise in Ihrer Umgebung, bevor Sie das Upgrade durchführen.</p></li>
<li><p><a href="/docs/de/scaleout.md">Skalieren Sie Ihren Milvus-Cluster</a>.</p></li>
<li><p>Stellen Sie Ihren Milvus-Cluster in folgenden Clouds bereit:</p>
<ul>
<li><a href="/docs/de/eks.md">Amazon EKS</a></li>
<li><a href="/docs/de/gcp.md">Google Cloud</a></li>
<li><a href="/docs/de/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Entdecken Sie <a href="/docs/de/milvus-webui.md">Milvus WebUI</a>, eine intuitive Weboberfläche für die Überwachung und Verwaltung von Milvus.</p></li>
<li><p>Entdecken Sie <a href="/docs/de/milvus_backup_overview.md">Milvus Backup</a>, ein Open-Source-Tool für Milvus-Datensicherungen.</p></li>
<li><p>Entdecken Sie <a href="/docs/de/birdwatcher_overview.md">Birdwatcher</a>, ein Open-Source-Tool für die Fehlerbehebung bei Milvus und dynamische Konfigurationsaktualisierungen.</p></li>
<li><p>Entdecken Sie <a href="https://github.com/zilliztech/attu">Attu</a>, ein Open-Source-GUI-Tool für die intuitive Verwaltung von Milvus.</p></li>
<li><p><a href="/docs/de/monitor.md">Überwachen Sie Milvus mit Prometheus</a>.</p></li>
</ul>
