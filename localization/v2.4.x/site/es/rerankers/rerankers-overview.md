---
id: rerankers-overview.md
order: 1
summary: >-
  La biblioteca de modelos PyMilvus integra funciones rerank para optimizar el
  orden de los resultados devueltos por las búsquedas iniciales.
title: Visión general de los rerankers
---
<h1 id="Rerankers-Overview" class="common-anchor-header">Visión general de los rerankers<button data-href="#Rerankers-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>En el ámbito de la recuperación de información y la IA generativa, un reordenador es una herramienta esencial que optimiza el orden de los resultados de las búsquedas iniciales. Los rerankers se diferencian de <a href="/docs/es/v2.4.x/embeddings.md">los modelos de incrustación</a> tradicionales en que toman una consulta y un documento como entrada y devuelven directamente una puntuación de similitud en lugar de incrustaciones. Esta puntuación indica la relevancia entre la consulta y el documento.</p>
<p>Los reordenadores suelen emplearse después de la primera fase de recuperación, que suele realizarse mediante técnicas vectoriales de Vecino más Cercano Aproximado (RNA). Aunque las búsquedas RNA son eficaces a la hora de obtener un amplio conjunto de resultados potencialmente relevantes, es posible que no siempre prioricen los resultados en función de su proximidad semántica real a la consulta. En este caso, rerankers se utiliza para optimizar el orden de los resultados mediante análisis contextuales más profundos, a menudo aprovechando modelos avanzados de aprendizaje automático como BERT u otros modelos basados en Transformer. De este modo, los rerankers pueden mejorar drásticamente la precisión y relevancia de los resultados finales presentados al usuario.</p>
<p>La biblioteca de modelos PyMilvus integra funciones rerank para optimizar el orden de los resultados devueltos a partir de las búsquedas iniciales. Después de recuperar las incrustaciones más cercanas de Milvus, puede aprovechar estas herramientas de reranking para refinar los resultados de la búsqueda y mejorar la precisión de los resultados de la búsqueda.</p>
<table>
<thead>
<tr><th>Función de renumeración</th><th>API o de código abierto</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/Rerankers/BGERerankFunction/BGERerankFunction.md">BGE</a></td><td>Fuente abierta</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/Rerankers/CrossEncoderRerankFunction/CrossEncoderRerankFunction.md">Codificador cruzado</a></td><td>Fuente abierta</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/Rerankers/VoyageRerankFunction/VoyageRerankFunction.md">Viaje</a></td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/Rerankers/CohereRerankFunction/CohereRerankFunction.md">Cohere</a></td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/Rerankers/JinaRerankFunction/JinaRerankFunction.md">Jina AI</a></td><td>API</td></tr>
</tbody>
</table>
<div class="alert note">
<ul>
<li><p>Antes de utilizar los rerankers de código abierto, asegúrese de descargar e instalar todas las dependencias y modelos necesarios.</p></li>
<li><p>Para los rerankers basados en API, obtenga una clave de API del proveedor y establézcala en las variables de entorno o argumentos adecuados.</p></li>
</ul>
</div>
<h2 id="Example-1-Use-BGE-rerank-function-to-rerank-documents-according-to-a-query" class="common-anchor-header">Ejemplo 1: Uso de la función rerank de BGE para clasificar documentos según una consulta<button data-href="#Example-1-Use-BGE-rerank-function-to-rerank-documents-according-to-a-query" class="anchor-icon" translate="no">
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
    </button></h2><p>En este ejemplo, demostramos cómo clasificar los resultados de búsqueda utilizando el <a href="/docs/es/v2.4.x/rerankers-bge.md">reranker de</a> BGE en función de una consulta específica.</p>
<p>Para utilizar un reordenador con la biblioteca de modelos <a href="https://github.com/milvus-io/milvus-model">PyMilvus</a>, instale la biblioteca de modelos PyMilvus junto con el subpaquete de modelos que contiene todas las utilidades de reordenación necesarias:</p>
<pre><code translate="no" class="language-bash">pip install pymilvus[model]
<span class="hljs-comment"># or pip install &quot;pymilvus[model]&quot; for zsh.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para utilizar el reranker BGE, importa primero la clase <code translate="no">BGERerankFunction</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.<span class="hljs-property">model</span>.<span class="hljs-property">reranker</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">BGERerankFunction</span>
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, cree una instancia de <code translate="no">BGERerankFunction</code> para el reordenamiento:</p>
<pre><code translate="no" class="language-python">bge_rf = BGERerankFunction(
    model_name=<span class="hljs-string">&quot;BAAI/bge-reranker-v2-m3&quot;</span>,  <span class="hljs-comment"># Specify the model name. Defaults to `BAAI/bge-reranker-v2-m3`.</span>
    device=<span class="hljs-string">&quot;cpu&quot;</span> <span class="hljs-comment"># Specify the device to use, e.g., &#x27;cpu&#x27; or &#x27;cuda:0&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Para jerarquizar documentos a partir de una consulta, utilice el código siguiente:</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What event in 1956 marked the official birth of artificial intelligence as a discipline?&quot;</span>

documents = [
    <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>,
    <span class="hljs-string">&quot;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&quot;</span>,
    <span class="hljs-string">&quot;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&quot;</span>
]

<span class="hljs-title function_">bge_rf</span>(query, documents)
<button class="copy-code-btn"></button></code></pre>
<p>El resultado esperado es similar al siguiente:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-title class_">RerankResult</span>(text=<span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>, score=<span class="hljs-number">0.9911615761470803</span>, index=<span class="hljs-number">1</span>),
 <span class="hljs-title class_">RerankResult</span>(text=<span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>, score=<span class="hljs-number">0.0326971950177779</span>, index=<span class="hljs-number">0</span>),
 <span class="hljs-title class_">RerankResult</span>(text=<span class="hljs-string">&#x27;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&#x27;</span>, score=<span class="hljs-number">0.006514905766152258</span>, index=<span class="hljs-number">3</span>),
 <span class="hljs-title class_">RerankResult</span>(text=<span class="hljs-string">&#x27;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&#x27;</span>, score=<span class="hljs-number">0.0042116724917325935</span>, index=<span class="hljs-number">2</span>)]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-2-Use-a-reranker-to-enhance-relevance-of-search-results" class="common-anchor-header">Ejemplo 2: Utilizar un reranker para mejorar la relevancia de los resultados de búsqueda<button data-href="#Example-2-Use-a-reranker-to-enhance-relevance-of-search-results" class="anchor-icon" translate="no">
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
    </button></h2><p>En esta guía, exploraremos cómo utilizar el método <code translate="no">search()</code> en PyMilvus para realizar búsquedas de similitud, y cómo mejorar la relevancia de los resultados de la búsqueda utilizando un reranker. Nuestra demostración utilizará el siguiente conjunto de datos:</p>
<pre><code translate="no" class="language-python">entities = [
    {<span class="hljs-string">&#x27;doc_id&#x27;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&#x27;doc_vector&#x27;</span>: [-<span class="hljs-number">0.0372721</span>,<span class="hljs-number">0.0101959</span>,...,-<span class="hljs-number">0.114994</span>], <span class="hljs-string">&#x27;doc_text&#x27;</span>: <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>}, 
    {<span class="hljs-string">&#x27;doc_id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;doc_vector&#x27;</span>: [-<span class="hljs-number">0.00308882</span>,-<span class="hljs-number">0.0219905</span>,...,-<span class="hljs-number">0.00795811</span>], <span class="hljs-string">&#x27;doc_text&#x27;</span>: <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>}, 
    {<span class="hljs-string">&#x27;doc_id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;doc_vector&#x27;</span>: [<span class="hljs-number">0.00945078</span>,<span class="hljs-number">0.00397605</span>,...,-<span class="hljs-number">0.0286199</span>], <span class="hljs-string">&#x27;doc_text&#x27;</span>: <span class="hljs-string">&#x27;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&#x27;</span>}, 
    {<span class="hljs-string">&#x27;doc_id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;doc_vector&#x27;</span>: [-<span class="hljs-number">0.0391119</span>,-<span class="hljs-number">0.00880096</span>,...,-<span class="hljs-number">0.0109257</span>], <span class="hljs-string">&#x27;doc_text&#x27;</span>: <span class="hljs-string">&#x27;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&#x27;</span>}
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>Componentes del conjunto de datos</strong>:</p>
<ul>
<li><code translate="no">doc_id</code>: Identificador único para cada documento.</li>
<li><code translate="no">doc_vector</code>: Incrustaciones vectoriales que representan el documento. Para más información sobre la generación de incrustaciones, consulte <a href="/docs/es/v2.4.x/embeddings.md">Incrustaciones</a>.</li>
<li><code translate="no">doc_text</code>: Contenido textual del documento.</li>
</ul>
<h3 id="Preparations" class="common-anchor-header">Preparativos</h3><p>Antes de iniciar una búsqueda de similitudes, debe establecer una conexión con Milvus, crear una colección y preparar e insertar datos en esa colección. El siguiente fragmento de código ilustra estos pasos preliminares.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://10.102.6.214:19530&quot;</span> <span class="hljs-comment"># replace with your own Milvus server address</span>
)

client.drop_collection(<span class="hljs-string">&#x27;test_collection&#x27;</span>)

<span class="hljs-comment"># define schema</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enabel_dynamic_field=<span class="hljs-literal">True</span>)

schema.add_field(field_name=<span class="hljs-string">&quot;doc_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;document id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;doc_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">384</span>, description=<span class="hljs-string">&quot;document vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;doc_text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>, description=<span class="hljs-string">&quot;document text&quot;</span>)

<span class="hljs-comment"># define index params</span>

index_params = client.prepare_index_params()

index_params.add_index(field_name=<span class="hljs-string">&quot;doc_vector&quot;</span>, index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>, params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>})

<span class="hljs-comment"># create collection</span>

client.create_collection(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, schema=schema, index_params=index_params)

<span class="hljs-comment"># insert data into collection</span>

client.insert(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, data=entities)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {&#x27;insert_count&#x27;: 4, &#x27;ids&#x27;: [0, 1, 2, 3]}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Conduct-a-similarity-search" class="common-anchor-header">Realizar una búsqueda de similitudes</h3><p>Después de insertar los datos, realice búsquedas de similitud utilizando el método <code translate="no">search</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># search results based on our query</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.045217834</span>, <span class="hljs-number">0.035171617</span>, ..., -<span class="hljs-number">0.025117004</span>]], <span class="hljs-comment"># replace with your query vector</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;doc_text&quot;</span>]
)

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> res[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&#x27;distance: <span class="hljs-subst">{i[<span class="hljs-string">&quot;distance&quot;</span>]}</span>&#x27;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&#x27;doc_text: <span class="hljs-subst">{i[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;doc_text&quot;</span>]}</span>&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>El resultado esperado es similar al siguiente:</p>
<pre><code translate="no" class="language-python">distance: <span class="hljs-number">0.7235960960388184</span>
doc_text: The Dartmouth Conference <span class="hljs-keyword">in</span> <span class="hljs-number">1956</span> <span class="hljs-keyword">is</span> considered the birthplace of artificial intelligence <span class="hljs-keyword">as</span> a field; here, John McCarthy <span class="hljs-keyword">and</span> others coined the term <span class="hljs-string">&#x27;artificial intelligence&#x27;</span> <span class="hljs-keyword">and</span> laid <span class="hljs-keyword">out</span> its basic goals.
distance: <span class="hljs-number">0.6269873976707458</span>
doc_text: In <span class="hljs-number">1950</span>, Alan Turing published his seminal paper, <span class="hljs-string">&#x27;Computing Machinery and Intelligence,&#x27;</span> proposing the Turing Test <span class="hljs-keyword">as</span> a criterion of intelligence, a foundational concept <span class="hljs-keyword">in</span> the philosophy <span class="hljs-keyword">and</span> development of artificial intelligence.
distance: <span class="hljs-number">0.5340118408203125</span>
doc_text: The invention of the Logic Theorist <span class="hljs-keyword">by</span> Allen Newell, Herbert A. Simon, <span class="hljs-keyword">and</span> Cliff Shaw <span class="hljs-keyword">in</span> <span class="hljs-number">1955</span> marked the creation of the first <span class="hljs-literal">true</span> AI program, which was capable of solving logic problems, akin to proving mathematical theorems.
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-a-reranker-to-enhance-search-results" class="common-anchor-header">Utilizar un reranker para mejorar los resultados de la búsqueda</h3><p>A continuación, mejore la relevancia de los resultados de la búsqueda con un paso de reranking. En este ejemplo, utilizamos <code translate="no">CrossEncoderRerankFunction</code> integrado en PyMilvus para reordenar los resultados y mejorar la precisión.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use reranker to rerank search results</span>

<span class="hljs-keyword">from</span> pymilvus.model.reranker <span class="hljs-keyword">import</span> CrossEncoderRerankFunction

ce_rf = CrossEncoderRerankFunction(
    model_name=<span class="hljs-string">&quot;cross-encoder/ms-marco-MiniLM-L-6-v2&quot;</span>,  <span class="hljs-comment"># Specify the model name.</span>
    device=<span class="hljs-string">&quot;cpu&quot;</span> <span class="hljs-comment"># Specify the device to use, e.g., &#x27;cpu&#x27; or &#x27;cuda:0&#x27;</span>
)

reranked_results = ce_rf(
    query=<span class="hljs-string">&#x27;What event in 1956 marked the official birth of artificial intelligence as a discipline?&#x27;</span>,
    documents=[
        <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>,
        <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>,
        <span class="hljs-string">&quot;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&quot;</span>,
        <span class="hljs-string">&quot;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&quot;</span>
    ],
    top_k=<span class="hljs-number">3</span>
)

<span class="hljs-comment"># print the reranked results</span>
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> reranked_results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&#x27;score: <span class="hljs-subst">{result.score}</span>&#x27;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&#x27;doc_text: <span class="hljs-subst">{result.text}</span>&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>El resultado esperado es similar al siguiente:</p>
<pre><code translate="no" class="language-python">score: <span class="hljs-number">6.250532627105713</span>
doc_text: The Dartmouth Conference <span class="hljs-keyword">in</span> <span class="hljs-number">1956</span> <span class="hljs-keyword">is</span> considered the birthplace of artificial intelligence <span class="hljs-keyword">as</span> a field; here, John McCarthy <span class="hljs-keyword">and</span> others coined the term <span class="hljs-string">&#x27;artificial intelligence&#x27;</span> <span class="hljs-keyword">and</span> laid <span class="hljs-keyword">out</span> its basic goals.
score: <span class="hljs-number">-2.9546022415161133</span>
doc_text: In <span class="hljs-number">1950</span>, Alan Turing published his seminal paper, <span class="hljs-string">&#x27;Computing Machinery and Intelligence,&#x27;</span> proposing the Turing Test <span class="hljs-keyword">as</span> a criterion of intelligence, a foundational concept <span class="hljs-keyword">in</span> the philosophy <span class="hljs-keyword">and</span> development of artificial intelligence.
score: <span class="hljs-number">-4.771512031555176</span>
doc_text: The invention of the Logic Theorist <span class="hljs-keyword">by</span> Allen Newell, Herbert A. Simon, <span class="hljs-keyword">and</span> Cliff Shaw <span class="hljs-keyword">in</span> <span class="hljs-number">1955</span> marked the creation of the first <span class="hljs-literal">true</span> AI program, which was capable of solving logic problems, akin to proving mathematical theorems.
<button class="copy-code-btn"></button></code></pre>
