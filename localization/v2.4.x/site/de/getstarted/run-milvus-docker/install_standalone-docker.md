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
<li><a href="/docs/de/v2.4.x/prerequisite-docker.md">Überprüfen Sie</a> vor der Installation<a href="/docs/de/v2.4.x/prerequisite-docker.md">die Anforderungen an Hardware und Software</a>.</li>
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
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download the installation script</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

<span class="hljs-comment"># Start the Docker container</span>
$ bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Sollten Sie beim Ziehen des Images auf Probleme stoßen, kontaktieren Sie uns unter <a href="mailto:community@zilliz.com">community@zilliz.com</a> mit Details zum Problem, und wir werden Ihnen den nötigen Support bieten.</p>
</div>
<p>Nachdem Sie das Installationsskript ausgeführt haben:</p>
<ul>
<li>Ein Docker-Container namens milvus wurde an Port <strong>19530</strong> gestartet.</li>
<li>Ein embed etcd wird zusammen mit Milvus im selben Container installiert und dient an Port <strong>2379</strong>. Seine Konfigurationsdatei wird auf <strong>embedEtcd.yaml</strong> im aktuellen Ordner abgebildet.</li>
<li>Um die Standardkonfiguration von Milvus zu ändern, fügen Sie Ihre Einstellungen der Datei <strong>user.yaml</strong> im aktuellen Ordner hinzu und starten Sie den Dienst neu.</li>
<li>Das Milvus-Datenvolumen wird im aktuellen Ordner auf <strong>volumes/milvus</strong> abgebildet.</li>
</ul>
<p>Sie können diesen Container wie folgt stoppen und löschen</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ bash standalone_embed.sh stop

<span class="hljs-comment"># Delete Milvus data</span>
$ bash standalone_embed.sh delete
<button class="copy-code-btn"></button></code></pre>
<p>Sie können die neueste Version von Milvus wie folgt aktualisieren</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># upgrade Milvus</span>
$ bash standalone_embed.sh upgrade
<button class="copy-code-btn"></button></code></pre>
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
<li><p><a href="/docs/de/v2.4.x/quickstart.md">Quickstart</a> prüfen, um zu sehen, was Milvus tun kann.</p></li>
<li><p>Lernen Sie die grundlegenden Operationen von Milvus:</p>
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
