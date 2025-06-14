---
id: elasticsearch-queries-to-milvus.md
title: Query Elasticsearch a Milvus
summary: >-
  Elasticsearch, basato su Apache Lucene, è uno dei principali motori di ricerca
  open-source. Tuttavia, nelle moderne applicazioni di intelligenza artificiale
  deve affrontare delle sfide, tra cui gli elevati costi di aggiornamento, le
  scarse prestazioni in tempo reale, la gestione inefficiente degli shard, un
  design non cloud-native e un'eccessiva richiesta di risorse. Come database
  vettoriale cloud-nativo, Milvus supera questi problemi grazie alla
  disgiunzione tra archiviazione e calcolo, all'indicizzazione efficiente per i
  dati ad alta dimensionalità e alla perfetta integrazione con le infrastrutture
  moderne. Offre prestazioni e scalabilità superiori per i carichi di lavoro AI.
---
<h1 id="Elasticsearch-Queries-to-Milvus" class="common-anchor-header">Query Elasticsearch a Milvus<button data-href="#Elasticsearch-Queries-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Elasticsearch, basato su Apache Lucene, è uno dei principali motori di ricerca open-source. Tuttavia, nelle moderne applicazioni di intelligenza artificiale deve affrontare delle sfide, tra cui gli elevati costi di aggiornamento, le scarse prestazioni in tempo reale, la gestione inefficiente degli shard, un design non cloud-native e un'eccessiva richiesta di risorse. Come database vettoriale cloud-nativo, Milvus supera questi problemi grazie alla disgiunzione tra archiviazione e calcolo, all'indicizzazione efficiente per i dati ad alta dimensionalità e alla perfetta integrazione con le infrastrutture moderne. Offre prestazioni e scalabilità superiori per i carichi di lavoro di intelligenza artificiale.</p>
<p>Questo articolo mira a facilitare la migrazione della vostra base di codice da Elasticsearch a Milvus, fornendo vari esempi di conversione delle query.</p>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>In Elasticsearch, le operazioni nel contesto della query generano punteggi di rilevanza, mentre quelle nel contesto del filtro non lo fanno. Allo stesso modo, le ricerche di Milvus producono punteggi di similarità, mentre le sue query simili a filtri non lo fanno. Quando si migra la base di codice da Elasticsearch a Milvus, il principio chiave è la conversione dei campi utilizzati nel contesto di query di Elasticsearch in campi vettoriali per consentire la generazione di punteggi di similarità.</p>
<p>La tabella seguente illustra alcuni modelli di query Elasticsearch e i loro corrispondenti equivalenti in Milvus.</p>
<table>
   <tr>
     <th><p>Query Elasticsearch</p></th>
     <th><p>Equivalenti in Milvus</p></th>
     <th><p>Osservazioni</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Query full-text</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/elasticsearch-queries-to-milvus.md#Match-query">Query di corrispondenza</a></p></td>
     <td><p>Ricerca full-text</p></td>
     <td><p>Entrambi forniscono un insieme di funzionalità simili.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Query a livello di termine</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/elasticsearch-queries-to-milvus.md#IDs">ID</a></p></td>
     <td><p><code translate="no">in</code> operatore</p></td>
     <td rowspan="6"><p>Entrambi forniscono un insieme di funzionalità identiche o simili quando queste query Elasticsearch vengono utilizzate nel contesto del filtro.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/elasticsearch-queries-to-milvus.md#Prefix-query">Query con prefisso</a></p></td>
     <td><p><code translate="no">like</code> operatore</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/elasticsearch-queries-to-milvus.md#Range-query">Intervallo di query</a></p></td>
     <td><p>Operatori di confronto come <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, e <code translate="no">&lt;=</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/elasticsearch-queries-to-milvus.md#Term-query">Query a termine</a></p></td>
     <td><p>Operatori di confronto come <code translate="no">==</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/elasticsearch-queries-to-milvus.md#Terms-query">Interrogazione a termini</a></p></td>
     <td><p><code translate="no">in</code> operatore</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/elasticsearch-queries-to-milvus.md#Wildcard-query">Interrogazione con caratteri jolly</a></p></td>
     <td><p><code translate="no">like</code> operatore</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/elasticsearch-queries-to-milvus.md#Boolean-query">Interrogazione booleana</a></p></td>
     <td><p>Operatori logici come <code translate="no">AND</code></p></td>
     <td><p>Entrambi forniscono un insieme di funzionalità simili quando vengono utilizzati nel contesto del filtro.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Query vettoriali</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/elasticsearch-queries-to-milvus.md#Knn-query">Interrogazione kNN</a></p></td>
     <td><p>Ricerca</p></td>
     <td><p>Milvus offre funzionalità di ricerca vettoriale più avanzate.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/elasticsearch-queries-to-milvus.md#Reciprocal-rank-fusion">Fusione reciproca dei ranghi</a></p></td>
     <td><p>Ricerca ibrida</p></td>
     <td><p>Milvus supporta diverse strategie di reranking.</p></td>
   </tr>
</table>
<h2 id="Full-text-queries" class="common-anchor-header">Query full-text<button data-href="#Full-text-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>In Elasticsearch, le query full-text consentono di cercare in campi di testo analizzati, come il corpo di un'e-mail. La stringa di query viene elaborata utilizzando lo stesso analizzatore applicato al campo durante l'indicizzazione.</p>
<h3 id="Match-query" class="common-anchor-header">Query di corrispondenza</h3><p>In Elasticsearch, una query match restituisce i documenti che corrispondono a un testo, un numero, una data o un valore booleano. Il testo fornito viene analizzato prima della corrispondenza.</p>
<p>Di seguito è riportato un esempio di richiesta di ricerca Elasticsearch con una query di corrispondenza.</p>
<pre><code translate="no" class="language-bash">resp = client.search(
    query={
        <span class="hljs-string">&quot;match&quot;</span>: {
            <span class="hljs-string">&quot;message&quot;</span>: {
                <span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;this is a test&quot;</span>
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus offre la stessa capacità attraverso la funzione di ricerca full-text. È possibile convertire la query Elasticsearch di cui sopra in Milvus come segue:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[<span class="hljs-string">&#x27;How is the weather in Jamaica?&#x27;</span>],
    anns_field=<span class="hljs-string">&quot;message_sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;message&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Nell'esempio precedente, <code translate="no">message_sparse</code> è un campo vettoriale rado derivato da un campo VarChar denominato <code translate="no">message</code>. Milvus utilizza il modello di incorporamento BM25 per convertire i valori del campo <code translate="no">message</code> in incorporazioni vettoriali rade e li memorizza nel campo <code translate="no">message_sparse</code>. Alla ricezione della richiesta di ricerca, Milvus incorpora il payload della query in testo semplice utilizzando lo stesso modello BM25 ed esegue una ricerca vettoriale rada e restituisce i campi <code translate="no">id</code> e <code translate="no">message</code> specificati nel parametro <code translate="no">output_fields</code> insieme ai punteggi di similarità corrispondenti.</p>
<p>Per utilizzare questa funzionalità, è necessario abilitare l'analizzatore sul campo <code translate="no">message</code> e definire una funzione per ricavare il campo <code translate="no">message_sparse</code> da esso. Per istruzioni dettagliate sull'abilitazione dell'analizzatore e sulla creazione della funzione derivata in Milvus, consultare la sezione <a href="/docs/it/full-text-search.md">Ricerca a testo completo</a>.</p>
<h2 id="Term-level-queries" class="common-anchor-header">Query a livello di termine<button data-href="#Term-level-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>In Elasticsearch, le query a livello di termine sono utilizzate per trovare documenti basati su valori esatti in dati strutturati, come intervalli di date, indirizzi IP, prezzi o ID di prodotti. Questa sezione illustra i possibili equivalenti di alcune query a livello di termine di Elasticsearch in Milvus. Tutti gli esempi in questa sezione sono adattati per operare nel contesto del filtro per allinearsi alle capacità di Milvus.</p>
<h3 id="IDs" class="common-anchor-header">ID</h3><p>In Elasticsearch, è possibile trovare i documenti in base ai loro ID nel contesto del filtro, come segue:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;ids&quot;</span>: {
                    <span class="hljs-string">&quot;values&quot;</span>: [
                        <span class="hljs-string">&quot;1&quot;</span>,
                        <span class="hljs-string">&quot;4&quot;</span>,
                        <span class="hljs-string">&quot;100&quot;</span>
                    ]
                }            
            }
        }
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>In Milvus, è anche possibile trovare entità in base ai loro ID, come segue:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the filter parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id in [1, 4, 100]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-comment"># Use the ids parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    ids=[<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">100</span>],
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>L'esempio di Elasticsearch è disponibile in <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html">questa pagina</a>. Per maggiori dettagli sulle richieste di query e get e sulle espressioni di filtro in Milvus, consultare <a href="/docs/it/get-and-scalar-query.md">Query</a> e <a href="/docs/it/filtering">filtri</a>.</p>
<h3 id="Prefix-query" class="common-anchor-header">Query con prefisso</h3><p>In Elasticsearch, è possibile trovare i documenti che contengono un prefisso specifico in un campo fornito nel contesto del filtro come segue:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                 <span class="hljs-string">&quot;prefix&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki&quot;</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>In Milvus, è possibile trovare le entità i cui valori iniziano con il prefisso specificato come segue:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>L'esempio di Elasticsearch è disponibile in <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html">questa pagina</a>. Per maggiori dettagli sull'operatore <code translate="no">like</code> in Milvus, consultare la sezione <a href="/docs/it/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching">Utilizzo di </a><code translate="no">LIKE</code><a href="/docs/it/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"> per la corrispondenza dei pattern</a>.</p>
<h3 id="Range-query" class="common-anchor-header">Interrogazione dell'intervallo</h3><p>In Elasticsearch, è possibile trovare i documenti che contengono termini all'interno di un intervallo fornito, come segue:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;range&quot;</span>: {
                    <span class="hljs-string">&quot;age&quot;</span>: {
                        <span class="hljs-string">&quot;gte&quot;</span>: <span class="hljs-number">10</span>,
                        <span class="hljs-string">&quot;lte&quot;</span>: <span class="hljs-number">20</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>In Milvus, è possibile trovare le entità i cui valori in un campo specifico si trovano all'interno di un intervallo fornito come segue:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;10 &lt;= age &lt;= 20&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>L'esempio di Elasticsearch è disponibile in <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html">questa pagina</a>. Per maggiori dettagli sugli operatori di confronto in Milvus, vedere <a href="/docs/it/basic-operators.md#Comparison-operators">Operatori di confronto</a>.</p>
<h3 id="Term-query" class="common-anchor-header">Query a termine</h3><p>In Elasticsearch, è possibile trovare i documenti che contengono un termine <strong>esatto</strong> in un campo fornito, come segue:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;status&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;retired&quot;</span>
                    }
                }            
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>In Milvus, è possibile trovare le entità i cui valori nel campo specificato sono esattamente il termine specificato come segue:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use ==</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;status==&quot;retired&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(status, &quot;retired&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>L'esempio di Elasticsearch è disponibile in <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html">questa pagina</a>. Per maggiori dettagli sugli operatori di confronto in Milvus, vedere <a href="/docs/it/basic-operators.md#Comparison-operators">Operatori di confronto</a>.</p>
<h3 id="Terms-query" class="common-anchor-header">Interrogazione dei termini</h3><p>In Elasticsearch, è possibile trovare documenti che contengono uno o più termini <strong>esatti</strong> in un campo fornito, come segue:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;terms&quot;</span>: {
                    <span class="hljs-string">&quot;degree&quot;</span>: [
                        <span class="hljs-string">&quot;graduate&quot;</span>,
                        <span class="hljs-string">&quot;post-graduate&quot;</span>
                    ]
                }        
            }
        }
    }
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus non ha un'equivalenza completa di questa. Tuttavia, è possibile trovare le entità i cui valori nel campo specificato sono uno dei termini specificati come segue:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use in</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;degree in [&quot;graduate&quot;, &quot;post-graduate&quot;]&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(degree, &quot;graduate post-graduate&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>L'esempio di Elasticsearch è disponibile in <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html">questa pagina</a>. Per maggiori dettagli sugli operatori di intervallo in Milvus, consultare <a href="/docs/it/basic-operators.md#Range-operators">Operatori di intervallo</a>.</p>
<h3 id="Wildcard-query" class="common-anchor-header">Query con caratteri jolly</h3><p>In Elasticsearch, è possibile trovare documenti che contengono termini che corrispondono a un modello jolly, come segue:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;wildcard&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki*y&quot;</span>
                    }
                }          
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus non supporta i caratteri jolly nelle condizioni di filtraggio. Tuttavia, è possibile utilizzare l'operatore <code translate="no">like</code> per ottenere un effetto simile, come segue:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot; AND user like &quot;%y&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>L'esempio di Elasticsearch è disponibile in <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html">questa pagina</a>. Per maggiori dettagli sugli operatori di intervallo in Milvus, consultare <a href="/docs/it/basic-operators.md#Range-operators">Operatori di intervallo</a>.</p>
<h2 id="Boolean-query" class="common-anchor-header">Interrogazione booleana<button data-href="#Boolean-query" class="anchor-icon" translate="no">
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
    </button></h2><p>In Elasticsearch, una query booleana è un'interrogazione che corrisponde a documenti che corrispondono a combinazioni booleane di altre query.</p>
<p>L'esempio seguente è adattato da un esempio presente nella documentazione di Elasticsearch in <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html">questa pagina</a>. La query restituirà gli utenti che hanno <code translate="no">kimchy</code> nel loro nome con un tag <code translate="no">production</code>.</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;kimchy&quot;</span>
                }
            },
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-string">&quot;production&quot;</span>
                }
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>In Milvus, si può fare una cosa simile come segue:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = 

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;%kimchy%&quot; AND ARRAY_CONTAINS(tags, &quot;production&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>L'esempio precedente presuppone che nell'insieme di destinazione siano presenti un campo <code translate="no">user</code> di tipo <strong>VarChar</strong> e un campo <code translate="no">tags</code> di tipo <strong>Array</strong>. La query restituirà gli utenti con <code translate="no">kimchy</code> nel nome e con il tag <code translate="no">production</code>.</p>
<h2 id="Vector-queries" class="common-anchor-header">Query vettoriali<button data-href="#Vector-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>In Elasticsearch, le query vettoriali sono query specializzate che lavorano su campi vettoriali per eseguire in modo efficiente la ricerca semantica.</p>
<h3 id="Knn-query" class="common-anchor-header">Query Knn</h3><p>Elasticsearch supporta sia le query kNN approssimate che le query kNN esatte, con forza bruta. In entrambi i casi è possibile trovare i <em>k</em> vettori più vicini a un vettore di query, misurati da una metrica di somiglianza, come segue:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    index=<span class="hljs-string">&quot;my-image-index&quot;</span>,
    size=<span class="hljs-number">3</span>,
    query={
        <span class="hljs-string">&quot;knn&quot;</span>: {
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;image-vector&quot;</span>,
            <span class="hljs-string">&quot;query_vector&quot;</span>: [
                -<span class="hljs-number">5</span>,
                <span class="hljs-number">9</span>,
                -<span class="hljs-number">12</span>
            ],
            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">10</span>
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus, in quanto database vettoriale specializzato, utilizza i tipi di indice per ottimizzare le ricerche vettoriali. In genere, privilegia la ricerca approssimata del vicino (RNA) per i dati vettoriali ad alta dimensione. La ricerca kNN a forza bruta con il tipo di indice FLAT fornisce risultati precisi, ma richiede molto tempo e risorse. Al contrario, la ricerca ANN con AUTOINDEX o altri tipi di indice bilancia velocità e precisione, offrendo prestazioni significativamente più veloci ed efficienti in termini di risorse rispetto a kNN.</p>
<p>Un'equivalenza simile alla query vettoriale di cui sopra in Mlivus è la seguente:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    anns_field=<span class="hljs-string">&quot;image-vector&quot;</span>
    data=[[-<span class="hljs-number">5</span>, <span class="hljs-number">9</span>, -<span class="hljs-number">12</span>]],
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>L'esempio Elasticsearch è disponibile a <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-knn-query.html">questa pagina</a>. Per maggiori dettagli sulle ricerche ANN in Milvus, leggere <a href="/docs/it/single-vector-search.md">Ricerca ANN di base</a>.</p>
<h3 id="Reciprocal-Rank-Fusion" class="common-anchor-header">Fusione di rango reciproco</h3><p>Elasticsearch offre la funzione Reciprocal Rank Fusion (RRF) per combinare più set di risultati con diversi indicatori di rilevanza in un unico set di risultati classificati.</p>
<p>L'esempio seguente mostra la combinazione di una ricerca tradizionale basata sui termini con una ricerca vettoriale k-nearest neighbors (kNN) per migliorare la rilevanza della ricerca:</p>
<pre><code translate="no" class="language-python">client.search(
    index=<span class="hljs-string">&quot;my_index&quot;</span>,
    size=<span class="hljs-number">10</span>,
    query={
        <span class="hljs-string">&quot;retriever&quot;</span>: {
            <span class="hljs-string">&quot;rrf&quot;</span>: {
                <span class="hljs-string">&quot;retrievers&quot;</span>: [
                    {
                        <span class="hljs-string">&quot;standard&quot;</span>: {
                            <span class="hljs-string">&quot;query&quot;</span>: {
                                <span class="hljs-string">&quot;term&quot;</span>: {
                                    <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;shoes&quot;</span>
                                }
                            }
                        }
                    },
                    {
                        <span class="hljs-string">&quot;knn&quot;</span>: {
                            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
                            <span class="hljs-string">&quot;query_vector&quot;</span>: [<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>],  <span class="hljs-comment"># Example vector; replace with your actual query vector</span>
                            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">50</span>,
                            <span class="hljs-string">&quot;num_candidates&quot;</span>: <span class="hljs-number">100</span>
                        }
                    }
                ],
                <span class="hljs-string">&quot;rank_window_size&quot;</span>: <span class="hljs-number">50</span>,
                <span class="hljs-string">&quot;rank_constant&quot;</span>: <span class="hljs-number">20</span>
            }
        }
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>In questo esempio, RRF combina i risultati di due retrievers:</p>
<ul>
<li><p>Una ricerca standard basata sui termini per i documenti contenenti il termine <code translate="no">&quot;shoes&quot;</code> nel campo <code translate="no">text</code>.</p></li>
<li><p>Una ricerca kNN sul campo <code translate="no">vector</code> utilizzando il vettore di query fornito.</p></li>
</ul>
<p>Ciascun retriever contribuisce con un massimo di 50 top match, che vengono riclassificati da RRF, per poi restituire i primi 10 risultati finali.</p>
<p>In Milvus è possibile ottenere una ricerca ibrida simile, combinando le ricerche su più campi vettoriali, applicando una strategia di reranking e recuperando i risultati top-K dall'elenco combinato. Milvus supporta sia le strategie di reranking RRF che quelle ponderate. Per maggiori dettagli, consultare <a href="/docs/it/weighted-ranker.md">Reranking</a>.</p>
<p>Di seguito viene presentata un'equivalenza non rigorosa dell'esempio Elasticsearch di cui sopra in Milvus.</p>
<pre><code translate="no" class="language-python">search_params_dense = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}, 
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">100</span>
}

req_dense = ANNSearchRequest(**search_params_dense)

search_params_sparse = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&quot;shoes&quot;</span>],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}
    }
}

req_sparse = ANNSearchRequest(**search_params_sparse)

res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=[req_dense, req_sparse],
    reranker=RRFRanker(),
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Questo esempio dimostra una ricerca ibrida in Milvus che combina:</p>
<ol>
<li><p><strong>Ricerca vettoriale densa</strong>: Utilizzo della metrica del prodotto interno (IP) con <code translate="no">nprobe</code> impostato su 10 per la ricerca approssimata del vicino (RNA) sul campo <code translate="no">vector</code>.</p></li>
<li><p><strong>Ricerca vettoriale rada</strong>: Utilizzando la metrica di similarità BM25 con un parametro <code translate="no">drop_ratio_search</code> di 0,2 sul campo <code translate="no">text_sparse</code>.</p></li>
</ol>
<p>I risultati di queste ricerche vengono eseguiti separatamente, combinati e riclassificati utilizzando il ranker Reciprocal Rank Fusion (RRF). La ricerca ibrida restituisce le prime 10 entità dell'elenco rielaborato.</p>
<p>A differenza del classificatore RRF di Elasticsearch, che unisce i risultati di query standard basate sul testo e di ricerche kNN, Milvus combina i risultati di ricerche vettoriali rade e dense, fornendo una capacità di ricerca ibrida unica, ottimizzata per i dati multimodali.</p>
<h2 id="Recap" class="common-anchor-header">Ricostruzione<button data-href="#Recap" class="anchor-icon" translate="no">
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
    </button></h2><p>In questo articolo abbiamo affrontato le conversioni di query tipiche di Elasticsearch nei loro equivalenti di Milvus, comprese le query a livello di termine, le query booleane, le query full-text e le query vettoriali. Se avete altre domande sulla conversione di altre query Elasticsearch, non esitate a contattarci.</p>
