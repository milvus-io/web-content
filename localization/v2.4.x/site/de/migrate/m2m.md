---
id: m2m.md
summary: >-
  Diese Anleitung bietet einen umfassenden, schrittweisen Prozess für die
  Migration von Daten von Milvus 1.x (einschließlich 0.9.x und höher) zu Milvus
  2.x.
title: Von Milvus 1.x
---
<h1 id="From-Milvus-1x" class="common-anchor-header">Von Milvus 1.x<button data-href="#From-Milvus-1x" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieser Leitfaden bietet einen umfassenden, schrittweisen Prozess für die Migration von Daten von Milvus 1.x (einschließlich 0.9.x und höher) nach Milvus 2.x. Wenn Sie diesen Leitfaden befolgen, können Sie Ihre Daten effizient übertragen und dabei die erweiterten Funktionen und die verbesserte Leistung von Milvus 2.x nutzen.</p>
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
<li><strong>Software-Versionen</strong>:<ul>
<li>Quell-Milvus: 0.9.x bis 1.x</li>
<li>Ziel-Milvus: 2.x</li>
</ul></li>
<li><strong>Erforderliche Werkzeuge</strong>:<ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus-Migrationswerkzeug</a>. Einzelheiten zur Installation finden Sie unter <a href="/docs/de/v2.4.x/milvusdm_install.md">Migrationswerkzeug installieren</a>.</li>
</ul></li>
</ul>
<h2 id="Export-metadata-of-the-source-Milvus-installation" class="common-anchor-header">Exportieren der Metadaten der Milvus-Quellinstallation<button data-href="#Export-metadata-of-the-source-Milvus-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Um die Migrationsdaten für Milvus 0.9.x bis 1.x vorzubereiten, stoppen Sie die Quell-Milvus-Installation oder führen Sie zumindest keine DML-Operationen mehr in ihr durch.</p>
<ol>
<li><p>Exportieren Sie die Metadaten der Milvus-Quellinstallation nach <code translate="no">meta.json</code>.</p>
<ul>
<li>Für die Installationen, die MySQL als Backend verwenden, führen Sie</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -m <span class="hljs-string">&quot;user:password@tcp(adderss)/milvus?charset=utf8mb4&amp;parseTime=True&amp;loc=Local&quot;</span> -o outputDir
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Für Installationen, die SQLite als Backend verwenden, führen Sie aus</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -s /milvus/db/meta.sqlite -o outputDir
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Kopieren Sie den Ordner <code translate="no">tables</code> Ihrer Milvus-Installation und verschieben Sie dann sowohl <code translate="no">meta.json</code> als auch den Ordner <code translate="no">tables</code> in einen leeren Ordner.</p>
<p>Sobald dieser Schritt abgeschlossen ist, sollte die Struktur des leeren Ordners wie folgt aussehen:</p>
<pre><code translate="no">migration_data
├── meta.json
└── tables
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Laden Sie den im vorangegangenen Schritt vorbereiteten Ordner in einen S3-Blockspeicher-Bucket hoch oder verwenden Sie diesen lokalen Ordner direkt im nächsten Abschnitt.</p></li>
</ol>
<h2 id="Configure-the-migration-file" class="common-anchor-header">Konfigurieren Sie die Migrationsdatei<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Speichern Sie die Beispiel-Migrationskonfigurationsdatei unter <code translate="no">migration.yaml</code> und ändern Sie die Konfigurationen entsprechend Ihren tatsächlichen Gegebenheiten. Es steht Ihnen frei, die Konfigurationsdatei in einem beliebigen lokalen Verzeichnis abzulegen.</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: milvus1x
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 16
meta:
  mode: <span class="hljs-built_in">local</span>
  localFile: /outputDir/test/meta.json
<span class="hljs-built_in">source</span>:
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    tablesDir: /db/tables/
target:
  mode: remote
  remote:
    outputDir: <span class="hljs-string">&quot;migration/test/xx&quot;</span>
    ak: xxxx
    sk: xxxx
    cloud: aws
    region: us-west-2
    bucket: xxxxx
    useIAM: <span class="hljs-literal">true</span>
    checkBucket: <span class="hljs-literal">false</span>
  milvus2x:
    endpoint: <span class="hljs-string">&quot;{yourMilvus2_xServerAddress}:{port}&quot;</span>
    username: xxxx
    password: xxxx
<button class="copy-code-btn"></button></code></pre>
<p>In der folgenden Tabelle werden die Parameter in der Beispielkonfigurationsdatei beschrieben. Eine vollständige Liste der Konfigurationsdateien finden Sie in <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#migrationyaml-reference">Milvus Migration: Milvus1.x zu Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>Die Gleichzeitigkeit der Dumper-Threads.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Der Betriebsmodus des Migrationsauftrags. Wird bei der Migration von Milvus 1.x auf <code translate="no">milvus1x</code> gesetzt.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Puffergröße, die in jedem Batch aus Milvus 1.x gelesen wird. Einheit: KB.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>Puffergröße für das Schreiben in Milvus 2.x in jedem Batch. Einheit: KB.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">loader</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">loader.worker.limit</code></td><td>Die Gleichzeitigkeit der Loader-Threads.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Gibt an, woher die Metadatei meta.json gelesen wird. Gültige Werte: <code translate="no">local</code>, <code translate="no">remote</code>, <code translate="no">mysql</code>, <code translate="no">sqlite</code>.</td></tr>
<tr><td><code translate="no">meta.localFile</code></td><td>Lokaler Verzeichnispfad, in dem sich die Datei <code translate="no">meta.json</code> befindet. Diese Konfiguration wird nur verwendet, wenn <code translate="no">meta.mode</code> auf <code translate="no">local</code> gesetzt ist. Andere Meta-Konfigurationen finden Sie in <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#meta">README_1X</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>Gibt an, woher die Quelldateien gelesen werden. Gültige Werte:<br/>- <code translate="no">local</code>: liest Dateien von einer lokalen Festplatte.<br/>- <code translate="no">remote</code>: liest Dateien von einem entfernten Speicher.</td></tr>
<tr><td><code translate="no">source.local.tablesDir</code></td><td>Der Verzeichnispfad, in dem sich die Quelldateien befinden. Zum Beispiel <code translate="no">/db/tables/</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>Speicherort für gedumpte Dateien. Gültige Werte:<br/>- <code translate="no">local</code>: Speichern der ausgelagerten Dateien auf lokalen Festplatten.<br/>- <code translate="no">remote</code>: Speichern der ausgelagerten Dateien im Objektspeicher.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Ausgabeverzeichnispfad im Cloud-Speicher-Bucket.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Zugriffsschlüssel für Milvus 2.x-Speicher.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Geheimer Schlüssel für Milvus 2.x-Speicher.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Anbieter des Cloud-Speicherdienstes. Beispielwerte: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Region des Cloud-Speichers. Es kann ein beliebiger Wert sein, wenn Sie lokales MinIO verwenden.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Bucket-Name für die Speicherung von Daten. Der Wert muss derselbe sein wie die Konfiguration in Milvus 2.x. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Systemkonfigurationen</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Ob eine IAM-Rolle für die Verbindung verwendet werden soll.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Ob geprüft werden soll, ob der angegebene Bucket im Objektspeicher existiert.</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Adresse des Milvus-Zielservers.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Benutzername für den Milvus 2.x-Server. Dieser Parameter ist erforderlich, wenn die Benutzerauthentifizierung für Ihren Milvus-Server aktiviert ist. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/authenticate.md">Aktivieren der Authentifizierung</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Passwort für den Milvus 2.x-Server. Dieser Parameter ist erforderlich, wenn die Benutzerauthentifizierung für Ihren Milvus-Server aktiviert ist. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/authenticate.md">Aktivieren der Authentifizierung</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">Starten Sie die Migrationsaufgabe<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Starten Sie die Migrationsaufgabe mit dem folgenden Befehl. Ersetzen Sie <code translate="no">{YourConfigFilePath}</code> durch das lokale Verzeichnis, in dem sich die Konfigurationsdatei <code translate="no">migration.yaml</code> befindet.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Der obige Befehl konvertiert die Quelldaten in Milvus 1.x in NumPy-Dateien und verwendet dann den Vorgang <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a>, um die Daten in den Ziel-Bucket zu schreiben.</p></li>
<li><p>Sobald die NumPy-Dateien erzeugt sind, importieren Sie diese Dateien mit dem folgenden Befehl in Milvus 2.x. Ersetzen Sie <code translate="no">{YourConfigFilePath}</code> durch das lokale Verzeichnis, in dem sich die Konfigurationsdatei <code translate="no">migration.yaml</code> befindet.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  load  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Verify-the-result" class="common-anchor-header">Überprüfen Sie das Ergebnis<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald die Migrationsaufgabe ausgeführt wurde, können Sie API-Aufrufe tätigen oder Attu verwenden, um die Anzahl der migrierten Entitäten anzuzeigen. Weitere Informationen finden Sie unter <a href="https://github.com/zilliztech/attu">Attu</a> und <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
