---
id: gpu-cagra.md
title: GPU_CAGRA
summary: >-
  L'indice GPU_CAGRA è un indice basato su grafi ottimizzato per le GPU.
  L'utilizzo di GPU di tipo "inference" per eseguire la versione GPU di Milvus
  può risultare più conveniente rispetto all'impiego di costose GPU di tipo
  "training".
---
<h1 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indice <strong>GPU_CAGRA</strong> è un indice basato su grafi ottimizzato per le GPU. L'utilizzo di GPU di livello inferenziale per eseguire la versione GPU di Milvus può risultare più conveniente rispetto all'uso di costose GPU di livello addestramento.</p>
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
    </button></h2><p>Per creare un indice " <code translate="no">GPU_CAGRA</code> " su un campo vettoriale in Milvus, utilizzare il metodo ` <code translate="no">add_index()</code> `, specificando ` <code translate="no">index_type</code>`, ` <code translate="no">metric_type</code>` e i parametri aggiuntivi per l'indice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_CAGRA&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;intermediate_graph_degree&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Affects recall and build time by determining the graph’s degree before pruning</span>
        <span class="hljs-string">&quot;graph_degree&quot;</span>: <span class="hljs-number">32</span>, <span class="hljs-comment"># Affets search performance and recall by setting the graph’s degree after pruning</span>
        <span class="hljs-string">&quot;build_algo&quot;</span>: <span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Selects the graph generation algorithm before pruning</span>
        <span class="hljs-string">&quot;cache_dataset_on_device&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>, <span class="hljs-comment"># Decides whether to cache the original dataset in GPU memory</span>
        <span class="hljs-string">&quot;adapt_for_cpu&quot;</span>: <span class="hljs-string">&quot;false&quot;</span>, <span class="hljs-comment"># Decides whether to use GPU for index-building and CPU for search</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">index_type</code>: Il tipo di indice da creare. In questo esempio, impostare il valore su ` <code translate="no">GPU_CAGRA</code>`.</p></li>
<li><p><code translate="no">metric_type</code>: Il metodo utilizzato per calcolare la distanza tra i vettori. Per ulteriori dettagli, consultare <a href="/docs/it/v2.6.x/metric.md">Tipi</a> di <a href="/docs/it/v2.6.x/metric.md">metrica</a>.</p></li>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la creazione dell’indice. Per ulteriori informazioni sui parametri di creazione disponibili per l’indice ` <code translate="no">GPU_CAGRA</code> `, consultare <a href="/docs/it/v2.6.x/gpu-cagra.md#Index-building-params">Parametri di creazione dell’indice</a>.</p></li>
</ul>
<p>Una volta configurati i parametri dell’indice, è possibile creare l’indice utilizzando direttamente il metodo ` <code translate="no">create_index()</code> ` oppure passando i parametri dell’indice nel metodo ` <code translate="no">create_collection</code> `. Per ulteriori dettagli, consultare la sezione <a href="/docs/it/v2.6.x/create-collection.md">"Creazione di una raccolta"</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Ricerca sull’indice<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta creato l'indice e inserite le entità, è possibile eseguire ricerche di similarità sull'indice.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-comment"># Determines the size of intermediate results kept during the search</span>
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Specifies the number of entry points into the CAGRA graph during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la ricerca sull’indice. Per ulteriori informazioni sui parametri di ricerca disponibili per l’indice ` <code translate="no">GPU_CAGRA</code> `, consultare <a href="/docs/it/v2.6.x/gpu-cagra.md#Index-specific-search-params">Parametri di ricerca specifici dell’indice</a>.</li>
</ul>
<h2 id="Enable-CPU-search-at-load-time--Milvus-264+" class="common-anchor-header">Abilitare la ricerca su CPU in fase di caricamento<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Enable-CPU-search-at-load-time--Milvus-264+" class="anchor-icon" translate="no">
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
    </button></h2><p>Per abilitare dinamicamente la ricerca via CPU al momento del caricamento, modificare la seguente configurazione in <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">GPU_CAGRA:</span>
    <span class="hljs-attr">load:</span> 
      <span class="hljs-attr">adapt_for_cpu:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Comportamento</strong></p>
<ul>
<li><p>Quando l'<code translate="no">load.adapt_for_cpu</code> è impostato su " <code translate="no">true</code>", Milvus converte l'indice <strong>GPU_CAGRA</strong> in un formato eseguibile su CPU (simile a HNSW) durante il caricamento.</p></li>
<li><p>Le successive operazioni di ricerca vengono eseguite sulla CPU, anche se l’indice era stato originariamente creato per la GPU.</p></li>
<li><p>Se omesso o impostato su false, l’indice rimane sulla GPU e le ricerche vengono eseguite sulla GPU.</p></li>
</ul>
<div class="alert note">
<p>Utilizzare l’adattamento alla CPU in fase di caricamento in ambienti ibridi o sensibili ai costi, in cui le risorse della GPU sono riservate alla creazione dell’indice, ma le ricerche vengono eseguite sulla CPU.</p>
</div>
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
    </button></h3><p>La tabella seguente elenca i parametri configurabili in <code translate="no">params</code> durante <a href="/docs/it/v2.6.x/gpu-cagra.md#Build-index">la creazione di un indice</a>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore predefinito</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">intermediate_graph_degree</code></p></td>
     <td><p>Influisce sul recall e sul tempo di creazione determinando il grado del grafo prima del pruning. I valori consigliati sono <code translate="no">32</code> o <code translate="no">64</code>.</p></td>
     <td><p><code translate="no">128</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">graph_degree</code></p></td>
     <td><p>Influisce sulle prestazioni di ricerca e sul recall impostando il grado del grafo dopo il pruning. Una differenza maggiore tra questi due gradi comporta un tempo di creazione più lungo. Il suo valore deve essere inferiore al valore di <code translate="no">intermediate_graph_degree</code>.</p></td>
     <td><p><code translate="no">64</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">build_algo</code></p></td>
     <td><p>Seleziona l’algoritmo di generazione del grafo prima del pruning. Valori possibili:</p><ul><li><p><code translate="no">IVF_PQ</code>: Offre una qualità superiore ma tempi di costruzione più lenti.</p></li><li><p><code translate="no">NN_DESCENT</code>: Garantisce una generazione più rapida con un recall potenzialmente inferiore.</p></li></ul></td>
     <td><p><code translate="no">IVF_PQ</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>Decide se memorizzare nella cache il set di dati originale nella memoria della GPU. Valori possibili:</p><ul><li><p><code translate="no">"true"</code>: Memorizza il set di dati originale nella cache per migliorare il richiamo perfezionando i risultati della ricerca.</p></li><li><p><code translate="no">"false"</code>: Non memorizza il set di dati originale nella cache per risparmiare memoria della GPU.</p></li></ul></td>
     <td><p><code translate="no">"false"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">adapt_for_cpu</code></p></td>
     <td><p>Determina se utilizzare la GPU per la creazione dell’indice e la CPU per la ricerca.</p><p>L'impostazione di questo parametro su " <code translate="no">"true"</code> " richiede la presenza del parametro " <code translate="no">ef</code> " nelle richieste di ricerca.</p></td>
     <td><p><code translate="no">"false"</code></p></td>
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
    </button></h3><p>La tabella seguente elenca i parametri configurabili in <code translate="no">search_params.params</code> durante <a href="/docs/it/v2.6.x/gpu-cagra.md#Search-on-index">la ricerca nell’indice</a>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore predefinito</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">itopk_size</code></p></td>
     <td><p>Determina la dimensione dei risultati intermedi conservati durante la ricerca. Un valore più elevato può migliorare il richiamo a scapito delle prestazioni di ricerca. Deve essere almeno pari al valore finale di top-k (limite) ed è in genere una potenza di 2 (ad esempio, 16, 32, 64, 128).</p></td>
     <td><p>Vuoto</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_width</code></p></td>
     <td><p>Specifica il numero di punti di ingresso nel grafico CAGRA durante la ricerca. Aumentando questo valore è possibile migliorare il richiamo, ma ciò potrebbe influire sulle prestazioni della ricerca (ad es. 1, 2, 4, 8, 16, 32).</p></td>
     <td><p>Vuoto</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></p></td>
     <td><p>Controlla il processo di iterazione della ricerca. Per impostazione predefinita, sono impostati su <code translate="no">0</code>, e CAGRA determina automaticamente il numero di iterazioni in base a <code translate="no">itopk_size</code> e <code translate="no">search_width</code>. La regolazione manuale di questi valori può aiutare a bilanciare prestazioni e accuratezza.</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">team_size</code></p></td>
     <td><p>Specifica il numero di thread CUDA utilizzati per il calcolo della distanza metrica sulla GPU. I valori comuni sono potenze di 2 fino a 32 (ad es. 2, 4, 8, 16, 32). Ha un impatto minore sulle prestazioni della ricerca. Il valore predefinito è <code translate="no">0</code>, dove Milvus seleziona automaticamente l’ <code translate="no">team_size</code> in base alla dimensione del vettore.</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Specifica il compromesso tra tempo di query e precisione. Un valore più elevato di ` <code translate="no">ef</code> ` comporta una ricerca più accurata ma più lenta.</p><p>Questo parametro è obbligatorio se si imposta ` <code translate="no">adapt_for_cpu</code> ` su ` <code translate="no">true</code> ` durante la creazione dell’indice.</p></td>
     <td><p><code translate="no">[top_k, int_max]</code></p></td>
   </tr>
</table>
