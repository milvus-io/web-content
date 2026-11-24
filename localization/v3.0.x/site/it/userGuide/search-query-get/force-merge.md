---
id: force-merge.md
title: Compattazione con unione forzataCompatible with Milvus 3.0.x
summary: >-
  Utilizzare la compattazione con unione forzata per consolidare i segmenti di
  piccole dimensioni e migliorare le prestazioni delle query e l'efficienza
  dello spazio di archiviazione.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">Compattazione con unione forzata<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Force Merge è progettato per consolidare segmenti piccoli e frammentati in segmenti meno numerosi e più grandi, al fine di migliorare le prestazioni delle query e l'efficienza dello spazio di archiviazione. Questa guida spiega come utilizzare la compattazione con fusione forzata.</p>
<div class="alert note">
<p>Questa funzionalità è in anteprima pubblica. Non utilizzarla in ambienti di produzione.</p>
</div>
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
    </button></h2><p><code translate="no">maxSize</code> L <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">a compattazione</a> standard mantiene le dimensioni dei segmenti vicine all'<code translate="no">maxSize</code> e configurato tramite unioni molti-a-uno, ma può comunque lasciare frammenti di medie dimensioni che non possono essere ulteriormente uniti senza superare i limiti. Ad esempio, come illustrato di seguito, se una raccolta ha cinque segmenti da 2 MB e l’ e è di 3 MB, l’unione di due segmenti qualsiasi supererebbe il limite, quindi la compattazione standard non può ridurre ulteriormente il numero di segmenti e il layout frammentato rimane invariato.</p>
<p>La fusione forzata aggiunge un parametro " <code translate="no">target_size</code> " e supporta la riorganizzazione dei segmenti verso la dimensione desiderata entro una tolleranza ristretta, quando possibile. Come illustrato di seguito, se l’ <code translate="no">target_size</code> e specificata è di 4 MB, i cinque segmenti piccoli da 2 MB possono essere ulteriormente uniti in un numero minore di segmenti più grandi. Ciò riduce il numero di segmenti in eccesso, supporta obiettivi più grandi rispetto alle impostazioni predefinite di <code translate="no">maxSize</code> e, quando l’obiettivo è molto grande, consente al sistema di scegliere una dimensione di output e un numero di segmenti pratici per l’hardware corrente e la topologia di QueryNode.</p>
<p>Per capire quale metodo di compattazione utilizzare, consultare <a href="#faq">le Domande frequenti (FAQ)</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" /> 
   <span>R8eow3kaqhktokblcmocnvxmnee</span>
  
 </span></p>
<p>La compattazione con unione forzata estende l’attuale <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> API esistente con il parametro ` <code translate="no">target_size</code> `. È completamente retrocompatibile: le chiamate di compattazione esistenti senza ` <code translate="no">target_size</code> ` continuano a funzionare come prima.</p>
<p>La compattazione con unione forzata opera in modo asincrono. Non blocca le operazioni di ricerca o di query, sebbene consumi risorse di I/O e di memoria durante l’esecuzione.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">Utilizzo della compattazione con fusione forzata<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Milvus versione 3.0 o successive</p></li>
<li><p>PyMilvus 3.0 o successivo</p></li>
</ul>
<h3 id="Global-Configuration" class="common-anchor-header">Configurazione globale<button data-href="#Global-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>I seguenti parametri di configurazione controllano il comportamento della "Force Merge". Impostarli nel file di configurazione di Milvus o tramite variabili d'ambiente.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">segment:</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">512</span>         <span class="hljs-comment"># Default segment max size (MB).</span>
                         <span class="hljs-comment"># Used when target_size is 0 or omitted.</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">maxFullSegmentThreshold:</span> <span class="hljs-number">100</span>
                         <span class="hljs-comment"># When segment count exceeds this threshold,</span>
                         <span class="hljs-comment"># a faster greedy algorithm is used instead</span>
                         <span class="hljs-comment"># of the standard merge algorithm.</span>
    <span class="hljs-attr">forceMerge:</span>
      <span class="hljs-attr">datanodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># DataNode memory divided by this factor</span>
                         <span class="hljs-comment"># determines the the largest segment</span>
                         <span class="hljs-comment"># size the system can allow.</span>
      <span class="hljs-attr">querynodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># Minimum QueryNode memory divided by this</span>
                         <span class="hljs-comment"># factor. Used in automatic size calculation</span>
                         <span class="hljs-comment"># to ensure merged segments can be loaded.</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Valore predefinito</p></th>
     <th><p>Descrizione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>1024</p></td>
     <td><p>Dimensione massima predefinita del segmento in MB. Viene utilizzata come valore di destinazione quando ` <code translate="no">target_size</code> ` è pari a 0 o viene omesso. Funge anche da valore minimo consentito per l'opzione esplicita ` <code translate="no">target_size</code>`.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>Soglia del numero di segmenti per la selezione dell’algoritmo. Quando il numero di segmenti supera questo valore, Milvus utilizza un algoritmo avido più veloce per la pianificazione dell’unione.</p><ul><li><p><strong>Algoritmo standard</strong> (utilizzato quando il numero di segmenti è ≤ a ` <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>`): produce risultati di unione più ottimali, ma richiede più tempo per il calcolo.</p></li><li><p><strong>Algoritmo avido</strong> (utilizzato quando il numero di segmenti è &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): completa la pianificazione molto più rapidamente, a costo di un raggruppamento dei segmenti leggermente meno ottimale.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>La memoria del DataNode viene divisa per questo fattore per calcolare la dimensione massima dei segmenti consentita dal sistema.</p><ul><li><p>Un valore più alto alloca meno memoria alla fusione, ma ne lascia di più per altre operazioni del DataNode, migliorando la  stabilità del nodo.</p></li><li><p>Un valore più basso consente unioni più grandi ma aumenta la pressione sulla memoria.</p></li><li><p>Ad esempio, con il fattore predefinito di 4,0 e un DataNode con 16 GB di memoria, il budget di unione è di 4 GB. Ciò significa che la dimensione totale dei segmenti uniti in una singola operazione non può superare i 4 GB.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4,0</p></td>
     <td><p>La memoria minima del QueryNode viene divisa per questo fattore. Viene utilizzato durante il calcolo automatico delle dimensioni (<code translate="no">target_size=max_int64</code>) per garantire che i segmenti uniti possano essere caricati dai QueryNode.</p><ul><li><p>Un valore più alto produce segmenti più piccoli, più facili da caricare per i QueryNode.</p></li><li><p>Un valore più basso consente di ottenere segmenti più grandi, ma può causare errori di caricamento sui QueryNode con memoria limitata.</p></li><li><p>Ad esempio, con il fattore predefinito di 4,0 e il QueryNode più piccolo dotato di 16 GB di memoria, la dimensione target calcolata automaticamente non supererà i 4 GB. Ciò impedisce a Force Merge di produrre segmenti così grandi da non poter essere caricati dai QueryNode.</p></li></ul></td>
   </tr>
</table>
<p>Per applicare le modifiche di cui sopra al proprio cluster Milvus, si prega di seguire i passaggi descritti in <a href="/docs/it/configure-helm.md#Configure-Milvus-via-configuration-file">Configurare Milvus con Helm</a> e <a href="/docs/it/configure_operator.md">Configurare Milvus con gli operatori Milvus</a>.</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">Attivazione della compattazione con Force Merge<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>È possibile avviare la compattazione Force Merge chiamando ` <code translate="no">compact()</code> ` con il parametro ` <code translate="no">target_size</code> `. Per i dettagli sui parametri, consultare la sezione " <a href="#parameter-reference">Riferimento ai parametri</a> " riportata di seguito.</p>
<p>Sono disponibili tre modalità di compattazione "Force Merge":</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 1024 MB)
│  Equivalent to standard compaction
│
├─ Mode 2: target_size = 2048
│  Merges segments to ~2 GB each
│  Must be &gt;= config maxSize
│
└─ Mode 3: target_size = max_int64
   Auto-calculates optimal size based on
   segment distribution and node memory
<button class="copy-code-btn"></button></code></pre>
<p>Di seguito sono riportati alcuni esempi che illustrano come utilizzare ciascuna modalità di compattazione "Force Merge".</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">Predefinita (compattazione standard)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 1024 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">Dimensione di destinazione esplicita</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">Calcolo automatico della dimensione</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<p><a id="parameter-reference"></a></p>
<h4 id="Parameter-reference" class="common-anchor-header">Riferimento ai parametri</h4><p>La tabella seguente illustra i parametri.</p>
<table>
   <tr>
     <th><p><strong>Parametro</strong></p></th>
     <th><p><strong>Tipo</strong></p></th>
     <th><p><strong>Descrizione</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>Obbligatorio. Il nome della raccolta da compattare.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>Facoltativo. La dimensione del segmento di destinazione in MB. Sono disponibili 3 opzioni per il valore del parametro:</p><ul><li><p><strong>0 o omesso</strong>: utilizza l'<code translate="no">dataCoord.segment.maxSize</code> e configurato (impostazione predefinita: 1024 MB). Equivalente alla compattazione standard.</p></li><li><p><strong>Valore esplicito</strong>: unisce i segmenti fino a raggiungere approssimativamente la dimensione specificata in MB (ad es. 2048). Deve essere maggiore o uguale all’ <code translate="no">dataCoord.segment.maxSize</code> configurato.</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: calcola automaticamente la dimensione ottimale in base alla distribuzione attuale dei segmenti e alle risorse disponibili del nodo.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Se l’ <code translate="no">target_size</code> specificato è inferiore al valore configurato per <code translate="no">dataCoord.segment.maxSize</code>, la richiesta viene respinta con un errore.</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">Verifica dello stato di avanzamento della compattazione<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>La compattazione Force Merge viene eseguita in modo asincrono. Utilizzare l’ID del processo restituito per verificare lo stato di avanzamento:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">Migliori pratiche<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Non utilizzare la compattazione "Force Merge" in ambienti di produzione.</strong></p></li>
<li><p><strong>Nella maggior parte dei casi, utilizzare la modalità di calcolo automatico delle dimensioni.</strong> Impostando ` <code translate="no">target_size</code> ` su ` <code translate="no">max_int64</code> `, Milvus analizza la distribuzione dei segmenti e le risorse dei nodi per determinare la dimensione ottimale. Questo è l'approccio consigliato, a meno che non si abbiano requisiti specifici in termini di dimensioni.</p></li>
<li><p><strong>Valutare il compromesso in termini di prestazioni.</strong> La compattazione con unione forzata è un'operazione che richiede molte risorse. Legge, unisce e riscrive i dati dei segmenti. Pianificarla durante i periodi di traffico ridotto per ridurre al minimo l'impatto sulla latenza delle query.</p></li>
<li><p><strong>Monitorate il numero di segmenti prima e dopo l’operazione.</strong> Utilizzate <code translate="no">get_compaction_state()</code> e <code translate="no">list_persistent_segments</code> per verificare che la compattazione abbia prodotto un numero inferiore di segmenti più grandi, come previsto.</p></li>
</ul>
<p><a id="faq"></a></p>
<h2 id="FAQ" class="common-anchor-header">Domande frequenti<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>In che modo la compattazione "Force Merge" differisce dalla compattazione standard?</strong></p>
<p>Questi due tipi di operazioni di compattazione hanno scopi diversi.</p>
<ul>
<li><p>La compattazione standard (targetSize=0 o omessa) è un percorso di pulizia incrementale "best-effort".</p></li>
<li><p>La fusione forzata (targetSize&gt;0) è un percorso di ricomposizione a livello di raccolta volto a produrre un numero minore di segmenti più grandi, vicini al valore target.</p></li>
</ul>
<p>La differenza fondamentale sta nella forma della fusione: la compattazione standard è effettivamente m → 1 per attività, mentre la fusione forzata è m → n tra gli input raggruppati. Ecco perché la fusione forzata può risolvere layout di segmenti che la compattazione standard non è in grado di gestire. La tabella seguente mette a confronto i due tipi di operazioni.</p>
<table>
   <tr>
     <th><p><strong>Dimensione</strong></p></th>
     <th><p><strong>Compattazione standard (impostazione predefinita)</strong></p></th>
     <th><p><strong>Unione forzata</strong></p></th>
   </tr>
   <tr>
     <td><p>Trigger API</p></td>
     <td><p>targetSize=0 (o non impostato), nessun flag Major/L0</p></td>
     <td><p>targetSize &gt; 0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>Obiettivo principale</p></td>
     <td><p>Pulizia incrementale dei frammenti evidenti; manutenzione ordinaria</p></td>
     <td><p>Consolidamento a livello di intera collezione per la ricerca e il bilanciamento</p></td>
   </tr>
   <tr>
     <td><p>Fonte della dimensione del segmento</p></td>
     <td><p>Fissata su dataCoord.segment.maxSize (configurazione del server)</p></td>
     <td><p>Valore targetSize specificato dall’utente, poi limitato in sicurezza da maxSafeSize</p></td>
   </tr>
   <tr>
     <td><p>Validità del parametro</p></td>
     <td><p>Nessuna regolazione della dimensione da parte dell'utente</p></td>
     <td><p>Il valore targetSize specificato dall'utente deve essere &gt;= dataCoord.segment.maxSize; in caso contrario viene rifiutato</p></td>
   </tr>
   <tr>
     <td><p>Limite superiore di sicurezza</p></td>
     <td><p>Solo limite di configurazione</p></td>
     <td><p>maxSafeSize = min(memoria del nodo di query, memoria del nodo dati) / fattore di memoria (in modalità standalone senza pooling: ulteriormente dimezzato)</p></td>
   </tr>
   <tr>
     <td><p>Forma di unione</p></td>
     <td><p>da m a 1 per attività, output ≤ configMaxSize</p></td>
     <td><p>m → n, output vicini a targetSize</p></td>
   </tr>
   <tr>
     <td><p>Comportamento del segmento medio</p></td>
     <td><p>Può bloccarsi in modo permanente (ad esempio, due segmenti al 60% non possono legalmente diventare un unico segmento al 120%)</p></td>
     <td><p>Il raggruppamento + la suddivisione funzionano; non si verifica il modello “bloccato al 60%”</p></td>
   </tr>
   <tr>
     <td><p>Capacità di appiattimento delle collezioni</p></td>
     <td><p>Limitata; esecuzioni ripetute possono comunque lasciare molti segmenti medi</p></td>
     <td><p>Elevata; progettata per ridurre il numero di segmenti e aumentare il grado di riempimento</p></td>
   </tr>
   <tr>
     <td><p>Consapevolezza della topologia</p></td>
     <td><p>Nessuna</p></td>
     <td><p>Sì; utilizza il layout di QueryNode/replica/shard</p></td>
   </tr>
   <tr>
     <td><p>Ottimizzazione del parallelismo del percorso di lettura</p></td>
     <td><p>Nessuna</p></td>
     <td><p>Regola il numero di output utilizzando queryNodeCount / (repliche × shard) quando valido</p></td>
   </tr>
   <tr>
     <td><p>Caso d'uso tipico</p></td>
     <td><p>Pulizia giornaliera ad alto turnover dopo operazioni di scrittura/cancellazione</p></td>
     <td><p>Preparazione dei benchmark, ottimizzazione delle ricerche, allineamento del parallelismo di carico</p></td>
   </tr>
   <tr>
     <td><p>Previsioni relative all'ambito</p></td>
     <td><p>Non aspettarsi un repack dell’intera collezione</p></td>
     <td><p>Destinato a un risultato di ricompilazione a livello di collezione</p></td>
   </tr>
</table>
<p><strong>Linee guida per la selezione:</strong></p>
<ul>
<li><p>Scegliere la compattazione standard per una pulizia incrementale a basso rischio.</p></li>
<li><p>Scegliere la fusione forzata quando si desidera esplicitamente riorganizzare la collezione in un numero minore di segmenti più grandi, in linea con il comportamento di ricerca e caricamento.</p></li>
</ul>
<p><strong>In che modo la fusione forzata differisce dalla compattazione per clustering?</strong></p>
<p>La compattazione a cluster (<code translate="no">is_clustering=True</code>) riorganizza i dati all’interno dei segmenti in base a una chiave di clustering per migliorare il pruning della ricerca. La fusione forzata (<code translate="no">target_size=N</code>) ottimizza le dimensioni dei segmenti senza modificare la distribuzione dei dati. Servono a scopi diversi e possono essere utilizzate insieme: eseguire prima la compattazione a cluster per organizzare i dati, quindi la fusione forzata per consolidare i segmenti risultanti.</p>
<p><strong>È possibile eseguire Force Merge su una collezione su cui sono in corso delle query?</strong></p>
<p>Sì. Force Merge viene eseguito in modo asincrono e non blocca le query. Tuttavia, consuma risorse di DataNode e I/O su disco, pertanto la latenza delle query potrebbe aumentare durante la compattazione. Per ottenere risultati ottimali, pianificare l’esecuzione di Force Merge durante i periodi di traffico ridotto.</p>
<p><strong>Cosa succede se imposto un `target_size` inferiore a `maxSize`?</strong></p>
<p>La richiesta viene rifiutata con un errore. La dimensione target deve essere maggiore o uguale al valore configurato per ` <code translate="no">dataCoord.segment.maxSize</code>`.</p>
