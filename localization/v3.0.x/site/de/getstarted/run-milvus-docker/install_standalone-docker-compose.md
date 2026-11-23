---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: >-
  Erfahren Sie, wie Sie Milvus als Standalone-Anwendung mit Docker Compose
  installieren.
title: Milvus mit Docker Compose ausführen (Linux)
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">Milvus mit Docker Compose ausführen (Linux)<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite wird erläutert, wie Sie eine Milvus-Instanz in Docker mithilfe von Docker Compose starten.</p>
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
<li><a href="https://docs.docker.com/get-docker/">Installieren Sie Docker</a>.</li>
<li>Installieren Sie das <a href="https://docs.docker.com/compose/install/linux/">Docker Compose-Plugin</a> (V2 oder höher) und überprüfen Sie es mit dem Befehl „ <code translate="no">docker compose version</code> “. Diese Anleitung verwendet den Befehl „ <code translate="no">docker compose</code> “ und nicht den veralteten Befehl „ <code translate="no">docker-compose</code> “ (V1).</li>
<li><a href="/docs/de/prerequisite-docker.md">Überprüfen Sie</a> vor der Installation<a href="/docs/de/prerequisite-docker.md">die Hardware- und Softwareanforderungen</a>.</li>
</ul>
<h2 id="Install-Milvus" class="common-anchor-header">Milvus installieren<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus stellt im Milvus-Repository eine Docker-Compose-Konfigurationsdatei bereit. Laden Sie die Konfiguration für v3.0.5 mit dem unten stehenden Befehl „ <code translate="no">wget</code> “ herunter. Führen Sie unmittelbar nach dem Herunterladen – noch bevor Sie die Datei bearbeiten oder Milvus mit „ <code translate="no">sudo docker compose up -d</code> “ starten – den Befehl „ <code translate="no">sha256sum docker-compose.yaml</code> “ aus und vergleichen Sie das Ergebnis mit dem Digest „ <code translate="no">sha256</code> “, der auf der <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">Release-Seite</a> für <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">v3.0.5</a> unter <code translate="no">milvus-standalone-docker-compose.yaml</code> aufgeführt ist:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yaml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Standardbereitstellung (v3.0.5):</strong> <code translate="no">docker compose up -d</code> startet drei lang laufende Container – <code translate="no">milvus-etcd</code> (Metadaten), <code translate="no">milvus-minio</code> (Objektspeicher) und <code translate="no">milvus-standalone</code>. Die Nachrichtenwarteschlange ist <strong>Woodpecker (eingebettet, mit MinIO/Objektspeicher als WAL-Backend)</strong>, sodass kein separater Container für die Nachrichtenwarteschlange erforderlich ist.</p>
<p>Die Konfiguration führt außerdem den einmalig ausgeführten Dienst „ <code translate="no">milvus-volume-init</code> “ aus, um die Eigentumsrechte für das Datenverzeichnis vorzubereiten. Nach Abschluss dieser Aufgabe wird der Dienst beendet.</p>
<p><strong>Standard-Nachrichtenwarteschlange je nach Version:</strong></p>
<ul>
<li><strong>2.5.x</strong> – Standard-Nachrichtenwarteschlange ist <strong>RocksMQ</strong>.</li>
<li><strong>2.6.x und höher</strong> – Standard-Nachrichtenwarteschlange ist <strong>Woodpecker (eingebettet)</strong>.</li>
</ul>
<p>Verwenden Sie die Konfiguration, die der von Ihnen zu installierenden Version beiliegt. Bei einer bestehenden Bereitstellung befolgen Sie bitte die Upgrade-Anweisungen, anstatt die Konfiguration durch eine Datei für eine Neuinstallation zu ersetzen.</p>
<ul>
<li><p>Falls „ <code translate="no">docker compose</code> “ nicht verfügbar ist, installieren Sie das Compose-Plugin anhand der <a href="https://docs.docker.com/compose/install/linux/">Docker-Anweisungen</a>.</p></li>
<li><p>Sollten beim Abrufen des Images Probleme auftreten, kontaktieren Sie uns bitte unter <a href="mailto:community@zilliz.com">community@zilliz.com</a> mit Details zum Problem, und wir werden Ihnen die erforderliche Unterstützung zukommen lassen.</p></li>
</ul>
</div>
<p>Nach dem Start von Milvus</p>
<ul>
<li>sind die Container mit den Namen <strong>„milvus-standalone“</strong>, <strong>„milvus-minio“</strong> und <strong>„milvus-etcd“</strong> aktiv.
<ul>
<li>Der Container <strong>„milvus-etcd“</strong> gibt keine Ports für den Host frei und ordnet seine Daten dem Verzeichnis <strong>„volumes/etcd“</strong> im aktuellen Ordner zu.</li>
<li>Der Container <strong>„milvus-minio“</strong> veröffentlicht die Ports <strong>9000</strong> und <strong>9001</strong> mit den Standard-Anmeldedaten und ordnet seine Daten dem Verzeichnis <strong>„volumes/minio“</strong> im aktuellen Ordner zu.</li>
<li>Der Container <strong>„milvus-standalone“</strong> veröffentlicht die Ports <strong>19530</strong> und <strong>9091</strong> mit den Standardeinstellungen und ordnet seine Daten dem Verzeichnis <strong>„volumes/milvus“</strong> im aktuellen Ordner zu.</li>
</ul></li>
</ul>
<p>Der Dienst „ <code translate="no">standalone</code> “ setzt „ <code translate="no">security_opt: seccomp:unconfined</code> “, sodass der Milvus-Container ohne das Standard-Docker-Seccomp-Profil läuft.</p>
<div class="alert warning">
<blockquote>
<p>Die Konfigurationsdatei veröffentlicht diese Ports ohne Host-Adresse. Docker veröffentlicht einen Port ohne Host-Adresse auf allen Host-Adressen, sodass andere Rechner, die diesen Host erreichen können, ebenfalls eine Verbindung zu Milvus und MinIO herstellen können. MinIO verwendet den Zugriffsschlüssel und den geheimen Schlüssel <code translate="no">minioadmin</code>, die in der Konfigurationsdatei festgelegt sind. Um den Zugriff auf diesen Host einzuschränken, fügen Sie „ <code translate="no">127.0.0.1:</code> “ zu den Einträgen „ <code translate="no">ports</code> “ der Dienste „ <code translate="no">minio</code> “ und „ <code translate="no">standalone</code> “ in „ <code translate="no">docker-compose.yaml</code> “ hinzu, zum Beispiel „ <code translate="no">&quot;127.0.0.1:19530:19530&quot;</code> “, und führen Sie „ <code translate="no">sudo docker compose up -d</code> “ erneut aus. Um andere MinIO-Anmeldedaten zu verwenden, ändern Sie „ <code translate="no">MINIO_ACCESS_KEY</code> “ und „ <code translate="no">MINIO_SECRET_KEY</code> “ des Dienstes „ <code translate="no">minio</code> “ und legen Sie dieselben Werte in „ <code translate="no">minio.accessKeyID</code> “ und „ <code translate="no">minio.secretAccessKey</code> “ der Milvus-Konfiguration fest. Informationen dazu, wie Sie für Milvus-Verbindungen Anmeldedaten erfordern, finden Sie unter <a href="/docs/de/authenticate.md">„Authentifizierung des Benutzerzugriffs</a>“.</p>
</blockquote>
</div>
<p>Mit dem folgenden Befehl können Sie überprüfen, ob die Container aktiv und laufen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>

NAME                IMAGE   COMMAND                  SERVICE      CREATED         STATUS                   PORTS
milvus-etcd         …       &quot;etcd -advertise-cli…&quot;   etcd         2 minutes ago   Up 2 minutes (healthy)   2379-2380/tcp
milvus-minio        …       &quot;/usr/bin/docker-ent…&quot;   minio        2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9000-9001-&gt;9000-9001/tcp
milvus-standalone   …       &quot;/tini -- milvus run…&quot;   standalone   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9091-&gt;9091/tcp, 0.0.0.0:19530-&gt;19530/tcp
<button class="copy-code-btn"></button></code></pre>
<p>In der Spalte „ <code translate="no">PORTS</code> “ werden außerdem alle veröffentlichten Ports mit der IPv6-Adresse <code translate="no">[::]</code> aufgelistet, zum Beispiel <code translate="no">[::]:19530-&gt;19530/tcp</code>, da Docker einen Port ohne Hostadresse sowohl unter <code translate="no">0.0.0.0</code> als auch unter <code translate="no">[::]</code> veröffentlicht.</p>
<p>Sie können auch über <code translate="no">http://127.0.0.1:9091/webui/</code> auf die Milvus-WebUI zugreifen, um mehr über Ihre Milvus-Instanz zu erfahren. Weitere Informationen finden Sie unter <a href="/docs/de/milvus-webui.md">Milvus-WebUI</a>.</p>
<p>Um den laufenden Server zu testen, folgen Sie im <a href="/docs/de/quickstart.md">Schnellstart</a> dem Pfad <strong>„Einen vorhandenen Milvus-Server verwenden“</strong> und stellen Sie eine Verbindung zu <code translate="no">http://localhost:19530</code> her. Verwenden Sie nicht den lokalen Verbindungsblock <code translate="no">.db</code>, da dieser eine separate Milvus-Lite-Datenbank startet.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Optional) Milvus-Konfigurationen aktualisieren<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Um die Milvus-Konfiguration an Ihre Anforderungen anzupassen, speichern Sie Ihre Einstellungen in einer Datei „ <code translate="no">user.yaml</code> “ auf dem Host und mounten Sie diese unter „ <code translate="no">/milvus/configs/user.yaml</code> “ im Container „ <code translate="no">milvus-standalone</code> “. Die Konfigurationsdatei mountet nur „ <code translate="no">/var/lib/milvus</code> “ in diesen Container, sodass eine Datei „ <code translate="no">user.yaml</code> “, die Sie innerhalb des Containers bearbeiten, verloren geht, wenn Compose den Container neu erstellt, beispielsweise nach einer Änderung an „ <code translate="no">docker-compose.yaml</code> “ oder am Milvus-Image.</p>
<ol>
<li><p>Erstellen Sie „ <code translate="no">user.yaml</code> “ in dem Ordner, der „ <code translate="no">docker-compose.yaml</code> “ enthält. Erstellen Sie die Datei, bevor Sie sie einbinden: Wenn der Quellpfad nicht existiert, erstellt Compose stattdessen ein Verzeichnis mit diesem Namen.
Im Folgenden wird davon ausgegangen, dass Sie die Standarddatei „ <code translate="no">proxy.healthCheckTimeout</code> “ überschreiben müssen. Informationen zu den entsprechenden Konfigurationselementen finden Sie unter <a href="/docs/de/system_configuration.md">„Systemkonfiguration</a>“.</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Fügen Sie in „ <code translate="no">docker-compose.yaml</code> “ die Datei zur Liste „ <code translate="no">volumes</code> “ des Dienstes „ <code translate="no">standalone</code> “ hinzu. Behalten Sie die anderen Einstellungen des Dienstes, wie z. B. „ <code translate="no">security_opt</code> “, „ <code translate="no">healthcheck</code> “ und „ <code translate="no">depends_on</code> “, unverändert bei.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Übernehmen Sie die Änderung. Da sich die Dienstkonfiguration geändert hat, erstellt Compose den Container „ <code translate="no">milvus-standalone</code> “ neu und behält die Daten in den eingebundenen Volumes bei.</p>
<pre><code translate="no" class="language-shell">sudo docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Nachdem die Datei eingebunden wurde, starten Sie den Dienst „ <code translate="no">standalone</code> “ neu, um spätere Änderungen an „ <code translate="no">user.yaml</code> “ zu übernehmen:</p>
<pre><code translate="no" class="language-shell">sudo docker compose restart standalone
<button class="copy-code-btn"></button></code></pre>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">Milvus anhalten und löschen<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können diesen Container wie folgt anhalten und löschen</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-an-existing-deployment" class="common-anchor-header">Ein bestehendes Deployment aktualisieren<button data-href="#Upgrade-an-existing-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Für eine eigenständige Milvus 2.6.x-Bereitstellung befolgen Sie die Anleitung <a href="/docs/de/upgrade_milvus_standalone-docker.md">„Upgrade Milvus Standalone with Docker Compose</a>“. Sichern Sie Metadaten und persistente Daten, bewahren Sie die bestehenden Abhängigkeiten und die Konfiguration bei und überprüfen Sie den dokumentierten Upgrade-Pfad von der Quelle zum Ziel, bevor Sie das Milvus-Image ändern. Ersetzen Sie die Compose-Datei einer älteren Bereitstellung nicht durch die oben genannte Konfiguration für eine Neuinstallation.</p>
<p><strong>Einschränkungen bei Nachrichtenwarteschlangen</strong>: Beim Upgrade auf Milvus v3.0.5 müssen Sie Ihre aktuelle Wahl der Nachrichtenwarteschlange beibehalten. Ein Wechsel zwischen verschiedenen Nachrichtenwarteschlangensystemen während des Upgrades wird nicht unterstützt. Die Unterstützung für den Wechsel von Nachrichtenwarteschlangensystemen wird in zukünftigen Versionen verfügbar sein.</p>
<p>Milvus 2.6.x und höher verwenden standardmäßig Woodpecker, während 2.5.x-Bereitstellungen standardmäßig <strong>RocksMQ</strong> verwenden. Wenn die Bereitstellung, die Sie aktualisieren, noch RocksMQ ausführt, legen Sie dies unter „ <code translate="no">user.yaml</code> “ fest, bevor Sie das Milvus-Image ändern, damit die aktualisierte Instanz ihre bestehende Nachrichtenwarteschlange beibehält, anstatt mit der neuen Standardeinstellung zu starten:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml — keep RocksMQ across the upgrade</span>
<span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem die aktualisierte Instanz unter Version 3.0.5 läuft, können Sie mit <a href="/docs/de/switch-mq-type.md">der Funktion „Switch Message Queue“</a>, die ab Milvus 3.0 verfügbar ist, von RocksMQ zu Woodpecker wechseln.</p>
<h2 id="Optional-dependencies" class="common-anchor-header">Optionale Abhängigkeiten<button data-href="#Optional-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>Diese Bereitstellung nutzt <strong>Woodpecker</strong> (eingebettet, MinIO-WAL-Backend) für die Nachrichtenübermittlung, <strong>etcd</strong> für Metadaten und <strong>MinIO</strong> für den Objektspeicher. Informationen zur Verwendung einer anderen Nachrichtenwarteschlange oder zur Anbindung eines externen Objektspeichers bzw. externer Metadaten finden Sie hier:</p>
<ul>
<li>Nachrichtenwarteschlange: <a href="/docs/de/woodpecker.md">Woodpecker</a> (Standard) · <a href="/docs/de/mq_pulsar.md">Pulsar</a> · <a href="/docs/de/mq_kafka.md">Kafka</a> · <a href="/docs/de/mq_rocksmq.md">RocksMQ</a></li>
<li>Objektspeicher: <a href="/docs/de/deploy_s3.md">MinIO</a> (Standard) · <a href="/docs/de/deploy_s3.md">AWS S3</a> · <a href="/docs/de/abs.md">Azure Blob</a> · <a href="/docs/de/gcs.md">GCP Cloud Storage</a> · <a href="/docs/de/deploy_s3.md">Aliyun OSS</a> · <a href="/docs/de/deploy_s3.md">Tencent COS</a> · <a href="/docs/de/deploy_s3.md">Huawei OBS</a> · <a href="/docs/de/deploy_s3.md">S3-kompatibel</a></li>
<li>Metadaten: <a href="/docs/de/deploy_etcd.md">etcd</a></li>
</ul>
<div class="alert note">
<p>Storage V3 ist standardmäßig deaktiviert. Aktivieren Sie es, bevor Sie Funktionen nutzen, die davon abhängen. Informationen zu Anforderungen und Kompatibilitätsaspekten finden Sie unter <a href="/docs/de/storage-v3.md">Storage V3</a>.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Schauen Sie sich <a href="/docs/de/quickstart.md">den Schnellstart</a> an, um zu sehen, was Milvus alles kann.</p></li>
<li><p>Lernen Sie die grundlegenden Funktionen von Milvus kennen:</p>
<ul>
<li><a href="/docs/de/manage_databases.md">Datenbanken verwalten</a></li>
<li><a href="/docs/de/manage-collections.md">Sammlungen verwalten</a></li>
<li><a href="/docs/de/manage-partitions.md">Partitionen verwalten</a></li>
<li><a href="/docs/de/insert-update-delete.md">Einfügen, Upsert und Löschen</a></li>
<li><a href="/docs/de/single-vector-search.md">Suche nach einzelnen Vektoren</a></li>
<li><a href="/docs/de/multi-vector-search.md">Hybride Suche</a></li>
</ul></li>
<li><p><a href="/docs/de/upgrade_milvus_standalone-docker.md">Milvus Standalone mit Docker Compose aktualisieren</a>.</p></li>
<li><p><a href="/docs/de/scaleout.md">Skalieren Sie einen Milvus-Cluster</a> auf Kubernetes. Dieses Verfahren nutzt Helm und gilt nicht für diese Docker-Bereitstellung.</p></li>
<li><p>Stellen Sie Ihren Milvus-Cluster in folgenden Clouds bereit:</p>
<ul>
<li><a href="/docs/de/eks.md">Amazon EKS</a></li>
<li><a href="/docs/de/gcp.md">Google Cloud</a></li>
<li><a href="/docs/de/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Entdecken Sie <a href="/docs/de/milvus-webui.md">Milvus WebUI</a>, eine intuitive Weboberfläche für die Überwachung und Verwaltung von Milvus.</p></li>
<li><p>Entdecken Sie <a href="/docs/de/milvus_backup_overview.md">Milvus Backup</a>, ein Open-Source-Tool für Milvus-Datensicherungen.</p></li>
<li><p>Entdecken Sie <a href="/docs/de/birdwatcher_overview.md">Birdwatcher</a>, ein Open-Source-Tool für die Fehlerbehebung in Milvus und dynamische Konfigurationsaktualisierungen.</p></li>
<li><p>Entdecken Sie <a href="https://github.com/zilliztech/attu">Attu</a>, ein Open-Source-GUI-Tool für die intuitive Verwaltung von Milvus.</p></li>
<li><p><a href="/docs/de/monitor.md">Überwachen Sie Milvus mit Prometheus</a>.</p></li>
</ul>
