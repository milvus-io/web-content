---
id: integrate_with_sentencetransformers.md
summary: Esta página trata de la búsqueda de películas con Milvus
title: Búsqueda de películas usando Milvus y SentenceTransformers
---
<h1 id="Movie-Search-Using-Milvus-and-SentenceTransformers" class="common-anchor-header">Búsqueda de películas usando Milvus y SentenceTransformers<button data-href="#Movie-Search-Using-Milvus-and-SentenceTransformers" class="anchor-icon" translate="no">
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
    </button></h1><p>En este ejemplo, vamos a realizar una búsqueda de artículos en Wikipedia utilizando Milvus y la biblioteca SentenceTransformers. El conjunto de datos en el que estamos buscando es <a href="https://huggingface.co/datasets/vishnupriyavr/wiki-movie-plots-with-summaries">Wikipedia Movie Plots with Summaries</a> alojado en HuggingFace.</p>
<p>¡Vamos a empezar!</p>
<h2 id="Required-Libraries" class="common-anchor-header">Bibliotecas necesarias<button data-href="#Required-Libraries" class="anchor-icon" translate="no">
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
    </button></h2><p>Para este ejemplo, vamos a utilizar <code translate="no">pymilvus</code> para conectarnos y utilizar Milvus, <code translate="no">sentence-transformers</code> para generar incrustaciones vectoriales y <code translate="no">datasets</code> para descargar el conjunto de datos de ejemplo.</p>
<pre><code translate="no" class="language-shell">pip install pymilvus sentence-transformers datasets tqdm
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>, connections
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">FieldSchema</span>, <span class="hljs-title class_">CollectionSchema</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">Collection</span>
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> <span class="hljs-title class_">SentenceTransformer</span>
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<button class="copy-code-btn"></button></code></pre>
<p>Definiremos algunos parámetros globales,</p>
<pre><code translate="no" class="language-python">embedding_dim = <span class="hljs-number">384</span>
collection_name = <span class="hljs-string">&quot;movie_embeddings&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Downloading-and-Opening-the-Dataset" class="common-anchor-header">Descarga y apertura del conjunto de datos<button data-href="#Downloading-and-Opening-the-Dataset" class="anchor-icon" translate="no">
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
    </button></h2><p>En una sola línea, <code translate="no">datasets</code> nos permite descargar y abrir un conjunto de datos. La biblioteca almacenará en caché el conjunto de datos localmente y utilizará esa copia la próxima vez que se ejecute. Cada fila contiene los detalles de una película a la que acompaña un artículo de Wikipedia. Sólo utilizaremos las columnas <code translate="no">Title</code> y <code translate="no">PlotSummary</code>.</p>
<pre><code translate="no" class="language-python">ds = load_dataset(<span class="hljs-string">&quot;vishnupriyavr/wiki-movie-plots-with-summaries&quot;</span>, <span class="hljs-built_in">split</span>=<span class="hljs-string">&quot;train&quot;</span>)
<span class="hljs-built_in">print</span>(ds)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-the-Database" class="common-anchor-header">Conexión a la base de datos<button data-href="#Connecting-to-the-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Llegados a este punto, vamos a empezar a configurar Milvus. Los pasos son los siguientes:</p>
<ol>
<li>Cree una base de datos Milvus Lite en un archivo local. (Sustituya este URI por la dirección del servidor para Milvus Standalone y Milvus Distributed).</li>
</ol>
<pre><code translate="no" class="language-python">connections.<span class="hljs-title function_">connect</span>(uri=<span class="hljs-string">&quot;./sentence_transformers_example.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Cree el esquema de datos. En él se especifican los campos que componen un elemento, incluida la dimensión de la incrustación vectorial.</li>
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
<li>Defina el algoritmo de indexación de búsqueda vectorial. Milvus Lite implementa la búsqueda por fuerza bruta y HNSW, mientras que Milvus Standalone y Milvus Distributed implementan una amplia variedad de métodos. Para esta escala de datos, basta con la búsqueda ingenua por fuerza bruta.</li>
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
<p>Una vez realizados estos pasos, estamos listos para insertar datos en la colección y realizar una búsqueda. Todos los datos añadidos se indexarán automáticamente y estarán disponibles para la búsqueda de forma inmediata. Si los datos son muy recientes, la búsqueda puede ser más lenta, ya que la búsqueda por fuerza bruta se realizará sobre datos que aún están en proceso de indexación.</p>
<h2 id="Inserting-the-Data" class="common-anchor-header">Inserción de los datos<button data-href="#Inserting-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>En este ejemplo, vamos a utilizar el modelo miniLM de SentenceTransformers para crear incrustaciones del texto del gráfico. Este modelo devuelve incrustaciones de 384 dimensiones.</p>
<pre><code translate="no" class="language-python">model = <span class="hljs-title class_">SentenceTransformer</span>(<span class="hljs-string">&quot;all-MiniLM-L12-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Hacemos un bucle sobre las filas de los datos, incrustamos el campo de resumen del gráfico e insertamos las entidades en la base de datos vectorial. En general, debería realizar este paso en lotes de elementos de datos para maximizar el rendimiento de la CPU o GPU para el modelo de incrustación, como hacemos aquí.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> batch in <span class="hljs-title function_">tqdm</span><span class="hljs-params">(ds.batch(batch_size=<span class="hljs-number">512</span>)</span>):
    embeddings = model.encode(batch[<span class="hljs-string">&#x27;PlotSummary&#x27;</span>])
    data = [{<span class="hljs-string">&quot;title&quot;</span>: title, <span class="hljs-string">&quot;embedding&quot;</span>: embedding} <span class="hljs-keyword">for</span> title, embedding in <span class="hljs-title function_">zip</span><span class="hljs-params">(batch[<span class="hljs-string">&#x27;Title&#x27;</span>], embeddings)</span>]
    res = collection.insert(data=data)
<button class="copy-code-btn"></button></code></pre>
<p>Para estar seguros, vaciamos la cola de escritura de datos y comprobamos que el número esperado de elementos está presente en la base de datos.</p>
<pre><code translate="no" class="language-python">collection.flush()
<span class="hljs-built_in">print</span>(collection.num_entities)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>La operación anterior es relativamente lenta porque la incrustación lleva su tiempo. Este paso tarda unos 2 minutos usando la CPU en un MacBook Pro 2023 y será mucho más rápido con GPUs dedicadas. ¡Tómese un descanso y disfrute de una taza de café!</p>
</div>
<h2 id="Performing-the-Search" class="common-anchor-header">Realizar la búsqueda<button data-href="#Performing-the-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Con todos los datos insertados en Milvus, podemos empezar a realizar nuestras búsquedas. En este ejemplo, vamos a buscar películas basándonos en el argumento. Como estamos realizando una búsqueda por lotes, el tiempo de búsqueda se reparte entre todas las búsquedas de películas. (¿Puede adivinar cuál era el resultado previsto basándose en la búsqueda de películas?)</p>
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
<p>Los resultados son:</p>
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
