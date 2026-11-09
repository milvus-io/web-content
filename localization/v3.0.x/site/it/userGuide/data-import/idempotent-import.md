---
id: idempotent-import.md
order: 2
title: Importazione in blocco idempotente
summary: >-
  Invia una chiave di idempotenza in modo che un nuovo tentativo di importazione
  in blocco venga associato al processo originale, anziché crearne uno nuovo.
---
<h1 id="Idempotent-Bulk-Import" class="common-anchor-header">Importazione in blocco idempotente<button data-href="#Idempotent-Bulk-Import" class="anchor-icon" translate="no">
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
    </button></h1><p>Una richiesta di importazione in blocco può andare a buon fine anche se la risposta va persa: il timeout della chiamata, l'interruzione della connessione o l'arresto dell'orchestratore prima che venga salvato l'<code translate="no">jobId</code> restituito. Non è possibile distinguere tra "non completato" e "completato, risposta persa". Riprovare avvia un secondo processo e ogni riga viene inserita due volte; non riprovare potrebbe comportare la perdita dell'importazione.</p>
<p>Una chiave di idempotenza elimina questa scelta. Assegnando una chiave alla richiesta, un nuovo tentativo con la stessa chiave restituirà l’ <code translate="no">jobId</code> originale invece di creare un secondo processo.</p>
<p>L’importazione in blocco idempotente richiede Milvus 3.0.2 o versioni successive, oppure 2.6.24 o versioni successive della linea 2.6. Un server più vecchio ignora l’intestazione e ogni richiesta, che si tratti di un nuovo tentativo o meno, avvia un nuovo processo.</p>
<h2 id="Sending-the-key" class="common-anchor-header">Invio della chiave<button data-href="#Sending-the-key" class="anchor-icon" translate="no">
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
    </button></h2><p>La chiave viene trasmessa come intestazione HTTP <code translate="no">Idempotency-Key</code>, non nel corpo della richiesta.</p>
<pre><code translate="no" class="language-bash">curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/jobs/import/create&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Idempotency-Key: nightly-2026-09-07-batch-3&quot;</span> \
  -d <span class="hljs-string">&#x27;{&quot;collectionName&quot;: &quot;events&quot;, &quot;files&quot;: [[&quot;events/2026-09-07/part-0.parquet&quot;]]}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<!-- TODO: the `headers` parameter and `IDEMPOTENCY_KEY_HEADER` are merged but not released: milvus-io/pymilvus#3784 (master), milvus-io/pymilvus#3807 (3.0), milvus-io/pymilvus#3808 (2.6). They are expected in pymilvus v3.0.3 and v2.6.18. After those tags exist, verify this example against the released API. -->
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> IDEMPOTENCY_KEY_HEADER, bulk_import

resp = bulk_import(
    url=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    collection_name=<span class="hljs-string">&quot;events&quot;</span>,
    files=[[<span class="hljs-string">&quot;events/2026-09-07/part-0.parquet&quot;</span>]],
    headers={IDEMPOTENCY_KEY_HEADER: <span class="hljs-string">&quot;nightly-2026-09-07-batch-3&quot;</span>},
)
resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]   <span class="hljs-comment"># the same id on every retry</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">IDEMPOTENCY_KEY_HEADER</code> è <code translate="no">&quot;Idempotency-Key&quot;</code>; funziona anche la stringa grezza. Il parametro <code translate="no">headers</code> e <code translate="no">IDEMPOTENCY_KEY_HEADER</code> richiedono pymilvus v3.0.3 o successive sulla linea 3.x, oppure v2.6.18 o successive sulla linea 2.6. Su una versione precedente di pymilvus, la riga <code translate="no">import</code> sopra riportata genera un errore <code translate="no">ImportError</code> durante la ricerca di <code translate="no">IDEMPOTENCY_KEY_HEADER</code>, e il passaggio di <code translate="no">headers</code> a <code translate="no">bulk_import</code> comporta un comportamento indefinito: la chiamata potrebbe generare un errore oppure l’importazione potrebbe essere inviata senza la chiave.</p>
<p>Eseguire il polling su <code translate="no">/v2/vectordb/jobs/import/describe</code> con l’ <code translate="no">jobId</code> restituito come di consueto. Un tentativo di ripetizione che arriva mentre quello originale è ancora in fase di registrazione lo attende, quindi un tentativo di ripetizione non rileva mai un’operazione registrata solo a metà.</p>
<h2 id="Choosing-a-key" class="common-anchor-header">Scelta di una chiave<button data-href="#Choosing-a-key" class="anchor-icon" translate="no">
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
<li><strong>Una chiave per ogni richiesta logica.</strong> Assegnare un nome all’unità di lavoro, ad esempio <code translate="no">orders-2026-09-07-batch-3</code>, oppure generare un UUID e memorizzarlo insieme all’elemento di lavoro prima di inviare la richiesta. Includere un numero di tentativo nel caso in cui sia necessario rieseguire lo stesso lavoro.</li>
<li><strong>Riprovare con la stessa chiave.</strong> La generazione di una nuova chiave in caso di riprova è ciò che causa la duplicazione dei dati. Le eccezioni sono elencate nella sezione <a href="#when-to-send-a-new-key">«Quando inviare una nuova chiave</a>».</li>
<li><strong>Non riutilizzare mai una chiave per file diversi.</strong> Milvus non confronta le due richieste. Si otterrà l’originale <code translate="no">jobId</code> e i nuovi file non verranno importati.</li>
<li><strong>Assicurati che sia breve e stampabile.</strong> ASCII stampabile, al massimo 256 byte per impostazione predefinita (<code translate="no">streaming.idempotency.maxKeyLength</code>). Qualsiasi altra cosa viene rifiutata con l’errore <code translate="no">1100</code>.</li>
<li><strong>Non inserire informazioni riservate.</strong> La chiave viene memorizzata insieme ai tuoi dati.</li>
</ul>
<h2 id="How-long-a-key-is-remembered" class="common-anchor-header">Per quanto tempo viene ricordata una chiave<button data-href="#How-long-a-key-is-remembered" class="anchor-icon" translate="no">
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
    </button></h2><p>La chiave è associata alla collezione tramite il suo ID interno, quindi rinominare la collezione non interrompe un tentativo di ripetizione, purché il tentativo di ripetizione indichi la collezione con il suo nuovo nome. Eliminare e ricreare la collezione con lo stesso nome invece lo interrompe, e in tal caso la soluzione corretta è eseguire un nuovo processo.</p>
<p>Milvus memorizza una chiave di importazione per circa un giorno. Considerate questa durata come indicativa piuttosto che garantita: un traffico DDL o di importazione intenso la riduce, mentre un riavvio del coordinatore la prolunga. Un nuovo tentativo dopo che la chiave è stata dimenticata avvia un nuovo processo.</p>
<h2 id="When-to-send-a-new-key" class="common-anchor-header">Quando inviare una nuova chiave<button data-href="#When-to-send-a-new-key" class="anchor-icon" translate="no">
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
    </button></h2><p>Due casi, e solo due:</p>
<ul>
<li><strong>Il processo originale è fallito o è stato interrotto.</strong> Il comando `Describe` restituisce un ` <code translate="no">state: Failed</code> ` con una motivazione. Riprovando con la stessa chiave, viene restituito lo stesso ` <code translate="no">jobId</code> ` finché la chiave è ancora memorizzata. Risolvi la causa, quindi invia una nuova chiave.</li>
<li><strong>Il processo originale è stato eliminato.</strong> Milvus conserva i processi completati per <code translate="no">dataCoord.import.taskRetention</code> (48 ore per impostazione predefinita). Se tale periodo scade mentre la chiave è ancora memorizzata, il nuovo tentativo restituisce la vecchia <code translate="no">jobId</code> e il comando `describe` risponde con l’errore <code translate="no">import job does not exist</code> invece dello stato del processo. Quel processo potrebbe essere andato a buon fine. Verificare che i dati siano effettivamente mancanti prima di inviare una nuova chiave.</li>
</ul>
<p>Un nuovo tentativo che viene rifiutato, ad esempio perché il limite dei lavori di importazione è stato raggiunto, non rientra in questi casi. Riprovare in un secondo momento con la stessa chiave.</p>
<h2 id="Configuration" class="common-anchor-header">Configurazione<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Quattro parametri determinano il comportamento di questa pagina. Nessuno di essi deve essere modificato affinché la chiave funzioni.</p>
<table>
<thead>
<tr><th>Parametro</th><th>Valore predefinito</th><th>Funzione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxLifetime</code></td><td><code translate="no">24h</code></td><td>Per quanto tempo viene ricordata una chiave di importazione. Non presente nel file predefinito <code translate="no">milvus.yaml</code>; aggiungerla esplicitamente per modificarla. Lo stesso archivio rifiuta anche gli invii DDL duplicati, quindi non abbassare questo valore solo per ridurre la finestra di importazione.</td></tr>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxCount</code></td><td><code translate="no">8192</code></td><td>Quante chiavi e record DDL lo stesso archivio può contenere prima che quelli più vecchi vengano eliminati, indipendentemente dalla loro età. È ciò che consente, in caso di traffico intenso di DDL o importazioni, di dimenticare una chiave prima di <code translate="no">maxLifetime</code>. Non presente nel file predefinito <code translate="no">milvus.yaml</code>.</td></tr>
<tr><td><code translate="no">dataCoord.import.taskRetention</code></td><td><code translate="no">172800</code> (48 ore) a partire dalla versione 2.6.24 e 3.0.2; <code translate="no">10800</code> prima</td><td>Per quanto tempo un’operazione di importazione completata rimane interrogabile. Impostare un valore almeno doppio rispetto a <code translate="no">maxLifetime</code>.</td></tr>
<tr><td><code translate="no">streaming.idempotency.maxKeyLength</code></td><td><code translate="no">256</code></td><td>La lunghezza massima della chiave in byte. Una chiave più lunga viene rifiutata con l’errore <code translate="no">1100</code>. <code translate="no">0</code> disabilita il limite. Non presente nel file predefinito <code translate="no">milvus.yaml</code>.</td></tr>
</tbody>
</table>
<p>Il file ` <code translate="no">milvus.yaml</code> ` distribuito prima delle versioni 2.6.24 e 3.0.2 imposta esplicitamente ` <code translate="no">taskRetention: 10800</code> `, e un aggiornamento non sovrascrive il valore presente nel file. Se si è effettuato l’aggiornamento con quel file, impostare ` <code translate="no">taskRetention</code> ` ad almeno il doppio di ` <code translate="no">maxLifetime</code>`. Il nuovo valore si applica solo ai processi che terminano dopo la modifica.</p>
