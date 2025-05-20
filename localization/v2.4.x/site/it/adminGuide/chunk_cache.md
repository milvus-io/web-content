---
id: chunk_cache.md
title: Configurare la cache dei chunk
summary: ''
---
<h1 id="Configure-Chunk-Cache" class="common-anchor-header">Configurare la Chunk Cache<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h1><p>Il meccanismo della chunk cache consente a Milvus di precaricare i dati nella cache sul disco rigido locale dei nodi di interrogazione prima che siano necessari. Questo meccanismo migliora significativamente le prestazioni di recupero dei vettori riducendo il tempo necessario per caricare i dati dal disco alla memoria.</p>
<h2 id="Background" class="common-anchor-header">Sfondo<button data-href="#Background" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di eseguire le interrogazioni per recuperare i vettori, Milvus deve caricare i dati dalla memoria degli oggetti alla memoria cache sul disco rigido locale dei nodi di interrogazione. Si tratta di un processo che richiede molto tempo. Prima che tutti i dati siano caricati, Milvus potrebbe rispondere ad alcune richieste di recupero di vettori con un certo ritardo.</p>
<p>Per migliorare le prestazioni delle query, Milvus fornisce un meccanismo di chunk cache per precaricare i dati dalla memoria degli oggetti nella cache del disco rigido locale prima che siano necessari. Quando viene ricevuta una richiesta di interrogazione, il Segcore controlla innanzitutto se i dati si trovano nella cache, anziché nella memoria degli oggetti. Se i dati sono nella cache, Segcore può recuperarli rapidamente dalla cache e restituire il risultato al client.</p>
<h2 id="Configure-Chunk-Cache" class="common-anchor-header">Configurare la Chunk Cache<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa guida fornisce istruzioni su come configurare il meccanismo di chunk cache per un'istanza Milvus. La configurazione varia a seconda del modo in cui si installa l'istanza Milvus.</p>
<ul>
<li><p>Per le istanze Milvus installate utilizzando Helm Charts</p>
<p>Aggiungere la configurazione al file <code translate="no">values.yaml</code> nella sezione <code translate="no">config</code>. Per i dettagli, consultare <a href="/docs/it/v2.4.x/configure-helm.md">Configurazione di Milvus con Helm Charts</a>.</p></li>
<li><p>Per le istanze Milvus installate usando Docker Compose</p>
<p>Aggiungere la configurazione al file <code translate="no">milvus.yaml</code> utilizzato per avviare l'istanza Milvus. Per i dettagli, fate riferimento a <a href="/docs/it/v2.4.x/configure-docker.md">Configurare Milvus con Docker Compose</a>.</p></li>
<li><p>Per le istanze Milvus installate con Operator</p>
<p>Aggiungere la configurazione alla sezione <code translate="no">spec.components</code> della risorsa personalizzata <code translate="no">Milvus</code>. Per i dettagli, vedere <a href="/docs/it/v2.4.x/configure_operator.md">Configurazione di Milvus con Operator</a>.</p></li>
</ul>
<h3 id="Configuration-options" class="common-anchor-header">Opzioni di configurazione</h3><pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode</span>:
    <span class="hljs-attr">cache</span>:
        <span class="hljs-attr">warmup</span>: <span class="hljs-keyword">async</span>
<button class="copy-code-btn"></button></code></pre>
<p>Il parametro <code translate="no">warmup</code> determina se Milvus precarica i dati dall'archivio oggetti nella cache sul disco rigido locale dei nodi di interrogazione prima che siano necessari. Il parametro è impostato su <code translate="no">disable</code>. Le opzioni possibili sono le seguenti:</p>
<ul>
<li><code translate="no">async</code>: Milvus precarica i dati in modo asincrono in background, il che non influisce sul tempo necessario per caricare una raccolta. Tuttavia, gli utenti potrebbero subire un ritardo nel recupero dei vettori per un breve periodo di tempo dopo il completamento del processo di caricamento.  Questa è l'opzione predefinita.</li>
<li><code translate="no">sync</code>: Milvus precarica i dati in modo sincrono, il che può influire sul tempo di caricamento di una collezione. Tuttavia, gli utenti possono eseguire interrogazioni immediatamente dopo il completamento del processo di caricamento senza alcun ritardo.</li>
<li><code translate="no">disable</code>: Milvus non precarica i dati nella cache di memoria.</li>
</ul>
<p>Si noti che le impostazioni della cache dei chunk si applicano anche quando vengono inseriti nuovi dati nelle raccolte o vengono ricostruiti gli indici delle raccolte.</p>
<h3 id="FAQ" class="common-anchor-header">DOMANDE FREQUENTI</h3><ul>
<li><p><strong>Come posso determinare se il meccanismo della chunk cache funziona correttamente?</strong></p>
<p>Si consiglia di verificare la latenza di una richiesta di ricerca o di query dopo il caricamento di una raccolta. Se la latenza è significativamente più alta del previsto (ad esempio, diversi secondi), ciò potrebbe indicare che il meccanismo della cache dei chunk è ancora in funzione.</p>
<p>Se la latenza della query rimane elevata per un lungo periodo di tempo. È possibile controllare il throughput dello storage degli oggetti per verificare che la cache dei chunk sia ancora funzionante. In casi normali, la cache chunk funzionante genererà un throughput elevato sullo storage degli oggetti. In alternativa, è possibile provare la cache chunk in modalità <code translate="no">sync</code>.</p></li>
</ul>
