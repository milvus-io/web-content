---
id: milvus_backup_0_6_cli.md
summary: >-
  Konfigurieren Sie Milvus Backup 0.6.0, erstellen Sie ein Backup und überprüfen
  Sie die wiederhergestellten Daten über die Befehlszeilenschnittstelle (CLI).
title: Verwenden Sie Milvus Backup 0.6.0
---
<h1 id="Use-Milvus-Backup-060" class="common-anchor-header">Verwenden Sie Milvus Backup 0.6.0<button data-href="#Use-Milvus-Backup-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Verwenden Sie Milvus Backup, um Sammlungen zu sichern und in derselben oder einer anderen Milvus-Instanz wiederherzustellen. Diese Anleitung bezieht sich auf <strong>Milvus Backup 0.6.0</strong>. Das Sichern und Wiederherstellen unter Milvus 3.0 wird ab <strong>Milvus 3.0.1</strong> offiziell unterstützt. Backup 0.6.0 unterstützt außerdem Binlog-Workflows auf unterstützten Milvus 2.x-Versionen; überprüfen Sie <a href="/docs/de/milvus_backup_overview.md#Compatibility-matrix">die Kompatibilität von Milvus Backup</a>.</p>
<p>Wenn Sie weiterhin Backup 0.5.x verwenden, nutzen Sie bitte die <a href="/docs/de/milvus_backup_cli.md">CLI-Anleitung für 0.5.x</a>. Wenn Sie ein Upgrade durchführen, befolgen Sie zunächst <a href="/docs/de/milvus_backup_upgrade.md">die Anleitung zum Upgrade von Milvus Backup</a>.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Milvus Backup beziehen<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>Laden Sie die Binärdatei für Ihr Betriebssystem und Ihre Architektur aus der <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">Version v0.6.0</a> herunter und entpacken Sie sie anschließend. Achten Sie darauf, dass die Binärdatei und die Konfigurationsbeispiele zur selben Version gehören.</p>
<p>Um stattdessen aus dem Quellcode zu kompilieren, installieren Sie <strong>Go 1.26 oder höher</strong> und führen Sie anschließend Folgendes aus:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.6.0 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<p>Die vorgefertigte Binärdatei benötigt kein Go. Führen Sie alle nachfolgenden Shell-Befehle aus dem Verzeichnis aus, das „ <code translate="no">milvus-backup</code> “ enthält.</p>
<h2 id="Prepare-configuration-file" class="common-anchor-header">Konfigurationsdatei vorbereiten<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Backup benötigt Zugriff auf den Milvus-gRPC-Endpunkt, dessen Verwaltungsendpunkt, den Speicher der Instanz und das Backup-Ziel. Für Snapshot-Backups benötigt der Milvus-Server außerdem Zugriff auf den Backup-Speicher.</p>
<p>Erstellen Sie ein Konfigurationsverzeichnis:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>Speichern Sie dieses MinIO-Beispiel als „ <code translate="no">configs/backup.yaml</code> “. Ersetzen Sie die Adressen, Anmeldedaten, den Bucket und den Stammpfad durch die Einstellungen Ihrer Bereitstellung. Die Anmeldedaten „ <code translate="no">minioadmin</code> “ sind die MinIO-Teststandardwerte.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://localhost:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">milvus.grpc</code> stellt eine Verbindung zur Instanz her, die gesichert oder wiederhergestellt wird. Wenn die Authentifizierung aktiviert ist, legen Sie außerdem <code translate="no">milvus.user</code> und <code translate="no">milvus.password</code> fest.</li>
<li><code translate="no">milvus.management.endpoint</code> Wird für das Anhalten und Fortsetzen der Garbage Collection während der Sicherung verwendet.</li>
<li><code translate="no">milvus.storage</code> muss mit dem tatsächlichen Objektspeicher der Instanz übereinstimmen. Die Angabe eines Buckets an dieser Stelle ändert nichts an der Milvus-Konfiguration.</li>
<li><code translate="no">backup.storage</code> Gibt den Speicherort der Sicherung an. Nicht festgelegte Felder werden von „ <code translate="no">milvus.storage</code> “ übernommen, mit Ausnahme von „ <code translate="no">rootPath</code> “, dessen Standardwert „ <code translate="no">backup</code> “ ist.</li>
<li><code translate="no">transfer.mode: auto</code> Wählt das kopieren auf der Speicherseite aus, wenn die Backends übereinstimmen, und andernfalls das Streaming über Milvus Backup. Diese Einstellung steuert die Objektübertragung, nicht das Sicherungsformat.</li>
</ul>
<p>Typische Speicher-Standardwerte sind unten aufgeführt. Überprüfen Sie die Werte in Ihrer laufenden Bereitstellung, bevor Sie sie verwenden.</p>
<table>
<thead>
<tr><th>Einstellung</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>Bucket</td><td><code translate="no">a-bucket</code></td><td><code translate="no">milvus-bucket</code></td></tr>
<tr><td>Stammverzeichnis</td><td><code translate="no">files</code></td><td><code translate="no">file</code></td></tr>
</tbody>
</table>
<p>Falls der Milvus-Server eine andere Adresse verwendet, um auf den Backup-Speicher zuzugreifen, setzen Sie „ <code translate="no">backup.storage.milvusAddress</code> “ und „ <code translate="no">milvusPort</code> “ auf die für den Server erreichbare Adresse. Informationen zur Authentifizierung, zu TLS, anderen Speicheranbietern und weiteren Einstellungen finden Sie im <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">Konfigurationsbeispiel für Version 0.6.0</a>.</p>
<p>Überprüfen Sie die tatsächlichen Werte und die Konnektivität:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config show</code> maskiert geheime Werte und gibt an, woher die einzelnen Werte stammen. Die Verbindungsprüfung sollte „ <code translate="no">Success!</code> “ melden. Beheben Sie Verbindungs- oder Speicherfehler, bevor Sie ein Backup erstellen.</p>
<p>Informationen zu bestehenden v1-Konfigurationen finden Sie unter <a href="/docs/de/milvus_backup_upgrade.md#Migrate-the-configuration">„Milvus-Backup aktualisieren</a>“. Die automatische Konfigurationsumsetzung ersetzt keine entfernten CLI-Flags.</p>
<h2 id="Prepare-data" class="common-anchor-header">Daten vorbereiten<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie eine vorhandene Sammlung namens „ <code translate="no">coll</code> “ und stellen Sie sicher, dass „ <code translate="no">coll_bak</code> “ nicht existiert. Notieren Sie vor der Sicherung das Schema, die Anzahl der Entitäten, repräsentative Skalar- und Vektorwerte sowie ein bekanntes Suchergebnis. Behalten Sie die Beispieldaten unverändert bei, während Sie die wiederhergestellte Kopie vergleichen. Um stattdessen einen kleinen, entbehrlichen Datensatz zu erstellen, verwenden Sie <a href="/docs/de/snapshot-backup-and-restore.md#Prepare-sample-data">„Beispieldaten vorbereiten</a>“.</p>
<h2 id="Back-up-data" class="common-anchor-header">Daten sichern<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Erstellen Sie eine benannte Sicherung von „ <code translate="no">coll</code> “:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup.yaml
./milvus-backup list --config configs/backup.yaml
./milvus-backup get -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Der Befehl „create“ sollte „ <code translate="no">create backup success</code> “ ausgeben. „ <code translate="no">get</code> “ gibt die Metadaten der Sicherung zurück; überprüfen Sie, ob die erwartete Sammlung vorhanden ist. Wenn Sie „ <code translate="no">--filter</code> “ weglassen, werden alle in Frage kommenden Sammlungen gesichert. Externe Sammlungen werden übersprungen.</p>
<p><code translate="no">--filter</code> Akzeptiert durch Kommas getrennte Namen: „ <code translate="no">coll</code> “ in der Standarddatenbank, „ <code translate="no">db1.coll</code> “ oder „ <code translate="no">'db1.*'</code> “ für alle Sammlungen in einer Datenbank. Setzen Sie Muster, die „ <code translate="no">*</code> “ enthalten, in Anführungszeichen, um eine Shell-Erweiterung zu verhindern.</p>
<h3 id="Choose-a-backup-format-or-purpose" class="common-anchor-header">Wählen Sie ein Sicherungsformat oder einen Sicherungszweck<button data-href="#Choose-a-backup-format-or-purpose" class="anchor-icon" translate="no">
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
    </button></h3><p>Mit dem Standardwert „ <code translate="no">--format auto</code> “ verwendet Milvus 3.0 Snapshot-Backups; unterstützte Milvus 2.x-Server verwenden Binlog. Um das Binlog-Verhalten explizit beizubehalten, übergeben Sie „ <code translate="no">--format binlog</code> “. Das <a href="/docs/de/snapshot-backup-and-restore.md">Snapshot-Beispiel</a> wählt explizit „ <code translate="no">--format snapshot</code> “ aus.</p>
<p>Verwenden Sie „ <code translate="no">--for</code> “, wenn ein Zweck zu Ihrem Arbeitsablauf passt:</p>
<table>
<thead>
<tr><th>Zweck</th><th>Von der Voreinstellung angewendete Werte</th><th>Verwendungszweck</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">clone</code></td><td>Aktiviert RBAC-Backup; behält Ihre Format- und Strategieauswahl bei</td><td>Kopiert Daten auf eine andere Instanz; „ <code translate="no">auto</code> “ verwendet einen Snapshot unter Milvus 3.0</td></tr>
<tr><td><code translate="no">archive</code></td><td>Erzwingt „ <code translate="no">binlog</code> “ und aktiviert die RBAC-Sicherung</td><td>Erstellt ein Backup im Binlog-Format für eine spätere Wiederherstellung</td></tr>
<tr><td><code translate="no">secondary</code></td><td>Erzwingt „ <code translate="no">binlog</code> “, „ <code translate="no">bulk_flush</code> “, RBAC-Backup und zusätzliche Index-Metadaten</td><td>Initialisieren Sie einen Sekundärserver in einer konfigurierten Replikationstopologie</td></tr>
</tbody>
</table>
<p>Beispiel:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --for clone --filter coll -n clone_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Eine Voreinstellung überschreibt widersprüchliche Werte für die Optionen, die sie festlegt. Beispielsweise erzeugt „ <code translate="no">--for archive --format snapshot</code> “ ein Binlog-Backup. Das Sichern von RBAC-Metadaten führt nicht automatisch zu deren Wiederherstellung; verwenden Sie bei Bedarf die Option „ <code translate="no">--rbac</code> “ des Befehls „restore“.</p>
<p><code translate="no">secondary</code> ist keine Abkürzung für eine gewöhnliche instanzübergreifende Wiederherstellung. Es erfordert außerdem Zugriff auf das Quell-etcd für Index-Metadaten, korrekte Replikationscluster-IDs und -Kanäle sowie ein neues sekundäres Ziel. Das Backup muss seine vollständigen Metadaten beibehalten, einschließlich „ <code translate="no">meta/full_meta.json</code> “. Die Konfiguration der Replikation und die Durchführung eines Failovers liegen außerhalb des Rahmens dieses Leitfadens. Informationen zur versionsspezifischen Implementierung und zu den Anforderungen finden Sie im <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">Quellcode und im Referenzhandbuch zur Version 0.6.0</a>.</p>
<h3 id="Preserve-the-complete-backup" class="common-anchor-header">Bewahren Sie das vollständige Backup auf<button data-href="#Preserve-the-complete-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>Ein Backup wird unter <code translate="no">&lt;backup.storage.bucketName&gt;/&lt;backup.storage.rootPath&gt;/&lt;backup_name&gt;</code> gespeichert. Bewahren Sie jedes Objekt in diesem Verzeichnis auf. Snapshot-Backups enthalten sowohl ein exportiertes Bundle als auch Metadaten.</p>
<p>Kopieren Sie nicht nur die Metadatendateien und gehen Sie nicht davon aus, dass ein Snapshot-Backup denselben Aufbau wie ein Binlog-Backup hat.</p>
<h2 id="Restore-data" class="common-anchor-header">Daten wiederherstellen<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Stellen Sie „ <code translate="no">coll</code> “ als „ <code translate="no">coll_bak</code> “ in der konfigurierten Instanz wieder her:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>In der CLI stimmt „ <code translate="no">--filter</code> “ mit den Namen überein, <strong>nachdem</strong> „ <code translate="no">-s</code> “ oder „ <code translate="no">--rename</code> “ angewendet wurde. Ein Befehl mit „ <code translate="no">--filter coll -s _bak</code> “ findet keine Übereinstimmung und kann erfolgreich beendet werden, ohne dass eine Sammlung wiederhergestellt wird.</p>
<p>Um unter Verwendung des ursprünglichen Namens wiederherzustellen, wählen Sie ein Ziel, in dem dieser Sammlungsname nicht vorhanden ist, verweisen Sie die Konfiguration auf dieses Ziel und den Speicherort der Sicherung und lassen Sie das Suffix weg:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll -n my_backup --config configs/backup-target.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Ein vollständiges Beispiel für die Wiederherstellung innerhalb derselben Instanz finden Sie unter <a href="/docs/de/snapshot-backup-and-restore.md">„Snapshot-Sicherung und -Wiederherstellung in einer Instanz</a>“. Die vorhandenen instanzübergreifenden Seiten für allgemeine Fälle verwenden die Konfiguration von Backup 0.5.16 und v1; wenden Sie deren Befehle nicht unverändert auf 0.6.0 an. Informationen zur Übertragungskonfiguration für 0.6.0 finden Sie im <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">versionsbezogenen Übertragungsleitfaden</a>.</p>
<h2 id="Verify-restored-data" class="common-anchor-header">Überprüfen Sie die wiederhergestellten Daten<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Stellen Sie sicher, dass „ <code translate="no">coll_bak</code> “ vorhanden ist. Falls bei der Wiederherstellung der Vektorindex nicht neu erstellt wurde, erstellen Sie vor dem Laden der Sammlung den für Ihr Schema geeigneten Index. Vergleichen Sie das Schema, die Entitätsanzahl, die Skalar- und Vektorwerte sowie bekannte Suchergebnisse mit der vor der Sicherung erfassten Basislinie.</p>
<p>Verwenden Sie für den Einweg-Datensatz mit 256 Entitäten die vollständigen Prüfschritte unter <a href="/docs/de/snapshot-backup-and-restore.md#Verify-the-result">„Ergebnis überprüfen</a>“. Ein erfolgreicher Befehl allein beweist nicht, dass die erwarteten Daten wiederhergestellt wurden.</p>
