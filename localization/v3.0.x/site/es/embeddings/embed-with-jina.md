---
id: embed-with-jina.md
order: 8
summary: >-
  Este artículo describe cómo utilizar JinaEmbeddingFunction para codificar
  documentos y consultas utilizando el modelo de incrustación de Jina AI.
title: Jina AI - Integrar
---
<h1 id="Jina-AI" class="common-anchor-header">Jina AI<button data-href="#Jina-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Los modelos de incrustación de Jina AI son modelos de incrustación de texto de alto rendimiento que pueden traducir entradas textuales en representaciones numéricas, capturando la semántica del texto. Estos modelos destacan en aplicaciones como la recuperación densa, la similitud semántica textual y la comprensión multilingüe.</p>
<p>Milvus se integra con los modelos de incrustación de Jina AI a través de la clase <code translate="no">JinaEmbeddingFunction</code>. Esta clase proporciona métodos para codificar documentos y consultas utilizando los modelos de incrustación de Jina AI y devolver las incrustaciones como vectores densos compatibles con la indexación de Milvus. Para utilizar esta funcionalidad, obtenga una clave API de <a href="https://jina.ai/embeddings/">Jina AI</a>.</p>
<p>Para utilizar esta función, instale las dependencias necesarias:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, instancie <code translate="no">JinaEmbeddingFunction</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, <span class="hljs-comment"># Defaults to `jina-embeddings-v3`</span>
    api_key=JINAAI_API_KEY, <span class="hljs-comment"># Provide your Jina AI API key</span>
    task=<span class="hljs-string">&quot;retrieval.passage&quot;</span>, <span class="hljs-comment"># Specify the task</span>
    dimensions=<span class="hljs-number">1024</span>, <span class="hljs-comment"># Defaults to 1024</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parámetros</strong>:</p>
<ul>
<li><p><code translate="no">model_name</code> <em>(cadena</em>)</p>
<p>Nombre del modelo de incrustación de Jina AI que se utilizará para la codificación. Puede especificar cualquiera de los nombres de modelo de incrustación de Jina AI disponibles, por ejemplo, <code translate="no">jina-embeddings-v3</code>, <code translate="no">jina-embeddings-v2-base-en</code>, etc. Si deja este parámetro sin especificar, se utilizará <code translate="no">jina-embeddings-v3</code>. Para obtener una lista de los modelos disponibles, consulte <a href="https://jina.ai/embeddings">Jina Embeddings</a>.</p></li>
<li><p><code translate="no">api_key</code> <em>(cadena</em>)</p>
<p>La clave API para acceder a la API de Jina AI.</p></li>
<li><p><code translate="no">task</code> <em>(cadena</em>)</p>
<p>Tipo de entrada que se pasa al modelo. Requerido para modelos de incrustación v3 y superiores.</p>
<ul>
<li><code translate="no">&quot;retrieval.passage&quot;</code>: Se utiliza para codificar documentos de gran tamaño en tareas de recuperación en el momento de la indexación.</li>
<li><code translate="no">&quot;retrieval.query&quot;</code>: Se utiliza para codificar las consultas o preguntas de los usuarios en las tareas de recuperación.</li>
<li><code translate="no">&quot;classification&quot;</code>: Se utiliza para codificar texto en tareas de clasificación de texto.</li>
<li><code translate="no">&quot;text-matching&quot;</code>: Se utiliza para codificar texto en tareas de comparación de similitudes, como la medición de la similitud entre dos frases.</li>
<li><code translate="no">&quot;clustering&quot;</code>: Se utiliza para tareas de clustering o reranking.</li>
</ul></li>
<li><p><code translate="no">dimensions</code> <em>(int</em>)</p>
<p>Número de dimensiones que deben tener las incrustaciones resultantes. El valor predeterminado es 1024. Sólo se admite para modelos de incrustación v3 y superiores.</p></li>
<li><p><code translate="no">late_chunking</code> <em>(bool</em>)</p>
<p>Este parámetro controla si se utiliza el nuevo método de fragmentación <a href="https://arxiv.org/abs/2409.04701">que Jina AI introdujo el mes pasado</a> para codificar un lote de frases. El valor predeterminado es <code translate="no">False</code>. Si se establece en <code translate="no">True</code>, la API de Jina AI concatenará todas las frases del campo de entrada y las introducirá como una única cadena en el modelo. Internamente, el modelo incrusta esta larga cadena concatenada y, a continuación, realiza un chunking tardío, devolviendo una lista de incrustaciones que coincide con el tamaño de la lista de entrada.</p></li>
</ul>
<p>Para crear incrustaciones de documentos, utilice el método <code translate="no">encode_documents()</code>. Este método está diseñado para incrustaciones de documentos en tareas de recuperación asimétrica, como la indexación de documentos para tareas de búsqueda o recomendación. Este método utiliza <code translate="no">retrieval.passage</code> como tarea.</p>
<pre><code translate="no" class="language-python:">
```python
docs = [
    &quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;,
    &quot;Alan Turing was the first person to conduct substantial research in AI.&quot;,
    &quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;,
]

docs_embeddings = jina_ef.encode_documents(docs)

# Print embeddings
print(&quot;Embeddings:&quot;, docs_embeddings)
# Print dimension and shape of embeddings
print(&quot;Dim:&quot;, jina_ef.dim, docs_embeddings[0].shape)
</code></pre>
<p>El resultado esperado es similar al siguiente:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">9.80641991e-02</span>, -<span class="hljs-number">8.51697400e-02</span>,  <span class="hljs-number">7.36531913e-02</span>,  <span class="hljs-number">1.42558888e-02</span>,
       -<span class="hljs-number">2.23589484e-02</span>,  <span class="hljs-number">1.68494112e-03</span>, -<span class="hljs-number">3.50753777e-02</span>, -<span class="hljs-number">3.11530549e-02</span>,
       -<span class="hljs-number">3.26012149e-02</span>,  <span class="hljs-number">5.04568312e-03</span>,  <span class="hljs-number">3.69836427e-02</span>,  <span class="hljs-number">3.48948985e-02</span>,
        <span class="hljs-number">8.19722563e-03</span>,  <span class="hljs-number">5.88679723e-02</span>, -<span class="hljs-number">6.71099266e-03</span>, -<span class="hljs-number">1.82369724e-02</span>,
...
        <span class="hljs-number">2.48654783e-02</span>,  <span class="hljs-number">3.43279652e-02</span>, -<span class="hljs-number">1.66154150e-02</span>, -<span class="hljs-number">9.90478322e-03</span>,
       -<span class="hljs-number">2.96043139e-03</span>, -<span class="hljs-number">8.57473817e-03</span>, -<span class="hljs-number">7.39028037e-04</span>,  <span class="hljs-number">6.25024503e-03</span>,
       -<span class="hljs-number">1.08831357e-02</span>, -<span class="hljs-number">4.00776342e-02</span>,  <span class="hljs-number">3.25369164e-02</span>, -<span class="hljs-number">1.42691191e-03</span>])]
Dim: <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>Para crear incrustaciones para consultas, utilice el método <code translate="no">encode_queries()</code>. Este método está diseñado para incrustaciones de consultas en tareas de recuperación asimétricas, como consultas de búsqueda o preguntas. Este método utiliza <code translate="no">retrieval.query</code> como tarea.</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = jina_ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, jina_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>El resultado esperado es similar al siguiente:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">8.79201014e-03</span>,  <span class="hljs-number">1.47551354e-02</span>,  <span class="hljs-number">4.02722731e-02</span>, -<span class="hljs-number">2.52991207e-02</span>,
        <span class="hljs-number">1.12719582e-02</span>,  <span class="hljs-number">3.75947170e-02</span>,  <span class="hljs-number">3.97946090e-02</span>, -<span class="hljs-number">7.36681819e-02</span>,
       -<span class="hljs-number">2.17952449e-02</span>, -<span class="hljs-number">1.16298944e-02</span>, -<span class="hljs-number">6.83426252e-03</span>, -<span class="hljs-number">5.12507409e-02</span>,
        <span class="hljs-number">5.26071340e-02</span>,  <span class="hljs-number">6.75181448e-02</span>,  <span class="hljs-number">3.92445624e-02</span>, -<span class="hljs-number">1.40817231e-02</span>,
...
        <span class="hljs-number">8.81703943e-03</span>,  <span class="hljs-number">4.24629413e-02</span>, -<span class="hljs-number">2.32944116e-02</span>, -<span class="hljs-number">2.05193572e-02</span>,
       -<span class="hljs-number">3.22035812e-02</span>,  <span class="hljs-number">2.81896023e-03</span>,  <span class="hljs-number">3.85326855e-02</span>,  <span class="hljs-number">3.64372656e-02</span>,
       -<span class="hljs-number">1.65050142e-02</span>, -<span class="hljs-number">4.26847413e-02</span>,  <span class="hljs-number">2.02664156e-02</span>, -<span class="hljs-number">1.72684863e-02</span>])]
Dim <span class="hljs-number">1024</span> (<span class="hljs-number">1024</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>Para crear incrustaciones de entradas para la comparación de similitudes (como las tareas STS o de recuperación simétrica), la clasificación de textos, la agrupación o las tareas de reordenación, utilice el valor de parámetro <code translate="no">task</code> apropiado al instanciar la clase <code translate="no">JinaEmbeddingFunction</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, <span class="hljs-comment"># Defaults to `jina-embeddings-v3`</span>
    api_key=JINA_API_KEY, <span class="hljs-comment"># Provide your Jina AI API key</span>
    task=<span class="hljs-string">&quot;text-matching&quot;</span>,
    dimensions=<span class="hljs-number">1024</span>, <span class="hljs-comment"># Defaults to 1024</span>
)

texts = [
    <span class="hljs-string">&quot;Follow the white rabbit.&quot;</span>,  <span class="hljs-comment"># English</span>
    <span class="hljs-string">&quot;Sigue al conejo blanco.&quot;</span>,  <span class="hljs-comment"># Spanish</span>
    <span class="hljs-string">&quot;Suis le lapin blanc.&quot;</span>,  <span class="hljs-comment"># French</span>
    <span class="hljs-string">&quot;跟着白兔走。&quot;</span>,  <span class="hljs-comment"># Chinese</span>
    <span class="hljs-string">&quot;اتبع الأرنب الأبيض.&quot;</span>,  <span class="hljs-comment"># Arabic</span>
    <span class="hljs-string">&quot;Folge dem weißen Kaninchen.&quot;</span>,  <span class="hljs-comment"># German</span>
]

embeddings = jina_ef(texts)

<span class="hljs-comment"># Compute similarities</span>
<span class="hljs-built_in">print</span>(embeddings[<span class="hljs-number">0</span>] @ embeddings[<span class="hljs-number">1</span>].T)
<button class="copy-code-btn"></button></code></pre>
