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
    </button></h1><p>La funzione di log degli accessi di Milvus consente ai gestori dei server di registrare e analizzare il comportamento degli utenti, aiutando a comprendere aspetti come la percentuale di successo delle query e i motivi dei fallimenti.</p>
<p>Questa guida fornisce istruzioni dettagliate sulla configurazione dei log di accesso in Milvus.</p>
<p>La configurazione dei log di accesso dipende dal metodo di installazione di Milvus:</p>
<ul>
<li><strong>Installazione di Helm</strong>: Configurazione in <code translate="no">values.yaml</code>. Per ulteriori informazioni, vedere <a href="/docs/it/configure-helm.md">Configurazione di Milvus con i grafici Helm</a>.</li>
<li><strong>Installazione di Docker</strong>: Configurazione in <code translate="no">milvus.yaml</code>. Per ulteriori informazioni, vedere <a href="/docs/it/configure-docker.md">Configurazione di Milvus con Docker Compose</a>.</li>
<li><strong>Installazione dell'operatore</strong>: Modificare <code translate="no">spec.components</code> nel file di configurazione. Per ulteriori informazioni, vedere <a href="/docs/it/configure_operator.md">Configurazione di Milvus con Milvus Operator</a>.</li>
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
    </button></h2><p>Scegliete tra tre opzioni di configurazione in base alle vostre esigenze:</p>
<ul>
<li><strong>Configurazione di base</strong>: Per scopi generali.</li>
<li><strong>Configurazione per i file di log ad accesso locale</strong>: Per memorizzare i log a livello locale.</li>
<li><strong>Configurazione per il caricamento dei registri di accesso locali su MinIO</strong>: Per l'archiviazione e il backup nel cloud.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">Configurazione di base</h3><p>La configurazione di base prevede l'abilitazione dei log di accesso e la definizione del nome del file di log o l'utilizzo di stdout.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is emtpy, logs will be printed to stdout.</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: Abilita o meno la funzione di log degli accessi. L'impostazione predefinita è <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.filename</code>: Il nome del file di log degli accessi. Se si lascia vuoto questo parametro, i log degli accessi verranno stampati su stdout.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">Configurazione dei file di log di accesso locali</h3><p>Configura la memorizzazione locale dei file di log degli accessi con parametri quali il percorso del file locale, la dimensione del file e l'intervallo di rotazione:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">24</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questi parametri sono specificati quando <code translate="no">filename</code> non è vuoto.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: Il percorso del file locale in cui viene memorizzato il file di log degli accessi.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: La dimensione massima in MB consentita per un singolo file di log degli accessi. Se la dimensione del file di log raggiunge questo limite, viene attivato un processo di rotazione. Questo processo sigilla il file di log di accesso corrente, crea un nuovo file di log e cancella il contenuto del file di log originale.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: L'intervallo di tempo massimo in secondi consentito per la rotazione di un singolo file di log degli accessi. Al raggiungimento dell'intervallo di tempo specificato, viene attivato un processo di rotazione che porta alla creazione di un nuovo file di log degli accessi e alla chiusura di quello precedente.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: Numero massimo di file di log di accesso sigillati che possono essere conservati. Se il numero di file di log di accesso sigillati supera questo limite, il più vecchio verrà eliminato.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">Configurazione per il caricamento dei file di log degli accessi locali su MinIO</h3><p>Abilitare e configurare le impostazioni per caricare i file di log degli accessi locali su MinIO:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">24</span> 
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span>
    <span class="hljs-attr">minioEnable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">remotePath:</span> <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    <span class="hljs-attr">remoteMaxTime:</span> <span class="hljs-number">0</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Quando si configurano i parametri di MinIO, assicurarsi di aver impostato <code translate="no">maxSize</code> o <code translate="no">rotatedTime</code>. In caso contrario, il caricamento dei file di log degli accessi locali su MinIO potrebbe non andare a buon fine.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: Se caricare o meno i file di log degli accessi locali in MinIO. L'impostazione predefinita è <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: Il percorso della memoria degli oggetti per il caricamento dei file di log degli accessi.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: L'intervallo di tempo consentito per il caricamento dei file di log degli accessi. Se il tempo di caricamento di un file di log supera questo intervallo, il file viene eliminato. L'impostazione del valore a 0 disabilita questa funzione.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">Configurazione del formato<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>Il formato di registro predefinito utilizzato per tutti i metodi è il formato <code translate="no">base</code>, che non richiede associazioni specifiche al metodo. Tuttavia, se si desidera personalizzare l'output del log per metodi specifici, è possibile definire un formato di log personalizzato e applicarlo ai metodi associati.</p>
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
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.format</code>: Definisce il formato di log con metriche dinamiche. Per ulteriori informazioni, vedere <a href="#reference-supported-metrics">Metriche supportate</a>.</li>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.methods</code>: Elenca le operazioni Milvus che utilizzano questo formattatore. Per ottenere i nomi dei metodi, vedere <strong>MilvusService</strong> in <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Metodi Milvus</a>.</li>
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
<tr><th>Metrica Nome</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>Nome del metodo</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>Stato dell'accesso: <strong>OK</strong> o <strong>non riuscito</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>Espressione utilizzata per le operazioni di interrogazione, ricerca o cancellazione</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>TraceID associato all'accesso</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>Indirizzo IP dell'utente</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>Nome dell'utente</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>Dimensione dei dati di risposta</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Codice di errore specifico di Milvus</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>Messaggio di errore dettagliato</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>Nome del database Milvus di destinazione</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>Nome della collezione Milvus di destinazione</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>Nome o nomi delle partizioni Milvus di destinazione</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>Tempo impiegato per completare l'accesso</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>Ora in cui viene stampato il log degli accessi (di solito equivalente a <code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>Ora di inizio dell'accesso</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>Ora in cui l'accesso termina</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>Versione dell'SDK Milvus utilizzata dall'utente</td></tr>
</tbody>
</table>
