---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Docker Compose
summary: >-
  Erfahren Sie, wie Sie Milvus als eigenständige Anwendung mit GPU-Unterstützung
  mithilfe von Docker Compose installieren.
title: Milvus mit GPU-Unterstützung über Docker Compose ausführen
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">Milvus mit GPU-Unterstützung über Docker Compose ausführen<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite wird erläutert, wie Sie eine Milvus-Instanz mit GPU-Unterstützung mithilfe von Docker Compose starten.</p>
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
<li><a href="/docs/de/prerequisite-gpu.md">Überprüfen Sie</a> vor der Installation<a href="/docs/de/prerequisite-gpu.md">die Hardware- und Softwareanforderungen</a>.</li>
</ul>
<div class="alert note">
<p>Sollten beim Abrufen des Images Probleme auftreten, kontaktieren Sie uns bitte unter <a href="mailto:community@zilliz.com">community@zilliz.com</a> mit detaillierten Angaben zum Problem, damit wir Ihnen die erforderliche Unterstützung leisten können.</p>
</div>
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
    </button></h2><p>Befolgen Sie diese Schritte, um Milvus mit GPU-Unterstützung mithilfe von Docker Compose zu installieren.</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. Laden Sie die YAML-Datei herunter und konfigurieren Sie sie<button data-href="#1-Download-and-configure-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Laden Sie <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml"><code translate="no">milvus-standalone-docker-compose-gpu.yaml</code></a> und speichern Sie sie manuell oder mit dem folgenden Befehl als „docker-compose.yml“.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um den Download zu überprüfen, vergleichen Sie die Ausgabe des folgenden Befehls mit dem „ <code translate="no">sha256</code> “-Digest, der auf der <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">Release-Seite</a> unter <code translate="no">milvus-standalone-docker-compose-gpu.yaml</code> aufgeführt ist:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sha256sum</span> docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sie können die Milvus zugewiesenen GPU-Geräte im Abschnitt „ <code translate="no">deploy</code> “ des Dienstes „ <code translate="no">standalone</code> “ in der YAML-Datei wie folgt ändern:</p>
<ul>
<li>Um Milvus ein bestimmtes GPU-Gerät zuzuweisen, suchen Sie das Feld „ <code translate="no">deploy.resources.reservations.devices[0].device_ids</code> “ in der Definition des Dienstes „ <code translate="no">standalone</code> “ und ersetzen Sie dessen Wert durch die ID der gewünschten GPU. Mit dem Tool „ <code translate="no">nvidia-smi</code> “, das im Lieferumfang der NVIDIA-GPU-Grafiktreiber enthalten ist, können Sie die ID eines GPU-Geräts ermitteln. Milvus unterstützt mehrere GPU-Geräte.</li>
</ul>
<p>Ein einzelnes GPU-Gerät Milvus zuweisen:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&quot;0&quot;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Weisen Sie Milvus mehrere GPU-Geräte zu:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Milvus starten<button data-href="#2-Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Starten Sie Milvus in dem Verzeichnis, in dem sich die Datei `docker-compose.yml` befindet, mit folgendem Befehl:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Falls die Ausführung des obigen Befehls fehlgeschlagen ist, überprüfen Sie, ob auf Ihrem System Docker Compose V1 installiert ist. Ist dies der Fall, wird aufgrund der Hinweise auf <a href="https://docs.docker.com/compose/">dieser Seite</a> empfohlen, auf Docker Compose V2 umzusteigen.</p>
</div>
<p>Nach dem Start von Milvus</p>
<ul>
<li>sind die Container mit den Namen <strong>„milvus-standalone“</strong>, <strong>„milvus-minio“</strong> und <strong>„milvus-etcd“</strong> aktiv.
<ul>
<li>Der Container <strong>„milvus-etcd“</strong> stellt keine Ports für den Host bereit und ordnet seine Daten dem Verzeichnis <strong>„volumes/etcd“</strong> im aktuellen Ordner zu.</li>
<li>Der Container <strong>„milvus-minio“</strong> bedient die Ports <strong>9000</strong> und <strong>9001</strong> mit den Standard-Anmeldedaten und ordnet seine Daten dem Verzeichnis <strong>„volumes/minio“</strong> im aktuellen Ordner zu.</li>
<li>Der Container <strong>„milvus-standalone“</strong> bedient die Ports <strong>19530</strong> und <strong>9091</strong> mit den Standardeinstellungen und ordnet seine Daten dem Verzeichnis <strong>„volumes/milvus“</strong> im aktuellen Ordner zu.</li>
</ul></li>
</ul>
<p>Der Dienst „ <code translate="no">standalone</code> “ setzt „ <code translate="no">security_opt: seccomp:unconfined</code> “, sodass der Milvus-Container ohne das Standard-Docker-Seccomp-Profil läuft.</p>
<div class="alert warning">
<blockquote>
<p>Die Compose-Datei veröffentlicht diese Ports ohne Host-IP, sodass Docker sie an alle Netzwerkschnittstellen des Hosts bindet und andere Rechner, die diesen Host erreichen können, eine Verbindung zu Milvus und MinIO herstellen können. MinIO verwendet den Zugriffsschlüssel und den geheimen Schlüssel „ <code translate="no">minioadmin</code> “, die in der Compose-Datei festgelegt sind. Um die Ports nur auf der Loopback-Adresse zu veröffentlichen, fügen Sie „ <code translate="no">127.0.0.1:</code> “ zu den Einträgen „ <code translate="no">ports</code> “ der Dienste „ <code translate="no">minio</code> “ und „ <code translate="no">standalone</code> “ in „ <code translate="no">docker-compose.yml</code> “ hinzu, zum Beispiel „ <code translate="no">&quot;127.0.0.1:19530:19530&quot;</code> “, und führen Sie „ <code translate="no">sudo docker compose up -d</code> “ erneut aus. Weitere Informationen finden Sie unter <a href="https://docs.docker.com/engine/network/port-publishing/">„Portveröffentlichung und -zuordnung</a>“. Um andere MinIO-Anmeldedaten zu verwenden, ändern Sie die Einträge unter <code translate="no">MINIO_ACCESS_KEY</code> und <code translate="no">MINIO_SECRET_KEY</code> des Dienstes „ <code translate="no">minio</code> “ und legen Sie dieselben Werte unter <code translate="no">minio.accessKeyID</code> und <code translate="no">minio.secretAccessKey</code> in der Milvus-Konfiguration fest. Informationen dazu, wie Sie für Client-Verbindungen zu Milvus einen Benutzernamen und ein Passwort erfordern können, finden Sie unter <a href="/docs/de/authenticate.md">„Benutzerzugriff authentifizieren</a>“.</p>
</blockquote>
</div>
<p>Mit dem folgenden Befehl können Sie überprüfen, ob die Container aktiv und laufen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>
<button class="copy-code-btn"></button></code></pre>
<p>Standardmäßig listet der Befehl nur laufende Container auf. Vergewissern Sie sich, dass in der Ausgabe die Container <strong>„milvus-etcd“</strong>, <strong>„milvus-minio“</strong> und <strong>„milvus-standalone“</strong> aufgeführt sind und dass die Spalte „ <code translate="no">STATUS</code> “ bei jedem dieser Container mit „ <code translate="no">Up</code> “ beginnt.</p>
<p>Sie können auch über <code translate="no">http://127.0.0.1:9091/webui/</code> auf die Milvus-WebUI zugreifen, um mehr über Ihre Milvus-Instanz zu erfahren. Weitere Informationen finden Sie unter <a href="/docs/de/milvus-webui.md">„Milvus-WebUI</a>“.</p>
<p>Um die von Milvus verwendeten GPU-Geräte nach dem Start zu ändern, bearbeiten Sie das Feld „ <code translate="no">device_ids</code> “ unter „ <code translate="no">deploy.resources.reservations.devices</code> “ des Dienstes „ <code translate="no">standalone</code> “ in der Datei „docker-compose.yml“, wie in Schritt 1 gezeigt, und führen Sie anschließend den folgenden Befehl aus. Da sich die Dienstkonfiguration geändert hat, wird „ <code translate="no">docker compose up</code> “ angehalten und der Container <strong>„milvus-standalone“</strong> neu erstellt. Weitere Informationen finden Sie unter <a href="https://docs.docker.com/compose/how-tos/gpu-support/">„Docker-Compose-Dienste mit GPU-Zugriff ausführen</a>“.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sie können diesen Container wie folgt anhalten und löschen.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">Speicherpool konfigurieren<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Milvus gestartet ist, können Sie den Speicherpool anpassen, indem Sie die Einstellungen „ <code translate="no">initMemSize</code> “ und „ <code translate="no">maxMemSize</code> “ im Abschnitt „ <code translate="no">gpu</code> “ der Milvus-Konfiguration ändern.</p>
<div class="alert note">
<p>Die Datei „ <code translate="no">milvus.yaml</code> “ befindet sich im Verzeichnis „ <code translate="no">/milvus/configs/</code> “ innerhalb des Milvus-Containers. Einstellungen in einer „ <code translate="no">user.yaml</code> “-Datei im selben Verzeichnis überschreiben die Werte in „ <code translate="no">milvus.yaml</code> “.</p>
</div>
<p>Um Ihre Einstellungen beim Neuanlegen des Containers beizubehalten, speichern Sie diese in einer „ <code translate="no">user.yaml</code> “-Datei auf dem Host und mounten Sie die Datei wie folgt in den Container ein.</p>
<ol>
<li><p>Erstellen Sie in dem Verzeichnis, in dem sich die Datei „docker-compose.yml“ befindet, eine Datei namens „ <code translate="no">user.yaml</code> “ mit den Einstellungen, die Sie ändern möchten. Das folgende Beispiel zeigt den Abschnitt „ <code translate="no">gpu</code> “ mit seinen Standardwerten. Ersetzen Sie diese durch die von Ihnen benötigten Größen:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: Anfangsgröße des Speicherpools in MB. Der Standardwert beträgt 2048.</li>
<li><code translate="no">maxMemSize</code>: Maximale Größe des Speicherpools in MB. Der Standardwert beträgt 4096.</li>
</ul></li>
<li><p>Fügen Sie in der Datei „docker-compose.yml“ die Datei „ <code translate="no">user.yaml</code> “ zur Liste „ <code translate="no">volumes</code> “ des Dienstes „ <code translate="no">standalone</code> “ hinzu:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Erstellen Sie den Milvus-Container neu, um die Änderungen zu übernehmen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Nachdem die Datei eingebunden wurde, starten Sie den Dienst „ <code translate="no">standalone</code> “ neu, um spätere Änderungen an „ <code translate="no">user.yaml</code> “ zu übernehmen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose restart standalone</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Storage V3 ist standardmäßig deaktiviert. Aktivieren Sie es, bevor Sie Funktionen nutzen, die davon abhängen. Informationen zu Anforderungen und Kompatibilitätsaspekten finden Sie unter <a href="/docs/de/storage-v3.md">„Storage V3</a>“.</p>
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
<li><p>Lesen Sie <a href="/docs/de/quickstart.md">den Schnellstart</a>, um zu erfahren, was Milvus leisten kann.</p></li>
<li><p>Schauen Sie sich <a href="/docs/de/milvus-webui.md">die Milvus-WebUI</a> an, um mehr über die Milvus-Instanz zu erfahren.</p></li>
<li><p>Lernen Sie die grundlegenden Funktionen von Milvus kennen:</p>
<ul>
<li><a href="/docs/de/manage_databases.md">Datenbanken verwalten</a></li>
<li><a href="/docs/de/manage-collections.md">Verwalten von Sammlungen</a></li>
<li><a href="/docs/de/manage-partitions.md">Partitionen verwalten</a></li>
<li><a href="/docs/de/insert-update-delete.md">Einfügen, Upsert und Löschen</a></li>
<li><a href="/docs/de/single-vector-search.md">Suche nach einzelnen Vektoren</a></li>
<li><a href="/docs/de/multi-vector-search.md">Hybride Suche</a></li>
</ul></li>
<li><p><a href="/docs/de/upgrade_milvus_standalone-docker.md">Aktualisieren Sie Milvus Standalone mit Docker Compose</a>. Auf dieser Seite wird das CPU-Image-Tag angezeigt. Behalten Sie für diese GPU-Bereitstellung das Suffix „ <code translate="no">-gpu</code> “ (<code translate="no">milvusdb/milvus:v3.0.5-gpu</code>) bei und behalten Sie Ihre Einstellungen für „ <code translate="no">deploy</code> “ und „ <code translate="no">user.yaml</code> “ bei.</p></li>
<li><p><a href="/docs/de/scaleout.md">Skalieren Sie einen Milvus-Cluster</a> auf Kubernetes. Diese Vorgehensweise nutzt Helm und gilt nicht für diese Docker-Bereitstellung.</p></li>
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
