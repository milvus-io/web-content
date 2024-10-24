---
id: integrate_with_sentencetransformers.md
summary: Diese Seite behandelt die Filmsuche mit Milvus
title: Filmsuche mit Milvus und SentenceTransformers
---
<h1 id="Movie-Search-Using-Milvus-and-SentenceTransformers" class="common-anchor-header">Filmsuche mit Milvus und SentenceTransformers<button data-href="#Movie-Search-Using-Milvus-and-SentenceTransformers" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Beispiel werden wir eine Wikipedia-Artikelsuche mit Milvus und der SentenceTransformers-Bibliothek durchführen. Der Datensatz, den wir durchsuchen, ist <a href="https://huggingface.co/datasets/vishnupriyavr/wiki-movie-plots-with-summaries">Wikipedia Movie Plots with Summaries</a>, gehostet auf HuggingFace.</p>
<p>Lasst uns anfangen!</p>
<h2 id="Required-Libraries" class="common-anchor-header">Erforderliche Bibliotheken<button data-href="#Required-Libraries" class="anchor-icon" translate="no">
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
    </button></h2><p>Für dieses Beispiel werden wir <code translate="no">pymilvus</code> verwenden, um uns mit Milvus zu verbinden, <code translate="no">sentence-transformers</code>, um Vektoreinbettungen zu erzeugen, und <code translate="no">datasets</code>, um den Beispieldatensatz herunterzuladen.</p>
<pre><code translate="no" class="language-shell">pip install pymilvus sentence-transformers datasets tqdm
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>, connections
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">FieldSchema</span>, <span class="hljs-title class_">CollectionSchema</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">Collection</span>
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> <span class="hljs-title class_">SentenceTransformer</span>
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<p>Wir werden einige globale Parameter definieren,</p>
<pre><code translate="no" class="language-python">embedding_dim = <span class="hljs-number">384</span>
collection_name = <span class="hljs-string">&quot;movie_embeddings&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Downloading-and-Opening-the-Dataset" class="common-anchor-header">Herunterladen und Öffnen des Datensatzes<button data-href="#Downloading-and-Opening-the-Dataset" class="anchor-icon" translate="no">
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
    </button></h2><p>In einer einzigen Zeile können wir mit <code translate="no">datasets</code> einen Datensatz herunterladen und öffnen. Die Bibliothek wird den Datensatz lokal zwischenspeichern und beim nächsten Aufruf diese Kopie verwenden. Jede Zeile enthält die Details eines Films, zu dem es einen Wikipedia-Artikel gibt. Wir verwenden nur die Spalten <code translate="no">Title</code> und <code translate="no">PlotSummary</code>.</p>
<pre><code translate="no" class="language-python">ds = load_dataset(<span class="hljs-string">&quot;vishnupriyavr/wiki-movie-plots-with-summaries&quot;</span>, <span class="hljs-built_in">split</span>=<span class="hljs-string">&quot;train&quot;</span>)
<span class="hljs-built_in">print</span>(ds)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-the-Database" class="common-anchor-header">Verbinden mit der Datenbank<button data-href="#Connecting-to-the-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>An dieser Stelle beginnen wir mit der Einrichtung von Milvus. Die Schritte sind wie folgt:</p>
<ol>
<li>Erstellen Sie eine Milvus-Lite-Datenbank in einer lokalen Datei. (Ersetzen Sie diese URI durch die Serveradresse für Milvus Standalone und Milvus Distributed).</li>
</ol>
<pre><code translate="no" class="language-python">connections.<span class="hljs-title function_">connect</span>(uri=<span class="hljs-string">&quot;./sentence_transformers_example.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Erstellen Sie das Datenschema. Dieses gibt die Felder an, aus denen ein Element besteht, einschließlich der Dimension der Vektoreinbettung.</li>
</ol>
<pre><code translate="no" class="language-python">fields = [
    FieldSchema(name=<span class="hljs-string">&#x27;id&#x27;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;title&#x27;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;embedding&#x27;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim)
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=<span class="hljs-literal">False</span>)
collection = Collection(name=collection_name, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Definieren Sie den Indexierungsalgorithmus für die Vektorsuche. Milvus Lite implementiert Brute-Force-Suche und HNSW, während Milvus Standalone und Milvus Distributed eine Vielzahl von Methoden implementieren. Für diese Datenmenge ist die naive Brute-Force-Suche ausreichend.</li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">params</span> = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>:<span class="hljs-string">&quot;FLAT&quot;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&quot;IP&quot;</span>
    }

collection.create_index(
    <span class="hljs-string">&#x27;embedding&#x27;</span>,
    <span class="hljs-keyword">params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Sobald diese Schritte abgeschlossen sind, können wir Daten in die Sammlung einfügen und eine Suche durchführen. Alle hinzugefügten Daten werden automatisch indiziert und sind sofort für die Suche verfügbar. Wenn die Daten sehr frisch sind, kann die Suche langsamer sein, da die Brute-Force-Suche auf Daten angewendet wird, die noch indiziert werden müssen.</p>
<h2 id="Inserting-the-Data" class="common-anchor-header">Einfügen der Daten<button data-href="#Inserting-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Beispiel wird das miniLM-Modell SentenceTransformers verwendet, um Einbettungen des Plottextes zu erstellen. Dieses Modell liefert 384-dimensionale Einbettungen.</p>
<pre><code translate="no" class="language-python">model = <span class="hljs-title class_">SentenceTransformer</span>(<span class="hljs-string">&quot;all-MiniLM-L12-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Wir durchlaufen eine Schleife über die Datenzeilen, betten das Feld für die Zusammenfassung der Darstellung ein und fügen die Entitäten in die Vektordatenbank ein. Im Allgemeinen sollten Sie diesen Schritt über Stapel von Datenelementen ausführen, um den CPU- oder GPU-Durchsatz für das Einbettungsmodell zu maximieren, wie wir es hier tun.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch in <span class="hljs-title function_">tqdm</span><span class="hljs-params">(ds.batch(batch_size=<span class="hljs-number">512</span>)</span>):
    embeddings = model.encode(batch[<span class="hljs-string">&#x27;PlotSummary&#x27;</span>])
    data = [{<span class="hljs-string">&quot;title&quot;</span>: title, <span class="hljs-string">&quot;embedding&quot;</span>: embedding} <span class="hljs-keyword">for</span> title, embedding in <span class="hljs-title function_">zip</span><span class="hljs-params">(batch[<span class="hljs-string">&#x27;Title&#x27;</span>], embeddings)</span>]
    res = collection.insert(data=data)
<button class="copy-code-btn"></button></code></pre>
<p>Um sicherzugehen, leeren wir die Warteschlange für das Schreiben von Daten und überprüfen, ob die erwartete Anzahl von Elementen in der Datenbank vorhanden ist.</p>
<pre><code translate="no" class="language-python">collection.flush()
<span class="hljs-built_in">print</span>(collection.num_entities)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Der obige Vorgang ist relativ zeitaufwändig, da die Einbettung Zeit benötigt. Auf einem MacBook Pro 2023 dauert dieser Schritt mit der CPU etwa 2 Minuten, mit dedizierten GPUs geht es viel schneller. Machen Sie eine Pause und genießen Sie eine Tasse Kaffee!</p>
</div>
<h2 id="Performing-the-Search" class="common-anchor-header">Ausführen der Suche<button data-href="#Performing-the-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem alle Daten in Milvus eingegeben wurden, können wir mit der Suche beginnen. In diesem Beispiel werden wir nach Filmen suchen, die auf der Handlung basieren. Da wir eine Stapelsuche durchführen, wird die Suchzeit auf alle Filme aufgeteilt. (Können Sie anhand der Filmsuche erraten, was das gewünschte Ergebnis ist?)</p>
<pre><code translate="no" class="language-python">queries = [
    <span class="hljs-string">&#x27;A shark terrorizes an LA beach.&#x27;</span>,
    <span class="hljs-string">&#x27;An archaeologist searches for ancient artifacts while fighting Nazis.&#x27;</span>,
    <span class="hljs-string">&#x27;Teenagers in detention learn about themselves.&#x27;</span>,
    <span class="hljs-string">&#x27;A teenager fakes illness to get off school and have adventures with two friends.&#x27;</span>,
    <span class="hljs-string">&#x27;A young couple with a kid look after a hotel during winter and the husband goes insane.&#x27;</span>,
    <span class="hljs-string">&#x27;Four turtles fight bad guys.&#x27;</span>
    ]

<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_search</span>(<span class="hljs-params">data</span>):
    embeds = model.encode(data) 
    <span class="hljs-keyword">return</span> [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> embeds]

search_data = embed_search(queries)

res = collection.search(
    data=search_data,
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    param={},
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&#x27;title&#x27;</span>]
)

<span class="hljs-keyword">for</span> idx, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(res):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Title:&#x27;</span>, queries[idx])
    <span class="hljs-comment"># print(&#x27;Search Time:&#x27;, end-start)</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Results:&#x27;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>( hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>), <span class="hljs-string">&#x27;(&#x27;</span>, <span class="hljs-built_in">round</span>(hit.distance, <span class="hljs-number">2</span>), <span class="hljs-string">&#x27;)&#x27;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>Die Ergebnisse sind:</p>
<pre><code translate="no" class="language-shell">Title: An archaeologist searches <span class="hljs-keyword">for</span> ancient artifacts <span class="hljs-keyword">while</span> fighting Nazis.
Results:
<span class="hljs-string">&quot;Pimpernel&quot;</span> Smith ( <span class="hljs-number">0.48</span> )
<span class="hljs-function">Phantom of <span class="hljs-title">Chinatown</span> (<span class="hljs-params"> <span class="hljs-number">0.42</span> </span>)
<span class="hljs-title">Counterblast</span> (<span class="hljs-params"> <span class="hljs-number">0.41</span> </span>)

Title: Teenagers <span class="hljs-keyword">in</span> detention learn about themselves.
Results:
The Breakfast <span class="hljs-title">Club</span> (<span class="hljs-params"> <span class="hljs-number">0.54</span> </span>)
Up the <span class="hljs-title">Academy</span> (<span class="hljs-params"> <span class="hljs-number">0.46</span> </span>)
<span class="hljs-title">Fame</span> (<span class="hljs-params"> <span class="hljs-number">0.43</span> </span>)

Title: A teenager fakes illness to <span class="hljs-keyword">get</span> off school <span class="hljs-keyword">and</span> have adventures <span class="hljs-keyword">with</span> two friends.
Results:
Ferris Bueller&#x27;s Day <span class="hljs-title">Off</span> (<span class="hljs-params"> <span class="hljs-number">0.48</span> </span>)
Fever <span class="hljs-title">Lake</span> (<span class="hljs-params"> <span class="hljs-number">0.47</span> </span>)
A Walk to <span class="hljs-title">Remember</span> (<span class="hljs-params"> <span class="hljs-number">0.45</span> </span>)

Title: A young couple <span class="hljs-keyword">with</span> a kid look after a hotel during winter <span class="hljs-keyword">and</span> the husband goes insane.
Results:
Always a <span class="hljs-title">Bride</span> (<span class="hljs-params"> <span class="hljs-number">0.54</span> </span>)
Fast <span class="hljs-keyword">and</span> <span class="hljs-title">Loose</span> (<span class="hljs-params"> <span class="hljs-number">0.49</span> </span>)
The <span class="hljs-title">Shining</span> (<span class="hljs-params"> <span class="hljs-number">0.48</span> </span>)

Title: Four turtles fight bad guys.
Results:
TMNT 2: Out of the <span class="hljs-title">Shadows</span> (<span class="hljs-params"> <span class="hljs-number">0.49</span> </span>)
Teenage Mutant Ninja Turtles II: The Secret of the <span class="hljs-title">Ooze</span> (<span class="hljs-params"> <span class="hljs-number">0.47</span> </span>)
Gamera: Super <span class="hljs-title">Monster</span> (<span class="hljs-params"> <span class="hljs-number">0.43</span> </span>)
</span><button class="copy-code-btn"></button></code></pre>
