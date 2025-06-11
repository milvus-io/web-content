---
id: index.md
related_key: index
summary: Meccanismo di indicizzazione a Milvus.
title: Indice in memoria
---

<h1 id="In-memory-Index" class="common-anchor-header">Indice in memoria<button data-href="#In-memory-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento elenca i vari tipi di indici in-memory supportati da Milvus, gli scenari più adatti a ciascuno di essi e i parametri che gli utenti possono configurare per ottenere migliori prestazioni di ricerca. Per gli indici su disco, vedere <strong><a href="/docs/it/v2.5.x/disk_index.md">Indice su disco</a></strong>.</p>
<p>L'indicizzazione è il processo di organizzazione efficiente dei dati e svolge un ruolo importante nel rendere utile la ricerca per similarità, accelerando notevolmente le interrogazioni che richiedono molto tempo su grandi insiemi di dati.</p>
<p>Per migliorare le prestazioni delle query, è possibile <a href="/docs/it/v2.5.x/index-vector-fields.md">specificare un tipo di indice</a> per ogni campo vettoriale.</p>
<div class="alert note">
Attualmente, un campo vettoriale supporta solo un tipo di indice. Milvus cancella automaticamente il vecchio indice quando si cambia tipo di indice.</div>
<h2 id="ANNS-vector-indexes" class="common-anchor-header">Indici vettoriali ANNS<button data-href="#ANNS-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>La maggior parte dei tipi di indici vettoriali supportati da Milvus utilizza algoritmi di ricerca approssimativa dei vicini (ANNS). Rispetto al reperimento accurato, che di solito richiede molto tempo, l'idea centrale di ANNS non si limita più a restituire il risultato più accurato, ma cerca solo i vicini del target. ANNS migliora l'efficienza del reperimento sacrificando l'accuratezza entro un intervallo accettabile.</p>
<p>In base ai metodi di implementazione, l'indice vettoriale ANNS può essere classificato in quattro tipi: Ad albero, a grafo, ad hash e a quantizzazione.</p>
<h2 id="Indexes-supported-in-Milvus" class="common-anchor-header">Indici supportati in Milvus<button data-href="#Indexes-supported-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supporta diversi tipi di indici, classificati in base al tipo di incorporazioni vettoriali che gestiscono: <strong>incorporazioni in virgola mobile</strong> (note anche come vettori in virgola mobile o vettori densi), <strong>incorporazioni binarie</strong> (note anche come vettori binari) e <strong>incorporazioni rade</strong> (note anche come vettori radi).</p>
<div class="filter">
 <a href="#floating">Incorporazioni in virgola mobile</a> <a href="#binary">Incorporazioni binarie</a> <a href="#sparse">Incorporazioni rade</a></div>
<div class="filter-floating">
<h3 id="Indexes-for-floating-point-embeddings" class="common-anchor-header">Indici per le incorporazioni in virgola mobile</h3><p>Per le incorporazioni in virgola mobile (vettori) a 128 dimensioni, la memoria occupata è 128 * la dimensione del float = 512 byte. Le <a href="/docs/it/v2.5.x/metric.md">metriche di distanza</a> utilizzate per le incorporazioni in virgola mobile sono la distanza euclidea (<code translate="no">L2</code>) e il prodotto interno (<code translate="no">IP</code>).</p>
<p>Questi tipi di indici includono <code translate="no">FLAT</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_PQ</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code> e <code translate="no">SCANN</code> per le ricerche di RNA basate su CPU.</p>
</div>
<div class="filter-binary">
<h3 id="Indexes-for-binary-embeddings" class="common-anchor-header">Indici per le incorporazioni binarie</h3><p>Per le incorporazioni binarie a 128 dimensioni, la memoria che occupano è 128 / 8 = 16 byte. Le metriche di distanza utilizzate per le incorporazioni binarie sono <code translate="no">JACCARD</code> e <code translate="no">HAMMING</code>.</p>
<p>Questo tipo di indici include <code translate="no">BIN_FLAT</code> e <code translate="no">BIN_IVF_FLAT</code>.</p>
</div>
<div class="filter-sparse">
<h3 id="Indexes-for-sparse-embeddings" class="common-anchor-header">Indici per incorporazioni rade</h3><p>Gli indici per le incorporazioni rade supportano solo le metriche <code translate="no">IP</code> e <code translate="no">BM25</code> (per la ricerca full-text).</p>
<p>Tipo di indice supportato per le incorporazioni rade: <code translate="no">SPARSE_INVERTED_INDEX</code>.</p>
<div class="alert note">
<p>A partire da Milvus 2.5.4, <code translate="no">SPARSE_WAND</code> è stato deprecato. Si raccomanda invece di utilizzare <code translate="no">&quot;inverted_index_algo&quot;: &quot;DAAT_WAND&quot;</code> per ottenere l'equivalenza e mantenere la compatibilità. Per ulteriori informazioni, consultare <a href="/docs/it/v2.5.x/sparse_vector.md#Set-index-params-for-vector-field">Vettore sparso</a>.</p>
</div>
</div>
<div class="filter-floating table-wrapper">
<table id="floating">
<thead>
  <tr>
    <th>Indice supportato</th>
    <th>Classificazione</th>
    <th>Scenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>PIATTO</td>
    <td>N/D</td>
    <td>
      <ul>
        <li>Set di dati relativamente piccolo</li>
        <li>Richiede un tasso di richiamo del 100%.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>FIV_FLAT</td>
    <td>N/D</td>
    <td>
      <ul>
        <li>Interrogazione ad alta velocità</li>
        <li>Richiede un tasso di richiamo il più alto possibile</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>FIV_SQ8</td>
    <td>Indice basato sulla quantizzazione</td>
    <td>
      <ul>
        <li>Interrogazione ad altissima velocità</li>
        <li>Risorse di memoria limitate</li>
        <li>Accetta un piccolo compromesso nel tasso di richiamo</li>
      </ul>
    </td>
  </tr>  
  <tr>
    <td>FIV_PQ</td>
    <td>Indice basato sulla quantizzazione</td>
    <td>
      <ul>
        <li>Interrogazione ad alta velocità</li>
        <li>Risorse di memoria limitate</li>
        <li>Accetta un piccolo compromesso nel tasso di richiamo</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW</td>
    <td>Indice basato su grafici</td>
    <td>
      <ul>
        <li>Interrogazione ad altissima velocità</li>
        <li>Richiede un tasso di richiamo il più alto possibile</li>
        <li>Grandi risorse di memoria</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW_SQ</td>
    <td>Indice basato sulla quantizzazione</td>
    <td>
      <ul>
        <li>Interrogazione ad altissima velocità</li>
        <li>Risorse di memoria limitate</li>
        <li>Accetta un piccolo compromesso nel tasso di richiamo</li>
      </ul>
    </td>
  </tr>
    <tr>
    <td>HNSW_PQ</td>
    <td>Indice basato sulla quantizzazione</td>
    <td>
      <ul>
        <li>Interrogazione a media velocità</li>
        <li>Risorse di memoria molto limitate</li>
        <li>Accetta un piccolo compromesso nel tasso di richiamo</li>
      </ul>
    </td>
  </tr>
    </tr>
    <tr>
    <td>HNSW_PRQ</td>
    <td>Indice basato sulla quantizzazione</td>
    <td>
      <ul>
        <li>Interrogazione a media velocità</li>
        <li>Risorse di memoria molto limitate</li>
        <li>Accetta un piccolo compromesso nel tasso di richiamo</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SCANN</td>
    <td>Indice basato sulla quantizzazione</td>
    <td>
      <ul>
        <li>Interrogazione ad altissima velocità</li>
        <li>Richiede un tasso di richiamo il più alto possibile</li>
        <li>Grandi risorse di memoria</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper">
<table id="binary">
<thead>
  <tr>
    <th>Indice supportato</th>
    <th>Classificazione</th>
    <th>Scenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>BIN_FLAT</td>
    <td>Indice basato sulla quantizzazione</td>
    <td><ul>
      <li>Dipende da insiemi di dati relativamente piccoli.</li>
      <li>Richiede una precisione perfetta.</li>
      <li>Non si applica alcuna compressione.</li>
      <li>Garantisce risultati di ricerca esatti.</li>
    </ul></td>
  </tr>
  <tr>
    <td>BIN_IVF_FLAT</td>
    <td>Indice basato sulla quantizzazione</td>
    <td><ul>
      <li>Interrogazione ad alta velocità</li>
      <li>Richiede un tasso di richiamo il più alto possibile</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper">
<table id="sparse">
<thead>
  <tr>
    <th>Indice supportato</th>
    <th>Classificazione</th>
    <th>Scenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>INDICE SPARSO_INVERTITO</td>
    <td>Indice invertito</td>
    <td><ul>
      <li>Dipende da insiemi di dati relativamente piccoli.</li>
      <li>Richiede un tasso di richiamo del 100%.</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-floating">
<h3 id="FLAT" class="common-anchor-header">FLAT</h3><p>Per le applicazioni di ricerca di similarità vettoriale che richiedono una precisione perfetta e dipendono da insiemi di dati relativamente piccoli (su scala di milioni), l'indice FLAT è una buona scelta. FLAT non comprime i vettori ed è l'unico indice in grado di garantire risultati di ricerca esatti. I risultati di FLAT possono anche essere utilizzati come punto di confronto per i risultati prodotti da altri indici che hanno un richiamo inferiore al 100%.</p>
<p>FLAT è accurato perché adotta un approccio esaustivo alla ricerca, il che significa che per ogni query l'input di destinazione viene confrontato con ogni insieme di vettori in un set di dati. Questo rende FLAT l'indice più lento del nostro elenco e poco adatto a interrogare dati vettoriali massicci. Non sono richiesti parametri per l'indice FLAT in Milvus e il suo utilizzo non richiede la costruzione di un indice aggiuntivo.</p>
<ul>
<li><p>Parametri di ricerca</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Gamma</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[La metrica di distanza scelta.</td><td>Vedere <a href="/docs/it/v2.5.x/metric.md">Metriche supportate</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFFLAT" class="common-anchor-header">IVF_FLAT</h3><p>IVF_FLAT divide i dati vettoriali in unità cluster <code translate="no">nlist</code> e confronta le distanze tra il vettore di input di destinazione e il centro di ciascun cluster. A seconda del numero di cluster che il sistema è impostato per interrogare (<code translate="no">nprobe</code>), i risultati della ricerca di similarità vengono restituiti in base al confronto tra l'input di destinazione e i vettori nei soli cluster più simili, riducendo drasticamente il tempo di interrogazione.</p>
<p>Regolando <code translate="no">nprobe</code>, è possibile trovare un equilibrio ideale tra precisione e velocità per un determinato scenario. I risultati del <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">test sulle prestazioni di IVF_FLAT</a> dimostrano che il tempo di interrogazione aumenta bruscamente all'aumentare del numero di vettori di input target (<code translate="no">nq</code>) e del numero di cluster da ricercare (<code translate="no">nprobe</code>).</p>
<p>IVF_FLAT è l'indice IVF più elementare e i dati codificati memorizzati in ogni unità sono coerenti con i dati originali.</p>
<ul>
<li><p>Parametri di costruzione dell'indice</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Numero di unità cluster</td><td>[1, 65536]</td><td>128</td></tr>
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
<tr><td><code translate="no">nprobe</code></td><td>Numero di unità da interrogare</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Ricerca dell'intervallo</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Numero massimo di bucket che non restituiscono alcun risultato di ricerca.<br/>È un parametro di ricerca per intervallo e termina il processo di ricerca quando il numero di bucket vuoti consecutivi raggiunge il valore specificato.<br/>Aumentando questo valore si può migliorare il tasso di richiamo al costo di un aumento del tempo di ricerca.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFSQ8" class="common-anchor-header">IVF_SQ8</h3><p>IVF_FLAT non esegue alcuna compressione, quindi i file di indice che produce hanno più o meno le stesse dimensioni dei dati vettoriali originali non indicizzati. Ad esempio, se il set di dati SIFT 1B originale è di 476 GB, i file di indice IVF_FLAT saranno leggermente più piccoli (~470 GB). Il caricamento di tutti i file di indice in memoria consumerà 470 GB di memoria.</p>
<p>Quando le risorse di memoria del disco, della CPU o della GPU sono limitate, IVF_SQ8 è un'opzione migliore di IVF_FLAT. Questo tipo di indice può convertire ogni FLOAT (4 byte) in UINT8 (1 byte) eseguendo la quantizzazione scalare (SQ). Questo riduce il consumo di memoria su disco, CPU e GPU del 70-75%. Per il set di dati 1B SIFT, i file di indice IVF_SQ8 richiedono solo 140 GB di memoria.</p>
<ul>
<li><p>Parametri di costruzione dell'indice</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Numero di unità di cluster</td><td>[1, 65536]</td></tr>
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
<tr><td><code translate="no">nprobe</code></td><td>Numero di unità da interrogare</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Ricerca dell'intervallo</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Numero massimo di bucket che non restituiscono alcun risultato di ricerca.<br/>È un parametro di ricerca per intervallo e termina il processo di ricerca quando il numero di bucket vuoti consecutivi raggiunge il valore specificato.<br/>Aumentando questo valore si può migliorare il tasso di richiamo al costo di un aumento del tempo di ricerca.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFPQ" class="common-anchor-header">IVF_PQ</h3><p><code translate="no">PQ</code> (Product Quantization) decompone uniformemente lo spazio vettoriale originale ad alta dimensione in prodotti cartesiani di <code translate="no">m</code> spazi vettoriali a bassa dimensione, quindi quantizza gli spazi vettoriali a bassa dimensione decomposti. Invece di calcolare le distanze tra il vettore target e il centro di tutte le unità, la quantizzazione del prodotto consente di calcolare le distanze tra il vettore target e il centro di raggruppamento di ogni spazio a bassa dimensione, riducendo notevolmente la complessità temporale e spaziale dell'algoritmo.</p>
<p>IVF_PQ esegue il clustering dell'indice IVF prima di quantizzare il prodotto dei vettori. Il suo file di indici è ancora più piccolo di IVF_SQ8, ma comporta una perdita di precisione nella ricerca dei vettori.</p>
<div class="alert note">
<p>I parametri di costruzione dell'indice e di ricerca variano a seconda della distribuzione Milvus. Selezionare prima la distribuzione Milvus.</p>
</div>
<ul>
<li><p>Parametri di costruzione dell'indice</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Numero di unità di cluster</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">m</code></td><td>Numero di fattori di quantizzazione del prodotto</td><td><code translate="no">dim mod m == 0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Numero di bit in cui viene memorizzato ogni vettore a bassa dimensione.</td><td>[1, 64] (8 per impostazione predefinita)</td></tr>
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
<tr><td><code translate="no">nprobe</code></td><td>Numero di unità da interrogare</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Ricerca dell'intervallo</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Numero massimo di bucket che non restituiscono alcun risultato di ricerca.<br/>È un parametro di ricerca per intervallo e termina il processo di ricerca quando il numero di bucket vuoti consecutivi raggiunge il valore specificato.<br/>Aumentando questo valore si può migliorare il tasso di richiamo al costo di un aumento del tempo di ricerca.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="SCANN" class="common-anchor-header">SCANN</h3><p>ScaNN (Scalable Nearest Neighbors) è simile a IVF_PQ in termini di clustering vettoriale e quantizzazione del prodotto. Le differenze risiedono nei dettagli di implementazione della quantizzazione del prodotto e nell'uso di SIMD (Single-Instruction / Multi-data) per un calcolo efficiente.</p>
<ul>
<li><p>Parametri di costruzione dell'indice</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Numero di unità di cluster</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">with_raw_data</code></td><td>Se includere i dati grezzi nell'indice</td><td><code translate="no">True</code> o <code translate="no">False</code>. L'impostazione predefinita è <code translate="no">True</code>.</td></tr>
</tbody>
</table>
  <div class="alert note">
<p>A differenza di IVF_PQ, i valori predefiniti si applicano a <code translate="no">m</code> e <code translate="no">nbits</code> per ottimizzare le prestazioni.</p>
  </div>
</li>
<li><p>Parametri di ricerca</p>
<ul>
<li><p>Ricerca comune</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Numero di unità da interrogare</td><td>[1, nlist]</td><td></td></tr>
<tr><td><code translate="no">reorder_k</code></td><td>Numero di unità candidate da interrogare</td><td>[<code translate="no">top_k</code>, ∞]</td><td><code translate="no">top_k</code></td></tr>
</tbody>
</table>
</li>
<li><p>Ricerca dell'intervallo</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Numero massimo di bucket che non restituiscono alcun risultato di ricerca.<br/>È un parametro di ricerca per intervallo e termina il processo di ricerca quando il numero di bucket vuoti consecutivi raggiunge il valore specificato.<br/>Aumentando questo valore si può migliorare il tasso di richiamo al costo di un aumento del tempo di ricerca.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW (Hierarchical Navigable Small World Graph) è un algoritmo di indicizzazione basato su grafi. Costruisce una struttura di navigazione multistrato per un'immagine in base a determinate regole. In questa struttura, gli strati superiori sono più radi e le distanze tra i nodi sono maggiori; gli strati inferiori sono più densi e le distanze tra i nodi sono maggiori. La ricerca inizia dal livello più alto, trova il nodo più vicino all'obiettivo in questo livello e poi passa al livello successivo per iniziare una nuova ricerca. Dopo diverse iterazioni, può avvicinarsi rapidamente alla posizione del target.</p>
<p>Per migliorare le prestazioni, HNSW limita il grado massimo dei nodi su ciascun livello del grafo a <code translate="no">M</code>. Inoltre, è possibile utilizzare <code translate="no">efConstruction</code> (quando si costruisce l'indice) o <code translate="no">ef</code> (quando si cercano i target) per specificare un intervallo di ricerca.</p>
<ul>
<li><p>Parametri di costruzione dell'indice</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M definisce il numero massimo di connessioni in uscita nel grafico. Un numero più alto di M porta a una maggiore precisione/tempo di esecuzione a ef/efCostruzione fissa.</td><td>[2, 2048]</td><td>Nessuno</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction controlla il compromesso tra velocità di ricerca dell'indice e velocità di costruzione. L'aumento del parametro efConstruction può migliorare la qualità dell'indice, ma tende anche ad allungare i tempi di indicizzazione.</td><td>[1, int_max]</td><td>Nessuno</td></tr>
</tbody>
</table>
</li>
<li><p>Parametri di ricerca</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parametro che controlla il compromesso tempo di ricerca/accuratezza. Un valore più alto di <code translate="no">ef</code> porta a una ricerca più accurata ma più lenta.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Nessuno</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWSQ" class="common-anchor-header">HNSW_SQ</h3><p>La quantizzazione scalare (SQ) è una tecnica utilizzata per discretizzare i dati in virgola mobile in un insieme finito di valori in base alla loro grandezza. Ad esempio, <strong>SQ6</strong> rappresenta la quantizzazione in (2^6 = 64) valori discreti, dove ogni numero in virgola mobile è codificato con 6 bit. Analogamente, <strong>SQ8</strong> quantizza i dati in (2^8 = 256) valori discreti, con ogni numero in virgola mobile rappresentato da 8 bit. Questa quantizzazione riduce l'ingombro in memoria, preservando la struttura essenziale dei dati per un'elaborazione efficiente.</p>
<p>In combinazione con SQ, HNSW_SQ offre un compromesso controllabile tra dimensione dell'indice e precisione, mantenendo elevate prestazioni di query al secondo (QPS). Rispetto a HNSW standard, si ottiene un modesto aumento del tempo di costruzione dell'indice.</p>
<ul>
<li><p>Parametri di costruzione dell'indice</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M definisce il numero massimo di connessioni in uscita nel grafico. Un numero più alto di M porta a una maggiore precisione/tempo di esecuzione a ef/efCostruzione fissa.</td><td>[2, 2048]</td><td>Nessuno</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction controlla il compromesso tra velocità di ricerca dell'indice e velocità di costruzione. L'aumento del parametro efConstruction può migliorare la qualità dell'indice, ma tende anche ad allungare i tempi di indicizzazione.</td><td>[1, int_max]</td><td>Nessuno</td></tr>
<tr><td><code translate="no">sq_type</code></td><td>Tipo di quantizzatore scalare.</td><td><code translate="no">SQ6</code>,<code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code></td><td><code translate="no">SQ8</code></td></tr>
<tr><td><code translate="no">refine</code></td><td>Se i dati raffinati sono riservati durante la costruzione dell'indice.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>Il tipo di dati dell'indice di raffinazione.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>Nessuno</td></tr>
</tbody>
</table>
</li>
<li><p>Parametri di ricerca</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parametro che controlla il compromesso tempo di ricerca/accuratezza. Un valore più alto di <code translate="no">ef</code> porta a una ricerca più accurata ma più lenta.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Nessuno</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>Il fattore di ingrandimento di refine rispetto a <em>k</em>.</td><td>[1, <em>float_max</em>] Nessuno</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPQ" class="common-anchor-header">HNSW_PQ</h3><p>L'idea di base di PQ è quella di dividere il vettore in <code translate="no">m</code> sottovettori, ognuno dei quali troverà <em>2^{nbits}</em> centroidi basati su kmeans, e ogni sottovettore selezionerà il centroide più vicino come suo sottovettore approssimato. Quindi si registrano tutti i centroidi, per cui ogni sottovettore può essere codificato come <code translate="no">nbits</code>, e un vettore fluttuante di lunghezza <code translate="no">dim</code> può essere codificato come <em>m ⋅ nbits</em> bit.</p>
<p>In combinazione con PQ, HNSW_PQ offre un compromesso controllabile tra dimensione dell'indice e accuratezza, ma presenta un valore QPS inferiore e un tasso di richiamo superiore a HNSW_SQ a parità di tasso di compressione. Rispetto a HNSW_SQ, la costruzione dell'indice richiede più tempo.</p>
<ul>
<li><p>Parametri di costruzione dell'indice</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M definisce il numero massimo di connessioni in uscita nel grafico. Un numero più alto di M porta a una maggiore precisione/tempo di esecuzione a ef/efCostruzione fissa.</td><td>[2, 2048]</td><td>Nessuno</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction controlla il compromesso tra velocità di ricerca dell'indice e velocità di costruzione. L'aumento del parametro efConstruction può migliorare la qualità dell'indice, ma tende anche ad allungare i tempi di indicizzazione.</td><td>[1, int_max]</td><td>Nessuno</td></tr>
<tr><td><code translate="no">m</code></td><td>Il numero di gruppi di sottovettori in cui dividere il vettore.</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>Il numero di bit in cui viene quantizzato ogni gruppo di sottovettori.</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">refine</code></td><td>Se i dati raffinati sono riservati durante la costruzione dell'indice.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>Il tipo di dati dell'indice raffinato.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>Nessuno</td></tr>
</tbody>
</table>
</li>
<li><p>Parametri di ricerca</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parametro che controlla il compromesso tempo di ricerca/accuratezza. Un valore più alto di <code translate="no">ef</code> porta a una ricerca più accurata ma più lenta.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Nessuno</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>Il fattore di ingrandimento di refine rispetto a <em>k</em>.</td><td>[1, <em>float_max</em>] Nessuno</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ</h3><p>PRQ è simile a PQ e divide il vettore in <code translate="no">m</code> gruppi. Ogni sottovettore sarà codificato come <code translate="no">nbits</code>. Dopo aver completato una quantizzazione pq, calcola il residuo tra il vettore e il vettore quantizzato pq e applica la quantizzazione pq al vettore residuo. Verranno eseguite in totale <code translate="no">nrq</code> quantizzazioni pq complete, quindi un vettore fluttuante di lunghezza <code translate="no">dim</code> sarà codificato come <em>m ⋅ nbits ⋅ nrq</em> bit.</p>
<p>In combinazione con un quantizzatore di prodotto residuo (PRQ), HNSW_PRQ offre un compromesso ancora più controllabile tra dimensione dell'indice e precisione. Ha un valore QPS quasi equivalente e un tasso di richiamo superiore a HNSW_PQ a parità di tasso di compressione. Rispetto a HNSW_PQ, il tempo di costruzione dell'indice può aumentare di diverse volte.</p>
<ul>
<li><p>Parametri di costruzione dell'indice</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M definisce il numero massimo di connessioni in uscita nel grafico. Un numero più alto di M porta a una maggiore precisione/tempo di esecuzione a ef/efCostruzione fissa.</td><td>[2, 2048]</td><td>Nessuno</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction controlla il compromesso tra velocità di ricerca dell'indice e velocità di costruzione. L'aumento del parametro efConstruction può migliorare la qualità dell'indice, ma tende anche ad allungare i tempi di indicizzazione.</td><td>[1, int_max]</td><td>Nessuno</td></tr>
<tr><td><code translate="no">m</code></td><td>Il numero di gruppi di sottovettori in cui dividere il vettore.</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>Il numero di bit in cui viene quantizzato ogni gruppo di sottovettori.</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">nrq</code></td><td>Il numero di subquantizzatori residui.</td><td>[1, 16]</td><td>2</td></tr>
<tr><td><code translate="no">refine</code></td><td>Se i dati raffinati sono riservati durante la costruzione dell'indice.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>Il tipo di dati dell'indice di raffinazione.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>Nessuno</td></tr>
</tbody>
</table>
</li>
<li><p>Parametri di ricerca</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parametro che controlla il compromesso tempo di ricerca/accuratezza. Un valore più alto di <code translate="no">ef</code> porta a una ricerca più accurata ma più lenta.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Nessuno</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>Fattore di ingrandimento di refine rispetto a <em>k</em>.</td><td>[1, <em>float_max</em>] Nessuno</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<div class="filter-binary">
<h3 id="BINFLAT" class="common-anchor-header">BIN_FLAT</h3><p>Questo indice è esattamente uguale a FLAT, ma può essere usato solo per le incorporazioni binarie.</p>
<p>Per le applicazioni di ricerca di similarità vettoriale che richiedono una precisione perfetta e dipendono da insiemi di dati relativamente piccoli (su scala di milioni), l'indice BIN_FLAT è una buona scelta. BIN_FLAT non comprime i vettori ed è l'unico indice in grado di garantire risultati di ricerca esatti. I risultati di BIN_FLAT possono anche essere utilizzati come punto di confronto per i risultati prodotti da altri indici che hanno un richiamo inferiore al 100%.</p>
<p>BIN_FLAT è preciso perché adotta un approccio esaustivo alla ricerca, il che significa che per ogni query l'input di destinazione viene confrontato con i vettori di un set di dati. Questo rende BIN_FLAT l'indice più lento del nostro elenco e poco adatto a interrogare dati vettoriali massicci. Non ci sono parametri per l'indice BIN_FLAT in Milvus e il suo utilizzo non richiede una formazione dei dati o una memorizzazione aggiuntiva.</p>
<ul>
<li><p>Parametri di ricerca</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[La metrica di distanza scelta.</td><td>Vedere <a href="/docs/it/v2.5.x/metric.md">Metriche supportate</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="BINIVFFLAT" class="common-anchor-header">BIN_IVF_FLAT</h3><p>Questo indice è esattamente uguale a IVF_FLAT, ma può essere usato solo per le incorporazioni binarie.</p>
<p>BIN_IVF_FLAT divide i dati vettoriali in unità di cluster <code translate="no">nlist</code> e poi confronta le distanze tra il vettore di input target e il centro di ciascun cluster. A seconda del numero di cluster che il sistema è impostato per interrogare (<code translate="no">nprobe</code>), i risultati della ricerca di similarità vengono restituiti in base al confronto tra l'input di destinazione e i vettori nei cluster più simili, riducendo drasticamente il tempo di interrogazione.</p>
<p>Regolando <code translate="no">nprobe</code>, è possibile trovare un equilibrio ideale tra precisione e velocità per un determinato scenario. Il tempo di interrogazione aumenta bruscamente all'aumentare del numero di vettori di input target (<code translate="no">nq</code>) e del numero di cluster da ricercare (<code translate="no">nprobe</code>).</p>
<p>BIN_IVF_FLAT è l'indice BIN_IVF più elementare e i dati codificati memorizzati in ogni unità sono coerenti con i dati originali.</p>
<ul>
<li><p>Parametri di costruzione dell'indice</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Numero di unità di cluster</td><td>[1, 65536]</td></tr>
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
<tr><td><code translate="no">nprobe</code></td><td>Numero di unità da interrogare</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Ricerca dell'intervallo</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Numero massimo di bucket che non restituiscono alcun risultato di ricerca.<br/>È un parametro di ricerca per intervallo e termina il processo di ricerca quando il numero di bucket vuoti consecutivi raggiunge il valore specificato.<br/>Aumentando questo valore si può migliorare il tasso di richiamo al costo di un aumento del tempo di ricerca.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
</div>
<div class="filter-sparse">
<h3 id="SPARSEINVERTEDINDEX" class="common-anchor-header">INDICE SPARSE_INVERTITO</h3><p>Ogni dimensione mantiene un elenco di vettori che hanno un valore non nullo in quella dimensione. Durante la ricerca, Milvus itera attraverso ogni dimensione del vettore di interrogazione e calcola i punteggi per i vettori che hanno valori non nulli in quelle dimensioni.</p>
<ul>
<li><p>Parametri di costruzione dell'indice</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Gamma</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">inverted_index_algo</code></td><td>L'algoritmo usato per costruire e interrogare l'indice. Per i dettagli, fare riferimento a <a href="/docs/it/v2.5.x/sparse_vector.md#Set-index-params-for-vector-field">Vettore sparso</a>.</td><td><code translate="no">DAAT_MAXSCORE</code> (predefinito), <code translate="no">DAAT_WAND</code>, <code translate="no">TAAT_NAIVE</code></td></tr>
<tr><td><code translate="no">bm25_k1</code></td><td>Controlla la saturazione della frequenza dei termini. Valori più alti aumentano l'importanza delle frequenze dei termini nella classificazione dei documenti.</td><td>[1.2, 2.0]</td></tr>
<tr><td><code translate="no">bm25_b</code></td><td>Controlla il grado di normalizzazione della lunghezza dei documenti. Il valore predefinito è 0,75.</td><td>[0, 1]</td></tr>
</tbody>
</table>
  <div class="alert note">
<p>Il parametro <code translate="no">drop_ratio_build</code> è deprecato da Milvus v2.5.4; può ancora essere accettato durante la costruzione dell'indice, ma non avrà più alcun effetto effettivo sull'indice.</p>
  </div>
</li>
<li><p>Parametri di ricerca</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>Percentuale di valori vettoriali piccoli che vengono esclusi durante il processo di ricerca. Questa opzione consente di regolare con precisione il processo di ricerca, specificando la proporzione dei valori più piccoli del vettore di query da ignorare. Aiuta a bilanciare la precisione della ricerca e le prestazioni. Più piccolo è il valore impostato per <code translate="no">drop_ratio_search</code>, meno questi valori piccoli contribuiscono al punteggio finale. Ignorando alcuni valori piccoli, è possibile migliorare le prestazioni della ricerca con un impatto minimo sulla precisione.</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">Qual è la differenza tra indice FLAT e indice IVF_FLAT?</font></summary></p>
<p>L'indice IVF_FLAT divide uno spazio vettoriale in <code translate="no">nlist</code> cluster. Se si mantiene il valore predefinito di <code translate="no">nlist</code> come 16384, Milvus confronta le distanze tra il vettore di destinazione e i centri di tutti i 16384 cluster per ottenere i cluster <code translate="no">nprobe</code> più vicini. Quindi Milvus confronta le distanze tra il vettore target e i vettori nei cluster selezionati per ottenere i vettori più vicini. A differenza di IVF_FLAT, FLAT confronta direttamente le distanze tra il vettore target e ogni singolo vettore.</p>
<p>
Pertanto, quando il numero totale di vettori è all'incirca pari a <code translate="no">nlist</code>, IVF_FLAT e FLAT presentano poche differenze nel modo di calcolo richiesto e nelle prestazioni di ricerca. Ma quando il numero di vettori cresce fino a due volte, tre volte o n volte <code translate="no">nlist</code>, l'indice IVF_FLAT inizia a mostrare vantaggi sempre maggiori.</p>
<p>
Per ulteriori informazioni, vedere <a href="https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212">Come scegliere un indice in Milvus</a>.</p>
</details>
<h2 id="Whats-next" class="common-anchor-header">Cosa c'è dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Per saperne di più sulle <a href="/docs/it/v2.5.x/metric.md">metriche di somiglianza</a> supportate da Milvus.</li>
</ul>
