---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 2
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: >-
  Erfahren Sie, wie Sie Milvus Standalone mit Docker Compose aktualisieren
  können.
title: Upgrade von Milvus Standalone mit Docker Compose
---
<div class="tab-wrapper"><a href="/docs/de/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/de/upgrade_milvus_standalone-docker.md" class='active '>Operator</a>, Helm, Docker<a href="/docs/de/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">Upgrade von Milvus Standalone mit Docker Compose<button data-href="#Upgrade-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>In dieser Anleitung wird beschrieben, wie Sie eine Milvus 2.6.x-Standalone-Bereitstellung mit Docker Compose auf Version 3.0.5 aktualisieren.</p>
<div class="alert note">
<p>Dieses Verfahren wurde mit der offiziellen Milvus 2.6.20 Standalone-Docker-Compose-Konfiguration validiert, bei der lediglich das Image geändert wurde. In Schritt 2 wird zusätzlich der Dienst für die Eigentumsrechte am Datenverzeichnis aus der Compose-Konfiguration von v3.0.5 hinzugefügt, was bei dieser Validierung nicht berücksichtigt wurde.</p>
</div>
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
<li>Docker Engine und Docker Compose V2</li>
<li>Eine bestehende Milvus 2.6.x-Standalone-Bereitstellung, die von Docker Compose verwaltet wird</li>
<li>Die für die bestehende Bereitstellung verwendete Docker-Compose-Datei und -Konfiguration</li>
<li>Eine aktuelle Sicherung der Milvus-Metadaten und persistenten Daten</li>
</ul>
<p><strong>Einschränkungen bei der Nachrichtenwarteschlange</strong>: Beim Upgrade auf Milvus v3.0.5 müssen Sie Ihre aktuelle Wahl der Nachrichtenwarteschlange beibehalten. Ein Wechsel zwischen verschiedenen Nachrichtenwarteschlangensystemen während des Upgrades wird nicht unterstützt. Die Unterstützung für den Wechsel des Nachrichtenwarteschlangensystems wird in zukünftigen Versionen verfügbar sein.</p>
<div class="alert warning">
<p>Ersetzen Sie im Rahmen dieses Vorgangs nicht Ihre aktuelle Compose-Datei und ändern Sie keine Abhängigkeitsversionen. Behalten Sie das vorhandene etcd, den Objektspeicher, die Nachrichtenwarteschlange, die Volumes und die Konfiguration bei. Aktualisieren Sie den Milvus-Image-Tag und fügen Sie den in Schritt 2 beschriebenen Dienst für die Eigentumsrechte am Datenverzeichnis hinzu.</p>
<p>Falls Ihre Compose-Datei <code translate="no">minio/minio:RELEASE.2024-12-18T13-15-44Z</code> verwendet und Docker dieses Image nicht abrufen kann, ändern Sie es in <code translate="no">milvusdb/minio:RELEASE.2024-12-18T13-15-44Z</code>, das von der Compose-Konfiguration für v3.0.5 verwendet wird. Behalten Sie denselben Release-Tag bei.</p>
<p>Dieses Verfahren validiert kein Downgrade oder Rollback durch die Rückstellung des Milvus-Images auf 2.6.x. Nachdem v3.0.5 Daten geschrieben hat, kann es bei einem reinen Image-Rollback vorkommen, dass der aktualisierte Zustand nicht gelesen werden kann. Wenn das Upgrade fehlschlägt, stoppen Sie Schreibvorgänge und wenden Sie einen Wiederherstellungsplan an, der die Metadaten vor dem Upgrade sowie die Backups der persistenten Daten wiederherstellt. Testen Sie den Wiederherstellungsplan zunächst in einer Nicht-Produktionsumgebung.</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">Upgrade-Prozess<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Back-up-the-current-configuration" class="common-anchor-header">Schritt 1: Sichern Sie die aktuelle Konfiguration<button data-href="#Step-1-Back-up-the-current-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Speichern Sie eine Kopie der aktuellen Compose-Datei und aller eingebundenen Milvus-Konfigurationsdateien:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cp</span> docker-compose.yml docker-compose-before-upgrade.yml
<button class="copy-code-btn"></button></code></pre>
<p>Vergewissern Sie sich vor Beginn des Upgrades, dass die aktuellen Container fehlerfrei sind:</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Update-the-Milvus-image" class="common-anchor-header">Schritt 2: Aktualisieren Sie das Milvus-Image<button data-href="#Step-2-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>Aktualisieren Sie in der vorhandenen Compose-Datei das Image des Dienstes „ <code translate="no">standalone</code> “, ersetzen Sie dessen Einträge unter „ <code translate="no">depends_on</code> “ durch die unten aufgeführten und fügen Sie den Dienst „ <code translate="no">milvus-volume-init</code> “ hinzu. Verwenden Sie für beide Dienste dasselbe Image und mounten Sie dasselbe Host-Verzeichnis, das der Dienst „ <code translate="no">standalone</code> “ unter „ <code translate="no">/var/lib/milvus</code> “ mountet. Behalten Sie die übrigen Einstellungen des Dienstes „ <code translate="no">standalone</code> “ bei:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">milvus-volume-init:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;0:0&quot;</span>
    <span class="hljs-attr">network_mode:</span> <span class="hljs-string">none</span>
    <span class="hljs-attr">read_only:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">&quot;no&quot;</span>
    <span class="hljs-attr">entrypoint:</span> [<span class="hljs-string">&quot;/bin/sh&quot;</span>, <span class="hljs-string">&quot;-c&quot;</span>]
    <span class="hljs-attr">command:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">|
        set -eu
        uid=&quot;$$(id -u milvus)&quot;
        gid=&quot;$$(id -g milvus)&quot;
        marker=&quot;/var/lib/milvus/.milvus-volume-owner-$${uid}-$${gid}&quot;
        if [ ! -e &quot;$${marker}&quot; ]; then
          echo &quot;Preparing /var/lib/milvus for $${uid}:$${gid}&quot;
          chown -R &quot;$${uid}:$${gid}&quot; /var/lib/milvus
          touch &quot;$${marker}&quot;
          chown &quot;$${uid}:$${gid}&quot; &quot;$${marker}&quot;
        fi
</span>    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>

  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-attr">milvus-volume-init:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_completed_successfully</span>
      <span class="hljs-attr">etcd:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
      <span class="hljs-attr">minio:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus-Images der Version 3.0.5 führen Milvus als Nicht-Root-Benutzer „ <code translate="no">milvus</code> “ aus, während Milvus-Images der Version 2.6.x keinen Benutzer festlegen und Milvus als „ <code translate="no">root</code> “ ausführen. Der Dienst „ <code translate="no">milvus-volume-init</code> “ stammt aus der Compose-Konfiguration der Version 3.0.5. Er wird einmalig als „ <code translate="no">root</code> “ ausgeführt, bevor Milvus startet, und ändert den Eigentümer von „ <code translate="no">/var/lib/milvus</code> “ und dessen Inhalt auf den Benutzer und die Gruppe „ <code translate="no">milvus</code> “, damit Milvus in die Dateien schreiben kann, die bei der 2.6.x-Bereitstellung erstellt wurden. Anschließend schreibt er eine Markierungsdatei „ <code translate="no">.milvus-volume-owner-&lt;uid&gt;-&lt;gid&gt;</code> “ in „ <code translate="no">/var/lib/milvus</code> “ und nimmt bei späteren Ausführungen keine Änderungen mehr vor, solange die Markierungsdatei vorhanden ist. Wenn Sie später Dateien, die einem anderen Benutzer gehören, in das Datenverzeichnis wiederherstellen, entfernen Sie die Markierungsdatei, damit der Dienst wieder ausgeführt wird.</p>
<p>Laden Sie das Ziel-Image herunter und erstellen Sie den Milvus-Container neu. Da der Dienst „ <code translate="no">standalone</code> “ von „ <code translate="no">milvus-volume-init</code> “ abhängt, führt Docker Compose „ <code translate="no">milvus-volume-init</code> “ bis zum Abschluss aus, bevor der neue Milvus-Container gestartet wird:</p>
<pre><code translate="no" class="language-bash">docker compose pull standalone
docker compose up --detach standalone
<button class="copy-code-btn"></button></code></pre>
<p>Docker Compose hält die vorhandenen etcd- und Object-Storage-Container am Laufen und verwendet die konfigurierten Datenverzeichnisse weiter. Wenn Sie die Konfiguration einer Abhängigkeit geändert haben, beispielsweise das MinIO-Image, erstellt Compose diesen Container neu und behält dessen eingebundene Volumes bei.</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Überprüfen Sie das Upgrade<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Überprüfen Sie den Containerstatus und das vom Milvus-Container verwendete Image:</p>
<pre><code translate="no" class="language-bash">docker compose ps

docker compose images standalone

docker compose logs --<span class="hljs-built_in">tail</span> 100 standalone
<button class="copy-code-btn"></button></code></pre>
<p>Stellen Sie sicher, dass der Dienst „ <code translate="no">standalone</code> “ ordnungsgemäß läuft, sein Image „ <code translate="no">milvusdb/milvus:v3.0.5</code> “ lautet und die vorhandenen Sammlungen weiterhin abfragbar und durchsuchbar sind. Führen Sie diese Überprüfungen durch, bevor Sie v3.0.5-spezifische Funktionen aktivieren.</p>
<div class="alert note">
<p>Durch das Upgrade auf Milvus 3.0 wird „Storage V3“ nicht aktiviert. Nachdem Sie das Upgrade überprüft haben, machen Sie sich mit <a href="/docs/de/storage-v3.md">„Storage V3“</a> vertraut, bevor Sie Funktionen aktivieren, die davon abhängen. Sobald Milvus Daten in „Storage V3“ schreibt, wird ein Downgrade auf eine ältere Milvus-Version, die „Storage V3“ nicht lesen kann, nicht unterstützt.</p>
</div>
