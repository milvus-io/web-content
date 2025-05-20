---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: 'Erfahren Sie, wie Sie Milvus eigenständig mit Docker Compose installieren.'
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
    </button></h1><p>Diese Seite veranschaulicht, wie man eine Milvus-Instanz in Docker mit Docker Compose startet.</p>
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
<li><a href="/docs/de/v2.4.x/prerequisite-docker.md">Prüfen Sie</a> vor der Installation<a href="/docs/de/v2.4.x/prerequisite-docker.md">die Anforderungen an Hardware und Software</a>.</li>
</ul>
<h2 id="Install-Milvus" class="common-anchor-header">Installieren Sie Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus bietet eine Docker Compose-Konfigurationsdatei im Milvus-Repository. Um Milvus mit Docker Compose zu installieren, führen Sie einfach folgenden Befehl aus</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download the configuration file</span>
$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose.yml -O docker-compose.yml

<span class="hljs-comment"># Start Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>Wenn Sie den obigen Befehl nicht ausführen können, überprüfen Sie bitte, ob auf Ihrem System Docker Compose V1 installiert ist. Wenn dies der Fall ist, sollten Sie aufgrund der Hinweise auf <a href="https://docs.docker.com/compose/">dieser Seite</a> auf Docker Compose V2 migrieren.</p></li>
<li><p>Sollten Sie beim Ziehen des Images auf Probleme stoßen, kontaktieren Sie uns unter <a href="mailto:community@zilliz.com">community@zilliz.com</a> und schildern Sie das Problem, damit wir Ihnen den nötigen Support bieten können.</p></li>
</ul>
</div>
<p>Nach dem Starten von Milvus,</p>
<ul>
<li>Die Container mit den Namen <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> und <strong>milvus-etcd</strong> sind gestartet.<ul>
<li>Der <strong>milvus-etcd-Container</strong> stellt dem Host keine Ports zur Verfügung und mappt seine Daten auf <strong>volumes/etcd</strong> im aktuellen Ordner.</li>
<li>Der <strong>milvus-minio-Container</strong> bedient die Ports <strong>9090</strong> und <strong>9091</strong> lokal mit den Standard-Authentifizierungsdaten und ordnet seine Daten den <strong>Volumes/minio</strong> im aktuellen Ordner zu.</li>
<li>Der <strong>milvus-standalone-Container</strong> bedient lokal die Ports <strong>19530</strong> mit den Standardeinstellungen und ordnet seine Daten den <strong>Volumes/milvus</strong> im aktuellen Ordner zu.</li>
</ul></li>
</ul>
<p>Mit dem folgenden Befehl können Sie überprüfen, ob die Container aktiv sind und laufen:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker-compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Sie können diesen Container wie folgt stoppen und löschen</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
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
<li><p>Prüfen Sie <a href="/docs/de/v2.4.x/quickstart.md">Quickstart</a>, um zu sehen, was Milvus kann.</p></li>
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
<li><p>Entdecken Sie <a href="https://github.com/zilliztech/attu">Attu</a>, ein Open-Source-GUI-Tool für die intuitive Milvus-Verwaltung.</p></li>
<li><p><a href="/docs/de/v2.4.x/monitor.md">Überwachen Sie Milvus mit Prometheus</a>.</p></li>
</ul>
