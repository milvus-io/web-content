---
id: integrate_with_sentencetransformers.md
summary: In questa pagina si parla della ricerca di film utilizzando Milvus
title: Ricerca di film con Milvus e SentenceTransformers
---
<h1 id="Movie-Search-Using-Milvus-and-SentenceTransformers" class="common-anchor-header">Ricerca di film con Milvus e SentenceTransformers<button data-href="#Movie-Search-Using-Milvus-and-SentenceTransformers" class="anchor-icon" translate="no">
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
    </button></h1><p>In questo esempio, cercheremo i riassunti delle trame dei film usando Milvus e la libreria SentenceTransformers. Il dataset che utilizzeremo è <a href="https://huggingface.co/datasets/vishnupriyavr/wiki-movie-plots-with-summaries">Wikipedia Movie Plots with Summaries</a>, ospitato su HuggingFace.</p>
<p>Iniziamo!</p>
<h2 id="Required-Libraries" class="common-anchor-header">Librerie necessarie<button data-href="#Required-Libraries" class="anchor-icon" translate="no">
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
    </button></h2><p>Per questo esempio, useremo <code translate="no">pymilvus</code> per connetterci a Milvus, <code translate="no">sentence-transformers</code> per generare embeddings vettoriali e <code translate="no">datasets</code> per scaricare il dataset di esempio.</p>
<pre><code translate="no" class="language-shell">pip install pymilvus sentence-transformers datasets tqdm
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> SentenceTransformer
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<p>Definiremo alcuni parametri globali,</p>
<pre><code translate="no" class="language-python">embedding_dim = <span class="hljs-number">384</span>
collection_name = <span class="hljs-string">&quot;movie_embeddings&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Downloading-and-Opening-the-Dataset" class="common-anchor-header">Scaricare e aprire il set di dati<button data-href="#Downloading-and-Opening-the-Dataset" class="anchor-icon" translate="no">
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
    </button></h2><p>Con una sola riga, <code translate="no">datasets</code> ci permette di scaricare e aprire un set di dati. La libreria metterà in cache il set di dati a livello locale e utilizzerà quella copia la prossima volta che verrà eseguita. Ogni riga contiene i dettagli di un film che ha un articolo di Wikipedia allegato. Utilizziamo le colonne <code translate="no">Title</code>, <code translate="no">PlotSummary</code>, <code translate="no">Release Year</code> e <code translate="no">Origin/Ethnicity</code>.</p>
<pre><code translate="no" class="language-python">ds = load_dataset(<span class="hljs-string">&quot;vishnupriyavr/wiki-movie-plots-with-summaries&quot;</span>, split=<span class="hljs-string">&quot;train&quot;</span>)
<span class="hljs-built_in">print</span>(ds)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-the-Database" class="common-anchor-header">Connessione al database<button data-href="#Connecting-to-the-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>A questo punto, iniziamo a configurare Milvus. I passi da seguire sono i seguenti:</p>
<ol>
<li>Creare un database Milvus Lite in un file locale. (Sostituire questo URI con l'indirizzo del server per Milvus Standalone e Milvus Distributed).</li>
</ol>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;./sentence_transformers_example.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Creare lo schema dei dati. Questo specifica i campi che compongono un elemento, compresa la dimensione dell'incorporazione vettoriale.</li>
</ol>
<pre><code translate="no" class="language-python">fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
    FieldSchema(name=<span class="hljs-string">&quot;year&quot;</span>, dtype=DataType.INT64),
    FieldSchema(name=<span class="hljs-string">&quot;origin&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">64</span>),
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
client.create_collection(collection_name=collection_name, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Definire l'algoritmo di indicizzazione della ricerca vettoriale. Milvus Lite supporta il tipo di indice FLAT, mentre Milvus Standalone e Milvus Distributed implementano un'ampia varietà di metodi come IVF, HNSW e DiskANN. Per la piccola scala di dati di questa dimostrazione, qualsiasi tipo di indice di ricerca è sufficiente, quindi qui usiamo il più semplice FLAT.</li>
</ol>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>)
client.create_index(collection_name, index_params)
<button class="copy-code-btn"></button></code></pre>
<p>Una volta eseguiti questi passaggi, siamo pronti a inserire i dati nella raccolta e a eseguire una ricerca. Tutti i dati aggiunti verranno indicizzati automaticamente e saranno immediatamente disponibili per la ricerca. Se i dati sono molto recenti, la ricerca potrebbe essere più lenta, poiché la ricerca brute force sarà utilizzata sui dati ancora in fase di indicizzazione.</p>
<h2 id="Inserting-the-Data" class="common-anchor-header">Inserimento dei dati<button data-href="#Inserting-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Per questo esempio, utilizzeremo il modello SentenceTransformers miniLM per creare embeddings del testo della trama. Questo modello restituisce embeddings a 384 dimensioni.</p>
<pre><code translate="no" class="language-python">model = SentenceTransformer(<span class="hljs-string">&quot;all-MiniLM-L12-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Si esegue un ciclo sulle righe dei dati, si incorpora il campo di riepilogo della trama e si inseriscono le entità nel database dei vettori. In generale, è consigliabile eseguire questa fase su batch di dati per massimizzare il throughput della CPU o della GPU per il modello di embedding, come facciamo qui.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch <span class="hljs-keyword">in</span> tqdm(ds.batch(batch_size=<span class="hljs-number">512</span>)):
    embeddings = model.encode(batch[<span class="hljs-string">&quot;PlotSummary&quot;</span>])
    data = [
        {<span class="hljs-string">&quot;title&quot;</span>: title, <span class="hljs-string">&quot;embedding&quot;</span>: embedding, <span class="hljs-string">&quot;year&quot;</span>: year, <span class="hljs-string">&quot;origin&quot;</span>: origin}
        <span class="hljs-keyword">for</span> title, embedding, year, origin <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(
            batch[<span class="hljs-string">&quot;Title&quot;</span>], embeddings, batch[<span class="hljs-string">&quot;Release Year&quot;</span>], batch[<span class="hljs-string">&quot;Origin/Ethnicity&quot;</span>]
        )
    ]
    res = client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>L'operazione di cui sopra è relativamente lunga perché l'incorporazione richiede tempo. Questa fase richiede circa 2 minuti utilizzando la CPU su un MacBook Pro 2023 e sarà molto più veloce con le GPU dedicate. Fate una pausa e godetevi una tazza di caffè!</p>
</div>
<h2 id="Performing-the-Search" class="common-anchor-header">Esecuzione della ricerca<button data-href="#Performing-the-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Con tutti i dati inseriti in Milvus, possiamo iniziare a eseguire le nostre ricerche. In questo esempio, cercheremo i film in base ai riassunti della trama di Wikipedia. Poiché stiamo effettuando una ricerca in batch, il tempo di ricerca è condiviso tra le ricerche dei film. (Riuscite a indovinare quale film avevo in mente di recuperare in base al testo descrittivo della query?).</p>
<pre><code translate="no" class="language-python">queries = [
    <span class="hljs-string">&#x27;A shark terrorizes an LA beach.&#x27;</span>,
    <span class="hljs-string">&#x27;An archaeologist searches for ancient artifacts while fighting Nazis.&#x27;</span>,
    <span class="hljs-string">&#x27;Teenagers in detention learn about themselves.&#x27;</span>,
    <span class="hljs-string">&#x27;A teenager fakes illness to get off school and have adventures with two friends.&#x27;</span>,
    <span class="hljs-string">&#x27;A young couple with a kid look after a hotel during winter and the husband goes insane.&#x27;</span>,
    <span class="hljs-string">&#x27;Four turtles fight bad guys.&#x27;</span>
    ]

<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_query</span>(<span class="hljs-params">data</span>):
    vectors = model.encode(data)
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> vectors]


query_vectors = embed_query(queries)

res = client.search(
    collection_name=collection_name,
    data=query_vectors,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;origin == &quot;American&quot; and year &gt; 1945 and year &lt; 2000&#x27;</span>,
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>],
)

<span class="hljs-keyword">for</span> idx, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(res):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, queries[idx])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>].get(<span class="hljs-string">&quot;title&quot;</span>), <span class="hljs-string">&quot;(&quot;</span>, <span class="hljs-built_in">round</span>(hit[<span class="hljs-string">&quot;distance&quot;</span>], <span class="hljs-number">2</span>), <span class="hljs-string">&quot;)&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>I risultati sono:</p>
<pre><code translate="no" class="language-shell">Query: An archaeologist searches for ancient artifacts while fighting Nazis.
Results:
Love Slaves of the Amazons ( 0.4 )
A Time to Love and a Time to Die ( 0.39 )
The Fifth Element ( 0.39 )

Query: Teenagers in detention learn about themselves.
Results:
The Breakfast Club ( 0.54 )
Up the Academy ( 0.46 )
Fame ( 0.43 )

Query: A teenager fakes illness to get off school and have adventures with two friends.
Results:
Ferris Bueller&#x27;s Day Off ( 0.48 )
Fever Lake ( 0.47 )
Losin&#x27; It ( 0.39 )

Query: A young couple with a kid look after a hotel during winter and the husband goes insane.
Results:
The Shining ( 0.48 )
The Four Seasons ( 0.42 )
Highball ( 0.41 )

Query: Four turtles fight bad guys.
Results:
Teenage Mutant Ninja Turtles II: The Secret of the Ooze ( 0.47 )
Devil May Hare ( 0.43 )
Attack of the Giant Leeches ( 0.42 )
<button class="copy-code-btn"></button></code></pre>
