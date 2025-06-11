---
id: sparse-inverted-index.md
title: INDICE SPARSE_INVERTITO
summary: >-
  L'indice SPARSE_INVERTED_INDEX è un tipo di indice utilizzato da Milvus per
  memorizzare e cercare in modo efficiente vettori sparsi. Questo tipo di indice
  sfrutta i principi dell'indicizzazione invertita per creare una struttura di
  ricerca altamente efficiente per i dati sparsi. Per ulteriori informazioni,
  consultare INVERTED.
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">INDICE SPARSE_INVERTITO<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indice <code translate="no">SPARSE_INVERTED_INDEX</code> è un tipo di indice utilizzato da Milvus per memorizzare e cercare in modo efficiente vettori sparsi. Questo tipo di indice sfrutta i principi dell'indicizzazione invertita per creare una struttura di ricerca altamente efficiente per i dati sparsi. Per ulteriori informazioni, consultare <a href="/docs/it/inverted.md">INVERTED</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Creazione dell'indice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Per costruire un indice <code translate="no">SPARSE_INVERTED_INDEX</code> su un campo vettoriale rado in Milvus, utilizzare il metodo <code translate="no">add_index()</code>, specificando i parametri <code translate="no">index_type</code>, <code translate="no">metric_type</code> e ulteriori per l'indice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_sparse_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># Algorithm used for building and querying the index</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">index_type</code>: Il tipo di indice da costruire. In questo esempio, impostare il valore su <code translate="no">SPARSE_INVERTED_INDEX</code>.</p></li>
<li><p><code translate="no">metric_type</code>: La metrica utilizzata per calcolare la somiglianza tra vettori sparsi. Valori validi:</p>
<ul>
<li><p><code translate="no">IP</code> (Prodotto interno): Misura la somiglianza utilizzando il prodotto di punti.</p></li>
<li><p><code translate="no">BM25</code>: Utilizzata in genere per la ricerca full-text, che si concentra sulla somiglianza testuale.</p>
<p>Per ulteriori dettagli, fare riferimento a <a href="/docs/it/metric.md">Tipi di metriche</a> e <a href="/docs/it/full-text-search.md">ricerca full-text</a>.</p></li>
</ul></li>
<li><p><code translate="no">params.inverted_index_algo</code>: L'algoritmo usato per costruire e interrogare l'indice. Valori validi:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code> (predefinito): Elaborazione ottimizzata delle query Document-at-a-Time (DAAT) con l'algoritmo MaxScore. MaxScore fornisce prestazioni migliori per valori elevati di <em>k</em> o per query con molti termini, saltando termini e documenti che potrebbero avere un impatto minimo. Ciò si ottiene suddividendo i termini in gruppi essenziali e non essenziali in base ai loro punteggi di impatto massimo, concentrandosi sui termini che possono contribuire ai risultati top-k.</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Elaborazione ottimizzata delle query DAAT con l'algoritmo WAND. WAND valuta un minor numero di documenti trovati, sfruttando i punteggi di impatto massimo per saltare i documenti non competitivi, ma ha un overhead più elevato per ogni singolo colpo. Questo rende WAND più efficiente per le query con valori <em>k</em> piccoli o per le query brevi, dove il salto è più fattibile.</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Elaborazione di query Basic Term-at-a-Time (TAAT). Pur essendo più lento rispetto a <code translate="no">DAAT_MAXSCORE</code> e <code translate="no">DAAT_WAND</code>, <code translate="no">TAAT_NAIVE</code> offre un vantaggio unico. A differenza degli algoritmi DAAT, che utilizzano punteggi di impatto massimo memorizzati nella cache che rimangono statici indipendentemente dalle modifiche al parametro di raccolta globale (avgdl), <code translate="no">TAAT_NAIVE</code> si adatta dinamicamente a tali modifiche.</p></li>
</ul>
<p>Per conoscere i parametri di costruzione disponibili per l'indice <code translate="no">SPARSE_INVERTED_INDEX</code>, consultare la sezione <a href="/docs/it/sparse-inverted-index.md#Index-building-params">Parametri di costruzione dell'indice</a>.</p></li>
</ul>
<p>Una volta configurati i parametri dell'indice, è possibile creare l'indice usando direttamente il metodo <code translate="no">create_index()</code> o passando i parametri dell'indice nel metodo <code translate="no">create_collection</code>. Per i dettagli, fare riferimento a <a href="/docs/it/create-collection.md">Creare una raccolta</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Ricerca nell'indice<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta costruito l'indice e inserite le entità, è possibile eseguire ricerche di similarità sull'indice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare search parameters</span>
search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># Additional optional search parameters</span>
}

<span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=query_vector,  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la ricerca sull'indice.</p>
<ul>
<li><code translate="no">drop_ratio_search</code>: Ottimizzazione delle prestazioni di ricerca specificando la percentuale di valori piccoli del vettore da ignorare durante il processo di ricerca. Ad esempio, con <code translate="no">{&quot;drop_ratio_search&quot;: 0.2}</code>, il 20% più piccolo dei valori nel vettore della query verrà ignorato durante la ricerca.</li>
</ul>
<p>Per conoscere gli altri parametri di ricerca disponibili per l'indice <code translate="no">SPARSE_INVERTED_INDEX</code>, consultare i <a href="/docs/it/ivf-flat.md#share-KDWodFEx6oCm2yxgEUAcXaUDnwg">parametri di ricerca specifici dell'indice</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Parametri dell'indice<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa sezione fornisce una panoramica dei parametri utilizzati per la creazione di un indice e per l'esecuzione di ricerche sull'indice.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parametri di costruzione dell'indice</h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">params</code> quando si <a href="/docs/it/sparse-inverted-index.md#Build-index">costruisce un indice</a>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore Intervallo</p></th>
     <th><p>Suggerimento per la messa a punto</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>L'algoritmo usato per costruire e interrogare l'indice. Determina il modo in cui l'indice elabora le query.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code> (predefinito), <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code></p></td>
     <td><p>Utilizzare <code translate="no">"DAAT_MAXSCORE"</code> per scenari con valori k elevati o query con molti termini, che possono beneficiare del salto di documenti non competitivi. 
 Scegliere <code translate="no">"DAAT_WAND"</code> per query con valori k piccoli o brevi, per sfruttare un salto più efficiente.</p>
<p>Usare <code translate="no">"TAAT_NAIVE"</code> se è necessario un adattamento dinamico alle modifiche della collezione (ad esempio, avgdl).</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parametri di ricerca specifici per l'indice</h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">search_params.params</code> per la <a href="/docs/it/sparse-inverted-index.md#Search-on-index">ricerca nell'indice</a>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore Intervallo</p></th>
     <th><p>Suggerimento di sintonizzazione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>Percentuale dei valori più piccoli da ignorare durante la ricerca, per ridurre il rumore.</p></td>
     <td><p>Frazione compresa tra 0,0 e 1,0 (ad esempio, 0,2 ignora il 20% dei valori più piccoli).</p></td>
     <td><p>Questo parametro può essere regolato in base alla spazialità e al livello di rumore dei vettori della query. Ad esempio, l'impostazione di 0,2 può aiutare a concentrarsi sui valori più significativi durante la ricerca, migliorando potenzialmente l'accuratezza.</p></td>
   </tr>
</table>
