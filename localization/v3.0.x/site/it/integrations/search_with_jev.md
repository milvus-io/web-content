---
id: search_with_jev.md
summary: >-
  La ricerca vettoriale individua le informazioni relative a una query. La
  creazione di un'applicazione di ricerca utile comporta anche delle decisioni:
  quali passaggi rispondono effettivamente alla domanda, se una risposta
  precedente possa essere riutilizzata e se un agente disponga di prove
  sufficienti per interrompere la ricerca.
title: Creare un RAG con Milvus + PII Masker
---
<h1 id="Search-with-Jev-and-Milvus" class="common-anchor-header">Ricerca con Jev e Milvus<button data-href="#Search-with-Jev-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>La ricerca vettoriale individua le informazioni correlate a una query. La creazione di un'applicazione di ricerca utile comporta anche delle decisioni: quali passaggi rispondono effettivamente alla domanda, se una risposta precedente possa essere riutilizzata e se un agente disponga di prove sufficienti per interrompere la ricerca.</p>
<p>Milvus e Jev si occupano di diverse parti di questo flusso di lavoro. <a href="https://milvus.io/">Milvus</a> memorizza gli embedding e recupera i record candidati, utilizzando filtri basati sui metadati per applicare vincoli quali la versione del prodotto o l’ambito della base di conoscenza. <a href="https://docs.typesafe.ai/introduction">Jev</a> valuta il significato del testo recuperato alla luce delle istruzioni. La vostra applicazione può utilizzare le sue valutazioni per selezionare le prove o controllare la fase successiva della ricerca.</p>
<h2 id="What-does-Jev-do" class="common-anchor-header">Cosa fa Jev?<button data-href="#What-does-Jev-do" class="anchor-icon" translate="no">
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
    </button></h2><p>Una richiesta a Jev fornisce il contesto e una o più domande di valutazione. <a href="https://docs.typesafe.ai/primitives">I</a> suoi <a href="https://docs.typesafe.ai/primitives">output tipizzati</a> includono una scelta tra opzioni fisse, un punteggio ordinato e una probabilità sì/no. Questi output consentono al codice dell’applicazione di prendere una decisione senza dover analizzare una spiegazione in formato libero. Un modello di generazione può comunque scrivere una risposta o una query di ricerca di approfondimento quando necessario.</p>
<p>Ad esempio, un utente chiede come installare Atlas v2. Milvus può limitare il recupero alla documentazione della v2 e restituire passaggi simili relativi all’installazione, agli aggiornamenti e alla risoluzione dei problemi. Jev valuta quindi quali passaggi spiegano la configurazione iniziale. L’applicazione trasmette le prove selezionate a un modello di generazione delle risposte.</p>
<p>Le responsabilità sono chiare:</p>
<ol>
<li><strong>Ricerca con Milvus:</strong> individuare i candidati entro i vincoli dei metadati richiesti.</li>
<li><strong>Valutare con Jev:</strong> valutare tali candidati in base alla domanda e a un criterio specifico per l’attività.</li>
<li><strong>Agire nel codice dell’applicazione:</strong> riordinare i risultati, filtrare il contesto, riutilizzare una risposta o continuare la ricerca.</li>
</ol>
<p>Alcune decisioni vengono prese prima del recupero. Jev può scegliere un ambito di ricerca o valutare i documenti in arrivo prima che entrino in una raccolta. Il controllo degli accessi e i filtri esatti rimangono di competenza dell’applicazione.</p>
<h2 id="Explore-the-search-scenarios" class="common-anchor-header">Esplora gli scenari di ricerca<button data-href="#Explore-the-search-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">La raccolta “Ricerca con Jev”</a> contiene nove tutorial eseguibili. Ciascuno utilizza un piccolo set di dati sintetico e mostra i record recuperati, le valutazioni e l’azione risultante.</p>
<h3 id="Select-better-evidence" class="common-anchor-header">Selezionare prove migliori<button data-href="#Select-better-evidence" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Riorganizza i risultati della ricerca</a>: riordina la documentazione e i ricordi degli agenti di codifica. Un ricordo relativo a un errore della porta di un laptop potrebbe assomigliare a un problema di connessione del container; un ricordo più utile registra la soluzione effettiva del problema tra container e host.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/filter_search_context.ipynb">Filtra il contesto recuperato</a>: distingue le istruzioni di installazione iniziale dai passaggi relativi all’aggiornamento e alla risoluzione dei problemi dopo che Milvus ha applicato il filtro di versione.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_graph_relations.ipynb">Riorganizza le relazioni del grafico</a>: rispondi a una domanda sul luogo di nascita dell’autore di un libro selezionando sia il collegamento libro-autore che la relazione autore-luogo di nascita, quindi mantieni tale classificazione durante il recupero dei passaggi di origine.</li>
</ul>
<h3 id="Control-search-and-answer-reuse" class="common-anchor-header">Controllare la ricerca e il riutilizzo delle risposte<button data-href="#Control-search-and-answer-reuse" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/decide_search_stopping.ipynb">Decidere quando interrompere la ricerca</a>: un modello di generazione propone ricerche sulla base delle prove accumulate, mentre Jev valuta se la domanda originale sia risolvibile. Gli esempi includono una risposta diretta, una domanda a due passaggi e un fatto non disponibile che raggiunge il limite di ricerca senza una risposta.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/route_search_queries.ipynb">Indirizzare le query di ricerca</a>: selezionare la ricerca nella documentazione, nella fatturazione o nella memoria, quindi applicare il filtro Milvus corrispondente. Una query fuori dall’ambito segue un percorso separato.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/validate_semantic_cache.ipynb">Convalidare il riutilizzo della cache semantica</a>: recuperare una richiesta simile memorizzata nella cache, quindi verificare se la sua risposta soddisfa anche i requisiti di attività, linguaggio e contesto della nuova richiesta.</li>
</ul>
<h3 id="Improve-and-inspect-the-knowledge-pipeline" class="common-anchor-header">Migliorare e ispezionare la pipeline di conoscenza<button data-href="#Improve-and-inspect-the-knowledge-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/curate_search_data.ipynb">Curare i documenti prima dell’indicizzazione</a>: distinguere le linee guida operative sostanziali dal materiale promozionale o incompleto, con azioni separate di indicizzazione, revisione ed esclusione.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/check_search_guardrails.ipynb">Esaminare i passaggi recuperati</a>: identificare il testo che cerca di fuorviare un assistente, pur mantenendo i normali consigli di sicurezza. Si tratta di una fase di screening aggiuntiva, non di una garanzia di sicurezza.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/evaluation_with_jev.ipynb">Valutare le prove della ricerca</a>: giudicare la rilevanza dei passaggi, se le prove sono sufficienti e se una risposta contiene affermazioni non supportate. Gli esempi rimuovono deliberatamente le prove o aggiungono un'affermazione non supportata per rendere visibile la distinzione.</li>
</ul>
<h2 id="A-ready-made-reranking-interface" class="common-anchor-header">Un'interfaccia di riclassificazione pronta all'uso<button data-href="#A-ready-made-reranking-interface" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus-model">Milvus Model</a> fornisce un’ <code translate="no">JevRerankFunction</code> a a livello di applicazione: si inviano una query e i testi dei documenti candidati, ricevendo in cambio i risultati ponderati con i loro indici originali, ordinati per rilevanza. Utilizzare tali indici per riordinare i record restituiti da Milvus.</p>
<p><a href="https://github.com/milvus-io/milvus-model/pull/90">L’integrazione con Jev</a> è stata incorporata. Consultare <a href="https://github.com/milvus-io/milvus-model/blob/main/src/pymilvus/model/reranker/jev.py">l’implementazione e le opzioni del costruttore</a> per l’API attuale. Accetta ` <code translate="no">TYPESAFE_API_KEY</code> ` e imposta come valore predefinito ` <code translate="no">jev-latest</code>`. Utilizzare una versione del pacchetto che includa questa integrazione.</p>
<p>L’attuale wrapper utilizza un prompt di rilevanza basato su "affermazione e prova". Verifica che questo criterio sia adatto al tuo compito. Per valutazioni personalizzate quali la compatibilità della memoria, l’interruzione o l’instradamento, segui i tutorial collegati utilizzando direttamente l’API TypeSafe. I tutorial mostrano chiamate dirette all’API dal codice dell’applicazione Python.</p>
<h2 id="Try-it-with-Milvus" class="common-anchor-header">Provalo con Milvus<button data-href="#Try-it-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Apri il tutorial sul reranking in Colab</a> per iniziare con il recupero e il ranking dei candidati. Per la configurazione locale e l’elenco completo dei tutorial, consulta il <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/README.md">README della raccolta</a>.</p>
<p>Gli esempi utilizzano una <a href="https://aistudio.google.com/apikey">chiave API Gemini</a> per gli embedding e una <a href="https://console.typesafe.ai/">chiave API TypeSafe</a> per Jev. Anche il tutorial sulla ricerca agentica utilizza Gemini per la generazione di query e risposte. Il testo di esempio viene inviato a questi fornitori di API e le chiamate potrebbero consumare crediti.</p>
<p>I tutorial vengono eseguiti di default con <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> e includono opzioni di connessione per un server Milvus o <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. La stessa divisione dei compiti si applica a tutte le implementazioni: Milvus recupera i candidati e l’applicazione invia il testo pertinente a Jev per la valutazione.</p>
<p>Considerate gli esempi come punti di partenza per definire i vostri criteri e le vostre soglie. Un punteggio di rilevanza non garantisce che una risposta sia corretta e questi piccoli set di dati didattici non stabiliscono l’accuratezza o la velocità in ambiente di produzione.</p>
<h2 id="Explore-implementations-and-evaluation-results" class="common-anchor-header">Esplora le implementazioni e i risultati della valutazione<button data-href="#Explore-implementations-and-evaluation-results" class="anchor-icon" translate="no">
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
    </button></h2><p>I seguenti progetti open-source applicano queste idee a flussi di lavoro di ricerca più ampi. I relativi rapporti, accessibili tramite i link, spiegano i set di dati, i confronti e i limiti di ciascun esperimento.</p>
<table>
<thead>
<tr><th>Progetto</th><th>Caso d’uso della ricerca</th><th>Lavoro di Jev</th></tr>
</thead>
<tbody>
<tr><td><a href="https://github.com/zilliztech/memsearch">MemSearch</a></td><td>Memoria Markdown persistente per agenti di codifica</td><td><a href="https://github.com/zilliztech/memsearch/blob/main/src/memsearch/jev_reranker.py">Implementazione di Jev</a> · <a href="https://github.com/zilliztech/memsearch/blob/main/evaluation/reranking-evaluation.md">Valutazione</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/vector-graph-rag">Grafo vettoriale RAG</a></td><td>Recupero vettoriale e grafico per domande multi-hop</td><td><a href="https://github.com/zilliztech/vector-graph-rag/blob/main/src/vector_graph_rag/llm/jev.py">Implementazione Jev</a> · <a href="https://github.com/zilliztech/vector-graph-rag/blob/main/evaluation/jev/README.md">Valutazione</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/deep-searcher">DeepSearcher</a></td><td>Ricerca iterativa su conoscenze private</td><td><a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/run_full100.py">Esecutore di esperimenti</a> · <a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/README.md">Valutazione dell’interruzione della ricerca</a> (esperimento autonomo)</td></tr>
<tr><td><a href="https://github.com/zilliztech/GPTCache">GPTCache</a></td><td>Riutilizzo delle risposte alle richieste compatibili</td><td><a href="https://github.com/zilliztech/GPTCache/blob/main/gptcache/similarity_evaluation/jev.py">Implementazione Jev</a> · <a href="https://github.com/zilliztech/GPTCache/blob/main/examples/benchmark/reuse_compatibility/README.md">Valutazione</a></td></tr>
</tbody>
</table>
<p>Il contributo di DeepSearcher consiste in un esperimento autonomo di interruzione della ricerca. Gli altri link alle implementazioni mostrano integrazioni di Jev specifiche per determinati compiti. I risultati di questi progetti dovrebbero essere interpretati nel loro contesto di valutazione specifico, piuttosto che essere considerati come un benchmark condiviso.</p>
