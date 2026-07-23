---
id: model-ranker-overview.md
title: Panoramica su Model RankerCompatible with Milvus 2.6.x
summary: >-
  La ricerca vettoriale tradizionale ordina i risultati esclusivamente in base
  alla somiglianza matematica, ovvero al grado di corrispondenza tra i vettori
  in uno spazio ad alta dimensionalità. Pur essendo efficiente, questo approccio
  spesso trascura la vera rilevanza semantica. Si pensi, ad esempio, alla
  ricerca di "migliori pratiche per l'ottimizzazione dei database": si
  potrebbero ottenere documenti con un'elevata somiglianza vettoriale che
  menzionano frequentemente questi termini, ma che in realtà non forniscono
  strategie di ottimizzazione concrete.
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">Panoramica su Model Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>La ricerca vettoriale tradizionale ordina i risultati esclusivamente in base alla somiglianza matematica, ovvero al grado di corrispondenza tra i vettori in uno spazio ad alta dimensionalità. Sebbene efficiente, questo approccio spesso trascura la vera rilevanza semantica. Si consideri, ad esempio <strong>,</strong> la ricerca di <strong>"best practice per l'ottimizzazione dei database":</strong> si potrebbero ottenere documenti con un'elevata somiglianza vettoriale che menzionano frequentemente questi termini, ma che in realtà non forniscono strategie di ottimizzazione concrete.</p>
<p>Model Ranker trasforma la ricerca in Milvus integrando modelli linguistici avanzati in grado di comprendere le relazioni semantiche tra query e documenti. Anziché basarsi esclusivamente sulla somiglianza vettoriale, valuta il significato e il contesto dei contenuti per fornire risultati più intelligenti e pertinenti.</p>
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
<li><p>I Model Ranker non possono essere utilizzati con le ricerche raggruppate.</p></li>
<li><p>I campi utilizzati per il riordino dei modelli devono essere di tipo testo (<code translate="no">VARCHAR</code>).</p></li>
<li><p>Ogni Model Ranker può utilizzare un solo campo <code translate="no">VARCHAR</code> alla volta per la valutazione.</p></li>
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
    </button></h2><p>I "Model Ranker" integrano le funzionalità di comprensione dei modelli linguistici nel processo di ricerca di Milvus attraverso un flusso di lavoro ben definito:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" /> 
   <span>Panoramica sul Model Ranker</span>
  
 </span></p>
<ol>
<li><p><strong>Query iniziale</strong>: l’applicazione invia una query a Milvus</p></li>
<li><p><strong>Ricerca vettoriale</strong>: Milvus esegue una ricerca vettoriale standard per identificare i documenti candidati</p></li>
<li><p><strong>Recupero dei documenti candidati</strong>: il sistema identifica l’insieme iniziale di documenti candidati in base alla somiglianza vettoriale</p></li>
<li><p><strong>Valutazione del modello</strong>: la funzione Model Ranker elabora le coppie query-documento:</p>
<ul>
<li><p>Invia la query originale e i documenti candidati a un servizio di modelli esterno</p></li>
<li><p>Il modello linguistico valuta la rilevanza semantica tra la query e ciascun documento</p></li>
<li><p>A ciascun documento viene assegnato un punteggio di rilevanza basato sulla comprensione semantica</p></li>
</ul></li>
<li><p><strong>Riorganizzazione intelligente</strong>: i documenti vengono riordinati in base ai punteggi di rilevanza generati dal modello</p></li>
<li><p><strong>Risultati migliorati</strong>: la tua applicazione riceve risultati ordinati in base alla rilevanza semantica anziché alla sola somiglianza vettoriale</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">Scegli un fornitore di modelli adatto alle tue esigenze<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supporta i seguenti fornitori di servizi di modelli per il riordino, ciascuno con caratteristiche distinte:</p>
<table>
   <tr>
     <th><p>Fornitore</p></th>
     <th><p>Ideale per</p></th>
     <th><p>Caratteristiche</p></th>
     <th><p>Caso d'uso esemplificativo</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>Applicazioni complesse che richiedono una comprensione semantica approfondita e personalizzazione</p></td>
     <td><ul><li><p>Supporta vari modelli linguistici di grandi dimensioni</p></li><li><p>Opzioni di implementazione flessibili</p></li><li><p>Requisiti computazionali più elevati</p></li><li><p>Maggiore potenziale di personalizzazione</p></li></ul></td>
     <td><p>Piattaforma di ricerca giuridica che implementa modelli specifici di settore in grado di comprendere la terminologia giuridica e le relazioni tra i precedenti giurisprudenziali</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>Implementazione rapida con un uso efficiente delle risorse</p></td>
     <td><ul><li><p>Servizio leggero ottimizzato per le operazioni sui testi</p></li><li><p>Implementazione più semplice con requisiti di risorse ridotti</p></li><li><p>Modelli di riclassificazione pre-ottimizzati</p></li><li><p>Overhead minimo dell’infrastruttura</p></li></ul></td>
     <td><p>Sistema di gestione dei contenuti che necessita di funzionalità di riclassificazione efficienti con requisiti standard</p></td>
   </tr>
   <tr>
     <td><p>Cohere</p></td>
     <td><p>Applicazioni aziendali che danno priorità all’affidabilità e alla facilità di integrazione</p></td>
     <td><ul><li><p>Affidabilità e scalabilità di livello aziendale</p></li><li><p>Servizio gestito senza necessità di manutenzione dell’infrastruttura</p></li><li><p>Funzionalità di riclassificazione multilingue</p></li><li><p>Limitazione della velocità e gestione degli errori integrate</p></li></ul></td>
     <td><p>Piattaforma di e-commerce che richiede una ricerca ad alta disponibilità con prestazioni API costanti e cataloghi prodotti multilingue</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>Applicazioni RAG con requisiti specifici in termini di prestazioni e contesto</p></td>
     <td><ul><li><p>Modelli addestrati specificamente per attività di riclassificazione</p></li><li><p>Controlli granulari di troncamento per documenti di diverse lunghezze</p></li><li><p>Inferenza ottimizzata per i carichi di lavoro in produzione</p></li><li><p>Diverse varianti di modello (rerank-2, rerank-lite, ecc.)</p></li></ul></td>
     <td><p>Database di ricerca con documenti di lunghezza variabile che richiedono un controllo ottimizzato delle prestazioni e una comprensione semantica specializzata</p></td>
   </tr>
   <tr>
     <td><p>SiliconFlow</p></td>
     <td><p>Applicazioni che elaborano documenti lunghi con priorità di efficienza in termini di costi</p></td>
     <td><ul><li><p>Segmentazione avanzata dei documenti con sovrapposizione configurabile</p></li><li><p>Punteggio basato sui segmenti (il segmento con il punteggio più alto rappresenta il documento)</p></li><li><p>Supporto per diversi modelli di riordino</p></li><li><p>Conveniente grazie alle varianti di modello standard e pro</p></li></ul></td>
     <td><p>Sistema di ricerca nella documentazione tecnica per l’elaborazione di manuali e articoli di grandi dimensioni che richiedono una segmentazione intelligente e il controllo delle sovrapposizioni</p></td>
   </tr>
   <tr>
     <td><p>Hugging Face</p></td>
     <td><p>Applicazioni che utilizzano i modelli di similarità delle frasi di Hugging Face in hosting</p></td>
     <td><ul><li><p>Utilizza il provider ospitato <code translate="no">hf-inference</code> </p></li><li><p>Seleziona i modelli dall'Hugging Face Hub</p></li><li><p>Calcola un punteggio di similarità tra frasi per ciascun candidato</p></li><li><p>Utilizza l’autenticazione tramite chiave API</p></li></ul></td>
     <td><p>Applicazioni di ricerca semantica che desiderano riorganizzare i testi candidati utilizzando un modello Hugging Face senza dover gestire un servizio di inferenza separato</p></td>
   </tr>
</table>
<p>Per informazioni dettagliate sull’implementazione di ciascun servizio di modello, consultare la documentazione dedicata:</p>
<ul>
<li><p><a href="/docs/it/v2.6.x/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/it/v2.6.x/tei-ranker.md">TEI Ranker</a></p></li>
<li><p><a href="/docs/it/v2.6.x/cohere-ranker.md">Cohere Ranker</a></p></li>
<li><p><a href="/docs/it/v2.6.x/voyage-ai-ranker.md">Voyage AI Ranker</a></p></li>
<li><p><a href="/docs/it/v2.6.x/siliconflow-ranker.md">SiliconFlow Ranker</a></p></li>
<li><p><a href="/docs/it/v2.6.x/hugging-face-ranker.md">Classificatore Hugging Face</a></p></li>
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
    </button></h2><p>Prima di implementare Model Ranker, assicurati di disporre di:</p>
<ul>
<li><p>Una collezione Milvus con un campo " <code translate="no">VARCHAR</code> " contenente il testo da riclassificare</p></li>
<li><p>Un servizio di modelli esterno in esecuzione accessibile alla propria istanza Milvus</p></li>
<li><p>Una connettività di rete adeguata tra Milvus e il servizio di modelli scelto</p></li>
</ul>
<p>I Model Ranker si integrano perfettamente sia con le operazioni di ricerca vettoriale standard che con quelle ibride. L’implementazione prevede la creazione di un oggetto Function che definisce la configurazione di riclassificazione e il suo passaggio alle operazioni di ricerca.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">Creazione di un Model Ranker<button data-href="#Create-a-model-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Per implementare il riclassificatore di modelli, definire innanzitutto un oggetto Function con la configurazione appropriata. In questo esempio, utilizziamo TEI come fornitore di servizi:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
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
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot;, &quot;vllm&quot;, etc.</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.ModelRanker;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">ModelRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> ModelRanker.builder()
        .name(<span class="hljs-string">&quot;semantic_ranker&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .provider(<span class="hljs-string">&quot;tei&quot;</span>)
        .queries(Collections.singletonList(<span class="hljs-string">&quot;machine learning for time series&quot;</span>))
        .endpoint(<span class="hljs-string">&quot;http://model-service:8080&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Obbligatorio?</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore / Esempio</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Identificatore della funzione da utilizzare durante l'esecuzione delle ricerche.</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Nome del campo di testo da utilizzare per il riclassamento.</p><p>Deve essere un campo di tipo " <code translate="no">VARCHAR</code> ".</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Specifica il tipo di funzione che si sta creando.</p><p>Deve essere impostato su " <code translate="no">RERANK</code> " per tutti i classificatori del modello.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Un dizionario contenente la configurazione per la funzione di riclassificazione basata sul modello. I parametri disponibili (chiavi) variano a seconda del fornitore di servizi.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Deve essere impostato su <code translate="no">"model"</code> per abilitare il riclassamento basato su modello.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Il fornitore di servizi del modello da utilizzare per il riclassamento.</p></td>
     <td><p><code translate="no">"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Elenco delle stringhe di query utilizzate dal modello di riclassificazione per calcolare i punteggi di rilevanza.</p><p>Il numero di stringhe di query deve corrispondere esattamente al numero di query presenti nell’operazione di ricerca (anche quando si utilizzano vettori di query anziché testo); in caso contrario, verrà segnalato un errore.</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>Sì</p></td>
     <td><p>URL del servizio del modello.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>No</p></td>
     <td><p>Numero massimo di documenti da elaborare in un singolo batch. Valori più elevati aumentano la produttività ma richiedono più memoria.</p></td>
     <td><p><code translate="no">32</code> (impostazione predefinita)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Applica alla ricerca vettoriale standard<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Dopo aver definito il proprio modello di classificazione, è possibile applicarlo durante le operazioni di ricerca passandolo al parametro `ranker`:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Number of query vectors must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;machine learning for time series&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(document))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
