---
id: performance_faq.md
summary: >-
  Trova le risposte alle domande più frequenti relative alle prestazioni di
  ricerca, ai miglioramenti delle prestazioni e ad altre questioni legate alle
  prestazioni.
title: Domande frequenti sulle prestazioni
---
<h1 id="Performance-FAQ" class="common-anchor-header">Domande frequenti sulle prestazioni<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">Come impostare i valori di " <code translate="no">nlist</code> " e " <code translate="no">nprobe</code> " per gli indici IVF?</h4><p>L'impostazione di <code translate="no">nlist</code> dipende dallo scenario specifico. Come regola generale, il valore consigliato per <code translate="no">nlist</code> è <code translate="no">4 × sqrt(n)</code>, dove <code translate="no">n</code> è il numero totale di entità in un segmento.</p>
<p>La dimensione di ciascun segmento è determinata dal parametro ` <code translate="no">datacoord.segment.maxSize</code> `, impostato di default a 1024 MB. Il numero totale di entità in un segmento n può essere stimato dividendo ` <code translate="no">datacoord.segment.maxSize</code> ` per la dimensione di ciascuna entità.</p>
<p>L'impostazione di ` <code translate="no">nprobe</code> ` è specifica per il set di dati e lo scenario e comporta un compromesso tra accuratezza e prestazioni delle query. Si consiglia di individuare il valore ideale attraverso ripetute sperimentazioni.</p>
<p>I grafici seguenti riportano i risultati di un test eseguito sul set di dati sift50m e sull’indice IVF_SQ8, che mette a confronto il recall e le prestazioni delle query per diverse coppie di valori <code translate="no">nlist</code>/<code translate="no">nprobe</code>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" /> 
   <span>Test di accuratezza</span>
 </span> <span class="img-wrapper"> 


  
   <img translate="no" src="/docs/v2.6.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /> 
 <span>   Test delle prestazioni</span>
  
 </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">Perché a volte le query richiedono più tempo su set di dati più piccoli?</h4><p>Le operazioni di query vengono eseguite sui segmenti. Gli indici riducono il tempo necessario per eseguire una query su un segmento. Se un segmento non è stato indicizzato, Milvus ricorre alla ricerca a forza bruta sui dati grezzi, aumentando drasticamente il tempo di esecuzione della query.</p>
<p>Pertanto, di solito ci vuole più tempo per eseguire una query su un set di dati (collezione) di piccole dimensioni perché non è stato creato alcun indice. Ciò è dovuto al fatto che le dimensioni dei suoi segmenti non hanno raggiunto la soglia di creazione dell’indice impostata da <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>. Chiamare <code translate="no">create_index()</code> per forzare Milvus a indicizzare i segmenti che hanno raggiunto la soglia ma non sono stati ancora indicizzati automaticamente, migliorando significativamente le prestazioni delle query.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">Quali fattori influenzano l’utilizzo della CPU?</h4><p>L’utilizzo della CPU aumenta quando Milvus sta creando indici o eseguendo query. In generale, la creazione degli indici richiede un uso intensivo della CPU, tranne quando si utilizza Annoy, che funziona su un singolo thread.</p>
<p>Durante l’esecuzione delle query, l’utilizzo della CPU è influenzato dai parametri <code translate="no">nq</code> e <code translate="no">nprobe</code>. Quando i valori di <code translate="no">nq</code> e <code translate="no">nprobe</code> sono bassi, la concorrenza è ridotta e l’utilizzo della CPU rimane basso.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">L'inserimento simultaneo di dati e la ricerca influiscono sulle prestazioni delle query?</h4><p>Le operazioni di inserimento non richiedono un uso intensivo della CPU. Tuttavia, poiché i nuovi segmenti potrebbero non aver raggiunto la soglia per la creazione dell’indice, Milvus ricorre alla ricerca a forza bruta, con un impatto significativo sulle prestazioni delle query.</p>
<p>Il parametro <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> determina la soglia di creazione dell’indice per un segmento ed è impostato di default su 1024 righe. Per ulteriori informazioni, consultare <a href="/docs/it/v2.6.x/system_configuration.md">la sezione Configurazione di sistema</a>.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">L’indicizzazione di un campo VARCHAR può migliorare la velocità di eliminazione?</h4><p>L’indicizzazione di un campo VARCHAR può accelerare le operazioni “Delete By Expression”, ma solo a determinate condizioni:</p>
<ul>
<li><strong>Indice INVERTED</strong>: questo indice è utile per le espressioni " <code translate="no">IN</code> " o " <code translate="no">==</code> " su campi VARCHAR non chiave primaria.</li>
<li><strong>Indice Trie</strong>: questo indice è utile per le query con prefisso (ad es., <code translate="no">LIKE prefix%</code>) su campi VARCHAR non primari.</li>
</ul>
<p>Tuttavia, l’indicizzazione di un campo VARCHAR non velocizza:</p>
<ul>
<li><strong>L'eliminazione in base agli ID</strong>: quando il campo VARCHAR è la chiave primaria.</li>
<li><strong>Espressioni non correlate</strong>: quando il campo VARCHAR non fa parte dell’espressione di eliminazione.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">Hai ancora domande?</h4><p>Puoi:</p>
<ul>
<li>Dare un'occhiata a <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> su GitHub. Sentiti libero di porre domande, condividere idee e aiutare gli altri.</li>
<li>Unisciti <a href="https://discord.com/invite/8uyFbECzPX">al</a> nostro <a href="https://discord.com/invite/8uyFbECzPX">canale Discord</a> per ricevere assistenza e interagire con la nostra comunità open source.</li>
</ul>
