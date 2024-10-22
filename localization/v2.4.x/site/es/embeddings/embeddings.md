---
id: embeddings.md
order: 1
summary: Aprenda a generar incrustaciones para sus datos.
title: Visión general de la incrustación
---
<h1 id="Embedding-Overview" class="common-anchor-header">Visión general de la incrustación<button data-href="#Embedding-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>La incrustación es un concepto de aprendizaje automático para mapear datos en un espacio de alta dimensión, donde los datos de semántica similar se colocan cerca unos de otros. Al tratarse normalmente de una red neuronal profunda de BERT u otras familias de transformadores, el modelo de incrustación puede representar eficazmente la semántica de texto, imágenes y otros tipos de datos con una serie de números conocidos como vectores. Una característica clave de estos modelos es que la distancia matemática entre vectores en el espacio de alta dimensión puede indicar la similitud de la semántica del texto o las imágenes originales. Esta propiedad abre muchas aplicaciones de recuperación de información, como los motores de búsqueda web como Google y Bing, la búsqueda de productos y las recomendaciones en sitios de comercio electrónico, y el paradigma recientemente popular de la Generación Aumentada de Recuperación (RAG) en la IA generativa.</p>
<p>Existen dos categorías principales de incrustaciones, cada una de las cuales produce un tipo diferente de vector:</p>
<ul>
<li><p><strong>Incrustación densa</strong>: La mayoría de los modelos de incrustación representan la información como un vector de coma flotante de cientos a miles de dimensiones. Los resultados se denominan vectores "densos", ya que la mayoría de las dimensiones tienen valores distintos de cero. Por ejemplo, el popular modelo de incrustación de código abierto BAAI/bge-base-en-v1.5 genera vectores de 768 números en coma flotante (vector flotante de 768 dimensiones).</p></li>
<li><p><strong>Incrustación dispersa</strong>: Por el contrario, los vectores de salida de las incrustaciones dispersas tienen en su mayoría dimensiones cero, es decir, vectores "dispersos". Estos vectores suelen tener dimensiones mucho mayores (decenas de miles o más), lo que viene determinado por el tamaño del vocabulario de tokens. Los vectores dispersos pueden generarse mediante redes neuronales profundas o análisis estadísticos de corpus de texto. Debido a su interpretabilidad y a su mejor capacidad de generalización fuera del dominio, los desarrolladores adoptan cada vez más las incrustaciones dispersas como complemento de las incrustaciones densas.</p></li>
</ul>
<p>Milvus es una base de datos vectorial diseñada para la gestión, el almacenamiento y la recuperación de datos vectoriales. Gracias a la integración de los principales modelos de incrustación y <a href="https://milvus.io/docs/rerankers-overview.md">reordenación</a>, puede transformar fácilmente el texto original en vectores susceptibles de búsqueda o reordenar los resultados utilizando potentes modelos para obtener resultados más precisos para la GAR. Esta integración simplifica la transformación del texto y elimina la necesidad de componentes adicionales de incrustación o renumeración, agilizando así el desarrollo y la validación de la GAR.</p>
<p>Para crear incrustaciones en acción, consulte <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/model/embedding_functions.ipynb">Uso del modelo de PyMilvus para generar incrustaciones de texto</a>.</p>
<table>
<thead>
<tr><th>Función de incrustación</th><th>Tipo</th><th>API o de código abierto</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/OpenAIEmbeddingFunction/OpenAIEmbeddingFunction.md">openai</a></td><td>Denso</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/SentenceTransformerEmbeddingFunction/SentenceTransformerEmbeddingFunction.md">transformador de frases</a></td><td>Denso</td><td>Fuente abierta</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/BM25EmbeddingFunction/BM25EmbeddingFunction.md">bm25</a></td><td>Sparse</td><td>Fuente abierta</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/SpladeEmbeddingFunction/SpladeEmbeddingFunction.md">Splade</a></td><td>Sparse</td><td>Fuente abierta</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/BGEM3EmbeddingFunction/BGEM3EmbeddingFunction.md">bge-m3</a></td><td>Híbrido</td><td>Fuente abierta</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/VoyageEmbeddingFunction/VoyageEmbeddingFunction.md">voyageai</a></td><td>Denso</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/JinaEmbeddingFunction/JinaEmbeddingFunction.md">jina</a></td><td>Densa</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/CohereEmbeddingFunction/CohereEmbeddingFunction.md">cohere</a></td><td>Denso</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/InstructorEmbeddingFunction/InstructorEmbeddingFunction.md">Instructor</a></td><td>Denso</td><td>Fuente abierta</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/MistralAIEmbeddingFunction/MistralAIEmbeddingFunction.md">Mistral AI</a></td><td>Denso</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/NomicEmbeddingFunction/NomicEmbeddingFunction.md">Nomic</a></td><td>Denso</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/MGTEEmbeddingFunction/MGTEEmbeddingFunction.md">mGTE</a></td><td>Híbrido</td><td>Fuente abierta</td></tr>
</tbody>
</table>
<h2 id="Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="common-anchor-header">Ejemplo 1: Utilizar la función de incrustación por defecto para generar vectores densos<button data-href="#Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>Para utilizar las funciones de incrustación con Milvus, primero instale la biblioteca cliente PyMilvus con el subpaquete <code translate="no">model</code> que envuelve todas las utilidades para la generación de incrustaciones.</p>
<pre><code translate="no" class="language-python">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>El subpaquete <code translate="no">model</code> soporta varios modelos de incrustación, desde <a href="https://milvus.io/docs/embed-with-openai.md">OpenAI</a>, <a href="https://milvus.io/docs/embed-with-sentence-transform.md">Sentence Transformers</a>, <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a>, <a href="https://milvus.io/docs/embed-with-bm25.md">BM25</a>, hasta modelos preentrenados <a href="https://milvus.io/docs/embed-with-splade.md">SPLADE</a>. Para simplificar, este ejemplo utiliza <code translate="no">DefaultEmbeddingFunction</code>, que es un modelo de transformador de frases <strong>MiniLM-L6-v2</strong>. El modelo ocupa unos 70 MB y se descargará la primera vez que se utilice:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

<span class="hljs-comment"># This will download &quot;all-MiniLM-L6-v2&quot;, a light weight model.</span>
ef = model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Data from which embeddings are to be generated </span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>El resultado esperado es similar al siguiente:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">-3.09392996e-02</span>, <span class="hljs-number">-1.80662833e-02</span>,  <span class="hljs-number">1.34775648e-02</span>,  <span class="hljs-number">2.77156215e-02</span>,
       <span class="hljs-number">-4.86349640e-03</span>, <span class="hljs-number">-3.12581174e-02</span>, <span class="hljs-number">-3.55921760e-02</span>,  <span class="hljs-number">5.76934684e-03</span>,
        <span class="hljs-number">2.80773244e-03</span>,  <span class="hljs-number">1.35783911e-01</span>,  <span class="hljs-number">3.59678417e-02</span>,  <span class="hljs-number">6.17732145e-02</span>,
...
       <span class="hljs-number">-4.61330153e-02</span>, <span class="hljs-number">-4.85207550e-02</span>,  <span class="hljs-number">3.13997865e-02</span>,  <span class="hljs-number">7.82178566e-02</span>,
       <span class="hljs-number">-4.75336798e-02</span>,  <span class="hljs-number">5.21207601e-02</span>,  <span class="hljs-number">9.04406682e-02</span>, <span class="hljs-number">-5.36676683e-02</span>],
      dtype=<span class="hljs-type">float32</span>)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="common-anchor-header">Ejemplo 2: Generar vectores densos y dispersos en una llamada con el modelo BGE M3<button data-href="#Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="anchor-icon" translate="no">
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
    </button></h2><p>En este ejemplo, utilizamos el modelo híbrido <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a> para incrustar texto en vectores densos y dispersos y utilizarlos para recuperar documentos relevantes. Los pasos generales son los siguientes</p>
<ol>
<li><p>Incrustar el texto como vectores densos y dispersos utilizando el modelo BGE-M3;</p></li>
<li><p>Crear una colección Milvus para almacenar los vectores densos y dispersos;</p></li>
<li><p>Insertar los datos en Milvus;</p></li>
<li><p>Buscar e inspeccionar el resultado.</p></li>
</ol>
<p>En primer lugar, necesitamos instalar las dependencias necesarias.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.<span class="hljs-property">model</span>.<span class="hljs-property">hybrid</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">BGEM3EmbeddingFunction</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    utility,
    <span class="hljs-title class_">FieldSchema</span>, <span class="hljs-title class_">CollectionSchema</span>, <span class="hljs-title class_">DataType</span>,
    <span class="hljs-title class_">Collection</span>, <span class="hljs-title class_">AnnSearchRequest</span>, <span class="hljs-title class_">RRFRanker</span>, connections,
)
<button class="copy-code-btn"></button></code></pre>
<p>Utilizar BGE M3 para codificar los documentos y las consultas para la recuperación de la incrustación.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. prepare a small corpus to search</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
query = <span class="hljs-string">&quot;Who started AI research?&quot;</span>

<span class="hljs-comment"># BGE-M3 model can embed texts as dense and sparse vectors.</span>
<span class="hljs-comment"># It is included in the optional `model` module in pymilvus, to install it,</span>
<span class="hljs-comment"># simply run &quot;pip install pymilvus[model]&quot;.</span>

bge_m3_ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)

docs_embeddings = bge_m3_ef(docs)
query_embeddings = bge_m3_ef([query])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-3-Generate--sparse-vectors-using-BM25-model" class="common-anchor-header">Ejemplo 3: Generar vectores dispersos utilizando el modelo BM25<button data-href="#Example-3-Generate--sparse-vectors-using-BM25-model" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25 es un método muy conocido que utiliza frecuencias de aparición de palabras para determinar la relevancia entre consultas y documentos. En este ejemplo, mostraremos cómo utilizar <code translate="no">BM25EmbeddingFunction</code> para generar incrustaciones dispersas tanto para consultas como para documentos.</p>
<p>Primero, importe la clase <strong>BM25EmbeddingFunction</strong>.</p>
<pre><code translate="no" class="language-xml"><span class="hljs-keyword">from</span> pymilvus.<span class="hljs-property">model</span>.<span class="hljs-property">sparse</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">BM25EmbeddingFunction</span>
<button class="copy-code-btn"></button></code></pre>
<p>En BM25, es importante calcular las estadísticas en sus documentos para obtener el IDF (Inverse Document Frequency), que puede representar el patrón en sus documentos. El IDF es una medida de la cantidad de información que proporciona una palabra, es decir, si es común o rara en todos los documentos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. prepare a small corpus to search</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
query = <span class="hljs-string">&quot;Where was Turing born?&quot;</span>
bm25_ef = BM25EmbeddingFunction()

<span class="hljs-comment"># 2. fit the corpus to get BM25 model parameters on your documents.</span>
bm25_ef.fit(docs)

<span class="hljs-comment"># 3. store the fitted parameters to disk to expedite future processing.</span>
bm25_ef.save(<span class="hljs-string">&quot;bm25_params.json&quot;</span>)

<span class="hljs-comment"># 4. load the saved params</span>
new_bm25_ef = BM25EmbeddingFunction()
new_bm25_ef.load(<span class="hljs-string">&quot;bm25_params.json&quot;</span>)

docs_embeddings = new_bm25_ef.encode_documents(docs)
query_embeddings = new_bm25_ef.encode_queries([query])
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, new_bm25_ef.dim, <span class="hljs-built_in">list</span>(docs_embeddings)[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>El resultado esperado es similar al siguiente:</p>
<pre><code translate="no" class="language-python">Dim: 21 (1, 21)
<button class="copy-code-btn"></button></code></pre>
