---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Kubernetes
summary: 'Erfahren Sie, wie Sie einen Milvus-Cluster auf Kubernetes installieren.'
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
<li><a href="/docs/de/v2.6.x/prerequisite-gpu.md">Überprüfen Sie</a> vor der Installation<a href="/docs/de/v2.6.x/prerequisite-gpu.md">die Hardware- und Softwareanforderungen</a>.</li>
</ul>
<div class="alert note">
<p>Sollten beim Abrufen des Images Probleme auftreten, kontaktieren Sie uns bitte unter <a href="mailto:community@zilliz.com">community@zilliz.com</a> mit Details zum Problem, und wir werden Ihnen die erforderliche Unterstützung zukommen lassen.</p>
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
    </button></h2><p>Um Milvus mit GPU-Unterstützung mithilfe von Docker Compose zu installieren, führen Sie die folgenden Schritte aus.</p>
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
    </button></h3><p>Laden Sie <a href="https://github.com/milvus-io/milvus/releases/download/v2.6.19/milvus-standalone-docker-compose-gpu.yml"><code translate="no">milvus-standalone-docker-compose-gpu.yml</code></a> und speichern Sie sie manuell oder mit dem folgenden Befehl als „docker-compose.yml“.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.19/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sie müssen einige Änderungen an den Umgebungsvariablen des eigenständigen Dienstes in der YAML-Datei wie folgt vornehmen:</p>
<ul>
<li>Um Milvus ein bestimmtes GPU-Gerät zuzuweisen, suchen Sie das Feld „ <code translate="no">deploy.resources.reservations.devices[0].devices_ids</code> “ in der Definition des Dienstes „ <code translate="no">standalone</code> “ und ersetzen Sie dessen Wert durch die ID der gewünschten GPU. Sie können das Tool „ <code translate="no">nvidia-smi</code> “, das im Lieferumfang der NVIDIA-GPU-Grafiktreiber enthalten ist, verwenden, um die ID eines GPU-Geräts zu ermitteln. Milvus unterstützt mehrere GPU-Geräte.</li>
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

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Falls die Ausführung des obigen Befehls fehlgeschlagen ist, überprüfen Sie, ob auf Ihrem System Docker Compose V1 installiert ist. Ist dies der Fall, wird aufgrund der Hinweise auf <a href="https://docs.docker.com/compose/">dieser Seite</a> empfohlen, auf Docker Compose V2 umzusteigen.</p>
</div>
<p>Nach dem Start von Milvus</p>
<ul>
<li>sind die Container mit den Namen <strong>„milvus-standalone“</strong>, <strong>„milvus-minio“</strong> und <strong>„milvus-etcd“</strong> aktiv.
<ul>
<li>Der Container <strong>„milvus-etcd“</strong> stellt keine Ports für den Host bereit und ordnet seine Daten dem Verzeichnis <strong>„volumes/etcd“</strong> im aktuellen Ordner zu.</li>
<li>Der Container <strong>„milvus-minio“</strong> stellt lokal die Ports <strong>9090</strong> und <strong>9091</strong> mit den Standard-Anmeldedaten bereit und ordnet seine Daten dem Verzeichnis <strong>„volumes/minio“</strong> im aktuellen Ordner zu.</li>
<li>Der Container <strong>„milvus-standalone“</strong> stellt lokal die Ports <strong>19530</strong> mit den Standardeinstellungen bereit und speichert seine Daten unter <strong>„volumes/milvus“</strong> im aktuellen Verzeichnis.</li>
</ul></li>
</ul>
<p>Mit dem folgenden Befehl können Sie überprüfen, ob die Container aktiv und läuft sind:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Sie können auch über <code translate="no">http://127.0.0.1:9091/webui/</code> auf die Milvus-WebUI zugreifen, um mehr über Ihre Milvus-Instanz zu erfahren. Weitere Informationen finden Sie unter <a href="/docs/de/v2.6.x/milvus-webui.md">Milvus-WebUI</a>.</p>
<p>Wenn Sie Milvus in der Datei „docker-compose.yml“ mehrere GPU-Geräte zugewiesen haben, können Sie festlegen, welches GPU-Gerät sichtbar oder zur Nutzung verfügbar ist.</p>
<p>Machen Sie das GPU-Gerät „ <code translate="no">0</code> “ für Milvus sichtbar:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">CUDA_VISIBLE_DEVICES=0 ./milvus run standalone</span>
<button class="copy-code-btn"></button></code></pre>
<p>Machen Sie die GPU-Geräte „ <code translate="no">0</code> “ und „ <code translate="no">1</code> “ für Milvus sichtbar:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone</span>
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
    </button></h2><p>Nachdem Milvus gestartet ist, können Sie den Speicherpool anpassen, indem Sie die Einstellungen für „ <code translate="no">initMemSize</code> “ und „ <code translate="no">maxMemSize</code> “ in der Datei „ <code translate="no">milvus.yaml</code> “ ändern.</p>
<div class="alert note">
<p>Die Datei „ <code translate="no">milvus.yaml</code> “ befindet sich im Verzeichnis „ <code translate="no">/milvus/configs/</code> “ innerhalb des Milvus-Containers.</p>
</div>
<p>Um den Speicherpool zu konfigurieren, ändern Sie die Einstellungen „ <code translate="no">initMemSize</code> “ und „ <code translate="no">maxMemSize</code> “ in der Datei „ <code translate="no">milvus.yaml</code> “ wie folgt.</p>
<ol>
<li><p>Verwenden Sie den folgenden Befehl, um die Datei „ <code translate="no">milvus.yaml</code> “ aus dem Milvus-Container auf Ihren lokalen Rechner zu kopieren. Ersetzen Sie „ <code translate="no">&lt;milvus_container_id&gt;</code> “ durch die tatsächliche ID Ihres Milvus-Containers.</p>
<pre><code translate="no" class="language-shell">docker cp &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Öffnen Sie die kopierte Datei „ <code translate="no">milvus.yaml</code> “ mit Ihrem bevorzugten Texteditor. Beispielsweise mit vim:</p>
<pre><code translate="no" class="language-shell">vim milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Bearbeiten Sie die Einstellungen „ <code translate="no">initMemSize</code> “ und „ <code translate="no">maxMemSize</code> “ nach Bedarf und speichern Sie Ihre Änderungen:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: Anfangsgröße des Speicherpools. Der Standardwert ist 1024.</li>
<li><code translate="no">maxMemSize</code>: Maximale Größe des Speicherpools. Standardwert ist 2048.</li>
</ul></li>
<li><p>Verwenden Sie den folgenden Befehl, um die geänderte Datei „ <code translate="no">milvus.yaml</code> “ zurück in den Milvus-Container zu kopieren. Ersetzen Sie „ <code translate="no">&lt;milvus_container_id&gt;</code> “ durch die tatsächliche ID Ihres Milvus-Containers.</p>
<pre><code translate="no" class="language-shell">docker cp milvus.yaml &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Starten Sie den Milvus-Container neu, um die Änderungen zu übernehmen:</p>
<pre><code translate="no" class="language-shell">docker stop &lt;milvus_container_id&gt;
docker start &lt;milvus_container_id&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
<li><p><a href="/docs/de/v2.6.x/quickstart.md">Im Schnellstart</a> nachsehen, was Milvus alles kann.</p></li>
<li><p>Schauen Sie sich <a href="/docs/de/v2.6.x/milvus-webui.md">die Milvus-WebUI</a> an, um mehr über die Milvus-Instanz zu erfahren.</p></li>
<li><p>Lernen Sie die grundlegenden Funktionen von Milvus kennen:</p>
<ul>
<li><a href="/docs/de/v2.6.x/manage_databases.md">Datenbanken verwalten</a></li>
<li><a href="/docs/de/v2.6.x/manage-collections.md">Verwalten von Sammlungen</a></li>
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
