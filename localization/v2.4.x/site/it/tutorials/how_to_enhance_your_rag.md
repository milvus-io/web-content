---
id: how_to_enhance_your_rag.md
summary: >-
  Con l'aumento della popolarità delle applicazioni RAG (Retrieval Augmented
  Generation), cresce la preoccupazione di migliorarne le prestazioni. Questo
  articolo presenta tutti i modi possibili per ottimizzare le pipeline RAG e
  fornisce le relative illustrazioni per aiutarvi a comprendere rapidamente le
  principali strategie di ottimizzazione RAG.
title: Come migliorare le prestazioni della pipeline RAG
---
<h1 id="How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="common-anchor-header">Come migliorare le prestazioni della pipeline RAG<button data-href="#How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>Con la crescente popolarità delle applicazioni di Retrieval Augmented Generation<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">(RAG</a>), cresce la preoccupazione di migliorarne le prestazioni. Questo articolo presenta tutti i modi possibili per ottimizzare le pipeline RAG e fornisce le relative illustrazioni per aiutarvi a comprendere rapidamente le principali strategie di ottimizzazione RAG.</p>
<p>È importante notare che forniremo solo un'esplorazione di alto livello di queste strategie e tecniche, concentrandoci su come si integrano in un sistema RAG. Tuttavia, non ci addentreremo in dettagli intricati né vi guideremo nell'implementazione passo dopo passo.</p>
<h2 id="A-Standard-RAG-Pipeline" class="common-anchor-header">Una pipeline RAG standard<button data-href="#A-Standard-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Il diagramma seguente mostra la pipeline RAG vanilla più semplice. Innanzitutto, i pezzi di documento vengono caricati in un archivio vettoriale (come <a href="https://milvus.io/docs">Milvus</a> o <a href="https://zilliz.com/cloud">Zilliz cloud</a>). Quindi, l'archivio vettoriale recupera i Top-K chunk più rilevanti relativi alla query. Questi pezzi rilevanti vengono poi iniettati nel prompt contestuale del <a href="https://zilliz.com/glossary/large-language-models-(llms)">LLM</a>, che infine restituisce la risposta finale.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/vanilla_rag.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Various-Types-of-RAG-Enhancement-Techniques" class="common-anchor-header">Diversi tipi di tecniche di miglioramento delle RAG<button data-href="#Various-Types-of-RAG-Enhancement-Techniques" class="anchor-icon" translate="no">
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
    </button></h2><p>Possiamo classificare diversi approcci di miglioramento delle RAG in base al loro ruolo nelle fasi della pipeline delle RAG.</p>
<ul>
<li><strong>Miglioramento della query</strong>: Modifica e manipolazione del processo di interrogazione dell'input della RAG per esprimere o elaborare meglio l'intento dell'interrogazione.</li>
<li><strong>Miglioramento dell'indicizzazione</strong>: Ottimizzazione della creazione di indici di chunking utilizzando tecniche come il multi-chunking, l'indicizzazione step-wise o l'indicizzazione multi-way.</li>
<li><strong>Miglioramento del reperimento</strong>: Applicazione di tecniche e strategie di ottimizzazione durante il processo di recupero.</li>
<li><strong>Miglioramento del generatore</strong>: Regolazione e ottimizzazione dei prompt durante l'assemblaggio dei prompt per il LLM per fornire risposte migliori.</li>
<li><strong>Miglioramento della pipeline RAG</strong>: Commutazione dinamica dei processi all'interno dell'intera pipeline RAG, compreso l'utilizzo di agenti o strumenti per ottimizzare i passaggi chiave della pipeline RAG.</li>
</ul>
<p>In seguito, verranno presentati metodi specifici per ciascuna di queste categorie.</p>
<h2 id="Query-Enhancement" class="common-anchor-header">Miglioramento delle query<button data-href="#Query-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Esploriamo quattro metodi efficaci per migliorare l'esperienza di interrogazione: Domande ipotetiche, Incorporamenti di documenti ipotetici, Sub-Query e Prompt di ritorno.</p>
<h3 id="Creating-Hypothetical-Questions" class="common-anchor-header">Creare domande ipotetiche</h3><p>La creazione di domande ipotetiche prevede l'utilizzo di un LLM per generare domande multiple che gli utenti potrebbero porre sul contenuto di ogni frammento di documento. Prima che la domanda reale dell'utente raggiunga l'LLM, l'archivio vettoriale recupera le domande ipotetiche più rilevanti relative alla domanda reale, insieme ai corrispondenti chunk di documenti, e le inoltra all'LLM.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/hypothetical_question.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Questa metodologia aggira il problema dell'asimmetria tra i domini nel processo di ricerca vettoriale, impegnandosi direttamente nella ricerca da domanda a domanda, alleggerendo il peso delle ricerche vettoriali. Tuttavia, introduce ulteriori spese e incertezze nella generazione di domande ipotetiche.</p>
<h3 id="HyDE-Hypothetical-Document-Embeddings" class="common-anchor-header">HyDE (Hypothetical Document Embeddings)</h3><p>HyDE è l'acronimo di Hypothetical Document Embeddings. Sfrutta un LLM per creare un &quot;<strong><em>documento ipotetico</em></strong>&quot; o una risposta <strong><em>falsa</em></strong> in risposta a una domanda dell'utente priva di informazioni contestuali. Questa risposta fittizia viene poi convertita in embeddings vettoriali e utilizzata per interrogare i pezzi di documento più rilevanti all'interno di un database vettoriale. Successivamente, il database vettoriale recupera i Top-K chunks di documenti più rilevanti e li trasmette al LLM e alla query originale dell'utente per generare la risposta finale.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/hyde.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Questo metodo è simile alla tecnica della domanda ipotetica per affrontare l'asimmetria interdimensionale nelle ricerche vettoriali. Tuttavia, presenta anche degli svantaggi, come i costi computazionali aggiuntivi e le incertezze legate alla generazione di risposte false.</p>
<p>Per ulteriori informazioni, consultare il documento <a href="https://arxiv.org/abs/2212.10496">HyDE</a>.</p>
<h3 id="Creating-Sub-Queries" class="common-anchor-header">Creazione di sotto-query</h3><p>Quando una query dell'utente è troppo complicata, possiamo usare un LLM per scomporla in sotto-query più semplici prima di passarle al database vettoriale e all'LLM. Vediamo un esempio.</p>
<p>Immaginiamo che un utente chieda:<strong><em>&quot;Quali sono le differenze di caratteristiche tra Milvus e Zilliz Cloud?</em></strong>&quot; Questa domanda è piuttosto complessa e potrebbe non avere una risposta diretta nella nostra base di conoscenze. Per affrontare la questione, possiamo dividerla in due sotto-query più semplici:</p>
<ul>
<li>Sotto-query 1: "Quali sono le caratteristiche di Milvus?".</li>
<li>Sub-query 2: "Quali sono le caratteristiche di Zilliz Cloud?".</li>
</ul>
<p>Una volta ottenute queste sotto-query, le inviamo tutte al database vettoriale dopo averle convertite in embeddings vettoriali. Il database vettoriale trova quindi i Top-K document chunks più rilevanti per ogni sotto-query. Infine, il LLM utilizza queste informazioni per generare una risposta migliore.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Scomponendo la domanda dell'utente in sotto-query, rendiamo più facile per il nostro sistema trovare informazioni pertinenti e fornire risposte accurate, anche a domande complesse.</p>
<h3 id="Creating-Stepback-Prompts" class="common-anchor-header">Creazione di prompt stepback</h3><p>Un altro modo per semplificare le domande complesse dell'utente è quello di creare dei <strong><em>prompt a ritroso</em></strong>. Questa tecnica consiste nell'astrarre le domande complesse dell'utente in <em><em>&quot;</em>domande a ritroso</em>&quot;** utilizzando un LLM. Poi, un database vettoriale utilizza queste domande per recuperare i pezzi di documento più rilevanti. Infine, l'LLM genera una risposta più accurata sulla base dei pezzi di documento recuperati.</p>
<p>Illustriamo questa tecnica con un esempio. Consideriamo la seguente domanda, piuttosto complessa e di non facile risposta diretta:</p>
<p><strong><em>Query originale dell'utente: "Ho un set di dati con 10 miliardi di record e voglio memorizzarlo in Milvus per poterlo interrogare. È possibile?"</em></strong></p>
<p>Per semplificare questa domanda dell'utente, possiamo utilizzare un LLM per generare una domanda di ritorno più semplice:</p>
<p><strong><em>Domanda di ritorno: "Qual è il limite di dimensione del dataset che Milvus può gestire?".</em></strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/stepback.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Questo metodo può aiutarci a ottenere risposte migliori e più precise a domande complesse. Scompone la domanda originale in una forma più semplice, rendendo più facile per il nostro sistema trovare informazioni pertinenti e fornire risposte accurate.</p>
<h2 id="Indexing-Enhancement" class="common-anchor-header">Miglioramento dell'indicizzazione<button data-href="#Indexing-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Il miglioramento dell'indicizzazione è un'altra strategia per migliorare le prestazioni delle applicazioni RAG. Esploriamo tre tecniche di miglioramento dell'indicizzazione.</p>
<h3 id="Merging-Document-Chunks-Automatically" class="common-anchor-header">Unire automaticamente i pezzi di documento</h3><p>Quando si costruisce un indice, si possono utilizzare due livelli di granularità: i pezzi figli e i corrispondenti pezzi genitori. Inizialmente, cerchiamo i pezzi figli a un livello di dettaglio più fine. Poi, applichiamo una strategia di fusione: se un numero specifico, <strong><em>n</em></strong>, di chunk figlio dei primi <strong><em>k</em></strong> chunk figlio appartiene allo stesso chunk genitore, forniamo questo chunk genitore all'LLM come informazione contestuale.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/merge_chunks.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Questa metodologia è stata implementata in <a href="https://docs.llamaindex.ai/en/stable/examples/retrievers/recursive_retriever_nodes.html">LlamaIndex</a>.</p>
<h3 id="Constructing-Hierarchical-Indices" class="common-anchor-header">Costruzione di indici gerarchici</h3><p>Quando si creano indici per i documenti, si può stabilire un indice a due livelli: uno per i sommari dei documenti e un altro per i chunk dei documenti. Il processo di ricerca vettoriale comprende due fasi: inizialmente si filtrano i documenti rilevanti in base al sommario e successivamente si recuperano i pezzi di documento corrispondenti esclusivamente all'interno di questi documenti rilevanti.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/hierarchical_index.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Questo approccio si rivela vantaggioso in situazioni che coinvolgono grandi volumi di dati o in casi in cui i dati sono gerarchici, come nel caso del recupero di contenuti all'interno di una collezione di biblioteche.</p>
<h3 id="Hybrid-Retrieval-and-Reranking" class="common-anchor-header">Recupero ibrido e riclassificazione</h3><p>La tecnica Hybrid Retrieval and Reranking integra uno o più metodi di recupero supplementari con il <a href="https://zilliz.com/learn/vector-similarity-search">recupero della similarità vettoriale</a>. Quindi, un <a href="https://zilliz.com/learn/optimize-rag-with-rerankers-the-role-and-tradeoffs#What-is-a-Reranker">reranker</a> classifica i risultati recuperati in base alla loro pertinenza rispetto alla richiesta dell'utente.</p>
<p>Gli algoritmi di recupero supplementari più comuni includono metodi basati sulla frequenza lessicale, come <a href="https://milvus.io/docs/embed-with-bm25.md">BM25</a>, o grandi modelli che utilizzano embeddings sparsi, come <a href="https://zilliz.com/learn/discover-splade-revolutionize-sparse-data-processing">Splade</a>. Gli algoritmi di reranking includono RRF o modelli più sofisticati come <a href="https://www.sbert.net/examples/applications/cross-encoder/README.html">Cross-Encoder</a>, che assomiglia ad architetture simili a BERT.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Questo approccio sfrutta diversi metodi di recupero per migliorare la qualità del recupero e affrontare le potenziali lacune nel richiamo dei vettori.</p>
<h2 id="Retriever-Enhancement" class="common-anchor-header">Miglioramento del retriever<button data-href="#Retriever-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Anche il perfezionamento del componente retriever all'interno del sistema RAG può migliorare le applicazioni RAG. Esploriamo alcuni metodi efficaci per migliorare il retriever.</p>
<h3 id="Sentence-Window-Retrieval" class="common-anchor-header">Recupero della finestra di frase</h3><p>In un sistema RAG di base, il chunk di documento fornito al LLM è una finestra più ampia che comprende il chunk di incorporamento recuperato. Ciò garantisce che le informazioni fornite al LLM includano una gamma più ampia di dettagli contestuali, riducendo al minimo la perdita di informazioni. La tecnica di Sentence Window Retrieval disaccoppia il chunk del documento utilizzato per il recupero dell'embedding dal chunk fornito all'LLM.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/sentence_window.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Tuttavia, l'espansione delle dimensioni della finestra può introdurre ulteriori informazioni di disturbo. Possiamo regolare la dimensione dell'espansione della finestra in base alle specifiche esigenze aziendali.</p>
<h3 id="Meta-data-Filtering" class="common-anchor-header">Filtraggio dei metadati</h3><p>Per garantire risposte più precise, possiamo affinare i documenti recuperati filtrando i metadati come l'ora e la categoria prima di passarli al LLM. Ad esempio, se si recuperano rapporti finanziari che coprono più anni, il filtro basato sull'anno desiderato perfezionerà le informazioni per soddisfare i requisiti specifici. Questo metodo si rivela efficace in situazioni con dati estesi e metadati dettagliati, come il recupero di contenuti nelle collezioni delle biblioteche.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/metadata_filtering.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Generator-Enhancement" class="common-anchor-header">Miglioramento del generatore<button data-href="#Generator-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Esploriamo altre tecniche di ottimizzazione delle RAG migliorando il generatore all'interno di un sistema RAG.</p>
<h3 id="Compressing-the-LLM-prompt" class="common-anchor-header">Comprimere il prompt LLM</h3><p>Le informazioni di disturbo all'interno dei pezzi di documento recuperati possono influire in modo significativo sull'accuratezza della risposta finale di RAG. Anche la finestra di prompt limitata degli LLM rappresenta un ostacolo per ottenere risposte più accurate. Per affrontare questa sfida, possiamo comprimere i dettagli irrilevanti, enfatizzare i paragrafi chiave e ridurre la lunghezza complessiva del contesto dei pezzi di documento recuperati.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/compress_prompt.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Questo approccio è simile al metodo di recupero ibrido e di reranking discusso in precedenza, in cui viene utilizzato un reranker per eliminare i pezzi di documento irrilevanti.</p>
<h3 id="Adjusting-the-chunk-order-in-the-prompt" class="common-anchor-header">Regolazione dell'ordine dei chunk nel prompt</h3><p>Nell'articolo &quot;<a href="https://arxiv.org/abs/2307.03172">Lost in the middle</a>&quot;, i ricercatori hanno osservato che i LLM spesso trascurano le informazioni al centro dei documenti dati durante il processo di ragionamento. Invece, tendono a basarsi maggiormente sulle informazioni presentate all'inizio e alla fine dei documenti.</p>
<p>Sulla base di questa osservazione, possiamo regolare l'ordine dei pezzi recuperati per migliorare la qualità della risposta: quando si recuperano più pezzi di conoscenza, i pezzi con una fiducia relativamente bassa vengono collocati al centro, mentre quelli con una fiducia relativamente alta vengono posizionati alle due estremità.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/adjust_order.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="RAG-Pipeline-Enhancement" class="common-anchor-header">Miglioramento della pipeline RAG<button data-href="#RAG-Pipeline-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Possiamo anche migliorare le prestazioni delle vostre applicazioni RAG potenziando l'intera pipeline RAG.</p>
<h3 id="Self-reflection" class="common-anchor-header">Auto-riflessione</h3><p>Questo approccio incorpora il concetto di autoriflessione negli agenti AI. Come funziona questa tecnica?</p>
<p>Alcuni pezzi di documenti Top-K recuperati inizialmente sono ambigui e potrebbero non rispondere direttamente alla domanda dell'utente. In questi casi, possiamo condurre un secondo ciclo di riflessione per verificare se questi pezzi possono davvero rispondere alla domanda dell'utente.</p>
<p>La riflessione può essere condotta utilizzando metodi di riflessione efficienti, come i modelli di inferenza del linguaggio naturale (NLI) o strumenti aggiuntivi come le ricerche su Internet per la verifica.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/self_reflection.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Questo concetto di auto-riflessione è stato esplorato in diversi lavori o progetti, tra cui <a href="https://arxiv.org/pdf/2310.11511.pdf">Self-RAG</a>, <a href="https://arxiv.org/pdf/2401.15884.pdf">Corrective RAG</a>, <a href="https://github.com/langchain-ai/langgraph/blob/main/examples/reflexion/reflexion.ipynb">LangGraph</a>, ecc.</p>
<h3 id="Query-Routing-with-an-Agent" class="common-anchor-header">Instradamento delle query con un agente</h3><p>A volte non è necessario utilizzare un sistema di RAG per rispondere a domande semplici, perché ciò potrebbe causare maggiori fraintendimenti e inferenze da informazioni fuorvianti. In questi casi, possiamo utilizzare un agente come router nella fase di interrogazione. Questo agente valuta se la domanda deve passare attraverso la pipeline RAG. In caso affermativo, viene avviata la pipeline RAG successiva; in caso contrario, il LLM si occupa direttamente della query.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/query_routing.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/query_routing_with_sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>L'agente può assumere varie forme, tra cui un LLM, un piccolo modello di classificazione o anche un insieme di regole.</p>
<p>L'instradamento delle query in base all'intento dell'utente consente di reindirizzare una parte delle query, ottenendo un significativo aumento dei tempi di risposta e una notevole riduzione del rumore inutile.</p>
<p>Possiamo estendere la tecnica di instradamento delle query ad altri processi all'interno del sistema RAG, come ad esempio determinare quando utilizzare strumenti come le ricerche sul web, condurre sotto-query o cercare immagini. Questo approccio garantisce che ogni fase del sistema RAG sia ottimizzata in base ai requisiti specifici della query, portando a un recupero delle informazioni più efficiente e accurato.</p>
<h2 id="Summary" class="common-anchor-header">Sintesi<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebbene una pipeline RAG di base possa sembrare semplice, il raggiungimento di prestazioni aziendali ottimali richiede spesso tecniche di ottimizzazione più sofisticate.</p>
<p>Questo articolo riassume vari approcci popolari per migliorare le prestazioni delle applicazioni RAG. Abbiamo anche fornito illustrazioni chiare per aiutarvi a comprendere rapidamente questi concetti e queste tecniche e a velocizzarne l'implementazione e l'ottimizzazione.</p>
<p>È possibile ottenere le semplici implementazioni dei principali approcci elencati in questo articolo a questo <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag">link GitHub</a>.</p>
