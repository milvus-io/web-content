---
id: force-merge.md
title: Compattazione Force MergeCompatible with Milvus 3.0.x
summary: >-
  Usare la compattazione force merge per consolidare piccoli segmenti e
  migliorare le prestazioni delle query e l'efficienza dello storage.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">Compattazione Force Merge<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Force Merge è progettato per consolidare segmenti piccoli e frammentati in segmenti più piccoli e più grandi per migliorare le prestazioni delle query e l'efficienza dello storage. Questa guida spiega come usare la compattazione force merge.</p>
<div class="alert note">
<p>Questa funzione è in anteprima pubblica. Non utilizzarla in ambienti di produzione.</p>
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
    </button></h2><p>La <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">compattazione</a> standard mantiene le dimensioni dei segmenti vicino all'indirizzo <code translate="no">maxSize</code> grazie alle unioni molti-a-uno, ma può comunque lasciare frammenti di medie dimensioni che non possono essere uniti ulteriormente senza superare i limiti. Ad esempio, come illustrato di seguito, se una raccolta ha cinque segmenti da 2 MB e <code translate="no">maxSize</code> è di 3 MB, l'unione di due segmenti qualsiasi supererebbe il limite, quindi la compattazione standard non può ridurre ulteriormente il numero di segmenti e il layout frammentato rimane.</p>
<p>Force merge aggiunge il parametro <code translate="no">target_size</code> e supporta la riorganizzazione dei segmenti verso la dimensione desiderata entro una stretta tolleranza, quando possibile. Come illustrato di seguito, se <code translate="no">target_size</code> specificato è di 4 MB, i cinque segmenti piccoli da 2 MB possono essere ulteriormente uniti in un numero inferiore di segmenti più grandi. In questo modo si riduce il numero di segmenti in eccesso, si supportano obiettivi più grandi delle impostazioni predefinite di <code translate="no">maxSize</code> e, quando l'obiettivo è molto grande, si consente al sistema di scegliere una dimensione di output e un numero di segmenti pratici per l'hardware e la topologia del QueryNode corrente.</p>
<p>Per capire quale metodo di compattazione utilizzare, vedere le <a href="#faq">FAQ</a>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" />
   </span> <span class="img-wrapper"> <span>R8eow3kaqhktokblcmocnvxmnee</span> </span></p>
<p>La compattazione force merge estende l'API esistente <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> con un parametro <code translate="no">target_size</code>. È completamente retrocompatibile: le chiamate di compattazione esistenti senza <code translate="no">target_size</code> continuano a funzionare come prima.</p>
<p>Force merge opera in modo asincrono. Non blocca le operazioni di ricerca o di interrogazione, anche se consuma risorse di I/O e di memoria durante l'esecuzione.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">Utilizzare la compattazione Force Merge<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
<li><p>Milvus versione 3.0 o successiva</p></li>
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
    </button></h3><p>I seguenti parametri di configurazione controllano il comportamento di Force Merge. Vanno impostati nel file di configurazione di Milvus o tramite variabili d'ambiente.</p>
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
     <td><p>512</p></td>
     <td><p>Dimensione massima predefinita del segmento in MB. Utilizzato come target quando <code translate="no">target_size</code> è 0 o omesso. Serve anche come valore minimo consentito per <code translate="no">target_size</code> esplicito.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>Soglia di conteggio dei segmenti per la selezione dell'algoritmo. Quando il numero di segmenti supera questo valore, Milvus utilizza un algoritmo greedy più veloce per la pianificazione dell'unione.</p><ul><li><p><strong>Algoritmo standard</strong> (usato quando il numero di segmenti è &lt;= <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): produce risultati di fusione più ottimali, ma richiede più tempo per il calcolo.</p></li><li><p><strong>Algoritmo greedy</strong> (usato quando il numero di segmenti &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): completa la pianificazione molto più velocemente, a costo di un raggruppamento dei segmenti leggermente meno ottimale.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>La memoria del DataNode viene divisa per questo fattore per calcolare la dimensione massima del segmento che il sistema può consentire.</p><ul><li><p>Un valore maggiore alloca meno memoria per la fusione, ma ne lascia di più per le altre operazioni del DataNode, migliorando la stabilità del nodo.</p></li><li><p>Un valore più basso consente fusioni più grandi, ma aumenta la pressione sulla memoria.</p></li><li><p>Ad esempio, con il fattore predefinito di 4,0 e un DataNode con 16 GB di memoria, il budget di fusione è di 4 GB. Ciò significa che la dimensione totale dei segmenti uniti in una singola operazione non può superare i 4 GB.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>La memoria minima del QueryNode viene divisa per questo fattore. Utilizzato durante il calcolo automatico delle dimensioni (<code translate="no">target_size=max_int64</code>) per garantire che i segmenti uniti possano essere caricati dai QueryNode.</p><ul><li><p>Un valore maggiore produce segmenti più piccoli che sono più facili da caricare per i QueryNode.</p></li><li><p>Un valore più piccolo consente di ottenere segmenti più grandi, ma può causare errori di caricamento sui QueryNode con problemi di memoria.</p></li><li><p>Ad esempio, con il fattore predefinito di 4,0 e il QueryNode più piccolo con 16 GB di memoria, la dimensione target calcolata automaticamente non supererà i 4 GB. Questo impedisce a Force Merge di produrre segmenti così grandi che i QueryNode non possono caricarli.</p></li></ul></td>
   </tr>
</table>
<p>Per applicare le modifiche di cui sopra al vostro cluster Milvus, seguite i passaggi in <a href="/docs/it/configure-helm.md#Configure-Milvus-via-configuration-file">Configurazione di Milvus con Helm</a> e <a href="/docs/it/configure_operator.md">Configurazione di Milvus con Milvus Operators</a>.</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">Attivare la compattazione Force Merge<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>Si attiva la compattazione Force Merge chiamando <code translate="no">compact()</code> con il parametro <code translate="no">target_size</code>. Per i dettagli sui parametri, vedere il <a href="#parameter-reference">riferimento ai parametri</a> di seguito.</p>
<p>Sono disponibili tre modalità di compattazione Force Merge:</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 512 MB)
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
<p>Di seguito sono riportati degli esempi che mostrano come utilizzare ciascuna modalità di compattazione force merge.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">Predefinita (compattazione standard)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 512 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">Dimensione target esplicita</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">Calcolo automatico delle dimensioni</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<p><a id="parameter-reference"></a></p>
<h4 id="Parameter-reference" class="common-anchor-header">Riferimento ai parametri</h4><p>La tabella seguente spiega i parametri.</p>
<table>
   <tr>
     <th><p><strong>Parametro</strong></p></th>
     <th><p><strong>Tipo</strong></p></th>
     <th><p><strong>Descrizione</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>Richiesto. Il nome dell'insieme da compattare.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>Opzionale. La dimensione del segmento di destinazione in MB. Esistono 3 opzioni per il valore del parametro:</p><ul><li><p><strong>0 o omesso</strong>: Utilizza l'indirizzo <code translate="no">dataCoord.segment.maxSize</code> configurato (valore predefinito: 512 MB). Equivale alla compattazione standard.</p></li><li><p><strong>Valore esplicito</strong>: Unisce i segmenti a circa la dimensione specificata in MB (ad esempio 2048). Deve essere maggiore o uguale alla dimensione configurata <code translate="no">dataCoord.segment.maxSize</code>.</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: Calcola automaticamente la dimensione ottimale in base alla distribuzione attuale dei segmenti e alle risorse del nodo disponibili.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Se <code translate="no">target_size</code> specificato è inferiore a <code translate="no">dataCoord.segment.maxSize</code> configurato, la richiesta viene rifiutata con un errore.</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">Controllo dell'avanzamento della compattazione<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>La compattazione Force Merge viene eseguita in modo asincrono. Utilizzare l'ID del lavoro restituito per verificare l'avanzamento:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">Pratiche ottimali<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Non utilizzare la compattazione force merge in ambienti di produzione.</strong></p></li>
<li><p><strong>Usare la modalità di calcolo automatico delle dimensioni per la maggior parte dei casi.</strong> Impostando <code translate="no">target_size</code> su <code translate="no">max_int64</code>, Milvus analizza la distribuzione dei segmenti e le risorse dei nodi per determinare la dimensione migliore. Questo è l'approccio consigliato, a meno che non si abbiano requisiti specifici di dimensionamento.</p></li>
<li><p><strong>Considerare il compromesso delle prestazioni.</strong> La compattazione Force Merge è un'operazione che richiede molte risorse. Legge, unisce e riscrive i dati del segmento. Programmarla in periodi di basso traffico per ridurre al minimo l'impatto sulla latenza delle query.</p></li>
<li><p><strong>Monitorare il conteggio dei segmenti prima e dopo.</strong> Utilizzare <code translate="no">get_compaction_state()</code> e <code translate="no">list_persistent_segments</code> per verificare che la compattazione abbia prodotto un numero inferiore di segmenti più grandi, come previsto.</p></li>
</ul>
<p><a id="faq"></a></p>
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
    </button></h2><p><strong>In che modo Force Merge è diverso dalla compattazione standard?</strong></p>
<p>Questi due tipi di operazioni di compattazione hanno scopi diversi.</p>
<ul>
<li><p>La compattazione standard (targetSize=0 o omesso) è un percorso di pulizia incrementale e di massimo sforzo.</p></li>
<li><p>La fusione forzata (targetSize&gt;0) è un percorso di riconfezionamento a livello di raccolta per produrre un numero inferiore di segmenti più grandi e vicini all'obiettivo.</p></li>
</ul>
<p>La differenza fondamentale è la forma del merge: la compattazione standard è effettivamente m → 1 per task, mentre il force merge è m → n tra gli input raggruppati. Questo è il motivo per cui il force merge può risolvere layout di segmenti che la compattazione standard non può risolvere. La tabella seguente mette a confronto i due tipi di operazioni.</p>
<table>
   <tr>
     <th><p><strong>Dimensione</strong></p></th>
     <th><p><strong>Compattazione standard (predefinita)</strong></p></th>
     <th><p><strong>Unione forzata</strong></p></th>
   </tr>
   <tr>
     <td><p>Attivazione API</p></td>
     <td><p>targetSize=0 (o non impostato), nessun flag Maggiore/L0</p></td>
     <td><p>targetSize&gt;0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>Obiettivo primario</p></td>
     <td><p>Pulizia incrementale di frammenti evidenti; manutenzione ordinaria</p></td>
     <td><p>Consolidamento dell'intera collezione per la ricerca e il bilanciamento</p></td>
   </tr>
   <tr>
     <td><p>Fonte della dimensione del segmento</p></td>
     <td><p>DataCoord.segment.maxSize fisso (configurazione del server)</p></td>
     <td><p>TargetSize dell'utente, poi regolato in sicurezza da maxSafeSize</p></td>
   </tr>
   <tr>
     <td><p>Validità dei parametri</p></td>
     <td><p>Nessuna regolazione della dimensione utente</p></td>
     <td><p>TargetSize dell'utente deve essere &gt;= dataCoord.segment.maxSize; altrimenti viene rifiutato.</p></td>
   </tr>
   <tr>
     <td><p>Limite superiore di sicurezza</p></td>
     <td><p>Solo per il limite di configurazione</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor (standalone non-pooling: ulteriormente dimezzato)</p></td>
   </tr>
   <tr>
     <td><p>Forma dell'unione</p></td>
     <td><p>m → 1 per task, output &lt;= configMaxSize</p></td>
     <td><p>m → n, uscite vicine a targetSize</p></td>
   </tr>
   <tr>
     <td><p>Comportamento dei segmenti medi</p></td>
     <td><p>Può bloccarsi in modo permanente (ad esempio, due segmenti al 60% non possono legalmente diventare un segmento al 120%).</p></td>
     <td><p>Repack + split funziona; nessun modello "bloccato al 60%".</p></td>
   </tr>
   <tr>
     <td><p>Capacità di appiattimento della raccolta</p></td>
     <td><p>Limitata; le esecuzioni ripetute possono ancora lasciare molti segmenti medi</p></td>
     <td><p>Forte; progettato per ridurre il numero di segmenti e spingere la pienezza più in alto</p></td>
   </tr>
   <tr>
     <td><p>Consapevolezza della topologia</p></td>
     <td><p>Nessuna</p></td>
     <td><p>Sì; utilizza il layout QueryNode/replica/shard</p></td>
   </tr>
   <tr>
     <td><p>Regolazione del parallelismo del percorso di lettura</p></td>
     <td><p>Nessuno</p></td>
     <td><p>Regola il conteggio dell'output usando queryNodeCount / (repliche × shard) se valido</p></td>
   </tr>
   <tr>
     <td><p>Caso d'uso tipico</p></td>
     <td><p>Pulizia giornaliera ad alto rendimento dopo scritture/cancellazioni</p></td>
     <td><p>Preparazione di benchmark, ottimizzazione della ricerca, allineamento del parallelismo del carico</p></td>
   </tr>
   <tr>
     <td><p>Aspettative di ambito</p></td>
     <td><p>Non ci si aspetta un repack dell'intera collezione</p></td>
     <td><p>Destinato all'esito del repack a livello di raccolta</p></td>
   </tr>
</table>
<p><strong>Guida alla selezione:</strong></p>
<ul>
<li><p>Scegliere la compattazione standard per una pulizia incrementale a basso rischio.</p></li>
<li><p>Scegliere la fusione forzata quando si desidera esplicitamente rimodellare la raccolta in segmenti meno numerosi e più grandi, in linea con il comportamento di ricerca e caricamento.</p></li>
</ul>
<p><strong>In che modo la fusione forzata è diversa dalla compattazione a grappolo?</strong></p>
<p>La<a href="/docs/it/clustering-compaction.md">compattazione del clustering</a> (<code translate="no">is_clustering=True</code>) riorganizza i dati all'interno dei segmenti in base a una chiave di clustering per migliorare la selezione della ricerca. Force Merge (<code translate="no">target_size=N</code>) ottimizza le dimensioni dei segmenti senza modificare la distribuzione dei dati. I due sistemi hanno scopi diversi e possono essere usati insieme: eseguite prima la compattazione del clustering per organizzare i dati, quindi Force Merge per consolidare i segmenti risultanti.</p>
<p><strong>È possibile eseguire Force Merge su una raccolta che viene interrogata?</strong></p>
<p>Sì. Force Merge viene eseguito in modo asincrono e non blocca le query. Tuttavia, consuma risorse DataNode e I/O del disco, quindi la latenza delle query può aumentare durante la compattazione. Per ottenere i migliori risultati, pianificare Force Merge in periodi di basso traffico.</p>
<p><strong>Cosa succede se si imposta un target_size inferiore a maxSize?</strong></p>
<p>La richiesta viene rifiutata con un errore. La dimensione di destinazione deve essere maggiore o uguale alla dimensione configurata <code translate="no">dataCoord.segment.maxSize</code>.</p>
