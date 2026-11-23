---
id: configure_access_logs.md
title: Zugriffsprotokolle konfigurieren
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
    </button></h1><p>Die Zugriffsprotokollfunktion in Milvus ermöglicht es Serveradministratoren, das Zugriffsverhalten der Benutzer aufzuzeichnen und zu analysieren, was dabei hilft, Aspekte wie die Erfolgsquote von Abfragen und die Gründe für Fehlschläge besser zu verstehen.</p>
<p>Diese Anleitung enthält detaillierte Anweisungen zur Konfiguration von Zugriffsprotokollen in Milvus.</p>
<p>Die Konfiguration der Zugriffsprotokolle hängt von der Installationsmethode von Milvus ab:</p>
<ul>
<li><strong>Helm-Installation</strong>: Konfigurieren Sie die Funktion unter „ <code translate="no">values.yaml</code> “. Weitere Informationen finden Sie unter <a href="/docs/de/configure-helm.md">„Milvus mit Helm-Charts konfigurieren</a>“.</li>
<li><strong>Docker-Installation</strong>: Konfigurieren Sie die Einstellungen unter „ <code translate="no">milvus.yaml</code> “. Weitere Informationen finden Sie unter <a href="/docs/de/configure-docker.md">„Milvus mit Docker Compose konfigurieren</a>“.</li>
<li><strong>Installation mit Operator</strong>: Passen Sie die Datei „ <code translate="no">spec.components</code> “ in der Konfigurationsdatei an. Weitere Informationen finden Sie unter <a href="/docs/de/configure_operator.md">„Milvus mit Milvus Operator konfigurieren</a>“.</li>
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
    </button></h2><p>Wählen Sie je nach Bedarf zwischen drei Konfigurationsoptionen:</p>
<ul>
<li><strong>Basiskonfiguration</strong>: Für allgemeine Zwecke.</li>
<li><strong>Konfiguration für lokale Zugriffsprotokolldateien</strong>: Zum lokalen Speichern von Protokollen.</li>
<li><strong>Konfiguration zum Hochladen lokaler Zugriffsprotokolle in MinIO</strong>: Für Cloud-Speicherung und Datensicherung.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">Basis-Konfiguration<button data-href="#Base-config" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei der Basiskonfiguration werden die Zugriffsprotokolle aktiviert und der Name der Protokolldatei festgelegt oder stdout verwendet.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is empty, logs will be printed to stdout.</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: Gibt an, ob die Zugriffsprotokollfunktion aktiviert werden soll. Der Standardwert ist <strong>„false</strong>“.</li>
<li><code translate="no">proxy.accessLog.filename</code>: Der Name der Zugriffsprotokolldatei. Wenn Sie diesen Parameter leer lassen, werden die Zugriffsprotokolle über stdout ausgegeben.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">Konfiguration für lokale Zugriffsprotokolldateien<button data-href="#Config-for-local-access-log-files" class="anchor-icon" translate="no">
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
    </button></h3><p>Konfigurieren Sie den lokalen Speicher für Zugriffsprotokolldateien mit Parametern wie dem lokalen Dateipfad, der Dateigröße und dem Rotationsintervall:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Diese Parameter werden angegeben, wenn „ <code translate="no">filename</code> “ nicht leer ist.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: Der lokale Dateipfad, unter dem die Zugriffsprotokolldatei gespeichert wird. Standardwert ist „ <code translate="no">/tmp/milvus_access</code> “.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: Die maximal zulässige Größe in MB für eine einzelne Zugriffsprotokolldatei. Erreicht die Protokolldatei diese Grenze, wird ein Rotationsvorgang ausgelöst. Dieser Vorgang versiegelt die aktuelle Zugriffsprotokolldatei, erstellt eine neue Protokolldatei und löscht den Inhalt der ursprünglichen Protokolldatei. Der Standardwert ist <strong>64</strong>.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: Das maximal zulässige Zeitintervall in Sekunden für die Rotation einer einzelnen Zugriffsprotokolldatei. Bei Erreichen des angegebenen Zeitintervalls wird ein Rotationsvorgang ausgelöst, der zur Erstellung einer neuen Zugriffsprotokolldatei und zur Sperrung der vorherigen führt. Standardwert ist <strong>0</strong>.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: Die maximale Anzahl an versiegelten Zugriffsprotokolldateien, die aufbewahrt werden dürfen. Wenn die Anzahl der versiegelten Zugriffsprotokolldateien diese Grenze überschreitet, wird die älteste davon gelöscht. Standardwert ist <strong>8</strong>.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">Konfiguration für das Hochladen lokaler Zugriffsprotokolldateien auf MinIO<button data-href="#Config-for-uploading-local-access-log-files-to-MinIO" class="anchor-icon" translate="no">
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
    </button></h3><p>Aktivieren und konfigurieren Sie die Einstellungen zum Hochladen lokaler Zugriffsprotokolldateien auf MinIO:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span>
    <span class="hljs-attr">minioEnable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">remotePath:</span> <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    <span class="hljs-attr">remoteMaxTime:</span> <span class="hljs-number">0</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Stellen Sie bei der Konfiguration der MinIO-Parameter sicher, dass Sie entweder „ <code translate="no">maxSize</code> “ oder „ <code translate="no">rotatedTime</code> “ festgelegt haben. Andernfalls kann es zu Fehlern beim Hochladen lokaler Zugriffsprotokolldateien nach MinIO kommen.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: Gibt an, ob lokale Zugriffsprotokolldateien auf MinIO hochgeladen werden sollen. Standardwert ist <strong>„false</strong>“.</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: Der Pfad zum Objektspeicher für das Hochladen von Zugriffsprotokolldateien. Standardwert ist „ <code translate="no">access_log/</code> “.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: Das zulässige Zeitintervall für das Hochladen von Zugriffsprotokolldateien. Wenn die Upload-Zeit einer Protokolldatei dieses Intervall überschreitet, wird die Datei gelöscht. Durch Setzen des Werts auf 0 wird diese Funktion deaktiviert. Standardwert ist <strong>0</strong>.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">Formatter-Konfiguration<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>Das für alle Methoden verwendete Standardprotokollformat ist das Format „ <code translate="no">base</code> “, das keine spezifischen Methodenzuordnungen erfordert. Wenn Sie jedoch die Protokollausgabe für bestimmte Methoden anpassen möchten, können Sie ein benutzerdefiniertes Protokollformat definieren und es auf die zugehörigen Methoden anwenden.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    <span class="hljs-attr">formatters:</span>
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      <span class="hljs-attr">base:</span> 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_name-$method_status-$error_code [traceID: $trace_id] [timeCost: $time_cost]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      <span class="hljs-attr">query:</span> 
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_status-$method_name [traceID: $trace_id] [timeCost: $time_cost] [database: $database_name] [collection: $collection_name] [partitions: $partition_name] [expr: $method_expr]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        <span class="hljs-attr">methods:</span> [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.format</code>: Definiert das Protokollformat mit dynamischen Metriken. Weitere Informationen finden Sie unter <a href="#reference-supported-metrics">„Unterstützte Metriken</a>“.</li>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.methods</code>: Listet die Milvus-Operationen auf, die diesen Formatierer verwenden. Die Methodennamen finden Sie unter <strong>„MilvusService“</strong> in <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">den Milvus-Methoden</a>.</li>
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
<tr><th>Metrikname</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>Name der Methode</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>Zugriffsstatus: <strong>OK</strong> oder <strong>Fehlgeschlagen</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>Für Abfrage-, Such- oder Löschvorgänge verwendeter Ausdruck</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>Dem Zugriff zugeordnete Trace-ID</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>IP-Adresse des Benutzers</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>Name des Benutzers</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>Größe der Antwortdaten</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Milvus-spezifischer Fehlercode</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>Detaillierte Fehlermeldung</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>Name der Ziel-Milvus-Datenbank</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>Name der Milvus-Zielsammlung</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>Name(n) der Milvus-Zielpartition(en)</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>Dauer des Zugriffs</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>Zeitpunkt, zu dem das Zugriffsprotokoll ausgegeben wird (entspricht in der Regel ` <code translate="no">$time_end</code>`)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>Zeitpunkt, zu dem der Zugriff beginnt</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>Zeitpunkt, zu dem der Zugriff endet</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>Vom Benutzer verwendete Version des Milvus-SDK</td></tr>
<tr><td><code translate="no">$error_type</code></td><td>Art des Fehlers: <strong>system_error</strong> oder <strong>input_error</strong></td></tr>
<tr><td><code translate="no">$output_fields</code></td><td>Ausgabefelder der Anfrage</td></tr>
<tr><td><code translate="no">$cluster_prefix</code></td><td>Eingestelltes Cluster-Präfix <code translate="no">msgChannel.chanNamePrefix.cluster</code></td></tr>
<tr><td><code translate="no">$consistency_level</code></td><td>Konsistenzstufe der Anfrage</td></tr>
<tr><td><code translate="no">$anns_field</code></td><td>Vektorfeld einer Such- oder Hybrid-Suchanfrage</td></tr>
<tr><td><code translate="no">$nq</code></td><td>Anzahl der Abfragevektoren einer Such- oder Hybrid-Suchanfrage</td></tr>
<tr><td><code translate="no">$search_params</code></td><td>Suchparameter einer Such- oder Hybridsuchanfrage</td></tr>
<tr><td><code translate="no">$query_params</code></td><td>Abfrageparameter einer Abfrageanforderung</td></tr>
<tr><td><code translate="no">$client_request_time</code></td><td>Anfragezeit, die der Client in den gRPC-Metadaten festlegt</td></tr>
<tr><td><code translate="no">$template_value_length</code></td><td>Länge jedes Ausdrucksvorlagenwerts</td></tr>
<tr><td><code translate="no">$partial_update</code></td><td>Ob es sich bei einer Upsert-Anfrage um eine Teilaktualisierung handelt</td></tr>
</tbody>
</table>
