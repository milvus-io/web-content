---
id: knowhere.md
summary: Scoprite Knowhere a Milvus.
title: Knowhere
---
<h1 id="Knowhere" class="common-anchor-header">Knowhere<button data-href="#Knowhere" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento introduce Knowhere, il motore di esecuzione vettoriale di Milvus.</p>
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
    </button></h2><p>Knowhere è il motore di esecuzione vettoriale principale di Milvus, che incorpora diverse librerie di ricerca di similarità vettoriale, tra cui <a href="https://github.com/facebookresearch/faiss">Faiss</a>, <a href="https://github.com/nmslib/hnswlib">Hnswlib</a> e <a href="https://github.com/spotify/annoy">Annoy</a>. Knowhere è anche progettato per supportare l'elaborazione eterogenea. Controlla su quale hardware (CPU o GPU) eseguire le richieste di creazione di indici e di ricerca. È così che Knowhere prende il suo nome: sa dove eseguire le operazioni. Nelle versioni future saranno supportati altri tipi di hardware, tra cui DPU e TPU.</p>
<h2 id="Knowhere-in-the-Milvus-architecture" class="common-anchor-header">Knowhere nell'architettura Milvus<button data-href="#Knowhere-in-the-Milvus-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>La figura seguente illustra la posizione di Knowhere nell'architettura Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/knowhere_architecture.png" alt="Knowhere" class="doc-image" id="knowhere" />
   </span> <span class="img-wrapper"> <span>Knowhere</span> </span></p>
<p>Il livello più basso è l'hardware di sistema. Sopra di esso si trovano le librerie di indici di terze parti. Nel livello superiore, Knowhere interagisce con il nodo indice e il nodo di interrogazione tramite CGO, che consente ai pacchetti Go di richiamare codice C.</p>
<h2 id="Knowhere-advantages" class="common-anchor-header">Vantaggi di Knowhere<button data-href="#Knowhere-advantages" class="anchor-icon" translate="no">
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
    </button></h2><p>I vantaggi di Knowhere rispetto a Faiss sono i seguenti.</p>
<h4 id="Support-for-BitsetView" class="common-anchor-header">Supporto per BitsetView</h4><p>Milvus introduce un meccanismo di bitset per realizzare la &quot;cancellazione morbida&quot;. Un vettore eliminato in modo soft esiste ancora nel database, ma non viene calcolato durante una ricerca o un'interrogazione di similarità vettoriale.</p>
<p>Ogni bit di un bitset corrisponde a un vettore indicizzato. Se un vettore è contrassegnato come "1" nel bitset, significa che questo vettore è stato eliminato in modo soft e non sarà coinvolto in una ricerca vettoriale. Il parametro bitset viene applicato a tutte le API di interrogazione dell'indice Faiss esposte in Knowhere, compresi gli indici della CPU e della GPU.</p>
<p>Per ulteriori informazioni sul meccanismo dei bitset, consultare <a href="/docs/it/v2.4.x/bitset.md">bitset</a>.</p>
<h4 id="Support-for-multiple-similarity-metrics-for-indexing-binary-vectors" class="common-anchor-header">Supporto di più metriche di similarità per l'indicizzazione di vettori binari</h4><p>Knowhere supporta <a href="/docs/it/v2.4.x/metric.md#Hamming-distance">Hamming</a>, <a href="/docs/it/v2.4.x/metric.md#Jaccard-distance">Jaccard</a>, <a href="/docs/it/v2.4.x/metric.md#Tanimoto-distance">Tanimoto</a>, <a href="/docs/it/v2.4.x/metric.md#Superstructure">Superstructure</a> e <a href="/docs/it/v2.4.x/metric.md#Substructure">Substructure</a>. Jaccard e Tanimoto possono essere utilizzati per misurare la somiglianza tra due insiemi di campioni, mentre Superstructure e Substructure possono essere utilizzate per misurare la somiglianza tra strutture chimiche.</p>
<h4 id="Support-for-AVX512-instruction-set" class="common-anchor-header">Supporto per il set di istruzioni AVX512</h4><p>Oltre ad <a href="https://en.wikipedia.org/wiki/AArch64">AArch64</a>, <a href="https://en.wikipedia.org/wiki/SSE4#SSE4.2">SSE4.2</a> e <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions">AVX2</a>, i set di istruzioni già supportati da Faiss, Knowhere supporta anche <a href="https://en.wikipedia.org/wiki/AVX-512">AVX512</a>, che può <a href="https://milvus.io/blog/milvus-performance-AVX-512-vs-AVX2.md">migliorare le prestazioni della creazione di indici e delle query del 20-30%</a> rispetto ad AVX2.</p>
<h4 id="Automatic-SIMD-instruction-selection" class="common-anchor-header">Selezione automatica delle istruzioni SIMD</h4><p>Knowhere supporta l'invocazione automatica delle istruzioni SIMD adatte (ad esempio, SIMD SSE, AVX, AVX2 e AVX512) su qualsiasi processore della CPU (sia su piattaforme on-premises che cloud), in modo che gli utenti non debbano specificare manualmente il flag SIMD (ad esempio, "-msse4") durante la compilazione.</p>
<p>Knowhere è stato realizzato attraverso il refactoring della base di codice di Faiss. Le funzioni comuni (ad esempio, il calcolo della somiglianza) che si basano sull'accelerazione SIMD vengono eliminate. Quindi, per ogni funzione, vengono implementate quattro versioni (SSE, AVX, AVX2, AVX512), ognuna delle quali viene inserita in un file sorgente separato. I file sorgenti vengono poi compilati singolarmente con il corrispondente flag SIMD. Pertanto, in fase di esecuzione, Knowhere è in grado di scegliere automaticamente le istruzioni SIMD più adatte in base ai flag correnti della CPU e di collegare i puntatori alle funzioni giuste utilizzando l'hooking.</p>
<h4 id="Other-performance-optimization" class="common-anchor-header">Altre ottimizzazioni delle prestazioni</h4><p>Per ulteriori informazioni sull'ottimizzazione delle prestazioni di Knowhere, leggete <a href="https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf">Milvus: A Purpose-Built Vector Data Management System</a>.</p>
<h2 id="Knowhere-code-structure" class="common-anchor-header">Struttura del codice di Knowhere<button data-href="#Knowhere-code-structure" class="anchor-icon" translate="no">
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
    </button></h2><p>Il calcolo in Milvus coinvolge principalmente operazioni vettoriali e scalari. Knowhere gestisce solo le operazioni di indicizzazione vettoriale.</p>
<p>Un indice è una struttura di dati indipendente dai dati vettoriali originali. In generale, l'indicizzazione richiede quattro fasi: creare un indice, addestrare i dati, inserire i dati e costruire un indice. In alcune applicazioni di intelligenza artificiale, l'addestramento dei dataset è separato dalla ricerca dei vettori. I dati dei dataset vengono prima addestrati e poi inseriti in un database vettoriale come Milvus per la ricerca di similarità. Ad esempio, i dataset aperti sift1M e sift1B differenziano i dati per l'addestramento da quelli per i test.</p>
<p>In Knowhere, invece, i dati per l'addestramento e per la ricerca sono gli stessi. Knowhere addestra tutti i dati in un <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Segments">segmento</a> e poi inserisce tutti i dati addestrati e costruisce un indice per loro.</p>
<h4 id="DataObj-base-class" class="common-anchor-header"><code translate="no">DataObj</code>: classe base</h4><p><code translate="no">DataObj</code> è la classe base di tutte le strutture dati di Knowhere. <code translate="no">Size()</code> è l'unico metodo virtuale di <code translate="no">DataObj</code>. La classe Index eredita da <code translate="no">DataObj</code> con un campo chiamato &quot;size_&quot;. La classe Indice ha anche due metodi virtuali: <code translate="no">Serialize()</code> e <code translate="no">Load()</code>. La classe <code translate="no">VecIndex</code> derivata da <code translate="no">Index</code> è la classe base virtuale per tutti gli indici vettoriali. <code translate="no">VecIndex</code> fornisce metodi tra cui <code translate="no">Train()</code>, <code translate="no">Query()</code>, <code translate="no">GetStatistics()</code> e <code translate="no">ClearStatistics()</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Knowhere_base_classes.png" alt="base class" class="doc-image" id="base-class" />
   </span> <span class="img-wrapper"> <span>classe base</span> </span></p>
<p>Alcuni altri tipi di indice sono elencati a destra nella figura precedente.</p>
<ul>
<li><p>L'indice di Faiss ha due classi base: <code translate="no">FaissBaseIndex</code> per tutti gli indici su vettori in virgola mobile e <code translate="no">FaissBaseBinaryIndex</code> per tutti gli indici su vettori binari.</p></li>
<li><p><code translate="no">GPUIndex</code> è la classe base per tutti gli indici Faiss GPU.</p></li>
<li><p><code translate="no">OffsetBaseIndex</code> è la classe base per tutti gli indici sviluppati in proprio. Dato che in un file di indice vengono memorizzati solo gli ID dei vettori, la dimensione del file per i vettori a 128 dimensioni può essere ridotta di 2 ordini di grandezza.</p></li>
</ul>
<h4 id="IDMAP-brute-force-search" class="common-anchor-header"><code translate="no">IDMAP</code>: ricerca a forza bruta</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IDMAP.png" alt="IDMAP" class="doc-image" id="idmap" />
   </span> <span class="img-wrapper"> <span>IDMAP</span> </span></p>
<p>Tecnicamente parlando, <code translate="no">IDMAP</code> non è un indice, ma viene utilizzato per la ricerca bruta. Quando i vettori vengono inseriti nel database, non è necessario né addestrare i dati né costruire un indice. Le ricerche saranno condotte direttamente sui dati vettoriali inseriti.</p>
<p>Tuttavia, per coerenza di codice, <code translate="no">IDMAP</code> eredita anche dalla classe <code translate="no">VecIndex</code> con tutte le sue interfacce virtuali. L'uso di <code translate="no">IDMAP</code> è lo stesso degli altri indici.</p>
<h4 id="IVF-indices" class="common-anchor-header">Indici FIV</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IVF.png" alt="IVF" class="doc-image" id="ivf" />
   </span> <span class="img-wrapper"> <span>FIV</span> </span></p>
<p>Gli indici IVF (inverted file) sono i più utilizzati. La classe <code translate="no">IVF</code> è derivata da <code translate="no">VecIndex</code> e <code translate="no">FaissBaseIndex</code>, e si estende ulteriormente a <code translate="no">IVFSQ</code> e <code translate="no">IVFPQ</code>. <code translate="no">GPUIVF</code> è derivata da <code translate="no">GPUIndex</code> e <code translate="no">IVF</code>. Poi <code translate="no">GPUIVF</code> si estende ulteriormente a <code translate="no">GPUIVFSQ</code> e <code translate="no">GPUIVFPQ</code>.</p>
<p><code translate="no">IVFSQHybrid</code> è un indice ibrido sviluppato in proprio. Un quantizzatore grossolano viene eseguito sulla GPU, mentre la ricerca nel bucket viene eseguita dalla CPU. Questo tipo di indice può ridurre il numero di copie di memoria tra CPU e GPU, sfruttando la potenza di calcolo della GPU. <code translate="no">IVFSQHybrid</code> ha lo stesso tasso di richiamo di <code translate="no">GPUIVFSQ</code>, ma offre prestazioni migliori.</p>
<p>La struttura delle classi base per gli indici binari è relativamente più semplice. <code translate="no">BinaryIDMAP</code> e <code translate="no">BinaryIVF</code> sono derivati da <code translate="no">FaissBaseBinaryIndex</code> e <code translate="no">VecIndex</code>.</p>
<h4 id="Third-party-indices" class="common-anchor-header">Indici di terze parti</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/third_party_index.png" alt="third-party indices" class="doc-image" id="third-party-indices" />
   </span> <span class="img-wrapper"> <span>indici di terze parti</span> </span></p>
<p>Attualmente sono supportati solo due tipi di indici di terze parti, oltre a Faiss: l'indice ad albero <code translate="no">Annoy</code> e l'indice a grafo <code translate="no">HNSW</code>. Questi due indici di terze parti, comuni e frequentemente utilizzati, sono entrambi derivati da <code translate="no">VecIndex</code>.</p>
<h2 id="Adding-indices-to-Knowhere" class="common-anchor-header">Aggiungere indici a Knowhere<button data-href="#Adding-indices-to-Knowhere" class="anchor-icon" translate="no">
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
    </button></h2><p>Se si desidera aggiungere nuovi indici a Knowhere, per prima cosa è possibile fare riferimento agli indici esistenti:</p>
<ul>
<li><p>Per aggiungere indici basati sulla quantizzazione, fare riferimento a <code translate="no">IVF_FLAT</code>.</p></li>
<li><p>Per aggiungere indici basati su grafi, fare riferimento a <code translate="no">HNSW</code>.</p></li>
<li><p>Per aggiungere indici ad albero, fare riferimento a <code translate="no">Annoy</code>.</p></li>
</ul>
<p>Dopo aver fatto riferimento all'indice esistente, si può seguire la procedura seguente per aggiungere un nuovo indice a Knowhere.</p>
<ol>
<li><p>Aggiungere il nome del nuovo indice in <code translate="no">IndexEnum</code>. Il tipo di dati è stringa.</p></li>
<li><p>Aggiungere il controllo di convalida dei dati sul nuovo indice nel file <code translate="no">ConfAdapter.cpp</code>. Il controllo di convalida serve principalmente a convalidare i parametri per la formazione dei dati e la query.</p></li>
<li><p>Creare un nuovo file per il nuovo indice. La classe base del nuovo indice deve includere <code translate="no">VecIndex</code> e l'interfaccia virtuale necessaria di <code translate="no">VecIndex</code>.</p></li>
<li><p>Aggiungere la logica di costruzione dell'indice per il nuovo indice in <code translate="no">VecIndexFactory::CreateVecIndex()</code>.</p></li>
<li><p>Aggiungere il test unitario nella cartella <code translate="no">unittest</code>.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">Il prossimo passo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver appreso il funzionamento di Knowhere in Milvus, si consiglia di:</p>
<ul>
<li><p>Conoscere i <a href="/docs/it/v2.4.x/index.md">vari tipi di indici supportati da Milvus</a>.</p></li>
<li><p>Conoscere il <a href="/docs/it/v2.4.x/bitset.md">meccanismo dei bitset</a>.</p></li>
<li><p>Capire <a href="/docs/it/v2.4.x/data_processing.md">come vengono elaborati i dati</a> in Milvus.</p></li>
</ul>
