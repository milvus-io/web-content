---
id: configure_access_logs.md
title: Zugriffsprotokolle konfigurieren
summary: ''
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">Zugriffsprotokolle konfigurieren<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>Die Zugriffsprotokollfunktion in Milvus ermöglicht es Servermanagern, das Zugriffsverhalten der Benutzer aufzuzeichnen und zu analysieren, um Aspekte wie die Erfolgsrate von Abfragen und die Gründe für Fehler zu verstehen.</p>
<p>Dieser Leitfaden enthält detaillierte Anweisungen zur Konfiguration von Zugriffsprotokollen in Milvus.</p>
<p>Die Konfiguration der Zugriffsprotokolle hängt von der Installationsmethode von Milvus ab:</p>
<ul>
<li><strong>Helm-Installation</strong>: Konfigurieren Sie unter <code translate="no">values.yaml</code>. Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/configure-helm.md">Konfigurieren von Milvus mit Helm Charts</a>.</li>
<li><strong>Docker-Installation</strong>: Konfigurieren Sie unter <code translate="no">milvus.yaml</code>. Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/configure-docker.md">Konfigurieren von Milvus mit Docker Compose</a>.</li>
<li><strong>Operator-Installation</strong>: Ändern Sie <code translate="no">spec.components</code> in der Konfigurationsdatei. Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/configure_operator.md">Konfigurieren von Milvus mit Milvus Operator</a>.</li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Konfigurationsoptionen<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>Wählen Sie je nach Ihren Bedürfnissen zwischen drei Konfigurationsoptionen:</p>
<ul>
<li><strong>Basiskonfiguration</strong>: Für allgemeine Zwecke.</li>
<li><strong>Konfiguration für lokale Zugriffsprotokolldateien</strong>: Für die lokale Speicherung von Protokollen.</li>
<li><strong>Konfiguration für das Hochladen lokaler Zugriffsprotokolle zu MinIO</strong>: Für die Speicherung und Sicherung in der Cloud.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">Basis-Konfiguration</h3><p>Die Basiskonfiguration umfasst die Aktivierung von Zugriffsprotokollen und die Definition des Dateinamens für das Protokoll oder die Verwendung von stdout.</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is emtpy, logs will be printed to stdout.</span>
    filename: <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: Ob die Zugriffsprotokollfunktion aktiviert werden soll. Die Voreinstellung ist <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.filename</code>: Der Name der Zugriffsprotokolldatei. Wenn Sie diesen Parameter leer lassen, werden die Zugriffsprotokolle auf stdout ausgegeben.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">Config für lokale Zugriffsprotokolldateien</h3><p>Konfigurieren Sie die lokale Speicherung für Zugriffsprotokolldateien mit Parametern wie dem lokalen Dateipfad, der Dateigröße und dem Rotationsintervall:</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    enable: true
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    maxSize: <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    rotatedTime: <span class="hljs-number">24</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    maxBackups: <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Diese Parameter werden angegeben, wenn <code translate="no">filename</code> nicht leer ist.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: Der lokale Dateipfad, in dem die Zugriffsprotokolldatei gespeichert wird.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: Die maximal zulässige Größe in MB für eine einzelne Zugriffsprotokolldatei. Wenn die Größe der Protokolldatei diese Grenze erreicht, wird ein Rotationsprozess ausgelöst. Dieser Prozess versiegelt die aktuelle Zugriffsprotokolldatei, erstellt eine neue Protokolldatei und löscht den Inhalt der ursprünglichen Protokolldatei.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: Das maximale Zeitintervall in Sekunden, das für die Rotation einer einzelnen Zugriffsprotokolldatei zulässig ist. Bei Erreichen des angegebenen Zeitintervalls wird ein Rotationsprozess ausgelöst, der zur Erstellung einer neuen Zugriffsprotokolldatei und zur Versiegelung der vorherigen Datei führt.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: Die maximale Anzahl der versiegelten Zugriffsprotokolldateien, die aufbewahrt werden können. Wenn die Anzahl der versiegelten Zugriffsprotokolldateien diese Grenze überschreitet, wird die älteste Datei gelöscht.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">Konfiguration für das Hochladen lokaler Zugriffsprotokolldateien zu MinIO</h3><p>Aktivieren und konfigurieren Sie die Einstellungen zum Hochladen lokaler Zugriffsprotokolldateien zu MinIO:</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    maxSize: 500
    rotatedTime: 24 
    maxBackups: 7
    minioEnable: <span class="hljs-literal">true</span>
    remotePath: <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    remoteMaxTime: 0
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Stellen Sie bei der Konfiguration der MinIO-Parameter sicher, dass Sie entweder <code translate="no">maxSize</code> oder <code translate="no">rotatedTime</code> eingestellt haben. Andernfalls kann der Upload lokaler Zugriffsprotokolldateien zu MinIO fehlschlagen.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: Ob lokale Zugriffsprotokolldateien zu MinIO hochgeladen werden sollen. Die Voreinstellung ist <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: Der Pfad des Objektspeichers für das Hochladen von Zugriffsprotokolldateien.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: Das zulässige Zeitintervall für das Hochladen von Zugriffsprotokolldateien. Wenn die Hochladezeit einer Protokolldatei dieses Intervall überschreitet, wird die Datei gelöscht. Wird der Wert auf 0 gesetzt, wird diese Funktion deaktiviert.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">Formatierungskonfiguration<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Standardprotokollformat, das für alle Methoden verwendet wird, ist das Format <code translate="no">base</code>, das keine spezifischen Methodenzuordnungen erfordert. Wenn Sie jedoch die Protokollausgabe für bestimmte Methoden anpassen möchten, können Sie ein benutzerdefiniertes Protokollformat definieren und es auf die zugehörigen Methoden anwenden.</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    formatters:
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      base: 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_name</span>-<span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$error_code</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      query: 
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$method_name</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>] [database: <span class="hljs-variable">$database_name</span>] [collection: <span class="hljs-variable">$collection_name</span>] [partitions: <span class="hljs-variable">$partition_name</span>] [expr: <span class="hljs-variable">$method_expr</span>]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        methods: [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.format</code>: Definiert das Protokollformat mit dynamischen Metriken. Weitere Informationen finden Sie unter <a href="#reference-supported-metrics">Unterstützte Metriken</a>.</li>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.methods</code>: Listet die Milvus-Operationen auf, die diesen Formatierer verwenden. Um Methodennamen zu erhalten, siehe <strong>MilvusService</strong> in <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Milvus-Methoden</a>.</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">Referenz: Unterstützte Metriken<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Metrik Name</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>Name der Methode</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>Status des Zugriffs: <strong>OK</strong> oder <strong>Fehlgeschlagen</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>Für Abfrage-, Such- oder Löschvorgänge verwendeter Ausdruck</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>Mit dem Zugriff verbundene TraceID</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>IP-Adresse des Benutzers</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>Name des Benutzers</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>Größe der Antwortdaten</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Fehlercode speziell für Milvus</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>Detaillierte Fehlermeldung</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>Name der Milvus-Zieldatenbank</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>Name der Milvus-Zielsammlung</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>Name oder Namen der Milvus-Zielpartition(en)</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>Zeit, die für die Beendigung des Zugriffs benötigt wurde</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>Zeitpunkt, zu dem das Zugriffsprotokoll gedruckt wird (entspricht in der Regel <code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>Uhrzeit, zu der der Zugriff beginnt</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>Uhrzeit, zu der der Zugriff endet</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>Version des vom Benutzer verwendeten Milvus-SDK</td></tr>
</tbody>
</table>
