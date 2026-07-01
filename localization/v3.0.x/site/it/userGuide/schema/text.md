---
id: text.md
title: Campo di testoCompatible with Milvus 3.0.x
summary: >-
  TEXT è un tipo di campo scalare utilizzato per memorizzare il testo dei
  documenti, brani e altri contenuti testuali di lunga durata in Milvus.
beta: Milvus 3.0.x
---
<h1 id="Text-Field" class="common-anchor-header">Campo di testo<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Text-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Nelle applicazioni di ricerca basate sull'intelligenza artificiale, la ricerca vettoriale consente di individuare entità semanticamente simili, ma spesso l'applicazione necessita anche del testo originale alla base di ciascuna corrispondenza. Un modello di linguaggio di grandi dimensioni (LLM) o un agente può utilizzare tale testo come contesto per leggere, citare, riassumere o includere il risultato in un prompt.</p>
<p>Milvus fornisce il tipo di campo scalare ` <code translate="no">TEXT</code> ` per memorizzare testi di origine di grandi dimensioni direttamente insieme alle entità. I valori tipici includono brani, documenti lunghi, corpi di articoli, ticket e log. A differenza di ` <code translate="no">VARCHAR</code>`, che richiede una lunghezza massima in byte ( <code translate="no">max_length</code>) fissa, ` <code translate="no">TEXT</code> ` non richiede di impostare una lunghezza massima in byte nello schema della collezione.</p>
<p>Per definire un campo di tipo « <code translate="no">TEXT</code> », impostare ` <code translate="no">datatype</code> ` su ` <code translate="no">DataType.TEXT</code>`.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
<span class="highlighted-wrapper-line">    datatype=DataType.TEXT,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Una volta definito il campo, ogni entità può includere un valore di tipo stringa in quel campo. I valori di tipo " <code translate="no">TEXT</code> " si inseriscono come gli altri campi scalari e vengono restituiti dai risultati delle query o delle ricerche elencando il campo in <code translate="no">output_fields</code>.</p>
<div class="alert note">
<p><code translate="no">TEXT</code> I campi supportano i valori nulli. Per abilitare questa funzionalità, impostare <code translate="no">nullable</code> su <code translate="no">True</code>. Per ulteriori dettagli, consultare <a href="/docs/it/nullable-and-default.md">Campo nullabile</a>.</p>
</div>
<h2 id="Limits" class="common-anchor-header">Limiti<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>Un campo <code translate="no">TEXT</code> non può essere un campo primario. I campi primari supportano <code translate="no">INT64</code> e <code translate="no">VARCHAR</code>.</li>
<li>In Milvus 3.0.0, i campi " <code translate="no">TEXT</code> " non supportano " <code translate="no">PHRASE_MATCH</code>".</li>
<li>In Milvus 3.0.0, i campi " <code translate="no">TEXT</code> " non supportano i valori predefiniti.</li>
<li>In Milvus 3.0.0, i campi <code translate="no">TEXT</code> non sono supportati nelle collezioni esterne.</li>
<li>In Milvus 3.0.0, i campi <code translate="no">TEXT</code> non supportano gli indici scalari.</li>
<li><code translate="no">TEXT</code> non è destinato al filtraggio regolare dei metadati. Se è necessario filtrare in base a metadati costituiti da stringhe brevi e il valore del campo rientra nel limite di lunghezza di <code translate="no">VARCHAR</code>, utilizzare <code translate="no">VARCHAR</code>.</li>
</ul>
<h2 id="Choose-TEXT-or-VARCHAR" class="common-anchor-header">Scegliere TEXT o VARCHAR<button data-href="#Choose-TEXT-or-VARCHAR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TEXT</code> e <code translate="no">VARCHAR</code> memorizzano entrambi valori di stringa, ma soddisfano esigenze applicative diverse. Utilizza <code translate="no">VARCHAR</code> per metadati brevi e circoscritti che identificano, categorizzano o filtrano le entità. Utilizza <code translate="no">TEXT</code> per contenuti di origine più lunghi che forniscono a un LLM o a un agente un contesto sufficiente per leggere, citare, riassumere o creare un prompt.</p>
<table>
<thead>
<tr><th>Aspetto</th><th><code translate="no">VARCHAR</code></th><th><code translate="no">TEXT</code></th></tr>
</thead>
<tbody>
<tr><td>Ideale per</td><td>Metadati brevi utilizzati per identificare, classificare o filtrare entità, come <code translate="no">title</code>, <code translate="no">tag</code>, <code translate="no">category</code> o <code translate="no">external_id</code>.</td><td>Contenuti di origine più lunghi utilizzati dai flussi di lavoro LLM o dagli agenti, come <code translate="no">content</code>, <code translate="no">passage</code>, <code translate="no">article_body</code> o <code translate="no">log_message</code>.</td></tr>
<tr><td>Impostazione della lunghezza</td><td>Richiede <code translate="no">max_length</code>, che definisce il numero massimo di byte che il campo può memorizzare. Il valore massimo è <code translate="no">65,535</code> byte. Se un valore potrebbe superare questo limite, utilizzare <code translate="no">TEXT</code>.</td><td>Non richiede <code translate="no">max_length</code>, pertanto lo schema non necessita di un limite fisso in byte per il valore del testo.</td></tr>
<tr><td>Comportamento di archiviazione</td><td>Memorizza ogni valore entro il limite di byte configurato per il campo ( <code translate="no">max_length</code>).</td><td>Utilizza la selezione automatica dello spazio di archiviazione per i valori di testo più grandi. Per i dettagli, consultare <a href="#how-milvus-stores-large-text-values">Come Milvus archivia i valori TEXT di grandi dimensioni</a>.</td></tr>
<tr><td>Supporto come campo primario</td><td>Può essere utilizzato come campo primario.</td><td>Non può essere utilizzato come campo primario.</td></tr>
<tr><td>Filtraggio</td><td>Da utilizzare per metadati costituiti da stringhe brevi che devono comparire nelle espressioni di filtro, come <code translate="no">category == &quot;news&quot;</code> o <code translate="no">tag in [&quot;ai&quot;, &quot;database&quot;]</code>.</td><td>Non è destinato al filtraggio regolare dei metadati.</td></tr>
</tbody>
</table>
<p>Per ulteriori dettagli sui campi di tipo " <code translate="no">VARCHAR</code> ", consultare la sezione " <a href="/docs/it/string.md">Campo VarChar</a>".</p>
<h2 id="How-Milvus-stores-large-TEXT-values" class="common-anchor-header">Come Milvus memorizza i valori TEXT di grandi dimensioni<button data-href="#How-Milvus-stores-large-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>Espandi per vedere come funziona</summary></p>
<p>Quando si inserisce un'entità, la stringa fornita per un campo <code translate="no">TEXT</code> è il valore <code translate="no">TEXT</code>. Milvus confronta la dimensione di tale valore con <a href="/docs/it/configure_datanode.md#dataNodetextinlineThreshold">dataNode.text.inlineThreshold</a>, che per impostazione predefinita è pari a <code translate="no">65,536</code> byte, quindi sceglie uno dei due percorsi di archiviazione interni.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/text-large-storage-flow.png" alt="Large text storage" class="doc-image" id="large-text-storage" /> 
   <span>Archiviazione di testi di grandi dimensioni</span>
  
 </span></p>
<ul>
<li><strong>Archiviazione in linea</strong>: se il valore di ` <code translate="no">TEXT</code> ` è inferiore a ` <code translate="no">dataNode.text.inlineThreshold</code>`, Milvus memorizza il valore di testo originale direttamente nei dati del campo ` <code translate="no">TEXT</code> `.</li>
<li><strong>Archiviazione LOB</strong>: se un valore di ` <code translate="no">TEXT</code> ` è maggiore o uguale a ` <code translate="no">dataNode.text.inlineThreshold</code>`, Milvus tratta il valore come un oggetto di grandi dimensioni e archivia il testo originale separatamente in un sistema di archiviazione oggetti, come MinIO. Il campo ` <code translate="no">TEXT</code> ` memorizza un riferimento interno al testo archiviato separatamente. Quando il campo ` <code translate="no">TEXT</code> ` viene richiesto nei risultati di una query o di una ricerca, Milvus utilizza il riferimento per recuperare e restituire il testo originale.</li>
</ul>
<p>Questa scelta di archiviazione è interna. L’inserimento, l’interrogazione e la ricerca nel campo ` <code translate="no">TEXT</code> ` avvengono allo stesso modo, indipendentemente dal percorso di archiviazione utilizzato da Milvus. Per ottimizzare la soglia o il comportamento relativo all’archiviazione, alla compattazione e alla garbage collection, consultare <a href="/docs/it/configure_datanode.md">le configurazioni relative a `dataNode`</a> e <a href="/docs/it/configure_datacoord.md">quelle relative a `dataCoord`</a>.</p>
<p>Se la propria distribuzione utilizza l’archiviazione a oggetti, valori elevati di ` <code translate="no">TEXT</code> ` potrebbero apparire come oggetti gestiti da Milvus in percorsi quali <code translate="no">lobs/...</code>. Questi oggetti sono dettagli di implementazione e non devono essere spostati, copiati o eliminati manualmente. Dopo aver eliminato entità, rimosso partizioni o compattato i dati, l’utilizzo dello storage a oggetti potrebbe diminuire solo dopo che la garbage collection di Milvus avrà rimosso i dati di oggetti di grandi dimensioni non più referenziati, al termine della relativa finestra di sicurezza.</p>
<p></details></p>
<p>Un uso comune di <code translate="no">TEXT</code> è la ricerca full-text con BM25. In questo modello, il campo <code translate="no">TEXT</code> memorizza il contenuto originale della fonte, mentre BM25 analizza il testo e genera vettori sparsi per classificare le corrispondenze basate sulle parole chiave. I risultati della ricerca possono quindi restituire il valore <code translate="no">TEXT</code> corrispondente come contesto per i flussi di lavoro LLM o degli agenti. L’esempio seguente mostra come utilizzare un campo <code translate="no">TEXT</code> come campo di input per BM25. Per ulteriori informazioni sui concetti e sulle opzioni di query della ricerca full-text, consultare <a href="/docs/it/full-text-search.md">Ricerca full-text</a>.</p>
<h2 id="Step-1-Create-a-collection-with-a-TEXT-field" class="common-anchor-header">Passaggio 1: Creare una raccolta con un campo TEXT<button data-href="#Step-1-Create-a-collection-with-a-TEXT-field" class="anchor-icon" translate="no">
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
    </button></h2><p>L’esempio seguente crea una raccolta con un campo <code translate="no">TEXT</code> per il contenuto di origine e un campo vettore sparso per i vettori sparsi generati da BM25. La funzione BM25 converte il testo tokenizzato da <code translate="no">content</code> in vettori sparsi memorizzati in <code translate="no">sparse</code>.</p>
<p>Per la ricerca full-text con BM25, il campo di input ` <code translate="no">TEXT</code> ` deve essere impostato su ` <code translate="no">enable_analyzer=True</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;text_bm25_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;content&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.TEXT,</span>
<span class="highlighted-comment-line">    enable_analyzer=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="highlighted-comment-line">bm25_function = Function(</span>
<span class="highlighted-comment-line">    name=<span class="hljs-string">&quot;content_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],</span>
<span class="highlighted-comment-line">    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>],</span>
<span class="highlighted-comment-line">    function_type=FunctionType.BM25,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">schema.add_function(bm25_function)</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Create-a-sparse-vector-index" class="common-anchor-header">Passaggio 2: Creare un indice di vettori sparsi<button data-href="#Step-2-Create-a-sparse-vector-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Creare un indice sul campo vettoriale sparso generato dalla funzione BM25. Il tipo di metrica deve essere impostato su <code translate="no">BM25</code>.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Insert-TEXT-data" class="common-anchor-header">Passaggio 3: Inserire i dati TEXT<button data-href="#Step-3-Insert-TEXT-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Inserire il testo direttamente nel campo ` <code translate="no">TEXT</code> `. Non specificare valori per il campo ` <code translate="no">sparse</code> `. Milvus genera internamente i vettori sparsi applicando la funzione BM25 a ` <code translate="no">content</code>`.</p>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>,
    },
]

client.insert(collection_name=COLLECTION_NAME, data=data)
client.load_collection(collection_name=COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Perform-BM25-full-text-search" class="common-anchor-header">Passaggio 4: Eseguire la ricerca full-text con BM25<button data-href="#Step-4-Perform-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare il testo grezzo della query come dati di ricerca ed eseguire la ricerca nel campo del vettore sparso. Milvus converte il testo della query in un vettore sparso, ordina i risultati con BM25 e restituisce il campo <code translate="no">TEXT</code> richiesto in <code translate="no">output_fields</code>.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=COLLECTION_NAME,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;content&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Read-the-returned-TEXT-values" class="common-anchor-header">Fase 5: Leggere i valori TEXT restituiti<button data-href="#Step-5-Read-the-returned-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Ogni risultato della ricerca include il punteggio BM25 e il valore originale di <code translate="no">TEXT</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;id: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni sulle funzioni BM25, sugli indici a vettori sparsi e sulla sintassi delle query per la ricerca full-text, consultare <a href="/docs/it/full-text-search.md">Ricerca full-text</a>.</p>
