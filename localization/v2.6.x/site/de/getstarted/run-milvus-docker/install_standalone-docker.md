---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: 'Erfahren Sie, wie Sie Milvus als Standalone-Version mit Docker installieren.'
title: Milvus in Docker ausführen (Linux)
---
<h1 id="Run-Milvus-in-Docker-Linux" class="common-anchor-header">Milvus in Docker ausführen (Linux)<button data-href="#Run-Milvus-in-Docker-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite wird erläutert, wie man eine Milvus-Instanz in Docker startet.</p>
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
<li><a href="/docs/de/v2.6.x/prerequisite-docker.md">Überprüfen Sie</a> vor der Installation<a href="/docs/de/v2.6.x/prerequisite-docker.md">die Hardware- und Softwareanforderungen</a>.</li>
</ul>
<h2 id="Install-Milvus-in-Docker" class="common-anchor-header">Milvus in Docker installieren<button data-href="#Install-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus stellt ein Installationsskript bereit, mit dem es als Docker-Container installiert werden kann. Das Skript ist im <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">Milvus-Repository</a> verfügbar. Um Milvus in Docker zu installieren, führen Sie einfach folgenden Befehl aus</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Neuerungen in Version 2.6.17:</strong></p>
<ul>
<li><strong>Streaming-Knoten</strong>: Erweiterte Datenverarbeitungsfunktionen</li>
<li><strong>Woodpecker MQ</strong>: Verbesserte Nachrichtenwarteschlange mit reduziertem Wartungsaufwand; weitere Informationen finden Sie unter <a href="/docs/de/v2.6.x/use-woodpecker.md">„Woodpecker verwenden“</a> </li>
<li><strong>Optimierte Architektur</strong>: Konsolidierte Komponenten für bessere Leistung</li>
</ul>
<p>Laden Sie immer das neueste Skript herunter, um sicherzustellen, dass Sie die aktuellsten Konfigurationen und Architekturverbesserungen erhalten.</p>
<p>Wenn Sie <a href="https://milvus.io/docs/milvus_backup_overview.md">„Backup“</a> im Standalone-Betriebsmodus nutzen möchten, wird die Bereitstellung mit <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Docker Compose</a> empfohlen.</p>
<p>Sollten beim Abrufen des Images Probleme auftreten, kontaktieren Sie uns bitte unter <a href="mailto:community@zilliz.com">community@zilliz.com</a> mit Details zum Problem, und wir werden Ihnen die erforderliche Unterstützung zukommen lassen.</p>
</div>
<p>Nach Ausführung des Installationsskripts:</p>
<ul>
<li>Ein Docker-Container namens „milvus“ wurde am Port <strong>19530</strong> gestartet.</li>
<li>Zusammen mit Milvus ist im selben Container ein „embed etcd“ installiert, das auf Port <strong>2379</strong> läuft. Seine Konfigurationsdatei ist auf <strong>„embedEtcd.yaml“</strong> im aktuellen Ordner verweist.</li>
<li>Um die Standardkonfiguration von Milvus zu ändern, fügen Sie Ihre Einstellungen zur Datei <strong>„user.yaml“</strong> im aktuellen Ordner hinzu und starten Sie den Dienst anschließend neu.</li>
<li>Das Milvus-Datenvolume ist dem Verzeichnis <strong>„volumes/milvus“</strong> im aktuellen Ordner zugeordnet.</li>
</ul>
<p>Sie können über <code translate="no">http://127.0.0.1:9091/webui/</code> auf die Milvus-WebUI zugreifen, um mehr über Ihre Milvus-Instanz zu erfahren. Weitere Informationen finden Sie unter <a href="/docs/de/v2.6.x/milvus-webui.md">Milvus-WebUI</a>.</p>
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
    </button></h2><p>Sie können die Milvus-Konfigurationen in der Datei <strong>„user.yaml“</strong> im aktuellen Ordner ändern. Um beispielsweise die URL von <code translate="no">proxy.healthCheckTimeout</code> in <code translate="no">1000</code> ms zu ändern, können Sie die Datei wie folgt anpassen:</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Starten Sie anschließend den Dienst wie folgt neu:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>Informationen zu den entsprechenden Konfigurationselementen finden Sie unter <a href="/docs/de/v2.6.x/system_configuration.md">„Systemkonfiguration</a>“.</p>
<h2 id="Upgrade-Milvus" class="common-anchor-header">Milvus aktualisieren<button data-href="#Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können mithilfe des integrierten Upgrade-Befehls auf die neueste Version von Milvus aktualisieren. Dadurch werden automatisch die neueste Konfiguration und das Milvus-Image heruntergeladen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Upgrade Milvus to the latest version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh upgrade</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Der Upgrade-Befehl führt automatisch folgende Schritte aus:</p>
<ul>
<li>Lädt das neueste Installationsskript mit aktualisierten Konfigurationen herunter</li>
<li>Lädt das neueste Milvus-Docker-Image herunter</li>
<li>den Container mit der neuen Version neu startet</li>
<li>Ihre vorhandenen Daten und Konfigurationen bleiben erhalten</li>
</ul>
<p>Dies ist die empfohlene Vorgehensweise für das Upgrade Ihrer eigenständigen Milvus-Bereitstellung.</p>
</div>
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
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
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
<li><p>Schauen Sie sich <a href="/docs/de/v2.6.x/quickstart.md">den Schnellstart</a> an, um zu erfahren, was Milvus alles kann.</p></li>
<li><p>Lernen Sie die grundlegenden Funktionen von Milvus kennen:</p>
<ul>
<li><a href="/docs/de/v2.6.x/manage_databases.md">Datenbanken verwalten</a></li>
<li><a href="/docs/de/v2.6.x/manage-collections.md">Sammlungen verwalten</a></li>
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
<li><p>Entdecken Sie <a href="/docs/de/v2.6.x/birdwatcher_overview.md">Birdwatcher</a>, ein Open-Source-Tool zur Fehlerbehebung bei Milvus und für dynamische Konfigurationsaktualisierungen.</p></li>
<li><p>Entdecken Sie <a href="https://github.com/zilliztech/attu">Attu</a>, ein Open-Source-GUI-Tool für die intuitive Verwaltung von Milvus.</p></li>
<li><p><a href="/docs/de/v2.6.x/monitor.md">Überwachen Sie Milvus mit Prometheus</a>.</p></li>
</ul>
