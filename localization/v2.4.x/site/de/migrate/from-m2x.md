---
id: from-m2x.md
summary: >-
  Dieser Leitfaden bietet einen umfassenden, schrittweisen Prozess für die
  Migration von Daten von Milvus 2.3.x zu Milvus 2.3.x oder höher.
title: Von Milvus 2.3.x
---
<h1 id="From-Milvus-23x" class="common-anchor-header">Von Milvus 2.3.x<button data-href="#From-Milvus-23x" class="anchor-icon" translate="no">
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
    </button></h1><p>Diese Anleitung bietet einen umfassenden, schrittweisen Prozess für die Migration von Daten von Milvus 2.3.x nach Milvus 2.3.x oder höher.</p>
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
<li>Quell-Milvus: 2.3.0+ (Das Tool verwendet den Iterator, um Daten aus der Quellensammlung zu holen, weshalb die Quell-Milvus-Version 2.3.0 oder höher sein muss).</li>
<li>Ziel-Milvus: 2.3.0+</li>
</ul></li>
<li><strong>Erforderliche Werkzeuge</strong>:<ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus-Migrationswerkzeug</a>. Einzelheiten zur Installation finden Sie unter <a href="/docs/de/v2.4.x/milvusdm_install.md">Migrationswerkzeug installieren</a>.</li>
</ul></li>
<li><strong>Vorbereitung der Daten</strong>:<ul>
<li>Stellen Sie sicher, dass die Milvus-Quellensammlung geladen und für den Datenexport bereit ist.</li>
<li>Wenn die Ziel-Milvus-Sammlung keine Sammlung enthält, die der Quell-Sammlung entspricht, wird sie vom <a href="https://github.com/zilliztech/milvus-migration">Milvus-Migrationswerkzeug</a> automatisch erstellt. Beachten Sie, dass die Zielsammlung nach der Migration nicht indiziert wird und Sie die Sammlung anschließend manuell indizieren müssen.</li>
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
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    workMode: milvus2x
    reader:
      bufferSize: 500

meta:
  mode: config
  version: 2.3.0
  collection: src_table_name

<span class="hljs-built_in">source</span>:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx

target:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx
<button class="copy-code-btn"></button></code></pre>
<p>In der folgenden Tabelle werden die Parameter in der Beispielkonfigurationsdatei beschrieben. Weitere Informationen finden Sie in <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus Migration: Milvus2.x zu Milvus2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Der Betriebsmodus des Migrationsauftrags. Setzen Sie ihn auf milvus2x, wenn Sie von Milvus 2.x migrieren.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Puffergröße, die in jedem Batch aus Milvus 2.x gelesen wird.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Gibt an, woher die Metadatei gelesen wird. Wird auf config gesetzt, bedeutet dies, dass die Metakonfiguration aus dieser migration.yaml-Datei bezogen werden kann.</td></tr>
<tr><td><code translate="no">meta.version</code></td><td>Quell-Milvus-Version. Festgelegt auf 2.3.0 oder höher.</td></tr>
<tr><td><code translate="no">meta.collection</code></td><td>Name der Quellensammlung.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.milvus2x.endpoint</code></td><td>Adresse des Milvus-Quellservers.</td></tr>
<tr><td><code translate="no">source.milvus2x.username</code></td><td>Benutzername für den Milvus-Quellserver. Dieser Parameter ist erforderlich, wenn die Benutzerauthentifizierung für Ihren Milvus-Server aktiviert ist. Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/authenticate.md">Aktivieren der Authentifizierung</a>.</td></tr>
<tr><td><code translate="no">source.milvus2x.password</code></td><td>Passwort für den Milvus-Quellserver. Dieser Parameter ist erforderlich, wenn die Benutzerauthentifizierung für Ihren Milvus-Server aktiviert ist. Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/authenticate.md">Aktivieren der Authentifizierung</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Adresse des Ziel-Milvus-Servers.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Benutzername für den Milvus-Zielserver. Dieser Parameter ist erforderlich, wenn die Benutzerauthentifizierung für Ihren Milvus-Server aktiviert ist. Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/authenticate.md">Aktivieren der Authentifizierung</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Passwort für den Milvus-Zielserver. Dieser Parameter ist erforderlich, wenn die Benutzerauthentifizierung für Ihren Milvus-Server aktiviert ist. Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/authenticate.md">Aktivieren der Authentifizierung</a>.</td></tr>
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
    </button></h2><p>Sie haben zwei Möglichkeiten, die Migrationsaufgabe zu starten - über CLI oder über API-Anfragen. Wählen Sie die Option, die Ihren Anforderungen am besten entspricht.</p>
<h3 id="Option-1-Using-CLI" class="common-anchor-header">Option 1: Verwendung von CLI</h3><p>Starten Sie die Migrationsaufgabe mit dem folgenden Befehl. Ersetzen Sie <code translate="no">{YourConfigFilePath}</code> durch das lokale Verzeichnis, in dem sich die Konfigurationsdatei <code translate="no">migration.yaml</code> befindet.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Überwachen Sie die Protokolle auf Fortschrittsaktualisierungen. Erfolgreiche Migrationsprotokolle sollten Einträge wie diesen enthalten:</p>
<pre><code translate="no" class="language-bash">[INFO] [migration/milvus2x_starter.go:79] [<span class="hljs-string">&quot;=================&gt;JobProcess!&quot;</span>] [Percent=100]
[INFO] [migration/milvus2x_starter.go:27] [<span class="hljs-string">&quot;[Starter] migration Milvus2x to Milvus2x finish!!!&quot;</span>] [Cost=94.877717375]
[INFO] [starter/starter.go:109] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=94.878243583]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Making-API-requests" class="common-anchor-header">Option 2: API-Anforderungen stellen</h3><p>Sie können auch die Restful-API verwenden, um die Migration durchzuführen. Starten Sie den API-Server mit:</p>
<pre><code translate="no" class="language-bash">./milvus-migration server run -p 8080
<button class="copy-code-btn"></button></code></pre>
<p>Sobald der Server erfolgreich gestartet ist, legen Sie die Datei <code translate="no">migration.yaml</code> im Verzeichnis <code translate="no">configs/</code> des Projekts ab und starten Sie die Migration mit:</p>
<pre><code translate="no" class="language-bash">curl -XPOST http://localhost:8080/api/v1/start
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
    </button></h2><p>Nachdem die Migration abgeschlossen ist, können Sie mit Attu die Anzahl der migrierten Entitäten anzeigen. Außerdem können Sie in Attu Indizes erstellen und Sammlungen laden. Weitere Informationen finden Sie unter <a href="https://github.com/zilliztech/attu">Attu</a> und <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
<h2 id="Additional-configuration-options" class="common-anchor-header">Zusätzliche Konfigurationsoptionen<button data-href="#Additional-configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>Zusätzlich zu den oben erwähnten Basiskonfigurationen können Sie weitere Einstellungen auf der Grundlage Ihrer spezifischen Anforderungen hinzufügen.</p>
<ul>
<li><p><strong>Selektive Feldmigration</strong>: Wenn Sie nicht alle Felder, sondern nur bestimmte Felder in einer Sammlung migrieren möchten, geben Sie die zu migrierenden Felder im Abschnitt <code translate="no">meta</code> der Datei <code translate="no">migration.yaml</code> an.</p>
<pre><code translate="no" class="language-yaml">meta:
  fields:
    - name: <span class="hljs-built_in">id</span>
    - name: title_vector
    - name: reading_time
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Benutzerdefinierte Zielsammlung</strong>: Um die Eigenschaften der Zielsammlung anzupassen, fügen Sie die entsprechenden Konfigurationen im Abschnitt <code translate="no">meta</code> der Datei <code translate="no">migration.yaml</code> hinzu.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">meta</span>:
  <span class="hljs-attr">milvus</span>:
    <span class="hljs-attr">collection</span>: target_collection_name
    <span class="hljs-attr">shardNum</span>: <span class="hljs-number">2</span>
    <span class="hljs-attr">closeDynamicField</span>: <span class="hljs-literal">false</span>
    <span class="hljs-attr">consistencyLevel</span>: <span class="hljs-title class_">Customized</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Ausführliche Informationen finden Sie unter <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus-Migration: Milvus2.x zu Milvus2.x</a>.</p>
