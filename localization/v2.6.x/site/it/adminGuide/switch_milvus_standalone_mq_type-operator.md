---
id: switch_milvus_standalone_mq_type-operator.md
summary: Imparare a cambiare il tipo di coda dei messaggi per Milvus standalone.
title: Cambio del tipo di MQ per Milvus Standalone
---
<h1 id="Switch-MQ-Type-for-Milvus-Standalone" class="common-anchor-header">Cambio del tipo di MQ per Milvus Standalone<button data-href="#Switch-MQ-Type-for-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento descrive come cambiare il tipo di coda di messaggi (MQ) per una distribuzione Milvus standalone esistente. Milvus supporta il cambio di MQ online senza tempi di inattività.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Un'istanza Milvus Standalone in esecuzione, installata tramite <a href="/docs/it/v2.6.x/install_standalone-docker.md">Docker</a> o <a href="/docs/it/v2.6.x/install_standalone-docker-compose.md">Docker Compose</a>.</li>
<li>L'istanza Milvus è stata aggiornata all'ultima versione che supporta questa funzione di Switch MQ.</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">Flusso di lavoro generale<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>Il flusso di lavoro generale per cambiare il tipo di MQ è il seguente:</p>
<ol>
<li>Assicurarsi che l'istanza Milvus funzioni correttamente.</li>
<li>Confermare il tipo di MQ di origine e il tipo di MQ di destinazione.</li>
<li>Configurare le impostazioni di accesso dell'MQ di destinazione nella configurazione di Milvus senza modificare il valore <code translate="no">mqType</code>.</li>
<li>Attivare il passaggio chiamando l'API WAL alter.</li>
<li>Monitorare i registri per verificare che il passaggio sia stato completato correttamente.</li>
</ol>
<div class="alert note">
<p>Prima di effettuare il passaggio, assicurarsi che l'MQ di destinazione non contenga argomenti con gli stessi nomi di quelli utilizzati dall'istanza Milvus corrente. Questo è particolarmente importante se il servizio MQ di destinazione è stato usato in precedenza da un'altra istanza Milvus, in quanto i nomi degli argomenti in conflitto possono causare un comportamento inaspettato.</p>
</div>
<h2 id="Switch-from-RocksMQ-to-Woodpecker-Local-Storage" class="common-anchor-header">Passare da RocksMQ a Woodpecker (archiviazione locale)<button data-href="#Switch-from-RocksMQ-to-Woodpecker-Local-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa procedura si applica alle distribuzioni <strong>Milvus Standalone Docker</strong> che utilizzano RocksMQ per impostazione predefinita.</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">Passo 1: Verificare che l'istanza Milvus sia in esecuzione<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Assicuratevi che la vostra istanza Milvus Standalone Docker funzioni correttamente. Si può verificare creando una collezione di prova, inserendo i dati ed eseguendo una query.</p>
<h3 id="Step-2-Configure-Woodpecker-with-local-storage" class="common-anchor-header">Passo 2: Configurare Woodpecker con lo storage locale<button data-href="#Step-2-Configure-Woodpecker-with-local-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Aggiornare la configurazione di Milvus per aggiungere le impostazioni di Woodpecker <strong>senza</strong> modificare il valore <code translate="no">mqType</code>. Creare o aggiornare il file <code translate="no">user.yaml</code> con il seguente contenuto:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">local</span>
<button class="copy-code-btn"></button></code></pre>
<p>Quindi riavviare l'istanza Milvus per applicare la configurazione:</p>
<pre><code translate="no" class="language-shell">bash standalone_embed.sh restart
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">Passo 3: Eseguire lo switch MQ<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>Eseguite il seguente comando per attivare il passaggio a Woodpecker:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Sostituire <code translate="no">&lt;mixcoord_addr&gt;</code> con l'indirizzo effettivo del servizio MixCoord (per impostazione predefinita, <code translate="no">localhost</code> per le implementazioni standalone).</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">Passo 4: Verificare il completamento del passaggio<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>Il processo di passaggio si completa automaticamente. Monitorare i log di Milvus per i seguenti messaggi chiave per confermare il completamento dello switch:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Nei messaggi di log sopra riportati, <code translate="no">&lt;MQ1&gt;</code> è il tipo di MQ di origine (<code translate="no">rocksmq</code>) e <code translate="no">&lt;MQ2&gt;</code> è il tipo di MQ di destinazione (<code translate="no">woodpecker</code>).</p>
<ul>
<li>Il primo messaggio indica che il passaggio del WAL dall'origine alla destinazione è stato completato.</li>
<li>Il secondo messaggio indica che tutti i canali fisici sono stati scambiati.</li>
<li>Il terzo messaggio indica che la configurazione di <code translate="no">mq.type</code> è stata aggiornata in etcd.</li>
</ul>
</div>
<h2 id="Switch-from-RocksMQ-to-Woodpecker-MinIO-Storage" class="common-anchor-header">Passaggio da RocksMQ a Woodpecker (MinIO Storage)<button data-href="#Switch-from-RocksMQ-to-Woodpecker-MinIO-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa procedura si applica alle distribuzioni <strong>Milvus Standalone Docker Compose</strong>.</p>
<div class="alert note">
<p>A partire da Milvus v2.6, la configurazione predefinita <code translate="no">docker-compose.yaml</code> dichiara già <code translate="no">mqType</code> come Woodpecker. A meno che non si sia modificata la configurazione predefinita o non si sia effettuato l'aggiornamento dalla v2.5, questa procedura potrebbe non essere necessaria.</p>
</div>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">Passo 1: Verificare che l'istanza Milvus sia in esecuzione<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Assicuratevi che l'istanza di Milvus Standalone Docker Compose funzioni correttamente.</p>
<h3 id="Step-2-Optional-Verify-Woodpecker-configuration" class="common-anchor-header">Passo 2: (facoltativo) Verificare la configurazione di Woodpecker<button data-href="#Step-2-Optional-Verify-Woodpecker-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>La configurazione predefinita di Milvus imposta già il tipo di archiviazione di Woodpecker su MinIO, quindi nella maggior parte dei casi non è necessaria alcuna configurazione aggiuntiva.</p>
<p>Tuttavia, se la configurazione di Woodpecker è stata precedentemente personalizzata, è necessario assicurarsi che <code translate="no">woodpecker.storage.type</code> sia impostato su <code translate="no">minio</code>. Creare o aggiornare il file <code translate="no">user.yaml</code> con il seguente contenuto:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>
<button class="copy-code-btn"></button></code></pre>
<p>Quindi riavviare l'istanza Milvus per applicare la configurazione:</p>
<pre><code translate="no" class="language-shell">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">Passo 3: Eseguire lo switch MQ<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>Eseguire il seguente comando per attivare il passaggio a Woodpecker:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Sostituire <code translate="no">&lt;mixcoord_addr&gt;</code> con l'indirizzo effettivo del servizio MixCoord (per impostazione predefinita, <code translate="no">localhost</code> per le implementazioni standalone).</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">Passo 4: Verificare il completamento del passaggio<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>Il processo di passaggio si completa automaticamente. Monitorare i log di Milvus per i seguenti messaggi chiave per confermare il completamento dello switch:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Nei messaggi di log sopra riportati, <code translate="no">&lt;MQ1&gt;</code> è il tipo di MQ di origine (<code translate="no">rocksmq</code>) e <code translate="no">&lt;MQ2&gt;</code> è il tipo di MQ di destinazione (<code translate="no">woodpecker</code>).</p>
<ul>
<li>Il primo messaggio indica che il passaggio del WAL dall'origine alla destinazione è stato completato.</li>
<li>Il secondo messaggio indica che tutti i canali fisici sono stati scambiati.</li>
<li>Il terzo messaggio indica che la configurazione di <code translate="no">mq.type</code> è stata aggiornata in etcd.</li>
</ul>
</div>
