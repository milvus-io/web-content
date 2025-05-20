---
id: performance_faq.md
summary: >-
  Trovate le risposte alle domande più frequenti sulle prestazioni della
  ricerca, sui miglioramenti delle prestazioni e su altri problemi legati alle
  prestazioni.
title: FAQ sulle prestazioni
---
<h1 id="Performance-FAQ" class="common-anchor-header">FAQ sulle prestazioni<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">Come impostare <code translate="no">nlist</code> e <code translate="no">nprobe</code> per gli indici FIV?</h4><p>L'impostazione di <code translate="no">nlist</code> è specifica dello scenario. Come regola generale, il valore consigliato di <code translate="no">nlist</code> è <code translate="no">4 × sqrt(n)</code>, dove <code translate="no">n</code> è il numero totale di entità in un segmento.</p>
<p>La dimensione di ogni segmento è determinata dal parametro <code translate="no">datacoord.segment.maxSize</code>, che per impostazione predefinita è di 512 MB. Il numero totale di entità in un segmento n può essere stimato dividendo <code translate="no">datacoord.segment.maxSize</code> per la dimensione di ciascuna entità.</p>
<p>L'impostazione di <code translate="no">nprobe</code> è specifica per il set di dati e lo scenario e comporta un compromesso tra accuratezza e prestazioni della query. Si consiglia di trovare il valore ideale attraverso ripetute sperimentazioni.</p>
<p>I grafici seguenti sono i risultati di un test eseguito sul dataset sift50m e sull'indice IVF_SQ8, che mette a confronto il richiamo e le prestazioni delle query di diverse coppie <code translate="no">nlist</code>/<code translate="no">nprobe</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" />
   </span> <span class="img-wrapper"> <span>Test di accuratezza</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /><span>Test di performance</span> </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">Perché le query a volte richiedono più tempo su dataset più piccoli?</h4><p>Le operazioni di query vengono eseguite su segmenti. Gli indici riducono il tempo necessario per interrogare un segmento. Se un segmento non è stato indicizzato, Milvus ricorre alla ricerca bruta sui dati grezzi, aumentando drasticamente il tempo di interrogazione.</p>
<p>Di conseguenza, di solito ci vuole più tempo per interrogare un piccolo insieme di dati (collezione) perché non è stato costruito un indice. Questo perché le dimensioni dei suoi segmenti non hanno raggiunto la soglia di costruzione dell'indice impostata da <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>. Chiamare <code translate="no">create_index()</code> per forzare Milvus a indicizzare i segmenti che hanno raggiunto la soglia ma non sono ancora stati indicizzati automaticamente, migliorando significativamente le prestazioni delle query.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">Quali fattori influiscono sull'utilizzo della CPU?</h4><p>L'utilizzo della CPU aumenta quando Milvus costruisce indici o esegue query. In generale, la creazione di indici è intensiva per la CPU, tranne quando si utilizza Annoy, che viene eseguito su un singolo thread.</p>
<p>Durante l'esecuzione delle query, l'utilizzo della CPU è influenzato da <code translate="no">nq</code> e <code translate="no">nprobe</code>. Quando <code translate="no">nq</code> e <code translate="no">nprobe</code> sono piccoli, la concorrenza è bassa e l'uso della CPU rimane basso.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">L'inserimento simultaneo di dati e la ricerca hanno un impatto sulle prestazioni delle query?</h4><p>Le operazioni di inserimento non sono intensive per la CPU. Tuttavia, poiché i nuovi segmenti potrebbero non aver raggiunto la soglia per la creazione dell'indice, Milvus ricorre alla ricerca bruta, con un impatto significativo sulle prestazioni della query.</p>
<p>Il parametro <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> determina la soglia di costruzione dell'indice per un segmento ed è impostato per default su 1024 righe. Per ulteriori informazioni, vedere <a href="/docs/it/v2.4.x/system_configuration.md">Configurazione del sistema</a>.</p>
<h4 id="Is-storage-space-released-right-after-data-deletion-in-Milvus" class="common-anchor-header">Lo spazio di archiviazione viene rilasciato subito dopo l'eliminazione dei dati in Milvus?</h4><p>No, lo spazio di archiviazione non viene liberato immediatamente quando si eliminano i dati in Milvus. Sebbene l'eliminazione dei dati segni le entità come "logicamente eliminate", lo spazio effettivo potrebbe non essere liberato immediatamente. Ecco perché:</p>
<ul>
<li><strong>Compattazione</strong>: Milvus compatta automaticamente i dati in background. Questo processo unisce segmenti di dati più piccoli in segmenti più grandi e rimuove i dati eliminati logicamente (entità contrassegnate per l'eliminazione) o i dati che hanno superato il loro Time-To-Live (TTL). Tuttavia, la compattazione crea nuovi segmenti e contrassegna quelli vecchi come "abbandonati".</li>
<li><strong>Garbage Collection</strong>: Un processo separato chiamato Garbage Collection (GC) rimuove periodicamente questi segmenti "abbandonati", liberando lo spazio di memoria che occupavano. Ciò garantisce un uso efficiente dello spazio di archiviazione, ma può comportare un leggero ritardo tra l'eliminazione e il recupero dello spazio.</li>
</ul>
<h4 id="Can-I-see-inserted-deleted-or-upserted-data-immediately-after-the-operation-without-waiting-for-a-flush" class="common-anchor-header">Posso vedere i dati inseriti, cancellati o upsertati subito dopo l'operazione senza aspettare il flush?</h4><p>Sì, in Milvus la visibilità dei dati non è direttamente legata alle operazioni di flush, grazie alla sua architettura di disaggregazione storage-computer. È possibile gestire la leggibilità dei dati utilizzando i livelli di coerenza.</p>
<p>Quando si sceglie un livello di coerenza, bisogna considerare il compromesso tra coerenza e prestazioni. Per le operazioni che richiedono una visibilità immediata, utilizzare un livello di coerenza "forte". Per le scritture più veloci, privilegiare una consistenza più debole (i dati potrebbero non essere immediatamente visibili). Per ulteriori informazioni, consultare <a href="/docs/it/v2.4.x/consistency.md">Consistenza</a>.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">L'indicizzazione di un campo VARCHAR può migliorare la velocità di cancellazione?</h4><p>L'indicizzazione di un campo VARCHAR può accelerare le operazioni di "Delete By Expression", ma solo a determinate condizioni:</p>
<ul>
<li><strong>Indice invertito</strong>: Questo indice è utile per le espressioni <code translate="no">IN</code> o <code translate="no">==</code> su campi VARCHAR a chiave non primaria.</li>
<li><strong>Indice Trie</strong>: Questo indice è utile per le query con prefisso (ad esempio, <code translate="no">LIKE prefix%</code>) su campi VARCHAR non primari.</li>
</ul>
<p>Tuttavia, l'indicizzazione di un campo VARCHAR non è più veloce:</p>
<ul>
<li><strong>Eliminazione per ID</strong>: Quando il campo VARCHAR è la chiave primaria.</li>
<li><strong>Espressioni non correlate</strong>: Quando il campo VARCHAR non fa parte dell'espressione di eliminazione.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">Avete ancora domande?</h4><p>È possibile:</p>
<ul>
<li>Consultare <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> su GitHub. Sentitevi liberi di fare domande, condividere idee e aiutare gli altri.</li>
<li>Unitevi al nostro <a href="https://discord.com/invite/8uyFbECzPX">server Discord</a> per trovare supporto e partecipare alla nostra comunità open-source.</li>
</ul>
