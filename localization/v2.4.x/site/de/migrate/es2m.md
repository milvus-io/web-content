---
id: es2m.md
summary: >-
  Diese Anleitung bietet einen umfassenden, schrittweisen Prozess für die
  Migration von Daten von Elasticsearch zu Milvus 2.x.
title: Von Elasticsearch
---
<h1 id="From-Elasticsearch" class="common-anchor-header">Von Elasticsearch<button data-href="#From-Elasticsearch" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieser Leitfaden bietet einen umfassenden, schrittweisen Prozess für die Migration von Daten von Elasticsearch zu Milvus 2.x. Wenn Sie diesen Leitfaden befolgen, können Sie Ihre Daten effizient übertragen und dabei die erweiterten Funktionen und die verbesserte Leistung von Milvus 2.x nutzen.</p>
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
<li>Quelle Elasticsearch: 7.x oder 8.x</li>
<li>Ziel Milvus: 2.x</li>
<li>Einzelheiten zur Installation finden Sie unter <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html">Installation von Elasticsearch</a> und <a href="https://milvus.io/docs/install_standalone-docker.md">Installation von Milvus</a>.</li>
</ul></li>
<li><strong>Erforderliche Werkzeuge</strong>:<ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus-Migrationswerkzeug</a>. Einzelheiten zur Installation finden Sie unter <a href="/docs/de/v2.4.x/milvusdm_install.md">Migrationswerkzeug installieren</a>.</li>
</ul></li>
<li><strong>Unterstützte Datentypen für die Migration</strong>: Die aus dem Elasticsearch-Quellindex zu migrierenden Felder sind von folgenden Typen: <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">keyword</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">text</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>. Datentypen, die hier nicht aufgeführt sind, werden derzeit für die Migration nicht unterstützt. Detaillierte Informationen zu Datenmappings zwischen Milvus-Sammlungen und Elasticsearch-Indizes finden Sie in der <a href="#field-mapping-reference">Field mapping reference</a>.</li>
<li><strong>Anforderungen an den Elasticsearch-Index</strong>:<ul>
<li>Der Quell-Elasticsearch-Index muss ein Vektorfeld vom Typ <code translate="no">dense_vector</code> enthalten. Ohne ein Vektorfeld kann die Migration nicht gestartet werden.</li>
</ul></li>
</ul>
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
    </button></h2><p>Speichern Sie die Beispiel-Migrationskonfigurationsdatei unter <code translate="no">migration.yaml</code> und ändern Sie die Konfigurationen auf der Grundlage Ihrer tatsächlichen Bedingungen. Es steht Ihnen frei, die Konfigurationsdatei in einem beliebigen lokalen Verzeichnis abzulegen.</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    workMode: <span class="hljs-string">&quot;elasticsearch&quot;</span> <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: <span class="hljs-number">2500</span> <span class="hljs-comment"># buffer size to read from Elasticsearch in each batch. A value ranging from 2000 to 4000 is recommended.</span>
meta: <span class="hljs-comment"># meta configs for the source Elasticsearch index and target Milvus 2.x collection.</span>
  mode: <span class="hljs-string">&quot;config&quot;</span> <span class="hljs-comment"># specifies the source for meta configs. currently, onlly `config` is supported.</span>
  version: <span class="hljs-string">&quot;8.9.1&quot;</span>
  index: <span class="hljs-string">&quot;qatest_index&quot;</span> <span class="hljs-comment"># identifies the Elasticsearch index to migrate data from.</span>
  fields: <span class="hljs-comment"># fields within the Elasticsearch index to be migrated.</span>
  - name: <span class="hljs-string">&quot;my_vector&quot;</span> <span class="hljs-comment"># name of the Elasticsearch field.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;dense_vector&quot;</span> <span class="hljs-comment"># data type of the Elasticsearch field.</span>
    dims: <span class="hljs-number">128</span> <span class="hljs-comment"># dimension of the vector field. required only when `type` is `dense_vector`.</span>
  - name: <span class="hljs-string">&quot;id&quot;</span>
    pk: true <span class="hljs-comment"># specifies if the field serves as a primary key.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;long&quot;</span>
  - name: <span class="hljs-string">&quot;num&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;integer&quot;</span>
  - name: <span class="hljs-string">&quot;double1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;double&quot;</span>
  - name: <span class="hljs-string">&quot;text1&quot;</span>
    maxLen: <span class="hljs-number">1000</span> <span class="hljs-comment"># max. length of data fields. required only for `keyword` and `text` data types.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;text&quot;</span>
  - name: <span class="hljs-string">&quot;bl1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;boolean&quot;</span>
  - name: <span class="hljs-string">&quot;float1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;float&quot;</span>
  milvus: <span class="hljs-comment"># configs specific to creating the collection in Milvus 2.x</span>
    collection: <span class="hljs-string">&quot;Collection_01&quot;</span> <span class="hljs-comment"># name of the Milvus collection. defaults to the Elasticsearch index name if not specified.</span>
    closeDynamicField: false <span class="hljs-comment"># specifies whether to disable the dynamic field in the collection. defaults to `false`.</span>
    shardNum: <span class="hljs-number">2</span> <span class="hljs-comment"># number of shards to be created in the collection.</span>
    consistencyLevel: Strong <span class="hljs-comment"># consistency level for Milvus collection.</span>
source: <span class="hljs-comment"># connection configs for the source Elasticsearch server</span>
  es:
    urls:
    - <span class="hljs-string">&quot;http://10.15.1.***:9200&quot;</span> <span class="hljs-comment"># address of the source Elasticsearch server.</span>
    username: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># username for the Elasticsearch server.</span>
    password: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># password for the Elasticsearch server.</span>
target:
  mode: <span class="hljs-string">&quot;remote&quot;</span> <span class="hljs-comment"># storage location for dumped files. valid values: `remote` and `local`.</span>
  remote: <span class="hljs-comment"># configs for remote storage</span>
    outputDir: <span class="hljs-string">&quot;migration/milvus/test&quot;</span> <span class="hljs-comment"># output directory path in the cloud storage bucket.</span>
    cloud: <span class="hljs-string">&quot;aws&quot;</span> <span class="hljs-comment"># cloud storage service provider. Examples: `aws`, `gcp`, `azure`, etc.</span>
    region: <span class="hljs-string">&quot;us-west-2&quot;</span> <span class="hljs-comment"># region of the cloud storage; can be any value if using local Minio.</span>
    bucket: <span class="hljs-string">&quot;zilliz-aws-us-****-*-********&quot;</span> <span class="hljs-comment"># bucket name for storing data; must align with configs in milvus.yaml for Milvus 2.x.</span>
    useIAM: true <span class="hljs-comment"># whether to use an IAM Role for connection.</span>
    checkBucket: false <span class="hljs-comment"># checks if the specified bucket exists in the storage.</span>
  milvus2x: <span class="hljs-comment"># connection configs for the target Milvus 2.x server</span>
    endpoint: <span class="hljs-string">&quot;http://10.102.*.**:19530&quot;</span> <span class="hljs-comment"># address of the target Milvus server.</span>
    username: <span class="hljs-string">&quot;****&quot;</span> <span class="hljs-comment"># username for the Milvus 2.x server.</span>
    password: <span class="hljs-string">&quot;******&quot;</span> <span class="hljs-comment"># password for the Milvus 2.x server.</span>
<button class="copy-code-btn"></button></code></pre>
<p>In der folgenden Tabelle werden die Parameter in der Beispielkonfigurationsdatei beschrieben. Eine vollständige Liste der Konfigurationen finden Sie in <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference">Milvus Migration: Elasticsearch zu Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Der Betriebsmodus des Migrationsauftrags. Bei der Migration von Elasticsearch-Indizes auf <code translate="no">elasticsearch</code> setzen.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Puffergröße, die in jedem Batch aus Elasticsearch gelesen wird. Einheit: KB.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Gibt die Quelle für Meta-Konfigurationen an. Derzeit wird nur <code translate="no">config</code> unterstützt.</td></tr>
<tr><td><code translate="no">meta.index</code></td><td>Identifiziert den Elasticsearch-Index, aus dem Daten migriert werden sollen.</td></tr>
<tr><td><code translate="no">meta.fields</code></td><td>Felder innerhalb des zu migrierenden Elasticsearch-Index.</td></tr>
<tr><td><code translate="no">meta.fields.name</code></td><td>Name des Elasticsearch-Feldes.</td></tr>
<tr><td><code translate="no">meta.fields.maxLen</code></td><td>Maximale Länge des Feldes. Dieser Parameter ist nur erforderlich, wenn <code translate="no">meta.fields.type</code> <code translate="no">keyword</code> oder <code translate="no">text</code> ist.</td></tr>
<tr><td><code translate="no">meta.fields.pk</code></td><td>Gibt an, ob das Feld als Primärschlüssel dient.</td></tr>
<tr><td><code translate="no">meta.fields.type</code></td><td>Datentyp des Elasticsearch-Feldes. Derzeit werden die folgenden Datentypen in Elasticsearch unterstützt: <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">keyword</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">text</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>.</td></tr>
<tr><td><code translate="no">meta.fields.dims</code></td><td>Dimension des Vektorfeldes. Dieser Parameter ist nur erforderlich, wenn <code translate="no">meta.fields.type</code> <code translate="no">dense_vector</code> ist.</td></tr>
<tr><td><code translate="no">meta.milvus</code></td><td>Spezielle Konfigurationen für die Erstellung der Sammlung in Milvus 2.x.</td></tr>
<tr><td><code translate="no">meta.milvus.collection</code></td><td>Name der Milvus-Sammlung. Der Standardwert ist der Elasticsearch-Indexname, wenn er nicht angegeben wird.</td></tr>
<tr><td><code translate="no">meta.milvus.closeDynamicField</code></td><td>Gibt an, ob das dynamische Feld in der Sammlung deaktiviert werden soll. Die Voreinstellung ist <code translate="no">false</code>. Weitere Informationen zu dynamischen Feldern finden Sie unter <a href="https://milvus.io/docs/enable-dynamic-field.md#Enable-Dynamic-Field">Dynamisches Feld aktivieren</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.shardNum</code></td><td>Anzahl der Shards, die in der Sammlung erstellt werden sollen. Weitere Informationen zu Shards finden Sie unter <a href="https://milvus.io/docs/glossary.md#Shard">Terminologie</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.consistencyLevel</code></td><td>Konsistenzstufe für die Sammlung in Milvus. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/consistency.md">Konsistenz</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.es</code></td><td>Verbindungskonfigurationen für den Elasticsearch-Quellserver.</td></tr>
<tr><td><code translate="no">source.es.urls</code></td><td>Adresse des Elasticsearch-Quellservers.</td></tr>
<tr><td><code translate="no">source.es.username</code></td><td>Benutzername für den Elasticsearch-Server.</td></tr>
<tr><td><code translate="no">source.es.password</code></td><td>Passwort für den Elasticsearch-Server.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>Speicherort für Dumpdateien. Gültige Werte:<br/>- <code translate="no">local</code>: Ausgelesene Dateien auf lokalen Festplatten speichern.<br/>- <code translate="no">remote</code>: Ausgelesene Dateien auf Objektspeicher speichern.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Ausgabeverzeichnispfad im Cloud-Speicher-Bucket.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Anbieter des Cloud-Speicherdienstes. Beispielwerte: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Cloud-Speicher-Region. Kann ein beliebiger Wert sein, wenn Sie lokales MinIO verwenden.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Bucket-Name für die Speicherung von Daten. Der Wert muss derselbe sein wie die Konfiguration in Milvus 2.x. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Systemkonfigurationen</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Ob eine IAM-Rolle für die Verbindung verwendet werden soll.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Ob geprüft werden soll, ob der angegebene Bucket im Objektspeicher existiert.</td></tr>
<tr><td><code translate="no">target.milvus2x</code></td><td>Verbindungskonfigurationen für den Milvus 2.x-Zielserver.</td></tr>
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
    </button></h2><p>Starten Sie die Migrationsaufgabe mit dem folgenden Befehl. Ersetzen Sie <code translate="no">{YourConfigFilePath}</code> durch das lokale Verzeichnis, in dem sich die Konfigurationsdatei <code translate="no">migration.yaml</code> befindet.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Nachfolgend sehen Sie ein Beispiel für eine erfolgreiche Migrationsprotokollausgabe:</p>
<pre><code translate="no" class="language-bash">[task/load_base_task.go:94] [<span class="hljs-string">&quot;[LoadTasker] Dec Task Processing--------------&gt;&quot;</span>] [Count=0] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[task/load_base_task.go:76] [<span class="hljs-string">&quot;[LoadTasker] Progress Task ---------------&gt;&quot;</span>] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[dbclient/cus_field_milvus2x.go:86] [<span class="hljs-string">&quot;[Milvus2x] begin to ShowCollectionRows&quot;</span>]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static: &quot;</span>] [collection=test_mul_field4_rename1] [beforeCount=50000] [afterCount=100000] [increase=50000]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static Total&quot;</span>] [<span class="hljs-string">&quot;Total Collections&quot;</span>=1] [beforeTotalCount=50000] [afterTotalCount=100000] [totalIncrease=50000]
[migration/es_starter.go:25] [<span class="hljs-string">&quot;[Starter] migration ES to Milvus finish!!!&quot;</span>] [Cost=80.009174459]
[starter/starter.go:106] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=80.00928425]
[cleaner/remote_cleaner.go:27] [<span class="hljs-string">&quot;[Remote Cleaner] Begin to clean files&quot;</span>] [bucket=a-bucket] [rootPath=testfiles/output/zwh/migration]
[cmd/start.go:32] [<span class="hljs-string">&quot;[Cleaner] clean file success!&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
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
<h2 id="Field-mapping-reference" class="common-anchor-header">Referenz zur Feldzuordnung<button data-href="#Field-mapping-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>Lesen Sie die folgende Tabelle, um zu verstehen, wie Feldtypen in Elasticsearch-Indizes auf Feldtypen in Milvus-Sammlungen abgebildet werden.</p>
<p>Für weitere Informationen über unterstützte Datentypen in Milvus, siehe <a href="https://milvus.io/docs/schema.md#Supported-data-types">Unterstützte Datentypen</a>.</p>
<table>
<thead>
<tr><th>Elasticsearch Feldtyp</th><th>Milvus Feldtyp</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td>dichter_vektor</td><td>FloatVector</td><td>Die Dimensionen des Vektors bleiben während der Migration unverändert.</td></tr>
<tr><td>Schlüsselwort</td><td>VarChar</td><td>Legt die maximale Länge fest (1 bis 65.535). Strings, die diese Grenze überschreiten, können Migrationsfehler auslösen.</td></tr>
<tr><td>text</td><td>VarChar</td><td>Legen Sie die maximale Länge fest (1 bis 65.535). Zeichenketten, die den Grenzwert überschreiten, können Migrationsfehler auslösen.</td></tr>
<tr><td>lang</td><td>Int64</td><td>-</td></tr>
<tr><td>Ganzzahl</td><td>Int32</td><td>-</td></tr>
<tr><td>double</td><td>Doppelt</td><td>-</td></tr>
<tr><td>Float</td><td>Float</td><td>-</td></tr>
<tr><td>boolean</td><td>Bool</td><td>-</td></tr>
<tr><td>Objekt</td><td>JSON</td><td>-</td></tr>
</tbody>
</table>
