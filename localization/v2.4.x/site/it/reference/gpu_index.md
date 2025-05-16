---
id: gpu_index.md
related_key: gpu_index
summary: Meccanismo di indicizzazione della GPU in Milvus.
title: Indice GPU
---
<h1 id="GPU-Index" class="common-anchor-header">Indice GPU<button data-href="#GPU-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus supporta diversi tipi di indici GPU per accelerare le prestazioni e l'efficienza della ricerca, soprattutto in scenari ad alto rendimento e ad alto richiamo. Questo argomento fornisce una panoramica dei tipi di indice GPU supportati da Milvus, dei casi d'uso adatti e delle caratteristiche delle prestazioni. Per informazioni sulla creazione di indici con le GPU, consultare la sezione <a href="/docs/it/v2.4.x/index-with-gpu.md">Indici con le GPU</a>.</p>
<p>È importante notare che l'uso di un indice GPU non necessariamente riduce la latenza rispetto all'uso di un indice CPU. Per massimizzare al massimo il throughput, è necessaria una pressione di richiesta estremamente elevata o un numero elevato di vettori di query.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/gpu_index.png" alt="performance" class="doc-image" id="performance" />
   </span> <span class="img-wrapper"> <span>prestazioni</span> </span></p>
<p>Il supporto GPU di Milvus è fornito dal team Nvidia <a href="https://rapids.ai/">RAPIDS</a>. I tipi di indice GPU attualmente supportati da Milvus sono i seguenti.</p>
<h2 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_CAGRA è un indice a grafo ottimizzato per le GPU. L'uso di GPU di livello inferenza per eseguire la versione GPU di Milvus può essere più conveniente rispetto all'uso di costose GPU di livello addestramento.</p>
<ul>
<li><p>Parametri di costruzione dell'indice</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">intermediate_graph_degree</code></td><td>Influenza il richiamo e il tempo di costruzione determinando il grado del grafo prima della potatura. I valori consigliati sono <code translate="no">32</code> o <code translate="no">64</code>.</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">graph_degree</code></td><td>Influisce sulle prestazioni della ricerca e sul richiamo impostando il grado del grafo dopo la potatura. Una differenza maggiore tra questi due gradi comporta un tempo di costruzione più lungo. Il suo valore deve essere inferiore al valore di <strong>intermediate_graph_degree</strong>.</td><td><code translate="no">64</code></td></tr>
<tr><td><code translate="no">build_algo</code></td><td>Seleziona l'algoritmo di generazione del grafo prima della potatura. Valori possibili:</br><code translate="no">IVF_PQ</code>: Offre una qualità superiore ma un tempo di costruzione più lento.</br> <code translate="no">NN_DESCENT</code> Fornisce una creazione più rapida con un richiamo potenzialmente inferiore.</td><td><code translate="no">IVF_PQ</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Decide se memorizzare nella cache il set di dati originale nella memoria della GPU. Valori possibili:</br><code translate="no">“true”</code>: Mette in cache il set di dati originale per migliorare il richiamo affinando i risultati della ricerca.</br> <code translate="no">“false”</code> Non memorizza nella cache il set di dati originale per risparmiare memoria della GPU.</td><td><code translate="no">“false”</code></td></tr>
</tbody>
</table>
</li>
<li><p>Parametri di ricerca</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">itopk_size</code></td><td>Determina la dimensione dei risultati intermedi conservati durante la ricerca. Un valore maggiore può migliorare il richiamo a scapito delle prestazioni della ricerca. Dovrebbe essere almeno uguale al valore finale top-k (limite) e di solito è una potenza di 2 (ad esempio, 16, 32, 64, 128).</td><td>Vuoto</td></tr>
<tr><td><code translate="no">search_width</code></td><td>Specifica il numero di punti di ingresso nel grafo CAGRA durante la ricerca. L'aumento di questo valore può migliorare il richiamo, ma può influire sulle prestazioni della ricerca (es. 1, 2, 4, 8, 16, 32).</td><td>Vuoto</td></tr>
<tr><td><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></td><td>Controlla il processo di iterazione della ricerca. Per impostazione predefinita, sono impostati su <code translate="no">0</code>, e CAGRA determina automaticamente il numero di iterazioni in base a <code translate="no">itopk_size</code> e <code translate="no">search_width</code>. La regolazione manuale di questi valori può aiutare a bilanciare prestazioni e precisione.</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">team_size</code></td><td>Specifica il numero di thread CUDA utilizzati per il calcolo della distanza metrica sulla GPU. I valori più comuni sono una potenza di 2 fino a 32 (ad esempio, 2, 4, 8, 16, 32). Ha un impatto minimo sulle prestazioni della ricerca. Il valore predefinito è <code translate="no">0</code>, dove Milvus seleziona automaticamente <code translate="no">team_size</code> in base alla dimensione del vettore.</td><td><code translate="no">0</code></td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>Limiti di ricerca</p>
<table>
<thead>
<tr><th>Parametro</th><th>Intervallo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= 1024</td></tr>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=max((<code translate="no">itopk_size</code> + 31)// 32, <code translate="no">search_width</code>) * 32</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFFLAT" class="common-anchor-header">GPU_IVF_FLAT<button data-href="#GPUIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h2><p>Simile a <a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a>, anche GPU_IVF_FLAT divide i dati vettoriali in unità cluster <code translate="no">nlist</code> e poi confronta le distanze tra il vettore di input target e il centro di ciascun cluster. A seconda del numero di cluster che il sistema è impostato per interrogare (<code translate="no">nprobe</code>), i risultati della ricerca di similarità vengono restituiti in base al confronto tra l'input di destinazione e i vettori nei soli cluster più simili, riducendo drasticamente i tempi di interrogazione.</p>
<p>Regolando <code translate="no">nprobe</code>, è possibile trovare un equilibrio ideale tra precisione e velocità per un determinato scenario. I risultati del <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">test delle prestazioni</a> di <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">IVF_FLAT</a> dimostrano che il tempo di interrogazione aumenta bruscamente all'aumentare del numero di vettori di input target (<code translate="no">nq</code>) e del numero di cluster da ricercare (<code translate="no">nprobe</code>).</p>
<p>GPU_IVF_FLAT è l'indice IVF più elementare e i dati codificati memorizzati in ogni unità sono coerenti con i dati originali.</p>
<p>Quando si effettuano le ricerche, è possibile impostare il top-K fino a 256 per qualsiasi ricerca su una raccolta indicizzata con GPU_IVF_FLAT.</p>
<ul>
<li><p>Parametri di costruzione dell'indice</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Numero di unità cluster</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Decide se memorizzare nella cache il set di dati originale nella memoria della GPU. Valori possibili:</br><code translate="no">“true”</code>: Mette in cache il set di dati originale per migliorare il richiamo raffinando i risultati della ricerca.</br> <code translate="no">“false”</code> Non memorizza nella cache il set di dati originale per risparmiare memoria della GPU.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;flase&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>Parametri di ricerca</p>
<ul>
<li><p>Ricerca comune</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Numero di unità da interrogare</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Limiti di ricerca</p>
<table>
<thead>
<tr><th>Parametro</th><th>Intervallo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= <code translate="no">2048</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">PQ</code> (Product Quantization) decompone uniformemente lo spazio vettoriale originale ad alta dimensione in prodotti cartesiani di <code translate="no">m</code> spazi vettoriali a bassa dimensione, quindi quantizza gli spazi vettoriali a bassa dimensione decomposti. Invece di calcolare le distanze tra il vettore target e il centro di tutte le unità, la quantizzazione del prodotto consente di calcolare le distanze tra il vettore target e il centro di raggruppamento di ogni spazio a bassa dimensione, riducendo notevolmente la complessità temporale e spaziale dell'algoritmo.</p>
<p>IVF_PQ esegue il clustering dell'indice IVF prima di quantizzare il prodotto dei vettori. Il suo file di indici è ancora più piccolo di IVF_SQ8, ma comporta una perdita di precisione nella ricerca dei vettori.</p>
<div class="alert note">
<p>I parametri di costruzione dell'indice e di ricerca variano a seconda della distribuzione Milvus. Selezionare prima la distribuzione Milvus.</p>
<p>Quando si effettuano le ricerche, è possibile impostare il top-K fino a 8192 per qualsiasi ricerca su una collezione indicizzata GPU_IVF_FLAT.</p>
</div>
<ul>
<li><p>Parametri di costruzione dell'indice</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Numero di unità cluster</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">m</code></td><td>Numero di fattori di quantizzazione del prodotto,</td><td><code translate="no">dim mod m or = 0</code></td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Numero di bit in cui viene memorizzato ogni vettore a bassa dimensione.</td><td>[1, 16]</td><td><code translate="no">8</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Decide se memorizzare nella cache il set di dati originale nella memoria della GPU. Valori possibili:</br><code translate="no">“true”</code>: Mette in cache il set di dati originale per migliorare il richiamo affinando i risultati della ricerca.</br> <code translate="no">“false”</code> Non memorizza nella cache il set di dati originale per risparmiare memoria della GPU.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;false&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>Parametri di ricerca</p>
<ul>
<li><p>Ricerca comune</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Numero di unità da interrogare</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Limiti di ricerca</p>
<table>
<thead>
<tr><th>Parametro</th><th>Intervallo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= <code translate="no">1024</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUBRUTEFORCE" class="common-anchor-header">GPU_BRUTE_FORCE<button data-href="#GPUBRUTEFORCE" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_BRUTE_FORCE è stato pensato per i casi in cui è fondamentale un richiamo estremamente elevato, garantendo un richiamo pari a 1 confrontando ogni query con tutti i vettori del set di dati. Richiede solo il tipo di metrica (<code translate="no">metric_type</code>) e top-k (<code translate="no">limit</code>) come parametri di costruzione e ricerca dell'indice.</p>
<p>Per GPU_BRUTE_FORCE non sono necessari altri parametri di costruzione dell'indice o di ricerca.</p>
<h2 id="Conclusion" class="common-anchor-header">Conclusione<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Attualmente, Milvus carica tutti gli indici nella memoria della GPU per rendere efficienti le operazioni di ricerca. La quantità di dati che può essere caricata dipende dalla dimensione della memoria della GPU:</p>
<ul>
<li><strong>GPU_CAGRA</strong>: l'utilizzo della memoria è circa 1,8 volte quello dei dati vettoriali originali.</li>
<li><strong>GPU_IVF_FLAT</strong> e <strong>GPU_BRUTE_FORCE</strong>: Richiedono una memoria pari alla dimensione dei dati originali.</li>
<li><strong>GPU_IVF_PQ</strong>: utilizza un ingombro di memoria inferiore, che dipende dalle impostazioni dei parametri di compressione.</li>
</ul>
