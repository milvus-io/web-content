---
id: model-ranker-overview.md
title: Panoramica del Model RankerCompatible with Milvus 2.6.x
summary: >-
  La ricerca vettoriale tradizionale classifica i risultati esclusivamente in
  base alla somiglianza matematica, ovvero alla corrispondenza dei vettori nello
  spazio ad alta densità. Sebbene sia efficiente, questo approccio spesso non
  tiene conto della vera rilevanza semantica. Considerate la ricerca di "best
  practice per l'ottimizzazione dei database": potreste ricevere documenti con
  un'elevata somiglianza vettoriale che menzionano frequentemente questi
  termini, ma che in realtà non forniscono strategie di ottimizzazione
  attuabili.
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">Panoramica del Model Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>La ricerca vettoriale tradizionale classifica i risultati esclusivamente in base alla somiglianza matematica, ovvero alla corrispondenza dei vettori nello spazio ad alta densità. Sebbene sia efficiente, questo approccio spesso non tiene conto della vera rilevanza semantica. Considerate la ricerca di <strong>"best practice per l'ottimizzazione dei database":</strong> potreste ricevere documenti con un'elevata somiglianza vettoriale che menzionano frequentemente questi termini, ma che in realtà non forniscono strategie di ottimizzazione attuabili.</p>
<p>Model Ranker trasforma la ricerca Milvus integrando modelli linguistici avanzati che comprendono le relazioni semantiche tra query e documenti. Invece di basarsi esclusivamente sulla somiglianza vettoriale, valuta il significato e il contesto dei contenuti per fornire risultati più intelligenti e pertinenti.</p>
<h2 id="Limits" class="common-anchor-header">Limiti<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>I classificatori di modelli non possono essere utilizzati con le ricerche di raggruppamento.</p></li>
<li><p>I campi utilizzati per il model reranking devono essere di tipo testo (<code translate="no">VARCHAR</code>).</p></li>
<li><p>Ogni classificatore di modelli può utilizzare solo un campo <code translate="no">VARCHAR</code> alla volta per la valutazione.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Come funziona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>I Model Ranker integrano le capacità di comprensione dei modelli linguistici nel processo di ricerca Milvus attraverso un flusso di lavoro ben definito:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" />
   </span> <span class="img-wrapper"> <span>Panoramica del Model Ranker</span> </span></p>
<ol>
<li><p><strong>Interrogazione iniziale</strong>: L'applicazione invia una query a Milvus.</p></li>
<li><p><strong>Ricerca vettoriale</strong>: Milvus esegue una ricerca vettoriale standard per identificare i documenti candidati.</p></li>
<li><p><strong>Recupero dei candidati</strong>: Il sistema identifica l'insieme iniziale di documenti candidati in base alla somiglianza vettoriale.</p></li>
<li><p><strong>Valutazione del modello</strong>: La funzione Model Ranker elabora le coppie query-documento:</p>
<ul>
<li><p>Invia la query originale e i documenti candidati a un servizio di modelli esterni.</p></li>
<li><p>Il modello linguistico valuta la rilevanza semantica tra la query e ciascun documento</p></li>
<li><p>Ogni documento riceve un punteggio di rilevanza basato sulla comprensione semantica.</p></li>
</ul></li>
<li><p><strong>Riordino intelligente</strong>: I documenti vengono riordinati in base ai punteggi di rilevanza generati dal modello</p></li>
<li><p><strong>Risultati migliorati</strong>: L'applicazione riceve risultati classificati in base alla rilevanza semantica anziché alla sola somiglianza vettoriale.</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">Scegliete un fornitore di modelli per le vostre esigenze<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supporta i seguenti fornitori di servizi di modello per il reranking, ciascuno con caratteristiche diverse:</p>
<table>
   <tr>
     <th><p>Fornitore</p></th>
     <th><p>Migliore per</p></th>
     <th><p>Caratteristiche</p></th>
     <th><p>Esempio di caso d'uso</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>Applicazioni complesse che richiedono una profonda comprensione semantica e personalizzazione</p></td>
     <td><ul>
<li><p>Supporta diversi modelli linguistici di grandi dimensioni</p></li>
<li><p>Opzioni di distribuzione flessibili</p></li>
<li><p>Requisiti computazionali più elevati</p></li>
<li><p>Maggiore potenziale di personalizzazione</p></li>
</ul></td>
     <td><p>Piattaforma di ricerca legale che distribuisce modelli specifici per il dominio che comprendono la terminologia legale e le relazioni con la giurisprudenza</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>Implementazione rapida con utilizzo efficiente delle risorse</p></td>
     <td><ul>
<li><p>Servizio leggero ottimizzato per le operazioni sul testo</p></li>
<li><p>Implementazione più semplice con minori requisiti di risorse</p></li>
<li><p>Modelli di reranking pre-ottimizzati</p></li>
<li><p>Minimo sovraccarico dell'infrastruttura</p></li>
</ul></td>
     <td><p>Sistema di gestione dei contenuti che necessita di efficienti capacità di ricanalizzazione con requisiti standard</p></td>
   </tr>
</table>
<p>Per informazioni dettagliate sull'implementazione di ciascun modello di servizio, consultare la documentazione dedicata:</p>
<ul>
<li><p><a href="/docs/it/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/it/tei-ranker.md">Classificatore TEI</a></p></li>
</ul>
<h2 id="Implementation" class="common-anchor-header">Implementazione<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di implementare Model Ranker, assicurarsi di disporre di:</p>
<ul>
<li><p>Una raccolta Milvus con un campo <code translate="no">VARCHAR</code> contenente il testo da classificare.</p></li>
<li><p>Un servizio di modello esterno in esecuzione (vLLM o TEI) accessibile alla vostra istanza Milvus</p></li>
<li><p>Connettività di rete appropriata tra Milvus e il servizio di modelli scelto.</p></li>
</ul>
<p>I classificatori di modelli si integrano perfettamente con le operazioni di ricerca vettoriale standard e di ricerca ibrida. L'implementazione prevede la creazione di un oggetto Function che definisce la configurazione del reranking e la sua trasmissione alle operazioni di ricerca.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">Creare un classificatore di modelli</h3><p>Per implementare il reranking dei modelli, occorre innanzitutto definire un oggetto Function con la configurazione appropriata:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a model ranker function</span>
model_ranker = Function(
    name=<span class="hljs-string">&quot;semantic_ranker&quot;</span>,  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># VARCHAR field to use for reranking</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,  <span class="hljs-comment"># Specify model reranker. Must be &quot;model&quot;</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot; or &quot;vllm&quot;</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Richiesto?</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore / Esempio</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Identificatore della funzione utilizzata per l'esecuzione delle ricerche.</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Nome del campo di testo da utilizzare per la riclassificazione. Deve essere un campo di tipo <code translate="no">VARCHAR</code>.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Specifica il tipo di funzione creata. Deve essere impostato su <code translate="no">RERANK</code> per tutti i classificatori di modelli.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Deve essere impostato su <code translate="no">"model"</code> per abilitare il reranking dei modelli.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Il fornitore di servizi di modello da usare per il reranking.</p></td>
     <td><p><code translate="no">"tei"</code> o <code translate="no">"vllm"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Elenco delle stringhe di query utilizzate dal modello di reranking per calcolare i punteggi di rilevanza. Il numero di stringhe di query deve corrispondere esattamente al numero di query dell'operazione di ricerca (anche quando si usano vettori di query al posto del testo), altrimenti verrà segnalato un errore.</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>Sì</p></td>
     <td><p>URL del servizio del modello.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">maxBatch</code></p></td>
     <td><p>No</p></td>
     <td><p>Numero massimo di documenti da elaborare in un singolo batch. Valori maggiori aumentano il throughput ma richiedono più memoria.</p></td>
     <td><p><code translate="no">32</code> (predefinito)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Applica alla ricerca vettoriale standard</h3><p>Dopo aver definito il ranker del modello, è possibile applicarlo durante le operazioni di ricerca passandolo al parametro ranker:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>], <span class="hljs-comment"># Number of queries must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Applica alla ricerca ibrida</h3><p>I ranker dei modelli possono essere applicati anche alle operazioni di ricerca ibrida che combinano più campi vettoriali:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply model ranker to hybrid search</span>
hybrid_results = client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Same model ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
