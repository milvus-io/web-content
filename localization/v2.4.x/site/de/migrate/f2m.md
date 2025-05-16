---
id: f2m.md
title: Von Faiss
related_key: 'Faiss, migrate, import'
summary: 'Erfahren Sie, wie Sie Faiss-Daten nach Milvus migrieren können.'
---
<h1 id="From-Faiss" class="common-anchor-header">Von Faiss<button data-href="#From-Faiss" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieser Leitfaden bietet einen umfassenden, schrittweisen Prozess für die Migration von Daten von Faiss nach Milvus 2.x. Wenn Sie diesen Leitfaden befolgen, können Sie Ihre Daten effizient übertragen und dabei die erweiterten Funktionen und die verbesserte Leistung von Milvus 2.x nutzen.</p>
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
<li>Quelle Faiss</li>
<li>Ziel-Milvus: 2.x</li>
<li>Einzelheiten zur Installation finden Sie unter <a href="https://github.com/facebookresearch/faiss/blob/main/INSTALL.md">Installation von Faiss</a> und <a href="https://milvus.io/docs/install_standalone-docker.md">Installation von Milvus</a>.</li>
</ul></li>
<li><strong>Erforderliche Werkzeuge</strong>:<ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus-Migrationswerkzeug</a>. Einzelheiten zur Installation finden Sie unter <a href="/docs/de/v2.4.x/milvusdm_install.md">Migrationswerkzeug installieren</a>.</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration" class="common-anchor-header">Konfigurieren Sie die Migration<button data-href="#Configure-the-migration" class="anchor-icon" translate="no">
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
    </button></h2><p>Speichern Sie die Beispiel-Migrationskonfigurationsdatei unter <code translate="no">migration.yaml</code> und ändern Sie die Konfigurationen auf der Grundlage Ihrer tatsächlichen Bedingungen. Es steht Ihnen frei, die Konfigurationsdatei in einem beliebigen lokalen Verzeichnis abzulegen.</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: faiss    <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 2
<span class="hljs-built_in">source</span>: <span class="hljs-comment"># configs for the source Faiss index.</span>
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    faissFile: ./testfiles/faiss/faiss_ivf_flat.index

target: <span class="hljs-comment"># configs for the target Milvus collection.</span>
  create:
    collection:
      name: test1w
      shardsNums: 2
      dim: 256
      metricType: L2

  mode: remote
  remote:
    outputDir: testfiles/output/
    cloud: aws
    endpoint: 0.0.0.0:9000
    region: ap-southeast-1
    bucket: a-bucket
    ak: minioadmin
    sk: minioadmin
    useIAM: <span class="hljs-literal">false</span>
    useSSL: <span class="hljs-literal">false</span>
    checkBucket: <span class="hljs-literal">true</span>
  milvus2x:
    endpoint: localhost:19530
    username: xxxxx
    password: xxxxx

<button class="copy-code-btn"></button></code></pre>
<p>In der folgenden Tabelle werden die Parameter in der Beispielkonfigurationsdatei beschrieben. Eine vollständige Liste der Konfigurationsdateien finden Sie in <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference">Milvus Migration: Faiss zu Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>Die Gleichzeitigkeit der Dumper-Threads.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Der Betriebsmodus des Migrationsauftrags. Bei der Migration von Faiss-Indizes auf Faiss eingestellt.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Puffergröße, die in jedem Batch aus Faiss gelesen wird. Einheit: KB.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>Puffergröße für das Schreiben in Milvus in jedem Batch. Einheit: KB.</td></tr>
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
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>Gibt an, woher die Quelldateien gelesen werden. Gültige Werte:<br/>- <code translate="no">local</code>: liest Dateien von einer lokalen Festplatte.<br/>- <code translate="no">remote</code>: liest Dateien von einem entfernten Speicher.</td></tr>
<tr><td><code translate="no">source.local.faissFile</code></td><td>Der Verzeichnispfad, in dem sich die Quelldateien befinden. Zum Beispiel <code translate="no">/db/faiss.index</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.create.collection.name</code></td><td>Name der Milvus-Sammlung.</td></tr>
<tr><td><code translate="no">target.create.collection.shardsNums</code></td><td>Anzahl der Scherben, die in der Sammlung erstellt werden sollen. Weitere Informationen zu Shards finden Sie unter <a href="https://milvus.io/docs/glossary.md#Shard">Terminologie</a>.</td></tr>
<tr><td><code translate="no">target.create.collection.dim</code></td><td>Dimension des Vektorfeldes.</td></tr>
<tr><td><code translate="no">target.create.collection.metricType</code></td><td>Metrischer Typ, der zur Messung von Ähnlichkeiten zwischen Vektoren verwendet wird. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/glossary.md#Metric-type">Terminologie</a>.</td></tr>
<tr><td><code translate="no">target.mode</code></td><td>Speicherort für gedumpte Dateien. Gültige Werte:<br/>- <code translate="no">local</code>: Ausgelesene Dateien auf lokalen Festplatten speichern.<br/>- <code translate="no">remote</code>: Ausgelesene Dateien im Objektspeicher speichern.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Ausgabeverzeichnispfad im Cloud-Speicher-Bucket.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Anbieter des Cloud-Speicherdienstes. Beispielwerte: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.endpoint</code></td><td>Endpunkt des Milvus 2.x-Speichers.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Region des Cloud-Speichers. Es kann ein beliebiger Wert sein, wenn Sie lokales MinIO verwenden.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Bucket-Name für die Speicherung von Daten. Der Wert muss derselbe sein wie die Konfiguration in Milvus 2.x. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Systemkonfigurationen</a>.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Zugriffsschlüssel für Milvus 2.x-Speicher.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Geheimer Schlüssel für Milvus 2.x-Speicher.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Ob eine IAM-Rolle für die Verbindung verwendet werden soll.</td></tr>
<tr><td><code translate="no">target.remote.useSSL</code></td><td>Ob SSL bei der Verbindung zu Milvus 2.x aktiviert werden soll. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/tls.md#Encryption-in-Transit">Verschlüsselung bei der Übertragung</a>.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Ob geprüft werden soll, ob der angegebene Bucket im Objektspeicher vorhanden ist.</td></tr>
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
<p>Der obige Befehl konvertiert die Faiss-Indexdaten in NumPy-Dateien und verwendet dann den Vorgang <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a>, um die Daten in den Ziel-Bucket zu schreiben.</p></li>
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
