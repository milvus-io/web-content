---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Kubernetes
summary: 'Erfahren Sie, wie Sie Milvus-Cluster auf Kubernetes installieren.'
title: Milvus mit GPU-Unterstützung mit Docker Compose starten
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">Milvus mit GPU-Unterstützung mit Docker Compose starten<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Diese Seite veranschaulicht, wie man eine Milvus-Instanz mit GPU-Unterstützung mit Docker Compose startet.</p>
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
<li><a href="/docs/de/v2.4.x/prerequisite-gpu.md">Prüfen Sie</a> vor der Installation<a href="/docs/de/v2.4.x/prerequisite-gpu.md">die Anforderungen an Hardware und Software</a>.</li>
</ul>
<div class="alert note">
<p>Wenn Sie beim Ziehen des Images auf Probleme stoßen, kontaktieren Sie uns unter <a href="mailto:community@zilliz.com">community@zilliz.com</a> und beschreiben Sie das Problem, damit wir Ihnen den nötigen Support bieten können.</p>
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
    </button></h2><p>Um Milvus mit GPU-Unterstützung mit Docker Compose zu installieren, führen Sie die folgenden Schritte aus.</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. Herunterladen und Konfigurieren der YAML-Datei</h3><p>Laden Sie  herunter <a href="https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose-gpu.yml"><code translate="no">milvus-standalone-docker-compose-gpu.yml</code></a> und speichern Sie sie als docker-compose.yml manuell oder mit dem folgenden Befehl.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml
<button class="copy-code-btn"></button></code></pre>
<p>Sie müssen einige Änderungen an den Umgebungsvariablen des eigenständigen Dienstes in der YAML-Datei wie folgt vornehmen:</p>
<ul>
<li>Um Milvus ein bestimmtes GPU-Gerät zuzuweisen, suchen Sie das Feld <code translate="no">deploy.resources.reservations.devices[0].devices_ids</code> in der Definition des <code translate="no">standalone</code> -Dienstes und ersetzen Sie seinen Wert durch die ID der gewünschten GPU. Sie können das Tool <code translate="no">nvidia-smi</code> verwenden, das in den NVIDIA-GPU-Anzeigetreibern enthalten ist, um die ID eines GPU-Geräts zu ermitteln. Milvus unterstützt mehrere GPU-Geräte.</li>
</ul>
<p>Weisen Sie Milvus ein einzelnes GPU-Gerät zu:</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&quot;0&quot;</span>]
...
<button class="copy-code-btn"></button></code></pre>
<p>Weisen Sie Milvus mehrere GPU-Geräte zu:</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
...
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Starten Sie Milvus</h3><p>Starten Sie Milvus in dem Verzeichnis, in dem sich die Datei docker-compose.yml befindet, indem Sie den Befehl ausführen:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Wenn Sie den obigen Befehl nicht ausführen konnten, überprüfen Sie, ob auf Ihrem System Docker Compose V1 installiert ist. Wenn dies der Fall ist, sollten Sie aufgrund der Hinweise auf <a href="https://docs.docker.com/compose/">dieser Seite</a> auf Docker Compose V2 migrieren.</p>
</div>
<p>Nach dem Starten von Milvus,</p>
<ul>
<li>Container mit den Namen <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> und <strong>milvus-etcd</strong> sind vorhanden.<ul>
<li>Der <strong>milvus-etcd-Container</strong> stellt dem Host keine Ports zur Verfügung und mappt seine Daten auf <strong>volumes/etcd</strong> im aktuellen Ordner.</li>
<li>Der <strong>milvus-minio-Container</strong> bedient die Ports <strong>9090</strong> und <strong>9091</strong> lokal mit den Standard-Authentifizierungsdaten und ordnet seine Daten den <strong>Volumes/minio</strong> im aktuellen Ordner zu.</li>
<li>Der <strong>milvus-standalone-Container</strong> bedient lokal die Ports <strong>19530</strong> mit den Standardeinstellungen und ordnet seine Daten den <strong>Volumes/milvus</strong> im aktuellen Ordner zu.</li>
</ul></li>
</ul>
<p>Mit dem folgenden Befehl können Sie überprüfen, ob die Container aktiv sind:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie Milvus in der Datei docker-compose.yml mehrere GPU-Geräte zugewiesen haben, können Sie angeben, welches GPU-Gerät sichtbar oder zur Verwendung verfügbar ist.</p>
<p>Machen Sie das GPU-Gerät <code translate="no">0</code> für Milvus sichtbar:</p>
<pre><code translate="no" class="language-shell">$ CUDA_VISIBLE_DEVICES=0 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<p>Machen Sie die GPU-Geräte <code translate="no">0</code> und <code translate="no">1</code> für Milvus sichtbar:</p>
<pre><code translate="no" class="language-shell">$ CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<p>Sie können diesen Container wie folgt stoppen und löschen.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
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
    </button></h2><p>Nachdem Milvus eingerichtet ist und läuft, können Sie den Speicherpool anpassen, indem Sie die Einstellungen <code translate="no">initMemSize</code> und <code translate="no">maxMemSize</code> in der Datei <code translate="no">milvus.yaml</code> ändern.</p>
<div class="alert note">
<p>Die Datei <code translate="no">milvus.yaml</code> befindet sich im Verzeichnis <code translate="no">/milvus/configs/</code> innerhalb des Milvus-Containers.</p>
</div>
<p>Um den Speicherpool zu konfigurieren, ändern Sie die Einstellungen <code translate="no">initMemSize</code> und <code translate="no">maxMemSize</code> in der Datei <code translate="no">milvus.yaml</code> wie folgt.</p>
<ol>
<li><p>Verwenden Sie den folgenden Befehl, um <code translate="no">milvus.yaml</code> aus dem Milvus-Container auf Ihren lokalen Rechner zu kopieren. Ersetzen Sie <code translate="no">&lt;milvus_container_id&gt;</code> durch Ihre aktuelle Milvus-Container-ID.</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Öffnen Sie die kopierte Datei <code translate="no">milvus.yaml</code> mit Ihrem bevorzugten Texteditor. Zum Beispiel mit vim:</p>
<pre><code translate="no" class="language-shell">vim milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Bearbeiten Sie die Einstellungen <code translate="no">initMemSize</code> und <code translate="no">maxMemSize</code> nach Bedarf und speichern Sie Ihre Änderungen:</p>
<pre><code translate="no" class="language-yaml">...
gpu:
  initMemSize: 0
  maxMemSize: 0
...
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: Anfangsgröße des Speicherpools. Die Voreinstellung ist 1024.</li>
<li><code translate="no">maxMemSize</code>: Maximale Größe des Speicherpools. Die Voreinstellung ist 2048.</li>
</ul></li>
<li><p>Verwenden Sie den folgenden Befehl, um die geänderte Datei <code translate="no">milvus.yaml</code> zurück in den Milvus-Container zu kopieren. Ersetzen Sie <code translate="no">&lt;milvus_container_id&gt;</code> durch Ihre aktuelle Milvus-Container-ID.</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> milvus.yaml &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Starten Sie den Milvus-Container neu, um die Änderungen zu übernehmen:</p>
<pre><code translate="no" class="language-shell">docker stop &lt;milvus_container_id&gt;
docker start &lt;milvus_container_id&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">Wie geht es weiter?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Prüfen Sie den <a href="/docs/de/v2.4.x/quickstart.md">Schnellstart</a>, um zu sehen, was Milvus kann.</p></li>
<li><p>Lernen Sie die grundlegenden Funktionen von Milvus kennen:</p>
<ul>
<li><a href="/docs/de/v2.4.x/manage_databases.md">Verwalten von Datenbanken</a></li>
<li><a href="/docs/de/v2.4.x/manage-collections.md">Sammlungen verwalten</a></li>
<li><a href="/docs/de/v2.4.x/manage-partitions.md">Partitionen verwalten</a></li>
<li><a href="/docs/de/v2.4.x/insert-update-delete.md">Einfügen, Upsert &amp; Löschen</a></li>
<li><a href="/docs/de/v2.4.x/single-vector-search.md">Ein-Vektor-Suche</a></li>
<li><a href="/docs/de/v2.4.x/multi-vector-search.md">Hybride Suche</a></li>
</ul></li>
<li><p><a href="/docs/de/v2.4.x/upgrade_milvus_cluster-helm.md">Upgrade von Milvus mit Helm Chart</a>.</p></li>
<li><p><a href="/docs/de/v2.4.x/scaleout.md">Skalieren Sie Ihren Milvus-Cluster</a>.</p></li>
<li><p>Verteilen Sie Ihren Milvus-Cluster auf Clouds:</p>
<ul>
<li><a href="/docs/de/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/de/v2.4.x/gcp.md">Google Wolke</a></li>
<li><a href="/docs/de/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Erkunden Sie <a href="/docs/de/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>, ein Open-Source-Tool für Milvus-Datensicherungen.</p></li>
<li><p><a href="/docs/de/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, ein Open-Source-Tool zur Fehlersuche in Milvus und für dynamische Konfigurations-Updates.</p></li>
<li><p>Entdecken Sie <a href="https://milvus.io/docs/attu.md">Attu</a>, ein Open-Source-GUI-Tool für die intuitive Milvus-Verwaltung.</p></li>
<li><p><a href="/docs/de/v2.4.x/monitor.md">Überwachen Sie Milvus mit Prometheus</a>.</p></li>
</ul>
