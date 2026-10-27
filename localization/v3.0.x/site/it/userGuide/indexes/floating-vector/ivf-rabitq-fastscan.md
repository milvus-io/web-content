---
id: ivf-rabitq-fastscan.md
title: IVF_RABITQ_FASTSCANCompatible with Milvus 3.0.x
summary: >-
  IVF_RABITQ_FASTSCAN combina la tecnica IVF, la quantizzazione binaria RaBitQ e
  la scansione in batch SIMD per fornire una ricerca vettoriale efficiente in
  termini di memoria e ad alta produttività.
beta: Milvus 3.0.x
---
<h1 id="IVFRABITQFASTSCAN" class="common-anchor-header">IVF_RABITQ_FASTSCAN<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#IVFRABITQFASTSCAN" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">IVF_RABITQ_FASTSCAN</code> combina il partizionamento IVF, la quantizzazione binaria RaBitQ e l'elaborazione in batch FastScan. Memorizza codici RaBitQ a un bit per i vettori del database ed elabora i codici in blocchi di 32 vettori del database ottimizzati per SIMD. Ciò lo rende una scelta ideale per carichi di lavoro ad alta produttività e con limitazioni di memoria che possono accettare risultati approssimativi.</p>
<p>Scegliere <code translate="no">IVF_RABITQ_FASTSCAN</code> anziché <a href="/docs/it/ivf-rabitq.md">IVF_RABITQ</a> quando le ricerche analizzano molti candidati e la produttività è l’obiettivo primario. Il costo di configurazione per query di FastScan viene ammortizzato sui blocchi di codice compressi, quindi è in genere più vantaggioso per set di dati di grandi dimensioni o elenchi IVF lunghi. Per raccolte di piccole dimensioni o ricerche che esaminano pochi candidati, utilizzare invece <code translate="no">IVF_RABITQ</code>. Supporta inoltre la quantizzazione delle query configurabile, più tipi di raffinamento e iteratori.</p>
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
    </button></h2><p><code translate="no">IVF_RABITQ_FASTSCAN</code> utilizza le seguenti fasi:</p>
<ol>
<li><strong>Partizionamento IVF</strong>: l’IVF raggruppa i vettori in cluster <code translate="no">nlist</code> i ed effettua la ricerca nei cluster più vicini secondo l’ <code translate="no">nprobe</code>.</li>
<li><strong>Codifica RaBitQ</strong>: ogni residuo vettoriale viene codificato come codice RaBitQ a un bit per dimensione.</li>
<li><strong>FastScan</strong>: l’indice raggruppa i codici per un’elaborazione in batch SIMD ottimizzata per la cache. Valuta 32 vettori del database in ogni batch.</li>
<li><strong>Raffinamento opzionale</strong>: quando abilitato, un raffinatore FP32 ricalcola il punteggio dei candidati prima che Milvus restituisca i risultati finali.</li>
</ol>
<p>L’indice Faiss sottostante è <code translate="no">IndexIVFRaBitQFastScan</code>. Knowhere lo avvolge con una trasformazione di rotazione casuale e, facoltativamente, aggiunge un raffinatore FP32.</p>
<p>FastScan esegue operazioni di preparazione per ogni query, come la creazione e la quantizzazione delle tabelle di ricerca relative alla query, prima di scansionare i blocchi di codice compressi. Eseguite il benchmark sia su <code translate="no">IVF_RABITQ</code> che su <code translate="no">IVF_RABITQ_FASTSCAN</code> con i vostri dati e parametri di ricerca.</p>
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
    </button></h2><p>Per creare un indice <code translate="no">IVF_RABITQ_FASTSCAN</code> su un campo vettoriale in Milvus, utilizzare il metodo <code translate="no">add_index()</code>, specificando <code translate="no">index_type</code>, <code translate="no">metric_type</code> e i parametri aggiuntivi per l’indice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_RABITQ_FASTSCAN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
<span class="highlighted-wrapper-line">    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span></span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Enable refinement for higher recall</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;FP32&quot;</span> <span class="hljs-comment"># Refinement data format</span></span>
<span class="highlighted-comment-line">    } <span class="hljs-comment"># Index building params</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">index_type</code>: Il tipo di indice da creare. In questo esempio, impostare il valore su ` <code translate="no">IVF_RABITQ_FASTSCAN</code>`.</p></li>
<li><p><code translate="no">metric_type</code>: Il metodo utilizzato per calcolare la distanza tra i vettori. I valori supportati includono <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code>. Per ulteriori dettagli, consultare <a href="/docs/it/metric.md">Tipi di metrica</a>.</p></li>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la creazione dell’indice. Per ulteriori dettagli, consultare <a href="/docs/it/ivf-rabitq-fastscan.md#Index-building-params">Parametri di creazione dell’indice</a>.</p></li>
</ul>
<p>Una volta configurati i parametri dell’indice, è possibile creare l’indice utilizzando direttamente il metodo <code translate="no">create_index()</code> oppure passando i parametri dell’indice nel metodo <code translate="no">create_collection</code>. Per ulteriori dettagli, consultare la sezione <a href="/docs/it/create-collection.md">Creazione di una raccolta</a>.</p>
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
    </button></h2><p>Una volta creato l’indice e inserite le entità, è possibile eseguire ricerche di similarità sull’indice.</p>
<p>Impostare ` <code translate="no">nprobe</code> ` per controllare il numero di cluster IVF da cercare. Se l’indice è stato creato con il raffinamento, utilizzare ` <code translate="no">refine_k</code> ` per controllare il pool di candidati passato al raffinatore FP32.</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your Milvus server address</span>

search_params = {
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">128</span>, <span class="hljs-comment"># Number of clusters to search</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Refinement magnification factor</span></span>
<span class="highlighted-comment-line">    }</span>
}

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># TopK results to return</span>
<span class="highlighted-wrapper-line">    search_params=search_params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la ricerca sull’indice. Per ulteriori dettagli, consultare <a href="/docs/it/ivf-rabitq-fastscan.md#Index-specific-search-params">Parametri di ricerca specifici dell’indice</a>.</li>
</ul>
<div class="alert note">
<p>A differenza di ` <code translate="no">IVF_RABITQ</code>`, ` <code translate="no">IVF_RABITQ_FASTSCAN</code> ` non accetta il parametro di ricerca ` <code translate="no">rbq_bits_query</code> `. FastScan utilizza sempre internamente la quantizzazione delle query a 8 bit, quindi ometti ` <code translate="no">rbq_bits_query</code> ` o impostalo su ` <code translate="no">0</code>`; i valori più grandi vengono rifiutati.</p>
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
    </button></h3><p>La tabella seguente elenca i parametri che è possibile configurare in <code translate="no">params</code> durante <a href="/docs/it/ivf-rabitq-fastscan.md#Build-index">la creazione di un indice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Intervallo di valori</p></th>
     <th><p>Suggerimento di ottimizzazione</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Il numero di cluster da creare utilizzando l'algoritmo k-means durante la creazione dell'indice. Ogni cluster, rappresentato da un centroide, memorizza un elenco di vettori. Aumentando questo parametro si riduce il numero di vettori in ciascun cluster, creando partizioni più piccole e mirate.</p></td>
     <td><p><strong>Tipo</strong>: Intero<br><strong>Intervallo</strong>: [1, 65536]<br><strong>Valore predefinito</strong>: <code translate="no">128</code></p></td>
     <td><p>Valori più elevati di " <code translate="no">nlist</code> " migliorano il recall creando cluster più raffinati, ma aumentano il tempo di creazione dell'indice. Ottimizzare in base alle dimensioni del set di dati e alle risorse disponibili. Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Abilita il processo di affinamento e memorizza i dati affinati. <code translate="no">IVF_RABITQ_FASTSCAN</code> supporta solo l'affinamento in FP32.</p></td>
     <td><p><strong>Tipo</strong>: Booleano<br><strong>Intervallo</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]<br><strong>Valore predefinito</strong>: <code translate="no">false</code></p></td>
     <td><p>Impostare su <code translate="no">true</code> se è necessario un tasso di richiamo pari o superiore a 0,9. L'abilitazione del raffinamento migliora la precisione, ma aumenta i requisiti di archiviazione e il tempo di creazione dell'indice.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Definisce la rappresentazione dei dati utilizzata per il raffinamento quando è abilitato <code translate="no">refine</code>. Richiesto solo quando <code translate="no">refine</code> è <code translate="no">true</code>.</p></td>
     <td><p><strong>Tipo</strong>: Stringa<br><strong>Intervallo</strong>: [<code translate="no">FP32</code>, <code translate="no">FLAT</code>]<br><strong>Valore predefinito</strong>: Nessuno</p></td>
     <td><p><code translate="no">IVF_RABITQ_FASTSCAN</code> Supporta solo il perfezionamento FP32 e <code translate="no">FLAT</code> è identico a <code translate="no">FP32</code>. La corrispondenza dei valori non distingue tra maiuscole e minuscole.</p></td>
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
    </button></h3><p>La tabella seguente elenca i parametri configurabili in <code translate="no">search_params.params</code> durante <a href="/docs/it/ivf-rabitq-fastscan.md#Search-on-index">la ricerca nell’indice</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Intervallo di valori</p></th>
     <th><p>Suggerimento di ottimizzazione</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Il numero di cluster in cui cercare i candidati. Valori più elevati consentono di effettuare la ricerca in un numero maggiore di cluster, migliorando il recall grazie all'ampliamento dell'ambito di ricerca, ma a scapito di una maggiore latenza della query.</p></td>
     <td><p><strong>Tipo</strong>: Intero<br><strong>Intervallo</strong>: [1, <em>nlist</em>]<br><strong>Valore predefinito</strong>: <code translate="no">8</code></p></td>
     <td><p>Aumentando questo valore si migliora il recall, ma la ricerca potrebbe rallentare. Impostare <code translate="no">nprobe</code> in modo proporzionale a <code translate="no">nlist</code> per bilanciare velocità e precisione. Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo: [1, <em>nlist</em>].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Il processo di affinamento utilizza una quantizzazione di qualità superiore per selezionare il numero necessario di vicini più prossimi da un pool di candidati, <code translate="no">refine_k</code> volte più ampio, scelto tramite IVF_RABITQ_FASTSCAN. Non ha alcun effetto se l'affinamento è disabilitato.</p></td>
     <td><p><strong>Tipo</strong>: Float<br><strong>Intervallo</strong>: [1, <em>float_max</em>)<br><strong>Valore predefinito</strong>: <code translate="no">1</code></p></td>
     <td><p>Valori più alti di <code translate="no">refine_k</code> riducono il QPS ma aumentano il tasso di richiamo. Inizia con <code translate="no">1</code> e prova i valori <code translate="no">2</code>, <code translate="no">3</code>, <code translate="no">4</code> e <code translate="no">5</code> per trovare il compromesso ottimale tra QPS e richiamo per il tuo set di dati.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rbq_bits_query</code></p></td>
     <td><p>Stabilisce se applicare un'ulteriore quantizzazione scalare a un vettore di query. <strong>Non supportato su <code translate="no">IVF_RABITQ_FASTSCAN</code></strong>: l'indice utilizza sempre internamente una quantizzazione delle query a 8 bit. Ometti questo parametro oppure impostalo su <code translate="no">0</code>; i valori superiori a <code translate="no">0</code> vengono rifiutati.</p></td>
     <td><p><strong>Tipo</strong>: Intero<br><strong>Intervallo</strong>: [0, 0]<br><strong>Valore predefinito</strong>: <code translate="no">0</code></p></td>
     <td><p>Lasciarlo non impostato. Per la quantizzazione della query configurabile, utilizzare invece <a href="/docs/it/ivf-rabitq.md">IVF_RABITQ</a>.</p></td>
   </tr>
</table>
<h2 id="Limitations" class="common-anchor-header">Limitazioni<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li>FastScan utilizza una codifica fissa del database RaBitQ a 1 bit e una quantizzazione delle query a 8 bit. L'<code translate="no">rbq_bits_query</code> deve essere omesso o impostato su <code translate="no">0</code>.</li>
<li>È supportato solo il raffinamento FP32 (equivalente a <code translate="no">FLAT</code>).</li>
<li>Gli iteratori non sono supportati.</li>
<li>Si tratta di un indice CPU. Non funziona su GPU.</li>
<li>Le prestazioni effettive dipendono dal supporto SIMD della CPU, dalla dimensione del vettore, da <code translate="no">nlist</code>, da <code translate="no">nprobe</code> e dalla distribuzione dei dati. Eseguire un benchmark con il proprio carico di lavoro prima di implementarlo in produzione.</li>
</ul>
<p>Per la variante RaBitQ non FastScan e le relative opzioni di affinamento aggiuntive, consultare <a href="/docs/it/ivf-rabitq.md">IVF_RABITQ</a>.</p>
