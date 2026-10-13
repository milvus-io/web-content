---
id: membership-match.md
title: Abbinamento sociCompatible with Milvus v3.0.2+
summary: >-
  Filtra le entità in base a insiemi di membri di grandi dimensioni utilizzando
  filtri Bloom compatti o bitmap Roaring esatti, con sintassi, modelli di
  richiesta SDK, semantica di eliminazione e limiti operativi.
beta: Milvus v3.0.2+
---
<h1 id="Membership-Match" class="common-anchor-header">Abbinamento soci<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v3.0.2+</span><button data-href="#Membership-Match" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Il filtro di appartenenza filtra le entità verificando se il valore di un campo scalare appartiene a un insieme fornito dal chiamante. Il client crea un blob binario compatto del filtro di appartenenza e lo passa come valore del modello di espressione.</p>
<p>Sostituisce gli elenchi di membri di grandi dimensioni ( <code translate="no">IN [...]</code> ). Un filtro " <code translate="no">IN</code> " serializza ogni membro nella richiesta, pertanto insiemi di membri sufficientemente grandi possono superare il limite di ricezione gRPC del proxy. Con " <code translate="no">membership_match</code>", il proxy convalida il blob e lo incorpora nel piano di query senza ricostruire un elenco di membri.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/membership-match-workflow.jpg" alt="Membership Match workflow: the client builds a reusable blob, the proxy validates it, and QueryNodes evaluate it." class="doc-image" id="membership-match-workflow:-the-client-builds-a-reusable-blob,-the-proxy-validates-it,-and-querynodes-evaluate-it." /> 
   <span>Flusso di lavoro di Membership Match: il client crea un blob riutilizzabile, il proxy lo convalida e i QueryNodes lo valutano.</span>
  
 </span></p>
<p>Il diagramma mostra la divisione fissa dei compiti. Il client crea il blob una sola volta e lo riutilizza in tutte le richieste; il proxy verifica i limiti relativi all’involucro e alle dimensioni e incorpora il blob nel piano di query così com’è; infine, i QueryNodes valutano il piano rispetto ai dati grezzi o a un indice.</p>
<p>L’operatore dispone di due codifiche con diverse garanzie di correttezza:</p>
<ul>
<li><strong>Bloom</strong> (<code translate="no">type=bloom</code>): appartenenza approssimativa. Sono possibili falsi positivi; non sono previsti falsi negativi da un filtro valido. Uso tipico: filtri di pubblico o di esclusione ad alto volume in cui sono accettabili occasionali falsi positivi.</li>
<li><strong>Roaring</strong> (<code translate="no">type=roaring</code>): appartenenza esatta per valori interi. Uso tipico: ACL, visibilità dei tenant, filtri di conformità e operazioni di eliminazione in base a un insieme di ID.</li>
</ul>
<p>Non utilizzare l’appartenenza <strong>Bloom</strong> per decisioni di autorizzazione o eliminazioni distruttive. Un falso positivo può esporre un’entità o eliminare un’entità che non fa parte dell’insieme previsto.</p>
<h3 id="Operational-checklist" class="common-anchor-header">Lista di controllo operativa<button data-href="#Operational-checklist" class="anchor-icon" translate="no">
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
<li>Verificare il tipo di campo di destinazione e costruire il blob a partire dallo stesso dominio di valori.</li>
<li>Selezionare Bloom solo quando i falsi positivi sono accettabili.</li>
<li>Selezionare "Roaring" per le operazioni relative a ACL, conformità, isolamento dei tenant ed eliminazione.</li>
<li>Creare blob di grandi dimensioni una sola volta e riutilizzarli; non ricrearli all’interno di ogni richiesta.</li>
<li>Calcolare le dimensioni del blob in byte serializzati, non in numero di elementi.</li>
<li>Su un cluster con versioni miste, completare l'aggiornamento graduale, iniziando dai proxy, prima di abilitare l'<code translate="no">membership_match</code>.</li>
<li>Testare l'espressione su una raccolta non di produzione prima di abilitare un flusso di lavoro distruttivo.</li>
</ul>
<h2 id="Expression-syntax" class="common-anchor-header">Sintassi dell’espressione<button data-href="#Expression-syntax" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
membership_match(&lt;field&gt;, {&lt;template&gt;}, type=roaring)
membership_match(&lt;field&gt;, {&lt;template&gt;})
not membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
<button class="copy-code-btn"></button></code></pre>
<p>Il secondo argomento è un segnaposto del modello. L'SDK fornisce il valore del segnaposto come oggetto ` <code translate="no">bytes</code> ` in formato protobuf contenente il blob del filtro generato dal client. Mantenere esplicito il ` <code translate="no">type</code> ` nelle espressioni di produzione in modo che il contratto di correttezza previsto sia visibile nel codice e nei log.</p>
<p>L’argomento <code translate="no">type</code> è facoltativo. Ogni blob contiene un’intestazione magica autodescrittiva, <code translate="no">MBF1</code> per Bloom e <code translate="no">MRB1</code> per Roaring, e il server rileva l’intestazione quando <code translate="no">type</code> viene omesso. Un <code translate="no">type</code> esplicito che entra in conflitto con l’intestazione del blob viene rifiutato come errore di richiesta, mentre le intestazioni sconosciute o troncate determinano uno stato di fallimento chiuso.</p>
<h2 id="Choose-the-encoding" class="common-anchor-header">Scegliere la codifica<button data-href="#Choose-the-encoding" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare Bloom quando è accettabile un falso positivo. Bloom accetta campi interi con segno (<strong>INT8/16/32/64</strong>), campi <strong>VARCHAR</strong> e percorsi <strong>JSON</strong>. Un filtro Bloom non è una lista di autorizzazioni esatta.</p>
<p><code translate="no">fpr</code> (tasso di falsi positivi, fpr) è la probabilità che un filtro Bloom segnali un valore come membro quando tale valore non è mai stato inserito: <code translate="no">fpr=0.005</code> significa che, approssimativamente, un valore non membro su 200 viene erroneamente segnalato come presente. Un fpr più basso produce un blob più grande.</p>
<p>Utilizzare <strong>Roaring</strong> quando ogni corrispondenza deve essere esatta. <strong>Roaring</strong> accetta solo campi interi con segno; gli elementi vengono estesi con segno a <strong>INT64</strong> prima della serializzazione, quindi un INT8 pari a -1 e un INT64 pari a -1 sono lo stesso elemento. Non utilizzarlo per UUID o altri campi stringa.</p>
<table>
<thead>
<tr><th>Dimensione</th><th>Bloom (type=bloom)</th><th>Roaring (type=roaring)</th></tr>
</thead>
<tbody>
<tr><td>Precisione</td><td>Approssimativa; possibili falsi positivi; nessun falso negativo</td><td>Esatto; nessun falso positivo e nessun falso negativo</td></tr>
<tr><td>Campi</td><td>INT8/16/32/64, VARCHAR, percorsi JSON</td><td>Solo INT8/16/32/64 con segno</td></tr>
<tr><td>Dimensione del blob</td><td>Numero di membri e FPR; circa 11 bit per membro a FPR 0,005; corpo a potenza di due</td><td>Distribuzione dei valori; gli insiemi densi si comprimono in dimensioni molto più ridotte; i valori casuali a 64 bit raggiungono il limite massimo del contenitore pari a 262.144</td></tr>
<tr><td>Eliminazione</td><td>Rifiutata in fase di analisi</td><td>Consentito</td></tr>
<tr><td>Uso tipico</td><td>Filtri di pubblico ed esclusione</td><td>ACL, conformità, isolamento dei tenant, eliminazione in base a un insieme di ID</td></tr>
</tbody>
</table>
<p>I percorsi<strong>JSON</strong> sono tipizzati in modo rigoroso, riga per riga: una stringa <strong>JSON</strong> viene interpretata come un valore <strong>VARCHAR</strong>, un intero <strong>JSON</strong> come un valore <strong>INT64</strong> e un doppio <strong>JSON</strong> non corrisponde mai a un membro intero, a differenza dell'<code translate="no">IN</code>, dove 5.0 è uguale a 5. Se i tuoi scrittori codificano i numeri interi come float, normalizzali in fase di scrittura oppure utilizza un campo scalare tipizzato.</p>
<p>Per entrambe le codifiche, costruisci l’insieme dei membri a partire dallo stesso dominio di valori del campo di destinazione. Non creare un filtro Bloom a partire dalla stringa <code translate="no">&quot;10086&quot;</code> e non applicarlo a un campo <code translate="no">INT64</code>. L'intestazione del blob registra i domini dei valori inseriti e un blob con dominio errato viene rifiutato dal proxy con un errore di parametro, anziché non trovare alcuna corrispondenza in modo silenzioso. Riutilizza un blob già creato tra una richiesta e l'altra, anziché ricostruirlo per ogni query.</p>
<p>Per insiemi di poche migliaia di elementi o meno, il semplice <code translate="no">IN</code> rimane l’opzione più semplice. Il server non sceglie tra <strong>IN</strong>, <strong>Bloom</strong> e <strong>Roaring</strong>. La selezione della codifica è responsabilità del chiamante.</p>
<p>Per scegliere una codifica:</p>
<ol>
<li>Valutare se il carico di lavoro tollera i falsi positivi. In caso contrario, <strong>Bloom</strong> non è mai un'opzione.</li>
<li>Per un'appartenenza esatta, utilizzare <strong>Roaring</strong> con un campo intero con segno. I valori densi o raggruppati si comprimono nei blob più piccoli.</li>
<li>Verificare i limiti di dimensione. I valori casuali uniformi a 64 bit potrebbero superare il limite massimo di 262.144 per i container di grandi dimensioni o i limiti di dimensione. In tal caso, utilizzare una lista <strong>IN</strong> tradizionale che rientri nei limiti della richiesta.</li>
<li>Per l’appartenenza esatta su campi non interi, utilizzare <strong>IN</strong>. Non esiste una codifica di appartenenza esatta per questi campi.</li>
</ol>
<p>La corrispondenza di appartenenza non è disponibile tramite l’API HTTP RESTful. I parametri dei modelli di espressione HTTP accettano solo valori booleani, numerici, stringhe e array; non esiste un tipo binario <code translate="no">bytes</code> per il blob. Utilizza un SDK basato su gRPC per passare i blob di appartenenza.</p>
<h2 id="SDK-request-patterns" class="common-anchor-header">Modelli di richiesta SDK<button data-href="#SDK-request-patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>I seguenti frammenti di codice si concentrano sulla creazione di blob di appartenenza e sul loro passaggio come parametri dei modelli di filtro. Si presume che le collezioni e i campi esistano già e siano caricati, che i client SDK siano connessi e che i vettori di query, gli elenchi dei membri e altre variabili a cui si fa riferimento siano definiti. La configurazione delle collezioni e la struttura completa dell’applicazione sono omesse.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, build_bloom_filter, build_roaring_bitmap

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
bloom_blob = build_bloom_filter([<span class="hljs-string">&quot;creator-a&quot;</span>, <span class="hljs-string">&quot;creator-b&quot;</span>], fpr=<span class="hljs-number">0.005</span>)
client.search(collection_name=<span class="hljs-string">&quot;posts&quot;</span>, data=[query_vector], anns_field=<span class="hljs-string">&quot;embedding&quot;</span>, limit=<span class="hljs-number">10</span>,
              <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: bloom_blob})

roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.query(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>,
             filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob}, output_fields=[<span class="hljs-string">&quot;user_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bloomBlob, err := milvusclient.NewBloomFilterBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>}, fpr)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
search := milvusclient.NewSearchOption(<span class="hljs-string">&quot;posts&quot;</span>, topK, vectors).
    WithFilter(<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)

roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
query := milvusclient.NewQueryOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] bloomBlob = BloomFilterUtils.buildBloomFilter(userIds, BloomFilterUtils.DEFAULT_FPR);
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> QueryReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=bloom)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)).build();
<span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> bloomBlob = <span class="hljs-title function_">buildBloomFilter</span>(userIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(user_id, {members}, type=bloom)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: bloomBlob } });
<span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-with-Roaring" class="common-anchor-header">Eliminazione con Roaring<button data-href="#Delete-with-Roaring" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare un blob <strong>Roaring</strong> esatto quando si eliminano entità selezionate da un insieme esterno di ID interi. Verificare l’insieme dei membri e il tipo di campo della collezione prima di eseguire l’eliminazione. Non utilizzare Bloom: l’appartenenza approssimativa non è un predicato di eliminazione sicuro e le forme Bloom vengono rifiutate nelle espressioni di eliminazione in fase di analisi sintattica.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python">roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.delete(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
_, err = client.Delete(ctx, milvusclient.NewDeleteOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithExpr(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> DeleteReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)).build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(id, {members}, type=roaring)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: roaringBlob } });
<button class="copy-code-btn"></button></code></pre>
<p>La semantica di eliminazione segue una corrispondenza esatta a tre valori:</p>
<table>
<thead>
<tr><th>Valore del campo</th><th>membership_match(…)</th><th>non membership_match(…)</th></tr>
</thead>
<tbody>
<tr><td>NULL</td><td>nessuna corrispondenza (NULL)</td><td>nessuna corrispondenza (NULL)</td></tr>
<tr><td>nell'insieme dei membri</td><td>corrispondenza</td><td>nessuna corrispondenza</td></tr>
<tr><td>fuori dall'insieme</td><td>nessuna corrispondenza</td><td>corrispondenza</td></tr>
</tbody>
</table>
<p>La tabella va letta riga per riga: un comando Delete con <code translate="no">membership_match</code> rimuove le entità all'interno dell'insieme, un comando Delete con <code translate="no">not membership_match</code> rimuove le entità al di fuori dell'insieme, mentre le entità NULL sopravvivono in entrambe le polarità.</p>
<ul>
<li>Le entità con un valore di campo NULL non vengono mai eliminate, in nessuna delle due polarità.</li>
<li>Una bitmap vuota non elimina nulla. " <code translate="no">not membership_match(&lt;field&gt;, {&lt;empty&gt;}, type=roaring)</code> " elimina ogni entità con un valore di campo non NULL, ovvero il complemento esatto, che può essere un insieme di grandi dimensioni per definizione.</li>
<li><code translate="no">not membership_match</code> è il complemento esatto dell’insieme dei membri rispetto alle entità non NULL, non un’approssimazione.</li>
</ul>
<p>Sui segmenti sigillati caricati solo con indice, senza dati scalari grezzi, la valutazione utilizza una ricerca inversa limitata quando l’indice lo supporta. Quando non sono disponibili né dati di campo grezzi né un indice qualificante, la richiesta fallisce con <code translate="no">FieldNotLoaded</code> invece di restituire entità non filtrate.</p>
<h2 id="Operational-limits" class="common-anchor-header">Limiti operativi<button data-href="#Operational-limits" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Impostazione</th><th>Predefinito</th><th>Configurabile</th><th>Cosa limita</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">proxy.maxMembershipFilterSize</code></td><td>64 MiB</td><td><code translate="no">milvus.yaml</code> proxy</td><td>un corpo blob</td></tr>
<tr><td><code translate="no">proxy.maxMembershipFilterPlanSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> proxy</td><td>aggregato per richiesta</td></tr>
<tr><td><code translate="no">proxy.grpc.serverMaxRecvSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> proxy</td><td>intera richiesta</td></tr>
<tr><td>Limite massimo per container Roaring</td><td>262.144</td><td>fissato nel codice</td><td>per filtro</td></tr>
<tr><td>Stima della memoria decodificata di Roaring</td><td>64 MiB</td><td>fissa nel codice</td><td>per filtro</td></tr>
<tr><td>Limite del formato MBF1</td><td>128 MiB</td><td>fissato nel codice</td><td>limite massimo del formato blob</td></tr>
<tr><td>Bloom <code translate="no">fpr</code></td><td>0,005</td><td>generatore client</td><td>target dei falsi positivi</td></tr>
</tbody>
</table>
<p>Le impostazioni " <code translate="no">proxy.*</code> " sono configurazioni del server Milvus: vengono impostate dall'operatore del cluster in <code translate="no">milvus.yaml</code> nella sezione " <code translate="no">proxy</code> " e non possono essere modificate per singola richiesta o per espressione al momento del filtraggio. Le ammissioni <strong>Roaring</strong> e il limite del formato MBF1 sono fissati nell’implementazione e non possono essere configurati in nessun modo. La riga " <code translate="no">fpr</code> " è l’unico controllo lato client: viene scelta al momento della creazione del blob, con un intervallo accettato compreso tra 0,0001 e 0,05.</p>
<p>Il corpo del blob ammette al massimo circa 48,6 milioni di membri INT64 all’fpr predefinito, con l’intestazione dell’involucro fissa da 32 byte consentita in aggiunta. Il budget a livello di richiesta copre la dimensione serializzata aggregata dei piani contenenti membri più la dimensione decodificata stimata aggregata dei filtri Roaring, e le sotto-richieste HybridSearch e i filtri di valutazione lo condividono. I corpi dei blob Bloom sono potenze di due: un numero di membri appena superiore al limite di un livello raddoppia il blob, e un fpr leggermente più alto spesso rientra nel livello immediatamente inferiore. Quando il proxy rifiuta un blob Bloom di dimensioni eccessive, l’errore suggerisce un’ <code translate="no">fpr</code> e che rientri nei limiti.</p>
<ul>
<li>I risultati delle espressioni di appartenenza non vengono memorizzati nella cache tra una richiesta e l’altra.</li>
<li>I cluster con versioni miste falliscono in modalità chiusa: i QueryNode che eseguono codice più vecchio rifiutano i piani che contengono nodi del piano di appartenenza. Aggiornare prima i proxy, quindi completare l’aggiornamento graduale prima di abilitare l’operatore.</li>
<li>I log del server oscurano i byte dei blob. Il testo dell’espressione contiene solo il nome del modello; il payload binario viene trasmesso fuori banda nei valori del modello.</li>
</ul>
