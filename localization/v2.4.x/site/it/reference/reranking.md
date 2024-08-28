---
id: reranking.md
summary: >-
  Questo argomento tratta il processo di reranking, spiegandone il significato e
  l'implementazione di due metodi di reranking.
title: Reranking
---
<h1 id="Reranking" class="common-anchor-header">Reranking<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus abilita le funzionalità di ricerca ibrida utilizzando l'API <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md">hybrid_search()</a>, che incorpora sofisticate strategie di reranking per affinare i risultati delle ricerche da più istanze di <code translate="no">AnnSearchRequest</code>. Questo argomento tratta il processo di reranking, spiegandone il significato e l'implementazione di diverse strategie di reranking in Milvus.</p>
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
    </button></h2><p>La figura seguente illustra l'esecuzione di una ricerca ibrida in Milvus ed evidenzia il ruolo del reranking nel processo.</p>
<p><img translate="no" src="/docs/v2.4.x/assets/multi-vector-rerank.png" alt="reranking_process" width="300"/></p>
<p>Il reranking nella ricerca ibrida è una fase cruciale che consolida i risultati di diversi campi vettoriali, assicurando che l'output finale sia pertinente e accuratamente prioritario. Attualmente, Milvus offre queste strategie di reranking:</p>
<ul>
<li><p><code translate="no">WeightedRanker</code>: Questo approccio unisce i risultati calcolando una media ponderata dei punteggi (o distanze vettoriali) di diverse ricerche vettoriali. Assegna i pesi in base alla rilevanza di ciascun campo vettoriale.</p></li>
<li><p><code translate="no">RRFRanker</code>: Questa strategia combina i risultati in base ai loro ranghi nelle diverse colonne vettoriali.</p></li>
</ul>
<h2 id="Weighted-Scoring-WeightedRanker" class="common-anchor-header">Punteggio ponderato (WeightedRanker)<button data-href="#Weighted-Scoring-WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>La strategia <code translate="no">WeightedRanker</code> assegna pesi diversi ai risultati di ogni percorso di reperimento vettoriale in base alla significatività di ogni campo vettoriale. Questa strategia di reranking si applica quando l'importanza di ciascun campo vettoriale varia, consentendo di enfatizzare alcuni campi vettoriali rispetto ad altri assegnando loro pesi più elevati. Ad esempio, in una ricerca multimodale, la descrizione del testo potrebbe essere considerata più importante della distribuzione dei colori nelle immagini.</p>
<p>Il processo di base di WeightedRanker è il seguente:</p>
<ul>
<li><p><strong>Raccogliere i punteggi durante il recupero</strong>: Raccoglie i risultati e i loro punteggi da diversi percorsi di recupero vettoriale.</p></li>
<li><p><strong>Normalizzazione dei punteggi</strong>: Normalizza i punteggi di ogni percorso in un intervallo [0,1], dove i valori più vicini a 1 indicano una maggiore rilevanza. Questa normalizzazione è fondamentale perché le distribuzioni dei punteggi variano in base ai diversi tipi di metrica. Ad esempio, la distanza per IP varia da [-∞,+∞], mentre la distanza per L2 varia da [0,+∞]. Milvus utilizza la funzione <code translate="no">arctan</code>, trasformando i valori nell'intervallo [0,1] per fornire una base standardizzata per i diversi tipi di metrica.</p>
<p><img translate="no" src="/docs/v2.4.x/assets/arctan.png" alt="arctan-function" width="300"/></p></li>
<li><p><strong>Allocazione dei pesi</strong>: Assegna un peso <code translate="no">w𝑖</code> a ogni percorso di recupero vettoriale. Gli utenti specificano i pesi, che riflettono l'affidabilità, l'accuratezza o altre metriche pertinenti della fonte di dati. Ogni peso varia da [0,1].</p></li>
<li><p><strong>Fusione del punteggio</strong>: Calcola una media ponderata dei punteggi normalizzati per ottenere il punteggio finale. I risultati vengono quindi classificati in base a questi punteggi, dal più alto al più basso, per generare i risultati finali ordinati.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x//assets/weighted-reranker.png" alt="weighted-reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>reranker ponderato</span> </span></p>
<p>Per utilizzare questa strategia, applicare un'istanza di <code translate="no">WeightedRanker</code> e impostare i valori dei pesi passando un numero variabile di argomenti numerici.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.7</span>) 
<button class="copy-code-btn"></button></code></pre>
<p>Si noti che:</p>
<ul>
<li><p>Ogni valore di peso varia da 0 (meno importante) a 1 (più importante), influenzando il punteggio finale aggregato.</p></li>
<li><p>Il numero totale di valori di peso forniti in <code translate="no">WeightedRanker</code> deve essere uguale al numero di istanze di <code translate="no">AnnSearchRequest</code> create in precedenza.</p></li>
<li><p>Vale la pena notare che, a causa delle diverse misure dei vari tipi di metrica, normalizziamo le distanze dei risultati di richiamo in modo che siano comprese nell'intervallo [0,1], dove 0 significa diverso e 1 significa simile. Il punteggio finale sarà la somma dei valori di peso e delle distanze.</p></li>
</ul>
<h2 id="Reciprocal-Rank-Fusion-RRFRanker" class="common-anchor-header">Fusione di rango reciproco (RRFRanker)<button data-href="#Reciprocal-Rank-Fusion-RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF è un metodo di fusione dei dati che combina le liste di classificazione in base al reciproco dei loro ranghi. È un modo efficace per bilanciare l'influenza di ciascun campo vettoriale, soprattutto quando non esiste una chiara precedenza di importanza. Questa strategia si usa in genere quando si vuole dare la stessa considerazione a tutti i campi vettoriali o quando c'è incertezza sull'importanza relativa di ciascun campo.</p>
<p>Il processo di base della RRF è il seguente:</p>
<ul>
<li><p><strong>Raccogliere le classifiche durante il recupero</strong>: I recuperatori di più campi vettoriali recuperano e ordinano i risultati.</p></li>
<li><p><strong>Fusione delle classifiche</strong>: L'algoritmo RRF pondera e combina le classifiche di ciascun retriever. La formula è la seguente:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x//assets/rrf-ranker.png" alt="rrf-ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>rrf-ranker</span> </span></p>
<p>Qui, 𝑁 rappresenta il numero di percorsi di recupero diversi, rank𝑖(𝑑) è la posizione di rango del documento recuperato 𝑑 da parte dell'𝑖esimo retriever e 𝑘 è un parametro di smussamento, in genere impostato a 60.</p></li>
<li><p><strong>Classifica completa</strong>: Classifica nuovamente i risultati recuperati in base ai punteggi combinati per produrre i risultati finali.</p></li>
</ul>
<p>Per utilizzare questa strategia, applicare un'istanza di <code translate="no">RRFRanker</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

<span class="hljs-comment"># Default k value is 60</span>
ranker = RRFRanker()

<span class="hljs-comment"># Or specify k value</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<p>La RRF permette di bilanciare l'influenza tra i campi senza specificare pesi espliciti. Le migliori corrispondenze concordate da più campi avranno la priorità nella classifica finale.</p>
