---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: 'Erfahren Sie, wie Sie Milvus als Standalone-Anwendung mit Docker installieren.'
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
<li><a href="/docs/de/prerequisite-docker.md">Überprüfen Sie</a> vor der Installation<a href="/docs/de/prerequisite-docker.md">die Hardware- und Softwareanforderungen</a>.</li>
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
    </button></h2><p>Milvus stellt ein Installationsskript bereit, mit dem es als Docker-Container installiert werden kann. Das Skript ist im <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">Milvus-Repository</a> verfügbar. Laden Sie das Skript herunter und überprüfen Sie es, bevor Sie eine neue Bereitstellung starten:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Inspect the Docker image selected by the script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">grep -n <span class="hljs-string">&quot;milvusdb/milvus:&quot;</span> standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Das Skript wird aus dem Milvus- <code translate="no">master</code> -Zweig heruntergeladen. Sein Docker-Image-Tag ist im Skript definiert und kann von v3.0.3 abweichen. Um genau diese Version zu installieren, verwenden Sie die versionsspezifische Konfiguration unter <a href="/docs/de/install_standalone-docker-compose.md">„Milvus mit Docker Compose ausführen</a>“.</p>
<p>Bei dieser Docker-Bereitstellung wird <strong>Woodpecker</strong> mit dem <strong>lokalen Dateisystem</strong> als WAL-Backend ausgeführt, sodass kein externer Message-Queue-Dienst erforderlich ist. Siehe <a href="/docs/de/woodpecker.md">Woodpecker</a>.</p>
<p>Wenn Sie <a href="/docs/de/milvus_backup_overview.md">„Backup“</a> im eigenständigen Bereitstellungsmodus nutzen möchten, wird die Verwendung der <a href="/docs/de/install_standalone-docker-compose.md">Docker-Compose-Bereitstellungsmethode</a> empfohlen.</p>
<p>Sollten beim Abrufen des Images Probleme auftreten, kontaktieren Sie uns bitte unter <a href="mailto:community@zilliz.com">community@zilliz.com</a> mit Details zum Problem, und wir werden Ihnen die erforderliche Unterstützung zukommen lassen.</p>
</div>
<p>Nach Ausführung des Installationsskripts:</p>
<ul>
<li>Ein Docker-Container namens „milvus-standalone“ wurde am Port <strong>19530</strong> gestartet.</li>
<li>Ein „embed etcd“ ist zusammen mit Milvus im selben Container installiert und läuft am Port <strong>2379</strong>. Seine Konfigurationsdatei ist auf <strong>„embedEtcd.yaml“</strong> im aktuellen Ordner verweist.</li>
<li>Um die Standardkonfiguration von Milvus zu ändern, fügen Sie Ihre Einstellungen zur Datei <strong>„user.yaml“</strong> im aktuellen Ordner hinzu und starten Sie den Dienst anschließend neu.</li>
<li>Das Milvus-Datenvolume ist auf <strong>„volumes/milvus“</strong> im aktuellen Ordner abgebildet.</li>
</ul>
<p>Überprüfen Sie das aktuelle Image und den Betriebszustand:</p>
<pre><code translate="no" class="language-bash">docker inspect --format <span class="hljs-string">&#x27;{{.Config.Image}}&#x27;</span> milvus-standalone
docker inspect --format <span class="hljs-string">&#x27;{{.State.Health.Status}}&#x27;</span> milvus-standalone
<button class="copy-code-btn"></button></code></pre>
<p>Warten Sie, bis „ <code translate="no">healthy</code> “ angezeigt wird, bevor Sie mit <a href="/docs/de/quickstart.md">dem Schnellstart</a> fortfahren. Wenn Sie diesen Server verwenden, verbinden Sie das SDK mit <code translate="no">http://localhost:19530</code>; eine lokale URI <code translate="no">.db</code> startet stattdessen Milvus Lite.</p>
<p>Sie können über <code translate="no">http://127.0.0.1:9091/webui/</code> auf die Milvus-WebUI zugreifen, um mehr über Ihre Milvus-Instanz zu erfahren. Weitere Informationen finden Sie unter <a href="/docs/de/milvus-webui.md">Milvus-WebUI</a>.</p>
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
    </button></h2><p>Sie können die Milvus-Konfigurationen in der Datei <strong>„user.yaml“</strong> im aktuellen Ordner ändern. Um beispielsweise die Adresse <code translate="no">proxy.healthCheckTimeout</code> in <code translate="no">1000</code> ms zu ändern, können Sie die Datei wie folgt anpassen:</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Starten Sie anschließend den Dienst wie folgt neu:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>Informationen zu den entsprechenden Konfigurationselementen finden Sie unter <a href="/docs/de/system_configuration.md">„Systemkonfiguration</a>“.</p>
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
    </button></h2><p>Der Befehl „ <code translate="no">upgrade</code> “ des Skripts lädt das Skript von <code translate="no">master</code> herunter und erstellt den Container anhand des von diesem Skript ausgewählten Images neu. Dabei wird kein unterstützter Versionspfad von der Quelle zum Ziel überprüft, und generierte Konfigurationsdateien können neu erstellt werden. Betrachten Sie dies nicht als Garantie dafür, dass eine beliebige ältere Bereitstellung sicher auf Version 3.0.3 aktualisiert werden kann.</p>
<p>Sichern Sie vor einem Upgrade Metadaten, persistente Daten, „ <code translate="no">embedEtcd.yaml</code> “ und „ <code translate="no">user.yaml</code> “. Überprüfen Sie die Kompatibilität der Zielversion, der Nachrichtenwarteschlange und des Speichers und validieren Sie die Wiederherstellung in einer Nicht-Produktionsumgebung. Bei mit Docker Compose verwalteten Bereitstellungen befolgen Sie <a href="/docs/de/upgrade_milvus_standalone-docker.md">die Anleitung „Upgrade von Milvus Standalone mit Docker Compose“</a>; wenden Sie dieses Verfahren nicht direkt auf einen skriptverwalteten Container an.</p>
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
    </button></h2><p>Standardmäßig verwendet diese Bereitstellung <strong>Woodpecker</strong> (WAL im lokalen Dateisystem) als Nachrichtenwarteschlange und ein <strong>eingebettetes etcd</strong> für Metadaten – es muss nichts weiter installiert werden. Um eine andere Nachrichtenwarteschlange zu verwenden oder einen externen Objektspeicher bzw. Metadaten anzubinden, siehe:</p>
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
<li><p>Lesen Sie die Hinweise zum Upgrade auf dieser Seite, bevor Sie die Milvus-Version ändern.</p></li>
<li><p><a href="/docs/de/scaleout.md">Skalieren Sie Ihren Milvus-Cluster</a>.</p></li>
<li><p>Stellen Sie Ihren Milvus-Cluster in folgenden Clouds bereit:</p>
<ul>
<li><a href="/docs/de/eks.md">Amazon EKS</a></li>
<li><a href="/docs/de/gcp.md">Google Cloud</a></li>
<li><a href="/docs/de/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Entdecken Sie <a href="/docs/de/milvus-webui.md">Milvus WebUI</a>, eine intuitive Weboberfläche für die Überwachung und Verwaltung von Milvus.</p></li>
<li><p>Entdecken Sie <a href="/docs/de/milvus_backup_overview.md">Milvus Backup</a>, ein Open-Source-Tool für Milvus-Datensicherungen.</p></li>
<li><p>Entdecken Sie <a href="/docs/de/birdwatcher_overview.md">Birdwatcher</a>, ein Open-Source-Tool zur Fehlerbehebung in Milvus und für dynamische Konfigurationsaktualisierungen.</p></li>
<li><p>Entdecken Sie <a href="https://github.com/zilliztech/attu">Attu</a>, ein Open-Source-GUI-Tool für die intuitive Verwaltung von Milvus.</p></li>
<li><p><a href="/docs/de/monitor.md">Überwachen Sie Milvus mit Prometheus</a>.</p></li>
</ul>
