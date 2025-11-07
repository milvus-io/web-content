---
id: scann.md
title: SCANN
summary: >-
  Alimentato dalla libreria ScaNN di Google, l'indice SCANN di Milvus è
  progettato per affrontare le sfide della ricerca di similarità vettoriale in
  scala, trovando un equilibrio tra velocità e precisione, anche su grandi
  insiemi di dati che tradizionalmente porrebbero problemi alla maggior parte
  degli algoritmi di ricerca.
---
<h1 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h1><p>Alimentato dalla libreria <a href="https://github.com/google-research/google-research/blob/master/scann%2FREADME.md">ScaNN</a> di Google, l'indice <code translate="no">SCANN</code> di Milvus è stato progettato per affrontare le sfide della ricerca di similarità vettoriale in scala, trovando un equilibrio tra velocità e precisione, anche su grandi insiemi di dati che tradizionalmente porrebbero problemi alla maggior parte degli algoritmi di ricerca.</p>
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
    </button></h2><p>ScaNN è stato costruito per risolvere una delle maggiori sfide della ricerca vettoriale: trovare in modo efficiente i vettori più rilevanti in spazi ad alta dimensionalità, anche quando i set di dati diventano più grandi e complessi. La sua architettura suddivide il processo di ricerca vettoriale in fasi distinte:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scann.png" alt="Scann" class="doc-image" id="scann" />
   </span> <span class="img-wrapper"> <span>Scannerizzazione</span> </span></p>
<ol>
<li><p><strong>Partizione</strong>: Divide il set di dati in cluster. Questo metodo restringe lo spazio di ricerca concentrandosi solo su sottoinsiemi di dati rilevanti, invece di scansionare l'intero set di dati, risparmiando tempo e risorse di elaborazione. ScaNN utilizza spesso algoritmi di clustering, come <a href="https://zilliz.com/blog/k-means-clustering">k-means</a>, per identificare i cluster, il che consente di eseguire ricerche di similarità in modo più efficiente.</p></li>
<li><p><strong>Quantizzazione</strong>: ScaNN applica un processo di quantizzazione noto come <a href="https://arxiv.org/abs/1908.10396">quantizzazione vettoriale anisotropica</a> dopo il partizionamento. La quantizzazione tradizionale si concentra sulla minimizzazione della distanza complessiva tra i vettori originali e quelli compressi, il che non è ideale per compiti come la <a href="https://papers.nips.cc/paper/5329-asymmetric-lsh-alsh-for-sublinear-time-maximum-inner-product-search-mips.pdf">ricerca del prodotto interno massimo (MIPS)</a>, in cui la somiglianza è determinata dal prodotto interno dei vettori piuttosto che dalla distanza diretta. La quantizzazione anisotropa dà invece priorità alla conservazione delle componenti parallele tra i vettori, ovvero le parti più importanti per il calcolo di prodotti interni accurati. Questo approccio consente a ScaNN di mantenere un'elevata precisione MIPS allineando accuratamente i vettori compressi con la query, consentendo ricerche di similarità più rapide e precise.</p></li>
<li><p><strong>Ri-classificazione</strong>: La fase di re-ranking è la fase finale, in cui ScaNN mette a punto i risultati della ricerca ottenuti dalle fasi di partizione e quantizzazione. Il re-ranking applica precisi calcoli del prodotto interno ai vettori candidati migliori, assicurando che i risultati finali siano altamente accurati. Il re-ranking è fondamentale nei motori di raccomandazione ad alta velocità o nelle applicazioni di ricerca di immagini, dove il filtraggio e il raggruppamento iniziali servono come strato grossolano e lo stadio finale assicura che all'utente vengano restituiti solo i risultati più rilevanti.</p></li>
</ol>
<p>Le prestazioni di <code translate="no">SCANN</code> sono controllate da due parametri chiave che consentono di regolare con precisione l'equilibrio tra velocità e accuratezza:</p>
<ul>
<li><p><code translate="no">with_raw_data</code>: Controlla se i dati vettoriali originali vengono memorizzati insieme alle rappresentazioni quantizzate. L'attivazione di questo parametro migliora l'accuratezza durante la ri-classificazione, ma aumenta i requisiti di memorizzazione.</p></li>
<li><p><code translate="no">reorder_k</code>: Determina il numero di candidati che vengono raffinati durante la fase finale di ri-classificazione. Valori più alti migliorano l'accuratezza ma aumentano la latenza di ricerca.</p></li>
</ul>
<p>Per una guida dettagliata sull'ottimizzazione di questi parametri per il vostro caso d'uso specifico, fate riferimento a <a href="/docs/it/scann.md#Index-params">Parametri dell'indice</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Creare l'indice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Per costruire un indice <code translate="no">SCANN</code> su un campo vettoriale in Milvus, utilizzare il metodo <code translate="no">add_index()</code>, specificando i parametri <code translate="no">index_type</code>, <code translate="no">metric_type</code> e altri parametri aggiuntivi per l'indice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;SCANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span></span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to hold raw data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">index_type</code>: Il tipo di indice da costruire. In questo esempio, impostare il valore su <code translate="no">SCANN</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Il metodo utilizzato per calcolare la distanza tra i vettori. I valori supportati sono <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code>. Per maggiori dettagli, consultare <a href="/docs/it/metric.md">Tipi di metriche</a>.</p></li>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la creazione dell'indice.</p>
<ul>
<li><code translate="no">with_raw_data</code>: Se memorizzare i dati vettoriali originali insieme alla rappresentazione quantizzata.</li>
</ul>
<p>Per conoscere gli altri parametri di costruzione disponibili per l'indice <code translate="no">SCANN</code>, fare riferimento a <a href="/docs/it/scann.md#Index-building-params">Parametri di costruzione dell'indice</a>.</p></li>
</ul>
<p>Una volta configurati i parametri dell'indice, è possibile creare l'indice utilizzando direttamente il metodo <code translate="no">create_index()</code> o passando i parametri dell'indice nel metodo <code translate="no">create_collection</code>. Per i dettagli, fare riferimento a <a href="/docs/it/create-collection.md">Creare una raccolta</a>.</p>
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
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;reorder_k&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of candidates to refine</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">params</code>: Opzioni di configurazione aggiuntive per la ricerca sull'indice.</p>
<ul>
<li><code translate="no">reorder_k</code>: Numero di candidati da affinare durante la fase di ri-classificazione.</li>
</ul>
<p>Per conoscere gli altri parametri di ricerca disponibili per l'indice <code translate="no">SCANN</code>, consultare i <a href="/docs/it/scann.md#Index-specific-search-params">parametri di ricerca specifici dell'indice</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Parametri di costruzione dell'indice<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">params</code> durante la <a href="/docs/it/scann.md#Build-index">creazione di un indice</a>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore Intervallo</p></th>
     <th><p>Suggerimento per la messa a punto</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Numero di unità di cluster</p></td>
     <td><p>[1, 65536]</p></td>
     <td><p>Un <em>nlist</em> più alto aumenta l'efficienza della potatura e di solito accelera la ricerca grossolana, ma le partizioni possono diventare troppo piccole, riducendo il richiamo; un <em>nlist</em> più basso scansiona cluster più grandi, migliorando il richiamo ma rallentando la ricerca.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Se memorizzare i dati vettoriali originali insieme alla rappresentazione quantizzata. Se abilitata, questa opzione consente di calcolare la somiglianza in modo più accurato durante la fase di ri-classificazione, utilizzando i vettori originali invece delle approssimazioni quantizzate.</p></td>
     <td><p><strong>Tipo</strong>: Booleano</p><p><strong>Intervallo</strong>: <code translate="no">true</code>, <code translate="no">false</code></p><p><strong>Valore predefinito</strong>: <code translate="no">true</code></p></td>
     <td><p>Impostare su <code translate="no">true</code> per una <strong>maggiore accuratezza della ricerca</strong> e quando lo spazio di archiviazione non è una preoccupazione primaria. I dati vettoriali originali consentono di calcolare con maggiore precisione la somiglianza durante la ri-classificazione.</p><p>Impostare su <code translate="no">false</code> per <strong>ridurre l'overhead di archiviazione</strong> e l'uso della memoria, soprattutto per i grandi insiemi di dati. Tuttavia, ciò può comportare una precisione di ricerca leggermente inferiore, poiché la fase di ri-classificazione utilizzerà vettori quantizzati.</p><p><strong>Consigliato</strong>: Utilizzare <code translate="no">true</code> per le applicazioni di produzione in cui la precisione è fondamentale.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parametri di ricerca specifici per l'indice<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>La tabella seguente elenca i parametri che possono essere configurati in <code translate="no">search_params.params</code> per la <a href="/docs/it/scann.md#Search-on-index">ricerca sull'indice</a>.</p>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Intervallo di valori</p></th>
     <th><p>Suggerimento di ottimizzazione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reorder_k</code></p></td>
     <td><p>Controlla il numero di vettori candidati che vengono raffinati durante la fase di ri-classificazione. Questo parametro determina il numero di candidati migliori delle fasi iniziali di suddivisione e quantizzazione che vengono rivalutati utilizzando calcoli di somiglianza più precisi.</p></td>
     <td><p><strong>Tipo</strong>: Intero</p><p><strong>Intervallo</strong>: [1, <em>int_max</em>]</p><p><strong>Valore predefinito</strong>: Nessuno</p></td>
     <td><p>Un valore maggiore di <code translate="no">reorder_k</code> porta in genere a una <strong>maggiore accuratezza della ricerca</strong>, poiché vengono considerati più candidati durante la fase di affinamento finale. Tuttavia, questo <strong>aumenta</strong> anche <strong>il tempo di ricerca</strong> a causa dei calcoli aggiuntivi.</p><p>Si consiglia di aumentare <code translate="no">reorder_k</code> quando è fondamentale ottenere un richiamo elevato e la velocità di ricerca è meno importante. Un buon punto di partenza è 2-5 volte il valore desiderato di <code translate="no">limit</code> (TopK risultati da restituire).</p><p>Considerare di diminuire <code translate="no">reorder_k</code> per dare priorità a ricerche più veloci, soprattutto in scenari in cui una leggera riduzione dell'accuratezza è accettabile.</p><p>Nella maggior parte dei casi, si consiglia di impostare un valore compreso in questo intervallo:<em>[limite</em>, <em>limite</em> * 5].</p></td>
   </tr>
</table>
