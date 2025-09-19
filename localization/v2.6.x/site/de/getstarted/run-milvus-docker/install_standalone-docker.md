---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: 'Erfahren Sie, wie Sie Milvus eigenständig mit Docker installieren können.'
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
    </button></h1><p>Diese Seite zeigt, wie man eine Milvus-Instanz in Docker startet.</p>
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
<li><a href="/docs/de/prerequisite-docker.md">Prüfen Sie</a> vor der Installation<a href="/docs/de/prerequisite-docker.md">die Anforderungen an Hardware und Software</a>.</li>
</ul>
<h2 id="Install-Milvus-in-Docker" class="common-anchor-header">Installieren von Milvus in Docker<button data-href="#Install-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus bietet ein Installationsskript, um es als Docker-Container zu installieren. Das Skript ist im <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">Milvus-Repository</a> verfügbar. Um Milvus in Docker zu installieren, führen Sie einfach</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Was ist neu in v2.6.2:</strong></p>
<ul>
<li><strong>Streaming Node</strong>: Verbesserte Datenverarbeitungsmöglichkeiten</li>
<li><strong>Woodpecker MQ</strong>: Verbesserte Nachrichtenwarteschlange mit reduziertem Wartungsaufwand, siehe <a href="/docs/de/use-woodpecker.md">Woodpecker verwenden</a> für Details</li>
<li><strong>Optimierte Architektur</strong>: Konsolidierte Komponenten für bessere Leistung</li>
</ul>
<p>Laden Sie immer das neueste Skript herunter, um sicherzustellen, dass Sie die neuesten Konfigurationen und Architekturverbesserungen erhalten.</p>
<p>Wenn Sie <a href="https://milvus.io/docs/milvus_backup_overview.md">Backup</a> im eigenständigen Bereitstellungsmodus verwenden möchten, empfiehlt sich die Verwendung der <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Docker Compose-Bereitstellungsmethode</a>.</p>
<p>Sollten Sie beim Ziehen des Images auf Probleme stoßen, wenden Sie sich bitte an <a href="mailto:community@zilliz.com">community@zilliz.com</a> und schildern Sie das Problem, damit wir Ihnen den nötigen Support bieten können.</p>
</div>
<p>Nachdem Sie das Installationsskript ausgeführt haben:</p>
<ul>
<li>Ein Docker-Container namens milvus wurde an Port <strong>19530</strong> gestartet.</li>
<li>Ein embed etcd wird zusammen mit Milvus im selben Container installiert und dient an Port <strong>2379</strong>. Seine Konfigurationsdatei wird auf <strong>embedEtcd.yaml</strong> im aktuellen Ordner abgebildet.</li>
<li>Um die Standardkonfiguration von Milvus zu ändern, fügen Sie Ihre Einstellungen der Datei <strong>user.yaml</strong> im aktuellen Ordner hinzu und starten Sie den Dienst neu.</li>
<li>Das Milvus-Datenvolumen wird im aktuellen Ordner auf <strong>volumes/milvus</strong> abgebildet.</li>
</ul>
<p>Sie können auf die Milvus-WebUI unter <code translate="no">http://127.0.0.1:9091/webui/</code> zugreifen, um mehr über Ihre Milvus-Instanz zu erfahren. Einzelheiten finden Sie unter <a href="/docs/de/milvus-webui.md">Milvus WebUI</a>.</p>
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
    </button></h2><p>Sie können die Milvus-Konfigurationen in der Datei <strong>user.yaml</strong> im aktuellen Ordner ändern. Um zum Beispiel <code translate="no">proxy.healthCheckTimeout</code> in <code translate="no">1000</code> ms zu ändern, können Sie die Datei wie folgt ändern:</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Starten Sie dann den Dienst wie folgt neu:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>Die zutreffenden Konfigurationselemente finden Sie unter <a href="/docs/de/system_configuration.md">Systemkonfiguration</a>.</p>
<h2 id="Upgrade-Milvus" class="common-anchor-header">Upgrade von Milvus<button data-href="#Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können ein Upgrade auf die neueste Version von Milvus durchführen, indem Sie den eingebauten Upgrade-Befehl verwenden. Dadurch werden automatisch die neueste Konfiguration und das neueste Milvus-Image heruntergeladen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Upgrade Milvus to the latest version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh upgrade</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Der Upgrade-Befehl lädt automatisch:</p>
<ul>
<li>Lädt das neueste Installationsskript mit aktualisierten Konfigurationen herunter</li>
<li>Holt das neueste Milvus-Docker-Image</li>
<li>Startet den Container mit der neuen Version neu</li>
<li>Behält Ihre bestehenden Daten und Konfigurationen bei</li>
</ul>
<p>Dies ist der empfohlene Weg, um Ihren Milvus-Einzelbetrieb zu aktualisieren.</p>
</div>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">Milvus stoppen und löschen<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können diesen Container wie folgt stoppen und löschen</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Wie geht es jetzt weiter?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/de/quickstart.md">Quickstart</a> prüfen, um zu sehen, was Milvus tun kann.</p></li>
<li><p>Lernen Sie die grundlegenden Operationen von Milvus:</p>
<ul>
<li><a href="/docs/de/manage_databases.md">Verwalten von Datenbanken</a></li>
<li><a href="/docs/de/manage-collections.md">Sammlungen verwalten</a></li>
<li><a href="/docs/de/manage-partitions.md">Partitionen verwalten</a></li>
<li><a href="/docs/de/insert-update-delete.md">Einfügen, Upsert &amp; Löschen</a></li>
<li><a href="/docs/de/single-vector-search.md">Ein-Vektor-Suche</a></li>
<li><a href="/docs/de/multi-vector-search.md">Hybride Suche</a></li>
</ul></li>
<li><p><a href="/docs/de/upgrade_milvus_cluster-helm.md">Upgrade von Milvus mit Helm Chart</a>.</p></li>
<li><p><a href="/docs/de/scaleout.md">Skalieren Sie Ihren Milvus-Cluster</a>.</p></li>
<li><p>Verteilen Sie Ihren Milvus-Cluster auf Clouds:</p>
<ul>
<li><a href="/docs/de/eks.md">Amazon EKS</a></li>
<li><a href="/docs/de/gcp.md">Google Wolke</a></li>
<li><a href="/docs/de/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Entdecken Sie <a href="/docs/de/milvus-webui.md">Milvus WebUI</a>, eine intuitive Webschnittstelle für die Beobachtung und Verwaltung von Milvus.</p></li>
<li><p>Erkunden Sie <a href="/docs/de/milvus_backup_overview.md">Milvus Backup</a>, ein Open-Source-Tool für Milvus-Datensicherungen.</p></li>
<li><p><a href="/docs/de/birdwatcher_overview.md">Birdwatcher</a>, ein Open-Source-Tool zur Fehlersuche in Milvus und zur dynamischen Konfigurationsaktualisierung.</p></li>
<li><p>Entdecken Sie <a href="https://github.com/zilliztech/attu">Attu</a>, ein Open-Source-GUI-Tool für intuitives Milvus-Management.</p></li>
<li><p><a href="/docs/de/monitor.md">Überwachen Sie Milvus mit Prometheus</a>.</p></li>
</ul>
