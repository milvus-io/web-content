---
id: configure_access_logs.md
title: Configurazione dei registri di accesso
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">Configurazione dei registri di accesso<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>La funzionalità dei registri di accesso in Milvus consente agli amministratori del server di registrare e analizzare il comportamento di accesso degli utenti, aiutandoli a comprendere aspetti quali i tassi di successo delle query e i motivi degli errori.</p>
<p>Questa guida fornisce istruzioni dettagliate sulla configurazione dei log di accesso in Milvus.</p>
<p>La configurazione dei log di accesso dipende dal metodo di installazione di Milvus:</p>
<ul>
<li><strong>Installazione con Helm</strong>: configurare in <code translate="no">values.yaml</code>. Per ulteriori informazioni, consultare <a href="/docs/it/configure-helm.md">Configurare Milvus con Helm Charts</a>.</li>
<li><strong>Installazione con Docker</strong>: configurare in <code translate="no">milvus.yaml</code>. Per ulteriori informazioni, consultare <a href="/docs/it/configure-docker.md">Configurare Milvus con Docker Compose</a>.</li>
<li><strong>Installazione tramite Operator</strong>: modificare il file <code translate="no">spec.components</code> nel file di configurazione. Per ulteriori informazioni, consultare <a href="/docs/it/configure_operator.md">Configurare Milvus con Milvus Operator</a>.</li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Opzioni di configurazione<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>Scegliere tra tre opzioni di configurazione in base alle proprie esigenze:</p>
<ul>
<li><strong>Configurazione di base</strong>: per scopi generali.</li>
<li><strong>Configurazione per i file di log di accesso locali</strong>: per l'archiviazione locale dei log.</li>
<li><strong>Configurazione per il caricamento dei log di accesso locali su MinIO</strong>: per l'archiviazione e il backup su cloud.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">Configurazione di base<button data-href="#Base-config" class="anchor-icon" translate="no">
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
    </button></h3><p>La configurazione di base prevede l’abilitazione dei log di accesso e la definizione del nome del file di log oppure l’utilizzo di stdout.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is empty, logs will be printed to stdout.</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: Indica se abilitare la funzionalità del log di accesso. Il valore predefinito è <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.filename</code>: Il nome del file di log di accesso. Se si lascia vuoto questo parametro, i log di accesso verranno inviati a stdout.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">Configurazione per i file di log di accesso locali<button data-href="#Config-for-local-access-log-files" class="anchor-icon" translate="no">
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
    </button></h3><p>Configurare l'archiviazione locale dei file di log di accesso con parametri quali il percorso del file locale, la dimensione del file e l'intervallo di rotazione:</p>
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
<p>Questi parametri vengono specificati quando ` <code translate="no">filename</code> ` non è vuoto.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: Il percorso locale in cui è archiviato il file di log di accesso. Il valore predefinito è <code translate="no">/tmp/milvus_access</code>.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: La dimensione massima in MB consentita per un singolo file di log di accesso. Se la dimensione del file di log raggiunge questo limite, verrà avviato un processo di rotazione. Questo processo sigilla il file di log di accesso corrente, crea un nuovo file di log e cancella il contenuto del file di log originale. Il valore predefinito è <strong>64</strong>.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: L’intervallo di tempo massimo, in secondi, consentito per la rotazione di un singolo file di log di accesso. Al raggiungimento dell’intervallo di tempo specificato, viene avviato un processo di rotazione che comporta la creazione di un nuovo file di log di accesso e la chiusura di quello precedente. Il valore predefinito è <strong>0</strong>.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: Il numero massimo di file di log di accesso sigillati che possono essere conservati. Se il numero di file di log di accesso sigillati supera questo limite, verrà eliminato quello più vecchio. Il valore predefinito è <strong>8</strong>.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">Configurazione per il caricamento dei file di log di accesso locali su MinIO<button data-href="#Config-for-uploading-local-access-log-files-to-MinIO" class="anchor-icon" translate="no">
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
    </button></h3><p>Abilitare e configurare le impostazioni per caricare i file di log di accesso locali su MinIO:</p>
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
<p>Durante la configurazione dei parametri di MinIO, assicurarsi di aver impostato <code translate="no">maxSize</code> o <code translate="no">rotatedTime</code>. In caso contrario, il caricamento dei file di log di accesso locali su MinIO potrebbe non andare a buon fine.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: Indica se caricare i file di log di accesso locali su MinIO. Il valore predefinito è <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: Il percorso dell’object storage per il caricamento dei file di log di accesso. Il valore predefinito è <code translate="no">access_log/</code>.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: L'intervallo di tempo consentito per il caricamento dei file di log di accesso. Se il tempo di caricamento di un file di log supera questo intervallo, il file verrà eliminato. Impostando il valore su 0 si disabilita questa funzionalità. Il valore predefinito è <strong>0</strong>.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">Configurazione del formattatore<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>Il formato di log predefinito utilizzato per tutti i metodi è il formato <code translate="no">base</code>, che non richiede associazioni specifiche con i metodi. Tuttavia, se si desidera personalizzare l’output di log per metodi specifici, è possibile definire un formato di log personalizzato e applicarlo ai metodi associati.</p>
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
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.format</code>: Definisce il formato di log con metriche dinamiche. Per ulteriori informazioni, consultare <a href="#reference-supported-metrics">Metriche supportate</a>.</li>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.methods</code>: Elenca le operazioni di Milvus che utilizzano questo formattatore. Per ottenere i nomi dei metodi, consultare <strong>MilvusService</strong> nei <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">metodi di Milvus</a>.</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">Riferimento: Metriche supportate<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
<tr><th>Nome della metrica</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>Nome del metodo</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>Stato dell'accesso: <strong>OK</strong> o <strong>Fallito</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>Espressione utilizzata per operazioni di query, ricerca o eliminazione</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>ID traccia associato all'accesso</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>Indirizzo IP dell'utente</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>Nome dell'utente</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>Dimensione dei dati di risposta</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Codice di errore specifico di Milvus</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>Messaggio di errore dettagliato</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>Nome del database Milvus di destinazione</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>Nome della raccolta Milvus di destinazione</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>Nome o nomi delle partizioni Milvus di destinazione</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>Tempo impiegato per completare l'accesso</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>Ora in cui viene stampato il log di accesso (di solito corrisponde a <code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>Ora di inizio dell'accesso</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>Ora in cui termina l'accesso</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>Versione dell’SDK Milvus utilizzata dall’utente</td></tr>
<tr><td><code translate="no">$error_type</code></td><td>Tipo di errore: <strong>system_error</strong> o <strong>input_error</strong></td></tr>
<tr><td><code translate="no">$output_fields</code></td><td>Campi di output della richiesta</td></tr>
<tr><td><code translate="no">$cluster_prefix</code></td><td>Prefisso del cluster impostato in <code translate="no">msgChannel.chanNamePrefix.cluster</code></td></tr>
<tr><td><code translate="no">$consistency_level</code></td><td>Livello di coerenza della richiesta</td></tr>
<tr><td><code translate="no">$anns_field</code></td><td>Campo vettoriale di una richiesta di ricerca o di ricerca ibrida</td></tr>
<tr><td><code translate="no">$nq</code></td><td>Numero di vettori di query di una richiesta di ricerca o di ricerca ibrida</td></tr>
<tr><td><code translate="no">$search_params</code></td><td>Parametri di ricerca di una richiesta di ricerca o di ricerca ibrida</td></tr>
<tr><td><code translate="no">$query_params</code></td><td>Parametri di query di una richiesta di query</td></tr>
<tr><td><code translate="no">$client_request_time</code></td><td>Tempo di richiesta impostato dal client nei metadati gRPC</td></tr>
<tr><td><code translate="no">$template_value_length</code></td><td>Lunghezza di ciascun valore del modello di espressione</td></tr>
<tr><td><code translate="no">$partial_update</code></td><td>Se una richiesta di upsert è un aggiornamento parziale</td></tr>
</tbody>
</table>
