---
id: index-with-gpu.md
order: 3
summary: >-
  Questa guida spiega come costruire un indice con supporto GPU in Milvus per
  migliorare le prestazioni di ricerca.
title: Indice con GPU
---
<h1 id="Index-with-GPU" class="common-anchor-header">Indice con GPU<button data-href="#Index-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida illustra i passaggi per la creazione di un indice con supporto GPU in Milvus, che può migliorare significativamente le prestazioni di ricerca in scenari ad alta produttività e ad alto richiamo. Per i dettagli sui tipi di indici GPU supportati da Milvus, consultare <a href="/docs/it/v2.4.x/gpu_index.md">Indice GPU</a>.</p>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">Configurare le impostazioni di Milvus per il controllo della memoria della GPU<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus utilizza un pool di memoria grafica globale per allocare la memoria della GPU.</p>
<p>Supporta due parametri <code translate="no">initMemSize</code> e <code translate="no">maxMemSize</code> nel <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">file di configurazione di Milvus</a>. La dimensione del pool è inizialmente impostata su <code translate="no">initMemSize</code> e verrà automaticamente espansa a <code translate="no">maxMemSize</code> dopo aver superato questo limite.</p>
<p>Il valore predefinito di <code translate="no">initMemSize</code> è pari a 1/2 della memoria della GPU disponibile all'avvio di Milvus, mentre il valore predefinito di <code translate="no">maxMemSize</code> è pari a tutta la memoria della GPU disponibile.</p>
<p>Fino a Milvus 2.4.1 (compresa la versione 2.4.1), Milvus utilizzava un pool di memoria GPU unificato. Per le versioni precedenti alla 2.4.1 (inclusa la versione 2.4.1), si raccomandava di impostare entrambi i valori a 0.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>A partire da Milvus 2.4.1, il pool di memoria della GPU viene utilizzato solo per i dati temporanei della GPU durante le ricerche. Pertanto, si consiglia di impostare i valori 2048 e 4096.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-an-index" class="common-anchor-header">Creare un indice<button data-href="#Build-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>I seguenti esempi mostrano come costruire indici GPU di diverso tipo.</p>
<h3 id="Prepare-index-parameters" class="common-anchor-header">Preparare i parametri dell'indice</h3><p>Quando si impostano i parametri dell'indice GPU, definire <strong>index_type</strong>, <strong>metric_type</strong> e <strong>params</strong>:</p>
<ul>
<li><p><strong>index_type</strong><em>(stringa</em>): Il tipo di indice utilizzato per accelerare la ricerca vettoriale. Le opzioni valide sono <strong>GPU_CAGRA</strong>, <strong>GPU_IVF_FLAT</strong>, <strong>GPU_IVF_PQ</strong> e <strong>GPU_BRUTE_FORCE</strong>.</p></li>
<li><p><strong>metric_type</strong><em>(stringa</em>): Il tipo di metrica usata per misurare la somiglianza dei vettori. Le opzioni valide sono <strong>IP</strong> e <strong>L2</strong>.</p></li>
<li><p><strong>params</strong><em>(dict</em>): I parametri di costruzione specifici dell'indice. Le opzioni valide per questo parametro dipendono dal tipo di indice.</p></li>
</ul>
<p>Ecco alcuni esempi di configurazioni per diversi tipi di indice:</p>
<ul>
<li><p>Indice<strong>GPU_CAGRA</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_CAGRA&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&#x27;intermediate_graph_degree&#x27;</span>: <span class="hljs-number">64</span>,
        <span class="hljs-string">&#x27;graph_degree&#x27;</span>: <span class="hljs-number">32</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Le opzioni possibili per i <strong>params</strong> includono:</p>
<ul>
<li><p><strong>grado_grafo_intermedio</strong><em>(int</em>): Influenza il richiamo e il tempo di costruzione determinando il grado del grafo prima della potatura. I valori consigliati sono <strong>32</strong> o <strong>64</strong>.</p></li>
<li><p><strong>grado_grafo</strong><em>(int</em>): Influisce sulle prestazioni della ricerca e sul richiamo impostando il grado del grafo dopo la potatura. In genere, è la metà del <strong>grado_grafo_intermedio</strong>. Una differenza maggiore tra questi due gradi comporta un tempo di costruzione più lungo. Il suo valore deve essere inferiore al valore di <strong>grado_grafo_intermedio</strong>.</p></li>
<li><p><strong>build_algo</strong><em>(stringa</em>): Seleziona l'algoritmo di generazione del grafo prima della potatura. Opzioni possibili:</p>
<ul>
<li><p><strong>IVF_PQ</strong>: Offre una qualità superiore ma un tempo di costruzione più lento.</p></li>
<li><p><strong>NN_DESCENT</strong>: Fornisce una costruzione più rapida con un richiamo potenzialmente inferiore.</p></li>
</ul></li>
<li><p><strong>cache_dataset_on_device</strong><em>(stringa</em>, <strong>"true"</strong> | <strong>"false")</strong>: Decide se mettere in cache il dataset originale nella memoria della GPU. Impostando <strong>"true"</strong> si migliora il richiamo affinando i risultati della ricerca, mentre impostando <strong>"false" si</strong> conserva la memoria della GPU.</p></li>
</ul></li>
<li><p>Indice<strong>GPU_IVF_FLAT</strong> o <strong>GPU_IVF_PQ</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_IVF_FLAT&quot;</span>, <span class="hljs-comment"># Or GPU_IVF_PQ</span>
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Le opzioni <strong>params</strong> sono identiche a quelle utilizzate in <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a></strong> e <strong><a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong>.</p></li>
<li><p>Indice<strong>GPU_BRUTE_FORCE</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>: <span class="hljs-string">&#x27;GPU_BRUTE_FORCE&#x27;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>Non sono richieste configurazioni aggiuntive <strong>di params</strong>.</p></li>
</ul>
<h3 id="Build-index" class="common-anchor-header">Costruire l'indice</h3><p>Dopo aver configurato i parametri dell'indice in <strong>index_params</strong>, chiamare il metodo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/create_index.md"><code translate="no">create_index()</code></a> per costruire l'indice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get an existing collection</span>
collection = Collection(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)

collection.create_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field on which an index is built</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search" class="common-anchor-header">Ricerca<button data-href="#Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta costruito l'indice della GPU, il passo successivo è preparare i parametri di ricerca prima di effettuare una ricerca.</p>
<h3 id="Prepare-search-parameters" class="common-anchor-header">Preparare i parametri di ricerca</h3><p>Di seguito sono riportati esempi di configurazioni per diversi tipi di indice:</p>
<ul>
<li><p>Indice<strong>GPU_BRUTE_FORCE</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>Non sono necessarie configurazioni <strong>di parametri</strong> aggiuntivi.</p></li>
<li><p>Indice<strong>GPU_CAGRA</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;min_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;max_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;team_size&quot;</span>: <span class="hljs-number">0</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>I parametri di ricerca principali includono:</p>
<ul>
<li><p><strong>itopk_size</strong>: Determina la dimensione dei risultati intermedi conservati durante la ricerca. Un valore maggiore può migliorare la ricerca a scapito delle prestazioni. Deve essere almeno uguale al valore finale top-k<strong>(limite</strong>) ed è tipicamente una potenza di 2 (ad esempio, 16, 32, 64, 128).</p></li>
<li><p><strong>search_width</strong>: Specifica il numero di punti di ingresso nel grafo CAGRA durante la ricerca. L'aumento di questo valore può migliorare il richiamo, ma può influire sulle prestazioni della ricerca.</p></li>
<li><p><strong>min_iterations</strong> / <strong>max_iterations</strong>: Questi parametri controllano il processo di iterazione della ricerca. Per impostazione predefinita, sono impostati su <strong>0</strong> e CAGRA determina automaticamente il numero di iterazioni in base a <strong>itopk_size</strong> e <strong>search_width</strong>. La regolazione manuale di questi valori può aiutare a bilanciare prestazioni e accuratezza.</p></li>
<li><p><strong>team_size</strong>: Specifica il numero di thread CUDA utilizzati per calcolare la distanza metrica sulla GPU. I valori più comuni sono una potenza di 2 fino a 32 (ad esempio, 2, 4, 8, 16, 32). Ha un impatto minimo sulle prestazioni della ricerca. Il valore predefinito è <strong>0</strong>, dove Milvus seleziona automaticamente il <strong>team_size</strong> in base alla dimensione del vettore.</p></li>
</ul></li>
<li><p>Indice<strong>GPU_IVF_FLAT</strong> o <strong>GPU_IVF_PQ</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}
<button class="copy-code-btn"></button></code></pre>
<p>I parametri di ricerca per questi due tipi di indice sono simili a quelli utilizzati per <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a> e <a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong>. Per ulteriori informazioni, consultare <a href="https://milvus.io/docs/search.md#Prepare-search-parameters">Conduzione di una ricerca di similarità vettoriale</a>.</p></li>
</ul>
<h3 id="Conduct-a-search" class="common-anchor-header">Eseguire una ricerca</h3><p>Utilizzare il metodo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search.md"><code translate="no">search()</code></a> per eseguire una ricerca di similarità vettoriale sull'indice GPU.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load data into memory</span>
collection.load()

collection.search(
    data=[[query_vector]], <span class="hljs-comment"># Your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field</span>
    param=search_params,
    limit=<span class="hljs-number">100</span> <span class="hljs-comment"># Number of the results to return</span>
)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Quando si usano gli indici GPU, occorre tenere conto di alcuni vincoli:</p>
<ul>
<li><p>Per <strong>GPU_IVF_FLAT</strong>, il valore massimo per il <strong>limite</strong> è 1024.</p></li>
<li><p>Per <strong>GPU_IVF_PQ</strong> e <strong>GPU_CAGRA</strong>, il valore massimo di <strong>limit</strong> è 1024.</p></li>
<li><p>Anche se non esiste un limite stabilito per <strong>GPU_BRUTE_FORCE</strong>, si consiglia di non superare i 4096 per evitare potenziali problemi di prestazioni.</p></li>
<li><p>Attualmente, gli indici GPU non supportano la distanza COSINE. Se è richiesta la distanza COSINE, i dati devono essere prima normalizzati e poi si può usare la distanza del prodotto interno (IP) come sostituto.</p></li>
<li><p>Il caricamento della protezione OOM per gli indici GPU non è pienamente supportato, una quantità eccessiva di dati potrebbe causare l'arresto anomalo del QueryNode.</p></li>
<li><p>Gli indici GPU non supportano funzioni di ricerca come la <a href="https://milvus.io/docs/single-vector-search.md#Range-search">ricerca per intervallo</a> e la <a href="https://milvus.io/docs/single-vector-search.md#Grouping-searchh">ricerca per raggruppamento</a>.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">DOMANDE FREQUENTI<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>Quando è opportuno utilizzare un indice GPU?</strong></p>
<p>Un indice GPU è particolarmente vantaggioso in situazioni che richiedono un throughput elevato o un richiamo elevato. Ad esempio, quando si tratta di batch di grandi dimensioni, il throughput dell'indicizzazione su GPU può superare di 100 volte quello dell'indicizzazione su CPU. In scenari con batch più piccoli, gli indici su GPU superano comunque in modo significativo gli indici su CPU in termini di prestazioni. Inoltre, se è richiesto un inserimento rapido dei dati, l'integrazione di una GPU può accelerare notevolmente il processo di creazione degli indici.</p></li>
<li><p><strong>In quali scenari sono più adatti gli indici su GPU come CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT e GPU_BRUTE_FORCE?</strong></p>
<p>Gli indici CAGRA sono ideali per gli scenari che richiedono prestazioni migliori, anche se a costo di consumare più memoria. Per gli ambienti in cui la conservazione della memoria è una priorità, l'indice <strong>GPU_IVF_PQ</strong> può contribuire a ridurre al minimo i requisiti di memorizzazione, anche se comporta una maggiore perdita di precisione. L'indice <strong>GPU_IVF_FLAT</strong> è un'opzione equilibrata, che offre un compromesso tra prestazioni e utilizzo della memoria. Infine, l'indice <strong>GPU_BRUTE_FORCE</strong> è progettato per le operazioni di ricerca esaustiva e garantisce un tasso di richiamo pari a 1 eseguendo ricerche trasversali.</p></li>
</ul>
