---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  L'indice SPARSE_INVERTED_INDEX è un tipo di indice utilizzato da Milvus per
  memorizzare e cercare in modo efficiente vettori sparsi. Questo tipo di indice
  sfrutta i principi dell'indicizzazione invertita per creare una struttura di
  ricerca altamente efficiente per i dati sparsi.
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indice <code translate="no">SPARSE_INVERTED_INDEX</code> è un tipo di indice utilizzato da Milvus per memorizzare e cercare in modo efficiente vettori sparsi. Crea una struttura invertita a partire dalle dimensioni diverse da zero presenti nei vettori sparsi. È possibile utilizzare questo indice per la ricerca full-text BM25 e per la ricerca di embedding sparsi basata sul prodotto interno.</p>
<p>Per ulteriori informazioni sui campi di vettori sparsi, sui tipi di metrica e sulla ricerca full-text, consultare <a href="/docs/it/sparse_vector.md">Vettori sparsi</a>, <a href="/docs/it/metric.md">tipi di metrica</a> e <a href="/docs/it/full-text-search.md">ricerca full-text</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Creazione dell’indice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Per creare un indice " <code translate="no">SPARSE_INVERTED_INDEX</code> " su un campo di vettori sparsi in Milvus, utilizzare il metodo ` <code translate="no">add_index()</code> ` e specificare i parametri ` <code translate="no">index_type</code>`, ` <code translate="no">metric_type</code>` e `index`.</p>
<p>Per la ricerca full-text BM25, creare l’indice sul campo vettoriale sparso generato da una funzione BM25. Impostare ` <code translate="no">metric_type</code> ` su ` <code translate="no">BM25</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_bm25_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-comment"># Metric type used for full text search</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Per la ricerca con embedding sparsi, creare l'indice su un campo vettoriale sparso che memorizza vettori sparsi generati esternamente. Impostare ` <code translate="no">metric_type</code> ` su ` <code translate="no">IP</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_ip_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;SINDI&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Nelle configurazioni precedenti:</p>
<ul>
<li><p><code translate="no">index_type</code>: Il tipo di indice da creare. Impostare questo valore su <code translate="no">SPARSE_INVERTED_INDEX</code>.</p></li>
<li><p><code translate="no">metric_type</code>: La metrica utilizzata per calcolare la somiglianza tra i vettori sparsi. Valori validi:</p>
<ul>
<li><p><code translate="no">BM25</code>: Utilizza il punteggio di rilevanza BM25 per la ricerca full-text.</p></li>
<li><p><code translate="no">IP</code> (Prodotto scalare): misura la somiglianza dei vettori sparsi utilizzando il prodotto scalare.</p></li>
</ul>
<p>Per ulteriori dettagli, consultare <a href="/docs/it/metric.md">Tipi di metriche</a> e <a href="/docs/it/full-text-search.md">Ricerca full-text</a>.</p></li>
<li><p><code translate="no">params.inverted_index_algo</code>: L’algoritmo utilizzato per la creazione e l’interrogazione dell’indice. Valori validi:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code>: Elaborazione delle query «Document-at-a-Time» con MaxScore. Questa è l’impostazione predefinita per <code translate="no">BM25</code>. Per ulteriori informazioni, consultare <a href="https://dl.acm.org/doi/10.1016/0306-4573%2895%2900020-H">Valutazione delle query: strategie e ottimizzazioni</a>.</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Elaborazione delle query WAND (Document-at-a-Time). Questo algoritmo è adatto per valori topK più piccoli o query più brevi. Per ulteriori informazioni, consultare <a href="https://dl.acm.org/doi/10.1145/956863.956944">Valutazione efficiente delle query tramite un processo di recupero a due livelli</a>.</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Elaborazione delle query "Term-at-a-Time" di base. Utilizzare questa opzione come riferimento o quando è necessario che il punteggio si adatti dinamicamente alle statistiche globali della raccolta, come la lunghezza media dei documenti.</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_MAXSCORE&quot;</code>: Elaborazione delle query MaxScore con metadati del punteggio massimo a livello di blocco. Per ulteriori informazioni, consultare " <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">Recupero più veloce dei documenti top-k utilizzando indici Block-Max</a>".</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_WAND&quot;</code>: Elaborazione delle query WAND con metadati del punteggio massimo a livello di blocco. Per ulteriori informazioni, consultare " <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">Recupero più veloce dei documenti top-k utilizzando indici Block-Max</a>".</p></li>
<li><p><code translate="no">&quot;SINDI&quot;</code>: Un indice invertito sparso basato su finestre fisse di ID documento, con accelerazione SIMD per la ricerca. Questa è l’impostazione predefinita per <code translate="no">IP</code>. Per i dettagli, consultare il <a href="https://arxiv.org/abs/2509.08395">documento SINDI</a>.</p></li>
</ul>
<p>Se non si specifica <code translate="no">inverted_index_algo</code>, Milvus seleziona l’algoritmo predefinito in base a <code translate="no">metric_type</code>: <code translate="no">DAAT_MAXSCORE</code> per <code translate="no">BM25</code> e <code translate="no">SINDI</code> per <code translate="no">IP</code>.</p>
<p>Per ulteriori informazioni sui parametri di creazione disponibili per l’indice <code translate="no">SPARSE_INVERTED_INDEX</code>, consultare <a href="/docs/it/sparse-inverted-index.md#Index-building-params">Parametri di creazione dell’indice</a>.</p></li>
</ul>
<p>Una volta configurati i parametri dell'indice, è possibile creare l'indice utilizzando direttamente il metodo ` <code translate="no">create_index()</code> ` oppure passando i parametri dell'indice nel metodo ` <code translate="no">create_collection</code> `. Per i dettagli, consultare <a href="/docs/it/create-collection.md">Crea raccolta</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Ricerca sull'indice<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta creato l’indice e inserite le entità, è possibile eseguire ricerche di similarità sull’indice.</p>
<p>Per la ricerca full-text BM25, utilizzare il testo grezzo come query. Milvus converte il testo della query in un vettore sparso tramite la funzione BM25.</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[<span class="hljs-string">&quot;what is information retrieval?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Per la ricerca con embedding sparsi, utilizzare un dizionario di vettori sparsi come vettore di query.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    data=query_vector,
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>Per impostazione predefinita, Milvus utilizza l’algoritmo di ricerca configurato per l’indice.</p>
<p>Per ulteriori informazioni sui parametri di ricerca disponibili per l'indice " <code translate="no">SPARSE_INVERTED_INDEX</code> ", consultare <a href="/docs/it/sparse-inverted-index.md#Index-specific-search-params">Parametri di ricerca specifici dell'indice</a>.</p>
<h2 id="Index-params" class="common-anchor-header">Parametri dell’indice<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa sezione fornisce una panoramica dei parametri utilizzati per la creazione di un indice e per l’esecuzione di ricerche sull’indice.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parametri di creazione dell’indice<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La tabella seguente elenca i parametri che è possibile configurare in <code translate="no">params</code> durante <a href="/docs/it/sparse-inverted-index.md#Build-index">la creazione di un indice</a>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Intervallo di valori</p></th>
     <th><p>Suggerimento di ottimizzazione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>L'algoritmo utilizzato per la creazione e l'interrogazione dell'indice. Determina il modo in cui l'indice elabora le query.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code>, <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code>, <code translate="no">"BLOCK_MAX_MAXSCORE"</code>, <code translate="no">"BLOCK_MAX_WAND"</code>, <code translate="no">"SINDI"</code></p><p>Valore predefinito: <code translate="no">"DAAT_MAXSCORE"</code> per <code translate="no">BM25</code>; <code translate="no">"SINDI"</code> per <code translate="no">IP</code>.</p></td>
     <td><p>Utilizzare <code translate="no">"DAAT_MAXSCORE"</code> per i carichi di lavoro di ricerca full-text BM25 con valori k elevati o per query con molti termini.</p><p>Utilizzare <code translate="no">"DAAT_WAND"</code> per carichi di lavoro BM25 con valori k bassi o query brevi.</p><p>Utilizzare <code translate="no">"TAAT_NAIVE"</code> come linea di base o quando è necessario che il punteggio si adatti dinamicamente alle statistiche globali della raccolta, come la lunghezza media dei documenti.</p><p>Utilizzare <code translate="no">"BLOCK_MAX_MAXSCORE"</code> o <code translate="no">"BLOCK_MAX_WAND"</code> per utilizzare i metadati del punteggio massimo a livello di blocco per il pruning delle query.</p><p>Utilizzare <code translate="no">"SINDI"</code> per la ricerca con embedding sparsi con <code translate="no">IP</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_k1</code></p></td>
     <td><p>Controlla la saturazione della frequenza dei termini per il punteggio BM25. Questo parametro si applica solo quando <code translate="no">metric_type</code> è <code translate="no">BM25</code>.</p></td>
     <td><p>Intervallo consigliato: [1,2; 2,0]</p><p>Valore predefinito: 1,2</p></td>
     <td><p>Aumentare questo valore per attribuire maggiore peso alla frequenza dei termini nel ranking dei documenti.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_b</code></p></td>
     <td><p>Controlla l’intensità della normalizzazione della lunghezza del documento per il punteggio BM25. Questo parametro si applica solo quando <code translate="no">metric_type</code> è <code translate="no">BM25</code>.</p></td>
     <td><p>Intervallo: [0, 1]</p><p>Valore predefinito: 0,75</p></td>
     <td><p>Utilizzare un valore più alto per applicare una normalizzazione della lunghezza più forte. Utilizzare un valore più basso per ridurre l’effetto della lunghezza del documento sul posizionamento.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parametri di ricerca specifici dell’indice<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La tabella seguente elenca i parametri configurabili in <code translate="no">search_params.params</code> durante <a href="/docs/it/sparse-inverted-index.md#Search-on-index">la ricerca nell’indice</a>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Intervallo di valori</p></th>
     <th><p>Suggerimento di ottimizzazione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>La percentuale dei valori più piccoli da ignorare durante la ricerca, che contribuisce a ridurre il rumore.</p></td>
     <td><p>Intervallo: [0,0; 1,0) (ad esempio, 0,2 ignora il 20% dei valori più piccoli)</p></td>
     <td><p>Regolare questo parametro in base alla sparsità e al livello di rumore dei vettori di query.</p><p>Questo parametro controlla la percentuale di valori di bassa entità da scartare durante la ricerca. Aumentando questo valore (ad esempio, a <code translate="no">0.2</code>) è possibile ridurre il rumore e concentrare la ricerca su componenti più significative, migliorando così la precisione e l’efficienza. Tuttavia, scartare un numero maggiore di valori può anche ridurre il richiamo, escludendo segnali potenzialmente rilevanti. Scegliere un valore che garantisca un equilibrio tra richiamo e accuratezza per il proprio carico di lavoro.</p></td>
   </tr>
</table>
