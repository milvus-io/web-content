---
id: funnel_search_with_matryoshka.md
summary: >-
  In diesem Notizbuch untersuchen wir, wie wir Matryoshka-Einbettungen mit
  Milvus für die semantische Suche verwenden können. Wir veranschaulichen einen
  Algorithmus namens "Trichtersuche", der es uns ermöglicht, eine
  Ähnlichkeitssuche über eine kleine Teilmenge unserer Einbettungsdimensionen
  durchzuführen, ohne dass es zu einem drastischen Abfall der Wiedererkennung
  kommt.
title: Trichtersuche mit Matryoshka-Embeddings
---
<h1 id="Funnel-Search-with-Matryoshka-Embeddings" class="common-anchor-header">Trichtersuche mit Matryoshka-Embeddings<button data-href="#Funnel-Search-with-Matryoshka-Embeddings" class="anchor-icon" translate="no">
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
    </button></h1><div style='margin: auto; width: 50%;'><img translate="no" src='/docs/v2.5.x/assets/funnel-search.png' width='100%'></div>
Beim Aufbau effizienter Vektorsuchsysteme besteht eine der größten Herausforderungen darin, die Speicherkosten zu bewältigen und gleichzeitig eine akzeptable Latenzzeit und Wiederauffindbarkeit zu gewährleisten. Moderne Einbettungsmodelle geben Vektoren mit Hunderten oder Tausenden von Dimensionen aus, was zu einem erheblichen Speicher- und Rechenaufwand für den Rohvektor und den Index führt.<p>Traditionell wird der Speicherbedarf durch die Anwendung einer Quantisierungs- oder Dimensionalitätsreduzierungsmethode unmittelbar vor dem Aufbau des Index reduziert. Wir können beispielsweise Speicherplatz einsparen, indem wir die Genauigkeit mithilfe der Produktquantisierung (PQ) oder die Anzahl der Dimensionen mithilfe der Hauptkomponentenanalyse (PCA) verringern. Diese Methoden analysieren die gesamte Vektormenge, um eine kompaktere Menge zu finden, die die semantischen Beziehungen zwischen den Vektoren beibehält.</p>
<p>Diese Standardansätze sind zwar effektiv, aber sie reduzieren die Präzision oder Dimensionalität nur einmal und auf einer einzigen Ebene. Aber was wäre, wenn wir mehrere Detailschichten gleichzeitig beibehalten könnten, wie eine Pyramide von immer präziseren Darstellungen?</p>
<p>Das ist die Matrjoschka-Einbettung. Diese cleveren Konstrukte, die nach den russischen Schachtelpuppen benannt sind (siehe Abbildung), betten mehrere Darstellungsebenen in einen einzigen Vektor ein. Im Gegensatz zu herkömmlichen Nachbearbeitungsmethoden erlernen Matryoshka-Einbettungen diese Multiskalenstruktur während des anfänglichen Trainingsprozesses. Das Ergebnis ist bemerkenswert: Die vollständige Einbettung erfasst nicht nur die Semantik der Eingabe, sondern jedes verschachtelte Untergruppenpräfix (erste Hälfte, erstes Viertel usw.) liefert eine kohärente, wenn auch weniger detaillierte Darstellung.</p>
<p>In diesem Notizbuch untersuchen wir, wie man Matryoshka-Einbettungen mit Milvus für die semantische Suche verwenden kann. Wir veranschaulichen einen Algorithmus namens "Trichtersuche", der es uns ermöglicht, eine Ähnlichkeitssuche über eine kleine Teilmenge unserer Einbettungsdimensionen durchzuführen, ohne dass es zu einem drastischen Abfall der Wiedererkennbarkeit kommt.</p>
<h2 id="Preparation" class="common-anchor-header">Vorbereitung<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install datasets numpy pandas pymilvus sentence-transformers tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nur für CPU:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu</span>
<button class="copy-code-btn"></button></code></pre>
<p>Für CUDA 11.8:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118</span>
<button class="copy-code-btn"></button></code></pre>
<p>Der Installationsbefehl für CUDA 11.8 ist nur ein Beispiel. Bitte bestätigen Sie Ihre CUDA-Version bei der Installation von PyTorch.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> functools

<span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
<span class="hljs-keyword">import</span> pymilvus
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> SentenceTransformer
<span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">import</span> torch.nn.functional <span class="hljs-keyword">as</span> F
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-Matryoshka-Embedding-Model" class="common-anchor-header">Matryoshka-Einbettungsmodell laden<button data-href="#Load-Matryoshka-Embedding-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>Anstelle eines Standard-Einbettungsmodells wie <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L12-v2"><code translate="no">sentence-transformers/all-MiniLM-L12-v2</code></a>verwenden wir <a href="https://huggingface.co/nomic-ai/nomic-embed-text-v1">ein Modell von Nomic</a>, das speziell für die Erzeugung von Matryoshka-Einbettungen trainiert wurde.</p>
<pre><code translate="no" class="language-python">model = SentenceTransformer(
    <span class="hljs-comment"># Remove &#x27;device=&#x27;mps&#x27; if running on non-Mac device</span>
    <span class="hljs-string">&quot;nomic-ai/nomic-embed-text-v1.5&quot;</span>,
    trust_remote_code=<span class="hljs-literal">True</span>,
    device=<span class="hljs-string">&quot;mps&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">&lt;All keys matched successfully&gt;
</code></pre>
<h2 id="Loading-Dataset-Embedding-Items-and-Building-Vector-Database" class="common-anchor-header">Laden des Datensatzes, Einbetten der Elemente und Aufbau der Vektordatenbank<button data-href="#Loading-Dataset-Embedding-Items-and-Building-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Der folgende Code ist eine Abwandlung des Codes aus der Dokumentationsseite <a href="https://milvus.io/docs/integrate_with_sentencetransformers.md">"Movie Search with Sentence Transformers and Milvus".</a> Zuerst laden wir den Datensatz von HuggingFace. Er enthält etwa 35k Einträge, die jeweils einem Film mit einem Wikipedia-Artikel entsprechen. Wir werden in diesem Beispiel die Felder <code translate="no">Title</code> und <code translate="no">PlotSummary</code> verwenden.</p>
<pre><code translate="no" class="language-python">ds = load_dataset(<span class="hljs-string">&quot;vishnupriyavr/wiki-movie-plots-with-summaries&quot;</span>, split=<span class="hljs-string">&quot;train&quot;</span>)
<span class="hljs-built_in">print</span>(ds)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Dataset({
    features: ['Release Year', 'Title', 'Origin/Ethnicity', 'Director', 'Cast', 'Genre', 'Wiki Page', 'Plot', 'PlotSummary'],
    num_rows: 34886
})
</code></pre>
<p>Als nächstes stellen wir eine Verbindung zu einer Milvus-Lite-Datenbank her, geben das Datenschema an und erstellen eine Sammlung mit diesem Schema. Wir werden sowohl die nicht normalisierte Einbettung als auch das erste Sechstel der Einbettung in separaten Feldern speichern. Der Grund dafür ist, dass wir das erste Sechstel des Matrjoschka-Embeddings für die Durchführung einer Ähnlichkeitssuche benötigen und die restlichen 5 Sechstel des Embeddings für das Reranking und die Verbesserung der Suchergebnisse.</p>
<pre><code translate="no" class="language-python">embedding_dim = <span class="hljs-number">768</span>
search_dim = <span class="hljs-number">128</span>
collection_name = <span class="hljs-string">&quot;movie_embeddings&quot;</span>

client = MilvusClient(uri=<span class="hljs-string">&quot;./wiki-movie-plots-matryoshka.db&quot;</span>)

fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>),
    <span class="hljs-comment"># First sixth of unnormalized embedding vector</span>
    FieldSchema(name=<span class="hljs-string">&quot;head_embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=search_dim),
    <span class="hljs-comment"># Entire unnormalized embedding vector</span>
    FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
client.create_collection(collection_name=collection_name, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus unterstützt derzeit nicht die Suche über Teilmengen von Einbettungen, daher unterteilen wir die Einbettungen in zwei Teile: Der Kopf stellt die anfängliche Teilmenge des Vektors dar, die indiziert und durchsucht werden soll, und der Schwanz ist der Rest. Das Modell wurde für die Ähnlichkeitssuche über die Kosinusdistanz trainiert, daher normalisieren wir die Kopfeinbettungen. Um jedoch später Ähnlichkeiten für größere Teilmengen berechnen zu können, müssen wir die Norm der Kopfeinbettung speichern, damit wir sie vor dem Zusammenfügen mit dem Schwanz unnormalisieren können.</p>
<p>Um die Suche über das erste 1/6 der Einbettung durchzuführen, müssen wir einen Vektorsuchindex über das Feld <code translate="no">head_embedding</code> erstellen. Später werden wir die Ergebnisse der "Trichtersuche" mit einer normalen Vektorsuche vergleichen und daher auch einen Suchindex über die gesamte Einbettung erstellen.</p>
<p><em>Wichtig ist, dass wir die Distanzmetrik <code translate="no">COSINE</code> und nicht <code translate="no">IP</code> verwenden, da wir sonst die Einbettungsnormen im Auge behalten müssten, was die Implementierung verkomplizieren würde (dies wird sinnvoller, wenn der Trichtersuchalgorithmus beschrieben wurde).</em></p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;head_embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>)
client.create_index(collection_name, index_params)
<button class="copy-code-btn"></button></code></pre>
<p>Schließlich kodieren wir die Handlungszusammenfassungen für alle 35k Filme und geben die entsprechenden Einbettungen in die Datenbank ein.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch <span class="hljs-keyword">in</span> tqdm(ds.batch(batch_size=<span class="hljs-number">512</span>)):
    <span class="hljs-comment"># This particular model requires us to prefix &#x27;search_document:&#x27; to stored entities</span>
    plot_summary = [<span class="hljs-string">&quot;search_document: &quot;</span> + x.strip() <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> batch[<span class="hljs-string">&quot;PlotSummary&quot;</span>]]

    <span class="hljs-comment"># Output of embedding model is unnormalized</span>
    embeddings = model.encode(plot_summary, convert_to_tensor=<span class="hljs-literal">True</span>)
    head_embeddings = embeddings[:, :search_dim]

    data = [
        {
            <span class="hljs-string">&quot;title&quot;</span>: title,
            <span class="hljs-string">&quot;head_embedding&quot;</span>: head.cpu().numpy(),
            <span class="hljs-string">&quot;embedding&quot;</span>: embedding.cpu().numpy(),
        }
        <span class="hljs-keyword">for</span> title, head, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(batch[<span class="hljs-string">&quot;Title&quot;</span>], head_embeddings, embeddings)
    ]
    res = client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">100%|██████████| 69/69 [05:57&lt;00:00,  5.18s/it]
</code></pre>
<h2 id="Performing-Funnel-Search" class="common-anchor-header">Durchführen der Trichtersuche<button data-href="#Performing-Funnel-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Nun wollen wir eine "Trichtersuche" mit den ersten 1/6 der Matryoshka-Einbettungsdimensionen durchführen. Ich habe drei Filme im Sinn, die abgerufen werden sollen, und habe meine eigene Zusammenfassung für die Abfrage der Datenbank erstellt. Wir betten die Abfragen ein und führen dann eine Vektorsuche auf dem Feld <code translate="no">head_embedding</code> durch, wobei wir 128 Ergebniskandidaten erhalten.</p>
<pre><code translate="no" class="language-python">queries = [
    <span class="hljs-string">&quot;An archaeologist searches for ancient artifacts while fighting Nazis.&quot;</span>,
    <span class="hljs-string">&quot;A teenager fakes illness to get off school and have adventures with two friends.&quot;</span>,
    <span class="hljs-string">&quot;A young couple with a kid look after a hotel during winter and the husband goes insane.&quot;</span>,
]


<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_search</span>(<span class="hljs-params">data</span>):
    embeds = model.encode(data)
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> embeds]


<span class="hljs-comment"># This particular model requires us to prefix &#x27;search_query:&#x27; to queries</span>
instruct_queries = [<span class="hljs-string">&quot;search_query: &quot;</span> + q.strip() <span class="hljs-keyword">for</span> q <span class="hljs-keyword">in</span> queries]
search_data = embed_search(instruct_queries)

<span class="hljs-comment"># Normalize head embeddings</span>
head_search = [x[:search_dim] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> search_data]

<span class="hljs-comment"># Perform standard vector search on first sixth of embedding dimensions</span>
res = client.search(
    collection_name=collection_name,
    data=head_search,
    anns_field=<span class="hljs-string">&quot;head_embedding&quot;</span>,
    limit=<span class="hljs-number">128</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;head_embedding&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>An diesem Punkt haben wir eine Suche über einen viel kleineren Vektorraum durchgeführt und haben daher wahrscheinlich eine geringere Latenz und geringere Speicheranforderungen für den Index im Vergleich zu einer Suche über den gesamten Raum. Untersuchen wir nun die ersten 5 Treffer für jede Abfrage:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> query, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, res):
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits][:<span class="hljs-number">5</span>]

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, query)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Results:&quot;</span>)
    <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows:
        <span class="hljs-built_in">print</span>(row[<span class="hljs-string">&quot;title&quot;</span>].strip())
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query: An archaeologist searches for ancient artifacts while fighting Nazis.
Results:
&quot;Pimpernel&quot; Smith
Black Hunters
The Passage
Counterblast
Dominion: Prequel to the Exorcist

Query: A teenager fakes illness to get off school and have adventures with two friends.
Results:
How to Deal
Shorts
Blackbird
Valentine
Unfriended

Query: A young couple with a kid look after a hotel during winter and the husband goes insane.
Results:
Ghostkeeper
Our Vines Have Tender Grapes
The Ref
Impact
The House in Marsh Road
</code></pre>
<p>Wie wir sehen können, hat die Wiederauffindbarkeit als Folge des Abschneidens der Einbettungen während der Suche gelitten. Die Trichtersuche behebt dieses Problem mit einem cleveren Trick: Wir können die verbleibenden Einbettungsdimensionen verwenden, um unsere Kandidatenliste neu zu ordnen und zu beschneiden, um die Abrufleistung wiederherzustellen, ohne zusätzliche teure Vektorsuchen durchzuführen.</p>
<p>Um die Darstellung des Trichtersuchalgorithmus zu vereinfachen, konvertieren wir die Milvus-Suchtreffer für jede Anfrage in einen Pandas-Datenrahmen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">hits_to_dataframe</span>(<span class="hljs-params">hits: pymilvus.client.abstract.Hits</span>) -&gt; pd.DataFrame:
    <span class="hljs-string">&quot;&quot;&quot;
    Convert a Milvus search result to a Pandas dataframe. This function is specific to our data schema.

    &quot;&quot;&quot;</span>
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits]
    rows_dict = [
        {<span class="hljs-string">&quot;title&quot;</span>: x[<span class="hljs-string">&quot;title&quot;</span>], <span class="hljs-string">&quot;embedding&quot;</span>: torch.tensor(x[<span class="hljs-string">&quot;embedding&quot;</span>])} <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> rows
    ]
    <span class="hljs-keyword">return</span> pd.DataFrame.from_records(rows_dict)


dfs = [hits_to_dataframe(hits) <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res]
<button class="copy-code-btn"></button></code></pre>
<p>Um die Trichtersuche durchzuführen, iterieren wir nun über die immer größer werdenden Teilmengen der Einbettungen. Bei jeder Iteration ordnen wir die Kandidaten entsprechend der neuen Ähnlichkeiten neu ein und streichen einen Teil der am niedrigsten eingestuften Kandidaten.</p>
<p>Um dies zu verdeutlichen, haben wir im vorigen Schritt 128 Kandidaten mit 1/6 der Einbettungs- und Abfragedimensionen gefunden. Der erste Schritt bei der Durchführung der Trichtersuche besteht darin, die Ähnlichkeiten zwischen den Suchanfragen und den Kandidaten unter Verwendung <em>des ersten Drittels der Dimensionen</em> neu zu berechnen. Die untersten 64 Kandidaten werden aussortiert. Dann wiederholen wir diesen Vorgang mit <em>den ersten 2/3 der Dimensionen</em> und dann mit <em>allen Dimensionen</em>, wobei wir nacheinander 32 und 16 Kandidaten aussondern.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># An optimized implementation would vectorize the calculation of similarity scores across rows (using a matrix)</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">calculate_score</span>(<span class="hljs-params">row, query_emb=<span class="hljs-literal">None</span>, dims=<span class="hljs-number">768</span></span>):
    emb = F.normalize(row[<span class="hljs-string">&quot;embedding&quot;</span>][:dims], dim=-<span class="hljs-number">1</span>)
    <span class="hljs-keyword">return</span> (emb @ query_emb).item()


<span class="hljs-comment"># You could also add a top-K parameter as a termination condition</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">funnel_search</span>(<span class="hljs-params">
    df: pd.DataFrame, query_emb, scales=[<span class="hljs-number">256</span>, <span class="hljs-number">512</span>, <span class="hljs-number">768</span>], prune_ratio=<span class="hljs-number">0.5</span>
</span>) -&gt; pd.DataFrame:
    <span class="hljs-comment"># Loop over increasing prefixes of the embeddings</span>
    <span class="hljs-keyword">for</span> dims <span class="hljs-keyword">in</span> scales:
        <span class="hljs-comment"># Query vector must be normalized for each new dimensionality</span>
        emb = torch.tensor(query_emb[:dims] / np.linalg.norm(query_emb[:dims]))

        <span class="hljs-comment"># Score</span>
        scores = df.apply(
            functools.partial(calculate_score, query_emb=emb, dims=dims), axis=<span class="hljs-number">1</span>
        )
        df[<span class="hljs-string">&quot;scores&quot;</span>] = scores

        <span class="hljs-comment"># Re-rank</span>
        df = df.sort_values(by=<span class="hljs-string">&quot;scores&quot;</span>, ascending=<span class="hljs-literal">False</span>)

        <span class="hljs-comment"># Prune (in our case, remove half of candidates at each step)</span>
        df = df.head(<span class="hljs-built_in">int</span>(prune_ratio * <span class="hljs-built_in">len</span>(df)))

    <span class="hljs-keyword">return</span> df


dfs_results = [
    {<span class="hljs-string">&quot;query&quot;</span>: query, <span class="hljs-string">&quot;results&quot;</span>: funnel_search(df, query_emb)}
    <span class="hljs-keyword">for</span> query, df, query_emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, dfs, search_data)
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> dfs_results:
    <span class="hljs-built_in">print</span>(d[<span class="hljs-string">&quot;query&quot;</span>], <span class="hljs-string">&quot;\n&quot;</span>, d[<span class="hljs-string">&quot;results&quot;</span>][:<span class="hljs-number">5</span>][<span class="hljs-string">&quot;title&quot;</span>], <span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">An archaeologist searches for ancient artifacts while fighting Nazis. 
 0           &quot;Pimpernel&quot; Smith
1               Black Hunters
29    Raiders of the Lost Ark
34             The Master Key
51            My Gun Is Quick
Name: title, dtype: object 

A teenager fakes illness to get off school and have adventures with two friends. 
 21               How I Live Now
32     On the Edge of Innocence
77             Bratz: The Movie
4                    Unfriended
108                  Simon Says
Name: title, dtype: object 

A young couple with a kid look after a hotel during winter and the husband goes insane. 
 9         The Shining
0         Ghostkeeper
11     Fast and Loose
7      Killing Ground
12         Home Alone
Name: title, dtype: object 
</code></pre>
<p>Es ist uns gelungen, die Trefferquote ohne zusätzliche Vektorsuche wiederherzustellen! Qualitativ scheinen diese Ergebnisse für "Raiders of the Lost Ark" und "The Shining" eine höhere Trefferquote zu haben als die Standard-Vektorsuche aus dem Tutorial <a href="https://milvus.io/docs/integrate_with_sentencetransformers.md">"Filmsuche mit Milvus und Satztransformatoren",</a> die ein anderes Einbettungsmodell verwendet. Allerdings ist es nicht in der Lage, "Ferris Bueller's Day Off" zu finden, auf den wir später im Notizbuch zurückkommen werden. (Weitere quantitative Experimente und Benchmarking finden Sie im Dokument <a href="https://arxiv.org/abs/2205.13147">Matryoshka Representation Learning</a> ).</p>
<h2 id="Comparing-Funnel-Search-to-Regular-Search" class="common-anchor-header">Vergleich der Trichtersuche mit der regulären Suche<button data-href="#Comparing-Funnel-Search-to-Regular-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Vergleichen wir die Ergebnisse unserer Trichtersuche mit einer normalen Vektorsuche <em>auf demselben Datensatz mit demselben Einbettungsmodell</em>. Wir führen eine Suche über die vollständigen Einbettungen durch.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search on entire embeddings</span>
res = client.search(
    collection_name=collection_name,
    data=search_data,
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> query, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, res):
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits]

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, query)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Results:&quot;</span>)
    <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows:
        <span class="hljs-built_in">print</span>(row[<span class="hljs-string">&quot;title&quot;</span>].strip())
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query: An archaeologist searches for ancient artifacts while fighting Nazis.
Results:
&quot;Pimpernel&quot; Smith
Black Hunters
Raiders of the Lost Ark
The Master Key
My Gun Is Quick

Query: A teenager fakes illness to get off school and have adventures with two friends.
Results:
A Walk to Remember
Ferris Bueller's Day Off
How I Live Now
On the Edge of Innocence
Bratz: The Movie

Query: A young couple with a kid look after a hotel during winter and the husband goes insane.
Results:
The Shining
Ghostkeeper
Fast and Loose
Killing Ground
Home Alone
</code></pre>
<p>Mit Ausnahme der Ergebnisse für "Ein Jugendlicher täuscht eine Krankheit vor, um die Schule zu schwänzen..." sind die Ergebnisse der Trichtersuche fast identisch mit denen der Vollsuche, obwohl die Trichtersuche auf einem Suchraum von 128 Dimensionen gegenüber 768 Dimensionen für die reguläre Suche durchgeführt wurde.</p>
<h2 id="Investigating-Funnel-Search-Recall-Failure-for-Ferris-Buellers-Day-Off" class="common-anchor-header">Untersuchung des Misserfolgs der Trichtersuche bei Ferris Bueller's Day Off<button data-href="#Investigating-Funnel-Search-Recall-Failure-for-Ferris-Buellers-Day-Off" class="anchor-icon" translate="no">
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
    </button></h2><p>Warum gelang es der Trichtersuche nicht, "Ferris Bueller's Day Off" abzurufen? Untersuchen wir, ob er in der ursprünglichen Kandidatenliste enthalten war oder irrtümlich herausgefiltert wurde.</p>
<pre><code translate="no" class="language-python">queries2 = [
    <span class="hljs-string">&quot;A teenager fakes illness to get off school and have adventures with two friends.&quot;</span>
]


<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_search</span>(<span class="hljs-params">data</span>):
    embeds = model.encode(data)
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> embeds]


instruct_queries = [<span class="hljs-string">&quot;search_query: &quot;</span> + q.strip() <span class="hljs-keyword">for</span> q <span class="hljs-keyword">in</span> queries2]
search_data2 = embed_search(instruct_queries)
head_search2 = [x[:search_dim] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> search_data2]

<span class="hljs-comment"># Perform standard vector search on subset of embeddings</span>
res = client.search(
    collection_name=collection_name,
    data=head_search2,
    anns_field=<span class="hljs-string">&quot;head_embedding&quot;</span>,
    limit=<span class="hljs-number">256</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;head_embedding&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> query, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, res):
    rows = [x[<span class="hljs-string">&quot;entity&quot;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> hits]

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, queries2[<span class="hljs-number">0</span>])
    <span class="hljs-keyword">for</span> idx, row <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(rows):
        <span class="hljs-keyword">if</span> row[<span class="hljs-string">&quot;title&quot;</span>].strip() == <span class="hljs-string">&quot;Ferris Bueller&#x27;s Day Off&quot;</span>:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Row <span class="hljs-subst">{idx}</span>: Ferris Bueller&#x27;s Day Off&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query: A teenager fakes illness to get off school and have adventures with two friends.
Row 228: Ferris Bueller's Day Off
</code></pre>
<p>Wir sehen, dass das Problem darin bestand, dass die ursprüngliche Kandidatenliste nicht groß genug war, oder besser gesagt, dass der gewünschte Treffer der Anfrage auf der höchsten Granularitätsebene nicht ähnlich genug ist. Eine Änderung von <code translate="no">128</code> auf <code translate="no">256</code> führt zu einem erfolgreichen Abruf. <em>Wir sollten eine Faustregel aufstellen, um die Anzahl der Kandidaten in einer Warteschleife festzulegen, um den Kompromiss zwischen Wiederauffindbarkeit und Latenzzeit empirisch zu bewerten.</em></p>
<pre><code translate="no" class="language-python">dfs = [hits_to_dataframe(hits) <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res]

dfs_results = [
    {<span class="hljs-string">&quot;query&quot;</span>: query, <span class="hljs-string">&quot;results&quot;</span>: funnel_search(df, query_emb)}
    <span class="hljs-keyword">for</span> query, df, query_emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries2, dfs, search_data2)
]

<span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> dfs_results:
    <span class="hljs-built_in">print</span>(d[<span class="hljs-string">&quot;query&quot;</span>], <span class="hljs-string">&quot;\n&quot;</span>, d[<span class="hljs-string">&quot;results&quot;</span>][:<span class="hljs-number">7</span>][<span class="hljs-string">&quot;title&quot;</span>].to_string(index=<span class="hljs-literal">False</span>), <span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">A teenager fakes illness to get off school and have adventures with two friends. 
       A Walk to Remember
Ferris Bueller's Day Off
          How I Live Now
On the Edge of Innocence
        Bratz: The Movie
              Unfriended
              Simon Says 
</code></pre>
<h2 id="Does-the-order-matter-Prefix-vs-suffix-embeddings" class="common-anchor-header">Spielt die Reihenfolge eine Rolle? Präfix- vs. Suffixeinbettungen.<button data-href="#Does-the-order-matter-Prefix-vs-suffix-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Modell wurde so trainiert, dass es rekursiv kleinere Präfixe der Einbettungen gut abbildet. Spielt die Reihenfolge der Dimensionen, die wir verwenden, eine Rolle? Könnten wir zum Beispiel auch Teilmengen der Einbettungen nehmen, die Suffixe sind? In diesem Experiment kehren wir die Reihenfolge der Dimensionen in den Matryoshka-Einbettungen um und führen eine Trichtersuche durch.</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;./wikiplots-matryoshka-flipped.db&quot;</span>)

fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>),
    FieldSchema(name=<span class="hljs-string">&quot;head_embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=search_dim),
    FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
client.create_collection(collection_name=collection_name, schema=schema)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;head_embedding&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
client.create_index(collection_name, index_params)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">huggingface/tokenizers: The current process just got forked, after parallelism has already been used. Disabling parallelism to avoid deadlocks...
To disable this warning, you can either:
    - Avoid using `tokenizers` before the fork if possible
    - Explicitly set the environment variable TOKENIZERS_PARALLELISM=(true | false)
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch <span class="hljs-keyword">in</span> tqdm(ds.batch(batch_size=<span class="hljs-number">512</span>)):
    plot_summary = [<span class="hljs-string">&quot;search_document: &quot;</span> + x.strip() <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> batch[<span class="hljs-string">&quot;PlotSummary&quot;</span>]]

    <span class="hljs-comment"># Encode and flip embeddings</span>
    embeddings = model.encode(plot_summary, convert_to_tensor=<span class="hljs-literal">True</span>)
    embeddings = torch.flip(embeddings, dims=[-<span class="hljs-number">1</span>])
    head_embeddings = embeddings[:, :search_dim]

    data = [
        {
            <span class="hljs-string">&quot;title&quot;</span>: title,
            <span class="hljs-string">&quot;head_embedding&quot;</span>: head.cpu().numpy(),
            <span class="hljs-string">&quot;embedding&quot;</span>: embedding.cpu().numpy(),
        }
        <span class="hljs-keyword">for</span> title, head, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(batch[<span class="hljs-string">&quot;Title&quot;</span>], head_embeddings, embeddings)
    ]
    res = client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">100%|██████████| 69/69 [05:50&lt;00:00,  5.08s/it]
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Normalize head embeddings</span>

flip_search_data = [
    torch.flip(torch.tensor(x), dims=[-<span class="hljs-number">1</span>]).cpu().numpy() <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> search_data
]
flip_head_search = [x[:search_dim] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> flip_search_data]

<span class="hljs-comment"># Perform standard vector search on subset of embeddings</span>
res = client.search(
    collection_name=collection_name,
    data=flip_head_search,
    anns_field=<span class="hljs-string">&quot;head_embedding&quot;</span>,
    limit=<span class="hljs-number">128</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;head_embedding&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">dfs = [hits_to_dataframe(hits) <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res]

dfs_results = [
    {<span class="hljs-string">&quot;query&quot;</span>: query, <span class="hljs-string">&quot;results&quot;</span>: funnel_search(df, query_emb)}
    <span class="hljs-keyword">for</span> query, df, query_emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(queries, dfs, flip_search_data)
]

<span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> dfs_results:
    <span class="hljs-built_in">print</span>(
        d[<span class="hljs-string">&quot;query&quot;</span>],
        <span class="hljs-string">&quot;\n&quot;</span>,
        d[<span class="hljs-string">&quot;results&quot;</span>][:<span class="hljs-number">7</span>][<span class="hljs-string">&quot;title&quot;</span>].to_string(index=<span class="hljs-literal">False</span>, header=<span class="hljs-literal">False</span>),
        <span class="hljs-string">&quot;\n&quot;</span>,
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">An archaeologist searches for ancient artifacts while fighting Nazis. 
       &quot;Pimpernel&quot; Smith
          Black Hunters
Raiders of the Lost Ark
         The Master Key
        My Gun Is Quick
            The Passage
        The Mole People 

A teenager fakes illness to get off school and have adventures with two friends. 
                       A Walk to Remember
                          How I Live Now
                              Unfriended
Cirque du Freak: The Vampire's Assistant
                             Last Summer
                                 Contest
                                 Day One 

A young couple with a kid look after a hotel during winter and the husband goes insane. 
         Ghostkeeper
     Killing Ground
Leopard in the Snow
              Stone
          Afterglow
         Unfaithful
     Always a Bride 
</code></pre>
<p>Der Rückruf ist erwartungsgemäß viel schlechter als bei der Trichtersuche oder der regulären Suche (das Einbettungsmodell wurde durch kontrastives Lernen auf Präfixen der Einbettungsdimensionen trainiert, nicht auf Suffixen).</p>
<h2 id="Summary" class="common-anchor-header">Zusammenfassung<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Hier ist ein Vergleich unserer Suchergebnisse zwischen den Methoden:</p>
<div style='margin: auto; width: 80%;'><img translate="no" src='/docs/v2.5.x/assets/results-raiders-of-the-lost-ark.png' width='100%'></div>
<div style='margin: auto; width: 100%;'><img translate="no" src='/docs/v2.5.x/assets/results-ferris-buellers-day-off.png' width='100%'></div>
<div style='margin: auto; width: 80%;'><img translate="no" src='/docs/v2.5.x/assets/results-the-shining.png' width='100%'></div>
Wir haben gezeigt, wie man Matryoshka-Einbettungen mit Milvus verwendet, um einen effizienteren semantischen Suchalgorithmus namens "Trichtersuche" durchzuführen. Wir haben auch die Bedeutung der Reranking- und Pruning-Schritte des Algorithmus sowie einen Fehlermodus untersucht, wenn die anfängliche Kandidatenliste zu klein ist. Schließlich haben wir erörtert, wie wichtig die Reihenfolge der Dimensionen bei der Bildung von Sub-Embeddings ist - sie muss die gleiche sein, für die das Modell trainiert wurde. Oder besser gesagt, nur weil das Modell auf eine bestimmte Weise trainiert wurde, sind die Präfixe der Einbettungen sinnvoll. Jetzt wissen Sie, wie Sie Matryoshka-Einbettungen und die Trichtersuche implementieren können, um die Speicherkosten der semantischen Suche zu senken, ohne allzu große Einbußen bei der Abrufleistung hinnehmen zu müssen!
